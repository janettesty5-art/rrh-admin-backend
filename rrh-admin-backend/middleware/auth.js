// middleware/auth.js
// Verifies JWT on every protected route
// Also enforces role-based permissions server-side

const jwt = require('jsonwebtoken');
const { pool } = require('../db');

/**
 * requireAuth — verifies the JWT token from Authorization header
 * Attaches the full admin record to req.admin
 */
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided. Please log in.' });
    }

    const token = header.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Session expired. Please log in again.' });
      }
      return res.status(401).json({ error: 'Invalid token. Please log in again.' });
    }

    // Always fetch fresh from DB — catches deactivated accounts mid-session
    const result = await pool.query(
      'SELECT id, name, email, role, status FROM admins WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Admin account not found.' });
    }

    const admin = result.rows[0];
    if (admin.status !== 'active') {
      return res.status(403).json({ error: 'Your account has been deactivated. Contact the Super Admin.' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    res.status(500).json({ error: 'Authentication error.' });
  }
}

/**
 * requireRole — checks the admin's role
 * Usage: requireRole('executor', 'super')
 * Pass allowed roles as arguments
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }
    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        error: `Access denied. This action requires one of these roles: ${allowedRoles.join(', ')}. Your role: ${req.admin.role}.`
      });
    }
    next();
  };
}

/**
 * Role permission helpers — used throughout routes
 */
const ROLES = {
  super:    { can_read: true, can_write: true, can_publish: true,  can_manage_admins: true  },
  executor: { can_read: true, can_write: true, can_publish: true,  can_manage_admins: false },
  writer:   { can_read: true, can_write: true, can_publish: false, can_manage_admins: false },
  reader:   { can_read: true, can_write: false,can_publish: false, can_manage_admins: false },
};

function can(admin, permission) {
  return !!(ROLES[admin.role] && ROLES[admin.role][permission]);
}

module.exports = { requireAuth, requireRole, can, ROLES };