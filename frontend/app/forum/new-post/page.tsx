'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CATEGORIES = [
  { id: 'psychology', name: 'Psychologique' },
  { id: 'legal', name: 'Juridique' },
  { id: 'health', name: 'Santé' },
  { id: 'education', name: 'Éducatif' },
  { id: 'social', name: 'Social' },
]

export default function NewPostPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [formData, setFormData] = useState({
    category: categoryParam || '',
    title: '',
    content: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.category || !formData.title || !formData.content) {
        setError('Tous les champs sont requis')
        setIsLoading(false)
        return
      }

      if (formData.title.length < 5) {
        setError('Le titre doit avoir au moins 5 caractères')
        setIsLoading(false)
        return
      }

      if (formData.content.length < 20) {
        setError('Le contenu doit avoir au moins 20 caractères')
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: formData.category,
          title: formData.title,
          content: formData.content,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erreur lors de la création du post')
      }

      router.push(`/forum/category/${formData.category}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/forum" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
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
        {/* Page Header */}
        <div className="mb-12">
          <Link href="/forum" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium mb-4 inline-block">
            &larr; Retour au forum
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">Créer une nouvelle discussion</h1>
          <p className="text-muted-foreground text-lg">
            Partagez vos questions ou expériences avec la communauté. Assurez-vous que votre discussion respecte nos règles de communauté.
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-lg border border-border p-10">
          {error && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-3">
                Catégorie
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Sélectionnez une catégorie</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                Choisissez la catégorie qui correspond le mieux à votre sujet
              </p>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-3">
                Titre de la discussion
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Comment gérer le stress au travail ?"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={120}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formData.title.length}/120 caractères
              </p>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-foreground mb-3">
                Contenu de la discussion
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Décrivez votre question ou expérience..."
                rows={10}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formData.content.length} caractères - Au minimum 20
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Avant de publier</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">•</span>
                  <span>Assurez-vous que votre sujet est pertinent pour la catégorie choisie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">•</span>
                  <span>Soyez respectueux et constructif dans votre message</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">•</span>
                  <span>Évitez de partager des informations personnelles sensibles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold">•</span>
                  <span>Votre discussion sera modérée avant d&apos;être publiée</span>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Link href="/forum" className="flex-1">
                <Button variant="outline" className="w-full font-medium">
                  Annuler
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Publication...
                  </span>
                ) : (
                  'Publier la discussion'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
