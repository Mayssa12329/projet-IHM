// ─── FILE: src/modules/user/user.repository.js ───────────────────────────────
'use strict';

const User = require('../../models/User');

/**
 * UserRepository — DB queries for reading and updating user profiles.
 */
class UserRepository {
  async findById(id) {
    return User.findById(id);
  }

  async updateById(id, updates) {
    return User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }
}

module.exports = new UserRepository();
