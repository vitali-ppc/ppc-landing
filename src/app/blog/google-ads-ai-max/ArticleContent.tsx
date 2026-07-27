'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { DonutStat, Callout, KeyTakeaways, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-ai-max#article',
    headline: 'Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)',
    description:
      'Google publishes two different performance numbers for AI Max, and they measure different things. What AI Max actually changes, the verified 2026-2027 migration dates, and when to enable it.',
    image: 'https://www.kampaio.com/og/google-ads-ai-max.png',
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
    datePublished: '2026-07-20T00:00:00.000Z',
    dateModified: '2026-07-20T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-ai-max',
    },
    keywords:
      'google ads ai max, ai max for search campaigns, search term matching, text customization, final url expansion, dsa sunset, automatically created assets, ai max vs performance max, smart bidding, ai max for shopping',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should I turn on AI Max in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The answer depends on bid strategy and campaign type, not a blanket yes or no. Enable on generic campaigns with conversion-based Smart Bidding and solid negative keyword lists; hold on Manual CPC or brand campaigns that already perform well.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between PMax and AI Max in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Performance Max is a distinct campaign type spanning Search, Display, YouTube, Discover, Gmail, and Maps. AI Max is a feature set inside an existing Search campaign, Search only. Both can run in the same account.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I turn on AI Max in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to Campaign settings, open the Asset optimization panel, and toggle search term matching, text customization, and final URL expansion. Set up conversion tracking and a conversion-based Smart Bidding strategy first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there any limit on Google AI Mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'That is a different product. Google AI Mode is consumer search, not AI Max for Google Ads. This article covers AI Max only.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does AI Max replace keywords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, keywords remain the foundation of matching. Exact and phrase match keywords continue to work as before, and keyword-based matches still take priority over AI-added matches. Search term matching adds keywordless matches on top of your existing keyword structure; it does not replace it.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does AI Max work with Manual CPC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Google documentation requires conversion-based Smart Bidding (Maximize Conversions, Maximize Conversion Value, Target CPA, or Target ROAS) for AI Max to function as designed. On Manual CPC you will not see Google published uplift figures; switch the bid strategy first.',
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
        name: 'Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)',
        item: 'https://www.kampaio.com/blog/google-ads-ai-max',
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: What AI Max Is and Who Should Enable It', level: 1 },
    { id: 'what-is', title: 'What Is Google AI Max, Exactly?', level: 1 },
    { id: 'vs-pmax', title: "AI Max vs Performance Max: What's Actually Different", level: 1 },
    { id: 'numbers', title: "What Google's Own Numbers Actually Say", level: 1 },
    { id: 'timeline', title: 'The Migration Timeline: What Changes and When', level: 1 },
    { id: 'how-to', title: 'How to Turn On AI Max (and What to Set Up First)', level: 1 },
    { id: 'when-not', title: 'When You Should Not Enable AI Max Yet', level: 1 },
    { id: 'what-to-watch', title: 'What to Watch After You Enable It', level: 1 },
    { id: 'shopping', title: 'AI Max Is Expanding Beyond Search', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'kampaio', title: 'Where Kampaio Fits', level: 1 },
    { id: 'bottom-line', title: 'The Bottom Line', level: 1 },
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
  const captionStyle: React.CSSProperties = { fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, marginTop: '-12px', marginBottom: '32px' };
  const holdStyle: React.CSSProperties = { color: '#ef4444', fontWeight: 600 };
  const enableStyle: React.CSSProperties = { color: '#10b981', fontWeight: 600 };
  const partialStyle: React.CSSProperties = { color: '#f59e0b', fontWeight: 600 };

  const faqItems = [
    {
      q: 'Should I turn on AI Max in Google Ads?',
      a: (
        <>The answer depends on bid strategy and campaign type, not a blanket yes or no. Enable on generic campaigns with conversion-based Smart Bidding and solid negative lists; hold on Manual CPC or brand campaigns already performing. See the decision grid above.</>
      ),
    },
    {
      q: 'What is the difference between PMax and AI Max in Google Ads?',
      a: (
        <>Performance Max is a distinct campaign type spanning Search, Display, YouTube, Discover, Gmail, and Maps. AI Max is a feature set inside an existing Search campaign, Search only. Both can run in the same account.</>
      ),
    },
    {
      q: 'How do I turn on AI Max in Google Ads?',
      a: (
        <>Go to Campaign settings, open the Asset optimization panel, and toggle search term matching, text customization, and final URL expansion. Set up conversion tracking and conversion-based Smart Bidding first (<a href="https://support.google.com/google-ads/answer/15909989" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Set up AI Max, 2026</a>).</>
      ),
    },
    {
      q: 'Is there any limit on Google AI Mode?',
      a: (
        <>That is a different product: Google AI Mode is consumer search, not AI Max for Google Ads. This article covers AI Max only.</>
      ),
    },
    {
      q: 'Does AI Max replace keywords?',
      a: (
        <>No, keywords remain the foundation of matching. Exact and phrase match keywords continue to work as before, and keyword-based matches still take priority over AI-added matches. Search term matching adds keywordless matches on top of your existing keyword structure; it does not replace it.</>
      ),
    },
    {
      q: 'Does AI Max work with Manual CPC?',
      a: (
        <>No. Google&apos;s own documentation requires conversion-based Smart Bidding, Maximize Conversions, Maximize Conversion Value, Target CPA, or Target ROAS, for AI Max to function as designed. On Manual CPC, you won&apos;t see Google&apos;s published uplift figures; switch the <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>bid strategy</a> first.</>
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
          <ArticleHero slug="google-ads-ai-max" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              AI &amp; Automation &middot; AI Max
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Google publishes two different performance numbers for AI Max, and they measure different things. Here is what AI Max actually changes, what each figure really compares, the verified migration dates, and when to hold off.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 20, 2026 &middot; 11 min read</span>
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
            {/* Intro */}
            <section id="intro">
              <p style={paragraphStyle}>
                Google Ads AI Max is a suite of AI features that runs inside your existing Search campaigns, not a separate campaign type. Turn it on if you use conversion-based Smart Bidding, run non-brand campaigns, and keep negative keyword lists current. Hold off if you&apos;re on Manual CPC or protecting brand campaigns that already convert well.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR &mdash; What AI Max Is and Who Should Enable It</h2>
              <KeyTakeaways
                items={[
                  'Not a campaign type. An optimization layer inside a Search campaign you already run.',
                  'Three mechanisms: search term matching, text customization, final URL expansion.',
                  'Requires conversion-based Smart Bidding (Maximize Conversions, Maximize Conversion Value, Target CPA, or Target ROAS). Manual CPC will not get Google published numbers.',
                  'Google publishes two different uplift figures: activating AI Max at all, versus running the full feature set instead of matching alone.',
                  'DSA, ACA, and broad match migrate through 2026-2027, with one open discrepancy in Google own post.',
                  'Google published Search figures exclude Retail advertisers.',
                ]}
              />
            </section>

            {/* What is */}
            <section id="what-is">
              <h2 style={h2Style}>What Is Google AI Max, Exactly?</h2>
              <p style={paragraphStyle}>
                AI Max is an optimization layer inside Search campaigns, not a new campaign type.
              </p>
              <p style={paragraphStyle}>
                Search term matching combines broad match with keywordless matching, serving ads on queries that don&apos;t contain your keywords but match the intent behind your assets.
              </p>
              <p style={paragraphStyle}>
                Text customization generates headlines and descriptions from your ads and landing pages. It&apos;s the current name for what Google called Automatically Created Assets (ACA); if ACA is already on in your account, you&apos;re already using this feature.
              </p>
              <p style={paragraphStyle}>
                Final URL expansion lets Google pick the landing page for a click instead of the ad&apos;s set URL. The two are paired: &quot;Deactivating text customization automatically disables Final URL expansion&quot; (<a href="https://support.google.com/google-ads/answer/15909989" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Set up AI Max</a>). At the ad group level, AI Max also adds locations of interest.
              </p>
            </section>

            {/* vs pMax */}
            <section id="vs-pmax">
              <h2 style={h2Style}>AI Max vs Performance Max: What&apos;s Actually Different</h2>
              <p style={paragraphStyle}>
                Performance Max is a campaign type spanning channels; AI Max is a feature set running only on the Search Network.
              </p>

              {/* VISUAL 1: three-way control comparison (responsive) */}
              <ResponsiveTable
                headers={['Axis', 'Standard Search', 'AI Max', 'Performance Max']}
                rows={[
                  ['Where ads serve', 'Search only', 'Search only', 'Search, Display, YouTube, Discover, Gmail, Maps'],
                  ['Query control', 'Advertiser-set match types', 'Broad match plus keywordless, AI-expanded', 'Fully automated'],
                  ['Ad copy control', 'Advertiser-written RSAs', 'Advertiser assets plus optional AI text', 'AI-generated combinations'],
                  ['Landing page control', 'Advertiser-set URLs', 'Optional AI final URL expansion', 'AI-selected from URL set'],
                  ['Reporting transparency', 'Standard search terms report', 'AI Max match type plus Source and Selected by columns', 'Asset-group level only'],
                  ['Campaign structure', 'Ad groups, keywords', 'Same Search structure, features layered on', 'Asset groups replace ad groups'],
                ]}
              />
              <p style={captionStyle}>How much control each surface leaves you, axis by axis.</p>

              <p style={paragraphStyle}>
                Both can run in the same account. When a query matches both, the higher Ad Rank wins, most often on brand terms, one reason to set brand exclusions on generic AI Max campaigns (see the decision grid below, and our guide to <a href="/blog/performance-max-optimization" style={linkStyle}>Performance Max optimization</a>).
              </p>
            </section>

            {/* Numbers */}
            <section id="numbers">
              <h2 style={h2Style}>What Google&apos;s Own Numbers Actually Say</h2>
              <p style={paragraphStyle}>
                Google publishes two different uplift figures for AI Max, and they answer different questions.
              </p>

              {/* VISUAL 2 (bold-viz): the two figures side by side */}
              <DonutStat
                items={[
                  { percent: 14, label: 'more conversions or value: AI Max activated vs. not activated' },
                  { percent: 7, label: 'more conversions or value: full feature suite vs. search term matching alone' },
                ]}
                source="Source: Google internal data (2025 for the 14% figure, 2026 for the 7% figure), non-Retail advertisers, at a similar CPA/ROAS"
              />

              <ResponsiveTable
                headers={['Figure', "Google's exact wording", 'Comparison baseline', 'Source', 'Data vintage']}
                rows={[
                  [
                    '14%',
                    '"Advertisers that activate AI Max in Search campaigns will typically see 14% more conversions or conversion value at a similar CPA/ROAS."',
                    'AI Max activated vs. not activated',
                    <a key="s14" href="https://support.google.com/google-ads/answer/15910366" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About AI Max, 2026</a>,
                    'Google internal data, 2025; non-Retail',
                  ],
                  [
                    '7%',
                    '"AI Max for Search campaigns see an average of 7% more conversions or conversion value at a similar CPA/ROAS when using the full feature suite - search term matching, text customization and final URL expansion - compared to using search term matching alone."',
                    'Full feature suite vs. search term matching alone',
                    <a key="s7" href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">blog.google, DSA to AI Max upgrade, 2026 (footnote 1)</a>,
                    'Google internal data, 2026; non-Retail',
                  ],
                ]}
              />
              <p style={captionStyle}>Two Google figures, two different baselines. Neither is a forecast for your account.</p>

              <p style={paragraphStyle}>
                14 percent answers whether to enable AI Max at all. 7 percent answers the question a cautious advertiser actually has: run the full suite, or hold at matching alone. That 7 percent is effectively the measured price of keeping control over ad copy and landing page selection.
              </p>
              <p style={paragraphStyle}>
                Both are Google&apos;s own internal data: self-reported, not independently audited, and both exclude Retail advertisers. Neither number applies formally to an ecommerce account running Shopping alongside Search (Retail has its own figure, covered later). Treat both as an upper-bound benchmark, not a forecast for one account: run AI Max as a measured test against a documented baseline, using Google&apos;s one-click experiments.
              </p>

              <MascotQuote mascot="aegis">
                Write down your CPA and conversion volume for the last 30 days before you flip anything on. Google&apos;s 7 and 14 percent figures are averages, not a promise for your account. Run AI Max as a one-click experiment against your documented baseline; a three-day glance at search terms tells you nothing.
              </MascotQuote>
            </section>

            {/* Timeline */}
            <section id="timeline">
              <h2 style={h2Style}>The Migration Timeline: What Changes and When</h2>
              <p style={paragraphStyle}>
                AI Max&apos;s migration runs on two overlapping timelines, and Google&apos;s own post doesn&apos;t fully agree with itself on the September details.
              </p>

              {/* VISUAL 3: the migration dates (responsive) */}
              <ResponsiveTable
                headers={['Date', 'What happens', 'Who it affects', 'Source']}
                rows={[
                  ['Apr 15, 2026', 'AI Max for Search exits beta; DSA-to-AI-Max upgrade announced', 'All Search advertisers', 'blog.google DSA upgrade post'],
                  ['Jun 11, 2026', 'Update note extends DSA sunset/auto-upgrade to Feb 2027; ACA and broad match settings still auto-upgrade Sept 2026', 'DSA (extended); ACA and broad match (unchanged)', 'blog.google, June 11 update note'],
                  ['Sept 2026', 'Phase 2 section: legacy campaigns auto-upgrade, new DSA creation ends', 'DSA advertisers, per Phase 2 wording', 'blog.google, Phase 2 section'],
                  ['Feb 2027', 'DSA sunset and auto-upgrade begins, per the June 11 note', 'Remaining DSA advertisers', 'blog.google, June 11 update note'],
                ]}
              />
              <p style={captionStyle}>Verified dates from Google&apos;s own post. The Sept 2026 and Feb 2027 rows conflict.</p>

              <Callout variant="warning" title="Google contradicts itself here">
                The June 11 note and the Phase 2 section, further down the same post, disagree with each other, and Google hasn&apos;t published anything reconciling them. Read both directly from <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">the source</a> and watch for in-account notifications rather than treating either date as final.
              </Callout>

              <p style={paragraphStyle}>
                What transfers: DSA moves to standard ad groups with all three features enabled and legacy URL controls preserved; ACA moves to search term matching plus text customization, without final URL expansion; broad match moves to search term matching alone. Google recommends switching voluntarily, on your own terms.
              </p>
            </section>

            {/* How to */}
            <section id="how-to">
              <h2 style={h2Style}>How to Turn On AI Max (and What to Set Up First)</h2>
              <p style={paragraphStyle}>
                AI Max lives in Campaign settings, under Asset optimization. Guardrails first, toggle second.
              </p>

              <Steps>
                <Step title="Confirm conversion tracking and bid strategy">
                  Verify accurate conversion tracking and a <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>conversion-based Smart Bidding strategy</a>.
                </Step>
                <Step title="Audit your negatives">
                  Audit and extend the <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keyword list</a>.
                </Step>
                <Step title="Set brand inclusions and exclusions">
                  Apply them at both campaign and ad group level.
                </Step>
                <Step title="Add URL exclusions">
                  Block pages AI should never send traffic to: login, returns policy, thin content.
                </Step>
                <Step title="Configure text guidelines">
                  Set up <a href="https://support.google.com/google-ads/answer/16489313" style={linkStyle} target="_blank" rel="noopener noreferrer">text guidelines</a> (25 term exclusions, 40 messaging restrictions per campaign).
                </Step>
                <Step title="Enable on low-risk campaigns first">
                  Start on generic campaigns, not brand.
                </Step>
              </Steps>

              <p style={paragraphStyle}>
                Want matching without losing landing page control? Turn final URL expansion off at the campaign level, on at the ad group level with explicit inclusions. Google is also testing AI Brief (beta) via a Google Account Strategist; no first-party page confirms it as of July 2026, so treat it as unconfirmed.
              </p>

              <MascotQuote mascot="buzz">
                AI Max needs conversion-based Smart Bidding: Maximize Conversions, Maximize Conversion Value, Target CPA, or Target ROAS. Google&apos;s own documentation says all three AI Max mechanisms require it to work effectively. On Manual CPC, you won&apos;t get Google&apos;s published numbers. Switch the bid strategy first.
              </MascotQuote>
            </section>

            {/* When not */}
            <section id="when-not">
              <h2 style={h2Style}>When You Should Not Enable AI Max Yet</h2>
              <p style={paragraphStyle}>
                <a href="/blog/google-ads-ai-vs-manual-bidding" style={linkStyle}>Manual CPC</a> and thin sites are the clearest reasons to hold; the full picture depends on account conditions.
              </p>

              {/* VISUAL 4: the decision grid (responsive) */}
              <ResponsiveTable
                headers={['Condition', 'Recommendation', 'Why']}
                rows={[
                  ['Manual CPC or non-conversion bid strategy', <span key="r1" style={holdStyle}>Hold</span>, 'Requires conversion-based Smart Bidding to function effectively'],
                  ['Brand campaign already converting well', <span key="r2" style={holdStyle}>Hold</span>, 'Risk of serving on your own brand terms and inflating apparent performance'],
                  ['Retail / ecommerce account', <span key="r3" style={partialStyle}>Enable as a measured test</span>, "Google's Search figures exclude Retail; AI Max for Shopping (beta) has its own figure"],
                  ['Compliance-heavy or claims-heavy ad copy', <span key="r4" style={partialStyle}>Enable partially</span>, 'Turn text customization off; this also disables final URL expansion'],
                  ['Thin or outdated site content', <span key="r5" style={holdStyle}>Hold</span>, 'Final URL expansion routes traffic based on page content Google can crawl'],
                  ['Weak or immature negative keyword lists', <span key="r6" style={holdStyle}>Hold</span>, 'Broad match and keywordless matching expand reach fastest where negatives are weakest'],
                  ['Large, changing catalog on generic campaigns', <span key="r7" style={enableStyle}>Enable full suite</span>, "Closest to the profile behind Google's published figures"],
                ]}
              />
              <p style={captionStyle}>The decision grid: match your account condition to the call.</p>

              <p style={paragraphStyle}>
                The risks are straightforward: lost line-item bid control, weak sites matched to weak queries, and spend on loosely related searches where negatives haven&apos;t caught up. One risk to plan for specifically: AI Max can end up serving on your own brand terms, inflating a generic campaign&apos;s apparent efficiency. Brand exclusions are the fix (see <a href="/blog/performance-max-not-converting" style={linkStyle}>why Performance Max stops converting</a>).
              </p>
            </section>

            {/* What to watch */}
            <section id="what-to-watch">
              <h2 style={h2Style}>What to Watch After You Enable It</h2>
              <p style={paragraphStyle}>
                The first 14 days call for a tight audit; after that, a monthly rhythm is enough. Review search terms every two to three days; don&apos;t cut aggressively, since an adjacent-intent query isn&apos;t automatically waste.
              </p>
              <p style={paragraphStyle}>
                Three surfaces carry the detail: the search terms report&apos;s AI Max match type plus Source column, the landing pages report&apos;s Selected by column, and the Assets view&apos;s Added by column marked &quot;Google AI.&quot; Bulk removal requires the API or Editor, not the web UI.
              </p>
              <p style={paragraphStyle}>
                Monthly, check <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={{ color: '#764ba2', textDecoration: 'underline' }}>Quality Score</a> and Landing page experience alongside lead quality from your CRM (see our <a href="/blog/google-ads-optimization" style={linkStyle}>Google Ads optimization</a> guide).
              </p>
            </section>

            {/* Shopping */}
            <section id="shopping">
              <h2 style={h2Style}>AI Max Is Expanding Beyond Search</h2>
              <p style={paragraphStyle}>
                Google has opened a documentation section for AI Max for Shopping campaigns, beta as of July 2026. Its published figure: &quot;On average, advertisers that activate AI Max for Shopping will typically see +5% more conversions / conversion value at a similar CPA/ROAS&quot; (<a href="https://support.google.com/google-ads/answer/17091277" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, AI Max for Shopping, 2026</a>), Google internal data, Global, 2026, for Retail advertisers. That&apos;s the exact inverse of the two Search figures above, which exclude Retail. Shopping advertisers should track this beta directly, at <a href="https://support.google.com/google-ads/topic/17090059" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About AI Max for Shopping</a>.
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

            {/* Where Kampaio fits */}
            <section id="kampaio">
              <h2 style={h2Style}>Where Kampaio Fits</h2>
              <p style={paragraphStyle}>
                AI Max doesn&apos;t remove the PPC manager&apos;s job; it turns it into a weekly rhythm of auditing search terms, keeping negatives current, and watching for brand term bleed.
              </p>
              <p style={paragraphStyle}>
                <a href="/blog/google-ads-ai-agent" style={linkStyle}>Kampaio&apos;s agents</a> split that rhythm by function: Aegis handles risk review and guardrails, Buzz manages bid <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a>, Sage works the search terms report, flagging queries worth excluding before they compound into wasted spend.
              </p>
            </section>

            {/* Bottom line */}
            <section id="bottom-line">
              <h2 style={h2Style}>The Bottom Line</h2>
              <p style={paragraphStyle}>
                For DSA or ACA accounts, the question has shifted from &quot;should I enable AI Max&quot; to &quot;on my own terms, or on Google&apos;s schedule.&quot; For everyone else: conversion-based bidding plus guardrails already in place makes AI Max a reasonable test. Either missing, fix that first.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Want that guardrail check run for you?
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Kampaio&apos;s agents run the pre-flight check and the weekly search terms audit that AI Max needs. See <a href="/pricing" style={linkStyle}>Kampaio&apos;s plans</a>.
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
                  Connect your account free
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                Sources: <a href="https://support.google.com/google-ads/answer/15910366" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About AI Max for Search (2026)</a>; <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">blog.google, DSA to AI Max upgrade (2026)</a>; <a href="https://support.google.com/google-ads/answer/15910187" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, How AI Max works (2026)</a>; <a href="https://support.google.com/google-ads/answer/15909989" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Set up AI Max (2026)</a>; <a href="https://support.google.com/google-ads/answer/16489313" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Text guidelines (2026)</a>; <a href="https://support.google.com/google-ads/topic/17090059" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, AI Max for Shopping beta (2026)</a>; <a href="https://support.google.com/google-ads/answer/17091277" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, AI Max for Shopping campaigns (2026)</a>. All performance figures are Google&apos;s own internal data, self-reported and not independently audited. This article is informational and does not constitute financial or business advice.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-ai-max" category="ai" />
      <Footer compact={true} />
      </div>
    </>
  );
}
