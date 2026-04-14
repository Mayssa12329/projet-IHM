'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TopicsStepProps {
  onSubmit: (topics: string[]) => void
  selectedTopics: string[]
}

interface Topic {
  id: string
  label: string
  description: string
  icon: string
}

const TOPICS: Topic[] = [
  {
    id: 'psychology',
    label: 'Psychologique',
    description: 'Bien-être & développement',
    icon: '',
  },
  {
    id: 'legal',
    label: 'Juridique',
    description: 'Droits & conseils légaux',
    icon: '',
  },
  {
    id: 'health',
    label: 'Santé',
    description: 'Médical & prévention',
    icon: '',
  },
  {
    id: 'education',
    label: 'Éducatif',
    description: 'Ressources & apprentissage',
    icon: '',
  },
  {
    id: 'social',
    label: 'Social',
    description: 'Intégration, solidarité & vie en communauté',
    icon: '',
  },
  {
    id: 'business',
    label: 'Entrepreneuriat',
    description: 'Business & développement professionnel',
    icon: '',
  },
]

export default function TopicsStep({ onSubmit, selectedTopics }: TopicsStepProps) {
  const [selected, setSelected] = useState<string[]>(selectedTopics)

  const toggleTopic = (topicId: string) => {
    setSelected(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const handleContinue = () => {
    onSubmit(selected)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Choisissez vos intérêts</h2>
      <p className="text-muted-foreground mb-8 text-balance">
        Sélectionnez les domaines qui vous correspondent pour personnaliser votre expérience
      </p>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {TOPICS.map(topic => (
          <button
            key={topic.id}
            onClick={() => toggleTopic(topic.id)}
            className={`p-6 rounded-lg border transition-all text-left group cursor-pointer ${
              selected.includes(topic.id)
                ? 'border-primary bg-primary/8 shadow-md'
                : 'border-border bg-card hover:border-primary/30 hover:shadow-sm'
            }`}
            aria-pressed={selected.includes(topic.id)}
            role="button"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">{topic.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{topic.description}</p>
              </div>
              <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                selected.includes(topic.id)
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {selected.includes(topic.id) && (
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selection Info */}
      <div className="mb-8 p-4 bg-secondary rounded-lg">
        <p className="text-sm font-medium text-foreground">
          {selected.length === 0 
            ? 'Sélectionnez au moins un domaine pour continuer' 
            : `${selected.length} domaine${selected.length > 1 ? 's' : ''} sélectionné${selected.length > 1 ? 's' : ''}`
          }
        </p>
      </div>

      {/* Button */}
      <Button
        onClick={handleContinue}
        disabled={selected.length === 0}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continuer
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  )
}
