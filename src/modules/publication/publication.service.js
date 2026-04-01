// ─── FILE: src/modules/publication/publication.service.js ────────────────────
'use strict';

const publicationRepository = require('./publication.repository');
const notificationRepository = require('../user/notification.repository');

/**
 * PublicationService — ALL business logic for publications.
 * Observer pattern: after validation/rejection, a Notification is automatically
 * created for the author.
 */
class PublicationService {
  // ─── List & Get ────────────────────────────────────────────────────────────

  async getAll(query = {}) {
    const filter = {};
    if (query.statut) filter.statut = query.statut;

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;

    const [publications, total] = await Promise.all([
      publicationRepository.findAll(filter, { page, limit }),
      publicationRepository.countAll(filter),
    ]);

    return { publications, total, page, limit };
  }

  async getById(id) {
    const publication = await publicationRepository.findById(id);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }
    return publication;
  }

  // ─── Create ────────────────────────────────────────────────────────────────

  async create(dto, userId) {
    const { titre, contenu } = dto;
    return publicationRepository.create({ titre, contenu, auteur: userId });
  }

  // ─── Validate (Observer: notify author) ────────────────────────────────────

  async valider(publicationId, moderateurId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }
    if (publication.statut !== 'en_attente') {
      const err = new Error(`Impossible de valider une publication au statut "${publication.statut}".`);
      err.statusCode = 400;
      throw err;
    }

    const updated = await publicationRepository.updateById(publicationId, {
      statut: 'publie',
      traitePar: moderateurId,
      datePublication: new Date(),
    });

    // ── Observer: notify the author ─────────────────────────────────────────
    await notificationRepository.create({
      destinataire: publication.auteur._id || publication.auteur,
      message: `Votre publication "${publication.titre}" a été validée et publiée.`,
      type: 'publication',
      lien: `/publications/${publicationId}`,
    });

    return updated;
  }

  // ─── Reject (Observer: notify author) ──────────────────────────────────────

  async rejeter(publicationId, moderateurId, raison) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }
    if (publication.statut !== 'en_attente') {
      const err = new Error(`Impossible de rejeter une publication au statut "${publication.statut}".`);
      err.statusCode = 400;
      throw err;
    }

    const updated = await publicationRepository.updateById(publicationId, {
      statut: 'rejete',
      traitePar: moderateurId,
      raisonRejet: raison || null,
    });

    // ── Observer: notify the author ─────────────────────────────────────────
    await notificationRepository.create({
      destinataire: publication.auteur._id || publication.auteur,
      message: `Votre publication "${publication.titre}" a été rejetée.${raison ? ` Raison : ${raison}` : ''}`,
      type: 'publication',
      lien: `/publications/${publicationId}`,
    });

    return updated;
  }

  // ─── Delete ────────────────────────────────────────────────────────────────

  async deleteById(publicationId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }
    // Cascade delete all associated comments
    await publicationRepository.deleteCommentsByPublication(publicationId);
    return publicationRepository.deleteById(publicationId);
  }

  // ─── Moderation Queue ─────────────────────────────────────────────────────

  async getPending(query) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;
    return publicationRepository.findPending({ page, limit });
  }

  async getModerationHistory(moderateurId, query) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;
    return publicationRepository.findModeratedByUser(moderateurId, { page, limit });
  }

  // ─── Add Comment ──────────────────────────────────────────────────────────

  async addComment(publicationId, dto, userId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }
    if (publication.statut !== 'publie') {
      const err = new Error('Impossible de commenter une publication non publiée.');
      err.statusCode = 400;
      throw err;
    }

    const commentaire = await publicationRepository.createComment({
      contenu: dto.contenu,
      auteur: userId,
      publication: publicationId,
    });

    await publicationRepository.addComment(publicationId, commentaire._id);
    return commentaire;
  }
}

module.exports = new PublicationService();
