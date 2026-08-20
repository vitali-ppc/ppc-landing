'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { BigStat, Callout, KeyTakeaways, Pullquote, SignalStack } from '../../../components/blog/primitives';

const FULL_TITLE =
  'Google Ads Account Structure: The 2026 Setup Guide (Plus the 5-Minute Audit That Shows If Yours Is Quietly Burning Budget)';

const DESCRIPTION =
  'Build a Google Ads account structure that works from day one: three layers, a DTC campaign blueprint, naming conventions, and where AI Max fits in 2026. Then run the 5-minute audit that shows if your current setup is quietly wasting budget.';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-account-structure#article',
    headline: FULL_TITLE,
    description: DESCRIPTION,
    image: 'https://www.kampaio.com/og/google-ads-account-structure.png',
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
    datePublished: '2026-07-29T00:00:00.000Z',
    dateModified: '2026-07-29T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-account-structure',
    },
    keywords:
      'google ads account structure, campaign structure, ad group structure, skag vs stag, single theme ad groups, dtc google ads structure, naming conventions, ai max, dynamic search ads sunset, google ads audit',
    inLanguage: 'en',
    "wordCount": 1657,
    "articleSection": "Google Ads"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the structure of a Google Ads account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Three layers: account, campaigns, and ad groups, each holding progressively more specific settings. Ad groups contain the actual keywords, ads, and one landing page apiece.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does a Google Ads account work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Billing and account-wide settings sit at the account level, budget and targeting sit at the campaign level, and keyword-to-ad-to-landing-page relevance is decided at the ad-group level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Google Ads structure for 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Still the same three-layer foundation, but campaigns are increasingly built around AI Max for Search rather than Dynamic Search Ads, whose sunset was pushed to February 2027 in Google’s own June 2026 update.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is $20 a day good for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is workable for a single tightly-scoped non-brand campaign in a DTC account, but not enough to run multiple campaign tiers at once. Consolidate into one campaign until spend supports splitting by intent.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many ad groups should be in one Google Ads campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A reasonable starting range is 7-10 ad groups per campaign with 10-20 keywords each, per WordStream’s practitioner guidance. Treat it as one practitioner’s range, not a platform-mandated rule, since other sources land on slightly different numbers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is SKAG still worth using in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Single-keyword ad groups are a legacy tactic that close-variant matching made obsolete. Single-theme ad groups (STAG) with roughly 6-10 related keywords are the current practitioner consensus.',
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
        name: 'Google Ads Account Structure: The 2026 Setup Guide',
        item: 'https://www.kampaio.com/blog/google-ads-account-structure',
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: The Right Structure in 30 Seconds', level: 1 },
    { id: 'three-layers', title: 'The Three Layers of a Google Ads Account (Account, Campaign, Ad Group)', level: 1 },
    { id: 'dtc-blueprint', title: 'The DTC Blueprint: How Many Campaigns, and Split by What', level: 1 },
    { id: 'ad-groups', title: 'Ad Groups: Why Single-Theme Beats Single-Keyword (SKAG vs STAG)', level: 1 },
    { id: 'naming', title: 'Naming Conventions and Settings That Are Easy to Skip on Day One', level: 1 },
    { id: 'ai-max', title: 'Where AI Max and the Dynamic Search Ads Retirement Fit In (2026)', level: 1 },
    { id: 'not-over-complicate', title: 'When NOT to Over-Complicate the Structure', level: 1 },
    { id: 'audit', title: 'The 5-Minute Audit: Is Your Structure Quietly Wasting Budget?', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'Keep the Structure From Drifting Again', level: 1 },
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
  const listStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px', paddingLeft: '24px' };

  const faqItems = [
    {
      q: 'What is the structure of a Google Ads account?',
      a: (
        <>Three layers: account, campaigns, and ad groups, each holding progressively more specific settings. Ad groups contain the actual keywords, ads, and one landing page apiece.</>
      ),
    },
    {
      q: 'How does a Google Ads account work?',
      a: (
        <>Billing and account-wide settings sit at the account level, budget and targeting sit at the campaign level, and keyword-to-ad-to-landing-page relevance is decided at the ad-group level. See the Three Layers section above for the full breakdown.</>
      ),
    },
    {
      q: 'What is the Google Ads structure for 2026?',
      a: (
        <>Still the same three-layer foundation, but campaigns are increasingly built around AI Max for Search rather than Dynamic Search Ads, whose sunset was pushed to February 2027 in Google&apos;s own June 2026 update.</>
      ),
    },
    {
      q: 'Is $20 a day good for Google Ads?',
      a: (
        <>It&apos;s workable for a single tightly-scoped non-brand campaign in a DTC account, but not enough to run multiple campaign tiers at once. Consolidate into one campaign until spend supports splitting by intent.</>
      ),
    },
    {
      q: 'How many ad groups should be in one Google Ads campaign?',
      a: (
        <>A reasonable starting range is 7-10 ad groups per campaign with 10-20 keywords each, per WordStream&apos;s practitioner guidance. Treat it as one practitioner&apos;s range, not a platform-mandated rule, since other sources land on slightly different numbers.</>
      ),
    },
    {
      q: 'Is SKAG still worth using in 2026?',
      a: (
        <>No. Single-keyword ad groups are a legacy tactic that close-variant matching made obsolete. Single-theme ad groups (STAG) with roughly 6-10 related keywords are the current practitioner consensus.</>
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
          <ArticleHero slug="google-ads-account-structure" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads &middot; Account Structure
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Account Structure: The 2026 Setup Guide (Plus the 5-Minute Audit That Shows If Yours Is Quietly Burning Budget)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Three layers, a DTC campaign blueprint, naming conventions, and where AI Max fits in 2026. Then the six-signal audit that shows whether your current setup is quietly wasting budget.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 29, 2026 &middot; 11 min read</span>
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
            {/* TL;DR */}
            <section id="tldr">
              <h2 style={{ ...h2Style, marginTop: 0 }}>TL;DR: The Right Structure in 30 Seconds</h2>
              <p style={paragraphStyle}>
                A Google Ads account structure has three layers: account, campaign, ad group. For DTC and ecommerce, split campaigns by intent (brand, non-brand category, product feed, remarketing), not by product feature, and group keywords into single-theme ad groups (STAG) instead of single-keyword ad groups (SKAG).
              </p>

              {/* VISUAL 1: KeyTakeaways (structural) : front-loaded answer */}
              <KeyTakeaways
                items={[
                  'Three layers: account (billing, users), campaign (budget, bid strategy, network, geo), ad group (keywords, ads, one landing page).',
                  'Split DTC campaigns by buyer intent: brand, non-brand by category, product feed, remarketing.',
                  'Single-theme ad groups (STAG) beat single-keyword ad groups (SKAG); close-variant matching made SKAG obsolete.',
                  'Under $20K/month, over-segmentation is the more common mistake than under-segmentation.',
                  'Build new accounts around AI Max, not Dynamic Search Ads, whose sunset moved to February 2027.',
                  'Two or more red flags in the six-signal audit below means a rebuild, not a settings tweak.',
                ]}
              />

              <p style={paragraphStyle}>
                The most common leak: money still tied up in campaigns nobody has touched since launch. Run the 5-minute audit near the end of this guide. Most accounts that have gone six-plus months without a structure review are leaking budget in at least one of six predictable spots.
              </p>
            </section>

            {/* Three layers */}
            <section id="three-layers">
              <h2 style={h2Style}>The Three Layers of a Google Ads Account (Account, Campaign, Ad Group)</h2>
              <p style={paragraphStyle}>
                Every Google Ads account is organized into three layers: the account (billing, users, account-wide settings), campaigns (budget, bid strategy, network, targeting), and ad groups (keywords, ads, one landing page each). Google&apos;s own{' '}
                <a href="https://support.google.com/google-ads/answer/1704396?hl=en-GB" style={linkStyle} target="_blank" rel="noopener noreferrer">account-organization documentation</a>{' '}
                defines it the same way: your account carries a unique email, password, and billing information; your campaigns carry their own budget and targeting settings; your ad groups carry a set of similar ads and keywords.
              </p>

              {/* VISUAL 2: SignalStack (structural) : the three layers, ad group highlighted */}
              <SignalStack
                layers={[
                  {
                    title: 'Account',
                    desc: 'Billing, users, account-wide settings. Changes here cascade to everything below, no exceptions.',
                  },
                  {
                    title: 'Campaign',
                    desc: 'Budget, network (Search, Shopping, Display, Performance Max), geo-targeting, bid strategy. None of it crosses into another campaign.',
                  },
                  {
                    title: 'Ad group',
                    desc: 'Keywords, ad copy, one landing page. The tightest layer, and where relevance is won or lost.',
                    highlight: true,
                    badge: 'Tightest',
                  },
                ]}
                caption="The three layers, top to bottom"
              />

              <p style={paragraphStyle}>
                The account level cascades to everything below it. Change the billing method or add a user, and it applies account-wide, no exceptions. The campaign level is where budget, network (Search, Shopping, Display, Performance Max), geo-targeting, and bid strategy live, and none of those settings cross into other campaigns. A budget cap on your brand campaign does nothing to your non-brand campaign next to it.
              </p>
              <p style={paragraphStyle}>
                The ad group level is where relevance gets won or lost. This is where keywords meet ad copy meets landing page, and it is the tightest of the three layers: a single ad group should point to a single, coherent theme and a single landing page. Loose ad-group logic here is the most common source of wasted spend inside an otherwise reasonable account, and it is exactly what the DTC blueprint below is built to prevent. Get this wrong and everything downstream inherits the mess.
              </p>
            </section>

            {/* DTC blueprint */}
            <section id="dtc-blueprint">
              <h2 style={h2Style}>The DTC Blueprint: How Many Campaigns, and Split by What</h2>
              <p style={paragraphStyle}>
                Structure a DTC or ecommerce account by buyer intent, not by product feature: isolate brand, separate non-brand by product category, run Shopping or Performance Max off your product feed, and add remarketing once you have baseline conversion volume.
              </p>

              {/* VISUAL 3: ResponsiveTable : extractable asset #1, the campaign-tier blueprint */}
              <ResponsiveTable
                headers={['Campaign tier', "What's inside", 'Starting bid strategy', 'Primary goal']}
                rows={[
                  [
                    'Brand Search',
                    'Exact and phrase match on brand terms',
                    'Maximize Conversions, low budget',
                    'Defend cheap, high-converting traffic',
                  ],
                  [
                    'Non-Brand Search (by category)',
                    'Category terms grouped by product line, not by feature',
                    'Maximize Conversions until 30 conversions/30 days, then Target ROAS',
                    'New customer acquisition',
                  ],
                  [
                    'Shopping / Performance Max',
                    'Product-feed-driven, all SKUs or grouped by margin tier',
                    'Maximize Conversion Value / Target ROAS once feed data is clean',
                    'Revenue-efficient scale',
                  ],
                  [
                    'Remarketing / Demand Gen',
                    'Site visitors, cart abandoners, past customers',
                    'Maximize Conversion Value',
                    'Recover near-converters, protect CAC',
                  ],
                ]}
              />
              <p style={captionStyle}>DTC/ecommerce campaign tiers, split by buyer intent, not by product feature.</p>

              <p style={paragraphStyle}>
                Splitting by feature instead of intent fragments conversion volume across too many small campaigns, and Smart Bidding needs a meaningful volume of conversions per bid strategy to exit Learning Limited and start optimizing well. Four campaigns each getting steady volume beat twelve campaigns each starving for data. It&apos;s a trade worth making even when the twelve-campaign version feels more organized on paper.
              </p>

              <MascotQuote mascot="buzz">
                On a $12K/month DTC account (illustrative), I start non-brand category campaigns on Maximize Conversions and only switch to Target ROAS once a campaign clears 30 conversions in a 30-day window. Accounts that jump to tROAS at 8-10 conversions sit in Learning Limited for 3+ weeks, and CPA runs 15-25% hot the whole time they&apos;re stuck there.
              </MascotQuote>
            </section>

            {/* Ad groups */}
            <section id="ad-groups">
              <h2 style={h2Style}>Ad Groups: Why Single-Theme Beats Single-Keyword (SKAG vs STAG)</h2>
              <p style={paragraphStyle}>
                Use single-theme ad groups (STAG), grouping tightly related keywords per ad group. Single-keyword ad groups (SKAG) are a legacy tactic that Google&apos;s close-variant match changes made obsolete.
              </p>
              <p style={paragraphStyle}>
                SKAG worked when match types were strict: one keyword, one ad group, total control over which query triggered which ad. Once close-variant matching expanded what a single keyword could trigger, that control collapsed, and SKAG structures started fragmenting Smart Bidding signal across far too many campaigns instead of concentrating it. Practitioners on r/PPC and r/adwords describe the same shift: SKAGs are called out as outdated and over-segmenting data that performs better grouped together, with STAG (single theme ad groups combining keywords around one intent) named as the replacement. SKAG isn&apos;t wrong so much as it&apos;s arguing with a platform that moved on without it.
              </p>
              <p style={paragraphStyle}>
                Attributed ranges vary by source and shouldn&apos;t be treated as platform rule. WordStream&apos;s own guidance (Margot Whitney, updated April 2026) puts it at roughly 7-10 ad groups per campaign with 10-20 keywords in each. LeadsBridge recommends a narrower 5-15 keywords per group. HawkSEM&apos;s Sam Yadegar, on the same point, describes staying between 5 and 20 keywords under one topic per ad group.
              </p>
              <p style={paragraphStyle}>
                Treat these as a workable starting range, not a hard limit, and note that tighter ad-group relevance is also one of the clearest levers on Quality Score, covered in full in our{' '}
                <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score guide</a>.
              </p>
            </section>

            {/* Naming */}
            <section id="naming">
              <h2 style={h2Style}>Naming Conventions and Settings That Are Easy to Skip on Day One</h2>
              <p style={paragraphStyle}>
                Pick a naming pattern before you create the first campaign, and lock down account-level settings (<a href="/blog/google-ads-conversion-tracking-not-working" style={{ color: '#764ba2', textDecoration: 'underline' }}>conversion tracking</a>, negative keyword lists, auto-tagging) before you touch bid strategy.
              </p>
              <p style={paragraphStyle}>
                A pattern that scales past month six: <code style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '2px 8px', fontSize: '16px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#1e293b' }}>[Network]_[Intent]_[GEO]_[Theme]</code>.
              </p>
              <pre
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  overflowX: 'auto',
                  fontSize: '15px',
                  lineHeight: 1.9,
                  color: '#1e293b',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  margin: '0 0 32px',
                }}
              >
{`Search_Brand_US_Core
Search_NonBrand_US_Category
PMax_US_ProductFeed
DemandGen_US_Remarketing`}
              </pre>
              <p style={paragraphStyle}>
                Before the first campaign goes live, lock down: conversion tracking (enhanced conversions on), an account-level negative keyword list, auto-tagging for GCLID, and the correct time zone (it affects scheduling and reporting downstream). Settings left on default from day one is one of the six red flags in the audit below, and it is the easiest one to fix before it ever becomes a problem.
              </p>
            </section>

            {/* AI Max */}
            <section id="ai-max">
              <h2 style={h2Style}>Where AI Max and the Dynamic Search Ads Retirement Fit In (2026)</h2>
              <p style={paragraphStyle}>
                As of 2026, Dynamic Search Ads are being retired on a delayed timeline: Google&apos;s own{' '}
                <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">DSA-to-AI-Max announcement</a>, originally published April 15, 2026, was updated June 11, 2026 to push the DSA-specific sunset and auto-migration to February 2027. Campaigns using Automatically Created Assets and campaign-level broad match stay on the original schedule and auto-upgrade starting September 2026. Build new accounts around AI Max, not DSA, from the start.
              </p>

              {/* VISUAL 4 (BOLD): BigStat : Google's own AI Max figure, with the full qualifier chain in the source line */}
              <BigStat
                value="14%"
                label="Google's stated uplift"
                claim="more conversions or conversion value at a similar CPA/ROAS for advertisers that activate AI Max in Search campaigns."
                source="Source: Google Ads Help, About AI Max (support.google.com/google-ads/answer/15910366). Google internal data, 2025, explicitly scoped to non-Retail advertisers."
              />

              <p style={paragraphStyle}>
                AI Max for Search campaigns expands search-term matching, customizes headlines and descriptions automatically, and can expand the final URL beyond what you set.{' '}
                <a href="https://support.google.com/google-ads/answer/15910366?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google&apos;s own stated figure</a>: advertisers that activate AI Max in Search campaigns will typically see 14% more conversions or conversion value at a similar CPA/ROAS, based on Google&apos;s internal data from 2025, and that figure is explicitly scoped to non-Retail advertisers.
              </p>

              {/* VISUAL 5: Callout (structural) : the non-Retail caveat, load-bearing */}
              <Callout variant="warning" title="The 14% probably does not describe your account">
                A DTC or ecommerce account plausibly counts as Retail by Google&apos;s own classification, and Google&apos;s 14% figure is explicitly scoped to non-Retail advertisers. Treat it as a directional signal for your account, not a guaranteed number.
              </Callout>

              <p style={paragraphStyle}>
                Broader match expansion under AI Max raises the stakes on negative keywords, not lowers them; see our{' '}
                <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keyword methodology</a>{' '}
                for how to keep that discipline tight. For the full decision on whether and how to turn AI Max on, that&apos;s covered end to end in our{' '}
                <a href="/blog/google-ads-ai-max" style={linkStyle}>AI Max decision guide</a>; this section is only about where it fits into the structure you&apos;re building.
              </p>
            </section>

            {/* When not to over-complicate */}
            <section id="not-over-complicate">
              <h2 style={h2Style}>When NOT to Over-Complicate the Structure</h2>
              <p style={paragraphStyle}>
                The more common mistake in DTC accounts under $20K/month is over-segmentation, not under-segmentation. If a campaign can&apos;t sustain roughly 30 conversions per 30 days, it&apos;s starving its own bid strategy. We&apos;d rather see three campaigns pulling real weight than eight competing for the same trickle of conversions.
              </p>
              <p style={paragraphStyle}>Three anti-patterns worth avoiding on day one:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Splitting by device or geo when there&apos;s no real budget or bid difference to justify it</li>
                <li style={{ marginBottom: '12px' }}>A separate campaign per SKU when a category-level campaign would do the same job with more data</li>
                <li>Rebuilding SKAGs &quot;for control&quot; after already reading that STAG is the current standard</li>
              </ul>
              <p style={paragraphStyle}>
                If the account has already grown past this point and structure is genuinely tangled, that&apos;s a rebuild job, not a settings tweak. Our{' '}
                <a href="/blog/google-ads-account-restructure" style={linkStyle}>4-phase restructure playbook</a>{' '}
                covers that in full.
              </p>
            </section>

            {/* Audit */}
            <section id="audit">
              <h2 style={h2Style}>The 5-Minute Audit: Is Your Structure Quietly Wasting Budget?</h2>
              <p style={paragraphStyle}>
                Run these six checks against your account. Two or more red flags mean the structure is actively costing you money, not just imperfect.
              </p>

              {/* VISUAL 6: ResponsiveTable : extractable asset #2, the six-signal audit */}
              <ResponsiveTable
                headers={['Signal', 'Threshold', 'What it means']}
                rows={[
                  [
                    'Mixed campaign types in one campaign',
                    'Search, Shopping, and Display logic blended in a single campaign',
                    "Bid strategy can't optimize toward one goal, signal gets averaged",
                  ],
                  [
                    'Broad match with no Smart Bidding pairing',
                    'Broad match keywords running on manual CPC or first-click bidding',
                    'No automated signal controlling where broad match spends',
                  ],
                  [
                    'Orphan campaigns',
                    'Under $300/month spend, 0 conversions in 60+ days',
                    'Dead budget nobody is watching',
                  ],
                  [
                    'Single campaign-type dependency',
                    '100% of spend on one campaign type, e.g. Performance Max only, no Search baseline',
                    'No feedback signal for the automated campaign to learn from',
                  ],
                  [
                    'Untouched defaults',
                    'Conversion tracking, negative keyword lists, or bid strategy unchanged since account creation',
                    'Structure was never intentional in the first place',
                  ],
                  [
                    'Legacy DSA still active',
                    'Dynamic Search Ads campaigns running with no AI Max migration plan',
                    'Campaign type is being phased out starting February 2027',
                  ],
                ]}
              />
              <p style={captionStyle}>Run these six checks against your account; two or more flags mean a rebuild, not a settings tweak.</p>

              <p style={paragraphStyle}>
                Two of these show up in public accounts, not just in theory.{' '}
                <a href="https://x.com/noahiglerSEO/status/2026382901273637035" style={linkStyle} target="_blank" rel="noopener noreferrer">Noah Igler</a>{' '}
                (X, February 2026) describes taking over Google Ads for a plumbing company that was only running Performance Max, no Search baseline at all, a direct real-world match for the single-campaign-type flag above.{' '}
                <a href="https://x.com/rafayetrahmxn/status/1911781616357191871" style={linkStyle} target="_blank" rel="noopener noreferrer">Raf Rahman</a>{' '}
                (X, April 2025) makes the same point about accounts still sitting on default settings, capping their own growth before anyone even looks at bid strategy.
              </p>

              <p style={paragraphStyle}>
                Separately, one practitioner&apos;s take on the scale of the problem:
              </p>

              {/* VISUAL 7: Pullquote (structural) : framed explicitly as one practitioner's estimate */}
              <Pullquote cite="Jackson Blackledge (X, April 2026). One practitioner's stated estimate, not a controlled study.">
                The majority of brands are burning 20-30% of their budget on these totally fixable mistakes.
              </Pullquote>

              <p style={paragraphStyle}>
                <a href="https://x.com/blvckledge/status/2046801966680928454" style={linkStyle} target="_blank" rel="noopener noreferrer">Jackson Blackledge</a>{' '}
                (X, April 2026) put it that way himself. That&apos;s one person&apos;s stated estimate, not a controlled study, but it lines up with the pattern in the table above.
              </p>

              <MascotQuote mascot="vox">
                Across the accounts I&apos;ve audited (illustrative figures), campaigns spending under $300 a month with zero conversions in the last 60 days average about 9% of total account budget. I flag it in week one, and most owners are stunned it&apos;s been sitting there for months doing nothing.
              </MascotQuote>

              <p style={paragraphStyle}>
                If two or more of these flags apply, this isn&apos;t a settings tweak, it&apos;s a rebuild. The full 4-phase playbook for that is here: our{' '}
                <a href="/blog/google-ads-account-restructure" style={linkStyle}>account restructure guide</a>. We won&apos;t re-walk that playbook in this article, that&apos;s what it&apos;s for.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i === faqItems.length - 1 ? 0 : '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{item.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Keep the Structure From Drifting Again</h2>
              <p style={paragraphStyle}>
                A correct structure at launch decays the same way a messy one does. Budget shifts between tiers, a category campaign quietly starves, defaults get left untouched again six months later. Vox watches cross-campaign budget allocation and flags dead spend before it sits for months. Buzz manages the bid-strategy transitions, from Maximize Conversions to Target ROAS, as each tier earns enough volume to make that switch worth it.
              </p>
              <p style={paragraphStyle}>
                The human decides the strategy. The agents keep the structure honest week to week, so the audit above doesn&apos;t need to become a quarterly ritual. If your structure is already solid and you&apos;re thinking about scale instead, our{' '}
                <a href="/blog/how-to-scale-google-ads-without-losing-roas" style={linkStyle}>budget-scaling playbook</a>{' '}
                picks up from here.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Want the structure watched for you?
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  See <a href="/pricing" style={linkStyle}>pricing</a> for how Buzz and Vox fit into your account.
                </p>
                <a
                  href="/pricing"
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
                  See pricing
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                Sources:{' '}
                <a href="https://support.google.com/google-ads/answer/1704396?hl=en-GB" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Organize your account (2026)</a>;{' '}
                <a href="https://support.google.com/google-ads/answer/15910366?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About AI Max for Search (2026)</a>;{' '}
                <a href="https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/" style={linkStyle} target="_blank" rel="noopener noreferrer">blog.google, DSA to AI Max upgrade (published April 15, 2026, updated June 11, 2026)</a>;{' '}
                <a href="https://x.com/noahiglerSEO/status/2026382901273637035" style={linkStyle} target="_blank" rel="noopener noreferrer">Noah Igler (X, February 2026)</a>;{' '}
                <a href="https://x.com/rafayetrahmxn/status/1911781616357191871" style={linkStyle} target="_blank" rel="noopener noreferrer">Raf Rahman (X, April 2025)</a>;{' '}
                <a href="https://x.com/blvckledge/status/2046801966680928454" style={linkStyle} target="_blank" rel="noopener noreferrer">Jackson Blackledge (X, April 2026)</a>. Ad-group range guidance attributed to WordStream (Margot Whitney, updated April 2026), LeadsBridge, and HawkSEM (Sam Yadegar). Google&apos;s 14% figure is Google&apos;s own internal data, self-reported and not independently audited. Mascot figures are illustrative. This article is informational and does not constitute financial or business advice.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-account-structure" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
