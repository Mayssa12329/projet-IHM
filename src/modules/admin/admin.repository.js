// ─── FILE: src/modules/admin/admin.repository.js ─────────────────────────────
'use strict';

const User = require('../../models/User');
const Publication = require('../../models/Publication');
const Commentaire = require('../../models/Commentaire');

/**
 * AdminRepository — ALL direct DB operations for admin features.
 */
class AdminRepository {
  // ─── Users ─────────────────────────────────────────────────────────────────

  async findAllUsers(filter = {}, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    return User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
  }

  async countUsers(filter = {}) {
    return User.countDocuments(filter);
  }

  async findUserById(id) {
    return User.findById(id);
  }

  async updateUserById(id, updates) {
    return User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }

  async deleteUserById(id) {
    return User.findByIdAndDelete(id);
  }

  // ─── Stats ─────────────────────────────────────────────────────────────────

  async countPublicationsByStatus() {
    return Publication.aggregate([
      { $group: { _id: '$statut', count: { $sum: 1 } } },
    ]);
  }

  async countTotalCommentaires() {
    return Commentaire.countDocuments();
  }

  async countUsersByRole() {
    return User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);
  }
}

module.exports = new AdminRepository();
