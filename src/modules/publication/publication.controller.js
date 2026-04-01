// ─── FILE: src/modules/publication/publication.controller.js ─────────────────
'use strict';

const publicationService = require('./publication.service');
const { success } = require('../../utils/response.util');

/**
 * PublicationController — parses requests, delegates to service, returns responses.
 * No business logic here.
 */
class PublicationController {
  // GET /api/publications
  async getAll(req, res, next) {
    try {
      const result = await publicationService.getAll(req.query);
      return success(res, result, 'Publications récupérées.');
    } catch (err) {
      return next(err);
    }
  }

  // GET /api/publications/:id
  async getById(req, res, next) {
    try {
      const publication = await publicationService.getById(req.params.id);
      return success(res, publication, 'Publication récupérée.');
    } catch (err) {
      return next(err);
    }
  }

  // POST /api/publications
  async create(req, res, next) {
    try {
      const publication = await publicationService.create(req.body, req.user.id);
      return success(res, publication, 'Publication créée et en attente de modération.', 201);
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/publications/:id/valider
  async valider(req, res, next) {
    try {
      const publication = await publicationService.valider(req.params.id, req.user.id);
      return success(res, publication, 'Publication validée et publiée.');
    } catch (err) {
      return next(err);
    }
  }

  // PATCH /api/publications/:id/rejeter
  async rejeter(req, res, next) {
    try {
      const publication = await publicationService.rejeter(
        req.params.id,
        req.user.id,
        req.body.raison
      );
      return success(res, publication, 'Publication rejetée.');
    } catch (err) {
      return next(err);
    }
  }

  // DELETE /api/publications/:id
  async deleteById(req, res, next) {
    try {
      await publicationService.deleteById(req.params.id);
      return success(res, null, 'Publication supprimée.');
    } catch (err) {
      return next(err);
    }
  }

  // POST /api/publications/:id/commentaires
  async addComment(req, res, next) {
    try {
      const commentaire = await publicationService.addComment(
        req.params.id,
        req.body,
        req.user.id
      );
      return success(res, commentaire, 'Commentaire ajouté.', 201);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new PublicationController();
