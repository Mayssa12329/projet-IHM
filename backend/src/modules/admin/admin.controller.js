// ─── FILE: src/modules/admin/admin.controller.js ─────────────────────────────
'use strict';

const adminService = require('./admin.service');
const { success } = require('../../utils/response.util');

/**
 * AdminController — parses requests, calls service, sends uniform responses.
 * No business logic lives here.
 */
class AdminController {
  // GET /api/admin/users
  async getAllUsers(req, res, next) {
    try {
      const result = await adminService.getAllUsers(req.query);
      return success(res, result, 'Utilisateurs récupérés.');
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/admin/users/:id/role
  async changeRole(req, res, next) {
    try {
      const user = await adminService.changeRole(
        req.params.id,
        req.body.role,
        req.user.id
      );
      return success(res, user, 'Rôle mis à jour.');
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/admin/users/:id/toggle
  async toggleActive(req, res, next) {
    try {
      const user = await adminService.toggleActive(req.params.id, req.user.id);
      const msg = user.estActif ? 'Compte activé.' : 'Compte désactivé.';
      return success(res, user, msg);
    } catch (err) {
      return next(err);
    }
  }

  // DELETE /api/admin/users/:id
  async deleteUser(req, res, next) {
    try {
      await adminService.deleteUser(req.params.id, req.user.id);
      return success(res, null, 'Utilisateur supprimé.');
    } catch (err) {
      return next(err);
    }
  }

  // GET /api/admin/stats
  async getStats(req, res, next) {
    try {
      const stats = await adminService.getStats();
      return success(res, stats, 'Statistiques récupérées.');
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new AdminController();
