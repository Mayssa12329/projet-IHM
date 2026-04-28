import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * Gestionnaire de connexion (POST)
 * Respecte les standards de sécurité et de retour d'état IHM
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 1. Validation des champs (Feedback immédiat)
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Veuillez remplir tous les champs requis.' },
        { status: 400 }
      )
    }

    // 2. Appel au service d'authentification externe
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(), // Normalisation pour éviter les erreurs de saisie
        motDePasse: password,
      }),
    })

    // 3. Gestion des erreurs d'authentification (401, 403, etc.)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || 'Identifiants incorrects. Veuillez réessayer.' 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // 4. Normalisation des données utilisateur (Data Mapping)
    // On extrait uniquement ce qui est nécessaire pour la session
    const rawUser = data.data || data.user || data
    
    const userData = {
      id: rawUser.id || rawUser._id,
      email: rawUser.email,
      firstName: rawUser.prenom || rawUser.firstName || '',
      lastName: rawUser.nom || rawUser.lastName || '',
      username: rawUser.username || rawUser.nom || email.split('@')[0],
      role: rawUser.role || 'user',
    }
    
    // 5. Création de la session sécurisée (Cookie/JWT)
    await setSession(userData)

    // 6. Réponse de succès
    return NextResponse.json(
      { 
        success: true,
        user: userData,
        message: 'Connexion réussie ! Ravie de vous revoir.'
      },
      { status: 200 }
    )

  } catch (error) {
    // 7. Gestion des erreurs critiques (ex: Backend hors ligne)
    console.error('[AUTH_LOGIN_CRITICAL]:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Le service est temporairement indisponible. Veuillez réessayer plus tard.'
      },
      { status: 503 } // Service Unavailable
    )
  }
}