// ─── FILE: src/config/db.js ───────────────────────────────────────────────────
'use strict';

const mongoose = require('mongoose');
const env = require('./env');
const logger = require('./logger');

/**
 * Singleton pattern: the connection is established once.
 * Mongoose itself caches the connection internally.
 */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    logger.info('Using existing MongoDB connection');
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.warn('MongoDB disconnected');
});

module.exports = connectDB;
