import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    const session = await requireRole(['moderator', 'admin'])
    
    const response = await fetch(`${API_URL}/api/${session.role === 'admin' ? 'admin' : 'moderateur'}/reports`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Accès refusé ou erreur serveur' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const reports = data.data || data.reports || []
    
    return NextResponse.json(reports, { status: 200 })
  } catch (error) {
    console.error('Get pending posts error:', error)
    return NextResponse.json(
      { message: 'Accès refusé' },
      { status: 403 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireRole(['moderator', 'admin'])
    const body = await request.json()
    const { reportId, action, reason } = body

    if (!reportId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { message: 'Paramètres invalides' },
        { status: 400 }
      )
    }

    // Endpoint peut varier selon le backend
    const endpoint = session.role === 'admin' 
      ? `/api/admin/reports/${reportId}` 
      : `/api/moderateur/reports/${reportId}`

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        statut: action === 'approve' ? 'approuvé' : 'rejeté',
        motif: reason,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { message: error.message || 'Erreur lors de l\'action de modération' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const result = data.data || data

    return NextResponse.json(
      { 
        post: result,
        message: `Report ${action === 'approve' ? 'approuvé' : 'rejeté'} avec succès`
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Moderation action error:', error)
    return NextResponse.json(
      { message: 'Erreur lors de l\'action de modération' },
      { status: 500 }
    )
  }
}
