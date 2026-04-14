'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface Post {
  id: string
  title: string
  authorId: string
  authorName: string
  content: string
  createdAt: string
  commentsCount: number
}

const CATEGORY_INFO: Record<string, { name: string; description: string; icon: string }> = {
  psychology: {
    name: 'Psychologique',
    description: 'Bien-être & développement personnel',
    icon: '',
  },
  legal: {
    name: 'Juridique',
    description: 'Droits & conseils légaux',
    icon: '',
  },
  health: {
    name: 'Santé',
    description: 'Médical & prévention',
    icon: '',
  },
  education: {
    name: 'Éducatif',
    description: 'Ressources & apprentissage',
    icon: '',
  },
  social: {
    name: 'Social',
    description: 'Intégration & vie en communauté',
    icon: '',
  },
}

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.id as string
  const categoryInfo = CATEGORY_INFO[categoryId]
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for demo
    const mockPosts: Post[] = [
      {
        id: '1',
        title: 'Comment gérer le stress au travail ?',
        authorId: 'user_1',
        authorName: 'Marie',
        content: 'Je cherche des conseils pour mieux gérer mon stress quotidien au travail...',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        commentsCount: 5,
      },
      {
        id: '2',
        title: 'Techniques de relaxation efficaces',
        authorId: 'user_2',
        authorName: 'Pierre',
        content: 'Voici mes techniques préférées pour me détendre...',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        commentsCount: 8,
      },
    ]
    setPosts(mockPosts)
    setIsLoading(false)
  }, [categoryId])

  if (!categoryInfo) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Catégorie non trouvée</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Communauté</h1>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/forum" className="text-foreground font-medium hover:text-primary transition-colors">
              Forum
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
              Profil
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Category Header */}
        <div className="mb-10 pb-8 border-b border-border">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl">{categoryInfo.icon}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2">{categoryInfo.name}</h1>
              <p className="text-muted-foreground text-lg">{categoryInfo.description}</p>
            </div>
          </div>
          <Link href="/forum">
            <Button variant="outline" className="font-medium mt-4">
              Retour au forum
            </Button>
          </Link>
        </div>

        {/* New Discussion Button */}
        <div className="mb-12">
          <Link href={`/forum/new-post?category=${categoryId}`}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2.5">
              Créer une discussion
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des discussions...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-card rounded-lg p-12 border border-border text-center">
            <p className="text-muted-foreground mb-4">Aucune discussion n&apos;existe encore dans cette catégorie</p>
            <Link href={`/forum/new-post?category=${categoryId}`}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                Soyez le premier à créer une discussion
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/forum/post/${post.id}`}
                className="group"
              >
                <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                      {post.title}
                    </h3>
                    <svg className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.content}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Par <strong>{post.authorName}</strong></span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {post.commentsCount}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
