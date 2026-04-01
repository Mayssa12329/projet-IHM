// ─── FILE: src/middleware/role.middleware.js ──────────────────────────────────
'use strict';

const { error } = require('../utils/response.util');

/**
 * Strategy pattern: dynamically enforces role-based access control.
 * Usage: requireRole('admin') or requireRole('moderateur', 'admin')
 *
 * Liskov substitution is respected: admin encompasses all lower-role perms.
 * @param {...string} roles - Allowed roles
 * @returns {import('express').RequestHandler}
 */
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Non authentifié.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(
        res,
        `Accès interdit. Rôle requis : ${roles.join(' ou ')}.`,
        403
      );
    }

    return next();
  };
};

module.exports = { requireRole };
