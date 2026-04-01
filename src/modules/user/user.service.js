// ─── FILE: src/modules/user/user.service.js ──────────────────────────────────
'use strict';

const userRepository = require('./user.repository');
const notificationRepository = require('./notification.repository');
const { hashPassword } = require('../../utils/hash.util');

/**
 * UserService — business logic for user profiles and notifications.
 */
class UserService {
  // ─── Profile ───────────────────────────────────────────────────────────────

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('Utilisateur introuvable.');
      err.statusCode = 404;
      throw err;
    }
    return user;
  }

  async updateProfile(userId, dto) {
    // Prevent role escalation through this endpoint
    const { nom, prenom, photoProfil, motDePasse } = dto;

    const updates = {};
    if (nom) updates.nom = nom;
    if (prenom) updates.prenom = prenom;
    if (photoProfil) updates.photoProfil = photoProfil;

    // Hash new password if provided
    if (motDePasse) {
      if (motDePasse.length < 8) {
        const err = new Error('Le mot de passe doit contenir au moins 8 caractères.');
        err.statusCode = 400;
        throw err;
      }
      updates.motDePasse = await hashPassword(motDePasse);
    }

    const user = await userRepository.updateById(userId, updates);
    if (!user) {
      const err = new Error('Utilisateur introuvable.');
      err.statusCode = 404;
      throw err;
    }
    return user;
  }

  // ─── Notifications ─────────────────────────────────────────────────────────

  async getNotifications(userId, query = {}) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;

    const [notifications, total, unread] = await Promise.all([
      notificationRepository.findByDestinataire(userId, { page, limit }),
      notificationRepository.countByDestinataire(userId),
      notificationRepository.countByDestinataire(userId, true),
    ]);

    return { notifications, total, unread, page, limit };
  }

  async markAllNotificationsRead(userId) {
    return notificationRepository.markAllAsRead(userId);
  }

  async markNotificationRead(notificationId, userId) {
    const notification = await notificationRepository.markOneAsRead(notificationId, userId);
    if (!notification) {
      const err = new Error('Notification introuvable.');
      err.statusCode = 404;
      throw err;
    }
    return notification;
  }
}

module.exports = new UserService();
