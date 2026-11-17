'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { KeyTakeaways, CompareGrid, Callout, BigStat, Steps, Step } from '../../../components/blog/primitives';

const SLUG = 'maximize-conversion-value';
const TITLE = 'Maximize Conversion Value: Which Client Accounts Should Use It';
const DESCRIPTION =
  'Maximize conversion value fits some client accounts and wrecks others. A three-gate test for agencies, with the accounts to move, keep and graduate.';
const PUBLISHED = '2026-11-16T00:00:00.000Z';

const H_7684216 = 'https://support.google.com/google-ads/answer/7684216';
const H_6268637 = 'https://support.google.com/google-ads/answer/6268637';
const H_17061251 = 'https://support.google.com/google-ads/answer/17061251';
const H_10353027 = 'https://support.google.com/google-ads/answer/10353027';
const H_10518330 = 'https://support.google.com/google-ads/answer/10518330';
const ADALYSIS_2025 = 'https://adalysis.com/blog/when-should-you-switch-max-target-bidding/';
const ADALYSIS_2023 = 'https://adalysis.com/blog/when-to-use-target-vs-max-cpa-roas-bidding-strategies-for-google-ads/';
const SAVVY = 'https://savvyrevenue.com/blog/target-roas-vs-max-conversion-value/';
const LGG = 'https://www.lgg.media/blog/maximize-conversion-value-vs-target-roas/';
const REDDIT = 'https://www.reddit.com/r/googleads/comments/1vrkoc0/target_roas_vs_maximize_conversion_value/';

type Faq = { q: string; pre: string; cite?: { label: string; href: string }; post: string };

// Visible FAQ and FAQPage schema are built from the same strings, so the markup
// says exactly what the page says.
const FAQS: Faq[] = [
  {
    q: 'What does maximize conversion value mean?',
    pre: 'A Smart Bidding strategy that tries to generate the most conversion value for a budget, spending the average daily budget in full when no target ROAS is set',
    cite: { label: 'Google Ads Help, 2026', href: H_7684216 },
    post: '.',
  },
  {
    q: 'What is the maximum conversion value?',
    pre: 'The question is ambiguous. There is no cap setting: the strategy aims for the highest total conversion value your budget can buy, not the highest value per conversion.',
    post: '',
  },
  {
    q: 'What is maximize conversion value in Google Ads?',
    pre: 'A value-based bid strategy for Search, Shopping and Demand Gen that weights bids by reported conversion value.',
    post: '',
  },
  {
    q: 'Maximize conversions vs maximize conversion value: which is better?',
    pre: 'Value bidding wins when conversion values differ and you can trust them (Gates 1 and 2); Maximize conversions wins when every conversion is worth the same.',
    post: '',
  },
  {
    q: 'Does maximize conversion value ignore my bid adjustments?',
    pre: 'Yes, except one. It does not use existing bid adjustments, but you can still set a -100% device adjustment (Google Ads Help, 2026).',
    post: '',
  },
  {
    q: 'Can I use maximize conversion value for lead generation?',
    pre: "Yes, if lead types carry different values you can trust. No if every lead is worth the same: Web Eminence's towing case points to Maximize conversions with a target CPA.",
    post: '',
  },
  {
    q: 'What are conversion value rules?',
    pre: 'They let you adjust your conversion value reporting and Smart Bidding optimization',
    cite: { label: 'Google Ads Help, 2026', href: H_10518330 },
    post: '.',
  },
];

const faqText = (f: Faq) => `${f.pre}${f.cite ? ` (${f.cite.label})` : ''}${f.post}`;

