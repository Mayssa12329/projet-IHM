// ─── FILE: src/modules/user/user.routes.js ───────────────────────────────────
'use strict';

const { Router } = require('express');
const { body, param } = require('express-validator');
const userController = require('./user.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

// All user routes require authentication
router.use(authenticate);

// ─── GET /api/users/profile ───────────────────────────────────────────────────
router.get('/profile', userController.getProfile.bind(userController));

// ─── PATCH /api/users/profile ─────────────────────────────────────────────────
router.patch(
  '/profile',
  [
    body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
    body('prenom').optional().trim().notEmpty().withMessage('Le prénom ne peut pas être vide'),
    body('photoProfil').optional().isURL().withMessage('URL de photo invalide'),
    body('motDePasse')
      .optional()
      .isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  ],
  validate,
  userController.updateProfile.bind(userController)
);

// ─── GET /api/users/notifications ────────────────────────────────────────────
router.get('/notifications', userController.getNotifications.bind(userController));

// ─── PATCH /api/users/notifications/read-all ─────────────────────────────────
router.patch(
  '/notifications/read-all',
  userController.markAllRead.bind(userController)
);

// ─── PATCH /api/users/notifications/:id/read ─────────────────────────────────
router.patch(
  '/notifications/:id/read',
  [param('id').isMongoId().withMessage('ID notification invalide')],
  validate,
  userController.markOneRead.bind(userController)
);

module.exports = router;
