// ─── FILE: src/utils/response.util.js ────────────────────────────────────────
'use strict';

/**
 * Factory pattern: uniform API response shapes.
 * Controllers call these helpers to ensure consistency.
 */

/**
 * Send a successful response.
 * @param {import('express').Response} res
 * @param {*} data
 * @param {string} message
 * @param {number} statusCode
 */
const success = (res, data = null, message = 'Succès', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error response.
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} statusCode
 * @param {*} errors - optional validation errors array
 */
const error = (res, message = 'Une erreur est survenue', statusCode = 500, errors = null) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { success, error };
