'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { KeyTakeaways } from '../../../components/blog/primitives';

const SLUG = 'google-ads-scripts';
const TITLE = 'Google Ads Scripts: Which Ones to Run, and When a Script Is the Wrong Tool';
const DESCRIPTION =
  'Google Ads scripts explained, plus a decision grid: scripts vs automated rules vs a dashboard, which scripts earn a slot, and when to skip them.';
const PUBLISHED = '2026-11-19T00:00:00.000Z';

const START = 'https://developers.google.com/google-ads/scripts/docs/start';
const LIMITS = 'https://developers.google.com/google-ads/scripts/docs/limits';
const PREVIEW = 'https://developers.google.com/google-ads/scripts/docs/concepts/preview';
const AUTH = 'https://developers.google.com/google-ads/scripts/docs/concepts/authorization';
const GETTING_STARTED = 'https://developers.google.com/google-ads/scripts/docs/getting-started';
const HELP = 'https://support.google.com/google-ads/answer/188712?hl=en';
const RULES = 'https://support.google.com/google-ads/answer/2472779?hl=en';
const ROOIJMANS = 'https://nilsrooijmans.com/google-ads-scripts-faq/what-google-ads-scripts-should-i-be-using/';
const REDDIT = 'https://www.reddit.com/r/googleads/comments/1olasen/google_ads_scripts/';
const DASHBOARD = 'https://dashboard.kampaio.com/';

// An FAQ answer is a run of plain strings and cited links. The visible answer and the
// FAQPage schema are both built from these parts, so the markup says exactly what the page says.
type Cite = { label: string; href: string };
type Faq = { q: string; parts: (string | Cite)[] };

const FAQS: Faq[] = [
  {
    q: 'What are scripts in Google Ads?',
    parts: [
      'Scripts are JavaScript programs that run inside a Google Ads account on Google\'s servers, on a schedule you choose, reading data and changing bids, budgets and statuses.',
    ],
  },
  {
    q: 'Are Google Ads scripts free?',
    parts: [
      'Yes. Google says scripts run on its cloud infrastructure at no additional cost (',
      { label: 'Google Ads Scripts, Product overview, 2026', href: START },
      '). The cost is the time to write and maintain each one.',
    ],
  },
  {
    q: 'Do I need to know how to code to use Google Ads scripts?',
    parts: [
      'Only entry-level JavaScript, according to Google (',
      { label: 'Google Ads Scripts, Product overview, 2026', href: START },
      '). Prebuilt templates exist, and AI can draft code. Either way, read any script before you authorize it, because authorization gives it access to your account.',
    ],
  },
  {
    q: 'Can I undo what a script changed?',
    parts: [
      'No. Google Help states that "changes to your scripts can\'t be undone." Preview is a rehearsal, not a rollback, and a timed-out script keeps the changes it made before cancellation.',
    ],
  },
  {
    q: 'How often can a script run, and how long can it run?',
    parts: [
      'A single-account script can run 30 minutes; a manager script 60 minutes with executeInParallel and a callback (',
      { label: 'Google Ads Scripts, Limits, 2026', href: LIMITS },
      '). Developer docs list hourly through monthly schedules; the Help Center lists once, daily, weekly or monthly.',
    ],
  },
  {
    q: 'Scripts or automated rules: which should I use?',
    parts: [
      'Use ',
      { label: 'automated rules', href: RULES },
      ' for no-code scheduled changes on Google Ads data, and scripts for outside data or custom logic. Google recommends rules to people without scripting skills (',
      { label: 'Google Ads Help, 2026', href: HELP },
      ').',
    ],
  },
  {
    q: 'Where can I find Google Ads scripts examples?',
    parts: [
      'Start with Google\'s script library and Examples pages, then Nils Rooijmans\' shortlist. Read any code before authorizing it.',
    ],
  },
];

