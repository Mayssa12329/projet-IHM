'use strict';

const signalementService = require('./signalement.service');
const { success } = require('../../utils/response.util');

class SignalementController {
  async createReport(req, res, next) {
    try {
      const report = await signalementService.createReport(req.body, req.user.id);
      return success(res, report, 'Signalement créé.', 201);
    } catch (err) {
      return next(err);
    }
  }

  async getReports(req, res, next) {
    try {
      const result = await signalementService.findReports(req.query);
      return success(res, result, 'Signalements récupérés.');
    } catch (err) {
      return next(err);
    }
  }

  async escalateReport(req, res, next) {
    try {
      const report = await signalementService.escalateReport(req.params.id, req.user.id);
      return success(res, report, 'Signalement escaladé.');
    } catch (err) {
      return next(err);
    }
  }

  async resolveReport(req, res, next) {
    try {
      const report = await signalementService.resolveReport(req.params.id, req.user.id);
      return success(res, report, 'Signalement résolu.');
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new SignalementController();
