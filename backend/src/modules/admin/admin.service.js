// ─── FILE: src/modules/admin/admin.service.js ────────────────────────────────
'use strict';

const adminRepository = require('./admin.repository');

/**
 * AdminService — business logic for all admin-level operations.
 * Applies Liskov principle: admin inherits all user + moderateur capabilities.
 */
class AdminService {
  // ─── List Users ────────────────────────────────────────────────────────────

  async getAllUsers(query = {}) {
    const filter = {};
    if (query.role) filter.role = query.role;
    if (query.estActif !== undefined) filter.estActif = query.estActif === 'true';

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;

    const [users, total] = await Promise.all([
      adminRepository.findAllUsers(filter, { page, limit }),
      adminRepository.countUsers(filter),
    ]);

    return { users, total, page, limit };
  }

  // ─── Change Role ───────────────────────────────────────────────────────────

  async changeRole(userId, newRole, requestingAdminId) {
    if (userId === requestingAdminId) {
      const err = new Error('Un administrateur ne peut pas modifier son propre rôle.');
      err.statusCode = 400;
      throw err;
    }

    const user = await adminRepository.findUserById(userId);
    if (!user) {
      const err = new Error('Utilisateur introuvable.');
      err.statusCode = 404;
      throw err;
    }

    const validRoles = ['user', 'moderateur', 'admin'];
    if (!validRoles.includes(newRole)) {
      const err = new Error(`Rôle invalide. Les rôles acceptés sont : ${validRoles.join(', ')}.`);
      err.statusCode = 400;
      throw err;
    }

    return adminRepository.updateUserById(userId, { role: newRole });
  }

  // ─── Toggle Active ─────────────────────────────────────────────────────────

  async toggleActive(userId, requestingAdminId) {
    if (userId === requestingAdminId) {
      const err = new Error('Un administrateur ne peut pas se désactiver lui-même.');
      err.statusCode = 400;
      throw err;
    }

    const user = await adminRepository.findUserById(userId);
    if (!user) {
      const err = new Error('Utilisateur introuvable.');
      err.statusCode = 404;
      throw err;
    }

    return adminRepository.updateUserById(userId, { estActif: !user.estActif });
  }

  // ─── Delete User ───────────────────────────────────────────────────────────

  async deleteUser(userId, requestingAdminId) {
    if (userId === requestingAdminId) {
      const err = new Error('Un administrateur ne peut pas supprimer son propre compte.');
      err.statusCode = 400;
      throw err;
    }

    const user = await adminRepository.findUserById(userId);
    if (!user) {
      const err = new Error('Utilisateur introuvable.');
      err.statusCode = 404;
      throw err;
    }

    return adminRepository.deleteUserById(userId);
  }

  // ─── Platform Stats ────────────────────────────────────────────────────────

  async getStats() {
    const [publicationsByStatus, totalCommentaires, usersByRole] = await Promise.all([
      adminRepository.countPublicationsByStatus(),
      adminRepository.countTotalCommentaires(),
      adminRepository.countUsersByRole(),
    ]);

    return { publicationsByStatus, totalCommentaires, usersByRole };
  }
}

module.exports = new AdminService();
