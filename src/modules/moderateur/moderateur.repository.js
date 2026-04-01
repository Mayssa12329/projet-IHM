// ─── FILE: src/modules/moderateur/moderateur.repository.js ───────────────────
'use strict';

const Publication = require('../../models/Publication');

/**
 * ModerateurRepository — DB queries specific to moderation views.
 * The publication-altering queries live in publication.repository.js
 * to respect Single Responsibility.
 */
class ModerateurRepository {
  /**
   * Get all publications with a given status, with pagination.
   * Used for the pending queue and filtered history views.
   */
  async findByStatut(statut, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    return Publication.find({ statut })
      .populate('auteur', 'nom prenom email photoProfil')
      .sort({ createdAt: 1 }) // Oldest first for the queue
      .skip(skip)
      .limit(limit);
  }

  async countByStatut(statut) {
    return Publication.countDocuments({ statut });
  }

  /**
   * Get publications processed by a specific moderateur, optionally filtered.
   */
  async findHistoryByModerateur(moderateurId, options = {}) {
    const { page = 1, limit = 20, statut } = options;
    const skip = (page - 1) * limit;

    const filter = { traitePar: moderateurId };
    if (statut) filter.statut = statut;

    return Publication.find(filter)
      .populate('auteur', 'nom prenom email')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async countHistoryByModerateur(moderateurId, statut) {
    const filter = { traitePar: moderateurId };
    if (statut) filter.statut = statut;
    return Publication.countDocuments(filter);
  }
}

module.exports = new ModerateurRepository();
