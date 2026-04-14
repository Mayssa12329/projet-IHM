// ─── FILE: src/modules/admin/admin.routes.js ─────────────────────────────────
'use strict';

const { Router } = require('express');
const { body, param, query } = require('express-validator');
const adminController = require('./admin.controller');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/role.middleware');
const { validate } = require('../../middleware/validate.middleware');

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate, requireRole('admin'));

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
router.get(
  '/users',
  [
    query('role')
      .optional()
      .isIn(['user', 'moderateur', 'admin'])
      .withMessage('Rôle invalide'),
    query('estActif')
      .optional()
      .isIn(['true', 'false'])
      .withMessage('estActif doit être true ou false'),
  ],
  validate,
  adminController.getAllUsers.bind(adminController)
);

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
router.get('/stats', adminController.getStats.bind(adminController));

// ─── PATCH /api/admin/users/:id/role ─────────────────────────────────────────
router.patch(
  '/users/:id/role',
  [
    param('id').isMongoId().withMessage('ID utilisateur invalide'),
    body('role')
      .isIn(['user', 'moderateur', 'admin'])
      .withMessage('Rôle invalide. Valeurs acceptées : user, moderateur, admin'),
  ],
  validate,
  adminController.changeRole.bind(adminController)
);

// ─── PATCH /api/admin/users/:id/toggle ───────────────────────────────────────
router.patch(
  '/users/:id/toggle',
  [param('id').isMongoId().withMessage('ID utilisateur invalide')],
  validate,
  adminController.toggleActive.bind(adminController)
);

// ─── DELETE /api/admin/users/:id ─────────────────────────────────────────────
router.delete(
  '/users/:id',
  [param('id').isMongoId().withMessage('ID utilisateur invalide')],
  validate,
  adminController.deleteUser.bind(adminController)
);

module.exports = router;
