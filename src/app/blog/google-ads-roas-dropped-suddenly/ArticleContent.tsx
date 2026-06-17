'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads ROAS Dropped Suddenly? 8 Diagnostic Steps That Find the Real Cause (2026 Playbook)",
    "description": "Google Ads ROAS dropped overnight? Most \"ROAS drops\" are tracking problems in disguise. An 8-step diagnostic checklist with thresholds and timelines for SMB owners.",
    "image": "https://kampaio.com/og/google-ads-roas-dropped-suddenly.png",
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
    "datePublished": "2026-05-12T00:00:00.000Z",
    "dateModified": "2026-05-12T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-roas-dropped-suddenly"
    },
    "keywords": "ROAS, google ads, conversion tracking, Smart Bidding, Target ROAS, Performance Max, Auction Insights, conversion rate, Consent Mode, enhanced conversions, iOS, ATT, audience signals, landing page, seasonality, impression share, bid strategy",
    "wordCount": 2395,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why did my Google Ads ROAS drop suddenly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Four out of five sudden ROAS drops are measurement problems, not campaign problems. Cross-check Google Ads revenue against Shopify or Stripe over the last seven days. If they disagree by more than 15 percent, fix tracking first. Otherwise work the 8-step checklist above in order."
        }
      },
      {
        "@type": "Question",
        "name": "Is a sudden ROAS drop always a tracking problem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, but it's the highest-probability cause and the fastest to verify. The five most common categories are tracking, signal-loss-induced Smart Bidding starvation, Performance Max placement drift, new auction competition, and genuine market shifts."
        }
      },
      {
        "@type": "Question",
        "name": "Does iOS privacy affect Google Ads ROAS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. iOS 18 ATT, Consent Mode v2, and third-party cookie deprecation have cut reported conversions 15 to 25 percent versus 2022. The conversions still happen - the reporting sees fewer of them. Enhanced conversions and refreshed customer match lists are the main compensations."
        }
      },
      {
        "@type": "Question",
        "name": "Should I lower Target ROAS or pause the campaign when ROAS drops?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lower it, don't pause. Reduce budgets 20 to 30 percent and lower Target ROAS by 10 to 20 percent while you diagnose. Pausing resets the learning period and delays recovery by weeks."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take Google Ads ROAS to recover after a drop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With the right diagnosis and fixes, 7 to 14 days for a typical SMB account. Longer if you change bid strategy mid-recovery. Don't change multiple variables at once."
        }
      },
      {
        "@type": "Question",
        "name": "Can Performance Max cause ROAS to drop suddenly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The most common pattern is Final URL expansion or new asset uploads tipping PMax toward Display and YouTube placements that look cheap and don't convert. Check Placement and Asset group reports, tighten signals to one to three per group."
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
        "name": "Google Ads ROAS Dropped Suddenly? 8 Diagnostic Steps",
        "item": "https://www.kampaio.com/blog/google-ads-roas-dropped-suddenly"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - The 5 Most Likely Causes', level: 1 },
    { id: 'real-or-tracking', title: 'Is the ROAS Drop Real or Is Your Tracking Lying?', level: 1 },
    { id: 'diagnostic-checklist', title: 'The 8-Step Diagnostic Checklist', level: 1 },
    { id: 'verify-tracking', title: '1. Verify Conversion Tracking', level: 2 },
    { id: 'auction-insights', title: '2. Inspect Auction Insights', level: 2 },
    { id: 'smart-bidding-volume', title: '3. Smart Bidding Volume Check', level: 2 },
    { id: 'pmax-placements', title: '4. Audit Performance Max Placements', level: 2 },
    { id: 'landing-regressions', title: '5. Landing Page or Checkout Regressions', level: 2 },
    { id: 'audience-signals', title: '6. Re-check Audience Signals and Exclusions', level: 2 },
    { id: 'seasonality', title: '7. Compare with Historical Seasonality', level: 2 },
    { id: 'external-traffic', title: '8. External Traffic and CVR Trends', level: 2 },
    { id: 'drop-is-real', title: 'When the ROAS Drop Is Real', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'b6-agents', title: 'Stop the ROAS Bleed With B6 Agents', level: 1 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const h2Style = { fontSize: '32px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '24px', marginTop: '48px', lineHeight: '1.3' };
  const h3Style = { fontSize: '24px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '16px', marginTop: '40px', lineHeight: '1.3' };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const olStyle = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };
  const liStyle = { marginBottom: '12px' };

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
          <ArticleHero slug="google-ads-roas-dropped-suddenly" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · ROAS Recovery
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads ROAS Dropped Suddenly? 8 Diagnostic Steps That Find the Real Cause (2026 Playbook)
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Most sudden ROAS drops aren&apos;t ad problems - they&apos;re tracking problems in disguise. An 8-step checklist with thresholds and timelines for the SMB owner who needs an answer in 10 minutes.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>B6 SEO Agent</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 12, 2026 · 10 min read</span>
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

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR - The 5 Most Likely Causes (Ranked)</h2>
              <p style={pStyle}>
                Most sudden ROAS drops are not what they look like. In roughly four out of five cases the campaign is fine and the tracking layer broke. Here are the five most likely causes, ranked by how often we see them when we audit an account.
              </p>
              <ol style={olStyle}>
                <li style={liStyle}><strong>Conversion tracking broke.</strong> Tag misfire, GA4 not syncing, Consent Mode v2 default-denying EU traffic. Most common, fix in 15 minutes.</li>
                <li style={liStyle}><strong>Smart Bidding got starved by signal loss.</strong> iOS 18 ATT enforcement, cookie deprecation, lower conversion volume. The algorithm gets less confident and stops winning the high-quality auctions.</li>
                <li style={liStyle}><strong>Performance Max tilted toward junk placements.</strong> Final URL expansion sends paid traffic to /blog, /about, and YouTube remnants. Cheap clicks, no buyers.</li>
                <li style={liStyle}><strong>A new competitor entered the auction.</strong> Auction Insights shows their Impression Share rising and yours falling.</li>
                <li style={liStyle}><strong>The market genuinely changed.</strong> Seasonality, a competitor promo, a supply hit. Accept the new baseline and recalibrate Target ROAS.</li>
              </ol>
              <p style={pStyle}>
                If you only try one thing, check conversion tracking first. It&apos;s the most common cause and the fastest fix. For the full chain of tag misfires, GA4 import gaps, and Consent Mode v2 traps, work the <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking diagnostic</a> end to end before touching anything else.
              </p>
            </section>

            {/* Real or Tracking */}
            <section id="real-or-tracking">
              <h2 style={h2Style}>Is the ROAS Drop Real or Is Your Tracking Lying?</h2>
              <p style={pStyle}>
                Most &quot;ROAS drops&quot; we audit are measurement problems wearing the costume of an ad problem. <a href="https://syncspark.ca/blog/why-google-ads-roas-is-dropping" style={linkStyle} target="_blank" rel="noopener noreferrer">SyncSpark puts it bluntly</a>: roughly four out of five sudden-drop cases are tracking, not ads. The campaign is still working. The reporting broke and nobody noticed.
              </p>
              <p style={pStyle}>
                The fastest sanity check takes five minutes. Pull Google Ads conversion revenue for the last seven days. Pull the same window from your source-of-truth - Shopify Admin, Stripe Dashboard, your ESP. If the two numbers agree within 10 to 15 percent, the drop is real and you should work the checklist below. If they disagree by more, tracking is the bug. A discrepancy north of 30 percent usually means an event stopped firing entirely.
              </p>
              <p style={pStyle}>
                2026 made signal loss the default. iOS 18 ATT enforcement, third-party cookie deprecation, and Consent Mode v2 defaulting to &quot;denied&quot; on EU traffic have collectively cut reported conversions 15 to 25 percent versus 2022. The conversions still happen - the dashboard just sees fewer of them. Smart Bidding can adapt, but the transition window often looks identical to a ROAS drop.
              </p>
            </section>

            {/* 8-Step Diagnostic Checklist */}
            <section id="diagnostic-checklist">
              <h2 style={h2Style}>The 8-Step Diagnostic Checklist</h2>
              <p style={pStyle}>
                Walk these in order. The first three solve roughly 70 percent of cases. If you reach step 8 and ROAS is still down, the &quot;When the Drop Is Real&quot; section below is your honest fallback.
              </p>

              {/* Step 1 */}
              <h3 id="verify-tracking" style={h3Style}>1. Verify conversion tracking matches your source-of-truth</h3>
              <p style={pStyle}>
                Start with the cross-check. Compare Google Ads conversion revenue against Shopify, Stripe, or your CRM over the same seven-day window. Difference under 10 percent - tracking is healthy. Over 15 percent - tracking is the bug, and Smart Bidding has been making decisions on a wrong number.
              </p>
              <p style={pStyle}>
                Common 2026 breakages: Consent Mode v2 silently dropping conversions on EU traffic because the banner defaults to &quot;denied&quot;. Enhanced conversions toggled off after a redeploy. GA4 events imported into Google Ads but mapped to the wrong conversion action. A tag firing on /cart instead of /thank-you, so every cart view counts as a purchase.
              </p>
              <p style={pStyle}>
                Open Google Ads → Goals → Conversions. Your primary action should show &quot;Recording conversions&quot; and &quot;Tag fires correctly&quot;. If status reads &quot;Unverified&quot; or &quot;No recent conversions&quot;, fix this first. If variance is over 25 percent, also pause Smart Bidding temporarily, or switch to Maximize Conversions with no target - every hour of bidding on bad data compounds the damage.
              </p>

              {/* Step 2 */}
              <h3 id="auction-insights" style={h3Style}>2. Inspect Auction Insights for new competitors</h3>
              <p style={pStyle}>
                Google Ads → your campaign → Auction Insights. Compare the last seven days against the prior 28. Three patterns to look for: your Impression Share dropped, a competitor&apos;s rose, a name appeared in the top five that wasn&apos;t there a month ago.
              </p>
              <p style={pStyle}>
                Thresholds: Impression Share down 10 or more points plus a competitor&apos;s IS up 5 or more points means the auction got more expensive. Your Target ROAS hasn&apos;t moved, but winning now requires a higher bid. ROAS drops mechanically, even though nothing broke. CPC inflation hits ROAS one-for-one, so if average CPC has climbed faster than conversion rate, dig into <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>why CPC is too high</a> for the 9-cause framework before re-cutting Target ROAS.
              </p>
              <p style={pStyle}>
                Usual culprits: a competitor launching a Black Friday push, a category leader returning from a paused budget, or a venture-funded entrant arriving with a war chest. Two responses. Lower Target ROAS by 10 to 15 percent for 14 days to defend Impression Share - or accept lower volume at the original ROAS. Don&apos;t do both.
              </p>
              <MascotQuote mascot="buzz">
                I rerun Auction Insights every Monday at 6am. If a new competitor&apos;s Overlap Rate crossed 25 percent in the last 7 days, I&apos;ll suggest a 10 percent Target ROAS cut for 14 days to defend Impression Share. If it works, we hold. If not, we accept the new equilibrium.
              </MascotQuote>

              {/* Step 3 */}
              <h3 id="smart-bidding-volume" style={h3Style}>3. Check if Smart Bidding is starving on volume</h3>
              <p style={pStyle}>
                Smart Bidding needs roughly 30 conversions per month to stabilize. When conversion volume drops - real or tracked - the algorithm loses confidence and stops winning the high-intent auctions. Spend falls, the remaining volume looks worse on average, ROAS keeps falling. The system is bidding scared.
              </p>
              <p style={pStyle}>
                Sort your campaign by conversions over the last 30 days. Below 30 - Smart Bidding is in noise mode. Below 15 - it&apos;s actively harming you, switch to manual CPC or Maximize Conversions with no target. Counterintuitive fix: <em>lower</em> Target ROAS by 20 to 30 percent for 14 days, feed the algorithm volume, then re-tighten once you cross 30 conversions a month.
              </p>
              <p style={pStyle}>
                If you migrated to Consent Mode v2 last quarter, expect a 15 to 25 percent reported drop with zero real demand change. Don&apos;t paper over it with more budget. Enable enhanced conversions, refresh customer match lists, give the system audience signals to compensate for cookie loss.
              </p>

              {/* Step 4 */}
              <h3 id="pmax-placements" style={h3Style}>4. Audit Performance Max placement reports</h3>
              <p style={pStyle}>
                Performance Max can quietly tilt toward Display and YouTube placements when you add new images or videos to an asset group. CPCs look great. Clicks pour in. Almost none of them convert. ROAS tanks while spend looks healthier than ever.
              </p>
              <p style={pStyle}>
                Open PMax → Insights → Asset group reports and Placement reports. Placement transparency in PMax is partial - you see channel splits and some domains, not a full URL list. Two signals are unmistakable: Display spend share up 15 or more points versus the prior 30 days, and average CPC down 25 percent or more without a matching rise in conversions. PMax found cheap volume that doesn&apos;t buy.
              </p>
              <p style={pStyle}>
                The fixes: tighten audience signals to one to three per asset group, request placement exclusions through Google Ads support for irrelevant domains, and turn off Final URL expansion unless you actually have a deep e-commerce catalog. For single-funnel businesses, <a href="https://developers.google.com/google-ads/api/performance-max/troubleshooting" style={linkStyle} target="_blank" rel="noopener noreferrer">Final URL expansion is a footgun</a>.
              </p>

              {/* Step 5 */}
              <h3 id="landing-regressions" style={h3Style}>5. Look for landing page or checkout regressions</h3>
              <p style={pStyle}>
                A site update on Monday and a ROAS drop on Wednesday is not a coincidence. Conversion rate compounds directly with ROAS - a 20 percent CVR drop at constant CPC means a 20 percent ROAS drop, even if Google Ads did nothing wrong.
              </p>
              <p style={pStyle}>
                Open GA4 page reports. Compare bounce rate, time-to-first-byte, and CVR for your top five landing pages over the last seven days versus the prior 28. The 2026 patterns we see most: PageSpeed regressions after a CMS update (LCP creeping above four seconds on mobile drops CVR 30 to 50 percent on Google&apos;s own benchmarks), a checkout change that added a field and quietly raised abandonment, or a payment provider failing intermittently on one device-browser combination.
              </p>
              <p style={pStyle}>
                Concrete debug: revert to your last known-good commit, rerun PageSpeed Insights on the top three landing pages, then manually complete a checkout in incognito on iOS Safari. That&apos;s the most fragile combination and the one most likely to surface the bug.
              </p>

              {/* Step 6 */}
              <h3 id="audience-signals" style={h3Style}>6. Re-check audience signals and exclusions</h3>
              <p style={pStyle}>
                If you&apos;ve been piling audience signals over months, Google&apos;s algorithm now confuses &quot;who is my customer&quot; with &quot;who Google thinks resembles them&quot;. One to three signals per asset group, maximum. More than that is noise dressed as data.
              </p>
              <p style={pStyle}>
                Check your negative keyword lists too. Tools → Shared Library → Negative keyword lists, sorted by date added. A negative added by a previous freelancer or a rule that fired on a quiet weekend might be blocking your branded queries - a five-minute look worth taking.
              </p>
              <p style={pStyle}>
                iOS 18 ATT makes customer match lists smaller by default. Fewer matched emails, smaller seed audience, weaker lookalike expansion. Refresh your customer match list monthly if you rely on it. Don&apos;t delete all signals and start fresh - that resets learning and burns budget while the algorithm recovers.
              </p>

              {/* Step 7 */}
              <h3 id="seasonality" style={h3Style}>7. Compare with your historical seasonality</h3>
              <p style={pStyle}>
                Some ROAS drops are not new. They happened last year too. Pull Google Ads data for the same calendar week last year, and the year before. Apples-to-apples comparison, not &quot;this week vs last week&quot;.
              </p>
              <p style={pStyle}>
                The 2026 patterns we see most: a post-holiday January slump (B2C ROAS routinely down 20 to 35 percent versus December), spring-break travel impact mid-April for non-travel verticals, and pre-BFCM ROAS dips in October as CPCs rise before the November-December conversion rebound. If your year-over-year ROAS for this week is within 10 percent of last year&apos;s same week, the market is doing what the market does. Hold spend. Don&apos;t change bid <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>. Don&apos;t pause. Just wait for the cycle.
              </p>
              <p style={pStyle}>
                If your YoY ROAS is dramatically worse than the same week last year, something genuinely changed. Work backward through this checklist with that lens.
              </p>
              <MascotQuote mascot="echo">
                My Monday digest pulls last year&apos;s same-week ROAS into the chart automatically. If today&apos;s number is within 10 percent of last year&apos;s same week, I flag the drop as seasonal - and the dashboard doesn&apos;t go red. Less panic, more context, fewer 11pm budget changes.
              </MascotQuote>

              {/* Step 8 */}
              <h3 id="external-traffic" style={h3Style}>8. Look at external traffic and conversion-rate trends</h3>
              <p style={pStyle}>
                ROAS lives downstream of two factors: paid CPC (Google&apos;s side) and conversion rate (your site, product, market). If CPCs are flat but ROAS dropped, the conversion side broke and Google Ads isn&apos;t the right place to look.
              </p>
              <p style={pStyle}>
                Open GA4 → Acquisition → Traffic Source. Did organic CVR also drop in the same window? If yes, the bug is sitewide. Cross-channel sanity check: if Meta Ads and your email program also reported CVR drops in the same week, the site or offer is the issue, not the campaign. Bid strategy won&apos;t move the needle.
              </p>
              <p style={pStyle}>
                2026 specific: payment providers fail intermittently and silently. Open your gateway dashboard and check failure rates over the last seven days. A 2 percent failure rate that crept to 8 percent on a Wednesday will tank ROAS, and no Google Ads change fixes it.
              </p>
              <MascotQuote mascot="aegis">
                Every Monday I cross-check Google Ads spend against Shopify revenue and Stripe charges for the same window. If the variance crossed 18 percent over 7 days, I escalate immediately. Two scenarios show up most often: tracking broke, or the payment gateway is failing on iOS Safari. Both need a human decision in the next 24 hours, not next week.
              </MascotQuote>
            </section>

            {/* When the Drop Is Real */}
            <section id="drop-is-real">
              <h2 style={h2Style}>When the ROAS Drop Is Real (And You Have to Accept It)</h2>
              <p style={pStyle}>
                Honest disqualification builds more trust than another listicle promising &quot;one weird trick to recover ROAS&quot;. Three scenarios where the drop is real and the only sane response is recalibration.
              </p>
              <p style={pStyle}>
                <strong>Seasonality you can&apos;t out-bid.</strong> January after the holiday spend peak. Mid-summer for non-travel verticals. Mid-week dips in B2B. Pull last year&apos;s data. If today&apos;s drop matches the historical pattern, hold spend at maintenance, lower Target ROAS by 15 to 20 percent, and wait for the cycle. Forcing higher bids during a seasonal trough burns money without lifting volume.
              </p>
              <p style={pStyle}>
                <strong>Permanent competitive shift.</strong> A new player entered your category with a $5M war chest, or an incumbent doubled spend. Auction inflation is real and you can&apos;t out-bid your way back without losing money on every click. Accept the new equilibrium: slightly lower ROAS at slightly lower volume, find leverage elsewhere - organic, email, retention.
              </p>
              <p style={pStyle}>
                <strong>Product or market mismatch.</strong> CVR dropped not because of Google Ads but because the offer is less compelling than six months ago. Competitor undercut your price. Trust in your category eroded. No paid-media tactic fixes a product problem. Pause spend until the offer is fixed, invest the saved budget in CRO or message testing, and revisit in 60 days.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>Why did my Google Ads ROAS drop suddenly?</strong> Four out of five sudden ROAS drops are measurement problems, not campaign problems. Cross-check Google Ads revenue against Shopify or Stripe over the last seven days. If they disagree by more than 15 percent, fix tracking first. Otherwise work the 8-step checklist above in order.
              </p>
              <p style={pStyle}>
                <strong>Is a sudden ROAS drop always a tracking problem?</strong> No, but it&apos;s the highest-probability cause and the fastest to verify. The five most common categories are tracking, signal-loss-induced Smart Bidding starvation, Performance Max placement drift, new auction competition, and genuine market shifts.
              </p>
              <p style={pStyle}>
                <strong>Does iOS privacy affect Google Ads ROAS?</strong> Yes. iOS 18 ATT, Consent Mode v2, and third-party cookie deprecation have cut reported conversions 15 to 25 percent versus 2022. The conversions still happen - the reporting sees fewer of them. Enhanced conversions and refreshed customer match lists are the main compensations.
              </p>
              <p style={pStyle}>
                <strong>Should I lower Target ROAS or pause the campaign when ROAS drops?</strong> Lower it, don&apos;t pause. Reduce budgets 20 to 30 percent and lower Target ROAS by 10 to 20 percent while you diagnose. Pausing resets the learning period and delays recovery by weeks.
              </p>
              <p style={pStyle}>
                <strong>How long does it take Google Ads ROAS to recover after a drop?</strong> With the right diagnosis and fixes, 7 to 14 days for a typical SMB account. Longer if you change bid strategy mid-recovery. Don&apos;t change multiple variables at once.
              </p>
              <p style={pStyle}>
                <strong>Can Performance Max cause ROAS to drop suddenly?</strong> Yes. The most common pattern is Final URL expansion or new asset uploads tipping PMax toward Display and YouTube placements that look cheap and don&apos;t convert. Check Placement and Asset group reports, tighten signals to one to three per group.
              </p>
            </section>

            {/* B6 CTA Section */}
            <section id="b6-agents">
              <h2 style={h2Style}>Stop the ROAS Bleed With B6 Agents</h2>
              <p style={pStyle}>
                Connect your <a href="/blog/google-ads-optimization" style={linkStyle}>Google Ads account</a> and the three agents most relevant to ROAS recovery go to work. <a href="/b6#aegis" style={linkStyle}>Aegis runs a Monday risk review</a>: revenue cross-check against Shopify and Stripe, Auction Insights delta, spend curve versus conversion rate, and a 2-line escalation if the variance crosses 18 percent. <a href="/b6#buzz" style={linkStyle}>Buzz recalibrates Target ROAS</a> using a trailing 14-day baseline - not an aspirational target - so the algorithm gets fed enough signal to win the high-intent auctions. Echo sends a weekly digest with last year&apos;s same-week ROAS for context, so a seasonal dip stops looking like a crisis.
              </p>
              <p style={pStyle}>
                <a href="/chat" style={linkStyle}>Start a B6 free trial</a>. No commitment, no card on file. (See <a href="/pricing" style={linkStyle}>pricing tiers</a> - Co-pilot, Approval, and Autonomous modes.)
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
                  Stop guessing why ROAS dropped.
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Let Aegis, Buzz, and Echo cross-check tracking, recalibrate bids, and report week-over-week deltas. You stay in the loop, not in the weeds.
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
                  Start Free Trial
                </a>
              </div>
            </section>

          </div>
        </div>
        <KeepReading slug="google-ads-roas-dropped-suddenly" category="google-ads" />
      <Footer compact={true} />
      </div>
    </>
  );
}
