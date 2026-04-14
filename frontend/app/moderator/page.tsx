'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

interface PendingPost {
  id: string
  title: string
  authorId: string
  authorName: string
  content: string
  topicId: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function ModeratorPage() {
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [processedCount, setProcessedCount] = useState(0)

  useEffect(() => {
    const loadPendingPosts = async () => {
      try {
        // Mock data for demo
        const mockPosts: PendingPost[] = [
          {
            id: '1',
            title: 'Comment gérer l\'anxiété sociale ?',
            authorId: 'user_1',
            authorName: 'Marie',
            content: 'Je souhaite partager mes expériences avec l\'anxiété sociale et cherche des conseils...',
            topicId: 'psychology',
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
          },
          {
            id: '2',
            title: 'Droits du locataire en 2024',
            authorId: 'user_2',
            authorName: 'Pierre',
            content: 'Quels sont nos droits en tant que locataire cette année ?',
            topicId: 'legal',
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
          },
        ]
        setPendingPosts(mockPosts)
      } catch (error) {
        console.error('Error loading pending posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPendingPosts()
  }, [])

  const handleApprove = (postId: string) => {
    setPendingPosts(prev => prev.filter(p => p.id !== postId))
    setProcessedCount(prev => prev + 1)
  }

  const handleReject = (postId: string) => {
    setPendingPosts(prev => prev.filter(p => p.id !== postId))
    setProcessedCount(prev => prev + 1)
  }

  const CATEGORY_EMOJI: Record<string, string> = {
    psychology: '',
    legal: '',
    health: '',
    education: '',
    social: '',
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="moderator" userName="Modérateur" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Dashboard Modération</h2>
          <p className="text-muted-foreground text-lg">
            Examinez et validez les nouvelles discussions pour maintenir la qualité de la communauté
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-sm font-medium mb-2">En attente de modération</p>
            <p className="text-4xl font-bold text-primary">{pendingPosts.length}</p>
            <p className="text-xs text-muted-foreground mt-2">discussions à examiner</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-sm font-medium mb-2">Traitées aujourd&apos;hui</p>
            <p className="text-4xl font-bold text-accent">{processedCount}</p>
            <p className="text-xs text-muted-foreground mt-2">approuvées ou rejetées</p>
          </div>
          <div className="p-6 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground text-sm font-medium mb-2">Taux d&apos;approbation</p>
            <p className="text-4xl font-bold text-foreground">92%</p>
            <p className="text-xs text-muted-foreground mt-2">discussions acceptées</p>
          </div>
        </div>

        {/* Pending Posts */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des discussions...</p>
          </div>
        ) : pendingPosts.length === 0 ? (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-primary/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2">Aucune discussion en attente</h3>
            <p className="text-muted-foreground">Toutes les discussions en attente ont été modérées. Excellent travail !</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-6">Discussions à modérer</h3>
            {pendingPosts.map(post => (
              <div
                key={post.id}
                className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{post.title}</h4>
                      <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        En attente
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">Par <strong>{post.authorName}</strong></p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded p-4 mb-4">
                  <p className="text-foreground text-sm leading-relaxed">{post.content}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString('fr-FR', {
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => handleReject(post.id)}
                      variant="outline"
                      className="font-medium text-destructive border-destructive hover:bg-destructive/10"
                    >
                      Rejeter
                    </Button>
                    <Button
                      onClick={() => handleApprove(post.id)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                    >
                      Approuver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
