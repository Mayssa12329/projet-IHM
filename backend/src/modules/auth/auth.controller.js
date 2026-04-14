// ─── FILE: src/modules/auth/auth.controller.js ───────────────────────────────
'use strict';

const authService = require('./auth.service');
const { success } = require('../../utils/response.util');

/**
 * AuthController — parses request, calls service, sends response.
 * Contains ZERO business logic.
 */
class AuthController {
  /**
   * POST /api/auth/register
   */
  async register(req, res, next) {
    try {
      const { nom, prenom, email, motDePasse, interets } = req.body;
      const result = await authService.register({ nom, prenom, email, motDePasse, interets });
      return success(res, result, 'Compte créé avec succès.', 201);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, motDePasse } = req.body;
      const result = await authService.login({ email, motDePasse });
      return success(res, result, 'Connexion réussie.');
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new AuthController();
