'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { KeyTakeaways, HubSpokes, DonutStat } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/b2b-saas-google-ads-campaign-structure#article',
    headline: 'B2B SaaS Google Ads Campaign Structure: The Account Blueprint (2026)',
    description: 'How to structure a B2B SaaS Google Ads account from scratch: segment campaigns by intent and funnel stage, isolate brand and competitor traffic, name for scale, and add Performance Max only after Search has a feedback loop.',
    image: 'https://www.kampaio.com/og/b2b-saas-google-ads-campaign-structure.png',
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
    datePublished: '2026-06-16T00:00:00.000Z',
    dateModified: '2026-06-16T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/b2b-saas-google-ads-campaign-structure',
    },
    keywords: 'b2b saas google ads campaign structure, google ads account structure, intent based campaign structure, b2b ppc campaign tiers, google ads naming conventions, performance max b2b saas, smart bidding conversion threshold',
    inLanguage: 'en',
    "wordCount": 2090,
    "articleSection": "B2B Marketing"
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'B2B SaaS Google Ads Campaign Structure', item: 'https://www.kampaio.com/blog/b2b-saas-google-ads-campaign-structure' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many campaigns should a B2B SaaS Google Ads account have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Typically four to six at launch: brand search, competitor search, high-intent non-brand, problem-aware, and Performance Max added later. Add more only when a segment demonstrates sufficient conversion volume (roughly 30 conversions per 30 days per Google Smart Bidding guidance) and a distinct intent to warrant its own bidding target.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should B2B SaaS separate branded and non-branded campaigns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, always. Branded traffic is cheap and high-converting. Mixing it with non-brand prospecting inflates blended metrics and hides whether prospecting works. You cannot diagnose a weak high-intent campaign if brand traffic is masking its CPL.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I use Performance Max for B2B SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but not first. PMax needs a conversion feedback loop with qualified-lead values to optimize toward pipeline. Launch it after Search tiers are converting and offline conversion data is flowing back. Without that signal it optimizes toward junk.',
        },
      },
      {
        '@type': 'Question',
        name: "What's the best ad group structure for B2B SaaS?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Single-theme ad groups (STAGs): one tight keyword theme per ad group with one to two RSAs. SKAGs are obsolete after Google\'s close-variant changes and create maintenance overhead without better results.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I name Google Ads campaigns for a B2B SaaS account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a parseable pattern: Network_Intent_GEO_Theme. Examples: Search_NonBrand_US_CategoryTerms, Search_Brand_US_Core. This keeps reporting filterable, enables automated rules, and makes the account self-describing on handoff.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should trial and demo conversions be in separate campaigns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'At minimum, assign them separate conversion actions with distinct values so Smart Bidding can distinguish them. Self-serve trial and sales-led demo have different CAC and pipeline value. Separate campaigns if each path has enough volume for its own bidding target.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - The B2B SaaS Account Blueprint', level: 1 },
    { id: 'why-different', title: 'Why B2B SaaS Needs a Different Structure Than E-commerce', level: 1 },
    { id: 'five-tier', title: 'The Five-Tier Campaign Structure (With Example Layout)', level: 1 },
    { id: 'how-to-split', title: 'How to Split Campaigns: Intent and Funnel Stage, Not Product Feature', level: 1 },
    { id: 'naming', title: 'Naming Conventions That Survive Scale', level: 1 },
    { id: 'when-pmax', title: 'When to Add Performance Max (And When Not To)', level: 1 },
    { id: 'when-not-segment', title: 'When NOT to Segment (Avoiding Over-Engineering)', level: 1 },
    { id: 'after-structure', title: 'After the Structure: Conversion Tracking and Lead Quality', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'How Kampaio Maintains the Structure', level: 1 },
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
  const thStyle = { padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#1e293b', fontSize: '14px', verticalAlign: 'top' } as const;
  const tdStyle = { padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontSize: '14px', lineHeight: '1.55', verticalAlign: 'top' } as const;
  const codeBlockStyle = { background: '#0f172a', color: '#e2e8f0', borderRadius: '12px', padding: '20px 24px', fontSize: '14px', lineHeight: '1.7', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace', overflowX: 'auto', marginBottom: '32px' } as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="b2b-saas-google-ads-campaign-structure" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              B2B Marketing · Account Structure
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              B2B SaaS Google Ads Campaign Structure: The Account Blueprint (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Structure a <a href="/blog/google-ads-for-b2b-saas" style={linkStyle}>B2B SaaS</a> account by intent and funnel stage, not product feature: five campaign tiers, each with its own budget and bid <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>, with Performance Max added only once Search has a working feedback loop.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 16, 2026 · 11 min read</span>
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
                Structure a B2B SaaS Google Ads account by intent and funnel stage, not by product feature. The skeleton is five campaign tiers: brand search, competitor search, high-intent non-brand search, problem-aware search, and Performance Max added only after Search tiers have a working conversion feedback loop. Each tier runs its own budget and bid strategy.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR - The B2B SaaS Account Blueprint</h2>
              <p style={pStyle}>
                Five intent tiers, each with its own campaign, budget, and bid strategy:
              </p>

              {/* VISUAL 1: KeyTakeaways (structural) - the five tiers at a glance */}
              <KeyTakeaways
                items={[
                  'Branded Search: defend your brand SERP with exact and phrase match. High conversion rate, low CPCs. Isolated.',
                  'Competitor / Conquesting Search: hard budget cap from day one. Competitor CPCs run two to three times higher than non-brand.',
                  'High-intent non-brand Search: category terms ("pipeline management software"). Primary demand-capture tier. Most non-brand budget lives here.',
                  'Problem-aware Search: pain-point queries ("how to improve sales forecast accuracy"). Looser intent, heavy negatives required.',
                  'Performance Max (later): only after Search is converting and offline conversion values are feeding back.',
                ]}
              />

              <p style={pStyle}>
                Each tier runs its own budget and bid strategy so performance reads by intent, not as an averaged blur across the account.
              </p>
            </section>

            {/* Why different */}
            <section id="why-different">
              <h2 style={h2Style}>Why B2B SaaS Needs a Different Structure Than E-commerce</h2>
              <p style={pStyle}>
                B2B SaaS breaks the standard e-commerce campaign blueprint because conversion volume per keyword is low, the sales cycle is long, and a single query can hide several buying-committee personas.
              </p>
              <p style={pStyle}>
                If you are still weighing whether Google Ads is the right channel before building the structure at all, that decision belongs upstream - we cover it in <a href="/blog/is-google-ads-worth-it-for-b2b-saas" style={linkStyle}>Is Google Ads Worth It for B2B SaaS?</a>.
              </p>
              <p style={pStyle}>
                Three structural realities separate B2B SaaS from e-commerce, and each one shapes a specific architectural choice:
              </p>
              <p style={pStyle}>
                <strong>Low conversion volume per keyword.</strong> A B2B SaaS category term may produce five to fifteen demo requests a month. That is not a traffic problem - it is a volume problem that makes over-segmentation lethal to Smart Bidding. Both practitioners and Google&apos;s own Smart Bidding documentation point to 30 or more conversions in a 30-day window as the readiness threshold for Target CPA and Target ROAS (<a href="https://support.google.com/google-ads/answer/7066642" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Smart Bidding</a>). factors.ai puts the floor at 30+; farsiight&apos;s practitioner range is 15-30 (<a href="https://www.factors.ai/blog/google-ads-b2b-saas-playbook" style={linkStyle} target="_blank" rel="noopener noreferrer">factors.ai B2B SaaS Playbook</a>). Fragment your conversions across ten campaigns and none of them will ever exit learning.
              </p>
              <p style={pStyle}>
                <strong>Brand masking real prospecting performance.</strong> Branded campaigns convert at higher rates and lower CPLs than non-brand. That is fine in isolation. Blended, it is a diagnosis problem: the account looks healthy while your high-intent prospecting quietly fails. Keep branded and non-branded campaigns separate, or branded terms mask poor performance elsewhere (<a href="https://www.factors.ai/blog/google-ads-b2b-saas-playbook" style={linkStyle} target="_blank" rel="noopener noreferrer">factors.ai</a>).
              </p>
              <p style={pStyle}>
                <strong>One query, many personas.</strong> &quot;CRM software&quot; attracts buyers, researchers, students, and freelancers. Intent-based tiers let you bid higher where query patterns signal genuine commercial intent and pull back where they do not. Product-feature segments do not solve this; intent segments do.
              </p>
            </section>

            {/* Five-tier */}
            <section id="five-tier">
              <h2 style={h2Style}>The Five-Tier Campaign Structure (With Example Layout)</h2>
              <p style={pStyle}>
                Segment the account into five intent tiers. Each tier is a campaign (or a small set), with its own budget, bid strategy, and conversion focus.
              </p>

              {/* VISUAL 2 (bold-viz): HubSpokes - five intent tiers radiating from the account */}
              <HubSpokes
                hub="B2B SaaS account"
                spokes={['Brand Search', 'Competitor Search', 'High-intent non-brand', 'Problem-aware Search', 'Performance Max (later)']}
                caption="Five intent tiers, each with its own budget and bid strategy"
              />

              {/* VISUAL 3 (centerpiece): the five-tier comparison table */}
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', minWidth: '720px', borderCollapse: 'collapse', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={thStyle}>Campaign Tier</th>
                      <th style={thStyle}>What&apos;s Inside</th>
                      <th style={thStyle}>Bid Strategy (Start)</th>
                      <th style={thStyle}>Primary Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>Brand Search</td>
                      <td style={tdStyle}>Exact + phrase on brand terms</td>
                      <td style={tdStyle}>Maximize Conversions or manual, low ceiling</td>
                      <td style={tdStyle}>Demo / trial (high rate)</td>
                    </tr>
                    <tr style={{ background: '#fafbfc' }}>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>Competitor Search</td>
                      <td style={tdStyle}>Conquesting terms, capped budget</td>
                      <td style={tdStyle}>Target CPA (loose) or Maximize Conversions</td>
                      <td style={tdStyle}>Demo request</td>
                    </tr>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>High-intent non-brand</td>
                      <td style={tdStyle}>Category terms: &quot;X software,&quot; &quot;X platform,&quot; &quot;X tool&quot;</td>
                      <td style={tdStyle}>Maximize Conversions, then Maximize Conversion Value once data exists</td>
                      <td style={tdStyle}>Demo + trial</td>
                    </tr>
                    <tr style={{ background: '#fafbfc' }}>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>Problem-aware Search</td>
                      <td style={tdStyle}>Pain-point queries, heavy negatives</td>
                      <td style={tdStyle}>Maximize Conversions, tight daily cap</td>
                      <td style={tdStyle}>Trial / lead magnet</td>
                    </tr>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>Performance Max (later)</td>
                      <td style={tdStyle}>After Search feedback loop is live</td>
                      <td style={tdStyle}>Maximize Conversion Value with Target ROAS</td>
                      <td style={tdStyle}>Pipeline-valued conversion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={pStyle}>Here is what each tier protects:</p>
              <p style={pStyle}>
                <strong>Brand Search</strong> keeps cheap, high-converting traffic isolated. Without isolation, its strong metrics inflate the account-wide score and conceal whether prospecting is working. <strong>Competitor Search</strong> gets a hard daily budget cap from day one - without it, a CPC spike on competitor terms eats the budget you allocated to high-intent category keywords. This happens more often than you would expect.
              </p>
              <p style={pStyle}>
                <strong>High-intent non-brand</strong> is the primary demand-capture tier. Category terms signal active category evaluation and rarely trigger AI Overviews, so paid placements face less cannibalization than on informational queries. <strong>Problem-aware Search</strong> covers pain-point queries with lower demo rates. Heavy negative keyword filtering is mandatory; keep the daily cap tight until qualified-lead cost data justifies loosening it.
              </p>
              <p style={pStyle}>
                <strong>Performance Max</strong> earns its slot after Search is converting with offline conversion values flowing back. Practitioner consensus is consistent: high-intent Search first, PMax only once the account has clean pipeline data (<a href="https://www.farsiight.com/resources/google-ads-for-saas/" style={linkStyle} target="_blank" rel="noopener noreferrer">farsiight, Google Ads for SaaS</a>).
              </p>

              {/* VISUAL 4: MascotQuote (Sage) - illustrative clustering result */}
              <MascotQuote mascot="sage">
                On a mid-market SaaS account running $32K/month (illustrative), I clustered 240 search terms into four intent tiers before launch. Category terms like &quot;pipeline management software&quot; drove a 4.1% demo request rate. Problem-aware queries like &quot;how to forecast sales pipeline&quot; drove 0.9%. Running them in one campaign hid that gap for two months. After the split, the high-intent tier had enough signal volume for its own Target CPA target within six weeks.
              </MascotQuote>

              {/* VISUAL 5 (bold-viz): DonutStat - the demo-rate gap Sage describes */}
              <DonutStat
                items={[
                  { percent: 4.1, label: 'demo request rate on high-intent category terms ("pipeline management software")' },
                  { percent: 0.9, label: 'demo request rate on problem-aware queries ("how to forecast sales pipeline")' },
                ]}
                source="Source: Kampaio mid-market SaaS account, illustrative figures"
              />
            </section>

            {/* How to split */}
            <section id="how-to-split">
              <h2 style={h2Style}>How to Split Campaigns: Intent and Funnel Stage, Not Product Feature</h2>
              <p style={pStyle}>
                Split by what the searcher wants and where they are in the buying process, not by which product feature the keyword names. Feature-based splits fragment low volume and break <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>Smart Bidding</a>.
              </p>
              <p style={pStyle}>
                The five intent tiers are the primary segmentation axis. Secondary splits are valid only when volume supports them - and in B2B SaaS, that threshold comes later than most people expect:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Geography:</strong> separate campaigns if you run US and EMEA with meaningfully different budgets and landing pages. Not if the only difference is a currency symbol.</li>
                <li style={{ marginBottom: '16px' }}><strong>Language:</strong> always separate campaigns. Never ad-group-level language targeting.</li>
                <li style={{ marginBottom: 0 }}><strong>Trial vs. demo conversion path:</strong> the B2B SaaS-specific decision generic guides overlook. Self-serve trial (PLG) and sales-led demo have different CAC and pipeline value. At minimum, assign them separate conversion actions with distinct values. Separate campaigns if each path has enough volume for its own bidding target. Blended bidding misallocates budget because the algorithm cannot distinguish which type of lead matters more.</li>
              </ul>
              <p style={pStyle}>
                <strong>Ad group granularity.</strong> Single-theme ad groups (STAGs): one tight keyword theme per ad group, one to two RSAs. SKAGs are obsolete after Google&apos;s close-variant changes. Below $5,000/campaign/month, factors.ai recommends two to five ad groups maximum. Persona splits only make sense when messaging genuinely differs across landing pages; otherwise consolidate with variant RSA headlines.
              </p>
            </section>

            {/* Naming */}
            <section id="naming">
              <h2 style={h2Style}>Naming Conventions That Survive Scale</h2>
              <p style={pStyle}>
                Use a consistent, parseable naming pattern from day one. Naming conventions are the cheapest scalability lever in Google Ads and the first thing that rots as an account grows. Spend fifteen minutes on this now to avoid two hours of confusion when a second person inherits the account.
              </p>
              <p style={pStyle}>The pattern:</p>
              <pre style={codeBlockStyle}><code>[Network]_[Intent]_[GEO]_[Theme]</code></pre>
              <p style={pStyle}>Examples:</p>
              <pre style={codeBlockStyle}><code>{`Search_Brand_US_Core
Search_NonBrand_US_CategoryTerms
Search_NonBrand_US_ProblemAware
Search_Competitor_US_Conquest
PMax_AllGeo_PipelineValue`}</code></pre>
              <p style={pStyle}>
                Why this pattern survives handoffs: it is filterable in any reporting tool (filter by <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '15px' }}>NonBrand</code> or <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '15px' }}>Competitor</code> instantly), it enables clean automated rules without manual campaign selection, and it is self-describing when someone else inherits the account six months from now.
              </p>
              <p style={pStyle}>
                Labels add a complementary layer - tag campaigns by funnel stage (TOFU, MOFU, BOFU) for cross-campaign reports that cut across intent tiers. One thing to avoid: shared budgets between tiers with different intent levels. A high-spend tier will cannibalize a lower-volume tier that needs its own floor to stay in learning.
              </p>
            </section>

            {/* When PMax */}
            <section id="when-pmax">
              <h2 style={h2Style}>When to Add Performance Max (And When Not To)</h2>
              <p style={pStyle}>
                Add Performance Max only after Search campaigns have a working conversion feedback loop with qualified-lead values attached. PMax launched first in B2B burns budget on low-intent placements because the algorithm has nothing useful to optimize toward.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px' }}>Prerequisites before switching PMax on:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>All four Search tiers are live and converting</strong> - at least four to six weeks of data at adequate spend.</li>
                <li style={{ marginBottom: '16px' }}><strong>Offline conversion imports or qualified-lead values are feeding back</strong> - CRM-imported MQL, SQL, Opportunity, and Closed Won as separate conversion events with distinct values. PMax optimizing toward raw form fills will optimize toward junk.</li>
                <li style={{ marginBottom: '16px' }}><strong>30 or more conversions in the past 30 days</strong> are available to feed the campaign (practitioner consensus from farsiight and factors.ai; see <a href="https://support.google.com/google-ads/answer/7066642" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Smart Bidding documentation</a> for the underlying bidding threshold).</li>
                <li style={{ marginBottom: 0 }}><strong>Brand exclusions and <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keyword lists</a> are prepared</strong> - PMax has limited negative keyword functionality. Without brand exclusions it cannibalizes branded Search volume.</li>
              </ol>
              <p style={pStyle}>
                PMax does not expose keyword-level or placement-level performance the way Search does. In low-volume B2B accounts, that opacity is a genuine cost. For accounts where PMax is already live without a feedback loop, the diagnostic is in <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>Performance Max Problems in B2B Marketing</a> and <a href="/blog/performance-max-not-converting" style={linkStyle}>Why Performance Max Is Not Converting</a>.
              </p>

              {/* VISUAL 6: MascotQuote (Vox) - illustrative PMax sequencing result */}
              <MascotQuote mascot="vox">
                On a $45K/month B2B SaaS account (illustrative figures), the operator wanted PMax on day one. Search had zero offline conversion imports and the only conversion action was a raw form fill with no value assigned. I held PMax until Search hit 38 qualified conversions in a 30-day window with OCI feeding SQL values back. Then I gave PMax 18% of budget, fed it pipeline value, and enforced brand exclusions from day one. CPL settled at $190 vs $610 when we had tested it cold three months earlier without the feedback loop.
              </MascotQuote>
            </section>

            {/* When NOT to segment */}
            <section id="when-not-segment">
              <h2 style={h2Style}>When NOT to Segment (Avoiding Over-Engineering)</h2>
              <p style={pStyle}>
                In low-volume B2B, over-segmentation is the more common failure than under-segmentation. This section exists because most campaign structure advice pushes you toward more segmentation, not less - and in B2B SaaS that advice can wreck your Smart Bidding.
              </p>
              <p style={pStyle}>
                If a campaign cannot sustain roughly 30 conversions per 30 days, consolidating it produces better outcomes than running it in isolation.
              </p>
              <p style={pStyle}>Three over-engineering patterns worth naming:</p>
              <p style={pStyle}>
                <strong>Ten campaigns each with three to five conversions per month.</strong> Smart Bidding never exits learning for any of them. The symptom is a constant <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>&quot;Limited (Learning)&quot;</a> status across the account. Fix: collapse the lowest-volume tiers into one consolidated campaign until each proves sufficient volume on its own.
              </p>
              <p style={pStyle}>
                <strong>SKAGs or per-feature ad groups fragmenting one theme.</strong> Splitting &quot;sales CRM,&quot; &quot;sales CRM software,&quot; and &quot;CRM for sales teams&quot; into separate ad groups creates buckets too small to generate useful conversion data. Fix: one tight-theme STAG with RSA headlines covering the variations.
              </p>
              <p style={pStyle}>
                <strong>Geo splits with no budget or message difference.</strong> An identical offer and landing page across regions means two under-powered campaigns instead of one that learns twice as fast. Fix: one campaign with location bid adjustments.
              </p>
              <p style={pStyle}>
                Start consolidated. Split only when a segment has both enough volume for its own bidding AND a distinct enough intent that the split produces measurably different optimal bids. If the account is already a tangled mess rather than a clean build, start with the teardown sequence in <a href="/blog/google-ads-account-restructure" style={linkStyle}>Google Ads Account Restructure</a>.
              </p>
            </section>

            {/* After structure */}
            <section id="after-structure">
              <h2 style={h2Style}>After the Structure: Conversion Tracking and Lead Quality</h2>
              <p style={pStyle}>
                A clean campaign structure only pays off if the conversions feeding it are real. The next layer is qualified-lead feedback, not raw form fills.
              </p>
              <p style={pStyle}>
                Structure tells Google where to bid. Conversion values tell it which leads to optimize toward. An account with a clean five-tier structure but raw form-fill conversions will optimize toward whatever fills the form fastest - including junk. The skeleton matters. What you feed it matters more.
              </p>
              <p style={pStyle}>
                Once the skeleton is in place, the next move is teaching Google which leads are real. We cover offline conversion imports, lead scoring, and value-based bidding in <a href="/blog/b2b-google-ads-low-quality-leads" style={linkStyle}>B2B Google Ads: Low Quality Leads</a>. For CPL and conversion rate baselines once the structure is running, see <a href="/blog/b2b-saas-google-ads-benchmarks-2026" style={linkStyle}>B2B SaaS Google Ads Benchmarks 2026</a>.
              </p>
              <p style={{ fontSize: '15px', color: '#64748b', fontStyle: 'italic', marginBottom: '32px' }}>
                This article is informational and does not constitute professional advertising advice. Budget splits and CPL figures are illustrative and should be calibrated to your account data.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How many campaigns should a B2B SaaS Google Ads account have?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Typically four to six at launch: brand search, competitor search, high-intent non-brand, problem-aware, and Performance Max added later. Add more only when a segment demonstrates sufficient conversion volume (roughly 30 conversions per 30 days per <a href="https://support.google.com/google-ads/answer/7066642" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Smart Bidding guidance</a>) and a distinct intent to warrant its own bidding target.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Should B2B SaaS separate branded and non-branded campaigns?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Yes, always. Branded traffic is cheap and high-converting. Mixing it with non-brand prospecting inflates blended metrics and hides whether prospecting works. You cannot diagnose a weak high-intent campaign if brand traffic is masking its CPL.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Should I use Performance Max for B2B SaaS?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Yes, but not first. PMax needs a conversion feedback loop with qualified-lead values to optimize toward pipeline. Launch it after Search tiers are converting and offline conversion data is flowing back. Without that signal it optimizes toward junk.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>What&apos;s the best ad group structure for B2B SaaS?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Single-theme ad groups (STAGs): one tight keyword theme per ad group with one to two RSAs. SKAGs are obsolete after Google&apos;s close-variant changes and create maintenance overhead without better results.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How should I name Google Ads campaigns for a B2B SaaS account?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Use a parseable pattern: <code style={{ background: '#eef2ff', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '15px' }}>Network_Intent_GEO_Theme</code>. Examples: <code style={{ background: '#eef2ff', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '15px' }}>Search_NonBrand_US_CategoryTerms</code>, <code style={{ background: '#eef2ff', padding: '2px 6px', borderRadius: '4px', fontFamily: 'ui-monospace, monospace', fontSize: '15px' }}>Search_Brand_US_Core</code>. This keeps reporting filterable, enables automated rules, and makes the account self-describing on handoff.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Should trial and demo conversions be in separate campaigns?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>At minimum, assign them separate conversion actions with distinct values so Smart Bidding can distinguish them. Self-serve trial and sales-led demo have different CAC and pipeline value. Separate campaigns if each path has enough volume for its own bidding target.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>How Kampaio Maintains the Structure</h2>
              <p style={pStyle}>
                A well-built campaign structure decays. Conversion volume shifts between tiers. A competitor enters your highest-intent keyword cluster and CPCs jump past the tier&apos;s cap. A problem-aware query starts converting at demo rates that justify its own campaign. Most accounts catch this in quarterly reviews - three months of misallocated spend before anyone notices.
              </p>
              <p style={pStyle}>
                <a href="/b6#vox" style={linkStyle}>Vox</a>, Kampaio&apos;s cross-campaign strategy <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a>, monitors budget distribution across tiers continuously and flags when a segment has earned its own campaign or should be consolidated back. <a href="/b6#sage" style={linkStyle}>Sage</a> handles keyword and audience clustering under each tier. The human approves the direction; the agents execute the rebalancing.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Keep the structure tuned without the quarterly surprise
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Kampaio&apos;s agents watch budget distribution across your intent tiers and flag rebalancing before misallocated spend stacks up. <a href="/pricing" style={linkStyle}>See Kampaio pricing</a> for autonomy tiers.
                </p>
                <a
                  href="/chat"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                >
                  Start Your Free Trial
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '24px' }}>Sources</h3>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><a href="https://support.google.com/google-ads/answer/7066642" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Smart Bidding (2024)</a> - Google Ads Help on bid strategy options and auction-time bidding.</li>
                <li><a href="https://www.factors.ai/blog/google-ads-b2b-saas-playbook" style={linkStyle} target="_blank" rel="noopener noreferrer">factors.ai B2B SaaS Google Ads Playbook</a> - Account structure by funnel stage and intent type; brand-masking analysis; 30+ conversion threshold.</li>
                <li><a href="https://www.farsiight.com/resources/google-ads-for-saas/" style={linkStyle} target="_blank" rel="noopener noreferrer">farsiight: Google Ads for SaaS</a> - Phased intent-based activation; 15-30 conversion threshold; CRM integration prerequisites; PMax sequencing.</li>
                <li><a href="https://www.withdaydream.com/library/insights/google-ads-for-b2b" style={linkStyle} target="_blank" rel="noopener noreferrer">daydream: Google Ads for B2B</a> - Phased 6-week structure; budget sizing for statistically useful signals.</li>
              </ul>
            </section>

          </div>
        </div>
        <KeepReading slug="b2b-saas-google-ads-campaign-structure" category="b2b" />
      <Footer compact={true} />
      </div>
    </>
  );
}
