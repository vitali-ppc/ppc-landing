'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { KeyTakeaways, BigStat, Callout, Steps, Step } from '../../../components/blog/primitives';

const SLUG = 'chatgpt-shopping';
const TITLE = 'ChatGPT Shopping: Get Your Products Listed and Measure It';
const DESCRIPTION =
  'How a Shopify or Google Shopping store gets its products into ChatGPT and AI Mode answers, which feed fixes matter, and how to measure before and after.';
const PUBLISHED = '2026-11-18T00:00:00.000Z';

const OPENAI_BUY = 'https://openai.com/index/buy-it-in-chatgpt/';
const OPENAI_DISCOVERY = 'https://openai.com/index/powering-product-discovery-in-chatgpt/';
const OPENAI_MERCHANTS = 'https://chatgpt.com/merchants/';
const OPENAI_BOTS = 'https://platform.openai.com/docs/bots';
const GOOGLE_UCP_DEV = 'https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/';
const GOOGLE_UCP_UPDATES = 'https://blog.google/products-and-platforms/products/shopping/ucp-updates/';
const GMC_UCP_HUB = 'https://support.google.com/merchants/answer/16992327';
const SHOPIFY_HELP = 'https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/chatgpt';
const SHOPIFY_NEWS = 'https://www.shopify.com/news/agentic-commerce-momentum';
const CNBC_MAR = 'https://www.cnbc.com/2026/03/20/open-ai-agentic-shopping-etsy-shopify-walmart-amazon.html';
const CNBC_WALLET = 'https://www.cnbc.com/2026/11/13/openai-chatgpt-wallet-dot-purchases.html';
const FORRESTER = 'https://www.forrester.com/blogs/what-it-means-that-the-leader-in-agentic-commerce-just-pulled-back/';

// An FAQ answer is a run of plain strings and cited links. The visible answer and the
// FAQPage schema are both built from these parts, so the markup says exactly what the page says.
type Cite = { label: string; href: string };
type Faq = { q: string; parts: (string | Cite)[] };

const FAQS: Faq[] = [
  {
    q: 'Can you use ChatGPT for shopping?',
    parts: [
      "Yes, in the U.S.: ChatGPT shows product results in answers, and purchases complete on the merchant's own site or app (",
      { label: 'OpenAI, 2026', href: OPENAI_MERCHANTS },
      "). Check price and availability on the merchant's site.",
    ],
  },
  {
    q: 'Which AI is best for shopping?',
    parts: [
      'There is no verified head-to-head, so we do not rank. The better question for a store owner is which surfaces can show your products: ChatGPT through Shopify Catalog or a feed, Google AI Mode and Gemini through Merchant Center.',
    ],
  },
  {
    q: 'How do I use AI for shopping?',
    parts: [
      'Describe your budget, use case and must-have features, ask for comparisons, then verify price and availability on the store. Copy that style in your panel.',
    ],
  },
  {
    q: 'Can I sell my products through ChatGPT?',
    parts: [
      'Yes, through discovery, with checkout on your own site. Shopify and Etsy catalogs are integrated; other merchants apply to share a feed (',
      { label: 'OpenAI, 2026', href: OPENAI_MERCHANTS },
      '). On Shopify, the store must sell to U.S. customers, have eligible products, accept the Agentic Storefronts Supplemental Terms and fill in its policies (',
      { label: 'Shopify Help, 2026', href: SHOPIFY_HELP },
      ').',
    ],
  },
  {
    q: 'Do I need a product feed for ChatGPT if I am on Shopify?',
    parts: [
      'No application is needed if you sell through Shopify or Etsy and the Shopify conditions are met. A direct feed is for other merchants, and richer feed data helps products surface with more accurate information (',
      { label: 'OpenAI, 2026', href: OPENAI_MERCHANTS },
      ').',
    ],
  },
  {
    q: 'Does ChatGPT shopping cost anything for merchants?',
    parts: [
      'Purchases on your own site carry no fees (',
      { label: 'OpenAI, 2026', href: OPENAI_MERCHANTS },
      '), and Shopify lists none beyond standard payment processing.',
    ],
  },
];

const faqText = (f: Faq) => f.parts.map((p) => (typeof p === 'string' ? p : p.label)).join('');

