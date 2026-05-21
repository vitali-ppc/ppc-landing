'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import InlineSVG from '../../../components/blog/InlineSVG';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Attribution Models: A 2026 Guide to Picking the Right One (and Why It Affects Smart Bidding)",
    "description": "A senior PPC manager's guide to Google Ads attribution models in 2026. Covers what each model does, why Google deprecated four of them, when data-driven beats last-click, the Model Comparison tool, and how the attribution choice trains Smart Bidding.",
    "image": "https://kampaio.com/og/google-ads-attribution-models-guide.png",
    author: {
      '@type': 'Organization',
      '@id': 'https://www.kampaio.com/#organization',
      name: 'Kampaio',
      url: 'https://www.kampaio.com',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.kampaio.com/#organization',
      name: 'Kampaio',
      url: 'https://www.kampaio.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.kampaio.com/logo.png',
      },
    },
    "datePublished": "2026-05-19T00:00:00.000Z",
    "dateModified": "2026-05-19T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-attribution-models-guide"
    },
    "keywords": "Google Ads attribution model, last-click attribution, data-driven attribution, DDA, attribution window, lookback window, Model Comparison tool, Smart Bidding, tCPA, tROAS, conversion action, GA4 attribution, Performance Max attribution, Maximus, Echo, Buzz, B6, autonomous PPC",
    "wordCount": 2925,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best attribution model for Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most accounts running at least 300 conversions per conversion action per month with any upper-funnel activity, data-driven attribution is the better default. It uses your account's actual path data and feeds Smart Bidding a richer training signal. Below that threshold, or for single-channel accounts, last-click is the honest answer."
        }
      },
      {
        "@type": "Question",
        "name": "What does 7-day click 1-day view attribution mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is a conversion window setting, not a model. The 7-day click means a conversion can be credited to any ad click that happened in the 7 days before the conversion. The 1-day view means a conversion can be credited to a view (an impression that did not get clicked) in the 1 day before the conversion. The selected model then distributes credit across those eligible interactions."
        }
      },
      {
        "@type": "Question",
        "name": "Why can't I select first-click or linear attribution in Google Ads anymore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google removed first-click, linear, time-decay, and position-based as selectable options for new conversion actions around September 2023, citing under 3 percent combined adoption. All four still exist in GA4 attribution and in the Google Ads Model Comparison reporting tool, but you can no longer use them as the active attribution model for bidding."
        }
      },
      {
        "@type": "Question",
        "name": "How much data does data-driven attribution need?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Approximately 300 conversions per conversion action plus 3,000 ad interactions over the last 30 days. Below that threshold, the conversion action falls back to last-click behavior silently, even if data-driven is still selected in the UI."
        }
      },
      {
        "@type": "Question",
        "name": "How does the attribution model affect Smart Bidding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The model determines the conversion column Smart Bidding optimizes against. Switching models changes the credit distribution across keywords, which changes the bid algorithm's training signal. Expect 7 to 14 days of measurable tCPA or tROAS volatility after a model change, with the algorithm relearning what a good conversion looks like. Hold targets steady through the transition."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.kampaio.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.kampaio.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Google Ads Attribution Models Guide",
        "item": "https://www.kampaio.com/blog/google-ads-attribution-models-guide"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: Which Google Ads Attribution Model Should You Use?', level: 1 },
    { id: 'what-decides', title: 'What an Attribution Model Actually Decides', level: 1 },
    { id: 'six-models', title: 'The Six Attribution Models (and Which Four Are Gone)', level: 1 },
    { id: 'dda-works', title: 'How Data-Driven Attribution Actually Works', level: 1 },
    { id: 'last-click-right', title: 'When Last-Click Is Still the Right Pick', level: 1 },
    { id: 'model-comparison', title: 'Model Comparison: How to Test Before You Commit', level: 1 },
    { id: 'smart-bidding-loop', title: 'The Smart Bidding Feedback Loop', level: 1 },
    { id: 'ga4-vs-ads', title: 'Google Ads vs GA4 Attribution: Why the Numbers Disagree', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'Stop Picking an Attribution Model on Vibes', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const h2Style = { fontSize: '32px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '24px', marginTop: '48px', lineHeight: '1.3' };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };

  // Comparison table: 6 attribution models x dimensions
  const modelRows = [
    {
      model: 'Last-click',
      adsStatus: 'Available',
      ga4Status: 'Available',
      creditLogic: '100% to the final click',
      bestFit: 'Short paths, brand-only accounts, sub-300-conv actions',
    },
    {
      model: 'First-click',
      adsStatus: 'Deprecated (Sept 2023)',
      ga4Status: 'Available',
      creditLogic: '100% to the first click',
      bestFit: 'Top-of-funnel discovery analysis (reporting only now)',
    },
    {
      model: 'Linear',
      adsStatus: 'Deprecated (Sept 2023)',
      ga4Status: 'Available',
      creditLogic: 'Equal credit across all clicks',
      bestFit: 'Neutral exploration view (reporting only now)',
    },
    {
      model: 'Time-decay',
      adsStatus: 'Deprecated (Sept 2023)',
      ga4Status: 'Available',
      creditLogic: 'More credit closer to conversion, ~7-day half-life',
      bestFit: 'Considered purchases, prior-to-DDA fallback (reporting only)',
    },
    {
      model: 'Position-based (U-shape)',
      adsStatus: 'Deprecated (Sept 2023)',
      ga4Status: 'Available',
      creditLogic: '40% first, 40% last, 20% middle',
      bestFit: 'Funnel-storytelling reports (reporting only now)',
    },
    {
      model: 'Data-driven (DDA)',
      adsStatus: 'Available (default)',
      ga4Status: 'Available (default)',
      creditLogic: 'Machine-learned per-path fractional credit',
      bestFit: 'Long paths, upper-funnel campaigns, ~300+ conv/action/30d',
    },
  ];

  // Credit distribution SVG (4-touch path: Display -> YouTube -> Generic Search -> Brand Search)
  const creditDistributionSvg = `
<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Credit distribution under last-click vs data-driven on a 4-touch path">
  <rect x="0" y="0" width="800" height="360" fill="#f8fafc"/>
  <text x="400" y="30" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="#1e293b">Credit on a 4-touch path: last-click vs data-driven</text>
  <text x="400" y="50" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#64748b">Path: Display impression &gt; YouTube view &gt; Generic Search click &gt; Brand Search click</text>

  <!-- Last-click row label -->
  <text x="20" y="100" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#1e293b">Last-click</text>
  <text x="20" y="118" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">100% to brand</text>

  <!-- Last-click bars (4 segments of fixed width) -->
  <rect x="180" y="80" width="140" height="46" fill="#e2e8f0" stroke="#cbd5e1"/>
  <text x="250" y="108" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#475569">Display</text>
  <text x="250" y="124" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">0%</text>

  <rect x="320" y="80" width="140" height="46" fill="#e2e8f0" stroke="#cbd5e1"/>
  <text x="390" y="108" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#475569">YouTube</text>
  <text x="390" y="124" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">0%</text>

  <rect x="460" y="80" width="140" height="46" fill="#e2e8f0" stroke="#cbd5e1"/>
  <text x="530" y="108" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#475569">Generic Search</text>
  <text x="530" y="124" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">0%</text>

  <rect x="600" y="80" width="140" height="46" fill="#667eea" stroke="#5568d3"/>
  <text x="670" y="108" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="white">Brand Search</text>
  <text x="670" y="124" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="white">100%</text>

  <!-- Data-driven row label -->
  <text x="20" y="200" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#1e293b">Data-driven</text>
  <text x="20" y="218" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">Fractional split</text>

  <!-- DDA bars: 10 / 30 / 25 / 35 (illustrative) -->
  <rect x="180" y="180" width="140" height="46" fill="#a3b3f0" stroke="#7c8ee6"/>
  <text x="250" y="208" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#1e293b">Display</text>
  <text x="250" y="224" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="#1e293b">10%</text>

  <rect x="320" y="180" width="140" height="46" fill="#8597e2" stroke="#5e74d4"/>
  <text x="390" y="208" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="white">YouTube</text>
  <text x="390" y="224" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="white">30%</text>

  <rect x="460" y="180" width="140" height="46" fill="#7488db" stroke="#5468cc"/>
  <text x="530" y="208" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="white">Generic Search</text>
  <text x="530" y="224" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="white">25%</text>

  <rect x="600" y="180" width="140" height="46" fill="#667eea" stroke="#5568d3"/>
  <text x="670" y="208" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="white">Brand Search</text>
  <text x="670" y="224" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="700" fill="white">35%</text>

  <!-- Annotation arrows -->
  <line x1="250" y1="142" x2="250" y2="172" stroke="#10b981" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="250" y="262" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#10b981" font-weight="700">+10pts</text>

  <line x1="390" y1="142" x2="390" y2="172" stroke="#10b981" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="390" y="262" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#10b981" font-weight="700">+30pts</text>

  <line x1="530" y1="142" x2="530" y2="172" stroke="#10b981" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="530" y="262" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#10b981" font-weight="700">+25pts</text>

  <line x1="670" y1="142" x2="670" y2="172" stroke="#ef4444" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="670" y="262" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#ef4444" font-weight="700">-65pts</text>

  <!-- Caption -->
  <text x="400" y="305" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#475569" font-style="italic">Under last-click, the brand-search click takes everything. Under data-driven, the upper-funnel touches earn their share.</text>
  <text x="400" y="325" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#94a3b8" font-style="italic">Illustrative split; actual DDA weights depend on the account's path data.</text>
</svg>`;

  // When last-click is the right pick (4 cards)
  const lastClickCards = [
    {
      title: 'Sub-300 conversions',
      body: 'Below the DDA threshold, your action silently falls back to last-click anyway. Selecting DDA in the UI does not give you DDA. Better to know what you are running.',
      tone: '#f59e0b',
    },
    {
      title: 'Single-channel accounts',
      body: 'Brand-search-only, search-only with no upper funnel, or a lone click-to-call lead-gen campaign. No path for DDA to model. Last-click is the path.',
      tone: '#3b82f6',
    },
    {
      title: 'Legacy CRM reconciliation',
      body: 'Some CRMs and most affiliate platforms only understand last-click. Switching to DDA without aligning the downstream tool creates a phantom mismatch.',
      tone: '#8b5cf6',
    },
    {
      title: 'Decisive last-click verticals',
      body: 'Plumber-emergency search. Open-an-account-now click. Same-day grocery. The last click really is the decisive click. DDA models it correctly but adds no value.',
      tone: '#10b981',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads &middot; Measurement
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Attribution Models: A 2026 Guide to Picking the Right One (and Why It Affects Smart Bidding)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Google Ads in 2026 only lets you select two of the six classic models. The setting you pick is the conversion column Smart Bidding optimizes against, which makes a model switch a Smart Bidding training reset in practical terms.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 19, 2026 &middot; 14 min read</span>
                </div>
              </div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: '600', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
              >
                Table of Contents
                <span style={{ transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>&#9660;</span>
              </button>
              {isTableOfContentsOpen && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  {tableOfContents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: '1.4' }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: Which Google Ads Attribution Model Should You Use?</h2>
              <p style={pStyle}>
                For most accounts with at least 300 conversions per conversion action in the last 30 days, data-driven attribution is the right pick: it spreads credit using your account&apos;s actual path data and aligns Smart Bidding with the real conversion journey. Below that threshold, last-click is the only honest option until the data catches up.
              </p>
              <p style={pStyle}>
                The catch most senior managers underweight: Google Ads in 2026 only lets you select two of the six classic models. First-click, linear, time-decay, and position-based got retired from conversion settings around <a href="https://growthmindedmarketing.com/blog/google-ads-attribution-models/" style={linkStyle} target="_blank" rel="noopener noreferrer">September 2023</a> after Google flagged under 3 percent combined adoption. The four still live in GA4 attribution and in the Model Comparison reporting tool inside Google Ads. You just cannot bid against them anymore. The setting you pick is the conversion column Smart Bidding optimizes against, which makes a model switch a Smart Bidding training reset in practical terms.
              </p>

              <InlineSVG
                svg={creditDistributionSvg}
                caption="The model decides where the conversion credit lands. Under last-click, the brand-search click takes 100 percent. Under data-driven, upper-funnel touches earn fractional credit. The bid algorithm consumes whichever column you selected."
                ariaLabel="Credit distribution under last-click versus data-driven on a 4-touch path"
              />
            </section>

            {/* What an attribution model actually decides */}
            <section id="what-decides">
              <h2 style={h2Style}>What an Attribution Model Actually Decides</h2>
              <p style={pStyle}>
                An attribution model is a rule for splitting credit for one conversion across the clicks that preceded it inside a defined lookback window. Inside Google Ads, that credit is distributed across Google Ads clicks only. Not organic. Not direct. Not Meta. Not email. This is the first place senior PPC managers and their clients talk past each other, and it is worth saying out loud before any model picking starts.
              </p>
              <p style={pStyle}>
                The unit of credit is fractional. A four-touch path can be split 0.1 / 0.3 / 0.2 / 0.4 across the four ads that touched it, and the conversion is reported as the sum, which is exactly one. Different models slice the same total in different ways.
              </p>
              <p style={pStyle}>
                Lookback windows are the second variable. Defaults inside Google Ads: 30 days for clicks, 3 days for engaged views on video, and 1 day for view-through conversions. Maximum click lookback is 90 days. A click outside the window never gets credit, regardless of model. If you have a 60-day sales cycle and a 30-day click window, half your funnel is invisible to attribution before the model has a chance to do anything with it. Separate problem from picking a model, worth its own audit. (If your conversion volume looks wrong before you even get to attribution, the foundation is broken: see our guide on <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>Google Ads conversion tracking not working</a>.)
              </p>
              <p style={pStyle}>
                The point worth holding on to: the model output IS the conversion column Smart Bidding sees. Bidding does not know what happened on the actual user journey. It knows what your attribution model told it. That is where the leverage sits.
              </p>
            </section>

            {/* The Six Models */}
            <section id="six-models">
              <h2 style={h2Style}>The Six Attribution Models (and Which Four Are Gone)</h2>
              <p style={pStyle}>
                All six models still exist as concepts and are still taught in every PPC course. Only two are selectable in Google Ads for new conversion actions in 2026.
              </p>

              <ComparisonTable
                headers={['Model', 'Google Ads (2026)', 'GA4', 'Credit logic', 'Best fit']}
                rows={modelRows.map(r => ({ cells: [r.model, r.adsStatus, r.ga4Status, r.creditLogic, r.bestFit] }))}
                caption="Six classic models, two selectable. The four deprecated models still live in GA4 attribution and in the Google Ads Model Comparison reporting tool, but you cannot use them as the active attribution model for bidding."
              />

              <p style={pStyle}>
                <strong>Last-click.</strong> One hundred percent of the credit goes to the final click. Still available, often the default for some imported conversion types, and the right pick when path length is short or the last interaction is genuinely decisive. The classic critique is fair: last-click overstates brand-search and retargeting because those clicks tend to close paths that earlier ads opened.
              </p>
              <p style={pStyle}>
                <strong>First-click.</strong> All credit to the first ad interaction. Deprecated in Google Ads in 2023. Useful conceptually for understanding which keywords introduce people to your brand. In the current Google Ads UI it is gone. Still selectable in GA4.
              </p>
              <p style={pStyle}>
                <strong>Linear.</strong> Equal credit across every click in the path. Deprecated in Google Ads. A defensible &quot;we don&apos;t know what to believe, so let&apos;s spread it evenly&quot; answer that almost nobody actually used: Google cited under 3 percent of conversions across the four deprecated models combined.
              </p>
              <p style={pStyle}>
                <strong>Time-decay.</strong> More credit to clicks closer to the conversion, on a roughly 7-day half-life curve. Deprecated in Google Ads. Conceptually a softer version of last-click that still respected earlier touches. Survives in GA4.
              </p>
              <p style={pStyle}>
                <strong>Position-based (U-shape).</strong> Forty percent to the first click, forty percent to the last, twenty percent shared across the middle. Deprecated in Google Ads. Beloved by funnel-thinking marketers, more or less ignored in practice. Still in GA4 and in academic frameworks.
              </p>
              <p style={pStyle}>
                <strong>Data-driven.</strong> Machine-learned credit based on the account&apos;s path-to-conversion data. Default for most new conversion actions since the 2021-2023 reset, and the only &quot;smart&quot; option left in the Google Ads UI. Requires roughly 300 conversions per conversion action over the last 30 days plus 3,000 ad interactions. Below that floor, the conversion silently reverts to last-click whether you selected DDA or not.
              </p>
              <p style={pStyle}>
                When a 2024-era article tells you to &quot;pick the best of six attribution models in Google Ads,&quot; it is reading from a stale UI. Google&apos;s own <a href="https://support.google.com/google-ads/answer/6259715" style={linkStyle} target="_blank" rel="noopener noreferrer">About attribution models</a> page lists exactly two options: last-click and data-driven.
              </p>
            </section>

            {/* How DDA Works */}
            <section id="dda-works">
              <h2 style={h2Style}>How Data-Driven Attribution Actually Works</h2>
              <p style={pStyle}>
                DDA is not magic. It is a counterfactual model in the logistic-regression family, trained on your account&apos;s converting paths and your account&apos;s non-converting paths. The model asks, in effect: given two paths that look similar but differ on one touchpoint, how much more often did the path containing that touchpoint convert. The output is a per-path fractional credit that sums to one.
              </p>
              <p style={pStyle}>
                Inputs the model uses: path length, ad format, click recency, device, time of day, conversion type. Channels it covers: Search, Shopping, Display, YouTube, and Demand Gen (the renamed Discovery surface). The training is privacy-safe because Google trains on aggregated path data, not on individual users.
              </p>
              <p style={pStyle}>
                Eligibility in 2026 is the part most articles get wrong because Google lowered the bar twice. The original 2016 threshold was <a href="https://www.klientboost.com/google/attribution-model-google-ads/" style={linkStyle} target="_blank" rel="noopener noreferrer">15,000 clicks and 600 conversions</a> per conversion action over 30 days. Around 2021 Google cut it to roughly <a href="https://www.datafeedwatch.com/blog/google-ads-attribution-models" style={linkStyle} target="_blank" rel="noopener noreferrer">3,000 ad interactions and 300 conversions</a>. The 300 floor is what current sources triple-confirm. If your account drops below it for any given conversion action, that action falls back to last-click silently, even if the DDA setting is still selected. Many accounts &quot;use DDA&quot; in name and last-click in practice without anyone noticing. Worth checking on every account audit.
              </p>
              <p style={pStyle}>
                When DDA outperforms last-click in practice: long path-length verticals (B2B SaaS, considered consumer purchases, high-AOV ecommerce), accounts running active upper-funnel campaigns (Display, YouTube, Demand Gen) alongside Search, and accounts where brand search currently gets disproportionate credit. The cleanest signal that DDA will pay off is a 30-day click-assisted-conversions report. Pull it and count how many paths have more than two ad touches. If above 25 percent are multi-touch, last-click is leaving money on the table.
              </p>

              <MascotQuote mascot="maximus">
                On a $40K/month retail account last quarter, switching from last-click to data-driven shifted 23 percent of the conversion credit to upper-funnel generic keywords and away from brand search. Smart Bidding reset its tCPA training inside 14 days. CPA spiked 18 percent on day 3, settled at minus 6 percent versus the pre-switch baseline by day 21. The account ended the quarter with 11 percent more conversions on the same budget.
              </MascotQuote>
            </section>

            {/* When Last-Click Is Still Right */}
            <section id="last-click-right">
              <h2 style={h2Style}>When Last-Click Is Still the Right Pick</h2>
              <p style={pStyle}>
                The reflex in 2026 is to assume data-driven is always better. It is not. Four account profiles where last-click is the correct, honest choice.
              </p>

              <div className="b6-lastclick-grid">
                {lastClickCards.map((card, i) => (
                  <div key={i} style={{ background: '#f8fafc', border: `1px solid #e5e7eb`, borderTop: `4px solid ${card.tone}`, borderRadius: '8px', padding: '20px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{card.title}</div>
                    <div style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>{card.body}</div>
                  </div>
                ))}
              </div>

              <p style={{ ...pStyle, marginTop: '32px' }}>
                &quot;We kept last-click for simplicity&quot; is a fine answer for plenty of mid-market accounts. It becomes the wrong answer the moment the account adds an upper-funnel campaign, crosses the 300-conversion threshold, or starts running Performance Max at scale.
              </p>

              <style jsx>{`
                .b6-lastclick-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 16px;
                  margin-bottom: 16px;
                }
                @media (max-width: 1100px) {
                  .b6-lastclick-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 520px) {
                  .b6-lastclick-grid { grid-template-columns: 1fr; }
                }
              `}</style>
            </section>

            {/* Model Comparison */}
            <section id="model-comparison">
              <h2 style={h2Style}>Model Comparison: How to Test Before You Commit</h2>
              <p style={pStyle}>
                The Model Comparison tool inside Google Ads is the underused safety net for any model switch. Navigation as of the <a href="https://growmyads.com/choosing-your-google-ads-attribution-model/" style={linkStyle} target="_blank" rel="noopener noreferrer">2026 interface</a>: Tools &gt; Measurement &gt; Attribution &gt; Model Comparison. Pick two models, pick a conversion action, pick a date range (30 to 90 days is the useful window), and the report returns the per-keyword and per-campaign credit delta between the two models.
              </p>

              <MermaidDiagram
                chart={`
flowchart TD
  A[Pick conversion action<br/>with 300+ conv/30d] --> B[Open Model Comparison<br/>Tools &gt; Measurement &gt; Attribution]
  B --> C[Compare last-click vs<br/>data-driven, 30-90 day window]
  C --> D{Campaign-level<br/>credit delta?}
  D -- Under 10% --> E[Switch is cosmetic<br/>Smart Bidding absorbs quickly]
  D -- 20-40% --> F[Expect 7-14d volatility<br/>Lock budget and targets]
  D -- Over 40% --> G[Big reshuffle<br/>Stage in lower-stake account first]
  F --> H[Switch model on the action]
  E --> H
  G --> H
                `}
                caption="The model-switch decision flow. The Model Comparison report tells you in advance how much credit will reshuffle, which tells you how much Smart Bidding volatility to expect."
              />

              <p style={pStyle}>
                What to look for in the output:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Keywords gaining credit under DDA.</strong> Usually upper-funnel generics, broad-match terms with high path-position values, Display placements, and YouTube TrueView interactions. If these gain 20 percent or more credit, the switch is materially changing what Smart Bidding sees.</li>
                <li style={{ marginBottom: '14px' }}><strong>Keywords losing credit under DDA.</strong> Usually brand search, brand-plus-product, retargeting placements, and any term that consistently shows up at the end of a multi-touch path. A 30-50 percent drop in brand-search credit is common and expected on accounts with active upper-funnel.</li>
                <li style={{ marginBottom: '14px' }}><strong>Campaign-level deltas.</strong> If campaign-level credit shifts under 10 percent, the model change is mostly cosmetic and Smart Bidding will absorb it quickly. If it shifts 20-40 percent, expect 7 to 14 days of measurable volatility.</li>
              </ul>
              <p style={pStyle}>
                The Model Comparison tool is also the place where the four deprecated models still live. You can compare against linear, time-decay, position-based, and first-click in the report, you just cannot set them as the active attribution model on a conversion action. That distinction matters: the reporting view of the data is broader than the bidding view of the data.
              </p>
            </section>

            {/* Smart Bidding Feedback Loop */}
            <section id="smart-bidding-loop">
              <h2 style={h2Style}>The Smart Bidding Feedback Loop</h2>
              <p style={pStyle}>
                Switching the attribution model is functionally a Smart Bidding training reset. Bidding optimizes against the conversion column you give it. Change the column, the algorithm has to relearn what a good conversion looks like.
              </p>
              <p style={pStyle}>
                Under last-click, the algorithm gets trained to chase final-click winners. Brand campaigns get high tROAS pushed at them. Retargeting performs well in the algorithm&apos;s eyes. Any upper-funnel generic looks weak because it rarely gets credit. Under DDA, the same algorithm sees fractional credit accruing on upper-funnel touches. Generics get more weight. Display and YouTube earn real credit. The bid algorithm starts reaching higher on those keywords because they now look more profitable. (Auction-mechanics quick reminder: the bid is one of three Ad Rank inputs alongside Quality Score and ad-format expected impact, see <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>the complete guide to Google Ads Quality Score</a> if you need the auction-side context.)
              </p>

              <MermaidDiagram
                chart={`
sequenceDiagram
  participant M as Maximus<br/>(orchestrator)
  participant E as Echo<br/>(reporting)
  participant B as Buzz<br/>(bidding)
  M->>M: Review path-length,<br/>conv volume, channel mix
  M->>B: Recommend model switch<br/>(eg last-click to DDA)
  B->>B: Apply DDA<br/>Smart Bidding enters re-learn
  B->>E: Daily CPA, conversion mix
  E->>E: Weekly attribution-shift<br/>report (credit delta)
  E->>M: Flag if drift exceeds threshold
  M->>B: Hold targets steady<br/>through day 14
  B->>B: Re-learn completes,<br/>tROAS settles
                `}
                caption="The B6 loop on a model switch. Maximus decides, Buzz executes and holds the bid algorithm steady, Echo reports the credit shift to the client weekly. The loop closes on day 14 when Smart Bidding finishes relearning."
              />

              <p style={pStyle}>
                The transition is not free. Expect 7 to 14 days of tCPA or tROAS drift after the switch. We have seen daily CPAs swing 15 to 25 percent in either direction during week one and settle by day 14. The operational playbook: lock budget steady, hold targets steady, do not run other major changes during the transition window, and check the bid algorithm&apos;s status (still &quot;Learning&quot; or back to &quot;Eligible&quot;) on day 14.
              </p>
              <p style={pStyle}>
                Attribution and incrementality answer different questions. Attribution answers &quot;which click got credit on the observed path.&quot; Incrementality answers &quot;would this conversion have happened without the ad at all.&quot; Both are real measurements. Both are useful. They are not substitutes. A campaign can earn 60 percent of last-click credit on a path it did not cause. That is a separate gap and the only way to close it is a controlled experiment: see our companion guide on <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>incrementality testing in Google Ads</a>. Attribution is the within-platform credit story. Incrementality is the does-this-campaign-actually-work story. Picking the right attribution model improves the data Smart Bidding learns from. It does not, on its own, tell you whether your spend is causally driving sales.
              </p>

              <MascotQuote mascot="echo">
                Weekly attribution-shift report on a $40K/month account: brand-search credit dropped 41 percent week-over-week after the DDA switch. Assisted-conversions data showed the same paths were now distributing across three keywords instead of one. The CMO calmed down inside a single client call once she saw the same number of conversions, redistributed.
              </MascotQuote>
            </section>

            {/* Google Ads vs GA4 */}
            <section id="ga4-vs-ads">
              <h2 style={h2Style}>Google Ads vs GA4 Attribution: Why the Numbers Disagree</h2>
              <p style={pStyle}>
                The most common client question after any attribution conversation: &quot;Why does GA4 show 80 Google Ads conversions when the Ads UI shows 120?&quot; The answer is scope, not error.
              </p>
              <p style={pStyle}>
                Google Ads sees Google Ads clicks only. It distributes 100 percent of the conversion credit across the Google Ads ad interactions that touched the path. If a path had a Google Ads click and an email click and an organic click, Google Ads attributes the full conversion to its own click. The other touches are invisible to the Ads UI.
              </p>
              <p style={pStyle}>
                GA4 sees every channel that GA4 can identify. Its attribution model splits credit across all of them. So that same conversion might land in GA4 as 0.3 to email, 0.4 to Google Ads, 0.3 to organic. The Ads UI sees one conversion. GA4 sees 0.4 of one.
              </p>
              <p style={pStyle}>
                Both reports are correct inside their respective scopes. The Google Ads UI is telling you &quot;of the Google Ads activity in this account, here is how it shaped the conversion.&quot; GA4 is telling you &quot;of all the marketing activity we can see, here is how each channel contributed.&quot; Default lookbacks are similar (30 days for Google Ads click attribution, 30 days as the GA4 acquisition default), but the model and the scope differ in ways that make a one-to-one match impossible by design.
              </p>
              <p style={pStyle}>
                Explain it once, anchor it in the scope sentence, move on. The reconciliation is not a bug to fix. It is a property of how the two systems define their job. (For accounts where the Ads UI conversion number itself has started drifting, the cause is usually upstream of attribution: see <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>Google Ads ROAS dropped suddenly</a> for the diagnostic flow.)
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>What is the best attribution model for Google Ads?</strong> For most accounts running at least 300 conversions per conversion action per month with any upper-funnel activity, data-driven attribution is the better default. It uses your account&apos;s actual path data and feeds Smart Bidding a richer training signal. Below that threshold, or for single-channel accounts, last-click is the honest answer.
              </p>
              <p style={pStyle}>
                <strong>What does 7-day click 1-day view attribution mean?</strong> It is a conversion window setting, not a model. The 7-day click means a conversion can be credited to any ad click that happened in the 7 days before the conversion. The 1-day view means a conversion can be credited to a view (an impression that did not get clicked) in the 1 day before the conversion. Whichever model you have selected then distributes the credit across those eligible interactions.
              </p>
              <p style={pStyle}>
                <strong>What is 50/50 attribution?</strong> Not a standard Google Ads model. The term usually appears in custom CRM-side attribution where credit is split evenly between two specific touchpoints (first touch and lead creation, for example). In Google Ads, the closest standard model is position-based at 40/40/20, which is deprecated for new conversion actions but still visible in the Model Comparison report.
              </p>
              <p style={pStyle}>
                <strong>Why can&apos;t I select first-click or linear attribution in Google Ads anymore?</strong> Google removed first-click, linear, time-decay, and position-based as selectable options for new conversion actions around September 2023, citing under 3 percent combined adoption. All four still exist in GA4 attribution and in the Google Ads Model Comparison reporting tool, but you can no longer use them as the active attribution model for bidding.
              </p>
              <p style={pStyle}>
                <strong>How much data does data-driven attribution need?</strong> Approximately 300 conversions per conversion action plus 3,000 ad interactions over the last 30 days. Below that threshold, the conversion action falls back to last-click behavior silently. Worth checking on every account audit, because the UI label and the actual behavior can disagree.
              </p>
              <p style={pStyle}>
                <strong>How does the attribution model affect Smart Bidding?</strong> The model determines the conversion column Smart Bidding optimizes against. Switching models changes the credit distribution across keywords, which changes the bid algorithm&apos;s training signal. Expect 7 to 14 days of measurable tCPA or tROAS volatility after a model change, with the algorithm relearning what a good conversion looks like. Hold targets steady through the transition.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Picking an Attribution Model on Vibes</h2>
              <p style={pStyle}>
                The attribution decision is downstream of conversion volume, upstream of Smart Bidding, and adjacent to incrementality. Most accounts ship the wrong choice because they treat it as a reporting preference instead of a bid algorithm input. It is the bid algorithm input.
              </p>
              <p style={pStyle}>
                This is where B6 changes the math. <a href="/b6#maximus" style={linkStyle}>Maximus</a> is the orchestrator: he reviews path-length, conversion volume, and channel mix on the connected account, then recommends the right model with a one-paragraph rationale. <a href="/b6#echo" style={linkStyle}>Echo</a> handles the post-switch reporting story for your clients: weekly attribution-shift summaries, brand versus upper-funnel credit drift, assisted-conversions context. <a href="/b6#buzz" style={linkStyle}>Buzz</a> holds the bid algorithm steady through the 14-day re-learn so a normal mid-week CPA spike does not get hand-edited into a worse state.
              </p>
              <p style={pStyle}>
                B6 sits at $199 a month for the Approval plan: full recommendations, you approve every change. Optmyzr sits at roughly $499 and stops at recommendations: still useful, more expensive, no orchestration across the decision and the execution. The B6 difference is that the model recommendation, the reporting follow-through, and the bidding patience are one connected loop instead of three separate slide decks.
              </p>
              <p style={pStyle}>
                <a href="/chat" style={linkStyle}>Try B6 free for 14 days</a> or <a href="/pricing" style={linkStyle}>see pricing</a>. The first thing it does on a new account is check whether your conversion actions are actually getting DDA or silently running last-click. That answer alone is usually worth the trial.
              </p>
            </section>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
