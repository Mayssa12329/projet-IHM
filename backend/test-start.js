// Test de démarrage du backend
require('dotenv').config();

try {
  console.log('1. Chargement des env...');
  const env = require('./src/config/env');
  console.log(`   ✓ PORT=${env.PORT}, NODE_ENV=${env.NODE_ENV}`);

  console.log('2. Initialisation du logger...');
  const logger = require('./src/config/logger');
  console.log('   ✓ Logger OK');

  console.log('3. Chargement du connectDB...');
  const connectDB = require('./src/config/db');
  console.log('   ✓ connectDB function OK');

  console.log('4. Chargement d\'Express...');
  const express = require('express');
  const app = express();
  console.log('   ✓ Express OK');

  console.log('5. Connexion à la DB...');
  connectDB();
  console.log('   ✓ connectDB() appelé');

  console.log('6. Importation des routes...');
  const authRoutes = require('./src/modules/auth/auth.routes');
  console.log('   ✓ auth.routes OK');

  console.log('7. Setup du serveur...');
  const PORT = env.PORT || 5000;
  app.use(express.json());
  
  console.log('   - Ajout de /api/auth...');
  app.use('/api/auth', authRoutes);
  console.log('   ✓ /api/auth OK');
  
  console.log('   - Ajout de /api/health...');
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });
  console.log('   ✓ /api/health OK');

  console.log(`   - Écoute sur le port ${PORT}...`);
  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
    console.log(`\n✅ SERVER STARTED ON PORT ${PORT}\n`);
  });
  
  server.on('error', (err) => {
    console.error('❌ ERREUR D\'ÉCOUTE:', err.message);
    process.exit(1);
  });

} catch (error) {
  console.error('❌ ERREUR:', error.message);
  console.error(error.stack);
  process.exit(1);
}
