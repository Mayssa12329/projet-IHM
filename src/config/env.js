// ─── FILE: src/config/env.js ──────────────────────────────────────────────────
'use strict';

/**
 * Centralized environment configuration.
 * All modules MUST import from here — never use process.env directly.
 */
const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,

  // Database
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/content_moderation',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'change_me_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

// Validate critical variables at startup
const required = ['MONGO_URI', 'JWT_SECRET'];
required.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

module.exports = env;
