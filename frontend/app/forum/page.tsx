'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

interface Category {
  id: string
  name: string
  description: string
  icon: string
  postsCount: number
}

export default function ForumPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const initForum = async () => {
      try {
        // For demo purposes, use hardcoded categories
        const demoCategories: Category[] = [
          {
            id: 'psychology',
            name: 'Psychologique',
            description: 'Bien-être & développement personnel',
            icon: '',
            postsCount: 12,
          },
          {
            id: 'legal',
            name: 'Juridique',
            description: 'Droits & conseils légaux',
            icon: '',
            postsCount: 8,
          },
          {
            id: 'health',
            name: 'Santé',
            description: 'Médical & prévention',
            icon: '',
            postsCount: 15,
          },
          {
            id: 'education',
            name: 'Éducatif',
            description: 'Ressources & apprentissage',
            icon: '',
            postsCount: 10,
          },
          {
            id: 'social',
            name: 'Social',
            description: 'Intégration & vie en communauté',
            icon: '',
            postsCount: 7,
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
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-muted-foreground">Chargement du forum...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="user" userName={user?.firstName || 'Utilisateur'} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Forum de discussion</h2>
          <p className="text-muted-foreground text-lg">
            Explorez nos catégories et rejoignez les discussions qui vous intéressent
          </p>
        </div>

        {/* New Post Button */}
        <div className="mb-12">
          <Link href="/forum/new-post">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2.5">
              Créer une nouvelle discussion
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Categories Grid with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const imageMap: Record<string, string> = {
              psychology: '/images/category-psychology.jpg',
              legal: '/images/category-legal.jpg',
              health: '/images/category-health.jpg',
              education: '/images/category-education.jpg',
              social: '/images/category-social.jpg',
            }

            return (
              <Link
                key={category.id}
                href={`/forum/category/${category.id}`}
                className="group"
              >
                <div className="relative h-64 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
                  <Image
                    src={imageMap[category.id] || '/images/hero-community.jpg'}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-white/80 text-xs mb-3">{category.description}</p>
                    <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium w-fit">
                      {category.postsCount} discussions
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 p-8 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Comment ça marche ?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary font-semibold">1.</span>
              <span>Choisissez une catégorie qui vous intéresse</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-semibold">2.</span>
              <span>Lisez les discussions existantes ou créez une nouvelle</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-semibold">3.</span>
              <span>Participez respectueusement aux conversations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-semibold">4.</span>
              <span>Modéré pour garantir un espace sûr pour tous</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
