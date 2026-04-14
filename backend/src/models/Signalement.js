'use strict';

const mongoose = require('mongoose');

const signalementSchema = new mongoose.Schema(
  {
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Le créateur du signalement est requis'],
    },
    publication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publication',
      required: [true, 'La publication signalée est requise'],
    },
    raison: {
      type: String,
      required: [true, 'La raison du signalement est requise'],
      trim: true,
      maxlength: [1000, 'La raison ne peut pas dépasser 1000 caractères'],
    },
    statut: {
      type: String,
      enum: ['en_attente', 'en_cours', 'resolu'],
      default: 'en_attente',
    },
    traitePar: {
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

signalementSchema.index({ publication: 1 });
signalementSchema.index({ statut: 1 });
signalementSchema.index({ auteur: 1 });
signalementSchema.index({ auteur: 1, publication: 1 }, { unique: true });

module.exports = mongoose.model('Signalement', signalementSchema);
