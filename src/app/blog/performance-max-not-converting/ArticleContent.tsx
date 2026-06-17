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
    "headline": "Performance Max Not Converting? 9 Fixes That Actually Work (2026 Playbook)",
    "description": "Performance Max burning budget without conversions? 9 diagnostic steps from conversion tracking to bid strategy to landing pages - with thresholds and timelines.",
    "image": "https://kampaio.com/og/performance-max-not-converting.png",
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
      "@id": "https://kampaio.com/blog/performance-max-not-converting"
    },
    "keywords": "performance max, pmax, conversions, conversion tracking, google ads, bid strategy, target ROAS, target CPA, learning period, asset group, audience signals, final URL expansion, diagnostic insights, landing page, budget, Smart Bidding",
    "wordCount": 2305,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is my Performance Max campaign not converting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Almost always one of five causes: broken conversion tracking, learning period not finished, bid strategy set too aggressively, Final URL expansion sending paid traffic to irrelevant pages, or a slow/mismatched landing page. Work through the 9-step checklist above in order."
        }
      },
      {
        "@type": "Question",
        "name": "How long should I wait before judging a Performance Max campaign?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google recommends 7-14 days. Conservative answer: 14 days minimum before any structural change, and four to six weeks before you have full confidence in performance. Don't touch bid strategy or change budget by more than 20% during this window."
        }
      },
      {
        "@type": "Question",
        "name": "Why is my Performance Max campaign not spending?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most often: Target ROAS set higher than your historical baseline, so the auction stops bidding. Other causes: location targeting too narrow, negative keywords blocking core terms, account suspension, ad disapproval."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Performance Max get clicks but no sales?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Either targeting is too broad (Final URL expansion sending traffic to non-converting pages), landing page doesn't match the ad message, or your offer doesn't compete in the market. Check landing page speed first. Under three seconds on mobile is the threshold."
        }
      },
      {
        "@type": "Question",
        "name": "Can Performance Max work for small budgets under $1,000/month?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usually no. Smart Bidding needs ~30 conversions per month, which at a typical $40 CPA requires $1,200+ budget. Below that, use Search or Standard Shopping with manual bidding."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use Maximize Conversions or Target ROAS for Performance Max?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start with Maximize Conversion Value (no target) for the first 30 days to find your real baseline. Once you have 30+ conversions, switch to Target ROAS at ~80% of the baseline you observed. Don't set targets based on aspiration - set them based on observed performance."
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
        "name": "Performance Max Not Converting? 9 Fixes That Actually Work",
        "item": "https://www.kampaio.com/blog/performance-max-not-converting"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - Top 5 Fixes in 30 Seconds', level: 1 },
    { id: 'why-pmax-stops', title: 'Why Performance Max Stops Converting', level: 1 },
    { id: 'diagnostic-checklist', title: 'The 9-Step Diagnostic Checklist', level: 1 },
    { id: 'verify-tracking', title: '1. Verify Conversion Tracking', level: 2 },
    { id: 'learning-period', title: '2. Let the Learning Period Finish', level: 2 },
    { id: 'bid-strategy', title: '3. Right-Size Your Bid Strategy', level: 2 },
    { id: 'budget-cpa', title: '4. Audit Budget vs. Expected CPA', level: 2 },
    { id: 'final-url-expansion', title: '5. Check Final URL Expansion', level: 2 },
    { id: 'asset-groups', title: '6. Strengthen Asset Groups', level: 2 },
    { id: 'landing-page', title: '7. Fix Landing Page Speed and Relevance', level: 2 },
    { id: 'negative-overlap', title: '8. Watch for Campaign Overlap', level: 2 },
    { id: 'diagnostic-insights', title: '9. Run Diagnostic Insights', level: 2 },
    { id: 'when-not-right', title: "When Performance Max Isn't the Right Type", level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'b6-agents', title: 'Hand pMax Diagnostics to B6 Agents', level: 1 }
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
  const ulStyle = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };
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
          <ArticleHero slug="performance-max-not-converting" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Performance Max
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Performance Max Not Converting? 9 Fixes That Actually Work (2026 Playbook)
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              A systematic 9-step diagnostic checklist - with concrete thresholds and timelines - for when pMax is burning budget without conversions.
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
              <h2 style={h2Style}>TL;DR - Top 5 Fixes in 30 Seconds</h2>
              <p style={pStyle}>
                If your Performance Max campaign is spending without converting, the cause is almost always one of five things. Run these checks in order.
              </p>
              <ol style={olStyle}>
                <li style={liStyle}><strong>Conversion tracking is broken.</strong> Tag fires on the wrong page, or Google Ads marks it &quot;Unverified&quot;. Fix this first.</li>
                <li style={liStyle}><strong>Learning period isn&apos;t done.</strong> Google needs 14 days minimum. Tweaking earlier resets the clock.</li>
                <li style={liStyle}><strong>Bid strategy is starving the campaign.</strong> Target ROAS set above historical reality means the system stops bidding.</li>
                <li style={liStyle}><strong>Final URL expansion is sending traffic to non-converting pages.</strong> It&apos;s on by default, and most owners don&apos;t realize it.</li>
                <li style={liStyle}><strong>Landing page is slow or off-topic.</strong> Under 3 seconds on mobile, matched to the asset group theme.</li>
              </ol>
              <p style={pStyle}>
                Worked through all five and still see zero conversions? Performance Max probably isn&apos;t the right campaign type for your account. We cover that in the last section. And if conversions are coming through but ROAS is suddenly worse, that&apos;s a different diagnostic chain: read <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>why Google Ads ROAS dropped suddenly</a> for the 8-step ROAS recovery playbook.
              </p>
            </section>

            {/* Why pMax Stops Converting */}
            <section id="why-pmax-stops">
              <h2 style={h2Style}>Why Performance Max Stops Converting (Three Root Causes)</h2>
              <p style={pStyle}>
                Most &quot;pMax not converting&quot; problems reduce to three root causes. Knowing which one you&apos;re dealing with shortens the fix from hours to minutes.
              </p>
              <p style={pStyle}>
                <strong>Root cause 1: the tracking layer is broken.</strong> Across <a href="https://support.google.com/google-ads/answer/12131516?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">the top troubleshooting articles</a> in Google&apos;s organic results, conversion tracking shows up as the #1 culprit in six of nine sources. The campaign looks like it&apos;s failing, but Google&apos;s AI is literally getting no signal. Tags fire on every page instead of the thank-you page. GA4 events aren&apos;t imported as conversion actions. Enhanced conversions aren&apos;t enabled. The dashboard says zero. The reality is closer to &quot;we don&apos;t know.&quot; If pMax is the symptom but your whole account is reporting fewer conversions, work through the <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking diagnostic</a> first - the same broken-tag patterns show up everywhere tracking is wired.
              </p>
              <p style={pStyle}>
                <strong>Root cause 2: bidding starves the campaign.</strong> Set Target ROAS at 600% on an account with 320% historical ROAS, and the auction skips your bid every time. Or run Maximize Conversions without a Target CPA and watch the budget burn on junk traffic. Smart Bidding needs roughly 30 conversions per month to stabilize, and many SMB accounts don&apos;t have the volume. Set the target too high and the system never bids. Set it too low (or skip it entirely) and the system spends on the wrong people.
              </p>
              <p style={pStyle}>
                <strong>Root cause 3: audience or feed misalignment.</strong> Final URL expansion is on by default, which lets Google send paid traffic to any page on your domain. Great for deep e-commerce catalogs. Catastrophic for a single landing page business that ends up paying for clicks on /about, /careers, and /blog. Audience signals piled five-deep confuse the algorithm. Product feeds with missing attributes don&apos;t get shown. The campaign delivers clicks. None of them are buying.
              </p>
            </section>

            {/* 9-Step Diagnostic Checklist */}
            <section id="diagnostic-checklist">
              <h2 style={h2Style}>The 9-Step Diagnostic Checklist</h2>
              <p style={pStyle}>
                Walk these in order. The first four solve roughly 80% of cases. If you reach step 9 and Performance Max still isn&apos;t converting, the &quot;When pMax Isn&apos;t Right&quot; section below is for you.
              </p>

              {/* Step 1 */}
              <h3 id="verify-tracking" style={h3Style}>1. Verify conversion tracking from the page that actually converts</h3>
              <p style={pStyle}>
                This is the single most common breakage. Open Google Ads → Goals → Conversions. Your primary conversion action should say &quot;Recording conversions&quot; and &quot;Tag fires correctly&quot;. If it says &quot;No recent conversions&quot; or &quot;Unverified&quot;, stop everything else.
              </p>
              <p style={pStyle}>
                Use Google Tag Assistant or Tag Manager Preview to confirm the tag fires only on the thank-you or order-confirmation page, never on &quot;All Pages&quot;. A tag firing on every pageview inflates conversions. A tag firing on /cart instead of /checkout-complete reports false positives. A tag missing entirely reports nothing.
              </p>
              <p style={pStyle}>
                In 2026, enhanced conversions are no longer optional for pMax. Without them, Google&apos;s signal density drops sharply and the algorithm can&apos;t model your audience properly. Turn them on in conversion settings and verify hashed email or phone is flowing through.
              </p>

              {/* Step 2 */}
              <h3 id="learning-period" style={h3Style}>2. Let the learning period finish (14 days minimum)</h3>
              <p style={pStyle}>
                Google explicitly recommends <a href="https://developers.google.com/google-ads/api/performance-max/troubleshooting" style={linkStyle} target="_blank" rel="noopener noreferrer">7 to 14 days</a> before judging a Performance Max campaign. Some PPC teams argue six weeks is closer to the truth for full stabilization. Either way, pausing or rebuilding after five days is the most common self-inflicted wound we see.
              </p>
              <p style={pStyle}>
                During learning, CPA fluctuates two to three times your normal range. This is expected, not broken. The algorithm is exploring: testing different audience signals, creative combinations, and placements to find what converts.
              </p>
              <p style={pStyle}>
                A few rules to protect the learning period:
              </p>
              <ul style={ulStyle}>
                <li style={liStyle}>Don&apos;t change bid strategy.</li>
                <li style={liStyle}>Don&apos;t change budget by more than 20%.</li>
                <li style={liStyle}>Don&apos;t touch audience signals.</li>
                <li style={liStyle}>Wait three to four weeks between significant adjustments.</li>
              </ul>
              <p style={pStyle}>
                After 14 days with zero conversions, move to the next step. After 14 days with 1-5 conversions, the system is learning - give it another seven days before intervening.
              </p>

              {/* Step 3 */}
              <h3 id="bid-strategy" style={h3Style}>3. Right-size your bid strategy</h3>
              <p style={pStyle}>
                Setting Target ROAS at 600% when your historical baseline is 320% sounds aspirational. To the auction, it reads as &quot;this advertiser doesn&apos;t want to bid.&quot; So the system stops bidding. Spend collapses. Conversions never come.
              </p>
              <p style={pStyle}>
                The fix: start with Maximize Conversion Value with no target for the first 30 days. Let the campaign find a real baseline. Once you have 30+ conversions, switch to Target ROAS set at roughly 80% of the baseline you observed. So if Max Conversion Value delivered 350% ROAS over 30 days, set your Target ROAS at 280%. Raise it gradually from there. (This is exactly the rule <a href="/b6#buzz" style={linkStyle}>Buzz applies</a> when he tunes pMax bids inside B6.)
              </p>
              <MascotQuote mascot="buzz">
                If your historical ROAS is 320% and you set Target ROAS at 600%, the auction skips your bid. I&apos;d run Maximize Conversion Value for 14 days, get a real baseline, then set Target ROAS at 80% of that baseline. That&apos;s how the campaign actually starts spending.
              </MascotQuote>

              {/* Step 4 */}
              <h3 id="budget-cpa" style={h3Style}>4. Audit budget vs. expected CPA</h3>
              <p style={pStyle}>
                The math here is unforgiving. Smart Bidding needs roughly 30 conversions per month to stabilize. If your historical CPA is $40, the minimum viable monthly budget is $1,200. And that&apos;s the floor, not the optimum.
              </p>
              <p style={pStyle}>
                Common SMB mistake: $500/month budget, expecting pMax to perform like a high-spend account. The campaign doesn&apos;t have enough volume to feed the algorithm. It bounces between exploration phases and never settles. You see noise, not performance.
              </p>
              <p style={pStyle}>
                If your budget can&apos;t support 30 conversions per month, Performance Max is the wrong campaign type. Standard Shopping or Search with manual or eCPC bidding will give you more control on lower volume. If the campaign is actually <em>under</em>spending its budget rather than burning it, the pacing diagnosis is different: see <a href="/blog/google-ads-not-spending-full-budget" style={linkStyle}>why Google Ads isn&apos;t spending the full budget</a> for the auction-eligibility checklist.
              </p>

              {/* Step 5 */}
              <h3 id="final-url-expansion" style={h3Style}>5. Check Final URL expansion settings</h3>
              <p style={pStyle}>
                Final URL expansion is enabled by default. It lets Google send paid traffic to any URL on your domain and dynamically rewrite headlines based on page content. For e-commerce catalogs with hundreds of product pages, this is useful. For a service business with one landing page, it&apos;s catastrophic.
              </p>
              <p style={pStyle}>
                How to check: campaign settings → Final URL expansion. Either turn it off, or add URL exclusion rules. Common exclusions: /blog/*, /careers/*, /about, /privacy, anything on the domain that isn&apos;t a conversion target.
              </p>
              <p style={pStyle}>
                Diagnostic signal: high impression share, decent CTR, conversions stuck at zero. Almost always Final URL expansion is sending paid clicks to non-converting pages. Worth checking before you blame the creative.
              </p>

              {/* Step 6 */}
              <h3 id="asset-groups" style={h3Style}>6. Strengthen asset groups (creatives + signals)</h3>
              <p style={pStyle}>
                Each asset group needs minimum five headlines, five descriptions, four images, one logo, and one video for healthy serving. Below those minimums, Google can&apos;t generate enough ad combinations to test.
              </p>
              <p style={pStyle}>
                <a href="/blog/responsive-search-ads-best-practices" style={linkStyle}>Ad Strength</a> rating: aim for &quot;Good&quot;, not &quot;Excellent&quot;. &quot;Excellent&quot; often signals the assets are too similar. They look great individually but compete with themselves in the auction.
              </p>
              <p style={pStyle}>
                Audience signals: one to three per asset group. Piling on 20 signals doesn&apos;t give Google &quot;more data&quot;. It confuses the model. Stick to your highest-intent customer match list, one demographic, maybe one interest segment.
              </p>
              <p style={pStyle}>
                One asset group per product category or service type. Don&apos;t mix office furniture and pet supplies in the same group. Google can&apos;t <a href="/blog/google-ads-optimization" style={linkStyle}>optimize</a> creative across irrelevant verticals, and you&apos;ll see flat performance for both.
              </p>

              {/* Step 7 */}
              <h3 id="landing-page" style={h3Style}>7. Fix landing page speed and relevance</h3>
              <p style={pStyle}>
                Performance Max sends mixed-channel traffic: Search, Display, YouTube, Discover, Gmail. Your landing page has to load in under three seconds on mobile, and the message has to match the ad.
              </p>
              <p style={pStyle}>
                Test in PageSpeed Insights. If LCP (Largest Contentful Paint) exceeds four seconds on mobile, conversion rates drop sharply. Google&apos;s own benchmarks put the drop at 30-50% on slow pages.
              </p>
              <p style={pStyle}>
                Relevance matters as much as speed. If your ad copy promises &quot;handmade leather wallets&quot; and the landing page is a generic homepage, mobile users bounce in under 10 seconds. Build dedicated landing pages per asset group. Shopify sections, Webflow pages, Unbounce templates all work.
              </p>
              <p style={pStyle}>
                If all of this sounds like work you don&apos;t have time for, that&apos;s exactly the gap we built B6 to fill.
              </p>

              {/* Step 8 */}
              <h3 id="negative-overlap" style={h3Style}>8. Watch for negative overlap with other campaigns</h3>
              <p style={pStyle}>
                Performance Max and Search campaigns in the same account fight each other on duplicate keywords. By default, pMax wins on most overlaps, which steals impression share from a Search campaign you spent months tuning.
              </p>
              <p style={pStyle}>
                Check Auction Insights for your Search campaigns. If impression share dropped after pMax launched, you have overlap. The fix is harder than it should be. pMax doesn&apos;t expose <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keywords</a> directly in the UI for non-Search assets. You have to add brand-term negatives via Google Ads support, or restructure: one brand-only Search campaign, pMax for non-brand prospecting only.
              </p>
              <p style={pStyle}>
                If you&apos;re spending more on pMax than on your Search campaign because of the overlap, you&apos;re not getting incremental performance. You&apos;re cannibalizing.
              </p>

              {/* Step 9 */}
              <h3 id="diagnostic-insights" style={h3Style}>9. Run Diagnostic Insights (Google&apos;s built-in tool)</h3>
              <p style={pStyle}>
                Most SMB owners we talk to have never opened this tab. Google Ads → your campaign → Insights tab → Diagnostic Insights. The tool surfaces low ad strength, budget pacing issues, conversion tracking status, asset coverage gaps, and policy disapprovals, all in one view.
              </p>
              <p style={pStyle}>
                Rule of thumb: open Diagnostic Insights once a week. If all checks are green and conversions are still zero, the problem is outside campaign settings. It&apos;s the landing page, the product, market demand, or the wrong campaign type for your account.
              </p>
              <MascotQuote mascot="aegis">
                I scan Diagnostic Insights and the spend curve every Monday. If pMax burned more than 60% of weekly budget by Wednesday with zero conversions, I flag it. Two scenarios: tracking broke, or audience drifted. Both need a human decision before more spend goes out.
              </MascotQuote>
            </section>

            {/* When pMax Isn't Right */}
            <section id="when-not-right">
              <h2 style={h2Style}>When Performance Max Isn&apos;t the Right Campaign Type</h2>
              <p style={pStyle}>
                Honest disqualification builds more trust than another listicle of &quot;top 10 pMax hacks&quot;. Three scenarios where Performance Max is structurally wrong for your account:
              </p>
              <p style={pStyle}>
                <strong>Sub-$1,000 monthly budget.</strong> Smart Bidding needs roughly 30 conversions per month to stabilize. At a typical $40 CPA, that&apos;s $1,200/month minimum. Below that, pMax oscillates and never settles. Use Search with manual or eCPC bidding instead. You trade automation for predictability, which is the right trade at low volume.
              </p>
              <p style={pStyle}>
                <strong><a href="/blog/google-ads-for-b2b-saas" style={linkStyle}>B2B SaaS</a> with 30-90 day sales cycles.</strong> pMax optimizes on signal density and short feedback loops. B2B conversions are too sparse and too delayed for the algorithm to model accurately. You&apos;ll burn budget chasing signals that arrive months after the click. Use Search plus LinkedIn (or a paid newsletter sponsorship) instead.
              </p>
              <p style={pStyle}>
                <strong>Single-product, single-page websites.</strong> Performance Max thrives on product feed variety and Final URL expansion. One landing page means nothing to optimize across. The campaign type was built for shopping, not for one-pagers. Use Search with tight match types.
              </p>
              <p style={pStyle}>
                If your account fits one of these three, pause pMax, save the budget, and run Standard Shopping or Search until your volume justifies switching back.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>Why is my Performance Max campaign not converting?</strong> Almost always one of five causes: broken conversion tracking, learning period not finished, bid <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a> set too aggressively, Final URL expansion sending paid traffic to irrelevant pages, or a slow/mismatched landing page. Work through the 9-step checklist above in order.
              </p>
              <p style={pStyle}>
                <strong>How long should I wait before judging a Performance Max campaign?</strong> Google recommends 7-14 days. Conservative answer: 14 days minimum before any structural change, and four to six weeks before you have full confidence in performance. Don&apos;t touch bid strategy or change budget by more than 20% during this window.
              </p>
              <p style={pStyle}>
                <strong>Why is my Performance Max campaign not spending?</strong> Most often: Target ROAS set higher than your historical baseline, so the auction stops bidding. Other causes: location targeting too narrow, negative keywords blocking core terms, account suspension, ad disapproval.
              </p>
              <p style={pStyle}>
                <strong>Why does Performance Max get clicks but no sales?</strong> Either targeting is too broad (Final URL expansion sending traffic to non-converting pages), landing page doesn&apos;t match the ad message, or your offer doesn&apos;t compete in the market. Check landing page speed first. Under three seconds on mobile is the threshold.
              </p>
              <p style={pStyle}>
                <strong>Can Performance Max work for small budgets under $1,000/month?</strong> Usually no. Smart Bidding needs ~30 conversions per month, which at a typical $40 CPA requires $1,200+ budget. Below that, use Search or Standard Shopping with manual bidding.
              </p>
              <p style={pStyle}>
                <strong>Should I use Maximize Conversions or Target ROAS for Performance Max?</strong> Start with Maximize Conversion Value (no target) for the first 30 days to find your real baseline. Once you have 30+ conversions, switch to Target ROAS at ~80% of the baseline you observed. Don&apos;t set targets based on aspiration - set them based on observed performance.
              </p>
            </section>

            {/* B6 CTA Section */}
            <section id="b6-agents">
              <h2 style={h2Style}>Hand pMax Diagnostics to B6 Agents</h2>
              <p style={pStyle}>
                Connect your Google Ads account and <a href="/b6#aegis" style={linkStyle}>Aegis runs a Monday risk review</a>: Diagnostic Insights, spend curve, conversion tracking status, asset coverage. Buzz adjusts bid strategy based on your actual historical ROAS, not an aspirational target. Echo sends you a weekly summary so you always know what changed and why.
              </p>
              <MascotQuote mascot="echo">
                Each Monday at 9am I send you the weekend pMax report - what Aegis flagged, what Buzz adjusted, what&apos;s queued for your approval. Two minutes of reading, decisions in your inbox.
              </MascotQuote>
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
                  Stop fighting Performance Max alone.
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Let Aegis, Buzz, and Echo handle the weekly risk review, bid adjustments, and reporting. You stay in the loop, not in the weeds.
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
        <KeepReading slug="performance-max-not-converting" category="google-ads" />
      <Footer compact={true} />
      </div>
    </>
  );
}
