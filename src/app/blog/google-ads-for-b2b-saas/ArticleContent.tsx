'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-for-b2b-saas#article',
    headline: 'Google Ads for B2B SaaS: The Complete Operator\'s Playbook (2026)',
    description:
      'A complete operator playbook for running Google Ads for B2B SaaS: how to handle low category search volume, long sales cycles, multi-stakeholder buying, and attribution. Setup, 4-tier campaign structure, bidding progression, measurement, and scaling.',
    image: 'https://www.kampaio.com/og/google-ads-for-b2b-saas.png',
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
    datePublished: '2026-06-07T00:00:00.000Z',
    dateModified: '2026-06-07T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-for-b2b-saas',
    },
    keywords:
      'google ads for b2b saas, b2b saas ppc, offline conversion import, smart bidding, sales cycle, buying committee, pipeline-CAC, performance max, campaign structure',
    articleSection: 'B2B Marketing',
    inLanguage: 'en',
    "wordCount": 2289
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.kampaio.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.kampaio.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Google Ads for B2B SaaS',
        item: 'https://www.kampaio.com/blog/google-ads-for-b2b-saas',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Google Ads worth it for B2B SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, when your category has real bottom-funnel search demand and your LTV justifies CPCs of $8-30+ on category terms. It underdelivers for genuinely new categories where nobody searches the problem in your words yet, where demand-creation channels carry more weight early.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best bidding strategy for B2B SaaS Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with Maximize Conversions while volume is low. Move to Maximize Conversion Value once offline conversion import is wired and producing reliable pipeline values. Graduate to Target ROAS or Target CPA only after hitting Google\'s documented conversion minimums: 30 per month for Target CPA, 50 for Target ROAS.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I structure Google Ads campaigns for B2B SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use four intent tiers (brand, category/non-brand, competitor/conquest, and problem-aware) plus a remarketing layer. Keep each tier in its own campaign so budget and bidding match the very different intent, CPC range, and funnel job.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are my B2B SaaS Google Ads leads low quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually because Smart Bidding is optimizing for form-fills it cannot distinguish from junk, and the buying committee researcher fills the form instead of the economic buyer. Wire offline conversion imports so the algorithm optimizes on SQL/pipeline signal.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long before B2B SaaS Google Ads shows results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Plan for the sales cycle. On a 90-180 day cycle, expect 60-90 days before pipeline-attributed performance is readable. Offline conversion import compresses the feedback lag from 90+ days to the latency of your MQL or SQL stage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Performance Max for B2B SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only after your offline-conversion feedback loop is confirmed with SQL-weighted values. Without that signal, Performance Max scales junk at full speed.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: The Four Things That Make B2B SaaS Google Ads Different', level: 1 },
    { id: 'right-channel', title: 'Is Google Ads Even the Right Channel for Your B2B SaaS?', level: 1 },
    { id: 'account-setup', title: 'Set Up the Account Before You Touch Campaigns', level: 1 },
    { id: 'campaign-structure', title: 'The 4-Tier Campaign Structure for B2B SaaS', level: 1 },
    { id: 'bidding-strategy', title: 'Bidding Strategy for Low-Volume, Long-Cycle Accounts', level: 1 },
    { id: 'measurement', title: 'Measurement: Connect Spend to Pipeline, Not Form-Fills', level: 1 },
    { id: 'scaling', title: 'Scaling Without Wrecking Efficiency', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'autopilot', title: 'Run It on Autopilot Once the Loop Is Wired', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const para: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#1e293b',
    marginBottom: '32px',
  };
  const h2: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '24px',
    marginTop: '56px',
  };
  const linkStyle: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-for-b2b-saas" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              B2B Marketing · Google Ads
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads for B2B SaaS: The Complete Operator&apos;s Playbook (2026)
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Thin category volume, 60-180 day cycles, buying committees, and attribution gaps break the default playbook. Here is the ordered system that makes the platform work.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Senior PPC strategy at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 7, 2026 · 13 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents Toggle */}
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
            <section>
              <p style={para}>
                Google Ads for B2B SaaS is harder than B2C because four structural realities break the default playbook: thin category search volume, sales cycles stretching 60-180 days, buying committees of 6-10 people, and attribution gaps that starve Smart Bidding of the signal it needs to optimize for pipeline. Fix those four and the platform works.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2}>TL;DR: The Four Things That Make B2B SaaS Google Ads Different</h2>
              <p style={para}>
                Running Google Ads for B2B SaaS means solving four structural problems before touching campaign settings. The operator one-liner for each:
              </p>

              {/* VISUAL 1: StatBlock-style four-constraint cards (HTML/CSS grid, 4 items, 2x2 collapse) */}
              <div className="b2b-constraint-grid">
                <div className="b2b-constraint-card" style={{ borderTopColor: '#667eea' }}>
                  <div className="b2b-constraint-tag" style={{ color: '#667eea' }}>Constraint 1</div>
                  <div className="b2b-constraint-title">Low category search volume</div>
                  <div className="b2b-constraint-body">Build a 4-tier keyword architecture (brand, category, competitor, problem-aware). Google captures existing demand; it cannot create it. Set volume expectations before the CFO does.</div>
                </div>
                <div className="b2b-constraint-card" style={{ borderTopColor: '#764ba2' }}>
                  <div className="b2b-constraint-tag" style={{ color: '#764ba2' }}>Constraint 2</div>
                  <div className="b2b-constraint-title">Long sales cycles (60-180+ days)</div>
                  <div className="b2b-constraint-body">Wire offline conversion imports keyed to pipeline stages so Smart Bidding gets qualified signal months before closed-won data arrives.</div>
                </div>
                <div className="b2b-constraint-card" style={{ borderTopColor: '#f59e0b' }}>
                  <div className="b2b-constraint-tag" style={{ color: '#f59e0b' }}>Constraint 3</div>
                  <div className="b2b-constraint-title">Multi-stakeholder buying committees</div>
                  <div className="b2b-constraint-body">Gartner research documented by Brent Adamson in HBR puts the typical buying group at 6 to 10 decision makers, each with 4-5 independently gathered pieces of information. Optimize for SQL/Opportunity signals, not raw form-fills.</div>
                </div>
                <div className="b2b-constraint-card" style={{ borderTopColor: '#ef4444' }}>
                  <div className="b2b-constraint-tag" style={{ color: '#ef4444' }}>Constraint 4</div>
                  <div className="b2b-constraint-title">Attribution / Smart Bidding signal gap</div>
                  <div className="b2b-constraint-body">Last-click defaults and form-fill conversions mislead. Feed CRM revenue values back into Google via offline conversion import so value-based bidding chases pipeline, not cheap junk.</div>
                </div>
              </div>

              <p style={para}>
                The rest of this playbook is the ordered system: setup, campaign structure, bidding progression, measurement, and scaling, built around those four constraints. (<a href="https://hbr.org/2017/03/the-new-sales-imperative" style={linkStyle} target="_blank" rel="noopener noreferrer">HBR, 2017</a>.)
              </p>
            </section>

            {/* Right channel */}
            <section id="right-channel">
              <h2 style={h2}>Is Google Ads Even the Right Channel for Your B2B SaaS?</h2>
              <p style={para}>
                Google Ads works for B2B SaaS when bottom-funnel demand already exists for your category. It struggles when nobody is searching for what you do yet.
              </p>
              <p style={para}>
                The demand-capture test is simple: open Google Keyword Planner and check monthly search volume for your category terms and your competitors&apos; brand terms. If meaningful volume exists, Google Ads is a core channel for your stack. If your category is genuinely new and nobody searches the problem in your words yet, Google Search will underdeliver. Dev Basu, CEO of PoweredBySearch, puts it plainly: &quot;On average, about 20-40% of ad spend doesn&apos;t contribute to the desired outcome&quot; (<a href="https://www.poweredbysearch.com/blog/b2b-saas-google-ads-blueprint/" style={linkStyle} target="_blank" rel="noopener noreferrer">PoweredBySearch, March 2026</a>). In emerging categories, that wasted fraction climbs fast because there is no real bottom-funnel intent to capture.
              </p>
              <p style={para}>
                Google Ads is strongest for B2B SaaS categories with established commercial intent: CRM, HRIS, accounting, project management, cybersecurity. High LTV justifies the CPCs ($8-30+ on category terms) that would be irrational for B2C. Branded search protection and competitor conquest work reliably at any company stage. These are the tiers where Google earns its budget.
              </p>
              <p style={para}>
                For thin-volume emerging categories, Google Ads is a supporting channel, not the engine. Demand-creation channels carry more weight early. We compared the channel trade-offs in depth in <a href="/blog/linkedin-ads-vs-google-ads-b2b-lead-generation" style={linkStyle}>LinkedIn Ads vs Google Ads for B2B Lead Generation</a>.
              </p>
            </section>

            {/* Account setup */}
            <section id="account-setup">
              <h2 style={h2}>Set Up the Account Before You Touch Campaigns</h2>
              <p style={para}>
                The most expensive B2B SaaS Google Ads mistakes happen before the first campaign launches: bad <a href="/blog/google-ads-conversion-tracking-not-working" style={{ color: '#764ba2', textDecoration: 'underline' }}>conversion tracking</a> and no CRM feedback loop. Fix the foundation first.
              </p>

              {/* VISUAL 2: Warning callout box - the June 15 2026 migration deadline */}
              <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '20px 24px', margin: '8px 0 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '15px', fontWeight: 700, color: '#b45309' }}>
                  <span style={{ fontSize: '18px' }}>⚠️</span>
                  <span>Time-sensitive: Data Manager API migration</span>
                </div>
                <div style={{ fontSize: '17px', lineHeight: '1.7', color: '#1e293b' }}>
                  Google Ads Help states verbatim: &quot;Starting June 15, 2026, offline conversions import and enhanced conversions for leads uploads will be migrated to the Data Manager API and blocked in the Google Ads API&quot; (<a href="https://support.google.com/google-ads/answer/2998031" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). If you are on legacy GCLID-only OCI, keep GCLID import intact and add an enhanced conversions layer on top for first-party hashed matching.
                </div>
              </div>

              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '24px' }}><strong>Map your conversions to pipeline stages, not form-fills.</strong> Define what counts as a conversion at each stage: demo request, trial start, MQL, SQL. Decide which stage becomes the Smart Bidding optimization target. A form-fill is not a conversion, it is a signal candidate. On a 120-day cycle, only SQL-weighted events give the algorithm anything real to learn from.</li>
                <li style={{ marginBottom: '24px' }}><strong>Wire offline conversion import (OCI) early.</strong> Connect Google Ads to your CRM via Salesforce, HubSpot connector, or <a href="https://developers.google.com/google-ads/api/docs/conversions/upload-offline" style={linkStyle} target="_blank" rel="noopener noreferrer">GCLID upload to the Data Manager API</a>. For a 90-180 day sales cycle, OCI is non-optional: it is the only mechanism Smart Bidding has to learn what a good lead looks like before closed-won data arrives.</li>
                <li style={{ marginBottom: '24px' }}><strong>Assign conversion values that reflect revenue, not events.</strong> A demo from an ICP-fit enterprise account is worth more than a generic contact from a competitor researcher. Assign values per pipeline stage (MQL, SQL, Opportunity, Closed-Won) based on average deal value multiplied by stage-to-close rate.</li>
                <li style={{ marginBottom: '24px' }}><strong>Exclude existing customers and known junk before spend.</strong> Negative keyword list (jobs, free, courses, login, tutorial) and customer-list exclusions belong in the account on day one. B2B accounts that skip this end up training Smart Bidding on junk, the root cause covered in <a href="/blog/b2b-google-ads-low-quality-leads" style={linkStyle}>Why B2B Google Ads Produces Low-Quality Leads</a>.</li>
                <li style={{ marginBottom: '24px' }}><strong>Set learning expectations upfront.</strong> Thin-volume accounts learn slowly. Budget for the data-gathering phase. Smart Bidding cannot compress a 90-day cycle into a 30-day report.</li>
              </ol>
            </section>

            {/* Campaign structure */}
            <section id="campaign-structure">
              <h2 style={h2}>The 4-Tier Campaign Structure for B2B SaaS</h2>
              <p style={para}>
                Structure B2B SaaS Google Ads in four intent tiers (brand, category, competitor, and problem-aware) plus a remarketing layer. Each tier has a different intent, CPC range, and job in the long cycle.
              </p>

              {/* VISUAL 3: 4-tier comparison table (HTML/CSS) */}
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>Tier</th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>Example terms</th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>Intent</th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>Typical CPC (illustrative)</th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>Job in the funnel</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 600 }}>Brand</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>&quot;[your brand]&quot;, &quot;[brand] pricing&quot;</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Highest</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#10b981', fontWeight: 600 }}>Lowest ($1-4)</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Protect, capture; cheapest pipeline (watch attribution distortion)</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 600 }}>Category / non-brand</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>&quot;[category] software&quot;, &quot;best [category]&quot;</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>High commercial</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#ef4444', fontWeight: 600 }}>Highest ($8-30+)</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Core demand capture; lowest volume in emerging categories</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 600 }}>Competitor / conquest</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>&quot;[competitor] alternative&quot;, &quot;[competitor] vs&quot;</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>High, contentious</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#f59e0b', fontWeight: 600 }}>High ($6-20+)</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Capture in-market buyers; respect trademark rules and LP relevance</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 600 }}>Problem-aware</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>&quot;how to [solve problem]&quot;, &quot;[pain point] solution&quot;</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Lower</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#f59e0b', fontWeight: 600 }}>Moderate ($3-10)</td>
                      <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Feeds remarketing pool; often better as content plus retargeting than heavy direct spend</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={para}>
                The remarketing layer runs across all tiers. RLSA, Customer Match, and display retargeting nurture the buying committee across a 60-180 day cycle. Gartner research shows B2B buyers spend only 17% of their total purchase time meeting with potential suppliers (<a href="https://hbr.org/2017/03/the-new-sales-imperative" style={linkStyle} target="_blank" rel="noopener noreferrer">HBR, 2017</a>). The other 83% they are doing independent research, and remarketing is how you stay visible to all 6-10 stakeholders during that window.
              </p>
              <p style={para}>
                The brand tier carries a structural attribution trap worth naming directly. Branded search often absorbs credit from demand created elsewhere: content, LinkedIn, conference, word of mouth. The click that converts on a brand query is rarely the only touchpoint that produced the intent. Over-weighting brand in attribution inflates its apparent ROI and masks the performance of the upstream tiers funding that awareness. See <a href="/blog/google-ads-attribution-models-guide" style={linkStyle}>Google Ads Attribution Models Guide</a> for the wiring sequence.
              </p>
            </section>

            {/* Bidding strategy */}
            <section id="bidding-strategy">
              <h2 style={h2}>Bidding Strategy for Low-Volume, Long-Cycle Accounts</h2>
              <p style={para}>
                Do not start a thin-volume B2B SaaS account on Target ROAS. Smart Bidding needs conversion volume it does not have yet. Progress through bid strategies as data accumulates.
              </p>

              {/* VISUAL 4: Mermaid timeline - the bidding progression */}
              <MermaidDiagram
                chart={`timeline
    title Bid Strategy Progression as Signal Matures
    Volume is low : Maximize Conversions : Optimize on demo or trial, not raw form-fill
    OCI wired, values reliable : Maximize Conversion Value : Chase pipeline quality, not lead count
    Loop proven and stable : Target ROAS or Target CPA : 30 conv per month for tCPA, 50 for tROAS
    After any signal change : Relearn 2 to 3 weeks : Avoid budget swings above 20 percent`}
                caption="Move down the progression only when the prior stage is producing reliable signal. Premature Target ROAS on junk signal optimizes for cheap junk faster."
              />

              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '24px' }}><strong>Start with Maximize Conversions.</strong> Maximize Conversions gives the algorithm room to find converters while volume is low. Pair with a maximum CPC ceiling if spend runs ahead of conversion rate. At this stage, your bid-optimization target should be a meaningful mid-funnel event (demo request, trial start), not a raw form-fill.</li>
                <li style={{ marginBottom: '24px' }}><strong>Move to Maximize Conversion Value</strong> once you have reliable conversion values from OCI and consistent conversion volume. Value-weighted bidding now chases pipeline quality, not lead count. This is the transition that converts Smart Bidding from a cost-per-lead machine into a cost-per-pipeline machine.</li>
                <li style={{ marginBottom: '24px' }}><strong>Graduate to Target ROAS or Target CPA</strong> only when the offline-conversion feedback loop is proven and stable. Google Ads Help documents the conversion volume minimum precisely: &quot;we recommend measuring performance over longer time periods that have at least 30 conversions, such as a month or longer (50 conversions for Target ROAS)&quot; (<a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). Premature Target ROAS on junk signal does not optimize for revenue, it optimizes for cheap junk faster.</li>
                <li style={{ marginBottom: '24px' }}><strong>Re-evaluate after every signal change.</strong> New OCI mapping, revised pipeline-value definitions, or a sales-cycle shift all change what &quot;good&quot; means to the algorithm. Give the strategy 2-3 weeks to relearn after any signal change and avoid budget swings above 20% that trigger a fresh learning reset.</li>
              </ol>

              {/* VISUAL 5: MascotQuote - Buzz */}
              <MascotQuote mascot="buzz">
                On a $35K/mo B2B SaaS account in an emerging category (11 conversions a month, 120-day cycle) Target ROAS was strangling it. I rolled it back to Maximize Conversions, wired OCI so SQLs (not form-fills) became the signal, and waited. At week 6: 22 SQL-weighted conversions in 30 days, so I moved to Maximize Conversion Value. By week 10: pipeline-CAC down 31%, junk-lead rate from 68% to 29%, spend held within 8%. The fix was the signal, not the bid. (Illustrative scenario based on observed account patterns.)
              </MascotQuote>
            </section>

            {/* Measurement */}
            <section id="measurement">
              <h2 style={h2}>Measurement: Connect Spend to Pipeline, Not Form-Fills</h2>
              <p style={para}>
                CPL is a vanity metric for B2B SaaS. The metrics that matter are pipeline-CAC and LTV:CAC, and you cannot see them without a closed-loop offline-conversion feedback system.
              </p>
              <p style={para}>
                <strong>Why CPL misleads in B2B SaaS.</strong> A $65 CPL looks reasonable until sales rejects 70% of leads. Run the math: $65 CPL at 30% pipeline-fit rate produces a $217 pipeline-qualified CAC. Compare to a channel with $160 CPL at 55% fit rate: $291 pipeline-qualified CAC. Worse on CPL, better pipeline cost. Optimizing on CPL trains Google to find more cheap leads with poor fit. The buying committee compounds this: the form-filler is often a researcher, not the economic buyer.
              </p>

              {/* VISUAL 6: Inline SVG - the closed-loop OCI feedback diagram */}
              <figure style={{ margin: '8px 0 32px' }}>
                <svg viewBox="0 0 720 250" width="100%" role="img" aria-label="Closed-loop offline conversion feedback diagram: ad click flows through CRM pipeline stages MQL, SQL, Opportunity, Closed-Won, each with a revenue value, then GCLID plus stage is pushed back to Google to retrain Smart Bidding." style={{ maxWidth: '720px', display: 'block', margin: '0 auto', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  {/* Ad click node */}
                  <rect x="20" y="100" width="120" height="50" rx="8" fill="#667eea" />
                  <text x="80" y="130" textAnchor="middle" fill="white" fontSize="15" fontWeight="600">Ad click (GCLID)</text>
                  {/* arrow to pipeline */}
                  <line x1="140" y1="125" x2="180" y2="125" stroke="#94a3b8" strokeWidth="2" />
                  <polygon points="180,120 192,125 180,130" fill="#94a3b8" />
                  {/* Pipeline stages */}
                  <rect x="195" y="40" width="110" height="42" rx="8" fill="#fff" stroke="#cbd5e1" />
                  <text x="250" y="60" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="600">MQL</text>
                  <text x="250" y="75" textAnchor="middle" fill="#64748b" fontSize="11">value v1</text>
                  <rect x="320" y="40" width="110" height="42" rx="8" fill="#fff" stroke="#cbd5e1" />
                  <text x="375" y="60" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="600">SQL</text>
                  <text x="375" y="75" textAnchor="middle" fill="#64748b" fontSize="11">value v2</text>
                  <rect x="445" y="40" width="110" height="42" rx="8" fill="#fff" stroke="#cbd5e1" />
                  <text x="500" y="60" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="600">Opportunity</text>
                  <text x="500" y="75" textAnchor="middle" fill="#64748b" fontSize="11">value v3</text>
                  <rect x="570" y="40" width="120" height="42" rx="8" fill="#10b981" />
                  <text x="630" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Closed-Won</text>
                  <text x="630" y="75" textAnchor="middle" fill="#ecfdf5" fontSize="11">value v4</text>
                  {/* stage connectors */}
                  <line x1="305" y1="61" x2="320" y2="61" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="430" y1="61" x2="445" y2="61" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="555" y1="61" x2="570" y2="61" stroke="#cbd5e1" strokeWidth="2" />
                  {/* up arrow from click to pipeline row */}
                  <line x1="250" y1="100" x2="250" y2="86" stroke="#94a3b8" strokeWidth="2" />
                  <polygon points="245,90 250,80 255,90" fill="#94a3b8" />
                  {/* feedback loop back to Google */}
                  <rect x="280" y="185" width="180" height="48" rx="8" fill="#764ba2" />
                  <text x="370" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Push GCLID + stage</text>
                  <text x="370" y="222" textAnchor="middle" fill="#ede9fe" fontSize="12">back to Google (OCI)</text>
                  {/* down arrow from pipeline to feedback */}
                  <line x1="630" y1="82" x2="630" y2="160" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="630" y1="160" x2="460" y2="160" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="460" y1="160" x2="460" y2="185" stroke="#94a3b8" strokeWidth="2" />
                  <polygon points="455,180 460,190 465,180" fill="#94a3b8" />
                  {/* loop arrow from feedback back to ad click (Smart Bidding retrains) */}
                  <line x1="280" y1="209" x2="80" y2="209" stroke="#764ba2" strokeWidth="2" strokeDasharray="5,4" />
                  <line x1="80" y1="209" x2="80" y2="150" stroke="#764ba2" strokeWidth="2" strokeDasharray="5,4" />
                  <polygon points="75,156 80,146 85,156" fill="#764ba2" />
                  <text x="180" y="203" textAnchor="middle" fill="#764ba2" fontSize="11" fontWeight="600">Smart Bidding relearns</text>
                </svg>
                <figcaption style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginTop: '12px' }}>
                  The closed loop: every ad click carries a GCLID that follows the deal through CRM stages. Pushing GCLID plus stage value back to Google lets Smart Bidding see which clicks became pipeline 90 days later.
                </figcaption>
              </figure>

              <p style={para}>
                <strong>The closed loop, concretely.</strong> Push GCLID plus CRM stage back to Google as <a href="https://developers.google.com/google-ads/api/docs/conversions/overview" style={linkStyle} target="_blank" rel="noopener noreferrer">offline conversions</a> at each milestone: MQL, SQL, Opportunity, Closed-Won, each with a revenue value. Google&apos;s algorithm then sees which ad clicks became pipeline 90 days later and adjusts bids accordingly. Without it, you are paying a sophisticated <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization</a> engine to optimize for the wrong signal.
              </p>
              <p style={para}>
                <strong>Report on unit economics.</strong> Pipeline-CAC by tier, blended CAC, LTV:CAC by keyword theme. A CPL dashboard reads as noise when the sales cycle runs 120 days. A pipeline-CAC report by tier, updated monthly, becomes the decision framework the CFO will actually trust.
              </p>

              {/* Do / Avoid bullet-pair */}
              <div className="b2b-doavoid-grid">
                <div className="b2b-doavoid-card" style={{ borderTopColor: '#10b981' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#10b981', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>✓</span> Do</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.7', color: '#1e293b' }}>
                    <li style={{ marginBottom: '8px' }}>Optimize on SQL/Opportunity, not raw form-fills</li>
                    <li style={{ marginBottom: '8px' }}>Import offline conversions at every pipeline stage with differentiated values</li>
                    <li style={{ marginBottom: '8px' }}>Value-weight by ICP fit (enterprise account vs SMB vs competitor-brand lead)</li>
                    <li style={{ marginBottom: 0 }}>Report pipeline-CAC by tier monthly</li>
                  </ul>
                </div>
                <div className="b2b-doavoid-card" style={{ borderTopColor: '#ef4444' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>✕</span> Avoid</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.7', color: '#1e293b' }}>
                    <li style={{ marginBottom: '8px' }}>Optimizing on form-fills Smart Bidding cannot distinguish from junk</li>
                    <li style={{ marginBottom: '8px' }}>Judging campaigns at 30 days on a 120-day sales cycle</li>
                    <li style={{ marginBottom: 0 }}>Comparing CPL across tiers as if leads from brand, category, and problem-aware terms are equally qualified</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Scaling */}
            <section id="scaling">
              <h2 style={h2}>Scaling Without Wrecking Efficiency</h2>
              <p style={para}>
                Scale proven tiers first, expand carefully, and introduce Performance Max only after the offline-conversion loop is reliable. pMax on junk signal is the most common B2B SaaS scaling failure.
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '24px' }}><strong>Scale the proven tiers (brand, then category) before chasing new keywords.</strong> Dev Basu&apos;s documented budget split allocates 60-70% of total spend to prospecting and 10-15% to brand (<a href="https://www.poweredbysearch.com/blog/b2b-saas-google-ads-blueprint/" style={linkStyle} target="_blank" rel="noopener noreferrer">PoweredBySearch, March 2026</a>). Use this as a starting benchmark and adjust based on your pipeline-CAC by tier.</li>
                <li style={{ marginBottom: '24px' }}><strong>Expand keywords and audiences in small, measurable increments.</strong> New keyword themes get their own ad groups so signal stays readable per theme. Mixing new and proven themes in one ad group makes it impossible to isolate which terms are generating pipeline.</li>
                <li style={{ marginBottom: '24px' }}><strong>Introduce Performance Max only with the feedback loop wired.</strong> <a href="https://developers.google.com/google-ads/api/performance-max" style={linkStyle} target="_blank" rel="noopener noreferrer">Performance Max</a> optimizes hard toward whatever you define as a conversion. Feed it form-fills and it scales junk at full budget. Feed it SQL-weighted offline conversions and it can find qualified buying-committee members across Search, Display, YouTube, and Discover. See <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>Performance Max Problems in B2B Marketing</a> for the failure modes.</li>
                <li style={{ marginBottom: '24px' }}><strong>Hold bid-strategy learning stable while scaling.</strong> Simultaneous large budget increases and strategy changes stack learning resets. Scale budget on a stable strategy first, then adjust strategy once volume settles. See <a href="/blog/how-to-scale-google-ads-without-losing-roas" style={linkStyle}>How to Scale Google Ads Without Losing ROAS</a> for the sequenced approach.</li>
              </ol>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Frequently Asked Questions</h2>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Is Google Ads worth it for B2B SaaS?</h3>
              <p style={para}>Yes, when your category has real bottom-funnel search demand and your LTV justifies CPCs of $8-30+ on category terms. It underdelivers for genuinely new categories where nobody searches the problem in your words yet, where demand-creation channels carry more weight early.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>What is the best bidding strategy for B2B SaaS Google Ads?</h3>
              <p style={para}>Start with Maximize Conversions while volume is low. Move to Maximize Conversion Value once OCI is wired and producing reliable pipeline values. Graduate to Target ROAS or Target CPA only after hitting Google&apos;s documented conversion minimums: 30 per month for Target CPA, 50 for Target ROAS (<a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). Starting on tROAS with thin or junk signal optimizes for cheap junk faster.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How do I structure Google Ads campaigns for B2B SaaS?</h3>
              <p style={para}>Use four intent tiers (brand, category/non-brand, competitor/conquest, and problem-aware) plus a remarketing layer. Keep each tier in its own campaign so budget and bidding match the very different intent, CPC range, and funnel job. Mixing tiers forces one bid <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a> to serve incompatible intent signals.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Why are my B2B SaaS Google Ads leads low quality?</h3>
              <p style={para}>Usually because Smart Bidding is optimizing for form-fills it cannot distinguish from junk, and the buying committee researcher fills the form instead of the economic buyer. Wire offline conversion imports so the algorithm optimizes on SQL/pipeline signal. See the full fix in Why B2B Google Ads Produces Low-Quality Leads.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How long before B2B SaaS Google Ads shows results?</h3>
              <p style={para}>Plan for the sales cycle. On a 90-180 day cycle, expect 60-90 days before pipeline-attributed performance is readable. Offline conversion import compresses the feedback lag from 90+ days to the latency of your MQL or SQL stage.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Should I use Performance Max for B2B SaaS?</h3>
              <p style={para}>Only after your offline-conversion feedback loop is confirmed with SQL-weighted values. Without that signal, pMax scales junk at full speed. See <a href="/blog/performance-max-not-converting" style={{ color: '#764ba2', textDecoration: 'underline' }}>Performance Max Problems</a> in B2B Marketing for the failure modes and correct sequencing.</p>
            </section>

            {/* Autopilot + CTA */}
            <section id="autopilot">
              <h2 style={h2}>Run It on Autopilot Once the Loop Is Wired</h2>
              <p style={para}>
                The hard part of B2B SaaS Google Ads is not the launch. It is the ongoing discipline: catching when Smart Bidding learning stalls on thin volume, when a tier&apos;s pipeline-CAC drifts over six weeks, when a budget change resets learning in a campaign you assumed was stable. Buzz, kampaio&apos;s bid-strategy <a href="/blog/google-ads-ai-agent" style={{ color: '#764ba2', textDecoration: 'underline' }}>agent</a>, runs that monitoring continuously once your offline-conversion loop is wired, flagging learning stalls, pipeline-CAC drift, and budget-triggered resets before they compound into quarterly surprises.
              </p>
              <p style={para}>
                This does not replace the structural decisions in this playbook. It keeps them on track. The human stays in approval; the agent handles monitoring and alerting. See <a href="/pricing" style={linkStyle}>Kampaio&apos;s autonomy tiers</a> for the monitoring plans.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Wire the loop, then let an agent watch it
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Let Kampaio monitor your B2B SaaS account for learning stalls, pipeline-CAC drift, and budget-triggered resets, with a human in approval.
                </p>
                <a
                  href="/chat"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Audit My B2B SaaS Account
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. CPC ranges, conversion thresholds, and pipeline-CAC figures used as examples are illustrative ranges from practitioner data and Google&apos;s documented learning minimums. Verify all figures against your own account data before making budget decisions.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={{ ...h2, fontSize: '28px' }}>Sources</h2>
              <ol style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '12px' }}><a href="https://hbr.org/2017/03/the-new-sales-imperative" style={linkStyle} target="_blank" rel="noopener noreferrer">Adamson, B. &quot;The New B2B Sales Imperative,&quot; Harvard Business Review (2017)</a>. Gartner buying committee research: 6-10 decision makers per complex B2B purchase; 17% supplier-time stat.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/2998031" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: Import offline conversions (answer/2998031)</a>. June 15, 2026 Data Manager API migration notice; OCI setup guidance.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: About Smart Bidding (answer/7065882)</a>. Documented conversion minimums: 30/month for Target CPA, 50/month for Target ROAS.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://www.poweredbysearch.com/blog/b2b-saas-google-ads-blueprint/" style={linkStyle} target="_blank" rel="noopener noreferrer">Dev Basu, PoweredBySearch. B2B SaaS Google Ads Blueprint (March 2026)</a>. 20-40% wasted spend stat; budget allocation by tier; client SQL and conversion results.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://developers.google.com/google-ads/api/performance-max" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API: Performance Max overview</a>. Official developer documentation on Performance Max campaign types, goals, and API implementation.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://developers.google.com/google-ads/api/docs/conversions/upload-offline" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API: Manage offline conversions</a>. Technical reference for uploading offline conversions via the Data Manager API; GCLID and enhanced conversions implementation.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://developers.google.com/google-ads/api/docs/conversions/overview" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API: Conversions overview</a>. Official documentation covering conversion tracking types, upload methods, and the closed-loop feedback architecture for Smart Bidding.</li>
              </ol>
            </section>
          </div>
        </div>
        

      <KeepReading slug="google-ads-for-b2b-saas" category="b2b" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .b2b-constraint-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 8px 0 32px;
        }
        .b2b-constraint-card {
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-top: 4px solid #667eea;
          border-radius: 10px;
          padding: 20px;
        }
        .b2b-constraint-tag {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }
        .b2b-constraint-title {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .b2b-constraint-body {
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
        }
        .b2b-doavoid-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 8px 0 32px;
        }
        .b2b-doavoid-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-top: 4px solid #10b981;
          border-radius: 10px;
          padding: 20px 22px;
        }
        @media (max-width: 720px) {
          .b2b-constraint-grid {
            grid-template-columns: 1fr;
          }
          .b2b-doavoid-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
