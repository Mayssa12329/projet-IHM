// ─── FILE: src/modules/moderateur/moderateur.service.js ──────────────────────
'use strict';

const moderateurRepository = require('./moderateur.repository');

/**
 * ModerateurService — business logic for the moderation queue and history.
 * Implements descriptionPurpose, gererPublication, and searchModerationDate
 * as described in the domain spec.
 */
class ModerateurService {
  /**
   * descriptionPurpose — returns a human-readable description of
   * this module's purpose (domain method).
   */
  descriptionPurpose() {
    return (
      'Le modérateur est responsable de la validation et du rejet des ' +
      'publications soumises par les utilisateurs, afin de garantir la ' +
      "conformité du contenu avec les règles de la plateforme."
    );
  }

  /**
   * getPendingQueue — gererPublication: fetch the moderation queue.
   */
  async getPendingQueue(query = {}) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;

    const [publications, total] = await Promise.all([
      moderateurRepository.findByStatut('en_attente', { page, limit }),
      moderateurRepository.countByStatut('en_attente'),
    ]);

    return { publications, total, page, limit };
  }

  /**
   * getModerationHistory — searchModerationDate: get publications already
   * processed by the requesting moderateur (or all, for admin).
   * @param {string} moderateurId
   * @param {Object} query
   */
  async getModerationHistory(moderateurId, query = {}) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;
    const statut = query.statut || null;

    const [publications, total] = await Promise.all([
      moderateurRepository.findHistoryByModerateur(moderateurId, { page, limit, statut }),
      moderateurRepository.countHistoryByModerateur(moderateurId, statut),
    ]);

    return { publications, total, page, limit };
  }
}

module.exports = new ModerateurService();
