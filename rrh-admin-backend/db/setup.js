// db/setup.js
// Run this once to create all tables and seed the super admin account
// Called automatically on server start if tables don't exist

const { pool } = require('./index');
const bcrypt = require('bcryptjs');

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log('🗄️  Setting up database tables...');

    // ── ADMINS TABLE ──────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name        VARCHAR(100) NOT NULL,
        email       VARCHAR(255) UNIQUE NOT NULL,
        password    VARCHAR(255) NOT NULL,
        role        VARCHAR(20) NOT NULL CHECK (role IN ('super', 'executor', 'writer', 'reader')),
        status      VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        last_login  TIMESTAMP,
        created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
        created_by  UUID REFERENCES admins(id) ON DELETE SET NULL
      );
    `);

    // ── OTP TOKENS TABLE ──────────────────────────────────────
    // Stores hashed OTP codes with expiry — deleted after use
    await client.query(`
      CREATE TABLE IF NOT EXISTS otp_tokens (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email       VARCHAR(255) NOT NULL,
        code_hash   VARCHAR(255) NOT NULL,
        expires_at  TIMESTAMP NOT NULL,
        used        BOOLEAN NOT NULL DEFAULT false,
        created_at  TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Index to quickly find unexpired tokens by email
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_otp_email_expires 
      ON otp_tokens(email, expires_at) 
      WHERE used = false;
    `);

    // ── PENDING CHANGES TABLE ─────────────────────────────────
    // Writer admins submit changes here; executors approve/reject
    await client.query(`
      CREATE TABLE IF NOT EXISTS pending_changes (
        id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        author_id     UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
        author_name   VARCHAR(100) NOT NULL,
        page          VARCHAR(50) NOT NULL,
        section       VARCHAR(100),
        field_key     VARCHAR(100),
        old_value     TEXT,
        new_value     TEXT NOT NULL,
        note          TEXT,
        status        VARCHAR(20) NOT NULL DEFAULT 'pending' 
                        CHECK (status IN ('pending', 'approved', 'rejected')),
        reviewed_by   UUID REFERENCES admins(id) ON DELETE SET NULL,
        reviewed_at   TIMESTAMP,
        review_note   TEXT,
        submitted_at  TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // ── ACTIVITY LOG TABLE ────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_log (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id    UUID REFERENCES admins(id) ON DELETE SET NULL,
        admin_name  VARCHAR(100),
        action      VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        ip_address  VARCHAR(45),
        created_at  TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Index for fetching recent activity fast
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_activity_created 
      ON activity_log(created_at DESC);
    `);

    // ── SEED SUPER ADMIN ──────────────────────────────────────
    const superEmail = process.env.SUPER_ADMIN_EMAIL;
    const superPass  = process.env.SUPER_ADMIN_PASSWORD;
    const superName  = process.env.SUPER_ADMIN_NAME || 'Super Admin';

    if (superEmail && superPass) {
      const existing = await client.query(
        'SELECT id FROM admins WHERE email = $1',
        [superEmail]
      );

      if (existing.rows.length === 0) {
        const hash = await bcrypt.hash(superPass, 12);
        await client.query(
          `INSERT INTO admins (name, email, password, role, status)
           VALUES ($1, $2, $3, 'super', 'active')`,
          [superName, superEmail, hash]
        );
        console.log(`✅ Super admin created: ${superEmail}`);
      } else {
        console.log(`ℹ️  Super admin already exists: ${superEmail}`);
      }
    }

    // ── CLEANUP: delete expired OTPs on every startup ─────────
    await client.query(
      `DELETE FROM otp_tokens WHERE expires_at < NOW()`
    );

    console.log('✅ Database setup complete.');
  } catch (err) {
    console.error('❌ Database setup failed:', err.message);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { setupDatabase };