'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  ShieldCheck, 
  TrendingUp, 
  Brain, 
  Scale, 
  Stethoscope, 
  GraduationCap, 
  Users2, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      {/* Header - Navigation Haute Définition */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100 transition-transform group-hover:scale-105">
              <Image 
                src="/chat_8708617.png" 
                alt="Logo Communauté" 
                width={28} 
                height={28}
                className="brightness-0 invert"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Communauté</h1>
          </Link>
          <div className="flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link href="/forum" className="hover:text-blue-600 transition-colors">Forum</Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">Connexion</Link>
            <Link href="/signup">
              <Button className="bg-slate-900 hover:bg-blue-600 text-white rounded-full px-6 transition-all duration-300">
                Nous rejoindre
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Image Immersive */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop" 
            alt="Équipe travaillant ensemble"
            fill
            className="object-cover opacity-50 transition-scale duration-[10s] hover:scale-110"
            priority
          />
          {/* Dégradé pour la lisibilité IHM */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Notre Mission Sociale
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Cultiver le lien <br/> <span className="text-blue-400 font-light italic">au-delà du numérique</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Une plateforme conçue pour l'humain, où l'expertise rencontre l'empathie pour créer un environnement d'échange sécurisé et constructif.
          </p>
        </div>
      </section>

      {/* Section Engagement & Image Réelle */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-100/50 rounded-[2.5rem] blur-2xl group-hover:bg-blue-200/50 transition-colors" />
            <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" 
                alt="Support collaboratif"
                fill
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Pourquoi nous existons ?</h3>
              <div className="h-1 w-20 bg-blue-600 rounded-full" />
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Dans un monde de plus en plus connecté mais paradoxalement plus isolé, nous offrons un refuge. Notre approche repose sur la <strong>qualité des échanges</strong> plutôt que sur la quantité des interactions.
            </p>

            <div className="grid gap-6">
              {[
                { title: "Sécurité des données", text: "Chiffrement de bout en bout pour vos échanges privés.", icon: ShieldCheck },
                { title: "Experts certifiés", text: "Accès à des ressources validées par des professionnels.", icon: CheckCircle2 },
                { title: "Inclusion numérique", text: "Une interface accessible à tous les âges et profils.", icon: Users2 }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg hover:shadow-slate-100 transition-all">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-500 leading-snug">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Univers et Thématiques - Style Grid Moderne */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Nos Piliers d'Échange</h3>
            <p className="text-slate-500">Chaque domaine est modéré par des passionnés pour garantir une expérience sereine.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Psychologie', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100' },
              { title: 'Droit', icon: Scale, color: 'text-amber-600', bg: 'bg-amber-100' },
              { title: 'Santé', icon: Stethoscope, color: 'text-rose-600', bg: 'bg-rose-100' },
              { title: 'Éducation', icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
              { title: 'Social', icon: Users2, color: 'text-cyan-600', bg: 'bg-cyan-100' },
            ].map((cat, i) => (
              <div key={i} className="group bg-white p-8 rounded-3xl border border-slate-200/60 flex flex-col items-center text-center transition-all hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 cursor-pointer">
                <div className={`w-16 h-16 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:rotate-12`}>
                  <cat.icon size={32} />
                </div>
                <span className="font-bold text-slate-800 tracking-tight">{cat.title}</span>
                <span className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Entrer</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Design Épuré et Puissant */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-24 overflow-hidden">
          {/* Image de fond discrète pour le CTA */}
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?q=80&w=2070&auto=format&fit=crop" 
              alt="Interaction"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="relative z-10 text-center space-y-8">
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Rejoignez une communauté <br/> qui vous ressemble.
            </h3>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              L'inscription est gratuite et prend moins de deux minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl shadow-blue-500/20 transition-all">
                Créer mon compte
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 rounded-full px-12 h-16 text-lg backdrop-blur-md">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimaliste */}
      <footer className="border-t border-slate-100 bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Image src="/chat_8708617.png" alt="Logo" width={20} height={20} className="brightness-0 invert" />
              </div>
              <span className="font-bold text-slate-900 text-xl tracking-tight">Communauté</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm">
              Construire un espace numérique plus sain, ensemble.
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-10 text-sm font-semibold text-slate-500">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Conditions</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-300">
            © {new Date().getFullYear()} Communauté. Tous droits réservés.
          </p>
        </div>
      </footer>
    </main>
  )
}