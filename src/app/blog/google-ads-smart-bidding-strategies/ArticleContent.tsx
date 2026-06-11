'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import InlineSVG from '../../../components/blog/InlineSVG';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-smart-bidding-strategies#article',
    headline: 'Google Ads Smart Bidding Strategies: How to Choose the Right One (and When to Avoid Each)',
    description: 'A decision guide to all six Google Ads Smart Bidding strategies: when to use Target CPA vs Target ROAS vs Maximize Conversions, the data thresholds each needs, and when to avoid automation entirely.',
    image: 'https://www.kampaio.com/og/google-ads-smart-bidding-strategies.png',
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
    datePublished: '2026-06-08T00:00:00.000Z',
    dateModified: '2026-06-08T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-smart-bidding-strategies',
    },
    keywords: 'Smart Bidding, Target CPA, Target ROAS, Maximize Conversions, Maximize Conversion Value, Maximize Clicks, Target Impression Share, bid strategy, automated bidding, Google Ads, conversion tracking, Performance Max',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Smart Bidding strategies in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart Bidding strategies use Google AI to optimize for conversions or conversion value at auction time, adjusting bids for every individual query. The four official Smart Bidding strategies are Target CPA, Target ROAS, Maximize Conversions, and Maximize Conversion Value.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Smart Bidding and automated bidding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Smart Bidding is a subset of automated bidding. Maximize Clicks and Target Impression Share are automated bidding strategies that Google does not classify as Smart Bidding because they do not use auction-time conversion signals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Target CPA a Smart Bidding strategy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Target CPA is one of the four official Smart Bidding strategies. In the current Google Ads UI, it typically appears as an optional cost target within Maximize Conversions rather than a standalone selection.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between Target ROAS and Target CPA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Target CPA optimizes for conversion volume at a defined cost per conversion. Target ROAS optimizes for conversion value at a defined return on ad spend. Use Target CPA when conversions are equal in value; use Target ROAS when conversion values differ and higher-value transactions should be prioritized.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much should Target CPA be set to?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Set your initial Target CPA 10 to 20 percent above your current observed median CPA to give the algorithm room to operate. A target set at or below actual CPA restricts reach immediately and triggers a Limited status.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Maximize Conversions a good strategy for a new campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not uncapped. Without conversion history, the algorithm has no signal for conversion quality. Start with Maximize Clicks to accumulate 30 conversions over 30 days, then switch to Maximize Conversions with a Target CPA cap set slightly above your observed CPA.',
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
        name: 'Google Ads Smart Bidding Strategies: How to Choose the Right One',
        item: 'https://www.kampaio.com/blog/google-ads-smart-bidding-strategies',
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: "Quick Answer: There's No Best Smart Bidding Strategy", level: 1 },
    { id: 'six-strategies', title: 'The Six Bidding Strategies at a Glance', level: 1 },
    { id: 'volume-goals', title: 'Volume Goals: Maximize Conversions vs Target CPA', level: 1 },
    { id: 'value-goals', title: 'Value Goals: Maximize Conversion Value vs Target ROAS', level: 1 },
    { id: 'traffic-visibility', title: 'Traffic and Visibility: Maximize Clicks and Target Impression Share', level: 1 },
    { id: 'data-threshold', title: 'The Data Threshold Nobody Mentions', level: 1 },
    { id: 'decision-framework', title: 'A Decision Framework for Choosing in 60 Seconds', level: 1 },
    { id: 'keep-tuned', title: 'Keep the Right Strategy Without Babysitting It', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Choose Once, or Let It Stay Tuned', level: 1 },
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

  const tableData = [
    {
      strategy: 'Maximize Conversions',
      optimizes: 'Conversion volume',
      useWhen: 'Fixed budget, need to spend it fully, CPA secondary',
      avoidWhen: 'New campaign with no data, margin-sensitive campaigns',
      minData: 'No hard floor, but unstable without prior conversion history',
      smart: true,
    },
    {
      strategy: 'Target CPA',
      optimizes: 'Conversion volume at a cost cap',
      useWhen: 'You know your target CPA and it is realistic',
      avoidWhen: 'Target set too low vs. actual CPA; under ~30 conv/30d',
      minData: '~30 conv/30d (Google official); ~15/mo per campaign (practitioner)',
      smart: true,
    },
    {
      strategy: 'Maximize Conversion Value',
      optimizes: 'Total conversion value',
      useWhen: 'E-com / lead-gen with value data, fixed budget',
      avoidWhen: 'Conversion values not configured or unreliable',
      minData: 'No hard floor, but requires accurate value data',
      smart: true,
    },
    {
      strategy: 'Target ROAS',
      optimizes: 'Conversion value at an efficiency target',
      useWhen: 'Clear ROAS goal, sufficient value-conversion volume',
      avoidWhen: 'Target above what the auction will support; under 50 conv/30d',
      minData: '50 conv/30d (Google official)',
      smart: true,
    },
    {
      strategy: 'Maximize Clicks',
      optimizes: 'Click volume',
      useWhen: 'Data-gathering phase before Smart Bidding, top-of-funnel',
      avoidWhen: 'Conversion or ROI is the primary goal',
      minData: 'None',
      smart: false,
    },
    {
      strategy: 'Target Impression Share',
      optimizes: 'Ad visibility / share of auction',
      useWhen: 'Brand defense, launch visibility',
      avoidWhen: 'Efficiency is the primary goal',
      minData: 'None',
      smart: false,
    },
  ];

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-smart-bidding-strategies" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Bid Strategy
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Smart Bidding Strategies: How to Choose the Right One (and When to Avoid Each)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A decision guide to all six strategies: when to use each, the data each one needs, and when to avoid automation entirely.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  S
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Sara Cohen</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Senior PPC Manager at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 8, 2026 · 11 min read</span>
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
                Smart Bidding is Google's auction-time AI that adjusts bids for every individual query using conversion signals. Four official strategies qualify as Smart Bidding: Target CPA, Target ROAS, Maximize Conversions, Maximize Conversion Value. The right choice depends on your campaign goal and conversion volume, not on which <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a> sounds most advanced.
              </p>
            </section>

            {/* Quick Answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>Quick Answer: There&apos;s No Best Smart Bidding Strategy</h2>
              <p style={paragraphStyle}>
                The algorithm does not fix bad input. Feed it a clear goal and enough data, and it performs. Feed it an unrealistic target or a data-starved campaign, and it optimizes faithfully toward the wrong outcome. Strategy is a lever, not magic.
              </p>

              {/* VISUAL 1: StatBlock row, the three anchor numbers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '32px 0' }} className="sb-statgrid">
                {[
                  { n: '4', label: 'Official Smart Bidding strategies (of 6 worth considering)' },
                  { n: '30', label: 'Conversions / 30 days: the general Smart Bidding data floor' },
                  { n: '50', label: 'Conversions / 30 days: the floor Target ROAS specifically needs' },
                ].map((s) => (
                  <div key={s.label} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>
                      {s.n}
                    </div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '20px 24px', margin: '32px 0' }}>
                <div style={{ fontWeight: 700, color: '#92400e', marginBottom: '12px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>TL;DR</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', color: '#1e293b', lineHeight: 1.7 }}>
                  <li style={{ marginBottom: '8px' }}>Smart Bidding = 4 strategies: Target CPA, Target ROAS, Maximize Conversions, Maximize Conversion Value. Maximize Clicks and Target Impression Share are automated bidding but NOT Smart Bidding.</li>
                  <li style={{ marginBottom: '8px' }}>Choice depends on two questions: what are you optimizing for, and do you have enough conversion data?</li>
                  <li style={{ marginBottom: '8px' }}>Every Smart Bidding strategy has a data floor. Below it, the algorithm guesses.</li>
                  <li style={{ marginBottom: 0 }}>Most common mistake: Maximize Conversions with no CPA cap on a new campaign.</li>
                </ul>
              </div>
            </section>

            {/* Six strategies */}
            <section id="six-strategies">
              <h2 style={h2Style}>The Six Bidding Strategies at a Glance</h2>
              <p style={paragraphStyle}>
                Google Ads has six bidding strategies worth considering. Only four are official Smart Bidding. This distinction is not semantic, it affects which campaigns you can apply them to and what signals they use.
              </p>
              <p style={paragraphStyle}>
                Google defines Smart Bidding as bid strategies that use Google AI to optimize for conversions or conversion value in each and every auction, a feature known as auction-time bidding (<a href="https://support.google.com/google-ads/answer/7065882?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: About Smart Bidding</a>). Maximize Clicks and Target Impression Share use automation but not auction-time conversion signals. They are not Smart Bidding.
              </p>

              {/* VISUAL 2: Comparison table (required, first scroll of comparison content) */}
              <div style={{ overflowX: 'auto', margin: '32px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Strategy</th>
                      <th style={thStyle}>Optimizes for</th>
                      <th style={thStyle}>Use when</th>
                      <th style={thStyle}>Avoid when</th>
                      <th style={thStyle}>Min data to work</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.strategy}>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>
                          {row.strategy}
                          <span style={{ display: 'inline-block', marginLeft: '6px', verticalAlign: 'middle', fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', background: row.smart ? '#ecfdf5' : '#f1f5f9', color: row.smart ? '#047857' : '#64748b' }}>
                            {row.smart ? 'Smart' : 'Automated'}
                          </span>
                        </td>
                        <td style={tdStyle}>{row.optimizes}</td>
                        <td style={tdStyle}>{row.useWhen}</td>
                        <td style={tdStyle}>{row.avoidWhen}</td>
                        <td style={tdStyle}>{row.minData}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={paragraphStyle}>
                One legacy note: Enhanced CPC (eCPC) is effectively retired. Google&apos;s dedicated help page for eCPC returns a 404. Do not start new campaigns on it.
              </p>
              <p style={paragraphStyle}>
                Each strategy is most often chosen in comparison with its nearest neighbor. The next two sections cover those pairs.
              </p>
            </section>

            {/* Volume goals */}
            <section id="volume-goals">
              <h2 style={h2Style}>Volume Goals: Maximize Conversions vs Target CPA</h2>
              <p style={paragraphStyle}>
                Both strategies optimize for conversion count. The difference is whether you set a price constraint on each conversion.
              </p>
              <p style={paragraphStyle}>
                <strong>Maximize Conversions</strong> spends the entire daily budget to maximize conversion count, no cost ceiling. Use it when the budget is fixed, CPA variance is acceptable, and you want every dollar deployed. Avoid it when margin sensitivity matters, the campaign is new with no conversion history, or you do not want the full budget spent every day.
              </p>
              <p style={paragraphStyle}>
                The &quot;Maximize Conversions and pray&quot; trap is the most common Smart Bidding mistake at the campaign level. Without a CPA cap, the algorithm does exactly what it is told: maximize conversion count. On a new campaign with no conversion history, it buys the cheapest conversions available, often low-intent traffic, or burns through budget before the learning phase stabilizes. Not a Google flaw. The algorithm is faithfully executing an unconstrained instruction. <a href="https://www.klientboost.com/google/smart-bidding/" style={linkStyle} target="_blank" rel="noopener noreferrer">KlientBoost</a> puts it plainly: if you have no conversion data, you could halt performance, or accidentally give Google Ads the green light to bid without restraint, except it doesn&apos;t know for what.
              </p>
              <p style={paragraphStyle}>
                <strong>Target CPA</strong> is Maximize Conversions with a cost cap. Use it when you have a realistic target grounded in actual campaign data. Avoid it when the target is set too aggressively below actual performance, the strategy will restrict reach until conversion volume collapses. If your <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>bid strategy status shows &quot;Limited&quot;</a>, that restriction is usually the cause.
              </p>

              <MascotQuote mascot="buzz">
                On a new Search campaign with no conversion history, I do not run Maximize Conversions uncapped. I start with Maximize Clicks for 2-3 weeks until the campaign accumulates around 30 conversions. Then I switch to Target CPA set at $26, roughly 15% above the median CPA I observed during the data-gathering phase. That cushion keeps the algorithm from choking on day one of the new strategy. Tighten the target after the first 30-day learning cycle.
              </MascotQuote>

              <p style={paragraphStyle}>
                Practitioner rule of thumb: start with a CPA target that is 10-20% above your current one to give the algorithm some leeway (Matelso). In newer campaign flows, tCPA appears as an optional cost target within Maximize Conversions. Legacy campaigns may show it as a standalone selection.
              </p>
            </section>

            {/* Value goals */}
            <section id="value-goals">
              <h2 style={h2Style}>Value Goals: Maximize Conversion Value vs Target ROAS</h2>
              <p style={paragraphStyle}>
                These two strategies apply when not all conversions are equal. A $2,000 enterprise lead and a $50 small-business inquiry should not compete for the same bid. Without value data, both strategies operate on bad input.
              </p>
              <p style={paragraphStyle}>
                <strong>Maximize Conversion Value</strong> maximizes total conversion value within budget, no efficiency floor. Use it when values are reliably tracked and the goal is extracting maximum revenue from available spend. Avoid it when values are missing or inconsistent. <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>Clean conversion tracking is the prerequisite</a> for both value strategies.
              </p>
              <p style={paragraphStyle}>
                <a href="https://www.klientboost.com/google/smart-bidding/" style={linkStyle} target="_blank" rel="noopener noreferrer">KlientBoost</a> notes the key nuance: Maximize Conversion Value might be bringing in a higher dollar figure of revenue but at a higher cost, actually resulting in lower ROAS. Absolute revenue can rise while efficiency falls. Know which metric you are accountable for before choosing.
              </p>

              {/* VISUAL 3: InlineSVG, the margin/volume trade-off at higher tROAS targets */}
              <InlineSVG
                ariaLabel="Chart showing that raising Target ROAS from 350 to 500 percent cuts monthly conversions from 47 to 14 while margin per conversion rises and absolute revenue falls"
                caption="Real example: raising tROAS from 350% to 500% on a Shopping campaign cut reach by 60%. Conversions fell from 47 to 14 per month."
                svg={`<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, -apple-system, sans-serif">
  <rect x="0" y="0" width="640" height="260" fill="#ffffff"/>
  <line x1="70" y1="200" x2="600" y2="200" stroke="#cbd5e1" stroke-width="1.5"/>
  <text x="70" y="232" fill="#64748b" font-size="14" font-weight="600">tROAS 350%</text>
  <text x="430" y="232" fill="#64748b" font-size="14" font-weight="600">tROAS 500%</text>
  <rect x="90" y="40" width="120" height="160" rx="6" fill="#667eea"/>
  <text x="150" y="30" fill="#1e293b" font-size="15" font-weight="700" text-anchor="middle">47 conv</text>
  <text x="150" y="125" fill="#ffffff" font-size="13" font-weight="600" text-anchor="middle">Monthly</text>
  <text x="150" y="143" fill="#ffffff" font-size="13" font-weight="600" text-anchor="middle">conversions</text>
  <rect x="450" y="152" width="120" height="48" rx="6" fill="#ef4444"/>
  <text x="510" y="142" fill="#1e293b" font-size="15" font-weight="700" text-anchor="middle">14 conv</text>
  <text x="510" y="182" fill="#ffffff" font-size="13" font-weight="600" text-anchor="middle">-60% reach</text>
  <path d="M 215 110 L 445 165" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#arr)"/>
  <defs>
    <marker id="arr" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
      <path d="M0,0 L9,4.5 L0,9 Z" fill="#f59e0b"/>
    </marker>
  </defs>
  <text x="330" y="100" fill="#92400e" font-size="13" font-weight="600" text-anchor="middle">absolute revenue -38%</text>
</svg>`}
              />

              <p style={paragraphStyle}>
                <strong>Target ROAS</strong> adds an efficiency constraint to Maximize Conversion Value. Use it when you have a ROAS target grounded in actual performance and sufficient conversion volume. Avoid it when the target exceeds what the auction can realistically support, the result is severe reach restriction and a rapid conversion drop. <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>When your ROAS drops suddenly after tightening the target</a>, that restriction is the usual cause.
              </p>
              <p style={paragraphStyle}>
                Google officially states that Target ROAS requires at least 50 conversions in 30 days for reliable performance (<a href="https://support.google.com/google-ads/answer/7065882?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: About Smart Bidding</a>). That is the only strategy-specific floor Google publishes.
              </p>

              <MascotQuote mascot="aegis">
                Before raising a Target ROAS from 350% to 500% to improve margin, I check how much auction volume survives at 500%. On one Shopping campaign I reviewed, raising tROAS to 500% cut reach by 60%. Conversions dropped from 47 to 14 per month. Margin per conversion rose, but absolute revenue fell by 38%. ROAS target is a lever between margin and volume, not a &quot;more profit&quot; button. If the math says 500% kills enough volume that total contribution margin drops, the right move is not to raise the target.
              </MascotQuote>
            </section>

            {/* Traffic and visibility */}
            <section id="traffic-visibility">
              <h2 style={h2Style}>Traffic and Visibility: Maximize Clicks and Target Impression Share</h2>
              <p style={paragraphStyle}>
                Neither strategy touches conversion signals. That is the point, and the constraint.
              </p>
              <p style={paragraphStyle}>
                <strong>Maximize Clicks</strong> generates maximum click volume within budget. Its role is narrow: data gathering before transitioning to Smart Bidding, or top-of-funnel work where conversion tracking is not feasible. Once a campaign builds sufficient conversion history, move to a conversion-based strategy.
              </p>
              <p style={paragraphStyle}>
                <strong>Target Impression Share</strong> holds a specified share of available auctions at a set position, top of page, absolute top, or anywhere. Use it for brand defense or product launches where early visibility outranks short-term efficiency. Avoid it when CPA or ROAS matters, it ignores conversion signals and will raise CPC as high as needed to hit the share target.
              </p>
              <p style={paragraphStyle}>
                Both are legitimate tools with a narrow, specific job. Neither is a Smart Bidding strategy.
              </p>
            </section>

            {/* Data threshold */}
            <section id="data-threshold">
              <h2 style={h2Style}>The Data Threshold Nobody Mentions</h2>
              <p style={paragraphStyle}>
                Smart Bidding does not learn from nothing. Each strategy needs a minimum conversion volume before its predictions are reliable enough to outperform simpler approaches.
              </p>
              <p style={paragraphStyle}>
                Google&apos;s official guidance recommends measuring performance over longer time periods that have at least 30 conversions, such as a month or longer (50 conversions for Target ROAS) (<a href="https://support.google.com/google-ads/answer/7065882?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: About Smart Bidding</a>). Practitioners on tightly segmented campaigns set the floor lower: roughly 15 conversions per month before tCPA runs reliably (Matelso). Portfolio bidding across campaigns can hit the 30-conversion floor faster than a single small campaign can.
              </p>

              {/* VISUAL 4: Mermaid flowchart, readiness decision (linear, fits TD well) */}
              <MermaidDiagram
                caption="Readiness check: assess campaign data before switching to Smart Bidding."
                chart={`flowchart TD
  A[Count conversions<br/>last 30 days] --> B{Above the floor?<br/>30/30d general,<br/>50/30d for tROAS}
  B -- No --> C[Run Maximize Clicks or<br/>uncapped Maximize Conversions<br/>to build data. No target yet.]
  C --> A
  B -- Yes --> D{Conversion tracking<br/>clean? Values accurate<br/>for value strategies?}
  D -- No --> E[Fix tracking first.<br/>Broken input means<br/>broken output.]
  E --> D
  D -- Yes --> F[Switch to tCPA or tROAS.<br/>Hold changes for<br/>the first 2 weeks.]`}
              />

              <p style={paragraphStyle}>
                Once live, hold off on changes for the first two weeks. Matelso&apos;s rule: no changes in the first two weeks, even if the numbers look bad at first. Google estimates the learning phase at roughly one week, though volume matters more than calendar time. Low data plus an aggressive target causes the &quot;Limited&quot; status, the fix is data volume, not a different strategy. That troubleshooting is in the article on <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>bid strategy status</a>.
              </p>
              <p style={paragraphStyle}>
                Performance Max runs on Smart Bidding under the hood, Maximize Conversions or Maximize Conversion Value with optional targets. The same data requirements apply. <a href="/blog/performance-max-not-converting" style={linkStyle}>If a pMax campaign is not converting</a>, check data prerequisites first.
              </p>
            </section>

            {/* Decision framework */}
            <section id="decision-framework">
              <h2 style={h2Style}>A Decision Framework for Choosing in 60 Seconds</h2>
              <p style={paragraphStyle}>
                Three questions, in order.
              </p>

              {/* VISUAL 5: Decision-card grid (3 cards, explicit repeat(3,1fr), no auto-fit) */}
              <div className="df-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', margin: '32px 0' }}>
                {[
                  {
                    q: 'Q1',
                    title: 'What does success look like?',
                    body: 'More conversions at any cost = Maximize Conversions. Conversions at a defined cost = Target CPA. More revenue at any efficiency = Maximize Conversion Value. Revenue at a defined ROAS = Target ROAS. Traffic / data gathering = Maximize Clicks. Brand visibility = Target Impression Share.',
                    accent: '#667eea',
                  },
                  {
                    q: 'Q2',
                    title: 'Reliable conversion values?',
                    body: 'If no, Target ROAS and Maximize Conversion Value are out. Value strategies on bad input produce bad output. Fix value tracking before considering either one.',
                    accent: '#764ba2',
                  },
                  {
                    q: 'Q3',
                    title: 'Meet the data floor?',
                    body: 'If no, start simpler, Maximize Clicks or uncapped Maximize Conversions, and revisit once volume holds above the threshold for the strategy from Q1.',
                    accent: '#f59e0b',
                  },
                ].map((c) => (
                  <div key={c.q} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderTop: `4px solid ${c.accent}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: c.accent, letterSpacing: '0.08em', marginBottom: '8px' }}>{c.q}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px', lineHeight: 1.35 }}>{c.title}</div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{c.body}</div>
                  </div>
                ))}
              </div>

              <p style={paragraphStyle}>
                Automation does not replace a clear objective. The algorithm optimizes toward whatever target you give it, literally. Fix the input before touching the strategy. For a broader view of how bidding fits into account-level optimization, the <a href="/blog/ai-powered-ppc-optimization-complete-guide" style={linkStyle}>complete guide to Google Ads optimization</a> covers the full diagnostic chain.
              </p>
            </section>

            {/* Keep tuned */}
            <section id="keep-tuned">
              <h2 style={h2Style}>Keep the Right Strategy Without Babysitting It</h2>
              <p style={paragraphStyle}>
                The right strategy at campaign launch drifts out of calibration. Seasonality shifts conversion rates. Competitors change bids. A Target ROAS that balanced volume and efficiency in Q1 may be throttling volume by Q3 with no one catching it.
              </p>
              <p style={paragraphStyle}>
                B6 is an AI agency inside your Google Ads account, not AI that advises, AI that does the work and shows you every step. Buzz monitors bid strategies and targets against current auction performance. Maximus checks whether tCPA and tROAS targets still align with account margins. Aegis flags risky strategy changes before they apply. Echo reports what changed and why.
              </p>

              <MascotQuote mascot="echo">
                This week, Maximus moved Shopping-Generic from Maximize Conversions to Target ROAS 380%. The campaign had accumulated 64 value-conversions over 30 days, above the 50-conversion threshold. ROAS moved from 290% to 360% over the following 14 days with the same budget. The shift qualified; the timing was right. Details in this week&apos;s report.
              </MascotQuote>

              <p style={paragraphStyle}>
                B6 plans start at $99 (Co-pilot) / $199 (Approval) / $399 (Autonomous). The difference is how much you approve before changes apply. See <a href="/pricing" style={linkStyle}>full pricing</a>.
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
                Source for the official definition and data floors: <a href="https://support.google.com/google-ads/answer/2472725?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: choose a bid strategy based on your goals</a>.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '60px', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Choose Once, or Let It Stay Tuned
                </h2>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Connect your Google Ads account to B6 and in the first audit cycle, Buzz and Maximus evaluate every campaign&apos;s current strategy against its conversion volume and margin data. You get a specific recommendation per campaign, strategy, target level, and estimated impact on CPA or ROAS, not a generic report. You decide whether to apply each one.
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
                  Audit My Bid Strategies
                </a>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                Results vary by account, campaign structure, conversion volume, and market conditions. This article is informational and does not constitute professional financial or advertising advice.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-smart-bidding-strategies" category="google-ads" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .sb-statgrid {
          grid-template-columns: repeat(3, 1fr);
        }
        .df-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 760px) {
          .sb-statgrid {
            grid-template-columns: 1fr;
          }
          .df-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
