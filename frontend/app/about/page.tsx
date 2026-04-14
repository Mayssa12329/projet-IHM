'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Communauté</h1>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              S&apos;inscrire
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">À propos de Communauté</h2>
          <p className="text-xl text-primary-foreground/90">
            Une plateforme dédiée au bien-être, à l&apos;entraide et à la croissance personnelle
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        {/* Our Mission */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-6">Notre mission</h3>
          <p className="text-lg text-muted-foreground mb-4">
            Créer un espace sûr, bienveillant et inclusif où les gens peuvent se connecter, partager leurs expériences et s&apos;entraider. Nous croyons que tout le monde mérite d&apos;être entendu et soutenu dans son parcours personnel.
          </p>
          <p className="text-lg text-muted-foreground">
            Communauté est né de la conviction que les vraies connexions humaines et le soutien communautaire sont essentiels pour notre bien-être collectif.
          </p>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-8">Nos valeurs</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Entraide',
                description: 'Nous croyons à la force de la communauté et au pouvoir du soutien mutuel',
              },
              {
                title: 'Sécurité',
                description: 'Un environnement modéré et sécurisé où chacun se sent protégé et respecté',
              },
              {
                title: 'Croissance',
                description: 'Ensemble, nous apprenons, évoluons et nous développons personnellement',
              },
            ].map((value, idx) => (
              <div key={idx} className="p-6 bg-card rounded-lg border border-border">
                <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Explained */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-8">Nos 5 catégories</h3>
          <div className="space-y-6">
            {[
              {
                title: 'Psychologique',
                description: 'Discussions sur la santé mentale, le bien-être émotionnel, le développement personnel et la gestion du stress.',
              },
              {
                title: 'Juridique',
                description: 'Conseils et discussions sur les droits, les lois, et les questions légales qui vous concernent.',
              },
              {
                title: 'Santé',
                description: 'Partage d&apos;informations sur la prévention, le bien-être physique et les enjeux de santé.',
              },
              {
                title: 'Éducatif',
                description: 'Ressources d&apos;apprentissage, conseils pédagogiques et discussions sur l&apos;éducation.',
              },
              {
                title: 'Social',
                description: 'Intégration communautaire, solidarité et initiatives pour créer une vie en communauté plus harmonieuse.',
              },
            ].map((cat, idx) => (
              <div key={idx} className="p-6 bg-secondary/50 rounded-lg border border-border">
                <h4 className="text-lg font-semibold text-foreground mb-2">{cat.title}</h4>
                <p className="text-muted-foreground">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-foreground mb-8">Comment ça marche ?</h3>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Inscription simple',
                  description: 'Créez votre compte en 2 minutes en choisissant vos domaines d&apos;intérêt',
                },
                {
                  step: 2,
                  title: 'Explorez et connectez',
                  description: 'Parcourez les discussions ou créez les vôtres dans vos catégories préférées',
                },
                {
                  step: 3,
                  title: 'Participez respectueusement',
                  description: 'Engagez-vous dans des conversations constructives et bienveillantes',
                },
                {
                  step: 4,
                  title: 'Modération active',
                  description: 'Notre équipe de modérateurs veille à maintenir un espace sûr pour tous',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 pb-6 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team & Moderation */}
        <div className="mb-20 p-8 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Modération et équipe</h3>
          <p className="text-muted-foreground mb-4">
            Communauté est animée par une équipe dévouée de modérateurs et d&apos;administrateurs qui s&apos;engagent à maintenir un environnement sain et respectueux.
          </p>
          <p className="text-muted-foreground">
            Nos modérateurs veillent à ce que toutes les discussions respectent nos règles de communauté et que personne n&apos;abuse de la plateforme. Signalement et retours d&apos;expérience sont toujours les bienvenus.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-card border-2 border-primary/20 rounded-lg">
          <h3 className="text-2xl font-bold text-foreground mb-4">Prêt à rejoindre ?</h3>
          <p className="text-muted-foreground mb-8">
            Devenez membre de notre communauté et trouvez le soutien et l&apos;inspiration dont vous avez besoin
          </p>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 h-auto text-lg">
              S&apos;inscrire maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Communauté. Un espace pour discuter et s&apos;entraider.</p>
        </div>
      </footer>
    </main>
  )
}
