'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { BigStat, SignalStack, Callout, Steps, Step, KeyTakeaways } from '../../../components/blog/primitives';

const SLUG = 'google-ads-remarketing';
const TITLE = 'Google Ads Remarketing at Scale: Lists, Exclusions and What PMax Changes (2026)';
const DESCRIPTION =
  'How Google Ads remarketing works once you scale: list minimums, membership duration, RLSA, PMax and Demand Gen, exclusions and incrementality tests.';
const PUBLISHED = '2026-11-12T00:00:00.000Z';

const H_2472738 = 'https://support.google.com/google-ads/answer/2472738';
const H_2701222 = 'https://support.google.com/google-ads/answer/2701222';
const H_6379332 = 'https://support.google.com/google-ads/answer/6379332';
const H_2453998 = 'https://support.google.com/google-ads/answer/2453998';
const H_2497941 = 'https://support.google.com/google-ads/answer/2497941';
const H_2549058 = 'https://support.google.com/google-ads/answer/2549058';
const H_6034106 = 'https://support.google.com/google-ads/answer/6034106';
const H_4782789 = 'https://support.google.com/google-ads/answer/4782789';
const H_13541369 = 'https://support.google.com/google-ads/answer/13541369';
const H_12003020 = 'https://support.google.com/google-ads/answer/12003020';
const DEV_CM = 'https://developers.google.com/ads/blog/posts/2025/02/update-to-customer-match-membership';
const DEV_DG = 'https://developers.google.com/ads/blog/posts/2026/11/display-targeting-changes-in-demand-gen';
const G_NCA = 'https://business.google.com/us/accelerate/resources/articles/best-practices-for-new-customer-acquisition-goals/';
const SER = 'https://www.seroundtable.com/google-ads-pmax-audience-exclusions-reporting-41118.html';
const PPCHERO = 'https://ppchero.com/ultimate-guide-to-google-ads-remarketing/';

type Faq = { q: string; pre: string; cite?: { label: string; href: string }; post: string };

// Visible FAQ and FAQPage schema are built from the same strings, so the markup
// says exactly what the page says.
const FAQS: Faq[] = [
  {
    q: 'What is remarketing in Google Ads?',
    pre: 'Google Ads remarketing shows ads to past site visitors, app users and customer-list members, now called "your data segments"',
    cite: { label: 'Google Ads Help, 2026', href: H_2453998 },
    post: '.',
  },
  {
    q: 'Can you retarget with Google Ads?',
    pre: 'Yes. Segments work on Search, Display, YouTube, Shopping and Demand Gen, and act as hints in Performance Max.',
    post: '',
  },
  {
    q: 'How do I set up Google Ads remarketing?',
    pre: 'Add the Google tag or link a GA4 audience, then create a segment with rules and a membership duration. Segments take 48-72 hours to populate',
    cite: { label: 'Google Ads Help, 2026', href: H_2472738 },
    post: '.',
  },
  {
    q: 'Is $10 a day enough for Google Ads?',
    pre: 'For remarketing, usually not on Search: the list may never reach the floor and Smart Bidding needs conversion volume.',
    post: '',
  },
  {
    q: 'How big does a remarketing list need to be?',
    pre: 'Google says 100 active users in 30 days for Search, Display and YouTube, but its Search help page still says 1,000 cookies. Plan for the stricter number and confirm in Audience manager.',
    post: '',
  },
  {
    q: 'How long should membership duration be?',
    pre: 'Match your sales cycle. The default is 30 days and the maximum 540 on Display and Search.',
    post: '',
  },
  {
    q: 'Is remarketing worth it with Performance Max?',
    pre: 'Yes, as a signal and an exclusion. Prove value with a holdout test.',
    post: '',
  },
];

