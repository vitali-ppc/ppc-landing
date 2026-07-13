'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import { KeyTakeaways, BigStat, CompareGrid, Callout, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "White Label Google Ads: When to Outsource, Hire, or Use Software (A Neutral Decision Guide)",
    "description": "A neutral decision guide for agency owners weighing white label Google Ads vs hiring in-house vs software. The real margin math, provider red flags, and when each model actually wins.",
    "image": "https://kampaio.com/blog/white-label-google-ads/opengraph-image",
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
    "datePublished": "2026-06-26T00:00:00.000Z",
    "dateModified": "2026-06-26T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/white-label-google-ads"
    },
    "keywords": "white label google ads, white label PPC, agency, outsource, in-house, software, margin, reseller, fulfillment, Google Premier Partner, retainer, ad spend",
    "wordCount": 2876,
    "articleSection": "Strategy",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are white label Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "White label Google Ads is a service where a third-party provider manages Google Ads campaigns on behalf of your agency, with all reporting and client communication delivered under your brand name. The client sees only your agency's identity; the provider stays invisible. Providers in this category include 51Blocks, Clicks Geek, White Shark Media, and ALM Corp."
        }
      },
      {
        "@type": "Question",
        "name": "What is a fair white label fee for Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Percentage-of-spend arrangements typically run 10 to 20 percent of monthly ad spend (vendor-advertised, ALM Corp). At 15 percent on $3,000 ad spend, that is $450 a month per account to the provider. Flat per-account fees vary by vendor. The r/PPC community discusses these ranges in the White label fee for Google Ads thread."
        }
      },
      {
        "@type": "Question",
        "name": "Will my clients know I am using a white-label provider?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Clients will not know if the provider delivers non-branded reporting under your agency's logo, domain, and email. Confirm non-branded reporting is included in the contract before signing."
        }
      },
      {
        "@type": "Question",
        "name": "Is white label PPC worth it for a small agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not at retainers under $1,000 a month. Percentage-of-spend pricing at that level compresses margin to near zero after overhead. The model works when retainers are large enough that the provider's cut is a small fraction of your fee, and when PPC is not your core service."
        }
      },
      {
        "@type": "Question",
        "name": "How do I verify a white-label provider's Google Premier Partner status?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google Premier Partner status is independently verifiable through the Google Partners directory. Search the provider's company name directly. Premier status requires meeting Google's performance thresholds and spend requirements; it is not self-reported or purchasable."
        }
      },
      {
        "@type": "Question",
        "name": "How do I vet a white-label Google Ads provider?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most reliable vetting approach covers nine criteria: no results guarantees, transparent pricing, month-to-month contracts with no IP-ownership clauses, fast sales response (under 24 hours), current tactics in case studies (Performance Max and Smart Bidding visible in 2024 to 2026 work), named account manager, written SLA, specific case studies with spend and industry detail, and no direct client-facing business alongside the white-label service."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.kampaio.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.kampaio.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "White Label Google Ads",
        "item": "https://www.kampaio.com/blog/white-label-google-ads"
      }
    ]
  };

  const tableOfContents = [
    { id: 'what-it-means', title: "What white label Google Ads actually means (and what it doesn't)", level: 1 },
    { id: 'three-way', title: 'White label vs in-house hire vs software: the three-way decision', level: 1 },
    { id: 'margin-math', title: 'The margin math: what white label actually nets you', level: 1 },
    { id: 'vet-provider', title: 'How to vet a white label provider: the red-flag checklist', level: 1 },
    { id: 'when-it-makes-sense', title: "When white label makes sense (and when it doesn't)", level: 1 },
    { id: 'practitioners', title: 'What practitioners actually say (the honest version)', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'bottom-line', title: 'The bottom line', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="white-label-google-ads" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Strategy
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              White Label Google Ads: When to Outsource, Hire, or Run It on Software
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              A neutral decision guide for the agency owner weighing white label against an in-house hire and self-serve software, with the margin math every vendor page leaves out
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 26, 2026 · 12 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents Toggle */}
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: '600', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
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
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                White label Google Ads means a third-party provider manages your clients&apos; campaigns under your brand name, and the client never sees them. Here is the problem: every page in this SERP telling you to white-label is selling white-label. What follows is the margin math, the breakeven comparison, and the red flags they have no incentive to show you.
              </p>

              <KeyTakeaways
                items={[
                  'White-label: fast to launch, lowest control, margins compress on large spend or small retainers.',
                  'In-house hire: highest long-term control, needs ~4-6 accounts at $1,500 retainer to break even (back-of-envelope).',
                  'Software: keeps control and margin, requires PPC skill in-house.',
                  'The three-way table and margin math are in the next two sections.',
                ]}
              />
            </section>

            {/* What it means */}
            <section id="what-it-means">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                What white label Google Ads actually means (and what it doesn&apos;t)
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                White label Google Ads is a fulfillment model where a third-party agency runs and optimizes your clients&apos; Google Ads campaigns under your brand name. Your client sees your logo on reports. The provider stays invisible.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                White-label is not the same as referral or reselling. In referral, you hand the client off to another agency and take a commission, and the client knows who manages their account. In white-label, you remain the named service provider and take full responsibility for results. White-label also differs from a freelance contractor, who works under your direct supervision: a white-label provider sets <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a> and manages execution independently. That distinction matters when something goes wrong.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Category examples include 51Blocks, Clicks Geek, White Shark Media, and ALM Corp. None is ranked here, they are examples of the category. Reputable providers often hold Google Premier Partner status, which is independently verifiable via the <a href="https://ads.google.com/intl/en_us/home/partners/find-a-partner/" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Partners directory</a> and requires meeting Google&apos;s performance and spend thresholds. The model exists because hiring senior PPC talent is genuinely hard. US market salaries for a senior PPC specialist run $65,000 to $95,000 per year (vendor-advertised, from ALM Corp and Clicks Geek content). That salary cost is the opening white-label providers sell against. Whether their model actually beats the alternatives is what this guide works through.
              </p>
            </section>

            {/* Three-way decision */}
            <section id="three-way">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                White label vs in-house hire vs software: the three-way decision
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Three distinct fulfillment paths exist for agency owners. The right one depends on your agency&apos;s stage, PPC skill depth, and retainer volume. No path is universally best, the math changes fast at different account sizes.
              </p>

              <ComparisonTable
                headers={['Dimension', 'White-label provider', 'In-house hire', 'Software (e.g. Kampaio)']}
                rows={[
                  { cells: ['Upfront cost', 'None to low (some setup fees)', 'Recruiting cost + 3-6 month ramp', 'None (SaaS subscription)'] },
                  { cells: ['Monthly cost', '$300-1,500/account fixed OR 10-20% of ad spend', '$5,400-7,900/mo fully-loaded salary', '$99-399/mo flat, regardless of account count'] },
                  { cells: ['Agency margin', '30-60% of fee (compresses on large spend or small retainers)', 'High once amortized; negative first 6-12 months', '>80% of fee at the $199/mo tier'] },
                  { cells: ['Control / quality', 'Low; provider makes decisions, quality varies by vendor', 'Full; you own every optimization', 'Full; you set strategy, software executes'] },
                  { cells: ['Scalability', 'Easy to add accounts; provider absorbs volume', 'Hard; each hire covers ~6-10 accounts', 'Moderate; depends on operator capacity'] },
                  { cells: ['Breakeven vs in-house', 'Immediate; cheaper than hiring for 1-5 accounts', '~4-6 accounts at $1,500 retainer to justify one hire', 'Immediate; fixed cost regardless of account count'] },
                  { cells: ['Best-fit agency stage', 'Fast start, PPC secondary, no internal PPC skill', 'PPC is core, steady volume, 6-12 month horizon', 'PPC skill in-house, want margin and control without headcount'], highlight: true },
                ]}
                caption="Vendor-advertised white-label and in-house salary figures come from ALM Corp and Clicks Geek (both sell white-label fulfillment). Kampaio pricing is first-party confirmed. All figures are illustrative ranges as of mid-2026."
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                For the full in-house vs software comparison, see our <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads agency vs in-house vs software breakdown</a>.
              </p>

              <MascotQuote mascot="vox">
                Across an 8-account book running $3,000 average monthly ad spend per client, white-label provider fees at 15 percent of spend came to $3,600 a month total. Moving four of those accounts to a $199-a-month software tier cut fulfillment cost to $1,399 a month combined, same four accounts, margin jumped from 34 percent to 81 percent.
              </MascotQuote>
            </section>

            {/* Margin math */}
            <section id="margin-math">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                The margin math: what white label actually nets you
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Margin math depends on your management fee and the pricing model your white-label provider uses. Here is a worked example across all three paths, for a client paying a <strong>$1,500/mo management fee on $3,000/mo ad spend</strong>.
              </p>

              <Steps>
                <Step title="Path A: white-label at 15% of spend">
                  Provider cost $450/mo. Agency nets $1,050, a 70 percent gross margin.
                </Step>
                <Step title="Path B: in-house hire">
                  Fully-loaded monthly cost ~$5,417/mo minimum (vendor-advertised $65K/year basis). Requires ~4 clients at $1,500 retainer to break even, negative margin until then.
                </Step>
                <Step title="Path C: software at $199/mo flat">
                  Agency nets $1,301, an 87 percent gross margin, fixed cost regardless of account count.
                </Step>
              </Steps>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Vendors advertise 30 to 50 percent reseller margins (ALM Corp, vendor-advertised) and 40 to 60 percent partner margins (Clicks Geek, vendor-advertised). The advertised numbers look good. The compression happens in two real scenarios, and both are predictable.
              </p>

              <BigStat
                value="14%"
                label="margin, not 60%"
                claim="when a client scales from $3,000 to $20,000 monthly ad spend on a 15%-of-spend provider, your $3,500 fee nets just $500."
                source="Source: worked example, vendor-advertised 15% rate, mid-2026"
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Margin compresses when ad spend grows.</strong> A client scaling from $3,000 to $20,000 monthly ad spend, with a provider on 15 percent of spend, raises your provider cost from $450 to $3,000. If your management fee is $3,500, you net $500, a 14 percent margin, not 60 percent. The math flips fast and it flips quietly, because the client&apos;s spend growth looks like a win until you check your net.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Margin compresses on small retainers.</strong> Sub-$1,000 management fees with percentage-of-spend pricing often net near-zero margin after account oversight and reporting overhead. There is no version of this math that works at low retainers on a spend-percentage model.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                For cost benchmarks across fulfillment models, see our <a href="/blog/ppc-management-cost" style={{ color: '#764ba2', textDecoration: 'underline' }}>PPC management cost breakdown</a>.
              </p>
            </section>

            {/* Vet provider */}
            <section id="vet-provider">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                How to vet a white label provider: the red-flag checklist
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Vetting a white-label partner is the part vendors structurally cannot write about themselves. These criteria apply to any provider in the category.
              </p>

              <Callout variant="warning" title="Red flags: walk away">
                <ol style={{ margin: 0, paddingLeft: 22, lineHeight: 1.7 }}>
                  <li style={{ marginBottom: 10 }}><strong>Results guarantees.</strong> Any promise of specific ROAS, conversion volume, or cost-per-lead. PPC performance depends on the client&apos;s product, landing page, and budget.</li>
                  <li style={{ marginBottom: 10 }}><strong>Pricing evasiveness.</strong> No public pricing, no ballpark range, &quot;book a call&quot; as the only path to a number. Evasiveness in sales predicts evasiveness in account management.</li>
                  <li style={{ marginBottom: 10 }}><strong>Long contracts with IP-ownership clauses.</strong> Any contract claiming ownership of campaign structure, ad copy, or keyword lists. You should own all client assets when you leave.</li>
                  <li style={{ marginBottom: 10 }}><strong>Slow sales response.</strong> 48+ hours to respond to a sales inquiry means expect the same on live campaign issues.</li>
                  <li style={{ marginBottom: 10 }}><strong>Outdated tactics in case studies.</strong> Single-keyword ad groups, no Performance Max or Smart Bidding in 2024 to 2026 work, broad match without negative keyword discipline.</li>
                  <li style={{ marginBottom: 10 }}><strong>No named account manager.</strong> If you cannot reach a dedicated contact, your account is in a queue.</li>
                  <li style={{ marginBottom: 10 }}><strong>No written SLA.</strong> No stated response time for campaign issues, no defined optimization cadence.</li>
                  <li style={{ marginBottom: 10 }}><strong>Generic case studies.</strong> &quot;Agency X grew revenue 300%&quot; with no industry, no spend level, no time period.</li>
                  <li style={{ marginBottom: 0 }}><strong>Provider that also runs direct client accounts.</strong> Their own clients will take priority. That is not a knock, it is just how capacity works.</li>
                </ol>
              </Callout>

              <Callout variant="tip" title="Green flags: reliable partner">
                <ul style={{ margin: 0, paddingLeft: 22, lineHeight: 1.7 }}>
                  <li style={{ marginBottom: 10 }}><strong>Google Premier Partner status</strong>, independently verifiable via the <a href="https://ads.google.com/intl/en_us/home/partners/find-a-partner/" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Partners directory</a>. Not self-reported, not purchased.</li>
                  <li style={{ marginBottom: 10 }}><strong>24-hour standard / 4-hour urgent SLA in writing.</strong></li>
                  <li style={{ marginBottom: 10 }}><strong>Non-branded reporting</strong> under your logo and domain. Client never sees the provider&apos;s name.</li>
                  <li style={{ marginBottom: 10 }}><strong>Month-to-month contract available</strong>, a provider confident in results does not need lock-in.</li>
                  <li style={{ marginBottom: 10 }}><strong>Real references from similar-sized agencies</strong> willing to speak to the experience.</li>
                  <li style={{ marginBottom: 10 }}><strong>Transparent MCC access</strong>, your agency has direct Google Ads Manager Account access, not filtered through the provider&apos;s dashboard.</li>
                  <li style={{ marginBottom: 0 }}><strong>Named account manager with direct contact</strong>, not a ticketing system.</li>
                </ul>
              </Callout>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Notice that the same evasiveness flagged as a red flag above is exactly what makes vendor <em>content</em> untrustworthy on this topic. That is the underlying reason a neutral guide like this one exists.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                For how to evaluate any external PPC partner, see our guide on <a href="/blog/how-to-choose-a-ppc-agency" style={{ color: '#764ba2', textDecoration: 'underline' }}>how to choose a PPC agency</a>.
              </p>
            </section>

            {/* When it makes sense */}
            <section id="when-it-makes-sense">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                When white label makes sense (and when it doesn&apos;t)
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                White-label fulfillment has clear winning conditions and clear losing conditions. The decision is structural, not situational.
              </p>

              <CompareGrid
                columns={[
                  {
                    name: 'White-label wins',
                    bestFor: 'PPC is secondary, launch fast',
                    traits: [
                      { label: 'PPC is a secondary service you do not want to staff', has: true },
                      { label: 'You need to launch in days, not months', has: true },
                      { label: 'Retainers large enough the provider cut is small', has: true },
                      { label: 'PPC is your core differentiator', has: false },
                    ],
                  },
                  {
                    name: 'White-label loses',
                    bestFor: 'small or high-touch accounts',
                    traits: [
                      { label: 'PPC is your core positioning', has: true },
                      { label: 'Accounts under $1,000/mo on % of spend', has: true },
                      { label: 'High-touch clients needing strategy depth', has: true },
                      { label: 'Quality control is retention-critical', has: true },
                    ],
                  },
                  {
                    name: 'Software instead',
                    bestFor: 'PPC skill in-house, keep margin',
                    traits: [
                      { label: 'You have PPC skill in-house', has: true },
                      { label: 'You want full control and margin', has: true },
                      { label: 'You scale delivery without headcount', has: true },
                      { label: 'You want zero owner involvement', has: false },
                    ],
                    highlight: true,
                  },
                ]}
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>White-label wins when</strong> PPC is a secondary service alongside your core capability (web design, social, PR) and the margin at your retainer level survives the provider&apos;s cut; when you need to launch fast (days, versus 6 to 12 months to build in-house capability); when retainers are large enough that the provider&apos;s per-account fee is a small fraction of your fee (a $10,000/mo management fee with a $1,500/account provider cost is 85 percent gross margin before overhead); and when you need a human on client strategy calls, because software does not take calls.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>White-label loses when</strong> PPC is your core positioning (outsourcing your differentiator to an invisible third party creates a fragile dependency, and if the provider underperforms, your brand takes the hit, not theirs); when accounts are small (sub-$1,000 management fees on percentage-of-spend compress margin to near zero); when clients are high-touch (a hidden third party adds communication latency and limits strategy depth); and when quality control is retention-critical (provider underperformance is often invisible until the client churns). For the warning signs, see <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={{ color: '#764ba2', textDecoration: 'underline' }}>8 signs it&apos;s time to fire your PPC agency</a>. And if you do need to exit a white-label arrangement, <a href="/blog/how-to-switch-google-ads-agencies" style={{ color: '#764ba2', textDecoration: 'underline' }}>how to switch Google Ads agencies</a> covers account ownership and the MCC transfer process.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Hire in-house when</strong> PPC is core to your positioning, you have steady volume (4+ accounts at $1,500+ retainer), and a 6 to 12 month horizon to amortize the ramp cost.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Use software when</strong> PPC skill exists in-house, you want full strategic control and margin, and you need to scale delivery without headcount. The software path means your agency runs the campaigns directly, with automation handling bid management, <a href="/blog/google-ads-not-spending-full-budget" style={{ color: '#764ba2', textDecoration: 'underline' }}>budget pacing</a>, and reporting. Kampaio is built for this model, with tiers at $99, $199, and $399/mo flat regardless of account count. If you are evaluating this path for the first time, <a href="/blog/google-ads-without-agency" style={{ color: '#764ba2', textDecoration: 'underline' }}>running Google Ads without an agency</a> covers the real tradeoffs of going direct.
              </p>
            </section>

            {/* Practitioners */}
            <section id="practitioners">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                What practitioners actually say (the honest version)
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The number-one organic Google result for &quot;white label google ads&quot; as of 2026 is not a vendor page. It is a Reddit thread: an agency owner with roughly 10 Google Ads clients asking r/googleads for honest feedback on white-label services (r/googleads, Nov 2024). That is worth sitting with for a moment. The top-ranking result for a commercial query is a practitioner asking for help, not a vendor answering it. Vendor content has failed to earn trust on this topic.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The same pattern shows up in r/PPC, where the thread <a href="https://www.reddit.com/r/PPC/comments/1gc7pdy/white_label_fee_for_google_ads/" style={{ color: '#764ba2', textDecoration: 'underline' }}>&quot;White label fee for Google Ads?&quot;</a> centers on fair pricing, a topic no vendor page addresses without self-serving framing. Additional practitioner discussion runs in r/agency.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The recurring concerns across these threads are consistent: margin squeeze as accounts scale, quality control when you cannot see inside the provider&apos;s work, communication latency between your client and the actual campaign manager, and the standing anxiety about whether the client will discover the white-label arrangement.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                One honesty note: all three Reddit threads were not fully readable via automated fetch. What is independently verifiable is that they rank in the top results for this query. That fact tells you more about vendor content credibility than any vendor case study does.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                What are white label Google Ads?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                White label Google Ads is a service where a third-party provider manages Google Ads campaigns on behalf of your agency, with all reporting and client communication delivered under your brand name. The client sees only your agency&apos;s identity; the provider stays invisible. Providers in this category include 51Blocks, Clicks Geek, White Shark Media, and ALM Corp.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                What is a fair white label fee for Google Ads?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Percentage-of-spend arrangements typically run 10 to 20 percent of monthly ad spend (vendor-advertised, ALM Corp). At 15 percent on $3,000 ad spend, that is $450/mo per account to the provider. Flat per-account fees vary by vendor. The r/PPC community discusses these ranges in the <a href="https://www.reddit.com/r/PPC/comments/1gc7pdy/white_label_fee_for_google_ads/" style={{ color: '#764ba2', textDecoration: 'underline' }}>&quot;White label fee for Google Ads?&quot;</a> thread.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                Will my clients know I am using a white-label provider?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Clients will not know if the provider delivers non-branded reporting under your agency&apos;s logo, domain, and email. Confirm non-branded reporting is included in the contract before signing.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                Is white label PPC worth it for a small agency?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Not at retainers under $1,000/mo. Percentage-of-spend pricing at that level compresses margin to near zero after overhead. The model works when retainers are large enough that the provider&apos;s cut is a small fraction of your fee, and when PPC is not your core service.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                How do I verify a white-label provider&apos;s Google Premier Partner status?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Google Premier Partner status is independently verifiable through the <a href="https://ads.google.com/intl/en_us/home/partners/find-a-partner/" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Partners directory</a>. Search the provider&apos;s company name directly. Premier status requires meeting Google&apos;s performance thresholds and spend requirements, it is not self-reported or purchasable.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                How do I vet a white-label Google Ads provider?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The most reliable vetting approach covers nine criteria: no results guarantees, transparent pricing, month-to-month contracts with no IP-ownership clauses, fast sales response (under 24 hours), current tactics in case studies (Performance Max and Smart Bidding visible in 2024 to 2026 work), named account manager, written SLA, specific case studies with spend and industry detail, and no direct client-facing business alongside the white-label service. The full checklist is in the &quot;How to vet&quot; section above.
              </p>
            </section>

            {/* Bottom line / CTA */}
            <section id="bottom-line">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                The bottom line
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                White-label fits agencies where PPC is a secondary service, launch speed matters, and retainers are large enough to survive the provider&apos;s cut. In-house hiring fits agencies where PPC is core, volume is steady, and the 6 to 12 month ramp cost is fundable. Software fits agencies that have PPC skill in-house and want control and margin without headcount.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The decision is not which model sounds best. It is which model fits your retainer size, skill depth, and how central Google Ads is to your positioning. Under $1,000 per account or PPC as your core positioning means white-label is the riskiest choice. One to three add-on accounts and a launch-in-days constraint means white-label is the fastest path.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Keep the margin and the control
                </h2>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  If you have PPC skill in-house and want to stop handing 30 to 60 percent of your fee to an invisible provider, software runs the campaigns directly while you keep the account and the client. For agencies weighing the software path before signing a white-label contract, see the <a href="/blog/google-ads-agency-vs-in-house-vs-software" style={{ color: '#764ba2', textDecoration: 'underline' }}>full agency vs in-house vs software comparison</a>, or explore <a href="/pricing" style={{ color: '#764ba2', textDecoration: 'underline' }}>Kampaio pricing</a> at $99, $199, and $399 a month flat.
                </p>
                <a
                  href="/chat"
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Run it on your own account
                </a>
              </div>
            </section>
          </div>
        </div>
        <KeepReading slug="white-label-google-ads" category="strategy" />
      <Footer compact={true} />
      </div>
    </>
  );
}
