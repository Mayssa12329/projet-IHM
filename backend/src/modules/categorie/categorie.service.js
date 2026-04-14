'use strict';

const categorieRepository = require('./categorie.repository');

class CategorieService {
  async getAll(query = {}, userRole = 'user') {
    const filter = {};

    // Default behavior: return only active categories unless explicitly requested.
    const includeAll = query.all === 'true' && userRole === 'admin';
    if (!includeAll) {
      filter.estActive = true;
    }

    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 50;

    const [categories, total] = await Promise.all([
      categorieRepository.findAll(filter, { page, limit }),
      categorieRepository.countAll(filter),
    ]);

    return { categories, total, page, limit };
  }

  async create(dto) {
    const nom = dto.nom.trim();
    const description = dto.description?.trim() || null;

    const existing = await categorieRepository.findByName(nom);
    if (existing) {
      const err = new Error('Une catégorie avec ce nom existe déjà.');
      err.statusCode = 409;
      throw err;
    }

    return categorieRepository.create({
      nom,
      description,
      estActive: dto.estActive ?? true,
    });
  }

  async updateById(id, dto) {
    const updates = {};

    if (dto.nom !== undefined) updates.nom = dto.nom.trim();
    if (dto.description !== undefined) updates.description = dto.description?.trim() || null;
    if (dto.estActive !== undefined) updates.estActive = dto.estActive;

    if (updates.nom) {
      const existing = await categorieRepository.findByName(updates.nom);
      if (existing && String(existing._id) !== String(id)) {
        const err = new Error('Une catégorie avec ce nom existe déjà.');
        err.statusCode = 409;
        throw err;
      }
    }

    const categorie = await categorieRepository.updateById(id, updates);
    if (!categorie) {
      const err = new Error('Catégorie introuvable.');
      err.statusCode = 404;
      throw err;
    }

    return categorie;
  }

  async deleteById(id) {
    const categorie = await categorieRepository.deleteById(id);
    if (!categorie) {
      const err = new Error('Catégorie introuvable.');
      err.statusCode = 404;
      throw err;
    }

    return categorie;
  }

  async ensureExistsAndActive(id) {
    const categorie = await categorieRepository.findById(id);
    if (!categorie) {
      const err = new Error('Catégorie introuvable.');
      err.statusCode = 400;
      throw err;
    }

    if (!categorie.estActive) {
      const err = new Error('La catégorie sélectionnée est inactive.');
      err.statusCode = 400;
      throw err;
    }

    return categorie;
  }
}

module.exports = new CategorieService();
