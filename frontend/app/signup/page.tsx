'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TopicsStep from '@/components/signup/TopicsStep'
import AccountStep from '@/components/signup/AccountStep'
import ConfirmationStep from '@/components/signup/ConfirmationStep'

type Step = 'topics' | 'account' | 'confirmation'

interface SignupData {
  topics: string[]
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
}

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('topics')
  const [signupData, setSignupData] = useState<SignupData>({
    topics: [],
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleTopicsSubmit = (topics: string[]) => {
    if (topics.length === 0) {
      setError('Veuillez sélectionner au moins un intérêt')
      return
    }
    setSignupData(prev => ({ ...prev, topics }))
    setCurrentStep('account')
    setError('')
  }

  const handleAccountSubmit = async (data: Omit<SignupData, 'topics'>) => {
    if (!data.firstName.trim() || !data.lastName.trim() || !data.email.trim() || !data.username.trim() || !data.password.trim()) {
      setError('Tous les champs sont requis')
      return
    }

    if (data.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    setSignupData(prev => ({ ...prev, ...data }))
    setCurrentStep('confirmation')
    setError('')
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Une erreur est survenue')
      }

      router.push('/login?registered=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
            <svg className="w-7 h-7 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Communauté</h1>
          <p className="text-muted-foreground">Rejoignez notre plateforme en quelques étapes</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Intérêts', done: ['account', 'confirmation'].includes(currentStep) },
              { num: 2, label: 'Compte', done: currentStep === 'confirmation' },
              { num: 3, label: 'Confirmé', done: false }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    currentStep === ['topics', 'account', 'confirmation'][idx] 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : step.done 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-border text-muted-foreground'
                  }`}>
                    {step.done ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </div>
                  <p className="text-xs font-medium mt-2 text-muted-foreground">{step.label}</p>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all ${
                    step.done ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl border border-border p-10 shadow-sm">
          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Content */}
          {currentStep === 'topics' && (
            <TopicsStep
              onSubmit={handleTopicsSubmit}
              selectedTopics={signupData.topics}
            />
          )}

          {currentStep === 'account' && (
            <AccountStep
              onSubmit={handleAccountSubmit}
              onBack={() => setCurrentStep('topics')}
              initialData={signupData}
            />
          )}

          {currentStep === 'confirmation' && (
            <ConfirmationStep
              data={signupData}
              onConfirm={handleConfirm}
              onBack={() => setCurrentStep('account')}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
