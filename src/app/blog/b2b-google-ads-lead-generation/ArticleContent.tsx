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
    headline: 'B2B Google Ads Lead Generation: How to Build a Campaign That Feeds the Pipeline',
    description: 'B2B Google Ads requires a different structure than B2C. Here is how to set up campaigns, conversion tracking, and bidding for long sales cycles that actually produce qualified pipeline.',
    image: 'https://www.kampaio.com/og/b2b-google-ads-lead-generation.png',
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
    datePublished: '2026-05-28T00:00:00.000Z',
    dateModified: '2026-05-28T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/b2b-google-ads-lead-generation',
    },
    keywords: 'B2B Google Ads, lead generation, conversion tracking, Smart Bidding, sales cycle, offline conversions, campaign structure, TOFU MOFU BOFU, Target CPA, audience targeting, MQL SQL, cost per lead, CRM integration, value-based bidding, Kampaio',
    wordCount: 2630,
    articleSection: 'B2B Marketing',
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'B2B Google Ads Lead Generation', item: 'https://www.kampaio.com/blog/b2b-google-ads-lead-generation' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Google Ads work for B2B lead generation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B2B Google Ads generates qualified pipeline consistently for software, SaaS, and professional services companies, but only with the right structure. The problem most teams encounter is not the platform. It is setup built on B2C assumptions: wrong conversion tracking, wrong attribution window, wrong bid strategy sequence.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much should I spend on B2B Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B2B Google Ads requires a minimum of $3,000-$5,000 per month to collect enough conversion data for Smart Bidding to function. Below that threshold, conversion volume is typically insufficient for Target CPA to exit Learning Limited. BOFU-focused campaigns can work at lower budgets if keyword volume is narrow.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the average cost per lead for B2B Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B2B Google Ads CPL-form-fill ranges widely by industry and offer type. Technology and SaaS companies typically see CPL of $50-$200 for form fills. Professional services run $100-$500+. CPL-MQL will be 2-5x higher depending on your qualification rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to see results from B2B Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B2B Google Ads takes 90 days minimum before you can draw reliable conclusions on lead quality. The first 30 days are data collection. Days 30-60 are bid strategy calibration. Days 60-90 are the earliest point where pipeline data begins to reflect campaign performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Performance Max for B2B lead generation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Performance Max is a legitimate B2B tactic when scoped correctly as a retargeting and TOFU channel, not as a primary lead gen vehicle. pMax works best in B2B after Search campaigns have 60+ conversions and established quality signals.',
        },
      },
      {
        '@type': 'Question',
        name: 'What landing pages convert best for B2B Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B2B Google Ads landing pages convert best when they match the funnel stage of the keyword. BOFU keywords need pages that directly address comparison intent. MOFU keywords convert better with specific offers: free audit, ROI calculator, or a relevant case study.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I track offline conversions in Google Ads for B2B?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Offline conversion tracking in Google Ads requires four steps: enable auto-tagging, export CRM records with GCLID and conversion timestamp, format the file per Google specification, then upload via Google Ads Manager or API on a scheduled basis.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'why-b2b-fails', title: 'Why B2B Google Ads Fails Before Launch', level: 1 },
    { id: 'structural-differences', title: 'The Three Structural Differences', level: 2 },
    { id: 'conversion-tracking', title: 'Setting Up Conversion Tracking First', level: 1 },
    { id: 'campaign-structure', title: 'Campaign Structure: Funnel First', level: 1 },
    { id: 'keyword-strategy', title: 'Keyword Strategy: Intent Over Volume', level: 1 },
    { id: 'bidding-strategy', title: 'Bidding Strategy for Long Sales Cycles', level: 1 },
    { id: 'audience-targeting', title: 'Audience Targeting: The B2B Multiplier', level: 1 },
    { id: 'lead-quality-metrics', title: 'Tracking What Matters: B2B Lead Quality', level: 1 },
    { id: 'common-mistakes', title: 'Common B2B Google Ads Mistakes', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'scaling', title: 'Building a B2B Google Ads Machine That Scales', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // VISUAL 1: Smart Bidding phase timeline chart (Framer-style animated stat blocks)
  // Three phase cards: explicit 3-column grid, collapses to 1 on mobile
  const BiddingPhaseTimeline = () => (
    <div style={{ margin: '40px 0' }}>
      <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#667eea', marginBottom: '16px' }}>
        Smart Bidding Sequencing for B2B
      </p>
      <div className="bidding-phases">
        {[
          {
            phase: 'Phase 1',
            weeks: 'Weeks 1-4',
            strategy: 'Maximize Conversions',
            constraint: 'No CPA target',
            goal: 'Data collection',
            goalDetail: 'Reach 30+ conversions in 30 days',
            color: '#667eea',
            bg: '#f0f4ff',
          },
          {
            phase: 'Phase 2',
            weeks: 'Weeks 5-8',
            strategy: 'Target CPA',
            constraint: 'Set 20% above average',
            goal: 'Calibration',
            goalDetail: 'Give algorithm room to operate',
            color: '#764ba2',
            bg: '#f5f0ff',
          },
          {
            phase: 'Phase 3',
            weeks: 'Month 3+',
            strategy: 'Target ROAS',
            constraint: 'Requires deal value in CRM',
            goal: 'Value optimization',
            goalDetail: 'Optimize toward high-value leads',
            color: '#10b981',
            bg: '#ecfdf5',
          },
        ].map((item) => (
          <div
            key={item.phase}
            style={{
              background: item.bg,
              borderTop: `4px solid ${item.color}`,
              borderRadius: '10px',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: item.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{item.phase}</span>
              <span style={{ fontSize: '12px', color: '#64748b', background: 'white', padding: '3px 8px', borderRadius: '12px', fontWeight: '600' }}>{item.weeks}</span>
            </div>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>{item.strategy}</p>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '14px' }}>{item.constraint}</p>
            <div style={{ borderTop: `1px solid ${item.color}22`, paddingTop: '14px' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: item.color, marginBottom: '4px' }}>{item.goal}</p>
              <p style={{ fontSize: '13px', color: '#475569' }}>{item.goalDetail}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .bidding-phases {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .bidding-phases {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );

  // VISUAL 2: Funnel budget allocation bar chart (HTML/CSS)
  const BudgetAllocationBar = () => (
    <div style={{ margin: '40px 0', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '28px 28px 20px' }}>
      <p style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#667eea', marginBottom: '20px' }}>
        Budget Allocation by Funnel Stage (Starting Proportion)
      </p>
      {[
        { label: 'BOFU', sublabel: 'Demo, pricing, competitor, brand', pct: 55, color: '#667eea', textColor: '#fff' },
        { label: 'MOFU', sublabel: 'Solution-aware keywords', pct: 35, color: '#764ba2', textColor: '#fff' },
        { label: 'TOFU', sublabel: 'Awareness, audience building', pct: 10, color: '#a78bfa', textColor: '#fff' },
      ].map((row) => (
        <div key={row.label} style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{row.label}</span>
            <span style={{ fontSize: '14px', color: '#64748b' }}>{row.sublabel}</span>
          </div>
          <div style={{ position: 'relative', height: '36px', background: '#e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${row.pct}%`,
                background: row.color,
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '12px',
                transition: 'width 0.6s ease',
              }}
            >
              <span style={{ color: row.textColor, fontSize: '14px', fontWeight: '700' }}>{row.pct}%</span>
            </div>
          </div>
        </div>
      ))}
      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>Adjust based on pipeline data after 60 days. Most budget belongs in BOFU where buying intent is highest.</p>
    </div>
  );

  // VISUAL 3: B2B Metrics Framework (2-column callout table)
  const MetricsTable = () => (
    <div style={{ margin: '40px 0', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white', borderBottom: 'none' }}>Metric</th>
            <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white', borderBottom: 'none' }}>What It Tells You</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Impression Share', 'Competitive pressure and budget headroom'],
            ['CTR', 'Ad relevance to search query'],
            ['Conversion Rate by stage', 'Landing page quality per funnel level'],
            ['CPL-form-fill', 'Volume efficiency'],
            ['CPL-MQL', 'Lead quality relative to your ICP'],
            ['CPL-SQL', 'Sales team alignment with campaign targeting'],
            ['Pipeline-to-spend ratio', 'ROI proxy for stakeholder reporting'],
            ['Close rate by campaign', 'Long-term lead quality signal (60-90 day lag)'],
          ].map(([metric, meaning], idx) => (
            <tr key={metric} style={{ background: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
              <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#1e293b' }}>{metric}</td>
              <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', color: '#475569' }}>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // VISUAL 4: Mermaid flowchart: offline conversion import process
  const offlineConversionFlow = `flowchart LR
    A[Google Ad Click] -->|GCLID stored| B[Website Form]
    B -->|Form submit| C[CRM Lead Record]
    C -->|Qualification| D{MQL or SQL?}
    D -->|Qualified| E[Export with GCLID]
    D -->|Not qualified| F[Discard]
    E -->|Upload to Google Ads| G[Smart Bidding Signal]
    G -->|Optimizes toward| H[High-value Leads]`;

  // VISUAL 5: Five common mistakes: numbered callout cards (2+2+1 responsive grid)
  const MistakeCards = () => (
    <div style={{ margin: '40px 0' }}>
      <div className="mistake-grid-top">
        {[
          {
            num: '01',
            title: 'Tracking Form Fills as Primary Conversions',
            fix: 'Import offline SQLs within 90 days. Smart Bidding finds form-fillers, not buyers.',
            color: '#ef4444',
          },
          {
            num: '02',
            title: 'Starting Target CPA with Fewer Than 30 Conversions',
            fix: 'Start with Maximize Conversions. Set Target CPA only after 50+ conversions in 30 days.',
            color: '#f59e0b',
          },
          {
            num: '03',
            title: 'Broad Match Without Audience Overlays',
            fix: 'Always apply Customer Match or in-market audiences when using broad match in B2B.',
            color: '#f59e0b',
          },
          {
            num: '04',
            title: 'Sending All Traffic to the Homepage',
            fix: 'Every BOFU keyword cluster needs its own landing page: demo, pricing, comparison.',
            color: '#ef4444',
          },
        ].map((card) => (
          <div
            key={card.num}
            style={{
              background: 'white',
              border: `1px solid #e5e7eb`,
              borderLeft: `4px solid ${card.color}`,
              borderRadius: '10px',
              padding: '20px 22px',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: '800', color: `${card.color}22`, lineHeight: 1, marginBottom: '8px' }}>{card.num}</div>
            <p style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '10px', lineHeight: '1.4' }}>{card.title}</p>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', margin: 0 }}><strong style={{ color: card.color }}>Fix:</strong> {card.fix}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px' }}>
        <div
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderLeft: '4px solid #667eea',
            borderRadius: '10px',
            padding: '20px 22px',
          }}
        >
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#667eea22', lineHeight: 1, marginBottom: '8px' }}>05</div>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '10px', lineHeight: '1.4' }}>Launching Performance Max Before Establishing Search Baselines</p>
          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', margin: 0 }}><strong style={{ color: '#667eea' }}>Fix:</strong> Establish Search with 60+ conversions before launching pMax. Exclude your Search keywords from pMax using account-level negative lists to prevent cannibalization.</p>
        </div>
      </div>
      <style jsx>{`
        .mistake-grid-top {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 640px) {
          .mistake-grid-top {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="b2b-google-ads-lead-generation" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              B2B Marketing · Google Ads
            </div>
            <h1 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              B2B Google Ads Lead Generation: How to Build a Campaign That Feeds the Pipeline
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              B2B Google Ads works when it is built for B2B buying behavior. Most accounts are not. Here is the structural setup that feeds a real sales pipeline.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>K</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>B2B PPC Strategists</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 28, 2026 · 13 min read</span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
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
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: '1.4', borderBottom: '1px solid transparent', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#764ba2'; e.currentTarget.style.borderBottomColor = '#764ba2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
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
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
              B2B Google Ads generates pipeline when it is built for B2B buying behavior, and falls apart when it is not. Most B2B campaigns are structured for B2C outcomes: optimize for volume, measure cost-per-form-fill, declare success. This guide covers the structural setup that feeds a real sales pipeline, covering conversion tracking, campaign structure, and bid strategy sequencing.
            </p>

            {/* TL;DR callout */}
            <div style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderLeft: '4px solid #667eea', borderRadius: '10px', padding: '24px 28px', marginBottom: '48px' }}>
              <p style={{ fontSize: '15px', fontWeight: '700', color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>TL;DR</p>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#1e293b', fontSize: '16px', lineHeight: '1.7' }}>
                <li style={{ marginBottom: '10px' }}>B2B Google Ads works when you optimize for lead quality, not form fill volume. Tracking form submits as primary conversions trains Smart Bidding to find more form-fillers, not buyers.</li>
                <li style={{ marginBottom: '10px' }}>Import offline conversions from your CRM, or Smart Bidding has no signal on which clicks produced revenue.</li>
                <li style={{ marginBottom: '10px' }}>Google's default attribution window is 30 days. Most B2B deals close in 60-180 days. This mismatch causes Smart Bidding to undervalue the campaigns that actually drive pipeline.</li>
                <li style={{ marginBottom: '10px' }}>Audience layering, in-market segments plus customer match lists, tightens B2B targeting without sacrificing reach for the right buyers.</li>
              </ul>
              <p style={{ fontSize: '15px', color: '#475569', marginTop: '14px', marginBottom: 0, fontStyle: 'italic' }}>Before changing any bids, verify your conversion tracking captures lead quality signals, not just form submissions.</p>
            </div>

            {/* H2: Why B2B Fails */}
            <section id="why-b2b-fails">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                Why B2B Google Ads Fails Before the Campaign Launches
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' }}>
                B2B Google Ads campaigns fail because they are built on B2C assumptions: optimize for volume, set a 30-day attribution window, measure cost-per-form-fill. None of these hold when sales cycles run 60-180 days and three stakeholders must approve the purchase.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' }}>
                The problem is not Google Ads as a channel. Google Ads works for B2B. The problem is setup that ignores how B2B buyers actually behave. <a href="https://www.gartner.com/en/sales/insights/b2b-buying-journey" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Gartner's B2B buying journey research</a> documents 6-10 stakeholders involved in the typical B2B purchase decision. That number changes everything: your ad copy, landing page design, conversion definition, and bid strategy all need to account for a longer, more complex process than a single buyer clicking "buy now."
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Understanding this structural gap is what prevents teams from drawing the wrong conclusion, "Google Ads does not work for B2B," when the actual issue is that their account is built for the wrong buying model.
              </p>

              <section id="structural-differences">
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>
                  The Three Structural Differences (B2B vs. B2C)
                </h3>

                {/* Comparison table */}
                <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>Dimension</th>
                        <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>B2C</th>
                        <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>B2B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Sales cycle', 'Hours to days', '30-180 days'],
                        ['Decision makers', '1-2', '6-10 (Gartner)'],
                        ['Conversion signal', 'Purchase, add-to-cart', 'Form fill, demo booking, MQL/SQL'],
                        ['Attribution window', '7-30 days', '60-90 days minimum'],
                        ['Typical CPL range', '$5-$50', '$50-$500+'],
                      ].map(([dim, b2c, b2b], idx) => (
                        <tr key={dim} style={{ background: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                          <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#1e293b' }}>{dim}</td>
                          <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', color: '#475569' }}>{b2c}</td>
                          <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', color: '#475569' }}>{b2b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                  A 90-day sales cycle means your CPA data at 30 days is an incomplete picture. Smart Bidding trained on 30-day data will underbid on keywords that deliver high-value deals on a longer timeline, penalizing the campaigns that are working.
                </p>
              </section>
            </section>

            {/* H2: Conversion Tracking */}
            <section id="conversion-tracking">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Setting Up Conversion Tracking Before You Touch Bidding
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                Conversion tracking for B2B requires more than a Google Ads tag on the thank-you page. Without CRM integration and offline conversion import, Smart Bidding optimizes for form fill volume and trains itself to find people who fill out forms, not people who become customers. This is the step most teams skip, and it is why so many B2B accounts look like they are generating leads while the sales team calls them garbage.
              </p>

              {/* VISUAL 4: Offline conversion flowchart */}
              <MermaidDiagram
                chart={offlineConversionFlow}
                caption="How offline conversion import connects ad clicks to qualified CRM leads, giving Smart Bidding a revenue signal instead of a form-fill signal."
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '20px' }}>
                <strong>Step 1: Define your conversion hierarchy.</strong> Set your primary conversion as the marketing qualified lead (MQL) or sales qualified lead (SQL), depending on where your CRM handoff happens. Form fills and demo bookings are secondary conversions, track them in Google Ads as Observation only. Optimizing toward secondary conversions is the single most common B2B tracking mistake. It produces volume with no pipeline correlation.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '20px' }}>
                <strong>Step 2: Set up offline conversion import.</strong> Export CRM data (HubSpot, Salesforce, or Pipedrive) with GCLID and conversion timestamp. Import via Google Ads Manager or the Google Ads API. <a href="https://support.google.com/google-ads/answer/2998031" style={{ color: '#667eea', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">Google's offline conversion import documentation</a> covers the full technical setup. <a href="/features" style={{ color: '#667eea', textDecoration: 'underline' }}>Kampaio's offline conversion import</a> handles this process automatically, syncing CRM-qualified leads on a scheduled basis without manual file exports. Without this import, Smart Bidding is optimizing against a signal with no connection to closed revenue.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '20px' }}>
                <strong>Step 3: Extend your attribution window.</strong> Navigate to Tools &gt; Conversions &gt; Attribution model and set the lookback window to 90 days for both search and display. The 30-day default undercounts conversions from long sales cycles and causes Smart Bidding to systematically undervalue your best-performing campaigns. Our <a href="/blog/google-ads-attribution-models-guide" style={{ color: '#667eea', textDecoration: 'underline' }}>Google Ads attribution models guide</a> explains how each model affects B2B conversion credit across long buying cycles.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 4: Enable enhanced conversions for leads.</strong> Enhanced conversions use hashed first-party data (email from forms) to match conversions back to Google Ads clicks even when cookies are missing. B2B buyers research across weeks and multiple devices, enhanced conversions improve data accuracy and give Smart Bidding better signal quality throughout the learning period.
              </p>

              <MascotQuote mascot="sage">
                Audited a $8K/month B2B Search account and found 67% of form fills had no GCLID attached. Offline conversions had never been imported, which meant Smart Bidding had operated for four months with zero signal on lead quality. Recommendation: export the last 90 days of CRM-qualified leads, match each record to its GCLID, import the full batch, then wait 30 days before evaluating bid strategy changes. Check Smart Bidding status after that full learning cycle, the algorithm needs time to absorb new quality signals before the numbers tell you anything reliable. Numbers are from an illustrative account scenario.
              </MascotQuote>
            </section>

            {/* H2: Campaign Structure */}
            <section id="campaign-structure">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Campaign Structure for B2B: Funnel First, Keyword Second
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                B2B Google Ads accounts that generate pipeline are built around funnel stage, not around keyword themes. TOFU (awareness), MOFU (consideration), and BOFU (purchase and demo intent) campaigns need to be completely separate, different budgets, different bid strategies, different landing pages, different success metrics. Mixing them into one campaign is how you end up with Smart Bidding confused about what it is supposed to optimize for.
              </p>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>1. TOFU campaign:</strong> Broad match keywords around the problem space ("reduce B2B CAC", "B2B demand generation tools"). Bid strategy: Maximize Clicks or Target Impression Share. Goal: build remarketing audiences and fill the top of the funnel. Do not expect direct conversions from TOFU, audience building is the objective.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>2. MOFU campaign:</strong> Phrase and exact match keywords around solution categories ("B2B lead generation software", "Google Ads management platform"). Bid strategy: Maximize Conversions once you have 30+ conversions in the last 30 days; otherwise Maximize Clicks. Landing page: solution-specific with a concrete offer (free audit, ROI calculator, case study).
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                <strong>3. BOFU campaign:</strong> Exact match, competitor terms, brand terms, and high-intent modifiers ("pricing", "demo", "free trial", "vs [competitor]"). Bid strategy: Target CPA once conversion data is sufficient. Landing page: directly addresses comparison intent, pricing page, comparison page, or a demo-specific page. This is where 50-60% of your budget belongs.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Within each campaign, keep this ad group discipline: one theme per ad group, 10-20 tightly related keywords maximum, 3-5 Responsive Search Ads per ad group. These numbers prevent ad group sprawl from fragmenting Smart Bidding's conversion signal. For ad copy within those groups, see <a href="/blog/responsive-search-ads-best-practices" style={{ color: '#667eea', textDecoration: 'underline' }}>responsive search ads best practices</a> on pinning, asset variety, and Ad Strength signals.
              </p>

              {/* VISUAL 2: Budget allocation bar chart */}
              <BudgetAllocationBar />
            </section>

            {/* H2: Keyword Strategy */}
            <section id="keyword-strategy">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Keyword Strategy for B2B: Intent Over Volume
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                In B2B Google Ads, keyword volume is a vanity metric. A keyword with 100 monthly searches and $45 CPC that generates one $50K deal beats a keyword with 10,000 searches and $5 CPC that generates zero pipeline. This is a genuinely different mental model than what most PPC managers learned running e-commerce campaigns.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>Problem-aware searches:</strong> Queries where the buyer describes their pain ("B2B lead quality problem", "why are our Google Ads leads bad quality"). High intent, low volume. Do not skip them because Keyword Planner shows low estimates, the buyer using this language has already identified the exact problem your product solves.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>Solution-aware searches:</strong> The buyer knows a solution category exists ("B2B lead generation software", "Google Ads management for B2B"). These are your MOFU keywords and should form the core of that campaign.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>Competitor and alternative searches:</strong> The buyer has a vendor in mind and is evaluating options ("Optmyzr alternative", "WordStream pricing", "Madgicx vs"). These are your highest-intent keywords. Competitor terms in exact match belong in your BOFU campaign alongside your own brand terms.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                <strong>Negative intent filter:</strong> Queries that look relevant but signal no purchase intent ("B2B lead generation jobs", "B2B Google Ads certification", "what is B2B marketing"). Build your negative keyword list from these before launch. A disciplined <a href="/blog/google-ads-negative-keywords-best-practices" style={{ color: '#667eea', textDecoration: 'underline' }}>B2B negative keyword strategy</a> stops TOFU campaigns from burning budget on research queries and career searches.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Match type strategy for B2B: phrase match is the workhorse for MOFU (captures natural search variation without broad match chaos), exact match locks in BOFU terms, and broad match is only for TOFU with a tight audience overlay. Broad match without audience targeting in B2B is a budget risk, it serves to anyone searching the topic, including students, competitors, and job seekers. See our <a href="/blog/google-ads-keyword-match-types-explained" style={{ color: '#667eea', textDecoration: 'underline' }}>Google Ads keyword match types guide</a> for a full breakdown of how match type behavior differs in practice from the official documentation.
              </p>
            </section>

            {/* H2: Bidding Strategy */}
            <section id="bidding-strategy">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Bidding Strategy for Long Sales Cycles
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                Smart Bidding for B2B requires patience and sequencing. Starting with Target CPA is the most common setup mistake. The correct sequence: start with Maximize Conversions, let the algorithm collect 30+ conversions per month, then switch to Target CPA set above your current average. Starting Target CPA on thin conversion volume produces throttled delivery and data you cannot trust.
              </p>

              {/* VISUAL 1: Bidding phase timeline cards */}
              <BiddingPhaseTimeline />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' }}>
                <strong>Phase 1 (weeks 1-4):</strong> Maximize Conversions, no CPA target. The goal here is purely data collection. Smart Bidding needs volume before it can model a reliable CPA estimate. If your campaign enters <a href="/blog/google-ads-bid-strategy-status-limited" style={{ color: '#667eea', textDecoration: 'underline' }}>bid strategy status: limited</a>, conversion volume is the first thing to check before adjusting anything else.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' }}>
                <strong>Phase 2 (weeks 5-8):</strong> Once 30+ conversions exist in the last 30 days, move to Target CPA set 20% above the current average. Give the algorithm room to operate, setting your ideal CPA on day one constrains Smart Bidding before it has calibrated anything.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Phase 3 (month 3+):</strong> Once offline conversions are importing consistently, consider Target ROAS if your CRM tracks deal value. Value-based bidding lets Smart Bidding optimize toward high-value leads rather than any lead, the advanced play that separates top-performing B2B accounts from average ones.
              </p>

              <MascotQuote mascot="buzz">
                Reviewed a BOFU B2B campaign with a $200/day budget and Target CPA set to $80, with only 12 conversions in the last 30 days. Smart Bidding was stuck in Permanent Learning Mode: the algorithm had insufficient conversion volume to model a reliable CPA and was throttling delivery as a result. Recommendation: switch to Maximize Conversions for 60 days with no CPA constraint, collect the data, then set Target CPA at 20% above the average CPA that emerges. Specific timeline: 60 days to stable data collection, then 30 days to confirm CPA stability before tightening the target. These numbers are illustrative, not guaranteed outcomes.
              </MascotQuote>
            </section>

            {/* H2: Audience Targeting */}
            <section id="audience-targeting">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Audience Targeting: The B2B Multiplier
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                Audience layers do not replace keywords in B2B Google Ads, they multiply them. Applying in-market segments and customer match lists to Search campaigns narrows who sees your ads without reducing reach for the right buyers. Most B2B teams skip this layer entirely and wonder why their broad match campaigns are serving students.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>Customer Match:</strong> Upload your CRM's existing customer and lead lists. Apply to campaigns as an Observation layer with bid adjustments of +20-40% for known contacts or target account list matches. Customer Match applied to Search is Account-Based Marketing running directly inside Google Ads, and it is underused.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>In-market audiences:</strong> Google's B2B in-market segments are limited but functional. Relevant segments include "Business Software &amp; Services," "Enterprise Software," "CRM Software," and "Marketing Software &amp; Services." Apply as Observation (not Targeting-only, too narrow for most B2B accounts). Bid up on segments that show lower CPA in your campaign data.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px' }}>
                <strong>Remarketing by funnel stage:</strong> Segment remarketing lists by engagement depth. Website visitors (all traffic) for TOFU retargeting. Pricing page visitors for BOFU retargeting with a stronger CTA (demo, free trial). Form abandoners for MOFU retargeting with a softer offer (case study, whitepaper). Minimum audience size for remarketing in Search: 1,000 users.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Google Ads does not natively integrate LinkedIn job title targeting, but a two-channel play works well for B2B teams with the resources to run both: run a TOFU LinkedIn campaign to a content offer, then apply Google Ads Search remarketing to that traffic. The LinkedIn audience carries job title qualification; Google Search remarketing captures those same people when they express active buying intent.
              </p>
            </section>

            {/* H2: Lead Quality Metrics */}
            <section id="lead-quality-metrics">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Tracking What Matters: B2B Lead Quality Metrics
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                B2B Google Ads success is measured by cost per marketing qualified lead (CPL-MQL) or cost per sales qualified lead (CPL-SQL), not cost per form fill. Form fill CPL is a process metric. Pipeline generated is the outcome metric. These are not the same thing, and conflating them is how marketing and sales end up in the same monthly meeting talking past each other.
              </p>

              {/* VISUAL 3: Metrics table */}
              <MetricsTable />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Pipeline data from a B2B Google Ads campaign lags 60-90 days. A new campaign cannot be evaluated at 30 days, 90 days is the minimum before you can draw any conclusions on lead quality. Set this expectation with stakeholders before campaigns launch, not after your first month review produces a number nobody likes.
              </p>

              <MascotQuote mascot="echo">
                Here is the report I send every Monday morning:
                {/* Echo weekly report block */}
                <br /><br />
                <code style={{ display: 'block', background: '#1e293b', color: '#a5f3fc', padding: '16px', borderRadius: '8px', fontSize: '13px', lineHeight: '1.8', overflowX: 'auto', whiteSpace: 'pre' }}>
                  {`Week of [date] | Impressions | Clicks | CTR
CPL-form-fill (week) | CPL-MQL (30-day rolling)
Pipeline attributed (90-day rolling) | Smart Bidding status`}
                </code>
                <br />
                The 90-day pipeline column is the only number that matters to your VP Sales. Everything else on this report is a leading indicator.
              </MascotQuote>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Weekly reports worth pulling: Search Terms (to identify and add negative keywords), Auction Insights (to track competitive pressure changes), Conversions by campaign (to verify offline conversion import is running correctly).
              </p>
            </section>

            {/* H2: Common Mistakes */}
            <section id="common-mistakes">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Common B2B Google Ads Mistakes and How to Fix Them
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                The five most common B2B Google Ads mistakes are: tracking form fills as the primary conversion, starting Target CPA before collecting sufficient data, running broad match without audience overlays, sending all traffic to the homepage, and launching Performance Max before establishing Search baselines. In our experience, most struggling B2B accounts are making at least three of these simultaneously.
              </p>

              {/* VISUAL 5: Mistake cards */}
              <MistakeCards />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px', marginTop: '28px' }}>
                If you are diagnosing an existing account rather than building from scratch, the <a href="/blog/ppc-audit-checklist" style={{ color: '#667eea', textDecoration: 'underline' }}>PPC audit checklist</a> covers the structural flags that identify which of these mistakes are present before you start making changes. If your conversion data looks wrong, <a href="/blog/google-ads-conversion-tracking-not-working" style={{ color: '#667eea', textDecoration: 'underline' }}>Google Ads conversion tracking not working</a> walks through the most common GCLID and tag firing failures.
              </p>
            </section>

            {/* H2: FAQ */}
            <section id="faq">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '56px' }}>
                FAQ
              </h2>

              {[
                {
                  q: 'Does Google Ads work for B2B lead generation?',
                  a: 'B2B Google Ads generates qualified pipeline consistently for software, SaaS, and professional services companies, but only with the right structure. The problem most teams encounter is not the platform. It is setup built on B2C assumptions: wrong conversion tracking, wrong attribution window, wrong bid strategy sequence. Fix the structure and the channel performs.',
                },
                {
                  q: 'How much should I spend on B2B Google Ads?',
                  a: 'B2B Google Ads requires a minimum of $3,000-$5,000 per month to collect enough conversion data for Smart Bidding to function. Below that threshold, conversion volume is typically insufficient for Target CPA to exit Learning Limited. BOFU-focused campaigns can work at lower budgets if keyword volume is narrow, but the majority of spend should concentrate on high-intent terms.',
                },
                {
                  q: 'What is the average cost per lead for B2B Google Ads?',
                  a: 'B2B Google Ads CPL-form-fill ranges widely by industry and offer type. Technology and SaaS companies typically see CPL of $50-$200 for form fills. Professional services run $100-$500+. CPL-MQL will be 2-5x higher depending on your qualification rate. Use these as a reference range, not a performance target.',
                },
                {
                  q: 'How long does it take to see results from B2B Google Ads?',
                  a: 'B2B Google Ads takes 90 days minimum before you can draw reliable conclusions on lead quality. The first 30 days are data collection. Days 30-60 are bid strategy calibration. Days 60-90 are the earliest point where pipeline data begins to reflect campaign performance. Any evaluation before 90 days measures process metrics, not outcomes.',
                },
                {
                  q: 'Should I use Performance Max for B2B lead generation?',
                  a: 'Performance Max is a legitimate B2B tactic when scoped correctly, as a retargeting and TOFU channel, not as a primary lead gen vehicle. pMax works best in B2B after Search campaigns have 60+ conversions and established quality signals. Launching pMax first produces high impression volume and low-quality leads from display and YouTube inventory.',
                },
                {
                  q: 'What landing pages convert best for B2B Google Ads?',
                  a: 'B2B Google Ads landing pages convert best when they match the funnel stage of the keyword. BOFU keywords (demo, pricing, vs [competitor]) need pages that directly address comparison intent, no homepage redirects. MOFU keywords convert better with specific offers: free audit, ROI calculator, or a relevant case study. Every BOFU keyword cluster should have its own dedicated landing page.',
                },
                {
                  q: 'How do I track offline conversions in Google Ads for B2B?',
                  a: 'Offline conversion tracking in Google Ads requires four steps: enable auto-tagging on your Google Ads account, export CRM records (HubSpot, Salesforce, or Pipedrive) with GCLID and conversion timestamp, format the file per Google specification, then upload via Google Ads Manager or API on a scheduled basis. Imported conversions typically appear in your Conversions column within 24-48 hours.',
                },
              ].map(({ q, a }) => (
                <div key={q} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>{q}</h3>
                  <p style={{ fontSize: '17px', lineHeight: '1.7', color: '#475569', margin: 0 }}>{a}</p>
                </div>
              ))}
            </section>

            {/* H2: Scaling CTA */}
            <section id="scaling">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '56px' }}>
                Building a B2B Google Ads Machine That Scales
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                B2B Google Ads is not a quick-win channel. It is a compounding system, and the difference between accounts that scale and accounts that stall is structural setup, not budget size.
              </p>

              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '28px', marginBottom: '32px' }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>The five-part system that drives consistent pipeline:</p>
                <ol style={{ margin: 0, padding: '0 0 0 22px', color: '#475569', fontSize: '17px', lineHeight: '1.9' }}>
                  <li>Conversion tracking with offline import (SQLs, not form fills)</li>
                  <li>Funnel-staged campaign structure (TOFU, MOFU, BOFU with separate budgets)</li>
                  <li>Intent-first keyword strategy (low-volume, high-intent over vanity volume)</li>
                  <li>Properly sequenced Smart Bidding (data collection first, CPA targets second)</li>
                  <li>Lead quality metrics that align with sales (CPL-MQL, pipeline lag, 90-day view)</li>
                </ol>
              </div>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' }}>
                Kampaio's AI agents manage this system automatically, importing offline conversions from your CRM, adjusting bids by funnel stage, and flagging underperforming keywords before budget burns. At $99-$399/month versus Optmyzr's $499+, <a href="/pricing" style={{ color: '#667eea', textDecoration: 'underline' }}>Kampaio pricing vs. Optmyzr</a> makes the automation layer accessible for B2B teams that cannot justify enterprise tool pricing on a sub-$50K/month budget. See the full feature set at <a href="/features" style={{ color: '#667eea', textDecoration: 'underline' }}>Kampaio's B2B campaign automation features</a>.
              </p>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '40px' }}>
                The accounts we see generating consistent B2B pipeline from Google Ads are not running more campaigns. They are running fewer, better-instrumented campaigns.
              </p>

              {/* CTA block */}
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '24px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Ready to build a B2B pipeline, not just drive clicks?
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: '500' }}>
                  Let Kampaio's AI agents set up offline conversion imports, tune bid strategies, and surface lead quality problems before they drain your budget.
                </p>
                <a
                  href="/chat"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Analyze My B2B Account
                </a>
              </div>
            </section>

          </div>
        </div>

        <KeepReading slug="b2b-google-ads-lead-generation" category="b2b" />
      <Footer compact={true} />
      </div>
    </>
  );
}
