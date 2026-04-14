// ─── FILE: src/middleware/validate.middleware.js ──────────────────────────────
'use strict';

const { validationResult } = require('express-validator');
const { error } = require('../utils/response.util');

/**
 * Runs after express-validator chains.
 * If there are validation errors, short-circuits the request.
 */
const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array().map((e) => ({
      field: e.path,
      message: e.msg,
    }));
    return error(res, 'Données invalides', 422, errors);
  }
  return next();
};

module.exports = { validate };
