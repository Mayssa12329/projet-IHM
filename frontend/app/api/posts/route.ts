import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * GET : Récupère la liste des publications
 * Supporte le filtrage par catégorie via Query Params
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    
    // Utilisation de URLSearchParams pour une construction d'URL propre
    const query = new URLSearchParams()
    if (categoryId) query.append('categorieId', categoryId)

    const response = await fetch(`${API_URL}/api/publications?${query.toString()}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30' // Optimisation performance
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || 'Impossible de charger les publications' },
        { status: response.status }
      )
    }

    const data = await response.json()
    // Normalisation de la réponse
    const posts = data.data || data.publications || data || []
    
    return NextResponse.json(posts, { status: 200 })

  } catch (error) {
    console.error('[POSTS_GET_ERROR]:', error)
    return NextResponse.json(
      { message: 'Erreur réseau lors de la récupération des publications' },
      { status: 500 }
    )
  }
}

/**
 * POST : Création d'une nouvelle publication
 * Sécurité : Authentification requise
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Protection de la route
    const session = await requireAuth()
    
    const body = await request.json()
    const { categoryId, title, content } = body

    // 2. Validation stricte (UX préventive)
    if (!categoryId || !title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { message: 'Le titre, le contenu et la catégorie sont obligatoires.' },
        { status: 400 }
      )
    }

    if (title.length < 5 || title.length > 100) {
      return NextResponse.json(
        { message: 'Le titre doit contenir entre 5 et 100 caractères.' },
        { status: 400 }
      )
    }

    // 3. Appel au backend avec mapping des champs
    const response = await fetch(`${API_URL}/api/publications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titre: title.trim(),
        contenu: content.trim(),
        categorieId: categoryId,
        auteurId: session.userId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || 'Le serveur a refusé la publication.' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const newPost = data.data || data

    return NextResponse.json(
      { 
        success: true,
        post: newPost,
        message: 'Votre publication est en ligne !' 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('[POSTS_CREATE_ERROR]:', error)
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de la création de votre post.' },
      { status: 500 }
    )
  }
}