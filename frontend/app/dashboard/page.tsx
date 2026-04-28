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

const TOPIC_LABELS: Record<string, { label: string; color: string; svg: string }> = {
  psychology: { 
    label: 'Psychologique', 
    color: '#3B82F6',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="15" fill="#3B82F6" opacity="0.2"/>
      <path d="M 40 55 L 40 75 M 60 55 L 60 75 M 50 55 L 50 65" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 35 70 L 65 70" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    </svg>`
  },
  legal: { 
    label: 'Juridique', 
    color: '#A855F7',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="20" width="30" height="60" fill="#A855F7" opacity="0.15" stroke="#A855F7" strokeWidth="2" rx="2"/>
      <line x1="40" y1="30" x2="60" y2="30" stroke="#A855F7" strokeWidth="1.5"/>
      <line x1="40" y1="40" x2="60" y2="40" stroke="#A855F7" strokeWidth="1.5"/>
      <line x1="40" y1="50" x2="60" y2="50" stroke="#A855F7" strokeWidth="1.5"/>
    </svg>`
  },
  health: { 
    label: 'Santé', 
    color: '#EF4444',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 30 L 50 70 M 30 50 L 70 50" stroke="#EF4444" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="50" cy="50" r="35" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.3"/>
    </svg>`
  },
  education: { 
    label: 'Éducatif', 
    color: '#F59E0B',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 30 45 L 50 30 L 70 45 L 70 70 L 30 70 Z" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="2"/>
      <line x1="50" y1="30" x2="50" y2="50" stroke="#F59E0B" strokeWidth="2"/>
    </svg>`
  },
  social: { 
    label: 'Social', 
    color: '#10B981',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="40" r="12" fill="#10B981" opacity="0.2"/>
      <circle cx="50" cy="30" r="12" fill="#10B981" opacity="0.2"/>
      <circle cx="70" cy="40" r="12" fill="#10B981" opacity="0.2"/>
      <line x1="30" y1="52" x2="30" y2="65" stroke="#10B981" strokeWidth="1.5"/>
      <line x1="50" y1="42" x2="50" y2="65" stroke="#10B981" strokeWidth="1.5"/>
      <line x1="70" y1="52" x2="70" y2="65" stroke="#10B981" strokeWidth="1.5"/>
    </svg>`
  },
  business: { 
    label: 'Entrepreneuriat', 
    color: '#EC4899',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="40" width="50" height="35" fill="#EC4899" opacity="0.15" stroke="#EC4899" strokeWidth="2" rx="3"/>
      <path d="M 35 40 L 35 25 L 50 20 L 65 25 L 65 40" fill="#EC4899" opacity="0.1" stroke="#EC4899" strokeWidth="2"/>
    </svg>`
  },
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
    <main className="min-h-screen bg-background">
      {/* Header with Navbar-like appearance */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-primary to-accent shadow-md">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Communauté</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-lg hover:bg-destructive/10"
          >
            Déconnexion
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">Bienvenue, {user.firstName}!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Voici votre tableau de bord personnel. Explorez vos domaines d&apos;intérêt et rejoignez les discussions</p>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="md:col-span-2 bg-card rounded-xl border border-border p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-8">Votre profil</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">Prénom</p>
                  <p className="text-lg font-semibold text-foreground">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">Nom</p>
                  <p className="text-lg font-semibold text-foreground">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">Nom d&apos;utilisateur</p>
                  <p className="text-lg font-semibold text-foreground">@{user.username}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">Email</p>
                  <p className="text-lg font-semibold text-foreground">{user.email}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg">
                  Éditer mon profil
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl border border-border p-8 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-6">Statistiques</h3>
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Intérêts sélectionnés</p>
                <p className="text-4xl font-bold text-primary">{user.topics.length}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Posts créés</p>
                <p className="text-4xl font-bold text-accent">0</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Commentaires</p>
                <p className="text-2xl font-bold text-foreground">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">Vos domaines d&apos;intérêt</h2>
          
          {user.topics && user.topics.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {user.topics.map((topic: string) => {
                const topicInfo = TOPIC_LABELS[topic] || { label: topic, color: '#6B7280', svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="none" stroke="#6B7280" strokeWidth="2"/></svg>' }
                return (
                  <a key={topic} href={`/forum/category/${topic}`}>
                    <div className="bg-card border-2 border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer h-full flex flex-col items-center text-center">
                      <div className="h-16 w-16 mb-4 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: topicInfo.svg }} />
                      <h3 className="font-semibold text-foreground group-hover:text-opacity-80 transition-colors mb-2">
                        {topicInfo.label}
                      </h3>
                      <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        Voir les discussions →
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <p className="text-muted-foreground">Vous n&apos;avez pas encore sélectionné d&apos;intérêts</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8">
          <a href="/forum/new-post">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                  <path d="M 30 70 L 30 20 L 50 35 L 70 20 L 70 70 Z" fill="white" opacity="0.3" stroke="white" strokeWidth="2"/>
                  <line x1="40" y1="35" x2="60" y2="35" stroke="white" strokeWidth="1.5"/>
                  <line x1="40" y1="50" x2="60" y2="50" stroke="white" strokeWidth="1.5"/>
                  <line x1="40" y1="65" x2="60" y2="65" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Créer un post</h3>
              <p className="text-primary-foreground/80">Partagez vos questions et expériences</p>
            </div>
          </a>

          <a href="/forum">
            <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                  <rect x="20" y="20" width="20" height="60" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5" rx="2"/>
                  <rect x="45" y="35" width="20" height="45" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5" rx="2"/>
                  <rect x="70" y="50" width="10" height="30" fill="white" opacity="0.3" stroke="white" strokeWidth="1.5" rx="2"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Parcourir le forum</h3>
              <p className="text-accent-foreground/80">Découvrez les discussions de la communauté</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  )
}