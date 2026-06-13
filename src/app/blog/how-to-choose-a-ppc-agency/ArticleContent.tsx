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
    '@id': 'https://www.kampaio.com/blog/how-to-choose-a-ppc-agency#article',
    headline: 'How to Choose a PPC Agency (and How to Know When You Don\'t Need One)',
    description: 'A buyer\'s framework for choosing a PPC agency: fair fees, red flags, the questions to ask, and an honest test for whether you even need an agency or just better tooling.',
    image: 'https://www.kampaio.com/og/how-to-choose-a-ppc-agency.png',
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
    datePublished: '2026-06-10T00:00:00.000Z',
    dateModified: '2026-06-10T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/how-to-choose-a-ppc-agency',
    },
    keywords: 'PPC agency, choose a PPC agency, PPC management fees, PPC agency questions, in-house vs agency, AI PPC tooling',
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'How to Choose a PPC Agency', item: 'https://www.kampaio.com/blog/how-to-choose-a-ppc-agency' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I choose the right PPC agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Match the agency\'s spend-band experience to your budget, confirm you own your Google Ads account unconditionally, verify a named senior manager is assigned to your account, and get a written deliverables list before signing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a PPC agency cost per month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Flat retainers typically run $1,000 to $5,000 per month. Percent-of-spend models charge 10 to 20 percent of monthly ad budget. Setup fees of $500 to $2,500 are common and charged separately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I hire a PPC agency or manage Google Ads in-house?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Above $15K per month or running multi-channel campaigns, an agency can justify the fee. Below $15K per month with a simple structure, in-house management with AI tooling typically delivers better optimization frequency at lower cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'What questions should I ask a PPC agency before hiring?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Eight non-negotiables: account ownership, named day-to-day manager, fee structure, written monthly deliverables, reporting cadence with a real sample report, PMax allocation process, contract length and exit terms, and a niche-specific case study. Evasion on account ownership or the day-to-day manager is the clearest disqualifier.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I own my Google Ads account if I use an agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You should own it, and you should confirm this in writing before signing. The agency manages through an MCC account, which is normal. The non-negotiable: you retain independent access and all data returns to you when the relationship ends.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a PPC agency worth it for a small business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most businesses spending under $15K per month, usually not at full agency rates. The economics result in junior management of your account. A freelancer ($500 to $2K per month) or AI tooling ($99 to $399 per month) typically delivers more consistent attention per dollar at that spend level.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'How Do You Choose a PPC Agency? (Quick Answer)', level: 1 },
    { id: 'what-good-agency-does', title: 'What a Good PPC Agency Actually Does', level: 1 },
    { id: 'do-you-need-one', title: 'Do You Actually Need a PPC Agency?', level: 1 },
    { id: 'fair-fee', title: 'What a Fair PPC Agency Fee Looks Like', level: 1 },
    { id: 'red-green-flags', title: 'Red Flags and Green Flags When Vetting an Agency', level: 1 },
    { id: 'questions-to-ask', title: 'Questions to Ask a PPC Agency Before You Sign', level: 1 },
    { id: 'in-house-ai', title: 'The In-House Plus AI Tooling Alternative', level: 1 },
    { id: 'decision-framework', title: 'A Simple Decision Framework', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'conclusion', title: 'Choose the Setup That Matches Your Spend, Not the Sales Pitch', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' } as const;
  const h2Style = { fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px', lineHeight: '1.3' } as const;
  const liStyle = { marginBottom: '14px' } as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />

        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="how-to-choose-a-ppc-agency" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Strategy · PPC Buying
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              How to Choose a PPC Agency (and How to Know When You Don&apos;t Need One)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              A buyer&apos;s framework for fair fees, red flags, the right questions, and an honest test for whether an agency or better tooling fits your spend.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 10, 2026 · 11 min read</span>
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
                <span style={{ transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
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
            <section id="intro">
              <p style={pStyle}>
                Choose a PPC agency by verifying spend-band experience, confirming you own your Google Ads account, getting a transparent fee structure, and asking who manages your account day to day. But first check whether you need one: a $1.5K monthly retainer on a $5K ad spend is 30% of your budget going to management, not media. (<a href="https://www.lyfemarketing.com/blog/how-to-choose-best-ppc-management-agencies/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, 2024</a>)
              </p>
            </section>

            {/* Quick Answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>How Do You Choose a PPC Agency? (Quick Answer)</h2>
              <p style={pStyle}>
                Four non-negotiables: spend-band experience that matches your budget, account ownership that stays with you, a transparent fee, and a named senior manager who actually runs your account.
              </p>

              {/* VISUAL 1: spend-band decision card grid (3 items, explicit repeat(3,1fr)) */}
              <div className="decision-shortcut-grid">
                <div className="ds-card" style={{ borderTop: '4px solid #10b981' }}>
                  <div className="ds-band">Under $15K/mo</div>
                  <p className="ds-text">Simple Search + Shopping/pMax structure: in-house + AI tooling often outperforms a junior-managed agency on both cost and attention.</p>
                </div>
                <div className="ds-card" style={{ borderTop: '4px solid #f59e0b' }}>
                  <div className="ds-band">$15K&ndash;$50K/mo</div>
                  <p className="ds-text">Or multi-channel: a strong agency or advanced AI tooling. Either can work depending on your internal capacity.</p>
                </div>
                <div className="ds-card" style={{ borderTop: '4px solid #667eea' }}>
                  <div className="ds-band">$50K+ / multi-market</div>
                  <p className="ds-text">An agency typically earns its fee at this scale and complexity.</p>
                </div>
              </div>

              <p style={pStyle}>
                Before you call a single agency, run the self-test below. Every agency you talk to has a structural incentive to say yes. We don&apos;t.
              </p>
            </section>

            {/* What a good agency does */}
            <section id="what-good-agency-does">
              <h2 style={h2Style}>What a Good PPC Agency Actually Does</h2>
              <p style={pStyle}>
                A good PPC agency plans, runs, and optimizes your paid search and shopping campaigns as a managed service. The real work breaks into six deliverables you should expect in writing:
              </p>
              <ol style={{ ...pStyle, paddingLeft: '24px' }}>
                <li style={liStyle}><strong>Account structure</strong> &mdash; campaign segmentation, ad group architecture, match type strategy</li>
                <li style={liStyle}><strong>Keyword and negative keyword strategy</strong> &mdash; ongoing search terms review, blocking irrelevant traffic</li>
                <li style={liStyle}><strong>Bid and budget management</strong> &mdash; <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>Smart Bidding adjustments</a>, budget pacing</li>
                <li style={liStyle}><strong>Ad copy and creative testing</strong> &mdash; RSA headline rotation, A/B testing, seasonal updates</li>
                <li style={liStyle}><strong>Performance Max budget allocation</strong> &mdash; asset group setup, audience signals, PMax vs Search budget split (<a href="https://developers.google.com/google-ads/api/performance-max" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads: About Performance Max</a>)</li>
                <li style={liStyle}><strong>Reporting</strong> &mdash; a weekly or monthly view of spend, conversions, ROAS, and next steps</li>
              </ol>
              <p style={pStyle}>
                PMax budget allocation and auction insights interpretation require genuine expertise. Basic reporting and copy edits do not. A good agency assigns a named senior strategist to your account, but small accounts ($3-15K spend) tend to get junior managers, because the economics don&apos;t justify senior time at that fee level.
              </p>
            </section>

            {/* Do you need one */}
            <section id="do-you-need-one">
              <h2 style={h2Style}>Do You Actually Need a PPC Agency?</h2>
              <p style={pStyle}>
                Hiring an agency is the default advice you will hear everywhere. For accounts above $15K/month with complex structure, that advice is often correct. For SMBs spending $3-15K/month with a simple Search + Shopping/pMax structure, the economics work against you.
              </p>
              <p style={pStyle}>
                George Prodanov, Google Ads Expert and Founder of PPC Consultancy, put it plainly: &ldquo;What&apos;s become evident when working with large agencies is the pervasive overreliance on junior talent for most tasks, accounts that are less lucrative for larger agencies are often used as &lsquo;training wheels&rsquo; for inexperienced staff.&rdquo; (<a href="https://ppchero.com/how-to-choose-a-ppc-agency/" style={linkStyle} target="_blank" rel="noopener noreferrer">PPCHero, Aug 2025</a>)
              </p>

              {/* VISUAL 2: self-test checklist card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderLeft: '4px solid #667eea', borderRadius: '12px', padding: '28px 32px', margin: '32px 0' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#667eea', marginBottom: '16px' }}>
                  Quick self-test
                </div>
                <ol style={{ fontSize: '17px', lineHeight: '1.7', color: '#1e293b', paddingLeft: '22px', margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>Is your spend above ~$15K/month with a complex multi-channel structure?</li>
                  <li style={{ marginBottom: '12px' }}>Do you have zero hours per week for the account?</li>
                  <li style={{ marginBottom: '0' }}>Do you need bundled creative production (video, landing pages, feed management)?</li>
                </ol>
                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#475569', marginTop: '18px', marginBottom: 0 }}>
                  <strong>Yes</strong> to one or more: an agency earns its fee. <strong>No</strong> to all three: you likely need tooling, not a retainer.
                </p>
              </div>

              <p style={pStyle}>
                <strong>Three paths:</strong>
              </p>
              <ul style={{ ...pStyle, paddingLeft: '24px' }}>
                <li style={liStyle}>Spend $15K+/month, multi-channel, or zero internal capacity: hire a PPC agency and use the checklist below.</li>
                <li style={liStyle}>Have some PPC literacy and 5-10 hours per week: in-house + freelancer. Lower cost, more continuity than rotating junior staff.</li>
                <li style={liStyle}>Spending $3-15K/month with a focused structure: in-house + AI tooling. Continuous optimization without the management overhead.</li>
              </ul>

              <MascotQuote mascot="maximus">
                On a $7K/month account I run bid and budget checks every few hours, not once a month. Last week I caught a Performance Max campaign drifting 38 percent over target CPA on a Tuesday afternoon. An agency running a monthly review cadence would have flagged that in the next report, four weeks later.
              </MascotQuote>
            </section>

            {/* Fair fee */}
            <section id="fair-fee">
              <h2 style={h2Style}>What a Fair PPC Agency Fee Looks Like</h2>
              <p style={pStyle}>
                PPC management fees range from $500 to over $10,000 per month depending on scope, competition, and agency tier (<a href="https://www.lyfemarketing.com/blog/how-to-choose-best-ppc-management-agencies/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, 2024</a>). For SMBs in the $3-50K spend band, here is what the options actually cost.
              </p>

              {/* VISUAL 3: comparison table */}
              <ComparisonTable
                headers={['Option', 'Typical monthly cost', 'Who does the work', 'Best fit by spend']}
                rows={[
                  { cells: ['PPC agency', '$1,000-$5,000/mo or 10-20% of spend', 'Agency team (senior + junior)', '$15K+ spend, multi-channel, zero owner time'] },
                  { cells: ['Freelancer', '$500-$2,000/mo', 'Single specialist', '$5K-$25K spend, simpler structure, owner oversight'] },
                  { cells: ['AI tooling (recommendation: Optmyzr, Madgicx)', '$499+/mo', 'You execute the recommendations', '$5K-$50K, owner with 3-5 hrs/week'] },
                  { cells: ['AI tooling (autonomous: Kampaio/B6)', '$99-$399/mo', 'AI agents execute, owner approves', '$3K-$50K, limited owner time, full audit trail'], highlight: true },
                ]}
                caption="Management options for $3-50K monthly Google Ads spend. Pricing reflects industry benchmarks as of mid-2026 and may vary; verify current rates directly with any provider."
              />

              <p style={pStyle}>
                <strong>Three fee models:</strong>
              </p>
              <p style={pStyle}>
                <strong>Flat retainer</strong> &mdash; predictable, easiest to budget for smaller accounts.
              </p>
              <p style={pStyle}>
                <strong>Percent of ad spend (10-20%)</strong> &mdash; scales with your budget, but creates a structural misalignment: the agency earns more when you spend more, not when you profit more. At scale this is fine; at $5-10K/month it belongs on the table.
              </p>
              <p style={pStyle}>
                <strong>Performance-based</strong> &mdash; rare for SMBs because monthly PPC results fluctuate. Watch for hidden minimums in the contract.
              </p>

              <p style={pStyle}>
                <strong>The math:</strong> A $1.5K retainer is a shrinking slice of your budget as spend grows, which is exactly why the agency model earns its math at scale and rarely below $15K/month:
              </p>

              {/* VISUAL 4: InlineSVG bar chart of retainer as % of spend */}
              <InlineSVG
                ariaLabel="Bar chart showing a fixed monthly retainer as a percentage of ad spend at three spend levels"
                caption="The same retainer is 30% of a $5K budget, 15% at $10K, and 8% at $25K. Below $15K/month the management slice rarely works in your favor."
                svg={`<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" font-family="system-ui, sans-serif">
  <line x1="70" y1="250" x2="610" y2="250" stroke="#e5e7eb" stroke-width="2" />
  <text x="40" y="60" font-size="13" fill="#64748b" text-anchor="middle">%</text>

  <!-- $5K spend, $1.5K retainer = 30% -->
  <rect x="120" y="70" width="90" height="180" rx="6" fill="#ef4444" />
  <text x="165" y="60" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">30%</text>
  <text x="165" y="272" font-size="14" fill="#475569" text-anchor="middle">$5K spend</text>
  <text x="165" y="290" font-size="12" fill="#94a3b8" text-anchor="middle">$1.5K retainer</text>

  <!-- $10K spend = 15% -->
  <rect x="295" y="160" width="90" height="90" rx="6" fill="#f59e0b" />
  <text x="340" y="150" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">15%</text>
  <text x="340" y="272" font-size="14" fill="#475569" text-anchor="middle">$10K spend</text>
  <text x="340" y="290" font-size="12" fill="#94a3b8" text-anchor="middle">$1.5K retainer</text>

  <!-- $25K spend, $2K retainer = 8% -->
  <rect x="470" y="202" width="90" height="48" rx="6" fill="#10b981" />
  <text x="515" y="192" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">8%</text>
  <text x="515" y="272" font-size="14" fill="#475569" text-anchor="middle">$25K spend</text>
  <text x="515" y="290" font-size="12" fill="#94a3b8" text-anchor="middle">$2K retainer</text>
</svg>`}
              />

              <p style={pStyle}>
                If you want to benchmark what well-run PPC management actually looks like before talking to agencies, the <a href="/blog/ppc-audit-checklist" style={linkStyle}>PPC audit checklist</a> covers the account health criteria any good agency should be hitting.
              </p>
            </section>

            {/* Red flags / green flags */}
            <section id="red-green-flags">
              <h2 style={h2Style}>Red Flags and Green Flags When Vetting an Agency</h2>

              {/* VISUAL 5: red vs green split panel (2 items, repeat(2,1fr) -> 1fr) */}
              <div className="flags-grid">
                <div className="flag-panel" style={{ background: '#fef2f2', border: '1px solid #fecaca', borderTop: '4px solid #ef4444' }}>
                  <div className="flag-title" style={{ color: '#b91c1c' }}>Red flags (walk away)</div>
                  <ul className="flag-list">
                    <li>Guaranteed results: &ldquo;We&apos;ll 3x your ROAS&rdquo; or &ldquo;We guarantee X leads.&rdquo; (<a href="https://old.reddit.com/r/PPC/comments/15dwga9/" style={linkStyle} target="_blank" rel="noopener noreferrer">Reddit r/PPC</a>)</li>
                    <li>They retain your Google Ads account under their MCC and you cannot access it independently</li>
                    <li>12-month lock-in contracts with no exit clause</li>
                    <li>Vague deliverables: &ldquo;We&apos;ll optimize&rdquo; with no monthly list</li>
                    <li>The sales rep cannot explain Target ROAS vs Target CPA</li>
                    <li>White-label reselling: billing for in-house work but outsourcing to a third party</li>
                  </ul>
                </div>
                <div className="flag-panel" style={{ background: '#ecfdf5', border: '1px solid #bbf7d0', borderTop: '4px solid #10b981' }}>
                  <div className="flag-title" style={{ color: '#047857' }}>Green flags</div>
                  <ul className="flag-list">
                    <li>You own your Google Ads account and all historical data unconditionally</li>
                    <li>Month-to-month or short initial term with renewal option</li>
                    <li>A named senior strategist assigned before you sign</li>
                    <li>Written monthly deliverables, not &ldquo;ongoing optimization&rdquo;</li>
                    <li>Reporting you can act on, not just a spend PDF</li>
                    <li>Experience in your niche or spend band, documented</li>
                  </ul>
                </div>
              </div>

              <p style={pStyle}>
                <strong>Account ownership is the single non-negotiable.</strong> If you don&apos;t own the Google Ads account, leaving the agency means starting from zero: no conversion history, no <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score</a> inheritance, no historical data. Get this confirmed in writing before signing anything.
              </p>
            </section>

            {/* Questions to ask */}
            <section id="questions-to-ask">
              <h2 style={h2Style}>Questions to Ask a PPC Agency Before You Sign</h2>
              <p style={pStyle}>
                A good agency answers all of these directly. Evasion on account ownership or the day-to-day manager is the clearest disqualifier.
              </p>
              <ol style={{ ...pStyle, paddingLeft: '24px' }}>
                <li style={liStyle}><strong>Who specifically manages my account day to day, and what is their experience?</strong> Good answer: a named person. Red flag: &ldquo;our team will handle it.&rdquo;</li>
                <li style={liStyle}><strong>Do I own the Google Ads account and all data?</strong> Good answer: yes, unconditionally. Red flag: any qualifier.</li>
                <li style={liStyle}><strong>What is your fee structure, flat retainer or percent of spend?</strong> Good answer: a clear number and formula.</li>
                <li style={liStyle}><strong>What are the exact monthly deliverables?</strong> Good answer: a written list. Red flag: &ldquo;we optimize everything.&rdquo;</li>
                <li style={liStyle}><strong>What is your reporting cadence, and can I see a real sample report?</strong> Good answer: a real report from an existing client. Red flag: a marketing deck.</li>
                <li style={liStyle}><strong>How do you handle Performance Max budget allocation?</strong> Good answer: specific process for asset groups and PMax vs Search split. Red flag: &ldquo;we trust Google&apos;s automation.&rdquo;</li>
                <li style={liStyle}><strong>What is the contract length and exit process?</strong> Good answer: short initial term, clear offboarding with full account access returned.</li>
                <li style={liStyle}><strong>Can you share results from a client in my niche or spend band?</strong> Good answer: a real case study from your vertical. Red flag: aggregate numbers from unrelated industries.</li>
              </ol>
              <p style={pStyle}>
                On the niche question: &ldquo;If they have never worked with your industry, that means they have to spend more money to see what works. You don&apos;t want to be the account where they&apos;re learning.&rdquo; (<a href="https://old.reddit.com/r/PPC/comments/15dwga9/" style={linkStyle} target="_blank" rel="noopener noreferrer">Reddit r/PPC, 2023</a>)
              </p>
              <p style={pStyle}>
                Agencies that have managed accounts in your spend band will often point to conversion data as proof, but be aware that <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking issues</a> can silently inflate reported numbers, so ask to see the tracking setup.
              </p>
            </section>

            {/* In-house + AI */}
            <section id="in-house-ai">
              <h2 style={h2Style}>The In-House Plus AI Tooling Alternative</h2>
              <p style={pStyle}>
                The agency economics don&apos;t favor small accounts. That&apos;s not an accusation, it&apos;s arithmetic. A $1.5K retainer on a $5K account leaves thin margin for senior attention. The tooling has improved enough that managing your own account no longer means manual spreadsheets.
              </p>
              <p style={pStyle}>
                <strong>Two meaningful categories:</strong>
              </p>
              <p style={pStyle}>
                <strong>Recommendation tools</strong> &mdash; Optmyzr (starting at $499/month) and Madgicx (starting at $499/month) analyze your account and tell you what to change. You execute every change manually. At $499+ on a $5K spend, that is 10% of your budget for advice without execution.
              </p>
              <p style={pStyle}>
                <strong>Autonomous tools</strong> &mdash; Kampaio/B6 runs the work directly. Buzz handles bids, Aegis flags risk, Echo reports, Vox manages cross-campaign <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>, Maximus orchestrates the optimization cycle, and Sage handles research. The $199 Approval tier means every change waits for your sign-off, so you learn the account rather than delegating blindly. Pricing: $99/month (Co-pilot), $199/month (Approval), $399/month (Autonomous). Synter is another tool in this category at $199/month. <a href="/b6" style={linkStyle}>See how the agents work</a>.
              </p>
              <p style={pStyle}>
                <strong>Honest limitation:</strong> this path fits the $3-15K/month spend band. It is not a replacement for an agency handling bundled creative production, landing page builds, or multi-market coordination.
              </p>
              <p style={pStyle}>
                For a deeper walkthrough, <a href="/blog/google-ads-without-agency" style={linkStyle}>manage Google Ads without an agency</a> covers the full process, including account structure and bid management before handing off to autonomous tooling.
              </p>
            </section>

            {/* Decision framework */}
            <section id="decision-framework">
              <h2 style={h2Style}>A Simple Decision Framework</h2>
              <p style={pStyle}>
                Three paths. Pick based on your actual spend and time, not the last pitch you heard.
              </p>

              {/* VISUAL 6: three-path decision cards (3 items, explicit repeat(3,1fr)) */}
              <div className="path-grid">
                <div className="path-card">
                  <div className="path-num" style={{ background: '#667eea' }}>1</div>
                  <div className="path-head">Hire an agency</div>
                  <p className="path-body">
                    Spend is $15K+/month, multi-channel structure, or zero hours available. Use the red-flag and question checklist above before signing. If warning signs appear later, the <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>signs it&apos;s time to fire your PPC agency</a> guide covers when and how to act.
                  </p>
                </div>
                <div className="path-card">
                  <div className="path-num" style={{ background: '#10b981' }}>2</div>
                  <div className="path-head">In-house + AI tooling</div>
                  <p className="path-body">
                    Spend is $3-15K/month, focused structure (Search + one Shopping or pMax campaign), a few hours a week. This is where most readers land. A <a href="/blog/ppc-management" style={linkStyle}>full PPC management guide</a> covers what ongoing account management looks like on this route.
                  </p>
                </div>
                <div className="path-card">
                  <div className="path-num" style={{ background: '#f59e0b' }}>3</div>
                  <div className="path-head">DIY with Smart Bidding</div>
                  <p className="path-body">
                    Spend is under ~$3K/month and you are willing to learn the basics. Smart Bidding handles automated bidding; your job is structure, copy, and <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keywords</a>.
                  </p>
                </div>
              </div>

              <p style={pStyle}>
                The goal is not &ldquo;agency yes or no.&rdquo; It is matching who runs your account to your spend, structure, and time.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '32px', marginBottom: '12px' }}>How do I choose the right PPC agency?</h3>
              <p style={pStyle}>
                Match the agency&apos;s spend-band experience to your budget, confirm you own your Google Ads account unconditionally, verify a named senior manager is assigned to your account, and get a written deliverables list before signing.
              </p>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '32px', marginBottom: '12px' }}>How much does a PPC agency cost per month?</h3>
              <p style={pStyle}>
                Flat retainers typically run $1,000-$5,000/month. Percent-of-spend models charge 10-20% of monthly ad budget. Setup fees of $500-$2,500 are common and charged separately. (<a href="https://www.lyfemarketing.com/blog/how-to-choose-best-ppc-management-agencies/" style={linkStyle} target="_blank" rel="noopener noreferrer">LyfeMarketing, 2024</a>)
              </p>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '32px', marginBottom: '12px' }}>Should I hire a PPC agency or manage Google Ads in-house?</h3>
              <p style={pStyle}>
                Above $15K/month or running multi-channel campaigns, an agency can justify the fee. Below $15K/month with a simple structure, in-house management with AI tooling typically delivers better optimization frequency at lower cost.
              </p>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '32px', marginBottom: '12px' }}>What questions should I ask a PPC agency before hiring?</h3>
              <p style={pStyle}>
                Eight non-negotiables: account ownership, named day-to-day manager, fee structure, written monthly deliverables, reporting cadence with a real sample report, PMax allocation process, contract length and exit terms, and a niche-specific case study. Evasion on account ownership or the day-to-day manager is the clearest disqualifier.
              </p>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '32px', marginBottom: '12px' }}>Do I own my Google Ads account if I use an agency?</h3>
              <p style={pStyle}>
                You should own it, so confirm this in writing before signing. The agency manages through an MCC account, which is normal. The non-negotiable: you retain independent access and all data returns to you when the relationship ends.
              </p>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '32px', marginBottom: '12px' }}>Is a PPC agency worth it for a small business?</h3>
              <p style={pStyle}>
                For most businesses spending under $15K/month: usually not at full agency rates. The economics result in junior management of your account. A freelancer ($500-$2K/month) or AI tooling ($99-$399/month) typically delivers more consistent attention per dollar at that spend level.
              </p>
            </section>

            {/* Conclusion + CTA */}
            <section id="conclusion">
              <h2 style={h2Style}>Choose the Setup That Matches Your Spend, Not the Sales Pitch</h2>
              <p style={pStyle}>
                If your spend is under $15K/month and your structure is focused, you probably don&apos;t need a $2K retainer. Connect your Google Ads account to Kampaio, watch Maximus run the first optimization cycle, and approve or reject every change. No contract, no lock-in, no rotating junior manager.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Spend under $15K/month? Try the tooling path first.
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: '500', opacity: 0.9 }}>
                  <a href="/pricing" style={linkStyle}>Kampaio pricing starts at $99/month</a>. Or start with your account and see what the first audit surfaces.
                </p>
                <a
                  href="/chat"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
                >
                  Start With Your Account
                </a>
              </div>
            </section>

          </div>
        </div>

        <KeepReading slug="how-to-choose-a-ppc-agency" category="strategy" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .decision-shortcut-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 32px 0;
        }
        .ds-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .ds-band {
          font-size: 17px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        .ds-text {
          font-size: 15px;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        .flags-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 32px 0;
        }
        .flag-panel {
          border-radius: 12px;
          padding: 24px 26px;
        }
        .flag-title {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .flag-list {
          margin: 0;
          padding-left: 20px;
          font-size: 15px;
          line-height: 1.65;
          color: #1e293b;
        }
        .flag-list li {
          margin-bottom: 10px;
        }

        .path-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin: 32px 0;
        }
        .path-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px 22px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .path-num {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: white;
          font-weight: 700;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }
        .path-head {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }
        .path-body {
          font-size: 15px;
          line-height: 1.65;
          color: #475569;
          margin: 0;
        }

        @media (max-width: 900px) {
          .decision-shortcut-grid {
            grid-template-columns: 1fr;
          }
          .flags-grid {
            grid-template-columns: 1fr;
          }
          .path-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
