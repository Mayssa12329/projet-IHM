'use strict';

const Signalement = require('../../models/Signalement');

class SignalementRepository {
  async createReport(data) {
    const signalement = new Signalement(data);
    await signalement.save();
    return this.findById(signalement._id);
  }

  async findReports(filter = {}, options = {}) {
    const { page = 1, limit = 20 } = options;
    const skip = (page - 1) * limit;

    return Signalement.find(filter)
      .populate('auteur', 'nom prenom email role')
      .populate('publication', 'titre statut auteur categorie createdAt')
      .populate('traitePar', 'nom prenom email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async countReports(filter = {}) {
    return Signalement.countDocuments(filter);
  }

  async findById(id) {
    return Signalement.findById(id)
      .populate('auteur', 'nom prenom email role')
      .populate('publication', 'titre statut auteur categorie createdAt')
      .populate('traitePar', 'nom prenom email role');
  }

  async findByAuteurAndPublication(auteurId, publicationId) {
    return Signalement.findOne({ auteur: auteurId, publication: publicationId });
  }

  async updateReportStatus(id, updates) {
    return Signalement.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
      .populate('auteur', 'nom prenom email role')
      .populate('publication', 'titre statut auteur categorie createdAt')
      .populate('traitePar', 'nom prenom email role');
  }
}

module.exports = new SignalementRepository();
