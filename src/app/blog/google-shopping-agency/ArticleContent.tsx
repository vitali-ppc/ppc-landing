'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { KeyTakeaways, ColumnBuckets, BigStat, Callout, SignalStack } from '../../../components/blog/primitives';

const TITLE = 'Google Shopping Agency: Should You Hire One, or Run Shopping Yourself?';
const DESCRIPTION =
  'Should you hire a Google Shopping agency or run Shopping yourself? Real fees, the Merchant Center workload nobody prices in, and when hiring pays off.';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-shopping-agency#article',
    headline: TITLE,
    description: DESCRIPTION,
    image: 'https://www.kampaio.com/og/google-shopping-agency.png',
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
    datePublished: '2026-08-20T00:00:00.000Z',
    dateModified: '2026-08-20T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-shopping-agency',
    },
    keywords:
      'google shopping agency, google shopping management, merchant center, product feed, shopping ads, performance max retail, agency fees, feed operations, merchant center suspension, product-level ROAS',
    articleSection: 'Google Ads',
    inLanguage: 'en',
    "wordCount": 2307
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
        name: 'Google Shopping Agency',
        item: 'https://www.kampaio.com/blog/google-shopping-agency',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a Google Shopping agency cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Expect 7-15% of ad spend plus a flat fee, per OuterBox's published range, corroborated at 5% to 15% by Influencer Marketing Hub. The dependency comes second: fees track spend and scope, so the same percentage buys very different work at $8,000 and at $40,000.",
        },
      },
      {
        '@type': 'Question',
        name: 'At what ad spend does hiring a Google Shopping agency make sense?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Roughly $25,000 a month for full service, the band ZATO Marketing publishes for its own top tier, with a lighter tier below that. At the other end of the market, SmartSites publishes a $1,000+ minimum campaign size. Between $10,000 and $25,000, SKU count and churn decide it.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who manages my Merchant Center account if I hire an agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Whoever you name in the contract. As of August 2026 Google ships Merchant Center for Agencies, and it works by linkage: agencies must be linked to at least one active Merchant Center account. Linkage is not transfer of ownership, so put the responsibility in writing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can software replace a Google Shopping agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Partly. Software runs and monitors the campaign side, System 2. Software does not argue a misrepresentation appeal, and appeals are typically limited to one to three attempts with a seven-day first cool-down. If your binding risk is policy, not bidding, buy the human.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I hire an agency if my Merchant Center account was suspended?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually yes, and quickly. Misrepresentation is the most-cited policy behind suspensions, and a suspension persists until a successful appeal. Attempts are limited, so a specialist who has won appeals is worth more than a month of bid tuning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I keep ownership of my Google Ads and Merchant Center accounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, if you set it up that way, and you should insist. Both accounts stay registered to your company, with the agency or software granted access rather than title. Kampaio works this way by default. An agency that owns your accounts owns your conversion history.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Should You Hire a Google Shopping Agency? The Quick Answer', level: 1 },
    { id: 'two-systems', title: 'Google Shopping Is Two Systems, Not One', level: 1 },
    { id: 'what-agencies-charge', title: 'What Google Shopping Agencies Actually Charge', level: 1 },
    { id: 'ownership-models', title: 'The Four Ownership Models, Side by Side', level: 1 },
    { id: 'feed-workload', title: 'The Feed Workload Nobody Prices Into the Retainer', level: 1 },
    { id: 'right-call', title: 'When a Google Shopping Agency Is the Right Call (and When It Is Not)', level: 1 },
    { id: 'shopping-vs-general', title: 'What a Shopping Agency Does That a General PPC Agency Does Not', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'who-owns-the-feed', title: 'The Real Question Is Who Owns the Feed', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
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
  const linkStyle: React.CSSProperties = { color: '#667eea', textDecoration: 'underline' };
  const listStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
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
      {/* Scoped layout for the paired good-fit / bad-fit signal stacks.
          Explicit repeat(2, 1fr) with a media-query collapse (no auto-fit). */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '.gsa-fit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin:32px 0}' +
            '.gsa-fit-grid figure{margin:0}' +
            '@media (max-width:900px){.gsa-fit-grid{grid-template-columns:1fr;gap:8px}}',
        }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs + cover */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-shopping-agency" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Shopping
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Shopping Agency: Should You Hire One, or Run Shopping Yourself?
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A Google Shopping agency is worth hiring when your ad spend is large enough that a 7-15% fee costs less than the margin you are losing, and your catalog is big or volatile enough that feed work is a standing job.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>August 20, 2026 · 10 min read</span>
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
            {/* Intro */}
            <section id="intro">
              <p style={para}>
                A Google Shopping agency is worth hiring when your ad spend is large enough that a 7-15% fee costs less than the margin you are losing, and your catalog is big or volatile enough that feed work is a standing job. Below roughly $10,000 a month with a stable catalog, the fee costs more than it recovers.
              </p>
            </section>

            {/* Quick answer */}
            <section id="quick-answer">
              <h2 style={h2}>Should You Hire a Google Shopping Agency? The Quick Answer</h2>
              <p style={para}>
                Hire one when two conditions hold at the same time: spend high enough to absorb the fee, and a catalog large or volatile enough that Merchant Center is a real job. General PPC hiring advice tracks one variable, spend. Shopping has two, and the second is where the money leaks.
              </p>

              {/* VISUAL 1: KeyTakeaways */}
              <KeyTakeaways
                title="The two variables that decide this"
                items={[
                  <>Under ~$10,000/mo with a stable catalog: software or DIY. A percentage fee costs more than it recovers. (Kampaio editorial position, not a cited figure.)</>,
                  <>$10,000-25,000/mo: decided by SKU count and churn.</>,
                  <>$25,000+/mo, or thousands of active SKUs: a Shopping specialist usually pencils out.</>,
                  <>Yours either way: the Merchant Center account and its policy record.</>,
                ]}
              />

              <p style={para}>
                ZATO Marketing, the most credentialed Shopping specialist on this results page, publishes that its full service targets brands spending $25,000 to $1,000,000 per month, with a lighter tier below $25,000 (<a href="https://zatomarketing.com/google-shopping-agency" style={linkStyle} target="_blank" rel="noopener noreferrer">ZATO Marketing, 2026</a>). That is one agency&apos;s self-segmentation, not an industry standard. It is still the most useful number on the SERP, because it tells you who the sales pages were written about. If you spend $8,000 a month, that is not you.
              </p>
              <p style={para}>
                Shopping sits inside <a href="/blog/google-ads-optimization" style={linkStyle}>the wider Google Ads optimization playbook</a>, but it carries one structural problem no other Google channel has. That problem decides the hiring question, so start there.
              </p>
            </section>

            {/* Two systems */}
            <section id="two-systems">
              <h2 style={h2}>Google Shopping Is Two Systems, Not One</h2>
              <p style={para}>
                Google Shopping runs on two separate systems, and most hiring mistakes come from treating them as one. We call this the Two-System Split. It turns &quot;should I hire an agency&quot; into a question with an answer.
              </p>
              <p style={para}>
                System 1 is Google Merchant Center, the product data system. Merchant Center enforces the product data specification: seven attributes are required on essentially every product, and a missing one means the product cannot serve (<a href="https://support.google.com/merchants/answer/7052112" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Merchant Center, 2026</a>). It also enforces the Shopping ads policies, escalating from disapproved ads to &quot;suspending accounts for repeat or egregious violations&quot; (<a href="https://support.google.com/merchants/answer/6149970" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Merchant Center, 2026</a>). Separate login, separate policies, separate ways to go dark overnight.
              </p>
              <p style={para}>
                System 2 is Google Ads, the campaign system: Standard Shopping and Performance Max, asset groups, brand exclusions, bidding, budget, product-level ROAS. Google states the dependency plainly: Shopping ads &quot;use your existing Merchant Center product data (not keywords) to decide how and where to show your ads&quot; (<a href="https://support.google.com/google-ads/answer/2454022" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads, 2026</a>).
              </p>

              {/* VISUAL 2: ColumnBuckets : the Two-System Split */}
              <ColumnBuckets
                columns={[
                  {
                    title: 'System 1: Google Merchant Center (product data)',
                    items: [
                      'Product data specification (7 required attributes)',
                      'Disapproval triage',
                      'Shopping ads policies (4 areas)',
                      'Misrepresentation and suspension risk',
                      'Price and availability accuracy',
                      'Merchant Promotions',
                    ],
                  },
                  {
                    title: 'System 2: Google Ads (campaigns)',
                    items: [
                      'Standard Shopping and Performance Max',
                      'Asset groups',
                      'Brand exclusions',
                      'Bidding and budget',
                      'Product-level ROAS',
                      'Conversion tracking',
                    ],
                  },
                ]}
                caption="Two systems, two owners. Source: Google Merchant Center and Google Ads documentation, verified 2026-08-20"
              />

              <p style={para}>
                So the real question is not agency or no agency. It is who owns System 1 and who owns System 2. The common failure is model 2 below: a general PPC agency takes System 2, and System 1 stays yours by default, usually without anyone saying so out loud. Vysta, an agency describing its own industry, puts it bluntly: agencies that &quot;treat the feed as the client&apos;s responsibility&quot; are &quot;operating with a significant blind spot&quot; (<a href="https://growwithvysta.com/blog/best-google-ads-agencies-for-ecommerce-brands-in-the-us/" style={linkStyle} target="_blank" rel="noopener noreferrer">Vysta, 2026</a>).
              </p>
              <p style={para}>
                Google agrees, in product form. As of August 2026, Google ships Merchant Center for Agencies, a product &quot;available exclusively for agencies&quot; with its own portfolio dashboard and a diagnostics page that prioritizes fixes by &quot;click potential&quot; (<a href="https://support.google.com/merchants/answer/16580507" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Merchant Center, 2026</a>). Google built separate tooling for the Merchant Center side because it is a separate job. For tactics, see <a href="/blog/google-shopping-feed-optimization" style={linkStyle}>what actually moves a Shopping feed</a>.
              </p>
            </section>

            {/* What agencies charge */}
            <section id="what-agencies-charge">
              <h2 style={h2}>What Google Shopping Agencies Actually Charge</h2>
              <p style={para}>
                Published Shopping management fees run 7-15% of ad spend, usually with a flat fee on top. OuterBox states that fees &quot;often include a flat fee plus a percentage of spend, commonly in the 7-15% range&quot; (<a href="https://www.outerboxdesign.com/digital-marketing-services/paid-media/google-shopping-campaign-management/" style={linkStyle} target="_blank" rel="noopener noreferrer">OuterBox, 2026</a>, read 2026-08-20), and hedges it as planning context, not a quote.
              </p>

              {/* VISUAL 3: BigStat : the published full-service spend floor */}
              <BigStat
                value="$25,000"
                label="per month, published full-service floor"
                claim={"is the ad spend floor the SERP's most credentialed Shopping specialist publishes for full service."}
                source="Source: ZATO Marketing, read 2026-08-20"
              />

              <p style={para}>
                We read the pricing language on every page ranking for this keyword on 2026-08-20. Influencer Marketing Hub puts agency fees &quot;between 5% to 15%,&quot; and separately advises allocating &quot;10% to 20% of your total ad spend for the agency&quot; (<a href="https://influencermarketinghub.com/google-shopping-agencies/" style={linkStyle} target="_blank" rel="noopener noreferrer">Influencer Marketing Hub, 2026</a>). Hunter Digital and Softtrix, ranking first and third, publish no figure at all. For a buyer building a budget, that silence is a finding.
              </p>
              <p style={para}>
                The interpretation matters more than the range. A percentage-of-spend fee is regressive for small accounts. Twelve percent of $8,000 is $960 of media budget doing management instead of buying clicks. Twelve percent of $40,000 is $4,800, and at that size the fee buys work that scales with the account rather than with your patience.
              </p>

              <MascotQuote mascot="vox">
                On a $9,400-a-month Shopping account, a 12 percent fee is $1,128 gone before anyone touches a bid. Take the same money: I move $1,100 out of three SKUs sitting at 1.4x ROAS and into eleven running above 5x. Same dollars, different job.
              </MascotQuote>

              <p style={para}>
                Those are illustrative figures, not a client result. Run the same arithmetic on your own spend and see which side the money lands on.
              </p>
              <p style={para}>
                The general ladder of retainers, salaries and subscriptions lives elsewhere: see <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={linkStyle}>the general agency vs in-house vs software cost comparison</a>. We also break down <a href="/blog/ppc-management-cost" style={linkStyle}>what PPC management actually costs</a>.
              </p>
            </section>

            {/* Ownership models */}
            <section id="ownership-models">
              <h2 style={h2}>The Four Ownership Models, Side by Side</h2>
              <p style={para}>
                Four ownership models cover almost every real setup, and each one is defined by who holds System 1 and who holds System 2. Read the second column as Merchant Center first, campaigns second.
              </p>

              {/* VISUAL 4: ResponsiveTable : the four ownership models */}
              <ResponsiveTable
                headers={[
                  'Model',
                  'Merchant Center / Campaigns',
                  'Cost per month',
                  'Best fit',
                  'Failure mode',
                ]}
                rows={[
                  [
                    <strong key="m1">Full-service Shopping specialist</strong>,
                    'Agency / Agency',
                    '7-15% of spend plus a flat fee (OuterBox, 2026-08-20), or flat scoped pricing (ZATO, 2026-08-20)',
                    'ZATO publicly targets $25,000 to $1,000,000/mo; large or volatile catalogs',
                    'At low spend the fee exceeds the margin it recovers',
                  ],
                  [
                    <strong key="m2">General PPC agency</strong>,
                    'You, by default / Agency',
                    'Similar fee, narrower scope; no page on this SERP publishes a separate rate',
                    'Shopping is a minority of spend and the feed is clean',
                    'Nobody owns the feed (Vysta, 2026-08-20)',
                  ],
                  [
                    <strong key="m3">In-house or owner-run with a feed tool</strong>,
                    'You / You',
                    'ShoppingFeeder $20/$120/$500 and GoDataFeed $5 per 1,000 SKUs, both per month (vendor pricing pages, 2026-08-20)',
                    'Owner-operators with real time and a smaller catalog',
                    "Works until the catalog or the owner's calendar grows",
                  ],
                  [
                    <strong key="m4">Self-serve software on campaigns, you keep Merchant Center hygiene</strong>,
                    'You / Software',
                    'Kampaio published tiers $99/$199/$399 per month (2026-08-20)',
                    '$3,000-25,000/mo with a manageable catalog',
                    'Software does not fix a suspended Merchant Center account or argue a misrepresentation appeal',
                  ],
                ]}
              />

              <p style={para}>
                Model 1, the full-service Shopping specialist, is the cleanest answer when it fits. One party owns product data and campaigns, so nothing falls between them. You pay for that tidiness.
              </p>
              <p style={para}>
                Model 2, the general PPC agency, is the common trap. Scope looks broad on the proposal and stops at the Google Ads login.
              </p>
              <p style={para}>
                Model 3, in-house with a feed tool, works for owner-operators with genuine time, which is rarer than owners think. DataFeedWatch (which Hunter Digital states it uses), Feedonomics, Channable, GoDataFeed, ShoppingFeeder and Shopify&apos;s native Google channel sit in this lane.
              </p>
              <p style={para}>
                Model 4 is self-serve software on campaigns, with Merchant Center hygiene still yours. Kampaio&apos;s published tiers are $99, $199 and $399 per month. The limitation in that table cell is real, and we will not bury it: no software argues a policy appeal for you.
              </p>
            </section>

            {/* Feed workload */}
            <section id="feed-workload">
              <h2 style={h2}>The Feed Workload Nobody Prices Into the Retainer</h2>
              <p style={para}>
                Feed operations are ongoing labor, not a setup task that ends. The workload scales with catalog size multiplied by SKU churn multiplied by channel count. That is why a 200-SKU catalog with quarterly changes and a 12,000-SKU catalog with weekly repricing are different businesses on the same Merchant Center.
              </p>
              <p style={para}>
                The recurring jobs are specific: disapproval triage, spec compliance as Google changes requirements, price and availability accuracy, supplemental feeds, seasonal turnover, Merchant Promotions, and appeals. Compliance expands rather than settles. Google now requires disclosure on certain AI-generated or edited assets because &quot;AI regulations in the European Union, India, and New York require&quot; it (<a href="https://support.google.com/merchants/answer/7052112" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Merchant Center, 2026</a>). Promotions carry their own cadence: each expires at 183 days and passes editorial review before it displays (<a href="https://support.google.com/merchants/answer/2906014" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Merchant Center, 2026</a>).
              </p>
              <p style={para}>
                None of that is difficult work. It is constant, which is a different problem, and it never appears as a line item on a proposal. For the tactical layer, see <a href="/blog/google-shopping-optimization" style={linkStyle}>the full Shopping optimization diagnostic</a>.
              </p>
              <p style={para}>
                Of the 33 public discussions we analyzed on 2026-08-20 about Shopping agency management, Merchant Center appeared as its own named topic in about a fifth. Weak corroboration, but directional.
              </p>

              {/* VISUAL 5: Callout (warning) : the asymmetric downside */}
              <Callout variant="warning" title="The asymmetric downside">
                Misrepresentation is the most-cited policy behind Merchant Center suspensions, and a suspension &quot;lasts forever unless you successfully appeal.&quot; It takes Shopping, Local Inventory Ads, PMax product feeds, dynamic remarketing and free listings offline at once, account-wide. First cool-down is usually seven days; appeals are typically limited to one to three attempts. Google publishes no strikes count and no grace period. (Source: John Horn, StubGroup, <a href="https://searchengineland.com/fix-suspended-google-merchant-center-account-474404" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, 2026-04-16</a>.)
              </Callout>

              <p style={para}>
                Suspension risk, not the bidding, is the strongest single argument for paying a specialist. You are buying someone whose full-time job is preventing a zero-revenue week, and whose mistakes do not burn one of your one-to-three appeals.
              </p>
            </section>

            {/* Right call */}
            <section id="right-call">
              <h2 style={h2}>When a Google Shopping Agency Is the Right Call (and When It Is Not)</h2>
              <p style={para}>
                A good Shopping agency at the right spend level is a straightforwardly good deal, and the reason this results page is full of them is that the model works. Kampaio sells software, so our incentive points the other way, and the answer still does not move: past a certain spend and catalog size, hire the specialist. The argument here is about fit, not about agencies being bad at their jobs.
              </p>

              {/* VISUAL 6: SignalStack pair : good-fit vs bad-fit signals */}
              <div className="gsa-fit-grid">
                <SignalStack
                  caption="Hire a Shopping agency if"
                  layers={[
                    { title: 'Spend above roughly $25,000/mo', desc: 'ZATO qualifies full service at $25,000-$1,000,000/mo (2026-08-20).', highlight: true, badge: 'Hire' },
                    { title: 'A suspension or repeat disapproval pattern', desc: 'Appeals are limited to one to three attempts (Search Engine Land, 2026-04-16).', highlight: true, badge: 'Hire' },
                    { title: 'Catalog is large or churns weekly', desc: 'Feed work becomes a standing job, not a monthly chore.', highlight: true, badge: 'Hire' },
                    { title: 'Multiple markets or currencies with separate feeds', desc: 'Promotions are governed per country across 14 named countries (Google, 2026-08-20).', highlight: true, badge: 'Hire' },
                    { title: 'Shopping is your primary revenue channel', desc: 'And you have zero owner hours to give it.', highlight: true, badge: 'Hire' },
                  ]}
                />
                <SignalStack
                  caption="Do not hire one yet if"
                  layers={[
                    { title: 'Spend under roughly $10,000/mo', desc: 'A 10-15% fee exceeds your current wasted spend.', badge: 'Wait' },
                    { title: 'Catalog is small and stable', desc: 'Merchant Center is a monthly check, not a job.', badge: 'Wait' },
                    { title: 'One diagnosable feed or tracking issue', desc: 'A fixed piece of work solves it cheaper than a retainer.', badge: 'Wait' },
                    { title: 'You are below the market floor', desc: 'SmartSites publishes a $1,000+ minimum (Influencer Marketing Hub, 2026-08-20).', badge: 'Wait' },
                    { title: 'You cannot articulate what you would fire them for', desc: 'No retainer will produce that standard for you.', badge: 'Wait' },
                  ]}
                />
              </div>

              <p style={para}>
                Two bad-fit signals deserve emphasis. If you cannot name the condition that would get an agency fired, no retainer will produce one for you. And a structural account problem gets inherited, not fixed. A monthly fee does not repair <a href="/blog/google-ads-conversion-tracking-not-working" style={{ color: '#764ba2', textDecoration: 'underline' }}>broken tracking</a>, it just puts a nicer dashboard on it.
              </p>
              <p style={para}>
                Before signing, read <a href="/blog/how-to-choose-a-ppc-agency" style={linkStyle}>how to vet a PPC agency</a>. The other path is <a href="/blog/google-ads-without-agency" style={linkStyle}>running Google Ads without an agency</a>.
              </p>
            </section>

            {/* Shopping vs general */}
            <section id="shopping-vs-general">
              <h2 style={h2}>What a Shopping Agency Does That a General PPC Agency Does Not</h2>
              <p style={para}>
                The difference is not skill, it is scope, and the scope difference is Merchant Center. Shopping ads run on product data, not keywords, so a generalist optimizing bids is working on half the machine.
              </p>
              <p style={para}>Six scope differences:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Merchant Center ownership and policy work, including disapproval triage and appeals, as a standing duty rather than an emergency.</li>
                <li style={{ marginBottom: '12px' }}>Feed structure and supplemental sources maintained continuously, not built once.</li>
                <li style={{ marginBottom: '12px' }}>Product-level and margin-aware ROAS, because blended return hides which SKUs actually pay.</li>
                <li style={{ marginBottom: '12px' }}>Performance Max for retail: asset groups, brand exclusions, Smart Bidding judged against product economics.</li>
                <li style={{ marginBottom: '12px' }}>Merchant Promotions and a seasonal calendar, with each promotion capped at 183 days.</li>
                <li style={{ marginBottom: 0 }}>Competitive price monitoring on the identical SKU, which no other Google surface requires.</li>
              </ul>
              <p style={para}>
                Be precise about Performance Max, because the standard critique has aged. As of August 2026, Google&apos;s documentation lists asset-group reporting, channel performance and placement reports as native PMax features (<a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads, 2026</a>), so the 2023 &quot;black box&quot; complaint is outdated. What has not changed: no PMax surface reports at the individual SKU level, and a retailer&apos;s problem almost always lives at the SKU.
              </p>
              <p style={para}>Five questions a generalist cannot bluff on a sales call:</p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Who owns Merchant Center in this engagement, in writing?</li>
                <li style={{ marginBottom: '12px' }}>What is your process when a product is disapproved on a Friday?</li>
                <li style={{ marginBottom: '12px' }}>Do you report ROAS at product level or campaign level?</li>
                <li style={{ marginBottom: '12px' }}>How do you handle Performance Max cannibalizing Standard Shopping?</li>
                <li style={{ marginBottom: 0 }}>Who builds and maintains supplemental feeds?</li>
              </ol>
              <p style={para}>Ask them cold. The pauses tell you more than the answers.</p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Frequently Asked Questions</h2>

              <h3 style={h3}>How much does a Google Shopping agency cost?</h3>
              <p style={para}>
                Expect 7-15% of ad spend plus a flat fee, per OuterBox&apos;s published range, corroborated at 5% to 15% by Influencer Marketing Hub (<a href="https://influencermarketinghub.com/google-shopping-agencies/" style={linkStyle} target="_blank" rel="noopener noreferrer">Influencer Marketing Hub, 2026</a>). The dependency comes second: fees track spend and scope, so the same percentage buys very different work at $8,000 and at $40,000.
              </p>

              <h3 style={h3}>At what ad spend does hiring a Google Shopping agency make sense?</h3>
              <p style={para}>
                Roughly $25,000 a month for full service, the band ZATO Marketing publishes for its own top tier, with a lighter tier below that. At the other end of the market, SmartSites publishes a $1,000+ minimum campaign size. Between $10,000 and $25,000, SKU count and churn decide it.
              </p>

              <h3 style={h3}>Who manages my Merchant Center account if I hire an agency?</h3>
              <p style={para}>
                Whoever you name in the contract. As of August 2026 Google ships Merchant Center for Agencies, and it works by linkage: &quot;agencies must be linked to at least one active Merchant Center account&quot; (<a href="https://support.google.com/merchants/answer/16580507" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Merchant Center, 2026</a>). Linkage is not transfer of ownership, so put the responsibility in writing.
              </p>

              <h3 style={h3}>Can software replace a Google Shopping agency?</h3>
              <p style={para}>
                Partly. Software runs and monitors the campaign side, System 2. Software does not argue a misrepresentation appeal, and appeals are typically limited to one to three attempts with a seven-day first cool-down. If your binding risk is policy, not bidding, buy the human.
              </p>

              <h3 style={h3}>Should I hire an agency if my Merchant Center account was suspended?</h3>
              <p style={para}>
                Usually yes, and quickly. Misrepresentation is the most-cited policy behind suspensions, and a suspension persists until a successful appeal (<a href="https://searchengineland.com/fix-suspended-google-merchant-center-account-474404" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, 2026</a>). Attempts are limited, so a specialist who has won appeals is worth more than a month of bid tuning.
              </p>

              <h3 style={h3}>Do I keep ownership of my Google Ads and Merchant Center accounts?</h3>
              <p style={para}>
                Yes, if you set it up that way, and you should insist. Both accounts stay registered to your company, with the agency or software granted access rather than title. Kampaio works this way by default. An agency that owns your accounts owns your conversion history.
              </p>
            </section>

            {/* Conclusion + CTA */}
            <section id="who-owns-the-feed">
              <h2 style={h2}>The Real Question Is Who Owns the Feed</h2>
              <p style={para}>
                Google Shopping is two systems, and whoever owns the product data system owns your downside. That is the decision. The retainer is only the invoice attached to it.
              </p>
              <p style={para}>
                Monday action: open Merchant Center, open the diagnostics tab, count the disapprovals and out-of-stock products, and ask who is accountable for that number. If the answer is nobody, you have found the actual problem. Then pick the model that gives that number an owner, whether or not that model has our name on it.
              </p>
              <p style={para}>
                Kampaio runs the campaign side continuously and shows every change, and both accounts stay in your name. <a href="/pricing" style={linkStyle}>Kampaio pricing starts at $99/month</a>.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Give the campaign side an owner this week
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Vox watches product-level ROAS and moves budget off the SKUs that are not paying, while Merchant Center stays in your name.
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
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2}>Sources</h2>
              <ul style={{ ...listStyle, fontSize: '16px', overflowWrap: 'anywhere' }}>
                <li style={{ marginBottom: '10px' }}>ZATO Marketing: <a href="https://zatomarketing.com/google-shopping-agency" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Shopping agency service page</a> (read 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>OuterBox: <a href="https://www.outerboxdesign.com/digital-marketing-services/paid-media/google-shopping-campaign-management/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Shopping campaign management</a> (read 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>Influencer Marketing Hub: <a href="https://influencermarketinghub.com/google-shopping-agencies/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Shopping agencies</a> (read 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>Hunter Digital: <a href="https://hunterdigitalmarketing.com/google-shopping/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Shopping service page</a> (read 2026-08-20, no pricing published)</li>
                <li style={{ marginBottom: '10px' }}>Softtrix: <a href="https://www.softtrix.com/google-shopping-management/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Shopping management</a> (read 2026-08-20, no pricing published)</li>
                <li style={{ marginBottom: '10px' }}>Vysta: <a href="https://growwithvysta.com/blog/best-google-ads-agencies-for-ecommerce-brands-in-the-us/" style={linkStyle} target="_blank" rel="noopener noreferrer">Best Google Ads agencies for ecommerce brands in the US</a> (read 2026-08-20, self-disclosed as one of the compared agencies)</li>
                <li style={{ marginBottom: '10px' }}>Google: <a href="https://support.google.com/merchants/answer/16580507" style={linkStyle} target="_blank" rel="noopener noreferrer">Merchant Center for Agencies</a> (as of August 2026)</li>
                <li style={{ marginBottom: '10px' }}>Google: <a href="https://support.google.com/merchants/answer/7052112" style={linkStyle} target="_blank" rel="noopener noreferrer">Product data specification</a> (verified 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>Google: <a href="https://support.google.com/merchants/answer/6149970" style={linkStyle} target="_blank" rel="noopener noreferrer">Shopping ads policies</a> (verified 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>Google: <a href="https://support.google.com/google-ads/answer/2454022" style={linkStyle} target="_blank" rel="noopener noreferrer">About Shopping ads</a> (verified 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>Google: <a href="https://support.google.com/google-ads/answer/10724817" style={linkStyle} target="_blank" rel="noopener noreferrer">About Performance Max</a> (verified 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>Google: <a href="https://support.google.com/merchants/answer/2906014" style={linkStyle} target="_blank" rel="noopener noreferrer">Promotions data specification</a> (verified 2026-08-20)</li>
                <li style={{ marginBottom: '10px' }}>John Horn (StubGroup), Search Engine Land: <a href="https://searchengineland.com/fix-suspended-google-merchant-center-account-474404" style={linkStyle} target="_blank" rel="noopener noreferrer">How to fix a suspended Google Merchant Center account</a> (2026-04-16)</li>
                <li style={{ marginBottom: '10px' }}>Feed tool pricing: <a href="https://www.shoppingfeeder.com/pricing" style={linkStyle} target="_blank" rel="noopener noreferrer">ShoppingFeeder</a>, <a href="https://www.godatafeed.com/pricing" style={linkStyle} target="_blank" rel="noopener noreferrer">GoDataFeed</a> (read 2026-08-20)</li>
                <li style={{ marginBottom: 0 }}>Kampaio pricing: <a href="/pricing" style={linkStyle}>kampaio.com/pricing</a> (verified 2026-08-20)</li>
              </ul>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. Fee ranges and vendor prices are cited to their original sources and were verified on August 20, 2026; your own spend, catalog and margins will differ, so use the models as a starting frame, not a quote.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-shopping-agency" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
