'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import MascotQuote from '../../../components/blog/MascotQuote';
import {
  KeyTakeaways,
  Callout,
  BigStat,
  DonutBreakdown,
  CompareGrid,
} from '../../../components/blog/primitives';

const P: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
const H2: React.CSSProperties = { fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '48px', lineHeight: '1.25' };
const H3: React.CSSProperties = { fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '36px', lineHeight: '1.3' };
const LINK: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
const QSTYLE: React.CSSProperties = { fontSize: '19px', fontWeight: 700, color: '#1e293b', marginBottom: '12px', marginTop: '28px' };

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/performance-max-optimization#article',
    headline: 'Performance Max Optimization: The 7-Lever Playbook (In the Right Order)',
    description:
      'A sequenced Performance Max optimization playbook: which of 7 levers to touch first, what to leave alone during learning, and the weekly cadence that beats random tweaking.',
    image: 'https://www.kampaio.com/og/performance-max-optimization.png',
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
    datePublished: '2026-06-29T00:00:00.000Z',
    dateModified: '2026-06-29T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/performance-max-optimization',
    },
    keywords:
      'Performance Max optimization, PMax, Google Ads, asset groups, audience signals, search themes, brand exclusions, tROAS, smart bidding, product feed, learning phase',
    articleSection: 'Google Ads',
    inLanguage: 'en',
    "wordCount": 1700
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
        name: 'Performance Max Optimization: The 7-Lever Playbook',
        item: 'https://www.kampaio.com/blog/performance-max-optimization',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I improve PMax performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Fix conversion tracking first, then restructure asset groups (one theme per group, replace Low-rated assets), add audience signals from customer match lists, layer in negative keywords, and only then adjust bid targets. Follow the 7-lever sequence in order; skipping steps or working out of sequence is the most common reason optimization fails.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Performance Max works best with clean conversion tracking, at least 30 conversions per month, and real creative assets. It excels at ecommerce with a product feed and for local businesses with clear conversion goals. It performs less predictably for B2B lead gen with complex lead quality requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long before Performance Max optimizes or exits learning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "Google's official guidance is at least 6 weeks. Jyll Saskin Gales of Optmyzr targets 30 conversions in 30 days as the signal threshold. Campaigns with thin data can take two to four months to stabilize.",
        },
      },
      {
        '@type': 'Question',
        name: 'What should I optimize first in Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Conversion tracking, every time. If conversion data is wrong, every downstream setting optimizes toward the wrong goal. Confirm tracking first, then asset group structure, then the remaining levers in order.',
        },
      },
      {
        '@type': 'Question',
        name: 'Performance Max vs Demand Gen: which should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Use Performance Max for conversions (sales, leads) across all Google inventory. Use Demand Gen for brand awareness with creative control over YouTube, Discover, and Gmail placements. They can run simultaneously if budgets allow.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Performance Max spending but not converting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Spending without conversions is a diagnosis problem, not an optimization problem. Common causes: broken conversion tracking, bid strategy mismatched to data volume, landing page mismatch, or PMax cannibalizing brand search.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - Optimize Performance Max in the Right Order', level: 1 },
    { id: 'optimize-or-wait', title: 'First, Decide: Optimize or Wait? (The Learning Guardrail)', level: 1 },
    { id: 'priority-grid', title: 'The 7-Lever Priority Grid (Touch in This Order)', level: 1 },
    { id: 'lever-1-2', title: 'Lever 1-2: Fix Conversion Signals, Then Rebuild Asset Groups', level: 1 },
    { id: 'lever-3-4', title: 'Lever 3-4: Sharpen Audience Signals and Search Themes', level: 1 },
    { id: 'lever-5', title: 'Lever 5: Stop the Waste - Brand and Junk Exclusions', level: 1 },
    { id: 'lever-6-7', title: 'Lever 6-7: Bid Strategy, Targets, and the Feed', level: 1 },
    { id: 'read-black-box', title: 'Read the Black Box: Channel, Search-Terms, and Placement Reports', level: 1 },
    { id: 'weekly-cadence', title: 'Your Weekly PMax Optimization Cadence', level: 1 },
    { id: 'faq', title: 'FAQ - Performance Max Optimization', level: 1 },
    { id: 'optimize-without-guesswork', title: 'Optimize Without the Guesswork', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="performance-max-optimization" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Performance Max
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Performance Max Optimization: The 7-Lever Playbook (In the Right Order)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Fix conversion signals first, then asset groups, audiences, search themes, exclusions, bids, and the feed. One lever, then wait. Random tweaking during learning almost always makes results worse.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 29, 2026 · 11 min read</span>
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
              <p style={P}>
                Performance Max <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization</a> works best when you treat it like a runbook: fix conversion signals first, then asset groups, audience signals, search themes, exclusions, bid targets, and finally the product feed. Touch one lever. Wait for data. Then move to the next. Random tweaking during the learning phase almost always makes results worse.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={H2}>TL;DR - Optimize Performance Max in the Right Order</h2>
              <p style={P}>
                Performance Max is Google's fully automated campaign type that serves ads across Search, Shopping, Display, YouTube, Discover, Gmail, and Maps from a single campaign. When it underperforms, most advertisers pull the wrong lever first.
              </p>
              <p style={P}>
                Across 52 PMax optimization discussions we analyzed, conversion tracking and landing pages tie as the #1 raised issue (29% each), which is exactly why Lever 1 is signals, not bids. The correct sequence: (1) conversion tracking and values, (2) asset groups, (3) audience signals, (4) search themes, (5) brand and junk exclusions, (6) bid <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a> and target, (7) product feed (ecom). This sequenced approach is what we call the <strong>7-Lever Priority Order</strong>.
              </p>
              <KeyTakeaways
                items={[
                  'Run new PMax campaigns at least 6 weeks before judging performance.',
                  'Fix conversion tracking and values before touching anything else.',
                  'Add brand and junk exclusions anytime: no learning reset, fast effect.',
                  'Set tROAS only after 30+ conversions in 30 days, then move it 10-15% at a time.',
                  'One lever per session, then wait. Not five changes on a Friday.',
                ]}
              />
              <BigStat
                value="29%"
                label="of 52 PMax discussions"
                claim="raised conversion tracking as the #1 issue, tied with landing pages, which is why Lever 1 is signals, not bids."
                source="Source: Kampaio analysis of 52 PMax optimization discussions, 2026"
              />
            </section>

            {/* Optimize or Wait */}
            <section id="optimize-or-wait">
              <h2 style={H2}>First, Decide: Optimize or Wait? (The Learning Guardrail)</h2>
              <p style={P}>
                The single biggest optimization mistake is changing things while PMax is still in the learning phase. Google recommends running new campaigns for at least 6 weeks before judging performance (<a href="https://support.google.com/google-ads/answer/11385582" style={LINK} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Below that threshold, patience plus better tracking usually beats tweaking.
              </p>
              <p style={P}>
                Jyll Saskin Gales and Optmyzr recommend targeting roughly 30 conversions in 30 days as the signal-volume benchmark for smart bidding to work efficiently. Below that, the algorithm is still guessing.
              </p>
              <Callout variant="warning" title="Resets learning">
                A budget increase over 20%, a new bid target, or a complete asset group overhaul all reset learning. After any of those, wait 1-2 weeks before drawing conclusions. Safe to change anytime: adding exclusions, fixing tracking, updating individual assets.
              </Callout>
              <p style={P}>
                If your campaign is spending but generating zero conversions, you don't have an optimization problem, you have a diagnosis problem. See <a href="/blog/performance-max-not-converting" style={LINK}>Performance Max Not Converting? 9 Fixes That Actually Work</a>.
              </p>
              <MascotQuote mascot="maximus">
                Campaign hit 12 conversions in 18 days. I'd hold all changes 10 more days, not touch the target. The algorithm needs that last signal batch to confidently allocate budget. (Illustrative scenario.)
              </MascotQuote>
            </section>

            {/* Priority Grid */}
            <section id="priority-grid">
              <h2 style={H2}>The 7-Lever Priority Grid (Touch in This Order)</h2>
              <ComparisonTable
                headers={['Lever', 'Touch when', 'Wait window before judging', 'What to watch']}
                rows={[
                  { cells: ['Conversion tracking and values', 'Day 1 (before anything else)', '7 days after fix', 'Conversion count rising; value data flowing'], highlight: true },
                  { cells: ['Asset groups', 'After tracking confirmed clean', '7-10 days per change', 'Asset rating (Low/Good/Best); CTR'] },
                  { cells: ['Audience signals', 'After asset groups stable', '10-14 days', 'Conversion rate by segment'] },
                  { cells: ['Search themes', 'When you have intent signals Google lacks', '7 days', 'Search term coverage; CPA on new queries'] },
                  { cells: ['Brand and junk exclusions', 'Anytime (no learning reset)', 'Immediate to 3 days', 'Brand spend share; placement quality'] },
                  { cells: ['Bid strategy and target', 'After 30+ conversions in 30 days', '14 days minimum', 'tROAS achieved; spend volume'] },
                  { cells: ['Product feed (ecom only)', 'After signals and bids clean', '14 days per feed change', 'Impression share; conversion by product'] },
                ]}
                caption="The 7-Lever Priority Order: which lever to touch, when, and the wait window before judging the result"
              />
              <p style={P}>
                The order matters more than the individual levers. Every guide on this topic lists these seven. None of them sequence the levers with timing guardrails. That's the gap this grid fills.
              </p>
            </section>

            {/* Lever 1-2 */}
            <section id="lever-1-2">
              <h2 style={H2}>Lever 1-2: Fix Conversion Signals, Then Rebuild Asset Groups</h2>
              <p style={P}>
                Clean conversion signals are the foundation every downstream lever depends on. Before touching anything else, confirm conversions are importing correctly, values are set accurately, and value rules reflect actual margins. A Reddit r/PPC audit of 31 accounts found 4 of 31 imported conversions from GA4, which reports significantly fewer conversions than GTAG (<a href="https://www.reddit.com/r/PPC/comments/1mdhpxt/insights_from_31_google_ads_accounts_audited_14/" style={LINK} target="_blank" rel="noopener noreferrer">Reddit r/PPC, 2025</a>). If tracking is broken, fix it first, see <a href="/blog/google-ads-conversion-tracking-not-working" style={LINK}>Google Ads Conversion Tracking Not Working</a>.
              </p>
              <p style={P}>
                With signals confirmed clean, turn to asset groups. One theme per asset group is the structural rule. Max out the asset minimum: 15 headlines, 5 descriptions, 3 landscape images, 3 square images, 1 portrait image, and 1 video (<a href="https://support.google.com/google-ads/answer/11385582" style={LINK} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Skip the video and PMax auto-generates one, nearly always weaker than what you'd supply. Replace any "Low"-rated asset before moving on. Also review Text customization (formerly Automatically created assets) and confirm it is set intentionally.
              </p>
              <p style={P}>
                Jyll Saskin Gales via Optmyzr puts it plainly: "The actual creative you use is the real audience signal in PMax." Multiple asset groups with identical assets and different audience signals just give the algorithm the same signal repeated.
              </p>
              <MascotQuote mascot="mira">
                Replaced 4 'Low'-rated headlines and swapped a stock image for a product-in-use photo. CTR moved from 2.1% to 2.8% over 9 days. (Illustrative scenario - your result depends on asset quality gap.)
              </MascotQuote>
            </section>

            {/* Lever 3-4 */}
            <section id="lever-3-4">
              <h2 style={H2}>Lever 3-4: Sharpen Audience Signals and Search Themes</h2>
              <p style={P}>
                Audience signals are hints, not targeting. PMax uses them to find similar users faster, not to restrict who sees ads. Feed PMax your best converters: customer match lists, high-intent custom segments built around competitor keywords or in-market queries. The real lever here is asset relevance, not the signal list, which is the point Jyll Saskin Gales makes (<a href="https://www.optmyzr.com/guide/performance-max/" style={LINK} target="_blank" rel="noopener noreferrer">Optmyzr, 2026</a>).
              </p>
              <p style={P}>
                Search themes tell PMax which query territory matters when you have intent knowledge the algorithm lacks. As of 2026, search themes carry the same prioritization as phrase match and broad match keywords inside PMax (<a href="https://support.google.com/google-ads/answer/10724817" style={LINK} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Use them sparingly: 7-10 precise themes per asset group. If B2B lead quality (not coverage) is the core problem, see <a href="/blog/performance-max-problems-b2b-marketing" style={LINK}>why Performance Max fails in B2B marketing</a>.
              </p>
            </section>

            {/* Lever 5 */}
            <section id="lever-5">
              <h2 style={H2}>Lever 5: Stop the Waste - Brand and Junk Exclusions</h2>
              <p style={P}>
                Brand exclusions and campaign-level negative keywords are the highest-ROI "safe anytime" lever: no learning reset, effect is fast.
              </p>
              <DonutBreakdown
                center={{ value: '48%', label: 'no brand exclusions' }}
                segments={[
                  { percent: 48, label: '15 of 31 had no brand exclusions' },
                  { percent: 52, label: '16 of 31 had brand exclusions in place' },
                ]}
                examples={['One audited account: a single branded click cost $103 against a $2.50 average CPC.']}
                source="Source: Reddit r/PPC audit of 31 accounts (u/alexandrealmeida90, July 2025)"
              />
              <p style={P}>
                From a Reddit r/PPC audit of 31 accounts (u/alexandrealmeida90, July 2025, 211 upvotes): 15 of 31 had no brand exclusions in PMax (<a href="https://www.reddit.com/r/PPC/comments/1mdhpxt/insights_from_31_google_ads_accounts_audited_14/" style={LINK} target="_blank" rel="noopener noreferrer">Reddit r/PPC, 2025</a>). In one audited account, a single branded click cost $103 against a $2.50 average CPC. PMax aggressively claims credit for brand searches, brand exclusions cut that off at the source.
              </p>
              <p style={P}>
                Campaign-level negative keywords now support up to 10,000 per campaign (limit raised from 100 in March 2025, per <a href="https://www.towermarketing.net/blog/performance-max-best-practices/" style={LINK} target="_blank" rel="noopener noreferrer">Tower Marketing</a>). Use them to block irrelevant queries from the search terms report. For the safe pruning approach, see <a href="/blog/google-ads-negative-keywords" style={LINK}>Google Ads Negative Keywords: A Repeatable Method to Cut Wasted Spend</a>.
              </p>
              <p style={P}>
                Placement exclusions belong here too. Levitate Foundry achieved a 30% ROAS increase through systematic placement exclusions (via Optmyzr). Check any single placement eating more than 15% of spend at poor ROAS.
              </p>
            </section>

            {/* Lever 6-7 */}
            <section id="lever-6-7">
              <h2 style={H2}>Lever 6-7: Bid Strategy, Targets, and the Feed</h2>
              <p style={P}>
                Bid strategy comes last among the algorithmic levers, only after signals, structure, and exclusions are clean. Setting tROAS before you have 30 monthly conversions is optimizing without data.
              </p>
              <p style={P}>
                Below 30 monthly conversions, use Maximize Conversion Value and let PMax build signal. Once above that threshold, introduce a tROAS at roughly 80% of observed ROAS from the past 30 days. Ratchet up by 10-15% increments and wait 14 days between each move. See <a href="/blog/google-ads-smart-bidding-strategies" style={LINK}>Google Ads Smart Bidding Strategies: How to Choose the Right One</a> for the full decision framework.
              </p>
              <MascotQuote mascot="buzz">
                tROAS set at 450% was starving the campaign on $18/day despite a $120/day budget. Dropped to 380%, spend recovered 22% in 6 days, ROAS held at 410%. (Illustrative scenario - tROAS above observed performance restricts spend.)
              </MascotQuote>
              <p style={P}>
                <strong>For ecom only:</strong> the product feed is Lever 7. <a href="https://smarter-ecommerce.com/blog/en/ecommerce/the-ultimate-ecommerce-campaign-optimization-playbook-for-pmax/" style={LINK} target="_blank" rel="noopener noreferrer">Smarter Ecommerce</a>, which analyzed over 4,000 PMax campaigns, found that too many granular campaigns prevents the algorithm from learning. Consolidate: fewer campaigns, more conversion data each. Use custom labels to segment by margin, stock level, or seasonality.
              </p>
            </section>

            {/* Read the Black Box */}
            <section id="read-black-box">
              <h2 style={H2}>Read the Black Box: Channel, Search-Terms, and Placement Reports</h2>
              <p style={P}>
                PMax reporting has improved a lot since 2022. Channel-level performance, search terms insight, and placement data are all available in 2026, use them to expand where PMax works, not just cut what looks bad.
              </p>
              <p style={P}>
                Kirk Williams via Optmyzr gets at something worth sitting with: "You cannot expect something upper funnel like YouTube to really play at the same level as down the funnel like Search." A YouTube impression that assists a Search conversion three days later shows in Search's column, not YouTube's. Use channel data directionally, not as a shutdown trigger.
              </p>
              <p style={P}>
                Where to look: inside your PMax campaign, "Insights and reports" covers search themes and audience performance; the asset group panel shows asset ratings; "Combinations" shows which asset sets are actually serving. Channel data feeds back into Levers 2-5: high Display spend at poor ROAS means add placement exclusions. Search CPA spike after PMax launch means check search theme overlap.
              </p>
            </section>

            {/* Weekly Cadence */}
            <section id="weekly-cadence">
              <h2 style={H2}>Your Weekly PMax Optimization Cadence</h2>
              <p style={P}>The 7-Lever Priority Order becomes a routine when scheduled.</p>
              <p style={P}>
                <strong>Every week:</strong> pull the search terms report and add irrelevant queries as campaign-level negatives. Check asset ratings and replace any "Low" assets. Scan placements for any single source eating over 15% of spend. Verify brand search share stays controlled.
              </p>
              <p style={P}>
                <strong>Every two to four weeks:</strong> review conversion volume. If hitting 30+ per month, evaluate tROAS introduction or adjustment. Audit audience signal coverage and add new customer lists. Review search theme performance.
              </p>
              <p style={P}>
                <strong>Monthly:</strong> confirm asset group themes are still tight. Adjust bid targets by 10-15% increments if performance is stable. For ecom, refresh custom label logic based on stock and margin changes.
              </p>
              <p style={P}>
                One lever per session, then wait. Not five changes on a Friday followed by a weekend watching ROAS graphs move for unknowable reasons.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={H2}>FAQ - Performance Max Optimization</h2>

              <p style={QSTYLE}>How do I improve PMax performance?</p>
              <p style={P}>
                Fix conversion tracking first, then restructure asset groups (one theme per group, replace Low-rated assets), add audience signals from customer match lists, layer in negative keywords, and only then adjust bid targets. Follow the 7-lever sequence above in order, skipping steps or working out of sequence is the most common reason optimization fails.
              </p>

              <p style={QSTYLE}>When should I use Performance Max?</p>
              <p style={P}>
                Performance Max works best with clean conversion tracking, at least 30 conversions per month, and real creative assets. It excels at ecommerce with a product feed and for local businesses with clear conversion goals. It performs less predictably for B2B lead gen with complex lead quality requirements, a pattern confirmed by community analysis of <a href="https://www.reddit.com/r/PPC/comments/1ihht85/googles_2025_pmax_updates_are_they_actually/" style={LINK} target="_blank" rel="noopener noreferrer">Google's 2025 PMax updates</a>.
              </p>

              <p style={QSTYLE}>How long before Performance Max optimizes or exits learning?</p>
              <p style={P}>
                Google's official guidance is at least 6 weeks (<a href="https://support.google.com/google-ads/answer/11385582" style={LINK} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Jyll Saskin Gales of Optmyzr targets 30 conversions in 30 days as the signal threshold. Campaigns with thin data can take two to four months to stabilize.
              </p>

              <p style={QSTYLE}>What should I optimize first in Performance Max?</p>
              <p style={P}>
                Conversion tracking, every time. If conversion data is wrong, every downstream setting optimizes toward the wrong goal. Confirm tracking first, then asset group structure, then the remaining levers in order.
              </p>

              <p style={QSTYLE}>Performance Max vs Demand Gen: which should I use?</p>
              <CompareGrid
                columns={[
                  {
                    name: 'Performance Max',
                    bestFor: 'conversions across all Google inventory',
                    traits: [
                      { label: 'Optimizes for sales / leads', has: true },
                      { label: 'Runs across all inventory', has: true },
                      { label: 'Creative control by placement', has: false },
                      { label: 'Best for brand awareness', has: false },
                    ],
                    highlight: true,
                  },
                  {
                    name: 'Demand Gen',
                    bestFor: 'brand awareness with creative control',
                    traits: [
                      { label: 'Optimizes for sales / leads', has: false },
                      { label: 'Runs across all inventory', has: false },
                      { label: 'Creative control by placement', has: true },
                      { label: 'Best for brand awareness', has: true },
                    ],
                  },
                ]}
              />
              <p style={P}>
                Use Performance Max for conversions (sales, leads) across all Google inventory. Use Demand Gen for brand awareness with creative control over YouTube, Discover, and Gmail placements. They can run simultaneously if budgets allow.
              </p>

              <p style={QSTYLE}>Why is Performance Max spending but not converting?</p>
              <p style={P}>
                Spending without conversions is a diagnosis problem, not an optimization problem. Common causes: broken conversion tracking, bid strategy mismatched to data volume, landing page mismatch, or PMax cannibalizing brand search. Full diagnosis: <a href="/blog/performance-max-not-converting" style={LINK}>see the 9-fix PMax conversion troubleshooter</a>.
              </p>
            </section>

            {/* CTA */}
            <section id="optimize-without-guesswork">
              <h2 style={H2}>Optimize Without the Guesswork</h2>
              <p style={P}>
                Running this 7-lever cadence manually takes 2-3 hours per campaign per week. Kampaio's <a href="/blog/google-ads-ai-agent" style={{ color: '#764ba2', textDecoration: 'underline' }}>agents</a> run the same playbook continuously: Buzz monitors bid strategy and tROAS targets, Sage manages audience signals and search themes, Mira flags underperforming assets, and Aegis enforces the learning guardrail.
              </p>
              <p style={P}>
                Optmyzr and Madgicx start at $499+/month for automated oversight at this level. Kampaio is free while B6 is in beta, with full agent autonomy at the Approval level and multi-account coverage at the Autonomous level.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  See what each agent would flag in your PMax campaign
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: '500', opacity: 0.9 }}>
                  Connect your account and Kampaio's agents run the same 7-lever playbook, continuously, in the right order.
                </p>
                <a
                  href="/chat"
                  className="btn"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Audit My PMax Campaign
                </a>
                <p style={{ fontSize: '15px', color: '#64748b', marginTop: '20px' }}>
                  Pricing details: <a href="/pricing" style={LINK}>kampaio.com/pricing</a>
                </p>
              </div>
            </section>
          </div>
        </div>
        <KeepReading slug="performance-max-optimization" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
