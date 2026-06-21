'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import {
  CompareGrid,
  Steps,
  Step,
  KeyTakeaways,
} from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-shopping-feed-optimization#article',
    headline: 'Google Shopping Feed Optimization: The Attribute-by-Attribute Build Order (2026)',
    description:
      'A setup-first guide to Google Shopping feed optimization: the attribute priority order, exact character limits, and the disapproval triggers that vendor "optimize your titles" advice skips. Built for PPC managers who own the feed.',
    image: 'https://www.kampaio.com/og/google-shopping-feed-optimization.png',
    datePublished: '2026-06-21T00:00:00.000Z',
    dateModified: '2026-06-21T00:00:00.000Z',
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-shopping-feed-optimization',
    },
    keywords:
      'google shopping feed optimization, product feed, merchant center, product titles, GTIN, product_type, google product category, custom labels, supplemental feed, performance max',
    wordCount: 2120,
    articleSection: 'Google Ads',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does it mean to optimize a Google Shopping feed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It means structuring your product attributes so items stay approved, match the right search queries, and earn clicks. In practice that is fixing required attributes first, then titles and categories, then descriptions, images, and labels.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which feed attributes matter most for Google Shopping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Title, product_type, and google_product_category drive which queries you match. GTIN, price, availability, and image_link decide whether you serve at all. Fix the serving attributes first.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the ideal product title for Google Shopping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google allows 1 to 150 characters and recommends using the full length, with the most important terms in the first 70 since that is what shoppers usually see.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need a GTIN for every product?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Send a GTIN for every product that has one. It is strongly expected in most categories, and retailers adding correct GTINs averaged a 20 percent increase in clicks. Custom or handmade products without a GTIN are an exception.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between product_type and google_product_category?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'google_product_category uses Google fixed taxonomy to classify the product for Google. product_type uses your own taxonomy for your reporting and bidding control. Send both, 2 to 5 levels deep.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do supplemental feeds work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A supplemental feed adds or overrides attributes on top of your primary feed using a shared id, without changing the source export. Teams use it for bulk title rewrites, custom labels, and GTIN backfill.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does feed optimization matter for Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, more than anywhere else. Performance Max hides placement and query data, so the feed is the main lever you control. Of 51 public discussions we analyzed, Performance Max was the most-raised theme at 27 percent.',
        },
      },
    ],
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
        name: 'Google Shopping Feed Optimization',
        item: 'https://www.kampaio.com/blog/google-shopping-feed-optimization',
      },
    ],
  };

  const tableOfContents = [
    { id: 'short-version', title: 'The Short Version: Build for Disapproval-Prevention First', level: 1 },
    { id: 'what-it-changes', title: 'What Feed Optimization Actually Changes', level: 1 },
    { id: 'priority-matrix', title: 'The Attribute Priority Matrix', level: 1 },
    { id: 'tier-1', title: 'Tier 1: Get Served at All', level: 1 },
    { id: 'tier-2', title: 'Tier 2: Win Impressions', level: 1 },
    { id: 'tier-3', title: 'Tier 3: Lift CTR and Control Segmentation', level: 1 },
    { id: 'supplemental-feeds', title: 'Supplemental Feeds and Feed Rules', level: 1 },
    { id: 'pmax-fit', title: 'How Feed Optimization Fits Performance Max', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'summary', title: 'Build the Feed Once, Then Let It Compound', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const h2Style = {
    fontSize: '32px',
    fontWeight: 700 as const,
    color: '#1e293b',
    marginBottom: '24px',
    marginTop: '48px',
    lineHeight: '1.3',
  };
  const h3Style = {
    fontSize: '24px',
    fontWeight: 700 as const,
    color: '#1e293b',
    marginBottom: '16px',
    marginTop: '40px',
    lineHeight: '1.3',
  };
  const pStyle = {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#1e293b',
    marginBottom: '32px',
  };
  const linkStyle = { color: '#667eea', textDecoration: 'underline' as const };

  const tierColors: Record<string, string> = {
    'Tier 1': '#ef4444',
    'Tier 2': '#f59e0b',
    'Tier 3': '#10b981',
  };

  const matrixRows = [
    { attr: 'id', tier: 'Tier 1', risk: 'Required, unique, stable', limit: 'Keep stable; changing it resets history' },
    { attr: 'price', tier: 'Tier 1', risk: 'Required; must match landing page', limit: 'Currency + value, synced' },
    { attr: 'availability', tier: 'Tier 1', risk: 'Required; must match landing page', limit: 'in_stock / out_of_stock / preorder' },
    { attr: 'image_link', tier: 'Tier 1', risk: 'Required; placeholders disapproved', limit: 'High-res, no watermark or promo text' },
    { attr: 'gtin', tier: 'Tier 1', risk: 'Strongly expected when it exists', limit: 'Valid GTIN; +20% clicks on average' },
    { attr: 'condition', tier: 'Tier 1', risk: 'Required if not new', limit: 'new / refurbished / used' },
    { attr: 'title', tier: 'Tier 2', risk: 'Required; affects matching', limit: '1-150 chars, key terms in first 70' },
    { attr: 'product_type', tier: 'Tier 2', risk: 'Optional but high impact', limit: 'Your taxonomy, 2-5 levels deep' },
    { attr: 'google_product_category', tier: 'Tier 2', risk: 'Recommended', limit: 'Google taxonomy, 2-3+ levels deep' },
    { attr: 'brand', tier: 'Tier 2', risk: 'Required for most categories', limit: 'Exact brand name' },
    { attr: 'description', tier: 'Tier 3', risk: 'Optional', limit: '~500 chars, match landing page' },
    { attr: 'custom_label_0-4', tier: 'Tier 3', risk: 'Optional', limit: 'Margin, price band, season tags' },
    { attr: 'item_group_id', tier: 'Tier 3', risk: 'Optional', limit: 'Groups variants of one product' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-shopping-feed-optimization" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              Google Ads &middot; Shopping
            </div>
            <h1
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '24px',
                lineHeight: '1.2',
              }}
            >
              Google Shopping Feed Optimization: The Attribute-by-Attribute Build Order (2026)
            </h1>
            <p
              style={{
                fontSize: '20px',
                color: '#64748b',
                marginBottom: '32px',
                lineHeight: '1.6',
                fontWeight: '500',
              }}
            >
              Most feed guides collapse into &quot;optimize your titles.&quot; That skips the order
              that actually protects spend. Here is the attribute priority order, the exact limits,
              and the disapproval triggers, for the PPC manager who owns the feed.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '40px',
                paddingBottom: '32px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                >
                  B6
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2px',
                  }}
                >
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>
                    By Kampaio Team
                  </span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>
                    June 21, 2026 &middot; 9 min read
                  </span>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <KeyTakeaways
              items={[
                'Build in tiers: required attributes first, impression attributes next, CTR attributes last.',
                'Tier 1 (id, price, availability, image_link, GTIN, condition) keeps products approved and serving.',
                'Tier 2 (title, product_type, google_product_category, brand) decides which queries you match.',
                'Tier 3 (description, images, custom labels) lifts CTR and lets you segment campaigns.',
                'The feed is the only lever you fully control inside Performance Max.',
              ]}
            />

            {/* Table of Contents */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '40px',
              }}
            >
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1e293b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                Table of Contents
                <span
                  style={{
                    transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  &#9660;
                </span>
              </button>
              {isTableOfContentsOpen && (
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid #e5e7eb',
                  }}
                >
                  {tableOfContents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{
                        padding: '8px 0',
                        paddingLeft: `${(item.level - 1) * 20}px`,
                        cursor: 'pointer',
                        color: '#64748b',
                        fontSize: '16px',
                        lineHeight: '1.4',
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

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Section 1 */}
            <section id="short-version">
              <h2 style={h2Style}>The Short Version: Build for Disapproval-Prevention First, CTR Last</h2>
              <p style={pStyle}>
                Google Shopping feed optimization is the work of structuring your product attributes
                so each item serves on the right queries, stays approved, and earns the click. The
                fastest way to get it wrong is to start with title keywords. Build in tiers instead:
                first the attributes that keep products approved, then the ones that win impressions,
                then the ones that lift CTR.
              </p>
              <p style={pStyle}>
                Most vendor guides collapse this into &quot;optimize your titles.&quot; That skips
                the order that actually protects spend. A perfect title on a disapproved product
                earns zero clicks.
              </p>

              <MascotQuote mascot="sage">
                Across 51 public discussions on feed optimization we mined this month, Performance
                Max was the single most-raised theme at 27 percent. Feed work and PMax control are
                now the same conversation, so I build the feed as if it is the only lever I get.
              </MascotQuote>
            </section>

            {/* Section 2 */}
            <section id="what-it-changes">
              <h2 style={h2Style}>What Feed Optimization Actually Changes (and What It Does Not)</h2>
              <p style={pStyle}>
                Feed optimization changes two things: which search queries your products match, and
                your click-through rate within those auctions. It does not fix your bids, your
                budget, or a broken campaign structure. If your problem is{' '}
                <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>
                  ROAS that dropped suddenly
                </a>{' '}
                or wasted spend, you are on the wrong page. Start with our diagnostic walkthrough in{' '}
                <a href="/blog/google-shopping-optimization" style={linkStyle}>
                  Google Shopping optimization
                </a>
                , then come back here to build the feed right.
              </p>
              <p style={pStyle}>
                The lever is real, though. Google reports that retailers who added correct GTINs saw
                an average 20 percent increase in clicks (
                <a
                  href="https://support.google.com/merchants/answer/7380908?hl=en"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Merchant Center Help, 2026
                </a>
                ). That is one attribute, populated correctly, moving traffic without touching a
                single bid.
              </p>
              <p style={pStyle}>
                So treat the feed as the part of Shopping you fully own. Everything downstream
                (bidding, audiences, placement) reads from it.
              </p>
            </section>

            {/* Section 3 */}
            <section id="priority-matrix">
              <h2 style={h2Style}>The Attribute Priority Matrix</h2>
              <p style={pStyle}>
                Every feed attribute pulls one of three levers: it prevents disapproval, it wins
                impressions, or it lifts CTR. Ordering your work by lever, not by alphabet, is the
                whole game. Here is the matrix to build against.
              </p>

              {/* VISUAL: attribute priority matrix as a real HTML table */}
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '15px',
                    lineHeight: '1.5',
                  }}
                >
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>
                        Attribute
                      </th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap' }}>
                        Tier / lever
                      </th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>
                        Required? Disapproval risk
                      </th>
                      <th style={{ padding: '12px 14px', borderBottom: '2px solid #e5e7eb', textAlign: 'left', fontWeight: 700, color: '#1e293b' }}>
                        Limit or format
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#1e293b', fontWeight: 600, fontFamily: 'monospace', verticalAlign: 'top' }}>
                          {row.attr}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: tierColors[row.tier], fontWeight: 700, whiteSpace: 'nowrap', verticalAlign: 'top' }}>
                          {row.tier}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#475569', verticalAlign: 'top' }}>
                          {row.risk}
                        </td>
                        <td style={{ padding: '12px 14px', borderBottom: '1px solid #e5e7eb', color: '#475569', verticalAlign: 'top' }}>
                          {row.limit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={pStyle}>
                Work top to bottom. Each tier earns the right to the next: a product has to serve
                before impressions matter, and it has to get impressions before CTR matters.
              </p>
            </section>

            {/* Section 4 */}
            <section id="tier-1">
              <h2 style={h2Style}>Tier 1: Get Served at All (Required Attributes and Disapproval Triggers)</h2>
              <p style={pStyle}>
                Tier 1 attributes are non-negotiable. Miss or mis-state one and Google disapproves
                the product, so it never enters an auction. This is where you protect spend before
                you try to grow it.
              </p>
              <p style={pStyle}>The common disapproval triggers, in roughly the order they bite:</p>
              <ol style={{ ...pStyle, paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Price or availability mismatch.</strong> The value in the feed must match
                  what Google&apos;s crawler sees on the landing page. A $49 feed price against a $59
                  page price is an automatic disapproval.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Placeholder or low-quality images.</strong> image_link must point to a real,
                  high-resolution product image with no watermark, no &quot;image coming soon,&quot;
                  and no promotional overlay.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Missing GTIN where one exists.</strong> If the product has a valid GTIN,
                  send it. Beyond the disapproval risk in some categories, correct GTINs averaged a 20
                  percent click lift (
                  <a
                    href="https://support.google.com/merchants/answer/7380908?hl=en"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Merchant Center Help, 2026
                  </a>
                  ).
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Wrong or missing condition.</strong> Anything not new needs an explicit
                  condition value.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Unstable id values.</strong> Reuse the same id for the same product.
                  Changing ids resets the product&apos;s history, and reapproval after an id change
                  can take up to three business days (
                  <a
                    href="https://www.datafeedwatch.com/blog/tips-google-shopping-feed-optimization"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DataFeedWatch, 2025
                  </a>
                  ), so you lose impressions during a window you cannot get back.
                </li>
              </ol>
              <p style={pStyle}>
                Fix every Tier 1 issue before you touch a title. There is no CTR to optimize on a
                product that is not serving.
              </p>
            </section>

            {/* Section 5 */}
            <section id="tier-2">
              <h2 style={h2Style}>Tier 2: Win Impressions (Title, product_type, google_product_category)</h2>
              <p style={pStyle}>
                Tier 2 attributes decide which search queries your products even compete for. Get
                these right and you expand the auctions you appear in; get them wrong and the best
                image in the world goes unseen.
              </p>

              <h3 style={h3Style}>Title</h3>
              <p style={pStyle}>
                The title is your highest-impact matching signal. Google allows 1 to 150 characters
                and recommends using the full length with the most important terms first, because
                shoppers typically see only the first 70 or fewer (
                <a
                  href="https://support.google.com/merchants/answer/6324415?hl=en"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Merchant Center Help, 2026
                </a>
                ). A reliable structure for most retail products:
              </p>
              <p style={{ ...pStyle, fontFamily: 'monospace', background: '#f8fafc', padding: '16px', borderRadius: '8px', fontSize: '16px' }}>
                Brand + Product Type + Key Attributes (color, size, model)
              </p>
              <p style={pStyle}>
                Front-load what a buyer actually types. &quot;Bose QuietComfort Ultra Wireless
                Headphones Black&quot; beats &quot;Headphones, Black, by Bose.&quot; In one
                SavvyRevenue case, adding category and brand keywords to product titles multiplied
                Shopping traffic by roughly 4x (
                <a
                  href="https://savvyrevenue.com/blog/google-shopping-feed-optimization/"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SavvyRevenue, 2025
                </a>
                ). Treat that as a ceiling for a neglected feed, not a promise, but the direction is
                consistent.
              </p>

              <h3 style={h3Style}>product_type vs google_product_category</h3>
              <p style={pStyle}>
                These are two different fields and people conflate them constantly.
                google_product_category uses Google&apos;s fixed taxonomy and tells Google what the
                product is. product_type uses your taxonomy and gives you reporting and bidding
                control. Send both, each at least 2 to 5 levels deep, breadcrumb style:{' '}
                <code style={{ fontFamily: 'monospace', background: '#f8fafc', padding: '2px 6px', borderRadius: '4px' }}>
                  Electronics &gt; Cables &gt; Charging Cables &gt; Lightning
                </code>{' '}
                (
                <a
                  href="https://savvyrevenue.com/blog/google-shopping-feed-optimization/"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SavvyRevenue, 2025
                </a>
                ). Depth here is what lets you segment later.
              </p>

              <MascotQuote mascot="buzz">
                When I restructure a flat title set to Brand + Type + Attribute and push 2-5 level
                product_type, I expect impression share to move within 7-14 days. If it does not, the
                problem is bids or budget, not the feed, and I escalate it out of feed work.
              </MascotQuote>
            </section>

            {/* Section 6 */}
            <section id="tier-3">
              <h2 style={h2Style}>Tier 3: Lift CTR and Control Segmentation (Description, Images, Custom Labels)</h2>
              <p style={pStyle}>
                Once a product serves and shows on the right queries, Tier 3 attributes decide
                whether shoppers click and how precisely you can manage spend.
              </p>
              <p style={pStyle}>
                <strong>Description.</strong> Aim for around 500 characters and mirror the language on
                the landing page (
                <a
                  href="https://www.optmyzr.com/blog/google-merchant-center-product-feed-optimization-guide/"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Optmyzr, 2025
                </a>
                ). Do not stuff search terms that the page itself does not use; that creates a
                feed-to-page mismatch Google can flag.
              </p>
              <p style={pStyle}>
                <strong>Images.</strong> Use the highest resolution you have and add the supporting
                shots. Google supports up to 10 images per product, and extra angles tend to lift CTR
                on considered purchases.
              </p>
              <p style={pStyle}>
                <strong>Custom labels.</strong> This is the attribute most teams underuse.
                custom_label_0 through custom_label_4 carry your own tags into the feed: profit margin
                band, price tier, seasonality, bestseller flag. They do nothing for shoppers and
                everything for you, because they let you split products into separate listing groups
                and asset groups and bid them differently. A &quot;high-margin&quot; label is how you
                stop bidding your hero SKUs and your loss leaders the same way.
              </p>
              <p style={pStyle}>
                <strong>item_group_id.</strong> Group the variants of one product (sizes, colors)
                under a shared item_group_id so Google understands they are one item shown different
                ways.
              </p>
            </section>

            {/* Section 7 */}
            <section id="supplemental-feeds">
              <h2 style={h2Style}>Supplemental Feeds and Feed Rules (Changing Data Without Touching the Source)</h2>
              <p style={pStyle}>
                Supplemental feeds and feed rules let you override or enrich attributes without
                re-exporting from your store backend. That matters when the platform feed is locked,
                slow to change, or owned by another team.
              </p>

              {/* VISUAL: feed rule vs supplemental feed */}
              <CompareGrid
                columns={[
                  {
                    name: 'Feed rule',
                    bestFor: 'transforms on the primary feed',
                    traits: [
                      { label: 'Prepend brand to every title', has: true },
                      { label: 'Set a static value', has: true },
                      { label: 'Map one field to another', has: true },
                      { label: 'Inject data the feed lacks', has: false },
                      { label: 'Per-SKU overrides from a sheet', has: false },
                    ],
                  },
                  {
                    name: 'Supplemental feed',
                    bestFor: 'injecting data the primary feed lacks',
                    traits: [
                      { label: 'Prepend brand to every title', has: true },
                      { label: 'Set a static value', has: true },
                      { label: 'Map one field to another', has: false },
                      { label: 'Inject data the feed lacks', has: true },
                      { label: 'Per-SKU overrides from a sheet', has: true },
                    ],
                    highlight: true,
                  },
                ]}
              />

              <p style={pStyle}>
                Use a <strong>feed rule</strong> for transformations Merchant Center can compute on
                the primary feed. Use a <strong>supplemental feed</strong> when you need to inject
                data the primary feed does not have: bulk title rewrites from a spreadsheet,
                custom_label values by SKU, GTIN backfill, or seasonal overrides.
              </p>
              <p style={pStyle}>
                The practical pattern: keep the primary feed as the source of truth from your store,
                and treat supplemental feeds as the editable optimization layer on top. You get to
                iterate on titles and labels in a sheet without filing a backend ticket every time.
              </p>
            </section>

            {/* Section 8 */}
            <section id="pmax-fit">
              <h2 style={h2Style}>How Feed Optimization Fits Performance Max and Shopping Campaigns</h2>
              <p style={pStyle}>
                Inside Performance Max, the feed is the only lever you fully control. PMax hides most
                placement and query data, so the feed is where you actually steer the machine. We
                cover the wider PMax visibility problem in{' '}
                <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>
                  Performance Max problems
                </a>
                ; for Shopping specifically, feed quality is the input that survives the black box.
              </p>
              <p style={pStyle}>
                This is why custom labels earn their keep under PMax. You cannot hand-pick placements,
                but you can carve listing groups and asset groups by margin band or price tier using
                custom_label values, then let bidding work within tighter, more rational buckets. A
                feed segmented by margin gives Smart Bidding a cleaner objective than a flat catalog
                ever will.
              </p>
              <p style={pStyle}>
                For the broader account picture (bids, structure, search-term hygiene) see our{' '}
                <a href="/blog/google-ads-optimization" style={linkStyle}>
                  Google Ads optimization guide
                </a>
                , and pair feed work with disciplined{' '}
                <a href="/blog/google-ads-negative-keywords" style={linkStyle}>
                  negative keyword
                </a>{' '}
                hygiene, since the feed decides what you match but negatives decide what you block.
                The feed is the foundation, but it sits inside a system.
              </p>

              {/* VISUAL: build sequence */}
              <Steps>
                <Step title="Clear every Tier 1 disapproval">
                  Open Merchant Center diagnostics and fix price, availability, image, GTIN, and
                  condition issues first. No impression or CTR work matters on a product that cannot
                  serve.
                </Step>
                <Step title="Restructure titles and categories">
                  Apply the Brand + Product Type + Key Attributes formula, front-load the first 70
                  characters, and push product_type plus google_product_category 2-5 levels deep.
                </Step>
                <Step title="Layer descriptions, images, and custom labels">
                  Align descriptions with landing pages, add supporting images, and tag SKUs by
                  margin or price band in custom_label_0 to 4 for segmentation.
                </Step>
                <Step title="Move optimization into a supplemental feed">
                  Keep the store export as the source of truth and iterate titles and labels in a
                  supplemental feed you can edit in a sheet, with no backend ticket.
                </Step>
              </Steps>
            </section>

            {/* Section 9 - FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>What does it mean to optimize a Google Shopping feed?</strong> It means
                structuring your product attributes so items stay approved, match the right search
                queries, and earn clicks. In practice that is fixing required attributes first, then
                titles and categories, then descriptions, images, and labels.
              </p>
              <p style={pStyle}>
                <strong>Which feed attributes matter most for Google Shopping?</strong> Title,
                product_type, and google_product_category drive which queries you match. GTIN, price,
                availability, and image_link decide whether you serve at all. Fix the serving
                attributes first.
              </p>
              <p style={pStyle}>
                <strong>How long is the ideal product title for Google Shopping?</strong> Google
                allows 1 to 150 characters and recommends using the full length, with the most
                important terms in the first 70 since that is what shoppers usually see (
                <a
                  href="https://support.google.com/merchants/answer/6324415?hl=en"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Merchant Center Help, 2026
                </a>
                ).
              </p>
              <p style={pStyle}>
                <strong>Do I need a GTIN for every product?</strong> Send a GTIN for every product
                that has one. It is strongly expected in most categories, and retailers adding correct
                GTINs averaged a 20 percent increase in clicks (
                <a
                  href="https://support.google.com/merchants/answer/7380908?hl=en"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Merchant Center Help, 2026
                </a>
                ). Custom or handmade products without a GTIN are an exception.
              </p>
              <p style={pStyle}>
                <strong>What is the difference between product_type and google_product_category?</strong>{' '}
                google_product_category uses Google&apos;s fixed taxonomy to classify the product for
                Google. product_type uses your own taxonomy for your reporting and bidding control.
                Send both, 2 to 5 levels deep.
              </p>
              <p style={pStyle}>
                <strong>How do supplemental feeds work?</strong> A supplemental feed adds or overrides
                attributes on top of your primary feed using a shared id, without changing the source
                export. Teams use it for bulk title rewrites, custom labels, and GTIN backfill.
              </p>
              <p style={pStyle}>
                <strong>Does feed optimization matter for Performance Max?</strong> Yes, more than
                anywhere else. PMax hides placement and query data, so the feed is the main lever you
                control. Of the 51 public discussions we analyzed, Performance Max was the most-raised
                theme at 27 percent.
              </p>
            </section>

            {/* Section 10 - Summary */}
            <section id="summary">
              <h2 style={h2Style}>Build the Feed Once, Then Let It Compound</h2>
              <p style={pStyle}>
                A clean feed is the rare PPC asset that keeps paying after you stop working on it. Get
                the tiers in order, push the optimization layer into a supplemental feed you can edit
                fast, and the same catalog matches more queries at a higher CTR every week. That is
                the Kampaio approach to Shopping and PMax: treat the feed as the controllable surface
                and let the agents bid against a catalog that is already pulling its weight.{' '}
                <a href="/b6" style={linkStyle}>
                  See how Kampaio manages feed-aware Shopping and PMax
                </a>
                .
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                }}
              >
                Results may vary. This article is informational and does not constitute professional
                advice.
              </p>

              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '24px',
                  borderTop: '1px solid #e5e7eb',
                  fontSize: '14px',
                  color: '#64748b',
                }}
              >
                <strong>Sources</strong>
                <ol style={{ marginTop: '8px', paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>
                    Google Merchant Center Help, Tips to optimize your product data, 2026:{' '}
                    <a
                      href="https://support.google.com/merchants/answer/7380908?hl=en"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      support.google.com/merchants/answer/7380908
                    </a>
                  </li>
                  <li>
                    Google Merchant Center Help, Product title attribute, 2026:{' '}
                    <a
                      href="https://support.google.com/merchants/answer/6324415?hl=en"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      support.google.com/merchants/answer/6324415
                    </a>
                  </li>
                  <li>
                    SavvyRevenue, Shopping Feed Optimization: A Prioritized List of Improvements,
                    2025:{' '}
                    <a
                      href="https://savvyrevenue.com/blog/google-shopping-feed-optimization/"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      savvyrevenue.com/blog/google-shopping-feed-optimization
                    </a>
                  </li>
                  <li>
                    Optmyzr, The Complete Guide to Product Feed Optimization in Google Merchant
                    Center, 2025:{' '}
                    <a
                      href="https://www.optmyzr.com/blog/google-merchant-center-product-feed-optimization-guide/"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      optmyzr.com/blog/google-merchant-center-product-feed-optimization-guide
                    </a>
                  </li>
                  <li>
                    DataFeedWatch, 8 Must-Try Google Shopping Feed Optimization Tips, 2025:{' '}
                    <a
                      href="https://www.datafeedwatch.com/blog/tips-google-shopping-feed-optimization"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      datafeedwatch.com/blog/tips-google-shopping-feed-optimization
                    </a>
                  </li>
                </ol>
              </div>
            </section>

          </div>
        </div>
        <KeepReading slug="google-shopping-feed-optimization" category="google-ads" />
        <Footer />
      </div>
    </>
  );
}
