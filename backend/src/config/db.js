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
    logger.warn(`⚠️  MongoDB connection error: ${error.message}`);
    logger.warn('📌 Assurez-vous que MongoDB est en cours d\'exécution: mongosh');
    
    // En développement, on continue sans MongoDB pour tester rapidement
    if (env.NODE_ENV === 'development') {
      logger.warn('🔧 Mode dev: application démarrée sans MongoDB');
      logger.warn('   Les données ne seront pas persistées.');
      return;
    }
    
    // En production, on arrête le serveur
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  logger.warn('MongoDB disconnected');
});

module.exports = connectDB;
