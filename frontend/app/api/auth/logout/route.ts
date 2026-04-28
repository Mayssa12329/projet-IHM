import { NextRequest, NextResponse } from 'next/server'
import { clearSession } from '@/lib/auth'

/**
 * Route de déconnexion (POST)
 * Nettoie la session serveur et instruit le navigateur de supprimer les données locales
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Suppression de la session (Cookie, JWT, ou Session Database)
    await clearSession()
    
    // 2. Création de la réponse
    const response = NextResponse.json(
      { 
        success: true,
        message: 'Vous avez été déconnecté avec succès. À bientôt !' 
      },
      { status: 200 }
    )

    // 3. Sécurité IHM : Forcer la suppression de tout cache sensible
    // On s'assure que si l'utilisateur fait "Précédent", il ne voit pas de données privées
    response.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"')
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response

  } catch (error) {
    console.error('[AUTH_LOGOUT_ERROR]:', error)
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Une erreur est survenue lors de la fermeture de session.' 
      },
      { status: 500 }
    )
  }
}