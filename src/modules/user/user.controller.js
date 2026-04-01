// ─── FILE: src/modules/user/user.controller.js ───────────────────────────────
'use strict';

const userService = require('./user.service');
const { success } = require('../../utils/response.util');

/**
 * UserController — request parsing, service delegation, response only.
 */
class UserController {
  // GET /api/users/profile
  async getProfile(req, res, next) {
    try {
      const user = await userService.getProfile(req.user.id);
      return success(res, user, 'Profil récupéré.');
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/users/profile
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateProfile(req.user.id, req.body);
      return success(res, user, 'Profil mis à jour.');
    } catch (err) {
      return next(err);
    }
  }

  // GET /api/users/notifications
  async getNotifications(req, res, next) {
    try {
      const result = await userService.getNotifications(req.user.id, req.query);
      return success(res, result, 'Notifications récupérées.');
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/users/notifications/read-all
  async markAllRead(req, res, next) {
    try {
      await userService.markAllNotificationsRead(req.user.id);
      return success(res, null, 'Toutes les notifications marquées comme lues.');
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/users/notifications/:id/read
  async markOneRead(req, res, next) {
    try {
      const notification = await userService.markNotificationRead(
        req.params.id,
        req.user.id
      );
      return success(res, notification, 'Notification marquée comme lue.');
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UserController();
