'use strict';

const categorieService = require('./categorie.service');
const { success } = require('../../utils/response.util');

class CategorieController {
  async getAll(req, res, next) {
    try {
      const result = await categorieService.getAll(req.query, req.user.role);
      return success(res, result, 'Catégories récupérées.');
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const categorie = await categorieService.create(req.body);
      return success(res, categorie, 'Catégorie créée.', 201);
    } catch (err) {
      return next(err);
    }
  }

  async updateById(req, res, next) {
    try {
      const categorie = await categorieService.updateById(req.params.id, req.body);
      return success(res, categorie, 'Catégorie mise à jour.');
    } catch (err) {
      return next(err);
    }
  }

  async deleteById(req, res, next) {
    try {
      await categorieService.deleteById(req.params.id);
      return success(res, null, 'Catégorie supprimée.');
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new CategorieController();
