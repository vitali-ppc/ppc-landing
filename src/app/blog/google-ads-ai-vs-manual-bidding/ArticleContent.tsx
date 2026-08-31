'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { CompareGrid } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-ai-vs-manual-bidding#article',
    headline: 'Google Ads AI vs Manual Bidding: How to Decide (with Real Data)',
    description:
      'AI (Smart) bidding vs manual bidding in Google Ads, decided by account stage, conversion volume, and goal. A decision matrix plus real attributed performance data, not "it depends."',
    image: 'https://www.kampaio.com/og/google-ads-ai-vs-manual-bidding.png',
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
    datePublished: '2026-06-20T00:00:00.000Z',
    dateModified: '2026-06-20T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-ai-vs-manual-bidding',
    },
    keywords:
      'Smart Bidding, manual bidding, manual CPC, automated bidding, Google Ads AI, Target CPA, Target ROAS, conversion tracking, learning phase, 30-conversion threshold, bid strategy experiment, account maturity',
    inLanguage: 'en',
    "wordCount": 1394,
    "articleSection": "AI"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is AI bidding better than manual bidding in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI (Smart) bidding outperforms manual CPC when conversion volume reaches roughly 30 per 30 days and tracking is verified (level.agency, 2026). Below that threshold, manual CPC is the safer choice. Neither strategy is unconditionally better; account data conditions determine the answer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Smart Bidding and automated bidding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart Bidding is a conversion-optimized subset of automated bidding. Automated bidding covers all strategies where Google sets bids automatically (including Maximize Clicks). Smart Bidding refers specifically to Target CPA, Target ROAS, Maximize Conversions, and Maximize Conversion Value, which use auction-time machine learning.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many conversions do you need for Smart Bidding to work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The widely cited threshold is approximately 30 conversions in the past 30 days, per level.agency (2026) and aligned with Google's own guidance. Below that number, the algorithm's learning phase may not complete reliably, and the strategy will optimize on too little signal.",
        },
      },
      {
        '@type': 'Question',
        name: 'Why are my Smart Bidding CPCs so high?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart Bidding raises CPCs when it identifies an auction as high-conversion-probability. If CPCs spike but conversions do not follow, the algorithm is working from corrupted or insufficient data. Check for duplicate conversion tracking or misconfiguration. Jyll Saskin Gales (LinkedIn, 2024) named this "way too high" CPC behavior as the primary Smart Bidding failure mode to watch.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you switch from manual to Smart Bidding without losing data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Switching bid strategy does not erase conversion history. Google's algorithm inherits the account's historical conversion data when you transition. The learning phase still applies: expect 1-2 weeks of optimization before performance stabilizes after the switch.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best bidding strategy for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no single best strategy. Target CPA is the most straightforward Smart Bidding option for lead-gen accounts with consistent conversion values. Target ROAS suits e-commerce with variable transaction values. Manual CPC is best for new accounts, thin data, or branded campaigns where you need cost control without an algorithm learning.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Google Ads AI vs Manual Bidding: How to Decide (with Real Data)',
        item: 'https://www.kampaio.com/blog/google-ads-ai-vs-manual-bidding',
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Quick Answer: AI or Manual Bidding?', level: 1 },
    { id: 'what-changes', title: 'What Actually Changes Between Manual and AI Bidding', level: 1 },
    { id: 'scorecard', title: 'Manual vs AI Bidding: The Side-by-Side Scorecard', level: 1 },
    { id: 'when-ai-wins', title: 'When AI (Smart) Bidding Wins', level: 1 },
    { id: 'when-manual-wins', title: 'When Manual Bidding Still Wins', level: 1 },
    { id: 'decision-matrix', title: 'The Bidding Decision Matrix', level: 1 },
    { id: 'how-to-test', title: 'How to Test One Against the Other Without Guessing', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Stop Choosing Blind: Let the Data (and the Agents) Decide', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
  const paragraphStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const h2Style: React.CSSProperties = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px', scrollMarginTop: '24px' };

  // Scorecard table data (Manual CPC vs Smart / AI Bidding across 7 dimensions).
  const scorecard = [
    {
      dimension: 'Control level',
      manual: 'Full: you set every bid ceiling',
      ai: 'Low: Google sets per-auction bids within your targets',
    },
    {
      dimension: 'Data needed to work',
      manual: 'Low: works from day one with no conversion history',
      ai: 'High: needs ~30 conversions/30 days to exit the learning phase reliably',
    },
    {
      dimension: 'Weekly time cost',
      manual: 'High: requires regular bid reviews, search term audits',
      ai: 'Low once learning phase ends: mostly monitoring',
    },
    {
      dimension: 'Scaling ceiling',
      manual: 'Hard ceiling: manual review limits throughput on large accounts',
      ai: 'Higher ceiling: per-auction signals scale automatically with query volume',
    },
    {
      dimension: 'Transparency',
      manual: 'High: you see every bid change',
      ai: 'Low: individual bid decisions are not exposed',
    },
    {
      dimension: 'Best-fit conditions',
      manual: 'New accounts, thin data, branded campaigns, broken tracking',
      ai: 'High volume, clean tracking, value-based goals, high query diversity',
    },
    {
      dimension: 'Documented downside',
      manual: 'Scaling ceiling; time-intensive; misses per-auction signals',
      ai: 'CPC spikes when data is thin; learning resets after budget/target changes',
    },
  ];

  // Decision matrix data (account situation -> recommended approach + why).
  const matrix = [
    {
      situation: 'Brand-new account, zero conversions',
      approach: 'Manual CPC',
      why: 'No conversion history: Smart Bidding has nothing to learn from (maturity + volume)',
      tone: 'manual' as const,
    },
    {
      situation: 'Low volume: under 30 conv/30 days',
      approach: 'Manual CPC',
      why: 'Below learning threshold: algorithm optimizes on noise, not signal (volume)',
      tone: 'manual' as const,
    },
    {
      situation: 'Volume building: 30-100 conv/month',
      approach: 'Transition to Smart Bidding (Maximize Conversions first, then Target CPA)',
      why: 'Enough signal to start learning; avoid Target ROAS until value data is richer (volume + maturity)',
      tone: 'mixed' as const,
    },
    {
      situation: 'High volume, clean tracking',
      approach: 'Smart Bidding (Target CPA or Target ROAS)',
      why: 'Per-auction signals add measurable value at scale; manual CPC hits a throughput ceiling (volume + tracking)',
      tone: 'ai' as const,
    },
    {
      situation: 'Branded / defensive campaign',
      approach: 'Manual CPC',
      why: 'High-intent, low-competition queries; Smart Bidding CPC inflation is not justified (goal clarity)',
      tone: 'manual' as const,
    },
    {
      situation: 'Broken or unverified tracking',
      approach: 'Manual CPC',
      why: 'Smart Bidding optimizes toward the wrong signal; fix tracking before automating bids (tracking clarity)',
      tone: 'manual' as const,
    },
  ];

  const toneBadge = (tone: 'manual' | 'ai' | 'mixed') => {
    if (tone === 'ai') return { bg: '#ecfdf5', color: '#047857' };
    if (tone === 'mixed') return { bg: '#eff6ff', color: '#1d4ed8' };
    return { bg: '#fff7ed', color: '#c2410c' };
  };

  const thStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '2px solid #e5e7eb',
    textAlign: 'left',
    fontWeight: 600,
    color: '#1e293b',
    fontSize: '15px',
    background: '#f8fafc',
  };
  const tdStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '1px solid #e5e7eb',
    color: '#1e293b',
    fontSize: '15px',
    verticalAlign: 'top',
  };

  // Five-step experiment cards (2x2+1, repeat(N,1fr), no auto-fit).
  const testSteps = [
    {
      n: '1',
      title: 'Verify conversion tracking first',
      body: 'A misconfigured conversion action corrupts the experiment. Check for duplicate tracking and value consistency before touching bid strategy.',
      accent: '#667eea',
    },
    {
      n: '2',
      title: 'Set up the campaign experiment',
      body: 'Split traffic 50/50 between control and treatment inside Google Ads. Do not run the test on your entire spend.',
      accent: '#764ba2',
    },
    {
      n: '3',
      title: 'Give it a 2-week learning window',
      body: 'Judging CPA or ROAS on day four produces noise, not signal. A status stuck on "Learning" or "Limited" past two weeks is the cue to investigate.',
      accent: '#10b981',
    },
    {
      n: '4',
      title: 'Compare on the goal metric',
      body: 'Measure CPA or ROAS, not CPC alone. Smart Bidding is allowed to pay more per click if it converts at a higher rate.',
      accent: '#f59e0b',
    },
    {
      n: '5',
      title: 'Watch CPC as an anomaly signal',
      body: 'If CPCs spike while conversion volume stays flat, the algorithm is misoptimizing, not learning. Set a daily spend cap as a circuit breaker.',
      accent: '#ef4444',
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-ai-vs-manual-bidding" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · AI &amp; Bidding
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads AI vs Manual Bidding: How to Decide (with Real Data)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A decision matrix keyed to the three variables that actually decide it: conversion volume, tracking quality, and account maturity. Not &quot;it depends.&quot;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  S
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Senior PPC Manager at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 20, 2026 · 12 min read</span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 600, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
              >
                Table of Contents
                <span style={{ transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
              </button>
              {isTableOfContentsOpen && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  {tableOfContents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: '1.4', borderBottom: '1px solid transparent', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#764ba2';
                        e.currentTarget.style.borderBottomColor = '#764ba2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#64748b';
                        e.currentTarget.style.borderBottomColor = 'transparent';
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Intro */}
            <section id="intro">
              <p style={paragraphStyle}>
                Google Ads Smart Bidding wins when an account feeds it enough clean conversion data. Manual CPC wins on low-volume, new, or tightly-controlled accounts. The choice turns on three variables: monthly conversion volume, tracking quality, and account maturity. This article gives you a lookup table for each.
              </p>
            </section>

            {/* Quick Answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>Quick Answer: AI or Manual Bidding?</h2>
              <p style={paragraphStyle}>
                Smart Bidding outperforms manual CPC when the data conditions are right. When they are not, manual wins by default. Three verdicts cover most accounts:
              </p>

              {/* VISUAL 1: StatGrid, the three deciding verdicts */}
              <div className="qa-statgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '32px 0' }}>
                {[
                  { n: '30+', label: 'conversions / 30 days, clean tracking', verdict: 'Use Smart Bidding (Target CPA or Target ROAS).' },
                  { n: 'New', label: 'account or thin data', verdict: 'Use manual CPC to gather clean conversion history first.' },
                  { n: 'Brand', label: 'or budget-capped campaigns', verdict: 'Manual CPC frequently holds or beats Smart Bidding on cost control.' },
                ].map((s) => (
                  <div key={s.label} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
                      {s.n}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>{s.label}</div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{s.verdict}</div>
                  </div>
                ))}
              </div>

              <p style={paragraphStyle}>
                Three variables decide it in every account: conversion volume, goal and tracking clarity, and account maturity. The rest of this article maps those variables to specific account situations.
              </p>

              <MascotQuote mascot="buzz">
                Below roughly 30 conversions in the past 30 days, I keep bids manual and review search terms daily. Above that threshold, I let Smart Bidding run a 2-week learning window before touching anything. Judging it on day 3 is the single most common mistake I see.
              </MascotQuote>
            </section>

            {/* What Actually Changes */}
            <section id="what-changes">
              <h2 style={h2Style}>What Actually Changes Between Manual and AI Bidding</h2>
              <p style={paragraphStyle}>
                Manual CPC bidding is a <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a> where you set a fixed maximum bid per click and Google serves your ad based on that ceiling. Smart Bidding is Google&apos;s family of automated bid strategies that sets a unique bid at every auction based on real-time signals: device, location, time of day, audience membership, and query context (<a href="https://support.google.com/google-ads/answer/2979071" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>).
              </p>
              <p style={paragraphStyle}>
                The real difference is who sets the bid and on what signal volume. With manual CPC, you set one aggregate bid using whatever data you have in front of you. Smart Bidding reads dozens of per-auction signals you cannot observe and acts in milliseconds.
              </p>
              <p style={paragraphStyle}>
                That tradeoff is direct: manual CPC trades data richness for full control; Smart Bidding trades control for per-auction signal access. One is not universally better, one is a better fit depending on what your account can supply.
              </p>
              <p style={paragraphStyle}>
                For a full breakdown of the six Smart Bidding strategy options (Target CPA, Target ROAS, Maximize Conversions, Maximize Conversion Value, Enhanced CPC, and Target Impression Share), see <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>choosing the right Smart Bidding strategy</a>. For what <a href="/blog/10-ai-powered-ppc-optimization-strategies" style={{ color: '#764ba2', textDecoration: 'underline' }}>AI optimization</a> covers beyond bids, see <a href="/blog/ai-powered-ppc-optimization-complete-guide" style={linkStyle}>what AI optimization covers beyond bids</a>. This article focuses on the layer above: AI bidding or manual at all?
              </p>
            </section>

            {/* Scorecard */}
            <section id="scorecard">
              <h2 style={h2Style}>Manual vs AI Bidding: The Side-by-Side Scorecard</h2>
              <p style={paragraphStyle}>
                This table compares Manual CPC and Smart Bidding across seven dimensions. It is a fit map, not a winner declaration.
              </p>

              {/* VISUAL 2: Scorecard comparison table (extractable block) */}
              <div style={{ overflowX: 'auto', margin: '32px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '680px' }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Dimension</th>
                      <th style={thStyle}>Manual CPC</th>
                      <th style={thStyle}>Smart / AI Bidding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scorecard.map((row) => (
                      <tr key={row.dimension}>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>{row.dimension}</td>
                        <td style={tdStyle}>{row.manual}</td>
                        <td style={tdStyle}>{row.ai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={paragraphStyle}>
                The downside rows deserve a specific note. One echelonn client burned $50,000 in three months after the AI campaign builder was set up on a thin-data account with no manual intervention (echelonn.io client cases, 2025). That is not a story about Smart Bidding being broken. It is a story about feeding insufficient data to a data-hungry system.
              </p>

              <MascotQuote mascot="aegis">
                Smart Bidding with thin conversion data does not optimize toward your goal. It optimizes toward noise. I flag any account for manual override until conversion tracking is verified and volume clears the threshold. Do not skip this check.
              </MascotQuote>
            </section>

            {/* When AI wins */}
            <section id="when-ai-wins">
              <h2 style={h2Style}>When AI (Smart) Bidding Wins</h2>
              <p style={paragraphStyle}>
                Smart Bidding wins when the account feeds it enough clean conversion data to learn from. Three conditions define that state:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Conversion volume at or above the threshold.</strong> <a href="https://www.level.agency/perspectives/smart-bidding-in-google-ads/" style={linkStyle} target="_blank" rel="noopener noreferrer">Level.agency (2026)</a> and Google&apos;s own guidance align on roughly 30 conversions per 30 days as the floor for reliable Smart Bidding performance. Below that, the algorithm lacks the signal density to distinguish signal from noise.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Reliable conversion tracking.</strong> Smart Bidding optimizes toward whatever conversion action you tell it to optimize. If that action is misconfigured, duplicated, or fires inconsistently, the algorithm learns the wrong thing.
                </li>
                <li style={{ marginBottom: 0 }}>
                  <strong>Value-based or CPA-based goals.</strong> Target ROAS and Target CPA work best when your conversion values are consistent or explicitly assigned. High query diversity also benefits Smart Bidding because per-auction signals matter more when queries vary.
                </li>
              </ul>
              <p style={paragraphStyle}>
                The attributed upside is real when conditions are met. In <a href="https://echelonn.io/post/google-ads-ai-manual-vs-automated-campaigns" style={linkStyle} target="_blank" rel="noopener noreferrer">echelonn&apos;s client cases (2025)</a>, Target ROAS campaigns delivered 10-30% better ROAS; Target CPA campaigns produced 10-20% CPA reduction. These are conditional results from a single vendor source, not guarantees. Frame them as the ceiling.
              </p>
              <p style={paragraphStyle}>
                A <a href="https://www.reddit.com/r/googleads/comments/1hyfkmr/i_spent_20000_to_test_google_ads_smart_ai_bidding/" style={linkStyle} target="_blank" rel="noopener noreferrer">practitioner&apos;s $20,000 Smart-vs-Manual test on r/googleads (2025)</a> put it plainly: &quot;In many cases Smart Bidding beats Manual; in some it doesn&apos;t.&quot; The conditions are exactly what this article maps.
              </p>
            </section>

            {/* When manual wins */}
            <section id="when-manual-wins">
              <h2 style={h2Style}>When Manual Bidding Still Wins</h2>
              <p style={paragraphStyle}>
                Manual CPC still wins on low-data, low-volume, or control-critical accounts. Four situations consistently favor it:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}>
                  <strong>New accounts and new campaigns with no conversion history.</strong> Smart Bidding has nothing to learn from. Manual CPC lets you run the account while accumulating the clean conversion data Smart Bidding will eventually need.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Very low conversion volume (under the ~30 conversion/30-day threshold).</strong> The learning phase never ends cleanly. The algorithm cycles on noise instead of signal.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Tightly budget-capped campaigns.</strong> Smart Bidding can push CPCs high when optimizing for conversions with a capped daily budget, because it bids aggressively on the auctions it considers high-value. Manual CPC holds the ceiling.
                </li>
                <li style={{ marginBottom: 0 }}>
                  <strong>Branded and defensive campaigns.</strong> A practitioner case from <a href="https://echelonn.io/post/google-ads-ai-manual-vs-automated-campaigns" style={linkStyle} target="_blank" rel="noopener noreferrer">echelonn (2025)</a> found that switching branded campaigns to manual bidding cut bids 40% while holding conversion volume. The rationale: branded queries are high-intent and low-competition. Smart Bidding has less to optimize in a situation where you already win most auctions.
                </li>
              </ul>

              {/* VISUAL 3: CompareGrid (bold-viz), manual CPC vs Smart Bidding fit */}
              <CompareGrid
                columns={[
                  {
                    name: 'Manual CPC',
                    bestFor: 'new, thin-data, or control-critical accounts',
                    traits: [
                      { label: 'Full bid control', has: true },
                      { label: 'Works from day one', has: true },
                      { label: 'Holds a fixed CPC ceiling', has: true },
                      { label: 'Scales hands-off at volume', has: false },
                      { label: 'Reads per-auction signals', has: false },
                    ],
                  },
                  {
                    name: 'Smart / AI Bidding',
                    bestFor: 'high-volume accounts with clean tracking',
                    traits: [
                      { label: 'Full bid control', has: false },
                      { label: 'Works from day one', has: false },
                      { label: 'Holds a fixed CPC ceiling', has: false },
                      { label: 'Scales hands-off at volume', has: true },
                      { label: 'Reads per-auction signals', has: true },
                    ],
                    highlight: true,
                  },
                ]}
              />

              <p style={paragraphStyle}>
                One caveat on the echelonn numbers cited in this debate: the 22% higher conversion rate and 25% better CTR figures (echelonn client data, 2025) reflect manually-structured campaigns versus AI-generated campaign structures, not bidding strategy alone. The variable was structure, not bid strategy. Do not read them as &quot;manual bidding produced 22% higher conversion rates.&quot; If your tracking is broken rather than just thin, that is a separate diagnosis covered in <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>Google Ads conversion tracking not working</a>.
              </p>

              <MascotQuote mascot="buzz">
                On branded campaigns I keep manual CPC and cap at a fixed ceiling. I can see from auction insights that branded queries convert at 4x the rate of generic ones. Paying Smart Bidding-level CPCs for traffic I already dominate organically is just waste.
              </MascotQuote>
            </section>

            {/* Decision matrix */}
            <section id="decision-matrix">
              <h2 style={h2Style}>The Bidding Decision Matrix</h2>
              <p style={paragraphStyle}>
                Look up your account situation in the table below. Each row maps to a recommended approach and the one-line rationale.
              </p>

              {/* VISUAL 4: Decision matrix table (signature extractable block) */}
              <div style={{ overflowX: 'auto', margin: '32px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Account Situation</th>
                      <th style={thStyle}>Recommended Approach</th>
                      <th style={thStyle}>Why (variable)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row) => {
                      const badge = toneBadge(row.tone);
                      return (
                        <tr key={row.situation}>
                          <td style={{ ...tdStyle, fontWeight: 600 }}>{row.situation}</td>
                          <td style={tdStyle}>
                            <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 700, padding: '4px 10px', borderRadius: '10px', background: badge.bg, color: badge.color, lineHeight: 1.4 }}>
                              {row.approach}
                            </span>
                          </td>
                          <td style={tdStyle}>{row.why}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p style={paragraphStyle}>
                Most accounts are not a permanent one-or-the-other choice. The standard migration path: start manual CPC to accumulate clean conversion data, then graduate to Smart Bidding once volume clears 30/30 and tracking is verified. Switching strategy does not delete conversion history. The algorithm inherits what manual CPC already built. A sudden <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>ROAS drop after switching strategies</a> is a common post-transition signal that the learning phase is still running, not a permanent regression.
              </p>

              <MascotQuote mascot="vox">
                On accounts with mixed-maturity campaigns, I flag each campaign individually. Search Campaign A (90 conv/mo, clean tracking) runs Target CPA. Search Campaign B (12 conv/mo, new) stays manual. Pooling them into one Smart Bidding strategy would let the low-data campaign corrupt the signal the high-data one depends on.
              </MascotQuote>
            </section>

            {/* How to test */}
            <section id="how-to-test">
              <h2 style={h2Style}>How to Test One Against the Other Without Guessing</h2>
              <p style={paragraphStyle}>
                Run a bid-strategy experiment so the data decides, not the vendor. Google Ads campaign <a href="/blog/google-ads-experiments" style={{ color: '#764ba2', textDecoration: 'underline' }}>experiments</a> split live traffic between a control (current strategy) and a treatment (the strategy you are testing), using the same campaign settings otherwise.
              </p>

              {/* VISUAL 5: Five-step experiment card grid (2x2+1, explicit columns, no auto-fit) */}
              <div className="test-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '32px 0' }}>
                {testSteps.map((c) => (
                  <div key={c.n} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderTop: `4px solid ${c.accent}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: c.accent, color: 'white', fontWeight: 800, fontSize: '15px', marginBottom: '12px' }}>{c.n}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px', lineHeight: 1.35 }}>{c.title}</div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{c.body}</div>
                  </div>
                ))}
              </div>

              <p style={paragraphStyle}>
                On that last point: <a href="https://www.linkedin.com/posts/jyllsaskingales_is-manual-cpc-bidding-in-google-ads-a-mistake-activity-7256711378386747393-txOt" style={linkStyle} target="_blank" rel="noopener noreferrer">Jyll Saskin Gales, a PPC practitioner</a>, noted in 2024 that Smart Bidding CPCs can run &quot;way too high&quot; as a documented failure mode. If the campaign shows a <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>bid strategy status of &quot;Learning&quot; or &quot;Limited&quot;</a> past the two-week mark, that is the signal to investigate before drawing any conclusions. If you are running the experiment manually, check CPC daily in the first two weeks and set a daily spend cap as a circuit breaker.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              {faqSchema.mainEntity.map((qa) => (
                <div key={qa.name} style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{qa.name}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{qa.acceptedAnswer.text}</p>
                </div>
              ))}
              <p style={{ ...paragraphStyle, fontSize: '15px', color: '#64748b', marginTop: '16px' }}>
                Source for the official definition of automated bidding: <a href="https://support.google.com/google-ads/answer/2979071" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: About automated bidding</a>.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Choosing Blind: Let the Data (and the Agents) Decide</h2>
              <p style={paragraphStyle}>
                You do not have to choose between handing full control to a black-box algorithm and manually reviewing bids in a spreadsheet every Tuesday. Those are not the only options.
              </p>
              <p style={paragraphStyle}>
                B6 is an autonomous management layer on top of your Google Ads account. It does not replace Smart Bidding at the auction level. Google&apos;s AI still sets individual bids in real time. B6 adds the management layer: monitoring performance, flagging anomalies, and acting on account-level decisions with full transparency. Buzz monitors bid strategy performance and auto-applies changes based on your autonomy tier. Vigil catches CPC spikes before they compound. Aegis reviews proposed changes for risk. Vox handles cross-campaign reallocation when campaigns are at different maturity stages.
              </p>
              <p style={paragraphStyle}>
                The autonomy tier is the &quot;third option&quot;: at L1 Co-pilot, B6 suggests and you approve. At L2 Autopilot, B6 acts on smaller decisions and flags larger ones. At L3 Full Autopilot, B6 manages autonomously with daily safety caps. Optmyzr and Madgicx start at $499+ and advise without acting. B6, <a href="/pricing" style={linkStyle}>free while in beta</a>, acts, shows every step live, and keeps your manual override in place.
              </p>

              <MascotQuote mascot="buzz">
                You do not have to give up the manual override to get AI-level optimization. The autonomy tier controls how much I act vs. flag for your approval. On a new account under 30 conversions/month, I stay in co-pilot mode and let you keep full bid control. On a mature account with clean tROAS data, I run at L2 and handle the weekly bid reviews automatically.
              </MascotQuote>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  See how Buzz sets bids live
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Connect your Google Ads account to B6 and watch Buzz evaluate every campaign&apos;s bidding against its conversion volume and tracking quality, then recommend AI or manual per campaign, with the rationale, before anything applies.
                </p>
                <a
                  href="/b6#buzz"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  See Buzz in Action
                </a>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                Results vary by account, campaign structure, conversion volume, and market conditions. Performance figures cited from echelonn.io and level.agency are single-vendor client data, not industry guarantees. This article is informational and does not constitute professional financial or advertising advice.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-ai-vs-manual-bidding" category="google-ads" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .qa-statgrid {
          grid-template-columns: repeat(3, 1fr);
        }
        .test-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .test-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 760px) {
          .qa-statgrid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 560px) {
          .test-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
