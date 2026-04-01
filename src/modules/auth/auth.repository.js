// ─── FILE: src/modules/auth/auth.repository.js ───────────────────────────────
'use strict';

const User = require('../../models/User');

/**
 * AuthRepository — handles ALL direct DB operations for authentication.
 * No business logic here; services consume this class.
 */
class AuthRepository {
  /**
   * Find a user by email, optionally selecting the password field.
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    return User.findOne({ email }).select('+motDePasse');
  }

  /**
   * Create and persist a new user document.
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }

  /**
   * Find a user by ID (no password field).
   * @param {string} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    return User.findById(id);
  }
}

module.exports = new AuthRepository();
