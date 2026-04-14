// ─── FILE: src/modules/auth/auth.routes.js ───────────────────────────────────
'use strict';

const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('./auth.controller');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

// ─── POST /api/auth/register ─────────────────────────────────────────────────
router.post(
  '/register',
  [
    body('nom').trim().notEmpty().withMessage('Le nom est requis'),
    body('prenom').trim().notEmpty().withMessage('Le prénom est requis'),
    body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
    body('motDePasse')
      .isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  ],
  validate,
  authController.register.bind(authController)
);

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide').normalizeEmail(),
    body('motDePasse').notEmpty().withMessage('Le mot de passe est requis'),
  ],
  validate,
  authController.login.bind(authController)
);

module.exports = router;
