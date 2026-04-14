import { NextRequest, NextResponse } from 'next/server'
import { clearSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await clearSession()
    
    return NextResponse.json(
      { message: 'Déconnexion réussie' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la déconnexion' },
      { status: 500 }
    )
  }
}
