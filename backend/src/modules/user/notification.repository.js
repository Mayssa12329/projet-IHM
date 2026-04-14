// ─── FILE: src/modules/user/notification.repository.js ───────────────────────
'use strict';

const Notification = require('../../models/Notification');

/**
 * NotificationRepository — ALL direct DB operations for notifications.
 * Used by publication.service (Observer) and user.service (read/list).
 */
class NotificationRepository {
  async create(data) {
    const notification = new Notification(data);
    return notification.save();
  }

  async findByDestinataire(userId, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    return Notification.find({ destinataire: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async countByDestinataire(userId, onlyUnread = false) {
    const filter = { destinataire: userId };
    if (onlyUnread) filter.estLue = false;
    return Notification.countDocuments(filter);
  }

  async markAllAsRead(userId) {
    return Notification.updateMany(
      { destinataire: userId, estLue: false },
      { $set: { estLue: true } }
    );
  }

  async markOneAsRead(notificationId, userId) {
    return Notification.findOneAndUpdate(
      { _id: notificationId, destinataire: userId },
      { $set: { estLue: true } },
      { new: true }
    );
  }
}

module.exports = new NotificationRepository();
