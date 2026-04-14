'use strict';

const Categorie = require('../../models/Categorie');

class CategorieRepository {
  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 50 } = options;
    const skip = (page - 1) * limit;

    return Categorie.find(filter)
      .sort({ nom: 1 })
      .skip(skip)
      .limit(limit);
  }

  async countAll(filter = {}) {
    return Categorie.countDocuments(filter);
  }

  async findById(id) {
    return Categorie.findById(id);
  }

  async findByName(nom) {
    return Categorie.findOne({ nom });
  }

  async create(data) {
    const categorie = new Categorie(data);
    return categorie.save();
  }

  async updateById(id, updates) {
    return Categorie.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return Categorie.findByIdAndDelete(id);
  }
}

module.exports = new CategorieRepository();
