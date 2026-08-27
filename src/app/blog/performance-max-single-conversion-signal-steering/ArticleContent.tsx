'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import { KeyTakeaways, CompareGrid, Steps, Step } from '../../../components/blog/primitives';

const TITLE =
  'Performance Max Single-Conversion-Signal Steering: Why the 2026 LSA Migration Makes It Worse (and How to Fix It)';
const DESCRIPTION =
  "Performance Max steers on one blended conversion signal. Google's August 2026 LSA migration removes vertical Target CPA. The fix, plus a pre-migration checklist.";

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/performance-max-single-conversion-signal-steering#article',
    headline: TITLE,
    description: DESCRIPTION,
    image: 'https://www.kampaio.com/og/performance-max-single-conversion-signal-steering.png',
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
    datePublished: '2026-08-27T00:00:00.000Z',
    dateModified: '2026-08-27T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/performance-max-single-conversion-signal-steering',
    },
    keywords:
      'performance max single conversion signal steering, blended conversion signal, local services ads migration, pay per lead performance max, vertical target cpa, conversion value rules, smart bidding, lsa to pmax, august 2026 migration',
    articleSection: 'Google Ads',
    inLanguage: 'en',
    wordCount: 2816,
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
        name: 'Performance Max Single-Conversion-Signal Steering',
        item: 'https://www.kampaio.com/blog/performance-max-single-conversion-signal-steering',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Performance Max in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A goal-based Google Ads campaign type that uses Smart Bidding to automate bidding, budget, creative combinations, and audience targeting toward specified conversion goals. It runs across Search, Display, YouTube, Discover, Gmail, and Maps from one campaign.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are three benefits of a Performance Max campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cross-channel reach from a single campaign, automated bid, budget and creative optimization, and unified reporting. The tradeoff is less manual control over how each conversion type gets weighted.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do Performance Max ads look like?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard Performance Max assembles assets automatically across Search, Display, YouTube, Discover, Gmail, and Maps. The pay-per-lead variant from the Local Services Ads migration is narrower: Search and Maps only.',
        },
      },
      {
        '@type': 'Question',
        name: "What's automatically optimized with a Performance Max campaign?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Bidding, budget allocation, creative-asset combinations, and audience targeting, all driven by whichever conversion signal the campaign is fed. A blended signal degrades all four at once.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'short-answer', title: 'The Short Answer', level: 1 },
    { id: 'what-it-means', title: 'What Single Conversion Signal Steering Actually Means', level: 1 },
    { id: 'lsa-migration', title: 'The 2026 LSA Migration Is About to Multiply This Problem', level: 1 },
    { id: 'different-steering', title: "This Is a Different Steering Than Google's 2026 Update", level: 1 },
    { id: 'who-is-exposed', title: 'Who Is Actually Exposed (a Decision-Grid, Not a Panic List)', level: 1 },
    { id: 'diagnose', title: 'How to Diagnose Whether Your Own PMax Campaign Has This Problem', level: 1 },
    { id: 'the-fix', title: 'The Fix: Split Signal Before Google Splits It For You', level: 1 },
    { id: 'checklist', title: 'A Pre-Migration Checklist for LSA Advertisers', level: 1 },
    { id: 'cost-of-inaction', title: 'What This Costs If You Do Nothing', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'where-kampaio-fits', title: 'Where kampaio Fits', level: 1 },
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
  const listStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
    marginBottom: '32px',
  };
  const captionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.6',
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
      {/* Scoped layout for the 4-card PMax Exposure Grid. CompareGrid is a
          wrapping flex row by default, which puts 3 cards on line one and
          leaves the 4th stretched alone underneath at article width. Force an
          explicit 2x2 (no auto-fit) that collapses to a single column on
          mobile, so no row ever ends with an orphan card. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.pmx-exposure-grid > div{display:grid !important;grid-template-columns:repeat(2, 1fr) !important;align-items:stretch}' +
            '@media (max-width:640px){.pmx-exposure-grid > div{grid-template-columns:1fr !important}}',
        }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs + cover */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="performance-max-single-conversion-signal-steering" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Performance Max
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Performance Max Single-Conversion-Signal Steering: Why the 2026 LSA Migration Makes It Worse (and How to Fix It)
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Performance Max steers on one blended conversion signal, and from August 1, 2026 the Local Services Ads migration takes away the vertical-level Target CPA that kept multi-vertical accounts honest.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid media strategy at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>August 27, 2026 · 11 min read</span>
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
            {/* The Short Answer */}
            <section id="short-answer">
              <h2 style={h2}>The Short Answer</h2>
              <p style={para}>
                Performance Max single conversion signal steering happens when a campaign optimizes bidding toward one blended conversion signal instead of separate targets per vertical or value tier, so low-value or junk conversions drag the whole Target CPA down. Starting August 1, 2026, Google&apos;s Local Services Ads migration removes vertical-level Target CPA, pushing multi-vertical advertisers straight into this trap.
              </p>
              <p style={para}>
                This is not the same steering Google announced in its 2026 &quot;steering and reporting update,&quot; which covers audience exclusions and reporting, not bidding-signal weighting (<a href="https://business.google.com/us/accelerate/resources/articles/new-performance-max-steering-and-reporting-updates-coming-in-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">business.google.com</a>). The August 1, 2026 date comes from Google&apos;s official community announcement (<a href="https://support.google.com/google-ads/thread/456909801" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Community, Aug 2026</a>); Google&apos;s Help Center article frames the same milestone more generally as &quot;August 2026&quot; (<a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>

              {/* VISUAL 1: KeyTakeaways : front-loaded TL;DR */}
              <KeyTakeaways
                title="The short version"
                items={[
                  <>One blended conversion signal steers all of Performance Max bidding, so junk and low-value conversions drag the Target CPA down with them.</>,
                  <>From August 1, 2026 the Local Services Ads migration removes vertical-level Target CPA (Source: Google Ads Community thread 456909801; the Help Center says &quot;August 2026&quot;, answer 17213585).</>,
                  <>Not the same thing as Google&apos;s 2026 &quot;steering and reporting&quot; update, which covers audience exclusions and reporting only.</>,
                  <>The defense is structural: split campaigns by vertical or value tier before the cutover, then set conversion value rules.</>,
                ]}
              />
            </section>

            {/* What it means */}
            <section id="what-it-means">
              <h2 style={h2}>What &quot;Single Conversion Signal Steering&quot; Actually Means</h2>
              <p style={para}>
                Performance Max is a goal-based Google Ads campaign type that uses Smart Bidding to automate bidding, budget, creative combinations, and audience targeting toward whatever conversion goal it is given (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). Google&apos;s own description stops there: &quot;Performance Max drives performance based on your specified conversion goals, and delivers more conversions and value&quot; (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). It never covers what happens when several structurally different conversion types feed into the same goal.
              </p>
              <p style={para}>
                Single conversion signal steering describes that gap. When a plumbing lead, an HVAC lead, and a spam form fill all count as the same conversion inside one Target CPA, Smart Bidding cannot tell them apart and optimizes toward the blended average, not the outcome that matters. This differs from the tracking-accuracy question covered in <a href="/blog/performance-max-optimization" style={linkStyle}>the 7-lever PMax optimization playbook</a>: tracking accuracy asks whether a conversion is recorded correctly; this asks whether structurally different conversion types get blended into one target at all.
              </p>
              <p style={para}>
                As @everdenepublic put it: &quot;Performance Max has exactly one steering input: the conversion signal you send it&quot; (<a href="https://x.com/everdenepublic/status/2090119096209907859" style={linkStyle} target="_blank" rel="noopener noreferrer">X, Aug 19 2026</a>). Everything sent into that one input counts as equally valuable whether it is or not.
              </p>
              <p style={para}>
                Google&apos;s own narrowing mechanism seeds the fix later in this article: &quot;To specify which conversions are most valuable to your business, apply conversion values and set value rules&quot; (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). Most PMax accounts never configure this, which is why blended-signal risk shows up as unexplained <a href="/blog/google-ads-roas-dropped-suddenly" style={{ color: '#764ba2', textDecoration: 'underline' }}>ROAS volatility</a> rather than a visible setting. See <a href="/blog/google-ads-attribution-models-guide" style={linkStyle}>how attribution models train Smart Bidding</a> for the credit-allocation side of the same training data.
              </p>
            </section>

            {/* LSA migration */}
            <section id="lsa-migration">
              <h2 style={h2}>The 2026 LSA Migration Is About to Multiply This Problem</h2>
              <p style={para}>
                Local Services Ads is Google&apos;s pay-per-lead local advertising format for home-service and storefront businesses, verified through a Google Guaranteed or Google Screened badge. Starting August 1, 2026, Google begins migrating these accounts into Performance Max campaigns with pay-per-lead goals (<a href="https://support.google.com/google-ads/thread/456909801" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Community, Aug 2026</a>); the Help Center article frames the same milestone more generally as &quot;August 2026&quot; (<a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={para}>
                Three phases. Phase 1, August 1, 2026: select US home and storefront trades, introduced with the qualifier &quot;including&quot;: plumbing, HVAC, electrical, appliance repair, house cleaning, lawn care, roofing, pest control, moving (<a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Search Engine Land describes the same rollout more broadly, as pet care, home services, wellness, and education (<a href="https://searchengineland.com/local-services-ads-come-to-google-ads-via-performance-max-482692" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Jul 2026</a>); Google&apos;s nine trades all fall under Search Engine Land&apos;s &quot;home services&quot; label, but its other three categories are not confirmed on Google&apos;s own page. Phase 2, late 2026: service-area businesses without a storefront, plus custom bidding and booking setups. Phase 3, 2027: non-US accounts and remaining categories.
              </p>
              <p style={para}>
                The connecting fact, verbatim: &quot;Google Ads doesn&apos;t support vertical-level Target CPA bidding. If you previously managed different Target CPA amounts for separate verticals under a single campaign, a unified campaign-level Target CPA will be calculated and applied to all vertical categories&quot; (<a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). An agency running Plumbing and HVAC under separate Target CPAs loses that separation on migration day unless it splits first: &quot;you can achieve this by setting up separate campaigns for each vertical&quot; (same source).
              </p>
              <p style={para}>
                <a href="/blog/google-ads-ai-vs-manual-bidding" style={{ color: '#764ba2', textDecoration: 'underline' }}>Manual bidding</a> is no longer supported. Weekly budgets convert to a daily average (divided by 7), and the monthly cap equals the daily average times 30.4. BBB callouts are retired; accounts need at least 6 other structured callouts instead (all three, <a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Search Engine Journal sums the impact: &quot;The confirmed changes cluster in the four areas advertisers watch most: budgets, bidding, historical reporting, and day-to-day campaign management&quot; (Katie Morton, <a href="https://www.searchenginejournal.com/google-local-services-ads-performance-max-webinar/586879/" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Journal, Aug 2026</a>).
              </p>

              {/* VISUAL 2: ResponsiveTable : what changes vs what does not */}
              <ResponsiveTable
                headers={['Element', 'Before (standalone LSA)', 'After (PMax pay-per-lead)']}
                rows={[
                  ['Pay model', 'Pay per verified lead', 'Unchanged'],
                  ['Ad placement', 'Search + Maps only', 'Unchanged'],
                  ['Targeting', 'Local Services profile data', 'Carries over'],
                  [
                    'Bidding',
                    'Manual max cost-per-lead + vertical Target CPA',
                    'Manual bidding gone; one campaign-level Target CPA replaces vertical Target CPA',
                  ],
                  ['Budget', 'Weekly', 'Daily average = weekly divided by 7; monthly cap = daily x 30.4'],
                  [
                    'Reporting and history',
                    'Full LSA history',
                    <>
                      Does not transfer automatically; export first (
                      <a href="https://searchengineland.com/local-services-ads-come-to-google-ads-via-performance-max-482692" style={linkStyle} target="_blank" rel="noopener noreferrer">
                        Search Engine Land, Jul 2026
                      </a>
                      )
                    </>,
                  ],
                  ['BBB callouts', 'BBB badge shown', 'Replaced by at least 6 structured callouts'],
                  ['Verified badge', 'Google Guaranteed / Screened', 'Carries over'],
                ]}
              />
              <p style={captionStyle}>
                What changes and what does not in the August 2026 LSA-to-PMax migration. Source: Google Ads Help, answer 17213585 (2026), unless noted in the cell.
              </p>

              {/* VISUAL 3: MermaidDiagram, flowchart TD : the three migration phases */}
              <MermaidDiagram
                chart={`flowchart TD
    A["Aug 1 2026: Phase 1, 9 US trades"] --> B["Late 2026: Phase 2, service-area + custom"]
    B --> C["2027: Phase 3, non-US + remaining"]`}
                caption="The three migration phases. Source: Google Ads Help, answer 17213585 (2026)."
              />
            </section>

            {/* Different steering */}
            <section id="different-steering">
              <h2 style={h2}>This Is a Different &quot;Steering&quot; Than Google&apos;s 2026 Update</h2>
              <p style={para}>
                Google uses &quot;steering&quot; for something else entirely here. Its own 2026 &quot;steering and reporting&quot; update lets advertisers exclude specific audiences and see deeper reporting breakdowns. It says nothing about how a blended conversion signal gets weighted inside Smart Bidding, which is the problem this article is about. The two threads share a word, not a mechanic.
              </p>
              <p style={para}>
                Business.google.com describes its update this way: &quot;Now, we&apos;re launching new updates designed to help you reach your business goals by providing more ways to steer Google AI and see where your budget goes&quot; (<a href="https://business.google.com/us/accelerate/resources/articles/new-performance-max-steering-and-reporting-updates-coming-in-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">business.google.com</a>, modified May 2026). Four items only: first-party audience exclusions (already-converted customers), a budget-projection report, demographic audience reporting, and network segmentation in placement reporting. None touches how conversion types get weighted before a bid is placed; excluding a customer list is audience-targeting control, not signal-weighting control. No specific rollout date beyond &quot;2026&quot; is stated; treat anything more precise as unverified.
              </p>
            </section>

            {/* Who is exposed */}
            <section id="who-is-exposed">
              <h2 style={h2}>Who Is Actually Exposed (a Decision-Grid, Not a Panic List)</h2>
              <p style={para}>
                Not every PMax account carries blended-signal risk equally. Call it the PMax Exposure Grid: a four-tier read, from highest (forced by a fixed migration date) to low (structurally not possible).
              </p>

              {/* VISUAL 4 (bold-viz): CompareGrid : the PMax Exposure Grid */}
              <div className="pmx-exposure-grid">
              <CompareGrid
                columns={[
                  {
                    name: 'Highest: multi-vertical LSA',
                    bestFor: 'agencies facing the August 1, 2026 cutover',
                    highlight: true,
                    traits: [
                      { label: 'Forced by a fixed migration date', has: true },
                      { label: 'Loses vertical-level Target CPA', has: true },
                      { label: 'Unlike conversions share one target', has: true },
                      { label: 'Can wait for a scheduled review', has: false },
                    ],
                  },
                  {
                    name: 'Moderate, chronic: mixed-AOV ecommerce',
                    bestFor: 'a $20 SKU and a $400 SKU in one campaign',
                    traits: [
                      { label: 'Forced by a fixed migration date', has: false },
                      { label: 'Loses vertical-level Target CPA', has: false },
                      { label: 'Unlike conversions share one target', has: true },
                      { label: 'Can wait for a scheduled review', has: true },
                    ],
                  },
                  {
                    name: 'Moderate, chronic: blended B2B leads',
                    bestFor: 'demos and downloads in one conversion action',
                    traits: [
                      { label: 'Forced by a fixed migration date', has: false },
                      { label: 'Loses vertical-level Target CPA', has: false },
                      { label: 'Unlike conversions share one target', has: true },
                      { label: 'Can wait for a scheduled review', has: true },
                    ],
                  },
                  {
                    name: 'Low: single vertical, single value tier',
                    bestFor: 'one conversion type in one value band',
                    traits: [
                      { label: 'Forced by a fixed migration date', has: false },
                      { label: 'Loses vertical-level Target CPA', has: false },
                      { label: 'Unlike conversions share one target', has: false },
                      { label: 'Can wait for a scheduled review', has: true },
                    ],
                  },
                ]}
              />
              </div>
              <p style={captionStyle}>
                The PMax Exposure Grid. Source for the top row: Google Ads Help, answer 17213585 (2026), which states the unified campaign-level Target CPA. The lower three rows are structural patterns, not cited figures.
              </p>

              <p style={para}>
                Row one is the only migration-triggered tier, and its only defense is splitting into per-vertical campaigns before the date. The middle two are chronic rather than dated: a $20 SKU and a $400 SKU share one Target ROAS unless value rules separate them, and high-intent demos blended with low-intent downloads in one conversion action dilute lead quality inside the same target. That second case is corroborated by <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>why Performance Max fails in B2B marketing</a>. The bottom tier has one conversion type and one value band, so there is nothing structurally different to blend.
              </p>

              <MascotQuote mascot="echo">
                Inside the Insights tab, a blended account often shows two distinct clusters of conversion value in one report instead of one smooth distribution, say a cluster near $50 and another near $500. That split is the diagnostic tell, not a bid-change instruction. (Illustrative pattern, not a specific account&apos;s real reporting.)
              </MascotQuote>

              <p style={para}>
                For agencies running a mixed book of clients, the grid above is a punch list: run every multi-vertical local-service account against row one before August 1, 2026, and let the rest wait for a scheduled review.
              </p>
            </section>

            {/* Diagnose */}
            <section id="diagnose">
              <h2 style={h2}>How to Diagnose Whether Your Own PMax Campaign Has This Problem</h2>
              <p style={para}>
                Blended-signal risk applies to any Performance Max campaign, migration or not. Four checks surface it without waiting for a deadline.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}>Check whether one conversion action counts structurally different outcomes as equal value, a sales call and a newsletter signup, say.</li>
                <li style={{ marginBottom: '16px' }}>If value-based bidding is active, look at the spread of conversion values inside a single campaign for a bimodal distribution, two humps instead of one.</li>
                <li style={{ marginBottom: '16px' }}>Open the Insights tab and look for category-level performance hidden inside one blended total.</li>
                <li style={{ marginBottom: 0 }}>Confirm whether conversion value rules are actually configured, or quietly left at Google&apos;s default equal-weighting.</li>
              </ol>
              <p style={para}>
                Performance Max automates bidding, budget allocation, creative-asset combinations, and audience targeting at once, all steered by whichever conversion signal it is fed. That is why signal quality matters more here than in manually-controlled campaign types: automation amplifies whatever target it is given.
              </p>
              <p style={para}>
                Negative keywords cannot fix any of the four checks above. <a href="/blog/performance-max-negative-keywords" style={linkStyle}>Performance Max negative keywords</a> block specific search queries; they do not repair broken tracking or a blended signal, because that problem lives in what counts as a conversion, not which queries trigger one.
              </p>
            </section>

            {/* The fix */}
            <section id="the-fix">
              <h2 style={h2}>The Fix: Split Signal Before Google Splits It For You</h2>
              <p style={para}>
                Splitting the signal cleanly is not complicated. It just has to happen on purpose. Three moves get you there, in order of how much control each hands back.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Split campaigns by vertical or value tier.</strong> Google&apos;s own migration FAQ says it plainly: &quot;you can achieve this by setting up separate campaigns for each vertical&quot; (<a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). This takes about an afternoon to plan and is the highest-impact move on the list, because it removes the blend at the source instead of working around it.
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <strong>Configure conversion value rules.</strong> Google names the mechanism directly: &quot;apply conversion values and set value rules&quot; (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). It is a low-effort change, worth doing even when a full campaign split is not practical yet, though on its own it only moderates the problem rather than removing it.
                </li>
                <li style={{ marginBottom: 0 }}>
                  <strong>Correct signal after the fact with enhanced conversions and offline conversion adjustments.</strong> This one is never really finished. It needs a CRM or lead-status feed feeding back continuously, and it works best paired with the two moves above, not as a standalone fix.
                </li>
              </ol>
              <p style={para}>
                Google&apos;s general guidance recommends consolidating campaigns where possible (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>), but that advice predates this migration&apos;s vertical-Target-CPA problem; the migration FAQ overrides it with a narrower fix: split by vertical when one blended Target CPA would otherwise absorb structurally different conversion types.
              </p>

              <MascotQuote mascot="buzz">
                On a hypothetical $14,000/month account with two verticals (Plumbing, HVAC), splitting into separate campaigns and reweighting conversion values 8 days before the cutover is the kind of move that stops Smart Bidding from anchoring on a blended average. In a representative case like this, cost-per-qualified-lead on the higher-value vertical can drop in the 15-20% range over the following 3-week window once the signal is clean. Actual results depend on account size, vertical mix, and how contaminated the blended history already was.
              </MascotQuote>

              <p style={para}>
                For the mechanics behind why a clean signal changes bidding behavior this fast, see <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>how Target CPA and Target ROAS actually work</a>.
              </p>
            </section>

            {/* Checklist */}
            <section id="checklist">
              <h2 style={h2}>A Pre-Migration Checklist for LSA Advertisers</h2>
              <p style={para}>
                That is the general playbook. LSA advertisers are working against a fixed date, so here are five steps, each tied to a fact already sourced above.
              </p>

              {/* VISUAL 5: Steps : the five-step pre-migration checklist */}
              <Steps>
                <Step title="Export historical LSA performance reports before migration day">
                  They do not transfer automatically; download or screenshot through the redirection page first (
                  <a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Google Ads Help, 2026
                  </a>
                  ).
                </Step>
                <Step title="Identify every vertical under one LSA account and decide split-versus-merge before the advance notice arrives">
                  Admins get a notification 14 days before migration, plus a final reminder 7 days after (
                  <a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Google Ads Help, 2026
                  </a>
                  ).
                </Step>
                <Step title="Recalculate budgets for the weekly-to-daily conversion">
                  Daily average = weekly divided by 7; monthly cap = daily average times 30.4 (same source).
                </Step>
                <Step title="Set or confirm conversion value rules per vertical before the unified Target CPA takes over">
                  Same mechanism Google names for narrowing PMax&apos;s conversion signal generally (
                  <a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">
                    Google Ads Help
                  </a>
                  ).
                </Step>
                <Step title="Replace BBB callouts with at least 6 structured callouts">
                  Business hours, specialties, payment methods, all in place ahead of the cutover.
                </Step>
              </Steps>
            </section>

            {/* Cost of inaction */}
            <section id="cost-of-inaction">
              <h2 style={h2}>What This Costs If You Do Nothing</h2>
              <p style={para}>
                Blended-signal accounts do not fail visibly on day one. They drift. For an agency owner, that drift becomes an end-of-month call explaining why cost-per-lead crept up with no clean story. Nothing broke. The account just optimized toward the wrong average. @TronWatch3r&apos;s framing is direct: &quot;Performance Max isn&apos;t underperforming. It&apos;s doing exactly what your conversion data told it to do. That&apos;s the problem&quot; (<a href="https://x.com/TronWatch3r/status/2059241893834191171" style={linkStyle} target="_blank" rel="noopener noreferrer">X, May 26 2026</a>).
              </p>
              <p style={para}>
                Other practitioners describe the same drift. @LeeCaston2: &quot;20-40% of budget disappears inside PMax, broad match, &apos;smart&apos; bidding&quot; (<a href="https://x.com/LeeCaston2/status/2043956231862190206" style={linkStyle} target="_blank" rel="noopener noreferrer">X, Apr 14 2026</a>). @Aria_Nawi: &quot;ROAS dropped overnight across 4 campaigns&quot; (<a href="https://x.com/Aria_Nawi/status/2084640315944943616" style={linkStyle} target="_blank" rel="noopener noreferrer">X, Aug 4 2026</a>, 247 engagements). None of that is a controlled study, individually attributed sentiment is not data, but it lines up closely enough with the sourced mechanics above to take seriously.
              </p>
              <p style={para}>
                This is a structurally correct setup gone wrong, not a bug, and that distinction matters for where the fix actually goes. If tracking itself is broken, <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>the 90-second conversion tracking triage</a> is the right first stop. If tracking is accurate but the campaign still blends unlike conversions, <a href="/blog/performance-max-not-converting" style={linkStyle}>the 9-step Performance Max conversion troubleshooter</a> covers the tactical symptoms; this article covers the architecture underneath. Results vary by account size and vertical mix, so treat any number above as directional, not a guarantee.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Frequently Asked Questions</h2>

              <h3 style={h3}>What is Performance Max in Google Ads?</h3>
              <p style={para}>
                A goal-based Google Ads campaign type that uses Smart Bidding to automate bidding, budget, creative combinations, and audience targeting toward specified conversion goals (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). It runs across Search, Display, YouTube, Discover, Gmail, and Maps from one campaign.
              </p>

              <h3 style={h3}>What are three benefits of a Performance Max campaign?</h3>
              <p style={para}>
                Cross-channel reach from a single campaign, automated bid, budget and creative optimization, and unified reporting (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). The tradeoff is less manual control over how each conversion type gets weighted.
              </p>

              <h3 style={h3}>What do Performance Max ads look like?</h3>
              <p style={para}>
                Standard PMax assembles assets automatically across Search, Display, YouTube, Discover, Gmail, and Maps. The pay-per-lead variant from the LSA migration is narrower: Search and Maps only (<a href="https://support.google.com/google-ads/answer/17213585" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>

              <h3 style={h3}>What is automatically optimized with a Performance Max campaign?</h3>
              <p style={para}>
                Bidding, budget allocation, creative-asset combinations, and audience targeting, all driven by whichever conversion signal the campaign is fed. A blended signal degrades all four at once.
              </p>
            </section>

            {/* Where kampaio fits + CTA */}
            <section id="where-kampaio-fits">
              <h2 style={h2}>Where kampaio Fits</h2>
              <p style={para}>
                Signal-quality monitoring and per-vertical campaign structuring are unglamorous account hygiene that decays without a dedicated watch. Inside kampaio, Buzz (bid strategy) and Echo (reporting) surface blended-signal risk and value-rule drift automatically, before a migration date or a slow ROAS bleed forces the issue. Neither agent auto-splits a campaign or auto-migrates an LSA account without approval; they flag exposure and hand you the decision. This hygiene sits inside <a href="/blog/google-ads-optimization" style={linkStyle}>the complete Google Ads optimization framework</a>. See <a href="/b6#buzz" style={linkStyle}>Buzz</a> and <a href="/b6#echo" style={linkStyle}>Echo</a> in the <a href="/pricing" style={linkStyle}>pricing</a> plans.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Check your conversion signal before August 1
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Buzz watches the bid side and Echo watches the reporting side, so a blended conversion signal gets flagged before it quietly resets your Target CPA.
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
                  See what Kampaio runs
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Migration dates, budget arithmetic and bidding changes are cited to Google Ads Help (answers 17213585 and 10724817) and to Google&apos;s Ads Community announcement (thread 456909801), all verified on August 27, 2026. Mascot figures are illustrative, not client results. Practitioner posts on X are individual sentiment, not measured data. This article is informational and does not constitute professional advice.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="performance-max-single-conversion-signal-steering" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
