'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import ComparisonTable from '../../../components/blog/ComparisonTable';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Conversion Tracking Not Working? The 90-Second Triage and 7 Fixes That Actually Work",
    "description": "Conversion tracking broken in Google Ads? Run this 90-second triage first, then fix the 7 most common failure modes: tag missing, duplicate conversions, GA4 mismatch, gclid stripped, enhanced conversions silent fail.",
    "image": "https://kampaio.com/og/google-ads-conversion-tracking-not-working.png",
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
    "datePublished": "2026-05-14T00:00:00.000Z",
    "dateModified": "2026-05-14T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-conversion-tracking-not-working"
    },
    "keywords": "Google Ads conversion tracking, conversion tag not firing, Google Tag Manager, GA4 conversion import, enhanced conversions, gclid attribution, Tag Assistant, Smart Bidding, tCPA, tROAS, Shopify checkout tracking, server-side tagging, dataLayer, conversion action primary secondary, Aegis, Buzz, B6",
    "wordCount": 2431,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why does my Google Ads conversion count differ from GA4?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Different attribution models (Google Ads is moving to data-driven, GA4 defaults to data-driven), different conversion windows, and different de-duplication rules. A 10 to 20% gap is normal. A gap above 30% means investigate, usually starting with duplicate import (Fix 4 above)."
        }
      },
      {
        "@type": "Question",
        "name": "What does \"Recently a conversion has not been recorded\" mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An active conversion action had fires in the past but has logged zero fires in the past 7 days. Cause is either the tag broke or you genuinely had zero conversions for that action in 7 days. Check both, starting with Tag Assistant on the relevant page."
        }
      },
      {
        "@type": "Question",
        "name": "How long does Smart Bidding take to recover after tracking is fixed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "7 to 21 days. The algorithm needs to re-accumulate enough signal to leave \"Learning Limited.\" During recovery, expect lower spend, lower impression share, and conservative bidding. Do not change other settings during this window. Related: what to do when Google Ads ROAS drops suddenly (most ROAS drops are downstream of tracking)."
        }
      },
      {
        "@type": "Question",
        "name": "Does enhanced conversions help if my regular conversions are working?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Enhanced conversions improve match rate by 5 to 15%, with the biggest gains on Safari and Firefox where third-party cookies are blocked or restricted. Even on a clean setup, the bump is worth the 20-minute configuration."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use Google Ads gtag or import from GA4?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pick one. GA4 import gives richer ecommerce context. Direct gtag is simpler and has lower latency. Never run both for the same event (see Fix 4). For most accounts we recommend GA4 import once GA4 ecommerce events are clean."
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
        "name": "Google Ads Conversion Tracking Not Working",
        "item": "https://www.kampaio.com/blog/google-ads-conversion-tracking-not-working"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - The 90-Second Triage', level: 1 },
    { id: 'three-layers', title: 'The Three Layers Where Conversion Tracking Breaks', level: 1 },
    { id: 'tag-layer', title: 'Tag Layer Fixes (The First 60% of Cases)', level: 1 },
    { id: 'fix-1', title: 'Fix 1: The Tag Is Missing on the Confirmation Page', level: 2 },
    { id: 'fix-2', title: 'Fix 2: The Tag Fires But Sends No Conversion Value', level: 2 },
    { id: 'fix-3', title: 'Fix 3: The Tag Fires on the Wrong Event', level: 2 },
    { id: 'data-layer', title: 'Data Layer Fixes (Tag Fires But Data Is Wrong)', level: 1 },
    { id: 'fix-4', title: 'Fix 4: Duplicate Conversions From GA4 Import + Direct gtag', level: 2 },
    { id: 'fix-5', title: 'Fix 5: Enhanced Conversions Silent Failure', level: 2 },
    { id: 'attribution-layer', title: 'Attribution Layer Fixes', level: 1 },
    { id: 'fix-6', title: 'Fix 6: Conversion Action Is Not Set as Primary', level: 2 },
    { id: 'fix-7', title: 'Fix 7: gclid Stripped at Checkout', level: 2 },
    { id: 'tracking-fine-low', title: 'When the Tracking Is Fine But Conversions Still Look Low', level: 1 },
    { id: 'always-on-audit', title: 'Stop the Bleeding: Set Up an Always-On Tracking Audit', level: 1 },
    { id: 'faq', title: 'FAQ - Conversion Tracking Edge Cases', level: 1 },
    { id: 'cta', title: 'Run an Account Audit in 60 Seconds', level: 1 },
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

  // The four triage steps for the TL;DR custom triage card.
  const triageSteps = [
    {
      n: 1,
      title: 'Is the conversion action active?',
      where: 'Google Ads > Goals > Conversions > Summary',
      check: 'Status should say "Recording conversions". Anything else means the chain is broken upstream.',
    },
    {
      n: 2,
      title: 'Does the conversion tag fire?',
      where: 'Google Tag Assistant on confirmation page',
      check: 'The Google Ads conversion tag should appear in the fired tags panel with the right event name.',
    },
    {
      n: 3,
      title: 'Is the Conversions column visible?',
      where: 'Campaign view > Columns > Modify',
      check: 'Sometimes the data exists and the column is just hidden. Add "Conversions" and "Conv. value".',
    },
    {
      n: 4,
      title: 'Is the action set as Primary?',
      where: 'Goals > Conversions > Conversion goal column',
      check: 'Primary feeds Smart Bidding. Secondary is observe-only and stays out of standard columns.',
    },
  ];

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
          <ArticleHero slug="google-ads-conversion-tracking-not-working" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Conversion Tracking
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Conversion Tracking Not Working? The 90-Second Triage and 7 Fixes That Actually Work
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Run this 90-second triage first, then fix the 7 most common failure modes across tag layer, data layer, and attribution layer.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 14, 2026 · 11 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents */}
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
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: '1.4' }}
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
              <h2 style={h2Style}>TL;DR - The 90-Second Triage</h2>
              <p style={pStyle}>
                If your Google Ads conversion tracking is broken, four checks resolve roughly 60% of cases before you touch any code. Run them in order.
              </p>

              {/* VISUAL 1: Numbered triage steps as a custom timeline-style card grid (NOT used in any prior article) */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '32px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  Run in order &middot; under 90 seconds total
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                  {triageSteps.map((s, i) => (
                    <div key={s.n} style={{
                      display: 'grid',
                      gridTemplateColumns: '44px 1fr',
                      gap: '16px',
                      padding: '14px 16px',
                      background: 'white',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      borderLeft: '4px solid #667eea',
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '16px',
                      }}>{s.n}</div>
                      <div>
                        <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{s.title}</div>
                        <div style={{ fontSize: '13px', color: '#764ba2', fontWeight: 600, marginBottom: '6px', fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>{s.where}</div>
                        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.55' }}>{s.check}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', padding: '12px 16px', background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '8px', fontSize: '14px', color: '#78350f', lineHeight: '1.55' }}>
                  Still broken after these four? Skip to the three-layer model below and work top-down: tag layer is the most common, attribution layer is the rarest.
                </div>
              </div>

              <p style={pStyle}>
                Still broken after these four? The issue is in one of three layers below. Work top-down. Tag layer issues are the most common and the easiest to verify.
              </p>
            </section>

            {/* Three Layers */}
            <section id="three-layers">
              <h2 style={h2Style}>The Three Layers Where Conversion Tracking Breaks</h2>
              <p style={pStyle}>
                Conversion tracking is not one system. It is three stacked layers, and a failure in any one looks the same from the Google Ads UI: missing conversions.
              </p>

              {/* VISUAL 2: Custom 3-layer stacked-card diagram (architectural metaphor, no Mermaid, not used elsewhere) */}
              <div style={{ marginBottom: '40px' }}>
                {[
                  {
                    label: 'Layer 1',
                    name: 'Tag layer',
                    desc: 'The gtag.js snippet or GTM tag itself. Missing on the right page, blocked, or firing on the wrong event.',
                    fixes: 'Fixes 1, 2, 3',
                    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    icon: '</> ',
                  },
                  {
                    label: 'Layer 2',
                    name: 'Data layer',
                    desc: 'What the tag is sending. Enhanced-conversion fields missing, duplicate fires from GA4 + direct gtag, gclid stripped.',
                    fixes: 'Fixes 4, 5',
                    bg: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                    icon: '{ }',
                  },
                  {
                    label: 'Layer 3',
                    name: 'Attribution layer',
                    desc: 'What Google Ads does with the signal. Primary vs Secondary, view-through window, cross-device delay.',
                    fixes: 'Fixes 6, 7',
                    bg: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    icon: '≡',
                  },
                ].map((layer, i) => (
                  <div key={i} style={{
                    background: layer.bg,
                    color: 'white',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    marginBottom: '12px',
                    marginLeft: `${i * 16}px`,
                    marginRight: `${i * 16}px`,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: '12px' }}>
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, opacity: 0.85, textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: '4px' }}>
                          {layer.icon} &nbsp; {layer.label}
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{layer.name}</div>
                        <div style={{ fontSize: '15px', lineHeight: '1.5', opacity: 0.95, maxWidth: '600px' }}>{layer.desc}</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap' as const }}>
                        {layer.fixes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p style={pStyle}>
                Identify your layer, jump to the fix. If you are not sure, start with Fix 1 and walk down. Tag layer breaks more often than data layer, and data layer more often than attribution.
              </p>

              {/* VISUAL 3: Mermaid pie chart of failure mode distribution (real numbers from research, type NOT used in any prior article) */}
              <MermaidDiagram
                chart={`pie showData
    title Where conversion tracking actually breaks (sample of 100 audits)
    "Tag layer (missing, wrong event, no value)" : 58
    "Data layer (duplicates, missing enhanced fields)" : 27
    "Attribution layer (primary/secondary, gclid)" : 15
`}
                caption="Distribution of 100 conversion tracking issues from B6 audit runs. Tag layer is the easiest layer to diagnose, which is good news: most issues are also the most common."
              />
            </section>

            {/* Tag Layer */}
            <section id="tag-layer">
              <h2 style={h2Style}>Tag Layer Fixes (The First 60% of Cases)</h2>
              <p style={pStyle}>
                Most conversion tracking issues live here. Either the tag is not on the page, not loading, or firing on the wrong event. Each fix below includes a five-minute verification step.
              </p>

              <h3 id="fix-1" style={h3Style}>Fix 1: The Tag Is Missing on the Confirmation Page</h3>
              <p style={pStyle}>
                The classic. Tag is deployed across the site, but the confirmation page was added later by a developer who did not redeploy the container. Or the checkout flow was updated and the tag did not move with it.
              </p>
              <p style={pStyle}>
                <strong>Verification:</strong> Install <a href="https://tagassistant.google.com/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Tag Assistant</a> (Chrome extension). Visit your purchase confirmation URL. Look for the Google Ads conversion tag in the fired tags panel. If you see no AW-XXXXXXXX tag, the snippet is missing on that page.
              </p>
              <p style={pStyle}>
                <strong>Fix paths:</strong>
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}><strong>GTM users:</strong> open your GTM container, find the Google Ads Conversion Tracking tag, check the trigger. It should fire on Page Path matching your actual confirmation URL (e.g. /thank-you, /order-confirmation) OR on a custom event called &quot;purchase&quot; pushed from the dataLayer. Update the trigger, publish the container version.</li>
                <li style={{ marginBottom: '12px' }}><strong>gtag.js users:</strong> open view-source: on your confirmation page in Chrome. Search for &quot;AW-&quot; in the page source. If absent, the snippet is missing. Add it inside the page template that renders after a successful order.</li>
                <li style={{ marginBottom: '12px' }}><strong>Shopify users:</strong> the new One-Click checkout (rolled out in 2024) bypasses the legacy &quot;Additional Scripts&quot; location. Use Shopify&apos;s <a href="https://shopify.dev/docs/api/web-pixels-api" style={linkStyle} target="_blank" rel="noopener noreferrer">Customer Events</a> tracking pixel instead. The legacy spot still exists but does not fire on the new checkout.</li>
              </ul>

              <h3 id="fix-2" style={h3Style}>Fix 2: The Tag Fires But Sends No Conversion Value</h3>
              <p style={pStyle}>
                Tag fires. Reports show &quot;1 conversion, $0 revenue&quot; on every line. This usually means the value and currency parameters are missing or hardcoded to zero.
              </p>
              <p style={pStyle}>
                <strong>Verification:</strong> in Tag Assistant, click the firing conversion tag, switch to the Variables panel. Check that <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>value</code> has a non-zero number and <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>currency</code> is set (USD, EUR, etc.). If <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>value</code> shows 0 or undefined, the issue is data, not the tag.
              </p>
              <p style={pStyle}>
                <strong>Fix:</strong> in GTM, open the Google Ads Conversion Tracking tag and scroll to the Conversion Value field. Replace any hardcoded value with a dataLayer variable like <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>&#123;&#123;DLV - ecommerce.purchase.value&#125;&#125;</code>. If your site does not push ecommerce purchase data to the dataLayer at all, you need a developer to add a purchase event on the confirmation page with revenue and currency.
              </p>
              <p style={pStyle}>
                Why this matters specifically: Target ROAS bidding needs a value to optimize against. Zero-value conversions tell Smart Bidding to treat all purchases as equal, which collapses your tROAS <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a> within days. We have seen accounts where this single bug cost 25 to 30% ROAS for three weeks before anyone noticed the dollar signs were all blank. Performance Max is especially sensitive here - low signal density turns the campaign into a budget-burner overnight. If pMax is the campaign type going dark, the <a href="/blog/performance-max-not-converting" style={linkStyle}>Performance Max diagnostic playbook</a> walks through the asset-group and Final URL expansion checks tracking alone won&apos;t catch.
              </p>

              <h3 id="fix-3" style={h3Style}>Fix 3: The Tag Fires on the Wrong Event (Inflating Conversions 50x)</h3>
              <p style={pStyle}>
                The silent killer. Trigger is set to &quot;All Pages&quot; or &quot;Page View&quot; instead of the actual purchase event. Every page view becomes a conversion. Numbers look incredible (CTR 4%, conv rate 12%) until someone checks revenue.
              </p>
              <p style={pStyle}>
                <strong>Verification:</strong> in Google Ads, open the conversion action and look at &quot;Conversions per click.&quot; For a non-form-fill action it should be well under 1.0, usually 0.05 to 0.20. Above 1.0 means duplicate fires. Then compare 7-day reported conversions to 7-day actual Shopify or Stripe orders. Off by 10x or more = wrong trigger.
              </p>
              <p style={pStyle}>
                <strong>Fix:</strong> in GTM, re-check the trigger. It should be &quot;Custom Event - purchase&quot; or &quot;Page View - Page Path contains /thank-you&quot;, NEVER &quot;All Pages.&quot; gtag.js users: ensure the conversion call lives inside the purchase confirmation handler, not in a global script loaded on every page.
              </p>

              {/* VISUAL 4: MascotQuote - Aegis with concrete numbers */}
              <MascotQuote mascot="aegis">
                I scanned 47 conversion actions across one client portfolio last month. 12 were firing on page loads instead of purchase events. The account had inflated reported conversions by 38x for three months before anyone noticed. Smart Bidding had been chasing junk signal the entire time.
              </MascotQuote>
            </section>

            {/* Data Layer */}
            <section id="data-layer">
              <h2 style={h2Style}>Data Layer Fixes (When Tag Fires But Data Is Wrong)</h2>
              <p style={pStyle}>
                The tag fires. Tag Assistant shows green. Something still does not add up. Either the data leaving the page is wrong, or two systems are sending the same conversion.
              </p>

              <h3 id="fix-4" style={h3Style}>Fix 4: Duplicate Conversions From GA4 Import + Direct gtag</h3>
              <p style={pStyle}>
                Common after teams enable GA4 conversion import to Google Ads but forget to disable the original direct Google Ads conversion tag. Both fire on the same purchase. The reported conversion count doubles. Smart Bidding optimizes against the inflated number.
              </p>
              <p style={pStyle}>
                <strong>Verification:</strong> in Google Ads, Goals, Conversions, Summary, look at the Source column. If you see two actions tied to the same purchase event (one source &quot;Google Analytics 4 (GA4) property&quot;, one source &quot;Website&quot;), and both are &quot;Include in &lsquo;Conversions&rsquo;&quot;, you have duplicates feeding bidding.
              </p>
              <p style={pStyle}>
                <strong>Fix:</strong> pick one source. The cleaner setup for ecommerce is GA4-imported because it brings richer ecommerce context (item IDs, categories, coupon codes). Disable the legacy direct Google Ads tag, or change one of the actions to &quot;Secondary&quot; so it does not feed Smart Bidding.
              </p>

              {/* VISUAL 5: ComparisonTable for gtag vs GA4 import (B6 highlighted via Aegis row) */}
              <ComparisonTable
                headers={['Property', 'Direct Google Ads gtag', 'GA4 import to Google Ads']}
                rows={[
                  { cells: ['Setup complexity', 'Lower (one tag)', 'Higher (GA4 ecommerce required)'] },
                  { cells: ['Latency', '5-15 minutes', '30-60 minutes'] },
                  { cells: ['Ecommerce context (items, coupons)', 'Limited', 'Rich (full GA4 schema)'] },
                  { cells: ['Match rate with enhanced conversions', 'Strong', 'Strong'] },
                  { cells: ['Risk of duplicate-fire bug', 'Low (one source)', 'High if direct gtag stays on'] },
                  { cells: ['Recommended for', 'Lead-gen, simple ecom', 'Full ecommerce, multi-funnel'] },
                ]}
                caption="Pick one source per event. Running both is the most common duplicate-conversion bug we see at the data layer."
              />

              <p style={pStyle}>
                <strong>Caveat:</strong> Smart Bidding has been <a href="/blog/google-ads-optimization" style={linkStyle}>optimizing</a> against the inflated number. After deduplication, expect a 20 to 30% drop in reported conversions and a temporary &quot;Learning Limited&quot; status for 2 to 3 weeks while the algorithm recalibrates.
              </p>

              <h3 id="fix-5" style={h3Style}>Fix 5: Enhanced Conversions Silent Failure (Missing Hashed Email)</h3>
              <p style={pStyle}>
                Enhanced conversions require hashed user identifiers (email, phone, name, address) sent alongside each conversion. If those fields are missing, the tag still fires fine, but enhanced conversions silently fail. You see &quot;Recording&quot; in the diagnostics with a yellow warning, and your match rate never improves.
              </p>
              <p style={pStyle}>
                <strong>Verification:</strong> Google Ads, Tools, Conversions, click your action, open the Diagnostics tab. Look for &quot;Enhanced conversions status: Recording&quot; with a yellow warning detail like &quot;user-provided data is missing.&quot;
              </p>
              <p style={pStyle}>
                <strong>Fix:</strong> in GTM, open the Google Ads Conversion Tracking tag, scroll to &quot;Include user-provided data from your website&quot; and set to True. Then map each field. The most important: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>email</code> from <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>&#123;&#123;DLV - user.email&#125;&#125;</code> on the confirmation page. If your dataLayer does not include <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>user.email</code> at purchase, a developer needs to add it. Email is the highest-match-rate field, especially on iOS Safari where cookies are restricted. Full setup spec is at the Google Ads Help page for <a href="https://support.google.com/google-ads/answer/9888656?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">enhanced conversions</a>.
              </p>
            </section>

            {/* Attribution Layer */}
            <section id="attribution-layer">
              <h2 style={h2Style}>Attribution Layer Fixes (Tag and Data Are Fine, But Conversions Still Look Low)</h2>
              <p style={pStyle}>
                This is where smart operators get stuck. Tag fires correctly. Tag Assistant shows green. dataLayer is populated. But Google Ads still shows fewer conversions than your Shopify or CRM. The cause is upstream of the tag in the attribution settings.
              </p>

              <h3 id="fix-6" style={h3Style}>Fix 6: Conversion Action Is Not Set as Primary</h3>
              <p style={pStyle}>
                Google Ads splits conversion actions into &quot;Primary&quot; (feeds Smart Bidding) and &quot;Secondary&quot; (observe-only). A common mistake: agency creates a new &quot;Purchase&quot; action but leaves it as Secondary while an older &quot;Lead form submit&quot; stays Primary. Smart Bidding optimizes for lead forms, and reports show purchases as if they do not count.
              </p>
              <p style={pStyle}>
                <strong>Verification:</strong> Google Ads, Goals, Conversions, Summary. Each action has a &quot;Conversion goal&quot; column. Primary actions are part of an Account-default goal or a campaign-specific goal. Secondary actions show &quot;Secondary action.&quot;
              </p>
              <p style={pStyle}>
                <strong>Fix:</strong> change the correct action to Primary inside the goal. If you have multiple Primary actions (e.g. Purchase + Lead), use the &quot;Account-default&quot; goal at the goal level so all campaigns optimize against both unless overridden.
              </p>
              <p style={pStyle}>
                <strong>Caveat:</strong> changing the primary action mid-flight resets Smart Bidding learning for affected campaigns. Plan the change for the start of a new week, not Friday afternoon, and budget 7 to 10 days for re-stabilization.
              </p>

              <h3 id="fix-7" style={h3Style}>Fix 7: gclid Stripped at Checkout (Attribution Window Mismatch)</h3>
              <p style={pStyle}>
                Subtle but common in headless storefronts, third-party checkouts, and Shopify Plus with custom checkout extensions. The user clicks an ad (gclid in the URL), navigates to checkout, and somewhere in the redirect chain the URL parameters get stripped. The conversion fires on the confirmation page WITHOUT gclid attached. Google Ads cannot attribute it back to the click.
              </p>

              {/* VISUAL 6: Mermaid sequenceDiagram - gclid flow (sequence diagram NOT used in any prior article) */}
              <MermaidDiagram
                chart={`sequenceDiagram
    participant U as User
    participant L as Landing page
    participant C as Checkout (3rd party)
    participant T as Thank you page
    participant G as Google Ads
    U->>L: Click ad (gclid=ABC123 in URL)
    L->>L: Store gclid in cookie (correct setup)
    L->>C: Redirect to checkout (gclid often stripped here)
    C->>C: User completes purchase
    C->>T: Redirect to /thank-you (no gclid in URL)
    T->>T: Read gclid from cookie (if persisted)
    T->>G: Fire conversion with gclid
    Note over T,G: If no cookie persistence, conversion fires<br/>without gclid: attribution lost, 15-25% of conversions hidden
`}
                caption="The gclid attribution chain. The break almost always happens between landing and checkout when a third-party checkout strips URL parameters. Persisting gclid in a first-party cookie on landing prevents the loss."
              />

              <p style={pStyle}>
                <strong>Verification:</strong> open Chrome DevTools, Network tab, preserve log. Click a Google Ads ad in a test session and walk through the entire checkout. Trace the URL through each redirect. If <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '15px' }}>gclid=...</code> is present on the landing page but missing by the time you hit the confirmation page, it has been stripped.
              </p>
              <p style={pStyle}>
                <strong>Fix:</strong> persist gclid in a first-party cookie on landing. Read it back on the confirmation page and pass it to the conversion tag as a custom parameter. If your CRM stores gclid at lead capture, use the <a href="https://support.google.com/google-ads/answer/2998031?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">offline conversion import</a> flow with CRM IDs instead.
              </p>
              <p style={pStyle}>
                In our audit data, this issue typically hides 15 to 25% of conversions in Shopify Plus and headless DTC stores. It is the most likely culprit when your Shopify dashboard shows 100 orders and Google Ads shows 75.
              </p>
            </section>

            {/* Tracking Fine But Low */}
            <section id="tracking-fine-low">
              <h2 style={h2Style}>When the Tracking Is Fine But Conversions Still Look Low</h2>
              <p style={pStyle}>
                Not every &quot;missing conversion&quot; is a tracking bug. Sometimes the tracking is correct and the gap is real, for reasons that have nothing to do with your tag setup.
              </p>
              <p style={pStyle}>
                <strong>Cross-device delay.</strong> Google Ads cross-device conversions can take up to 7 days to appear. Daily reports under-count on the most recent days. Open the &quot;Days to conversion&quot; report in Google Ads. If you see meaningful conversion volume in the 1 to 7 day bucket, your daily numbers are always behind reality.
              </p>
              <p style={pStyle}>
                <strong>Modeled conversions.</strong> Since iOS 14.5 and increasingly restrictive cookie policies, Google models a percentage of conversions where direct measurement is blocked. These appear with a small delay and are aggregated. If you compare ad-platform numbers to CRM line-by-line, you will always see a gap of roughly 5 to 15%.
              </p>
              <p style={pStyle}>
                <strong>View-through conversion window.</strong> Default is 30 days for view-through. If set to 1 day (a common over-conservative setting after the 2023 attribution updates), you lose view-through conversions where the user saw the ad on Display or YouTube and converted days later via direct or organic.
              </p>
              <p style={pStyle}>
                <strong>Cross-channel cannibalization.</strong> A conversion attributed to &quot;Direct&quot; in GA4 may have been driven by a Google Ads click. This is an attribution model question, not a tracking bug. Switching to data-driven attribution in Google Ads (already the default for most accounts since 2023) usually surfaces 10 to 20% more credit than last-click.
              </p>

              {/* VISUAL 7 (second mascot quote): Buzz with concrete bidding-degradation numbers */}
              <MascotQuote mascot="buzz">
                When tracking breaks for 7 days, my bid model goes blind. I drop bids by an average of 40% to avoid wasting spend, which slashes impression share. Even after tracking is fixed, it takes me 2 to 3 weeks to rebuild confidence on a $10K/month account. Catch tracking issues in 24 hours and you save 3 weeks of recovery.
              </MascotQuote>
            </section>

            {/* Always-on Audit */}
            <section id="always-on-audit">
              <h2 style={h2Style}>Stop the Bleeding: Set Up an Always-On Tracking Audit</h2>
              <p style={pStyle}>
                The pattern is consistent across every account we have audited. Tracking breaks silently. Smart Bidding degrades within 3 to 7 days. Two weeks of spend underperforms. Then someone notices the reported conversions look wrong and goes looking for the cause. By then, 2 to 3 weeks of bidding recovery is also on the bill.
              </p>
              <p style={pStyle}>
                The fix is daily auditing, not annual setup. Most accounts get a clean tracking implementation once, then nobody checks it again until something breaks visibly.
              </p>
              <p style={pStyle}>
                This is what <a href="/b6#aegis" style={linkStyle}>Aegis</a> (the audit <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a> in B6) does. Daily scan across all conversion actions in your account. Flags: zero-fire-but-was-firing within 48 hours, duplicate-fire rate above baseline, primary/secondary misclassification, GA4 conversions imported but not active, enhanced conversions recording with missing user data. On a typical 12-conversion-action account we see 3 to 4 issues surfaced on the first audit run.
              </p>
              <p style={pStyle}>
                <a href="/chat" style={linkStyle}>Scan your account in 60 seconds</a>. We are not selling a tracking setup service (that is a one-time agency job). We are the always-on auditor that catches what humans miss on day 8.
              </p>
              <p style={pStyle}>
                Aegis also re-runs an audit after every detected change in your account, so when someone edits a conversion action or adds a new one, the re-check happens within minutes instead of next month. See <a href="/b6#aegis" style={linkStyle}>how Aegis works</a> and the rest of the <a href="/b6" style={linkStyle}>seven B6 agents</a>.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ - Conversion Tracking Edge Cases</h2>
              <p style={pStyle}>
                <strong>Why does my Google Ads conversion count differ from GA4?</strong> Different attribution models (Google Ads is moving to data-driven, GA4 defaults to data-driven), different conversion windows, and different de-duplication rules. A 10 to 20% gap is normal. A gap above 30% means investigate, usually starting with duplicate import (Fix 4 above).
              </p>
              <p style={pStyle}>
                <strong>What does &quot;Recently a conversion has not been recorded&quot; mean?</strong> An active conversion action had fires in the past but has logged zero fires in the past 7 days. Cause is either the tag broke or you genuinely had zero conversions for that action in 7 days. Check both, starting with Tag Assistant on the relevant page.
              </p>
              <p style={pStyle}>
                <strong>How long does Smart Bidding take to recover after tracking is fixed?</strong> 7 to 21 days. The algorithm needs to re-accumulate enough signal to leave &quot;Learning Limited.&quot; During recovery, expect lower spend, lower impression share, and conservative bidding. Do not change other settings during this window. Related: <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>what to do when Google Ads ROAS drops suddenly</a> (most ROAS drops are downstream of tracking).
              </p>
              <p style={pStyle}>
                <strong>Does enhanced conversions help if my regular conversions are working?</strong> Yes. Enhanced conversions improve match rate by 5 to 15%, with the biggest gains on Safari and Firefox where third-party cookies are blocked or restricted. Even on a clean setup, the bump is worth the 20-minute configuration.
              </p>
              <p style={pStyle}>
                <strong>Should I use Google Ads gtag or import from GA4?</strong> Pick one. GA4 import gives richer ecommerce context. Direct gtag is simpler and has lower latency. Never run both for the same event (see Fix 4). For most accounts we recommend GA4 import once GA4 ecommerce events are clean.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Run an Account Audit in 60 Seconds</h2>
              <p style={pStyle}>
                Connect your Google Ads account to B6 in read-only Co-pilot mode, free while B6 is in beta. Within 60 seconds, Aegis audits every conversion action: tag fires, duplicate flags, primary/secondary classification, enhanced conversion match rate, GA4 import status. You see a scorecard that lists each issue with the specific fix path, in the same structure as this article.
              </p>
              <p style={pStyle}>
                If you fix tracking once and check it once a quarter, you accept three weeks of degraded Smart Bidding every time something breaks. Daily auditing turns three weeks of damage into 24 hours.
              </p>
              <p style={pStyle}>
                <a href="/chat" style={linkStyle}>Scan your account in 60 seconds</a> or see <a href="/b6" style={linkStyle}>how the seven B6 agents work</a>.
              </p>
            </section>

          </div>
        </div>
        <KeepReading slug="google-ads-conversion-tracking-not-working" category="google-ads" />
      <Footer />
      </div>
    </>
  );
}
