'use strict';

const { Router } = require('express');
const { body, param, query } = require('express-validator');
const categorieController = require('./categorie.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/role.middleware');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

router.use(authenticate);

// GET /api/categories
router.get(
  '/',
  [
    query('all').optional().isIn(['true', 'false']).withMessage('all doit être true ou false'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page invalide'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limite invalide'),
  ],
  validate,
  categorieController.getAll.bind(categorieController)
);

// POST /api/categories (admin)
router.post(
  '/',
  requireRole('admin'),
  [
    body('nom').trim().notEmpty().withMessage('Le nom est requis'),
    body('description').optional().trim().isLength({ max: 500 }),
    body('estActive').optional().isBoolean().withMessage('estActive doit être booléen'),
  ],
  validate,
  categorieController.create.bind(categorieController)
);

// PATCH /api/categories/:id (admin)
router.patch(
  '/:id',
  requireRole('admin'),
  [
    param('id').isMongoId().withMessage('ID catégorie invalide'),
    body('nom').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
    body('description').optional().trim().isLength({ max: 500 }),
    body('estActive').optional().isBoolean().withMessage('estActive doit être booléen'),
  ],
  validate,
  categorieController.updateById.bind(categorieController)
);

// DELETE /api/categories/:id (admin)
router.delete(
  '/:id',
  requireRole('admin'),
  [param('id').isMongoId().withMessage('ID catégorie invalide')],
  validate,
  categorieController.deleteById.bind(categorieController)
);

module.exports = router;
