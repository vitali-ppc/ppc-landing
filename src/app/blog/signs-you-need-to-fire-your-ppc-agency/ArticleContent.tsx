'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import InlineSVG from '../../../components/blog/InlineSVG';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "8 Signs It's Time to Fire Your PPC Agency (And What to Do Next)",
    "description": "Eight observable signs your PPC agency is failing, a self-scoring diagnostic, and a step-by-step plan for what to do next: confront, switch, or go independent with AI tools.",
    "image": "https://kampaio.com/og/signs-you-need-to-fire-your-ppc-agency.png",
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
    "datePublished": "2026-05-14T00:00:00.000Z",
    "dateModified": "2026-05-14T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/signs-you-need-to-fire-your-ppc-agency"
    },
    "keywords": "PPC agency, fire PPC agency, signs, Google Ads, agency reports, ROAS, account manager, bid management, change history, MCC access, Smart Bidding, Performance Max, diagnostic, transition, B6, Buzz, Aegis, Echo, freelancer, conversion tracking, AI agents",
    "wordCount": 2178,
    "articleSection": "PPC Optimization",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long should I give my PPC agency to fix issues before firing them?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "60 days maximum, with documented signals and a specific corrective plan in writing from the agency."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average cost of a PPC agency for a small business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "$1-3K per month flat fee, or 10-20% of ad spend, whichever is higher. For a $5K spend SMB, the typical fee means 20-30% of total budget goes to management."
        }
      },
      {
        "@type": "Question",
        "name": "Can I run Google Ads without an agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, especially under $20K/month spend, with the right tool. We covered this in our guide to Google Ads without an agency."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a PPC freelancer and an AI tool like B6?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A freelancer is one person with bandwidth limits and vacation gaps. B6 is 7 AI agents working 24/7 with full transparency on every action."
        }
      },
      {
        "@type": "Question",
        "name": "How do I tell the agency I am firing them?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In writing, with a clear effective date, a request for access transfer, and a polite but unambiguous tone. No need to itemize complaints unless they ask."
        }
      }
    ]
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
        "name": "8 Signs It's Time to Fire Your PPC Agency",
        "item": "https://www.kampaio.com/blog/signs-you-need-to-fire-your-ppc-agency"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: "TL;DR - The 8-Signal PPC Agency Diagnostic", level: 1 },
    { id: 'why-outgrow', title: 'Why So Many SMBs Outgrow Their PPC Agency', level: 1 },
    { id: 'the-8-signs', title: 'The 8 Signs (And How to Verify Each One)', level: 1 },
    { id: 'sign-1', title: 'Sign 1: Reports Show Activity, Not Outcomes', level: 2 },
    { id: 'sign-2', title: 'Sign 2: The Change History Is Empty', level: 2 },
    { id: 'sign-3', title: 'Sign 3: You Got a Junior Account Manager', level: 2 },
    { id: 'sign-4', title: "Sign 4: You Don't Have Full MCC Access", level: 2 },
    { id: 'sign-5', title: 'Sign 5: Vague Answers to Specific PPC Questions', level: 2 },
    { id: 'sign-6', title: 'Sign 6: Flat or Declining ROAS Over 90 Days', level: 2 },
    { id: 'sign-7', title: 'Sign 7: Generic Templated Strategy', level: 2 },
    { id: 'sign-8', title: 'Sign 8: Renewal Always Requires Renegotiation', level: 2 },
    { id: 'how-to-score', title: 'How to Score Your Diagnostic', level: 1 },
    { id: 'when-to-keep', title: 'When You Should Keep Your PPC Agency', level: 1 },
    { id: 'post-agency-path', title: 'The Post-Agency Path: What Comes Next', level: 1 },
    { id: 'transition', title: 'How to Transition From Agency to Independent Management', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Audit Your Agency in 90 Seconds With B6', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const h2Style = { fontSize: '32px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '24px', marginTop: '48px', lineHeight: '1.3' };
  const h3Style = { fontSize: '24px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '16px', marginTop: '40px', lineHeight: '1.3' };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const olStyle = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };

  // Build the change history SVG illustration (Visual 2): a 30-day grid where only ~6 cells are filled,
  // visualizing what an "empty change history" looks like for a $5K+ account.
  const changeHistorySvg = `
<svg viewBox="0 0 540 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 30-day calendar grid with only six cells marked, illustrating an under-managed Google Ads account">
  <style>
    .label { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; fill: #64748b; }
    .legend { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; fill: #475569; }
    .title { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; font-weight: 600; fill: #1e293b; }
  </style>
  <text x="20" y="22" class="title">Last 30 days of change history</text>
  <text x="20" y="42" class="label">$5K+/month account managed by an agency</text>
  <g transform="translate(20, 60)">
    ${(() => {
      // 30-cell grid: 6 rows of 5
      const cells = [];
      const filled = new Set([2, 9, 14, 21, 26, 28]);
      for (let i = 0; i < 30; i++) {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const x = col * 56;
        const y = row * 28;
        const isFilled = filled.has(i);
        const fill = isFilled ? '#667eea' : '#e2e8f0';
        const stroke = isFilled ? '#4f46e5' : '#cbd5e1';
        cells.push(
          `<rect x="${x}" y="${y}" width="48" height="22" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1" />` +
          (isFilled ? `<circle cx="${x + 24}" cy="${y + 11}" r="3" fill="white" />` : '')
        );
      }
      return cells.join('');
    })()}
  </g>
  <g transform="translate(20, 200)">
    <rect x="0" y="0" width="14" height="14" rx="3" fill="#667eea" stroke="#4f46e5" />
    <text x="22" y="11" class="legend">Day with at least one human change (6 days)</text>
    <rect x="280" y="0" width="14" height="14" rx="3" fill="#e2e8f0" stroke="#cbd5e1" />
    <text x="302" y="11" class="legend">Day with no human changes (24 days)</text>
  </g>
