// ─── FILE: src/models/User.js ─────────────────────────────────────────────────
'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
    },
    prenom: {
      type: String,
      required: [true, 'Le prénom est requis'],
      trim: true,
      maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères'],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Veuillez fournir un email valide'],
    },
    motDePasse: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
      select: false, // Never returned in queries by default
    },
    role: {
      type: String,
      enum: ['user', 'moderateur', 'admin'],
      default: 'user',
    },
    photoProfil: {
      type: String,
      default: null,
    },
    dateInscription: {
      type: Date,
      default: Date.now,
    },
    estActif: {
      type: Boolean,
      default: true,
    },
    interets: {
      type: [String],
      default: [],
    },
    // Moderateur-specific fields (only populated when role === 'moderateur')
    avertissements: {
      type: [String],
      default: undefined,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.motDePasse;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ─── Virtual: full name ───────────────────────────────────────────────────────
userSchema.virtual('nomComplet').get(function () {
  return `${this.prenom} ${this.nom}`;
});

// ─── Index ────────────────────────────────────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

module.exports = mongoose.model('User', userSchema);
