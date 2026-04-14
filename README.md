# Plateforme de Modération de Contenu

Système de gestion de forum avec modération de contenu, backend Express + MongoDB et frontend Next.js.

## Architecture

```
Backend (Express + MongoDB) ← Requêtes API ← Frontend (Next.js)
   Port: 5000                    Port: 3000
```

## Prérequis

- **Node.js** >= 18.0.0
- **npm** ou **pnpm**
- **MongoDB** (local ou cloud)

## Installation et Démarrage

### 1. Backend (Express + MongoDB)

#### Installation des dépendances
```bash
cd backend
npm install
```

#### Configuration
Éditer/vérifier le fichier `.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/content_moderation
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
```

#### Démarrage du serveur
```bash
# Mode développement (avec rechargement auto)
npm run dev

# Mode production
npm start
```

✅ Le backend sera accessible sur: **http://localhost:5000**

---

### 2. Frontend (Next.js)

#### Installation des dépendances
```bash
cd frontend
npm install
# ou
pnpm install
```

#### Configuration
Le fichier `.env.local` est déjà configuré:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

*Si le backend est sur une autre URL, mettre à jour cette variable.*

#### Démarrage du serveur de développement
```bash
npm run dev
# ou
pnpm dev
```

✅ Le frontend sera accessible sur: **http://localhost:3000**

---

## Comment ça Fonctionne

### Flux de Communication

1. **Utilisateur** actionne le frontend (http://localhost:3000)
2. **Frontend (Next.js)** appelle ses routes API locales (`/api/*`)
3. **Routes API Next.js** font appel au **backend Express** (http://localhost:5000)
4. **Backend** traite la requête et répond
5. **Frontend** reçoit la réponse et met à jour l'interface

### Exemple: Connexion

```
Connexion UI (Frontend) 
  → POST /api/auth/login (Next.js)
    → POST /api/auth/login (Backend Express)
      → Vérifie dans MongoDB
      → Retourne token JWT
    ← Réponse de l'utilisateur
  ← Sauvegarde session
← Redirection Dashboard
```

---

## Endpoints API Disponibles

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `POST /api/auth/logout` - Se déconnecter

### Publications
- `GET /api/publications` - Lister les publications
- `POST /api/publications` - Créer une publication
- `GET /api/publications/:id` - Détail d'une publication
- `PUT /api/publications/:id` - Modifier une publication
- `DELETE /api/publications/:id` - Supprimer une publication

### Catégories
- `GET /api/categories` - Lister les catégories
- `POST /api/categories` - Créer une catégorie

### Utilisateurs
- `GET /api/users` - Lister les utilisateurs
- `GET /api/users/:id` - Détail d'un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur

### Admin
- `GET /api/admin/stats` - Statistiques

### Modérateur
- `GET /api/moderateur/stats` - Statistiques de modération
- `GET /api/moderateur/reports` - Liste des rapports

### Signalements
- `GET /api/reports` - Lister les signalements
- `POST /api/reports` - Créer un signalement

---

## Structure du Projet

```
Project/
├── backend/                    # Express + MongoDB
│   ├── src/
│   │   ├── config/            # Configuration (DB, ENV, Logger)
│   │   ├── middleware/        # Middlewares (auth, validation, erroring)
│   │   ├── models/            # Modèles Mongoose
│   │   ├── modules/           # Modules (auth, publication, etc.)
│   │   └── utils/             # Utilitaires
│   ├── .env                   # Variables d'environnement
│   ├── server.js              # Point d'entrée
│   └── package.json
│
└── frontend/                  # Next.js + React
    ├── app/
    │   ├── api/               # Routes API qui appellent le backend
    │   ├── login/             # Page de connexion
    │   ├── signup/            # Page d'inscription
    │   ├── dashboard/         # Dashboard utilisateur
    │   ├── forum/             # Forum
    │   ├── admin/             # Page admin
    │   └── moderator/         # Page modérateur
    ├── components/            # Composants réutilisables
    ├── lib/
    │   ├── auth.ts           # Gestion de session
    │   ├── api-client.ts     # Client API centralisé
    │   └── users-store.ts    # Store utilisateurs (legacy)
    ├── .env.local            # Configuration API backend
    └── package.json
```

---

## Commandes Utiles

### Backend
```bash
cd backend

# Développement
npm run dev

# Production
npm start

# Lint
npm run lint
```

### Frontend
```bash
cd frontend

# Développement
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint
```

---

## Dépannage

### Backend ne démarre pas
- ✅ Vérifier MongoDB est en cours d'exécution: `mongosh`
- ✅ Vérifier le port 5000 est disponible
- ✅ Vérifier les variables d'environnement dans `.env`

### Frontend ne se connecte pas à l'API
- ✅ Vérifier `NEXT_PUBLIC_API_URL=http://localhost:5000`
- ✅ Vérifier le backend est en cours d'exécution
- ✅ Vérifier CORS dans `.env` du backend inclut `http://localhost:3000`

### Erreurs CORS
- Si vous voyez `Origin non autorisée par CORS`, c'est que le frontend URL n'est pas dans `CORS_ORIGIN` du backend
- Mettre à jour `backend/.env`:
  ```env
  CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
  ```

---

## Notes de Développement

### Variables d'Environnement

**Backend (.env)**
- `MONGO_URI`: Connexion MongoDB (local ou Atlas)
- `JWT_SECRET`: Clé secrète pour les tokens (IMPORTANT: changer en production!)
- `CORS_ORIGIN`: URLs autorisées à accéder à l'API

**Frontend (.env.local)**
- `NEXT_PUBLIC_API_URL`: URL du backend Express

### Authentification
- Tokens JWT stockés en cookies httpOnly (sécurisé)
- Sessions utilisateur gérées côté backend via MongoDB
- Rôles: `user`, `moderator`, `admin`

### Base de Données
- Modèles: User, Publication, Commentaire, Catégorie, Signalement, Notification
- ORM: Mongoose

---

## Prochaines Étapes

1. ✅ Configurer MongoDB local ou cloud
2. ✅ Démarrer le backend: `npm run dev` (depuis `/backend`)
3. ✅ Démarrer le frontend: `npm run dev` (depuis `/frontend`)
4. ✅ Accéder à l'application: http://localhost:3000
5. ✅ Créer un compte et se connecter

---

**dernière mise à jour**: 14 avril 2026
