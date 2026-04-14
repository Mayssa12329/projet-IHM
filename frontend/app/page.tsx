'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Communauté</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="font-medium">
                Se connecter
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                S&apos;inscrire
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative h-[600px] overflow-hidden bg-background">
        <Image
          src="/images/hero-community.jpg"
          alt="Communauté bienveillante en discussion"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-6xl font-bold text-white mb-6 text-balance max-w-4xl">
            Un espace sûr pour discuter et s&apos;entraider
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-balance mb-8">
            Rejoignez une communauté bienveillante où vous pouvez partager vos préoccupations, poser des questions et trouver du soutien
          </p>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-3 h-auto text-lg">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h3 className="text-4xl font-bold text-foreground mb-4 text-center">Pourquoi nous choisir ?</h3>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Découvrez les avantages d&apos;une plateforme dédiée à votre bien-être et à votre croissance personnelle</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Discussions engagées',
              description: 'Participez à des conversations respectueuses avec des personnes qui partagent vos préoccupations et vos intérêts',
            },
            {
              title: 'Espace modéré',
              description: 'Un environnement sûr et inclusif avec une modération active 24/7 pour le bien-être de tous',
            },
            {
              title: '100% confidentiel',
              description: 'Vos données sont protégées et vos discussions restent privées et sécurisées',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-card rounded-lg border border-border hover:border-primary/30 transition-all hover:shadow-md"
            >
              <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories with Images */}
      <section className="bg-secondary/30 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-foreground mb-4 text-center">Nos 5 catégories</h3>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">Trouvez le domaine qui vous intéresse et connectez-vous avec d&apos;autres</p>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { id: 'psychology', name: 'Psychologique', image: '/images/category-psychology.jpg', desc: 'Bien-être & développement' },
              { id: 'legal', name: 'Juridique', image: '/images/category-legal.jpg', desc: 'Droits & conseils' },
              { id: 'health', name: 'Santé', image: '/images/category-health.jpg', desc: 'Médical & prévention' },
              { id: 'education', name: 'Éducatif', image: '/images/category-education.jpg', desc: 'Apprentissage' },
              { id: 'social', name: 'Social', image: '/images/category-social.jpg', desc: 'Communauté' },
            ].map((cat) => (
              <Link key={cat.id} href={`/forum/category/${cat.id}`}>
                <div className="group relative h-56 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all" />
                  <div className="absolute inset-0 flex flex-col items-end justify-end p-4">
                    <h4 className="font-semibold text-white">{cat.name}</h4>
                    <p className="text-white/80 text-xs">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h3 className="text-4xl font-bold text-foreground mb-16 text-center">Comment ça marche ?</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: 1, title: "S'inscrire", desc: 'Choisissez vos domaines d&apos;intérêt en 2 minutes' },
            { step: 2, title: 'Explorer', desc: 'Découvrez les discussions et la communauté' },
            { step: 3, title: 'Participer', desc: 'Partagez vos questions et expériences' },
            { step: 4, title: 'Grandir', desc: 'Apprenez et évoluez avec la communauté' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {item.step}
              </div>
              <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { stat: '10K+', label: 'Membres actifs' },
              { stat: '5K+', label: 'Discussions' },
              { stat: '98%', label: 'Satisfaction' },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-5xl font-bold mb-2">{item.stat}</p>
                <p className="text-primary-foreground/90">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-card border-2 border-primary/20 rounded-xl p-16 text-center">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            Prêt à rejoindre la communauté ?
          </h3>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
            Vous n&apos;êtes pas seul. Des milliers de personnes partagent leurs expériences et s&apos;entraident chaque jour dans un environnement sûr et bienveillant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-3 h-auto text-lg">
                S&apos;inscrire maintenant
              </Button>
            </Link>
            <Link href="/forum">
              <Button variant="outline" className="font-semibold px-10 py-3 h-auto text-lg">
                Découvrir le forum
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden shrink-0">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
                <span className="font-bold text-foreground">Communauté</span>
              </div>
              <p className="text-sm text-muted-foreground">Un espace sûr et bienveillant pour discuter et s&apos;entraider</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Catégories</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Psychologie</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Juridique</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Santé</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Légal</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-4">Support</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Communauté. Tous droits réservés. Créée avec soin pour vous.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
