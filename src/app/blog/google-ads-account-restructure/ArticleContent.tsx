'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Google Ads Account Restructure: The 4-Phase Playbook for Rebuilding Without Losing 30 Days of Performance (2026)',
    description:
      'When and how to restructure a messy Google Ads account: the 3-campaign rule, 4-phase rollout over 8 weeks, what to migrate vs what to leave alone, and the thresholds that signal it is time.',
    image: 'https://kampaio.com/og/google-ads-account-restructure.png',
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
    datePublished: '2026-05-27T00:00:00.000Z',
    dateModified: '2026-05-27T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://kampaio.com/blog/google-ads-account-restructure',
    },
    keywords:
      'google ads account restructure, smart bidding learning limited, hagakure structure, broad match, bid strategy migration, campaign consolidation, quality score, conversion tracking, impression share, target cpa, maximize conversions',
    wordCount: 1920,
    articleSection: 'PPC Optimization',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does a Google Ads account restructure take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '6 to 8 weeks broken into 4 phases. Compressed timelines lose conversion learning and trigger relearning periods that erase the gains the restructure was supposed to deliver.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will I lose all my conversion data when I restructure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, if you preserve the conversion actions and bid-strategy IDs through Phase 1 and Phase 2. The risk is renaming or recreating strategies, which resets learning. The conversion actions themselves are account-level objects and survive campaign-level changes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I restructure before or after migrating to Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Before. PMax compounds structural noise. Audit and consolidate your Search campaigns first, then evaluate whether PMax fits your product feed and asset-group readiness.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many campaigns is too many?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For accounts under $30K per month, 3 to 5 campaigns is the sweet spot. Over $100K per month, 8 to 12 is reasonable. More than 20 active campaigns is almost always a sign of historical drift, not strategic need.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I run a partial restructure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, and you should. Roughly 10 percent of campaigns in a mature account should be left alone in any given restructure. Restructure everything is a service-sales pitch, not a sound strategy.',
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
        name: 'Google Ads Account Restructure: The 4-Phase Playbook (2026)',
        item: 'https://www.kampaio.com/blog/google-ads-account-restructure',
      },
    ],
  };

  const tableOfContents = [
    { id: 'three-campaign-rule', title: 'The 3-Campaign Rule (Why Most Accounts Are Over-Structured)', level: 1 },
    { id: 'six-signs', title: 'Six Signs You Need a Restructure (Not a Tune-Up)', level: 1 },
    { id: 'four-phase-playbook', title: 'The 4-Phase Restructure Playbook (8-Week Timeline)', level: 1 },
    { id: 'decision-matrix', title: 'Decision Matrix: Merge, Split, Kill, or Leave Alone', level: 1 },
    { id: 'what-not-to-touch', title: 'What NOT to Touch (Preserving Conversion Learning)', level: 1 },
    { id: 'automation', title: 'Automating the Restructure (Phases 2-3 Without Manual Bid-Sitting)', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Ready to Restructure Without the Manual Babysitting?', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const h2Style = {
    fontSize: '32px',
    fontWeight: 700 as const,
    color: '#1e293b',
    marginBottom: '24px',
    marginTop: '48px',
    lineHeight: '1.3',
  };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const ulStyle = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
    marginBottom: '32px',
  };
  const liStyle = { marginBottom: '12px' };

  // 4 phase cards (uses repeat(4, 1fr) → repeat(2, 1fr) → 1fr; NOT auto-fit)
  const phases = [
    {
      n: 1,
      name: 'Foundation',
      weeks: 'Weeks 1-2',
      goal: 'Verify tracking. Capture baseline metrics.',
      risk: 'Touching bidding before baseline is locked.',
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      n: 2,
      name: 'Consolidate',
      weeks: 'Weeks 3-4',
      goal: 'Merge or kill campaigns. Drop dead ad groups.',
      risk: 'Renaming live Smart Bidding strategies.',
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      n: 3,
      name: 'Migrate Bidding',
      weeks: 'Weeks 5-6',
      goal: 'Move to Maximize Conversions or Target CPA. Reallocate budget.',
      risk: '5-10 day learning dip. Do not panic-rollback.',
      color: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      n: 4,
      name: 'Stabilize',
      weeks: 'Weeks 7-8',
      goal: 'Hold structure. Watch CPA. Document.',
      risk: 'Making changes during the stabilization window.',
      color: '#10b981',
      bg: '#ecfdf5',
    },
  ];

  // 6 warning-sign stat callouts (uses repeat(3, 1fr) → repeat(2, 1fr) → 1fr; NOT auto-fit)
  const signs = [
    {
      n: 1,
      label: '30+ kw in one group OR 50+ micro ad-groups',
      detail: 'Keyword distribution is bimodal. Both block Smart Bidding signal.',
      color: '#ef4444',
    },
    {
      n: 2,
      label: 'Broad match > 40% spend, < 20% conv',
      detail: 'Broad match is eating spend without paying back over 90 days.',
      color: '#ef4444',
    },
    {
      n: 3,
      label: 'Smart Bidding stuck > 4 weeks',
      detail: '"Learning Limited" that never exits. Campaigns underneath lack volume.',
      color: '#f59e0b',
    },
    {
      n: 4,
      label: 'Pre-2024 conversions still active',
      detail: 'Conversion data fragmented. Smart Bidding cannot pick a signal.',
      color: '#f59e0b',
    },
    {
      n: 5,
      label: 'QS < 5 on > 30% of keywords',
      detail: 'Structural relevance problem, not a creative one.',
      color: '#f59e0b',
    },
    {
      n: 6,
      label: 'IS lost to budget split: 30%+ top, < 10% bottom',
      detail: 'Money is locked in the wrong campaigns.',
      color: '#ef4444',
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />

        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              PPC Optimization &middot; Restructure Playbook
            </div>
            <h1
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '24px',
                lineHeight: '1.2',
              }}
            >
              Google Ads Account Restructure: The 4-Phase Playbook for Rebuilding Without Losing 30 Days of Performance (2026)
            </h1>
            <p
              style={{
                fontSize: '20px',
                color: '#64748b',
                marginBottom: '32px',
                lineHeight: '1.6',
                fontWeight: '500',
              }}
            >
              When and how to restructure a messy Google Ads account: the 3-campaign rule, 4-phase rollout over 8 weeks, what to migrate vs what to leave alone, and the thresholds that signal it is time. Built for DTC owners and in-house marketers, not first-week PPC hires.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '40px',
                paddingBottom: '32px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                >
                  B6
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}
                >
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>B6 SEO Agent</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 27, 2026 &middot; 10 min read</span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '40px',
              }}
            >
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1e293b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                Table of Contents
                <span
                  style={{
                    transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  &#9660;
                </span>
              </button>
              {isTableOfContentsOpen && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  {tableOfContents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        padding: '8px 0',
                        paddingLeft: `${(item.level - 1) * 20}px`,
                        cursor: 'pointer',
                        color: '#64748b',
                        fontSize: '16px',
                        lineHeight: '1.4',
                        borderBottom: '1px solid transparent',
                        transition: 'all 0.2s ease',
                      }}
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

            {/* TL;DR / featured snippet paragraph */}
            <p
              style={{
                fontSize: '19px',
                lineHeight: '1.7',
                color: '#1e293b',
                background: '#f8fafc',
                borderLeft: '4px solid #764ba2',
                padding: '20px 24px',
                borderRadius: '8px',
                marginBottom: '40px',
              }}
            >
              Restructure a Google Ads account when keyword distribution is bimodal (30+ keywords in one group or 50+ micro ad-groups), broad match generates over 40% of spend but under 20% of conversions, or Smart Bidding has been stuck in &quot;Learning Limited&quot; for 4+ weeks. Rebuild in 4 phases over 8 weeks.
            </p>
          </div>
        </div>

        {/* Article body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 1. The 3-Campaign Rule */}
            <section id="three-campaign-rule">
              <h2 style={h2Style}>The 3-Campaign Rule (Why Most Accounts Are Over-Structured)</h2>
              <p style={pStyle}>
                If you opened your account this morning and counted 47 campaigns, you are not unusual. You are inheriting a decade of optimization patterns that no longer apply. (If you have not run the audit that surfaced the mess yet, our{' '}
                <a href="/blog/ppc-audit-checklist" style={linkStyle}>
                  25-point PPC audit checklist
                </a>{' '}
                is the right starting point. This article is the follow-on: you audited, you found mess, now you restructure.)
              </p>
              <p style={pStyle}>
                SKAGs (single-keyword ad groups), Alpha/Beta splits, exact-vs-broad parallels: all rational in 2017, all wrong in 2026. Smart Bidding needs aggregate conversion signal. What you have instead is 50 micro-buckets, each seeing 6 clicks a week, and an algorithm that never gets enough data to optimize anything.
              </p>
              <p style={pStyle}>
                The modern default is the Hagakure structure: fewer campaigns, broader ad groups themed by buying intent or product line, automation-first. Some senior practitioners push it further: 3 campaigns maximum for accounts spending under $30K per month. The math is mechanical. Smart Bidding needs about 30 conversions per month per bid strategy to escape Learning Limited. Split your budget across 12 campaigns and most of them starve. Consolidate into 3 and the algorithm finally has enough signal to work.
              </p>

              <MascotQuote mascot="buzz">
                Cut to 3 campaigns max for accounts under $30K per month. Smart Bidding needs at least 30 conversions per month per bid strategy to exit Learning Limited. Expect a 30-40% CPA drop within 6 weeks if consolidation respects the conversion floor.
              </MascotQuote>

              <p style={pStyle}>
                That is the framing idea behind every recommendation in this playbook. Most accounts are not broken because they are too small. They are broken because they are cut into pieces too small to learn from.
              </p>
            </section>

            {/* 2. Six Signs */}
            <section id="six-signs">
              <h2 style={h2Style}>Six Signs You Need a Restructure (Not a Tune-Up)</h2>
              <p style={pStyle}>
                A tune-up adjusts. A restructure rebuilds. A tune-up ships this week. A restructure takes 8 weeks. The six signals below are the ones that put you firmly in restructure territory, with the concrete thresholds we use to decide.
              </p>

              {/* Sign stat-callouts grid: 3-2-1 columns at breakpoints */}
              <div className="signsGrid" style={{ marginTop: '24px', marginBottom: '40px' }}>
                {signs.map((s) => (
                  <div
                    key={s.n}
                    style={{
                      background: 'white',
                      border: `1px solid ${s.color}33`,
                      borderLeft: `4px solid ${s.color}`,
                      borderRadius: '10px',
                      padding: '16px 18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: s.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {s.n}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', lineHeight: 1.3 }}>
                        {s.label}
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{s.detail}</div>
                  </div>
                ))}
              </div>

              <p style={pStyle}>
                <strong>1. Keyword distribution is bimodal.</strong> Either 30+ keywords crammed into one ad group, or 50+ micro ad-groups with under 30 clicks per month each. Both block Smart Bidding signal in opposite directions: one floods the algorithm with mixed intent, the other starves it of volume per bucket. Search Engine Land&apos;s Aug 2025 framework calls this the strongest single signal, and we agree.
              </p>
              <p style={pStyle}>
                <strong>2. Broad match is eating spend without paying back.</strong> If broad match keywords generate over 40% of spend but under 20% of conversions over the last 90 days, the structure is not containing them. This is a leak, not a noise floor.
              </p>
              <p style={pStyle}>
                <strong>3. Smart Bidding is stuck in &quot;Learning Limited&quot; for more than 4 weeks.</strong> A bid strategy that cannot exit learning is telling you the campaigns underneath it do not have enough conversion volume. The fix is rarely &quot;wait longer.&quot; The fix is consolidating campaigns. (We covered the diagnostic side of this in{' '}
                <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>
                  why your bid strategy is stuck in Learning Limited
                </a>
                .)
              </p>
              <p style={pStyle}>
                <strong>4. Conversion data is fragmented.</strong> Pre-2024 conversion actions still active alongside enhanced-conversion goals. GA4 imports duplicating native Google Ads conversions. Smart Bidding cannot decide which signal is real, so it weighs all of them. CPA stops making sense. Fragmented conversion data also causes the kind of sudden ROAS swings we wrote about in{' '}
                <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>
                  why your Google Ads ROAS dropped suddenly
                </a>
                .
              </p>
              <p style={pStyle}>
                <strong>5. Quality Score is stuck below 5 across more than 30% of keywords.</strong> Despite ad-copy refreshes and landing-page work. This is the signal that says: the problem is not creative, it is structural relevance. Your keywords and ad groups are not matched to ad copy or landing pages anymore.
              </p>
              <p style={pStyle}>
                <strong>6. Impression share lost to budget is over 30% on your top campaigns AND under 10% on the bottom 50% of campaigns.</strong> Money is locked in the wrong campaigns. The bottom half is over-funded relative to demand, the top half is starved. As{' '}
                <a
                  href="https://searchengineland.com/when-to-restructure-your-google-ads-account-and-how-to-do-it-right-460698"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search Engine Land puts it
                </a>
                : &quot;Google Ads accounts do not collapse overnight, they erode.&quot; Six of these signs at once is what late-stage erosion looks like. We see this pattern most often in accounts where the{' '}
                <a href="/blog/why-google-ads-strategy-fails-at-scale" style={linkStyle}>
                  PPC strategy stopped scaling
                </a>{' '}
                two budget jumps ago.
              </p>
            </section>

            {/* 3. The 4-Phase Restructure Playbook */}
            <section id="four-phase-playbook">
              <h2 style={h2Style}>The 4-Phase Restructure Playbook (8-Week Timeline)</h2>
              <p style={pStyle}>
                A restructure is not a weekend project. The Smart Bidding learning period alone needs 2 to 3 weeks per bid strategy change. Compressed into one week, you lose 30 days of conversion data and spend Monday explaining a CPA spike to your CFO. Spread across 8 weeks, the account learns its way into the new structure with most of the performance preserved.
              </p>
              <p style={pStyle}>
                The four phases below map to a defensive sequence. Foundation first because it gates everything downstream. Consolidation second because misnamed campaigns waste the next two weeks. Bidding migration third because every bid decision rides on the structure being right. Stabilization fourth because the only reliable measure of a restructure is what the account does in week 8, not week 2.
              </p>

              {/* Phase card grid: 4-2-1 columns */}
              <div className="phaseGrid" style={{ marginTop: '24px', marginBottom: '40px' }}>
                {phases.map((p) => (
                  <div
                    key={p.n}
                    style={{
                      background: p.bg,
                      border: `1px solid ${p.color}33`,
                      borderRadius: '12px',
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: p.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '15px',
                          fontWeight: 700,
                        }}
                      >
                        {p.n}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>{p.name}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: p.color, fontWeight: 600 }}>{p.weeks}</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', lineHeight: '1.5' }}>
                      <strong>Goal:</strong> {p.goal}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
                      <strong>Risk:</strong> {p.risk}
                    </div>
                  </div>
                ))}
              </div>

              <p style={pStyle}>
                <strong>Phase 1 (Weeks 1-2): Foundation and data clean-up.</strong> Audit conversion goals and kill duplicate or dormant ones. Verify Consent Mode v2 and enhanced conversions are properly wired. Capture baseline metrics per campaign: CPA, ROAS, impression share lost to budget, impression share lost to rank. This is the phase you spend in the data, not the campaign editor. Do not touch bidding yet. Go/no-go check: every active campaign has a verified primary conversion action and a 28-day baseline.
              </p>
              <p style={pStyle}>
                <strong>Phase 2 (Weeks 3-4): Consolidate campaigns and ad groups.</strong> Merge campaigns sharing the same audience or product category. Drop campaigns with under $300 per month spend that have not converted in 60 days. Drop ad groups with zero conversions in the last 90 days. The goal at end of phase: 5 or fewer campaigns and 25 or fewer ad groups for accounts under $30K per month. Higher counts only if the business genuinely requires the split (per-location budget tracking, very distinct product lines). This is also the natural moment to kill any{' '}
                <a href="/blog/google-ads-display-network-wasted-spend" style={linkStyle}>
                  Display Network leakage you found in the audit
                </a>
                .
              </p>
              <p style={pStyle}>
                <strong>Phase 3 (Weeks 5-6): Migrate bidding and reallocate budget.</strong> Move newly consolidated campaigns to Maximize Conversions (or Target CPA if you have at least 30 conversions per month per campaign). Reallocate budget away from underperformers using trailing 28-day data, not last-week panic data. Expect a 5 to 10 day learning dip. Do not roll back on day 3.
              </p>

              <MascotQuote mascot="vox">
                I reallocate 22% of misspent budget on average from broad-match keywords with zero conversions toward exact-match clusters with QS at or above 7. For most DTC accounts under $50K per month, that is $1,100 to $11,000 per month redirected to channels that actually convert.
              </MascotQuote>

              <p style={pStyle}>
                <strong>Phase 4 (Weeks 7-8): Stabilize, measure, document.</strong> No structural changes. Watch CPA, ROAS, and IS lost to budget. If CPA drifts more than 15% from your Phase 1 baseline, roll back the most aggressive change (usually a campaign merge or a bid strategy switch). Document the new structure for handoffs, agency conversations, or your own future memory.
              </p>
            </section>

            {/* 4. Decision Matrix */}
            <section id="decision-matrix">
              <h2 style={h2Style}>Decision Matrix: Merge, Split, Kill, or Leave Alone</h2>
              <p style={pStyle}>
                Not every campaign is a candidate for restructure. The matrix below maps four common situations to four actions. Apply it campaign by campaign before touching anything. The wrong action on a working campaign costs more than an over-structured account.
              </p>

              <ComparisonTable
                headers={['Situation', 'Signal', 'Action', 'Risk']}
                rows={[
                  {
                    cells: [
                      'Two campaigns, same audience, both converting',
                      'Overlapping ad groups, shared budget pulls between them',
                      'MERGE',
                      'Short learning dip on the combined strategy (5-10 days)',
                    ],
                    highlight: true,
                  },
                  {
                    cells: [
                      'One campaign, two product lines with different CPAs',
                      'Blended Smart Bidding cannot optimize per line; CPA gap over 2x',
                      'SPLIT',
                      'Each new campaign needs at least 30 conv/month or relands in Learning Limited',
                    ],
                  },
                  {
                    cells: [
                      'Campaign spending under $300/mo, 0 conv in 60 days',
                      'Starved budget, wrong intent, or expired offer',
                      'KILL',
                      'Minimal; frees up budget for campaigns that can use it',
                    ],
                  },
                  {
                    cells: [
                      'Campaign at target CPA, IS lost to rank under 10%, mature learning',
                      'Working as designed',
                      'LEAVE ALONE',
                      'Changing it for "cleanliness" costs 2-3 weeks of relearning',
                    ],
                  },
                ]}
                caption="Apply per campaign before touching anything. Expect roughly 60% merge, 10% split, 20% kill, 10% leave alone in a typical 47-campaign account."
              />

              <p style={pStyle}>
                If you are staring at a 47-campaign account, expect roughly 60% to merge, 10% to split, 20% to kill, and 10% to leave alone.
              </p>
              <p style={pStyle}>
                <a
                  href="https://pete-bowen.com/modernising-legacy-google-ads-account-structure"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pete Bowen
                </a>{' '}
                (paid-search consultant) frames the cognitive work behind this matrix with three questions worth asking before every action: What was the original designer trying to achieve? Do we still want to achieve the same thing today? If we were starting from scratch today, how would we do this? His honest reminder: &quot;My predecessors were not all idiots.&quot; Most legacy structures had a reason at the time. Best practice evolves. The reason for the original choice may simply have aged out.
              </p>
            </section>

            {/* 5. What NOT to Touch */}
            <section id="what-not-to-touch">
              <h2 style={h2Style}>What NOT to Touch (Preserving Conversion Learning)</h2>
              <p style={pStyle}>
                Restructures fail when they treat every campaign the same way. The conversion learning that is keeping CPA stable today is your insurance against the learning dip you are about to introduce in Phase 3. Protect it.
              </p>
              <ul style={ulStyle}>
                <li style={liStyle}>
                  <strong>Do not rename Smart Bidding strategies during the restructure.</strong> The strategy ID stores the learning. A new name on the same strategy is fine; a brand-new strategy is a reset.
                </li>
                <li style={liStyle}>
                  <strong>Do not pause and resume campaigns to &quot;freshen them up.&quot;</strong> A pause of more than 30 days triggers a relearning period when you resume. There is no upside.
                </li>
                <li style={liStyle}>
                  <strong>Do not change conversion-action setup mid-restructure.</strong> Lock that work into Phase 1. Touching it in Phase 3 mixes two learning resets and you will never untangle which one caused the CPA drift.
                </li>
                <li style={liStyle}>
                  <strong>Do not migrate audiences during Phase 2 (campaign consolidation).</strong> Audience changes mid-consolidation confuse signal attribution and make Phase 3 bidding decisions unreliable.
                </li>
                <li style={liStyle}>
                  <strong>Do not run Phase 3 (bidding migration) during a peak season.</strong> Q4 for retail, end-of-year for B2B SaaS. Wait or postpone. A learning dip during peak season is the most expensive five days in your year.
                </li>
                <li style={liStyle}>
                  <strong>Do not restructure accounts under 90 days old.</strong> They have not accumulated enough signal to know what is wrong. What looks like structural mess is often just learning noise.
                </li>
              </ul>
              <p style={pStyle}>
                The fastest restructures we have seen took 6 weeks. The most common mistake adds 4 weeks of unnecessary relearning by being aggressive about &quot;clean account hygiene&quot; when the account just needed Phases 1, 2, and 4. Phase 3 is where most of the learning risk lives. Earn the right to touch it.
              </p>
            </section>

            {/* 6. Automating the Restructure */}
            <section id="automation">
              <h2 style={h2Style}>Automating the Restructure (Phases 2-3 Without Manual Bid-Sitting)</h2>
              <p style={pStyle}>
                Phases 2 and 3 are where most restructures stall. They require daily bid-strategy monitoring, budget reallocation decisions, and the discipline to NOT panic-rollback on day 3 of a learning dip. This is exactly the work that should be automated.
              </p>
              <p style={pStyle}>
                Here is how the B6 mascot agents map to the playbook:
              </p>
              <ul style={ulStyle}>
                <li style={liStyle}>
                  <a href="/b6#buzz" style={linkStyle}>
                    Buzz (bid strategy)
                  </a>{' '}
                  runs the Phase 3 bidding migration with learning-period awareness. He will not pause campaigns mid-learning, and he surfaces only the campaigns that need human attention rather than dumping a 47-line report on your desk.
                </li>
                <li style={liStyle}>
                  <a href="/b6#vox" style={linkStyle}>
                    Vox (cross-campaign strategy)
                  </a>{' '}
                  handles Phase 3 budget reallocation on trailing 28-day data. He flags any reallocation that exceeds 15% of a campaign baseline budget as high-risk and asks for approval rather than just executing.
                </li>
                <li style={liStyle}>
                  <a href="/b6#maximus" style={linkStyle}>
                    Maximus (orchestrator)
                  </a>{' '}
                  runs the full pause-restructure-resume cycle with a rollback safety net. If CPA drifts more than 15% from your Phase 1 baseline, he rolls back the most aggressive recent change automatically.
                </li>
              </ul>

              <MermaidDiagram
                chart={`flowchart TD
    A[Audit findings] --> B{Per-campaign decision}
    B -->|Same audience, both converting| C[MERGE]
    B -->|Different CPAs, 2x+ gap| D[SPLIT]
    B -->|Under $300/mo, 0 conv 60d| E[KILL]
    B -->|At target, mature learning| F[LEAVE ALONE]
    C --> G[Phase 3: Migrate bidding]
    D --> G
    E --> H[Phase 3: Reallocate freed budget]
    G --> I[Phase 4: Monitor]
    H --> I
    I -->|CPA drift > 15%| J[Rollback most aggressive change]
    I -->|CPA stable| K[Document new structure]`}
                caption="Per-campaign decision flow, from audit findings through restructure execution to rollback safety."
              />

              <p style={pStyle}>
                B6 does not restructure the account for you. It runs the Phase 2-3 mechanics so your time goes to Phase 1 (the judgment work) and Phase 4 (the conversation with your team or your CFO about what changed and why).
              </p>
            </section>

            {/* 7. FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>How long does a Google Ads account restructure take?</strong>
                <br />
                6 to 8 weeks broken into 4 phases. Compressed timelines lose conversion learning and trigger relearning periods that erase the gains the restructure was supposed to deliver. Dan Chorlton at{' '}
                <a
                  href="https://blog.goa.marketing/the-ultimate-guide-on-how-to-restructure-a-paid-search-account"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GOA Marketing observes
                </a>{' '}
                a 2 to 6 week instability window during restructure transitions across his 10 years of paid-search work; our 4-phase / 8-week version is built to keep that window contained inside Phase 3.
              </p>
              <p style={pStyle}>
                <strong>Will I lose all my conversion data when I restructure?</strong>
                <br />
                No, if you preserve the conversion actions and bid-strategy IDs through Phase 1 and Phase 2. The risk is renaming or recreating strategies, which resets learning. The conversion actions themselves are account-level objects and survive campaign-level changes.
              </p>
              <p style={pStyle}>
                <strong>Should I restructure before or after migrating to Performance Max?</strong>
                <br />
                Before. PMax compounds structural noise. Audit and consolidate your Search campaigns first, then evaluate whether PMax fits your product feed and asset-group readiness. Running both restructures simultaneously is the most reliable way to lose 60 days of clarity.
              </p>
              <p style={pStyle}>
                <strong>How many campaigns is &quot;too many&quot;?</strong>
                <br />
                For accounts under $30K per month, 3 to 5 campaigns is the sweet spot. Over $100K per month, 8 to 12 is reasonable. More than 20 active campaigns is almost always a sign of historical drift, not strategic need. Pete Bowen three questions apply: what was the original goal, do we still want it, and how would we build today.
              </p>
              <p style={pStyle}>
                <strong>Can I run a partial restructure?</strong>
                <br />
                Yes, and you should. The decision matrix above assumes per-campaign action. Roughly 10% of campaigns in a mature account should be left alone in any given restructure. &quot;Restructure everything&quot; is a service-sales pitch, not a sound strategy. If the sales pitch is coming from an underperforming agency, the deeper conversation may be the one we covered in{' '}
                <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>
                  signs you need to fire your PPC agency
                </a>{' '}
                or{' '}
                <a href="/blog/google-ads-without-agency" style={linkStyle}>
                  running Google Ads without an agency at all
                </a>
                .
              </p>
            </section>

            {/* 8. CTA */}
            <section id="cta">
              <h2 style={h2Style}>Ready to Restructure Without the Manual Babysitting?</h2>
              <p style={pStyle}>
                If your audit surfaced 47 campaigns, broken bidding, and broad-match leakage, the restructure itself is mechanical. The hard part is sequencing it without losing the learning. B6 runs the mechanical phases (consolidation, bid migration, budget reallocation) with rollback safety, so you keep your time for the strategic decisions only you can make.
              </p>

              <div
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  marginTop: '40px',
                  marginBottom: '40px',
                }}
              >
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '18px',
                    lineHeight: '1.3',
                  }}
                >
                  Start the restructure with rollback safety.
                </h3>
                <p
                  style={{
                    fontSize: '17px',
                    color: '#64748b',
                    marginBottom: '28px',
                    lineHeight: '1.6',
                    fontWeight: '500',
                    opacity: 0.9,
                  }}
                >
                  Buzz handles bidding migration. Vox handles budget reallocation. Maximus rolls back if CPA drifts more than 15%. See the agents in action on the{' '}
                  <a href="/b6#buzz" style={linkStyle}>
                    B6 product page
                  </a>{' '}
                  or compare{' '}
                  <a href="/pricing" style={linkStyle}>
                    pricing tiers
                  </a>{' '}
                  for Co-pilot, Approval, and Autonomous modes.
                </p>
                <a
                  href="/chat"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Start B6 Free Trial
                </a>
              </div>
            </section>
          </div>
        </div>

        <Footer compact={true} />

        <style jsx>{`
          .phaseGrid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
          @media (max-width: 1100px) {
            .phaseGrid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 520px) {
            .phaseGrid {
              grid-template-columns: 1fr;
            }
          }
          .signsGrid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          @media (max-width: 1000px) {
            .signsGrid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 600px) {
            .signsGrid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </>
  );
}
