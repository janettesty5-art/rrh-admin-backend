// routes/admins.js
// Manage admin accounts — only Super Admins can access most of these

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

const { pool }                        = require('../db');
const { requireAuth, requireRole }    = require('../middleware/auth');

const MAX_ADMINS = 5; // Super Admin + 4 others

// ── Helper ───────────────────────────────────────────────────
async function logActivity(adminId, adminName, action, description, ip) {
  try {
    await pool.query(
      `INSERT INTO activity_log (admin_id, admin_name, action, description, ip_address)
       VALUES ($1, $2, $3, $4, $5)`,
      [adminId, adminName, action, description, ip]
    );
  } catch (e) { /* non-fatal */ }
}

// ── GET /api/admins ──────────────────────────────────────────
// List all admins — super admin only
router.get('/', requireAuth, requireRole('super'), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, status, last_login, created_at
       FROM admins
       ORDER BY 
         CASE role 
           WHEN 'super'    THEN 1
           WHEN 'executor' THEN 2
           WHEN 'writer'   THEN 3
           WHEN 'reader'   THEN 4
         END,
         created_at ASC`
    );
    res.json({ admins: result.rows });
  } catch (err) {
    console.error('List admins error:', err.message);
    res.status(500).json({ error: 'Failed to fetch admins.' });
  }
});

// ── POST /api/admins ─────────────────────────────────────────
// Create a new admin — super admin only
router.post('/', requireAuth, requireRole('super'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!['executor', 'writer', 'reader'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be: executor, writer, or reader.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    // Check max admins limit
    const countResult = await pool.query('SELECT COUNT(*) FROM admins');
    const count = parseInt(countResult.rows[0].count);
    if (count >= MAX_ADMINS) {
      return res.status(400).json({
        error: `Maximum ${MAX_ADMINS} admins allowed. Remove an existing admin first.`
      });
    }

    // Check email uniqueness
    const existing = await pool.query(
      'SELECT id FROM admins WHERE email = $1',
      [email.toLowerCase().trim()]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'An admin with this email already exists.' });
    }

    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO admins (name, email, password, role, status, created_by)
       VALUES ($1, $2, $3, $4, 'active', $5)
       RETURNING id, name, email, role, status, created_at`,
      [name.trim(), email.toLowerCase().trim(), hash, role, req.admin.id]
    );

    const newAdmin = result.rows[0];
    await logActivity(
      req.admin.id, req.admin.name, 'admin_created',
      `Created new admin: ${newAdmin.name} (${newAdmin.email}) with role: ${role}`,
      req.ip
    );

    res.status(201).json({
      message: `Admin "${newAdmin.name}" created successfully.`,
      admin: newAdmin
    });
  } catch (err) {
    console.error('Create admin error:', err.message);
    res.status(500).json({ error: 'Failed to create admin.' });
  }
});

// ── PATCH /api/admins/:id/role ───────────────────────────────
// Change an admin's role — super admin only
router.patch('/:id/role', requireAuth, requireRole('super'), async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['executor', 'writer', 'reader'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role.' });
    }

    // Cannot change the super admin's own role
    const target = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
    if (target.rows.length === 0) return res.status(404).json({ error: 'Admin not found.' });
    if (target.rows[0].role === 'super') {
      return res.status(403).json({ error: 'Cannot change the Super Admin role.' });
    }

    const result = await pool.query(
      `UPDATE admins SET role = $1 WHERE id = $2
       RETURNING id, name, email, role, status`,
      [role, id]
    );

    await logActivity(
      req.admin.id, req.admin.name, 'role_changed',
      `Changed ${result.rows[0].name}'s role to: ${role}`,
      req.ip
    );

    res.json({
      message: `Role updated to "${role}" for ${result.rows[0].name}.`,
      admin: result.rows[0]
    });
  } catch (err) {
    console.error('Change role error:', err.message);
    res.status(500).json({ error: 'Failed to update role.' });
  }
});

// ── PATCH /api/admins/:id/status ─────────────────────────────
// Activate or deactivate an admin — super admin only
router.patch('/:id/status', requireAuth, requireRole('super'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Status must be "active" or "inactive".' });
    }
    if (id === req.admin.id) {
      return res.status(400).json({ error: 'You cannot deactivate your own account.' });
    }

    const target = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
    if (target.rows.length === 0) return res.status(404).json({ error: 'Admin not found.' });
    if (target.rows[0].role === 'super') {
      return res.status(403).json({ error: 'Cannot deactivate the Super Admin account.' });
    }

    const result = await pool.query(
      `UPDATE admins SET status = $1 WHERE id = $2
       RETURNING id, name, email, role, status`,
      [status, id]
    );

    await logActivity(
      req.admin.id, req.admin.name, 'status_changed',
      `${status === 'active' ? 'Activated' : 'Deactivated'} admin: ${result.rows[0].name}`,
      req.ip
    );

    res.json({
      message: `Admin "${result.rows[0].name}" has been ${status === 'active' ? 'activated' : 'deactivated'}.`,
      admin: result.rows[0]
    });
  } catch (err) {
    console.error('Change status error:', err.message);
    res.status(500).json({ error: 'Failed to update status.' });
  }
});

// ── DELETE /api/admins/:id ───────────────────────────────────
// Remove an admin — super admin only
router.delete('/:id', requireAuth, requireRole('super'), async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.admin.id) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }

    const target = await pool.query('SELECT * FROM admins WHERE id = $1', [id]);
    if (target.rows.length === 0) return res.status(404).json({ error: 'Admin not found.' });
    if (target.rows[0].role === 'super') {
      return res.status(403).json({ error: 'Cannot delete the Super Admin account.' });
    }

    const adminName = target.rows[0].name;
    await pool.query('DELETE FROM admins WHERE id = $1', [id]);

    await logActivity(
      req.admin.id, req.admin.name, 'admin_deleted',
      `Deleted admin: ${adminName}`,
      req.ip
    );

    res.json({ message: `Admin "${adminName}" has been removed.` });
  } catch (err) {
    console.error('Delete admin error:', err.message);
    res.status(500).json({ error: 'Failed to delete admin.' });
  }
});

// ── PATCH /api/admins/:id/reset-password ─────────────────────
// Super admin resets any admin's password directly
router.patch('/:id/reset-password', requireAuth, requireRole('super'), async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }

    const target = await pool.query('SELECT name FROM admins WHERE id = $1', [id]);
    if (target.rows.length === 0) return res.status(404).json({ error: 'Admin not found.' });

    const hash = await bcrypt.hash(newPassword, 12);
    await pool.query('UPDATE admins SET password = $1 WHERE id = $2', [hash, id]);

    await logActivity(
      req.admin.id, req.admin.name, 'password_reset_forced',
      `Super admin reset password for: ${target.rows[0].name}`,
      req.ip
    );

    res.json({ message: `Password reset for "${target.rows[0].name}".` });
  } catch (err) {
    console.error('Force reset password error:', err.message);
    res.status(500).json({ error: 'Failed to reset password.' });
  }
});

module.exports = router;