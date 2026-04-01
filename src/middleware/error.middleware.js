// ─── FILE: src/middleware/error.middleware.js ─────────────────────────────────
'use strict';

const logger = require('../config/logger');
const env = require('../config/env');

/**
 * Global error handler. Must have 4 parameters for Express to recognise it.
 * All routes call next(err) to land here.
 */
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Erreur de validation',
      errors: messages,
    });
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'champ';
    return res.status(409).json({
      success: false,
      message: `La valeur du champ "${field}" est déjà utilisée.`,
    });
  }

  // Mongoose cast error (bad ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Identifiant invalide : ${err.value}`,
    });
  }

  // JWT errors (not caught by auth middleware)
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token invalide ou expiré.' });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
