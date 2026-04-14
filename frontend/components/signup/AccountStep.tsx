'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AccountStepProps {
  onSubmit: (data: {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
  }) => void
  onBack: () => void
  initialData: {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
  }
}

export default function AccountStep({ onSubmit, onBack, initialData }: AccountStepProps) {
  const [formData, setFormData] = useState(initialData)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Créez votre compte</h2>
      <p className="text-muted-foreground mb-8 text-balance">Remplissez les informations pour créer votre profil</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Prenom et Nom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              Prénom
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ahmed"
              className="h-11 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Nom
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ben Salem"
              className="h-11 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Adresse e-mail
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="vous@exemple.com"
            className="h-11 rounded-lg"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
            Nom d&apos;utilisateur
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="votreusername"
            className="h-11 rounded-lg"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 caractères"
              className="h-11 rounded-lg pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Minimum 8 caractères pour la sécurité</p>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 p-4 bg-secondary rounded-lg">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 rounded border-border mt-1 cursor-pointer accent-primary flex-shrink-0"
            required
            aria-label="Accepter les conditions d'utilisation"
          />
          <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
            J&apos;accepte les{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              conditions d&apos;utilisation
            </a>
            {' '}et la{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              politique de confidentialité
            </a>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1 h-11 rounded-lg font-medium"
          >
            Retour
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-medium transition-all"
          >
            Continuer
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </form>
    </div>
  )
}
