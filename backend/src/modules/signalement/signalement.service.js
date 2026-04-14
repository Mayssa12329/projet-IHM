'use strict';

const signalementRepository = require('./signalement.repository');
const publicationRepository = require('../publication/publication.repository');

class SignalementService {
  async createReport(dto, auteurId) {
    const publication = await publicationRepository.findById(dto.publication);
    if (!publication) {
      const err = new Error('Publication introuvable.');
      err.statusCode = 404;
      throw err;
    }

    const duplicate = await signalementRepository.findByAuteurAndPublication(
      auteurId,
      dto.publication
    );
    if (duplicate) {
      const err = new Error('Vous avez déjà signalé cette publication.');
      err.statusCode = 400;
      throw err;
    }

    try {
      return await signalementRepository.createReport({
        auteur: auteurId,
        publication: dto.publication,
        raison: dto.raison,
      });
    } catch (error) {
      if (error?.code === 11000) {
        const err = new Error('Vous avez déjà signalé cette publication.');
        err.statusCode = 400;
        throw err;
      }
      throw error;
    }
  }

  async findReports(query = {}) {
    const filter = {};
    if (query.statut) filter.statut = query.statut;

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 20;

    const [reports, total] = await Promise.all([
      signalementRepository.findReports(filter, { page, limit }),
      signalementRepository.countReports(filter),
    ]);

    return { reports, total, page, limit };
  }

  async escalateReport(id, moderateurId) {
    const report = await signalementRepository.findById(id);
    if (!report) {
      const err = new Error('Signalement introuvable.');
      err.statusCode = 404;
      throw err;
    }

    if (report.statut !== 'en_attente') {
      const err = new Error('Seuls les signalements en attente peuvent être escaladés.');
      err.statusCode = 400;
      throw err;
    }

    return signalementRepository.updateReportStatus(id, {
      statut: 'en_cours',
      traitePar: moderateurId,
    });
  }

  async resolveReport(id, moderateurId) {
    const report = await signalementRepository.findById(id);
    if (!report) {
      const err = new Error('Signalement introuvable.');
      err.statusCode = 404;
      throw err;
    }

    if (report.statut === 'resolu') {
      const err = new Error('Ce signalement est déjà résolu.');
      err.statusCode = 400;
      throw err;
    }

    if (report.statut !== 'en_cours') {
      const err = new Error('Un signalement doit être en cours avant résolution.');
      err.statusCode = 400;
      throw err;
    }

    return signalementRepository.updateReportStatus(id, {
      statut: 'resolu',
      traitePar: moderateurId,
    });
  }
}

module.exports = new SignalementService();
