// ─── FILE: src/models/Commentaire.js ─────────────────────────────────────────
'use strict';

const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema(
  {
    contenu: {
      type: String,
      required: [true, 'Le contenu du commentaire est requis'],
      trim: true,
      maxlength: [1000, 'Le commentaire ne peut pas dépasser 1000 caractères'],
    },
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'auteur est requis"],
    },
    publication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publication',
      required: [true, 'La publication est requise'],
    },
    estValide: {
      type: Boolean,
      default: false,
    },
    validerPar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
commentaireSchema.index({ publication: 1 });
commentaireSchema.index({ auteur: 1 });

module.exports = mongoose.model('Commentaire', commentaireSchema);
