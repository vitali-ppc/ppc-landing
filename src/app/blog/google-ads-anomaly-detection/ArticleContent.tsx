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
    "headline": "Google Ads Anomaly Detection: How to Catch Spend Spikes, Conversion Drops, and Tracking Outages Before They Cost You a Week",
    "description": "Built-in Google Ads alerts are too noisy or too late. The Account Anomaly Detector script is brittle. The detection stack that actually works in 2026: rolling baselines, severity tiers, and Aegis classification.",
    "image": "https://kampaio.com/og/google-ads-anomaly-detection.png",
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
      "@id": "https://kampaio.com/blog/google-ads-anomaly-detection"
    },
    "keywords": "google ads anomaly detection, account anomaly detector, campaign anomaly detector, CAD v2, rolling baseline, z-score, severity tier, tracking outage, click bombing, brand campaign, Smart Bidding learning, Aegis, Buzz, Echo, Sage, B6, multi-agent, false-positive rate",
    "wordCount": 3137,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Account Anomaly Detector script in Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google's first-party Apps Script for anomaly detection. It compares the current day's running stats (impressions, clicks, conversions, cost) against the average of the same day of week over the prior 26 weeks. Thresholds are configurable per metric in a Google Sheet. Sends a single email per alert per day. A fine baseline, brittle as a primary detection layer for a 10+ account portfolio."
        }
      },
      {
        "@type": "Question",
        "name": "How do I set up alerts for unusual activity in Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Three layers. (1) Turn on the built-in in-account notifications and email notifications for the operational basics (payment, disapproval, suspension). (2) Deploy the Account Anomaly Detector script or CAD v2 for performance-metric anomalies. (3) Layer a routing tool (Slack via Go-Insights or a commercial monitor, or an agent like Aegis) for severity classification and on-call paging."
        }
      },
      {
        "@type": "Question",
        "name": "What is a normal false-positive rate for ad-account alerts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aim for under 15% on severity 1 alerts and under 30% on severity 2. Higher on severity 3 is acceptable because that tier is supposed to be wide. If severity 1 false positives exceed 30%, you have threshold drift, structural change in an account (campaign restructure, product launch) that nobody told the rule engine about, or both."
        }
      },
      {
        "@type": "Question",
        "name": "Is z-score better than percentage thresholds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For alerting math, yes. Z-score adapts to the natural variance of the campaign, so a noisy Performance Max campaign does not page you every Tuesday for routine 25% swings. For the human-readable alert payload, percentage is better because it is faster to parse. Use both: z-score for the rule, percentage for the message."
        }
      },
      {
        "@type": "Question",
        "name": "Does Google have built-in anomaly detection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Partial. The Recommendations page surfaces some performance opportunities and warnings. The Anomalies card in Ad Manager is a beta feature on the publisher side, not the advertiser side. In Google Ads proper, you get notifications and recommendations but no true rolling-baseline anomaly engine. That is the gap the Account Anomaly Detector script and the commercial layers exist to fill."
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
        "name": "Google Ads Anomaly Detection",
        "item": "https://www.kampaio.com/blog/google-ads-anomaly-detection"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - Why Google Ads Anomaly Detection Is Broken Out of the Box', level: 1 },
    { id: 'anatomy', title: 'The Anatomy of a Real Account Anomaly', level: 1 },
    { id: 'stack', title: 'The Detection Stack Compared: Built-in vs Script vs Commercial vs Agent', level: 1 },
    { id: 'thresholds', title: 'Threshold Math: What Should Actually Trigger an Alert', level: 1 },
    { id: 'severity', title: 'Anomaly Severity Tiers and Who Should Get the Page', level: 1 },
    { id: 'aegis', title: 'How Aegis Detects, Classifies, and Routes Anomalies in B6', level: 1 },
    { id: 'build-your-own', title: 'Building Your Own Anomaly Detection Layer (When You Can\'t Buy)', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'Stop Reacting to Spend Spikes. Detect Them.', level: 1 },
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

  // VISUAL 4 data: detection stack comparison
  // VISUAL 5 data: threshold grid (3 columns explicit, no auto-fit)
  const thresholdRows = [
    {
      metric: 'Spend pacing',
      rule: '±15% intra-day vs trailing 14-day same-hour band, sustained 60 min',
      severity: 'S2',
      color: '#f59e0b',
    },
    {
      metric: 'CPA',
      rule: '±25% week-over-week is "look at it", ±50% is escalation',
      severity: 'S1 / S2',
      color: '#ef4444',
    },
    {
      metric: 'CTR',
      rule: '2σ below rolling 28-day mean, campaign level only',
      severity: 'S3',
      color: '#8b5cf6',
    },
    {
      metric: 'Conversion rate',
      rule: 'Drop > 30% sustained 24h triggers tracking suspicion first',
      severity: 'S1',
      color: '#ef4444',
    },
    {
      metric: 'Click volume',
      rule: '3x spike in 1h with flat impressions = click bombing',
      severity: 'S2',
      color: '#f59e0b',
    },
    {
      metric: 'CPC',
      rule: '2σ above 28-day mean, persistent across 6h window',
      severity: 'S3',
      color: '#8b5cf6',
    },
  ];

  // VISUAL 6 data: rolling baseline sparkline SVG
  const baselineSvg = `
<svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rolling baseline with anomaly spike">
  <defs>
    <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a5b4fc" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#a5b4fc" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="800" height="320" fill="#f8fafc"/>
  <text x="400" y="30" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="#1e293b">Rolling 14-day baseline with ±2σ band (CPA, daily)</text>

  <!-- Y axis -->
  <line x1="60" y1="60" x2="60" y2="260" stroke="#cbd5e1" stroke-width="1"/>
  <!-- X axis -->
  <line x1="60" y1="260" x2="760" y2="260" stroke="#cbd5e1" stroke-width="1"/>

  <!-- Y labels -->
  <text x="50" y="80" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">$70</text>
  <text x="50" y="140" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">$50</text>
  <text x="50" y="200" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">$30</text>
  <text x="50" y="258" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#64748b">$10</text>

  <!-- ±2σ band (expected zone) -->
  <path d="M 80 168 L 130 165 L 180 170 L 230 167 L 280 172 L 330 168 L 380 170 L 430 166 L 480 171 L 530 169 L 580 173 L 630 170 L 680 168 L 730 172 L 730 138 L 680 142 L 630 140 L 580 143 L 530 139 L 480 141 L 430 136 L 380 140 L 330 138 L 280 142 L 230 137 L 180 140 L 130 135 L 80 138 Z" fill="url(#bandGrad)"/>

  <!-- Baseline (mean) line -->
  <polyline points="80,153 130,150 180,155 230,152 280,157 330,153 380,155 430,151 480,156 530,154 580,158 630,155 680,155 730,155" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="4 4"/>

  <!-- Observed data (with spike) -->
  <polyline points="80,158 130,155 180,160 230,155 280,162 330,158 380,160 430,156 480,162 530,160 580,165 630,90 680,75 730,82" fill="none" stroke="#1e293b" stroke-width="2.5"/>

  <!-- Spike data points -->
  <circle cx="630" cy="90" r="5" fill="#ef4444"/>
  <circle cx="680" cy="75" r="5" fill="#ef4444"/>
  <circle cx="730" cy="82" r="5" fill="#ef4444"/>

  <!-- Annotation -->
  <line x1="680" y1="75" x2="680" y2="40" stroke="#ef4444" stroke-width="1" stroke-dasharray="2 2"/>
  <rect x="540" y="20" width="240" height="36" rx="6" fill="#ef4444"/>
  <text x="660" y="44" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" font-weight="700" fill="white">Severity 1: 3.4σ above baseline</text>

  <!-- Legend -->
  <g transform="translate(80, 280)">
    <rect x="0" y="0" width="14" height="14" fill="url(#bandGrad)"/>
    <text x="20" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">Expected range (±2σ)</text>
    <line x1="180" y1="7" x2="210" y2="7" stroke="#6366f1" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="216" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">14-day rolling mean</text>
    <line x1="360" y1="7" x2="390" y2="7" stroke="#1e293b" stroke-width="2.5"/>
    <text x="396" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">Observed CPA</text>
    <circle cx="510" cy="7" r="4" fill="#ef4444"/>
    <text x="520" y="12" font-family="-apple-system, system-ui, sans-serif" font-size="11" fill="#475569">Anomaly (out of band)</text>
  </g>

  <text x="400" y="312" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="12" fill="#64748b" font-style="italic">Day-over-day CPA stays inside the expected band for 28 days, then breaks out for 3 consecutive days. That is the signal.</text>
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
          <ArticleHero slug="google-ads-anomaly-detection" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads &middot; Anomaly Detection
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Anomaly Detection: How to Catch Spend Spikes, Conversion Drops, and Tracking Outages Before They Cost You a Week
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Built-in alerts are too noisy or too late. The Account Anomaly Detector script is brittle. The stack that actually works in 2026: rolling baselines, severity tiers, and an <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a> that classifies before it pages.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 15, 2026 &middot; 14 min read</span>
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
              <h2 style={h2Style}>TL;DR - Why Google Ads Anomaly Detection Is Broken Out of the Box</h2>
              <p style={pStyle}>
                If you manage 5 or more <a href="/blog/google-ads-optimization" style={linkStyle}>Google Ads accounts</a>, you already know the pattern. Monday morning, you open one of the smaller clients, and CPA is up 73% over a 4 day window. You scroll back. Day 1 was fine. Day 2 was fine. Day 3 was when the GA4 container deploy went out and Enhanced Conversions stopped firing on 41% of checkout events. You missed it because nobody paged you. The built-in Google Ads notification panel surfaced two things in that window: a payment method expiring in 60 days, and an &quot;auto-applied recommendation&quot; suggesting a budget raise on the campaign that just stopped converting.
              </p>
              <p style={pStyle}>
                This is the central problem with Google Ads anomaly detection in 2026. The built-in alerts are too noisy or too late. They fire on the things Google chose to monitor (disapprovals, budget caps, policy issues), not on the things that matter to a portfolio manager (CPA drift, conversion-rate breakage, click bombing, bid-algo overreach during Smart Bidding learning). The Account Anomaly Detector script that Google publishes is closer to right, but it is brittle: same-day-of-week mean, hard percentage thresholds, one email a day. It catches the obvious and misses everything subtle.
              </p>
              <p style={pStyle}>
                What you actually need is a stack. Rolling baseline math, severity classification, routing that knows the difference between &quot;wake Sara up&quot; and &quot;log for the weekly digest.&quot; This article is the comparison guide for that stack. Built-in alerts vs the script vs commercial monitors (<a href="https://www.go-insights.com/google-ads-slack" style={linkStyle} target="_blank" rel="noopener noreferrer">Go-Insights</a>, <a href="https://blog.promonavigator.com/anomaly-detector-scripts/" style={linkStyle} target="_blank" rel="noopener noreferrer">Promonavigator&apos;s collection</a>, Optmyzr) vs an agent-based approach where a dedicated reviewer (Aegis on B6) classifies severity before anything escalates.
              </p>
              <p style={pStyle}>
                The 30 second triage when something feels wrong: pull the last 28 days, check if spend is off baseline, check if conversions are off baseline, check if the ratio between them is off baseline. Two of three drifting in the same direction is real. One of three drifting alone is almost always either tracking or seasonality.
              </p>

              {/* VISUAL 1: Mermaid pie - where anomalies actually come from */}
              <MermaidDiagram
                chart={`
pie showData
  title Where real anomalies come from (12 month portfolio)
  "Tracking outage" : 40
  "Bid-algo overreach (Smart Bidding learning)" : 20
  "Seasonal pressure / new entrant" : 15
  "Product or landing page change" : 13
  "Click bombing / fraud" : 8
  "Other" : 4
                `}
                caption="Distribution of real (action-required) anomalies across a 12-account portfolio over 12 months. Tracking outages are the single largest category. Click bombing is rare but high-priority when it hits."
              />
            </section>

            {/* Anatomy */}
            <section id="anatomy">
              <h2 style={h2Style}>The Anatomy of a Real Account Anomaly</h2>
              <p style={pStyle}>
                The word &quot;anomaly&quot; gets thrown around loosely. Let&apos;s be precise. An anomaly is a deviation from a rolling baseline that exceeds an expected range. Three pieces matter: the rolling baseline (not a static threshold), the deviation measure (z-score or percentage), and the expected range (the false-positive budget you accept).
              </p>
              <p style={pStyle}>
                A rolling baseline is the mean of the metric over a trailing window, typically 14 or 28 days, computed for the equivalent slice of time. The trailing 14 day same-hour mean is what you compare today&apos;s 10:00 AM spend against. Not yesterday&apos;s 10:00 AM, and not the static daily budget. Sara&apos;s Tuesday 2 PM should be compared to the 14 prior Tuesday 2 PMs, not to the previous Tuesday or to today&apos;s account total.
              </p>
              <p style={pStyle}>
                The deviation measure determines what counts as significant. Two standard deviations from the rolling mean gives you a roughly 5% expected false-positive rate on normally distributed data. Three standard deviations drops that to under 1%. Percentage thresholds are simpler but worse: a 30% jump on a campaign that normally moves 5% day-over-day is a real anomaly, but a 30% jump on a campaign that already moves 25% day-over-day is just Tuesday.
              </p>

              {/* VISUAL 2: InlineSVG rolling baseline sparkline */}
              <InlineSVG
                svg={baselineSvg}
                caption="A rolling baseline with ±2σ band. The first 28 days stay inside the expected range. The 3 spike points are out-of-band by more than 3σ and trigger a severity 1 classification."
                ariaLabel="Time series chart showing 14-day rolling baseline with ±2σ band; observed CPA stays within band for 28 days then breaks above 3σ on the final 3 data points"
              />

              <p style={pStyle}>
                In practice, after running anomaly detection across a portfolio for a year, the categories of &quot;real&quot; alerts cluster:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Tracking outage (35-45% of real anomalies)</strong>. Conversion volume drops sharply, often paired with a deploy timestamp. Almost always the highest priority. If you do not solve this first, you will be paged for follow-on anomalies that are downstream of broken data. The diagnostic sequence is in our <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking not working playbook</a>.</li>
                <li style={{ marginBottom: '14px' }}><strong>Bid-algo overreach (15-25%)</strong>. Smart Bidding in learning period or after a Target CPA/Target ROAS change, CPC climbs 40-80% while conversion volume holds flat. Looks like a problem, is mostly noise, but requires confirmation that you are inside the 2 to 6 week learning window.</li>
                <li style={{ marginBottom: '14px' }}><strong>Seasonal pressure (10-20%)</strong>. Q4, BFCM, geographic holidays, new entrants in Auction Insights. Real, but not actionable as an alert. Calendar this, do not page on it.</li>
                <li style={{ marginBottom: '14px' }}><strong>Real fraud or click bombing (5-10%)</strong>. 3x click volume spike inside one hour on a single campaign with no corresponding impression spike. Rare, but when it hits you want to know in minutes.</li>
                <li style={{ marginBottom: '14px' }}><strong>Product or landing page change (10-15%)</strong>. A price update, an out-of-stock SKU, or a checkout redesign. Conversion rate moves but click volume stays flat. Engineering deploys are correlated with this category more often than agencies admit.</li>
              </ul>

              <MascotQuote mascot="aegis">
                Aegis caught 47 anomalies last week across 12 accounts. 3 needed action: one tracking outage, one click bombing pattern on a small geo campaign, one Smart Bidding strategy that flipped overnight. 44 were noise the team would have spent 2 hours investigating: weekend seasonality, single-keyword variance, and one Performance Max campaign doing what Performance Max campaigns do. Classification is the work. The math is the easy part.
              </MascotQuote>
            </section>

            {/* The stack */}
            <section id="stack">
              <h2 style={h2Style}>The Detection Stack Compared: Built-in vs Script vs Commercial vs Agent</h2>
              <p style={pStyle}>
                There are four levels of anomaly detection in the Google Ads ecosystem. They serve different roles. None is a complete solution alone.
              </p>
              <p style={pStyle}>
                <strong>Google built-in alerts and recommendations.</strong> Surface-level. Disapprovals, payment issues, &quot;your campaign is limited by budget,&quot; some auto-applied recommendations. Useful as a floor. Insufficient as a primary signal. In-account notifications and email notifications cover the operational basics (billing, disapprovals, suspension). For MCC users, manager-account notifications are a separate setup that has to be enabled per child account.
              </p>
              <p style={pStyle}>
                <strong>The Account Anomaly Detector script.</strong> Google&apos;s own Apps Script solution, <a href="https://developers.google.com/google-ads/scripts/docs/solutions/account-anomaly-detector" style={linkStyle} target="_blank" rel="noopener noreferrer">published in the Ads Scripts docs</a>. It compares today&apos;s running stats against the average of the same day of week across the prior 26 weeks. Adjustable thresholds per metric in a Google Sheet. Single email per alert per day. Good baseline. Two weaknesses: the same-day-of-week mean breaks badly if the account has structural changes inside the 26 week window (campaign restructure, new product launch, seasonality shift), and the per-metric percentage thresholds do not scale across a portfolio of accounts with different volatility profiles.
              </p>
              <p style={pStyle}>
                <strong>The Campaign Anomaly Detector (CAD v2).</strong> Open-sourced by Google in 2022 and rewritten in 2023, <a href="https://github.com/google/cad_campaign_anomaly_detector" style={linkStyle} target="_blank" rel="noopener noreferrer">available on GitHub</a>. Monitors at account level and campaign level, supports configurable past windows and current windows, has a 30-minute execution timeout, and ships with an interactive Google Sheets configuration tab. Closer to what Sara wants. Still rule-based rather than statistical, and the multi-account version requires load balancing across script instances.
              </p>
              <p style={pStyle}>
                <strong>Commercial monitors.</strong> <a href="https://www.go-insights.com/google-ads-slack" style={linkStyle} target="_blank" rel="noopener noreferrer">Go-Insights</a> routes anomaly detection into Slack, Teams, and email with 24/7 monitoring on CPC, spend, impressions, and similar metrics. <a href="https://blog.promonavigator.com/anomaly-detector-scripts/" style={linkStyle} target="_blank" rel="noopener noreferrer">Promonavigator&apos;s anomaly script collection</a> bundles 14 different anomaly tracking scripts ranging from low <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score</a> detection to suspicious-click filtering (one of which flags campaigns exceeding &quot;30% invalid clicks during the day&quot;). Optmyzr has a similar alerts layer inside its rule engine. Useful when you want pre-built routing and do not want to maintain the script yourself.
              </p>
              <p style={pStyle}>
                <strong>Agent-based detection.</strong> The newest layer. An agent runs continuously across the account, computes the rolling baseline, classifies the deviation against learned patterns, and decides whether to escalate, block a related action, or absorb the signal as noise. On B6, this is what Aegis does. The classification step is what separates an agent from a script: a percentage threshold can fire, but it cannot tell you why, and it cannot block a Smart Bidding change that is about to compound the anomaly.
              </p>

              {/* VISUAL 3: ComparisonTable - the four-tier stack */}
              <ComparisonTable
                headers={['Layer', 'Detection model', 'Routing', 'Best fit']}
                rows={[
                  { cells: ['Google built-in', 'Rule-based notifications, recommendations', 'In-account + email', '1-account operators, baseline floor'] },
                  { cells: ['Account Anomaly Detector script', 'Same-day-of-week mean, % thresholds, 26 wk window', 'Single email per alert per day', 'Single account, low setup cost'] },
                  { cells: ['CAD v2 (GitHub)', 'Configurable past vs current window thresholds', 'Sheet log + email', 'Multi-campaign account, technical owner'] },
                  { cells: ['Commercial monitor', 'Mostly rule-based, pre-built integrations', 'Slack, Teams, email, webhook', 'Multi-account agency, no internal eng'] },
                  { cells: ['Agent-based (Aegis on B6)', 'Statistical + rule overrides + classifier', 'Severity-tiered routing with action blocking', 'Multi-account portfolio, autonomy required'], highlight: true },
                ]}
                caption="The detection stack from least to most sophisticated. Most real-world setups combine layer 1 (built-in floor) with one of layers 2-5. Aegis sits on top by classifying severity and blocking downstream actions, not just by detecting."
              />
            </section>

            {/* Thresholds */}
            <section id="thresholds">
              <h2 style={h2Style}>Threshold Math: What Should Actually Trigger an Alert</h2>
              <p style={pStyle}>
                The honest version of &quot;what threshold should I use&quot; is: it depends on the metric and the account volatility. Here is the working set we use on portfolios of 5 to 30 accounts, calibrated to roughly 5% false-positive rate on the alerts that fire.
              </p>

              {/* VISUAL 4: Custom HTML threshold grid (explicit 3 columns, no auto-fit) */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '32px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  Threshold matrix &middot; metric &middot; rule &middot; severity
                </div>
                <div className="b6-threshold-grid">
                  {thresholdRows.map((r, i) => (
                    <div key={i} className="b6-threshold-card" style={{
                      borderLeft: `4px solid ${r.color}`,
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '6px' }}>
                        Metric
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                        {r.metric}
                      </div>
                      <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.55', marginBottom: '14px' }}>
                        {r.rule}
                      </div>
                      <div style={{
                        display: 'inline-block',
                        background: r.color,
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                      }}>
                        {r.severity}
                      </div>
                    </div>
                  ))}
                </div>
                <style jsx>{`
                  .b6-threshold-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                  }
                  .b6-threshold-card {
                    background: white;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                    padding: 16px;
                  }
                  @media (max-width: 900px) {
                    .b6-threshold-grid {
                      grid-template-columns: repeat(2, 1fr);
                    }
                  }
                  @media (max-width: 540px) {
                    .b6-threshold-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
              </div>

              <p style={pStyle}>
                Spend pacing needs the &quot;sustained 60 minutes&quot; clause to kill 80% of single-blip noise. If pacing is genuinely off, work through the <a href="/blog/google-ads-not-spending-full-budget" style={linkStyle}>Google Ads not spending full budget playbook</a> to tell pacing problems apart from CPC problems. For CPA, ±25% week-over-week is a &quot;look at it&quot; signal, ±50% is escalation, and the full diagnostic sequence is in our <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>ROAS dropped suddenly</a> walkthrough.
              </p>
              <p style={pStyle}>
                A drop in conversion rate greater than 30% sustained over 24 hours triggers &quot;tracking suspicion&quot; first, not &quot;performance investigation.&quot; Nine times out of ten the data is wrong, not the campaign. A 3x click volume spike inside one hour on a single campaign with flat impression growth is click bombing until proven otherwise. Invalid traffic monitoring should already be filtering this, but invalid traffic detection runs after the fact and refunds you, it does not prevent the spend. For CPC, the same standard-deviation logic as CTR applies, plus a rule that the spike must persist across a 6 hour window. CPC fluctuates inside Smart Bidding learning periods routinely. Most of those signals are noise. The <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>CPC too high diagnostic</a> covers the durable CPC pattern.
              </p>
              <p style={pStyle}>
                Two thresholds always cause arguments inside teams. The first is whether to use z-score or percentage. The answer for a Sara-sized portfolio is z-score for the alert math, percentage for the human-readable description in the alert payload. &quot;Spend on Campaign X is 2.4σ above rolling baseline (currently $342 vs expected $185 to $230)&quot; is what the rule engine evaluates. &quot;Spend on Campaign X jumped 78%&quot; is what shows up in the Slack message. The second is whether seasonality should be hand-coded or learned. Hand-coded wins for portfolios under 50 accounts. The hand-coded version is two lines in the rule engine: &quot;between Nov 20 and Dec 26, widen the spend band by 40%.&quot;
              </p>
            </section>

            {/* Severity */}
            <section id="severity">
              <h2 style={h2Style}>Anomaly Severity Tiers and Who Should Get the Page</h2>
              <p style={pStyle}>
                A good alerting system has four severity tiers and explicit routing rules. The fastest way to burn out a PPC team is to page on every severity-2 event.
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Severity 1 (critical, pages immediately).</strong> Tracking outage suspected (conversions to zero or drop greater than 50% across the account), brand campaign paused, account suspended, payment failure. These wake Sara up. They should be 1 to 3 per month across a 12 account portfolio. More than that and the threshold is wrong.</li>
                <li style={{ marginBottom: '14px' }}><strong>Severity 2 (high, Slack channel within 1 hour).</strong> Spend pacing greater than 30% off baseline, CPA spike greater than 50%, click bombing pattern, Smart Bidding strategy switched without notice. These get investigated same day.</li>
                <li style={{ marginBottom: '14px' }}><strong>Severity 3 (medium, daily digest).</strong> Drift signals, single-keyword anomalies, single-campaign Auction Insights shifts, CTR slipping over a multi-day window. These go into Echo&apos;s weekly digest, not into Slack.</li>
                <li style={{ marginBottom: '14px' }}><strong>Severity 4 (noise, archived).</strong> Seasonal patterns, expected weekend behavior, single-day blip on a campaign with high natural variance. These get logged so the false-positive rate stays measurable, but they never page anyone.</li>
              </ul>
              <p style={pStyle}>
                The mapping matters more than the math. A statistical model that fires 200 severity-2 alerts per week is worse than a dumb threshold that fires 4 severity-1 alerts per week, because the 200 alerts get muted and then the 4 real ones get muted with them.
              </p>

              <MascotQuote mascot="echo">
                Last week&apos;s digest covered 6 accounts. 2 severity 1 events (both tracking-related, both auto-classified by Aegis in under 200 ms), 11 severity 2 events that were investigated and closed inside the day, 38 severity 3 drift signals in the digest table, and 174 severity 4 noise events logged for the false-positive review. Sara saw the 2 severity 1 events in real time. The other 223 went into the weekly write-up without paging anyone.
              </MascotQuote>
            </section>

            {/* Aegis flow */}
            <section id="aegis">
              <h2 style={h2Style}>How Aegis Detects, Classifies, and Routes Anomalies in B6</h2>
              <p style={pStyle}>
                Aegis is the risk-review and anomaly-detection agent in the <a href="/b6#aegis" style={linkStyle}>B6 multi-agent stack</a>. Its job is to sit between the other agents and the production Google Ads account, classify every proposed change and every observed metric deviation, and either pass, escalate, or block. Aegis is the lead defense layer.
              </p>
              <p style={pStyle}>
                The Aegis loop is rule-augmented statistical. The rolling baseline is computed across the trailing 28 day window per campaign per hour-of-day. Deviations beyond 2σ enter the classifier. The classifier has explicit overrides for known patterns: brand campaign actions are always severity 1, anything touching the conversion tag is always severity 1, anything inside a Smart Bidding learning window gets de-prioritized one tier because volatility there is expected. The output is a severity-tagged alert with a recommended next action.
              </p>

              {/* VISUAL 5: Mermaid sequenceDiagram - Sage -> Aegis -> Buzz -> user */}
              <MermaidDiagram
                chart={`
sequenceDiagram
  participant S as Sage (research)
  participant A as Aegis (risk)
  participant B as Buzz (bidding)
  participant E as Echo (reporting)
  participant U as User (Sara)
  S->>A: Hourly metrics + baseline updates
  A->>A: Compute z-score, classify severity
  B->>A: Proposed bid change (campaign X)
  A->>A: Cross-check: brand? tracking flag? learning window?
  alt Risk score < 50
    A->>B: APPROVE - apply change
    B->>E: Log applied action
  else Risk score 50-79
    A->>U: Escalate (Slack S2)
    U->>B: Manual approve/reject
  else Risk score >= 80
    A->>B: BLOCK - do not apply
    A->>U: Severity 1 page with reason
    E->>U: Incident note in weekly digest
  end
                `}
                caption="The Sage -> Aegis -> Buzz -> Echo -> User flow on a real bid-change proposal. Aegis is the gate. Risk score >= 80 blocks the action and pages immediately; 50-79 escalates to manual; under 50 auto-applies with a log entry."
              />

              <p style={pStyle}>
                In Sprint 5, on a real Goodevas It client account, Aegis raised a risk score of 82/100 on a proposed <a href="/b6#buzz" style={linkStyle}>Buzz</a> bid action. The action was a &quot;logical&quot; bid cut on the top performer in a brand campaign. Aegis blocked it because two anomalies fired in the same minute: the brand campaign pattern (always severity 1) and a tracking-suspicion flag (conversion rate had drifted in the prior 6 hours). Buzz&apos;s proposed change would have killed a chunk of the account&apos;s revenue while masking the underlying tracking issue. The user got a single notification with the severity classification, the math, and the recommended next action (&quot;verify tracking before reconsidering bid change&quot;). No paging at 2 AM. No 47-alert Slack flood.
              </p>
              <p style={pStyle}>
                The other mascots are part of the chain. <a href="/b6#sage" style={linkStyle}>Sage</a> feeds Aegis the keyword-level and audience-level signals that statistical baselines need. Buzz is the agent whose proposals Aegis reviews most often, since bid changes are the most frequent action class. <a href="/b6#echo" style={linkStyle}>Echo</a> writes the incident note in the weekly digest, so the team has a written audit trail of every severity 2 and 3 event without having to scroll Slack.
              </p>

              <MascotQuote mascot="buzz">
                On the Goodevas It account in Sprint 5, I proposed 23 bid changes over two weeks. Aegis blocked 6 of them with hard risk reasons. The 6 included one brand campaign cut (risk score 82) that would have killed 32% of the account&apos;s revenue. The other 17 ran clean. Average CPC dropped 18% in 14 days, conversion volume held flat. Every blocked proposal came with a written reason and a recommended fix. That is the loop.
              </MascotQuote>

              <p style={pStyle}>
                The pitch is not &quot;AI does anomaly detection instead of you.&quot; The pitch is: Aegis classifies severity in under 100 milliseconds per event, you spend your attention on the 3 to 5 severity-1 events per month that actually need an operator decision. Everything else is logged and digested. See <a href="/pricing" style={linkStyle}>pricing tiers</a> for how the agent layer is packaged, or open a <a href="/chat" style={linkStyle}>free Buzz audit</a> on one of your accounts to see Aegis classification in action on real data.
              </p>
            </section>

            {/* Build your own */}
            <section id="build-your-own">
              <h2 style={h2Style}>Building Your Own Anomaly Detection Layer (When You Can&apos;t Buy)</h2>
              <p style={pStyle}>
                If you cannot or will not buy a commercial layer or move to an agent-based stack, the buildable version is six steps. We have shipped this for clients who wanted to keep the logic in-house. It is not glamorous and it works.
              </p>

              {/* VISUAL 6: Mermaid flowchart TD - the build flow */}
              <MermaidDiagram
                chart={`
flowchart TD
  A[Pull hourly metrics<br/>per campaign per hour] --> B[Compute rolling mean<br/>and standard deviation<br/>trailing 28 days]
  B --> C{Deviation > 2&sigma;?}
  C -- No --> D[Log to S4 sink<br/>noise archive]
  C -- Yes --> E[Apply classifier rules]
  E --> F{Brand campaign?<br/>Tracking related?}
  F -- Yes --> G[Severity 1<br/>page immediately]
  F -- No --> H{Inside Smart Bidding<br/>learning window?}
  H -- Yes --> I[De-prioritize<br/>one tier]
  H -- No --> J{Sustained > 60 min?}
  J -- Yes --> K[Severity 2<br/>Slack channel]
  J -- No --> L[Severity 3<br/>daily digest]
                `}
                caption="The 6-step homemade anomaly detection flow. Statistical detection (the >2sigma check) is the entry gate; the classifier turns a raw signal into a severity-routed alert. The Smart-Bidding-learning-window check is what kills the largest noise category in most accounts."
              />

              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Rolling baseline metrics view.</strong> Pull hourly aggregates per campaign per metric into a store you can query. BigQuery is the right home if you have it. Google Sheets with a Google Ads export macro works for portfolios under 10 accounts. The window is trailing 28 days, recomputed daily.</li>
                <li style={{ marginBottom: '14px' }}><strong>Standard deviation per metric per campaign.</strong> Calculate σ on the trailing window. Store it next to the mean. The pair (μ, σ) is what every threshold check reads from.</li>
                <li style={{ marginBottom: '14px' }}><strong>Per-campaign threshold calibration.</strong> Brand campaigns have lower natural variance than non-brand. Performance Max has different variance than Search. Calibrate per campaign type, not as a global account threshold. The Account Anomaly Detector script is fine as a starting kit, but its single global percentage threshold is the reason teams find it noisy.</li>
                <li style={{ marginBottom: '14px' }}><strong>Severity classifier.</strong> The four tier table above, encoded as rules. Brand campaign action gets bumped to severity 1 regardless of math. Anything in Smart Bidding learning gets de-prioritized one tier. Tracking-related flags always go to severity 1.</li>
                <li style={{ marginBottom: '14px' }}><strong>Routing.</strong> Severity 1 to PagerDuty or direct phone. Severity 2 to a dedicated Slack channel with @here. Severity 3 to a daily digest email. Severity 4 to a logged-only sink. The routing layer is the cheapest part to build and the most important to get right.</li>
                <li style={{ marginBottom: '14px' }}><strong>Weekly false-positive review.</strong> Open the past 7 days of alerts. Mark each as &quot;real&quot; or &quot;noise.&quot; If your false-positive rate is above 30% on severity 1 or 2, the math is too loose. Above 60% on severity 3 is fine, that tier is supposed to be wide. This review is what keeps the system trustworthy over time.</li>
              </ol>
              <p style={pStyle}>
                A small team can stand this up in a long weekend if BigQuery is already in the stack. The maintenance cost is the weekly false-positive review and the occasional threshold recalibration when an account changes structure.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>What is the Account Anomaly Detector script in Google Ads?</strong> Google&apos;s first-party Apps Script for anomaly detection, <a href="https://developers.google.com/google-ads/scripts/docs/solutions/account-anomaly-detector" style={linkStyle} target="_blank" rel="noopener noreferrer">documented here</a>. It compares the current day&apos;s running stats (impressions, clicks, conversions, cost) against the average of the same day of week over the prior 26 weeks. Thresholds are configurable per metric in a Google Sheet. Sends a single email per alert per day. It is a fine baseline, brittle as a primary detection layer for a 10+ account portfolio.
              </p>
              <p style={pStyle}>
                <strong>How do I set up alerts for unusual activity in Google Ads?</strong> Three layers. (1) Turn on the built-in in-account notifications and email notifications for the operational basics (payment, disapproval, suspension). (2) Deploy the <a href="https://developers.google.com/google-ads/scripts/docs/solutions/account-anomaly-detector" style={linkStyle} target="_blank" rel="noopener noreferrer">Account Anomaly Detector script</a> or <a href="https://github.com/google/cad_campaign_anomaly_detector" style={linkStyle} target="_blank" rel="noopener noreferrer">CAD v2</a> for performance-metric anomalies. (3) Layer a routing tool (Slack via <a href="https://www.go-insights.com/google-ads-slack" style={linkStyle} target="_blank" rel="noopener noreferrer">Go-Insights</a> or a commercial monitor, or an agent like Aegis) for severity classification and on-call paging.
              </p>
              <p style={pStyle}>
                <strong>What is a normal false-positive rate for ad-account alerts?</strong> Aim for under 15% on severity 1 alerts and under 30% on severity 2. Higher on severity 3 is acceptable because that tier is supposed to be wide. If severity 1 false positives exceed 30%, you have either threshold drift, structural change in an account (campaign restructure, product launch) that nobody told the rule engine about, or both.
              </p>
              <p style={pStyle}>
                <strong>Is z-score better than percentage thresholds?</strong> For alerting math, yes. Z-score adapts to the natural variance of the campaign, so a noisy Performance Max campaign does not page you every Tuesday for routine 25% swings. For the human-readable alert payload, percentage is better because it is faster to parse. Use both: z-score for the rule, percentage for the message.
              </p>
              <p style={pStyle}>
                <strong>Does Google have built-in anomaly detection?</strong> Partial. The Recommendations page surfaces some performance opportunities and warnings. The Anomalies card in Google Ad Manager is a beta feature on the publisher side, not the advertiser side. In Google Ads proper, you get notifications and recommendations but no true rolling-baseline anomaly engine. That is the gap the Account Anomaly Detector script and the commercial layers exist to fill.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Reacting to Spend Spikes. Detect Them.</h2>
              <p style={pStyle}>
                Three things to take away. The built-in Google Ads notification system is a floor, not a ceiling. The Account Anomaly Detector script is the cheapest meaningful upgrade and worth deploying even if you plan to layer something on top of it. Severity classification matters more than statistical sophistication: a dumb threshold with the right routing is more useful than a clever model that pages on everything.
              </p>
              <p style={pStyle}>
                If you manage 5 or more accounts and you have ever missed a real anomaly because the team was triaging false positives, the next step is to install a classifier that knows the difference. <a href="/chat" style={linkStyle}>Run a free Buzz + Aegis audit on one of your accounts</a> and see severity classification on real data. Read-only access, no changes made without your approval, takes 10 minutes.
              </p>
              <p style={pStyle}>
                Anomaly detection is not about the alert. It is about the gap between the moment a problem starts and the moment a human knows. Close the gap.
              </p>
            </section>

          </div>
        </div>
        <KeepReading slug="google-ads-anomaly-detection" category="google-ads" />
      <Footer />
      </div>
    </>
  );
}
