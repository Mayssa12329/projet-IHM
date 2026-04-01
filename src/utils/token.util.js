// ─── FILE: src/utils/token.util.js ───────────────────────────────────────────
'use strict';

const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generates a signed JWT containing only { id, role }.
 * @param {Object} payload - Must have id and role
 * @returns {string} Signed JWT token
 */
const generateToken = ({ id, role }) => {
  if (!id || !role) {
    throw new Error('generateToken requires both id and role');
  }
  return jwt.sign({ id, role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * Verifies and decodes a JWT token.
 * @param {string} token
 * @returns {Object} Decoded payload { id, role, iat, exp }
 * @throws JsonWebTokenError | TokenExpiredError
 */
const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
