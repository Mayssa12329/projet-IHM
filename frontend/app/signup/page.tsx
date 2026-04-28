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

const STEPS = ["Compte", "Profil", "Thèmes"];

const CATEGORIES = [
  { id: "juridique", name: "Juridique", color: "#4A6FA5", bg: "#EEF3FA" },
  { id: "educatif", name: "Éducatif", color: "#2D7A4F", bg: "#E8F5EE" },
  { id: "sociale", name: "Sociale", color: "#7B4FA5", bg: "#F3EEFA" },
  { id: "sante", name: "Santé", color: "#B83232", bg: "#FDECEA" },
  { id: "psychologie", name: "Psychologie", color: "#B07A20", bg: "#FEF3E2" },
];

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

function PasswordStrength({ password }: { password: string }) {
  const strength = password.length === 0 ? 0
    : password.length < 6 ? 1
    : password.length < 10 && /[A-Z]/.test(password) ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
    : 3;

  const labels = ["", "Faible", "Moyen", "Fort", "Très fort"];
  const colors = ["", "#EF4444", "#F59E0B", "#3B82F6", "#10B981"];

  if (!password) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 3,
            background: i <= strength ? colors[strength] : ACCENT_MID,
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <div style={{ fontSize: 11, color: colors[strength], fontWeight: 600 }}>{labels[strength]}</div>
    </div>
  );
}

