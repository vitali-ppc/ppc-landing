'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import InlineSVG from '../../../components/blog/InlineSVG';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Incrementality Testing in Google Ads: What It Measures, How to Run One, and Why Smart Bidding Needs It",
    "description": "Incrementality testing in Google Ads measures the true causal lift of your ads versus a no-ad control group. Covers Conversion Lift, geo-lift, the November 2025 $5K minimum spend update, common pitfalls, and how lift findings should retune Smart Bidding.",
    "image": "https://kampaio.com/og/incrementality-testing-google-ads.png",
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
    "datePublished": "2026-05-18T00:00:00.000Z",
    "dateModified": "2026-05-18T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/incrementality-testing-google-ads"
    },
    "keywords": "incrementality testing, conversion lift, geo lift, geo experiments, holdout test, treatment group, control group, ghost ads, Smart Bidding, Target ROAS, tCPA, Performance Max experiments, true lift, causal inference, Sage, Vox, Buzz, B6, autonomous PPC",
    "wordCount": 2655,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's the difference between incrementality testing and A/B testing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A/B testing compares two versions of a treatment (ad A versus ad B) and tells you which is better. Incrementality testing compares treatment against no-treatment and tells you whether the campaign should run at all. They answer different questions and are not interchangeable."
        }
      },
      {
        "@type": "Question",
        "name": "Does Google Ads have built-in incrementality testing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, two tools. User-level Conversion Lift, available on request via your Google account representative. Geo-based incrementality experiments, rebuilt in November 2025 with a $5,000 minimum spend. Both run inside the Google Ads UI."
        }
      },
      {
        "@type": "Question",
        "name": "What's the minimum spend to run a lift test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google's geo-based experiments require $5,000 per experiment as of late 2025. A self-run geo holdout outside the platform has no minimum, but realistically needs at least 1,000 conversions per arm to detect a 10 percent effect."
        }
      },
      {
        "@type": "Question",
        "name": "How long should an incrementality test run?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Four weeks minimum for short-lookback e-commerce. Six to eight weeks for considered purchases or any account under 200 conversions per week. Always wait for the conversion window to close before reading the result."
        }
      },
      {
        "@type": "Question",
        "name": "Can incrementality testing prove Performance Max is working?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It can prove whether Performance Max produces incremental conversions at the campaign level, but because PMax bundles Search, Shopping, Display, and YouTube, the result is a blended number. To isolate components, layer in either a PMax-versus-no-PMax holdout or a channel-level diagnostic alongside the lift test."
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
        "name": "Incrementality Testing in Google Ads",
        "item": "https://www.kampaio.com/blog/incrementality-testing-google-ads"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: What Incrementality Testing Actually Proves', level: 1 },
    { id: 'measures', title: "What Incrementality Testing Measures (and What It Doesn't)", level: 1 },
    { id: 'native-products', title: 'The Two Native Google Ads Lift Products', level: 1 },
    { id: 'design', title: 'How to Design a Lift Test That Actually Answers Your Question', level: 1 },
    { id: 'real-numbers', title: 'What Real Lift Numbers Look Like in Google Ads', level: 1 },
    { id: 'pitfalls', title: 'Common Pitfalls That Invalidate Lift Tests', level: 1 },
    { id: 'feedback-loop', title: 'How to Feed Lift Results Back Into Smart Bidding', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'Stop Optimizing Against Conversions That Would Have Happened Anyway', level: 1 },
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

  // Comparison table: Conversion Lift vs Geo-lift vs Self-run holdout
  const liftMethodRows = [
    {
      method: 'Conversion Lift (user-level)',
      access: 'On request via Google account rep',
      minSpend: 'Not publicly stated (account-scale gated)',
      unit: 'Users (ghost-ad mechanism)',
      bestFor: 'Large accounts, well-tracked user-level conversions',
      limitation: 'Most mid-market accounts not eligible',
    },
    {
      method: 'Geo experiments (Google native)',
      access: 'Self-serve in Ads UI (Nov 2025 update)',
      minSpend: '$5,000 per experiment',
      unit: 'DMAs / geos',
      bestFor: 'Omnichannel businesses, mid-market, offline sales',
      limitation: 'Requires meaningful geo separation',
    },
    {
      method: 'Self-run geo holdout',
      access: 'Always available',
      minSpend: 'No platform minimum, but need ~1K conversions/arm',
      unit: 'Hand-matched DMAs or synthetic control',
      bestFor: 'Custom hypotheses, multi-channel tests',
      limitation: 'Requires analyst time + matching effort',
    },
  ];

  // Real lift numbers grid
  const realLiftRows = [
    {
      channel: 'Brand search',
      range: '5-15% (known DTC) / 20-40% (unknown brands)',
      finding: 'Often 30-60% of branded conversions would have happened organically',
      color: '#3b82f6',
    },
    {
      channel: 'Performance Max',
      range: '8-18% net incremental (bundle hides internal range)',
      finding: 'YouTube portion under-credited by attribution',
      color: '#f59e0b',
    },
    {
      channel: 'Non-brand search',
      range: '25-50% incremental in most accounts',
      finding: 'Most reliable performer once brand cannibalization is removed',
      color: '#10b981',
    },
    {
      channel: 'Display / retargeting',
      range: 'Single-digit or sometimes negative',
      finding: 'A real finding, not a tracking artifact: redirect that budget',
      color: '#ef4444',
    },
    {
      channel: 'YouTube',
      range: 'Weak attribution, strong incrementality on new customers',
      finding: 'Classic pattern: low last-click ROAS, double-digit incremental lift',
      color: '#8b5cf6',
    },
  ];

  // Treatment vs control conversion curve SVG
  const liftCurveSvg = `
<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Treatment vs control conversion curve over a lift test window">
  <defs>
    <linearGradient id="treatGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="800" height="320" fill="#f8fafc"/>
  <text x="400" y="30" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="#1e293b">Treatment vs control conversion rate over a 4-week geo-lift</text>

  <!-- Y axis -->
  <line x1="60" y1="60" x2="60" y2="260" stroke="#cbd5e1" stroke-width="1"/>
  <!-- X axis -->
  <line x1="60" y1="260" x2="760" y2="260" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Y labels -->
  <text x="50" y="80" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">3.0%</text>
  <text x="50" y="140" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">2.0%</text>
  <text x="50" y="200" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">1.0%</text>
  <text x="50" y="258" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">0%</text>

  <!-- X labels (weeks) -->
  <text x="160" y="278" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">Week 1</text>
  <text x="310" y="278" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">Week 2</text>
  <text x="460" y="278" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">Week 3</text>
  <text x="610" y="278" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">Week 4</text>

  <!-- Treatment area fill -->
  <path d="M 80 175 L 160 170 L 240 165 L 320 168 L 400 162 L 480 158 L 560 160 L 640 156 L 720 158 L 720 260 L 80 260 Z" fill="url(#treatGrad)"/>

  <!-- Treatment line (with ads) -->
  <polyline points="80,175 160,170 240,165 320,168 400,162 480,158 560,160 640,156 720,158" fill="none" stroke="#10b981" stroke-width="3"/>

  <!-- Control line (no ads) -->
  <polyline points="80,195 160,193 240,196 320,194 400,192 480,193 560,191 640,194 720,192" fill="none" stroke="#64748b" stroke-width="2.5" stroke-dasharray="6 4"/>

  <!-- Lift annotation -->
  <line x1="720" y1="158" x2="720" y2="192" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2 2"/>
  <rect x="585" y="100" width="160" height="36" rx="6" fill="#10b981"/>
  <text x="665" y="124" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="700" fill="white">Lift = 17.6%</text>
  <line x1="665" y1="136" x2="720" y2="158" stroke="#10b981" stroke-width="1.5" stroke-dasharray="2 2"/>

  <!-- Legend -->
  <g transform="translate(80, 282)">
    <rect x="0" y="0" width="14" height="14" fill="#10b981"/>
    <text x="20" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">Treatment (ads on)</text>
    <line x1="170" y1="7" x2="200" y2="7" stroke="#64748b" stroke-width="2.5" stroke-dasharray="6 4"/>
    <text x="206" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">Control (no ads)</text>
    <rect x="370" y="0" width="14" height="14" fill="#10b981" opacity="0.4"/>
    <text x="390" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">Incremental conversions</text>
  </g>

  <text x="400" y="305" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#64748b" font-style="italic">Both arms trend together. The gap is the lift. Conversion windows close before the analysis reads.</text>
</svg>`;

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
          <ArticleHero slug="incrementality-testing-google-ads" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads &middot; Measurement
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Incrementality Testing in Google Ads: What It Measures, How to Run One, and Why Smart Bidding Needs It
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Smart Bidding optimizes against last-touch conversions. Lift testing measures causal conversions. The two numbers can disagree by 30 to 50 percent. This is how to run the test that closes the gap.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 18, 2026 &middot; 13 min read</span>
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
              <h2 style={h2Style}>TL;DR: What Incrementality Testing Actually Proves</h2>
              <p style={pStyle}>
                Incrementality testing in Google Ads is a randomized controlled experiment that measures the causal lift of your ads. One matched group is exposed to your campaign (treatment), another sees no impression at all (control). The difference in conversions between the two groups is incremental lift: the conversions your ads actually caused, not the ones that would have happened anyway.
              </p>
              <p style={pStyle}>
                That last clause is where most ad accounts lose money. Smart Bidding optimizes against last-touch conversions. Lift testing measures causal conversions. The two numbers can disagree by 30 to 50 percent. If you have never run a lift test on your account, your Target ROAS is almost certainly mis-calibrated, and the algorithm is happily scaling spend on traffic that would have converted on its own.
              </p>
              <p style={pStyle}>
                Google ships two native ways to run one: user-level <a href="https://support.google.com/google-ads/answer/12003020" style={linkStyle} target="_blank" rel="noopener noreferrer">Conversion Lift</a> and geo-based <a href="https://support.google.com/google-ads/answer/16719772" style={linkStyle} target="_blank" rel="noopener noreferrer">incrementality experiments</a> (rebuilt in November 2025 with a $5,000 minimum spend, down from roughly $100,000). You can also run a <a href="/blog/google-ads-without-agency" style={linkStyle}>self-managed</a> geo holdout outside the platform when you want full control. This article covers when to pick which, how to design one that produces an actually usable answer, and how to feed the result back into Smart Bidding.
              </p>
            </section>

            {/* What it measures */}
            <section id="measures">
              <h2 style={h2Style}>What Incrementality Testing Measures (and What It Doesn&apos;t)</h2>
              <p style={pStyle}>
                The thing being measured is causal lift on a defined conversion event over a defined window for a specific exposure. Nothing more. A lift test will not tell you whether your creative is better than your competitor&apos;s, will not separate the brand-halo effect from the direct-response effect unless you designed it to, and will not magically reconcile your MMM with your platform attribution. It answers one question cleanly: if these specific impressions had not happened, how many of these specific conversions would still have occurred.
              </p>
              <p style={pStyle}>
                The Google Ads implementation of Conversion Lift uses an intent-to-treat design. The control group does not just see different ads. The control group sees nothing from your campaign, served by the ghost-ad mechanism: Google runs the auction, your bid wins or loses normally, and for control users the impression is simply withheld and logged as a ghost. That preserves the auction dynamics that would have existed and gives you a clean treatment-versus-control comparison.
              </p>
              <p style={pStyle}>
                Three things people often confuse with incrementality and shouldn&apos;t:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Attribution</strong> tracks which touchpoints correlate with conversions. It says nothing about causation. A lift test of 0 percent on a campaign that gets 100 percent of last-click credit is a real finding.</li>
                <li style={{ marginBottom: '14px' }}><strong>MMM (marketing mix modeling)</strong> estimates channel-level effects across the full mix using regression on aggregate data. It is complementary to lift testing, not a substitute. Google&apos;s official measurement framework now positions <a href="https://support.google.com/google-ads/answer/16719772" style={linkStyle} target="_blank" rel="noopener noreferrer">MMM, incrementality, and attribution as three separate tools that calibrate each other</a>.</li>
                <li style={{ marginBottom: '14px' }}><strong>A/B testing of creative</strong> measures which ad variant performs better given that ads are running. Lift testing measures whether the ads should run at all.</li>
              </ul>

              <InlineSVG
                svg={liftCurveSvg}
                caption="The visual is intuitive: treatment and control trend together until the ads start working. The gap between the curves over the test window is the lift. The dashed control line is what would have happened with no ads. Reading the gap before the conversion window closes is the single most common analytical mistake."
                ariaLabel="Treatment vs control conversion curves over a 4-week geo-lift, showing a 17.6 percent lift"
              />
            </section>

            {/* Native products */}
            <section id="native-products">
              <h2 style={h2Style}>The Two Native Google Ads Lift Products</h2>
              <p style={pStyle}>
                Google offers two lift products inside the Ads UI and they answer different questions.
              </p>
              <p style={pStyle}>
                <strong>Conversion Lift (user-level).</strong> Conversion Lift &quot;isn&apos;t available for all Google Ads accounts. To use Conversion Lift, contact your Google account representative,&quot; per the official help center. When you do get access, the experiment randomizes at the user level using the ghost-ad mechanism described above. Reports return Incremental Conversions, Relative Conversion Lift, Incremental Conversion Value, Incremental Cost Per Action, and Incremental Return on Ad Spend for studies with conversion values. The honest constraint: Conversion Lift requires meaningful user-level data, and post-cookie environments have made user-level studies harder to qualify for. Many mid-market advertisers will not be approved.
              </p>
              <p style={pStyle}>
                <strong>Geo-based <a href="/blog/google-ads-experiments" style={linkStyle}>experiments</a> / incrementality experiments.</strong> This is the path Google <a href="https://searchengineland.com/google-makes-incrementality-testing-easier-cheaper-and-faster-464575" style={linkStyle} target="_blank" rel="noopener noreferrer">rebuilt in November 2025</a>. The minimum spend dropped from approximately $100,000 per experiment to $5,000, &quot;up to 50% more conclusive&quot; results, and a redesigned interface with custom test-size controls and configurable confidence levels. Geo experiments work by holding out entire DMAs or regions: ads run as usual in treatment markets, are paused in control markets, and the difference in the conversion rate between matched geos is the lift. The reports return Incremental ROAS, Incremental Conversions, Incremental Conversion Value, and Incremental Cost.
              </p>

              <ComparisonTable
                headers={['Method', 'Access', 'Min spend', 'Unit', 'Best for', 'Limitation']}
                rows={liftMethodRows.map(r => ({ cells: [r.method, r.access, r.minSpend, r.unit, r.bestFor, r.limitation] }))}
                caption="Three ways to run a lift test on Google Ads. Conversion Lift is the gold standard when you qualify. Geo experiments are now within reach for mid-market accounts after the November 2025 update. Self-run geo holdouts give you the most analytical control but require the most analyst time."
              />

              <p style={pStyle}>
                <strong>When to pick which.</strong> User-level Conversion Lift gives you more precise answers when your account scale qualifies and your conversions are well-tracked at the user level. Geo-experiments work better for omnichannel businesses (offline sales, app installs, considered purchases) and for mid-market accounts that cannot get Conversion Lift access. Industry survey data Google cited with the November 2025 update: &quot;80% of senior US marketing analytics professionals report incrementality experiment insights significantly impact revenue growth.&quot; That number maps to the audience this article is written for.
              </p>
            </section>

            {/* Design */}
            <section id="design">
              <h2 style={h2Style}>How to Design a Lift Test That Actually Answers Your Question</h2>
              <p style={pStyle}>
                Six steps. Skip any of them and you will produce a number that looks like an answer but is not.
              </p>

              <MermaidDiagram
                chart={`
flowchart TD
  A[Step 1: Write falsifiable hypothesis<br/>with verb, threshold, comparator] --> B[Step 2: Pick treatment unit<br/>users for CL, geos otherwise]
  B --> C[Step 3: Match the control<br/>pre-period revenue covariance<br/>or synthetic control]
  C --> D[Step 4: Power calculation<br/>~1K conversions per arm<br/>for 10% MDE at 80% power]
  D --> E[Step 5: Choose conversion window<br/>and analysis cutoff]
  E --> F[Step 6: Pre-register the analysis<br/>significance threshold<br/>analysis method]
  F --> G[Run the test]
  G --> H{Window closed?}
  H -- No --> I[Wait. Do not peek.]
  H -- Yes --> J[Analyze, report lift,<br/>act on result]
                `}
                caption="The 6-step design loop. Steps 1, 3, and 6 are where most self-run tests fail. The wait between step 5 and step H is the single biggest discipline test for the analyst."
              />

              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Write the hypothesis as a falsifiable statement.</strong> &quot;Does Performance Max work&quot; is not a hypothesis, it is a debate. &quot;Performance Max drives at least 10 percent incremental conversions over a no-ads baseline at the current tROAS target&quot; is a hypothesis. The verb is &quot;drives,&quot; the threshold is &quot;10 percent,&quot; the comparator is &quot;no-ads baseline,&quot; the window is implied. Write the rejection criterion before the test runs, not after.</li>
                <li style={{ marginBottom: '14px' }}><strong>Pick the treatment unit.</strong> Users for Conversion Lift. Geos for everything else. If you pick geos, your unit of analysis must be DMA-level (or finer), and your statistical power calculation must use the geo as the observation, not the user. This is where most self-run tests die.</li>
                <li style={{ marginBottom: '14px' }}><strong>Match the control.</strong> Google handles matching for native Conversion Lift. For a self-run geo holdout, match DMAs on pre-period revenue covariance: take the 12 weeks before the test, compute weekly revenue per DMA, and pair markets so the treatment and control sets have correlated baselines. Synthetic-control methods (weighted combinations of multiple control markets to approximate one treatment market) outperform simple one-to-one matching for accounts under 25 markets.</li>
                <li style={{ marginBottom: '14px' }}><strong>Size the test.</strong> A useful rule of thumb: you need at least 1,000 conversions in each arm to detect a 10 percent minimum detectable effect at 80 percent statistical power. Smaller accounts (under 200 conversions per week) usually cannot detect lift below 15-20 percent even with a 4-week test. Two options: extend to 6-8 weeks, or accept a wider confidence interval and report the result as directional rather than significant.</li>
                <li style={{ marginBottom: '14px' }}><strong>Choose your conversion window.</strong> For e-commerce with short lookbacks (1-7 days), a 4-week test is fine. For considered purchases with 14-30 day lookbacks, the test needs to run at least 6 weeks and the analysis window must close before you read the result.</li>
                <li style={{ marginBottom: '14px' }}><strong>Pre-register the analysis.</strong> Decide your significance threshold (usually 90 percent confidence for ad operations decisions, 95 percent for budget reallocations over $100K) and your analysis method before the test runs. If you decide after seeing the data, you are post-hoc fitting and the result is not trustworthy.</li>
              </ol>

              <MascotQuote mascot="sage">
                On a $40K/mo retail account last quarter, the team wanted to kill a YouTube campaign that looked dead on last-click attribution. We ran a 6-week geo lift across 12 DMAs. YouTube delivered 14 percent incremental conversions. Brand search, which looked like a winner on attribution, delivered 6 percent. The budget reallocation paid for the test in 11 days.
              </MascotQuote>
            </section>

            {/* Real numbers */}
            <section id="real-numbers">
              <h2 style={h2Style}>What Real Lift Numbers Look Like in Google Ads</h2>
              <p style={pStyle}>
                The honest range, synthesized from <a href="https://haus.io/article/google-ads-incrementality-testing" style={linkStyle} target="_blank" rel="noopener noreferrer">Haus</a>, Fusepoint, and what we have observed on B6 accounts:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {realLiftRows.map((row, i) => (
                  <div key={i} style={{ borderLeft: `4px solid ${row.color}`, background: '#f8fafc', padding: '16px 20px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>{row.channel}</div>
                    <div style={{ fontSize: '15px', color: '#475569', marginBottom: '4px' }}><strong>Typical lift:</strong> {row.range}</div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic' }}>{row.finding}</div>
                  </div>
                ))}
              </div>

              <p style={pStyle}>
                A lift result of zero (or negative) is a valid finding, not a failure of the experiment. &quot;This campaign produces no measurable incremental revenue&quot; is genuinely useful: redirect that budget. The Haus quote that captures this best: &quot;Turning off a campaign would only decrease total sales by 30 percent of what Google attributes to it.&quot; Sit with that number for a second. For the related diagnostic when ROAS suddenly shifts after a budget move, see our <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>ROAS dropped suddenly walkthrough</a>. For the broader Performance Max diagnostic when lift comes back weak, see <a href="/blog/performance-max-not-converting" style={linkStyle}>Performance Max not converting</a>.
              </p>
            </section>

            {/* Pitfalls */}
            <section id="pitfalls">
              <h2 style={h2Style}>Common Pitfalls That Invalidate Lift Tests</h2>
              <p style={pStyle}>
                The list of ways a self-run lift test goes wrong is long enough that we run through it every time a team designs one.
              </p>
              <p style={pStyle}>
                <strong>Contamination.</strong> A user sees ads on one device and is in the control group on another. Cookie loss reassigns users mid-test. Treatment and control geos share a commuter zone (the classic Manhattan-Newark problem). Each contaminates the result, usually toward underestimating lift.
              </p>
              <p style={pStyle}>
                <strong>Underpowered tests.</strong> Two weeks, 200 conversions per arm, 30 percent reported lift, no significance. The test ran, the number exists, the number is meaningless. We see senior teams ship recommendations off underpowered tests more often than we should.
              </p>
              <p style={pStyle}>
                <strong>Reading early.</strong> Considered purchases convert on day 22 of a 14-day lookback. If you read the lift result before the lookback closes, you are reading half the story. The conversion window must close before analysis starts.
              </p>
              <p style={pStyle}>
                <strong>Seasonality contamination.</strong> Comparing a December treatment period against a November pre-period without adjustment will produce 40-percent &quot;lift&quot; that is just Q4 demand. Always include seasonal controls or run during a stable window.
              </p>
              <p style={pStyle}>
                <strong>Letting Smart Bidding re-optimize mid-test.</strong> If you change tROAS, tCPA, budget, or audience signals during the test, the treatment is no longer stable. Either freeze the campaign settings or accept that the lift you measured is for the average of two different treatments.
              </p>
              <p style={pStyle}>
                <strong>Running lift with no challenger.</strong> A lift test on a brand campaign with no holdout geo and no creative variant measures nothing. We have seen this pitched as &quot;we are running an incrementality test&quot; three times this year. It was always a non-experiment.
              </p>
            </section>

            {/* Feedback loop */}
            <section id="feedback-loop">
              <h2 style={h2Style}>How to Feed Lift Results Back Into Smart Bidding</h2>
              <p style={pStyle}>
                This is the section most lift articles skip. The output of a lift test is not a slide for the QBR. It is a multiplier you apply to your bidding inputs.
              </p>
              <p style={pStyle}>
                The mechanic is simple. Smart Bidding optimizes against the conversions you send it. If your lift study shows 60 percent of last-click conversions are incremental, then for bidding purposes the conversion stream is overstated by 40 percent. Multiply your conversion value feed (or your conversion count, if you bid on Target CPA) by the incrementality factor (0.6 in this example) before sending it to the bidding algorithm. The result: Smart Bidding starts targeting causal conversions instead of correlated ones.
              </p>

              <MascotQuote mascot="vox">
                We ran lift on a $180K/mo home goods account in February. Brand search returned 42 percent incremental, Performance Max returned 11 percent, Display retargeting returned negative 3 percent. We re-weighted the conversion feed, dropped Display retargeting, moved $14K/mo into upper-funnel YouTube, and held tROAS targets steady on brand and PMax. Revenue grew 8 percent in 60 days on the same total spend.
              </MascotQuote>

              <p style={pStyle}>
                The operational rules we use on B6 accounts:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '10px' }}>Re-run the lift test quarterly. Lift drifts as the market, the creative, and the audience shift.</li>
                <li style={{ marginBottom: '10px' }}>Apply the multiplier at the conversion-action level, not the account level. Different conversion actions have different incrementality factors.</li>
                <li style={{ marginBottom: '10px' }}>Keep value-based bidding turned on. The whole point is to feed the algorithm a causally-honest signal.</li>
                <li style={{ marginBottom: '10px' }}>If lift comes back as zero or negative on a campaign, pause it, redirect the budget, and re-test the campaign you redirected into.</li>
              </ul>

              <p style={pStyle}>
                This loop is the practical version of Google&apos;s recommendation to &quot;combine incrementality testing with AI solutions&quot; in the <a href="https://business.google.com/us/think/measurement/incrementality-testing/" style={linkStyle} target="_blank" rel="noopener noreferrer">Think with Google framework</a>. The frame matters. AI bidding is not the problem. The problem is feeding AI bidding a non-causal conversion signal and acting surprised when the algorithm optimizes against the wrong thing. See our <a href="/blog/10-ai-powered-ppc-optimization-strategies" style={linkStyle}>AI-powered PPC optimization strategies</a> for the full feedback-loop pattern, and the <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score guide</a> for the related Smart Bidding signal-quality discussion.
              </p>

              <MascotQuote mascot="buzz">
                After Vox finished the re-weighting, I retuned tROAS from 4.2 to 3.6 on brand search to absorb the lower causal value and from 2.8 to 3.1 on PMax to push more spend at the campaign with real incremental contribution. CPA held inside 8 percent of the prior 30 days. The bidding algorithm did the work once the signal was honest.
              </MascotQuote>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>What&apos;s the difference between incrementality testing and A/B testing?</strong> A/B testing compares two versions of a treatment (ad A versus ad B) and tells you which is better. Incrementality testing compares treatment against no-treatment and tells you whether the campaign should run at all. They answer different questions and are not interchangeable.
              </p>
              <p style={pStyle}>
                <strong>Does Google Ads have built-in incrementality testing?</strong> Yes, two tools. User-level <a href="https://support.google.com/google-ads/answer/12003020" style={linkStyle} target="_blank" rel="noopener noreferrer">Conversion Lift</a>, available on request via your Google account representative. Geo-based incrementality experiments, rebuilt in November 2025 with a $5,000 minimum spend. Both run inside the Ads UI.
              </p>
              <p style={pStyle}>
                <strong>What&apos;s the minimum spend to run a lift test?</strong> Google&apos;s geo-based experiments require $5,000 per experiment as of late 2025. A self-run geo holdout outside the platform has no minimum, but realistically needs at least 1,000 conversions per arm to detect a 10 percent effect.
              </p>
              <p style={pStyle}>
                <strong>How long should a lift test run?</strong> Four weeks minimum for short-lookback e-commerce. Six to eight weeks for considered purchases or any account under 200 conversions per week. Always wait for the conversion window to close before reading the result.
              </p>
              <p style={pStyle}>
                <strong>Can incrementality testing prove Performance Max is working?</strong> It can prove whether PMax produces incremental conversions at the campaign level, but because PMax bundles Search, Shopping, Display, and YouTube, the result is a blended number. To isolate components, you need to layer in either a PMax-versus-no-PMax holdout or a channel-level diagnostic. For broader PMax diagnostics, see our <a href="/blog/performance-max-not-converting" style={linkStyle}>Performance Max not converting playbook</a>. For sudden ROAS shifts, see <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>ROAS dropped suddenly</a>. For the deeper Smart Bidding context, see the <a href="/blog/responsive-search-ads-best-practices" style={linkStyle}>RSA best practices guide</a>.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Optimizing Against Conversions That Would Have Happened Anyway</h2>
              <p style={pStyle}>
                Smart Bidding will gladly scale a campaign that adds zero incremental revenue, because Smart Bidding cannot tell the difference between a conversion it caused and a conversion that would have happened in its absence. Lift testing is the only empirical bridge. Without it, you are tuning a multi-million-dollar bidding algorithm on a signal you have never validated.
              </p>
              <p style={pStyle}>
                The B6 stack treats this as the core measurement loop. <a href="/b6#sage" style={linkStyle}>Sage</a> designs the lift test (treatment unit, control match, sample size, conversion window), runs the analysis when the window closes, and reports the causal numbers with confidence intervals. <a href="/b6#vox" style={linkStyle}>Vox</a> translates the result into a budget reallocation proposal, telling you which campaigns deserve more spend, which deserve less, and where to redirect the cuts. <a href="/b6#buzz" style={linkStyle}>Buzz</a> retunes tROAS, tCPA, and the conversion value feed so Smart Bidding is targeting causal value. The whole loop runs quarterly, with no QBR deck required.
              </p>
              <p style={pStyle}>
                The cost structure: B6 is free while in beta on the Approval level, versus Optmyzr at roughly $499 a month for recommendation-only insights, versus the typical agency that will quote $4-8K for one custom incrementality study. Connect your account at <a href="/chat" style={linkStyle}>/chat</a> and Sage will design a default geo-lift across your top three campaigns inside 5 minutes. Pricing tiers and what each <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a> does in each tier are at <a href="/pricing" style={linkStyle}>/pricing</a>.
              </p>
            </section>

          </div>
        </div>
        <KeepReading slug="incrementality-testing-google-ads" category="google-ads" />
      <Footer />
      </div>
    </>
  );
}