const SOURCES: { label: string; href?: string; note?: string }[] = [
  { label: 'Google Ads Help, 2026', href: H_7684216 },
  { label: 'Google Ads Help, 2026', href: H_6268637 },
  { label: 'Google Ads Help, 2026', href: H_17061251 },
  { label: 'Google Ads Help, 2026', href: H_10353027 },
  { label: 'Google Ads Help, 2026', href: H_10518330 },
  { label: 'Adalysis, 2025', href: ADALYSIS_2025 },
  { label: 'Adalysis, 2023', href: ADALYSIS_2023 },
  { label: 'savvyrevenue, 2025', href: SAVVY },
  { label: 'LGG Media, 2026', href: LGG },
  { label: 'Web Eminence, 2025 (Ryan Bowman)' },
  { label: 'Reddit r/googleads, 2026', href: REDDIT, note: '(practitioner opinion)' },
];

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
      'maximize conversion value, google ads maximize conversion value, maximize conversions, target ROAS, smart bidding, conversion value, bid strategy, conversion value rules, agency, Kampaio',
    inLanguage: 'en',
    "wordCount": 1293,
    "articleSection": "Google Ads"
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
    { id: 'quick-answer', title: 'Quick Answer: Which Accounts Should Use Maximize Conversion Value', level: 1 },
    { id: 'what-it-does', title: 'What Maximize Conversion Value Does Since the 2026 Relabel', level: 1 },
    { id: 'with-target-vs-without', title: 'With a Target Versus Without One', level: 2 },
    { id: 'max-conversions-vs-max-value', title: 'Maximize Conversions Versus Maximize Conversion Value', level: 2 },
    { id: 'three-strategies', title: 'Maximize Conversion Value vs Maximize Conversions vs Target ROAS', level: 1 },
    { id: 'three-gate-test', title: 'The Three-Gate Test for Each Client Account', level: 1 },
    { id: 'gate-1', title: 'Gate 1: Do Conversion Values Actually Differ', level: 2 },
    { id: 'gate-2', title: 'Gate 2: Can You Trust the Value Column', level: 2 },
    { id: 'gate-3', title: 'Gate 3: Does the Client Have a Return Floor', level: 2 },
    { id: 'move-or-leave', title: 'Which Client Accounts to Move and Which to Leave', level: 1 },
    { id: 'accounts-to-move', title: 'Accounts to Move to Maximize Conversion Value', level: 2 },
    { id: 'accounts-to-leave', title: 'Accounts to Leave Where They Are', level: 2 },
    { id: 'graduate-to-troas', title: 'When to Graduate to Target ROAS', level: 1 },
    { id: 'vendor-data-timing', title: "What One Vendor's Data Shows About Timing", level: 2 },
    { id: 'migration-sequence', title: 'A Safe Migration Sequence', level: 2 },
    { id: 'august-17-change', title: 'What the August 17 Change Means for This Choice', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'next-step', title: 'Run the Same Check Across Every Client Account', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
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
              Google Ads · Smart Bidding
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>November 16, 2026 · 11 min read</span>
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
                Maximize conversion value is a Google Ads Smart Bidding strategy that spends your full daily budget to get the most total conversion value, with no return target. Use it on client accounts where conversion values differ and can be trusted and there is no return floor yet. Everything else belongs on Maximize conversions, Target CPA or Target ROAS.
              </p>
              <p style={paragraphStyle}>
                This guide is for agency owners who run many client accounts. It gives a per-account decision, not a definition.
              </p>
            </section>

            {/* Quick answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>Quick Answer: Which Accounts Should Use Maximize Conversion Value</h2>
              <p style={paragraphStyle}>
                Use it on an account only when its conversion values differ, you can trust them, and the client has no hard return floor yet.
              </p>

              {/* VISUAL 1: KeyTakeaways: the per-account decision in four lines */}
              <KeyTakeaways
                items={[
                  'Use Maximize conversion value when values differ, you can trust them, and there is no hard return floor yet.',
                  'Keep Maximize conversions or Target CPA when every conversion is worth the same.',
                  'Move to Target ROAS once values are stable and the client has a return to hit.',
                  'Under 15 conversions in the past 30 days, do not set a Target ROAS on Search or Shopping (Google Ads Help).',
                ]}
              />

              <p style={paragraphStyle}>
                The flat-value failure has a practitioner version too. TTFV on r/googleads (2026-08-18, practitioner opinion in a split thread) put it this way: &quot;Max Conversions is generally not a good idea for an online store with variable prices&quot;. Gate 1 below covers that case.
              </p>
              <p style={paragraphStyle}>
                As of November 2026: without a target the strategy is still Maximize conversion value; with a target, Google&apos;s June 2026 labels call it Target ROAS, and that relabel is rolling out, not finished (<Ext href={H_10353027}>Google Ads Help, 2026</Ext>). This article covers only the value-strategy decision; for all six strategies, see <Int href="/blog/google-ads-smart-bidding-strategies">our Smart Bidding overview</Int>.
              </p>
            </section>

            {/* What it does */}
            <section id="what-it-does">
              <h2 style={h2Style}>What Maximize Conversion Value Does Since the 2026 Relabel</h2>
              <p style={paragraphStyle}>
                Maximize conversion value tries to generate the most conversion value for a given budget, and without a target ROAS it tries to spend your average daily budget in full, so a campaign spending far under budget could see spend rise significantly (<Ext href={H_7684216}>Google Ads Help, 2026</Ext>). Nothing in the strategy slows that spend down. It runs on Search, Shopping and Demand Gen, needs transaction-specific values, and ignores bid adjustments except a -100% device adjustment.
              </p>

              <h3 id="with-target-vs-without" style={h3Style}>With a Target Versus Without One</h3>
              <p style={paragraphStyle}>
                Maximize conversion value with a set target ROAS behaves like Target ROAS, and the June 2026 label for that combination is &quot;Target ROAS&quot; (Google Ads Help, 2026). The API, Editor and mobile app show new names later, so expect mixed labels. Without a target, it is the only value strategy that spends to the budget with no return floor.
              </p>

              <h3 id="max-conversions-vs-max-value" style={h3Style}>Maximize Conversions Versus Maximize Conversion Value</h3>
              <p style={paragraphStyle}>
                Google says Maximize conversions pursues the most conversions regardless of value, while Maximize conversion value may bid higher for auctions that bring greater value (Google Ads Help, 2026).
              </p>
              <p style={paragraphStyle}>
                On flat-value accounts that difference vanishes, which is the point of Gate 1 below.
              </p>
            </section>

            {/* Three strategies */}
            <section id="three-strategies">
              <h2 style={h2Style}>Maximize Conversion Value vs Maximize Conversions vs Target ROAS</h2>
              <p style={paragraphStyle}>
                Pick the strategy by asking which one you would regret on this account. The grid below sets the three side by side.
              </p>

              {/* VISUAL 2: CompareGrid: the three strategies side by side */}
              <CompareGrid
                columns={[
                  { name: 'Maximize conversions', bestFor: 'Most conversions for the budget; no ROI target; all conversions equal', traits: [{ label: 'Spends the full budget by design', has: true }, { label: 'Has a return floor', has: false }, { label: 'Weights bids by conversion value', has: false }] },
                  { name: 'Maximize conversion value', bestFor: 'Most conversion value for the budget; no ROI target; values differ', traits: [{ label: 'Spends the full budget by design', has: true }, { label: 'Has a return floor', has: false }, { label: 'Weights bids by conversion value', has: true }], highlight: true },
                  { name: 'Target ROAS', bestFor: 'Conversion value at a specific ROI target; values differ', traits: [{ label: 'Spends the full budget by design', has: false }, { label: 'Has a return floor', has: true }, { label: 'Weights bids by conversion value', has: true }] },
                ]}
              />

              <p style={paragraphStyle}>
                Target ROAS carries the only eligibility figure: at least 15 conversions in the past 30 days on Search and Shopping (<Ext href={H_6268637}>Google Ads Help, 2026</Ext>). LGG Media notes it can spend under budget to hold its target (<Ext href={LGG}>LGG Media, 2026</Ext>). That is the Target ROAS regret; the Maximize conversion value regret is spend with no floor.
              </p>
            </section>

            {/* Three-gate test */}
            <section id="three-gate-test">
              <h2 style={h2Style}>The Three-Gate Test for Each Client Account</h2>
              <p style={paragraphStyle}>
                Run each client account through three gates; a &quot;no&quot; at any gate sends it away from Maximize conversion value. This is our triage method, not a Google rule.
              </p>

              <h3 id="gate-1" style={h3Style}>Gate 1: Do Conversion Values Actually Differ</h3>
              <p style={paragraphStyle}>
                Value is the one thing this strategy adds over Maximize conversions, so if every conversion is worth the same, there is nothing to optimize (Google Ads Help, 2026).
              </p>
              <p style={paragraphStyle}>
                Ryan Bowman at Web Eminence reported CPC of $8-10 before the switch and $43 on one day after it. Cost per lead rose from about $45 to $150, overall cost rose 130%, and <a href="/blog/google-ads-roas-dropped-suddenly" style={{ color: '#764ba2', textDecoration: 'underline' }}>ROAS fell</a> 24% after a July test. His rule: if all conversions are worth the same, use Maximize conversions with a target CPA. Those are one account&apos;s numbers, so read them as a mechanism, not a rate.
              </p>

              <h3 id="gate-2" style={h3Style}>Gate 2: Can You Trust the Value Column</h3>
              <p style={paragraphStyle}>
                A value strategy believes whatever sits in the conversion value column, so the column has to be right before the switch.
              </p>

              {/* VISUAL 3: Callout (warning): junk values produce junk bids */}
              <Callout variant="warning" title="Junk values in, junk bids out">
                LGG Media&apos;s warning, paraphrased: if a junk lead can carry value, Smart Bidding will pay to find more junk leads (LGG Media, 2026). Verify the value column before the switch.
              </Callout>

              <p style={paragraphStyle}>
                Our checks are these: compare reported purchase value with the store or CRM, and look at refunds and shipping inside the value. Web Eminence&apos;s $10 signup, $50 quote request and $200 sale is their illustration, not a benchmark. Google says to wait 1-2 conversion cycles after changing how value is reported.
              </p>
              <p style={paragraphStyle}>
                Broken tag? <Int href="/blog/google-ads-conversion-tracking-not-working">Fix conversion tracking first</Int>. For Performance Max, see <Int href="/blog/performance-max-single-conversion-signal-steering">steering Performance Max with one conversion signal</Int>.
              </p>

              <h3 id="gate-3" style={h3Style}>Gate 3: Does the Client Have a Return Floor</h3>
              <p style={paragraphStyle}>
                Google says that with an ROI goal such as a target ROAS, you may want a Target ROAS strategy instead (Google Ads Help, 2026). Maximize conversion value has no such floor built in, so the client&apos;s margin decides whether it is safe.
              </p>
              <p style={paragraphStyle}>
                savvyrevenue states the arithmetic: &quot;If you have a 10% margin, you need a 1,000% ROAS just to break even&quot; (<Ext href={SAVVY}>savvyrevenue, 2025</Ext>).
              </p>

              <MascotQuote mascot="buzz">
                Google&apos;s own Target ROAS page asks for at least 15 conversions in the past 30 days on Search and Shopping. Under that line, keep the account on a Maximize strategy and leave the target alone.
              </MascotQuote>
            </section>

            {/* Move or leave */}
            <section id="move-or-leave">
              <h2 style={h2Style}>Which Client Accounts to Move and Which to Leave</h2>
              <p style={paragraphStyle}>
                Move accounts that pass all three gates, keep flat-value and low-volume accounts, and graduate accounts with a return floor and stable values. Verdicts are ours, not Google guidance.
              </p>

              {/* VISUAL 4: ResponsiveTable: account type to verdict */}
              <ResponsiveTable
                headers={['Account type', 'Values vary?', 'Values trustworthy?', 'ROI floor?', 'Verdict (ours)']}
                rows={[
                  ['E-commerce, varied baskets, 15+ conversions in 30 days, no margin target', 'Yes', 'Yes, if values are verified', 'No', 'Move to Maximize conversion value'],
                  ['E-commerce, known break-even ROAS, stable values', 'Yes', 'Yes', 'Yes', 'Graduate to Target ROAS'],
                  ['Lead gen, all leads equal value', 'No', 'n/a', 'Usually', 'Keep on Maximize conversions or Target CPA'],
                  ['Lead gen, different conversion-type values', 'Yes', 'Yes, if values are verified', 'Maybe', 'Move; graduate once a floor exists'],
                  ['Under 15 conversions in 30 days', 'Any', 'Any', 'Any', 'Keep on a Maximize strategy; no Target ROAS'],
                  ['Budget-limited, on a target strategy after August 17', 'Any', 'Any', 'Any', 'Hold: re-check the target first'],
                  ['Unverified or broken value tracking', 'Any', 'No', 'Any', 'Hold and fix tracking first'],
                ]}
              />

              <h3 id="accounts-to-move" style={h3Style}>Accounts to Move to Maximize Conversion Value</h3>
              <p style={paragraphStyle}>
                Varied baskets with verified values and no margin target are the cleanest fit. Scorup on r/googleads (2026-08-18, practitioner opinion), answering a store with 1,000+ items and a break-even ROAS of 2.7: &quot;I&apos;d go with Maximize conversion value for now.&quot; Two other commenters recommended Target ROAS: one opinion in a split thread.
              </p>

              <h3 id="accounts-to-leave" style={h3Style}>Accounts to Leave Where They Are</h3>
              <p style={paragraphStyle}>
                Flat-value lead gen stays on Maximize conversions or Target CPA, per Web Eminence and Google&apos;s &quot;all conversions treated equally&quot; row. Low-volume accounts stay too: a separate 2023 Adalysis article gives a general rule of thumb that campaigns with 15 or fewer conversions each month suit Max Conversion or Max Conversion Value (<Ext href={ADALYSIS_2023}>Adalysis, 2023</Ext>), matching Google&apos;s 15-conversion floor. Broken tracking comes off the list until values are verified.
              </p>
            </section>

            {/* Graduate */}
            <section id="graduate-to-troas">
              <h2 style={h2Style}>When to Graduate to Target ROAS</h2>
              <p style={paragraphStyle}>
                Graduate when values are stable and the client has a return to hit, not on a calendar date. The idea of Maximize conversion value as a learning stage before Target ROAS is common ground (savvyrevenue and LGG Media both say it), not ours.
              </p>

              <h3 id="vendor-data-timing" style={h3Style}>What One Vendor&apos;s Data Shows About Timing</h3>

              {/* VISUAL 5: BigStat: the Adalysis 73-conversion crossover */}
              <BigStat
                value="73"
                label="conversions per month"
                claim="is where Adalysis found campaigns more likely to use Target ROAS than Maximize conversion value."
                source="Source: Adalysis, 16,825 search campaigns, three months in 2025"
              />

              <p style={paragraphStyle}>
                <Ext href={ADALYSIS_2025}>Adalysis</Ext>, in a November 18, 2025 article, analyzed 16,825 search campaigns over three months in 2025. It describes what advertisers do, not Google guidance. By monthly revenue per campaign: under $4,000, Max Conversion Value is primary; $4,000-$9,000, both are used equally; $9,000-$24,500, Target ROAS is more common; above $24,500, it is primary.
              </p>
              <p style={paragraphStyle}>
                Adalysis suggests waiting for 25-50 conversions and $4,000 in monthly revenue, calls its figures &quot;benchmarks, not rules&quot;, and advises keeping brand and non-brand separate.
              </p>

              <h3 id="migration-sequence" style={h3Style}>A Safe Migration Sequence</h3>
              <p style={paragraphStyle}>
                Assembled from Google&apos;s Target ROAS page. Switch in a stable week, not mid-promotion: LGG Media notes a Learning status follows a strategy change.
              </p>

              {/* VISUAL 6: Steps: the five-step migration from Maximize conversion value to Target ROAS */}
              <Steps>
                <Step title="Confirm your values">Report values across the relevant campaigns for 4 weeks or 1-2 conversion cycles, whichever is longer (Google Ads Help, 2026).</Step>
                <Step title="Set the first target from your own data">Add the Conv. value/cost column, multiply by 100, and exclude the recent conversion delay period.</Step>
                <Step title="Run it as an experiment">Use Save as experiment instead of a hard switch.</Step>
                <Step title="Adjust gradually">Lower the target gradually for volume, raise it for value.</Step>
                <Step title="Leave it alone">Give any new target 1-2 conversion cycles before judging.</Step>
              </Steps>

              <p style={paragraphStyle}>
                For the follow-up, see how to <Int href="/blog/how-to-scale-google-ads-without-losing-roas">scale spend without losing ROAS</Int>.
              </p>
            </section>

            {/* August 17 */}
            <section id="august-17-change">
              <h2 style={h2Style}>What the August 17 Change Means for This Choice</h2>
              <p style={paragraphStyle}>
                Since August 17, 2026, budget-limited target campaigns deliver closer to the stated target, which makes an old, loose target a live risk and makes Maximize conversion value the explicit no-target option (<Ext href={H_17061251}>Google Ads Help, 2026</Ext>).
              </p>

              {/* VISUAL 3b: Callout (insight): Google's own option and its warning */}
              <Callout variant="insight" title="Google's option, with its warning">
                Google lists switching to Maximize Conversions or Maximize Conversion Value as one choice for affected campaigns, and warns that without a target &quot;your actual CPA or ROAS will fluctuate as you adjust your budget&quot;.
              </Callout>

              <p style={paragraphStyle}>
                Google states its Bid Target Adjustment Tool as available starting on July 6, 2026. If your drop already happened, <Int href="/blog/target-roas-underperforming-after-google-update">diagnose a Target ROAS drop after August 17</Int>; for the status flag, see <Int href="/blog/google-ads-bid-strategy-status-limited">bid strategy status Limited</Int>.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
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

            {/* Next step */}
            <section id="next-step">
              <h2 style={h2Style}>Run the Same Check Across Every Client Account</h2>
              <p style={paragraphStyle}>
                Run the three gates on your three largest-spend client accounts this week, then change one account at a time.
              </p>
              <p style={paragraphStyle}>
                The Kampaio dashboard covers the part of this check that drifts between reviews: across every account you connect, its automatic checks flag impressions lost to budget, ROAS below target, spend spikes, and <a href="/blog/google-ads-not-spending-full-budget" style={{ color: '#764ba2', textDecoration: 'underline' }}>budget</a> problems on one screen. It does not change bid strategies by itself; you make each change, with a preview first. See <Int href="/">how Kampaio works</Int>.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ol style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px', overflowWrap: 'anywhere' }}>
                {SOURCES.map((s, i) => (
                  <li key={i}>
                    {s.label}
                    {s.href && (
                      <>
                        {' ('}
                        <Ext href={s.href}>{s.href}</Ext>
                        {')'}
                      </>
                    )}
                    {s.note ? ` ${s.note}` : ''}
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
