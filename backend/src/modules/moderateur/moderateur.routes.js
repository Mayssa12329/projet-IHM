// ─── FILE: src/modules/moderateur/moderateur.routes.js ───────────────────────
'use strict';

const { Router } = require('express');
const { query } = require('express-validator');
const moderateurController = require('./moderateur.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/role.middleware');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

// All routes require authentication + moderateur or admin role
router.use(authenticate, requireRole('moderateur', 'admin'));

// ─── GET /api/moderateur/purpose ──────────────────────────────────────────────
router.get('/purpose', moderateurController.getPurpose.bind(moderateurController));

// ─── GET /api/moderateur/pending ──────────────────────────────────────────────
router.get(
  '/pending',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page invalide'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite invalide'),
  ],
  validate,
  moderateurController.getPending.bind(moderateurController)
);

// ─── GET /api/moderateur/history ──────────────────────────────────────────────
router.get(
  '/history',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page invalide'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite invalide'),
    query('statut')
      .optional()
      .isIn(['publie', 'rejete', 'archive'])
      .withMessage('Statut invalide'),
  ],
  validate,
  moderateurController.getHistory.bind(moderateurController)
);

module.exports = router;
