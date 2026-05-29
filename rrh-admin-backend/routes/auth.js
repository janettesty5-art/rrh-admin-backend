// routes/auth.js
// Login, forgot password, OTP verify, reset password

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');
const rateLimit = require('express-rate-limit');

const { pool }         = require('../db');
const { requireAuth }  = require('../middleware/auth');
const { sendOTPEmail } = require('../utils/email');

// ── Rate limiters ────────────────────────────────────────────
// Prevent brute-force on login and OTP endpoints
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many login attempts. Please wait 15 minutes and try again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many OTP requests. Please wait 15 minutes.' },
});

// ── Helper: log activity ─────────────────────────────────────
async function logActivity(adminId, adminName, action, description, ip) {
  try {
    await pool.query(
      `INSERT INTO activity_log (admin_id, admin_name, action, description, ip_address)
       VALUES ($1, $2, $3, $4, $5)`,
      [adminId, adminName, action, description, ip]
    );
  } catch (e) {
    console.error('Activity log error:', e.message);
  }
}

// ── POST /api/auth/login ──────────────────────────────────────
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Fetch admin
    const result = await pool.query(
      'SELECT * FROM admins WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      // Timing-safe: still run bcrypt even on miss
      await bcrypt.compare(password, '$2a$12$invalidhashtopreventtiming');
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const admin = result.rows[0];

    if (admin.status !== 'active') {
      return res.status(403).json({ error: 'Your account has been deactivated. Contact the Super Admin.' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      await logActivity(admin.id, admin.name, 'login_failed', `Failed login attempt for ${email}`, req.ip);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Update last_login
    await pool.query(
      'UPDATE admins SET last_login = NOW() WHERE id = $1',
      [admin.id]
    );

    // Sign JWT
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    await logActivity(admin.id, admin.name, 'login', `${admin.name} logged in`, req.ip);

    return res.json({
      token,
      admin: {
        id:    admin.id,
        name:  admin.name,
        email: admin.email,
        role:  admin.role,
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
});

// ── POST /api/auth/forgot-password ───────────────────────────
// Generates a fresh random 6-digit OTP, hashes it, stores in DB, emails it
router.post('/forgot-password', otpLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const result = await pool.query(
      'SELECT id, name, email FROM admins WHERE email = $1 AND status = $2',
      [email.toLowerCase().trim(), 'active']
    );

    // Always return success even if email not found (security: don't leak account existence)
    if (result.rows.length === 0) {
      return res.json({ message: 'If that email exists, an OTP has been sent.' });
    }

    const admin = result.rows[0];

    // Invalidate any previous unused OTPs for this email
    await pool.query(
      `UPDATE otp_tokens SET used = true 
       WHERE email = $1 AND used = false`,
      [admin.email]
    );

    // Generate fresh cryptographically random 6-digit OTP
    const otpCode = crypto.randomInt(100000, 999999).toString();

    // Hash it before storing — never store plain OTP
    const otpHash = await bcrypt.hash(otpCode, 10);

    // Store in DB — expires in 10 minutes
    await pool.query(
      `INSERT INTO otp_tokens (email, code_hash, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '10 minutes')`,
      [admin.email, otpHash]
    );

    // Send the plain OTP via email
    await sendOTPEmail(admin.email, admin.name, otpCode);

    await logActivity(admin.id, admin.name, 'otp_requested', `Password reset OTP sent to ${admin.email}`, req.ip);

    return res.json({ message: 'OTP sent to your email. It expires in 10 minutes.' });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
});

// ── POST /api/auth/verify-otp ────────────────────────────────
// Verifies the OTP — returns a short-lived reset token on success
router.post('/verify-otp', otpLimiter, async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP code are required.' });
    }

    // Get all valid (unused, unexpired) OTPs for this email
    const result = await pool.query(
      `SELECT * FROM otp_tokens 
       WHERE email = $1 
         AND used = false 
         AND expires_at > NOW()
       ORDER BY created_at DESC
       LIMIT 1`,
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'OTP is invalid or has expired. Please request a new one.' });
    }

    const otpRecord = result.rows[0];

    // Compare entered OTP against hash
    const isValid = await bcrypt.compare(otp.trim(), otpRecord.code_hash);
    if (!isValid) {
      return res.status(400).json({ error: 'Incorrect OTP code. Please try again.' });
    }

    // Mark OTP as used — one-time only
    await pool.query(
      'UPDATE otp_tokens SET used = true WHERE id = $1',
      [otpRecord.id]
    );

    // Issue a short-lived password reset token (15 min)
    const adminResult = await pool.query(
      'SELECT id, name FROM admins WHERE email = $1',
      [email.toLowerCase().trim()]
    );
    const admin = adminResult.rows[0];

    const resetToken = jwt.sign(
      { id: admin.id, purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    await logActivity(admin.id, admin.name, 'otp_verified', 'OTP verified successfully for password reset', req.ip);

    return res.json({
      message: 'OTP verified. You may now reset your password.',
      resetToken
    });
  } catch (err) {
    console.error('OTP verify error:', err.message);
    res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
});

// ── POST /api/auth/reset-password ────────────────────────────
// Uses the reset token from verify-otp to set a new password
router.post('/reset-password', async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(400).json({ error: 'Reset link has expired. Please request a new OTP.' });
    }

    if (decoded.purpose !== 'password_reset') {
      return res.status(400).json({ error: 'Invalid reset token.' });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await pool.query(
      'UPDATE admins SET password = $1 WHERE id = $2',
      [hash, decoded.id]
    );

    const adminResult = await pool.query(
      'SELECT name FROM admins WHERE id = $1',
      [decoded.id]
    );
    const name = adminResult.rows[0]?.name || 'Admin';

    await logActivity(decoded.id, name, 'password_reset', 'Password reset successfully', req.ip);

    return res.json({ message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ error: 'Password reset failed. Please try again.' });
  }
});

// ── POST /api/auth/change-password ───────────────────────────
// Logged-in admin changes their own password
router.post('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New passwords do not match.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const result = await pool.query(
      'SELECT password FROM admins WHERE id = $1',
      [req.admin.id]
    );
    const isMatch = await bcrypt.compare(currentPassword, result.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect.' });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await pool.query(
      'UPDATE admins SET password = $1 WHERE id = $2',
      [hash, req.admin.id]
    );

    await logActivity(req.admin.id, req.admin.name, 'password_changed', 'Admin changed their password', req.ip);

    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Change password error:', err.message);
    res.status(500).json({ error: 'Failed to update password.' });
  }
});

// ── GET /api/auth/me ─────────────────────────────────────────
// Returns current admin info from a valid JWT
router.get('/me', requireAuth, (req, res) => {
  res.json({ admin: req.admin });
});

// ── POST /api/auth/logout ────────────────────────────────────
// Server-side logout just logs the activity (JWT is stateless)
router.post('/logout', requireAuth, async (req, res) => {
  await logActivity(req.admin.id, req.admin.name, 'logout', `${req.admin.name} logged out`, req.ip);
  res.json({ message: 'Logged out successfully.' });
});

module.exports = router;