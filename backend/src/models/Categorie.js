'use strict';

const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Le nom de la catégorie est requis'],
      trim: true,
      unique: true,
      maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères'],
    },
    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: [500, 'La description ne peut pas dépasser 500 caractères'],
    },
    estActive: {
      type: Boolean,
      default: true,
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

categorieSchema.index({ nom: 1 }, { unique: true });
categorieSchema.index({ estActive: 1 });

module.exports = mongoose.model('Categorie', categorieSchema);
