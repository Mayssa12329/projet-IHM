// ─── FILE: src/modules/publication/publication.repository.js ─────────────────
'use strict';

const Publication = require('../../models/Publication');
const Commentaire = require('../../models/Commentaire');

/**
 * PublicationRepository — ALL Mongoose queries for publications and comments.
 * Open/Closed: add new query methods without modifying existing ones.
 */
class PublicationRepository {
  // ─── Publications ───────────────────────────────────────────────────────────

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    return Publication.find(filter)
      .populate('auteur', 'nom prenom email role photoProfil')
      .populate('traitePar', 'nom prenom email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async countAll(filter = {}) {
    return Publication.countDocuments(filter);
  }

  async findById(id) {
    return Publication.findById(id)
      .populate('auteur', 'nom prenom email role photoProfil')
      .populate('traitePar', 'nom prenom email')
      .populate({
        path: 'commentaires',
        populate: { path: 'auteur', select: 'nom prenom email' },
      });
  }

  async create(data) {
    const publication = new Publication(data);
    return publication.save();
  }

  async updateById(id, updates) {
    return Publication.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return Publication.findByIdAndDelete(id);
  }

  async findPending(options = {}) {
    return this.findAll({ statut: 'en_attente' }, options);
  }

  async findModeratedByUser(moderateurId, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;
    return Publication.find({ traitePar: moderateurId })
      .populate('auteur', 'nom prenom email')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  // ─── Comments ───────────────────────────────────────────────────────────────

  async addComment(publicationId, commentaireId) {
    return Publication.findByIdAndUpdate(
      publicationId,
      { $push: { commentaires: commentaireId } },
      { new: true }
    );
  }

  async createComment(data) {
    const commentaire = new Commentaire(data);
    return commentaire.save();
  }

  async deleteCommentsByPublication(publicationId) {
    return Commentaire.deleteMany({ publication: publicationId });
  }
}

module.exports = new PublicationRepository();
