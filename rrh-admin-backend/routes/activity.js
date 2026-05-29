// routes/activity.js
// Returns activity log — all admins can see it, filtered by role

const express = require('express');
const router  = express.Router();
const { pool }        = require('../db');
const { requireAuth } = require('../middleware/auth');

// ── GET /api/activity ────────────────────────────────────────
router.get('/', requireAuth, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);

    let query, params;

    // Readers and Writers only see their own activity
    if (req.admin.role === 'reader' || req.admin.role === 'writer') {
      query = `
        SELECT id, admin_name, action, description, ip_address, created_at
        FROM activity_log
        WHERE admin_id = $1
        ORDER BY created_at DESC
        LIMIT $2
      `;
      params = [req.admin.id, limit];
    } else {
      // Executors and Super see all activity
      query = `
        SELECT id, admin_name, action, description, ip_address, created_at
        FROM activity_log
        ORDER BY created_at DESC
        LIMIT $1
      `;
      params = [limit];
    }

    const result = await pool.query(query, params);
    res.json({ activity: result.rows });
  } catch (err) {
    console.error('Activity log error:', err.message);
    res.status(500).json({ error: 'Failed to fetch activity log.' });
  }
});

module.exports = router;