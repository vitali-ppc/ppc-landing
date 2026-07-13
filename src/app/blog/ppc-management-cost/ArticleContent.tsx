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

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/ppc-management-cost#article',
    headline: 'How Much Does PPC Management Cost? A Real Breakdown for DTC Owners (2026)',
    description: 'PPC management costs $500 to $10,000 a month, or 10 to 20% of ad spend. Here is the honest line-item breakdown, the three pricing models decoded, and the math on whether the fee is worth it at your spend level.',
    image: 'https://www.kampaio.com/og/ppc-management-cost.png',
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
    datePublished: '2026-06-11T00:00:00.000Z',
    dateModified: '2026-06-11T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/ppc-management-cost',
    },
    keywords: 'ppc management cost, ppc management pricing, cost of ppc, ppc management fees, percentage of ad spend, flat monthly retainer, google ads management cost, average cost of ppc, ppc agency pricing',
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'How Much Does PPC Management Cost?', item: 'https://www.kampaio.com/blog/ppc-management-cost' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the average cost of PPC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PPC management averages $500 to $10,000 a month depending on account size and competition. Most small and mid-sized stores land in the $500 to $2,000 range on a flat retainer, or pay 10 to 20% of ad spend on a percentage model. That is the management fee only, separate from the ad spend itself.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is PPC so expensive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PPC management is labor-intensive: account builds, keyword and negative research, bid strategy, conversion tracking, creative, and ongoing optimization. A senior strategist costs an agency six figures a year, and that salary is baked into your fee. The catch is that Smart Bidding now handles much of the bid work, so part of what feels expensive is paying human prices for automated tasks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does PPC management cost per month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most SMB accounts pay $500 to $2,000 a month flat, or 10 to 20% of ad spend. Freelancers run $1,000 to $3,000, and automation tools run a flat $99 to $399.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does PPC management cost per year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Annualize the monthly fee: a $1,500 retainer is $18,000 a year in management alone, on top of your ad spend. A flat $399 automation tool is about $4,788 a year, regardless of how much your budget grows.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I manage Google Ads myself instead of paying for management?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, especially under $20,000 a month in spend. Google Ads has no minimum budget, and Smart Bidding does the bid work. The cost becomes your time, which automation tools reduce further.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: What PPC Management Actually Costs', level: 1 },
    { id: 'three-ways', title: 'The Three Ways Agencies Charge for PPC', level: 1 },
    { id: 'paying-for', title: "What You're Actually Paying For", level: 1 },
    { id: 'worth-it', title: 'Is the Fee Worth It at Your Spend Level?', level: 1 },
    { id: 'cheaper-ways', title: 'Cheaper Ways to Manage PPC', level: 1 },
    { id: 'audit-quote', title: 'How to Audit a PPC Quote Before You Sign', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'bottom-line', title: 'The Bottom Line on PPC Management Cost', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' } as const;
  const h2Style = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px' } as const;
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' } as const;

  // VISUAL: fee-as-share-of-budget InlineSVG (two stacked bars: $5K vs $20K spend)
  const feeRatioSvg = `
<svg viewBox="0 0 640 230" xmlns="http://www.w3.org/2000/svg" role="img" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">
  <text x="0" y="24" font-size="15" font-weight="700" fill="#1e293b">Same $1,500 fee, very different value</text>

  <text x="0" y="70" font-size="14" fill="#64748b">$5K spend</text>
  <rect x="120" y="56" width="400" height="26" rx="4" fill="#10b981"/>
  <rect x="428" y="56" width="92" height="26" rx="4" fill="#ef4444"/>
  <text x="290" y="74" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">ad spend $5,000</text>
  <text x="540" y="74" font-size="13" font-weight="700" fill="#ef4444">23%</text>

  <text x="0" y="140" font-size="14" fill="#64748b">$20K spend</text>
  <rect x="120" y="126" width="372" height="26" rx="4" fill="#10b981"/>
  <rect x="492" y="126" width="28" height="26" rx="4" fill="#ef4444"/>
  <text x="306" y="144" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">ad spend $20,000</text>
  <text x="540" y="144" font-size="13" font-weight="700" fill="#ef4444">7%</text>

  <rect x="120" y="186" width="16" height="16" rx="3" fill="#10b981"/>
  <text x="144" y="199" font-size="13" fill="#64748b">money in the auction</text>
  <rect x="320" y="186" width="16" height="16" rx="3" fill="#ef4444"/>
  <text x="344" y="199" font-size="13" fill="#64748b">management fee (never reaches the auction)</text>
</svg>`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="ppc-management-cost" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              PPC · Pricing
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              How Much Does PPC Management Cost? A Real Breakdown for DTC Owners (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              The three pricing models decoded, the honest line-item breakdown, and the math on whether the fee is worth it at your spend.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 11, 2026 · 9 min read</span>
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

        {/* Article Body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Intro / featured snippet */}
            <section id="intro">
              <p style={pStyle}>
                PPC management costs $500 to $10,000 a month for most small and mid-sized stores, or 10 to 20% of your ad spend if the agency prices on a percentage. The real question is not the sticker price. It is what that fee is as a share of everything you spend, and how much of the work is now automated.
              </p>
            </section>

            {/* VISUAL 1: TL;DR styled callout block */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: What PPC Management Actually Costs</h2>
              <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '28px 32px', marginBottom: '32px' }}>
                <ul style={{ fontSize: '17px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}><strong>Flat retainer:</strong> $500 to $2,000 a month for most SMB accounts, climbing past $10,000 for large or complex ones (<a href="https://agencyanalytics.com/blog/ppc-pricing" style={linkStyle} target="_blank" rel="noopener noreferrer">AgencyAnalytics, 2026</a>).</li>
                  <li style={{ marginBottom: '12px' }}><strong>Percentage of ad spend:</strong> 10 to 20% is standard, and some agencies charge up to 30% (<a href="https://www.lyfemarketing.com/ppc-management-pricing/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, 2026</a>).</li>
                  <li style={{ marginBottom: '12px' }}><strong>Freelancer:</strong> $1,000 to $3,000 a month, usually one person.</li>
                  <li style={{ marginBottom: 0 }}><strong>Automation tools:</strong> a flat $99 to $399 a month that does not move when your budget does.</li>
                </ul>
              </div>
              <p style={pStyle}>
                One number matters more than the fee itself: the fee as a percentage of your total budget. At $5,000 of monthly ad spend, a $1,500 retainer is not "$1,500." It is 23% of every dollar you put into Google Ads that month. Hold that ratio in your head for the rest of this article.
              </p>
            </section>

            {/* VISUAL 2: ComparisonTable (three pricing models) */}
            <section id="three-ways">
              <h2 style={h2Style}>The Three Ways Agencies Charge for PPC</h2>
              <p style={pStyle}>
                Agencies price PPC three ways: a flat monthly retainer, a percentage of your ad spend, or by the hour. Most use one of the first two.
              </p>
              <p style={pStyle}>
                <strong>Flat monthly retainer.</strong> You pay a set fee regardless of spend. For small to mid-sized accounts this runs $500 to $2,000 a month, with larger accounts paying $1,500 to $10,000 and up (<a href="https://agencyanalytics.com/blog/ppc-pricing" style={linkStyle} target="_blank" rel="noopener noreferrer">AgencyAnalytics, 2026</a>). This is the cleanest model to reason about because the number does not change when your budget does.
              </p>
              <p style={pStyle}>
                <strong>Percentage of ad spend.</strong> You pay a cut of what you spend on ads, typically 10 to 20%, sometimes climbing to 30% (<a href="https://hawksem.com/blog/ppc-management-price/" style={linkStyle} target="_blank" rel="noopener noreferrer">HawkSEM, 2026</a>). It sounds fair because it scales with your account. It is not. The work of managing a campaign barely changes between $8,000 and $12,000 in spend, but your fee just went up $800 at a 20% rate. This model quietly punishes you for growing.
              </p>
              <p style={pStyle}>
                <strong>Hourly and setup fees.</strong> Pure hourly billing is rare in PPC, but most agencies front-load a setup charge. A new account build runs 15 to 25 hours of real work, which is where a chunk of your first invoice goes.
              </p>
              <ComparisonTable
                headers={['Pricing model', 'Typical range', 'Best for', 'Hidden risk']}
                rows={[
                  { cells: ['Flat retainer', '$500 to $10,000/mo', 'Predictable budgets', 'Same fee even if they do little'] },
                  { cells: ['Percent of spend', '10 to 20% of spend', 'Agencies, not you', 'Fee rises as you scale'] },
                  { cells: ['Hourly / setup', '15 to 25 hrs to launch', 'One-off builds', 'Hard to audit the hours'] },
                ]}
                caption="The three PPC pricing models, decoded"
              />
            </section>

            {/* What you're paying for */}
            <section id="paying-for">
              <h2 style={h2Style}>What You're Actually Paying For</h2>
              <p style={pStyle}>
                The fee buys senior labor, tools, and time. It does not buy magic, and it does not buy more than you can see in your own account.
              </p>
              <p style={pStyle}>
                Here is the honest line-item version of what an agency retainer covers: account structure, keyword research and negatives, bid strategy, <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking</a> setup, ad copy and <a href="/blog/responsive-search-ads-best-practices" style={linkStyle}>responsive search ads</a>, weekly reporting, and watching for wasted spend. That is real work, and a good senior strategist does it well. What you covered in <a href="/blog/ppc-management" style={linkStyle}>our breakdown of how PPC management actually runs</a> is the full discipline behind that list.
              </p>
              <p style={pStyle}>
                Now the part most pricing pages skip. Performance Max and Smart Bidding, both rolled out around 2021, absorbed most of the bid-management labor that retainers used to pay for. The platform now adjusts bids in real time at a depth no human matches when conversion volume is healthy. So a slice of every fee is for work Google already automates. This is not a reason to fire anyone. It is the reason the management line item is the most negotiable one on your invoice.
              </p>
              <p style={pStyle}>
                The pain you actually have is that you cannot tell what you are paying for. Fix that in ten minutes. Open Google Ads, go to change history, filter the last 30 days. A $5,000 account under active management should show 20 to 30 human changes: bid tweaks, negatives, asset rotations. Then read your last report and count outcomes, not activities. "We made 47 changes" is a task list. "We cut CPA from $42 to $31 by pausing Display" is a result.
              </p>

              {/* VISUAL 3: MascotQuote (Sage) */}
              <MascotQuote mascot="sage">
                Pull two numbers before your next renewal. One: your change-history count for the last 30 days, which should be 20 plus for a $5K account. Two: your fee divided by your total budget. If the count is under 10 and the ratio is over 20%, you are paying agency prices for automated work. Renegotiate or move to a flat tool.
              </MascotQuote>
            </section>

            {/* Worth it */}
            <section id="worth-it">
              <h2 style={h2Style}>Is the Fee Worth It at Your Spend Level?</h2>
              <p style={pStyle}>
                A management fee is fair when it is a small slice of your total budget and the work genuinely can't be automated. Below a certain spend, neither is true.
              </p>
              <p style={pStyle}>
                Run the ratio. Your total monthly budget is ad spend plus management fee. At $5,000 in ad spend with a $1,500 retainer, you are paying $6,500 a month, and 23% of it never reaches the auction. At $20,000 in spend with the same $1,500 fee, the management cut drops to 7%. Same work, very different value.
              </p>

              {/* VISUAL 4: InlineSVG fee-ratio bars */}
              <InlineSVG svg={feeRatioSvg} caption="The same flat fee eats 23% of a $5K budget but only 7% of a $20K budget" ariaLabel="Bar chart comparing management fee as a share of total budget at $5,000 versus $20,000 ad spend" />

              {/* VISUAL 5: cost-breakdown table (raw HTML table, distinct from ComparisonTable) */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontSize: '16px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '12px 16px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}></th>
                    <th style={{ padding: '12px 16px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>$5K/mo spend</th>
                    <th style={{ padding: '12px 16px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 600, color: '#1e293b' }}>$20K/mo spend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Ad spend</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>$5,000</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>$20,000</td></tr>
                  <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Flat agency fee</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>$1,500</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>$1,500</td></tr>
                  <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 600 }}>Fee as % of total</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#ef4444', fontWeight: 600 }}>23%</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#10b981', fontWeight: 600 }}>7%</td></tr>
                  <tr><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Who manages it</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Junior account manager</td><td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b' }}>Senior team</td></tr>
                  <tr><td style={{ padding: '12px 16px', color: '#1e293b' }}>Same work via automation</td><td style={{ padding: '12px 16px', color: '#1e293b' }}>~$199 to $399 flat</td><td style={{ padding: '12px 16px', color: '#1e293b' }}>~$199 to $399 flat</td></tr>
                </tbody>
              </table>

              <p style={pStyle}>
                The pattern is blunt. Agencies are profitable on accounts above roughly $20,000 a month, which is where you get senior attention. Under that, your retainer buys a junior and a templated strategy, and the fee eats a fifth of your budget. If you are stuck on whether your agency is still earning that fee, the eight signals in <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>our guide to firing a PPC agency</a> give you a scorecard.
              </p>
            </section>

            {/* Cheaper ways */}
            <section id="cheaper-ways">
              <h2 style={h2Style}>Cheaper Ways to Manage PPC (Without Cutting Corners)</h2>
              <p style={pStyle}>
                There are three honest alternatives to a full agency retainer: a freelancer, in-house management, or automation. Each trades money for time or control differently.
              </p>
              <p style={pStyle}>
                <strong>Freelancer.</strong> $1,000 to $3,000 a month (<a href="https://www.lyfemarketing.com/ppc-management-pricing/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, 2026</a>), often excellent, always a single point of failure. One person means vacation gaps and blind spots in whatever they are weak at.
              </p>
              <p style={pStyle}>
                <strong>In-house or DIY.</strong> Your time is the cost here. Under $20,000 a month, with Smart Bidding doing the heavy bid work and decent tooling on top, running it yourself is genuinely viable. <a href="/blog/google-ads-without-agency" style={linkStyle}>Going solo on Google Ads</a> lays out the real tradeoffs, and understanding <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>what Smart Bidding now automates</a> tells you how much manual work is actually left.
              </p>
              <p style={pStyle}>
                <strong>Automation tools.</strong> This is where the management line item collapses. Recommendation tools like Optmyzr and Madgicx start around $499 a month and tell you what to do. Autonomous tools go further and execute. Kampaio runs seven AI <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a>s that handle bidding, reporting, creative, and research for a flat $99 to $399 a month, and that number does not climb when your budget does. The percentage-of-spend trap simply disappears: at $20,000 in spend your fee is the same $399 it was at $5,000.
              </p>
            </section>

            {/* Audit a quote */}
            <section id="audit-quote">
              <h2 style={h2Style}>How to Audit a PPC Quote Before You Sign</h2>
              <p style={pStyle}>
                Before you sign anything, run the quote through four checks. They take about fifteen minutes and protect you from the two worst outcomes: overpaying and losing access to your own account.
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Compute the fee as a percentage of total budget.</strong> Fee divided by (fee plus ad spend). Over 20% and you should expect senior-level work, not a coordinator.</li>
                <li style={{ marginBottom: '16px' }}><strong>Ask what share of the work Smart Bidding and Performance Max now do.</strong> A confident agency answers honestly and points to the strategy and creative work they add on top. A vague answer means they are billing for automated labor.</li>
                <li style={{ marginBottom: '16px' }}><strong>Check account and MCC ownership.</strong> You should hold owner-level access to your own Google Ads account, not borrow it through the agency's manager account. The wrong answer here is a dealbreaker before price even matters.</li>
                <li style={{ marginBottom: 0 }}><strong>Demand outcome-based reporting.</strong> Get a sample report. If it lists activities instead of results tied to revenue, the relationship will be opaque from day one. The <a href="/blog/google-ads-strategy" style={linkStyle}>strategy layer a fee should buy</a> is exactly what a good report makes visible.</li>
              </ol>
              <p style={pStyle}>
                Add the answers up. A fair ratio, an honest take on automation, clean ownership, and real reporting means keep or sign. Two or more red flags means renegotiate or replace.
              </p>
            </section>

            {/* VISUAL 6: FAQ section */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>What is the average cost of PPC?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>PPC management averages $500 to $10,000 a month depending on account size and competition (<a href="https://www.lyfemarketing.com/ppc-management-pricing/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, 2026</a>). Most small and mid-sized stores land in the $500 to $2,000 range on a flat retainer, or pay 10 to 20% of ad spend on a percentage model. That is the management fee only, separate from the ad spend itself.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Why is PPC so expensive?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>PPC management is labor-intensive: account builds, keyword and negative research, bid strategy, conversion tracking, creative, and ongoing <a href="/blog/google-ads-optimization" style={linkStyle}>optimization</a>. A senior strategist costs an agency six figures a year, and that salary is baked into your fee. The catch is that Smart Bidding now handles much of the bid work, so part of what feels expensive is paying human prices for automated tasks.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How much does PPC management cost per month?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Most SMB accounts pay $500 to $2,000 a month flat, or 10 to 20% of ad spend. Freelancers run $1,000 to $3,000, and automation tools run a flat $99 to $399.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How much does PPC management cost per year?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Annualize the monthly fee: a $1,500 retainer is $18,000 a year in management alone, on top of your ad spend. A flat $399 automation tool is about $4,788 a year, regardless of how much your budget grows.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How much does PPC management cost per hour?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Pure hourly pricing is uncommon, but setup work runs 15 to 25 hours for a new account (<a href="https://agencyanalytics.com/blog/ppc-pricing" style={linkStyle} target="_blank" rel="noopener noreferrer">AgencyAnalytics, 2026</a>). Most agencies fold that into a flat fee rather than billing time.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Can I manage Google Ads myself instead of paying for management?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Yes, especially under $20,000 a month in spend. Google Ads has no minimum budget (<a href="https://support.google.com/google-ads/answer/2459326" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>), and Smart Bidding does the bid work. The cost becomes your time, which automation tools reduce further.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Is cheap Google Ads management worth it?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Cheap retainers usually mean a junior managing dozens of accounts with a templated strategy. The better way to cut cost is not a cheaper agency, it is removing the parts of the fee that pay for automated work.</p>
                </div>
              </div>
            </section>

            {/* Bottom line + CTA */}
            <section id="bottom-line">
              <h2 style={h2Style}>The Bottom Line on PPC Management Cost</h2>
              <p style={pStyle}>
                The headline number is $500 to $10,000 a month, but that was never the real question. The decision is the ratio: what your fee is as a share of total budget, and how much of the work is now automated. Under $20,000 a month in spend, a flat retainer often costs you a fifth of your budget for work the platform mostly does itself.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  See the fee math on your own account
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Connect Google Ads to Kampaio and watch the agents audit your change history, your fee-to-spend ratio, and your wasted spend in about ninety seconds. <a href="/pricing" style={linkStyle}>Pricing is a flat $99 to $399</a>, and it does not climb when your budget does.
                </p>
                <a
                  href="/chat"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                >
                  Audit My Account in 90 Seconds
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '24px' }}>Sources</h3>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><a href="https://agencyanalytics.com/blog/ppc-pricing" style={linkStyle} target="_blank" rel="noopener noreferrer">AgencyAnalytics, PPC Management Pricing Guide (2026)</a></li>
                <li><a href="https://www.lyfemarketing.com/ppc-management-pricing/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, PPC Management Pricing (2026)</a></li>
                <li><a href="https://hawksem.com/blog/ppc-management-price/" style={linkStyle} target="_blank" rel="noopener noreferrer">HawkSEM, How Much Does PPC Management Cost? (2026)</a></li>
                <li><a href="https://support.google.com/google-ads/answer/2459326" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, How much do Google Ads cost?</a></li>
              </ul>
            </section>

          </div>
        </div>
        <KeepReading slug="ppc-management-cost" category="ppc" />
      <Footer compact={true} />
      </div>
    </>
  );
}
