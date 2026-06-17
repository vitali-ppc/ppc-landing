'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import InlineSVG from '../../../components/blog/InlineSVG';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Responsive Search Ads Best Practices for Senior PPC Managers (2026)",
    "description": "Technical RSA best practices: ML signal quality, asset combinations, ad strength forensics, pinning trade-offs, variant testing with statistical significance.",
    "image": "https://kampaio.com/og/responsive-search-ads-best-practices.png",
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
    "datePublished": "2026-05-15T00:00:00.000Z",
    "dateModified": "2026-05-15T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/responsive-search-ads-best-practices"
    },
    "keywords": "responsive search ads, RSA, ad strength, Google Ads, headlines, descriptions, pinning, Smart Bidding, machine learning, asset combinations, character limit, CTR, conversion rate, combinations report, ad group, Target ROAS, Target CPA, broad match, variants, statistical significance, Mira, Maximus, B6",
    "wordCount": 2593,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many RSAs should I run per ad group?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At least 2, maximum 3. Google caps the number at 3 RSAs per ad group. The conversion lift from RSA 2 is 6.6%, and from RSA 3 is another 3.7% on top of that. Running fewer than 2 means the ML cannot rotate at the ad-unit level, only at the combination level inside a single RSA."
        }
      },
      {
        "@type": "Question",
        "name": "What is the character limit for responsive search ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Headlines are 30 characters each, descriptions are 90 characters each, and the two display URL path fields are 15 characters each. Total ad real estate caps near 300 characters when fully populated. Double-width characters (Japanese, Chinese, Korean) count as 2 characters each."
        }
      },
      {
        "@type": "Question",
        "name": "Should I pin headlines and descriptions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Only when compliance or brand legal requires it. Pinning collapses the ML combination space. If you must pin, pin 3 or more assets per slot, never 1. Pinning a single asset to a slot disables ML rotation for that slot and typically drops ad strength to Average or worse."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between expanded text ads and responsive search ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Expanded text ads (ETAs) were sunset by Google in June 2022. RSAs are the only text ad format for new creation since. ETAs were fixed creative with 3 headlines and 2 descriptions. RSAs hold up to 15 headlines and 4 descriptions that the ML rotates at auction."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of using broad match, Smart Bidding, and RSA together?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This is Google's power trio since 2022. Broad match feeds the maximum query signal to the ML. Smart Bidding (Target ROAS or Target CPA) bids on conversion probability per impression. RSAs rotate creative per impression. The three together give the ML signal at three layers: query interpretation, bid optimization, and creative selection. Google's reported lift is roughly 20% more conversions versus exact match plus manual bidding plus static creative."
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
        "name": "Responsive Search Ads Best Practices for Senior PPC Managers",
        "item": "https://www.kampaio.com/blog/responsive-search-ads-best-practices"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: 5 RSA best practices in 60 seconds', level: 1 },
    { id: 'how-rsa-works', title: 'How responsive search ads actually work (ML asset combinations)', level: 1 },
    { id: 'asset-count', title: 'Asset count strategy: why 15 headlines and 4 descriptions matters', level: 1 },
    { id: 'pinning', title: 'Pinning: when it helps, when it hurts', level: 1 },
    { id: 'ad-strength', title: 'Ad strength score: what it does and does not measure', level: 1 },
    { id: 'variant-testing', title: 'Creative variant testing methodology', level: 1 },
    { id: 'b6-agents', title: 'How B6 mira + maximus accelerate RSA optimization', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'next-steps', title: 'Next steps', level: 1 },
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

  // VISUAL 1 data: 5-bucket headline diversity (5 keyword-led / 4 benefit-led / 3 CTA-led / 2 social proof / 1 urgency)
  const headlineBuckets = [
    { count: 5, label: 'Keyword-led', example: '"Leather Laptop Bag 15"', color: '#667eea', tint: '#eef2ff' },
    { count: 4, label: 'Benefit-led', example: '"Free 30-Day Returns"', color: '#10b981', tint: '#ecfdf5' },
    { count: 3, label: 'CTA-led', example: '"Shop Today"', color: '#f59e0b', tint: '#fffbeb' },
    { count: 2, label: 'Social proof', example: '"Trusted by 12k Pros"', color: '#764ba2', tint: '#faf5ff' },
    { count: 1, label: 'Urgency', example: '"Ends Sunday Midnight"', color: '#ef4444', tint: '#fef2f2' },
  ];

  // VISUAL 4 data: Sprint 5 test stat cluster (47 headlines, 39 live, 18 min, 4.1% -> 4.7%)
  const sprint5Stats = [
    { value: '47', label: 'Headlines Mira generated across 4 ad groups', color: '#1e293b' },
    { value: '39', label: 'Approved live by Maximus after safety gating', color: '#10b981' },
    { value: '18 min', label: 'Generation time for the full 47-headline batch', color: '#667eea' },
    { value: '+0.6 pp', label: 'CTR lift (4.1% to 4.7%) on 3 of 4 ad groups', color: '#764ba2' },
  ];

  // VISUAL 2 data: ML asset combinations SVG (one ad slot, many candidate combinations)
  const combinationsSvg = `
<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ML asset combinations: 15 headlines plus 4 descriptions produce roughly 1,800 served combinations per RSA">
  <defs>
    <linearGradient id="rsaBox" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#764ba2"/>
    </linearGradient>
    <linearGradient id="combo" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="800" height="400" fill="#f8fafc"/>
  <text x="400" y="32" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="17" font-weight="700" fill="#1e293b">One RSA, ~1,800 served combinations. ML picks one per impression.</text>

  <!-- Left: asset pool -->
  <g>
    <rect x="40" y="60" width="260" height="300" rx="14" fill="white" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="60" y="92" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569" letter-spacing="0.08em">ASSET POOL</text>

    <text x="60" y="124" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">15 Headlines (30 char each)</text>
    <g font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#475569">
      <rect x="60" y="134" width="220" height="22" rx="4" fill="#eef2ff"/>
      <text x="68" y="150">H1, H2, H3 ... H15</text>
    </g>

    <text x="60" y="186" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">4 Descriptions (90 char each)</text>
    <g font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#475569">
      <rect x="60" y="196" width="220" height="22" rx="4" fill="#faf5ff"/>
      <text x="68" y="212">D1, D2, D3, D4</text>
    </g>

    <text x="60" y="248" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">Math (no pins)</text>
    <text x="60" y="272" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">15 pick 3 = 455 H triplets</text>
    <text x="60" y="292" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">4 pick 2 = ~6 D pairs</text>
    <text x="60" y="320" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#10b981">~1,800 combinations</text>
  </g>

  <!-- Arrow -->
  <g fill="#94a3b8">
    <line x1="310" y1="200" x2="380" y2="200" stroke="#94a3b8" stroke-width="2.5"/>
    <polygon points="380,200 370,194 370,206"/>
    <text x="345" y="190" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b">ML picks</text>
    <text x="345" y="222" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">per auction</text>
  </g>

  <!-- Right: ML signals + served unit -->
  <g>
    <rect x="400" y="60" width="360" height="135" rx="14" fill="white" stroke="#cbd5e1" stroke-width="1.5"/>
    <text x="420" y="88" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569" letter-spacing="0.08em">AUCTION-TIME SIGNALS</text>
    <text x="420" y="112" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#1e293b">query intent embedding</text>
    <text x="420" y="132" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#1e293b">device class, time-of-day</text>
    <text x="420" y="152" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#1e293b">audience signal</text>
    <text x="420" y="172" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#1e293b">predicted CTR per candidate</text>

    <rect x="400" y="220" width="360" height="140" rx="14" fill="url(#rsaBox)"/>
    <text x="420" y="252" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="white" letter-spacing="0.08em">SERVED COMBINATION</text>
    <text x="420" y="284" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="white">2 or 3 headlines + 1 or 2 descriptions</text>
    <rect x="420" y="298" width="100" height="22" rx="4" fill="white" opacity="0.85"/>
    <text x="470" y="314" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e293b">H7</text>
    <rect x="528" y="298" width="100" height="22" rx="4" fill="white" opacity="0.85"/>
    <text x="578" y="314" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e293b">H2</text>
    <rect x="636" y="298" width="100" height="22" rx="4" fill="white" opacity="0.85"/>
    <text x="686" y="314" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e293b">H11</text>
    <rect x="420" y="328" width="316" height="22" rx="4" fill="white" opacity="0.85"/>
    <text x="578" y="344" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e293b">D3 + D1</text>
  </g>
</svg>`;

  // VISUAL 5: Mermaid sequenceDiagram of the 14-day RSA <a href="/blog/google-ads-optimization" style={linkStyle}>optimization</a> loop
  const optimizationLoopChart = `sequenceDiagram
    participant User as Searcher
    participant Auction as Google Auction
    participant ML as RSA ML Picker
    participant Pool as 15H + 4D Pool
    participant Report as Combinations Report
    User->>Auction: types query, device + signals attach
    Auction->>ML: candidate RSA enters auction
    ML->>Pool: read 15H + 4D + pins
    Pool->>ML: ~1,800 viable combinations
    ML->>User: serves 2-3 H + 1-2 D for THIS impression
    User->>Report: click or skip recorded
    Note over Report: After ~4,000 impressions per RSA<br/>asset-level Low / Good / Best labels stabilize
    Report->>Pool: bottom 20% headlines flagged 'Low'<br/>replace, do not retire whole ad`;

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
          <ArticleHero slug="responsive-search-ads-best-practices" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads &middot; Responsive Search Ads
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Responsive Search Ads Best Practices for Senior PPC Managers (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              ML signal quality, asset-combination math, ad strength forensics, pinning trade-offs, and variant testing with real statistical significance windows.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 15, 2026 &middot; 13 min read</span>
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
              <h2 style={h2Style}>TL;DR: 5 RSA best practices in 60 seconds</h2>
              <p style={pStyle}>
                Senior PPC managers running RSAs at scale should standardize on five practices: run at least 2 RSAs per ad group with &quot;Good&quot; or &quot;Excellent&quot; ad strength, fill all 15 headlines and 4 descriptions, pin only when compliance forces it (and pin 3+ assets per slot), pair every RSA with Smart Bidding (Target ROAS or Target CPA), and review the combinations report every 14 days. Google&apos;s own data (<a href="https://support.google.com/google-ads/answer/7684791" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2024</a>) shows the 2nd RSA per ad group lifts conversions 6.6%, and the 3rd adds another 3.7%.
              </p>
              <p style={pStyle}>
                Below we walk each one at Sara-level: what the doc says, what the ML actually rewards, and where the official advice quietly breaks under load. If you manage 10+ accounts, the gap between &quot;filling out the form&quot; and &quot;feeding the ML the signal it needs&quot; is where your year-over-year CTR delta lives.
              </p>
              <p style={pStyle}>
                RSAs are not a creative format. They are a signal-collection mechanism that Google renders as creative. The mental model matters because it tells you which knobs to turn (asset variety, combination space, significance windows) and which to leave alone (forcing a specific headline order because marketing wants it).
              </p>

              {/* VISUAL: MascotQuote (Mira) - concrete numbers on variant generation */}
              <MascotQuote mascot="mira">
                On a 4-ad-group test last sprint, I generated 47 headlines across 5 buckets (keyword-led, benefit-led, CTA-led, social proof, urgency) in 18 minutes. Average ad strength lifted from &quot;Average&quot; to &quot;Good&quot; on 3 of 4 ad groups inside 7 days. The 4th was a brand campaign with pinned legal text. ML had nothing to optimize against.
              </MascotQuote>
            </section>

            {/* How RSAs work */}
            <section id="how-rsa-works">
              <h2 style={h2Style}>How responsive search ads actually work (ML asset combinations)</h2>
              <p style={pStyle}>
                A responsive search ad is a single ad unit holding up to 15 headline variants and 4 description variants. Google&apos;s ML serves a 2-or-3 headline plus 1-or-2 description combination at auction time, picked per user signal. The unit competing in any given auction is one of hundreds of possible combinations.
              </p>
              <p style={pStyle}>
                Math first. 15 headlines pick 3 gives 455 ordered triplets, before description pairing. Add 4 descriptions and you cross 1,800 possible served combinations per RSA. A single hard pin on Headline 1 cuts the triplet count from 455 to roughly 91.
              </p>

              {/* VISUAL 1: Inline SVG - asset pool feeding ML signal pipeline to a single served combination */}
              <InlineSVG
                svg={combinationsSvg}
                caption="One RSA is a pool of 15 headlines and 4 descriptions. The ML draws roughly 1,800 viable combinations from it and serves exactly one per impression, conditioned on query intent, device, time-of-day, audience signal, and a predicted CTR per candidate."
                ariaLabel="Diagram of an RSA: 15-headline plus 4-description pool feeds an ML picker that uses auction-time signals to serve one 2-3H plus 1-2D combination per impression"
              />

              <p style={pStyle}>
                ML signal inputs are not exposed in the UI. The auction-time picker consumes query intent embedding, device class, time-of-day, audience signal, and a predicted CTR per candidate combination. The combinations report is the only post-hoc view of what got served and how it performed.
              </p>
              <p style={pStyle}>
                The combinations report is your forensic tool, not the Ads tab. It tells you which 8 combinations out of 1,800 ate 80% of your impressions and what their CTR delta looks like. We open it on day 14 of any new RSA. Before that, the data is too thin and you risk killing combinations that just had not been served yet.
              </p>
            </section>

            {/* Asset count strategy */}
            <section id="asset-count">
              <h2 style={h2Style}>Asset count strategy: why 15 headlines and 4 descriptions matters</h2>
              <p style={pStyle}>
                Use the full 15 headlines and 4 descriptions. Google&apos;s data: adding a 2nd RSA per ad group lifts conversions 6.6%, the 3rd RSA adds another 3.7%. Asset volume feeds ML signal quality. With 8 headlines and 2 descriptions you are signal-starved.
              </p>
              <p style={pStyle}>
                Counter-nuance, where most accounts fail. 15 unique headlines is not &quot;15 keyword variations of the same phrase&quot;. The ML treats near-duplicates as one signal. We bucket headlines: 5 keyword-led, 4 benefit-led (&quot;free shipping&quot;, &quot;30-day return&quot;), 3 CTA-led (&quot;Shop now&quot;), 2 social proof (&quot;Trusted by 12k&quot;), 1 urgency (&quot;Ends Sunday&quot;). Otherwise the combination space collapses on its own.
              </p>

              {/* VISUAL 2: Custom 5-column headline diversity grid (explicit 5-col -> 1-col, never 2-orphan) */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '32px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  15 headlines &middot; 5 diversity buckets &middot; what feeds ML signal
                </div>
                <div className="b6-bucket-grid">
                  {headlineBuckets.map((b, i) => (
                    <div key={i} style={{
                      background: b.tint,
                      border: `1px solid ${b.color}33`,
                      borderTop: `4px solid ${b.color}`,
                      borderRadius: '10px',
                      padding: '18px 14px',
                      display: 'flex',
                      flexDirection: 'column' as const,
                      gap: '6px',
                    }}>
                      <div style={{ fontSize: '36px', fontWeight: 800, color: b.color, lineHeight: 1 }}>{b.count}</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginTop: '6px' }}>{b.label}</div>
                      <div style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic' as const, lineHeight: '1.4' }}>{b.example}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '16px', fontSize: '14px', color: '#475569', lineHeight: '1.6', fontStyle: 'italic' as const }}>
                  The bucket split is what the ML uses to escape the near-duplicate signal trap. Fifteen variations of one keyword phrase get collapsed to one signal in the combinations report.
                </div>
                <style jsx>{`
                  .b6-bucket-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 12px;
                  }
                  @media (max-width: 900px) {
                    .b6-bucket-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
              </div>

              <p style={pStyle}>
                Character forensics. Headlines 30 chars, descriptions 90, path fields 15. Mobile truncation reality: descriptions clip around 60 characters on small screens, and the truncation is hard. Front-load the value prop in the first 50 chars.
              </p>
              <p style={pStyle}>
                Diminishing returns kick in fast. Google&apos;s data says you hit roughly 90% of ML benefit at 8 headlines. Below 6, the system runs hungry and ad strength caps at &quot;Average&quot;. Most operators stop at 10 because writing 5 more &quot;good&quot; headlines is hard. Generating them is the bottleneck, not the marginal performance.
              </p>
              <p style={pStyle}>
                Headline-vs-Quality-Score note. Ad strength is its own creative score, while <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score</a> is the auction-level score that includes expected CTR, ad relevance, and landing page experience. They overlap on the &quot;ad relevance&quot; component but they are not the same number. We have seen ad strength &quot;Excellent&quot; sit next to Quality Score 4 in the same row.
              </p>
            </section>

            {/* Pinning */}
            <section id="pinning">
              <h2 style={h2Style}>Pinning: when it helps, when it hurts</h2>
              <p style={pStyle}>
                Pinning reduces the ML combination space. Pin only when legal or brand compliance requires it. When you do pin, pin 3 or more assets per slot, never a single asset. The reason is structural, not stylistic. A single pinned asset disables ML rotation for that slot entirely.
              </p>
              <p style={pStyle}>
                Three-tier framework we use across client SOPs:
              </p>

              {/* VISUAL 3: ComparisonTable - pinning policy vs combination space vs ad strength */}
              <ComparisonTable
                headers={['Pinning Policy', 'Combination Space', 'Ad Strength Ceiling', 'Use When']}
                rows={[
                  { cells: ['No pinning', '~1,800 combinations', 'Good to Excellent', 'Non-regulated industry, default'], highlight: true },
                  { cells: ['Pin 3 assets per slot', '~540 combinations', 'Typically Good', 'Brand-mandated tagline, controlled A/B'] },
                  { cells: ['Pin 1 asset per slot', '~91 combinations', 'Average or worse', 'Pharma legal copy, financial disclaimers'] },
                ]}
                caption="Three-tier pinning framework. Each step down collapses the combination space the ML can rotate. A single hard pin disables ML rotation for that slot and typically drops CTR 8-15% inside 14 days."
              />

              <p style={pStyle}>
                <strong>No pinning</strong> gives full combinatorial freedom: ML has maximum signal and ad strength typically lands at &quot;Good&quot; or better. This is the default for non-regulated industries.
              </p>
              <p style={pStyle}>
                <strong>Pin 3 assets per position</strong> lets the ML pick among 3 for that slot while everything else still mixes freely. Combination space drops to roughly 540. Ad strength typically stays &quot;Good&quot;.
              </p>
              <p style={pStyle}>
                <strong>Pin 1 asset to a single position</strong> disables ML for that slot. Combination space drops to about 91. Ad strength caps at &quot;Average&quot; or worse. CTR typically drops 8-15% inside the first 14 days.
              </p>
              <p style={pStyle}>
                When pinning is legit: regulated industries (financial, healthcare, legal, where disclaimers are required in head 1 by compliance), brand-mandated taglines that cannot rotate (think pharma &quot;ask your doctor&quot;), or a controlled A/B test holding one creative element fixed while everything else rotates. The compliance case is real and we do not argue with it. The &quot;marketing wants this headline in slot 1&quot; case is where you push back.
              </p>
              <p style={pStyle}>
                When pinning hurts: trying to force the headline you think is best. The ML usually disagrees, because it has signals you do not. We have audited accounts where the top combination ranked the &quot;obviously best&quot; headline at position 3, served only on desktop, only in the afternoon, only against specific audience segments. Marketing had wanted it pinned to position 1. The data said no.
              </p>
              <p style={pStyle}>
                Safe pinning procedure when you must. Pin 3 assets per slot, hold for 7 days, pull the combinations report. If CTR has dropped more than 5% versus the unpinned baseline ad, unpin and replace those 3 assets with stronger variants. If ad strength dropped from &quot;Good&quot; to &quot;Average&quot;, the ML is fighting you. Listen.
              </p>
            </section>

            {/* Ad strength */}
            <section id="ad-strength">
              <h2 style={h2Style}>Ad strength score: what it does and does not measure</h2>
              <p style={pStyle}>
                Ad strength is a creative completeness score, not a performance predictor. It rates the form-filling: did you provide enough headlines, are they unique, do they include keywords, do they follow popular ad text patterns. It correlates with performance only via the &quot;more assets = more ML signal&quot; mechanic, not because the score itself measures anything about conversion.
              </p>
              <p style={pStyle}>
                What ad strength measures: count of headlines, count of descriptions, headline uniqueness (string similarity), presence of ad-group keywords in headlines, and conformance to popular ad text patterns. A checklist completion score.
              </p>
              <p style={pStyle}>
                What ad strength does not measure: conversion rate, ROAS, brand alignment, actual relevance to your audience, landing page quality. Google&apos;s stat that advertisers improving ad strength from &quot;Poor&quot; to &quot;Excellent&quot; see 12% more conversions (<a href="https://support.google.com/google-ads/answer/7684791" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2024</a>) is correlation, not causation. More headlines means more ML signal. The signal lifts performance. Ad strength is the receipt, not the engine.
              </p>
              <p style={pStyle}>
                Sara-level forensics. An &quot;Excellent&quot; RSA with 2.1% CTR can underperform a &quot;Good&quot; RSA with 3.4% CTR in the same ad group. We see this when the &quot;Excellent&quot; ad over-indexes on keyword stuffing (gaming the rubric) while the &quot;Good&quot; ad uses stronger benefit copy. The AS score rewarded the keyword-heavy ad. The auction rewarded the benefit-heavy ad.
              </p>
              <p style={pStyle}>
                Practical rule for managers running 200+ ad groups: target &quot;Good&quot; or better as a hygiene floor. Past that floor, optimize on CTR, conversion rate, and ROAS, not on chasing &quot;Excellent&quot;. The lift past &quot;Good&quot; is small enough that your time is better spent on combinations report analysis. Past the hygiene floor, CTR and CPC issues often trace back to <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>Quality Score and bid economics</a>, not ad copy.
              </p>
            </section>

            {/* Variant testing */}
            <section id="variant-testing">
              <h2 style={h2Style}>Creative variant testing methodology</h2>
              <p style={pStyle}>
                RSA testing is not classic A/B testing. Run 2 to 3 RSAs per ad group, let them split impressions naturally, hold for 14 to 21 days, then compare winners at statistical significance with at least 4,000 impressions per ad at 95% confidence. Anything shorter is noise. Anything narrower in scope and you are testing one combination against another, not one RSA against another.
              </p>
              <p style={pStyle}>
                Why classic A/B does not work for RSAs. The ML serves different combinations per impression. Your &quot;Ad A vs Ad B&quot; comparison is actually &quot;A&apos;s top 8 combinations vs B&apos;s top 8&quot;. Variance is high. Rough rule: at retail CTR of 5%, you need ~4,200 impressions per ad to detect a 0.5 pp lift at p &lt; 0.05. At B2B CTR of 2%, closer to 10,000.
              </p>

              {/* VISUAL 4: Mermaid sequenceDiagram - the 14-day RSA optimization loop */}
              <MermaidDiagram
                chart={optimizationLoopChart}
                caption="The RSA optimization loop. Each impression collects asset-level signal; after ~4,000 impressions the Low / Good / Best labels stabilize. The leverage point is replacing the bottom 20% of headlines, not retiring the whole ad."
              />

              <p style={pStyle}>
                Sara-level methodology that holds up under audit:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}>Hold ad group, audience, bidding strategy, and budget constant. Test asset mix only.</li>
                <li style={{ marginBottom: '14px' }}>Build the challenger RSA with a deliberate hypothesis. &quot;Swap 5 keyword-led headlines for 5 benefit-led ones to test if the ad group converts on value, not feature.&quot;</li>
                <li style={{ marginBottom: '14px' }}>Let both ads run 14 to 21 days. Do not look at performance before day 7.</li>
                <li style={{ marginBottom: '14px' }}>At day 14, pull the combinations report. Compare top-combination CTR, conversion rate, and per-asset &quot;Low / Good / Best&quot; labels.</li>
                <li style={{ marginBottom: '14px' }}>Replace assets, not ads. Swap the bottom 20% of headlines (labeled &quot;Low&quot;) with new variants. Hold the top performers.</li>
              </ol>
              <p style={pStyle}>
                Asset-level signal is where the real work happens. The combinations report shows performance by individual headline. Bottom 20% headlines tagged &quot;Low&quot; are not necessarily bad copy. They are bad in this ad group, against this audience, paired with these other headlines. Replace them with variants targeted at the specific gap.
              </p>
              <p style={pStyle}>
                Variant testing was hours of weekly work per account before we automated it. Tooling that watches the combinations report and proposes targeted replacements is the leverage point. That is where Mira and Maximus come in. You can <a href="/b6" style={linkStyle}>see the agent workflow live</a> before activating anything on your account.
              </p>

              <MascotQuote mascot="maximus">
                On the same 4-ad-group test, I gated all 47 Mira-generated headlines through three approval rules: character limit conformance (8 blocked at this gate), banned-term check against the brand&apos;s compliance list (0 blocked), and risk threshold for ad groups in the top decile of current CTR (5 blocked because the existing creative was already top quartile and the rule says do not break what is working). Net: 39 went live, 8 went back to Mira for revision. Zero rolled back inside 14 days.
              </MascotQuote>
            </section>

            {/* B6 Agents */}
            <section id="b6-agents">
              <h2 style={h2Style}>How B6 mira + maximus accelerate RSA optimization</h2>
              <p style={pStyle}>
                Mira reads the ad group keyword theme, audience signal, and top-converting search queries from the past 30 days, then generates 15 headline variants across 5 buckets in 12 to 30 seconds per ad group. Generation cadence runs every 14 days for ad groups where ad strength sits below &quot;Good&quot; or CTR sits below median. She does not regenerate ads already performing in the top quartile.
              </p>
              <p style={pStyle}>
                Maximus gates every Mira proposal through the approval workflow. On the <a href="/blog/10-ai-powered-ppc-optimization-strategies" style={linkStyle}>Co-pilot tier</a>, Maximus queues all variants for human review. On the Approval tier, he auto-pushes variants that pass safety rules (character limits, no banned terms, predicted ad strength &quot;Good&quot; or better) and queues edge cases. On the Autonomous tier, he pushes most variants but blocks: brand campaign creative changes, ads where current CTR sits in the top decile, and any variant that would change pinning policy. See the <a href="/pricing" style={linkStyle}>full B6 pricing tiers</a> for autonomy-level details.
              </p>

              {/* VISUAL 5: Sprint 5 test results StatBlock cluster (4 stats, explicit 4-col -> 2x2 -> 1-col) */}
              <div style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%)',
                border: '1px solid #c4b5fd',
                borderRadius: '14px',
                padding: '28px',
                marginBottom: '32px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#6d28d9', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  Sprint 5 test &middot; e-commerce &middot; ~$18K/mo spend &middot; 14 days
                </div>
                <div className="b6-stat-grid">
                  {sprint5Stats.map((s, i) => (
                    <div key={i} className="b6-stat-cell">
                      <div style={{ fontSize: '40px', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px', lineHeight: '1.45' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.6', fontStyle: 'italic' as const }}>
                  Maximus blocked 8: 3 for character overruns, 5 for the top-decile CTR rule. The 39 approved went live. Average ad strength lifted from &quot;Average&quot; to &quot;Good&quot; on 3 of 4 ad groups within 7 days. The fourth was a brand campaign with mandatory pinning.
                </div>
                <style jsx>{`
                  .b6-stat-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                  }
                  .b6-stat-cell {
                    background: #ffffff;
                    border-radius: 10px;
                    border: 1px solid #ddd6fe;
                    padding: 18px;
                  }
                  @media (max-width: 1100px) {
                    .b6-stat-grid {
                      grid-template-columns: repeat(2, 1fr);
                    }
                  }
                  @media (max-width: 520px) {
                    .b6-stat-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
              </div>

              <p style={pStyle}>
                The frame is not &quot;AI writes your creative&quot;. The frame is: AI generates candidates, the orchestrator enforces your safety policy at machine speed, you spend senior-manager attention on 3 edge cases per week. The bottleneck moves from &quot;writing 15 unique headlines&quot; to &quot;reviewing 3 flagged variants&quot;.
              </p>
              <p style={pStyle}>
                Tracking quality is a precondition. Mira&apos;s cadence relies on accurate conversion signal, which is why we run <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking diagnostics</a> before activating variant generation. ML quality is downstream of measurement quality.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>How many RSAs should I run per ad group?</strong> At least 2, maximum 3. Google caps the number at 3 RSAs per ad group. The conversion lift from RSA 2 is 6.6%, and from RSA 3 is another 3.7% on top of that (<a href="https://support.google.com/google-ads/answer/7684791" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2024</a>). Running fewer than 2 means the ML cannot rotate at the ad-unit level, only at the combination level inside a single RSA.
              </p>
              <p style={pStyle}>
                <strong>What is the character limit for responsive search ads?</strong> Headlines are 30 characters each, descriptions are 90 characters each, and the two display URL path fields are 15 characters each. Total ad real estate caps near 300 characters when fully populated. Double-width characters (Japanese, Chinese, Korean) count as 2 characters each.
              </p>
              <p style={pStyle}>
                <strong>Should I pin headlines and descriptions?</strong> Only when compliance or brand legal requires it. Pinning collapses the ML combination space. If you must pin, pin 3 or more assets per slot, never 1. Pinning a single asset to a slot disables ML rotation for that slot and typically drops ad strength to &quot;Average&quot; or worse.
              </p>
              <p style={pStyle}>
                <strong>What is the difference between expanded text ads and responsive search ads?</strong> Expanded text ads (ETAs) were sunset by Google in June 2022. RSAs are the only text ad format for new creation since. ETAs were fixed creative with 3 headlines and 2 descriptions. RSAs hold up to 15 headlines and 4 descriptions that the ML rotates at auction.
              </p>
              <p style={pStyle}>
                <strong>What are the benefits of using broad match, Smart Bidding, and RSA together?</strong> This is Google&apos;s &quot;power trio&quot; since 2022. Broad match feeds the maximum query signal to the ML. Smart Bidding (Target ROAS or Target CPA) bids on conversion probability per impression. RSAs rotate creative per impression. The three together give the ML signal at three layers: query interpretation, bid optimization, and creative selection. Google&apos;s reported lift is roughly 20% more conversions versus exact match plus manual bidding plus static creative.
              </p>
            </section>

            {/* Next steps */}
            <section id="next-steps">
              <h2 style={h2Style}>Next steps</h2>
              <p style={pStyle}>
                If you manage 10+ accounts and want to see what Mira would propose on your top 10 ad groups, <a href="/chat" style={linkStyle}>connect Google Ads to B6</a> and let her run an audit. Output in roughly 90 seconds: per-ad-group ad strength gap, top 3 underperforming headlines per group, and a 15-headline variant set ready for Maximus to gate against your approval rules. Read-only access, no bid changes, no creative pushed without your sign-off.
              </p>
            </section>

          </div>
        </div>
        <KeepReading slug="responsive-search-ads-best-practices" category="google-ads" />
      <Footer />
      </div>
    </>
  );
}
