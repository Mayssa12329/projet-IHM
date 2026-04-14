'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  topics: string[]
}

const TOPIC_LABELS: Record<string, { label: string }> = {
  psychology: { label: 'Psychologique' },
  legal: { label: 'Juridique' },
  health: { label: 'Santé' },
  education: { label: 'Éducatif' },
  social: { label: 'Social' },
  business: { label: 'Entrepreneuriat' },
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Communauté</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-lg"
          >
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome card */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg border border-primary/30 p-8 text-primary-foreground mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenue, {user.firstName}!</h2>
          <p className="text-primary-foreground/80">Vous êtes maintenant membre de notre communauté. Explorez les intérêts que vous avez sélectionnés et connectez-vous avec d&apos;autres membres.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-card rounded-2xl shadow-lg border border-border p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Votre profil</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prénom</p>
                  <p className="font-semibold text-foreground">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nom</p>
                  <p className="font-semibold text-foreground">{user.lastName}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">E-mail</p>
                <p className="font-semibold text-foreground">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Nom d&apos;utilisateur</p>
                <p className="font-semibold text-foreground">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <h3 className="text-xl font-bold text-foreground mb-6">Statistiques</h3>
            <div className="space-y-6">
              <div>
                <p className="text-3xl font-bold text-primary">{user.topics.length}</p>
                <p className="text-sm text-muted-foreground">Intérêts sélectionnés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Messages publiés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Section */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Vos domaines d&apos;intérêt</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.topics.map(topicId => {
              const topic = TOPIC_LABELS[topicId]
              if (!topic) return null
              return (
                <div
                  key={topicId}
                  className="p-6 bg-secondary rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="text-3xl mb-3"></div>
                  <h4 className="font-bold text-foreground">{topic.label}</h4>
                  <p className="text-sm text-muted-foreground mt-2">Explorez les discussions</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
