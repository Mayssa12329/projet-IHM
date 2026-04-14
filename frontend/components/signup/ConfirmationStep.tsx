'use client'

import { Button } from '@/components/ui/button'

interface ConfirmationStepProps {
  data: {
    topics: string[]
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
  }
  onConfirm: () => void
  onBack: () => void
  isLoading: boolean
}

const TOPIC_LABELS: Record<string, { label: string }> = {
  psychology: { label: 'Psychologique' },
  legal: { label: 'Juridique' },
  health: { label: 'Santé' },
  education: { label: 'Éducatif' },
  social: { label: 'Social' },
  business: { label: 'Entrepreneuriat' },
}

export default function ConfirmationStep({
  data,
  onConfirm,
  onBack,
  isLoading,
}: ConfirmationStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Confirmez vos informations</h2>
      <p className="text-muted-foreground mb-8 text-balance">Vérifiez vos données avant de créer votre compte</p>

      {/* Information blocks */}
      <div className="space-y-5 mb-8">
        {/* Intérêts */}
        <div className="p-5 bg-secondary rounded-lg border border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Domaines d&apos;intérêt</h3>
          <div className="flex flex-wrap gap-2">
            {data.topics.map(topicId => {
              const topic = TOPIC_LABELS[topicId]
              return (
                <div
                  key={topicId}
                  className="inline-flex items-center px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg"
                >
                  <span className="text-xs font-medium text-foreground">{topic?.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Informations personnelles */}
        <div className="p-5 bg-secondary rounded-lg border border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Informations personnelles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-xs text-muted-foreground mb-1">Prénom</p>
              <p className="font-medium text-foreground text-sm">{data.firstName}</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-xs text-muted-foreground mb-1">Nom</p>
              <p className="font-medium text-foreground text-sm">{data.lastName}</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-xs text-muted-foreground mb-1">E-mail</p>
              <p className="font-medium text-foreground text-sm">{data.email}</p>
            </div>
            <div className="border-l-2 border-primary/30 pl-4">
              <p className="text-xs text-muted-foreground mb-1">Nom d&apos;utilisateur</p>
              <p className="font-medium text-foreground text-sm">@{data.username}</p>
            </div>
          </div>
        </div>

        {/* Security notice */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-foreground">
            Vos données sont chiffrées et protégées selon notre politique de confidentialité
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          disabled={isLoading}
          className="flex-1 h-11 rounded-lg font-medium"
        >
          Retour
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-medium transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Création...
            </span>
          ) : (
            <>
              Créer mon compte
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