export default function SignupPage() {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    email: "", password: "", confirmPassword: "",
    nom: "", prenom: "", pseudo: "",
    topics: [] as string[],
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function update(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  function toggleTopic(id: string) {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(id)
        ? prev.topics.filter((t) => t !== id)
        : [...prev.topics, id],
    }));
  }

  function validateStep(s: number) {
    const newErrors: Record<string, string> = {};
    if (s === 0) {
      if (!formData.email) newErrors.email = "L'e-mail est requis";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "E-mail invalide";
      if (!formData.password) newErrors.password = "Le mot de passe est requis";
      else if (formData.password.length < 8) newErrors.password = "Minimum 8 caractères";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (s === 1) {
      if (!formData.nom) newErrors.nom = "Le nom est requis";
      if (!formData.prenom) newErrors.prenom = "Le prénom est requis";
      if (!formData.pseudo) newErrors.pseudo = "Le pseudo est requis";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleNext() {
    if (!validateStep(step)) return;
    if (step < 2) { setStep(step + 1); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");
      window.location.href = "/login?registered=true";
    } catch (err: any) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      {/* Left panel */}
      <div style={{ position: "relative", overflow: "hidden", background: ACCENT }}>
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=1200&fit=crop"
          alt="Communauté"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, ${ACCENT}F0 0%, #1C2B3AE0 100%)`,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "48px",
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo size={40} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.1 }}>Communio</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Forum communautaire</div>
            </div>
          </Link>

          <div>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: "#fff", lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 16px" }}>
              Votre espace pour apprendre et partager
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, margin: "0 0 36px" }}>
              Créez votre compte en 3 étapes simples et rejoignez une communauté bienveillante.
            </p>

            {/* Step indicators */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: i <= step ? "#fff" : "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "background 0.3s",
                  }}>
                    {i < step ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3L11.5 4" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span style={{ fontSize: 13, fontWeight: 700, color: i === step ? ACCENT : "rgba(255,255,255,0.5)" }}>{i + 1}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: i === step ? 700 : 400, color: i <= step ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s" }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 16, padding: "18px 22px",
          }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              {["48 200", "186k", "3 400+"].map((n, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
                    {["Membres", "Posts", "Réponses/jour"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", background: BG_WHITE, overflow: "auto" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* Progress bar */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: TEXT_DARK }}>Étape {step + 1} sur 3</span>
              <span style={{ fontSize: 13, color: TEXT_MID }}>{STEPS[step]}</span>
            </div>
            <div style={{ height: 4, background: ACCENT_LIGHT, borderRadius: 4 }}>
              <div style={{ height: "100%", width: `${((step + 1) / 3) * 100}%`, background: ACCENT, borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: TEXT_DARK, margin: "0 0 6px", letterSpacing: "-0.7px" }}>
              {["Créez votre compte", "Votre profil", "Vos centres d'intérêt"][step]}
            </h1>
            <p style={{ fontSize: 14, color: TEXT_MID, margin: 0 }}>
              {["Déjà membre ? ", "Comment souhaitez-vous être appelé ?", "Choisissez vos thèmes favoris"][step]}
              {step === 0 && <Link href="/login" style={{ color: ACCENT, fontWeight: 700, textDecoration: "none" }}>Se connecter</Link>}
            </p>
          </div>

          {errors.submit && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10,
              padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#B91C1C",
            }}>
              {errors.submit}
            </div>
          )}

          {/* Step 0 - Account */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <InputField label="Adresse e-mail" type="email" value={formData.email} onChange={(v) => update("email", v)} error={errors.email} placeholder="vous@exemple.com" icon="email" />
              <div>
                <InputField label="Mot de passe" type={showPassword ? "text" : "password"} value={formData.password} onChange={(v) => update("password", v)} error={errors.password} placeholder="Minimum 8 caractères" icon="lock"
                  rightAction={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", color: TEXT_MID, padding: 0 }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  }
                />
                <PasswordStrength password={formData.password} />
              </div>
              <InputField label="Confirmer le mot de passe" type="password" value={formData.confirmPassword} onChange={(v) => update("confirmPassword", v)} error={errors.confirmPassword} placeholder="Répétez votre mot de passe" icon="lock" />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 4 }}>
                <input type="checkbox" id="terms" checked={formData.acceptTerms} onChange={(e) => update("acceptTerms", e.target.checked)} style={{ marginTop: 2, accentColor: ACCENT }} />
                <label htmlFor="terms" style={{ fontSize: 13, color: TEXT_MID, lineHeight: 1.6 }}>
                  J'accepte les{" "}
                  <Link href="/terms" style={{ color: ACCENT, textDecoration: "none", fontWeight: 600 }}>Conditions d'utilisation</Link>
                  {" "}et la{" "}
                  <Link href="/privacy" style={{ color: ACCENT, textDecoration: "none", fontWeight: 600 }}>Politique de confidentialité</Link>
                </label>
              </div>
            </div>
          )}

          {/* Step 1 - Profile */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <InputField label="Prénom" type="text" value={formData.prenom} onChange={(v) => update("prenom", v)} error={errors.prenom} placeholder="Jean" icon="user" />
                <InputField label="Nom" type="text" value={formData.nom} onChange={(v) => update("nom", v)} error={errors.nom} placeholder="Dupont" icon="user" />
              </div>
              <InputField label="Pseudo (nom affiché)" type="text" value={formData.pseudo} onChange={(v) => update("pseudo", v)} error={errors.pseudo} placeholder="jean_dupont" icon="at" />
              <div style={{
                background: BG_SOFT, border: `1px solid ${ACCENT_LIGHT}`, borderRadius: 12,
                padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="8" cy="8" r="6.5" stroke={ACCENT} strokeWidth="1.3"/>
                  <path d="M8 7v4.5M8 5.5v.5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p style={{ fontSize: 12, color: TEXT_MID, margin: 0, lineHeight: 1.6 }}>
                  Votre pseudo sera visible par tous les membres. Choisissez quelque chose de mémorable !
                </p>
              </div>
            </div>
          )}

          {/* Step 2 - Topics */}
          {step === 2 && (
            <div>
              <p style={{ fontSize: 13, color: TEXT_MID, marginBottom: 16, lineHeight: 1.6 }}>
                Sélectionnez les thèmes qui vous intéressent pour personnaliser votre fil d'actualité.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {CATEGORIES.map((cat) => {
                  const selected = formData.topics.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleTopic(cat.id)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 18px",
                        background: selected ? cat.bg : BG_WHITE,
                        border: `1.5px solid ${selected ? cat.color : ACCENT_MID}`,
                        borderRadius: 12, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, color: selected ? cat.color : TEXT_DARK }}>
                        {cat.name}
                      </span>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: selected ? cat.color : "transparent",
                        border: `1.5px solid ${selected ? cat.color : ACCENT_MID}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}>
                        {selected && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M2 5.5L4.5 8L9 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p style={{ fontSize: 12, color: TEXT_MID, marginTop: 12 }}>
                {formData.topics.length} thème{formData.topics.length !== 1 ? "s" : ""} sélectionné{formData.topics.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1, padding: "13px",
                  border: `1.5px solid ${ACCENT_MID}`, borderRadius: 11,
                  background: BG_WHITE, color: TEXT_DARK, fontSize: 14,
                  fontWeight: 600, cursor: "pointer",
                }}
              >
                Retour
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={loading || (step === 0 && !formData.acceptTerms)}
              style={{
                flex: 2, padding: "13px",
                background: loading || (step === 0 && !formData.acceptTerms) ? "#A0B8D8" : ACCENT,
                color: "#fff", border: "none", borderRadius: 11,
                fontSize: 14, fontWeight: 700,
                cursor: loading || (step === 0 && !formData.acceptTerms) ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {loading ? "Création..." : step === 2 ? "Créer mon compte" : "Continuer"}
              {!loading && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8C2.5 5 5 3 8 3s5.5 2 6.5 5c-1 3-3.5 5-6.5 5S2.5 11 1.5 8Z" stroke={TEXT_MID} strokeWidth="1.3"/>
      <circle cx="8" cy="8" r="2" stroke={TEXT_MID} strokeWidth="1.3"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2l12 12M6.5 6.7A2 2 0 009.3 9.5M4 4.4C2.6 5.4 1.8 6.7 1.5 8c1 3 3.5 5 6.5 5 1.4 0 2.7-.4 3.8-1.2M6.2 3.3C6.8 3.1 7.4 3 8 3c3 0 5.5 2 6.5 5-.3 1-.9 2-1.8 2.8" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function InputField({
  label, type, value, onChange, error, placeholder, icon, rightAction,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; icon?: string; rightAction?: React.ReactNode;
}) {
  const iconMap: Record<string, React.ReactNode> = {
    email: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke={TEXT_MID} strokeWidth="1.3"/><path d="M1.5 4L8 9.5L14.5 4" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    lock: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke={TEXT_MID} strokeWidth="1.3"/><path d="M5 7V5a3 3 0 016 0v2" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    user: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke={TEXT_MID} strokeWidth="1.3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/></svg>,
    at: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke={TEXT_MID} strokeWidth="1.3"/><path d="M11 8c0 2 .8 3 2 3s2-2 2-3a7 7 0 10-2 4.9" stroke={TEXT_MID} strokeWidth="1.3" strokeLinecap="round"/></svg>,
  };

  return (
    <div>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: TEXT_DARK, marginBottom: 6 }}>{label}</label>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            {iconMap[icon]}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: `11px ${rightAction ? "44px" : "14px"} 11px ${icon ? "40px" : "14px"}`,
            border: `1.5px solid ${error ? "#FCA5A5" : ACCENT_MID}`,
            borderRadius: 10, fontSize: 14, color: TEXT_DARK,
            outline: "none", background: BG_WHITE, boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.target.style.borderColor = error ? "#EF4444" : ACCENT)}
          onBlur={(e) => (e.target.style.borderColor = error ? "#FCA5A5" : ACCENT_MID)}
        />
        {rightAction && (
          <div style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)" }}>
            {rightAction}
          </div>
        )}
      </div>
      {error && <p style={{ fontSize: 12, color: "#EF4444", margin: "4px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#EF4444" strokeWidth="1.2"/><path d="M6 4v2.5M6 8v.3" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
        {error}
      </p>}
    </div>
  );
}