// ─── FILE: src/modules/auth/auth.service.js ──────────────────────────────────
'use strict';

const authRepository = require('./auth.repository');
const { hashPassword, comparePassword } = require('../../utils/hash.util');
const { generateToken } = require('../../utils/token.util');

/**
 * AuthService — contains ALL business logic for authentication.
 * Never touches req/res; only talks to the repository.
 */
class AuthService {
  /**
   * Register a new user.
   * @param {Object} dto - { nom, prenom, email, motDePasse }
   * @returns {Promise<{user: User, token: string}>}
   */
  async register(dto) {
    const { nom, prenom, email, motDePasse, interets } = dto;

    const existing = await authRepository.findByEmail(email);
    if (existing) {
      const err = new Error('Un compte avec cet email existe d\u00e9j\u00e0.');
      err.statusCode = 409;
      throw err;
    }

    const hashed = await hashPassword(motDePasse);
    const user = await authRepository.create({
      nom,
      prenom,
      email,
      motDePasse: hashed,
      interets: interets || []
    });

    const token = generateToken({ id: user._id, role: user.role });
    return { user, token };
  }

  /**
   * Authenticate an existing user.
   * @param {Object} dto - { email, motDePasse }
   * @returns {Promise<{user: User, token: string}>}
   */
  async login(dto) {
    const { email, motDePasse } = dto;

    const user = await authRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Email ou mot de passe incorrect.');
      err.statusCode = 401;
      throw err;
    }

    if (!user.estActif) {
      const err = new Error('Ce compte a été désactivé. Contactez un administrateur.');
      err.statusCode = 403;
      throw err;
    }

    const isMatch = await comparePassword(motDePasse, user.motDePasse);
    if (!isMatch) {
      const err = new Error('Email ou mot de passe incorrect.');
      err.statusCode = 401;
      throw err;
    }

    const token = generateToken({ id: user._id, role: user.role });

    // Strip password before returning
    user.motDePasse = undefined;
    return { user, token };
  }
}

module.exports = new AuthService();
