// server.js
// Road Rock Holdings — Admin Backend
// Main Express server entry point

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const rateLimit  = require('express-rate-limit');

const { setupDatabase } = require('./db/setup');

// ── Route imports ─────────────────────────────────────────────
const authRoutes     = require('./routes/auth');
const adminsRoutes   = require('./routes/admins');
const changesRoutes  = require('./routes/changes');
const activityRoutes = require('./routes/activity');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Security middleware ───────────────────────────────────────
app.use(helmet());

// CORS — allow your admin panel and website to call this API
const allowedOrigins = (process.env.FRONTEND_URL || '*')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: allowedOrigins.includes('*') ? '*' : function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── Body parser ───────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Global rate limiter ───────────────────────────────────────
// Soft limit for all API calls — login/OTP have their own tighter limits
const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please slow down.' },
});
app.use('/api/', globalLimiter);

// ── Request logger (dev-friendly) ────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    const color = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(`${color}${req.method}\x1b[0m ${req.path} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// ── Health check ──────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status:    'ok',
    service:   'Road Rock Holdings Admin API',
    timestamp: new Date().toISOString(),
  });
});

// ── API routes ────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/admins',   adminsRoutes);
app.use('/api/changes',  changesRoutes);
app.use('/api/activity', activityRoutes);

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start server ──────────────────────────────────────────────
async function start() {
  try {
    // Run DB setup (creates tables + seeds super admin if needed)
    await setupDatabase();

    app.listen(PORT, () => {
      console.log(`\n🚀 RRH Admin API running on port ${PORT}`);
      console.log(`   Health check: http://localhost:${PORT}/health\n`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();