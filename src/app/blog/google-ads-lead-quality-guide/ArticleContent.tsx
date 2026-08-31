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
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-lead-quality-guide#article',
    headline: 'How to Improve Lead Quality in Google Ads (Complete 2026 Guide)',
    description:
      'Google Ads sending leads that sales rejects? This guide covers what a qualified lead is, how to measure the gap, why quality drops, and the levers that fix it.',
    image: 'https://www.kampaio.com/og/google-ads-lead-quality-guide.png',
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
    datePublished: '2026-06-05T00:00:00.000Z',
    dateModified: '2026-06-05T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-lead-quality-guide',
    },
    keywords:
      'google ads lead quality, qualified lead, CPQL, pipeline-CAC, offline conversion imports, value-based bidding, B2B PPC, Smart Bidding',
    articleSection: 'B2B Marketing',
    inLanguage: 'en',
    "wordCount": 2206
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
        name: 'How to Improve Lead Quality in Google Ads',
        item: 'https://www.kampaio.com/blog/google-ads-lead-quality-guide',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can I get Google Ads to consistently produce high-quality leads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Give the algorithm a quality signal through offline conversion imports, switch to value-based bidding so it optimizes for revenue rather than volume, and tighten the form and audiences so less junk enters. Consistency comes from a weekly monitoring loop (OCI upload health, match-quality trends, MQL-to-SQL rate by ad group), not a one-time setup.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a good cost per qualified lead in B2B Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CPQL is typically 3-5x your raw CPL because most form fills do not pass the sales qualification bar. Judge it against pipeline-CAC and average contract value, not against CPL. Google requires at least 15 conversions in the last 30 days before switching Smart Bidding to a downstream goal like "qualified lead".',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Performance Max for B2B lead generation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only after a Search baseline exists and with offline conversions feeding it real lead values. On broad settings without that signal, PMax tends to maximize cheap form fills, not qualified pipeline, because it optimizes for whatever conversion signal it receives.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do Google lead form ads produce lower-quality leads than landing page forms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually yes. Lead form assets get more leads at lower CPL but lower average quality because they have less friction. Landing page forms let you add qualifying questions (company size, budget, use case) which almost always win on pipeline-valued CAC for B2B.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to improve lead quality after making changes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Offline conversion imports need roughly 14 days of stable uploads before Smart Bidding begins to recalibrate. Most accounts see meaningful quality shifts at 30-60 days. Plan for a 30-day observation window before evaluating whether the changes worked.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - The Six Levers of Google Ads Lead Quality', level: 1 },
    { id: 'qualified-lead', title: 'What Counts as a Qualified Lead (and Why Google Cannot See It)', level: 1 },
    { id: 'measure', title: 'How to Measure Lead Quality (CPL vs CPQL vs Pipeline-CAC)', level: 1 },
    { id: 'causes', title: 'Why Your Google Ads Leads Are Low Quality (The Main Causes)', level: 1 },
    { id: 'fix', title: 'How to Fix Lead Quality in Google Ads (The Six Levers)', level: 1 },
    { id: 'channel', title: 'Channel and Account Structure Decisions', level: 1 },
    { id: 'scale', title: 'How to Scale Without Lead Quality Decaying', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'kampaio', title: 'Where Kampaio Fits (Running the Quality Loop)', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const h2Style = {
    fontSize: '30px',
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: '24px',
    marginTop: '56px',
    lineHeight: '1.3',
  } as const;

  // VISUAL 1 data: two-scoreboards SVG (Google's flat count vs Sales funnel)
  const scoreboardsSvg = `
    <svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" width="100%" style="max-width:640px;height:auto" font-family="-apple-system, Segoe UI, Roboto, sans-serif">
      <rect x="8" y="8" width="296" height="304" rx="14" fill="#ffffff" stroke="#e5e7eb" stroke-width="1.5"/>
      <text x="156" y="40" text-anchor="middle" font-size="15" font-weight="700" fill="#1e293b">What Google Sees</text>
      <text x="156" y="60" text-anchor="middle" font-size="12" fill="#64748b">41 equal conversions</text>
      <g>
        <rect x="40" y="80" width="232" height="34" rx="6" fill="#f1f5f9"/>
        <rect x="40" y="122" width="232" height="34" rx="6" fill="#f1f5f9"/>
        <rect x="40" y="164" width="232" height="34" rx="6" fill="#f1f5f9"/>
        <rect x="40" y="206" width="232" height="34" rx="6" fill="#f1f5f9"/>
        <rect x="40" y="248" width="232" height="34" rx="6" fill="#f1f5f9"/>
        <text x="156" y="102" text-anchor="middle" font-size="12" fill="#475569">form_complete = 1</text>
        <text x="156" y="144" text-anchor="middle" font-size="12" fill="#475569">form_complete = 1</text>
        <text x="156" y="186" text-anchor="middle" font-size="12" fill="#475569">form_complete = 1</text>
        <text x="156" y="228" text-anchor="middle" font-size="12" fill="#475569">form_complete = 1</text>
        <text x="156" y="270" text-anchor="middle" font-size="12" fill="#475569">... all weighted the same</text>
      </g>
      <rect x="336" y="8" width="296" height="304" rx="14" fill="#ffffff" stroke="#e5e7eb" stroke-width="1.5"/>
      <text x="484" y="40" text-anchor="middle" font-size="15" font-weight="700" fill="#1e293b">What Sales Sees</text>
      <text x="484" y="60" text-anchor="middle" font-size="12" fill="#64748b">12 accepted, 29 rejected</text>
      <rect x="368" y="80" width="232" height="36" rx="6" fill="#eef2ff"/>
      <text x="484" y="103" text-anchor="middle" font-size="12.5" font-weight="600" fill="#4338ca">41 Leads (MQL)</text>
      <rect x="392" y="132" width="184" height="36" rx="6" fill="#ddd6fe"/>
      <text x="484" y="155" text-anchor="middle" font-size="12.5" font-weight="600" fill="#5b21b6">22 SQL</text>
      <rect x="416" y="184" width="136" height="36" rx="6" fill="#c7d2fe"/>
      <text x="484" y="207" text-anchor="middle" font-size="12.5" font-weight="600" fill="#3730a3">12 Opportunity</text>
      <rect x="440" y="236" width="88" height="36" rx="6" fill="#10b981"/>
      <text x="484" y="259" text-anchor="middle" font-size="12.5" font-weight="700" fill="#ffffff">4 Won</text>
      <text x="320" y="304" text-anchor="middle" font-size="11" fill="#94a3b8">The lead-quality problem lives in the gap between these two scoreboards.</text>
    </svg>
  `;

  return (
    <>
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-lead-quality-guide" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '20px',
              }}
            >
              B2B Marketing · Pillar Guide
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              How to Improve Lead Quality in Google Ads (Complete 2026 Guide)
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              The full map: what a qualified lead is, how to measure the gap between your dashboard and the CRM, why quality
              degrades, and the six levers that fix it.
            </p>
            {/* Meta Info */}
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
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 5, 2026 · 13 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents Toggle */}
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: 600,
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
                <span style={{ transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
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
        {/* Article Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Intro */}
            <section id="introduction">
              <p style={pStyle}>
                Google Ads lead quality drops when Smart Bidding optimizes for form fills instead of revenue, and when forms
                let anyone through. This guide maps the full territory: what a qualified lead is, how to measure the gap
                between your dashboard and the CRM, why quality degrades, and which six levers fix it.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR - The Six Levers of Google Ads Lead Quality</h2>
              <p style={pStyle}>
                If you already know your problem, jump to the diagnosis, the fix playbook, or the channel comparison linked
                throughout. If you want the full map first, read on.
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Define</strong> what a qualified lead means for your business before touching any settings.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Measure</strong> the gap between form fills and pipeline using CPL, CPQL, and pipeline-CAC.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Diagnose</strong> why quality is dropping - Smart Bidding, PMax, forms, match types, or channel fit.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Pull the bidding and audience levers</strong> to fix it - offline conversions, value-based bidding,
                  exclusions.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Decide the right channel and account structure</strong> for your funnel stage.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Scale without quality decaying</strong> by running a weekly monitoring loop.
                </li>
              </ol>
            </section>

            {/* Qualified lead */}
            <section id="qualified-lead">
              <h2 style={h2Style}>What Counts as a Qualified Lead (and Why Google Cannot See It)</h2>
              <p style={pStyle}>
                A qualified lead matches your ICP, has buying authority, real intent, and a timeline. Google Ads sees none of
                that. It sees a <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '16px' }}>form_complete</code> event, weighted the same whether a VP of
                Engineering or a student filled it in.
              </p>
              <p style={pStyle}>
                Frameworks like BANT, CHAMP, and MEDDIC give you useful scaffolding for deciding what &quot;good&quot; looks like. The
                specifics of each framework are a sales ops topic, not a Google Ads one. What matters here is translating
                whichever framework you use into a signal Google can receive - either through offline conversion imports or
                through form-level filtering.
              </p>

              {/* VISUAL 1: Two scoreboards illustration */}
              <InlineSVG
                svg={scoreboardsSvg}
                maxWidth={680}
                ariaLabel="Two scoreboards: Google counts 41 equal form completions while sales sees a funnel narrowing from 41 leads to 4 won deals"
                caption="Google counts every form_complete as one equal conversion. Sales tracks MQL to SQL to Opportunity to Won. Lead quality lives in the gap."
              />

              <p style={pStyle}>
                The core mechanic behind every lead quality problem is this: Smart Bidding counts every{' '}
                <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '16px' }}>form_complete</code> as one equal conversion. Sales tracks MQL to SQL to Opportunity to Won. The
                lead-quality problem lives in the distance between those two scoreboards. Google Ads Help recommends
                value-based bidding as best practice for closing this gap, because it gives the algorithm something closer to
                the sales scoreboard to optimize against (
                <a href="https://support.google.com/google-ads/answer/13489421?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">
                  Google Ads Help, 2024
                </a>
                ).
              </p>
              <p style={pStyle}>
                Pete Bowen, a practitioner who has written on this topic, puts it plainly: &quot;Right now very few businesses take
                advantage of this feedback system.&quot; He cites a survey where only 13% of businesses were sending any quality
                feedback to Google via offline conversions. That number is consistent with what the algorithm outputs when it
                receives no feedback: it fills your form, repeatedly.
              </p>

              <MascotQuote mascot="sage">
                On a $32K/mo B2B account I scanned last cycle: 41 form fills, sales accepted 12. That is a 71% rejection rate.
                But Google saw 41 conversions of equal value, so Smart Bidding was bidding hardest on the ad groups producing
                the most junk. Defining the qualified lead is step zero - until Google knows what &quot;good&quot; looks like, every
                other lever fights the algorithm.
              </MascotQuote>
            </section>

            {/* Measure */}
            <section id="measure">
              <h2 style={h2Style}>How to Measure Lead Quality (CPL vs CPQL vs Pipeline-CAC)</h2>
              <p style={pStyle}>
                You cannot improve what you measure as form fills. The first real fix is switching the scoreboard - from
                cost-per-lead to cost-per-qualified-lead and pipeline-CAC.
              </p>
              <p style={pStyle}>Three metrics, each revealing something different about the same spend:</p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}>
                  <strong>CPL (cost per lead)</strong> - cost per raw form fill. In B2B, this is a vanity metric. Lower CPL
                  usually means broader targeting, which means more junk.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>CPQL (cost per qualified lead)</strong> - cost per sales-accepted lead. This is the honest
                  efficiency number.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Pipeline-CAC (cost per opportunity created)</strong> - cost to generate one pipeline opportunity.
                  The metric the CFO cares about, and the one that connects ad spend to revenue forecasts.
                </li>
              </ul>
              <p style={pStyle}>The table below shows the same account through all three lenses. Numbers are illustrative.</p>

              {/* VISUAL 2: Three-metric comparison table */}
              <ComparisonTable
                headers={['Metric', 'What it counts', 'Example value', 'What it hides']}
                rows={[
                  { cells: ['CPL (cost per lead)', 'Every form fill', '$142', 'That ~70% get rejected by sales'] },
                  {
                    cells: [
                      'CPQL (cost per qualified lead)',
                      'Sales-accepted leads only',
                      '$470',
                      'Nothing - this is the honest efficiency number',
                    ],
                    highlight: true,
                  },
                  {
                    cells: [
                      'Pipeline-CAC',
                      'Cost per opportunity created',
                      '$1,900',
                      'The time lag between click and pipeline',
                    ],
                  },
                ]}
                caption="The same account through three lenses. Illustrative numbers, not universal benchmarks."
              />

              <p style={pStyle}>
                CPQL and pipeline-CAC require offline conversion data flowing back from your CRM. If that data is not flowing
                yet, the measurement problem and the fix problem are the same problem. For benchmarks on what these numbers
                look like by industry and account size, see our{' '}
                <a href="/blog/b2b-saas-google-ads-benchmarks-2026" style={linkStyle}>
                  B2B SaaS Google Ads benchmarks for 2026
                </a>
                .
              </p>
              <p style={pStyle}>
                Chelsea So at Search Engine Land puts the root cause simply: &quot;When you only track a single point of
                conversion, like a form submission, you open the door to junk data and ultimately waste ad spend&quot; (
                <a href="https://searchengineland.com/improve-ppc-lead-quality-431009" style={linkStyle} target="_blank" rel="noopener noreferrer">
                  Search Engine Land, Jun 2025
                </a>
                ). The three-metric scorecard is how you stop doing that.
              </p>
              <p style={pStyle}>
                If you are also building out the broader campaign foundation that feeds this funnel, our guide to{' '}
                <a href="/blog/b2b-google-ads-lead-generation" style={linkStyle}>
                  B2B Google Ads lead generation
                </a>{' '}
                covers the campaign structure and bidding setup that makes these metrics meaningful from the start.
              </p>
            </section>

            {/* Causes */}
            <section id="causes">
              <h2 style={h2Style}>Why Your Google Ads Leads Are Low Quality (The Main Causes)</h2>
              <p style={pStyle}>
                Low-quality leads come from five recurring causes. Most B2B accounts have three of them running
                simultaneously - and the tricky part is that they tend to reinforce each other.
              </p>

              {/* VISUAL 3: Custom HTML numbered cause cards (stacked, no orphan risk) */}
              <div className="cause-stack">
                <div className="cause-card">
                  <span className="cause-num">1</span>
                  <div>
                    <strong>Smart Bidding has no quality feedback.</strong> Without offline conversion imports, Google
                    optimizes for form count, not revenue. As Zach Lunebach of JumpFly puts it: &quot;When you reward the wrong
                    actions, Google gets really good at getting you the wrong actions&quot; (
                    <a href="https://www.jumpfly.com/blog/3-ways-to-improve-lead-quality-in-google-ads/" style={linkStyle} target="_blank" rel="noopener noreferrer">
                      JumpFly, Oct 2025
                    </a>
                    ). The fix is closing the feedback loop - covered in the lever section below.
                  </div>
                </div>
                <div className="cause-card">
                  <span className="cause-num">2</span>
                  <div>
                    <strong>Performance Max distributes budget across broad audiences.</strong> In B2B, PMax often serves
                    Display and Demand Gen placements that convert window-shoppers and job-seekers, not buyers with budget and
                    authority. The problem is structural: PMax optimizes for whatever conversion signal you give it, and
                    without a quality signal, it chases volume. We break down exactly why in our{' '}
                    <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>
                      diagnosis of Performance Max problems in B2B marketing
                    </a>
                    .
                  </div>
                </div>
                <div className="cause-card">
                  <span className="cause-num">3</span>
                  <div>
                    <strong>The form does not qualify.</strong> A four-field form with no business-email gate and no
                    qualifying questions accepts Gmail addresses, students, and freelancers. Every person who submits it
                    counts as a conversion Google gets credit for. Adding a company-size question or requiring a business
                    email domain cuts volume but almost always improves CPQL.
                  </div>
                </div>
                <div className="cause-card">
                  <span className="cause-num">4</span>
                  <div>
                    <strong>Match types are too broad without maintenance.</strong> Broad match without a weekly negative
                    keyword review lets unrelated queries burn budget. The search terms report shows exactly which queries are
                    firing - a 20-minute weekly check typically surfaces several high-volume terms with no B2B fit.
                  </div>
                </div>
                <div className="cause-card">
                  <span className="cause-num">5</span>
                  <div>
                    <strong>Wrong channel for the intent stage.</strong> Google Ads captures existing demand. Some B2B
                    segments need demand creation first - audiences that do not yet know they have the problem your product
                    solves. Sending demand-creation budget to a demand-capture channel produces low-quality leads structurally.
                    The channel section below covers this.
                  </div>
                </div>
              </div>
            </section>

            {/* Fix */}
            <section id="fix">
              <h2 style={h2Style}>How to Fix Lead Quality in Google Ads (The Six Levers)</h2>
              <p style={pStyle}>
                The fix is a feedback loop: tell Google which leads are real, make it bid for revenue instead of volume, then
                tighten the funnel so less junk gets in. Google Ads Help endorses this sequence, recommending value-based
                bidding - Maximize Conversion Value or tROAS - as the best practice for high-quality lead generation once
                quality data is flowing (
                <a href="https://support.google.com/google-ads/answer/13489421?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">
                  Google Ads Help, 2024
                </a>
                ).
              </p>

              {/* VISUAL 4: Mermaid flowchart LR - the feedback loop sequence */}
              <MermaidDiagram
                chart={`flowchart LR
  A["Capture GCLID<br/>at form fill"] --> B["Store stage<br/>in CRM"]
  B --> C["Upload MQL / SQL / Won<br/>back to Google (OCI)"]
  C --> D["Switch to<br/>value-based bidding"]
  D --> E["Tighten form<br/>+ audiences"]
  E --> F["Weekly<br/>monitoring loop"]
  F -.-> C`}
                caption="The six levers form a loop: real lead data flows back, bidding chases value, the funnel tightens, and a weekly loop keeps it honest."
              />

              <p style={pStyle}>
                Each lever below is one paragraph. The thresholds, setup sequence, and exact per-stage values live in the fix
                playbook - linked at the end of this section.
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '20px' }}>
                  <strong>Offline conversion imports (OCI).</strong> Capture the GCLID at form fill, store it in your CRM, and
                  upload stage updates (MQL, SQL, Won) back to Google. The upload fails silently if GCLID is not stored at
                  submission time - that is the prerequisite to verify first. Before setting up OCI, make sure your conversion
                  tracking foundation is solid: our{' '}
                  <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>
                    Google Ads conversion tracking troubleshooting guide
                  </a>{' '}
                  covers the GCLID capture failures and tag issues that silently break imports. Google reports that
                  advertisers using Enhanced Conversions for Leads achieve on average 10% more conversions than measured with
                  standard offline import (
                  <a href="https://support.google.com/google-ads/answer/13489421?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Google Ads Help, 2024
                  </a>
                  ).
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <strong>Value-based bidding.</strong> Switch from Maximize Conversions to Maximize Conversion Value with
                  per-stage values, then add Target ROAS once value data stabilizes. This works if you have at least 15
                  conversions in the last 30 days and can assign distinct monetary values per stage. A practical starting
                  point when exact revenue data is unavailable: $10 for MQL, $200 for SQL, $1,500 for Closed Won (JumpFly
                  recommendation) - giving Smart Bidding a business-value gradient without requiring real revenue figures.
                </li>
              </ol>

              <MascotQuote mascot="buzz">
                After OCI fed real stage data on a $48K account, I switched the top spender from Maximize Conversions to
                Maximize Conversion Value. I assigned form_complete = $1, SQL = $100, Won = $2,500. Over 30 days form fills
                fell 28%, but SQLs rose 19% and revenue-CAC dropped from $2,840 to $1,610. Fewer leads, more pipeline. That is
                the trade you want.
              </MascotQuote>

              <ol start={3} style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '20px' }}>
                  <strong>Audience exclusions.</strong> Cut job-seekers, freelancers, students, and competitors at the
                  campaign level. Exclusions do not fix the bidding problem on their own, but they reduce how much junk can
                  enter while OCI is still learning.
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <strong>Form filtering.</strong> Require a business email and add a company-size or use-case question. Lower
                  raw volume is the tradeoff; for B2B accounts with ACV above $10K it almost always improves pipeline-CAC.
                  Lead form assets produce more leads at lower CPL than landing page forms, but at lower quality because they
                  have less friction. Landing page forms allow the qualifying questions that win on pipeline-valued CAC.
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <strong>Negative keyword hygiene.</strong> Mine the search terms report weekly and add wrong-intent queries
                  as negatives. This is the most time-efficient lever for accounts where broad match without maintenance is
                  the primary driver.
                </li>
                <li style={{ marginBottom: '20px' }}>
                  <strong>Lead form match-quality monitoring.</strong> Google&apos;s match-quality signal surfaces which ad
                  groups are attracting wrong-intent queries relative to your landing page. Monitoring this weekly lets you
                  catch audience drift before it compounds into a CPQL problem.
                </li>
              </ol>
              <p style={pStyle}>
                Each lever has thresholds, timelines, and a setup sequence. The full six-step playbook - with exact per-stage
                values, the 14-day OCI window, and the match-quality cutoffs - lives in our{' '}
                <a href="/blog/b2b-google-ads-low-quality-leads" style={linkStyle}>
                  deep-dive on fixing low-quality B2B leads from Google Ads
                </a>
                .
              </p>
            </section>

            {/* Channel */}
            <section id="channel">
              <h2 style={h2Style}>Channel and Account Structure Decisions</h2>
              <p style={pStyle}>
                Sometimes the lead-quality fix is not inside the campaign at all - it is choosing the right channel and
                isolating campaign types so audiences stop leaking across them.
              </p>
              <p style={pStyle}>
                <strong>Account structure:</strong> Isolate by intent. Run Search for commercial-intent terms. Add Performance
                Max only after a Search baseline exists, and only with OCI feeding it real lead values. Mixing PMax, Search,
                Display, and Demand Gen on broad settings lets audience signals contaminate each other - PMax pulls audience
                data from Display placements and applies it to Search inventory. The rebuild order for a damaged account is
                covered in our{' '}
                <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>
                  Performance Max problems diagnosis for B2B
                </a>
                .
              </p>

              {/* VISUAL 5: Custom HTML 2-column channel decision grid */}
              <div className="channel-grid">
                <div className="channel-card" style={{ borderTop: '4px solid #667eea' }}>
                  <h3 className="channel-h">Google Ads</h3>
                  <p className="channel-sub">Captures existing demand</p>
                  <ul className="channel-list">
                    <li>High intent, lower CPL</li>
                    <li>Bounded by search volume</li>
                    <li>Best for commercial-intent terms</li>
                    <li>Owns the demand-capture stage</li>
                  </ul>
                </div>
                <div className="channel-card" style={{ borderTop: '4px solid #764ba2' }}>
                  <h3 className="channel-h">LinkedIn Ads</h3>
                  <p className="channel-sub">Creates demand</p>
                  <ul className="channel-list">
                    <li>Precise firmographic targeting</li>
                    <li>Higher CPL, often higher quality</li>
                    <li>Best for niche B2B segments</li>
                    <li>Owns the top-of-funnel stage</li>
                  </ul>
                </div>
              </div>

              <p style={pStyle}>
                <strong>Channel:</strong> Google Ads captures existing demand - high intent, lower CPL, bounded by search
                volume. LinkedIn Ads creates demand with precise firmographic targeting - higher CPL, often higher lead
                quality for niche B2B segments. For most accounts the answer is both: Search for commercial-intent terms,
                LinkedIn for top-of-funnel. The question is which channel owns which stage, and whether the pipeline-fit rate
                justifies the CPL at each.
              </p>
              <p style={pStyle}>
                We put both platforms through the CPC, CPL, and pipeline-CAC math in our{' '}
                <a href="/blog/linkedin-ads-vs-google-ads-b2b-lead-generation" style={linkStyle}>
                  full comparison of LinkedIn Ads vs Google Ads for B2B lead generation
                </a>
                .
              </p>
            </section>

            {/* Scale */}
            <section id="scale">
              <h2 style={h2Style}>How to Scale Without Lead Quality Decaying</h2>
              <p style={pStyle}>
                Getting leads qualified is only half the job. The failure mode flips once you start scaling - budget increases
                have a way of undoing everything you just fixed. Lead quality is not set-and-forget.
              </p>
              <p style={pStyle}>Three specific reasons quality decays when you scale:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}>
                  <strong>OCI API tokens rotate and uploads stall silently.</strong> Smart Bidding does not alert you when
                  quality data stops flowing. Conversion volume stays up while CPQL climbs week over week - the dashboard
                  looks fine until it does not.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Sales stops updating CRM stages.</strong> When reps stop marking SQLs or setting close dates, the
                  quality signal you upload to Google becomes noise. Stale data trains the algorithm just as readily as
                  accurate data.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Budget increases push the algorithm into looser audiences.</strong> Smart Bidding exhausts
                  high-value signals and expands to find volume. Without tightening negative keyword coverage and audience
                  exclusions alongside the budget increase, quality drifts even as conversion volume climbs.
                </li>
              </ol>
              <div
                style={{
                  background: '#fffbeb',
                  borderLeft: '4px solid #f59e0b',
                  borderRadius: '8px',
                  padding: '20px 24px',
                  marginBottom: '40px',
                  fontSize: '17px',
                  lineHeight: '1.7',
                  color: '#1e293b',
                }}
              >
                The prevention is a weekly quality loop: track MQL-to-SQL rate by ad group, lead form match-quality trend, and
                OCI upload health. <strong>Catching drift at week two costs a bid adjustment. Catching it at week eight costs a
                budget cut and a learning period reset.</strong> Those are meaningfully different outcomes.
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
                  How can I get Google Ads to consistently produce high-quality leads?
                </p>
                <p style={pStyle}>
                  Give the algorithm a quality signal through offline conversion imports, switch to value-based bidding so it
                  optimizes for revenue rather than volume, and tighten the form and audiences so less junk enters.
                  Consistency comes from a weekly monitoring loop - OCI upload health, match-quality trends, MQL-to-SQL rate by
                  ad group - not a one-time setup.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
                  What is a good cost per qualified lead in B2B Google Ads?
                </p>
                <p style={pStyle}>
                  CPQL is typically 3-5x your raw CPL because most form fills do not pass the sales qualification bar. Judge it
                  against pipeline-CAC and average contract value, not against CPL. For benchmarks by vertical, see our{' '}
                  
                    B2B SaaS Google Ads benchmarks for 2026
                  
                  . Google requires at least 15 conversions in the last 30 days before switching Smart Bidding to a downstream
                  goal like &quot;qualified lead&quot; (
                  <a href="https://support.google.com/google-ads/answer/13489421?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Google Ads Help, 2024
                  </a>
                  ).
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
                  Should I use Performance Max for B2B lead generation?
                </p>
                <p style={pStyle}>
                  Only after a Search baseline exists and with offline conversions feeding it real lead values. On broad
                  settings without that signal, PMax tends to maximize cheap form fills, not qualified pipeline, because it
                  optimizes for whatever conversion signal it receives. For a full breakdown of where PMax breaks down in B2B
                  accounts, see our{' '}
                  <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>
                    Performance Max problems diagnosis
                  </a>
                  .
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
                  Do Google lead form ads produce lower-quality leads than landing page forms?
                </p>
                <p style={pStyle}>
                  Usually yes. Lead form assets get more leads at lower CPL but lower average quality because they have less
                  friction. Landing page forms let you add qualifying questions - company size, budget, use case - which almost
                  always win on pipeline-valued CAC for B2B. The CPL looks worse; the pipeline-CAC usually looks better.
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>
                  How long does it take to improve lead quality after making changes?
                </p>
                <p style={pStyle}>
                  Offline conversion imports need roughly 14 days of stable uploads before Smart Bidding begins to recalibrate.
                  Most accounts see meaningful quality shifts at 30-60 days. Plan for a 30-day observation window before
                  evaluating whether the changes worked - the algorithm needs conversion volume to learn the new signal before
                  bid decisions shift.
                </p>
              </div>
            </section>

            {/* Kampaio CTA */}
            <section id="kampaio">
              <h2 style={h2Style}>Where Kampaio Fits (Running the Quality Loop)</h2>
              <p style={pStyle}>
                Lead quality drifts the moment you stop watching. Sage, Kampaio&apos;s research <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a>, defines and tracks the
                qualified-lead signal: which ad groups are feeding pipeline, where match-quality is sliding, and whether OCI
                uploads are healthy. The weekly quality loop runs automatically, surfacing drift before it compounds.
              </p>
              <p style={pStyle}>
                When the data says act, Buzz adjusts bids toward value and Maximus orchestrates changes across campaigns, with
                your approval before anything applies. You define what a good lead looks like once; the agents hold the account
                to that definition.
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
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Run the quality loop on autopilot
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  <a href="/pricing" style={linkStyle}>
                    Kampaio&apos;s pricing page
                  </a>{' '}
                  covers what the monitoring loop looks like at each plan tier.
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
                    fontWeight: 600,
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
                  Start Free
                </a>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.7', marginBottom: '40px', fontStyle: 'italic' }}>
                Results vary by account size, vertical, and tracking setup. All example numbers in this article (71% rejection
                rate, $142 CPL, $470 CPQL, $1,900 pipeline-CAC, Buzz&apos;s $48K account data) are illustrative of scale and
                direction, not universal benchmarks. Nothing here constitutes professional advertising advice.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ul style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '10px' }}>
                  <a href="https://support.google.com/google-ads/answer/13489421?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Google Ads Help - Best Practices for Generating High-Quality Leads (2024)
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="https://searchengineland.com/improve-ppc-lead-quality-431009" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Chelsea So, Search Engine Land - Improve PPC Lead Quality (Jun 2025)
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="https://www.jumpfly.com/blog/3-ways-to-improve-lead-quality-in-google-ads/" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Zach Lunebach, JumpFly - 3 Ways to Improve Lead Quality in Google Ads (Oct 2025)
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="https://pete-bowen.com/how-i-improve-lead-quality-by-telling-google-which-leads-are-good" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Pete Bowen - How I Improve Lead Quality by Telling Google Which Leads Are Good
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a href="https://leadsbridge.com/blog/google-ads-lead-quality/" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Elena Mazaheri, LeadsBridge - Google Ads Lead Quality (Aug 2025)
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <KeepReading slug="google-ads-lead-quality-guide" category="b2b" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .cause-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 32px 0 40px;
        }
        .cause-card {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px 22px;
          font-size: 17px;
          line-height: 1.7;
          color: #1e293b;
        }
        .cause-num {
          flex: 0 0 auto;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 700;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .channel-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 32px 0 40px;
        }
        .channel-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }
        .channel-h {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 4px;
        }
        .channel-sub {
          font-size: 14px;
          font-weight: 600;
          color: #764ba2;
          margin: 0 0 16px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .channel-list {
          margin: 0;
          padding-left: 20px;
          font-size: 16px;
          line-height: 1.7;
          color: #1e293b;
        }
        .channel-list li {
          margin-bottom: 8px;
        }
        @media (max-width: 640px) {
          .channel-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
