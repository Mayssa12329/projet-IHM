// ─── FILE: src/models/Notification.js ────────────────────────────────────────
'use strict';

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    destinataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Le destinataire est requis'],
    },
    message: {
      type: String,
      required: [true, 'Le message est requis'],
      trim: true,
      maxlength: [500, 'Le message ne peut pas dépasser 500 caractères'],
    },
    type: {
      type: String,
      enum: ['publication', 'commentaire', 'alerte', 'systeme'],
      required: [true, 'Le type est requis'],
    },
    estLue: {
      type: Boolean,
      default: false,
    },
    lien: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
notificationSchema.index({ destinataire: 1, estLue: 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
