import { NextRequest, NextResponse } from 'next/server'
import { setSession } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, username, password, topics } = body

    // Validation
    if (!firstName || !lastName || !email || !username || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Tous les champs sont requis' 
        },
        { status: 400 }
      )
    }

    // Appel au backend
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom: lastName,
        prenom: firstName,
        email,
        motDePasse: password, // Le backend attend 'motDePasse'
        interets: topics || [],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { 
          success: false,
          message: errorData.message || 'Erreur lors de l\'inscription' 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Normaliser la rÃ©ponse du backend
    const user = data.data || data.user || data
    
    // CrÃ©er une session
    await setSession({
      id: user.id || user._id,
      email: user.email,
      username: user.nom || user.username || username,
      role: user.role || 'user',
    })

    return NextResponse.json(
      { 
        success: true,
        user: {
          id: user.id || user._id,
          email: user.email,
          firstName: user.prenom || firstName,
          lastName: user.nom || lastName,
          username: user.nom || username,
          role: user.role || 'user',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          bio: '',
          topics: topics || [],
        },
        message: 'Compte crÃ©Ã© avec succÃ¨s'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Erreur lors de l\'inscription' 
      },
      { status: 500 }
    )
  }
}
