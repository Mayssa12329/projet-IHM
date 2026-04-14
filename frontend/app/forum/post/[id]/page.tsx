'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Comment {
  id: string
  authorName: string
  authorId: string
  avatar: string
  content: string
  createdAt: string
}

interface Post {
  id: string
  title: string
  authorName: string
  authorId: string
  avatar: string
  content: string
  topicId: string
  topicName: string
  topicEmoji: string
  createdAt: string
  comments: Comment[]
}

const MOCK_POST: Post = {
  id: '1',
  title: 'Comment gérer le stress au travail ?',
  authorName: 'Marie',
  authorId: 'user_1',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marie',
  content: 'Bonjour à tous ! Je travaille dans une entreprise très exigeante depuis 6 mois et je commence à ressentir beaucoup de stress. Les délais sont serrés, la charge de travail est énorme et je ne sais plus comment gérer tout cela. J\'ai essayé quelques techniques de relaxation mais elles ne semblent pas suffisantes. Auriez-vous des conseils ou des stratégies qui ont fonctionné pour vous ?',
  topicId: 'psychology',
  topicName: 'Psychologique',
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  comments: [
    {
      id: '1',
      authorName: 'Pierre',
      authorId: 'user_2',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pierre',
      content: 'Salut Marie ! Je comprends tout à fait ce que tu traverses. Pour ma part, la méditation et l\'exercice régulier m\'ont vraiment aidé. Je fais 30 minutes de sport chaque matin avant le travail et ça change vraiment ma perspective sur la journée.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      authorName: 'Anne',
      authorId: 'user_3',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anne',
      content: 'J\'ai aussi eu une situation similaire. Je recommande vraiment de parler à ton manager ou à un professionnel RH. Parfois, le problème n\'est pas juste de gérer le stress mais aussi de réévaluer ta charge de travail. N\'oublie pas de te ménager des pauses régulières dans ta journée !',
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    },
  ],
}

export default function PostPage() {
  const params = useParams()
  const postId = params.id
  const [post] = useState<Post>(MOCK_POST)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setNewComment('')
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/forum" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Communauté</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/forum" className="text-muted-foreground hover:text-primary transition-colors">
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
        {/* Back Link */}
        <Link href={`/forum/category/${post.topicId}`} className="text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-6 inline-block">
          &larr; Retour à {post.topicName}
        </Link>

        {/* Post */}
        <article className="bg-card rounded-lg border border-border p-10 mb-12">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">{post.topicEmoji}</span>
            <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded">
              {post.topicName}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-foreground mb-6">{post.title}</h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-6 border-b border-border mb-8">
            <img
              src={post.avatar}
              alt={post.authorName}
              className="w-12 h-12 rounded-full border-2 border-primary/20"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{post.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none mb-8">
            <p className="text-foreground leading-relaxed text-lg">{post.content}</p>
          </div>

          {/* Post Stats */}
          <div className="flex items-center gap-8 pt-8 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span className="text-sm font-medium">{post.comments.length} réponses</span>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Réponses</h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="bg-card rounded-lg border border-border p-8 mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Ajouter votre réponse</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Partagez votre expérience ou posez une question..."
              rows={5}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-4"
            />
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                {isSubmitting ? 'Publication...' : 'Publier ma réponse'}
              </Button>
              <p className="text-xs text-muted-foreground self-center">
                Soyez respectueux et constructif dans vos réponses
              </p>
            </div>
          </form>

          {/* Comments List */}
          {post.comments.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">Aucune réponse pour le moment. Soyez le premier à répondre !</p>
            </div>
          ) : (
            <div className="space-y-6">
              {post.comments.map(comment => (
                <div
                  key={comment.id}
                  className="bg-card rounded-lg border border-border p-6 hover:border-primary/30 transition-all"
                >
                  {/* Comment Author */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={comment.avatar}
                      alt={comment.authorName}
                      className="w-10 h-10 rounded-full border-2 border-primary/20"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{comment.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="text-foreground leading-relaxed">{comment.content}</p>

                  {/* Comment Actions */}
                  <div className="flex gap-4 mt-4 pt-4 border-t border-border">
                    <button className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5" />
                      </svg>
                      Utile
                    </button>
                    <button className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4a6 6 0 016-6h4a6 6 0 016 6v4M3 21h18M3 7a3 3 0 13 3 3 3 0 01-3-3m12 0a3 3 0 13 3 3 3 0 01-3-3" />
                      </svg>
                      Répondre
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
