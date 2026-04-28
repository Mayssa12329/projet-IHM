'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-primary/10">
              <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Communauté</h1>
              <p className="text-xs text-muted-foreground">Un espace de discussion sûr</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="font-medium rounded-lg hover:bg-secondary transition-colors">
                Se connecter
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all hover:shadow-lg">
                S&apos;inscrire
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[700px] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-primary/10 rounded-full mb-8 border border-primary/20">
            <span className="text-sm font-semibold text-primary">Bienvenue dans notre communauté</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Un espace <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">sûr et bienveillant</span> pour vous exprimer
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Rejoignez une communauté dynamique où vous pouvez partager vos préoccupations, poser des questions et trouver du soutien auprès de personnes qui vous comprennent
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-3 h-auto text-lg rounded-lg transition-all hover:shadow-xl hover:scale-105">
                Commencer maintenant
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="font-semibold px-10 py-3 h-auto text-lg rounded-lg hover:bg-secondary transition-all">
                En savoir plus
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-border">
            <div>
              <p className="text-3xl font-bold text-primary">5K+</p>
              <p className="text-sm text-muted-foreground mt-1">Membres actifs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">10K+</p>
              <p className="text-sm text-muted-foreground mt-1">Discussions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground mt-1">Modération active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with SVG Illustrations */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Pourquoi nous choisir</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Découvrez les avantages d&apos;une plateforme dédiée à votre bien-être et à votre croissance personnelle</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="h-48 bg-gradient-to-br from-blue-500/10 to-blue-600/10 overflow-hidden relative flex items-center justify-center">
              <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32">
                <circle cx="75" cy="100" r="35" fill="#3B82F6" opacity="0.15" stroke="#3B82F6" strokeWidth="2"/>
                <circle cx="150" cy="100" r="4" fill="#3B82F6"/>
                <line x1="109" y1="100" x2="141" y2="100" stroke="#3B82F6" strokeWidth="2"/>
                <circle cx="225" cy="100" r="35" fill="#3B82F6" opacity="0.15" stroke="#3B82F6" strokeWidth="2"/>
                <text x="150" y="155" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">CONVERSATIONS</text>
              </svg>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">Discussions authentiques</h4>
              <p className="text-muted-foreground leading-relaxed">Participez à des conversations respectueuses avec des personnes qui partagent vos préoccupations et vos intérêts</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="h-48 bg-gradient-to-br from-purple-500/10 to-purple-600/10 overflow-hidden relative flex items-center justify-center">
              <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32">
                <rect x="80" y="50" width="140" height="100" fill="#A855F7" opacity="0.15" stroke="#A855F7" strokeWidth="2" rx="8"/>
                <circle cx="150" cy="70" r="8" fill="#A855F7"/>
                <line x1="130" y1="85" x2="170" y2="85" stroke="#A855F7" strokeWidth="2"/>
                <circle cx="120" cy="110" r="4" fill="#A855F7"/>
                <circle cx="180" cy="110" r="4" fill="#A855F7"/>
                <circle cx="150" cy="130" r="4" fill="#A855F7"/>
                <text x="150" y="165" textAnchor="middle" fill="#A855F7" fontSize="12" fontWeight="bold">MODÉRATION</text>
              </svg>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">Espace modéré et sûr</h4>
              <p className="text-muted-foreground leading-relaxed">Un environnement sûr et inclusif avec une modération active 24/7 pour le bien-être de tous</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <div className="h-48 bg-gradient-to-br from-green-500/10 to-green-600/10 overflow-hidden relative flex items-center justify-center">
              <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32">
                <path d="M 100 80 L 130 110 L 170 60" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="70" y="50" width="160" height="110" fill="none" stroke="#10B981" strokeWidth="2" rx="8" opacity="0.3"/>
                <circle cx="150" cy="105" r="50" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.2"/>
                <text x="150" y="165" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">CONFIDENTIALITÉ</text>
              </svg>
            </div>
            <div className="p-8">
              <h4 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">Sécurité garantie</h4>
              <p className="text-muted-foreground leading-relaxed">Vos données sont protégées et vos discussions restent privées avec les meilleures pratiques de sécurité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gradient-to-b from-secondary/30 to-transparent py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Nos domaines de discussion</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Explorez les 5 catégories et connectez-vous avec des personnes partageant vos intérêts</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { id: 'psychology', name: 'Psychologie', desc: 'Bien-être et développement', color: '#3B82F6', lightColor: '#EFF6FF' },
              { id: 'legal', name: 'Juridique', desc: 'Droits et conseils', color: '#A855F7', lightColor: '#FAF5FF' },
              { id: 'health', name: 'Santé', desc: 'Médical et prévention', color: '#EF4444', lightColor: '#FEF2F2' },
              { id: 'education', name: 'Éducation', desc: 'Ressources et apprentissage', color: '#F59E0B', lightColor: '#FFFBEB' },
              { id: 'social', name: 'Social', desc: 'Intégration et communauté', color: '#10B981', lightColor: '#F0FDF4' },
            ].map((cat) => (
              <Link key={cat.id} href={`/forum/category/${cat.id}`}>
                <div style={{ backgroundColor: cat.lightColor }} className="border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
                  <div style={{ color: cat.color }} className="text-4xl font-bold mb-3 transition-transform group-hover:scale-110">
                    {cat.id === 'psychology' && '🧠'.replace(/./g, '')}
                  </div>
                  <div style={{ color: cat.color }} className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    </svg>
                  </div>
                  <h4 style={{ color: cat.color }} className="font-semibold text-lg mb-2 group-hover:opacity-80 transition-opacity">{cat.name}</h4>
                  <p className="text-muted-foreground text-sm flex-grow">{cat.desc}</p>
                  <div style={{ color: cat.color }} className="mt-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Parcourir →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Comment ça marche</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Quatre étapes simples pour rejoindre la communauté</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: 1, title: "S'inscrire", desc: 'Créez votre compte et choisissez vos domaines' },
            { step: 2, title: 'Explorer', desc: 'Découvrez les discussions pertinentes' },
            { step: 3, title: 'Participer', desc: 'Posez vos questions et partagez vos idées' },
            { step: 4, title: 'Grandir', desc: 'Apprenez et évoluez avec la communauté' },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h4 className="font-semibold text-foreground text-lg mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
              {item.step < 4 && (
                <div className="hidden md:block absolute top-8 -right-4 text-primary/30 text-2xl font-bold">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 rounded-3xl mx-4 md:mx-0 mb-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Prêt à rejoindre la communauté</h3>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">Commencez dès maintenant et découvrez une communauté bienveillante et solidaire</p>
          <Link href="/signup">
            <Button className="bg-white text-primary hover:bg-primary-foreground font-semibold px-10 py-3 h-auto text-lg rounded-lg transition-all hover:shadow-xl">
              S&apos;inscrire gratuitement
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { stat: '5K+', label: 'Membres actifs' },
            { stat: '10K+', label: 'Discussions' },
            { stat: '24/7', label: 'Modération' },
          ].map((item, idx) => (
            <div key={idx} className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-all">
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">{item.stat}</p>
              <p className="text-muted-foreground text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-primary/10">
                  <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-foreground">Communauté</h3>
              </div>
              <p className="text-sm text-muted-foreground">Un espace sûr pour discuter et s&apos;entraider</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/forum" className="hover:text-primary transition-colors">Forum</Link></li>
                <li><Link href="#features" className="hover:text-primary transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">À propos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Communauté</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ressources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Communauté. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
