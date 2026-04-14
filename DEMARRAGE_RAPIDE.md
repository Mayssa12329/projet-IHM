# 🚀 DÉMARRAGE RAPIDE

Intégration simple et claire du backend Express et frontend Next.js.

## 📋 Pré-réquisites

- **Node.js** >= 18
- **MongoDB** local ou cloud (voir instructions ci-dessous)

## ⚡ Démarrage en 3 Étapes

### 1️⃣ Installer MongoDB (si pas encore installé)

**Sur Windows:**
- Télécharger depuis: https://www.mongodb.com/try/download/community
- Installer avec l'option "MongoDB Community Server"
- MongoDB s'arrêtera automatiquement en arrière-plan

**Vérifier la connexion:**
```bash
mongosh
```

### 2️⃣ Lancer les deux serveurs

**Option A - Lancer ensemble (recommandé)**
```bash
# À la racine du projet
npm install-all
npm run dev
```

**Option B - Lancer séparément**

Terminal 1 (Backend):
```bash
cd backend
npm install
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Accédez à l'application

Ouvrir dans le navigateur: **http://localhost:3000**

---

## 🔗 Communication Backend ↔ Frontend

```
┌─────────────────────────────────────┐
│   Frontend (Next.js) Port 3000      │
│   - Login/Signup                    │
│   - Forum, Dashboard                │
└─────────────────┬───────────────────┘
                  │
         POST /api/auth/login
         POST /api/publications
                  │
                  ▼
┌─────────────────────────────────────┐
│   Backend (Express) Port 5000       │
│   - Authentification JWT            │
│   - MongoDB Database                │
└─────────────────────────────────────┘
```

---

## ✅ Vérifier que tout fonctionne

- ✅ Backend accessible: http://localhost:5000/api/health
- ✅ Frontend accessible: http://localhost:3000
- ✅ Créer un compte et se connecter

---

## 📋 Fichiers de Configuration

### Backend (backend/.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/content_moderation
JWT_SECRET=your_super_secret_jwt_key_change_in_production
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend (frontend/.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## ❌ Problèmes Courants

| Problème | Solution |
|----------|----------|
| **Backend ne démarre** | Vérifier MongoDB est en cours: `mongosh` |
| **Port 5000/3000 déjà utilisé** | Changer le PORT dans `backend/.env` |
| **Erreur CORS** | Vérifier `CORS_ORIGIN=http://localhost:3000` |
| **Impossible se connecter** | Vérifier `NEXT_PUBLIC_API_URL=http://localhost:5000` |

---

## 📚 Documentation Complète

Voir [README.md](./README.md) pour plus de détails.

---

**C'est prêt! Bonne modération! 🎉**
