// ─── FILE: src/modules/publication/publication.service.js ────────────────────
'use strict';

const publicationRepository = require('./publication.repository');
const notificationRepository = require('../user/notification.repository');
const categorieService = require('../categorie/categorie.service');

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
    if (query.categorie) filter.categorie = query.categorie;
    if (query.categories) filter.categorie = { $in: query.categories.split(',') };

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
    const { titre, contenu, categorie } = dto;

    if (categorie) {
      await categorieService.ensureExistsAndActive(categorie);
    }

    return publicationRepository.create({
      titre,
      contenu,
      auteur: userId,
      categorie: categorie || null,
    });
  }

  async updateById(publicationId, dto, userId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }

    if (String(publication.auteur._id || publication.auteur) !== String(userId)) {
      const err = new Error('Vous ne pouvez modifier que vos propres publications.');
      err.statusCode = 403;
      throw err;
    }

    if (publication.statut !== 'en_attente') {
      const err = new Error('Cette publication ne peut plus être modifiée car elle n\'est plus en attente.');
      err.statusCode = 400;
      throw err;
    }

    const updates = {};
    if (dto.titre !== undefined) updates.titre = dto.titre;
    if (dto.contenu !== undefined) updates.contenu = dto.contenu;

    if (dto.categorie !== undefined) {
      await categorieService.ensureExistsAndActive(dto.categorie);
      updates.categorie = dto.categorie;
    }

    const updated = await publicationRepository.updateEditableById(
      publicationId,
      userId,
      updates
    );

    if (!updated) {
      const err = new Error('Cette publication ne peut plus être modifiée car son statut a changé.');
      err.statusCode = 400;
      throw err;
    }

    return updated;
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

  // ─── Likes & Shares ───────────────────────────────────────────────────────

  async like(publicationId, userId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }

    if (publication.likes?.some((id) => String(id) === String(userId))) {
      const err = new Error('Vous avez déjà liké cette publication.');
      err.statusCode = 400;
      throw err;
    }

    const updated = await publicationRepository.addLikeIfNotExists(publicationId, userId);
    if (!updated) {
      const err = new Error('Vous avez déjà liké cette publication.');
      err.statusCode = 400;
      throw err;
    }

    return updated;
  }

  async unlike(publicationId, userId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }

    if (!publication.likes?.some((id) => String(id) === String(userId))) {
      const err = new Error('Vous n\'avez pas encore liké cette publication.');
      err.statusCode = 400;
      throw err;
    }

    const updated = await publicationRepository.removeLikeIfExists(publicationId, userId);
    if (!updated) {
      const err = new Error('Impossible de retirer le like.');
      err.statusCode = 400;
      throw err;
    }

    return updated;
  }

  async share(publicationId) {
    const publication = await publicationRepository.findById(publicationId);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }

    return publicationRepository.incrementShares(publicationId);
  }
}

module.exports = new PublicationService();