const faqText = (f: Faq) => `${f.pre}${f.cite ? ` (${f.cite.label})` : ''}${f.post}`;

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
      'google ads remarketing, remarketing, retargeting, your data segments, remarketing list, customer match, membership duration, RLSA, Performance Max, Demand Gen, audience exclusions, frequency cap, incrementality, Kampaio',
    inLanguage: 'en',
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
    { id: 'what-is-remarketing', title: 'What Google Ads Remarketing Is in 2026, and Why the Name Changed', level: 1 },
    { id: 'three-names', title: 'The three names for one thing: remarketing, retargeting, your data segments', level: 2 },
    { id: 'how-lists-work', title: 'How Lists Work Under the Hood: Size Minimums, Membership Duration and Customer Match', level: 1 },
    { id: 'list-size-thresholds', title: 'List size thresholds, side by side', level: 2 },
    { id: 'membership-duration', title: 'Membership duration by sales cycle (including B2B)', level: 2 },
    { id: 'customer-match-clock', title: 'Customer Match: the 540-day clock', level: 2 },
    { id: 'where-remarketing-lives', title: 'Where Remarketing Lives Now: Search, Performance Max and Demand Gen', level: 1 },
    { id: 'rlsa', title: 'Search (RLSA): the only place a list is still a hard Target', level: 2 },
    { id: 'performance-max', title: 'Performance Max: your list becomes a hint', level: 2 },
    { id: 'demand-gen', title: 'Demand Gen: lookalikes became suggestions', level: 2 },
    { id: 'exclusions', title: 'Exclusions Are the Real Scaling Lever', level: 1 },
    { id: 'what-to-suppress', title: 'What to suppress first: buyers, converters, overlap', level: 2 },
    { id: 'frequency', title: 'Frequency and burnout without guessing', level: 2 },
    { id: 'segmentation', title: 'Audience Segmentation That Survives Scale: B2B Long Cycles, E-commerce and Lead Gen', level: 1 },
    { id: 'recency-tiers', title: 'Recency tiers for e-commerce and lead gen', level: 2 },
    { id: 'b2b-crm-lists', title: 'B2B: CRM lists, not just pixels', level: 2 },
    { id: 'incrementality', title: 'How to Measure Whether Remarketing Is Incremental', level: 1 },
    { id: 'holdout-test', title: 'A holdout test in five steps', level: 2 },
    { id: 'pmax-hides', title: 'What a PMax account hides from you', level: 2 },
    { id: 'common-mistakes', title: 'Common Remarketing Mistakes at Scale', level: 1 },
    { id: 'quick-diagnosis', title: 'Quick diagnosis table', level: 2 },
    { id: 'faq', title: 'Frequently Asked Questions About Google Ads Remarketing', level: 1 },
    { id: 'next-step', title: 'Next Step: Audit Your Lists Before You Scale Spend', level: 1 },
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
  const listStyle: React.CSSProperties = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };
  const tableCaptionStyle: React.CSSProperties = { fontSize: '16px', color: '#1e293b', marginBottom: '-16px', marginTop: '8px' };

  const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} style={linkStyle} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

  const Box = () => (
    <span
      aria-hidden
      style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #667eea', borderRadius: '4px', marginRight: '12px', verticalAlign: '-2px', flexShrink: 0 }}
    />
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
              Google Ads · Remarketing
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              {TITLE}
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              List minimums, membership duration, RLSA, Performance Max and Demand Gen, exclusions and incrementality tests, checked against Google&apos;s own help pages on November 12, 2026.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  VC
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By <a href="/author/vitalii-chornyi" style={{ color: 'inherit', textDecoration: 'underline' }}>Vitalii Chornyi</a></span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>November 12, 2026 · 14 min read</span>
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
                Google Ads remarketing (Google now labels it &quot;your data segments&quot;) shows ads to people who already visited your site, used your app or are on your customer list. At scale it stops being a stand-alone tactic: Performance Max and Demand Gen absorb your lists as signals, so the controls left are list hygiene, exclusions and incrementality.
              </p>

              {/* VISUAL 1: KeyTakeaways: the TL;DR as of November 2026 */}
              <KeyTakeaways
                title="TL;DR (as of November 2026)"
                items={[
                  <span key="k1">
                    Google renamed remarketing &quot;your data segments&quot; (<Ext href={H_2472738}>Google Ads Help, 2026</Ext>).
                  </span>,
                  'Google’s pages disagree on the Search list minimum: 100 active users or 1,000 cookies. Plan for 1,000.',
                  'A list does one of three jobs: Target, Signal or Exclude. In Performance Max it is a hint.',
                  'Exclusions are the cheapest scaling lever. Only a holdout test proves incrementality.',
                ]}
              />
            </section>

            {/* What it is */}
            <section id="what-is-remarketing">
              <h2 style={h2Style}>What Google Ads Remarketing Is in 2026, and Why the Name Changed</h2>
              <p style={paragraphStyle}>
                Remarketing is advertising to people who already interacted with your business, and Google&apos;s interface now calls the building blocks &quot;your data segments&quot;: site visitors, app users, YouTube viewers, customer lists (<Ext href={H_2453998}>Google Ads Help, 2026</Ext>). The mechanics did not change. The screens did, so older tutorials send you hunting for menus that no longer exist.
              </p>
              <p style={paragraphStyle}>
                Can you retarget with Google Ads? Yes. Segments work on Search, Display, YouTube, Shopping and Demand Gen. In Performance Max they act as audience signals rather than hard targeting.
              </p>
              <p style={paragraphStyle}>
                Setup: add the Google tag (or link a GA4 audience), create a segment with rules and a membership duration, and wait 48-72 hours for it to populate (<Ext href={H_2472738}>Google Ads Help, 2026</Ext>). Segments need personalization consent, so they run smaller than your analytics audience (<Ext href={H_2497941}>Google Ads Help, 2026</Ext>).
              </p>

              <h3 id="three-names" style={h3Style}>The three names for one thing: remarketing, retargeting, your data segments</h3>
              <p style={paragraphStyle}>
                Remarketing is Google&apos;s older term, retargeting is the industry term, and &quot;your data segments&quot; is the current UI label. We use &quot;remarketing&quot; from here on because advertisers still search for it, including &quot;google retargeting ads&quot;.
              </p>
            </section>

            {/* How lists work */}
            <section id="how-lists-work">
              <h2 style={h2Style}>How Lists Work Under the Hood: Size Minimums, Membership Duration and Customer Match</h2>
              <p style={paragraphStyle}>
                A segment needs at least 100 active users in the last 30 days to serve on Search, Display and YouTube. Customer Match lists follow the same rule if they were uploaded or refreshed after February 1, 2024; older lists keep the 1,000 matched-user rule (<Ext href={H_2472738}>Google Ads Help, 2026</Ext>).
              </p>
              <p style={paragraphStyle}>
                Google then contradicts itself. The Search-specific page still says &quot;a minimum number of 1,000 cookies&quot; (<Ext href={H_2701222}>Google Ads Help, 2026</Ext>). Both pages still disagreed on November 12, 2026, which means a list can look eligible under one page and idle under the other. Plan for the stricter number on Search and read the eligible size in Audience manager.
              </p>

              {/* VISUAL 2: Callout (warning): Google's two help pages disagree on the Search minimum */}
              <Callout variant="warning" title="Two Google pages, two minimums">
                Audience segments page: 100 active users in 30 days. Search remarketing page: 1,000 cookies. Size Search lists for 1,000 until Google reconciles them.
              </Callout>

              <h3 id="list-size-thresholds" style={h3Style}>List size thresholds, side by side</h3>
              <p style={tableCaptionStyle}>
                <strong>Table 1. List size and duration reference</strong> (Google Ads Help, verified November 12, 2026)
              </p>

              {/* VISUAL 3: ResponsiveTable: list size floors and maximum membership per network */}
              <ResponsiveTable
                headers={['Network / list type', 'Minimum', 'Max membership']}
                rows={[
                  ['Search', '100 active users / 30 days', '540 days'],
                  ['Display', '100 active users / 30 days', '540 days'],
                  ['YouTube', '100 active users / 30 days', 'see help page'],
                  ['Customer Match (uploaded or refreshed after Feb 1, 2024)', '100', '540 days'],
                  ['Customer Match (older lists)', '1,000 matched users', '540 days'],
                  [<strong key="flag">Flagged: Search help page</strong>, <strong key="flag-min">1,000 cookies</strong>, '540 days'],
                ]}
              />
              <p style={paragraphStyle}>
                Demand Gen has no row because we could not verify a list minimum for it.
              </p>

              <h3 id="membership-duration" style={h3Style}>Membership duration by sales cycle (including B2B)</h3>
              <p style={paragraphStyle}>
                Membership duration defaults to 30 days and tops out at 540 on Display and Search; a segment unused for 540 days closes automatically (<Ext href={H_2472738}>Google Ads Help, 2026</Ext>). Google&apos;s rule: &quot;the membership duration should be similar to the length of your sales cycle.&quot;
              </p>
              <p style={paragraphStyle}>
                Too long dilutes bids with cold users; too short starves the list. PPC Hero suggests 90 days for products rebought quarterly (<Ext href={PPCHERO}>PPC Hero</Ext>), a practitioner starting point to test.
              </p>
              <p style={paragraphStyle}>
                Under conversion-based Smart Bidding you need not tier lists by duration (<Ext href={H_4782789}>Google Ads Help, 2026</Ext>).
              </p>

              <h3 id="customer-match-clock" style={h3Style}>Customer Match: the 540-day clock</h3>

              {/* VISUAL 4: BigStat (bold-viz): the Customer Match membership clock */}
              <BigStat
                value="540"
                label="days / 100 members"
                claim="A Customer Match membership expires after 540 days. To keep the list eligible, add or refresh at least 100 members inside that window."
                source="Sources: Google Ads Help (answer 6379332), 2026; Google Ads Developer Blog, Feb 2025"
              />

              <p style={paragraphStyle}>
                The 540-day maximum rolled out from April 7, 2025, and longer or open-ended lists were set to 540. List size shrinks as memberships expire, and &quot;campaigns targeting too small a segment of users can&apos;t serve ads and may automatically pause&quot; (<Ext href={DEV_CM}>Google Ads Developer Blog, 2025</Ext>).
              </p>
              <p style={paragraphStyle}>
                Define a &quot;lapsed customer&quot; from your own repurchase interval before uploading, set the refresh cadence from that, then respect the 540-day clock. Skip this step and nobody notices until the campaign stops serving.
              </p>

              <MascotQuote mascot="sage">
                Customer Match lists expire after 540 days. To keep one eligible, I add or refresh at least 100 members inside that window, otherwise it shrinks and can pause the campaign.
              </MascotQuote>
            </section>

            {/* Where remarketing lives */}
            <section id="where-remarketing-lives">
              <h2 style={h2Style}>Where Remarketing Lives Now: Search, Performance Max and Demand Gen</h2>
              <p style={paragraphStyle}>
                Every list does one of three jobs. It can <strong>Target</strong> (you choose who sees the ad), <strong>Signal</strong> (a hint to the algorithm, no guarantee) or <strong>Exclude</strong> (suppress people). As automation widens, lists drift from Target to Signal, and that leaves Exclude and measurement as the only hard controls. The table shows where each job still works.
              </p>

              {/* VISUAL 5: SignalStack: the three jobs of a list, Exclude highlighted as the control you keep */}
              <SignalStack
                layers={[
                  { title: 'Target', desc: 'You choose who sees the ad. Still a hard control on Search (RLSA), Display, YouTube and Demand Gen, not in Performance Max.' },
                  { title: 'Signal', desc: 'A hint to the algorithm, no guarantee. What a list becomes in Performance Max.' },
                  { title: 'Exclude', desc: 'Suppress people. Works on Search, Display, YouTube, Demand Gen and Performance Max (check availability in PMax).', highlight: true, badge: 'yours to keep' },
                ]}
                caption="The three jobs of a list, as automation widens"
              />

              <p style={tableCaptionStyle}>
                <strong>Table 2. Three Jobs of a List by campaign type</strong> (as of November 2026)
              </p>
              <ResponsiveTable
                headers={['Campaign type', 'Target', 'Signal', 'Exclude', 'Customer Match auto-included?']}
                rows={[
                  ['Search (RLSA)', 'Yes', 'Adjustments set attribution priority under Smart Bidding', 'Yes', '"Soon" per Google'],
                  ['Display / YouTube', 'Yes', 'Optional', 'Yes', 'YouTube: yes'],
                  ['Demand Gen', 'Yes', 'Lookalikes became suggestions', 'Yes', 'Check per surface'],
                  ['Performance Max', 'No', 'Yes, a hint only', 'Yes (check availability)', 'Check per surface'],
                ]}
              />

              <p style={paragraphStyle}>
                Mind the auto-inclusion trap, because it catches careful advertisers too. With Smart Bidding and optimized targeting, Google includes all Customer Match lists in the account unless you opt out (live on YouTube). A list uploaded for one campaign can influence another (<Ext href={H_6379332}>Google Ads Help, 2026</Ext>). Audit every list the account can reach (<a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>Smart Bidding strategies</a>).
              </p>

              <h3 id="rlsa" style={h3Style}>Search (RLSA): the only place a list is still a hard Target</h3>
              <p style={paragraphStyle}>
                On Search, a list still decides who is eligible, as audience-only targeting or layered onto broad keywords. Google&apos;s documented example is to &quot;increase bid by 25% for visitors in last 30 days&quot; (<Ext href={H_2701222}>Google Ads Help, 2026</Ext>), an illustration, not a result.
              </p>
              <p style={paragraphStyle}>
                The catch is conversion-based Smart Bidding, where bid adjustments &quot;prioritize the audience segment to which an impression, click, etc. will be attributed&quot; instead of changing the bid (<Ext href={H_4782789}>Google Ads Help, 2026</Ext>). Even the hardest Target is drifting toward Signal.
              </p>
              <p style={paragraphStyle}>
                Google&apos;s Tirendo case (161% conversion rate lift) is advertiser-reported and measures a warm audience, not incrementality (<Ext href={H_2701222}>Google Ads Help, 2026</Ext>). On Search automation, see <a href="/blog/google-ads-ai-max" style={linkStyle}>AI Max</a>.
              </p>

              <h3 id="performance-max" style={h3Style}>Performance Max: your list becomes a hint</h3>
              <p style={paragraphStyle}>
                Performance Max treats lists as audience signals, and a signal &quot;isn&apos;t a guarantee that ads will be served to only users within these audiences&quot; (<Ext href={H_2497941}>Google Ads Help, 2026</Ext>).
              </p>
              <p style={paragraphStyle}>
                The control that remains is suppression. Search Engine Roundtable reported PMax audience exclusions, seen as &quot;Data Exclusions&quot;, on March 27, 2026 (<Ext href={SER}>Search Engine Roundtable</Ext>). Rollout was gradual, so check your account (<a href="/blog/performance-max-optimization" style={linkStyle}>Performance Max optimization</a>).
              </p>

              <h3 id="demand-gen" style={h3Style}>Demand Gen: lookalikes became suggestions</h3>
              <p style={paragraphStyle}>
                Demand Gen Lookalike segments are moving to suggestion mode through 2026, from March 2026, so the reach slider no longer constrains who sees ads. The 100-user seed minimum &quot;is no longer true&quot;; ad groups can opt out (<Ext href={H_13541369}>Google Ads Help, 2026</Ext>).
              </p>
              <p style={paragraphStyle}>
                From the week of December 1, 2026, Display targeting in Demand Gen is managed at ad-group level, with default serving unchanged (<Ext href={DEV_DG}>Google Ads Developer Blog, 2026</Ext>).
              </p>
            </section>

            {/* Exclusions */}
            <section id="exclusions">
              <h2 style={h2Style}>Exclusions Are the Real Scaling Lever</h2>
              <p style={paragraphStyle}>
                With targeting handed to the algorithm, suppression is the lever you still hold. When spend scales, the cheapest improvement is usually who you stop paying to reach, not who you add: purchasers, converted leads, employees, existing customers and overlapping lists. Google supports exclusions on Search, Display, Demand Gen, Standard Shopping, Video and Performance Max. They are unavailable at campaign creation and may not apply to users who opted out of personalization (<Ext href={H_2549058}>Google Ads Help, 2026</Ext>).
              </p>
              <p style={paragraphStyle}>
                Scope: &quot;Keyword and audience exclusions are only applicable for first-party data.&quot; Google recommends observing before excluding.
              </p>

              <h3 id="what-to-suppress" style={h3Style}>What to suppress first: buyers, converters, overlap</h3>
              <p style={paragraphStyle}>
                Overlap quietly burns budget, and no report flags it. A visitor can sit in several segments, every eligible ad enters the auction, and the highest ad rank wins (<Ext href={H_2472738}>Google Ads Help, 2026</Ext>). Overlapping campaigns therefore compete with each other and with prospecting.
              </p>
              <p style={paragraphStyle}>
                For Performance Max, new-customer acquisition goals are the non-exclusion route (New Customer Value, High Value New Customer, New Customer Only; value modes need value-based bidding and a Purchase goal), built on first-party customer lists (<Ext href={G_NCA}>Google, Best practices for new customer acquisition goals</Ext>). Treat these as steering, not a guarantee. See also <a href="/blog/performance-max-negative-keywords" style={linkStyle}>Performance Max negative keywords</a>.
              </p>

              <p style={{ ...paragraphStyle, marginBottom: '16px' }}>
                <strong>The exclusion audit (7 checks):</strong>
              </p>
              <ul style={{ ...listStyle, listStyle: 'none', paddingLeft: 0 }}>
                {[
                  'Exclude purchasers from cart-abandoner campaigns.',
                  'Exclude converted leads.',
                  'Exclude employees and internal lists.',
                  'Exclude existing customers from acquisition campaigns.',
                  'Dedupe overlapping segments across campaigns.',
                  'Check PMax data exclusions are available.',
                  'Review all accessible lists for auto-inclusion.',
                ].map((item) => (
                  <li key={item} style={{ marginBottom: '10px', display: 'flex', alignItems: 'baseline' }}>
                    <Box />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 id="frequency" style={h3Style}>Frequency and burnout without guessing</h3>
              <p style={paragraphStyle}>
                Frequency capping works in Display and Video but &quot;isn&apos;t supported in Demand Gen campaigns&quot; (<Ext href={H_6034106}>Google Ads Help, 2026</Ext>). On Display it applies per campaign, ad group or ad; on Video per campaign only. We found no Google statement on caps for Performance Max or Search, so we claim nothing there. Where caps are unavailable, shorter windows and exclusions control burnout. PPC Hero advises capping, then testing (<Ext href={PPCHERO}>PPC Hero</Ext>).
              </p>
            </section>

            {/* Segmentation */}
            <section id="segmentation">
              <h2 style={h2Style}>Audience Segmentation That Survives Scale: B2B Long Cycles, E-commerce and Lead Gen</h2>
              <p style={paragraphStyle}>
                Exclusions tell the system who to skip. Segmentation decides who is worth bidding for. Segment by intent depth and recency, not by page URL count, and keep every segment above the size floor or merge it into a neighbor. See <a href="/blog/how-to-scale-google-ads-without-losing-roas" style={linkStyle}>scaling Google Ads without losing ROAS</a>.
              </p>
              <p style={paragraphStyle}>
                Is $10 a day enough for Google Ads? For remarketing, usually not on Search: at roughly $300 a month traffic may never fill a list to the floor (100 active users in 30 days, or 1,000 on the stricter reading), and Smart Bidding needs conversion volume. Run broad prospecting first and add Customer Match plus RLSA once a list qualifies.
              </p>

              <h3 id="recency-tiers" style={h3Style}>Recency tiers for e-commerce and lead gen</h3>
              <p style={paragraphStyle}>
                Starting points to test, not Google rules. Google&apos;s only rule is to match your sales cycle.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '14px' }}>
                  <strong>0-7 days:</strong> cart abandoners and form starters. Highest intent, smallest list.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>8-30 days:</strong> product viewers and pricing-page visitors.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>31-90 days:</strong> engaged visitors and lapsed buyers (winback).
                </li>
                <li style={{ marginBottom: 0 }}>
                  <strong>91-540 days:</strong> purchasers and customers, mainly as exclusions plus a separate winback list.
                </li>
              </ol>
              <p style={paragraphStyle}>
                For lead gen, submitters are an exclusion and partial form starters a Target. For e-commerce, exclude purchasers for roughly 90-180 days (heuristic, test it). Dynamic remarketing shows viewed products and requires a product feed (<Ext href={H_2453998}>Google Ads Help, 2026</Ext>).
              </p>

              <h3 id="b2b-crm-lists" style={h3Style}>B2B: CRM lists, not just pixels</h3>
              <p style={paragraphStyle}>
                B2B sales cycles of 60-180 days outlast most pixel windows. Customer Match supports up to 540 days (<Ext href={H_6379332}>Google Ads Help, 2026</Ext>), so upload CRM lists: closed-lost deals, SQLs not yet won, and customers as exclusions. More: <a href="/blog/b2b-google-ads-lead-generation" style={linkStyle}>B2B lead generation</a> and <a href="/blog/google-ads-for-b2b-saas" style={linkStyle}>Google Ads for B2B SaaS</a>.
              </p>
            </section>

            {/* Incrementality */}
            <section id="incrementality">
              <h2 style={h2Style}>How to Measure Whether Remarketing Is Incremental</h2>
              <p style={paragraphStyle}>
                Remarketing targets people already likely to buy, so last-click ROAS overstates it and only a holdout comparison shows what it adds. That is why a remarketing campaign so often looks like the best one in the account: it collects credit for sales that were already on their way.
              </p>
              <p style={paragraphStyle}>
                Google&apos;s Conversion Lift supports user-based and geo-based studies, but it &quot;isn&apos;t available for all Google Ads accounts&quot; and requires contacting your account representative (<Ext href={H_12003020}>Google Ads Help, 2026</Ext>). Smaller accounts need a manual fallback. Google says experiments beat pre/post comparisons because &quot;test arms do not compete in the same auction&quot;, and recommends a 50/50 split (<Ext href={G_NCA}>Google, new customer acquisition best practices</Ext>). Full method: our <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>incrementality testing guide</a>.
              </p>

              <h3 id="holdout-test" style={h3Style}>A holdout test in five steps</h3>

              {/* VISUAL 6: Steps: the five-step holdout protocol */}
              <Steps>
                <Step title="Define">
                  The segment and the outcome (for example, cart abandoners and purchases).
                </Step>
                <Step title="Split">
                  Into test and holdout via geo split, <a href="/blog/google-ads-experiments" style={linkStyle}>Google Ads Experiments</a> or Conversion Lift where eligible.
                </Step>
                <Step title="Run">
                  Two to four weeks at a stable budget (our recommendation, not a Google rule).
                </Step>
                <Step title="Compare">
                  Conversions per $1,000 spent and the new-customer share between arms.
                </Step>
                <Step title="Decide">
                  Keep, shrink the membership window, or cut the campaign.
                </Step>
              </Steps>

              <p style={paragraphStyle}>
                This is a protocol, not a kampaio result. Your test will show your number, and it may be smaller than the dashboard suggests. See also the <a href="/blog/google-ads-attribution-models-guide" style={linkStyle}>attribution models guide</a>.
              </p>

              <h3 id="pmax-hides" style={h3Style}>What a PMax account hides from you</h3>
              <p style={paragraphStyle}>
                Performance Max mixes remarketing and prospecting in one campaign, so its totals cannot show remarketing performance. We could not verify per-list reporting, so treat it as unavailable until you see it. Check what audience reporting your account exposes (<Ext href={SER}>Search Engine Roundtable, 2026</Ext>). View-through and cross-device effects stay partly invisible to any test.
              </p>
            </section>

            {/* Common mistakes */}
            <section id="common-mistakes">
              <h2 style={h2Style}>Common Remarketing Mistakes at Scale</h2>
              <p style={paragraphStyle}>
                Most of the damage comes from six repeat offenders.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Lists below the size floor.</strong> No impressions because the list is under the floor. Merge segments.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Customer Match left to expire.</strong> The list shrinks and the campaign pauses. Refresh 100+ members inside 540 days.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>No purchaser exclusions.</strong> Buyers keep seeing ads. Add exclusions to acquisition and cart campaigns.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Overlapping campaigns.</strong> All eligible ads enter one auction. Dedupe segments.
                </li>
                <li style={{ marginBottom: '14px' }}>
                  <strong>Long membership on a fast funnel.</strong> Bids dilute. Shorten toward the real sales cycle.
                </li>
                <li style={{ marginBottom: 0 }}>
                  <strong>Judging by last-click ROAS only.</strong> Remarketing looks like your best campaign. Run the holdout.
                </li>
              </ol>

              <h3 id="quick-diagnosis" style={h3Style}>Quick diagnosis table</h3>
              <ResponsiveTable
                headers={['Symptom', 'Likely cause', 'First check']}
                rows={[
                  ['Not serving', 'List under floor', 'Size in Audience manager'],
                  ['Campaign paused', 'Memberships expired', 'Last refresh date'],
                  ['Buyers still see ads', 'Missing exclusion', 'Campaign exclusions'],
                ]}
              />
              <p style={paragraphStyle}>
                Sage, kampaio&apos;s research agent for keywords and audiences, can review audience setup. kampaio is free in beta.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions About Google Ads Remarketing</h2>
              {FAQS.map((f) => (
                <div key={f.q} style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{f.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>
                    {f.pre}
                    {f.cite && (
                      <>
                        {' ('}
                        <Ext href={f.cite.href}>{f.cite.label}</Ext>
                        {')'}
                      </>
                    )}
                    {f.post}
                  </p>
                </div>
              ))}
            </section>

            {/* Next step / CTA */}
            <section id="next-step">
              <h2 style={h2Style}>Next Step: Audit Your Lists Before You Scale Spend</h2>
              <p style={paragraphStyle}>
                Run a 15-minute audit this week: compare each list&apos;s size to the floor, check Customer Match refresh dates against the 540-day clock, confirm purchaser exclusions, and check segment overlap. Lists became signals, so exclusions and holdouts are the controls you still own. We would start with exclusions: they take an afternoon and need no new budget.
              </p>
              <p style={paragraphStyle}>
                The <a href="/blog/google-ads-optimization" style={linkStyle}>Google Ads optimization pillar</a> covers surrounding checks. For an extra pass on audiences, connect an account to kampaio, free in beta.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Get an extra pass on your audiences
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Connect a Google Ads account and Sage reviews your audience setup. kampaio is free in beta.
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
                  Start free
                </a>
              </div>

              <p style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>Sources</p>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8', paddingLeft: '20px', marginBottom: '24px' }}>
                <li>
                  Google Ads Help:{' '}
                  {[
                    ['2472738', H_2472738],
                    ['2701222', H_2701222],
                    ['6379332', H_6379332],
                    ['2453998', H_2453998],
                    ['2497941', H_2497941],
                    ['2549058', H_2549058],
                    ['6034106', H_6034106],
                    ['4782789', H_4782789],
                    ['13541369', H_13541369],
                    ['12003020', H_12003020],
                  ].map(([id, href], i, arr) => (
                    <span key={id}>
                      <Ext href={href}>{id}</Ext>
                      {i < arr.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </li>
                <li>
                  Google Ads Developer Blog: <Ext href={DEV_CM}>Customer Match</Ext>, <Ext href={DEV_DG}>Demand Gen</Ext>
                </li>
                <li>
                  <Ext href={G_NCA}>Google: new customer acquisition</Ext>
                </li>
                <li>
                  <Ext href={SER}>Search Engine Roundtable</Ext>, <Ext href={PPCHERO}>PPC Hero</Ext>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <KeepReading slug={SLUG} category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