const faqText = (f: Faq) => f.parts.map((p) => (typeof p === 'string' ? p : p.label)).join('');

const SOURCES: { label: string; href: string }[] = [
  { label: 'Google Ads Scripts, Product overview', href: START },
  { label: 'Google Ads Scripts, Limits (updated 2026-11-16)', href: LIMITS },
  { label: 'Google Ads Scripts, Preview', href: PREVIEW },
  { label: 'Google Ads Scripts, Authorization', href: AUTH },
  { label: 'Google Ads Scripts, Get started', href: GETTING_STARTED },
  { label: 'Google Ads Help, Using scripts to make automated changes (188712)', href: HELP },
  { label: 'Google Ads Help, Automated rules', href: RULES },
  { label: 'Nils Rooijmans, "What Google Ads scripts should I be using?"', href: ROOIJMANS },
];

// Limits stat-block: 5 tiles, fixed 3 + 2 rows on desktop, one column on mobile.
const LIMIT_TILES: { value: string; label: string }[] = [
  { value: '30 min', label: 'single-account run time' },
  { value: '60 min', label: 'manager scripts, only with executeInParallel and a callback' },
  { value: '50', label: 'accounts in parallel per executeInParallel' },
  { value: '50,000', label: 'entities: default cap per iterator (reports exempt)' },
  { value: '250', label: 'authorized scripts per account' },
];

type Fit = 'good' | 'possible' | 'no';

const FIT_STYLE: Record<Fit, { color: string; bg: string; label: string }> = {
  good: { color: '#047857', bg: '#ecfdf5', label: 'Good fit' },
  possible: { color: '#b45309', bg: '#fffbeb', label: 'Possible' },
  no: { color: '#64748b', bg: '#f1f5f9', label: 'Not built for it' },
};

const FitCell = ({ fit, note }: { fit: Fit; note?: string }) => {
  const s = FIT_STYLE[fit];
  return (
    <span style={{ display: 'inline-block', background: s.bg, color: s.color, borderRadius: '6px', padding: '4px 8px', fontWeight: 600, fontSize: '14px', lineHeight: 1.4 }}>
      {s.label}
      {note && <span style={{ fontWeight: 400 }}>: {note}</span>}
    </span>
  );
};

const LADDER: { name: string; risk: string; riskColor: string; worst: string; runIf: string; example: string; what: string }[] = [
  {
    name: 'Watch',
    risk: 'Risk: low (read-only)',
    riskColor: '#047857',
    what: 'Looks at the account and tells you.',
    worst: 'False alarm email',
    runIf: 'You can name the condition',
    example: 'No-conversions alert',
  },
  {
    name: 'Report',
    risk: 'Risk: low (read-only)',
    riskColor: '#047857',
    what: 'Writes findings to a Sheet, changes nothing.',
    worst: 'Stale Sheet',
    runIf: 'A human reads the Sheet',
    example: 'Search-term mining',
  },
  {
    name: 'Act',
    risk: 'Risk: high (writes, no undo)',
    riskColor: '#b91c1c',
    what: 'Changes the account by itself.',
    worst: 'Wrong change at scale',
    runIf: 'You pass the bar below',
    example: 'Auto-pause',
  },
];

const SCRIPT_TEST: string[] = [
  'Does the job need logic or outside data that no built-in feature has?',
  'Is the rule stable enough for one sentence?',
  'Does a named person own the script and read its logs?',
  'Is it read-only, or reversible enough to survive a partial run?',
];

