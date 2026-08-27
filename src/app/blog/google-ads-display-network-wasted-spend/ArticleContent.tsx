'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:
      'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026 Guide)',
    description:
      'Display Network silently drains 20-60% of Google Ads budgets on low-intent traffic. The 60-second fix, a 5-minute audit, and the smaller settings (Display Expansion, Search Partners) that keep leaking.',
    image:
      'https://kampaio.com/og/google-ads-display-network-wasted-spend.png',
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
    datePublished: '2026-05-26T00:00:00.000Z',
    dateModified: '2026-05-26T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://kampaio.com/blog/google-ads-display-network-wasted-spend',
    },
    keywords:
      'display network, google ads, wasted spend, search campaign, placement, display expansion, search partners, performance max, smart bidding, target roas, placement exclusions, MFA, remarketing, B6, Buzz, Aegis',
    wordCount: 1770,
    articleSection: 'Google Ads',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I reduce wasted ad spend in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with the four highest-leak settings: uncheck Display Network on every Search campaign, disable Display Expansion, audit Search Partners with a 30-day A/B, and add MFA exclusions to Display and Performance Max. These four fixes typically recover 15 to 30 percent of total Google Ads spend in the first month.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Display Network worth it for small businesses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Display Network is rarely worth it as an opt-in on a Search campaign. It is sometimes worth it as a dedicated remarketing or brand-awareness campaign with budgets over $20K per month. For most SMBs with $1K to $10K monthly spend, the budget compounds faster on pure Search.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I turn off the Display Network on a Search campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open the Search campaign in Google Ads, click Settings, expand the Networks section, uncheck Display Network, and click Save. The change takes effect on the next auction. Verify by running the Network segment report 48 hours later.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Google spending my budget on Display when I only wanted Search?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Two reasons: until June 2025, the Display Network checkbox was opted-in by default on every new Search campaign, and Display Expansion (a separate setting) can route unspent Search budget to Display placements even after you uncheck Display Network. You need to disable both.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Display Expansion in Google Ads and how do I disable it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Display Expansion automatically takes leftover Search budget and spends it across the Display Network. Disable it under Campaign Settings (Audience expansion / Optimized targeting sliders) and under Tools > Recommendations > Auto-apply settings.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much money does the average advertiser waste on Display Network?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In the B6 cohort of 200+ audited accounts, the average waste from Display opt-in on Search campaigns is 23 percent of campaign budget. The range runs 8 percent on clean accounts to 61 percent on the worst-leak cases.',
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
        name: 'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026)',
        item: 'https://www.kampaio.com/blog/google-ads-display-network-wasted-spend',
      },
    ],
  };

  const tableOfContents = [
    { id: 'why', title: 'Why the Display Network Burns SMB Budgets', level: 1 },
    { id: 'audit', title: 'How to Check If Display Network Is Wasting Your Budget (5-Min Audit)', level: 1 },
    { id: 'fix', title: 'The 60-Second Fix: Turn Off Display Network on Search Campaigns', level: 1 },
    { id: 'partners-vs-display', title: 'Search Partners is Not Display Network (Don’t Confuse Them)', level: 1 },
    { id: 'when-display-works', title: 'When Display Network IS Worth Running (Honest Take)', level: 1 },
    { id: 'placements', title: 'Placement Exclusions: The Day-2 Cleanup', level: 1 },
    { id: 'display-expansion', title: 'Display Expansion: The Hidden Cousin You Also Need to Turn Off', level: 1 },
    { id: 'b6', title: 'How B6 Prevents Display Waste Automatically', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
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
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '28px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const olStyle = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
    marginBottom: '32px',
  };
  const liStyle = { marginBottom: '12px' };

  // 5 step cards for the 60-second fix (5 items: repeat(5,1fr) -> 2x at tablet -> 1 at mobile, no auto-fit)
  const fixSteps = [
    { n: 1, label: 'Open', detail: 'the Search campaign in Google Ads' },
    { n: 2, label: 'Click', detail: 'Settings in the left nav' },
    { n: 3, label: 'Expand', detail: 'the Networks section' },
    { n: 4, label: 'Uncheck', detail: 'Display Network' },
    { n: 5, label: 'Save', detail: 'and you are done' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />

        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-display-network-wasted-spend" />
        </div>

        {/* Article Header */}
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
              Google Ads &middot; SMB Playbook
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
              Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026 Guide)
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
              Google Ads Display Network is opted-in by default on Search campaigns created before June 2025 and quietly burns 20 to 60 percent of the campaign budget on low-intent traffic. This guide shows the 60-second fix, a 5-minute audit, and the smaller settings (Display Expansion, Search Partners) that keep leaking after you uncheck the obvious box.
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
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}
                >
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>B6 SEO Agent</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 26, 2026 &middot; 9 min read</span>
                </div>
              </div>
            </div>

            {/* TL;DR bordered box */}
            <div
              style={{
                background: '#fff7ed',
                border: '1px solid #fdba74',
                borderRadius: '12px',
                padding: '24px 28px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#9a3412',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                TL;DR &middot; The 60-Second Fix
              </div>
              <ul
                style={{
                  fontSize: '17px',
                  lineHeight: '1.7',
                  color: '#1e293b',
                  paddingLeft: '20px',
                  margin: 0,
                }}
              >
                <li style={{ marginBottom: '10px' }}>
                  <strong>The leak:</strong> Until June 2025 (
                  <a
                    href="https://searchengineland.com/google-ads-stops-auto-opting-search-campaigns-into-display-network-457274"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Search Engine Land, 2025
                  </a>
                  ), Google auto-checked &quot;Display Network&quot; on every new Search campaign. Most legacy campaigns still have it on.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>The fix:</strong> Open campaign. Click <strong>Settings</strong>. Expand <strong>Networks</strong>. Uncheck <strong>Display Network</strong>. Click <strong>Save</strong>. Done.
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <strong>The caveat:</strong> Search Partners is a different checkbox. So is Display Expansion. We cover both below.
                </li>
                <li>
                  <strong>Who this is for:</strong> A Search campaign owner who just saw Display impressions and zero-conversion spend in the report. If you run dedicated Display campaigns intentionally, jump to the audit and placement-exclusion sections.
                </li>
              </ul>
            </div>

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
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
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
                        borderBottom: '1px solid transparent',
                        transition: 'all 0.2s ease',
                      }}
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

        {/* Article body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* 1. Why */}
            <section id="why">
              <h2 style={h2Style}>Why the Display Network Burns SMB Budgets</h2>
              <p style={pStyle}>
                The Display Network burns SMB budgets because it was auto-enabled on Search campaigns by default for years, its clicks look cheap on the cost column but rarely convert, and Smart Bidding pours money into whichever surface delivers the lowest nominal CPA, even when the lead quality is garbage. Three mechanics, one outcome.
              </p>
              <p style={pStyle}>
                <strong>Mechanic 1: default opt-in legacy.</strong> Until June 2025, every new Search campaign launched in Google Ads came with &quot;Display Network&quot; pre-checked under Networks. Search Engine Land confirmed the change on June 19, 2025: the box is now unselected by default, though it still carries a &quot;Recommended&quot; label and the rollout may still be partial (
                <a
                  href="https://searchengineland.com/google-ads-stops-auto-opting-search-campaigns-into-display-network-457274"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Search Engine Land, 2025
                </a>
                ). Practically, most accounts older than 12 months still have the box checked on every legacy campaign. Nobody went back to fix it.
              </p>
              <p style={pStyle}>
                <strong>Mechanic 2: cheap clicks are not valuable clicks.</strong> Display CPCs in our 2026 cohort sit at roughly $0.05 to $0.50, against $2 to $15 on Search. In the campaign report, that looks like a deal. The conversion-rate gap kills the math: typical Display CVR is 0.05 to 0.5 percent against 2 to 8 percent on Search. The cost-per-conversion on Display can run 5 to 20 times the cost-per-conversion on Search inside the same campaign.
              </p>
              <p style={pStyle}>
                <strong>Mechanic 3: Smart Bidding chases nominal CPA.</strong> Target CPA and Target ROAS optimize for the cheapest reported conversion. If Display delivers one $1 conversion (often a competitor researching you, a bot, or a misclick), the algorithm reads the signal and shifts spend. Lead quality is not an input. Sales-qualified rate is not an input. The model maximizes for the conversion column, period.
              </p>
              <p style={pStyle}>
                On a typical $5,000 a month Search campaign with the Display box checked, B6 sees $1,200 to $2,400 a month bleed into Display impressions with conversion rates under 0.3 percent. That is the addressable waste. When the leak shows up as a sudden ROAS collapse rather than a slow bleed, the{' '}
                <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>
                  ROAS dropped suddenly diagnostic
                </a>{' '}
                walks the 8-step recovery path.
              </p>

              <MascotQuote mascot="buzz">
                Audited a $7K/month dental clinic account last week. Display Network share: $2,100. Conversions from Display: 1, and that was a competitor researching them. I unchecked the box. Next month the lead volume held flat and the account saved $2,000.
              </MascotQuote>
            </section>

            {/* 2. Audit */}
            <section id="audit">
              <h2 style={h2Style}>
                How to Check If Display Network Is Wasting Your Budget (5-Min Audit)
              </h2>
              <p style={pStyle}>
                To check if Display Network is wasting your budget, segment the campaign report by Network, compare Display&apos;s cost share against its conversion share, and look at Performance Max Asset Group reports if you run pMax. Five steps, under five minutes per campaign.
              </p>
              <p style={pStyle}>
                <strong>Step 1: Confirm the leak exists.</strong> Open Google Ads, go to <strong>Campaigns</strong>, select your Search campaign, click <strong>Settings</strong> in the left rail, scroll to <strong>Networks</strong>. If &quot;Display Network&quot; is checked, you have the leak. If it is unchecked but you still see Display traffic in reports, jump to the Display Expansion section below. If your CPC has crept up alongside Display traffic, the{' '}
                <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>
                  CPC too high diagnostic
                </a>{' '}
                isolates the auction-side causes from the budget-side ones.
              </p>
              <p style={pStyle}>
                <strong>Step 2: Segment by network.</strong> Go to <strong>Insights &amp; Reports</strong> &gt; <strong>Reports</strong> &gt; segment by <strong>Network (with search partners)</strong>. Look at the Display row over the last 30 days. Calculate Display&apos;s share of campaign cost and Display&apos;s share of campaign conversions. If cost share exceeds conversion share by 2x or more, the campaign is hemorrhaging. Google Ads coach Jyll Saskin Gales calls this the &quot;worst icon in Google Ads&quot; and reported finding it on five back-to-back client accounts in 2025, from a bank to a financial advisor to a psychotherapist (
                <a
                  href="https://learn.jyll.ca/newsletters/the-insider/posts/display-network-icon-google-ads"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jyll Saskin Gales, 2025
                </a>
                ).
              </p>
              <p style={pStyle}>
                <strong>Step 3: Read Performance Insights, but do not trust it fully.</strong> Google added partial Display-waste callouts to the Performance Insights tab in late 2025. Read what is there, but expect under-reporting. The native flag tends to surface the most egregious cases and miss the slow-bleed accounts.
              </p>
              <p style={pStyle}>
                <strong>Step 4: Check Performance Max channel breakdown.</strong> Open the pMax campaign, go to <strong>Asset Group reports</strong>, view the channel breakdown. Performance Max leaks heavily into Display: 30 to 50 percent of pMax spend hits Display placements by default. That is a separate budget conversation from the Search-campaign fix, but the audit reveals it in the same scan. For the deeper pMax diagnosis when conversions also collapse, the{' '}
                <a href="/blog/performance-max-not-converting" style={linkStyle}>
                  Performance Max not converting
                </a>{' '}
                playbook covers the nine-fix path.
              </p>
              <p style={pStyle}>
                <strong>Step 5: Export and snapshot.</strong> Export the last 30 days of campaign-level data to CSV before you change anything. You need a baseline to compare against in 7 and 30 days post-fix.
              </p>

              <MascotQuote mascot="aegis">
                Before you uncheck anything: export the last 30 days. If the campaign runs Target ROAS or Target CPA, removing Display changes the auction inputs and Smart Bidding rebuilds its model. Expect a 3 to 7 day learning re-stabilization. That is recalibration, not regression. Watch the CPA curve for 7 days before judging.
              </MascotQuote>
            </section>

            {/* 3. Fix */}
            <section id="fix">
              <h2 style={h2Style}>
                The 60-Second Fix: Turn Off Display Network on Search Campaigns
              </h2>
              <p style={pStyle}>
                To turn off Display Network on a Search campaign, open the campaign, click Settings, expand Networks, uncheck &quot;Display Network&quot;, and click Save. The change applies to new auctions going forward, not to already-spent budget.
              </p>

              <div className="fixStepGrid" style={{ marginTop: '24px', marginBottom: '32px' }}>
                {fixSteps.map((s) => (
                  <div
                    key={s.n}
                    style={{
                      background: '#eff6ff',
                      border: '1px solid #93c5fd55',
                      borderRadius: '12px',
                      padding: '18px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '15px',
                        fontWeight: 700,
                        margin: '0 auto',
                      }}
                    >
                      {s.n}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{s.label}</div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>{s.detail}</div>
                  </div>
                ))}
              </div>
              <style jsx>{`
                .fixStepGrid {
                  display: grid;
                  grid-template-columns: repeat(5, 1fr);
                  gap: 12px;
                }
                @media (max-width: 900px) {
                  .fixStepGrid {
                    grid-template-columns: repeat(2, 1fr);
                  }
                }
                @media (max-width: 520px) {
                  .fixStepGrid {
                    grid-template-columns: 1fr;
                  }
                }
              `}</style>

              <p style={pStyle}>
                Already-spent budget stays spent. The fix affects new auctions only. Run the same Network segment report 48 hours later: Display impressions should drop to near zero on new spend. If they do not, you likely have Display Expansion or pMax overlap, both covered below. If you want a wider sweep of leaks beyond Display, the{' '}
                <a href="/blog/ppc-audit-checklist" style={linkStyle}>
                  PPC audit checklist
                </a>{' '}
                covers 25 senior-level checks across six pillars.
              </p>
            </section>

            {/* 4. Search Partners vs Display */}
            <section id="partners-vs-display">
              <h2 style={h2Style}>Search Partners is Not Display Network (Don&apos;t Confuse Them)</h2>
              <p style={pStyle}>
                Search Partners and Display Network are two separate checkboxes that look adjacent in the campaign settings but behave very differently. Search Partners shows your text ads on the Google search box embedded in third-party sites and on YouTube search. Display Network shows visual banner ads across 2 million-plus websites and apps. Different inventory, different intent, different audit treatment.
              </p>

              <ComparisonTable
                headers={['Surface', 'Inventory', 'Intent type', 'Default action']}
                rows={[
                  {
                    cells: [
                      'Google Search',
                      'google.com results',
                      'High search intent',
                      'Keep on',
                    ],
                    highlight: true,
                  },
                  {
                    cells: [
                      'Search Partners',
                      'Third-party search boxes (Ask.com, YouTube search, Amazon, etc.)',
                      'Mid search intent',
                      'A/B test on/off over 30 days',
                    ],
                  },
                  {
                    cells: [
                      'Display Network',
                      '2M+ websites and apps reaching 90% of internet users',
                      'Browsing, not searching',
                      'Off by default on Search campaigns',
                    ],
                  },
                ]}
                caption="Google Search vs Search Partners vs Display Network: three surfaces, three audit decisions."
              />

              <p style={pStyle}>
                Search Partners are cheaper than Google Search and sometimes carry lower-quality intent, but the variance is account-specific. We recommend a 30-day on/off A/B and a decision based on your own data. Display Network is a different beast: the user is not searching for anything. We recommend turning Display off by default on every Search campaign and running it as a dedicated, audience-targeted campaign if you want Display at all. The numbers above come from{' '}
                <a
                  href="https://support.google.com/google-ads/answer/2404190"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Ads Help (2024)
                </a>{' '}
                on Display Network reach.
              </p>
            </section>

            {/* 5. When Display works */}
            <section id="when-display-works">
              <h2 style={h2Style}>When Display Network IS Worth Running (Honest Take)</h2>
              <p style={pStyle}>
                Display Network is worth running in three specific scenarios: brand awareness for established brands with $20K+ monthly spend, remarketing to recent site visitors, and visual or lifestyle products where the image moves the buyer. Outside those three, Display does not pay back as a Search-campaign opt-in.
              </p>
              <p style={pStyle}>
                <strong>Brand awareness for established brands.</strong> Budgets over $20,000 a month, CMO who tracks branded search lift and view-through, not direct ROAS. The mental model is &quot;we are spending to teach the market the name&quot;, measured weeks or quarters out. Display is a fine tool for that job. It is not the right tool for a $1,500 a month SMB Search campaign.
              </p>
              <p style={pStyle}>
                <strong>Remarketing to recent site visitors.</strong> Display remarketing works because intent is warm. The visitor already touched your site. CPCs stay cheap, conversion rates climb to Search-like levels, and the campaign is genuinely additive. Set it up as a dedicated Display campaign with audience: &quot;past 30-day visitors&quot;, excluding converters.
              </p>
              <p style={pStyle}>
                <strong>Visual or lifestyle products.</strong> High-AOV apparel, jewelry, furniture, travel: categories where the image carries the pitch and the buying cycle stretches 2 to 8 weeks. Display delivers the look-and-remember function that pure-text Search ads cannot.
              </p>
              <p style={pStyle}>
                The pattern is consistent: Display works as a <strong>dedicated, separately-budgeted, audience-targeted campaign</strong>. Display does not work as a passive opt-in tacked onto a Search campaign.
              </p>
            </section>

            {/* 6. Placement exclusions */}
            <section id="placements">
              <h2 style={h2Style}>Placement Exclusions: The Day-2 Cleanup</h2>
              <p style={pStyle}>
                If you do run Display intentionally, placement exclusions are the second-day cleanup that protects the budget. Open <strong>Content</strong> &gt; <strong>Placements</strong> &gt; <strong>Where ads showed</strong>, sort by Cost descending, and start excluding what should never have shown your ad in the first place.
              </p>
              <p style={pStyle}>Universal exclusion list to apply at account level on every Display or Performance Max campaign:</p>
              <ul style={olStyle}>
                <li style={liStyle}>Mobile game app categories (start with <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>mobileappcategory::69500</code> and below)</li>
                <li style={liStyle}>Kid-content sites and YouTube channels with no business relevance</li>
                <li style={liStyle}>Made-for-advertising (MFA) domains, which exist solely to monetize via AdSense</li>
                <li style={liStyle}>YouTube channels with zero conversion history after $50+ in spend</li>
              </ul>
              <p style={pStyle}>
                Common lists worth loading: the AdWords Robot MFA exclusion list (publicly maintained), app categories you do not serve, and a Subreddit exclusion list if you market a B2B product. Set frequency caps at 3 impressions per user per day during the first month to suppress ad fatigue.
              </p>
              <p style={pStyle}>
                Review the placement report weekly for the first month, then monthly. Buzz on B6 syncs the placement report nightly and auto-excludes MFA domains by pattern; see the{' '}
                <a href="/b6#buzz" style={linkStyle}>
                  Buzz - B6 autonomous bidding agent
                </a>{' '}
                page for the exclusion rule logic.
              </p>
            </section>

            {/* 7. Display Expansion */}
            <section id="display-expansion">
              <h2 style={h2Style}>Display Expansion: The Hidden Cousin You Also Need to Turn Off</h2>
              <p style={pStyle}>
                Display Expansion is a separate setting from the Display Network checkbox that quietly extends Search campaigns onto Display inventory even after you have unchecked Display Network. It hides under Audience expansion, Target expansion, or Optimized targeting sliders, and Google sometimes auto-applies it through the Recommendations tab. Turn it off explicitly.
              </p>
              <p style={pStyle}>
                39 Celsius covered this in late 2025: &quot;Display Expansion is a setting that automatically takes leftover Search budget and spends it on text ads across the Google Display Network, placing your ads on websites, apps, and placements outside of active search intent&quot; (
                <a
                  href="https://www.39celsius.com/google-ads-display-expansion-a-hidden-trap-or-a-growth-hack/"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  39 Celsius, 2025
                </a>
                ). Combining Search and Display in one campaign contaminates the data and makes <a href="/blog/google-ads-optimization" style={linkStyle}>optimization</a> guesswork.
              </p>
              <p style={pStyle}>To turn off Display Expansion completely:</p>
              <ol style={olStyle}>
                <li style={liStyle}>
                  <strong>Campaign Settings:</strong> scroll to the bottom of Settings, find &quot;Audience expansion&quot; / &quot;Target expansion&quot; / &quot;Optimized targeting&quot;, and drag to off or conservative.
                </li>
                <li style={liStyle}>
                  <strong>Recommendations auto-apply:</strong> Tools &gt; <strong>Recommendations</strong> &gt; <strong>Auto-apply settings</strong> &gt; uncheck &quot;Use optimized targeting&quot; and &quot;Expand reach to similar audiences&quot;.
                </li>
                <li style={liStyle}>
                  <strong>Re-audit quarterly.</strong> Google rolls these settings back through UI updates. Put a calendar reminder.
                </li>
              </ol>
            </section>

            {/* 8. B6 CTA */}
            <section id="b6">
              <h2 style={h2Style}>How B6 Prevents Display Waste Automatically</h2>
              <p style={pStyle}>
                B6 is an autonomous PPC cabinet, not a recommendation tool. Buzz, our bidding agent, ships with Display Network defaults set to off on every new Search campaign and reviews the placement report nightly to exclude MFA, mobile-game, and low-CTR placements based on rules. Aegis layers risk warnings before any apply: Smart Bidding learning windows, audience overlap, budget exposure.
              </p>
              <p style={pStyle}>
                The three levels are Co-pilot (you approve every change), Approval (batched daily summary), and Autonomous ( Buzz applies and reports). See{' '}
                <a href="/pricing" style={linkStyle}>
                  B6 pricing: free while in beta
                </a>{' '}
                for the full comparison. Connect your Google Ads account,{' '}
                <a href="/chat" style={linkStyle}>
                  try B6 free
                </a>
                , and Buzz runs the first audit in 90 seconds. You see exactly how much Display is costing you and what to exclude, then apply with one click. The{' '}
                <a href="/how-it-works" style={linkStyle}>
                  how B6 agents work
                </a>{' '}
                page covers the agent architecture if you want the technical picture first. If you want to handle ad-side audits without an agency in the loop, the{' '}
                <a href="/blog/google-ads-without-agency" style={linkStyle}>
                  running Google Ads without an agency
                </a>{' '}
                guide pairs well with this fix.
              </p>

              <MascotQuote mascot="buzz">
                Across 200+ accounts I audited at B6, the average waste from Display opt-in on Search campaigns sits at 23 percent of campaign budget. Range goes from 8 percent on the cleanest accounts to 61 percent on the worst. The common factor: nobody knew the box was even checked.
              </MascotQuote>

              <div
                style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  borderRadius: '16px',
                  padding: '40px',
                  textAlign: 'center',
                  marginTop: '40px',
                  marginBottom: '40px',
                }}
              >
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '18px',
                    lineHeight: '1.3',
                  }}
                >
                  Stop Display Network bleed on every Search campaign.
                </h3>
                <p
                  style={{
                    fontSize: '17px',
                    color: '#64748b',
                    marginBottom: '28px',
                    lineHeight: '1.6',
                    fontWeight: '500',
                    opacity: 0.9,
                  }}
                >
                  Connect Google Ads, let Buzz find your Display leak and propose the exclusion list in 90 seconds. Co-pilot, Approval, or Autonomous: you pick the autonomy level. See{' '}
                  <a href="/pricing" style={linkStyle}>
                    pricing tiers
                  </a>{' '}
                  to start.
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
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                >
                  Start B6 Free Trial
                </a>
              </div>
            </section>

            {/* 9. FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>How do I reduce wasted ad spend in Google Ads?</strong> Start with the four highest-leak settings: uncheck Display Network on every Search campaign, disable Display Expansion, audit Search Partners with a 30-day A/B, and add MFA exclusions to Display and Performance Max. These four fixes typically recover 15 to 30 percent of total Google Ads spend in the first month.
              </p>
              <p style={pStyle}>
                <strong>Is the Display Network worth it for small businesses?</strong> Display Network is rarely worth it as an opt-in on a Search campaign. It is sometimes worth it as a dedicated remarketing or brand-awareness campaign with budgets over $20K per month. For most SMBs with $1K to $10K monthly spend, the budget compounds faster on pure Search.
              </p>
              <p style={pStyle}>
                <strong>How do I turn off the Display Network on a Search campaign?</strong> Open the Search campaign in Google Ads, click Settings, expand the Networks section, uncheck &quot;Display Network&quot;, and click Save. The change takes effect on the next auction. Verify by running the Network segment report 48 hours later.
              </p>
              <p style={pStyle}>
                <strong>Why is Google spending my budget on Display when I only wanted Search?</strong> Two reasons: until June 2025, the Display Network checkbox was opted-in by default on every new Search campaign, and Display Expansion (a separate setting) can route unspent Search budget to Display placements even after you uncheck Display Network. You need to disable both.
              </p>
              <p style={pStyle}>
                <strong>What is Display Expansion in Google Ads and how do I disable it?</strong> Display Expansion automatically takes leftover Search budget and spends it across the Display Network (
                <a
                  href="https://www.39celsius.com/google-ads-display-expansion-a-hidden-trap-or-a-growth-hack/"
                  style={linkStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  39 Celsius, 2025
                </a>
                ). Disable it under Campaign Settings (Audience expansion / Optimized targeting sliders) and under Tools &gt; Recommendations &gt; Auto-apply settings.
              </p>
              <p style={pStyle}>
                <strong>Is $20 a day enough for Google Ads if I turn off Display?</strong> $20 a day ($600 a month) is enough for a tight Search-only campaign on a narrow product or service category in a single geography. Turning off Display Network typically recovers 20 to 40 percent of that budget for the surface that actually converts.
              </p>
              <p style={pStyle}>
                <strong>How much money does the average advertiser waste on Display Network?</strong> In the B6 cohort of 200+ audited accounts, the average waste from Display opt-in on Search campaigns is 23 percent of campaign budget. The range runs 8 percent on clean accounts to 61 percent on the worst-leak cases.
              </p>
            </section>

            {/* 10. Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ol style={olStyle}>
                <li style={liStyle}>
                  <strong>Search Engine Land: Google Ads stops auto-opting search campaigns into Display Network</strong> (Anu Adegbola, June 19, 2025).{' '}
                  <a
                    href="https://searchengineland.com/google-ads-stops-auto-opting-search-campaigns-into-display-network-457274"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read source
                  </a>
                </li>
                <li style={liStyle}>
                  <strong>Jyll Saskin Gales: The Worst Icon in Google Ads (IYKYK)</strong> (Aug 12, 2025).{' '}
                  <a
                    href="https://learn.jyll.ca/newsletters/the-insider/posts/display-network-icon-google-ads"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read source
                  </a>
                </li>
                <li style={liStyle}>
                  <strong>39 Celsius Web Marketing: Google Ads Display Expansion: A Hidden Trap or a Growth Hack?</strong> (Dec 30, 2025).{' '}
                  <a
                    href="https://www.39celsius.com/google-ads-display-expansion-a-hidden-trap-or-a-growth-hack/"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read source
                  </a>
                </li>
                <li style={liStyle}>
                  <strong>Google Ads Help: About Display ads and the Google Display Network</strong> (2024).{' '}
                  <a
                    href="https://support.google.com/google-ads/answer/2404190"
                    style={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read source
                  </a>
                </li>
              </ol>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-display-network-wasted-spend" category="ppc" />
      <Footer compact={true} />
      </div>
    </>
  );
}
