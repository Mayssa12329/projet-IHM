// ─── FILE: src/models/Publication.js ─────────────────────────────────────────
'use strict';

const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
      maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    },
    contenu: {
      type: String,
      required: [true, 'Le contenu est requis'],
      trim: true,
    },
    auteur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "L'auteur est requis"],
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categorie',
      default: null,
    },
    statut: {
      type: String,
      enum: ['en_attente', 'publie', 'rejete', 'archive'],
      default: 'en_attente',
    },
    datePublication: {
      type: Date,
      default: null,
    },
    commentaires: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commentaire',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    nombrePartages: {
      type: Number,
      default: 0,
      min: [0, 'Le nombre de partages ne peut pas être négatif'],
    },
    traitePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    raisonRejet: {
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

publicationSchema.virtual('likesCount').get(function () {
  return this.likes?.length || 0;
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
publicationSchema.index({ statut: 1 });
publicationSchema.index({ auteur: 1 });
publicationSchema.index({ categorie: 1 });
publicationSchema.index({ likes: 1 });
publicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Publication', publicationSchema);