</svg>
`;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="signs-you-need-to-fire-your-ppc-agency" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Strategy · PPC Agency
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              8 Signs It&apos;s Time to Fire Your PPC Agency (And What to Do Next)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Eight observable signs your PPC agency is failing, a self-scoring diagnostic, and a step-by-step plan for what to do next.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 14, 2026 · 12 min read</span>
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
        {/* Article Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR - The 8-Signal PPC Agency Diagnostic</h2>
              <p style={pStyle}>
                If you suspect your PPC agency is failing, score yourself against the 8 signals below. The total is your action level. No warm-up: this is a diagnostic, not an opinion piece.
              </p>

              {/* VISUAL 1: Custom interactive-looking scorecard with the 8 signs as checklist tiles + decision band */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '28px',
                marginBottom: '40px',
              }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#475569', marginBottom: '16px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>
                  Score yourself
                </div>
                <div className="b6-signs-grid">
                  {[
                    'Their reports show activity, not outcomes',
                    'The change history is empty',
                    'You got a junior account manager',
                    "You don't have full MCC access",
                    'Vague answers to specific PPC questions',
                    'Flat or declining ROAS over 90 days',
                    'Generic templated strategy that ignores your business',
                    'Renewal always requires renegotiation',
                  ].map((sign, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}>
                      <div style={{
                        flexShrink: 0,
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '14px',
                      }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: '15px', color: '#1e293b', lineHeight: '1.4' }}>{sign}</span>
                    </div>
                  ))}
                </div>
                <div className="b6-score-tier-grid">
                  <div style={{ padding: '16px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #10b981' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#047857', marginBottom: '4px' }}>0-2</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 600 }}>Good partner</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Optimize the relationship.</div>
                  </div>
                  <div style={{ padding: '16px', borderRadius: '10px', background: '#fffbeb', border: '1px solid #f59e0b' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#b45309', marginBottom: '4px' }}>3-5</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 600 }}>Serious talk</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Give them 60 days.</div>
                  </div>
                  <div style={{ padding: '16px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #ef4444' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#b91c1c', marginBottom: '4px' }}>6-8</div>
                    <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 600 }}>Start your search</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Replace the relationship.</div>
                  </div>
                </div>
              </div>

              <p style={pStyle}>
                The rest of this article explains how to verify each signal in your own Google Ads account and what comes after firing.
              </p>
            </section>

            {/* Why SMBs Outgrow */}
            <section id="why-outgrow">
              <h2 style={h2Style}>Why So Many SMBs Outgrow Their PPC Agency</h2>
              <p style={pStyle}>
                Most SMBs do not have a bad agency. They have a bad-fit economics problem.
              </p>
              <p style={pStyle}>
                <strong>Economics.</strong> Agencies are profitable on $20K+/month spend. For a $5K spend SMB, a $1.5K fee equals 30% of total ad budget going to management instead of working media. That math leaves zero margin for senior work. Juniors get assigned, templated strategies get applied.
              </p>
              <p style={pStyle}>
                <strong>Performance Max changed the value-add.</strong> Before pMax launched in 2021, agencies earned fees on bid management, keyword research, and ad copy testing. By 2022, pMax had absorbed most of that into Google&apos;s algorithm. Smart Bidding now handles bid work at a level no human can match when conversion volume is adequate. Agencies that did not pivot to creative and <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a> are now billing for work the platform automates.
              </p>
              <p style={pStyle}>
                <strong>The reporting trap.</strong> Most agency monthly reports are PDF exports of the Google Ads dashboard with brand colors on top. You see the same numbers in the same UI. One older industry survey cited by PPC.co found that only 10% of Google Ads accounts get weekly updates from their manager.
              </p>
              <p style={pStyle}>
                If your gut says something is wrong, the diagnostic below tells you whether it is the agency, the relationship, or just bad-fit economics. Most agency-client switches happen 8 to 14 months too late.
              </p>
            </section>

            {/* The 8 Signs */}
            <section id="the-8-signs">
              <h2 style={h2Style}>The 8 Signs (And How to Verify Each One)</h2>

              {/* Sign 1 */}
              <h3 id="sign-1" style={h3Style}>Sign 1: Their Reports Show Activity, Not Outcomes</h3>
              <p style={pStyle}>A bad report tells you what was done. A good one tells you what changed in the business.</p>
              <p style={pStyle}>
                Bad: &quot;We made 47 bid adjustments and added 23 <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keywords</a> this month.&quot; That is a task list.
              </p>
              <p style={pStyle}>
                Good: &quot;We reduced CPA from $42 to $31 in your top campaign by pausing Display partners. That freed $1,200, reallocated to Shopping, where ROAS climbed from 2.8 to 3.6 over four weeks.&quot; Cause, effect, number.
              </p>
              <p style={pStyle}>
                <strong>Verification check:</strong> Open your last 3 monthly reports. Count specific outcomes: CPA changes with reasons, ROAS shifts with causes, revenue tied to actions. Fewer than 5 outcome statements across 3 reports = signal on.
              </p>

              <MascotQuote mascot="echo">
                I send a weekly summary: revenue change, what Buzz did, what Vox flagged, what Aegis caught. Three bullets. No PDF. You read it in 90 seconds and know whether last week was a win or a problem.
              </MascotQuote>

              {/* Sign 2 */}
              <h3 id="sign-2" style={h3Style}>Sign 2: The Change History Is Empty</h3>
              <p style={pStyle}>The smoking gun. Most readers do not know they can audit it.</p>
              <p style={pStyle}>
                In Google Ads: Tools and settings, then <a href="https://support.google.com/google-ads/answer/2454072" style={linkStyle} target="_blank" rel="noopener noreferrer">Change History</a>. Filter to the last 30 days. For an active account spending $5K or more per month, you should see 20 to 30 changes minimum: bid adjustments, negative keyword adds, asset rotations, audience tweaks. Anything less and the agency is not doing weekly work. They are letting Smart Bidding do everything while billing you for project management overhead.
              </p>

              {/* VISUAL 2: Inline SVG illustration of an empty change history */}
              <InlineSVG
                svg={changeHistorySvg}
                caption="What a real empty change history looks like: 6 days with at least one human change out of 30. Healthy cadence is 2-3 changes per week."
                ariaLabel="Calendar grid showing 30 days, only 6 of which contain a human-initiated change"
              />

              <p style={pStyle}>
                <strong>Verification check:</strong> Count human-initiated changes in the last 30 days. Under 20 for a $5K+ account is the threshold. Healthy cadence: 2-3 changes per week.
              </p>

              {/* Sign 3 */}
              <h3 id="sign-3" style={h3Style}>Sign 3: You Got a Junior Account Manager</h3>
              <p style={pStyle}>Structural, not personal. Agencies put senior people on big accounts. If your spend is under $20K per month, you are statistically assigned to a coordinator or junior specialist.</p>
              <p style={pStyle}>
                <strong>Verification check:</strong> Ask two questions. How long have you been managing PPC accounts? How many other accounts do you manage right now? Under 2 years experience or 12+ active accounts = junior tier.
              </p>
              <p style={pStyle}>
                This is not the account manager&apos;s fault. A senior PPC strategist costs the agency $100K+/year in payroll. Your $1,500 retainer cannot pay for senior attention.
              </p>

              {/* Sign 4 */}
              <h3 id="sign-4" style={h3Style}>Sign 4: You Don&apos;t Have Full MCC Access</h3>
              <p style={pStyle}>
                Critical and often hidden. Many agencies hold MCC (manager account) ownership and grant clients only Standard or Read-only <a href="https://support.google.com/google-ads/answer/6139186" style={linkStyle} target="_blank" rel="noopener noreferrer">access levels</a>. When you fire the agency, they can revoke that access, taking your historical data, conversion tracking, and audience lists with them.
              </p>
              <p style={pStyle}>
                <strong>Verification check 1:</strong> Try to add a user to your Google Ads account. Settings, Access and security, +User. If greyed out or you hit a permissions error, you are not Admin.
              </p>
              <p style={pStyle}>
                <strong>Verification check 2:</strong> Try to export campaign data older than 90 days. If the export silently truncates, you have limited reporting access.
              </p>

              <MascotQuote mascot="aegis">
                I check account access on day one. Owner-level access, independent conversion tracking, full change history. If any of those are locked, that&apos;s the first risk I flag. Tracking that lives in someone else&apos;s MCC is leverage they hold against you at renewal time.
              </MascotQuote>

              <p style={pStyle}>
                If you do not have Admin-level access, fix that before doing anything else, including starting any conversation about leaving. See <a href="/b6#aegis" style={linkStyle}>how Aegis catches risk and access issues</a> on day one of a B6 connection.
              </p>

              {/* Sign 5 */}
              <h3 id="sign-5" style={h3Style}>Sign 5: Vague Answers to Specific PPC Questions</h3>
              <p style={pStyle}>The expertise test. Ask your account manager three questions, then judge by precision.</p>
              <ol style={olStyle}>
                <li style={{ marginBottom: '12px' }}>What is our Search impression share lost to budget vs. rank?</li>
                <li style={{ marginBottom: '12px' }}>Why are we using Target CPA vs. Target ROAS in Campaign X?</li>
                <li style={{ marginBottom: '12px' }}>What does the latest auction insights report show for our top 3 competitors?</li>
              </ol>
              <p style={pStyle}>
                A senior AM differentiates IS Lost Budget (not enough budget to compete) from IS Lost Rank (bids or <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score</a> not strong enough). They explain why Target ROAS fits revenue-based e-commerce and Target CPA fits flat-value lead generation. They name competitor domains and quote overlap from auction insights.
              </p>
              <p style={pStyle}>
                Vague non-answers (&quot;we have good impression share&quot;, &quot;we picked what Google recommended&quot;) mean the AM is not managing at the bid-strategy level.
              </p>

              {/* Sign 6 */}
              <h3 id="sign-6" style={h3Style}>Sign 6: Flat or Declining ROAS Over 90 Days</h3>
              <p style={pStyle}>
                Careful here: ROAS declines for legitimate reasons. Seasonality, increased competition, product mix changes, a broken landing page after a CMS update. The signal is not the decline itself. It is the absence of a documented explanation and a corrective plan.
              </p>
              <p style={pStyle}>
                <strong>Verification check:</strong> Ask your agency for a 90-day performance review with three sections. (1) What changed. (2) Why each change happened. (3) What corrective actions are in motion. No multi-page response within 5 business days = signal on.
              </p>
              <p style={pStyle}>
                Flat ROAS for 6 months in a stable market with no plan is bad. Flat ROAS for 90 days during a seasonal valley with a clear plan to test 3 new asset variants is fine. The difference is whether anyone is steering.
              </p>

              {/* Sign 7 */}
              <h3 id="sign-7" style={h3Style}>Sign 7: Generic Templated Strategy</h3>
              <p style={pStyle}>A good agency has a written strategy document for your account. A bad one has a Notion template with your company name pasted at the top.</p>
              <p style={pStyle}>
                <strong>Verification check:</strong> Ask for your strategy document or campaign brief. Most agencies will admit they don&apos;t have one (red flag in itself). If they produce one, count business-specific mentions. Your products, services, margin tiers, top 3 competitors named?
              </p>
              <p style={pStyle}>
                If the strategy says &quot;we will optimize Search and Shopping campaigns using Smart Bidding to maximize ROAS,&quot; it could be auto-generated for any e-commerce client. Generic strategy produces generic execution.
              </p>

              {/* Sign 8 */}
              <h3 id="sign-8" style={h3Style}>Sign 8: Renewal Always Requires Renegotiation</h3>
              <p style={pStyle}>Healthy agency relationships have invisible renewals. The agency delivers, the client is satisfied, the contract auto-renews. Both parties move on with their work.</p>
              <p style={pStyle}>
                If every renewal turns into a fee dispute or a &quot;we need to talk about scope&quot; conversation, something is off. Usually the agency knows they are not delivering and tries to lock in revenue, or the client has been raising concerns for months and renewal is the only forced moment to address them.
              </p>
              <p style={pStyle}>
                <strong>Verification check:</strong> Last two renewals: did the agency proactively present a renewed scope and prove value before asking for your signature? Or did renewal come up only after you raised concerns?
              </p>
            </section>

            {/* How to Score */}
            <section id="how-to-score">
              <h2 style={h2Style}>How to Score Your Diagnostic</h2>
              <p style={pStyle}>The 8 signals are not equal in weight, but for a quick read, a flat count works.</p>

              {/* VISUAL 3: Three-tier decision cards (custom layout, not Mermaid) */}
              <div className="b6-decision-tier-grid">
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  borderLeft: '6px solid #10b981',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#047857', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '6px' }}>Score</div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#047857', lineHeight: 1, marginBottom: '8px' }}>0-2</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Optimize</div>
                  <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>Good agency-client fit. Document what works. Quarterly check-in, don&apos;t fix what isn&apos;t broken.</div>
                </div>
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                  borderLeft: '6px solid #f59e0b',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '6px' }}>Score</div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#b45309', lineHeight: 1, marginBottom: '8px' }}>3-5</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Serious conversation</div>
                  <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>Don&apos;t fire yet. 60-min call with the account director. Written observations. 60 days for measurable change.</div>
                </div>
                <div style={{
                  padding: '24px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                  borderLeft: '6px solid #ef4444',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '6px' }}>Score</div>
                  <div style={{ fontSize: '36px', fontWeight: 800, color: '#b91c1c', lineHeight: 1, marginBottom: '8px' }}>6-8</div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Start the search</div>
                  <div style={{ fontSize: '15px', color: '#334155', lineHeight: 1.5 }}>Structurally broken. Run agency in parallel 30 days while you transition tracking and access.</div>
                </div>
              </div>

              <p style={pStyle}>
                Scoring is a starting point, not a verdict. Some readers will score 3-5 and decide their agency is salvageable. Others will see one signal alone (locked MCC, for instance) as dealbreaker enough.
              </p>
            </section>

            {/* When to Keep */}
            <section id="when-to-keep">
              <h2 style={h2Style}>When You Should Keep Your PPC Agency</h2>
              <p style={pStyle}>Three cases where keeping the agency is the right move, even at a high score.</p>
              <p style={pStyle}>
                <strong>Case 1: Spend over $50K/month with complex multi-region structure.</strong> Multiple markets, languages, currencies, and product feeds justify agency-level project management. The juniors-on-small-accounts problem inverts: at $50K+ you get the senior team.
              </p>
              <p style={pStyle}>
                <strong>Case 2: You need creative production bundled with media buying.</strong> Custom landing pages, video, display banners, copywriting. Most <a href="/blog/5-tips-for-working-with-ai-ppc-tools" style={linkStyle}>PPC tools</a> (including B6) optimize what you give them; they do not produce creative. Agencies do.
              </p>
              <p style={pStyle}>
                <strong>Case 3: Zero hours per week available.</strong> Not 3-5, not even 1. An imperfect agency beats complete neglect. Smart Bidding without human oversight optimizes for whatever signal it has, usually cheap conversions, not high-value ones.
              </p>
              <p style={pStyle}>
                If none apply and you scored 4 or more signals, the next section is for you.
              </p>
            </section>

            {/* Post-Agency Path */}
            <section id="post-agency-path">
              <h2 style={h2Style}>The Post-Agency Path: What Comes Next</h2>
              <p style={pStyle}>Firing an agency is one decision. What comes next is three options.</p>
              <p style={pStyle}>
                <strong>Hire a different agency.</strong> Same structural problem, different brand. You move from $1,500 to a different $1,500 and still get a junior AM because your spend hasn&apos;t changed.
              </p>
              <p style={pStyle}>
                <strong>Hire a freelancer.</strong> $500-2,000/month, sometimes excellent expertise, often a single point of failure. Vacation gaps. Skill gaps in one or two domains.
              </p>
              <p style={pStyle}>
                <strong>Go independent with an AI tool.</strong> A flat monthly fee for autonomous tools (B6, free while in beta, and a small number of competitors). $499-899/month for recommendation tools (Optmyzr, Madgicx). No retainer minimums. You stay in control of strategy; the tool handles bid adjustments, <a href="/blog/google-ads-anomaly-detection" style={linkStyle}>anomaly detection</a>, and reporting.
              </p>
              <p style={pStyle}>
                B6 sits in the third category as <a href="/b6" style={linkStyle}>7 AI agents</a> doing the work an agency was supposed to do. Buzz handles bids, Aegis flags risk and access issues, Echo sends weekly reports, Vox handles cross-campaign strategy, Maximus orchestrates the rules, Mira generates ad copy and image variants, Sage handles keyword and audience research. Three levels of autonomy: Co-pilot (read-only audit), Approval (every change needs your OK), Autonomous (agents execute within your guardrails). All three are free while B6 is in beta.
              </p>
              <p style={pStyle}>
                The differentiator vs. Optmyzr ($499) and Madgicx ($499+), which give recommendations: B6 actually executes. Approval tier means every action requires your sign-off, but you don&apos;t have to figure out what to do. The agents propose specific changes with reasoning. You approve or reject in a click.
              </p>

              <MascotQuote mascot="buzz">
                Last Tuesday in a $12K/month account I adjusted bids on 31 ad groups. 22 decreases (average minus 9%), 9 increases (average plus 6%). Took me 4 minutes. The agency would have batched this for the monthly report. By then, 4 weeks of overspend is already gone.
              </MascotQuote>

              <p style={pStyle}>Here is how the three options compare at $10K/month ad spend:</p>

              {/* VISUAL 4: ComparisonTable */}
              <ComparisonTable
                headers={['', 'Agency', 'Freelancer', 'B6']}
                rows={[
                  { cells: ['Monthly cost', '$1,500-3,000', '$500-2,000', 'Flat fee, free in beta'] },
                  { cells: ['Your time', '0-2 h/week', '1-3 h/week', '3-5 h/week'] },
                  { cells: ['Who does the work', 'Junior AM', 'One person', '7 AI agents'], highlight: true },
                  { cells: ['Response time', '24-72 hours', 'Hours to days', 'Real-time'] },
                  { cells: ['Vacation gaps', 'None', '2-4 weeks/year', 'None'] },
                ]}
                caption="Agency vs. freelancer vs. B6 at $10K/month ad spend - cost, time, coverage"
              />
            </section>

            {/* Transition */}
            <section id="transition">
              <h2 style={h2Style}>How to Transition From Agency to Independent Management</h2>
              <p style={pStyle}>Six steps. Order matters.</p>

              {/* VISUAL 5: Mermaid journey diagram (different from flowcharts used in sister articles) */}
              <MermaidDiagram
                chart={`journey
  title 30-day agency-to-independent transition
  section Days 1-3 (preparation)
    Request Admin access in writing: 4: You
    Confirm owner-level MCC: 3: You
  section Days 4-10 (extraction)
    Download change history 6mo: 5: You
    Export search terms and conversions: 4: You
    Set up parallel conversion tracking: 3: You
  section Days 11-30 (parallel run)
    Connect B6 in Co-pilot read-only: 5: You,B6
    Compare B6 proposals vs agency work: 5: B6
    Verify tracking numbers match 14d: 4: You
  section Day 30 (cut over)
    Send cancellation notice in writing: 5: You
    Switch B6 to Approval mode: 5: You,B6
