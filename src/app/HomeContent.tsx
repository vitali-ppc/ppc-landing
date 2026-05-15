"use client";

import React, { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_B6_API_BASE || "http://localhost:8000";

export default function HomeContent() {
  return (
    <div
      style={{
        background: "#0F1116",
        color: "#FFFFFF",
        fontFamily: "system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
      }}
    >
      <Hero />
      <HowItWorks />
      <MeetTheTeam />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

const Hero: React.FC = () => (
  <section
    style={{
      padding: "80px 24px 60px",
      background: "linear-gradient(180deg, #15181D 0%, #0F1116 100%)",
      borderBottom: "1px solid #1F232B",
    }}
  >
    <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          display: "inline-block",
          padding: "6px 14px",
          background: "#00FFE71A",
          border: "1px solid #00FFE744",
          borderRadius: "999px",
          color: "#00FFE7",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "24px",
        }}
      >
        🚀 Private Beta · Limited Spots
      </div>
      <h1
        style={{
          fontSize: "56px",
          fontWeight: 800,
          lineHeight: 1.1,
          margin: "0 0 20px",
          background: "linear-gradient(135deg, #FFFFFF, #00FFE7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
        }}
      >
        Your PPC agency.
        <br />
        In a cabinet.
      </h1>
      <p
        style={{
          fontSize: "20px",
          color: "#A0A0A0",
          maxWidth: "680px",
          margin: "0 auto 36px",
          lineHeight: 1.5,
        }}
      >
        AI agents that manage your Google Ads autonomously, bidding, budget,
        creative, reporting. You see{" "}
        <strong style={{ color: "#FFFFFF" }}>everything</strong> they do in real-time.
        Approve big calls, the rest runs while you sleep.
      </p>

      <WaitlistForm source="hero" />

      <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <a
          href="/auth/register"
          style={{
            padding: "10px 18px",
            background: "#3B82F6",
            color: "#FFFFFF",
            textDecoration: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Get started, free
        </a>
        <a
          href="/auth/login"
          style={{
            padding: "10px 18px",
            background: "transparent",
            color: "#A0A0A0",
            textDecoration: "none",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            border: "1px solid #2D3340",
          }}
        >
          Sign in
        </a>
      </div>

      <a
        href="/auth/register"
        style={{
          marginTop: "60px",
          display: "block",
          maxWidth: "900px",
          margin: "60px auto 0",
          padding: "60px 20px",
          background: "linear-gradient(135deg, #15181D, #1F232B)",
          borderRadius: "16px",
          color: "#FFFFFF",
          textDecoration: "none",
          border: "1px solid #2D3340",
        }}
      >
        <div style={{ color: "#A0A0A0", fontSize: "12px", marginBottom: "8px" }}>
          🎬 Live demo (free signup)
        </div>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>🐝🛡️</div>
        <div style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
          Watch Buzz &amp; Aegis work →
        </div>
        <div style={{ color: "#A0A0A0", fontSize: "13px" }}>
          See 2 AI agents analyse 3 campaigns and propose changes in real-time
        </div>
      </a>
    </div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section style={{ padding: "80px 24px", background: "#0F1116" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <SectionHeader title="How it works" subtitle="From sign-up to AI-on-autopilot in 3 steps" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <Step
          n={1}
          title="Connect Google Ads"
          body="OAuth, read-only at first. We see your campaigns, you stay in control of the account."
        />
        <Step
          n={2}
          title="Pick autonomy level"
          body="L1 Co-pilot (AI suggests, you approve) then L2 (AI acts on small changes) then L3 (full autopilot)."
        />
        <Step
          n={3}
          title="Watch agents work"
          body="Real-time dashboard. Mascots show what each agent is doing. Every action logged with reasoning."
        />
      </div>
    </div>
  </section>
);

const Step: React.FC<{ n: number; title: string; body: string }> = ({ n, title, body }) => (
  <div
    style={{
      padding: "28px",
      background: "#15181D",
      border: "1px solid #1F232B",
      borderRadius: "16px",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: "#00FFE7",
        color: "#0F1116",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        fontWeight: 800,
        marginBottom: "16px",
      }}
    >
      {n}
    </div>
    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>{title}</h3>
    <p style={{ color: "#A0A0A0", lineHeight: 1.6, margin: 0, fontSize: "14px" }}>{body}</p>
  </div>
);

const TEAM = [
  { emoji: "🐝", name: "Buzz", role: "Bidding Agent", desc: "Корректирует ставки по перформансу. Объясняет каждое решение.", status: "live" },
  { emoji: "🛡️", name: "Aegis", role: "Risk Agent", desc: "Ревьюит решения Buzz. Блокирует опасные. Поясняет почему.", status: "live" },
  { emoji: "🐻", name: "Maximus", role: "Orchestrator", desc: "Координирует команду. Эскалирует тебе только важное.", status: "coming" },
  { emoji: "🦊", name: "Vox", role: "Strategy", desc: "Распределяет бюджет между кампаниями и платформами.", status: "coming" },
  { emoji: "🎨", name: "Mira", role: "Creative", desc: "Генерит ad copy + картинки. Запускает A/B тесты.", status: "coming" },
  { emoji: "🦉", name: "Sage", role: "Research", desc: "Ищет новые ключи, аудитории, конкурентов.", status: "coming" },
  { emoji: "📊", name: "Echo", role: "Reporting", desc: "Weekly digest по email/Telegram человеческим языком.", status: "coming" },
];

const MeetTheTeam: React.FC = () => (
  <section style={{ padding: "80px 24px", background: "#15181D" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <SectionHeader title="Meet your agency" subtitle="Каждый агент специалист со своей экспертизой" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
        {TEAM.map((m) => (
          <div
            key={m.name}
            style={{
              padding: "20px",
              background: "#0F1116",
              border: m.status === "live" ? "1px solid #4ECDC444" : "1px solid #2D3340",
              borderRadius: "14px",
              opacity: m.status === "live" ? 1 : 0.6,
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>{m.emoji}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700 }}>{m.name}</span>
              {m.status === "live" ? (
                <span style={{ fontSize: "10px", padding: "2px 6px", background: "#4ECDC422", color: "#4ECDC4", borderRadius: "4px", fontWeight: 600 }}>LIVE</span>
              ) : (
                <span style={{ fontSize: "10px", padding: "2px 6px", background: "#FFA72622", color: "#FFA726", borderRadius: "4px", fontWeight: 600 }}>SOON</span>
              )}
            </div>
            <div style={{ color: "#A0A0A0", fontSize: "12px", marginBottom: "10px" }}>{m.role}</div>
            <div style={{ color: "#C0C6D7", fontSize: "13px", lineHeight: 1.5 }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const TIERS = [
  {
    name: "L1 Co-pilot",
    price: "$99",
    period: "/month",
    desc: "AI предлагает, ты апруваешь каждое действие",
    features: ["Buzz + Aegis активны", "1 Google Ads аккаунт", "Approve every change", "Weekly digest", "Email support"],
    highlight: false,
  },
  {
    name: "L2 Approval",
    price: "$199",
    period: "/month",
    desc: "AI действует, апрув только на крупное",
    features: ["Всё из L1", "Auto-apply small changes", "Risk Agent enforcement", "Real-time alerts", "Priority support"],
    highlight: true,
  },
  {
    name: "L3 Autonomous",
    price: "$399",
    period: "/month",
    desc: "Полный автопилот, AI ведёт сам",
    features: ["Всё из L2", "Full autonomy", "Creative Agent (генерация креативов)", "Multi-platform (Meta, TikTok)", "Dedicated onboarding"],
    highlight: false,
  },
];

const Pricing: React.FC = () => (
  <section style={{ padding: "80px 24px", background: "#0F1116" }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <SectionHeader
        title="Pricing"
        subtitle="Гибкая 3-уровневая модель: начинай с co-pilot, переходи к автопилоту"
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {TIERS.map((t) => (
          <div
            key={t.name}
            style={{
              padding: "32px",
              background: "#15181D",
              border: t.highlight ? "2px solid #00FFE7" : "1px solid #1F232B",
              borderRadius: "16px",
              position: "relative",
            }}
          >
            {t.highlight && (
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#00FFE7",
                  color: "#0F1116",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Most Popular
              </div>
            )}
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>{t.name}</h3>
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "44px", fontWeight: 800 }}>{t.price}</span>
              <span style={{ color: "#A0A0A0", fontSize: "16px" }}>{t.period}</span>
            </div>
            <p style={{ color: "#A0A0A0", margin: "0 0 24px", fontSize: "14px", minHeight: "40px" }}>
              {t.desc}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
              {t.features.map((f) => (
                <li
                  key={f}
                  style={{
                    color: "#C0C6D7",
                    fontSize: "14px",
                    marginBottom: "10px",
                    paddingLeft: "22px",
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: "#4ECDC4" }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              style={{
                display: "block",
                padding: "12px",
                background: t.highlight ? "linear-gradient(135deg, #00FFE7, #00BFAE)" : "transparent",
                border: t.highlight ? "none" : "1px solid #2D3340",
                color: t.highlight ? "#0F1116" : "#FFFFFF",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 700,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Get on waitlist
            </a>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", color: "#666", fontSize: "12px", marginTop: "32px" }}>
        Free 14-day trial · No credit card · Cancel anytime
      </p>
    </div>
  </section>
);

const CTA: React.FC = () => (
  <section
    id="waitlist"
    style={{
      padding: "100px 24px",
      background: "linear-gradient(180deg, #0F1116 0%, #15181D 100%)",
    }}
  >
    <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>
        Ready to fire your agency?
      </h2>
      <p style={{ color: "#A0A0A0", fontSize: "18px", marginBottom: "32px", lineHeight: 1.5 }}>
        Join the private beta. We&apos;re opening to{" "}
        <strong style={{ color: "#FFFFFF" }}>30 first SMB owners</strong> who want their Google Ads
        run by AI agents, not consultants.
      </p>
      <WaitlistForm source="cta-bottom" />
    </div>
  </section>
);

const WaitlistForm: React.FC<{ source: string }> = ({ source }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/waitlist/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setPosition(data.position);
      } else {
        setStatus("error");
        setMessage(data.detail || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Server unreachable. Try again later.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "20px 24px",
          background: "#4ECDC422",
          border: "1px solid #4ECDC466",
          borderRadius: "12px",
          color: "#4ECDC4",
          maxWidth: "480px",
          margin: "0 auto",
          fontSize: "15px",
        }}
      >
        ✅ {message} {position && <strong>You&apos;re #{position}</strong>}
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        gap: "10px",
        maxWidth: "480px",
        margin: "0 auto",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          flex: 1,
          minWidth: "240px",
          padding: "14px 16px",
          fontSize: "15px",
          background: "#1F232B",
          border: "1px solid #2D3340",
          borderRadius: "10px",
          color: "#FFFFFF",
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "14px 24px",
          fontSize: "15px",
          fontWeight: 700,
          background: status === "loading" ? "#00BFAE" : "linear-gradient(135deg, #00FFE7, #00BFAE)",
          color: "#0F1116",
          border: "none",
          borderRadius: "10px",
          cursor: status === "loading" ? "wait" : "pointer",
        }}
      >
        {status === "loading" ? "Adding..." : "Join waitlist →"}
      </button>
      {status === "error" && (
        <div style={{ width: "100%", color: "#FF6B6B", fontSize: "13px", marginTop: "8px" }}>
          ⚠️ {message}
        </div>
      )}
    </form>
  );
};

const Footer: React.FC = () => (
  <footer
    style={{
      padding: "40px 24px",
      borderTop: "1px solid #1F232B",
      background: "#0F1116",
      textAlign: "center",
      color: "#666",
      fontSize: "13px",
    }}
  >
    <div style={{ marginBottom: "8px" }}>
      🐝 B6, Autonomous PPC Cabinet · Private beta · 2026
    </div>
    <div>
      <a href="/b6" style={{ color: "#7F9CF5", textDecoration: "none", margin: "0 8px" }}>
        Live demo
      </a>
      ·
      <a href="/privacy-policy" style={{ color: "#7F9CF5", textDecoration: "none", margin: "0 8px" }}>
        Privacy
      </a>
      ·
      <a href="/terms-of-service" style={{ color: "#7F9CF5", textDecoration: "none", margin: "0 8px" }}>
        Terms
      </a>
    </div>
  </footer>
);

const SectionHeader: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: "48px" }}>
    <h2 style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 12px" }}>{title}</h2>
    <p style={{ color: "#A0A0A0", fontSize: "16px", margin: 0 }}>{subtitle}</p>
  </div>
);
