import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    const categoryId = request.nextUrl.searchParams.get('categoryId')
    
    let url = `${API_URL}/api/publications`
    if (categoryId) {
      url += `?categorieId=${categoryId}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { message: error.message || 'Erreur lors de la récupération des posts' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const posts = data.data || data.publications || []
    
    return NextResponse.json(posts, { status: 200 })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la récupération des posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth()
    const body = await request.json()
    const { categoryId, title, content } = body

    if (!categoryId || !title || !content) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    if (title.length < 5 || content.length < 20) {
      return NextResponse.json(
        { message: 'Le titre doit avoir au moins 5 caractères et le contenu 20' },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_URL}/api/publications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titre: title,
        contenu: content,
        categorieId: categoryId,
        auteurId: session.userId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { message: error.message || 'Erreur lors de la création du post' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const newPost = data.data || data
    
    return NextResponse.json(
      { 
        post: newPost,
        message: 'Post créé avec succès'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la création du post' },
      { status: 500 }
    )
  }
}
