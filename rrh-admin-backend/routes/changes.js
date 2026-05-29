// routes/changes.js
// Writer submits changes → stored as pending
// Executor/Super reviews, approves or rejects
// Approved changes are flagged as published

const express = require('express');
const router  = express.Router();

const { pool }                              = require('../db');
const { requireAuth, requireRole, can }     = require('../middleware/auth');
const { sendPendingNotification }           = require('../utils/email');

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

// ── POST /api/changes ────────────────────────────────────────
// Writer or above submits a change for review
// Writers → goes to pending
// Executor/Super → can choose to submit as pending OR publish directly
router.post('/', requireAuth, async (req, res) => {
  try {
    if (!can(req.admin, 'can_write')) {
      return res.status(403).json({ error: 'You do not have write permission.' });
    }

    const { page, section, field_key, old_value, new_value, note } = req.body;

    if (!page || !new_value) {
      return res.status(400).json({ error: 'Page and new_value are required.' });
    }

    // Executors and Super can publish directly — Writers always go pending
    const publishDirectly = can(req.admin, 'can_publish') && req.body.publish_directly === true;
    const status = publishDirectly ? 'approved' : 'pending';

    const result = await pool.query(
      `INSERT INTO pending_changes 
         (author_id, author_name, page, section, field_key, old_value, new_value, note, status, reviewed_by, reviewed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        req.admin.id,
        req.admin.name,
        page,
        section || null,
        field_key || null,
        old_value || null,
        new_value,
        note || null,
        status,
        publishDirectly ? req.admin.id : null,
        publishDirectly ? new Date() : null,
      ]
    );

    const change = result.rows[0];

    if (publishDirectly) {
      await logActivity(
        req.admin.id, req.admin.name, 'change_published',
        `${req.admin.name} directly published a change on page: ${page}`,
        req.ip
      );
      return res.status(201).json({
        message: 'Change published directly.',
        change,
        published: true
      });
    }

    // Notify all executors and super admins by email
    const reviewers = await pool.query(
      `SELECT email, name FROM admins 
       WHERE role IN ('executor', 'super') AND status = 'active' AND id != $1`,
      [req.admin.id]
    );

    for (const reviewer of reviewers.rows) {
      try {
        await sendPendingNotification(reviewer.email, reviewer.name, req.admin.name, page);
      } catch (e) {
        console.error(`Failed to notify ${reviewer.email}:`, e.message);
      }
    }

    await logActivity(
      req.admin.id, req.admin.name, 'change_submitted',
      `${req.admin.name} submitted a change on page: ${page} — awaiting approval`,
      req.ip
    );

    res.status(201).json({
      message: 'Change submitted for approval. An approver has been notified.',
      change,
      published: false
    });
  } catch (err) {
    console.error('Submit change error:', err.message);
    res.status(500).json({ error: 'Failed to submit change.' });
  }
});

// ── GET /api/changes ─────────────────────────────────────────
// Get changes — filtered by status and role
router.get('/', requireAuth, async (req, res) => {
  try {
    const { status } = req.query; // pending | approved | rejected | all

    let whereClause = '';
    const params = [];

    if (status && status !== 'all') {
      whereClause = 'WHERE pc.status = $1';
      params.push(status);
    }

    // Writers only see their own changes
    if (req.admin.role === 'writer' || req.admin.role === 'reader') {
      whereClause = whereClause
        ? whereClause + ` AND pc.author_id = $${params.length + 1}`
        : `WHERE pc.author_id = $${params.length + 1}`;
      params.push(req.admin.id);
    }

    const result = await pool.query(
      `SELECT 
         pc.*,
         reviewer.name AS reviewer_name
       FROM pending_changes pc
       LEFT JOIN admins reviewer ON reviewer.id = pc.reviewed_by
       ${whereClause}
       ORDER BY pc.submitted_at DESC
       LIMIT 100`,
      params
    );

    // Count pending for badge
    const pendingCount = await pool.query(
      `SELECT COUNT(*) FROM pending_changes WHERE status = 'pending'`
    );

    res.json({
      changes: result.rows,
      pendingCount: parseInt(pendingCount.rows[0].count)
    });
  } catch (err) {
    console.error('Get changes error:', err.message);
    res.status(500).json({ error: 'Failed to fetch changes.' });
  }
});

// ── PATCH /api/changes/:id/approve ───────────────────────────
// Executor or Super approves a pending change
router.patch('/:id/approve', requireAuth, requireRole('executor', 'super'), async (req, res) => {
  try {
    const { id } = req.params;
    const { review_note } = req.body;

    const target = await pool.query(
      'SELECT * FROM pending_changes WHERE id = $1',
      [id]
    );

    if (target.rows.length === 0) {
      return res.status(404).json({ error: 'Change not found.' });
    }
    if (target.rows[0].status !== 'pending') {
      return res.status(400).json({ error: `This change is already "${target.rows[0].status}".` });
    }

    const result = await pool.query(
      `UPDATE pending_changes 
       SET status = 'approved', reviewed_by = $1, reviewed_at = NOW(), review_note = $2
       WHERE id = $3
       RETURNING *`,
      [req.admin.id, review_note || null, id]
    );

    const change = result.rows[0];

    await logActivity(
      req.admin.id, req.admin.name, 'change_approved',
      `${req.admin.name} approved change by ${change.author_name} on page: ${change.page}`,
      req.ip
    );

    res.json({
      message: 'Change approved and published.',
      change: result.rows[0]
    });
  } catch (err) {
    console.error('Approve change error:', err.message);
    res.status(500).json({ error: 'Failed to approve change.' });
  }
});

// ── PATCH /api/changes/:id/reject ────────────────────────────
// Executor or Super rejects a pending change
router.patch('/:id/reject', requireAuth, requireRole('executor', 'super'), async (req, res) => {
  try {
    const { id } = req.params;
    const { review_note } = req.body;

    const target = await pool.query(
      'SELECT * FROM pending_changes WHERE id = $1',
      [id]
    );

    if (target.rows.length === 0) {
      return res.status(404).json({ error: 'Change not found.' });
    }
    if (target.rows[0].status !== 'pending') {
      return res.status(400).json({ error: `This change is already "${target.rows[0].status}".` });
    }

    const result = await pool.query(
      `UPDATE pending_changes 
       SET status = 'rejected', reviewed_by = $1, reviewed_at = NOW(), review_note = $2
       WHERE id = $3
       RETURNING *`,
      [req.admin.id, review_note || null, id]
    );

    const change = result.rows[0];

    await logActivity(
      req.admin.id, req.admin.name, 'change_rejected',
      `${req.admin.name} rejected change by ${change.author_name} on page: ${change.page}`,
      req.ip
    );

    res.json({
      message: 'Change rejected.',
      change: result.rows[0]
    });
  } catch (err) {
    console.error('Reject change error:', err.message);
    res.status(500).json({ error: 'Failed to reject change.' });
  }
});

// ── DELETE /api/changes/:id ───────────────────────────────────
// Author can delete their own pending change; Super can delete any
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const target = await pool.query(
      'SELECT * FROM pending_changes WHERE id = $1',
      [id]
    );
    if (target.rows.length === 0) return res.status(404).json({ error: 'Change not found.' });

    const change = target.rows[0];

    // Only the author or super admin can delete
    if (change.author_id !== req.admin.id && req.admin.role !== 'super') {
      return res.status(403).json({ error: 'You can only delete your own changes.' });
    }

    await pool.query('DELETE FROM pending_changes WHERE id = $1', [id]);

    await logActivity(
      req.admin.id, req.admin.name, 'change_deleted',
      `Deleted pending change on page: ${change.page}`,
      req.ip
    );

    res.json({ message: 'Change deleted.' });
  } catch (err) {
    console.error('Delete change error:', err.message);
    res.status(500).json({ error: 'Failed to delete change.' });
  }
});

module.exports = router;