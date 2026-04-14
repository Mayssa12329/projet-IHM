import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'E-mail et mot de passe requis' },
        { status: 400 }
      )
    }

    // Appel au backend
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        motDePasse: password, // Le backend attend 'motDePasse'
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { 
          success: false, 
          message: errorData.message || 'Identifiants incorrects' 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Normaliser la réponse du backend
    const user = data.data || data.user || data
    
    // Créer une session
    await setSession({
      id: user.id || user._id,
      email: user.email,
      username: user.nom || user.username || email.split('@')[0],
      role: user.role || 'user',
    })

    return NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id || user._id,
          email: user.email,
          firstName: user.prenom || user.firstName || '',
          lastName: user.nom || user.lastName || '',
          username: user.nom || user.username || email.split('@')[0],
          role: user.role || 'user',
        },
        message: 'Connexion réussie'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la connexion avec le backend'
      },
      { status: 500 }
    )
  }
}
