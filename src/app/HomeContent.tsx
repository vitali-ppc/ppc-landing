"use client";

import React from "react";

/* FAQ content, one source for both the visible section and the FAQPage schema */
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Is my Google Ads data safe?",
    a: "You sign in with Google and choose which accounts to connect. They stay in your name the whole time, and the dashboard changes nothing until you confirm a change.",
  },
  {
    q: "What if I make a bad change?",
    a: "Every change shows a preview before it applies, and every applied change is logged with the numbers before it, so you can roll it back from the dashboard.",
  },
  {
    q: "How is this different from Google Ads itself?",
    a: "All your accounts on one screen, with the problems already found and ranked by 14 automatic checks, instead of clicking through each account and campaign to find them.",
  },
  {
    q: "What does it cost?",
    a: "Early access is free and needs no credit card, because billing is not open yet. When billing opens you choose a plan or walk away; nothing is charged automatically.",
  },
  {
    q: "Where are the AI agents?",
    a: "In development, and not running on live accounts. The dashboard comes first; the agents will build on the same checks to propose changes for you.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.kampaio.com/#organization",
      name: "Kampaio",
      url: "https://www.kampaio.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.kampaio.com/logo.png",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.linkedin.com/company/kampaio",
        "https://www.crunchbase.com/organization/kampaio",
        "https://x.com/kampaio_ai",
        "https://github.com/vitali-ppc",
      ],
      description:
        "Kampaio builds a Google Ads dashboard for marketers and owners who run their own accounts: every account on one screen, automatic checks, and changes with a preview and a rollback. AI agents are in development.",
      knowsAbout: [
        "Google Ads",
        "Pay-Per-Click Advertising",
        "Search Engine Marketing",
        "Performance Max Campaigns",
        "Smart Bidding",
        "Quality Score Optimization",
        "Conversion Tracking",
        "Responsive Search Ads",
        "Keyword Match Types",
        "Attribution Modeling",
        "Incrementality Testing",
        "Anomaly Detection in PPC",
        "PPC Audit and Diagnostics",
        "AI-Powered Campaign Management",
        "Autonomous Marketing Agents",
      ],
      knowsLanguage: ["en"],
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.kampaio.com/#website",
      url: "https://www.kampaio.com",
      name: "Kampaio",
      description: "Google Ads dashboard for marketers and PPC managers",
      publisher: { "@id": "https://www.kampaio.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.kampaio.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.kampaio.com/#faq",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ── Styles (states, responsive, motion live here — inline can't do them) ── */
const STYLES = `
.kx{
  --bg:#F6F8FB; --surface:#FFFFFF; --surface-2:#EEF2F8; --border:#DCE3ED;
  --border-soft:#E7ECF3; --text:#0D1320; --muted:#5B6979; --muted-2:#37445A;
  --accent:#0A7C8C; --accent-2:#0A8294; --teal:#0B7A68; --warn:#B45309;
  --danger:#DC2626; --mono:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace;
  background:var(--bg); color:var(--text);
  font-family:system-ui,-apple-system,"Segoe UI",sans-serif; min-height:100vh;
}
.kx a{ color:inherit; }
.kx ::selection{ background:var(--accent); color:#FFFFFF; }

/* top bar */
.kx-bar{ position:sticky; top:0; z-index:50; backdrop-filter:blur(10px);
  background:rgba(246,248,251,.8); border-bottom:1px solid var(--border-soft); }
.kx-bar-in{ max-width:1140px; margin:0 auto; padding:14px 24px;
  display:flex; align-items:center; justify-content:space-between; gap:16px; }
.kx-logo{ display:flex; align-items:center; gap:9px; font-weight:700; font-size:17px;
  letter-spacing:-.01em; text-decoration:none; color:var(--text); }
.kx-dot{ width:10px; height:10px; border-radius:99px; background:var(--accent);
  box-shadow:0 0 12px var(--accent); }
.kx-navlinks{ display:flex; align-items:center; gap:6px; }
.kx-navlink{ padding:8px 12px; border-radius:8px; font-size:14px; color:var(--muted);
  text-decoration:none; transition:color .15s,background .15s; }
.kx-navlink:hover{ color:var(--text); background:var(--surface); }
.kx-bar-cta{ display:flex; align-items:center; gap:8px; }

/* buttons */
.kx-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px;
  font-weight:700; font-size:15px; border-radius:10px; text-decoration:none;
  cursor:pointer; transition:transform .12s,box-shadow .15s,background .15s,border-color .15s;
  border:1px solid transparent; }
.kx-btn:focus-visible{ outline:none; box-shadow:0 0 0 3px var(--accent); }
.kx-btn-primary{ background:linear-gradient(135deg,var(--accent),var(--accent-2));
  color:#FFFFFF; padding:13px 22px; }
.kx-btn-primary:hover{ transform:translateY(-1px); box-shadow:0 10px 28px -12px var(--accent); }
.kx-btn-ghost{ background:transparent; border-color:var(--border); color:var(--text);
  padding:13px 20px; }
.kx-btn-ghost:hover{ border-color:var(--accent); color:var(--accent); }
.kx-btn-sm{ padding:9px 16px; font-size:14px; }
.kx-btn:disabled{ opacity:.6; cursor:wait; }

/* hero */
.kx-hero{ border-bottom:1px solid var(--border-soft);
  background:radial-gradient(1100px 520px at 78% -8%,rgba(10,124,140,.10),transparent 60%),
    linear-gradient(180deg,#FFFFFF 0%,var(--bg) 70%); }
.kx-hero-in{ max-width:1140px; margin:0 auto; padding:72px 24px 76px;
  display:grid; grid-template-columns:1.05fr .95fr; gap:56px; align-items:center; }
.kx-eyebrow{ display:inline-flex; align-items:center; gap:8px; padding:6px 13px;
  border:1px solid var(--border); background:var(--surface); border-radius:999px;
  font-family:var(--mono); font-size:12px; letter-spacing:.04em; text-transform:uppercase;
  color:var(--muted-2); margin-bottom:22px; }
.kx-pain{ font-family:var(--mono); font-size:13.5px; color:var(--warn);
  letter-spacing:.01em; margin:0 0 14px; }
.kx-h1{ font-size:clamp(40px,6vw,62px); font-weight:800; line-height:1.04;
  letter-spacing:-.02em; margin:0 0 18px;
  background:linear-gradient(135deg,var(--text) 30%,var(--accent));
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.kx-sub{ font-size:clamp(16px,2.1vw,19px); color:var(--muted-2); line-height:1.55;
  max-width:560px; margin:0 0 28px; }
.kx-sub strong{ color:var(--text); }
.kx-cta-row{ display:flex; gap:12px; flex-wrap:wrap; margin-bottom:30px; }

.kx-trust{ list-style:none; margin:22px 0 0; padding:0; display:flex; flex-wrap:wrap; gap:10px 18px; }
.kx-trust li{ position:relative; padding-left:22px; font-size:14px; line-height:1.45; color:var(--ink-2, #475569); }
.kx-trust li::before{ content:""; position:absolute; left:0; top:6px; width:12px; height:12px; border-radius:99px;
  border:2px solid var(--teal, #14b8a6); }
@media (max-width:720px){ .kx-trust{ flex-direction:column; gap:8px; } }
/* economic wedge */
.kx-wedge{ display:grid; grid-template-columns:repeat(3,1fr); gap:10px; max-width:560px;
  margin-top:26px; }
.kx-wcell{ border:1px solid var(--border); border-radius:12px; padding:13px 14px;
  background:var(--surface); }
.kx-wcell.is-b6{ border-color:rgba(10,124,140,.5);
  background:linear-gradient(180deg,rgba(10,124,140,.08),transparent); }
.kx-wlabel{ font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); margin-bottom:6px; }
.kx-wprice{ font-family:var(--mono); font-size:18px; font-weight:700; color:var(--text); }
.kx-wcell.is-b6 .kx-wprice{ color:var(--accent); }
.kx-wnote{ font-size:11px; color:var(--muted); margin-top:4px; }
.kx-wprice.is-old{ color:var(--muted); text-decoration:line-through; text-decoration-color:var(--danger); }

/* live agent feed (right column) */
.kx-feed{ background:var(--surface); border:1px solid var(--border);
  border-radius:18px; overflow:hidden; box-shadow:0 24px 60px -34px rgba(13,19,32,.20); }
.kx-feed-top{ display:flex; align-items:center; justify-content:space-between;
  padding:14px 16px; border-bottom:1px solid var(--border-soft); background:var(--surface-2); }
.kx-feed-title{ display:flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:var(--muted-2); }
.kx-live{ display:inline-flex; align-items:center; gap:6px; font-family:var(--mono);
  font-size:11px; color:var(--teal); text-transform:uppercase; letter-spacing:.06em; }
.kx-live::before{ content:""; width:7px; height:7px; border-radius:99px; background:var(--teal);
  animation:kx-pulse 1.8s ease-in-out infinite; }
.kx-feed-body{ padding:8px; }
.kx-row{ display:flex; gap:11px; padding:12px 12px; border-radius:12px;
  animation:kx-rise .5s ease both; }
.kx-row+.kx-row{ margin-top:2px; }
.kx-row:nth-child(2){ animation-delay:.08s } .kx-row:nth-child(3){ animation-delay:.16s }
.kx-row:nth-child(4){ animation-delay:.24s } .kx-row:nth-child(5){ animation-delay:.32s }
.kx-ava{ flex:none; width:34px; height:34px; border-radius:9px; background:var(--surface-2);
  display:flex; align-items:center; justify-content:center; color:var(--accent); }
.kx-rmain{ flex:1; min-width:0; }
.kx-rwho{ font-size:13px; font-weight:600; color:var(--text); }
.kx-rwhat{ font-size:12.5px; color:var(--muted-2); line-height:1.45; margin-top:2px; }
.kx-rnum{ font-family:var(--mono); color:var(--text); }
.kx-chip{ flex:none; align-self:center; font-family:var(--mono); font-size:10px;
  font-weight:600; letter-spacing:.05em; padding:3px 7px; border-radius:6px; }
.kx-chip.ok{ color:var(--teal); background:rgba(78,205,196,.14); }
.kx-chip.hold{ color:var(--warn); background:rgba(255,167,38,.14); }
.kx-chip.sent{ color:var(--accent); background:rgba(10,124,140,.12); }

/* sections */
.kx-sec{ padding:84px 24px; }
.kx-sec-in{ max-width:1140px; margin:0 auto; }
.kx-sec.alt{ background:var(--surface); }
.kx-h2{ font-size:clamp(28px,4vw,40px); font-weight:800; letter-spacing:-.02em; margin:0 0 12px; }
.kx-sec-sub{ color:var(--muted); font-size:16px; margin:0 0 44px; max-width:620px; }

/* bento / steps */
.kx-bento{ display:grid; grid-template-columns:repeat(6,1fr); gap:16px; }
.kx-card{ background:var(--surface-2); border:1px solid var(--border-soft);
  border-radius:16px; padding:26px; transition:border-color .15s,transform .15s; }
.kx-sec.alt .kx-card{ background:var(--bg); }
.kx-card:hover{ border-color:var(--border); transform:translateY(-2px); }
.kx-step-n{ width:38px; height:38px; border-radius:10px; background:var(--accent);
  color:#FFFFFF; display:flex; align-items:center; justify-content:center;
  font-weight:800; font-size:18px; margin-bottom:16px; }
.kx-card h3{ font-size:18px; font-weight:700; margin:0 0 8px; }
.kx-card p{ color:var(--muted-2); font-size:14px; line-height:1.6; margin:0; }
.kx-mono-tag{ font-family:var(--mono); font-size:11px; text-transform:uppercase;
  letter-spacing:.06em; color:var(--accent); margin-top:18px; }

/* autonomy ladder */
.kx-ladder{ display:flex; gap:10px; flex-wrap:wrap; margin-top:4px; }
/* Horizontal padding is 8px, not 12px, and the badge inside loses a pixel each side.
   Measured on the live page at 1440px: the row has 315px and L1 plus L2 wanted 329px,
   so the pair wrapped and each rung sat on its own line. The trim buys 20px. */
.kx-rung{ font-family:var(--mono); font-size:12px; padding:7px 8px; border-radius:8px;
  border:1px solid var(--border); color:var(--muted-2); }
/* No margin-left here: the space in the markup already separates badge from label,
   and adding 4px put back a fifth of what the padding trim had just saved. */
.kx-rung .kx-stat{ padding:2px 5px; }
.kx-rung b{ color:var(--accent); }

/* team */
.kx-grid-auto{ display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
.kx-agent{ background:var(--bg); border:1px solid var(--border); border-radius:14px; padding:20px;
  transition:border-color .15s,transform .15s; }
.kx-agent.live{ border-color:rgba(78,205,196,.4); }
.kx-agent.soon{ opacity:.62; }
.kx-agent:hover{ transform:translateY(-2px); }
.kx-ic{ width:46px; height:46px; border-radius:12px; display:flex; align-items:center;
  justify-content:center; background:rgba(10,124,140,.10); color:var(--accent); margin-bottom:14px; }
.kx-ttl-ic{ display:inline-flex; color:var(--accent); }
.kx-ttl-ic svg{ width:16px; height:16px; }
.kx-agent .nm{ display:flex; align-items:center; gap:8px; margin-bottom:4px; }
.kx-agent .nm span{ font-size:18px; font-weight:700; }
.kx-stat{ font-family:var(--mono); font-size:10px; padding:2px 6px; border-radius:5px; font-weight:600; }
.kx-stat.l{ background:rgba(78,205,196,.16); color:var(--teal); }
.kx-stat.s{ background:rgba(255,167,38,.16); color:var(--warn); }
.kx-agent .ro{ color:var(--muted); font-size:12px; margin-bottom:10px; }
.kx-agent .de{ color:var(--muted-2); font-size:13px; line-height:1.5; }

/* pricing */
.kx-tiers{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; align-items:start; }
.kx-tier{ background:var(--surface); border:1px solid var(--border-soft); border-radius:18px;
  padding:30px; position:relative; transition:transform .15s,border-color .15s; }
.kx-tier:hover{ transform:translateY(-3px); border-color:var(--border); }
.kx-tier.hot{ border:1.5px solid var(--accent); background:linear-gradient(180deg,rgba(10,124,140,.05),var(--surface)); }
.kx-badge{ position:absolute; top:-12px; left:50%; transform:translateX(-50%);
  background:var(--accent); color:#FFFFFF; padding:4px 12px; border-radius:999px;
  font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; white-space:nowrap; }
.kx-tier h3{ font-size:17px; font-weight:700; margin:0 0 8px; }
.kx-price{ font-family:var(--mono); font-size:42px; font-weight:800; }
.kx-per{ color:var(--muted); font-size:15px; font-family:var(--mono); }
.kx-tier .td{ color:var(--muted); font-size:14px; margin:8px 0 22px; min-height:40px; }
.kx-tier ul{ list-style:none; padding:0; margin:0 0 26px; }
.kx-tier li{ color:var(--muted-2); font-size:14px; margin-bottom:10px; padding-left:24px; position:relative; }
.kx-tier li::before{ content:"✓"; position:absolute; left:0; color:var(--teal); font-weight:700; }
.kx-fineprint{ text-align:center; color:var(--muted); font-size:12px; margin-top:30px; }
.kx-fineprint .hi{ color:var(--muted-2); }

/* cta + footer + form */
.kx-cta{ background:radial-gradient(800px 300px at 50% 0%,rgba(10,124,140,.08),transparent 60%),
  linear-gradient(180deg,var(--bg),#EEF2F8); }
.kx-form{ display:flex; gap:10px; max-width:480px; flex-wrap:wrap; }
.kx-input{ flex:1; min-width:230px; padding:14px 16px; font-size:15px; background:var(--surface-2);
  border:1px solid var(--border); border-radius:10px; color:var(--text); outline:none;
  transition:border-color .15s,box-shadow .15s; }
.kx-input:focus{ border-color:var(--accent); box-shadow:0 0 0 3px rgba(10,124,140,.18); }
.kx-input::placeholder{ color:var(--muted); }
.kx-ok{ padding:18px 22px; background:rgba(78,205,196,.14); border:1px solid rgba(78,205,196,.45);
  border-radius:12px; color:var(--teal); max-width:480px; font-size:15px; }
.kx-err{ width:100%; color:var(--danger); font-size:13px; margin-top:6px; }
.kx-foot{ padding:44px 24px; border-top:1px solid var(--border-soft); color:var(--muted); font-size:13px; }
.kx-foot-in{ max-width:1140px; margin:0 auto; display:flex; justify-content:space-between;
  gap:16px; flex-wrap:wrap; align-items:center; }
.kx-foot a{ color:var(--muted-2); text-decoration:none; }
.kx-foot a:hover{ color:var(--accent); }
.kx-foot-links a{ margin-left:18px; }

.kx-tiers.two{ grid-template-columns:repeat(2,1fr); max-width:780px; margin-left:auto; margin-right:auto; }
@keyframes kx-pulse{ 0%,100%{ opacity:1 } 50%{ opacity:.35 } }
@keyframes kx-rise{ from{ opacity:0; transform:translateY(8px) } to{ opacity:1; transform:none } }

/* tablet */
@media (max-width:960px){
  .kx-hero-in{ grid-template-columns:1fr; gap:40px; padding:56px 24px 60px; }
  .kx-bento{ grid-template-columns:1fr 1fr; }
  .kx-tiers, .kx-tiers.two{ grid-template-columns:1fr; max-width:460px; margin:0 auto; }
}
/* phone */
@media (max-width:640px){
  .kx-navlinks{ display:none; }
  .kx-bento{ grid-template-columns:1fr; }
  .kx-wedge{ grid-template-columns:1fr; }
  .kx-foot-in{ flex-direction:column; text-align:center; }
  .kx-foot-links a{ margin:0 9px; }
}
@media (prefers-reduced-motion:reduce){
  .kx *,.kx *::before,.kx *::after{ animation:none !important; transition:none !important; }
}
.kx-faq{ margin-top:28px; display:flex; flex-direction:column; gap:12px; }
.kx-faq-item{ background:var(--surface); border:1px solid var(--border); border-radius:14px; overflow:hidden; transition:border-color .15s ease, box-shadow .15s ease; }
.kx-faq-item:hover{ border-color:var(--accent); }
.kx-faq-item[open]{ border-color:var(--accent); box-shadow:0 1px 3px rgba(13,19,32,.06); }
.kx-faq-q{ display:flex; align-items:center; justify-content:space-between; gap:16px; cursor:pointer; padding:18px 22px; font-size:17px; font-weight:600; color:var(--text); list-style:none; }
.kx-faq-q::-webkit-details-marker{ display:none; }
.kx-faq-chev{ flex:0 0 auto; color:var(--muted); transition:transform .2s ease; }
.kx-faq-item[open] .kx-faq-chev{ transform:rotate(180deg); color:var(--accent); }
.kx-faq-a{ margin:0; padding:0 22px 20px; color:var(--muted-2); line-height:1.65; }
`;

/* ── Data ──────────────────────────────────────────────────────────────── */
// Four rows a working engine can actually produce, not four an ideal one would.
// Budget and target ROAS at campaign level, re-enabling paused keywords, and the
// audit thresholds that decide where to look: 10% of impressions lost to budget,
// and spend past 500 with no conversions in the window.
const FEED = [
  { icon: "shield", who: "Audit · Spend, no conversions", what: <><span className="kx-rnum">2</span> campaigns spent <span className="kx-rnum">$500</span> with zero conversions this window</>, chip: "flagged", cls: "sent" },
  { icon: "chart", who: "Audit · Lost to budget", what: <>Search &middot; FR is losing <span className="kx-rnum">18%</span> of impressions to budget</>, chip: "flagged", cls: "sent" },
  { icon: "bid", who: "Change · Budget", what: <>Budget <span className="kx-rnum">+15%</span> on Search &middot; FR, previewed before it applied</>, chip: "applied", cls: "ok" },
  { icon: "search", who: "Search terms · Negatives", what: <><span className="kx-rnum">12</span> negatives ready, shown in a preview first</>, chip: "review", cls: "hold" },
];

const TEAM = [
  { icon: "bid", name: "Buzz", role: "Bidding Agent", desc: "Will propose budget and target ROAS changes from the same checks, with the reason next to each.", status: "next" },
  { icon: "shield", name: "Aegis", role: "Risk Agent", desc: "Will review every proposed change and block the risky ones before they reach your account.", status: "next" },
  { icon: "chart", name: "Echo", role: "Reporting Agent", desc: "Will send a weekly digest by email or Telegram, in plain English.", status: "next" },
];

const TIERS = [
  {
    name: "Free", price: "Free", period: "early access",
    desc: "For one account you run yourself.",
    features: ["1 Google Ads account", "14 automatic campaign checks", "Search terms and negatives", "Changes with preview and rollback", "Change log"],
    highlight: true, status: "live",
  },
  {
    name: "Pro", price: "", period: "",
    desc: "For freelancers and small agencies.",
    features: ["Up to 5 Google Ads accounts", "Everything in Free", "All accounts on one screen", "Multi-currency totals"],
    highlight: false, status: "next",
  },
];

/* ── Icons (clean monoline, no emoji) ───────────────────────────────────── */
const ICONS: Record<string, React.ReactNode> = {
  bid: <><path d="M3 17l6-6 4 4 7-7" /><path d="M17 7h4v4" /></>,
  shield: <path d="M12 3l7 3v5.5c0 4.2-2.9 7.3-7 8.5-4.1-1.2-7-4.3-7-8.5V6z" />,
  stack: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
  spark: <path d="M12 3l1.9 5.4L19.5 10l-5.6 1.6L12 17l-1.9-5.4L4.5 10l5.6-1.6z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  chart: <><path d="M4 20V11M10 20V5M16 20v-6" /><path d="M3 20h18" /></>,
};
const AgentIcon: React.FC<{ id: string }> = ({ id }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {ICONS[id]}
  </svg>
);

/* ── Sections ──────────────────────────────────────────────────────────── */
const TopBar: React.FC = () => (
  <header className="kx-bar">
    <div className="kx-bar-in">
      <a href="/" className="kx-logo"><span className="kx-dot" aria-hidden />kampaio</a>
      <nav className="kx-navlinks" aria-label="Primary">
        <a className="kx-navlink" href="/pricing">Pricing</a>
        <a className="kx-navlink" href="/tools/roas-calculator">ROAS calculator</a>
        <a className="kx-navlink" href="/blog">Blog</a>
      </nav>
      <div className="kx-bar-cta">
        <a className="kx-btn kx-btn-ghost kx-btn-sm" href="https://dashboard.kampaio.com/">Sign in</a>
        <a className="kx-btn kx-btn-primary kx-btn-sm" href="https://dashboard.kampaio.com/">Start free</a>
      </div>
    </div>
  </header>
);

const Hero: React.FC = () => (
  <section className="kx-hero">
    <div className="kx-hero-in">
      <div>
        <span className="kx-eyebrow"><span className="kx-dot" aria-hidden />Early access</span>
        <p className="kx-pain">ROAS tanked overnight? pMax burning budget? Ten accounts, ten tabs?</p>
        <h1 className="kx-h1">Every Google Ads account.<br />One screen.</h1>
        <p className="kx-sub">
          <strong>Kampaio</strong> is a Google Ads dashboard: it shows every account you run on one
          screen, checks what is wasting money, and applies the changes you confirm.
        </p>
        <p className="kx-sub">
          See what changed, what is wasting money and what to fix first. Change budgets
          and targets with <strong>a preview before it applies</strong> and a rollback after.
        </p>
        <div className="kx-cta-row">
          <a className="kx-btn kx-btn-primary" href="https://dashboard.kampaio.com/">Start free &rarr;</a>
          <a className="kx-btn kx-btn-ghost" href="https://dashboard.kampaio.com/">Open the dashboard</a>
        </div>

        {/* Four facts, each one checkable on the product itself. No customer
            counts, no ratings, no badges we have not earned: an unearned trust
            row costs more than an empty one. */}
        <ul className="kx-trust" aria-label="What you are agreeing to">
          <li>Sign in with Google. Your accounts stay in your name</li>
          <li>Nothing changes until you confirm it, and every change can be rolled back</li>
          <li>Free during early access, no card needed</li>
        </ul>

        <div className="kx-wedge" role="group" aria-label="Cost comparison">
          <div className="kx-wcell">
            <div className="kx-wlabel">Agency</div>
            <div className="kx-wprice is-old">$2–5K</div>
            <div className="kx-wnote">/mo, and you stay blind</div>
          </div>
          <div className="kx-wcell">
            <div className="kx-wlabel">PPC tools</div>
            <div className="kx-wprice is-old">$299</div>
            <div className="kx-wnote">/mo, you still operate it</div>
          </div>
          <div className="kx-wcell is-b6">
            <div className="kx-wlabel">Kampaio</div>
            <div className="kx-wprice">Free</div>
            <div className="kx-wnote">early access, every account on one screen</div>
          </div>
        </div>
      </div>

      {/* live agent feed — the product's soul: visible, real-time work */}
      <div className="kx-feed" aria-label="Example of what the dashboard shows">
        <div className="kx-feed-top">
          <div className="kx-feed-title"><span className="kx-ttl-ic" aria-hidden><AgentIcon id="bid" /></span> What the dashboard shows</div>
          {/* The rows below are an illustration of the kind of call each agent
              makes, not a feed of live accounts. The badge used to read "live",
              which turned the sample numbers into claims. */}
          <span className="kx-live">example</span>
        </div>
        <div className="kx-feed-body">
          {FEED.map((r, i) => (
            <div className="kx-row" key={i}>
              <div className="kx-ava" aria-hidden><AgentIcon id={r.icon} /></div>
              <div className="kx-rmain">
                <div className="kx-rwho">{r.who}</div>
                <div className="kx-rwhat">{r.what}</div>
              </div>
              <span className={`kx-chip ${r.cls}`}>{r.chip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section className="kx-sec alt" id="how">
    <div className="kx-sec-in">
      <h2 className="kx-h2">From sign-in to the first fix</h2>
      <p className="kx-sec-sub">Three steps, a few minutes. You stay in control of every account the whole time.</p>
      <div className="kx-bento">
        <div className="kx-card" style={{ gridColumn: "span 2" }}>
          <div className="kx-step-n">1</div>
          <h3>Sign in with Google</h3>
          <p>Connect the Google Ads accounts you manage. You keep ownership of every account.</p>
        </div>
        <div className="kx-card" style={{ gridColumn: "span 2" }}>
          <div className="kx-step-n">2</div>
          <h3>Open the audit</h3>
          <p>14 checks run on every campaign and show what needs attention first: spend with no conversions, ROAS below target, impressions lost to budget, campaigns that stopped.</p>
        </div>
        <div className="kx-card" style={{ gridColumn: "span 2" }}>
          <div className="kx-step-n">3</div>
          <h3>Fix it from the dashboard</h3>
          <p>Change a budget, a target, geo or keywords. Preview the change, apply it, roll it back if the numbers say so.</p>
          <div className="kx-mono-tag">every change · preview first · rollback after</div>
        </div>
      </div>
    </div>
  </section>
);

const MeetTheTeam: React.FC = () => (
  <section className="kx-sec" id="team">
    <div className="kx-sec-in">
      <h2 className="kx-h2">What comes next: AI agents</h2>
      <p className="kx-sec-sub">The dashboard is the product today. Next come agents that use the same checks to propose changes for you. They are in development, and nothing here runs on autopilot yet.</p>
      <div className="kx-grid-auto">
        {TEAM.map((m) => (
          <div key={m.name} className={`kx-agent ${m.status === "live" ? "live" : "soon"}`}>
            <div className="kx-ic" aria-hidden><AgentIcon id={m.icon} /></div>
            <div className="nm">
              <span>{m.name}</span>
              <span className={`kx-stat ${m.status === "live" ? "l" : "s"}`}>{m.status === "live" ? "LIVE" : "NEXT"}</span>
            </div>
            <div className="ro">{m.role}</div>
            <div className="de">{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing: React.FC = () => (
  <section className="kx-sec alt" id="pricing">
    <div className="kx-sec-in">
      <h2 className="kx-h2">Pricing</h2>
      <p className="kx-sec-sub">Free during early access. Billing is not open yet, so there is nothing to cancel.</p>
      <div className="kx-tiers two">
        {TIERS.map((t) => (
          <div key={t.name} className={`kx-tier ${t.highlight ? "hot" : ""}`}>
            {/* The badge says which level exists, not which is popular: nothing is being
                sold yet, so popularity has nothing behind it, and L2 wore that badge while
                being the level a new account cannot pick. */}
            {t.status === "live" && <div className="kx-badge">Available now</div>}
            <h3>{t.name} <span className={`kx-stat ${t.status === "live" ? "l" : "s"}`}>{t.status === "live" ? "LIVE" : "NEXT"}</span></h3>
            {/* A price belongs to a level someone can use. On a NEXT tier the big "Free"
                promised access the account cannot have, and argued with the NEXT mark
                two lines above it. */}
            <div>
              <span className="kx-price">{t.status === "live" ? t.price : "Coming next"}</span>
              {t.status === "live" && <span className="kx-per">{t.period}</span>}
            </div>
            <p className="td">{t.desc}</p>
            <ul>{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className={`kx-btn ${t.highlight ? "kx-btn-primary" : "kx-btn-ghost"}`} style={{ display: "flex", width: "100%" }} href="https://dashboard.kampaio.com/">
              {t.status === "live" ? "Start free" : "Start on Free"}
            </a>
          </div>
        ))}
      </div>
      <p className="kx-fineprint"><span className="hi">Early access is free · No credit card · Nothing is charged automatically when billing opens</span></p>
    </div>
  </section>
);

const FAQ: React.FC = () => (
  <section className="kx-sec alt" id="faq">
    <div className="kx-sec-in" style={{ maxWidth: 760 }}>
      <h2 className="kx-h2">Common questions</h2>
      <p className="kx-sec-sub">Real answers on control, safety, and what the dashboard does.</p>
      <div className="kx-faq">
        {FAQ_ITEMS.map((f, i) => (
          <details key={f.q} className="kx-faq-item" {...(i === 0 ? { open: true } : {})}>
            <summary className="kx-faq-q">
              <span>{f.q}</span>
              <svg className="kx-faq-chev" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <p className="kx-faq-a">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const CTA: React.FC = () => (
  <section className="kx-sec kx-cta" id="start">
    <div className="kx-sec-in" style={{ maxWidth: 640, textAlign: "center" }}>
      <h2 className="kx-h2">Stop clicking through accounts one by one.</h2>
      <p className="kx-sec-sub" style={{ margin: "0 auto 30px", color: "var(--muted-2)" }}>
        Early access is open to <strong style={{ color: "var(--text)" }}>marketers and owners</strong> who
        run Google Ads themselves. Free while we build the agents on top.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <a className="kx-btn kx-btn-primary" href="https://dashboard.kampaio.com/">Start free &rarr;</a>
      </div>
      <p className="kx-fineprint" style={{ marginTop: 18 }}>
        <span className="hi">No credit card · Sign in with Google</span>
      </p>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="kx-foot">
    <div className="kx-foot-in">
      <div className="kx-logo" style={{ fontSize: 15 }}><span className="kx-dot" aria-hidden />kampaio · Google Ads dashboard</div>
      <div className="kx-foot-links">
        <a href="https://dashboard.kampaio.com/">Dashboard</a>
        <a href="/blog">Blog</a>
        <a href="/privacy-policy">Privacy</a>
        <a href="/terms-of-service">Terms</a>
      </div>
    </div>
  </footer>
);

export default function HomeContent() {
  return (
    <div className="kx">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <TopBar />
      <Hero />
      <HowItWorks />
      <MeetTheTeam />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
