'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface UserProfile {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  bio: string
  avatar: string
  topics: string[]
  postsCount: number
  createdAt: string
}

const TOPIC_LABELS: Record<string, { name: string }> = {
  psychology: { name: 'Psychologique' },
  legal: { name: 'Juridique' },
  health: { name: 'Santé' },
  education: { name: 'Éducatif' },
  social: { name: 'Social' },
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Mock data for demo
        const mockProfile: UserProfile = {
          id: 'user_1',
          username: 'marie',
          email: 'marie@example.com',
          firstName: 'Marie',
          lastName: 'Dupont',
          bio: 'Passionnée par le bien-être et le développement personnel. J\'aime partager mes expériences et aider les autres.',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marie',
          topics: ['psychology', 'health', 'social'],
          postsCount: 12,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        }
        setProfile(mockProfile)
        setBio(mockProfile.bio)
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSaveBio = () => {
    if (profile) {
      setProfile({ ...profile, bio })
      setIsEditing(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Chargement du profil...</p>
        </div>
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Profil non trouvé</p>
        </div>
      </main>
    )
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
            <Button
              onClick={() => window.location.href = '/api/auth/logout'}
              variant="outline"
              className="font-medium"
            >
              Déconnexion
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-start gap-8 mb-8">
            <img
              src={profile.avatar}
              alt={profile.firstName}
              className="w-32 h-32 rounded-lg border-4 border-primary/20"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">@{profile.username}</p>
              <p className="text-foreground mb-6 max-w-2xl">{profile.bio}</p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profile.postsCount}</p>
                  <p className="text-xs text-muted-foreground">Discussions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profile.topics.length}</p>
                  <p className="text-xs text-muted-foreground">Catégories</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">89</p>
                  <p className="text-xs text-muted-foreground">Réponses utiles</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              {isEditing ? 'Annuler' : 'Modifier le profil'}
            </Button>
          </div>
        </div>

        {/* Edit Bio Section */}
        {isEditing && (
          <div className="mb-12 p-8 bg-card rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Modifiez votre bio</h3>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-4 bg-background border border-border rounded-lg text-foreground mb-4 resize-none"
              rows={4}
              placeholder="Décrivez-vous..."
            />
            <div className="flex gap-3">
              <Button
                onClick={handleSaveBio}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Enregistrer
              </Button>
              <Button
                onClick={() => {
                  setBio(profile.bio)
                  setIsEditing(false)
                }}
                variant="outline"
                className="font-medium"
              >
                Annuler
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="space-y-8">
          {/* Topics Section */}
          <div className="bg-card rounded-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Domaines d&apos;intérêt</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {profile.topics.map(topicId => {
                const topic = TOPIC_LABELS[topicId]
                return (
                  <div
                    key={topicId}
                    className="p-6 bg-background rounded-lg border border-border text-center hover:border-primary/30 transition-all"
                  >
                    <p className="font-medium text-foreground">{topic.name}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-card rounded-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Activité récente</h3>
            <div className="space-y-4">
              {[
                { type: 'post', text: 'Discussion créée : "Comment gérer le stress au travail ?"', time: 'Il y a 2 jours' },
                { type: 'comment', text: 'Réponse à "Techniques de relaxation efficaces"', time: 'Il y a 1 jour' },
                { type: 'post', text: 'Discussion créée : "Ressources pour le bien-être"', time: 'Il y a 5 jours' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex-1">
                    <p className="text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-card rounded-lg border border-border p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Informations du compte</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Email</p>
                <p className="text-foreground font-medium">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Nom d&apos;utilisateur</p>
                <p className="text-foreground font-medium">{profile.username}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Inscrit le</p>
                <p className="text-foreground font-medium">
                  {new Date(profile.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="pt-6 border-t border-border">
                <Button
                  onClick={() => window.location.href = '/api/auth/logout'}
                  className="bg-destructive hover:bg-destructive/90 text-primary-foreground font-medium"
                >
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
