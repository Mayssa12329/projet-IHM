import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * GET : Récupère la liste des signalements/posts en attente
 * Sécurité : Réservé aux modérateurs et administrateurs
 */
export async function GET(request: NextRequest) {
  try {
    // Vérification du rôle (lance une erreur si non autorisé)
    const session = await requireRole(['moderator', 'admin'])
    
    // Détermination de l'entité backend selon le rôle
    const rolePath = session.role === 'admin' ? 'admin' : 'moderateur'
    
    const response = await fetch(`${API_URL}/api/${rolePath}/reports`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache' // On veut toujours les derniers signalements
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Impossible de récupérer les signalements' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const reports = data.data || data.reports || data || []
    
    return NextResponse.json(reports, { status: 200 })

  } catch (error) {
    console.error('[MODERATION_GET_ERROR]:', error)
    return NextResponse.json(
      { message: 'Accès interdit ou session expirée' },
      { status: 403 }
    )
  }
}

/**
 * POST : Traite un signalement (Approuver ou Rejeter)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireRole(['moderator', 'admin'])
    const body = await request.json()
    const { reportId, action, reason } = body

    // 1. Validation des paramètres d'entrée
    if (!reportId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { message: 'Paramètres de modération invalides' },
        { status: 400 }
      )
    }

    // 2. Construction dynamique de l'URL backend
    const roleSegment = session.role === 'admin' ? 'admin' : 'moderateur'
    const endpoint = `${API_URL}/api/${roleSegment}/reports/${reportId}`

    // 3. Appel API avec normalisation des données (Mapping vers le backend)
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        statut: action === 'approve' ? 'approuvé' : 'rejeté',
        motif: reason || 'Action effectuée via le panel de modération',
        moderateurId: session.userId, // On trace qui a fait l'action
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || 'Erreur lors de la mise à jour du signalement' },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    return NextResponse.json(
      { 
        success: true,
        data: result.data || result,
        message: `Le contenu a été ${action === 'approve' ? 'validé' : 'supprimé'} avec succès.`
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('[MODERATION_POST_ERROR]:', error)
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'action de modération' },
      { status: 500 }
    )
  }
}