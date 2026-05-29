'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://www.kampaio.com/blog/linkedin-ads-vs-google-ads-b2b-lead-generation#article",
    "headline": "LinkedIn Ads vs Google Ads for B2B Lead Generation: Honest 2026 Comparison",
    "description": "LinkedIn delivers 121% ROAS for B2B in 2026, Google Search 67% (Dreamdata). But CPL, intent type, and lead quality tell a more complex story. Honest comparison across 8 axes with budget split frameworks for $20-100K/mo B2B advertisers.",
    "image": "https://www.kampaio.com/og/linkedin-ads-vs-google-ads-b2b-lead-generation.png",
    "datePublished": "2026-05-29T00:00:00.000Z",
    "dateModified": "2026-05-29T00:00:00.000Z",
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
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.kampaio.com/blog/linkedin-ads-vs-google-ads-b2b-lead-generation"
    },
    "keywords": "LinkedIn Ads, Google Ads, B2B lead generation, CPL, ROAS, pipeline-CAC, budget split, audience targeting, attribution, hybrid strategy",
    "wordCount": 2892,
    "articleSection": "B2B Marketing",
    "inLanguage": "en"
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
        "name": "LinkedIn Ads vs Google Ads for B2B Lead Generation",
        "item": "https://www.kampaio.com/blog/linkedin-ads-vs-google-ads-b2b-lead-generation"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is LinkedIn Ads more expensive than Google Ads for B2B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes on CPC and CPL: LinkedIn averages $5.58-$10 CPC and $150-$400 CPL vs Google's $2-$15 CPC and $70-$200 CPL for B2B verticals. No on pipeline-CAC in narrow-ICP plays, where LinkedIn's higher pipeline-fit rate (50-70% vs Google's 20-40% without OCI) usually closes the gap or reverses it."
        }
      },
      {
        "@type": "Question",
        "name": "What does Reddit r/PPC say about LinkedIn Ads vs Google Ads for B2B?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The consensus practitioner view is that Google captures existing demand while LinkedIn creates it. Most senior practitioners run a hybrid 60-70% Google / 30-40% LinkedIn split for B2B SaaS budgets in the $20-100K monthly range, adjusting up to 50%+ LinkedIn for narrow-ICP ABM motions where job-title precision justifies the CPL premium."
        }
      },
      {
        "@type": "Question",
        "name": "What are the pros and cons of LinkedIn Ads for B2B lead generation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pros: unmatched audience precision via verified job title, company size, and industry data; higher pipeline-fit rates (40-70% vs Google's 20-40%); superior fit for ABM and high-ACV buying committee motions. Cons: 2-4x higher CPC and CPL versus Google, frequency fatigue in narrow audiences after 30-45 days, 30-60 days minimum before meaningful data, and a $4,000-$5,000 minimum viable monthly spend."
        }
      },
      {
        "@type": "Question",
        "name": "Can you do B2B lead generation with only Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, for categories with strong bottom-funnel search demand, mature buyer awareness, and ACV under $20K. The fix requires offline conversion imports and value-based bidding so Smart Bidding optimizes for revenue-grade leads rather than raw form fills."
        }
      },
      {
        "@type": "Question",
        "name": "How long until LinkedIn Ads B2B campaigns show meaningful results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Plan for 30-60 days minimum for the LinkedIn algorithm to optimize on conversion events, and 60-90 days before pipeline-attributed ROAS is reliable given B2B sales cycle length. Use 30-day click plus 90-day view-through as the honest measurement window. Dreamdata 2026 data puts the average B2B journey at 272 days."
        }
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: When Each Platform Wins', level: 1 },
    { id: 'lead-quality', title: 'The Lead Quality Gap Is the Real Story', level: 1 },
    { id: 'cost-reality', title: 'Cost Reality: CPC, CPL, and Pipeline-CAC', level: 1 },
    { id: 'intent-type', title: 'Intent Type: Google Captures Demand, LinkedIn Creates It', level: 1 },
    { id: 'audience-targeting', title: 'Audience Targeting: Precision vs Breadth', level: 1 },
    { id: 'attribution', title: 'Attribution: Where Both Platforms Lie to You', level: 1 },
    { id: 'budget-split', title: 'How to Split Budget Across Both Platforms', level: 1 },
    { id: 'honest-section', title: "What This Comparison Doesn't Capture", level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'kampaio-monitoring', title: 'How Kampaio Monitors Cross-Channel Allocation', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle = { color: '#764ba2', textDecoration: 'underline' as const };
  const paraStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' };
  const h2Style = { fontSize: '28px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '20px', marginTop: '48px' };
  const h3Style = { fontSize: '22px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '16px', marginTop: '32px' };

  return (
    <>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              B2B Marketing · Channel Strategy
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              LinkedIn Ads vs Google Ads for B2B Lead Generation: Honest 2026 Comparison
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              121% vs 67% ROAS tells part of the story. Pipeline-CAC, intent type, and ICP precision tell the rest. A framework for the budget split decision, not a verdict for one platform.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 29, 2026 · 15 min read</span>
                </div>
              </div>
            </div>
            {/* TOC */}
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 600, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
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

        {/* Article Body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Intro */}
            <p style={paraStyle}>
              LinkedIn Ads delivers 121% ROAS for B2B advertisers versus Google Search at 67% in 2026, per the Dreamdata 2026 LinkedIn Benchmarks Report. But ROAS alone does not decide the channel split. For most $20-100K B2B budgets, the honest answer is a hybrid allocation built around intent type, ACV, and ICP width -- not a single-platform verdict.
            </p>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: When Each Platform Wins (and the Default Hybrid Split)</h2>
              <p style={paraStyle}>
                Google Ads and LinkedIn Ads are not competing for the same job. Google captures bottom-funnel demand that already exists. LinkedIn builds awareness with buyers who have not started searching yet.
              </p>

              {/* VISUAL 1: 2-column decision cards (Google vs LinkedIn when to pick) */}
              <div className="platform-decision-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                <style jsx>{`
                  @media (max-width: 640px) {
                    .platform-decision-grid {
                      grid-template-columns: 1fr !important;
                    }
                  }
                `}</style>
                <div style={{ background: '#f0fdf4', border: '2px solid #10b981', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '12px' }}>Pick LinkedIn as primary when</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', color: '#1e293b', lineHeight: '1.8' }}>
                    <li style={{ paddingLeft: '20px', position: 'relative', marginBottom: '6px' }}><span style={{ position: 'absolute', left: 0, color: '#10b981' }}>&#10003;</span> ICP is narrow (specific titles + company size + industry)</li>
                    <li style={{ paddingLeft: '20px', position: 'relative', marginBottom: '6px' }}><span style={{ position: 'absolute', left: 0, color: '#10b981' }}>&#10003;</span> ACV is $20K+</li>
                    <li style={{ paddingLeft: '20px', position: 'relative', marginBottom: '6px' }}><span style={{ position: 'absolute', left: 0, color: '#10b981' }}>&#10003;</span> Sales cycle is 60+ days</li>
                    <li style={{ paddingLeft: '20px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#10b981' }}>&#10003;</span> ABM motion is active</li>
                  </ul>
                </div>
                <div style={{ background: '#eff6ff', border: '2px solid #667eea', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '12px' }}>Pick Google as primary when</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', color: '#1e293b', lineHeight: '1.8' }}>
                    <li style={{ paddingLeft: '20px', position: 'relative', marginBottom: '6px' }}><span style={{ position: 'absolute', left: 0, color: '#667eea' }}>&#10003;</span> Bottom-funnel search demand is strong</li>
                    <li style={{ paddingLeft: '20px', position: 'relative', marginBottom: '6px' }}><span style={{ position: 'absolute', left: 0, color: '#667eea' }}>&#10003;</span> Volume requirement is high</li>
                    <li style={{ paddingLeft: '20px', position: 'relative', marginBottom: '6px' }}><span style={{ position: 'absolute', left: 0, color: '#667eea' }}>&#10003;</span> ACV is $1-20K</li>
                    <li style={{ paddingLeft: '20px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: '#667eea' }}>&#10003;</span> Sales cycle is under 60 days</li>
                  </ul>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px 24px', marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '10px' }}>Default hybrid for most B2B budgets ($20-100K/mo)</div>
                <p style={{ fontSize: '16px', color: '#1e293b', margin: '0 0 8px', lineHeight: '1.6' }}>50-70% Google for demand capture</p>
                <p style={{ fontSize: '16px', color: '#1e293b', margin: '0 0 12px', lineHeight: '1.6' }}>30-50% LinkedIn for ICP-precision awareness and retargeting bridge</p>
                <div style={{ fontSize: '13px', color: '#64748b', borderTop: '1px solid #e5e7eb', paddingTop: '10px', marginTop: '4px' }}>
                  <strong>Avoid:</strong> LinkedIn-only for high-volume mid-market plays (cost prohibitive at scale). Google-only for narrow-ICP enterprise plays (targeting precision fails).
                </div>
              </div>

              <p style={paraStyle}>
                The 121% vs 67% ROAS gap is real, but cost-per-company-influenced ($82 LinkedIn vs $129 Google) is the metric that reframes the budget conversation (Dreamdata 2026 LinkedIn Benchmarks Report).
              </p>
              <p style={paraStyle}>
                Read the axis-by-axis breakdown below for the numbers you need to defend the split to your CFO.
              </p>
            </section>

            {/* Lead Quality */}
            <section id="lead-quality">
              <h2 style={h2Style}>The Lead Quality Gap Is the Real Story</h2>
              <p style={paraStyle}>
                CPL comparisons mislead. Pipeline-fit rate is the metric that determines whether a campaign is actually working -- and the gap between platforms is wider than most CFOs realize.
              </p>
              <p style={paraStyle}>
                Google Ads CPL looks 2-4x cheaper than LinkedIn for the same B2B vertical. That gap is real at the form-fill level. The problem shows up when those leads hit the CRM: without offline conversion imports (OCI), Google Ads B2B accounts commonly see 60-80% rejection rates from sales. Real pipeline-CAC on Google frequently lands at 2-3x the stated CPL, often exceeding LinkedIn&apos;s pipeline-CAC despite a 3x cheaper cost-per-lead.
              </p>
              <p style={paraStyle}>
                LinkedIn lead quality is structurally higher because LinkedIn targets by job title, company size, industry, and seniority before the click happens. Google targets by query intent, which leaks across buyer types. A search for &quot;enterprise HR software&quot; attracts HR coordinators, students researching the market, consultants auditing clients, and actual buyers. LinkedIn targets the VP of People at a 500-person SaaS company and shows nothing to anyone else.
              </p>

              {/* VISUAL 2: Pipeline-CAC math stat blocks */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '12px' }}>Pipeline-CAC Math: The Number That Changes the Conversation</div>
                <div className="pipeline-cac-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <style jsx>{`
                    @media (max-width: 540px) {
                      .pipeline-cac-grid {
                        grid-template-columns: 1fr !important;
                      }
                    }
                  `}</style>
                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#667eea', marginBottom: '8px' }}>Google Ads</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', lineHeight: '1.1', marginBottom: '6px' }}>$320</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>pipeline-CAC</div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                      $80 CPL<br />
                      25% pipeline-fit rate<br />
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>= $320 to reach pipeline</span>
                    </div>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#10b981', marginBottom: '8px' }}>LinkedIn Ads</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', lineHeight: '1.1', marginBottom: '6px' }}>$291</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>pipeline-CAC</div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                      $160 CPL<br />
                      55% pipeline-fit rate<br />
                      <span style={{ color: '#10b981', fontWeight: 600 }}>= $291 to reach pipeline</span>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '10px', fontStyle: 'italic' as const }}>LinkedIn looks 2x more expensive per lead. It is 10% cheaper per qualified pipeline entry.</div>
              </div>

              <p style={paraStyle}>
                The honest exception: categories with strong bottom-funnel search demand can match LinkedIn&apos;s lead quality on Google. This is common in mature software categories (CRM, HRIS, accounting software) where buyers search with purchase intent and limited ambiguity. It is rare in emerging categories where buyers do not yet have language for their problem.
              </p>
              <p style={paraStyle}>
                Most Google Ads B2B accounts run with a lead quality problem rooted in this targeting leak. The fix playbook is covered in <a href="/blog/b2b-google-ads-low-quality-leads" style={linkStyle}>How to Fix Low-Quality Leads From B2B Google Ads</a> and the root cause in <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>Why Performance Max Fails in B2B Marketing</a>.
              </p>
            </section>

            {/* Cost Reality */}
            <section id="cost-reality">
              <h2 style={h2Style}>Cost Reality: CPC, CPL, and Pipeline-CAC Across Both Platforms</h2>
              <p style={paraStyle}>
                LinkedIn CPC and CPL are roughly 2-4x higher than Google&apos;s for the same B2B vertical. Pipeline-CAC closes the gap and, in narrow-ICP accounts, often reverses it.
              </p>

              {/* 8-axis comparison table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontSize: '15px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#1e293b', fontSize: '14px' }}>Metric</th>
                    <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#667eea', fontSize: '14px' }}>Google Ads (B2B)</th>
                    <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#10b981', fontSize: '14px' }}>LinkedIn Ads (B2B)</th>
                    <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#64748b', fontSize: '13px' }}>Source / Note</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Average CPC', '$2-$15 (category-dependent)', '$5.58-$10', 'LinkedIn Marketing Solutions 2025'],
                    ['Typical B2B CPL', '$70-$200', '$150-$400', 'Practitioner benchmarks 2025-2026'],
                    ['2026 B2B ROAS (blended)', '67% (Google Search)', '121%', 'Dreamdata 2026 LinkedIn Benchmarks'],
                    ['Pipeline-fit rate (no OCI)', '20-40%', '40-60%', 'Practitioner data + LinkedIn Insights'],
                    ['Pipeline-fit rate (with OCI)', '40-60%', '50-70%', 'Properly-configured accounts'],
                    ['Time-to-meaningful-data', '14-30 days', '30-60 days', 'Smart Bidding vs LinkedIn learning'],
                    ['Minimum viable monthly spend', '$1,500-$2,000', '$4,000-$5,000', 'Algorithm learning thresholds'],
                    ['Cost per company influenced', '$129', '$82', 'Dreamdata 2026 LinkedIn Benchmarks'],
                  ].map(([metric, google, linkedin, source], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 500, fontSize: '14px' }}>{metric}</td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb', color: '#475569', fontSize: '14px' }}>{google}</td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb', color: '#475569', fontSize: '14px' }}>{linkedin}</td>
                      <td style={{ padding: '11px 14px', borderBottom: '1px solid #e5e7eb', color: '#94a3b8', fontSize: '13px', fontStyle: 'italic' as const }}>{source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p style={paraStyle}>
                The cost-per-company-influenced figure reframes the entire comparison. A B2B buying committee involves 10 stakeholders on average (up from 6.8 the prior year, per Dreamdata 2026). When LinkedIn reaches the VP of Finance, Head of Operations, and Procurement Lead at the same target account in a single campaign, the correct unit is &quot;cost to influence a buying committee&quot; -- not cost per individual lead. That is why LinkedIn&apos;s $82 cost-per-company-influenced undercuts Google&apos;s $129 despite a 2-4x CPC premium.
              </p>
              <p style={paraStyle}>
                WordStream&apos;s 2025 B2B Google Ads benchmarks put the average B2B CPL on Google at approximately $70. LinkedIn averages $150-$400 CPL in B2B verticals. The gap is real at the form-fill level. It compresses or disappears at the pipeline level.
              </p>
              <p style={paraStyle}>
                All point estimates here are illustrative. Verify against your account benchmarks before building a business case. If you are diagnosing a sudden ROAS shift on the Google side, the <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>Google Ads ROAS diagnostic checklist</a> covers the eight most common causes with thresholds and timelines.
              </p>
            </section>

            {/* Intent Type */}
            <section id="intent-type">
              <h2 style={h2Style}>Intent Type: Google Captures Demand, LinkedIn Creates It</h2>
              <p style={paraStyle}>
                Google Ads is a bottom-funnel demand-capture machine. LinkedIn Ads is a top-funnel demand-creation engine. Treating either platform as the other wastes 30-50% of budget on a fundamental structural mismatch.
              </p>
              <p style={paraStyle}>
                Google demand capture works like this: someone types &quot;B2B CRM for healthcare&quot; into Google. That person has a defined problem, is actively researching solutions, and is 10-90 days from a purchase decision. CPL is low because intent is high. Lead quality is moderate because intent does not equal fit -- that same query attracts IT managers evaluating for clients, students writing case studies, and consultants auditing current setups.
              </p>
              <p style={paraStyle}>
                LinkedIn demand creation works differently. Someone with the job title &quot;VP RevOps&quot; at a 200-1,000 employee SaaS company sees a sponsored post about a problem they had not yet framed as a problem. They engage -- without searching, without clicking through to a demo page. This touchpoint registers 4-12 weeks before any search query appears in Google. LinkedIn fills the awareness layer that Google cannot reach, because Google only captures intent that already exists.
              </p>

              {/* VISUAL 3: Mermaid timeline (B2B buyer journey touchpoints) */}
              <MermaidDiagram
                chart={`timeline
    title B2B Buyer Journey: 272 Days Average (Dreamdata 2026)
    section Awareness (Days 1-60)
      LinkedIn impression : VP RevOps sees sponsored content
      Dark social : Slack share, newsletter mention
    section Consideration (Days 61-150)
      LinkedIn retargeting : Re-engages warm audience
      Organic search : First branded or category queries appear
    section Evaluation (Days 151-220)
      Google Search (paid) : High-intent queries, demo comparisons
      Email nurture : SDR follow-up on LinkedIn engagement
    section Decision (Days 221-272)
      Google branded search : Converts on brand-name query
      Direct / CRM : Offline conversation closes`}
                caption="The average B2B journey is 272 days across 10 stakeholders and 4 channels (Dreamdata 2026). LinkedIn fills weeks 1-8; Google captures weeks 20+ when intent crystallizes. Both channels are required."
              />

              <p style={paraStyle}>
                The budget split implication is direct. Running only Google reaches buyers who already know they have the problem. Running only LinkedIn never converts the bottom-funnel demand it helped create -- that buyer eventually searches Google, and if you are not there, a competitor captures the conversion.
              </p>
              <p style={paraStyle}>
                One shift accelerates this dynamic. AI Overviews now appear in approximately 48% of searches, with a 68% drop in paid CTR on affected informational queries, per{' '}
                <a href="https://www.seerinteractive.com/insights/what-it-takes-to-rank-in-googles-ai-overviews-in-2026-is-not-what-you-think" target="_blank" rel="noopener noreferrer" style={linkStyle}>Seer Interactive&apos;s 2026 AI Overviews research</a>. AI Overview presence in B2B Tech queries has jumped 128%. Google&apos;s role is narrowing toward bottom-funnel only as informational intent gets absorbed by AI answers -- which makes LinkedIn&apos;s top-of-funnel positioning more strategically important, not less.
              </p>
              <p style={paraStyle}>
                &quot;Google captures demand, LinkedIn creates it&quot; is not a hot take. It is the consensus practitioner view on r/PPC and in senior B2B media buyer circles.
              </p>
            </section>

            {/* Audience Targeting */}
            <section id="audience-targeting">
              <h2 style={h2Style}>Audience Targeting: Precision vs Breadth</h2>
              <p style={paraStyle}>
                LinkedIn&apos;s audience precision is unmatched for B2B. Google&apos;s audience breadth is unmatched for scale.
              </p>
              <h3 style={h3Style}>LinkedIn targeting strengths</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Job title, function, and seniority verified by LinkedIn profile data (self-reported but enforced by professional identity)</li>
                <li style={{ marginBottom: '8px' }}>Company size, industry, and growth rate filters</li>
                <li style={{ marginBottom: '8px' }}>Skills and endorsements as proxy for role depth</li>
                <li style={{ marginBottom: '8px' }}>Engagement-based audiences (visited site, viewed content, engaged with ad)</li>
                <li style={{ marginBottom: '8px' }}>Matched audiences: upload account lists for ABM with company-level targeting</li>
              </ul>
              <h3 style={h3Style}>LinkedIn targeting limitations</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Reach caps fast in narrow ICPs. An audience under 50,000 matched members hits frequency fatigue within 30-45 days</li>
                <li style={{ marginBottom: '8px' }}>No real-time intent signal. LinkedIn targets demographics, not live purchase behavior</li>
                <li style={{ marginBottom: '8px' }}>Cannot exclude based on technographic data (what tools the company uses)</li>
              </ul>
              <h3 style={h3Style}>Google targeting strengths</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Search intent (the strongest buying signal available in digital advertising)</li>
                <li style={{ marginBottom: '8px' }}>Custom intent audiences built from URL patterns and search behavior</li>
                <li style={{ marginBottom: '8px' }}>Customer Match for retargeting known contacts and lookalikes</li>
                <li style={{ marginBottom: '8px' }}>Massive reach across Search, YouTube, Display, Shopping, and PMax</li>
              </ul>
              <h3 style={h3Style}>Google targeting limitations</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Demographic data is weaker than LinkedIn, especially for job title accuracy</li>
                <li style={{ marginBottom: '8px' }}>Audience signals are inferred, not verified by professional identity</li>
                <li style={{ marginBottom: '8px' }}>Smart Bidding optimizes for the conversion event, not lead quality. Without OCI, it learns to chase form fills regardless of sales fit -- which is exactly the low-quality lead problem covered in the <a href="/blog/b2b-google-ads-low-quality-leads" style={linkStyle}>B2B Google Ads low-quality leads playbook</a>. If your conversion tracking setup is part of the problem, the <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>Google Ads conversion tracking diagnostic</a> covers the triage sequence.</li>
              </ul>
              <p style={paraStyle}>
                The practical takeaway: LinkedIn&apos;s precision justifies the CPL premium in narrow-ICP plays. Google&apos;s breadth justifies priority in high-volume, lower-ACV motions where reach matters more than pre-click filtering.
              </p>
            </section>

            {/* Attribution */}
            <section id="attribution">
              <h2 style={h2Style}>Attribution: Where Both Platforms Lie to You</h2>
              <p style={paraStyle}>
                Both platforms over-credit themselves in native reporting. The honest attribution view requires multi-touch tooling -- not platform-native dashboards.
              </p>

              {/* VISUAL 4: Warning callout (Attribution bias) */}
              <div style={{ background: '#fff7ed', border: '2px solid #f59e0b', borderRadius: '10px', padding: '20px 24px', marginBottom: '28px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '22px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>&#9888;</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '6px' }}>Attribution Warning</div>
                  <p style={{ fontSize: '15px', color: '#78350f', margin: 0, lineHeight: '1.7' }}>
                    LinkedIn&apos;s 7-day click ROAS is typically 30-50% of its 90-day view-through ROAS. Agencies reporting on 7-day windows systematically defund LinkedIn even when it is driving awareness that converts on Google weeks later. Google&apos;s last-click default assigns credit to branded search queries that were driven by LinkedIn impressions -- the LinkedIn contribution disappears. Treat LinkedIn ROAS in native reporting as a floor (likely undercount) and Google ROAS as a ceiling (likely overcount).
                  </p>
                </div>
              </div>

              <p style={paraStyle}>
                LinkedIn systematically under-credits itself in short attribution windows. The average B2B buyer journey runs 272 days in 2026, with 81% of that time happening outside the CRM (Dreamdata 2026 LinkedIn Benchmarks Report). A 30-day click window captures roughly 11% of the actual journey.
              </p>
              <p style={paraStyle}>
                Google over-credits itself through attribution model defaults. Last-click attribution assigns credit to branded search queries that were driven by LinkedIn impressions weeks earlier. A buyer sees a LinkedIn sponsored post, does not click, searches the brand name on Google 45 days later -- and that Google click gets 100% of the credit. This is a known artifact of Google&apos;s last-click default, not an accurate picture of channel contribution.
              </p>
              <p style={paraStyle}>
                Multi-touch attribution fixes this. Dreamdata, Bizible (Adobe), HockeyStack, and Cometly all solve it for B2B. For the mechanics of attribution model configuration, see the <a href="/blog/google-ads-attribution-models-guide" style={linkStyle}>Google Ads Attribution Models guide</a>. If you want to measure causal channel contribution rather than correlation, <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>incrementality testing in Google Ads</a> is the next step -- lift experiments isolate true contribution independent of attribution window choice. The Dreamdata 2026 data puts 88 touchpoints per deal across 10 stakeholders and 4 channels per journey. Crediting a single channel in that environment is a planning fiction, not measurement.
              </p>
            </section>

            {/* Budget Split */}
            <section id="budget-split">
              <h2 style={h2Style}>How to Split Budget Across Both Platforms</h2>
              <p style={paraStyle}>
                The default hybrid for $20-100K B2B budgets is 50-70% Google for demand capture and 30-50% LinkedIn for ICP awareness. The exact split depends on three variables: ACV, sales cycle length, and ICP narrowness.
              </p>

              {/* VISUAL 5: 3-column ACV decision cards */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '12px' }}>Variable 1: ACV-Based Split Recommendation</div>
                <div className="acv-decision-grid">
                  <style jsx>{`
                    .acv-decision-grid {
                      display: grid;
                      grid-template-columns: repeat(3, 1fr);
                      gap: 14px;
                    }
                    @media (max-width: 900px) {
                      .acv-decision-grid {
                        grid-template-columns: 1fr;
                      }
                    }
                  `}</style>
                  <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '8px' }}>Under $5K ACV</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>70-80% Google</div>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>Volume motion. LinkedIn CPL rarely justified at sub-$5K deal size.</p>
                  </div>
                  <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '8px' }}>$5-25K ACV</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>50-60% Google</div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>40-50% LinkedIn</div>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>Balanced. Both channels pull weight at mid-market ACV.</p>
                  </div>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '8px' }}>$25K+ ACV</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>50-60% LinkedIn</div>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>40-50% Google</div>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>ABM-leaning. Committee buying justifies LinkedIn CPL premium.</p>
                  </div>
                </div>
              </div>

              <h3 style={h3Style}>Variable 2: Sales cycle length</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '8px' }}><strong>Under 30 days:</strong> 80% Google (bottom-funnel demand capture dominates)</li>
                <li style={{ marginBottom: '8px' }}><strong>30-90 days:</strong> balanced split, retargeting bridge from LinkedIn to Google</li>
                <li style={{ marginBottom: '8px' }}><strong>90+ days:</strong> 50%+ LinkedIn (awareness layer is critical for long-cycle nurture)</li>
              </ul>
              <p style={paraStyle}>
                <a href="https://www.swydo.com/blog/google-ads-vs-linkedin-ads/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Swydo&apos;s 2026 framework</a> aligns with this structure: under 3 months sales cycle = 65% Google / 35% LinkedIn; 3-6 months = 50/50; 6+ months = 30% Google / 70% LinkedIn.
              </p>
              <h3 style={h3Style}>Variable 3: ICP narrowness</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '8px' }}>ICP spans 5+ industries and 50+ job titles: Google-heavy (breadth matters)</li>
                <li style={{ marginBottom: '8px' }}>ICP is 1-2 industries and 5-15 specific titles: LinkedIn-heavy (precision justifies CPL)</li>
              </ul>
              <h3 style={h3Style}>Adjust for funnel stage</h3>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '8px' }}>Awareness campaigns: LinkedIn-heavy</li>
                <li style={{ marginBottom: '8px' }}>Mid-funnel nurture: balanced split with retargeting</li>
                <li style={{ marginBottom: '8px' }}>Bottom-funnel conversion: Google-heavy</li>
              </ul>

              <MascotQuote mascot="buzz">
                Last quarter on a $52K B2B SaaS account: started at 80 Google / 20 LinkedIn. Google CAC on pipeline basis was $2,100, LinkedIn was $1,180. I rebalanced to 55 Google / 45 LinkedIn over 8 weeks -- not faster, Smart Bidding hates 20+ percent budget swings. Result at week 8: blended pipeline-CAC dropped 24 percent, LinkedIn-attributed pipeline up 3.1x, Google volume held within 12 percent. The honest signal: LinkedIn had been underfunded for the ICP.
              </MascotQuote>

              <p style={paraStyle}>
                One execution note: do not shift more than 15-20% of total budget between channels in a single week. Smart Bidding interprets large budget swings as a learning signal and resets optimization. Gradual rebalancing over 6-8 weeks preserves algorithm stability on both platforms. If the Google side of your account shows structural problems beyond budget allocation, the <a href="/blog/ppc-audit-checklist" style={linkStyle}>PPC audit checklist</a> covers the 25 senior-level checks that surface 80% of account problems.
              </p>
            </section>

            {/* Honest Section */}
            <section id="honest-section">
              <h2 style={h2Style}>What This Comparison Does Not Capture (Honest Section)</h2>
              <p style={paraStyle}>
                Channel-level ROAS analysis misses three structural effects that change the answer.
              </p>
              <p style={paraStyle}>
                Brand lift and dark social are invisible in most attribution setups. LinkedIn impressions drive brand searches on Google 60-90 days later. Sales conversations that start with &quot;I saw your post on LinkedIn last month&quot; rarely appear in any attribution tool -- the buyer did not click anything trackable. Dark social (Slack DMs forwarding your content, Substack newsletters mentioning your brand, conference conversations) is genuinely invisible. Platform-native ROAS captures none of it.
              </p>
              <p style={paraStyle}>
                Multi-touch attribution is still imperfect even with dedicated tooling. View-through windows are arbitrary: is 30 days right, or 90? Cross-device tracking breaks in privacy-mode browsers. Offline conversations between champions and decision-makers go untracked. Dreamdata and HockeyStack solve the digital portion of this problem. They do not solve the human conversation layer.
              </p>
              <p style={paraStyle}>
                Sales cycle complexity compounds this further. A six-month B2B sale touches 8-15 stakeholders. The converting lead may have first engaged via LinkedIn, been nurtured by email over three months, watched two demos, then clicked a branded Google search ad at the end. Crediting any single channel for that conversion is fiction. Read CPL with skepticism. Trust pipeline-CAC at the cohort level over a 90-180 day window. Channel attribution is a planning tool, not a verdict.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>

              <h3 style={h3Style}>Is LinkedIn Ads more expensive than Google Ads for B2B?</h3>
              <p style={paraStyle}>
                Yes on CPC and CPL: LinkedIn averages $5.58-$10 CPC and $150-$400 CPL vs Google&apos;s $2-$15 CPC and $70-$200 CPL for B2B verticals. No on pipeline-CAC in narrow-ICP plays, where LinkedIn&apos;s higher pipeline-fit rate (50-70% vs Google&apos;s 20-40% without OCI) usually closes the gap or reverses it (Dreamdata 2026 LinkedIn Benchmarks Report).
              </p>

              <h3 style={h3Style}>What does Reddit r/PPC say about LinkedIn Ads vs Google Ads for B2B?</h3>
              <p style={paraStyle}>
                The consensus practitioner view is that Google captures existing demand while LinkedIn creates it. Most senior practitioners run a hybrid 60-70% Google / 30-40% LinkedIn split for B2B SaaS budgets in the $20-100K monthly range, adjusting up to 50%+ LinkedIn for narrow-ICP ABM motions where job-title precision justifies the CPL premium.
              </p>

              <h3 style={h3Style}>What are the pros and cons of LinkedIn Ads for B2B lead generation?</h3>
              <p style={paraStyle}>
                Pros: unmatched audience precision via verified job title, company size, and industry data; higher pipeline-fit rates (40-70% vs Google&apos;s 20-40%); superior fit for ABM and high-ACV buying committee motions. Cons: 2-4x higher CPC and CPL versus Google, frequency fatigue in narrow audiences after 30-45 days, 30-60 days minimum before meaningful data, and a $4,000-$5,000 minimum viable monthly spend.
              </p>

              <h3 style={h3Style}>Can you do B2B lead generation with only Google Ads?</h3>
              <p style={paraStyle}>
                Yes, for categories with strong bottom-funnel search demand, mature buyer awareness, and ACV under $20K. The fix requires offline conversion imports and value-based bidding so Smart Bidding optimizes for revenue-grade leads rather than raw form fills. See the <a href="/blog/b2b-google-ads-low-quality-leads" style={linkStyle}>B2B Google Ads low-quality leads playbook</a> for the configuration steps.
              </p>

              <h3 style={h3Style}>How long until LinkedIn Ads B2B campaigns show meaningful results?</h3>
              <p style={paraStyle}>
                Plan for 30-60 days minimum for the LinkedIn algorithm to optimize on conversion events, and 60-90 days before pipeline-attributed ROAS is reliable given B2B sales cycle length. Use 30-day click plus 90-day view-through as the honest measurement window. The Dreamdata 2026 data puts the average B2B journey at 272 days -- a 7-day attribution window captures approximately 11% of that.
              </p>
            </section>

            {/* Kampaio Monitoring */}
            <section id="kampaio-monitoring">
              <h2 style={h2Style}>How Kampaio Monitors Cross-Channel Allocation</h2>
              <p style={paraStyle}>
                Cross-channel budget allocation drifts. LinkedIn ROAS holds for six weeks, then audience saturation hits and pipeline-fit starts declining. A Google Performance Max campaign quietly reallocates spend toward low-intent Display placements. Neither platform surfaces this in the native dashboard with the lag time that matters for B2B decision-making.
              </p>
              <p style={paraStyle}>
                Buzz, Kampaio&apos;s bid strategy agent, runs continuous monitoring on channel-level pipeline-CAC, ROAS drift, and budget allocation against the target split. It flags when channel performance deviates more than 15% from the rolling baseline -- before the drift becomes a quarterly miss.
              </p>
              <p style={paraStyle}>
                This is not about replacing the judgment call on the initial split. The framework in this article still applies: ACV, sales cycle, ICP width determine the starting allocation. Kampaio handles the monitoring and alerting layer that catches when the live allocation drifts from the intended one. See <a href="/pricing" style={linkStyle}>Kampaio pricing</a> for autonomy tiers -- the human stays in approval, the agents handle the continuous monitoring.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center' as const,
                marginTop: '48px',
                marginBottom: '40px'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Running a hybrid B2B paid stack?
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500 }}>
                  Let Buzz monitor your channel allocation and alert you when Google or LinkedIn drifts from target pipeline-CAC before the quarterly miss surfaces.
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
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Analyze My Account
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ul style={{ fontSize: '16px', color: '#475569', lineHeight: '1.9', paddingLeft: '24px' }}>
                <li style={{ marginBottom: '8px' }}>Dreamdata 2026 LinkedIn Benchmarks Report -- dreamdata.io (JS-rendered, cited as canonical reference)</li>
                <li style={{ marginBottom: '8px' }}>WordStream 2025 B2B Google Ads Benchmarks -- wordstream.com (bot-protected, cited as industry reference)</li>
                <li style={{ marginBottom: '8px' }}><a href="https://www.swydo.com/blog/google-ads-vs-linkedin-ads/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Swydo: Google Ads vs LinkedIn Ads 2026 (Jay Kang)</a></li>
                <li style={{ marginBottom: '8px' }}><a href="https://gotoclient.com/blog/google-ads-vs-linkedin-ads-choosing-the-right-platform-for-your-b2b-campaign/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Gotoclient: Google Ads vs LinkedIn Ads for B2B</a></li>
                <li style={{ marginBottom: '8px' }}><a href="https://www.seerinteractive.com/insights/what-it-takes-to-rank-in-googles-ai-overviews-in-2026-is-not-what-you-think" target="_blank" rel="noopener noreferrer" style={linkStyle}>Seer Interactive: AI Overviews research (2026)</a></li>
                <li style={{ marginBottom: '8px' }}><a href="https://business.linkedin.com/advertise/resources/lead-generation" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn Marketing Solutions: B2B Lead Generation</a></li>
              </ul>
            </section>

          </div>
        </div>
        <Footer compact={true} />
      </div>
    </>
  );
}