const SOURCES: { label: string; href: string }[] = [
  { label: 'OpenAI, "Buy it in ChatGPT: Instant Checkout and the Agentic Commerce Protocol," Sep 29, 2025', href: OPENAI_BUY },
  { label: 'OpenAI, "Powering Product Discovery in ChatGPT," Mar 24, 2026', href: OPENAI_DISCOVERY },
  { label: 'OpenAI, ChatGPT merchants page', href: OPENAI_MERCHANTS },
  { label: 'OpenAI, bots documentation (OAI-SearchBot)', href: OPENAI_BOTS },
  { label: 'Google Developers Blog, "Under the Hood: Universal Commerce Protocol (UCP)," Jan 11, 2026', href: GOOGLE_UCP_DEV },
  { label: 'Google, UCP updates, Mar 19, 2026', href: GOOGLE_UCP_UPDATES },
  { label: 'Google Merchant Center Help, UCP integration hub', href: GMC_UCP_HUB },
  { label: 'Shopify Help, "Selling on ChatGPT"', href: SHOPIFY_HELP },
  { label: 'Shopify, "Agentic commerce momentum," Mar 24, 2026', href: SHOPIFY_NEWS },
  { label: 'CNBC, Mar 20, 2026 (Emily Pfeiffer, Walmart)', href: CNBC_MAR },
  { label: 'CNBC, "ChatGPT Wallet," Nov 13, 2026', href: CNBC_WALLET },
  { label: 'Forrester blog, "What it means that the leader in agentic commerce just pulled back," Mar 7, 2026', href: FORRESTER },
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
      'chatgpt shopping, chatgpt shopping merchants, sell on chatgpt, shopify chatgpt, google ai mode shopping, universal commerce protocol, agentic commerce protocol, merchant center, product feed, OAI-SearchBot, Kampaio',
    inLanguage: 'en',
    wordCount: 2350,
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
    { id: 'tldr', title: 'TL;DR: how a store gets into ChatGPT shopping and AI Mode', level: 1 },
    { id: 'what-chatgpt-shopping-is', title: 'What ChatGPT shopping is now', level: 1 },
    { id: 'discovery-checkout', title: 'Discovery in ChatGPT, checkout on your own site', level: 2 },
    { id: 'organic-not-ads', title: 'Organic product results, not ads', level: 2 },
    { id: 'timeline', title: 'ChatGPT shopping timeline: September 2025 to November 2026', level: 1 },
    { id: 'two-paths', title: 'How products get in: the ChatGPT path vs the Google path', level: 1 },
    { id: 'fix-the-feed', title: 'Fix the feed first: what to change in Merchant Center and your Shopify catalog', level: 1 },
    { id: 'measure', title: 'Measure before and after: the prompt panel and the tracking table', level: 1 },
    { id: 'prompt-panel', title: 'Build a fixed prompt panel of 10-20 buyer questions', level: 2 },
    { id: 'platform-numbers', title: 'Read the numbers the platforms give you', level: 2 },
    { id: 'baseline-rerun', title: 'Baseline, fix, re-run after about 4 weeks', level: 2 },
    { id: 'shopping-budget', title: 'What this changes for your Shopping budget', level: 1 },
    { id: 'faq', title: 'Frequently asked questions', level: 1 },
    { id: 'next-step', title: 'Check your product feed health with Kampaio', level: 1 },
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
  const listStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px', paddingLeft: '24px' };
  const tableNoteStyle: React.CSSProperties = { fontSize: '15px', lineHeight: '1.7', color: '#64748b', marginTop: '-16px', marginBottom: '32px' };

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
              Google Ads · Shopping
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>November 18, 2026 · 12 min read</span>
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
                ChatGPT shopping shows products inside answers and sends shoppers to the store&apos;s own checkout. Shopify stores selling to U.S. customers are included through Shopify Catalog if conditions are met (<Ext href={SHOPIFY_HELP}>Shopify Help, 2026</Ext>). Other stores apply with a feed. Fix the feed, then re-run the same buyer prompts.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: how a store gets into ChatGPT shopping and AI Mode</h2>
              <p style={paragraphStyle}>
                A store gets into ChatGPT shopping through its product data, and that data is the one lever you control.
              </p>

              {/* VISUAL 1: KeyTakeaways: the TL;DR in five lines */}
              <KeyTakeaways
                items={[
                  <span key="k1">
                    <strong>Now:</strong> organic product results in ChatGPT, with the purchase completed on your own site or app (<Ext href={OPENAI_MERCHANTS}>OpenAI, 2026</Ext>).
                  </span>,
                  <span key="k2">
                    <strong>Two paths:</strong> ChatGPT reads Shopify Catalog or an OpenAI feed. Google AI Mode and Gemini work through Merchant Center.
                  </span>,
                  <span key="k3">
                    <strong>The feed is the lever:</strong> the same cleanup you do for Shopping.
                  </span>,
                  <span key="k4">
                    <strong>Measure with a fixed prompt panel:</strong> the same 10-20 buyer questions, before and after.
                  </span>,
                  <span key="k5">
                    <strong>No guaranteed result:</strong> we found no verified uplift data for feed fixes.
                  </span>,
                ]}
              />
            </section>

            {/* What it is */}
            <section id="what-chatgpt-shopping-is">
              <h2 style={h2Style}>What ChatGPT shopping is now</h2>
              <p style={paragraphStyle}>
                ChatGPT shopping is product discovery inside a ChatGPT answer: the shopper describes what they want, and ChatGPT lists products with images, prices and details. It is live for U.S. users (<Ext href={OPENAI_MERCHANTS}>OpenAI, 2026</Ext>).
              </p>

              <h3 id="discovery-checkout" style={h3Style}>Discovery in ChatGPT, checkout on your own site</h3>
              <p style={paragraphStyle}>
                On Shopify, checkout happens on the store&apos;s own checkout, with no fees beyond standard payment processing (<Ext href={SHOPIFY_HELP}>Shopify Help, 2026</Ext>). OpenAI says the same about purchases on your own site. The plumbing is the Agentic Commerce Protocol (ACP), which OpenAI and Stripe built so stores can share product data with ChatGPT (<Ext href={OPENAI_BUY}>OpenAI, 2025</Ext>).
              </p>

              <h3 id="organic-not-ads" style={h3Style}>Organic product results, not ads</h3>
              <p style={paragraphStyle}>
                OpenAI calls ChatGPT product results &quot;organic and unsponsored&quot; (<Ext href={OPENAI_BUY}>OpenAI, 2025</Ext>). This guide covers only the organic results.
              </p>
            </section>

            {/* Timeline */}
            <section id="timeline">
              <h2 style={h2Style}>ChatGPT shopping timeline: September 2025 to November 2026</h2>
              <p style={paragraphStyle}>
                A launch that overpromised, a rollback in March 2026, and a pivot to product discovery.
              </p>

              {/* VISUAL 2: ResponsiveTable: dated timeline with linked sources */}
              <ResponsiveTable
                headers={['Date', 'What happened', 'Source']}
                rows={[
                  ['Sep 29, 2025', 'OpenAI launches Instant Checkout powered by ACP, starting with U.S. Etsy sellers. "Over a million Shopify merchants" announced as coming soon.', <Ext key="s1" href={OPENAI_BUY}>OpenAI</Ext>],
                  ['Jan 11, 2026', 'Google publishes the Universal Commerce Protocol (UCP) with Shopify, Etsy, Wayfair, Target and Walmart, plus 20+ endorsing partners.', <Ext key="s2" href={GOOGLE_UCP_DEV}>Google Developers Blog</Ext>],
                  ['Feb 2026', 'Roughly 30 Shopify merchants are available via Instant Checkout, per Forrester principal analyst Emily Pfeiffer, speaking to CNBC.', <Ext key="s3" href={CNBC_MAR}>CNBC</Ext>],
                  ['Mar 7, 2026', 'Forrester writes that OpenAI "nixed" Instant Checkout, citing The Information.', <Ext key="s4" href={FORRESTER}>Forrester</Ext>],
                  ['Mar 19, 2026', 'UCP adds Cart, Catalog (real-time variants, inventory, pricing) and Identity Linking.', <Ext key="s5" href={GOOGLE_UCP_UPDATES}>Google</Ext>],
                  [
                    'Mar 24, 2026',
                    "OpenAI lets merchants use their own checkout and focuses on product discovery. Shopify's ChatGPT channel is active by default for eligible stores.",
                    <span key="s6">
                      <Ext href={OPENAI_DISCOVERY}>OpenAI</Ext>, <Ext href={SHOPIFY_HELP}>Shopify Help</Ext>
                    </span>,
                  ],
                  ['Nov 13, 2026', 'OpenAI announces ChatGPT Wallet, letting its agents make purchases. Initially U.S. Pro subscribers 18+.', <Ext key="s7" href={CNBC_WALLET}>CNBC</Ext>],
                ]}
              />

              {/* VISUAL 3: BigStat: the Instant Checkout gap (bold-viz) */}
              <BigStat
                value="~30"
                label="Shopify merchants live via Instant Checkout, Feb 2026"
                claim="against the 'over a million' OpenAI announced in September 2025."
                source="Source: Emily Pfeiffer (Forrester) to CNBC, Mar 20, 2026"
              />

              <p style={paragraphStyle}>
                UCP is Google&apos;s open standard for agentic commerce: shoppers can buy from eligible businesses in AI Mode and the Gemini app, if the business has an active Merchant Center account and checkout-eligible products (<Ext href={GOOGLE_UCP_DEV}>Google Developers Blog, 2026</Ext>).
              </p>

              <MascotQuote mascot="sage">
                Emily Pfeiffer, a Forrester principal analyst, told CNBC that as of February 2026 roughly 30 Shopify merchants were available via Instant Checkout, against the &apos;over a million&apos; OpenAI announced in September 2025. Read that gap before you read any forecast.
              </MascotQuote>

              <p style={paragraphStyle}>
                OpenAI&apos;s March 24 statement explains the pivot: it is &quot;allowing merchants to use their own checkout experiences while we focus our efforts on product discovery&quot; (<Ext href={OPENAI_DISCOVERY}>OpenAI, 2026</Ext>). So this guide covers discovery data, not checkout.
              </p>
              <p style={paragraphStyle}>
                Walmart, as reported by CNBC, found conversion rates three times lower for products sold directly in ChatGPT than for those that sent users to its own site (<Ext href={CNBC_MAR}>CNBC, 2026</Ext>). It is one retailer&apos;s number, not a forecast for your store.
              </p>
            </section>

            {/* Two paths */}
            <section id="two-paths">
              <h2 style={h2Style}>How products get in: the ChatGPT path vs the Google path</h2>
              <p style={paragraphStyle}>
                ChatGPT and Google AI Mode take product data from two different places, so check each path separately. On Shopify, ChatGPT reads the Shopify catalog data; a Merchant Center fix feeds the Google path.
              </p>

              {/* VISUAL 4: ResponsiveTable: ChatGPT path vs Google path, 7 rows */}
              <ResponsiveTable
                headers={['', 'ChatGPT shopping', 'Google AI Mode / Gemini']}
                rows={[
                  ['Where the data comes from', 'Shopify Catalog, Etsy catalog, or a product feed shared via ACP', 'Your Merchant Center account and checkout-eligible products'],
                  ['Shopify store', '"Active by default for eligible stores"', 'Ask your platform about UCP plans'],
                  ['Non-Shopify store', 'Apply to share a feed; currently a waitlist', 'Active Merchant Center account, then the UCP hub'],
                  ['What you must have set up', 'U.S. customers, eligible products, Supplemental Terms accepted, Terms, Privacy and Return policies filled in', 'Clean feed attributes, returns information, account configuration'],
                  ['Who completes checkout', 'Your own checkout', 'Depends on UCP onboarding'],
                  ['Measurement hook', 'Shopify orders with ChatGPT referral attribution, Business Hub', 'Prompt panel, open Merchant Center alerts'],
                  ['Status caveat', 'Conditions can change; re-check Shopify Help', 'Hub is a gradual rollout: U.S. first, Australia and Canada next year'],
                ]}
              />
              <p style={tableNoteStyle}>
                Sources: <Ext href={SHOPIFY_HELP}>Shopify Help</Ext>, <Ext href={OPENAI_MERCHANTS}>OpenAI merchants page</Ext>, <Ext href={GMC_UCP_HUB}>Google Merchant Center Help</Ext>.
              </p>

              <p style={paragraphStyle}>
                Not every Shopify store is in. The channel is active by default for eligible stores, and all four conditions apply at once. To check, open Shopify admin, then Sales channels, then Agentic. The opt-out sits in the same section, under ChatGPT and its Shopify Catalog access setting (<Ext href={SHOPIFY_HELP}>Shopify Help, 2026</Ext>).
              </p>
              <p style={paragraphStyle}>
                On the Google side, the Merchant Center UCP hub asks for a technical implementation, an interest form, and then sandbox onboarding (<Ext href={GMC_UCP_HUB}>Google Merchant Center Help, 2026</Ext>), which may need a developer. Your part is smaller: check whether the hub is visible in your account and clear the alerts about feed attributes, returns and account setup.
              </p>
            </section>

            {/* Fix the feed */}
            <section id="fix-the-feed">
              <h2 style={h2Style}>Fix the feed first: what to change in Merchant Center and your Shopify catalog</h2>
              <p style={paragraphStyle}>
                Fixing the feed means cleaning the product data both paths read. OpenAI says richer feed data helps products surface with more accurate information when shoppers compare options (<Ext href={OPENAI_MERCHANTS}>OpenAI, 2026</Ext>). We found no verified data on how much, so treat the fixes as an experiment. Steps 1, 8 and 9 carry the AI-specific parts; the rest is ordinary Shopping hygiene, covered in <Int href="/blog/google-shopping-feed-optimization">Google Shopping feed optimization</Int> and <Int href="/blog/google-shopping-optimization">Google Shopping optimization</Int>.
              </p>

              {/* VISUAL 5: Steps: the 10-step feed-fix list */}
              <Steps>
                <Step title="Confirm eligibility on both paths.">Check the Shopify conditions and the Agentic section, then look for the UCP hub in Merchant Center.</Step>
                <Step title="Clear Merchant Center diagnostics.">Fix disapprovals and feed, returns and account alerts first, since they already cost Shopping impressions.</Step>
                <Step title="Rewrite titles for buyers.">Lead with product type, brand and the key attribute, the way a buyer would say it in a prompt. No promo text or ALL CAPS.</Step>
                <Step title="Check identifiers.">GTIN, brand and MPN should be present and correct where the product has them.</Step>
                <Step title="Complete the attributes.">Fill color, size, material, gender, age group, condition and category, with factual descriptions of the specs a buyer would compare.</Step>
                <Step title="Sync price and availability.">
                  Keep store, Shopify catalog and Merchant Center identical. A mismatch is a classic disapproval and why a result can show the wrong price. UCP Catalog carries real-time variants, inventory and pricing (<Ext href={GOOGLE_UCP_UPDATES}>Google, 2026</Ext>).
                </Step>
                <Step title="Replace weak images.">Use a clean main image without watermark or promo overlay.</Step>
                <Step title="Publish your policies.">Terms of service, Privacy policy and Return and refund policy are required for ChatGPT eligibility; Merchant Center needs your returns information.</Step>
                <Step title="Allow OAI-SearchBot.">
                  Sites opted out of OAI-SearchBot are not shown in ChatGPT search answers, and OpenAI recommends allowing it in robots.txt (<Ext href={OPENAI_BOTS}>OpenAI, 2026</Ext>). Look in yourstore.com/robots.txt for a Disallow aimed at it. This alone does not get you into shopping results.
                </Step>
                <Step title="Log every change.">Note the date and the change, so week 4 can be read against it.</Step>
              </Steps>

              <MascotQuote mascot="mira">
                Write the title the way a buyer would say it, then look at the main image next to it. A clean background with no overlay text is what the shopper sees first.
              </MascotQuote>
            </section>

            {/* Measure */}
            <section id="measure">
              <h2 style={h2Style}>Measure before and after: the prompt panel and the tracking table</h2>
              <p style={paragraphStyle}>
                The prompt panel is a fixed list of buyer questions you run in ChatGPT and Google AI Mode, log in a sheet, and re-run after your fixes. It is an incrementality check: one change, same measurement, then compare (<Int href="/blog/incrementality-testing-google-ads">incrementality testing in Google Ads</Int>).
              </p>

              <h3 id="prompt-panel" style={h3Style}>Build a fixed prompt panel of 10-20 buyer questions</h3>
              <p style={paragraphStyle}>
                Write 10-20 questions your customers would type, worded identically every run. Mix category (&quot;best X under $Y&quot;), comparison (&quot;X vs Y&quot;), constraint (&quot;X for Z use&quot;) and brand-neutral questions.
              </p>
              <p style={paragraphStyle}>
                Log date, surface, prompt, whether your product appears (yes/no), its position, whether the price shown is correct, whether the link goes to the right page, and who else appears. Results differ by logged-in state, location, account settings and run to run, so record those; one run proves little.
              </p>

              <h3 id="platform-numbers" style={h3Style}>Read the numbers the platforms give you</h3>
              <p style={paragraphStyle}>Four hooks exist:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Shopify orders:</strong> orders flow into the admin with ChatGPT referral attribution (<Ext href={SHOPIFY_NEWS}>Shopify, 2026</Ext>).
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>GA4:</strong> check referral sessions from chatgpt.com in the GA4 referral report.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>ChatGPT Business Hub:</strong> claim your profile in ChatGPT Business Hub (directly, or via the ChatGPT Business app). It shows how often ChatGPT mentions your business and visits from ChatGPT, aggregated, and only after a certain activity level (<Ext href={SHOPIFY_HELP}>Shopify Help, 2026</Ext>).
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Merchant Center:</strong> count open alerts before and after. If tracking is shaky, fix it first with our <Int href="/blog/google-ads-conversion-tracking-not-working">conversion tracking checklist</Int>.
                </li>
              </ul>

              <MascotQuote mascot="sage">
                The Business Hub shows data only after a certain activity level, and only in aggregate. An empty Hub on a small store is not a failure; the threshold is just not met yet.
              </MascotQuote>

              <h3 id="baseline-rerun" style={h3Style}>Baseline, fix, re-run after about 4 weeks</h3>
              <p style={paragraphStyle}>
                Run the panel in week 0, apply the ten steps, then run the identical panel after about four weeks.
              </p>

              {/* VISUAL 6: ResponsiveTable: blank before/after measurement template */}
              <ResponsiveTable
                headers={['Metric', 'Where to read it', 'Baseline (week 0)', 'After fixes (week 4)', 'Change', 'Notes']}
                rows={[
                  ['Panel prompts where we appear in ChatGPT', 'Prompt panel sheet', '[count] of [N]', '[count] of [N]', '[ ]', '[ ]'],
                  ['Panel prompts where we appear in Google AI Mode', 'Prompt panel sheet', '[count] of [N]', '[count] of [N]', '[ ]', '[ ]'],
                  ['Price shown correct', 'Prompt panel sheet', '[yes/no]', '[yes/no]', '[ ]', '[ ]'],
                  ['Shopify orders with ChatGPT referral attribution', 'Shopify admin', '[count]', '[count]', '[ ]', '[ ]'],
                  ['GA4 sessions from chatgpt.com', 'GA4 referral report', '[count]', '[count]', '[ ]', '[ ]'],
                  ['Business Hub mentions and visits', 'ChatGPT Business Hub', '[count or "not shown"]', '[count or "not shown"]', '[ ]', '[ ]'],
                  ['Merchant Center open alerts', 'Merchant Center diagnostics', '[count]', '[count]', '[ ]', '[ ]'],
                ]}
              />

              {/* VISUAL 7: Callout (warning): the table is not a causal test */}
              <Callout variant="warning">
                The table cannot prove causation. Small stores will see tiny numbers, orders can be zero in both columns, and seasonality or ad spend moves both, so keep budget and promotions steady if you can.
              </Callout>
            </section>

            {/* Shopping budget */}
            <section id="shopping-budget">
              <h2 style={h2Style}>What this changes for your Shopping budget</h2>
              <p style={paragraphStyle}>
                Nothing moves out of your Shopping budget because of this. Organic results are separate from Shopping ads, and feed work pays twice, because the same Merchant Center feed drives your Shopping and Performance Max campaigns (<Int href="/blog/performance-max-optimization">Performance Max optimization</Int>, <Int href="/blog/performance-max-not-converting">Performance Max not converting</Int>).
              </p>
              <p style={paragraphStyle}>
                We do not recommend shifting ad budget into AI surfaces, since there is no verified data. Walmart&apos;s gap is the caution: appearing in an AI answer and buying on your site are different funnels, so judge this on orders.
              </p>
              <p style={paragraphStyle}>
                The Kampaio Dashboard has a product audit for Shopping and Performance Max that shows where your weak products sit. It does not check AI visibility or ChatGPT status. For the wider account, see our <Int href="/blog/google-ads-optimization">Google Ads optimization guide</Int> and the <Int href="/blog/google-shopping-agency">Google Shopping agency</Int> page.
              </p>
              <p style={paragraphStyle}>
                One more thing to watch: ChatGPT Wallet, announced Nov 13, 2026, lets ChatGPT&apos;s own agents make purchases for U.S. Pro subscribers 18+ (<Ext href={CNBC_WALLET}>CNBC, 2026</Ext>). We make no forecast about adoption.
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
              <h2 style={h2Style}>Check your product feed health with Kampaio</h2>
              <p style={paragraphStyle}>
                The Kampaio Dashboard (<Ext href="https://dashboard.kampaio.com/">dashboard.kampaio.com</Ext>) puts all your Google Ads accounts on one screen, runs a product audit for Shopping and Performance Max, and lets you edit with preview and rollback. It is free during early access and works on the Google Ads side; AI-surface checks stay in your prompt panel. AI agents for Kampaio are in development and will come later.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px 24px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  See where your weak Shopping products sit
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500 }}>
                  Connect your Google Ads accounts and run the product audit for Shopping and Performance Max on one screen.
                </p>
                <a
                  href="https://dashboard.kampaio.com/"
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
              <h2 style={h2Style}>Sources</h2>
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
