"use client";

import * as React from "react";
import Link from "next/link";

const ACCENT = "#4A6FA5";
const ACCENT_LIGHT = "#EEF3FA";
const ACCENT_MID = "#C7D8F0";
const TEXT_DARK = "#1C2B3A";
const TEXT_MID = "#6B7A8D";
const BG_WHITE = "#FFFFFF";

function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="2" y="4" width="25" height="17" rx="5" fill={ACCENT} />
      <path d="M8 21.5l-4 5.5 8-3.5" fill={ACCENT} />
      <rect x="13" y="17" width="25" height="14" rx="4" fill={ACCENT_MID} />
      <path d="M31 31l4 5.5-7-3" fill={ACCENT_MID} />
      <path d="M8 11h13M8 15h8" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18 22h14M18 26h9" stroke={ACCENT} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur de connexion");
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      {/* Left panel - image */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: ACCENT,
      }}>
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&h=1200&fit=crop"
          alt="Communauté Communio"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, ${ACCENT}EE 0%, #1C2B3ACC 100%)`,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "48px",
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo size={40} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-0.3px", lineHeight: 1.1 }}>Communio</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", letterSpacing: "0.4px" }}>Forum communautaire</div>
            </div>
          </Link>

          <div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-1.5px", marginBottom: 16 }}>
              Rejoignez des milliers de membres actifs
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 36 }}>
              Posez vos questions, partagez vos expériences et trouvez des réponses dans une communauté bienveillante.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[["48k+", "Membres"], ["186k+", "Publications"], ["5", "Catégories"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "20px 24px",
          }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic" }}>
              "Grâce à Communio, j'ai pu obtenir des réponses juridiques claires en moins d'une heure. Une communauté vraiment engagée."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop"
                alt="Membre"
                style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.3)" }}
              />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Karim B.</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>Membre depuis 2 ans</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "48px", background: BG_WHITE,
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: TEXT_DARK, margin: "0 0 8px", letterSpacing: "-0.8px" }}>
              Bon retour parmi nous
            </h1>
            <p style={{ fontSize: 14, color: TEXT_MID, margin: 0 }}>
              Pas encore de compte ?{" "}
              <Link href="/signup" style={{ color: ACCENT, fontWeight: 700, textDecoration: "none" }}>S'inscrire</Link>
            </p>
          </div>

          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FCA5A5",
              borderRadius: 10, padding: "12px 16px", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.4"/>
                <path d="M8 5v3.5M8 11v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ fontSize: 13, color: "#B91C1C" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TEXT_DARK, marginBottom: 6 }}>
                Adresse e-mail
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="3" width="14" height="10" rx="2" stroke={TEXT_MID} strokeWidth="1.3"/>
                    <path d="M1.5 4L8 9.5L14.5 4" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                  style={{
                    width: "100%", padding: "12px 14px 12px 42px",
                    border: `1.5px solid ${ACCENT_MID}`, borderRadius: 10,
                    fontSize: 14, color: TEXT_DARK, outline: "none",
                    background: BG_WHITE, boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.target.style.borderColor = ACCENT_MID)}
                />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>Mot de passe</label>
                <Link href="/forgot-password" style={{ fontSize: 12, color: ACCENT, textDecoration: "none", fontWeight: 600 }}>
                  Mot de passe oublié ?
                </Link>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={TEXT_MID} strokeWidth="1.3"/>
                    <path d="M5 7V5a3 3 0 016 0v2" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", padding: "12px 44px 12px 42px",
                    border: `1.5px solid ${ACCENT_MID}`, borderRadius: 10,
                    fontSize: 14, color: TEXT_DARK, outline: "none",
                    background: BG_WHITE, boxSizing: "border-box",
                    transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                  onBlur={(e) => (e.target.style.borderColor = ACCENT_MID)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", padding: 0, color: TEXT_MID,
                  }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1.5 8C2.5 5 5 3 8 3s5.5 2 6.5 5c-1 3-3.5 5-6.5 5S2.5 11 1.5 8Z" stroke={TEXT_MID} strokeWidth="1.3"/>
                      <circle cx="8" cy="8" r="2" stroke={TEXT_MID} strokeWidth="1.3"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 2l12 12M6.5 6.7A2 2 0 009.3 9.5M4 4.4C2.6 5.4 1.8 6.7 1.5 8c1 3 3.5 5 6.5 5 1.4 0 2.7-.4 3.8-1.2M6.2 3.3C6.8 3.1 7.4 3 8 3c3 0 5.5 2 6.5 5-.3 1-.9 2-1.8 2.8" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" id="remember" style={{ width: 16, height: 16, accentColor: ACCENT }} />
              <label htmlFor="remember" style={{ fontSize: 13, color: TEXT_MID }}>Se souvenir de moi</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                background: loading ? "#A0B8D8" : ACCENT,
                color: "#fff", border: "none", borderRadius: 11,
                fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "background 0.15s",
              }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                    <path d="M14 8a6 6 0 00-6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
              <div style={{ flex: 1, height: 1, background: ACCENT_MID }} />
              <span style={{ fontSize: 12, color: TEXT_MID }}>ou continuer avec</span>
              <div style={{ flex: 1, height: 1, background: ACCENT_MID }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { name: "Google", icon: <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18Z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/></svg> },
                { name: "GitHub", icon: <svg width="18" height="18" viewBox="0 0 16 16" fill={TEXT_DARK}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8Z"/></svg> },
              ].map((provider) => (
                <button
                  key={provider.name}
                  type="button"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "11px", border: `1.5px solid ${ACCENT_MID}`, borderRadius: 10,
                    background: BG_WHITE, cursor: "pointer", fontSize: 13, fontWeight: 600,
                    color: TEXT_DARK, transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = ACCENT_LIGHT)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = BG_WHITE)}
                >
                  {provider.icon}
                  {provider.name}
                </button>
              ))}
            </div>
          </form>

          <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: TEXT_MID }}>
            En vous connectant, vous acceptez nos{" "}
            <Link href="/terms" style={{ color: ACCENT, textDecoration: "none" }}>Conditions d'utilisation</Link>
            {" "}et notre{" "}
            <Link href="/privacy" style={{ color: ACCENT, textDecoration: "none" }}>Politique de confidentialité</Link>.
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}