const visualCss = `
.gas-limits { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin: 32px 0 12px; }
.gas-limits > div { grid-column: span 2; }
.gas-limits > div:nth-child(4), .gas-limits > div:nth-child(5) { grid-column: span 3; }
.gas-ladder { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 32px 0; }
@media (max-width: 900px) {
  .gas-ladder { grid-template-columns: 1fr; }
}
@media (max-width: 760px) {
  .gas-limits { grid-template-columns: 1fr; }
  .gas-limits > div, .gas-limits > div:nth-child(4), .gas-limits > div:nth-child(5) { grid-column: auto; }
}
`;

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://www.kampaio.com/blog/${SLUG}#article`,
    headline: TITLE,
    description: DESCRIPTION,
    image: `https://www.kampaio.com/og/${SLUG}.png`,
    author: {
      '@type': 'Person',
      '@id': 'https://www.kampaio.com/#person-vitalii-chornyi',
      name: 'Vitalii Chornyi',
      url: 'https://www.kampaio.com/author/vitalii-chornyi',
      worksFor: { '@id': 'https://www.kampaio.com/#organization' },
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
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.kampaio.com/blog/${SLUG}`,
    },
    keywords:
      'google ads scripts, google ads script, google ads automated rules, google ads scripts limits, google ads scripts examples, executeInParallel, google ads scripts preview, Kampaio Dashboard',
    inLanguage: 'en',
    wordCount: 1977,
    articleSection: 'Google Ads',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: faqText(f) },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: TITLE, item: `https://www.kampaio.com/blog/${SLUG}` },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Quick answer: what Google Ads scripts are and when they pay off', level: 1 },
    { id: 'what-scripts-can-do', title: 'What Google Ads scripts can do, and the limits that decide fit', level: 1 },
    { id: 'what-a-script-can-touch', title: 'What a script can touch', level: 2 },
    { id: 'limits', title: 'Limits worth knowing before you write a line', level: 2 },
    { id: 'which-tool', title: 'Scripts, automated rules, a dashboard or the API: which to use', level: 1 },
    { id: 'decision-grid', title: 'The decision grid', level: 2 },
    { id: 'who-maintains', title: 'Pick by who will maintain it', level: 2 },
    { id: 'ladder', title: 'The Watch, Report, Act ladder: which scripts earn a slot', level: 1 },
    { id: 'watch', title: 'Watch: read-only alerts, run these first', level: 2 },
    { id: 'report', title: 'Report: search-term and conflict reports to a Sheet', level: 2 },
    { id: 'act', title: 'Act: scripts that write, and the bar they must clear', level: 2 },
    { id: 'wrong-tool', title: 'When a script is the wrong tool', level: 1 },
    { id: 'nobody-owns-it', title: 'Nobody will own it', level: 2 },
    { id: 'needs-judgment', title: 'The rule needs judgment', level: 2 },
    { id: 'built-in-feature', title: 'A built-in feature already does it', level: 2 },
    { id: 'written-by-ai', title: 'The script was written by AI and nobody read it', level: 2 },
    { id: 'ship-a-script', title: 'How to ship a script without breaking the account', level: 1 },
    { id: 'dashboard-fit', title: 'Where Kampaio Dashboard fits next to scripts', level: 1 },
    { id: 'faq', title: 'Frequently asked questions', level: 1 },
    { id: 'next-step', title: 'Next step: check your account before you script it', level: 1 },
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
  const h3Style: React.CSSProperties = { fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '40px', scrollMarginTop: '24px' };
  const listStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px', paddingLeft: '24px' };
  const tableNoteStyle: React.CSSProperties = { fontSize: '15px', lineHeight: '1.7', color: '#64748b', marginTop: '-16px', marginBottom: '32px' };
  const codeStyle: React.CSSProperties = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.9em', background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px' };

  const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} style={linkStyle} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

  const Int = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} style={linkStyle}>
      {children}
    </a>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <style dangerouslySetInnerHTML={{ __html: visualCss }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug={SLUG} />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Automation
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              {TITLE}
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              {DESCRIPTION}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  VC
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By <a href="/author/vitalii-chornyi" style={{ color: 'inherit', textDecoration: 'underline' }}>Vitalii Chornyi</a></span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>November 19, 2026 · 10 min read</span>
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
                Google Ads scripts are JavaScript programs that run inside your account on Google&apos;s servers, on a schedule you set. They read performance data, change bids, budgets and statuses, and pull in outside data such as Sheets. They pay off for stable, mechanical rules, and lose to built-in tools elsewhere.
              </p>
            </section>

            {/* Quick answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>Quick answer: what Google Ads scripts are and when they pay off</h2>

              {/* VISUAL 1: KeyTakeaways, the TL;DR in three lines */}
              <KeyTakeaways
                title="TL;DR"
                items={[
                  <span key="t1">
                    <strong>Read-only scripts</strong> (alerts and reports) are the ones worth running.
                  </span>,
                  <span key="t2">
                    <strong>Write scripts must clear a higher bar</strong>, because script changes can&apos;t be undone.
                  </span>,
                  <span key="t3">
                    <strong>If a built-in rule or a dashboard check does the job</strong>, use that instead.
                  </span>,
                ]}
              />

              <p style={paragraphStyle}>
                Scripts run on Google&apos;s cloud at no additional cost, and only entry-level JavaScript is needed (<Ext href={START}>Google Ads Scripts, Product overview, 2026</Ext>). So the price tag is not the issue. The cost that matters is upkeep: someone has to own each script after it ships.
              </p>
            </section>

            {/* What scripts can do */}
            <section id="what-scripts-can-do">
              <h2 style={h2Style}>What Google Ads scripts can do, and the limits that decide fit</h2>
              <p style={paragraphStyle}>Scripts live under Tools &gt; Bulk actions &gt; Scripts and run V8 JavaScript.</p>

              <h3 id="what-a-script-can-touch" style={h3Style}>What a script can touch</h3>
              <p style={paragraphStyle}>
                A script can manage campaigns, ad groups, keywords and ads, adjust bids, budgets and statuses, and run GAQL reports. It can read and write Sheets, call outside APIs with <code style={codeStyle}>UrlFetchApp</code>, and run across child accounts as a manager script.
              </p>
              <p style={paragraphStyle}>
                On scheduling, Google&apos;s developer docs say &quot;hourly, daily, weekly, monthly, or on demand&quot;, while the Help Center says &quot;once, daily, weekly or monthly&quot; (<Ext href={HELP}>Google Ads Help, 2026</Ext>). We keep the two lists separate.
              </p>

              <h3 id="limits" style={h3Style}>Limits worth knowing before you write a line</h3>

              {/* VISUAL 2: Limits stat-block, 5 big-number tiles in a fixed 3 + 2 grid (bold-viz) */}
              <figure style={{ margin: '32px 0' }}>
                <div className="gas-limits">
                  {LIMIT_TILES.map((t) => (
                    <div key={t.value} style={{ borderRadius: '12px', border: '1px solid #e5e7eb', background: '#f8fafc', padding: '20px' }}>
                      <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, lineHeight: 1.1, color: '#764ba2' }}>{t.value}</div>
                      <div style={{ marginTop: '8px', fontSize: '15px', lineHeight: 1.45, color: '#475569' }}>{t.label}</div>
                    </div>
                  ))}
                </div>
                <figcaption style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>
                  Source: <Ext href={LIMITS}>Google Ads Scripts, Limits, updated 2026-11-16</Ext>.
                </figcaption>
              </figure>

              <p style={paragraphStyle}>
                Two of these matter more than the numbers suggest. A timed-out script keeps its earlier work (&quot;All of the changes made before the script was cancelled will be applied&quot;), so a half-run write script leaves a half-changed account. And Google warns that &quot;these limits can change at any time without warning.&quot;
              </p>
            </section>

            {/* Which tool */}
            <section id="which-tool">
              <h2 style={h2Style}>Scripts, automated rules, a dashboard or the API: which to use</h2>
              <p style={paragraphStyle}>
                The right tool depends on the job, not the technology. Google itself splits the options into scripts, the API, BigQuery transfer, and rules, bulk uploads and Google Ads Editor (<Ext href={START}>Google Ads Scripts, Product overview, 2026</Ext>).
              </p>

              <h3 id="decision-grid" style={h3Style}>The decision grid</h3>
              <p style={paragraphStyle}>
                Kampaio Dashboard is our product. The other columns follow Google&apos;s own &quot;right product&quot; table; the dashboard column covers only what it does today.
              </p>

              {/* VISUAL 3: Decision grid, 7 jobs x 4 tools, color-coded cells with text labels */}
              <ResponsiveTable
                headers={['Job', 'Scripts', 'Automated rules', 'Kampaio Dashboard', 'Editor, bulk upload, BigQuery']}
                rows={[
                  ['Alert on spend jump or stopped conversions', <FitCell key="a1" fit="good" />, <FitCell key="a2" fit="possible" />, <FitCell key="a3" fit="good" note="built-in checks" />, <FitCell key="a4" fit="no" />],
                  ['Change things by a rule on Ads data only', <FitCell key="b1" fit="good" />, <FitCell key="b2" fit="good" note="no-code" />, <FitCell key="b3" fit="possible" note="no custom rules" />, <FitCell key="b4" fit="possible" note="manual" />],
                  ['Change things using outside data', <FitCell key="c1" fit="good" note="Sheets, APIs" />, <FitCell key="c2" fit="no" />, <FitCell key="c3" fit="no" />, <FitCell key="c4" fit="no" />],
                  ['Review search terms, add negatives', <FitCell key="d1" fit="good" note="Sheet report" />, <FitCell key="d2" fit="no" />, <FitCell key="d3" fit="good" note="preview" />, <FitCell key="d4" fit="no" />],
                  ['Edit budgets across many accounts', <FitCell key="e1" fit="possible" note="no undo" />, <FitCell key="e2" fit="no" />, <FitCell key="e3" fit="good" note="rollback" />, <FitCell key="e4" fit="possible" />],
                  ['Bulk-edit many rows offline', <FitCell key="f1" fit="possible" />, <FitCell key="f2" fit="no" />, <FitCell key="f3" fit="no" />, <FitCell key="f4" fit="good" />],
                  ['Pull reports into a warehouse', <FitCell key="g1" fit="possible" note="BigQuery" />, <FitCell key="g2" fit="no" />, <FitCell key="g3" fit="no" />, <FitCell key="g4" fit="good" />],
                ]}
              />
              <p style={tableNoteStyle}>
                Scripts, rules and Editor columns follow Google&apos;s &quot;Are Google Ads scripts the right product for me?&quot; table (<Ext href={START}>Google Ads Scripts, Product overview</Ext>). The Kampaio Dashboard column describes the product as of November 2026.
              </p>

              <p style={paragraphStyle}>
                In short: pick scripts if you need outside data or custom logic (scripts); no-code scheduled changes (rules); checks and previewed edits with no code to maintain (dashboard); offline bulk editing or a warehouse pipeline (Editor, bulk, BigQuery).
              </p>

              <h3 id="who-maintains" style={h3Style}>Pick by who will maintain it</h3>
              <p style={paragraphStyle}>
                Rules and dashboards are maintained by the vendor; a script by whoever wrote it. That makes ownership the real cost driver, and Google&apos;s own warning that limits can change without notice is the evidence. The cheapest script is the one nobody has to touch for a year.
              </p>
            </section>

            {/* Ladder */}
            <section id="ladder">
              <h2 style={h2Style}>The Watch, Report, Act ladder: which scripts earn a slot</h2>
              <p style={paragraphStyle}>
                Once scripts are the right tool, the next question is which ones. Watch and Report scripts earn a slot; Act scripts must clear a higher bar. The split follows what a script does to the account.
              </p>

              {/* VISUAL 4: Watch / Report / Act, 3 cards in a fixed 3-column grid; risk stated in text */}
              <div className="gas-ladder">
                {LADDER.map((c) => (
                  <div key={c.name} style={{ border: '1px solid #e5e7eb', borderTop: `4px solid ${c.riskColor}`, borderRadius: '12px', background: '#ffffff', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: c.riskColor, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>{c.risk}</div>
                      <div style={{ fontSize: '15px', color: '#475569', lineHeight: 1.5, marginTop: '8px' }}>{c.what}</div>
                    </div>
                    {[
                      ['Worst case', c.worst],
                      ['Run it if', c.runIf],
                      ['Example', c.example],
                    ].map(([k, v]) => (
                      <div key={k} style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k}</div>
                        <div style={{ fontSize: '16px', color: '#1e293b', lineHeight: 1.45, marginTop: '2px' }}>{v}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <h3 id="watch" style={h3Style}>Watch: read-only alerts, run these first</h3>
              <p style={paragraphStyle}>
                Watch scripts only look and tell you: no-conversions and spend-spike alerts, a broken landing-page check. Nils Rooijmans, a script practitioner, calls the Google-published Broken Link Checker &quot;the script I install the first day when taking over a new account&quot; (<Ext href={ROOIJMANS}>Nils Rooijmans, 2024</Ext>).
              </p>
              <p style={paragraphStyle}>
                In <Ext href={REDDIT}>one r/googleads thread (Nov 2025)</Ext>, a commenter described a no-conversions-in-the-last-two-days email alert built with ChatGPT&apos;s help that had &quot;been solid really reliable&quot;. One commenter is not a survey. For the full alerting stack, see <Int href="/blog/google-ads-anomaly-detection">the anomaly-alert guide</Int>.
              </p>

              <h3 id="report" style={h3Style}>Report: search-term and conflict reports to a Sheet</h3>
              <p style={paragraphStyle}>
                Report scripts write findings to a Sheet and change nothing in the account; a human reads the Sheet first. Rooijmans on the negative-keyword conflict check: &quot;It&apos;s very easy to make mistakes with negatives. It happens to me all the time.&quot; See our <Int href="/blog/google-ads-search-terms-report">search terms report</Int> and <Int href="/blog/google-ads-negative-keywords">negative keywords</Int> guides.
              </p>

              <h3 id="act" style={h3Style}>Act: scripts that write, and the bar they must clear</h3>
              <p style={paragraphStyle}>
                Act scripts (auto-pause, scheduled bid changes, auto-added negatives) must clear five conditions: Preview first, one named owner, a log review after each early run, a stop condition, and acceptance that there is no undo.
              </p>
              <p style={paragraphStyle}>
                Aegis, our risk-review agent, is in development and does not run on live accounts. It would start from this line:
              </p>

              {/* VISUAL 5: Aegis speech bubble, one sourced sentence */}
              <MascotQuote mascot="aegis">
                <span style={{ fontStyle: 'normal', fontSize: '13px', fontWeight: 600, color: '#3b82f6', display: 'block', marginBottom: '6px' }}>In development</span>
                Google&apos;s own help page says, &apos;Keep in mind that changes to your scripts can&apos;t be undone.&apos; I&apos;d run any write script in Preview first and read the log before the first live run.
                <span style={{ fontStyle: 'normal', fontSize: '14px', color: '#64748b', display: 'block', marginTop: '10px' }}>
                  Source: <Ext href={HELP}>Google Ads Help, Using scripts to make automated changes</Ext>, read 2026-11-19.
                </span>
              </MascotQuote>

              <p style={paragraphStyle}>
                Preview is a rehearsal, not an undo: only AdsApp calls are simulated, so emails and Sheets writes still happen (<Ext href={PREVIEW}>Google Ads Scripts, Preview, 2026</Ext>). Blocking a converting query is the typical failure, which is why auto-added negatives need the strictest review of the three.
              </p>
            </section>

            {/* Wrong tool */}
            <section id="wrong-tool">
              <h2 style={h2Style}>When a script is the wrong tool</h2>
              <p style={paragraphStyle}>
                A script is the wrong tool in four situations. The Script Test asks: does the job need logic or outside data that no built-in feature has? Is the rule stable enough for one sentence? Does a named person own the script and read its logs? Is it read-only, or reversible enough to survive a partial run? Fewer than four yes answers: pick another tool from the grid.
              </p>

              {/* VISUAL 6: Script Test decision tree, 4 stacked question cards with yes / no branches */}
              <figure style={{ margin: '32px 0' }} aria-label="The Script Test: four yes or no questions">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  {SCRIPT_TEST.map((q, i) => (
                    <div key={q}>
                      <div style={{ display: 'flex', alignItems: 'stretch', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 320px', border: '1px solid #c7d2fe', background: '#eef2ff', borderRadius: '12px', padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                          <span style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#ffffff', fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                          <span style={{ fontSize: '17px', fontWeight: 600, color: '#1e293b', lineHeight: 1.45 }}>{q}</span>
                        </div>
                        <div style={{ flex: '0 1 220px', border: '1px dashed #fca5a5', background: '#fef2f2', borderRadius: '12px', padding: '12px 14px', fontSize: '15px', color: '#991b1b', lineHeight: 1.45, display: 'flex', alignItems: 'center' }}>
                          <span><strong>No:</strong> pick another tool from the grid</span>
                        </div>
                      </div>
                      <div style={{ padding: '6px 0 6px 28px', fontSize: '14px', fontWeight: 700, color: '#047857' }}>
                        ↓ Yes{i < SCRIPT_TEST.length - 1 ? ': next question' : ''}
                      </div>
                    </div>
                  ))}
                  <div style={{ border: '2px solid #10b981', background: '#ecfdf5', borderRadius: '12px', padding: '16px 18px', fontSize: '17px', fontWeight: 700, color: '#065f46', lineHeight: 1.45 }}>
                    Four yes answers: a script is justified. Ship it with the five steps below.
                  </div>
                </div>
              </figure>

              <h3 id="nobody-owns-it" style={h3Style}>Nobody will own it</h3>
              <p style={paragraphStyle}>
                A script nobody owns breaks silently: the alert never fires and nobody notices. If its author is disassociated from the account, &quot;the script will stop running but remain available&quot; (<Ext href={AUTH}>Google Ads Scripts, Authorization, 2026</Ext>).
              </p>

              <h3 id="needs-judgment" style={h3Style}>The rule needs judgment</h3>
              <p style={paragraphStyle}>
                Judgment calls do not fit in one sentence: is this term a customer or a researcher, is this dip seasonal. Run those as tests instead: see <Int href="/blog/google-ads-experiments">Google Ads experiments</Int>.
              </p>

              <h3 id="built-in-feature" style={h3Style}>A built-in feature already does it</h3>
              <p style={paragraphStyle}>
                Google points people without scripting skills to automated rules (<Ext href={HELP}>Google Ads Help, 2026</Ext>). Do not script what a rule does. A dashboard check covers many standard failures too, as in <Int href="/blog/google-ads-not-spending-full-budget">this budget-not-spending diagnosis</Int>.
              </p>

              <h3 id="written-by-ai" style={h3Style}>The script was written by AI and nobody read it</h3>
              <p style={paragraphStyle}>
                The r/googleads commenter&apos;s ChatGPT-assisted scripts were read-only alerts and reports. That supports the ladder (AI-written Watch and Report is low-risk), not AI-written Act scripts. Read any code before authorizing it: Google tells you to &quot;click Authorize so the script can access the account on your behalf&quot; (<Ext href={GETTING_STARTED}>Google Ads Scripts, Get started, 2026</Ext>). Free store scripts follow the same rule: free is not reviewed.
              </p>
            </section>

            {/* Ship a script */}
            <section id="ship-a-script">
              <h2 style={h2Style}>How to ship a script without breaking the account</h2>
              <p style={paragraphStyle}>
                If you decide a script is justified, three things fail silently: a timeout leaves a half-changed account, limits shift, and a script whose author lost access stops running.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Pick the class and write the rule in one sentence.</strong> If it needs &quot;it depends&quot;, stop.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Preview before running.</strong> Tools &gt; Bulk actions &gt; Scripts &gt; Preview, then read Changes and Logs.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Authorize once, run it manually, read the log.</strong> Authorization is per script.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Schedule it.</strong> Frequency per the developer docs or Help Center lists above.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Read the first runs&apos; logs, then set an owner and a review date.</strong> Check for a timeout.
                </li>
              </ol>
              <p style={paragraphStyle}>
                If the job is a previewed edit with a rollback rather than custom code, <Ext href={DASHBOARD}>Kampaio Dashboard</Ext> covers it. Free during early access.
              </p>
            </section>

            {/* Dashboard fit */}
            <section id="dashboard-fit">
              <h2 style={h2Style}>Where Kampaio Dashboard fits next to scripts</h2>
              <p style={paragraphStyle}>
                Kampaio Dashboard covers the repeatable checks and edits most accounts script first, with a preview and a rollback. It does not run custom code and does not pull external data such as inventory feeds, weather or Sheets, so it does not replace a script that needs them.
              </p>
              <p style={paragraphStyle}>
                Today it offers all your Google Ads accounts on one screen; 14 automatic campaign checks (spend without conversions, campaign stopped, spend spike, conversions gone and more); a search-terms report with negatives and preview; a Shopping/PMax product audit; budget, target, status, geo and keyword edits with preview and rollback; and a change log.
              </p>
              <p style={paragraphStyle}>
                The contrast with scripts is plain: per Google, a script&apos;s changes can&apos;t be undone, while a dashboard edit shows a preview and can be rolled back. AI agents, Aegis among them, are in development. For tool comparisons, see <Int href="/blog/google-ads-management-software">Google Ads management software</Int> and <Int href="/blog/google-ads-optimizer-software-compared">Google Ads optimizer software compared</Int>.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently asked questions</h2>
              {FAQS.map((f) => (
                <div key={f.q} style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{f.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>
                    {f.parts.map((p, i) =>
                      typeof p === 'string' ? (
                        <span key={i}>{p}</span>
                      ) : (
                        <Ext key={i} href={p.href}>
                          {p.label}
                        </Ext>
                      ),
                    )}
                  </p>
                </div>
              ))}
            </section>

            {/* Next step / CTA */}
            <section id="next-step">
              <h2 style={h2Style}>Next step: check your account before you script it</h2>
              <p style={paragraphStyle}>
                Run the Script Test on one job you were about to script. If it fails, a built-in check may cover it. <Ext href={DASHBOARD}>Open Kampaio Dashboard</Ext> and see which of the 14 campaign checks already flag your accounts. Free during early access.
              </p>
              <p style={paragraphStyle}>
                Before scripting anything, run the <Int href="/blog/ppc-audit-checklist">PPC audit checklist</Int> and read <Int href="/blog/google-ads-optimization">Google Ads optimization</Int>.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px 24px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <p style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  See which checks already cover your accounts
                </p>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500 }}>
                  Connect your Google Ads accounts and run 14 automatic campaign checks on one screen.
                </p>
                <a
                  href={DASHBOARD}
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Open the dashboard
                </a>
                <p style={{ fontSize: '15px', color: '#64748b', marginTop: '20px', marginBottom: 0 }}>Free during early access.</p>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Sources:</p>
              <ol style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px', overflowWrap: 'anywhere' }}>
                {SOURCES.map((s) => (
                  <li key={s.href}>
                    {s.label}: <Ext href={s.href}>{s.href}</Ext>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <KeepReading slug={SLUG} category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
