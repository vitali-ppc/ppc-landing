'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import ComparisonTable from '../../../components/blog/ComparisonTable';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Not Spending Full Budget? 7 Causes and How to Fix Each One",
    "description": "Your Google Ads campaign is not spending its daily budget. Here are the 7 most common causes, how to diagnose each one in under 2 minutes, and step-by-step fixes.",
    "image": "https://kampaio.com/logo.png",
    "author": {
      "@type": "Person",
      "name": "B6 Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kampaio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kampaio.com/logo.png"
      }
    },
    "datePublished": "2026-05-14T00:00:00.000Z",
    "dateModified": "2026-05-14T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-not-spending-full-budget"
    },
    "keywords": "google ads, daily budget, not spending, smart bidding, target roas, target cpa, limited by budget, ad rank, quality score, learning period, auction insights, bid management, troubleshooting",
    "wordCount": 2455,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is my Google Ads campaign not spending the full daily budget?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most common causes are bids too low to win auctions, Smart Bidding targets too aggressive for current performance, or targeting too narrow to generate enough search volume. Check impression share and Auction Insights first to isolate whether the issue is bid-related or volume-related."
        }
      },
      {
        "@type": "Question",
        "name": "How do I fix the \"Limited by budget\" status in Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "\"Limited by budget\" specifically means the campaign could spend more if the daily budget ceiling were raised - it is not the same as general underspending. If conversion costs are acceptable, raising the daily budget is the right fix. If conversion costs are already high, fix the underlying efficiency problem before increasing budget. See Google's step-by-step guide to fix 'limited by budget' status."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my ad active but not spending money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Active status means the campaign is eligible to run, not that it is winning auctions. Active ads can still be blocked by low bids, a poor Quality Score, disapproved copy, or Smart Bidding targets that prevent entry into auctions predicted to miss the target."
        }
      },
      {
        "@type": "Question",
        "name": "Will Google Ads go over my daily budget?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, on individual days. According to Google's documentation, Google may spend up to 2 times the average daily budget on a single high-traffic day. Your total monthly spend will not exceed your daily budget multiplied by 30.4."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take for a new Google Ads campaign to start spending?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most campaigns begin spending within 24-48 hours of going live, once ads clear the review process. Campaigns using Smart Bidding typically spend erratically for 1-2 weeks during the learning period before stabilizing. Google recommends measuring Smart Bidding performance only after accumulating at least 30 conversions."
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
        "name": "Google Ads Not Spending Full Budget? 7 Causes",
        "item": "https://www.kampaio.com/blog/google-ads-not-spending-full-budget"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - Quick Diagnostic Checklist', level: 1 },
    { id: 'how-budgets-work', title: 'How Google Ads Daily Budgets Actually Work', level: 1 },
    { id: 'bidding-problems', title: 'Bidding Problems That Throttle Your Spend', level: 1 },
    { id: 'targeting-issues', title: 'Targeting and Keyword Issues', level: 1 },
    { id: 'ad-quality', title: 'Ad Quality and Approval Problems', level: 1 },
    { id: 'technical-blocks', title: 'Technical and Account-Level Blocks', level: 1 },
    { id: 'underspending-fine', title: 'When Underspending Is Actually Fine', level: 1 },
    { id: 'prevent-problems', title: 'How to Prevent Budget Problems Before They Start', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Stop Guessing, Start Monitoring', level: 1 },
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
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Troubleshooting
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Not Spending Full Budget? 7 Causes and How to Fix Each One
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Your Google Ads campaign is not spending its daily budget. Here are the 7 most common causes, how to diagnose each one in under 2 minutes, and step-by-step fixes.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>by B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 14, 2026 · 11 min read</span>
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

            {/* Lead paragraph */}
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
              The most common cause is straightforward: bids are too low or targeting is too narrow for the available auction volume. Your campaign enters fewer auctions, wins fewer clicks, and the daily budget sits untouched. That explains roughly 70% of underspending cases. The remaining 30% breaks down into ad quality problems, technical blocks, and a handful of situations where underspending is actually correct.
            </p>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                TL;DR - Quick Diagnostic Checklist
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Scan the list, find your situation, jump to the relevant section:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Bids below the competitive range</strong>: you are losing every auction. Raise max CPC bids or switch to Maximize Clicks.</li>
                <li style={{ marginBottom: '16px' }}><strong>Smart Bidding target too aggressive</strong>: Google stops spending rather than miss your target. Relax Target ROAS or Target CPA by 20-30%.</li>
                <li style={{ marginBottom: '16px' }}><strong>Keywords with &quot;Low search volume&quot; status</strong>: not enough auctions exist to spend the budget. Broaden match types or add related terms.</li>
                <li style={{ marginBottom: '16px' }}><strong>Geo-targeting limited to a single ZIP code or small city</strong>: the impression pool is tiny. Expand to metro or state level.</li>
                <li style={{ marginBottom: '16px' }}><strong>One or more ads disapproved</strong>: they cannot serve. Check the Ads and Assets tab, read the policy note, correct the copy.</li>
                <li style={{ marginBottom: '16px' }}><strong>Billing failed</strong> (expired card, declined payment): Google pauses all campaigns silently. Check Billing and Payments.</li>
                <li style={{ marginBottom: '16px' }}><strong>Campaign in the Smart Bidding learning period</strong> (first 1-2 weeks): underspending is expected. Wait, do not change settings.</li>
              </ol>

              <MermaidDiagram
                chart={`
flowchart TD
  Start[Campaign underspending detected] --> Q1{Status shows<br/>'Limited by budget'?}
  Q1 -->|Yes| Fix1[Raise daily budget<br/>or fix efficiency first]
  Q1 -->|No| Q2{Impression share<br/>below 30%?}
  Q2 -->|Yes - bid issue| Fix2[Raise max CPC<br/>or relax Target ROAS/CPA<br/>by 20-30%]
  Q2 -->|No| Q3{Keywords show<br/>'Low search volume'?}
  Q3 -->|Yes - targeting issue| Fix3[Broaden match types<br/>or expand geo-targeting]
  Q3 -->|No| Q4{Any ads disapproved<br/>or low Quality Score?}
  Q4 -->|Yes - ad quality issue| Fix4[Fix disapprovals<br/>improve RSA strength]
  Q4 -->|No| Q5{Billing or campaign<br/>status problem?}
  Q5 -->|Yes - technical block| Fix5[Update payment method<br/>check campaign status]
  Q5 -->|No| Q6{New campaign<br/>under 2 weeks old?}
  Q6 -->|Yes| Wait[Smart Bidding learning -<br/>wait, do not change settings]
  Q6 -->|No| Q7[Market demand may be<br/>below budget ceiling - normal]

  style Fix2 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style Fix3 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style Fix4 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style Fix5 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style Fix1 fill:#eef2ff,stroke:#667eea,stroke-width:2px
  style Wait fill:#f5f3ff,stroke:#764ba2,stroke-width:2px
  style Q7 fill:#f5f3ff,stroke:#764ba2,stroke-width:2px
                `}
                caption="7-step diagnostic decision tree: follow the branches from top to identify your underspending cause"
              />

              <MascotQuote mascot="buzz">
                Campaign B had a $100/day budget but spent only $23 on day one. Target ROAS was set to 800% when the account&apos;s 90-day ceiling was around 400%. I relaxed it to 500% and spend reached $89 within 3 days - without touching bids or targeting.
              </MascotQuote>
            </section>

            {/* How Daily Budgets Work */}
            <section id="how-budgets-work">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                How Google Ads Daily Budgets Actually Work
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Your daily budget is a target, not a guarantee. Google Ads treats it as an average: on busy days it may spend up to twice the amount, on quiet days significantly less. According to <a href="https://support.google.com/google-ads/answer/1704443?hl=en" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads overdelivery rules</a>, &quot;Google may spend up to 2 times your average daily budget in a single day, but your costs will not exceed your monthly spending limit.&quot; That monthly cap equals your daily budget multiplied by 30.4 - the average number of days per month.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                In practice, a $20 daily budget might produce $15 in spend on Tuesday and $28 on Friday, while the monthly total stays under $608 ($20 x 30.4). Smart pacing algorithms distribute spend throughout the day based on predicted traffic patterns. There is no hard hourly cap.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                One status distinction worth understanding: &quot;Limited by budget&quot; in Google Ads does not mean the same thing as &quot;not spending.&quot; Google marks a campaign &quot;Limited by budget&quot; in two specific cases: the budget is too low relative to available traffic, or the campaign uses Maximize Clicks and could drive more volume with a higher budget ceiling. If your campaign is underspending and does NOT show &quot;Limited by budget,&quot; the problem is not the budget ceiling. Something is blocking auction participation altogether.
              </p>
            </section>

            {/* Bidding Problems */}
            <section id="bidding-problems">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Bidding Problems That Throttle Your Spend
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Bidding issues are the most common cause category, and three sub-problems account for nearly all of them.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Manual bids set below the competitive range are the bluntest version. Google has an undisclosed minimum threshold to enter any given auction. If your max CPC is simply too low, your ads do not appear at all - not even in low-competition slots. The signal to check: open the Auction Insights report and look at the impression share column in the Campaigns tab. Low impression share combined with a &quot;Lost IS (rank)&quot; figure near 100% confirms a bid problem. The fix is to raise bids incrementally, or to switch to an automated bidding strategy like Maximize Clicks, which lets Google&apos;s system find the right bid level for each auction without you guessing at the number. If raising bids produces a runaway CPC instead of a healthier impression share, the auction itself is the wrong shape: see <a href="/blog/google-ads-cost-per-click-too-high" style={{ color: '#764ba2', textDecoration: 'underline' }}>why CPC is too high</a> for the 9-cause framework before you keep pushing the ceiling up.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Smart Bidding targets set too aggressively cause a different kind of throttling. Smart Bidding is Google&apos;s suite of auction-time bidding strategies - Target CPA, Target ROAS, Maximize Conversions, and Maximize Conversion Value - that optimizes bids for conversions in each individual auction. When the target you set is far above what the auction landscape can realistically deliver (Target ROAS at 800% when the account&apos;s 90-day average is 400%, or Target CPA at $5 when the historical average is $15), Google will not spend just to miss the target. The system holds back rather than bid into auctions it predicts will fail. The fix is to relax the target by 20-30% and allow the learning period to recalibrate. According to Google&apos;s own guidance, accurate performance evaluation requires at least 30 conversions over the measurement period (50 for Target ROAS).
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                New campaigns in the Smart Bidding learning period follow a third pattern. Google&apos;s algorithms need real auction data to calibrate bid adjustments across contextual signals: device type, location, time of day, search query text, and more. During the first 1-2 weeks, spend will be erratic and often well below the daily budget. This is intentional. The mistake most advertisers make here is changing settings mid-learning, which resets the clock entirely. If the campaign was set up at realistic targets, leave it alone.
              </p>

              <MascotQuote mascot="aegis">
                When a campaign&apos;s Target ROAS is 2x above the account&apos;s 90-day average, I flag it immediately. Most advertisers only notice something is wrong when the monthly report shows 40% underspend - by then, weeks of potential revenue are already gone.
              </MascotQuote>
            </section>

            {/* Targeting Issues */}
            <section id="targeting-issues">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Targeting and Keyword Issues
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Targeting problems produce underspending through a different mechanism: there are simply not enough auctions to participate in, regardless of how competitive the bids are.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Low search volume keywords are the most common version. If your campaign targets long-tail keywords with fewer than 100 monthly searches each, Google may mark them with a &quot;Low search volume&quot; status in the Keywords tab - a signal that the system has found too few matching queries to serve ads reliably. The fix is to add broader match types alongside exact match, or to expand the keyword list with related terms that have measurable search volume.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Geo-targeting set too narrowly compounds the problem. A campaign limited to a single ZIP code or small city reduces the impression pool dramatically. For most SMB advertisers, expanding to the metro area or state level unlocks substantially more auction opportunities without meaningfully changing lead quality. While you are checking geo settings, look at the Devices tab too. Excluding mobile entirely when 60% or more of search traffic comes from mobile devices is one of the most common self-inflicted targeting restrictions we see - and one of the easiest to miss because it is buried in campaign settings rather than surfaced as a warning.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Ad scheduling is worth a specific check. If ads only run 9am-5pm Monday through Friday but your audience searches evenings and weekends, a significant share of daily budget will go unspent every day. Pull the Search Terms report filtered by hour of day and day of week. If search activity peaks outside your scheduled hours, extend the schedule.
              </p>
            </section>

            {/* Ad Quality */}
            <section id="ad-quality">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Ad Quality and Approval Problems
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The campaign settings are correct, the bids are competitive, but the ads themselves cannot serve. This is a different diagnostic path.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Ad disapprovals are the quickest to identify. Open the Ads and Assets tab and check the status column. Any ad flagged &quot;Disapproved&quot; or &quot;Under review&quot; is not running. New ads take 1-2 business days for Google to review. Disapproved ads come with a policy violation note - read it, correct the specific element cited, and resubmit. Common triggers include superlatives (&quot;best,&quot; &quot;#1&quot;), prohibited content categories, or destination URL mismatches where the ad and the landing page describe different offers.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Low Ad Rank due to a poor <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={{ color: '#764ba2', textDecoration: 'underline' }}>Quality Score</a> is a subtler blocker. Ad Rank is a function of your bid, your Quality Score, and the expected impact of ad extensions. Quality Score itself reflects expected click-through rate, ad relevance, and landing page experience. A Quality Score below 5/10 on core keywords raises your effective cost per click and reduces delivery frequency. Check the Quality Score column in the Keywords tab (you may need to enable it via column settings). The fix combines improving headline relevance to the keyword intent and tightening the landing page to match what the ad promises.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Responsive Search Ads with weak creative combinations add another layer. Google&apos;s Ad Strength indicator (Excellent, Good, Average, Poor) reflects how many high-quality headline and description combinations the RSA can generate. Poor Ad Strength reduces auction entry. Improving it means adding distinct, specific headlines that cover different keyword angles - not minor rewrites of the same phrase.
              </p>
            </section>

            {/* Technical Blocks */}
            <section id="technical-blocks">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Technical and Account-Level Blocks
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                These causes are easy to overlook precisely because they feel too obvious. Check them before spending an hour on bid analysis.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Billing failure is the most overlooked. An expired credit card, a declined payment, or a reached credit limit causes Google to pause all campaigns in the account. It happens silently, without an obvious email alert. Check the Billing and Payments section in account settings. If a payment failed, update the payment method and manually trigger a retry.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Account-level spending limits sometimes apply to newer or recently verified accounts. These limits are separate from campaign-level daily budgets and can cap total daily spend across all campaigns. Check the notification bell in the top right of the Google Ads interface for any account-level alerts.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Campaign status problems round out this category: a campaign accidentally set to Paused, or an end date that passed last week. Check campaign status directly. Check whether an end date is set and whether it has already expired.
              </p>

              <ComparisonTable
                headers={['Cause category', 'Where to look', 'Typical fix time', 'Difficulty']}
                rows={[
                  { cells: ['Bidding (low CPC / aggressive target)', 'Auction Insights, impression share', '10-15 min', 'Medium'] },
                  { cells: ['Targeting (keywords, geo, schedule)', 'Keywords tab, campaign settings', '15-30 min', 'Easy'] },
                  { cells: ['Ad quality (disapprovals, low QS)', 'Ads and Assets tab, Quality Score column', '20-60 min', 'Medium'] },
                  { cells: ['Technical (billing, status)', 'Billing and Payments, campaign status', '5 min', 'Easy'], highlight: true },
                  { cells: ['Smart Bidding learning period', 'Campaign creation date', 'Wait 1-2 weeks', 'Patience'] },
                ]}
                caption="Where to check first by suspected cause category - the technical category is fastest to rule out"
              />
            </section>

            {/* When Underspending Is Fine */}
            <section id="underspending-fine">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                When Underspending Is Actually Fine
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Not every case of underspending is a problem. Treating it as one leads to changes that hurt performance.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The Smart Bidding learning period is the clearest example. A new campaign running Target ROAS or Target CPA will underspend for 1-2 weeks while Google&apos;s system gathers data. Changing bids, targets, or targeting during this window resets the learning clock. If the campaign was set up at realistic targets, the right move is to leave it alone and wait.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Seasonal and weekly demand patterns produce natural underspending that looks alarming if you check the account on the wrong day. B2B campaigns routinely underspend on weekends. E-commerce accounts often slow mid-month between paycheck cycles. This reflects real shifts in search demand, not a campaign problem. Checking daily spend on a Sunday and panicking is a common and expensive mistake.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Budget set above realistic demand is a third scenario that is genuinely fine. If the total available search volume for your keyword set is worth approximately $30 per day in your market, a $100 daily budget will not force Google to find $70 more in clicks. The daily budget is a ceiling on what Google can spend, not a floor it must reach. Raising the budget further achieves nothing. The correct response is either to accept the spend level as the market ceiling or to expand targeting to reach additional demand.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The real question is not &quot;why am I not spending my full budget?&quot; It is: &quot;am I getting the conversions I need at the cost I can afford?&quot; If yes, underspending is efficient performance.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                One more nuance specific to Performance Max: pMax pacing is bursty, and a low-spend day inside the learning period is not the same problem as a healthy Search campaign that suddenly underspends. If you&apos;re troubleshooting pMax specifically, the playbook in <a href="/blog/performance-max-not-converting" style={{ color: '#764ba2', textDecoration: 'underline' }}>Performance Max not converting</a> covers Target ROAS calibration, Final URL expansion, and audience signals in one place.
              </p>
            </section>

            {/* Prevent Problems */}
            <section id="prevent-problems">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                How to Prevent Budget Problems Before They Start
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The fixes above are reactive. You found the problem after days or weeks of underspend. The more useful shift is catching these problems automatically, before they appear in a monthly report.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Three practical steps work without additional tools. First, set up an automated rule in Google Ads to send an email alert when daily spend falls below 70% of budget for three or more consecutive days. Second, review Auction Insights weekly - a drop in impression share is an early signal that bid competitiveness has eroded, visible before it shows up in spend data. Third, check campaign status and billing once per week as a routine housekeeping step. It takes five minutes and catches billing failures before they idle the account for a full day.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                B6 covers this systematically. <a href="/b6#buzz" style={{ color: '#764ba2', textDecoration: 'underline' }}>See how Buzz monitors bidding efficiency</a> across all campaigns every 6 hours. Aegis flags budget anomalies before the monthly report. Echo sends a weekly digest showing exactly where spend went and where it stalled. <a href="/b6" style={{ color: '#764ba2', textDecoration: 'underline' }}>How B6 agents catch budget problems</a>.
              </p>

              <MascotQuote mascot="buzz">
                I check bid efficiency every 6 hours. If spend drops below 60% of daily budget for 2 consecutive cycles, I flag it and recommend a specific adjustment - for example, relaxing Target ROAS from 600% to 450% based on the account&apos;s recent conversion data.
              </MascotQuote>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Why is my Google Ads campaign not spending the full daily budget?</strong><br />
                The most common causes are bids too low to win auctions, Smart Bidding targets too aggressive for current performance, or targeting too narrow to generate enough search volume. Check impression share and Auction Insights first to isolate whether the issue is bid-related or volume-related.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>How do I fix the &quot;Limited by budget&quot; status in Google Ads?</strong><br />
                &quot;Limited by budget&quot; specifically means the campaign could spend more if the daily budget ceiling were raised - it is not the same as general underspending. If conversion costs are acceptable, raising the daily budget is the right fix. If conversion costs are already high, fix the underlying efficiency problem before increasing budget. See Google&apos;s step-by-step guide to <a href="https://support.google.com/google-ads/answer/6385220?hl=en" style={{ color: '#764ba2', textDecoration: 'underline' }}>fix &apos;limited by budget&apos; status</a>.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Why is my ad active but not spending money?</strong><br />
                Active status means the campaign is eligible to run, not that it is winning auctions. Active ads can still be blocked by low bids, a poor Quality Score, disapproved copy, or Smart Bidding targets that prevent entry into auctions predicted to miss the target.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Will Google Ads go over my daily budget?</strong><br />
                Yes, on individual days. According to Google&apos;s documentation, Google may spend up to 2 times the average daily budget on a single high-traffic day. Your total monthly spend will not exceed your daily budget multiplied by 30.4.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>How long does it take for a new Google Ads campaign to start spending?</strong><br />
                Most campaigns begin spending within 24-48 hours of going live, once ads clear the review process. Campaigns using Smart Bidding typically spend erratically for 1-2 weeks during the learning period before stabilizing. Google recommends measuring Smart Bidding performance only after accumulating at least 30 conversions.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Stop Guessing, Start Monitoring
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Connect your Google Ads account to B6. Buzz runs the first diagnostic in 90 seconds. You will see exactly which campaigns are underspending, why, and what to change - without digging through five different report tabs manually. <a href="/pricing" style={{ color: '#764ba2', textDecoration: 'underline' }}>B6 pricing starts at $99/month</a>. No commitment, no credit card required. <a href="/chat" style={{ color: '#764ba2', textDecoration: 'underline' }}>Connect your Google Ads account</a>.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Ready to find out why your budget is sitting idle?
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Let Buzz scan your account and surface every underspending campaign in 90 seconds - with a specific fix for each one.
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
                  Run the Diagnostic
                </a>
              </div>
            </section>

          </div>
        </div>
        <Footer compact={true} />
      </div>
    </>
  );
}
