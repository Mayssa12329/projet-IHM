// ─── FILE: src/modules/moderateur/moderateur.controller.js ───────────────────
'use strict';

const moderateurService = require('./moderateur.service');
const { success } = require('../../utils/response.util');

/**
 * ModerateurController — request parsing and response only.
 * No logic here.
 */
class ModerateurController {
  // GET /api/moderateur/pending
  async getPending(req, res, next) {
    try {
      const result = await moderateurService.getPendingQueue(req.query);
      return success(res, result, 'File de modération récupérée.');
    } catch (err) {
      return next(err);
    }
  }

  // GET /api/moderateur/history
  async getHistory(req, res, next) {
    try {
      const result = await moderateurService.getModerationHistory(
        req.user.id,
        req.query
      );
      return success(res, result, 'Historique de modération récupéré.');
    } catch (err) {
      return next(err);
    }
  }

  // GET /api/moderateur/purpose
  getPurpose(req, res) {
    const description = moderateurService.descriptionPurpose();
    return success(res, { description }, 'Description du rôle modérateur.');
  }
}

module.exports = new ModerateurController();
