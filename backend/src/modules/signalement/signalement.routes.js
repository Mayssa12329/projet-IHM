'use strict';

const { Router } = require('express');
const { body, param, query } = require('express-validator');
const signalementController = require('./signalement.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/role.middleware');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

// POST /api/reports
router.post(
  '/',
  authenticate,
  [
    body('publication').isMongoId().withMessage('ID publication invalide'),
    body('raison').trim().notEmpty().withMessage('La raison est requise'),
  ],
  validate,
  signalementController.createReport.bind(signalementController)
);

// GET /api/reports
router.get(
  '/',
  authenticate,
  requireRole('moderateur', 'admin'),
  [
    query('statut')
      .optional()
      .isIn(['en_attente', 'en_cours', 'resolu'])
      .withMessage('Statut invalide'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page invalide'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite invalide'),
  ],
  validate,
  signalementController.getReports.bind(signalementController)
);

// PATCH /api/reports/:id/escalate
router.patch(
  '/:id/escalate',
  authenticate,
  requireRole('moderateur', 'admin'),
  [param('id').isMongoId().withMessage('ID signalement invalide')],
  validate,
  signalementController.escalateReport.bind(signalementController)
);

// PATCH /api/reports/:id/resolve
router.patch(
  '/:id/resolve',
  authenticate,
  requireRole('moderateur', 'admin'),
  [param('id').isMongoId().withMessage('ID signalement invalide')],
  validate,
  signalementController.resolveReport.bind(signalementController)
);

module.exports = router;
