'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { KeyTakeaways, Callout, DonutStat, ColumnBuckets } from '../../../components/blog/primitives';

const TITLE = 'B2B Paid Search Agency: How to Tell If Yours Is Actually Working';
const DESCRIPTION =
  'Every "best B2B paid search agency" list is agencies ranking themselves. Here is the B2B-specific framework: match your evaluation window to your sales cycle, tell signal metrics from vanity ones, and know when the honest answer is in-house or software instead.';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/b2b-paid-search-agency#article',
    headline: TITLE,
    description: DESCRIPTION,
    image: 'https://www.kampaio.com/og/b2b-paid-search-agency.png',
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
    datePublished: '2026-08-13T00:00:00.000Z',
    dateModified: '2026-08-13T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/b2b-paid-search-agency',
    },
    keywords:
      'b2b paid search agency, b2b ppc agency, sales cycle, pipeline lag, SQL rate, cost per opportunity, MQL, raw CPL, closed-won attribution, agency evaluation, in-house vs agency',
    articleSection: 'B2B',
    inLanguage: 'en',
    "wordCount": 1859
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
        name: 'B2B Paid Search Agency',
        item: 'https://www.kampaio.com/blog/b2b-paid-search-agency',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does a B2B agency do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It builds low-volume, high-intent keyword strategy, aligns offers to a longer nurture path, sets up CRM and offline-conversion tracking, and coordinates with sales on lead definitions. Doing this correctly is table stakes, not proof of performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a B2B agency typically cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pricing usually runs as a flat retainer, a percentage of managed spend, or a project/performance model, depending on spend level and pipeline predictability. Current benchmarks by spend tier are in our dedicated pricing guide.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the rule of 7 in B2B?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A buyer needs an average of seven interactions with a brand before converting (B2B Marketing, 2019/2024), and multiple B2B decision-makers make that pattern even more pronounced. That is why judging an agency on first-touch numbers inside a short window misreads the real buying process.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the top B2B brand agencies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This article deliberately does not rank or name agencies, since fit depends on ACV, sales cycle, and channel mix, and every ranking currently on Google is written by an agency ranking itself. The real answer to "is my agency good" is the pipeline-lag grid and self-check above, not a name.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is evaluating a B2B paid search agency different from evaluating a general PPC agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The real success metric (SQL rate, pipeline, closed revenue) lags behind the visible metrics (MQLs, CTR, CPL) by however long your sales cycle runs, so a 30-day report often measures the wrong thing. A general PPC evaluation, built around fast transaction data, does not account for that lag.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should a B2B company use an agency, in-house, or software?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends mostly on ad spend and lead volume, internal marketing headcount, and sales-cycle length; a low-volume, long-cycle account with no dedicated headcount usually fits software or an agency better than a part-time in-house hire. The full comparison lives in our agency-vs-in-house-vs-software guide.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'what-makes-b2b-different', title: 'What makes B2B paid search different from a normal PPC agency engagement', level: 1 },
    { id: 'pipeline-lag', title: "The B2B pipeline-lag problem: why a 30-day report doesn't tell you anything", level: 1 },
    { id: 'signal-vs-vanity', title: 'Signal vs. vanity metrics for a B2B paid search agency', level: 1 },
    { id: 'cost', title: 'What a B2B paid search agency should cost (and where to check the real numbers)', level: 1 },
    { id: 'in-house-or-software', title: 'When the honest answer is in-house or software, not a different agency', level: 1 },
    { id: 'self-check', title: 'A fast self-check: is your current B2B paid search agency worth keeping', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
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
  const h3: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1e293b',
    marginTop: '28px',
    marginBottom: '12px',
  };
  const linkStyle: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
  const captionStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#64748b',
    marginTop: '-16px',
    marginBottom: '32px',
  };

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
        {/* Breadcrumbs + cover */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="b2b-paid-search-agency" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              B2B
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              B2B Paid Search Agency: How to Tell If Yours Is Actually Working
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A B2B paid search agency is only working if you&apos;re judging it on your sales cycle&apos;s timeline, not the 30-day MQL and CPL report most agencies default to. Match the evaluation window to how long your deals actually take to close, and the vanity metrics stop hiding the real answer.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>August 13, 2026 · 10 min read</span>
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
            {/* Intro + TL;DR */}
            <section id="intro">
              <p style={para}>
                A B2B paid search agency is only working if you&apos;re judging it on your sales cycle&apos;s timeline, not the 30-day MQL and CPL report most agencies default to. Match the evaluation window to how long your deals actually take to close, and the vanity metrics stop hiding the real answer.
              </p>

              {/* VISUAL 1: KeyTakeaways (TL;DR summary card) */}
              <KeyTakeaways
                title="TL;DR"
                items={[
                  <>Every &quot;best B2B paid search agency&quot; list ranking on Google right now is written by an agency ranking itself. This article is a neutral framework instead, for evaluating an agency you already have or are about to sign.</>,
                  <>Not a pricing guide, a general agency-vetting checklist, or a &quot;should we even run Google Ads&quot; piece. For the general vetting version, <a href="/blog/how-to-choose-a-ppc-agency" style={linkStyle}>our PPC agency vetting checklist</a> already covers that ground; this one stays narrowly B2B.</>,
                ]}
              />
            </section>

            {/* What makes B2B different */}
            <section id="what-makes-b2b-different">
              <h2 style={h2}>What makes B2B paid search different from a normal PPC agency engagement</h2>
              <p style={para}>
                Five structural differences separate a B2B paid search agency from a standard e-commerce or lead-gen PPC engagement: longer sales cycles, pipeline and SQL data as the real KPI instead of transactions, low-search-volume high-CPC keywords, multi-stakeholder buying committees, and overlap with account-based marketing (ABM) targeting. Skip any one of these five in your evaluation, and you&apos;re grading the wrong account.
              </p>
              <p style={para}>
                <strong>What does a B2B agency do?</strong> A B2B paid search agency builds keyword strategy around low-volume, high-intent terms rather than broad transactional ones, aligns landing pages and offers to a longer nurture path instead of an immediate purchase, sets up CRM and offline-conversion tracking so ad spend connects to actual pipeline, and coordinates with sales on what counts as a qualified lead. That work is table stakes, though. Doing it correctly is not, by itself, evidence the agency is generating revenue; it just confirms they&apos;re running a B2B-appropriate program in the first place.
              </p>
              <p style={para}>
                A general or e-commerce PPC agency optimizes for immediate conversions, metrics that arrive fast and report easily. A B2B engagement produces almost none of that speed. If your agency&apos;s setup and reporting still look like an e-commerce account (conversion volume front and center, sales cycle treated as an afterthought), that&apos;s the first thing to check before you even get to timing and metrics. For the full structural breakdown of channels, account structure, and keyword strategy, <a href="/blog/b2b-ppc-guide" style={linkStyle}>our B2B PPC guide</a> covers the setup layer this article assumes you already have in place.
              </p>
            </section>

            {/* Pipeline lag */}
            <section id="pipeline-lag">
              <h2 style={h2}>The B2B pipeline-lag problem: why a 30-day report doesn&apos;t tell you anything</h2>
              <p style={para}>
                Confirm your agency is even doing B2B-appropriate work, and the next question is timing. In a B2B account, the metrics that move fastest, impressions, clicks, MQLs, are the least correlated with whether the agency is actually generating revenue, because the real signal (SQLs, pipeline, closed-won) lags behind by however long your sales cycle runs. Reading a 30-day report as a verdict on a 90-day sales cycle is judging the agency on data that hasn&apos;t matured yet.
              </p>
              <p style={para}>
                The Pipeline-Lag Decision Grid below anchors this to real benchmarks. Ebsta and Pavilion analyzed 3.2 million B2B opportunities across 364 companies to find the &quot;golden period&quot;, the sales-cycle window where win rates peak, by deal size (<a href="https://www.ebsta.com/wp-content/uploads/2023/02/2023-B2B-Sales-Benchmark-Report.pdf" style={linkStyle} target="_blank" rel="noopener noreferrer">Ebsta x Pavilion, 2023 B2B Sales Benchmark Report</a>):
              </p>

              {/* VISUAL 2: ResponsiveTable : Pipeline-Lag Decision Grid */}
              <ResponsiveTable
                headers={['Sales-cycle length (deal size)', 'Earliest trustworthy evaluation point', 'Metric to trust', 'Metric to treat as early noise']}
                rows={[
                  [
                    <strong key="r1">31-60 days (small deals)</strong>,
                    'Around day 60',
                    'SQL rate, pipeline value generated',
                    'MQL count, CTR',
                  ],
                  [
                    <strong key="r2">61-90 days (medium deals)</strong>,
                    'Around day 90',
                    'Cost per opportunity',
                    'Raw CPL',
                  ],
                  [
                    <strong key="r3">150-180 days (larger/enterprise deals)</strong>,
                    'Around day 180',
                    'Closed-won attribution rate',
                    'Impression share, early MQL volume',
                  ],
                ]}
              />
              <p style={captionStyle}>
                Pipeline-Lag Decision Grid. Sales-cycle bands and the golden-period concept come from the <a href="https://www.ebsta.com/wp-content/uploads/2023/02/2023-B2B-Sales-Benchmark-Report.pdf" style={linkStyle} target="_blank" rel="noopener noreferrer">Ebsta x Pavilion 2023 B2B Sales Benchmark Report</a> (3.2 million opportunities, 364 companies).
              </p>

              <p style={para}>
                The decay past that window is steep, not gradual: win rates run 165% higher for opportunities that close inside the golden period, and closing likelihood drops 60% for every extra month a deal stays open past it, then 90% two months past (Ebsta x Pavilion, 2023). An opportunity open longer than twice your average cycle has only a 3% chance of closing at all. Judge that account against a fixed 30-day window, and you&apos;re measuring the wrong clock.
              </p>

              {/* VISUAL 3 (bold-viz): DonutStat : how fast a B2B deal decays past the golden period */}
              <DonutStat
                items={[
                  { percent: 60, label: 'drop in closing likelihood per extra month past the golden period' },
                  { percent: 3, label: 'chance of closing once a deal is open past 2x your average cycle' },
                ]}
                source="Source: Ebsta x Pavilion, 2023 B2B Sales Benchmark Report (3.2 million B2B opportunities across 364 companies)"
              />

              <p style={para}>
                <strong>What is the rule of 7 in B2B?</strong> The rule of seven holds that it takes an average of seven interactions with a brand before a buyer converts (<a href="https://www.b2bmarketing.net/the-marketing-rule-of-7-and-why-its-still-relevant-in-b2b/" style={linkStyle} target="_blank" rel="noopener noreferrer">B2B Marketing, Jonathan Hedger, 2019, updated 2024</a>). In B2B specifically, multiple decision-makers and a longer buying process make those repeat touches matter even more than in consumer marketing. If a buyer needs several touches spread across weeks or months before converting, judging an agency on first-touch or last-click numbers inside 30 days is judging the wrong thing entirely.
              </p>

              {/* VISUAL 4: MascotQuote (Aegis, risk flag before a renewal) */}
              <MascotQuote mascot="aegis">
                MQLs flat or ticking up while pipeline value sits flat or drops isn&apos;t a good month. It&apos;s a lagging indicator hiding a real problem underneath. Win rates run 165% higher inside the golden period and drop 60% for every extra month a deal sits open past it. If your agency&apos;s report leads with MQL count instead of SQL rate or pipeline value, that&apos;s what I&apos;d flag before a renewal gets signed on the wrong number.
              </MascotQuote>
            </section>

            {/* Signal vs vanity */}
            <section id="signal-vs-vanity">
              <h2 style={h2}>Signal vs. vanity metrics for a B2B paid search agency</h2>
              <p style={para}>
                Aegis&apos;s flag points at the deeper issue running through every B2B report: some numbers look good almost by default and tell you almost nothing about revenue impact, while others are harder to move but are the ones that actually matter.
              </p>

              {/* VISUAL 5: ColumnBuckets : vanity metric to its signal counterpart, row by row */}
              <ColumnBuckets
                columns={[
                  {
                    title: 'Looks good, means little in B2B',
                    items: ['MQL count', 'CTR', 'Raw CPL', 'Impression share'],
                  },
                  {
                    title: 'Actually means the agency is working',
                    items: [
                      'SQL rate / MQL-to-SQL conversion',
                      'Pipeline value generated',
                      'Cost per opportunity',
                      'Closed-won attribution rate',
                    ],
                  },
                ]}
                caption="Vanity metrics and the signal metric that replaces each one, in matching order"
              />

              {/* VISUAL 6: Callout (warning) : the easiest number in the report to fake */}
              <Callout variant="warning" title="Raw CPL is the easiest number to fake">
                Raw CPL is the most misleading number on that left column. An agency can drop cost per lead simply by loosening targeting or match types, flooding the funnel with leads that were never going to qualify. CPL falls, the chart looks better, and the actual buying committee never enters the pipeline at all: a self-inflicted vanity win, not a performance one.
              </Callout>

              <p style={para}>
                Cost per opportunity and closed-won attribution rate are harder to fake, since both require CRM and sales data confirming a lead became real pipeline. If your monthly report can&apos;t connect a click to an opportunity in your CRM, you&apos;re not looking at a signal metric no matter how good it reads on the surface.
              </p>
            </section>

            {/* Cost */}
            <section id="cost">
              <h2 style={h2}>What a B2B paid search agency should cost (and where to check the real numbers)</h2>
              <p style={para}>
                <strong>How much does a B2B agency typically cost?</strong> B2B paid search agencies typically price on a flat monthly retainer, a percentage of managed ad spend, or a project or performance basis, and the right model depends on your spend level and pipeline predictability. Exact current rates by spend tier are covered in our <a href="/blog/google-ads-agency-pricing" style={linkStyle}>agency pricing breakdown</a>, not duplicated here. Fee models and hidden costs get a deeper treatment in our <a href="/blog/ppc-management-cost" style={linkStyle}>PPC management cost guide</a>.
              </p>
              <p style={para}>
                A fair price is meaningless if you&apos;re evaluating results on the wrong timeline. Cost and lag are separate questions, and it&apos;s easy to conflate them: an agency can be fairly priced and still get judged unfairly on a 30-day report, or overpriced and still clear the bar on a properly timed one. Sort the timing question first.
              </p>
            </section>

            {/* In-house or software */}
            <section id="in-house-or-software">
              <h2 style={h2}>When the honest answer is in-house or software, not a different agency</h2>
              <p style={para}>
                Sort timing and cost separately, and a different question tends to surface: is an agency even the right model here? For a B2B motion, the choice between agency, in-house, and software comes down mostly to search volume, internal marketing headcount, and sales-cycle length, not brand preference. A low-volume, long-cycle B2B account with a lean team rarely behaves like a high-volume e-commerce account, so the &quot;right&quot; answer here often differs from the general comparison.
              </p>
              <p style={para}>
                In-house makes sense when you already have headcount that can dedicate real, sustained time to the account and enough volume to see meaningful data and iterate. It doesn&apos;t make sense for a low-volume account where a part-time owner never sees enough signal to improve anything, a setup that looks like control but functions like neglect.
              </p>
              <p style={para}>
                Software is the third branch, an honest option for teams running lean rather than a universal fix: kampaio, for example, is Google Ads automation built for accounts without a dedicated in-house hire, on a flat subscription rather than the percentage-of-spend model of a typical agency retainer. It&apos;s one legitimate path for a spend level that doesn&apos;t justify a full agency engagement, not a claim that software replaces a good B2B agency. The full <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={linkStyle}>agency-vs-in-house-vs-software comparison</a> lives in a dedicated guide; this section stays narrowly B2B.
              </p>
            </section>

            {/* Self-check */}
            <section id="self-check">
              <h2 style={h2}>A fast self-check: is your current B2B paid search agency worth keeping</h2>
              <p style={para}>
                One anonymous B2B software marketer summed up the underlying anxiety on r/PPC in 2023: &quot;Struggling to generate quality leads B2B software business.. Hey guys, I&apos;ve been scouring previous posts...&quot; This self-check is built to answer that with a framework instead of a guess. It&apos;s not a <a href="/blog/ppc-audit-checklist" style={linkStyle}>full audit</a>, just a fast gut-check tied directly to the framework above:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}>Can you name your SQL rate for leads this agency generated, not just your MQL count?</li>
                <li style={{ marginBottom: '12px' }}>Has it been at least as long as your sales cycle since the current strategy launched?</li>
                <li style={{ marginBottom: '12px' }}>Does the monthly report lead with pipeline or SQL numbers, or with MQL and CTR numbers?</li>
                <li style={{ marginBottom: '12px' }}>Can the agency connect a specific click or campaign to an opportunity in your CRM?</li>
                <li style={{ marginBottom: '12px' }}>Has raw CPL dropped while SQL rate stayed flat or fell?</li>
                <li style={{ marginBottom: '12px' }}>Is cost per opportunity tracked anywhere, or only cost per lead?</li>
                <li style={{ marginBottom: 0 }}>If you asked &quot;what would make you fire us,&quot; could the agency answer specifically?</li>
              </ol>
              <p style={para}>
                If you scored poorly on most of these, don&apos;t jump straight to switching agencies. Run the fuller diagnostic first. Our <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>fire-your-PPC-agency checklist</a> is a different, more detailed next-step framework for readers who conclude the answer is genuinely no.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Frequently Asked Questions</h2>

              <h3 style={h3}>What does a B2B agency do?</h3>
              <p style={para}>
                It builds low-volume, high-intent keyword strategy, aligns offers to a longer nurture path, sets up CRM and offline-conversion tracking, and coordinates with sales on lead definitions. Doing this correctly is table stakes, not proof of performance.
              </p>

              <h3 style={h3}>How much does a B2B agency typically cost?</h3>
              <p style={para}>
                Pricing usually runs as a flat retainer, a percentage of managed spend, or a project/performance model, depending on spend level and pipeline predictability. Current benchmarks by spend tier are in our dedicated <a href="/blog/google-ads-agency-pricing" style={linkStyle}>pricing guide</a>.
              </p>

              <h3 style={h3}>What is the rule of 7 in B2B?</h3>
              <p style={para}>
                A buyer needs an average of seven interactions with a brand before converting (<a href="https://www.b2bmarketing.net/the-marketing-rule-of-7-and-why-its-still-relevant-in-b2b/" style={linkStyle} target="_blank" rel="noopener noreferrer">B2B Marketing, 2019/2024</a>), and multiple B2B decision-makers make that pattern even more pronounced. That&apos;s why judging an agency on first-touch numbers inside a short window misreads the real buying process.
              </p>

              <h3 style={h3}>What are the top B2B brand agencies?</h3>
              <p style={para}>
                This article deliberately doesn&apos;t rank or name agencies, since fit depends on ACV, sales cycle, and channel mix, and every ranking currently on Google is written by an agency ranking itself. The real answer to &quot;is my agency good&quot; is the pipeline-lag grid and self-check above, not a name.
              </p>

              <h3 style={h3}>How is evaluating a B2B paid search agency different from evaluating a general PPC agency?</h3>
              <p style={para}>
                The real success metric (SQL rate, pipeline, closed revenue) lags behind the visible metrics (MQLs, CTR, CPL) by however long your sales cycle runs, so a 30-day report often measures the wrong thing. A general PPC evaluation, built around fast transaction data, doesn&apos;t account for that lag.
              </p>

              <h3 style={h3}>Should a B2B company use an agency, in-house, or software?</h3>
              <p style={para}>
                It depends mostly on ad spend and lead volume, internal marketing headcount, and sales-cycle length; a low-volume, long-cycle account with no dedicated headcount usually fits software or an agency better than a part-time in-house hire. The full comparison lives in our <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={linkStyle}>agency-vs-in-house-vs-software guide</a>.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <p style={para}>
                If your monthly report leads with MQLs and CTR and you can&apos;t answer your SQL rate off the top of your head, fix that before your next renewal conversation, not after. Kampaio is one option for B2B teams whose spend or headcount doesn&apos;t justify a full agency retainer, not the only right answer, but a fast way to see pipeline-relevant numbers instead of vanity ones without hiring an agency to get there.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  See pipeline-relevant numbers before the renewal conversation
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Aegis flags the reports that lead with MQL count while pipeline value sits flat, so you walk into the renewal with the right number.
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
                  See what Kampaio reports on
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. Benchmark figures are cited to their original sources and were verified on August 13, 2026; your own sales cycle and win rates will differ, so use the grid as a starting frame, not a guarantee.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="b2b-paid-search-agency" category="b2b" />
        <Footer compact={true} />
      </div>
    </>
  );
}
