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
    '@id': 'https://www.kampaio.com/blog/google-ads-consultant#article',
    headline: 'Google Ads Consultant: What They Do, What They Cost, and When to Hire One',
    description: "An honest buyer's guide to Google Ads consultants: what they actually do, real cost ranges (freelancer vs agency vs software), the hiring red flags, and how to know if you need one at all.",
    image: 'https://www.kampaio.com/og/google-ads-consultant.png',
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
    datePublished: '2026-07-07T00:00:00.000Z',
    dateModified: '2026-07-07T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-consultant',
    },
    keywords: 'google ads consultant, google ads consultant cost, hire google ads consultant, ppc consultant, freelance google ads, google ads expert, retainer, percent of spend, red flags, account ownership, google ads consultant vs agency',
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Google Ads Consultant: What They Do, What They Cost, and When to Hire One', item: 'https://www.kampaio.com/blog/google-ads-consultant' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a Google Ads specialist cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically $50-150/hour or $500-5,000/month on retainer if freelance; agencies run $1,500-10,000/month or 10-20% of ad spend. Rates rise with experience and complexity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a Google Ads consultant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An independent specialist hired to audit, restructure, and optimize paid search campaigns, billed hourly, per project, or on retainer, covering audits, structure, bidding, ad copy, and conversion tracking.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is $1 a day good for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, it is too low for Smart Bidding to get enough conversion signal. At that spend, neither a consultant nor an agency retainer makes economic sense; self-management or free software is the right call.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are Google Ads Experts legit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, Google's Ads Expert program is a legitimate free onboarding call in your first 30 days. Paid consultants calling themselves experts are a separate category with variable quality, so vet them against the red and green flags.",
        },
      },
      {
        '@type': 'Question',
        name: 'Should I hire a consultant, an agency, or use software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A consultant for a finite audit or rebuild, an agency for higher spend with zero owner bandwidth, software for continuous optimization at SMB spend without a retainer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I own my Google Ads account if a consultant runs it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Only if it sits under your own login or your own MCC, not the consultant's. If their manager account controls it, leaving means starting over with no history and no learned Smart Bidding signals.",
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'What Is a Google Ads Consultant? (Quick Answer)', level: 1 },
    { id: 'what-they-do', title: 'What Does a Google Ads Consultant Actually Do?', level: 1 },
    { id: 'cost', title: 'How Much Does a Google Ads Consultant Cost?', level: 1 },
    { id: 'vs', title: 'Consultant vs Agency vs In-House vs Software', level: 1 },
    { id: 'need-one', title: 'Do You Actually Need a Google Ads Consultant?', level: 1 },
    { id: 'flags', title: 'Red Flags and Green Flags When Hiring', level: 1 },
    { id: 'software', title: "When Software Beats a Consultant (and When It Doesn't)", level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'bottom-line', title: 'Match the Help to the Job, Not the Sales Pitch', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' } as const;
  const h2Style = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px' } as const;
  const h3Style = { fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', marginTop: '40px' } as const;
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' } as const;

  // BOLD-VIZ: fee-as-share-of-budget at $5K spend. Consultant retainer eats 30%
  // of the monthly budget; autonomous software is a flat slice at SMB spend.
  // Numbers from the article body: $5,000 spend, $1,500 retainer = 30%; software $49-149/mo.
  const feeShareSvg = `
<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" role="img" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">
  <text x="0" y="24" font-size="15" font-weight="700" fill="#1e293b">Management cost as a share of a $5,000/month budget</text>

  <text x="0" y="70" font-size="14" fill="#64748b">Consultant</text>
  <rect x="150" y="56" width="270" height="26" rx="4" fill="#10b981"/>
  <rect x="420" y="56" width="116" height="26" rx="4" fill="#ef4444"/>
  <text x="285" y="74" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">ad spend $5,000</text>
  <text x="556" y="74" font-size="13" font-weight="700" fill="#ef4444">30%</text>

  <text x="0" y="140" font-size="14" fill="#64748b">Software</text>
  <rect x="150" y="126" width="376" height="26" rx="4" fill="#10b981"/>
  <rect x="526" y="126" width="10" height="26" rx="4" fill="#ef4444"/>
  <text x="338" y="144" font-size="13" font-weight="600" fill="#ffffff" text-anchor="middle">ad spend $5,000</text>
  <text x="556" y="144" font-size="13" font-weight="700" fill="#10b981">2%</text>

  <text x="0" y="196" font-size="13" fill="#64748b">Consultant: a $1,500 retainer against $5,000 spend is 30% going to management, not media.</text>
  <text x="0" y="216" font-size="13" fill="#64748b">Software: a flat $49-149/month is roughly 1-3% of the same budget, and it does not climb.</text>

  <rect x="0" y="234" width="14" height="14" rx="3" fill="#10b981"/>
  <text x="22" y="245" font-size="12" fill="#64748b">money in the auction</text>
  <rect x="200" y="234" width="14" height="14" rx="3" fill="#ef4444"/>
  <text x="222" y="245" font-size="12" fill="#64748b">management fee (never reaches the auction)</text>
</svg>`;

  const tdStyle = { padding: '12px 16px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', verticalAlign: 'top' } as const;
  const thStyle = { padding: '12px 16px', borderBottom: '2px solid #e5e7eb', textAlign: 'left' as const, fontWeight: 600, color: '#1e293b' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-consultant" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Strategy · Hiring
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Consultant: What They Do, What They Cost, and When to Hire One
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              An honest buyer's guide: what a consultant actually does, real cost ranges, the hiring red flags, and how to know if you need one at all.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 7, 2026 · 13 min read</span>
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
                A Google Ads consultant is an independent specialist who audits, restructures, and optimizes your paid search account, typically billing $50-150/hour, $500-5,000/month on retainer, or a flat $500-2,500 for a one-time audit. The right fit depends on your spend, complexity, and whether you need a one-off fix or ongoing management.
              </p>
            </section>

            {/* Quick answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>What Is a Google Ads Consultant? (Quick Answer)</h2>
              <p style={pStyle}>
                A Google Ads consultant is an independent specialist you hire to audit, plan, and optimize your paid search and shopping campaigns, usually hourly, per project, or on a monthly retainer. A typical engagement looks like this: a two-week rebuild of a Performance Max campaign that's bleeding budget into irrelevant placements, fixing asset groups and audience signals, then handing the account back or moving you onto a lighter retainer.
              </p>
              <p style={pStyle}>Decision shortcut:</p>
              <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '28px 32px', marginBottom: '32px' }}>
                <ul style={{ fontSize: '17px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}><strong>One-off audit or account rebuild:</strong> hire a consultant or run the audit yourself with software.</li>
                  <li style={{ marginBottom: '12px' }}><strong>Ongoing, hands-off management at higher spend:</strong> an agency or autonomous software fits better than a solo consultant's limited hours.</li>
                  <li style={{ marginBottom: 0 }}><strong>Low spend, simple structure, some time on your hands:</strong> software or <a href="/blog/google-ads-without-agency" style={linkStyle}>running Google Ads without an agency</a> beats paying anyone a retainer.</li>
                </ul>
              </div>
              <p style={pStyle}>
                Here's the number worth knowing before you take a sales call: a freelance consultant typically charges $500-5,000/month on retainer, or $50-150/hour for project work. Listed rates on <a href="https://www.upwork.com" style={linkStyle} target="_blank" rel="noopener noreferrer">Upwork's Google Ads freelancer marketplace</a> span $5-100/hour, which tells you how wide "consultant pricing" swings before experience even enters the conversation. Oddly, no page ranking for this search actually publishes that range. That gap is the whole reason this guide exists.
              </p>
            </section>

            {/* What they do */}
            <section id="what-they-do">
              <h2 style={h2Style}>What Does a Google Ads Consultant Actually Do?</h2>
              <p style={pStyle}>
                A Google Ads consultant is paid to find and fix what a dashboard alone will not surface. That breaks down into six deliverables: <strong>account audit</strong> (structure, budget, bidding, search-terms waste), <strong>campaign structure</strong> (reorganizing so Smart Bidding signals are not diluted), <strong>keyword and negative-keyword <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a></strong> (cutting leakage into irrelevant queries), <strong>bid and budget management</strong> (Target ROAS, Target CPA, Performance Max splits), <strong>ad copy and RSA testing</strong>, and <strong><a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking</a> and reporting</strong> you can actually act on.
              </p>
              <p style={pStyle}>
                Two engagement shapes cover almost every relationship. A <strong>one-time audit or rebuild</strong> is fixed scope: pay once, get a deliverable, implement it or hand it off. An <strong>ongoing retainer</strong> is recurring management, checking in weekly or biweekly. Consultants tend to earn their fee fastest on the former. A rebuild has a clear before-and-after. A retainer has to keep justifying itself, month after month.
              </p>
              <p style={pStyle}>
                Some tasks are genuinely worth paying a specialist for: broken conversion tracking, Performance Max budget reallocation, restructuring a chaotic account, reading auction insights correctly. One PPC practitioner on X put a number on exactly this leak: "20-40% of budget disappears inside PMax, broad match, 'smart' bidding" (<a href="https://x.com/LeeCaston2/status/2043956231862190206" style={linkStyle} target="_blank" rel="noopener noreferrer">@LeeCaston2, X, April 2026</a>), which is precisely the kind of waste an audit is built to find. Others stay easy to keep in-house: basic reporting, simple ad copy tweaks, pausing an underperforming keyword. Know which bucket your problem falls into before you start pricing out help.
              </p>
              <p style={pStyle}>
                One clarification matters most here, and it's the one most buyers get wrong. A Google Ads consultant is not Google's own free <strong>Google Ads Expert</strong> service, a complimentary 1-to-1 onboarding call or chat in the first 30 days after signup (<a href="https://business.google.com/us/support/ads-expert/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google, Ads Expert support</a>). It's useful for brand-new accounts, but it's one-time onboarding, not ongoing management, and it's not the automated Recommendations tab either. If your account is a year old and ROAS is sliding, this is not the resource you need, however tempting the word "free" looks.
              </p>
            </section>

            {/* Cost */}
            <section id="cost">
              <h2 style={h2Style}>How Much Does a Google Ads Consultant Cost?</h2>
              <p style={pStyle}>
                A Google Ads consultant typically costs $50-150/hour, $500-5,000/month on retainer, or a flat $500-2,500 for a one-off audit, depending on experience and complexity. These are ranges, not fixed prices, and anyone quoting you a single suspiciously round number is worth a second look. A senior specialist on a complex account bills at the top. A junior freelancer on a simple account bills at the bottom. For the full breakdown across every option, see <a href="/blog/ppc-management-cost" style={linkStyle}>what PPC management actually costs</a>.
              </p>

              <ComparisonTable
                headers={['Option', 'Typical cost', 'Who does the work', 'Best fit']}
                rows={[
                  { cells: ['Freelance consultant', '$50-150/hour or $500-5,000/month', 'One named specialist', 'One-off audits, rebuilds, or lean ongoing management'] },
                  { cells: ['Agency', '$1,500-10,000/month or 10-20% of ad spend', 'A team (strategist, account manager, sometimes creative)', 'Higher spend, multi-channel, or zero owner bandwidth'] },
                  { cells: ['In-house hire', 'Loaded salary, the highest fixed cost', 'A full-time employee', 'High spend and complexity that justify a dedicated headcount'] },
                  { cells: ['Google Ads Expert (free)', '$0', "Google's own onboarding staff", 'First 30 days only, setup help, not ongoing management'] },
                  { cells: ['AI software (Kampaio)', 'Free, then $49-149/month', 'Autonomous agents, you approve changes', 'Continuous optimization at SMB spend, no retainer'], highlight: true },
                ]}
                caption="Google Ads consultant vs agency vs in-house vs software: cost and best fit"
              />

              <p style={pStyle}>
                A consultant's fee follows one of three models, and the model changes what you're actually buying. <strong>Hourly</strong> suits a defined project with scope known upfront. <strong>Monthly retainer</strong> suits ongoing management on a recurring cadence. <strong>Percent-of-spend</strong> is the one to read carefully: the consultant earns more as spend grows, not as profit grows. Ask for a spend cap or a hybrid fee, or the incentive points away from your interest, quietly, for as long as the contract runs.
              </p>
              <p style={pStyle}>
                Here's the reality check if you think in ROI: at $5,000/month in ad spend, a $1,500/month retainer is 30 percent of your budget going to management, not media. That math rarely works at low spend. It improves as spend and complexity rise, since the fee becomes a smaller share of the total. One practitioner on X put a number on the exact problem a consultant, or good software, is hired to fix: "most brands are burning 20-30% of their budget on totally fixable mistakes" (<a href="https://x.com/blvckledge/status/2046801966680928454" style={linkStyle} target="_blank" rel="noopener noreferrer">@blvckledge, X, April 2026</a>). That's the number that makes a consultant worth calling. It's also the number a good one should erase within the first month, not keep managing around forever.
              </p>

              {/* BOLD-VIZ: fee share of budget */}
              <InlineSVG svg={feeShareSvg} caption="At $5,000/month spend, a $1,500 consultant retainer is 30% of the budget; flat software is roughly 1-3%." ariaLabel="Bar chart comparing a consultant retainer versus flat software as a share of a $5,000 monthly Google Ads budget" />

              <h3 style={h3Style}>Consultant Fit Ladder: Which Path by Spend Band</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontSize: '16px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={thStyle}>Monthly ad spend</th>
                    <th style={thStyle}>Recommended path</th>
                    <th style={thStyle}>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>Under $3,000</td>
                    <td style={tdStyle}>Software or DIY</td>
                    <td style={tdStyle}>A consultant's or agency's fee eats too much of the budget; low spend rarely justifies a retainer.</td>
                  </tr>
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>$3,000-15,000</td>
                    <td style={tdStyle}>Software, or a consultant for a one-off audit/rebuild</td>
                    <td style={tdStyle}>Ongoing retainers are expensive relative to spend; hire a consultant for a defined project, not a standing relationship.</td>
                  </tr>
                  <tr>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>$15,000-50,000</td>
                    <td style={tdStyle}>Consultant, agency, or software, compared on cost and complexity</td>
                    <td style={tdStyle}>All three are viable; the deciding factor is owner time and how many channels are involved.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', color: '#1e293b', fontWeight: 600, verticalAlign: 'top' }}>$50,000+</td>
                    <td style={{ padding: '12px 16px', color: '#1e293b', verticalAlign: 'top' }}>Agency or in-house hire, often paired with software</td>
                    <td style={{ padding: '12px 16px', color: '#1e293b', verticalAlign: 'top' }}>Complexity and stakes justify a dedicated team or headcount; software still handles the continuous layer underneath.</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* vs */}
            <section id="vs">
              <h2 style={h2Style}>Consultant vs Agency vs In-House vs Software: Which Is Right for You?</h2>
              <p style={pStyle}>
                The right option depends on your spend, complexity, and available time, not which page you happened to land on first. All four are legitimate, and we <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={linkStyle}>compare agency vs in-house vs software in full</a> if you want the deeper breakdown. The mistake is picking the wrong one for your situation, not picking the "wrong category" in some abstract sense.
              </p>
              <p style={pStyle}>
                A freelance consultant fits a finite, expert engagement, or a lean ongoing relationship if you want one specialist rather than a team. An agency fits higher spend, multiple channels, or zero owner time, though small accounts often get junior attention even when the sales conversation was with a senior partner (worth asking about directly, before you sign). An in-house hire fits high spend and complexity that justify full control, but it's the worst option on fixed cost: a loaded salary runs whether the account needs daily attention or not. Software fits continuous optimization at SMB spend without a retainer, where cadence is the whole game.
              </p>

              <MascotQuote mascot="maximus">
                A consultant reviews your account on a call every week or two. On a $7,000/month account, I run bid and budget checks every few hours. Last Tuesday I caught a Performance Max campaign drifting 34 percent over target CPA and paused the overspend before the next scheduled check-in would even have happened.
              </MascotQuote>

              <p style={pStyle}>
                Software does not replace a consultant for every job, though, and we're not going to pretend it does. A one-time strategic rebuild, an unusual account structure, or bundled creative production still benefit from a human specialist's judgment. The point is matching the option to the job, not declaring a universal winner.
              </p>
            </section>

            {/* Need one */}
            <section id="need-one">
              <h2 style={h2Style}>Do You Actually Need a Google Ads Consultant?</h2>
              <p style={pStyle}>
                You need a consultant if you need a one-time expert audit or rebuild you genuinely cannot do in-house; you likely do not if your account is simple and spend is modest. Run this self-test:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Do you need a one-time expert audit or rebuild you cannot do yourself?</strong> If yes, hire a consultant for exactly that project, with a defined scope and end date.</li>
                <li style={{ marginBottom: '16px' }}><strong>Is your spend or structure complex enough that ongoing senior attention pays for itself?</strong> If yes, a consultant, agency, and software are all viable; compare cost against the decisions being made. If the answer is an agency, <a href="/blog/how-to-choose-a-ppc-agency" style={linkStyle}>here's how to vet and choose one</a> without getting burned by the sales pitch.</li>
                <li style={{ marginBottom: 0 }}><strong>Do you lack both the time and the tooling to manage it yourself?</strong> If no to all three, you likely need better tooling, not a retainer.</li>
              </ol>
              <p style={pStyle}>
                For a $3,000-15,000/month account, a good senior consultant's time is expensive relative to the spend being managed, and percent-of-spend can quietly misalign incentives at exactly this size. That's not "consultants are bad." It's math: a $500 monthly fee makes more sense against $30,000 of spend than against $3,000, and no amount of good intentions changes that ratio.
              </p>
              <p style={pStyle}>
                None of this is meant to sell you on one path. If the self-test points to a one-off project, hire a consultant for that project, full stop. The rest of this guide exists to help you self-select, not to steer you toward us by default.
              </p>
            </section>

            {/* Flags */}
            <section id="flags">
              <h2 style={h2Style}>Red Flags and Green Flags When Hiring a Google Ads Consultant</h2>
              <p style={pStyle}>
                The fastest way to evaluate a Google Ads consultant: check who owns the account and whether pricing and deliverables are stated plainly.
              </p>
              <div className="flag-grid">
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '14px', padding: '24px 28px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#ef4444', marginBottom: '14px', marginTop: 0 }}>Red flags</p>
                  <ul style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '20px', margin: 0 }}>
                    <li style={{ marginBottom: '10px' }}>Guaranteed results, or any version of "we'll double your ROAS"</li>
                    <li style={{ marginBottom: '10px' }}>Your Google Ads account sits under their own manager (MCC) account, so you do not own it</li>
                    <li style={{ marginBottom: '10px' }}>Long lock-in contracts with no clear exit</li>
                    <li style={{ marginBottom: '10px' }}>Vague "we'll optimize" language with no deliverables list</li>
                    <li style={{ marginBottom: '10px' }}>Cannot clearly explain the difference between Target ROAS and Target CPA</li>
                    <li style={{ marginBottom: '10px' }}>A "consultant" who is actually a reseller outsourcing your account to someone else</li>
                    <li style={{ marginBottom: '10px' }}>Percent-of-spend pricing with no cap</li>
                    <li style={{ marginBottom: 0 }}>No reporting you can actually act on</li>
                  </ul>
                </div>
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '14px', padding: '24px 28px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#10b981', marginBottom: '14px', marginTop: 0 }}>Green flags</p>
                  <ul style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '20px', margin: 0 }}>
                    <li style={{ marginBottom: '10px' }}>You own your Google Ads account and its data, full stop</li>
                    <li style={{ marginBottom: '10px' }}>Clear scope and a written deliverables list</li>
                    <li style={{ marginBottom: '10px' }}>Transparent flat or hourly pricing you can check against the ranges above</li>
                    <li style={{ marginBottom: '10px' }}>A named senior specialist doing the actual work, not a junior handed off after the pitch</li>
                    <li style={{ marginBottom: '10px' }}>Documented experience in your niche or spend band</li>
                    <li style={{ marginBottom: '10px' }}>Reporting you can act on, not a vanity dashboard</li>
                    <li style={{ marginBottom: 0 }}>Willing to start with a paid audit before proposing a retainer</li>
                  </ul>
                </div>
              </div>
              <p style={{ ...pStyle, marginTop: '32px' }}>
                Account ownership is the single most important green flag here, and it's the one people skip because it feels like paperwork. Google Ads manager (MCC) accounts structurally control access to client accounts underneath them (<a href="https://support.google.com/google-ads/answer/6139186" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: about manager accounts</a>). Leave a consultant whose MCC controls your account and you start from zero: no history, no learned Smart Bidding signals, no audience data. Confirm the account is yours before you sign anything, not after.
              </p>
            </section>

            {/* Software */}
            <section id="software">
              <h2 style={h2Style}>When Software Beats a Consultant (and When It Doesn't)</h2>
              <p style={pStyle}>
                Software beats a consultant when you need continuous optimization at SMB spend without a monthly retainer; a consultant still wins for a one-time strategic rebuild or a human strategist's judgment on a major pivot.
              </p>
              <p style={pStyle}>
                The software landscape splits into two categories. <strong>Recommendation tools</strong> like Optmyzr ($499+), Madgicx ($499+), and Adalysis tell you what to do, but you still execute every change yourself. <strong>Autonomous software</strong> runs the optimization work continuously and shows every step live. Synter is one more name worth knowing here, priced around $199/month as a universal management layer.
              </p>
              <p style={pStyle}>
                Kampaio sits in the autonomous category: an AI PPC cabinet with specialist agents. Maximus orchestrates the account; Buzz handles bids and budgets; Aegis flags risk; Echo handles reporting; Vox works cross-campaign strategy; Sage runs research. You can <a href="/b6" style={linkStyle}>see how the agents run your account</a> before connecting anything. Pricing is Free to start, then Professional at $49/month or Business at $149/month, versus a consultant's $500-5,000/month retainer (<a href="/pricing" style={linkStyle}>Kampaio pricing</a>). Every change waits for your approval, so you keep control while the agents do the continuous work a periodic check-in simply cannot match.
              </p>
              <p style={pStyle}>
                The honest boundary is worth repeating, because it's what a page selling consulting would never say out loud: software wins on continuous optimization and cost at SMB spend. A consultant wins on a one-time rebuild, an unusual account structure, or a human strategist's judgment on a decision big enough to justify the fee. Both things are true at once, and pretending otherwise is how you end up buying the wrong thing.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How much does a Google Ads specialist cost?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Typically $50-150/hour or $500-5,000/month on retainer if freelance; agencies run $1,500-10,000/month or 10-20% of ad spend. Rates rise with experience and complexity.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>What is a Google Ads consultant?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>An independent specialist hired to audit, restructure, and optimize paid search campaigns, billed hourly, per project, or on retainer, covering audits, structure, bidding, ad copy, and conversion tracking.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Is $1 a day good for Google Ads?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>No, it is too low for Smart Bidding to get enough conversion signal. At that spend, neither a consultant nor an agency retainer makes economic sense; self-management or free software is the right call.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Are Google Ads Experts legit?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Yes, Google's Ads Expert program is a legitimate free onboarding call in your first 30 days (<a href="https://business.google.com/us/support/ads-expert/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google, Ads Expert support</a>). Paid consultants calling themselves "experts" are a separate category with variable quality, so vet them against the flags above.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Should I hire a consultant, an agency, or use software?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>A consultant for a finite audit or rebuild, an agency for higher spend with zero owner bandwidth, software for continuous optimization at SMB spend without a retainer.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Do I own my Google Ads account if a consultant runs it?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Only if it sits under your own login or your own MCC, not the consultant's (<a href="https://support.google.com/google-ads/answer/6139186" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: about manager accounts</a>). If their MCC controls it, leaving means starting over.</p>
                </div>
              </div>
            </section>

            {/* Bottom line + CTA */}
            <section id="bottom-line">
              <h2 style={h2Style}>Match the Help to the Job, Not the Sales Pitch</h2>
              <p style={pStyle}>
                If you need a one-time expert audit or rebuild, hire a consultant for exactly that, with a clear scope and an end date. If you need continuous optimization without a retainer, that's what software is built for.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  See the optimization on your own account
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Connect your Google Ads account to Kampaio, watch Maximus run the first optimization cycle, and approve or reject every change yourself. No contract, no lock-in, <a href="/pricing" style={linkStyle}>pricing starts free</a>.
                </p>
                <a
                  href="/chat"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                >
                  Connect Google Ads to Kampaio
                </a>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '24px' }}>
                Results may vary. This article is informational and does not constitute professional advice.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '24px' }}>Sources</h3>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><a href="https://business.google.com/us/support/ads-expert/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google, Ads Expert support (free onboarding program)</a></li>
                <li><a href="https://support.google.com/google-ads/answer/6139186" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About manager (MCC) accounts</a></li>
                <li><a href="https://www.upwork.com" style={linkStyle} target="_blank" rel="noopener noreferrer">Upwork, Google Ads freelancer marketplace</a></li>
                <li><a href="https://x.com/blvckledge/status/2046801966680928454" style={linkStyle} target="_blank" rel="noopener noreferrer">@blvckledge on X, April 2026</a></li>
                <li><a href="https://x.com/LeeCaston2/status/2043956231862190206" style={linkStyle} target="_blank" rel="noopener noreferrer">@LeeCaston2 on X, April 2026</a></li>
              </ul>
            </section>

          </div>
        </div>
        <KeepReading slug="google-ads-consultant" category="strategy" />
      <Footer compact={true} />
      </div>
      <style jsx>{`
        .flag-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        @media (max-width: 720px) {
          .flag-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
