'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

interface Category {
  id: string
  name: string
  description: string
  color: string
  bgGradient: string
  postsCount: number
  svg: string
}

export default function ForumPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const initForum = async () => {
      try {
        const res = await fetch('/api/auth/check')
        if (res.ok) {
          const data = await res.json()
          setUser(data.session)
        }

        // Demo categories with SVG icons and professional styling
        const demoCategories: Category[] = [
          {
            id: 'psychology',
            name: 'Psychologie',
            description: 'Santé mentale, bien-être et développement personnel',
            color: '#3B82F6',
            bgGradient: 'from-blue-500/20 to-blue-600/20',
            postsCount: 142,
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="35" r="15" fill="#3B82F6" opacity="0.2"/>
              <path d="M 40 55 L 40 75 M 60 55 L 60 75 M 50 55 L 50 65" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <path d="M 35 70 L 65 70" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
            </svg>`,
          },
          {
            id: 'legal',
            name: 'Juridique',
            description: 'Droits, lois et conseils légaux',
            color: '#A855F7',
            bgGradient: 'from-purple-500/20 to-purple-600/20',
            postsCount: 89,
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect x="35" y="20" width="30" height="60" fill="#A855F7" opacity="0.15" stroke="#A855F7" strokeWidth="2" rx="2"/>
              <line x1="40" y1="30" x2="60" y2="30" stroke="#A855F7" strokeWidth="1.5"/>
              <line x1="40" y1="40" x2="60" y2="40" stroke="#A855F7" strokeWidth="1.5"/>
              <line x1="40" y1="50" x2="60" y2="50" stroke="#A855F7" strokeWidth="1.5"/>
            </svg>`,
          },
          {
            id: 'health',
            name: 'Santé',
            description: 'Bien-être physique, nutrition et prévention',
            color: '#EF4444',
            bgGradient: 'from-red-500/20 to-red-600/20',
            postsCount: 156,
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50 30 L 50 70 M 30 50 L 70 50" stroke="#EF4444" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="35" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.3"/>
            </svg>`,
          },
          {
            id: 'education',
            name: 'Éducatif',
            description: 'Ressources, formations et apprentissage',
            color: '#F59E0B',
            bgGradient: 'from-amber-500/20 to-amber-600/20',
            postsCount: 103,
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M 30 45 L 50 30 L 70 45 L 70 70 L 30 70 Z" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="2"/>
              <line x1="50" y1="30" x2="50" y2="50" stroke="#F59E0B" strokeWidth="2"/>
            </svg>`,
          },
          {
            id: 'social',
            name: 'Social',
            description: 'Intégration communautaire et vie sociale',
            color: '#10B981',
            bgGradient: 'from-green-500/20 to-green-600/20',
            postsCount: 178,
            svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="40" r="12" fill="#10B981" opacity="0.2"/>
              <circle cx="50" cy="30" r="12" fill="#10B981" opacity="0.2"/>
              <circle cx="70" cy="40" r="12" fill="#10B981" opacity="0.2"/>
              <line x1="30" y1="52" x2="30" y2="65" stroke="#10B981" strokeWidth="1.5"/>
              <line x1="50" y1="42" x2="50" y2="65" stroke="#10B981" strokeWidth="1.5"/>
              <line x1="70" y1="52" x2="70" y2="65" stroke="#10B981" strokeWidth="1.5"/>
            </svg>`,
          },
        ]
        setCategories(demoCategories)
      } catch (error) {
        console.error('Error loading forum:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initForum()
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground text-lg font-medium">Chargement du forum...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 border-b border-border">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Forum de discussion</h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">Explorez nos différentes catégories, posez vos questions et participez aux conversations bienveillantes</p>
            </div>
            <Link href="/forum/new-post" className="w-full md:w-auto">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 h-auto text-lg rounded-lg transition-all hover:shadow-xl">
                Créer un post
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Categories Grid */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-3">Nos catégories</h2>
            <p className="text-lg text-muted-foreground">Choisissez votre domaine et commencez à discuter</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/forum/category/${category.id}`}>
                <div className={`group bg-gradient-to-br ${category.bgGradient} border-2 border-border rounded-2xl p-8 hover:border-[${category.color}]/50 transition-all duration-300 hover:shadow-xl cursor-pointer h-full flex flex-col`}>
                  {/* Icon */}
                  <div className="h-24 mb-6 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: category.svg }} />

                  {/* Title and description */}
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-opacity-80 transition-colors mb-3">{category.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">{category.description}</p>

                  {/* Footer with posts count and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
                      <span className="text-sm font-medium text-muted-foreground">{category.postsCount} discussions</span>
                    </div>
                    <span className="text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Voir →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <section className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Discussions totales', value: categories.reduce((sum, cat) => sum + cat.postsCount, 0) },
            { label: 'Catégories', value: categories.length },
            { label: 'Modérateurs actifs', value: '12' },
            { label: 'Membres', value: '5000+' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all">
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Guidelines Section */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Nos règles de discussion</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Respectez les autres', desc: 'Chaque avis est valide. Écoutez, comprenez et soyez bienveillant.' },
              { title: 'Soyez authentique', desc: 'Partagez vos vraies expériences et pensées honnêtement.' },
              { title: 'Pas de spam', desc: 'Évitez les contenus promotionnels ou publicitaires.' },
              { title: 'Aidez les autres', desc: 'Si vous avez une solution, n\'hésitez pas à la partager.' },
            ].map((rule, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/20 text-primary font-bold text-lg">
                    {idx + 1}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{rule.title}</h4>
                  <p className="text-muted-foreground text-sm">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