`}
                caption="30-day transition timeline. Order matters: secure access before announcing the search."
              />

              <p style={pStyle}>
                <strong>Step 1: Get full MCC ownership first.</strong> Do not tell the agency you are leaving yet. Request Admin or Owner access in writing, framed as standard internal-governance hygiene. If they refuse or stall, that alone confirms signal 4.
              </p>
              <p style={pStyle}>
                <strong>Step 2: Download change history, search terms, and conversion data for the last 6 months.</strong> Your baseline. Even if the agency revokes access later, you have the export.
              </p>
              <p style={pStyle}>
                <strong>Step 3: Set up independent conversion tracking.</strong> Many agencies use their own GA4 property or GTM container. Create yours in parallel. Verify numbers match for 7-14 days before firing. If the numbers don&apos;t match, work the <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking diagnostic</a> before you sign the cancellation letter - agency-installed tracking is one of the most common places we find tag misfires and Consent Mode v2 traps that distort every report you&apos;ve seen for months.
              </p>
              <p style={pStyle}>
                <strong>Step 4: Run the agency and a tool in parallel for 30 days.</strong> Connect B6 in read-only Co-pilot mode, free while in beta. Compare what B6 proposes vs. what the agency actually does. The gap is visible immediately.
              </p>
              <p style={pStyle}>
                <strong>Step 5: Send the cancellation notice.</strong> Most contracts require 30-60 days notice. Written, clear effective date, request access transfer in the same email. Polite but unambiguous.
              </p>
              <p style={pStyle}>
                <strong>Step 6: Switch B6 from Co-pilot to Approval mode.</strong> Agents propose, you approve. 10-15 minutes per day.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>How long should I give my PPC agency to fix issues before firing them?</strong> 60 days maximum, with documented signals and a specific corrective plan in writing from the agency.
              </p>
              <p style={pStyle}>
                <strong>What is the average cost of a PPC agency for a small business?</strong> $1-3K per month flat fee, or 10-20% of ad spend, whichever is higher. For a $5K spend SMB, the typical fee means 20-30% of total budget goes to management.
              </p>
              <p style={pStyle}>
                <strong>Can I run Google Ads without an agency?</strong> Yes, especially under $20K/month spend, with the right tool. We covered this in our <a href="/blog/google-ads-without-agency" style={linkStyle}>guide to Google Ads without an agency</a>.
              </p>
              <p style={pStyle}>
                <strong>What is the difference between a PPC freelancer and an AI tool like B6?</strong> A freelancer is one person with bandwidth limits and vacation gaps. B6 is 7 AI agents working 24/7 with full transparency on every action.
              </p>
              <p style={pStyle}>
                <strong>How do I tell the agency I am firing them?</strong> In writing, with a clear effective date, a request for access transfer, and a polite but unambiguous tone. No need to itemize complaints unless they ask.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Audit Your Agency in 90 Seconds With B6</h2>
              <p style={pStyle}>
                Connect your Google Ads account to B6 in read-only mode. In 90 seconds, our agents audit what your agency has and has not been doing: bid hygiene, negative keyword coverage, wasted spend, change history depth. You see the same scorecard your agency should be sending you, but doesn&apos;t.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '40px'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#1e293b',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Stop paying retainer fees for autopilot.
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: 500,
                }}>
                  Audit your account in 90 seconds. <a href="/pricing" style={linkStyle}>See what each B6 level does</a>.
                </p>
                <a
                  href="/chat"
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '16px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                  }}
                >
                  Audit your account in 90 seconds with B6 -&gt;
                </a>
              </div>
            </section>

          </div>
        </div>
        <KeepReading slug="signs-you-need-to-fire-your-ppc-agency" category="strategy" />
      <Footer />

        {/* Responsive grid layouts: explicit column counts at every viewport (no auto-fit orphans). */}
        <style jsx>{`
          .b6-signs-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 24px;
          }
          @media (max-width: 1100px) {
            .b6-signs-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
            .b6-signs-grid { grid-template-columns: 1fr; }
          }
          .b6-score-tier-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          @media (max-width: 900px) {
            .b6-score-tier-grid { grid-template-columns: 1fr; }
          }
          .b6-decision-tier-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 40px;
          }
          @media (max-width: 900px) {
            .b6-decision-tier-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </>
  );
}
