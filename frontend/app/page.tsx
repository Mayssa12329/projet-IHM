"use client";

import * as React from "react";
import Link from "next/link";

const ACCENT = "#4A6FA5";
const ACCENT_LIGHT = "#EEF3FA";
const ACCENT_MID = "#C7D8F0";
const TEXT_DARK = "#1C2B3A";
const TEXT_MID = "#6B7A8D";
const BG_WHITE = "#FFFFFF";
const BG_SOFT = "#F8FAFD";

const CATEGORIES = [
  {
    id: "juridique",
    name: "Juridique",
    desc: "Droits, lois, conseils légaux",
    color: "#4A6FA5",
    bg: "#EEF3FA",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=480&h=240&fit=crop",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="4" y="3" width="18" height="20" rx="3" stroke="#4A6FA5" strokeWidth="1.5" fill="#EEF3FA"/>
        <path d="M8 9h10M8 13h10M8 17h6" stroke="#4A6FA5" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "educatif",
    name: "Éducatif",
    desc: "Apprentissage, formation, savoir",
    color: "#2D7A4F",
    bg: "#E8F5EE",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=240&fit=crop",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 4L25 10L13 16L1 10L13 4Z" stroke="#2D7A4F" strokeWidth="1.5" fill="#E8F5EE" strokeLinejoin="round"/>
        <path d="M5 13v5c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5v-5" stroke="#2D7A4F" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "sociale",
    name: "Sociale",
    desc: "Vie en société, entraide, liens",
    color: "#7B4FA5",
    bg: "#F3EEFA",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&h=240&fit=crop",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="9" cy="10" r="4" stroke="#7B4FA5" strokeWidth="1.5" fill="#F3EEFA"/>
        <circle cx="18" cy="10" r="4" stroke="#7B4FA5" strokeWidth="1.5" fill="#F3EEFA"/>
        <path d="M2 22c0-3 3-5.5 7-5.5m6 0c4 0 7 2.5 7 5.5" stroke="#7B4FA5" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "sante",
    name: "Santé",
    desc: "Bien-être, médecine, hygiène",
    color: "#B83232",
    bg: "#FDECEA",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=480&h=240&fit=crop",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 5C13 5 6 9 6 15C6 18 9.1 20.5 13 20.5C16.9 20.5 20 18 20 15C20 9 13 5 13 5Z" stroke="#B83232" strokeWidth="1.5" fill="#FDECEA"/>
        <path d="M10.5 14.5h5M13 12v5" stroke="#B83232" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "psychologie",
    name: "Psychologie",
    desc: "Bien-être mental, émotions, soutien",
    color: "#B07A20",
    bg: "#FEF3E2",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=480&h=240&fit=crop",
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="11" r="6.5" stroke="#B07A20" strokeWidth="1.5" fill="#FEF3E2"/>
        <path d="M13 17.5v4M10 21.5h6" stroke="#B07A20" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M10.5 10c0-1.4 1.1-2.5 2.5-2.5" stroke="#B07A20" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

function Logo({ size = 36 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="2" y="4" width="25" height="17" rx="5" fill={ACCENT}/>
      <path d="M8 21.5l-4 5.5 8-3.5" fill={ACCENT}/>
      <rect x="13" y="17" width="25" height="14" rx="4" fill={ACCENT_MID}/>
      <path d="M31 31l4 5.5-7-3" fill={ACCENT_MID}/>
      <path d="M8 11h13M8 15h8" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M18 22h14M18 26h9" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function Navbar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${ACCENT_MID}`,
    }}>
      <div style={{
        maxWidth: 1120, margin: "0 auto", padding: "0 28px",
        height: 62, display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Logo size={38} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: TEXT_DARK, letterSpacing: "-0.3px", lineHeight: 1.1 }}>Communio</div>
            <div style={{ fontSize: 10, color: TEXT_MID, letterSpacing: "0.4px" }}>Forum communautaire</div>
          </div>
        </Link>
        <nav style={{ display: "flex", gap: 2 }}>
          {["Accueil", "Forum", "Catégories"].map((item) => (
            <Link key={item} href="#" style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 14,
              fontWeight: 500, color: TEXT_MID, textDecoration: "none",
            }}>{item}</Link>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/login" style={{
            padding: "8px 18px", borderRadius: 9, fontSize: 13, fontWeight: 600,
            color: ACCENT, textDecoration: "none", border: `1.5px solid ${ACCENT_MID}`,
          }}>Connexion</Link>
          <Link href="/signup" style={{
            padding: "8px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700,
            color: "#fff", textDecoration: "none", background: ACCENT,
          }}>S'inscrire</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1600&h=900&fit=crop"
          alt="Personnes qui discutent et partagent leurs connaissances"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(110deg, rgba(238,243,250,0.94) 0%, rgba(248,250,253,0.88) 45%, rgba(200,220,240,0.55) 100%)",
        }} />
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: BG_WHITE, border: `1px solid ${ACCENT_MID}`,
            padding: "5px 14px", borderRadius: 100, marginBottom: 26,
            fontSize: 12, fontWeight: 600, color: ACCENT,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4CAF78", display: "inline-block" }} />
            Communauté active — 48 200 membres
          </div>

          <h1 style={{
            fontSize: 50, fontWeight: 900, lineHeight: 1.08,
            color: TEXT_DARK, margin: "0 0 18px", letterSpacing: "-2px",
          }}>
            Apprenez,<br />
            <span style={{ color: ACCENT }}>partagez</span> et<br />
            avancez ensemble
          </h1>

          <p style={{ fontSize: 16, color: TEXT_MID, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 440 }}>
            Posez vos questions, échangez vos expériences et trouvez des réponses dans une communauté bienveillante — en droit, santé, éducation et plus.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/signup" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700,
              color: "#fff", textDecoration: "none", background: ACCENT,
              boxShadow: `0 6px 20px ${ACCENT}40`,
            }}>
              Rejoindre gratuitement
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/forum" style={{
              display: "inline-flex", alignItems: "center",
              padding: "14px 26px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              color: TEXT_DARK, textDecoration: "none",
              background: BG_WHITE, border: `1.5px solid ${ACCENT_MID}`,
            }}>Parcourir le forum</Link>
          </div>

          <div style={{ display: "flex", gap: 36, marginTop: 40 }}>
            {[["186k+", "Publications"], ["5", "Catégories"], ["3 400+", "Réponses / jour"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 22, fontWeight: 800, color: TEXT_DARK, letterSpacing: "-0.5px" }}>{v}</div>
                <div style={{ fontSize: 12, color: TEXT_MID, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section style={{ padding: "80px 28px", background: BG_SOFT }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 10px" }}>Nos thématiques</p>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: TEXT_DARK, margin: "0 0 10px", letterSpacing: "-0.8px" }}>5 espaces de discussion</h2>
          <p style={{ fontSize: 15, color: TEXT_MID, margin: 0 }}>Des experts et des passionnés vous répondent dans chaque domaine.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/forum/${cat.id}`} style={{
              textDecoration: "none", display: "block",
              background: BG_WHITE, borderRadius: 18,
              border: "1.5px solid #E8EEF6", overflow: "hidden",
              boxShadow: "0 2px 10px rgba(74,111,165,0.05)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              <div style={{ height: 100, overflow: "hidden", position: "relative" }}>
                <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(to bottom, transparent 20%, ${cat.bg}dd 100%)`,
                }} />
              </div>
              <div style={{ padding: "14px 16px 18px" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10, marginTop: -22, position: "relative",
                  border: `2px solid ${BG_WHITE}`, boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                }}>{cat.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: TEXT_DARK, marginBottom: 4 }}>{cat.name}</div>
                <div style={{ fontSize: 11, color: TEXT_MID, lineHeight: 1.5, marginBottom: 10 }}>{cat.desc}</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: cat.color }}>
                  Explorer
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke={cat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { color: ACCENT, bg: ACCENT_LIGHT, title: "Réponses vérifiées", desc: "Nos modérateurs garantissent la qualité des échanges.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={ACCENT} strokeWidth="1.5" fill={ACCENT_LIGHT}/><path d="M8 12l3 3 5-5" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { color: "#B07A20", bg: "#FEF3E2", title: "Communauté bienveillante", desc: "Un espace respectueux où chaque voix compte.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9H22L16 13.5L18.5 20.5L12 16.5L5.5 20.5L8 13.5L2 9H9.5L12 2Z" stroke="#B07A20" strokeWidth="1.5" fill="#FEF3E2" strokeLinejoin="round"/></svg> },
    { color: "#2D7A4F", bg: "#E8F5EE", title: "Accès libre & gratuit", desc: "Tout le contenu est accessible sans abonnement.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="#2D7A4F" strokeWidth="1.5" fill="#E8F5EE"/><path d="M3 9h18" stroke="#2D7A4F" strokeWidth="1.2"/><circle cx="17" cy="7" r="1.2" fill="#2D7A4F"/></svg> },
    { color: "#7B4FA5", bg: "#F3EEFA", title: "Experts disponibles", desc: "Professionnels et spécialistes répondent à vos questions.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="4" stroke="#7B4FA5" strokeWidth="1.5" fill="#F3EEFA"/><circle cx="17" cy="9" r="4" stroke="#7B4FA5" strokeWidth="1.5" fill="#F3EEFA"/><path d="M3 20c0-2.8 2.7-5 6-5m5 0c3.3 0 6 2.2 6 5" stroke="#7B4FA5" strokeWidth="1.3" strokeLinecap="round" fill="none"/></svg> },
  ];

  return (
    <section style={{ padding: "80px 28px", background: BG_WHITE }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 10px" }}>Pourquoi Communio</p>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: TEXT_DARK, margin: "0 0 16px", letterSpacing: "-0.8px", lineHeight: 1.18 }}>
              L'espace qu'il vous faut pour trouver des réponses
            </h2>
            <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.75, margin: "0 0 32px" }}>
              Que vous ayez une question juridique, un doute sur votre santé ou envie d'échanger — Communio vous connecte aux bonnes personnes.
            </p>
            <Link href="/signup" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 26px", borderRadius: 11, fontSize: 14,
              fontWeight: 700, color: "#fff", textDecoration: "none", background: ACCENT,
            }}>Créer mon compte</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {items.map((item) => (
              <div key={item.title} style={{ background: BG_SOFT, borderRadius: 16, padding: "20px 18px", border: "1.5px solid #E8EEF6" }}>
                <div style={{ marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT_DARK, marginBottom: 5 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: TEXT_MID, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section style={{ padding: "80px 28px", background: ACCENT, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Logo size={50} />
        <h2 style={{ fontSize: 36, fontWeight: 900, color: "#fff", margin: "18px 0 12px", letterSpacing: "-1px", lineHeight: 1.1 }}>
          Prêt à rejoindre la communauté ?
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", margin: "0 0 30px", lineHeight: 1.7 }}>
          Inscription gratuite en 30 secondes. Pas de carte bancaire requise.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/signup" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 30px", borderRadius: 12, fontSize: 14, fontWeight: 700,
            color: ACCENT, textDecoration: "none", background: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}>
            S'inscrire gratuitement
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/forum" style={{
            display: "inline-flex", alignItems: "center",
            padding: "14px 26px", borderRadius: 12, fontSize: 14, fontWeight: 600,
            color: "#fff", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)",
          }}>Voir le forum</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#EFF4FB", borderTop: `1px solid ${ACCENT_MID}`, padding: "24px 28px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <Logo size={28} />
          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>Communio</span>
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          {["Forum", "Catégories", "À propos", "Contact"].map((l) => (
            <Link key={l} href="#" style={{ fontSize: 13, color: TEXT_MID, textDecoration: "none" }}>{l}</Link>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#A0AABB", margin: 0 }}>© 2025 Communio</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <Navbar />
      <Hero />
      <Categories />
      <WhyUs />
      <CTAFinal />
      <Footer />
    </main>
  );
}