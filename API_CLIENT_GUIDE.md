# Guide Utilisation API Client

## Architecture

Les requêtes passent par cette chaîne:

```
Frontend Component
    ↓
fetch('/api/auth/login')  ← Next.js Route Handler
    ↓
const response = await fetch('http://localhost:5000/api/auth/login')  ← Backend Express
    ↓
MongoDB
```

## Utilisation dans les Composants

### 1. Login (Exemple complet)

**Frontend Component (`frontend/app/login/page.tsx`)**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }

    const { user } = await response.json()
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
  }
}
```

**Route API Frontend (`frontend/app/api/auth/login/route.ts`)**
```typescript
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  // Appel au backend
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      motDePasse: password,  // Transformation du format
    }),
  })

  // Traitement de la réponse du backend
  const data = await response.json()
  // Normalisation et retour au frontend
}
```

### 2. Créer une Publication

Pour créer une nouvelle route API qui appelle le backend:

**1. Créer le fichier** `frontend/app/api/posts/create/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN // À ajouter si JWT requis

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, categoryId } = body

    const response = await fetch(`${API_URL}/api/publications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${API_TOKEN}` // Si JWT requis
      },
      body: JSON.stringify({
        titre: title,
        contenu: content,
        categorieId: categoryId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { success: false, message: error.message },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(
      { success: true, post: data.data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
```

**2. Utiliser depuis un composant**:
```typescript
const handleCreatePost = async () => {
  try {
    const response = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Mon Post',
        content: 'Contenu du post',
        categoryId: 'category123',
      }),
    })

    const { post } = await response.json()
    console.log('Post créé:', post)
  } catch (error) {
    console.error(error)
  }
}
```

## Variables d'Environnement

**Frontend `.env.local`**
```env
# URL du backend (OBLIGATOIRE)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Token JWT (si authentification requise sur les requêtes)
# NEXT_PUBLIC_API_TOKEN=your_token_here
```

**Backend `.env`**
```env
CORS_ORIGIN=http://localhost:3000
```

## Pattern: Route API → Backend

Tous les appels au backend suivent ce pattern:

```typescript
// 1. Récupérer l'URL depuis env
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// 2. Faire la requête avec fetch
const response = await fetch(`${API_URL}/api/endpoint`, {
  method: 'POST|GET|PUT|DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})

// 3. Vérifier la réponse
if (!response.ok) {
  const error = await response.json()
  return NextResponse.json({ error: error.message }, { status: response.status })
}

// 4. Traiter et normaliser les données du backend
const data = await response.json()
```

## Endpoints Disponibles

### Auth
- `POST /api/auth/login` → `email`, `motDePasse`
- `POST /api/auth/register` → `nom`, `prenom`, `email`, `motDePasse`

### Publications
- `GET /api/publications` → Liste
- `POST /api/publications` → `titre`, `contenu`, `categorieId`
- `GET /api/publications/:id`
- `PUT /api/publications/:id` → Modifier
- `DELETE /api/publications/:id` → Supprimer

### Catégories
- `GET /api/categories`
- `POST /api/categories` → `nom`, `description`

### Utilisateurs
- `GET /api/users/:id`
- `GET /api/users` → Liste (admin)

## Gestion d'Erreurs

```typescript
try {
  const response = await fetch(`${API_URL}/api/...`, opts)
  
  if (!response.ok) {
    const { message } = await response.json()
    // Backend retourne les erreurs dans `message`
    throw new Error(message)
  }
  
  return await response.json()
} catch (error) {
  // Erreur réseau ou parsing
  console.error('API Error:', error)
  // Afficher un message d'erreur utilisateur
}
```

## Test Rapide

Tester une requête auth avec curl:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","motDePasse":"password123"}'
```

## Bonnes Pratiques

✅ **À FAIRE**
- Toujours passer par `/app/api/*` depuis le frontend
- Utiliser `NEXT_PUBLIC_API_URL` pour l'URL du backend
- Normaliser les données du backend avant de les retourner au client
- Logger les erreurs API

❌ **À NE PAS FAIRE**
- Appeler directement le backend depuis les composants (sécurité)
- Dupliquer la logique d'appel API
- Hardcoder les URLs API
- Laisser les erreurs du backend visibles au client

## Support

Si une route API manque, la créer dans `frontend/app/api/` qui appellera le backend correspondant.
