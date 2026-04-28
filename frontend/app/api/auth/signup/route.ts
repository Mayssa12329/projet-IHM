import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * Route d'inscription (POST)
 * Orchestre la création de compte, la synchronisation backend et l'auto-login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, username, password, topics } = body

    // 1. Validation rigoureuse (Feedback IHM côté serveur)
    const requiredFields = { firstName, lastName, email, username, password }
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          message: `Champs manquants : ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // 2. Appel au Backend (Mapping vers le schéma attendu par votre API Node/Java/Python)
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: lastName.trim(),
        prenom: firstName.trim(),
        email: email.toLowerCase().trim(),
        motDePasse: password, // Correspondance exacte avec votre schéma backend
        interets: topics || [],
      }),
    })

    // 3. Gestion des erreurs du backend (ex: Email déjà utilisé)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || "Impossible de finaliser l'inscription." 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // 4. Normalisation des données utilisateur
    const rawUser = data.data || data.user || data
    
    const newUser = {
      id: rawUser.id || rawUser._id,
      email: rawUser.email,
      firstName: rawUser.prenom || firstName,
      lastName: rawUser.nom || lastName,
      username: username,
      role: rawUser.role || 'user',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      topics: topics || [],
    }
    
    // 5. Auto-login : Création immédiate de la session pour une UX fluide
    await setSession(newUser)

    return NextResponse.json(
      { 
        success: true,
        user: newUser,
        message: 'Bienvenue ! Votre compte a été créé avec succès.'
      },
      { status: 201 } // Created
    )

  } catch (error) {
    console.error('[AUTH_SIGNUP_CRITICAL]:', error)
    return NextResponse.json(
      { 
        success: false,
        message: "Une erreur réseau est survenue. Veuillez vérifier votre connexion." 
      },
      { status: 500 }
    )
  }
}