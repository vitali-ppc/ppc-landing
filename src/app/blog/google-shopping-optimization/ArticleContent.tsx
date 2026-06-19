'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import {
  BigStat,
  HubSpokes,
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
    '@id': 'https://www.kampaio.com/blog/google-shopping-optimization#article',
    headline: 'Google Shopping Optimization: Diagnose First, Fix Second',
    description:
      'Most Google Shopping guides jump straight to "optimize your titles." But if your bids are wrong or your campaign structure is broken, feed tweaks won\'t save you. Here\'s a diagnostic-first framework for DTC store owners running their own campaigns.',
    image: 'https://www.kampaio.com/og/google-shopping-optimization.png',
    datePublished: '2026-06-19T00:00:00.000Z',
    dateModified: '2026-06-19T00:00:00.000Z',
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
      '@id': 'https://www.kampaio.com/blog/google-shopping-optimization',
    },
    keywords:
      'google shopping optimization, product feed, tROAS, performance max, shopping campaign structure, merchant center, GTINs, product titles, DTC ecommerce',
    wordCount: 2416,
    articleSection: 'Google Ads',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I optimize for Google Shopping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with the diagnostic grid before touching any setting. Google Shopping optimization has four levers: feed quality (product titles, GTINs, images), bid strategy (tROAS calibrated to conversion volume), campaign structure (segmented by margin tier), and PMax signals. Adjusting one lever without knowing which is broken is the most common wasted effort.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Google Shopping worth it for small DTC stores?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if your margins support a realistic tROAS target. The practical constraint is conversion volume: Smart Bidding requires at least 30 conversions per 30 days to function reliably. Below that, use Maximize Conversion Value with no tROAS target as your starting strategy.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should my target ROAS be for Google Shopping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Target ROAS is not an industry benchmark. Start at your actual 30-day ROAS minus 15%. Hero SKUs can sustain 350-400% tROAS; mid-tier typically holds volume at 250-280%; clearance and long-tail SKUs often perform better on Maximize Conversion Value with no target. Calibrate from your margin data, not averages.',
        },
      },
      {
        '@type': 'Question',
        name: "What's the difference between Standard Shopping and Performance Max for product ads?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard Shopping gives direct control over product groups, bid adjustments, and negative keywords. Performance Max uses your feed plus creative assets, audience signals, and first-party data to bid across all Google inventory from one campaign. Standard Shopping offers more query-level control; PMax offers broader reach. Feed-only PMax (skip all creative assets at setup) is officially supported as a middle-ground option.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are my Shopping ads getting impressions but no conversions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'High impressions with near-zero conversions points to three root causes: landing page mismatch (product page does not match the ad), price disconnect (your SERP price is uncompetitive), or wrong PMax audience signals. Check product-level conversion rates and QA the landing page for each flagged SKU to confirm price and availability match the feed.',
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
        name: 'Google Shopping Optimization',
        item: 'https://www.kampaio.com/blog/google-shopping-optimization',
      },
    ],
  };

  const tableOfContents = [
    { id: 'why-most-shopping-advice-fails', title: 'Why Most Shopping Optimization Advice Fails', level: 1 },
    { id: 'diagnostic-grid', title: 'The Shopping Optimization Diagnostic Grid', level: 1 },
    { id: 'feed-quality', title: 'Feed Quality: The Foundation That Bids Can\'t Compensate For', level: 1 },
    { id: 'product-titles', title: 'Product Titles That Match How Shoppers Search', level: 2 },
    { id: 'attributes', title: 'The Attributes Google Uses to Decide Relevance', level: 2 },
    { id: 'bid-strategy', title: 'Bid Strategy: Setting the ROAS Floor Without Killing Volume', level: 1 },
    { id: 'campaign-structure', title: 'Campaign Structure: Why Flat = Expensive', level: 1 },
    { id: 'performance-max', title: 'Performance Max and Shopping: What Changed, What Did Not', level: 1 },
    { id: 'automated-diagnosis', title: 'What Automated Diagnosis Finds (That Manual Audits Miss)', level: 1 },
    { id: 'checklist', title: 'Optimization Checklist: What to Do in Your First 30 Minutes', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'summary', title: 'Summary', level: 1 },
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
          <ArticleHero slug="google-shopping-optimization" />
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
              Google Shopping Optimization: Diagnose First, Fix Second
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
              Most guides assume your problem is the feed. That assumption is wrong about half the
              time. A diagnostic-first framework for DTC store owners who want to fix the right lever
              before touching any setting.
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
                    June 19, 2026 &middot; 10 min read
                  </span>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <KeyTakeaways
              items={[
                'Google Shopping is a four-component system: feed, bids, structure, and PMax signals.',
                'Feed disapprovals kill impression share before bids even matter.',
                'tROAS set too high kills volume. Start at your 30-day ROAS minus 15%.',
                'Flat structure means your $5 impulse product drags down your $400 hero SKU.',
                'Use the diagnostic grid below to find the broken component before adjusting anything.',
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

            {/* Intro paragraph */}
            <p style={pStyle}>
              Google Shopping optimization means something different depending on whether your problem
              is feed quality, bid strategy, campaign structure, or asset quality in Performance Max.
              Fix the wrong lever first and you waste two weeks. This guide is a diagnostic framework:
              identify the broken component before touching any setting. See{' '}
              <a href="/blog/google-ads-optimization" style={linkStyle}>
                our pillar guide
              </a>{' '}
              for the full Google Ads framework.
            </p>

            {/* VISUAL 1: HubSpokes - four levers of Shopping optimization */}
            <HubSpokes
              hub="Shopping System"
              spokes={['Feed Quality', 'Bid Strategy', 'Campaign Structure', 'PMax Signals']}
              caption="Google Shopping is a four-component system. Fixing the wrong lever first costs 2-4 weeks of wasted data and budget. Diagnose before you adjust."
            />

            {/* Section 1 */}
            <section id="why-most-shopping-advice-fails">
              <h2 style={h2Style}>Why Most Shopping Optimization Advice Fails</h2>
              <p style={pStyle}>
                Most Google Shopping guides assume your problem is the feed and proceed from there.
                That assumption is wrong about half the time. Your problem might be an overly
                aggressive tROAS target throttling reach, a flat campaign structure treating wildly
                different margin tiers identically, or a PMax asset group starved of audience signals
                after a Smart Shopping migration.
              </p>
              <p style={pStyle}>
                Google Shopping is a system. Diagnose the broken component first, then apply the
                targeted fix. Before you touch a single product title, spend 5 minutes figuring out
                which component is actually broken. The four primary levers are: feed quality, bid
                strategy, campaign structure, and PMax signals. The grid below maps each one to its
                symptoms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="diagnostic-grid">
              <h2 style={h2Style}>The Shopping Optimization Diagnostic Grid</h2>
              <p style={pStyle}>
                Match your symptom to the root cause, then read the corresponding section of this
                guide. This is the diagnostic entry point no agency blog provides, because they all
                presuppose the problem is a feed problem.
              </p>

              {/* VISUAL 2: Diagnostic grid as a real HTML table */}
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
                      <th
                        style={{
                          padding: '12px 14px',
                          borderBottom: '2px solid #e5e7eb',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#1e293b',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Symptom
                      </th>
                      <th
                        style={{
                          padding: '12px 14px',
                          borderBottom: '2px solid #e5e7eb',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#1e293b',
                        }}
                      >
                        Likely Root Cause
                      </th>
                      <th
                        style={{
                          padding: '12px 14px',
                          borderBottom: '2px solid #e5e7eb',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#1e293b',
                        }}
                      >
                        Where to Look
                      </th>
                      <th
                        style={{
                          padding: '12px 14px',
                          borderBottom: '2px solid #e5e7eb',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#1e293b',
                        }}
                      >
                        First Fix
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        symptom: 'Low impression share / products not showing',
                        cause: 'Feed disapprovals or poor title relevance',
                        where: 'Google Merchant Center: Products > Diagnostics tab',
                        fix: 'Fix all disapprovals, front-load keywords in product titles',
                      },
                      {
                        symptom: 'Impressions high, CTR low',
                        cause: 'Weak product images or uncompetitive pricing in SERP',
                        where: 'Auction Insights + Shopping preview tool',
                        fix: 'Run image test (lifestyle vs. stock), audit price vs. competitors',
                        highlight: true,
                      },
                      {
                        symptom: 'CTR fine, ROAS dropping',
                        cause: 'tROAS target too aggressive or query match degradation',
                        where: 'Search Terms report + Bid Strategy status panel',
                        fix: 'Lower tROAS floor 20-30%, add negatives from search terms',
                      },
                      {
                        symptom: 'High spend, no conversions',
                        cause: 'Landing page mismatch, price disconnect, or wrong PMax audience signals',
                        where: 'Landing page QA + product-level conversion rate report',
                        fix: 'Fix landing page or refresh PMax asset group audience signals',
                        highlight: true,
                      },
                      {
                        symptom: 'Certain SKUs profitable, others dead',
                        cause: 'Flat campaign structure with no margin segmentation',
                        where: 'Product group performance report',
                        fix: 'Separate high-ROAS SKUs into their own campaign or asset group',
                      },
                    ].map((row, i) => (
                      <tr key={i} style={{ background: row.highlight ? '#f8fafc' : 'white' }}>
                        <td
                          style={{
                            padding: '12px 14px',
                            borderBottom: '1px solid #e5e7eb',
                            color: '#1e293b',
                            fontWeight: 600,
                            verticalAlign: 'top',
                          }}
                        >
                          {row.symptom}
                        </td>
                        <td
                          style={{
                            padding: '12px 14px',
                            borderBottom: '1px solid #e5e7eb',
                            color: '#475569',
                            verticalAlign: 'top',
                          }}
                        >
                          {row.cause}
                        </td>
                        <td
                          style={{
                            padding: '12px 14px',
                            borderBottom: '1px solid #e5e7eb',
                            color: '#475569',
                            verticalAlign: 'top',
                          }}
                        >
                          {row.where}
                        </td>
                        <td
                          style={{
                            padding: '12px 14px',
                            borderBottom: '1px solid #e5e7eb',
                            color: '#10b981',
                            fontWeight: 600,
                            verticalAlign: 'top',
                          }}
                        >
                          {row.fix}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={pStyle}>
                This grid will not solve everything. But it tells you which section of this guide to
                read first.
              </p>
            </section>

            {/* Section 3 */}
            <section id="feed-quality">
              <h2 style={h2Style}>Feed Quality: The Foundation That Bids Cannot Compensate For</h2>
              <p style={pStyle}>
                Product feed quality is Google&apos;s primary signal for deciding which queries your
                Shopping ads appear on. Bidding more cannot fix a feed that does not match buyer
                intent. Both Standard Shopping and Performance Max draw from the same feed signals as
                their relevance foundation.
              </p>

              <h3 id="product-titles" style={h3Style}>
                Product Titles That Match How Shoppers Search
              </h3>
              <p style={pStyle}>
                Google front-weights the first 70 characters of a product title (
                <a
                  href="https://support.google.com/merchants/answer/7380908"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Merchant Center Help, 2024
                </a>
                ). Product titles get truncated in most ad formats. Think about how one SKU differs
                from another and name that difference in the title. Specificity is what connects your
                product to a buyer&apos;s exact search.
              </p>
              <p style={pStyle}>
                Proven title formula:{' '}
                <strong>[Brand] + [Product Type] + [Key Attribute] + [Variant]</strong>.
                &quot;Nike Air Max 90 White Men&apos;s Running Shoe Size 10&quot; outperforms &quot;White Running
                Shoe Nike&quot; because Google can map it to specific queries. The most common DTC
                mistake: leading titles with internal SKU codes. &quot;SB-4421 Sneaker&quot; tells Google
                nothing useful.
              </p>

              {/* VISUAL 3: MascotQuote - Mira */}
              <MascotQuote mascot="mira">
                One apparel client was leading every title with their internal collection name:
                &quot;Studio Collection Leggings High Waist S/M/L.&quot; We rewrote to &quot;Women&apos;s High Waist
                Yoga Leggings 7/8 Length - Black, Sizes XS-XL.&quot; That rewrite lifted CTR by 18%
                within two weeks of reindex, without touching bids.
              </MascotQuote>

              <h3 id="attributes" style={h3Style}>
                The Attributes Google Uses to Decide Relevance
              </h3>
              <p style={pStyle}>
                GTINs (Global Trade Item Numbers) give Google a definitive product identity signal.
              </p>

              {/* VISUAL 4: BigStat - GTIN click lift */}
              <BigStat
                value="+20%"
                label="average increase in clicks"
                claim="for retailers who added correct GTINs to their product data."
                source="Source: Google Merchant Center Help, 2024 (support.google.com/merchants/answer/7380908)"
              />

              <p style={pStyle}>
                GTINs enable ads to appear in more placements across Google, YouTube, and partner
                sites. Google product category should be 2-3 levels deep: &quot;Furniture &gt; Outdoor
                Furniture &gt; Outdoor Seating &gt; Outdoor Chairs&quot; rather than just &quot;Furniture &gt;
                Chairs.&quot; The more specific the category, the more accurately Google routes products
                into relevant auctions.
              </p>
              <p style={pStyle}>
                Custom labels are for your bid logic, not Google&apos;s relevance algorithm. Custom labels
                segment products into tROAS tiers (High/Mid/Low margin, Bestseller, New arrivals).
                They do not influence which queries trigger your ads. One operational caution: do not
                change product type, brand, or Google product category without first checking your
                campaign bid structure. Feed changes like these cascade into segmentation and can
                disrupt running bid strategies.
              </p>
            </section>

            {/* Section 4 */}
            <section id="bid-strategy">
              <h2 style={h2Style}>
                Bid Strategy: Setting the ROAS Floor Without Killing Volume
              </h2>
              <p style={pStyle}>
                Set tROAS too high and Google stops showing your ads. Set it too low and
                you&apos;re unprofitable. The right number is specific to your margin stack and your
                campaign&apos;s conversion volume, not an industry benchmark.
              </p>
              <p style={pStyle}>
                The 30-conversion-per-30-days threshold is Google&apos;s documented floor for Smart
                Bidding to function reliably (
                <a
                  href="https://support.google.com/google-ads/answer/10724817"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Help, 2024
                </a>
                ). Below that, tROAS is too aggressive: the algorithm lacks enough signal to hit it.
                Switch to Maximize Conversion Value with no target, collect 2-3 weeks of data, then
                introduce a tROAS floor.
              </p>
              <p style={pStyle}>
                For campaigns at 30+ conversions in 30 days: set tROAS at your actual 30-day ROAS
                minus 15%. Give it two weeks before adjusting. If your Smart Shopping campaigns were
                auto-migrated to PMax, expect the baseline ROAS to shift. PMax inventory is wider
                (Search, Display, Discover, YouTube), which changes the conversion mix and makes old
                Smart Shopping targets unreliable as a starting point. If ROAS drops suddenly during
                or after a migration, the{' '}
                <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>
                  ROAS diagnostic checklist
                </a>{' '}
                covers the eight most common causes in detail.
              </p>

              {/* VISUAL 5: MascotQuote - Buzz */}
              <MascotQuote mascot="buzz">
                On hero SKUs priced above $100, I set tROAS at 400%. Mid-tier SKUs between $30-$100
                get 280%. Clearance and long-tail SKUs under $30 run on Maximize Conversion Value
                with no target - the goal there is inventory clearance, not margin protection. One
                account had a $280 leather bag and a $12 keychain in the same campaign at the same
                tROAS. The keychain was eating 60% of budget and dragging the ROAS average down.
                Separate them.
              </MascotQuote>

              <p style={pStyle}>
                For the full breakdown of Smart Bidding mechanics in 2025, see{' '}
                <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>
                  our Smart Bidding guide
                </a>
                .
              </p>
            </section>

            {/* Section 5 */}
            <section id="campaign-structure">
              <h2 style={h2Style}>Campaign Structure: Why Flat = Expensive</h2>
              <p style={pStyle}>
                Most DTC operators run everything in one Shopping or one PMax campaign. That means a
                $5 impulse product and a $400 hero product compete at the same ROAS target. The
                lower-price product wins on volume, burning budget at margins that cannot support the
                spend.
              </p>
              <p style={pStyle}>
                The structural principle: separate by margin tier or AOV, not by product category. A
                $300 jacket and a $300 handbag belong in the same campaign structure even if
                they&apos;re in different categories.
              </p>

              {/* VISUAL 6: CompareGrid - Standard Shopping vs PMax */}
              <CompareGrid
                columns={[
                  {
                    name: 'Standard Shopping',
                    bestFor: 'query-level control',
                    traits: [
                      { label: 'Direct negative keywords', has: true },
                      { label: 'Product group bid adjustments', has: true },
                      { label: 'Search term visibility', has: true },
                      { label: 'Multi-channel inventory', has: false },
                      { label: 'Audience signal modeling', has: false },
                    ],
                  },
                  {
                    name: 'Performance Max',
                    bestFor: 'broad reach + AI signals',
                    traits: [
                      { label: 'Direct negative keywords', has: false },
                      { label: 'Product group bid adjustments', has: false },
                      { label: 'Search term visibility', has: false },
                      { label: 'Multi-channel inventory', has: true },
                      { label: 'Audience signal modeling', has: true },
                    ],
                    highlight: true,
                  },
                ]}
              />

              <p style={pStyle}>
                <strong>For Standard Shopping:</strong> subdivide product groups by custom label
                (margin tier: High/Mid/Low). Each tier gets its own tROAS. New products get a
                separate group with aggressive initial bids to gather 30-day conversion data before
                folding into the correct tier.
              </p>
              <p style={pStyle}>
                <strong>For PMax:</strong> separate asset groups by performance tier.
                High-performing SKUs in one asset group, growth-stage SKUs in another. Different
                asset groups carry different creative signals, affecting Google&apos;s audience matching.
                Feed-only PMax (no creative assets uploaded) is officially supported for operators
                whose creative is not ready (
                <a
                  href="https://support.google.com/google-ads/answer/10724817"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Help, 2024
                </a>
                ).
              </p>
              <p style={pStyle}>
                Below $5K/month Shopping spend, PMax likely allocates budget more efficiently. Above
                $15K/month, a hybrid approach (Standard Shopping for branded terms plus PMax for
                prospecting) gives more control without sacrificing reach.
              </p>
              <p style={pStyle}>
                If PMax is your primary Shopping vehicle and it is not converting, the{' '}
                <a href="/blog/performance-max-not-converting" style={linkStyle}>
                  dedicated Performance Max troubleshooting guide
                </a>{' '}
                covers the asset group and audience signal issues in detail.
              </p>
            </section>

            {/* Section 6 */}
            <section id="performance-max">
              <h2 style={h2Style}>
                Performance Max and Shopping: What Changed, What Did Not
              </h2>
              <p style={pStyle}>
                In 2022-2023, Google migrated most Smart Shopping campaigns to Performance Max. If
                you&apos;re running PMax now, the Shopping feed is still the core relevance signal, but
                Google also factors in creative assets, audience signals, and landing page quality.
              </p>
              <p style={pStyle}>
                <strong>What changed:</strong> direct query-level bidding control is gone. The levers
                now are feed quality, asset group creative quality, first-party audience signals, and
                tROAS targets.
              </p>
              <p style={pStyle}>
                <strong>What did not change:</strong> feed quality still determines relevance. Bad
                product titles, missing GTINs, and low-resolution images reduce Shopping placement
                inside PMax exactly as they do in Standard Shopping. Low PMax impression share?
                Merchant Center Diagnostics is still the first place to look.
              </p>
              <p style={pStyle}>
                Two PMax-specific actions worth taking now. Upload your customer email list as an
                audience signal: Performance Max uses it to model conversion probability and find
                similar buyers. Run a branded exact-match Search campaign to protect brand traffic.
                Per Google&apos;s documentation, Search campaigns are prioritized over PMax when the
                query matches an exact keyword (
                <a
                  href="https://support.google.com/google-ads/answer/10724817"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Help, 2024
                </a>
                ), which prevents PMax from bidding on your own brand at inflated CPCs.
              </p>
            </section>

            {/* Section 7 */}
            <section id="automated-diagnosis">
              <h2 style={h2Style}>
                What Automated Diagnosis Finds (That Manual Audits Miss)
              </h2>
              <p style={pStyle}>
                Manual audits check feed, bids, and structure in sequence. Shopping underperformance
                usually involves correlated signals across all three simultaneously.
              </p>
              <p style={pStyle}>
                Consider a real scenario: impression share drops 40% over 3 days. A manual check
                flags a feed disapproval batch. But that same window also shows bid strategy status
                shifting to &quot;Learning&quot; (triggered by a conversion tracking gap) and new Merchant
                Center disapprovals. Individually, each signal looks manageable. Together, they
                explain a 35% ROAS drop in 72 hours.
              </p>
              <p style={pStyle}>
                Kampaio&apos;s Buzz agent monitors bid strategy status changes in real time. Mira flags
                feed attribute regressions when disapprovals spike. When both fire in the same
                window, the account gets one correlated alert instead of three separate dashboard
                checks to connect manually.
              </p>
              <p style={pStyle}>
                If you want to see what an automated Shopping audit looks like on your account,{' '}
                <a href="/chat" style={linkStyle}>
                  Kampaio&apos;s free diagnostic
                </a>{' '}
                takes about 2 minutes to connect.
              </p>
            </section>

            {/* Section 8 */}
            <section id="checklist">
              <h2 style={h2Style}>
                Optimization Checklist: What to Do in Your First 30 Minutes
              </h2>

              {/* VISUAL 7: Steps primitive - 30-minute checklist */}
              <Steps>
                <Step title="Open Merchant Center &gt; Products &gt; Diagnostics">
                  If disapproval rate exceeds 5% of active products, fix those first. No bid
                  adjustment compensates for products that cannot enter the auction.
                </Step>
                <Step title="Pull your Shopping campaign report, filter by ROAS, sort low to high">
                  Flag SKUs with more than 20 clicks and ROAS below 50% of account average. Move
                  them to a lower-tROAS group or exclude them.
                </Step>
                <Step title='Check Bid Strategy status for every active campaign'>
                  &quot;Learning&quot; or &quot;Limited: Low conversion value&quot; means identify the trigger.
                  Budget cuts, conversion tracking gaps, and campaign edits all push campaigns into
                  the learning phase. The{' '}
                  <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>
                    bid strategy status guide
                  </a>{' '}
                  breaks down each status and the exact fix for each cause.
                </Step>
                <Step title="Review your Search Terms report for the last 30 days">
                  Add{' '}
                  <a href="/blog/google-ads-negative-keywords" style={linkStyle}>
                    negative keywords
                  </a>{' '}
                  for any term with more than 5 clicks and zero conversions that is clearly
                  irrelevant. Negative keywords are the only direct query-filtering mechanism in
                  Shopping campaigns.
                </Step>
                <Step title="Check product group structure">
                  If everything is in a single &quot;All Products&quot; group, create a custom label for your
                  top 20% revenue SKUs this week. Separating high-performers is the structural move
                  with the clearest ROI per hour spent.
                </Step>
              </Steps>
            </section>

            {/* Section 9 - FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>How do I optimize for Google Shopping?</strong> Start with the diagnostic
                grid before touching any setting. Google Shopping optimization has four levers: feed
                quality (product titles, GTINs, images), bid strategy (tROAS calibrated to
                conversion volume), campaign structure (segmented by margin tier), and PMax signals.
                Adjusting one lever without knowing which is broken is the most common wasted effort.
              </p>
              <p style={pStyle}>
                <strong>Is Google Shopping worth it for small DTC stores?</strong> Yes, if your
                margins support a realistic tROAS target. The practical constraint is conversion
                volume: Smart Bidding requires at least 30 conversions per 30 days to function
                reliably. Below that, use Maximize Conversion Value with no tROAS target as your
                starting strategy.
              </p>
              <p style={pStyle}>
                <strong>What should my target ROAS be for Google Shopping?</strong> Target ROAS is
                not an industry benchmark. Start at your actual 30-day ROAS minus 15%. Hero SKUs can
                sustain 350-400% tROAS; mid-tier typically holds volume at 250-280%; clearance and
                long-tail SKUs often perform better on Maximize Conversion Value with no target.
                Calibrate from your margin data, not averages (
                <a
                  href="https://support.google.com/google-ads/answer/10724817"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Help, 2024
                </a>
                ).
              </p>
              <p style={pStyle}>
                <strong>
                  What&apos;s the difference between Standard Shopping and Performance Max for product
                  ads?
                </strong>{' '}
                Standard Shopping gives direct control over product groups, bid adjustments, and
                negative keywords. Performance Max uses your feed plus creative assets, audience
                signals, and first-party data to bid across all Google inventory from one campaign.
                Standard Shopping offers more query-level control; PMax offers broader reach.
                Feed-only PMax (skip all creative assets at setup) is officially supported as a
                middle-ground option.
              </p>
              <p style={pStyle}>
                <strong>
                  Why are my Shopping ads getting impressions but no conversions?
                </strong>{' '}
                High impressions with near-zero conversions points to three root causes: landing page
                mismatch (product page does not match the ad), price disconnect (your SERP price is
                uncompetitive), or wrong PMax audience signals. Check product-level conversion rates
                and QA the landing page for each flagged SKU to confirm price and availability match
                the feed.
              </p>
            </section>

            {/* Section 10 - Summary */}
            <section id="summary">
              <h2 style={h2Style}>Summary</h2>
              <p style={pStyle}>
                Feed quality, bid strategy, campaign structure, and PMax signals are four separate
                levers. Pulling the wrong one first costs you 2-4 weeks of wasted data and budget.
                The diagnostic grid in this article tells you which lever matches your specific
                symptom before you make any change.
              </p>
              <p style={pStyle}>
                Kampaio runs this diagnostic automatically across all four layers.{' '}
                <a href="/chat" style={linkStyle}>
                  Connect your account
                </a>{' '}
                - free, takes 2 minutes.
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
                <ol
                  style={{
                    marginTop: '8px',
                    paddingLeft: '20px',
                    lineHeight: '1.8',
                  }}
                >
                  <li>
                    Google Merchant Center Help - Product Data Requirements (GTINs, product titles,
                    diagnostics):{' '}
                    <a
                      href="https://support.google.com/merchants/answer/7380908"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      support.google.com/merchants/answer/7380908
                    </a>
                  </li>
                  <li>
                    Google Ads Help - Performance Max Campaigns and Smart Bidding:{' '}
                    <a
                      href="https://support.google.com/google-ads/answer/10724817"
                      style={linkStyle}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      support.google.com/google-ads/answer/10724817
                    </a>
                  </li>
                </ol>
              </div>
            </section>

          </div>
        </div>
        <KeepReading slug="google-shopping-optimization" category="google-ads" />
        <Footer />
      </div>
    </>
  );
}
