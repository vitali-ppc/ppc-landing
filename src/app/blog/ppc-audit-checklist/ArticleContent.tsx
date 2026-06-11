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

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'PPC Audit Checklist: 25 Senior-Level Checks That Surface 80% of Account Problems (2026)',
    description:
      'A senior PPC audit checklist organized in 6 pillars with thresholds, a 3x3 decision matrix, and the 18 checks you can automate. Built for agency owners auditing 4+ accounts a quarter.',
    image: 'https://kampaio.com/og/ppc-audit-checklist.png',
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
    datePublished: '2026-05-21T00:00:00.000Z',
    dateModified: '2026-05-21T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://kampaio.com/blog/ppc-audit-checklist',
    },
    keywords:
      'ppc audit, audit checklist, google ads audit, quality score, smart bidding, conversion tracking, performance max, search terms report, auction insights, impression share, target roas, ad strength, asset group, landing page, consent mode v2, attribution, agency audit, ppc automation',
    wordCount: 2411,
    articleSection: 'PPC Strategy',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long should a PPC audit take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Quick audit is 30 minutes. A Deep quarterly audit is 60 to 90 minutes. A Forensic crisis audit is 2 to 3 hours. Anything claiming a comprehensive audit in 15 minutes is either a sales pitch or a shallow check.',
        },
      },
      {
        '@type': 'Question',
        name: "What's the difference between a PPC audit and an account review?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An audit is a structured pass against a checklist with thresholds and a fixed scope. An account review is a freeform look at performance, often driven by a client question. Audits produce a defensible memo. Reviews produce a conversation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I audit a Google Ads account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quarterly is the standard cadence. Monthly is overkill below $50K per month spend. A crisis trigger (ROAS down over 25 percent or CPA spike over 40 percent) overrides the calendar and triggers a same-day forensic audit.',
        },
      },
      {
        '@type': 'Question',
        name: "What's the single most important PPC audit check?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Conversion-tracking variance against the source-of-truth (Shopify, Stripe, CRM). If revenue reported in Google Ads disagrees with the source-of-truth by more than 15 percent over 7 days, every downstream metric is suspect. Fix tracking first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I automate a full PPC audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. You can automate the recurring 18 of 25 checks (threshold-driven). The remaining 7 are strategic and depend on client context, sales-team feedback, and offer competitiveness. Automate the rhythm, keep the judgment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most common findings in a first-time PPC audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Across the accounts we onboard, the top five recurring findings are: missing or partial enhanced conversions, broad-match keyword waste over $500 per month, RSA Ad Strength stuck at Poor on top campaigns, missing extensions on at least half of campaigns, and a Smart Bidding strategy applied to a campaign with under 15 conversions per month.',
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
        name: 'PPC Audit Checklist: 25 Senior-Level Checks (2026)',
        item: 'https://www.kampaio.com/blog/ppc-audit-checklist',
      },
    ],
  };

  const tableOfContents = [
    { id: 'what-audit-tells', title: 'What a PPC Audit Tells You (and Doesn’t)', level: 1 },
    { id: 'when-to-audit', title: 'When to Run a PPC Audit (3 Triggers)', level: 1 },
    { id: 'three-tiers', title: 'Three Tiers of Audit (Quick, Deep, Forensic)', level: 1 },
    { id: 'checklist', title: 'The 25-Point Audit Checklist (6 Pillars)', level: 1 },
    { id: 'decision-matrix', title: 'The Decision Matrix (Severity x Effort)', level: 1 },
    { id: 'automation', title: 'Automating the Recurring Checks', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'b6-agents', title: 'Hand Recurring Audits to B6 Agents', level: 1 },
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
  const h3Style = {
    fontSize: '22px',
    fontWeight: 700 as const,
    color: '#1e293b',
    marginBottom: '14px',
    marginTop: '36px',
    lineHeight: '1.3',
  };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const olStyle = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
    marginBottom: '32px',
  };
  const liStyle = { marginBottom: '12px' };

  // 6 pillar cards (uses repeat(3, 1fr) + @media collapse, NOT auto-fit)
  const pillars = [
    {
      n: 1,
      name: 'Foundation',
      sample: 'Access roles, conversion goals, GTM/GA4 wiring',
      checks: '3 checks',
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      n: 2,
      name: 'Structure',
      sample: 'Objective separation, naming, ad-group themes',
      checks: '5 checks',
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      n: 3,
      name: 'Tracking',
      sample: 'Variance vs source-of-truth, Consent Mode v2',
      checks: '4 checks',
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      n: 4,
      name: 'Bidding',
      sample: 'Strategy fits volume, IS lost to budget/rank',
      checks: '5 checks',
      color: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      n: 5,
      name: 'Creative',
      sample: 'Ad Strength, asset rotation, extensions',
      checks: '4 checks',
      color: '#ec4899',
      bg: '#fdf2f8',
    },
    {
      n: 6,
      name: 'Landing',
      sample: 'LCP, mobile checkout, search-terms waste',
      checks: '4 checks',
      color: '#f97316',
      bg: '#fff7ed',
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
          <ArticleHero slug="ppc-audit-checklist" />
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
              PPC Strategy &middot; Agency Playbook
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
              PPC Audit Checklist: 25 Senior-Level Checks That Surface 80% of Account Problems (2026)
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
              Six pillars, twenty-five checks, thresholds for each, and the decision matrix that turns audit findings into a prioritized fix list. Written for agency owners and senior in-house managers, not first-week PPC hires.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 21, 2026 &middot; 11 min read</span>
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
          </div>
        </div>

        {/* Article body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 1. What a PPC audit tells you */}
            <section id="what-audit-tells">
              <h2 style={h2Style}>What a PPC Audit Actually Tells You (and What It Doesn&apos;t)</h2>
              <p style={pStyle}>
                A PPC audit is a structured review of a paid-search account across six pillars: account foundation, campaign structure, conversion tracking, bidding <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>, creative and ad copy, and landing-page UX. The goal is to surface waste, identify under-served high-intent traffic, and rebuild a prioritized fix list. Budget 60 to 90 minutes for the first pass on a mid-size account.
              </p>
              <p style={pStyle}>
                Done well, an audit will tell you exactly where the next $1,000 of ad spend should not go. It catches broken tracking, broad-match runaway, under-funded high-Quality-Score campaigns, attribution drift after a Smart Bidding migration, and the dead RSAs nobody refreshed since the last quarterly review. It builds a defensible memo you can hand a client (or a CFO) within two hours.
              </p>
              <p style={pStyle}>
                It will not tell you whether the offer is competitive, whether the sales team is closing the leads it gets, or whether the market just shifted under the account. Those questions need a different room and a different conversation. An audit finds the symptoms. The diagnosis still requires senior judgment.
              </p>
            </section>

            {/* 2. When to audit */}
            <section id="when-to-audit">
              <h2 style={h2Style}>When to Run a PPC Audit (3 Triggers)</h2>
              <p style={pStyle}>
                <strong>1. New client onboarding.</strong> Day 1 to Day 3 of takeover, before you change a single bid. The audit produces a baseline snapshot and a 30-day fix plan that doubles as your &quot;I read your account&quot; credibility document. Time-box: 90 minutes. Anyone billing for a takeover and skipping this step is leaving findings on the table.
              </p>
              <p style={pStyle}>
                <strong>2. Quarterly health check.</strong> End of every quarter, on every account in the portfolio. Output is a delta-vs-last-quarter memo plus a prioritized backlog. Time-box: 60 minutes per account. If you cannot run a quarterly audit in 60 minutes, the audit framework needs simplification, not the account.
              </p>
              <p style={pStyle}>
                <strong>3. Performance crisis.</strong> A metric crossed a defined threshold. ROAS down more than 25 percent week-over-week. CPA up more than 40 percent. IS lost to budget over 30 percent in a category that was historically funded. Output: a root-cause memo plus same-day actions. Time-box: same day, 2 hours.
              </p>
              <p style={pStyle}>
                Less than quarterly is too rare; the account drifts faster than you notice. Monthly is overkill unless ad spend is over $50K per month or the account is in active crisis. Standardize on quarterly with crisis-trigger overrides.
              </p>
            </section>

            {/* 3. Three tiers */}
            <section id="three-tiers">
              <h2 style={h2Style}>The Three Tiers of Audit (Quick, Deep, Forensic)</h2>
              <p style={pStyle}>
                Not every audit needs to be exhaustive. Match scope to trigger. A pre-call diagnostic does not need forensic depth. A QBR audit does not need same-day urgency. Use the three-tier menu below to right-size the work, then map the 25 master checks downstream.
              </p>

              <ComparisonTable
                headers={['Tier', 'Trigger', 'Duration', 'Checks', 'Output']}
                rows={[
                  {
                    cells: [
                      'Quick',
                      'Pre-call diagnostic, new-prospect scoping',
                      '30 min',
                      '7 (Pillars 1 to 3)',
                      '1-page memo',
                    ],
                  },
                  {
                    cells: [
                      'Deep',
                      'Quarterly health check on existing account',
                      '60 to 90 min',
                      '18',
                      'Prioritized 30-day fix list',
                    ],
                    highlight: true,
                  },
                  {
                    cells: [
                      'Forensic',
                      'Crisis: ROAS collapse, IS collapse, CPA spike',
                      '2 to 3 hours',
                      'All 25 + drill-down',
                      'Root-cause memo, same-day actions',
                    ],
                  },
                ]}
                caption="Right-size the audit to the trigger; Deep quarterly is the default cadence."
              />

              <p style={pStyle}>
                The full 25-point checklist below feeds all three tiers. For Quick, run checks 1 through 7. For Deep, run 1 through 18. For Forensic, run all 25 and follow the anomalies wherever they lead. When a forensic audit reveals a sudden ROAS collapse rather than a structural issue, the{' '}
                <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>
                  ROAS dropped suddenly diagnostic
                </a>{' '}
                covers the eight-step recovery path in depth.
              </p>
            </section>

            {/* 4. The 25-point checklist */}
            <section id="checklist">
              <h2 style={h2Style}>The 25-Point Audit Checklist (6 Pillars)</h2>
              <p style={pStyle}>
                Walk these in pillar order. Foundation first, because it gates everything downstream. Structure second, because misnamed campaigns waste the next two hours. Tracking third, because every bid decision rides on it. The remaining three pillars (bidding, creative, landing) only matter if the first three are clean.
              </p>

              {/* Pillar card grid: repeat(3, 1fr) + @media query collapse (NOT auto-fit) */}
              <div className="pillarGrid" style={{ marginTop: '24px', marginBottom: '40px' }}>
                {pillars.map((p) => (
                  <div
                    key={p.n}
                    style={{
                      background: p.bg,
                      border: `1px solid ${p.color}33`,
                      borderRadius: '12px',
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: p.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        {p.n}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>{p.name}</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{p.sample}</div>
                    <div style={{ fontSize: '13px', color: p.color, fontWeight: 600, marginTop: '4px' }}>
                      {p.checks}
                    </div>
                  </div>
                ))}
              </div>

              <style jsx>{`
                .pillarGrid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 14px;
                }
                @media (max-width: 720px) {
                  .pillarGrid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                }
                @media (max-width: 480px) {
                  .pillarGrid {
                    grid-template-columns: 1fr;
                  }
                }
              `}</style>

              {/* Pillar 1 */}
              <h3 id="pillar-1" style={h3Style}>
                Pillar 1: Foundation (checks 1 to 3)
              </h3>
              <ol style={olStyle} start={1}>
                <li style={liStyle}>
                  <strong>Access roles audited.</strong> Verify admin vs standard vs read-only roles. Threshold: no external email holds admin rights without documentation. Strip orphan accounts immediately.
                </li>
                <li style={liStyle}>
                  <strong>Account-level conversion goals defined.</strong> At least one Primary action enabled. Multiple Secondary actions are fine; zero Primary is a critical flag.
                </li>
                <li style={liStyle}>
                  <strong>GTM and GA4 wired clean.</strong> Open DebugView, confirm no duplicate page_view fires, confirm purchase events reach GA4 within 30 seconds.
                </li>
              </ol>

              {/* Pillar 2 */}
              <h3 id="pillar-2" style={h3Style}>
                Pillar 2: Structure (checks 4 to 8)
              </h3>
              <ol style={olStyle} start={4}>
                <li style={liStyle}>
                  <strong>Campaigns separated by objective.</strong> Search, Shopping, PMax, Display, Video each in their own campaign. No mixed-objective bundling.
                </li>
                <li style={liStyle}>
                  <strong>Naming convention consistent.</strong> A pattern like [Brand]_[Geo]_[Intent]_[Match] applied across at least 90 percent of campaigns. Inconsistent naming compounds for years.
                </li>
                <li style={liStyle}>
                  <strong>Ad groups thematically tight.</strong> One intent per ad group. Average keyword count under 20 per group; over that, ad relevance dilutes.
                </li>
                <li style={liStyle}>
                  <strong>Final URLs point to the right landing pages.</strong> Not the homepage by default. Confirm with a 10-row sample.
                </li>
                <li style={liStyle}>
                  <strong>Geographic and language targeting matches the offer.</strong> No accidental US/UK overlap. No English-only ads serving Quebec by mistake.
                </li>
              </ol>

              {/* Pillar 3 */}
              <h3 id="pillar-3" style={h3Style}>
                Pillar 3: Tracking (checks 9 to 12)
              </h3>
              <ol style={olStyle} start={9}>
                <li style={liStyle}>
                  <strong>Conversion-action variance under 15 percent.</strong> Cross-check Google Ads revenue vs Shopify, Stripe, or your CRM over the last 7 days. Over 15 percent, tracking is the bug. Work the{' '}
                  <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>
                    conversion tracking diagnostic
                  </a>{' '}
                  before touching bids.
                </li>
                <li style={liStyle}>
                  <strong>Enhanced conversions enabled and verified.</strong> Toggled silently off after a site redeploy is one of the most common 2026 breakages.
                </li>
                <li style={liStyle}>
                  <strong>Consent Mode v2 status reviewed.</strong> EU traffic banner defaulting to &quot;denied&quot; silently drops conversions. Confirm consented vs modeled split in Google Ads.
                </li>
                <li style={liStyle}>
                  <strong>GA4 to Google Ads import sanity.</strong> Each imported event maps to one conversion action. No double-counting via both GA4 and the native tag.
                </li>
              </ol>

              {/* Pillar 4 */}
              <h3 id="pillar-4" style={h3Style}>
                Pillar 4: Bidding (checks 13 to 17)
              </h3>
              <ol style={olStyle} start={13}>
                <li style={liStyle}>
                  <strong>Bid strategy fits volume.</strong> Smart Bidding stabilizes at roughly 30 conversions per month per campaign. Below 30, switch to Maximize Conversions. Below 15, manual CPC is safer.
                </li>
                <li style={liStyle}>
                  <strong>Target ROAS or CPA realistic vs trailing 14-day baseline.</strong> Aspirational targets starve the algorithm. Use baseline times 0.9 as a floor.
                </li>
                <li style={liStyle}>
                  <strong>IS Lost to Budget under 20 percent.</strong> Above 20 percent on a high-Quality-Score campaign means it is underfunded; raise daily budget or shift from elsewhere. For a deeper diagnostic when the budget never actually spends, see{' '}
                  <a href="/blog/google-ads-not-spending-full-budget" style={linkStyle}>
                    why a Google Ads account does not spend its full budget
                  </a>
                  .
                </li>
                <li style={liStyle}>
                  <strong>IS Lost to Rank under 30 percent.</strong> Over 30 percent means Quality Score or bid is the problem, not the budget.
                </li>
                <li style={liStyle}>
                  <strong>Shared budgets used intentionally.</strong> Orphan or low-priority campaigns should not be draining shared pots that fund the main money campaigns.
                </li>
              </ol>

              {/* Pillar 5 */}
              <h3 id="pillar-5" style={h3Style}>
                Pillar 5: Creative (checks 18 to 21)
              </h3>
              <ol style={olStyle} start={18}>
                <li style={liStyle}>
                  <strong>At least 80 percent of RSAs at &quot;Good&quot; or &quot;Excellent&quot; Ad Strength.</strong> Anything stuck at &quot;Poor&quot; for over 3 months on a top campaign is audit-worthy.
                </li>
                <li style={liStyle}>
                  <strong>Asset combinations rotating.</strong> Not stuck on one headline/description variant. If the rotation has frozen, ad fatigue is masked.
                </li>
                <li style={liStyle}>
                  <strong>Extensions enabled on every campaign.</strong> Sitelink, callout, structured snippet baseline. Image, lead form, call where eligible. Missing extensions are the lowest-effort, highest-impact quick win we find in 90 percent of first-time audits.
                </li>
                <li style={liStyle}>
                  <strong>Creative refresh recency under 90 days.</strong> Top campaigns should see new headlines, descriptions, or images at least quarterly.
                </li>
              </ol>

              {/* Pillar 6 */}
              <h3 id="pillar-6" style={h3Style}>
                Pillar 6: Landing and post-click (checks 22 to 25)
              </h3>
              <ol style={olStyle} start={22}>
                <li style={liStyle}>
                  <strong>LCP under 2.5 seconds on mobile.</strong> Top 5 landing pages. Anything over 4 seconds drops CVR 30 to 50 percent on{' '}
                  <a
                    href="https://web.dev/articles/lcp"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google&apos;s own benchmarks
                  </a>
                  .
                </li>
                <li style={liStyle}>
                  <strong>CVR per landing page meets category benchmark.</strong> A page bleeding below benchmark deserves a CRO sprint, not a bid change.
                </li>
                <li style={liStyle}>
                  <strong>Mobile checkout flow tested in iOS Safari incognito.</strong> The most fragile device-browser combo. Manually complete a purchase. Yes, every quarter.
                </li>
                <li style={liStyle}>
                  <strong>Search-terms-report waste review.</strong> Any query with at least $50 spend and 0 conversions over the last 30 days flagged for negative or alignment fix. Broad-match runaway hides here.
                </li>
              </ol>

              <MascotQuote mascot="vox">
                I reallocate 22 percent of misspent budget on average across the audit findings. The biggest single lever is moving spend out of broad-match keywords with $50 or more in waste and into high-intent exact-match clusters with Quality Score at least 7. The reallocation runs trailing 28 days, so it only moves money where the new home has proven conversion volume.
              </MascotQuote>
            </section>

            {/* 5. Decision matrix */}
            <section id="decision-matrix">
              <h2 style={h2Style}>The Decision Matrix (What to Do With What You Found)</h2>
              <p style={pStyle}>
                An audit produces 20 to 40 findings on a typical account. Triage them. Not every finding deserves the same response. Use the 3-by-3 matrix below to decide what to do with each finding by severity and effort to fix.
              </p>

              <MermaidDiagram
                chart={`
flowchart TD
    A[Audit finding] --> B{Severity?}
    B -->|Critical| C{Effort?}
    B -->|Important| D{Effort?}
    B -->|Nice-to-have| E[Backlog batch]
    C -->|Quick| F[Apply today]
    C -->|Medium| G[30-day fix plan]
    C -->|Strategic| H[Client call required]
    D -->|Quick| I[30-day fix plan]
    D -->|Medium| J[Backlog batch]
    D -->|Strategic| K[Client memo at QBR]
                `}
                caption="Severity x effort triage. Critical-and-Quick goes today; everything else gets queued."
              />

              <ComparisonTable
                headers={['Severity', 'Quick fix', 'Medium effort', 'Strategic']}
                rows={[
                  {
                    cells: ['Critical', 'Apply today', '30-day fix plan', 'Client call required'],
                    highlight: true,
                  },
                  {
                    cells: ['Important', '30-day fix plan', 'Backlog batch', 'Client memo at QBR'],
                  },
                  {
                    cells: ['Nice-to-have', 'Backlog batch', 'Backlog batch', 'Drop unless asked'],
                  },
                ]}
                caption="The same triage rendered as a quick-reference matrix."
              />

              <p style={pStyle}>
                <strong>Critical and Quick.</strong> Broken conversion tracking. A broad-match keyword with $300 spend and zero conversions in 14 days. Apply today; document the change in the audit log. No client call needed for a fix that prevents active bleeding.
              </p>
              <p style={pStyle}>
                <strong>Critical and Strategic.</strong> PMax structurally misconfigured. Attribution model change recommended. Cross-portfolio budget reallocation north of $20K. Schedule a client call. Do not unilaterally move tens of thousands of monthly spend, even when you have admin access. When the audit findings keep stacking up and the account is being actively managed by another vendor, the{' '}
                <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>
                  agency-readiness signals piece
                </a>{' '}
                covers what to do with the client conversation that follows.
              </p>
              <p style={pStyle}>
                <strong>Important and Quick.</strong> Add five missing sitelinks. Fix one RSA stuck at Poor <a href="/blog/responsive-search-ads-best-practices" style={linkStyle}>Ad Strength</a>. Tighten geo targeting on one campaign. Batch all of these into a single 30-day fix list and send one client memo at month-end. Streaming 30 micro-updates over a month trains the client to ignore your communications.
              </p>
            </section>

            {/* 6. Automation */}
            <section id="automation">
              <h2 style={h2Style}>Automating the Recurring Checks (Audit Cadence)</h2>
              <p style={pStyle}>
                If you run audits manually every quarter, you are rediscovering 70 percent of the same findings each quarter. The cadence per check matters more than the completeness per audit. Automate the recurring 18 checks. Keep human attention on the 7 strategic checks.
              </p>

              {/* Cadence checklist visual */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px 28px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '14px' }}>
                  Working cadence per check
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#1e293b', fontSize: '17px', lineHeight: '1.9' }}>
                  <li>
                    <span style={{ color: '#10b981', fontWeight: 700, marginRight: '8px' }}>&#10003;</span>
                    <strong>Daily.</strong> Spend anomaly detection, conversion drop alerts, IS Lost to Budget threshold breach.
                  </li>
                  <li>
                    <span style={{ color: '#10b981', fontWeight: 700, marginRight: '8px' }}>&#10003;</span>
                    <strong>Weekly.</strong> Search-terms-report waste, bidding strategy fit (volume vs strategy), Ad Strength rotation, conversion-tracking variance vs source-of-truth.
                  </li>
                  <li>
                    <span style={{ color: '#10b981', fontWeight: 700, marginRight: '8px' }}>&#10003;</span>
                    <strong>Monthly.</strong> Structure and naming audit, extensions completeness, Quality Score trend per ad group, creative refresh status.
                  </li>
                  <li>
                    <span style={{ color: '#f59e0b', fontWeight: 700, marginRight: '8px' }}>&#9733;</span>
                    <strong>Quarterly (manual, senior judgment).</strong> Strategic budget reallocation across portfolio, attribution model review, landing-page experimentation roadmap, account-access roles, conversion-goal hierarchy.
                  </li>
                </ul>
              </div>

              <p style={pStyle}>
                Implementation options range from native Google Ads automated rules (spend anomalies, IS breach) and free Google Ads scripts (search-terms-waste, daily anomaly) to third-party tools like Optmyzr or Adalysis for the rolling 18-check rhythm. The 7 strategic checks stay manual because their answers depend on context that a tool cannot infer: client tolerance for risk, season-specific budget shifts, sales-team feedback loops. The{' '}
                <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>
                  Quality Score deep guide
                </a>{' '}
                covers when a low Quality Score is the symptom vs the disease, and that distinction still needs a human.
              </p>

              <MascotQuote mascot="maximus">
                I auto-run 18 of the 25 audit checks every Monday at 06:00. The senior strategist sees only the deltas: what crossed a threshold this week that was clean last week. Typical surface area is 3 to 7 flags per account per week. The 7 strategic checks stay manual, batched into the quarterly review. Math: roughly 7 hours saved per account per quarter, or about 28 hours back per quarter on a 4-account portfolio.
              </MascotQuote>

              <p style={pStyle}>
                Automating the recurring checks does not replace senior judgment. It frees senior judgment for the work that actually requires it.
              </p>
            </section>

            {/* 7. FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>How long should a PPC audit take?</strong> A Quick audit is 30 minutes. A Deep quarterly audit is 60 to 90 minutes. A Forensic crisis audit is 2 to 3 hours. Anything claiming &quot;comprehensive audit in 15 minutes&quot; is either a sales pitch or a shallow check; both are fine, neither is an audit.
              </p>
              <p style={pStyle}>
                <strong>What&apos;s the difference between a PPC audit and an account review?</strong> An audit is a structured pass against a checklist with thresholds and a fixed scope. An account review is a freeform look at performance, often driven by a client question. Audits produce a defensible memo; reviews produce a conversation. You need both.
              </p>
              <p style={pStyle}>
                <strong>How often should I audit a Google Ads account?</strong> Quarterly is the standard cadence. Monthly is overkill below $50K per month spend. Crisis-triggered audits override the cadence: a ROAS drop over 25 percent or CPA spike over 40 percent triggers a same-day forensic audit regardless of the calendar.
              </p>
              <p style={pStyle}>
                <strong>What&apos;s the single most important PPC audit check?</strong> Conversion-tracking variance against the source-of-truth (Shopify, Stripe, CRM). If revenue reported in Google Ads disagrees with the source-of-truth by more than 15 percent over 7 days, every downstream metric is suspect and every bid decision rides on a wrong number. Fix tracking first.
              </p>
              <p style={pStyle}>
                <strong>Can I automate a full PPC audit?</strong> No. You can automate the recurring 18 of 25 checks (the threshold-driven ones). The remaining 7 are strategic and depend on client context, sales-team feedback, and offer competitiveness. The right phrase is &quot;automate the rhythm, keep the judgment.&quot;
              </p>
              <p style={pStyle}>
                <strong>What are the most common findings in a first-time PPC audit?</strong> Across the accounts we onboard, the top five recurring findings are: missing or partial enhanced conversions, broad-match keyword waste over $500 per month, RSA Ad Strength stuck at Poor on top campaigns, missing extensions on at least half of campaigns, and a Smart Bidding strategy applied to a campaign with under 15 conversions per month. All five are fixable in under a week.
              </p>
            </section>

            {/* 8. B6 CTA */}
            <section id="b6-agents">
              <h2 style={h2Style}>Hand the Recurring Audits to B6 Agents</h2>
              <p style={pStyle}>
                <a href="/b6#vox" style={linkStyle}>
                  Vox runs a cross-campaign budget audit
                </a>{' '}
                weekly. It finds the misspent percentage, proposes a trailing-28-day reallocation, and waits for your approval. One click and the spend follows the QS plus volume signal, not the original budget assumption.
              </p>
              <p style={pStyle}>
                <a href="/b6#maximus" style={linkStyle}>
                  Maximus orchestrates 18 of the 25 recurring checks
                </a>{' '}
                on a Monday-morning cadence. It surfaces only the deltas: what crossed a threshold this week that was clean last week. The 7 strategic checks stay on your quarterly calendar. The math works out to roughly 7 hours back per account per quarter.
              </p>
              <p style={pStyle}>
                <a href="/b6#aegis" style={linkStyle}>
                  Aegis (Risk review)
                </a>{' '}
                catches the audit findings that turn into crises if ignored: conversion-tracking variance crossing 18 percent, IS lost to budget crossing 30 percent, search-terms waste compounding past $500 per week. Escalations are pushed within 24 hours, not at quarter-end.
              </p>

              <div
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  marginTop: '60px',
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
                  Run your first weekly audit by Monday.
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
                  Connect Google Ads, let Vox, Maximus, and Aegis run the 18 recurring checks for you. The 7 strategic checks stay on your quarterly calendar where they belong. See{' '}
                  <a href="/pricing" style={linkStyle}>
                    pricing tiers
                  </a>{' '}
                  for Co-pilot, Approval, and Autonomous modes.
                </p>
                <a
                  href="/chat"
                  className="btn"
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
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Start B6 Free Trial
                </a>
              </div>
            </section>
          </div>
        </div>

        <KeepReading slug="ppc-audit-checklist" category="ppc" />
      <Footer compact={true} />
      </div>
    </>
  );
}
