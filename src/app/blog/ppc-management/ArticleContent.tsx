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
    '@id': 'https://www.kampaio.com/blog/ppc-management#article',
    headline: 'PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)',
    description:
      'What PPC management really is and how an in-house team runs it: the core disciplines, a weekly and monthly operating cadence, when to audit or restructure, and how to decide if you still need an agency.',
    image: 'https://www.kampaio.com/og/ppc-management.png',
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
    datePublished: '2026-06-04T00:00:00.000Z',
    dateModified: '2026-06-04T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/ppc-management',
    },
    keywords:
      'ppc management, in-house ppc, paid search management, google ads management, ppc operating cadence, ppc audit, account restructure, smart bidding, budget pacing, conversion tracking, in-house vs agency, ppc automation',
    wordCount: 2564,
    articleSection: 'PPC Optimization',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does a PPC manager do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A PPC manager runs six recurring disciplines on a fixed cadence: research, account structure, creative, bidding, budget pacing, and measurement. In practice that is a daily spend check, a weekly 60 to 90 minute loop covering search terms and bids, a monthly budget reallocation, and a quarterly audit.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does PPC management cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There are three cost models. Agency retainers commonly run $1,500 to $5,000 per month flat or 10 to 20 percent of ad spend. An in-house PPC manager costs salary (US average roughly $75K per year). AI tools like B6 run on a flat monthly subscription and extend in-house capacity without a headcount hire. At $5K in ad spend, a $1,500 agency fee equals 30 percent of total budget going to management.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much do PPC managers make in the US?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The US average is approximately $75,395 per year per Indeed job postings (updated May 2026). Senior in-house PPC managers at mid-market companies typically earn $85K to $110K.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is PPC harder than SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'They are different disciplines with different feedback loops. PPC delivers measurable outcomes within days of a bid or ad change; SEO operates on months-long timelines. Neither is harder in any absolute sense. They serve different strategic functions and work best together.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you manage PPC in-house yourself?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under $20K per month in ad spend, DIY is viable with 3 to 5 hours per week plus an automation tool. Above $20K per month, the complexity of multi-channel management makes a tool or specialist worth the investment. The key is running the operating loop consistently, not firefighting reactively.',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should you review a PPC account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Daily (a 5 minute spend and conversion glance), weekly (a 60 to 90 minute loop covering search terms, bids, pacing, and creative), monthly (a half day for budget reallocation and reporting), and quarterly (a full audit). More frequent reviews make sense if spend exceeds $50K per month or an active crisis requires daily tracking.',
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
        name: 'PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)',
        item: 'https://www.kampaio.com/blog/ppc-management',
      },
    ],
  };

  const tableOfContents = [
    { id: 'what-is-ppc-management', title: 'What Is PPC Management?', level: 1 },
    { id: 'six-disciplines', title: 'What PPC Management Actually Includes (The 6 Core Disciplines)', level: 1 },
    { id: 'in-house-vs-agency', title: 'In-House vs Agency vs Tool: Who Should Manage Your PPC?', level: 1 },
    { id: 'operating-loop', title: 'The In-House PPC Management Operating Loop (Weekly + Monthly)', level: 1 },
    { id: 'quarterly-audit', title: 'The Quarterly PPC Audit (Catching What the Weekly Loop Misses)', level: 1 },
    { id: 'restructure', title: 'When PPC Management Means Rebuilding the Account (Restructure)', level: 1 },
    { id: 'keep-or-fire', title: 'Keep It In-House or Fire the Agency? A Decision Framework', level: 1 },
    { id: 'scaling', title: 'Scaling In-House PPC Management Without Hiring', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'b6-agents', title: 'Run Your In-House PPC Loop With B6 Agents', level: 1 },
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
  const olStyle = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
    marginBottom: '32px',
  };
  const liStyle = { marginBottom: '16px' };

  // VISUAL 1: 6 core disciplines card grid (repeat(3, 1fr) + @media collapse, NOT auto-fit)
  const disciplines = [
    {
      n: 1,
      name: 'Research',
      good: 'Keyword and audience targeting updated quarterly; competitor terms monitored monthly.',
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      n: 2,
      name: 'Account structure',
      good: 'Campaigns separated by intent and objective so spend is steerable and bid strategies have clean data.',
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      n: 3,
      name: 'Creative',
      good: 'Copy and landing pages tested on rotation; RSA Ad Strength at Good or better across active ad groups.',
      color: '#ec4899',
      bg: '#fdf2f8',
    },
    {
      n: 4,
      name: 'Bidding',
      good: 'Bid strategy matched to volume; Smart Bidding fed at least 30 conversions per month to stay out of Learning Limited.',
      color: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      n: 5,
      name: 'Budget pacing',
      good: 'Spend tracked daily against monthly targets; reallocation done monthly, not reactively.',
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      n: 6,
      name: 'Measurement',
      good: 'Conversion-tracking variance below 15 percent vs source-of-truth over any 7-day window.',
      color: '#f97316',
      bg: '#fff7ed',
    },
  ];

  // VISUAL 3: operating cadence ladder (4 rows, color-coded)
  const cadence = [
    {
      freq: 'Daily',
      time: '5 min',
      tasks: 'Spend anomaly check; conversion-drop glance.',
      color: '#10b981',
      bg: '#ecfdf5',
    },
    {
      freq: 'Weekly',
      time: '60 to 90 min',
      tasks: 'Search terms review and negatives; bid checks on top ad groups; ad strength and creative rotation; pacing vs monthly budget.',
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      freq: 'Monthly',
      time: 'Half day',
      tasks: 'Budget reallocation across campaigns and channels; structure sanity check; reporting and next-month plan.',
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      freq: 'Quarterly',
      time: 'Full day',
      tasks: 'Deep audit; strategic review; keyword and audience refresh.',
      color: '#f59e0b',
      bg: '#fffbeb',
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
          <ArticleHero slug="ppc-management" />
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
              PPC Optimization &middot; In-House Playbook
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
              PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)
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
              PPC management is a repeatable operating discipline, not a one-time setup. Six recurring functions run on a fixed daily, weekly, monthly, and quarterly cadence. This guide is the operating system for in-house PPC teams.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 4, 2026 &middot; 13 min read</span>
                </div>
              </div>
            </div>

            {/* TL;DR callout */}
            <div
              style={{
                background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)',
                borderLeft: '4px solid #764ba2',
                borderRadius: '8px',
                padding: '20px 24px',
                marginBottom: '40px',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#764ba2', marginBottom: '8px', letterSpacing: '0.04em' }}>
                TL;DR
              </div>
              <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>
                PPC management is a repeatable operating discipline, not a one-time setup. Six recurring functions (research, structure, creative, bidding, <a href="/blog/google-ads-not-spending-full-budget" style={linkStyle}>budget pacing</a>, measurement) run on a fixed daily, weekly, monthly, and quarterly cadence. This guide gives in-house PPC teams that operating system.
              </p>
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
            <p style={pStyle}>
              PPC management is the ongoing process of planning, running, and optimizing pay-per-click campaigns across channels (Google, Microsoft, Meta, Amazon) to hit a target cost-per-result. It covers keyword and audience research, ad creative, bidding, budget pacing, and reporting. It can be done in-house or by an agency.
            </p>

            {/* 1. What is PPC management */}
            <section id="what-is-ppc-management">
              <h2 style={h2Style}>What Is PPC Management?</h2>
              <p style={pStyle}>
                PPC management is a continuous discipline, not a campaign launch. Once a campaign goes live, the work is just starting: search terms shift, competitors adjust bids, budgets drift off-pace, and conversion data accumulates insights you need to act on weekly.
              </p>
              <p style={pStyle}>
                PPC runs across multiple channels today. Google Ads is the dominant platform for most SMB and mid-market advertisers, but PPC management as a discipline covers Microsoft Ads, Meta, Amazon Ads, and LinkedIn for B2B. The mechanics differ per platform; the management disciplines are the same: research, structure, creative, bidding, budget pacing, and measurement.
              </p>
              <p style={pStyle}>
                This guide gives you the operating system: the cadence, the decisions, and the frameworks that keep an in-house PPC account compounding rather than quietly bleeding budget.
              </p>
            </section>

            {/* 2. Six core disciplines */}
            <section id="six-disciplines">
              <h2 style={h2Style}>What PPC Management Actually Includes (The 6 Core Disciplines)</h2>
              <p style={pStyle}>
                PPC management breaks into six recurring disciplines: research, account structure, creative, bidding, budget pacing, and measurement.
              </p>

              {/* VISUAL 1: discipline card grid (repeat(3, 1fr), NOT auto-fit) */}
              <div className="disciplineGrid" style={{ marginTop: '24px', marginBottom: '40px' }}>
                {disciplines.map((d) => (
                  <div
                    key={d.n}
                    style={{
                      background: d.bg,
                      border: `1px solid ${d.color}33`,
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
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: d.color,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        {d.n}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>{d.name}</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>{d.good}</div>
                  </div>
                ))}
              </div>

              <style jsx>{`
                .disciplineGrid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 14px;
                }
                @media (max-width: 720px) {
                  .disciplineGrid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                }
                @media (max-width: 480px) {
                  .disciplineGrid {
                    grid-template-columns: 1fr;
                  }
                }
              `}</style>

              <p style={pStyle}>
                One discipline note worth its own link: for RSA asset scoring and pinning tradeoffs, see{' '}
                <a href="/blog/responsive-search-ads-best-practices" style={linkStyle}>
                  RSA best practices for 2026
                </a>
                . And on the measurement side,{' '}
                <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>
                  conversion tracking failures
                </a>{' '}
                are the most common cause of variance above the 15 percent threshold.
              </p>
              <p style={pStyle}>
                Managing PPC well means keeping all six disciplines in balance week over week, not perfecting one while the others drift.
              </p>
            </section>

            {/* 3. In-house vs agency vs tool */}
            <section id="in-house-vs-agency">
              <h2 style={h2Style}>In-House vs Agency vs Tool: Who Should Manage Your PPC?</h2>
              <p style={pStyle}>
                Three real options exist for running paid media: hire in-house, engage an agency, or use an AI tool to extend in-house capacity. Each has a different cost structure, speed profile, and risk.
              </p>

              {/* VISUAL 2: ComparisonTable */}
              <ComparisonTable
                headers={['', 'In-House Manager', 'Agency', 'AI Tool (e.g. B6)']}
                rows={[
                  {
                    cells: [
                      'Monthly cost',
                      'Salary (US avg ~$75K/yr per Indeed)',
                      '$1,500 to $5,000/mo flat, or 10 to 20% of spend',
                      'Flat subscription, free in beta',
                    ],
                  },
                  {
                    cells: [
                      'Speed to act',
                      'Same day',
                      'Days to a week (approval cycles)',
                      'Minutes to hours (agent-driven)',
                    ],
                  },
                  {
                    cells: [
                      'Channel coverage',
                      'Depth on 1 to 2 channels',
                      'Breadth across channels',
                      'Depth with automation assist',
                    ],
                  },
                  {
                    cells: [
                      'Control of data',
                      'Full (you own the account)',
                      'Partial (MCC risk)',
                      'Full (you own the account)',
                    ],
                  },
                  {
                    cells: [
                      'Best for spend range',
                      '$10K to $100K/mo',
                      '$20K+/mo (margin justifies fee)',
                      '$5K to $50K/mo',
                    ],
                  },
                  {
                    cells: [
                      'Main risk',
                      'Bandwidth limits at scale',
                      'Black-box management; 30% to fees at $5K spend',
                      'Requires in-house operator to review output',
                    ],
                  },
                ]}
                caption="In-house vs agency vs tool, compared on cost, speed, coverage, control, and risk."
              />

              <p style={pStyle}>
                The math at SMB scale is worth spelling out: at $5,000 per month in ad spend, a $1,500 agency retainer means 30 percent of your total budget goes to management, not media. That alone reframes the build-vs-buy decision for most in-house teams.
              </p>
              <p style={pStyle}>
                <strong>When in-house wins:</strong> you own the product context, you want control of the data, and you have enough spend to justify a dedicated person or a tool-assisted operator. You can move within hours when something breaks.
              </p>
              <p style={pStyle}>
                <strong>When an agency wins:</strong> you have no in-house capacity, need to cover multiple channels simultaneously with specialists, and your spend is large enough that the management fee is a small percentage of media.
              </p>
              <p style={pStyle}>
                <strong>When a tool wins:</strong> you have an in-house operator who knows PPC but is burning 8 to 15 hours per week on mechanical tasks at a $10K account. A tool cuts that to 3 to 5 hours per week without adding headcount. For the full without-agency decision framework, see our guide to{' '}
                <a href="/blog/google-ads-without-agency" style={linkStyle}>
                  running PPC without an agency
                </a>
                .
              </p>

              <MascotQuote mascot="vox">
                Across a 6-campaign account I reallocate roughly 15 to 20 percent of spend each month, pulling from broad-match groups with zero conversions toward exact-match clusters that are beating target ROAS. That reallocation compounds: a campaign that was misspending $800 per month clears $2,400 in three months if you catch it on the first monthly review.
              </MascotQuote>
            </section>

            {/* 4. Operating loop */}
            <section id="operating-loop">
              <h2 style={h2Style}>The In-House PPC Management Operating Loop (Weekly + Monthly)</h2>
              <p style={pStyle}>
                Good PPC management runs on a fixed cadence, not on firefighting.
              </p>

              {/* VISUAL 3: cadence ladder */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px', marginBottom: '36px' }}>
                {cadence.map((c) => (
                  <div
                    key={c.freq}
                    className="cadenceRow"
                    style={{
                      background: c.bg,
                      border: `1px solid ${c.color}33`,
                      borderLeft: `5px solid ${c.color}`,
                      borderRadius: '10px',
                      padding: '16px 20px',
                    }}
                  >
                    <div className="cadenceHead">
                      <span style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>{c.freq}</span>
                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'white',
                          background: c.color,
                          padding: '3px 10px',
                          borderRadius: '20px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {c.time}
                      </span>
                    </div>
                    <div style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', marginTop: '6px' }}>
                      {c.tasks}
                    </div>
                  </div>
                ))}
              </div>

              <style jsx>{`
                .cadenceHead {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 12px;
                }
              `}</style>

              <p style={pStyle}>
                The weekly loop runs in order for a reason: tracking integrity before bids (bad tracking corrupts bid signals), search terms before structure changes (new intent patterns are the input to restructure decisions). One industry survey found fewer than 10 percent of Google Ads accounts receive weekly updates from their manager. For in-house teams running this cadence, that gap is a real competitive advantage. Sudden ROAS drops usually trace back to tracking, not bids: see{' '}
                <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>
                  why ROAS drops suddenly
                </a>
                .
              </p>

              <MascotQuote mascot="buzz">
                On a $20K per month account I track CPC weekly at the ad group level. When a top ad group&apos;s CPC climbs above target for 3 straight days, I cut the bid 10 to 12 percent and recheck after 5 days before touching anything else. That 5-day hold is non-negotiable: Smart Bidding needs a short learning window after each adjustment. Touching bids again before that window closes restarts the signal and erases the correction.
              </MascotQuote>

              <p style={pStyle}>
                The cadence is the product. Skipping the weekly loop is how accounts silently rot.
              </p>
            </section>

            {/* 5. Quarterly audit */}
            <section id="quarterly-audit">
              <h2 style={h2Style}>The Quarterly PPC Audit (Catching What the Weekly Loop Misses)</h2>
              <p style={pStyle}>
                A PPC audit is the periodic deep review that catches structural and tracking issues the weekly loop glosses over.
              </p>
              <p style={pStyle}>
                The audit checks six areas: Foundation, Structure, Tracking, Bidding, Creative, and Landing. Quarterly is the right cadence for most accounts. Monthly audits make sense only when spend exceeds roughly $50K per month or the account is in active crisis (ROAS down more than 25 percent or CPA up more than 40 percent).
              </p>
              <p style={pStyle}>
                The five most common first-time audit findings: missing enhanced conversions, broad-match keyword waste above $500 per month, RSA Ad Strength stuck at Poor, missing ad extensions on most campaigns, and Smart Bidding active on campaigns with fewer than 15 conversions per month. None of these are exotic. All of them quietly cost money every week they go unchecked.
              </p>
              <p style={pStyle}>
                We maintain a 25-point checklist for this. The{' '}
                <a href="/blog/ppc-audit-checklist" style={linkStyle}>
                  complete PPC audit checklist
                </a>{' '}
                walks all six pillars with pass/fail criteria and remediation steps.
              </p>
              <p style={pStyle}>
                One honest note: an audit finds symptoms. The diagnosis still requires your judgment.
              </p>
            </section>

            {/* 6. Restructure */}
            <section id="restructure">
              <h2 style={h2Style}>When PPC Management Means Rebuilding the Account (Restructure)</h2>
              <p style={pStyle}>
                Sometimes <a href="/blog/google-ads-optimization" style={linkStyle}>optimization</a> isn&apos;t enough and the account structure itself is the bottleneck.
              </p>
              <p style={pStyle}>
                Four signals indicate a restructure, not incremental fixes:
              </p>

              <ol style={olStyle} start={1}>
                <li style={liStyle}>
                  <strong>Fragmented conversions:</strong> 50+ micro-ad-groups each with fewer than 30 clicks per month. Smart Bidding is starved of signal and stuck in Learning Limited. If the bid strategy status reads &quot;Eligible (Limited)&quot; rather than &quot;Learning,&quot; our{' '}
                  <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>
                    bid strategy limited diagnostic
                  </a>{' '}
                  explains the four root causes. The fix: consolidate to 3 campaigns maximum for accounts under $30K per month.
                </li>
                <li style={liStyle}>
                  <strong>Broad match domination with no returns:</strong> broad match consuming more than 40 percent of spend but delivering fewer than 20 percent of conversions over 90 days. Structure is feeding the wrong match type. If you are unsure which match type is doing what,{' '}
                  <a href="/blog/google-ads-keyword-match-types-explained" style={linkStyle}>
                    how keyword match types work in 2026
                  </a>{' '}
                  maps the current behavior of broad, phrase, and exact.
                </li>
                <li style={liStyle}>
                  <strong>Legacy conversion chaos:</strong> pre-2024 conversion actions still active alongside newer ones, Quality Score below 5 on more than 30 percent of keywords, or Impression Share lost to budget above 30 percent on top campaigns. These are patterns of a structure that grew organically and was never rationalized.
                </li>
                <li style={liStyle}>
                  <strong>Channel sprawl with overlapping audiences:</strong> running Google, Microsoft, and Meta with overlapping audience definitions managed as separate silos, with no cross-channel budget reallocation logic.
                </li>
              </ol>

              {/* VISUAL 5: Mermaid flowchart LR (restructure phases over 8 weeks) */}
              <MermaidDiagram
                chart={`
flowchart LR
    A[Restructure trigger] --> B[Phase 1: Plan and map intent]
    B --> C[Phase 2: Rebuild structure]
    C --> D[Phase 3: Migrate and relearn]
    D --> E[Phase 4: Stabilize and verify]
    E --> F[New baseline ROAS]
                `}
                caption="Restructure runs 4 phases over 8 weeks minimum; compressing the timeline erases conversion learning."
              />

              <p style={pStyle}>
                Restructure is rare: typically once per year per account. It runs 4 phases over 8 weeks minimum; compressed timelines lose conversion learning and erase gains. For the full playbook, the{' '}
                <a href="/blog/google-ads-account-restructure" style={linkStyle}>
                  complete account restructure walkthrough
                </a>{' '}
                covers all 4 phases with timing and risk controls.
              </p>
            </section>

            {/* 7. Keep or fire */}
            <section id="keep-or-fire">
              <h2 style={h2Style}>Keep It In-House or Fire the Agency? A Decision Framework</h2>
              <p style={pStyle}>
                Most agency-client switches happen 8 to 14 months too late. By the time a client acts, they have paid months of retainer for flat or declining results.
              </p>
              <p style={pStyle}>
                <strong>Signals you can keep running it in-house (or should move in-house):</strong>
              </p>
              <ul style={olStyle}>
                <li style={liStyle}>The weekly cadence is running and you can see the work in the change history (healthy: 20 to 30 changes in 30 days for a $5K+ per month account)</li>
                <li style={liStyle}>Results trend in the right direction over rolling 90-day windows</li>
                <li style={liStyle}>You have full account access (MCC ownership is yours, not the agency&apos;s)</li>
                <li style={liStyle}>Reporting shows actual campaign decisions, not just spend and ROAS summaries</li>
              </ul>
              <p style={pStyle}>
                <strong>Signals something needs to change:</strong>
              </p>
              <ul style={olStyle}>
                <li style={liStyle}>Fewer than 20 changes visible in 30 days: the account is running on autopilot Smart Bidding with no active management</li>
                <li style={liStyle}>Spend under $20K per month: statistically, you are assigned to a junior coordinator managing 12+ accounts simultaneously</li>
                <li style={liStyle}>Agency holds MCC ownership: if you part ways, they can revoke access and take historical data, conversion tracking, and audience lists</li>
              </ul>

              {/* Decision check callout */}
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
                  Decision check
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#1e293b', fontSize: '17px', lineHeight: '1.9' }}>
                  <li>
                    <span style={{ color: '#10b981', fontWeight: 700, marginRight: '8px' }}>&#10003;</span>
                    <strong>0 to 2 signals:</strong> you have a good working arrangement.
                  </li>
                  <li>
                    <span style={{ color: '#f59e0b', fontWeight: 700, marginRight: '8px' }}>&#9733;</span>
                    <strong>3 to 5 signals:</strong> give the agency 60 days with specific deliverables and a clear review.
                  </li>
                  <li>
                    <span style={{ color: '#ef4444', fontWeight: 700, marginRight: '8px' }}>&#9888;</span>
                    <strong>6+ signals:</strong> start your search now.
                  </li>
                </ul>
              </div>

              <p style={pStyle}>
                For the concrete diagnostic,{' '}
                <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>
                  8 observable signals your PPC agency is failing
                </a>{' '}
                covers each signal with exact thresholds and a self-scoring guide.
              </p>

              {/* VISUAL 6: Warning callout, what PPC cannot fix */}
              <div
                style={{
                  background: '#fef2f2',
                  borderLeft: '4px solid #ef4444',
                  borderRadius: '8px',
                  padding: '20px 24px',
                  marginBottom: '32px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '20px' }}>&#9888;</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#b91c1c' }}>What PPC management can&apos;t fix</span>
                </div>
                <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>
                  No agency, tool, or cadence resolves a weak offer, wrong product-market fit, or broken B2B sales follow-up on the leads you generate. If your cost-per-lead is reasonable but leads don&apos;t convert to customers, PPC management is not the constraint. Neither is switching agencies. Fix the offer or the sales process first.
                </p>
              </div>
            </section>

            {/* 8. Scaling */}
            <section id="scaling">
              <h2 style={h2Style}>Scaling In-House PPC Management Without Hiring</h2>
              <p style={pStyle}>
                The in-house manager&apos;s real constraint is hours, not knowledge.
              </p>

              {/* VISUAL 4: StatBlock pair */}
              <div className="statGrid" style={{ marginTop: '8px', marginBottom: '36px' }}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #fff7ed 0%, #fffbeb 100%)',
                    border: '1px solid #f59e0b33',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '38px', fontWeight: 800, color: '#f59e0b', lineHeight: 1.1 }}>8 to 15 hrs</div>
                  <div style={{ fontSize: '15px', color: '#475569', marginTop: '8px', lineHeight: 1.5 }}>
                    per week of manual PPC management at a $10K per month account, or $1,750 to $2,500 per month in management time at a $50/hr opportunity cost.
                  </div>
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
                    border: '1px solid #10b98133',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '38px', fontWeight: 800, color: '#10b981', lineHeight: 1.1 }}>3 to 5 hrs</div>
                  <div style={{ fontSize: '15px', color: '#475569', marginTop: '8px', lineHeight: 1.5 }}>
                    per week once automation handles the mechanical work, freeing the same operator for strategy and the monthly reallocation call.
                  </div>
                </div>
              </div>

              <style jsx>{`
                .statGrid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 16px;
                }
                @media (max-width: 600px) {
                  .statGrid {
                    grid-template-columns: 1fr;
                  }
                }
              `}</style>

              <p style={pStyle}>
                Three automation layers split the work differently:
              </p>
              <ul style={olStyle}>
                <li style={liStyle}>
                  <strong>Native rules and scripts:</strong> budget caps, anomaly alerts, impression share thresholds. Free within Google Ads and Microsoft Ads.
                </li>
                <li style={liStyle}>
                  <strong>Third-party tools</strong> (Optmyzr, Adalysis, B6): bid recommendations, search term clustering, pacing dashboards. These reduce the 60 to 90 minute weekly session to a review-and-approve workflow. For a calibrated look at what AI actually changes at the auction level,{' '}
                  <a href="/blog/ai-powered-ppc-optimization-complete-guide" style={linkStyle}>
                    our AI PPC optimization guide
                  </a>{' '}
                  covers the realistic lift numbers and where human judgment still wins.
                </li>
                <li style={liStyle}>
                  <strong>Human attention:</strong> reserved for strategy, the monthly reallocation call, and the quarterly audit.
                </li>
              </ul>
              <p style={pStyle}>
                B6 maps three <a href="/blog/google-ads-ai-agent" style={linkStyle}>agents</a> directly to the operating loop: Buzz for weekly bidding, Vox for monthly reallocation, Echo for the Monday digest.
              </p>

              <MascotQuote mascot="echo">
                I send a weekly summary: revenue change, what Buzz did, what Vox flagged, what Aegis caught. Three bullets. No PDF. You read it in 90 seconds and know whether last week was a win or a problem.
              </MascotQuote>

              <p style={pStyle}>
                The goal is the weekly 60 to 90 minute loop, run by agents and surfaced to you as deltas. The in-house operator stays in control; the mechanical hours move to automation.
              </p>
            </section>

            {/* 9. FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>What does a PPC manager do?</strong> A PPC manager runs the six recurring disciplines on a fixed cadence: research, account structure, creative, bidding, budget pacing, and measurement. In practice: a daily spend check, a weekly 60 to 90 minute loop covering search terms and bids, a monthly budget reallocation, and a quarterly audit. Google Ads Help covers platform-level tasks in{' '}
                <a href="https://support.google.com/google-ads/answer/6167118" style={linkStyle} target="_blank" rel="noopener noreferrer">
                  About campaign management
                </a>
                .
              </p>
              <p style={pStyle}>
                <strong>How much does <a href="/blog/ppc-management-cost" style={linkStyle}>PPC management cost</a>?</strong> Three cost models: agency retainers commonly run $1,500 to $5,000 per month flat or 10 to 20 percent of ad spend, whichever is higher. An in-house PPC manager costs salary (US average roughly $75K per year; see below). <a href="/blog/5-tips-for-working-with-ai-ppc-tools" style={linkStyle}>AI tools</a> like B6 run on a flat monthly subscription and extend in-house capacity without a headcount hire. At $5K in ad spend, a $1,500 agency fee equals 30 percent of total budget going to management.
              </p>
              <p style={pStyle}>
                <strong>How much do PPC managers make in the US?</strong> The US average is approximately $75,395 per year per{' '}
                <a href="https://www.indeed.com/career-advice/finding-a-job/what-is-ppc-management" style={linkStyle} target="_blank" rel="noopener noreferrer">
                  Indeed job postings
                </a>{' '}
                (updated May 2026). Senior in-house PPC managers at mid-market companies typically earn $85K to $110K. The PAA data reflects all PPC manager roles, including agency-side coordinators at the lower end of the range.
              </p>
              <p style={pStyle}>
                <strong>Is PPC harder than SEO?</strong> Different disciplines, different feedback loops. PPC delivers measurable outcomes within days of a bid or ad change. SEO operates on months-long timelines. PPC is more learnable for operators who like fast feedback; SEO compounds more over time. Neither is harder in any absolute sense; they serve different strategic functions and work best together.
              </p>
              <p style={pStyle}>
                <strong>Can you manage PPC in-house yourself?</strong> Yes. Under $20K per month in ad spend, DIY is viable with 3 to 5 hours per week plus an automation tool. Above $20K per month, the complexity of multi-channel management makes a tool or specialist worth the investment. The key is running the operating loop consistently, not firefighting reactively.
              </p>
              <p style={pStyle}>
                <strong>How often should you review a PPC account?</strong> Daily (a 5-minute spend and conversion glance), weekly (a 60 to 90 minute loop: search terms, bids, pacing, creative), monthly (a half day: budget reallocation and reporting), and quarterly (a full audit). Google Ads Help covers platform-specific monitoring options in{' '}
                <a href="https://support.google.com/google-ads/answer/2459326" style={linkStyle} target="_blank" rel="noopener noreferrer">
                  Understanding bidding basics
                </a>
                . More frequent reviews make sense if spend exceeds $50K per month or an active crisis requires daily tracking.
              </p>
            </section>

            {/* 10. B6 CTA */}
            <section id="b6-agents">
              <h2 style={h2Style}>Run Your In-House PPC Loop With B6 Agents</h2>
              <p style={pStyle}>
                The in-house alternative to an agency retainer is keeping control of the account while moving the mechanical hours to agents.
              </p>
              <p style={pStyle}>
                Three B6 agents map directly to the operating loop:
              </p>
              <p style={pStyle}>
                <a href="/b6#buzz" style={linkStyle}>
                  Buzz
                </a>{' '}
                runs the weekly bidding review. Buzz monitors CPC drift, flags top ad groups that climb above target for 3 consecutive days, and proposes a bid cut with supporting data for one-click approval.
              </p>
              <p style={pStyle}>
                <a href="/b6#vox" style={linkStyle}>
                  Vox
                </a>{' '}
                runs the monthly budget reallocation. Vox surfaces campaigns with zero conversions, calculates the misspent percentage, and proposes the shift toward exact-match clusters beating target ROAS.
              </p>
              <p style={pStyle}>
                <a href="/b6#echo" style={linkStyle}>
                  Echo
                </a>{' '}
                sends the Monday digest. Three bullets: spend vs pace, CPA delta vs last week, top wins and leaks. 90 seconds to read.
              </p>
              <p style={pStyle}>
                You keep the account access, the historical data, and the strategic decisions.
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
                  Run your first weekly loop by Monday.
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
                  Start a B6 free trial, connect Google Ads, and let Buzz, Vox, and Echo run the mechanical hours while you keep the <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>. See{' '}
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

        <KeepReading slug="ppc-management" category="ppc" />
      <Footer compact={true} />
      </div>
    </>
  );
}
