// ─── FILE: src/middleware/auth.middleware.js ──────────────────────────────────
'use strict';

const { verifyToken } = require('../utils/token.util');
const { error } = require('../utils/response.util');

/**
 * Protects routes by verifying the Bearer JWT token.
 * Attaches decoded { id, role } as req.user on success.
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return error(res, 'Accès refusé. Token manquant.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return error(res, 'Token expiré. Veuillez vous reconnecter.', 401);
    }
    return error(res, 'Token invalide.', 401);
  }
};

module.exports = { authenticate };
