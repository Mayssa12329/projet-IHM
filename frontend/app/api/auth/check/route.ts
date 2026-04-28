import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

/**
 * Route API pour vérifier l'état de la session utilisateur
 * Objectif : Fournir une réponse rapide et sécurisée pour le front-end
 */
export async function GET(request: NextRequest) {
  try {
    // Récupération de la session via le helper d'authentification
    const session = await getSession()

    // 1. Cas : Utilisateur non connecté
    // Règle IHM : Utiliser les codes HTTP standards (401 Unauthorized)
    if (!session) {
      return NextResponse.json(
        { 
          authenticated: false,
          message: 'Session expirée ou inexistante' 
        },
        { 
          status: 401,
          // Empêche la mise en cache de la réponse d'erreur
          headers: { 'Cache-Control': 'no-store' }
        }
      )
    }

    // 2. Cas : Succès
    // Règle IHM : Retourner un objet structuré et prévisible
    return NextResponse.json(
      { 
        authenticated: true,
        session: {
          userId: session.userId,
          username: session.username,
          role: session.role,
          topics: session.topics || []
        }
      },
      { 
        status: 200,
        headers: { 'Cache-Control': 'no-store' }
      }
    )

  } catch (error) {
    // 3. Cas : Erreur Serveur (Base de données injoignable, etc.)
    console.error('[AUTH_CHECK_FAILURE]:', error)
    
    return NextResponse.json(
      { 
        message: 'Erreur technique lors de la vérification de session',
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    )
  }
}