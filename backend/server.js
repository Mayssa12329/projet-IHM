// ─── FILE: server.js ─────────────────────────────────────────────────────────
'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const env = require('./src/config/env');
const connectDB = require('./src/config/db');
const logger = require('./src/config/logger');
const errorMiddleware = require('./src/middleware/error.middleware');

// ─── Route Imports ────────────────────────────────────────────────────────────
const authRoutes = require('./src/modules/auth/auth.routes');
const publicationRoutes = require('./src/modules/publication/publication.routes');
const adminRoutes = require('./src/modules/admin/admin.routes');
const moderateurRoutes = require('./src/modules/moderateur/moderateur.routes');
const userRoutes = require('./src/modules/user/user.routes');
const categorieRoutes = require('./src/modules/categorie/categorie.routes');
const signalementRoutes = require('./src/modules/signalement/signalement.routes');

// ─── App Initialization ───────────────────────────────────────────────────────
const app = express();

// ─── Database Connection ──────────────────────────────────────────────────────
connectDB();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || env.CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin non autorisée par CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: { write: (message) => logger.http(message.trim()) },
  }));
}

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/moderateur', moderateurRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/reports', signalementRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorMiddleware);

// ─── Server Start ─────────────────────────────────────────────────────────────
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
