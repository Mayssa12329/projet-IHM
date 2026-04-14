// ─── FILE: src/modules/publication/publication.routes.js ─────────────────────
'use strict';

const { Router } = require('express');
const { body, query, param } = require('express-validator');
const publicationController = require('./publication.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/role.middleware');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

// ─── GET /api/publications (all roles, optional ?statut=) ─────────────────────
router.get(
  '/',
  authenticate,
  [
    query('statut')
      .optional()
      .isIn(['en_attente', 'publie', 'rejete', 'archive'])
      .withMessage('Statut invalide'),
  ],
  validate,
  publicationController.getAll.bind(publicationController)
);

// ─── GET /api/publications/:id ────────────────────────────────────────────────
router.get(
  '/:id',
  authenticate,
  [param('id').isMongoId().withMessage('ID invalide')],
  validate,
  publicationController.getById.bind(publicationController)
);

// ─── POST /api/publications (user, moderateur, admin) ────────────────────────
router.post(
  '/',
  authenticate,
  requireRole('user', 'moderateur', 'admin'),
  [
    body('titre').trim().notEmpty().withMessage('Le titre est requis'),
    body('contenu').trim().notEmpty().withMessage('Le contenu est requis'),
    body('categorie').optional().isMongoId().withMessage('ID catégorie invalide'),
  ],
  validate,
  publicationController.create.bind(publicationController)
);

// ─── PATCH /api/publications/:id (owner-only, pending-only) ────────────────
router.patch(
  '/:id',
  authenticate,
  requireRole('user', 'moderateur', 'admin'),
  [
    param('id').isMongoId().withMessage('ID invalide'),
    body('titre').optional().trim().notEmpty().withMessage('Le titre ne peut pas être vide'),
    body('contenu').optional().trim().notEmpty().withMessage('Le contenu ne peut pas être vide'),
    body('categorie').optional().isMongoId().withMessage('ID catégorie invalide'),
    body().custom((value) => {
      if (
        value.titre === undefined &&
        value.contenu === undefined &&
        value.categorie === undefined
      ) {
        throw new Error('Au moins un champ à modifier est requis.');
      }
      return true;
    }),
  ],
  validate,
  publicationController.updateById.bind(publicationController)
);

// ─── PATCH /api/publications/:id/valider (moderateur, admin) ─────────────────
router.patch(
  '/:id/valider',
  authenticate,
  requireRole('moderateur', 'admin'),
  [param('id').isMongoId().withMessage('ID invalide')],
  validate,
  publicationController.valider.bind(publicationController)
);

// ─── PATCH /api/publications/:id/rejeter (moderateur, admin) ─────────────────
router.patch(
  '/:id/rejeter',
  authenticate,
  requireRole('moderateur', 'admin'),
  [
    param('id').isMongoId().withMessage('ID invalide'),
    body('raison').optional().trim().isLength({ max: 500 }),
  ],
  validate,
  publicationController.rejeter.bind(publicationController)
);

// ─── DELETE /api/publications/:id (admin only) ───────────────────────────────
router.delete(
  '/:id',
  authenticate,
  requireRole('admin'),
  [param('id').isMongoId().withMessage('ID invalide')],
  validate,
  publicationController.deleteById.bind(publicationController)
);

// ─── POST /api/publications/:id/commentaires ─────────────────────────────────
router.post(
  '/:id/commentaires',
  authenticate,
  requireRole('user', 'moderateur', 'admin'),
  [
    param('id').isMongoId().withMessage('ID invalide'),
    body('contenu').trim().notEmpty().withMessage('Le contenu du commentaire est requis'),
  ],
  validate,
  publicationController.addComment.bind(publicationController)
);

// ─── POST /api/publications/:id/likes ───────────────────────────────────────
router.post(
  '/:id/likes',
  authenticate,
  requireRole('user', 'moderateur', 'admin'),
  [param('id').isMongoId().withMessage('ID invalide')],
  validate,
  publicationController.like.bind(publicationController)
);

// ─── DELETE /api/publications/:id/likes ─────────────────────────────────────
router.delete(
  '/:id/likes',
  authenticate,
  requireRole('user', 'moderateur', 'admin'),
  [param('id').isMongoId().withMessage('ID invalide')],
  validate,
  publicationController.unlike.bind(publicationController)
);

// ─── POST /api/publications/:id/shares ──────────────────────────────────────
router.post(
  '/:id/shares',
  authenticate,
  requireRole('user', 'moderateur', 'admin'),
  [param('id').isMongoId().withMessage('ID invalide')],
  validate,
  publicationController.share.bind(publicationController)
);

module.exports = router;
