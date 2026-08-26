'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { BigStat, ColumnBuckets, CompareGrid, SignalStack, KeyTakeaways } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-agency-guide#article',
    headline: 'Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives',
    description:
      'A neutral guide to hiring a Google Ads agency: what one does, real US fees, how to decide if you need one, how to choose, switch, or fire an agency, and when a consultant, in-house hire, or software is the better call.',
    image: 'https://www.kampaio.com/og/google-ads-agency-guide.png',
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
    datePublished: '2026-07-22T00:00:00.000Z',
    dateModified: '2026-07-22T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-agency-guide',
    },
    keywords:
      'google ads agency, google ads agency cost, google ads agency fees, hire a google ads agency, google ads agency vs consultant, google ads agency alternatives, ppc agency, google ads management, run google ads without an agency',
    inLanguage: 'en',
    "wordCount": 1822,
    "articleSection": "Strategy"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does a Google Ads agency do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It plans, launches, manages, and optimizes paid campaigns across Search, Shopping, Display, YouTube, and Performance Max: account structure, keyword and audience research, creative, bid and budget management, conversion tracking, and reporting.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the agency fee for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most US agencies charge a flat retainer of $1,000-5,000/month or 10-20% of ad spend, often plus a setup fee. On a $5,000/month account that is roughly $500-2,500/month in management fees, separate from the ad spend itself.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is $20 a day good for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on cost per click: at a $2 average CPC, $20/day buys about 10 clicks, thin for competitive keywords and too small for an agency retainer to make sense.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the big 4 ad agencies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WPP, Omnicom, Publicis, and IPG. They manage enterprise accounts, not SMB Google Ads. For a small business, the relevant choice is a specialist PPC agency versus the alternatives in this guide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need a Google Ads agency for a small business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not necessarily. Under about $3,000/month, most small businesses get better value running campaigns themselves or using self-serve software; an agency earns its fee once spend, complexity, or time constraints grow past that.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much should I pay a Google Ads agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Budget $1,000-5,000/month flat, or 10-20% of ad spend, plus a setup fee. Treat a quote well outside that range as a reason to ask more questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I run Google Ads without an agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many small businesses run campaigns themselves or use self-serve software that executes bid, budget, and negative-keyword changes directly, keeping account ownership in your hands.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I own my Google Ads account if an agency runs it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You should, if set up correctly: your account lives under your own login, the agency is given manager access rather than the reverse, and you can unlink that access anytime.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a Google Ads agency and a consultant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An agency has a team and bench depth; a consultant is typically one senior person, project-based or on a smaller retainer, often $75-200/hour.',
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
        name: 'Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives',
        item: 'https://www.kampaio.com/blog/google-ads-agency-guide',
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Do You Even Need a Google Ads Agency? (Quick Answer)', level: 1 },
    { id: 'what-it-does', title: 'What a Google Ads Agency Actually Does', level: 1 },
    { id: 'cost', title: 'What Does a Google Ads Agency Cost?', level: 1 },
    { id: 'alternatives', title: 'Agency vs Consultant vs In-House vs Software: Your Four Alternatives', level: 1 },
    { id: 'how-to-choose', title: 'How to Choose the Right Google Ads Agency', level: 1 },
    { id: 'working-with', title: 'Working With an Agency: Reporting, Ownership, and White-Label', level: 1 },
    { id: 'switch-or-fire', title: 'When to Switch or Fire Your Google Ads Agency', level: 1 },
    { id: 'software-alternative', title: 'The Software Alternative: Running Google Ads Without an Agency', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'getting-started', title: 'Getting Started: Your Next Step', level: 1 },
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
  const listStyle: React.CSSProperties = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };
  const extAttr = { target: '_blank', rel: 'noopener noreferrer' } as const;

  const faqItems = [
    {
      q: 'What does a Google Ads agency do?',
      a: (
        <>It plans, launches, manages, and optimizes paid campaigns across Search, Shopping, Display, YouTube, and Performance Max: account structure, research, creative, bid and budget management, tracking, and reporting.</>
      ),
    },
    {
      q: 'What is the agency fee for Google Ads?',
      a: (
        <>Most US agencies charge a flat retainer of $1,000-5,000/month or 10-20% of ad spend, often plus a setup fee. On a $5,000/month account that is roughly $500-2,500/month in management fees, separate from the ad spend itself. See the <a href="/blog/google-ads-agency-pricing" style={linkStyle}>full pricing breakdown</a>.</>
      ),
    },
    {
      q: 'Is $20 a day good for Google Ads?',
      a: (
        <>It depends on cost per click: at a $2 average CPC, $20/day buys about 10 clicks, thin for competitive keywords and too small for an agency retainer to make sense.</>
      ),
    },
    {
      q: 'What are the big 4 ad agencies?',
      a: (
        <>WPP, Omnicom, Publicis, and IPG, but they manage enterprise accounts, not SMB Google Ads. For a small business, the relevant choice is a specialist PPC agency versus the alternatives in this guide.</>
      ),
    },
    {
      q: 'Do I need a Google Ads agency for a small business?',
      a: (
        <>Not necessarily. Under about $3,000/month, most small businesses get better value running campaigns themselves or using self-serve software; an agency earns its fee once spend, complexity, or time constraints grow past that.</>
      ),
    },
    {
      q: 'How much should I pay a Google Ads agency?',
      a: (
        <>Budget $1,000-5,000/month flat, or 10-20% of ad spend, plus a setup fee. Treat a quote well outside that range as a reason to ask more questions, and cross-check it against <a href="/blog/ppc-management-cost" style={linkStyle}>what PPC management actually costs</a>.</>
      ),
    },
    {
      q: 'Can I run Google Ads without an agency?',
      a: (
        <>Yes. Many small businesses <a href="/blog/google-ads-without-agency" style={linkStyle}>run campaigns themselves</a> or use self-serve software that executes bid, budget, and negative-keyword changes directly, keeping account ownership in your hands.</>
      ),
    },
    {
      q: 'Do I own my Google Ads account if an agency runs it?',
      a: (
        <>You should, if set up correctly: your account lives under your own login, the agency is given manager access rather than the reverse, and you can unlink that access anytime.</>
      ),
    },
    {
      q: 'What is the difference between a Google Ads agency and a consultant?',
      a: (
        <>An agency has a team and bench depth; a <a href="/blog/google-ads-consultant" style={linkStyle}>consultant</a> is typically one senior person, project-based or on a smaller retainer, often $75-200/hour.</>
      ),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-agency-guide" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Strategy &middot; Google Ads Agencies
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A neutral guide to hiring, choosing, switching, or skipping a Google Ads agency, with real US fees and the cheaper paths that beat a retainer below roughly $20K/month in spend.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 22, 2026 &middot; 12 min read</span>
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

        {/* Article Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Quick answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>Do You Even Need a Google Ads Agency? (Quick Answer)</h2>
              <p style={paragraphStyle}>
                A Google Ads agency makes sense mainly when your monthly spend or available time crosses a threshold, not because ROAS dipped last month. Under $3,000/month, run campaigns yourself or use software. Between $3,000-20,000/month, software or a consultant usually beats an agency on cost and control. Above $20,000/month, an agency or in-house hire pays for itself.
              </p>
              <p style={paragraphStyle}>
                Here is the number that drives that decision: most Google Ads agencies charge 10-20% of ad spend or a flat $2,000-5,000/month retainer, on top of ad spend itself, which Google bills separately (<a href="https://support.google.com/google-ads/answer/1704418" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>). On a $5,000/month account, a $1,500/month retainer is 30% of budget going to management, not media.
              </p>

              <BigStat
                value="30%"
                label="of a $5,000/mo budget"
                claim="goes to management, not media, when a $1,500/month retainer sits on top of a $5,000/month account. That is the ratio to run before you sign anything."
                source="Source: typical US agency retainer of $1,000-5,000/mo or 10-20% of ad spend (Google Ads Help, 2026)"
              />

              <p style={paragraphStyle}>
                If you are paying a retainer right now and cannot tell whether it is working, you are not alone. That uncertainty is usually the real problem, not the ROAS number itself. This guide will tell you honestly when you do NOT need an agency at all.
              </p>
              <p style={{ ...paragraphStyle, marginBottom: '16px' }}>Quick shortcut:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Under $3K/mo, time to learn: DIY or self-serve software.</li>
                <li style={{ marginBottom: '12px' }}>$3-20K/mo: software or a consultant usually wins on cost and control.</li>
                <li style={{ marginBottom: '12px' }}>$20K+/mo, multi-market, or zero owner time: agency or in-house.</li>
              </ul>

              <ColumnBuckets
                columns={[
                  { title: 'Under $3K/mo', items: ['DIY if you have time to learn', 'Self-serve software if not'] },
                  { title: '$3-20K/mo', items: ['Software or a consultant', 'Wins on cost and control'] },
                  { title: '$20K+/mo', items: ['Agency or in-house hire', 'Multi-market or zero owner time'] },
                ]}
                caption="Spend breakpoints at a glance"
              />
            </section>

            {/* What it does */}
            <section id="what-it-does">
              <h2 style={h2Style}>What a Google Ads Agency Actually Does</h2>
              <p style={paragraphStyle}>
                A Google Ads agency is a company you pay to plan, launch, manage, and optimize paid campaigns on Search, Shopping, Display, YouTube, and Performance Max, Google&apos;s cross-inventory campaign type, on your behalf.
              </p>
              <p style={{ ...paragraphStyle, marginBottom: '16px' }}>Concrete scope:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '14px' }}><strong>Account structure:</strong> campaigns and ad groups organized around your product or service lines.</li>
                <li style={{ marginBottom: '14px' }}><strong>Keyword and audience research:</strong> finding the search terms and audience segments worth targeting.</li>
                <li style={{ marginBottom: '14px' }}><strong>Ad copy and creative:</strong> writing Responsive Search Ads and building assets for Performance Max.</li>
                <li style={{ marginBottom: '14px' }}><strong>Bid and budget management:</strong> setting Target ROAS or Target CPA inside Smart Bidding, Google&apos;s automated bidding system.</li>
                <li style={{ marginBottom: '14px' }}><strong>Conversion tracking setup:</strong> wiring up the conversion actions and offline data imports Smart Bidding learns from.</li>
                <li style={{ marginBottom: '14px' }}><strong>Reporting:</strong> a recurring summary of spend, ROAS, and conversions.</li>
              </ul>
              <p style={paragraphStyle}>
                Buyers often conflate a full-service digital agency (ads plus SEO and social), a specialist PPC agency (ads only), and a solo consultant (one person, no bench). Which one fits depends on your spend and your time, and the numbers below make that call easier.
              </p>
            </section>

            {/* Cost */}
            <section id="cost">
              <h2 style={h2Style}>What Does a Google Ads Agency Cost?</h2>
              <p style={paragraphStyle}>
                Expect $1,000-5,000/month flat, or 10-20% of ad spend, or a performance/hybrid deal, usually plus a setup fee.
              </p>

              <ResponsiveTable
                headers={['Fee model', 'How it works', 'Typical range', 'Cost on a $5,000/mo account', 'Best-fit situation']}
                rows={[
                  ['Flat retainer', 'Fixed monthly fee regardless of spend', '$1,000-5,000/mo', '$1,500-2,500/mo', 'Predictable budgets, steady spend'],
                  ['Percent of ad spend', 'Fee scales with what you spend', '10-20% of spend', '$500-1,000/mo', 'Growing accounts where spend will scale'],
                  ['Performance / hybrid', 'Lower base fee plus a bonus tied to results', 'Base + 5-15% of measured results', '$750-1,500/mo base, plus bonus', 'Agencies confident enough to tie pay to outcomes'],
                ]}
              />
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, marginTop: '-12px', marginBottom: '32px' }}>
                Common Google Ads agency fee models and what each costs on a $5,000/month account.
              </p>

              <p style={paragraphStyle}>
                The fee-share math is worth doing plainly: a $1,500/month retainer on a $5,000/month account is 30% of budget going to management, not media. The same account on kampaio&apos;s Professional plan ($49/month) puts roughly 1% of that budget toward the software. That does not make software automatically the right call, but it is the arithmetic behind the decision.
              </p>
              <p style={paragraphStyle}>
                One structural reality: a single account manager often oversees 10-20 client accounts, so a small account rarely gets the senior strategist. Fit matters more than the headline rate.
              </p>
              <p style={paragraphStyle}>
                For the full numbers, read <a href="/blog/google-ads-agency-pricing" style={linkStyle}>the full breakdown of Google Ads agency pricing</a> and what <a href="/blog/ppc-management" style={{ color: '#764ba2', textDecoration: 'underline' }}>PPC management</a> actually costs.
              </p>
            </section>

            {/* Alternatives */}
            <section id="alternatives">
              <h2 style={h2Style}>Agency vs Consultant vs In-House vs Software: Your Four Alternatives</h2>
              <p style={paragraphStyle}>
                An agency is one of five ways to run Google Ads: DIY, software, a consultant, an in-house hire, or an agency, set by your monthly spend, your time, and how much control you want to keep.
              </p>
              <p style={paragraphStyle}>
                Call it the Spend-Time-Expertise grid: monthly ad spend, hours available, and in-house PPC knowledge are the three inputs that sort the decision. Treat the breakpoints as a guideline, not a law.
              </p>

              <CompareGrid
                columns={[
                  {
                    name: 'DIY',
                    bestFor: 'under $3K/mo with time to learn',
                    traits: [
                      { label: 'Fits under $3K/mo', has: true },
                      { label: 'Fits $3-20K/mo band', has: false },
                      { label: 'Fits $20K+/mo', has: false },
                      { label: 'Runs with little owner time', has: false },
                    ],
                  },
                  {
                    name: 'Software',
                    bestFor: 'the $3-20K/mo band, control kept',
                    highlight: true,
                    traits: [
                      { label: 'Fits under $3K/mo', has: true },
                      { label: 'Fits $3-20K/mo band', has: true },
                      { label: 'Fits $20K+/mo', has: false },
                      { label: 'Runs with little owner time', has: false },
                    ],
                  },
                  {
                    name: 'Consultant',
                    bestFor: 'senior, part-time expertise',
                    traits: [
                      { label: 'Fits under $3K/mo', has: false },
                      { label: 'Fits $3-20K/mo band', has: true },
                      { label: 'Fits $20K+/mo', has: false },
                      { label: 'Runs with little owner time', has: true },
                    ],
                  },
                  {
                    name: 'In-house',
                    bestFor: '$20K+/mo, wants full control',
                    traits: [
                      { label: 'Fits under $3K/mo', has: false },
                      { label: 'Fits $3-20K/mo band', has: false },
                      { label: 'Fits $20K+/mo', has: true },
                      { label: 'Runs with little owner time', has: true },
                    ],
                  },
                ]}
              />

              <ResponsiveTable
                headers={['Monthly ad spend', 'Owner time available', 'In-house expertise', 'Recommended path']}
                rows={[
                  ['Under $3K', 'A few hours/week', 'Learning', 'DIY'],
                  ['Under $3K', 'Very little', 'None', 'Self-serve software'],
                  ['$3-20K', 'Some hours/week', 'Basic', 'Self-serve software'],
                  ['$3-20K', 'Very little', 'None', 'Consultant'],
                  ['$20K+', 'Very little', 'None', 'Agency'],
                  ['$20K+', 'Available, wants control', 'Some', 'In-house hire'],
                ]}
              />
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, marginTop: '-12px', marginBottom: '32px' }}>
                The Spend-Time-Expertise grid: match your spend, time, and in-house knowledge to a path.
              </p>

              <SignalStack
                layers={[
                  { title: 'DIY', desc: 'Good under roughly $3,000/month with time to learn Smart Bidding and Target ROAS. Bad with zero spare hours or real compliance risk.' },
                  { title: 'Software', desc: 'Good for the $3-20K/mo band if you want agency-level optimization without the retainer. Bad if you want zero involvement whatsoever.', highlight: true, badge: 'Self-serve' },
                  { title: 'Consultant', desc: 'Good for senior, part-time or project-based expertise, typically $75-200/hour. Bad if you need bench depth across channels or after-hours coverage.' },
                  { title: 'In-house', desc: 'Works above $20,000/month, where total control and daily attention justify a fully loaded PPC hire at roughly $85,000-130,000/year.' },
                  { title: 'Agency', desc: 'Earns its fee above $20,000/month, for complex multi-channel accounts, or when you have zero time to spare.' },
                ]}
                caption="Good-if / bad-if, per alternative"
              />

              <p style={paragraphStyle}>
                <strong>DIY</strong> is good under roughly $3,000/month with time to learn Smart Bidding and Target ROAS; bad with zero spare hours or real compliance risk.
              </p>
              <p style={paragraphStyle}>
                <strong>Software</strong> splits into recommendation tools (Optmyzr, WordStream, Adzooma) that surface suggestions you still execute by hand, and self-serve <a href="/blog/5-tips-for-working-with-ai-ppc-tools" style={{ color: '#764ba2', textDecoration: 'underline' }}>AI tools</a> like kampaio that execute the change directly and show each step live for approval. Good for the $3-20K/mo band if you want agency-level optimization without the retainer; bad if you want zero involvement whatsoever.
              </p>
              <p style={paragraphStyle}>
                <strong>Consultant</strong> is good for senior, part-time or project-based expertise, typically $75-200/hour; bad if you need bench depth across channels or after-hours coverage.
              </p>
              <p style={paragraphStyle}>
                <strong>In-house</strong> works above $20,000/month spend, where total control and daily attention justify a fully loaded PPC hire at roughly $85,000-130,000/year. Below that, the spend does not yet justify a full salary.
              </p>
              <p style={paragraphStyle}>
                <strong>Agency</strong> earns its fee above $20,000/month, for complex multi-channel accounts, or when you have zero time to spare. It stops making sense once your account is small enough that 10-20% of spend, or a flat retainer, eats disproportionately into the budget.
              </p>

              <MascotQuote mascot="buzz">
                I check bids and budgets every few hours, not once a month. Last Tuesday I cut bid -14% on a Performance Max asset group after CPA drifted from $31 to $44 in six days. A monthly retainer report would have flagged that three weeks later, after the budget was already gone.
              </MascotQuote>

              <p style={paragraphStyle}>
                For deeper reading on this section: <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={linkStyle}>agency vs in-house vs software compared</a>, <a href="/blog/google-ads-without-agency" style={linkStyle}>running Google Ads without an agency</a>, <a href="/blog/google-ads-consultant" style={linkStyle}>hiring a Google Ads consultant</a>, and <a href="/blog/google-ads-consultant-cost" style={linkStyle}>what a Google Ads consultant costs</a>.
              </p>
            </section>

            {/* How to choose */}
            <section id="how-to-choose">
              <h2 style={h2Style}>How to Choose the Right Google Ads Agency</h2>
              <p style={paragraphStyle}>
                Choose for fit and transparency, not the biggest promise: vet who actually runs your account day to day, what they report on, and how long you are locked in.
              </p>
              <p style={{ ...paragraphStyle, marginBottom: '16px' }}>Checklist before you sign:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Certifications: Google Partner or Premier Partner status.</li>
                <li style={{ marginBottom: '12px' }}>Relevant experience: has the agency run accounts like yours before, not just adjacent ones.</li>
                <li style={{ marginBottom: '12px' }}>Who runs the account day to day, not just the person who pitched you.</li>
                <li style={{ marginBottom: '12px' }}>Reporting tied to revenue and ROAS, not just clicks and impressions.</li>
                <li style={{ marginBottom: '12px' }}>Contract length, plus the setup and exit terms.</li>
              </ul>
              <p style={paragraphStyle}>
                The top-voted advice in a ranking r/smallbusiness thread makes the same case in plainer language: &quot;Look for an agency that sells a process, not promises. Ask who will run the account day to day, how they report results tied to revenue not just clicks, and what tracking is set up to prove lead quality&quot; (u/cole-interteam, r/smallbusiness, 2026). Observed buyer sentiment, not a study, but it lines up with the checklist above.
              </p>
              <p style={paragraphStyle}>
                Red flags: guaranteed rankings or results, long lock-in contracts, no account access for you, and reporting built entirely on vanity metrics. For the full checklist, read <a href="/blog/how-to-choose-a-ppc-agency" style={linkStyle}>our full checklist for choosing a PPC agency</a>.
              </p>
            </section>

            {/* Working with */}
            <section id="working-with">
              <h2 style={h2Style}>Working With an Agency: Reporting, Account Ownership, and White-Label</h2>
              <p style={paragraphStyle}>
                Before you sign, confirm you own your account. If an agency runs it under their own manager (MCC) account and you leave, you can lose your history, structure, and learning data.
              </p>
              <p style={paragraphStyle}>
                Concretely: your account should live under your own login, with the agency granted manager access, not the reverse. A manager account is not an upgrade, it is an entirely separate account the agency creates, and if set up correctly you retain the right to unlink from it at any time with your own admin access (<a href="https://support.google.com/google-ads/answer/6139186" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>). That single fact, that you can walk away unilaterally, is the point of control most buyers never realize they have.
              </p>
              <p style={paragraphStyle}>
                A good monthly report covers revenue and ROAS, not just clicks and impressions, and is honest about a cadence mismatch: many agencies report monthly while the account moves daily.
              </p>
              <p style={paragraphStyle}>
                One more thing to ask about: some &quot;agencies&quot; white-label the actual campaign work to a third-party team or software rather than running it themselves. Not automatically bad, but you should know who is really making the decisions. Read <a href="/blog/white-label-google-ads" style={linkStyle}>how white-label Google Ads management works</a> for the full picture.
              </p>
            </section>

            {/* Switch or fire */}
            <section id="switch-or-fire">
              <h2 style={h2Style}>When to Switch or Fire Your Google Ads Agency</h2>
              <p style={paragraphStyle}>
                Switch or fire your agency when results stall for 2-3 months with no explanation, reporting hides spend efficiency, you cannot get a straight answer on who runs the account, or you have outgrown their attention.
              </p>
              <p style={{ ...paragraphStyle, marginBottom: '16px' }}>Warning signs:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Flat or declining ROAS for two or more consecutive months with no diagnosis offered.</li>
                <li style={{ marginBottom: '12px' }}>Reports that show clicks and impressions but not revenue or cost-per-qualified-lead.</li>
                <li style={{ marginBottom: '12px' }}>No one can tell you, by name, who manages your account day to day.</li>
                <li style={{ marginBottom: '12px' }}>Requests for account access or raw data are delayed or refused.</li>
              </ul>
              <p style={paragraphStyle}>
                To leave: reclaim account ownership first, export historical data, line up coverage so there is no gap in management, and know your notice period before you announce anything.
              </p>
              <p style={paragraphStyle}>
                Leaving is sometimes right, sometimes premature: Smart Bidding needs weeks to relearn after a major change, and one soft month during a learning phase is not a genuine stall. Judge the trend over 6-8 weeks. For the deeper version, read <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>the signs it is time to fire your PPC agency</a> and <a href="/blog/how-to-switch-google-ads-agencies" style={linkStyle}>how to switch Google Ads agencies without losing data</a>.
              </p>
              <p style={paragraphStyle}>
                Firing an agency does not have to mean going back to spreadsheets and guesswork. For a lot of owners in the $3-20K/mo band, the next stop is software, not another retainer.
              </p>
            </section>

            {/* Software alternative */}
            <section id="software-alternative">
              <h2 style={h2Style}>The Software Alternative: Running Google Ads Without an Agency</h2>
              <p style={paragraphStyle}>
                Self-serve PPC software now does much of what an agency does, bid and budget optimization, <a href="/blog/google-ads-negative-keywords" style={{ color: '#764ba2', textDecoration: 'underline' }}>negative keywords</a>, creative, alerts, at a fraction of the cost, while you keep full control and account ownership. It is the fastest-growing path for the $3-20K/mo band.
              </p>
              <p style={paragraphStyle}>
                kampaio prices this at Free to start, $49/month Professional, or $149/month Business, against an agency retainer of $1,000-5,000/month, and runs changes in approval mode: you sign off before anything ships. Real limit worth naming: it still assumes you spend a little time each week reviewing changes, and it does not replace strategy for very large or multi-channel accounts. For the strategy layer, read <a href="/blog/google-ads-optimization" style={linkStyle}>how Google Ads optimization actually works</a>.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i === faqItems.length - 1 ? 0 : '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{item.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>

            {/* Getting started */}
            <section id="getting-started">
              <h2 style={h2Style}>Getting Started: Your Next Step</h2>
              <p style={paragraphStyle}>
                Under $3,000/month: try DIY or software before signing a retainer. Above $20,000/month: weigh an agency against an in-house hire on the same grid.
              </p>
              <p style={paragraphStyle}>
                Actively hiring? Use the choose-an-agency checklist next. Already with an agency and unhappy? The switch-and-fire signs above will tell you if that feeling is founded. DIY-curious in the $3,000-20,000/month band? Try the software path first.
              </p>

              <KeyTakeaways
                items={[
                  'Under $3K/mo: DIY or self-serve software beats a retainer.',
                  '$3-20K/mo: software or a consultant usually wins on cost and control.',
                  '$20K+/mo, multi-channel, or zero owner time: an agency or in-house hire earns its fee.',
                  'Own your Google Ads account: the agency gets manager access, not the reverse, so you can unlink anytime.',
                  'Judge a stall over 6-8 weeks. Smart Bidding needs weeks to relearn after a big change.',
                ]}
              />

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Skip the retainer, keep the control
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  kampaio runs your Google Ads from $49/month and shows every step live before it ships. See <a href="/pricing" style={linkStyle}>kampaio&apos;s plans</a>, or connect your own account and watch what it would change first.
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
                  Start with your own account
                </a>
              </div>

              <p style={{ fontSize: '15px', color: '#64748b', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '32px' }}>
                Results vary by account size, vertical, and tracking quality. This article is informational and does not constitute professional advice.
              </p>

              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, marginTop: '8px' }}>
                Sources: Google Ads Help, &quot;About Google Ads manager accounts&quot; (2026); Google Ads Help, &quot;Unlink accounts from your manager account&quot; (2026); Google Ads Help, &quot;Know your billing options&quot; (2026); Reddit r/smallbusiness, &quot;Struggling to find an honest Google Ads agency&quot; (2026); Reddit r/PPC, community discussion on running Google Ads (2026). Dollar and percentage ranges are typical US market figures from independent sources, not a quote from any single agency.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-agency-guide" category="strategy" />
      <Footer compact={true} />
      </div>
    </>
  );
}
