'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import InlineSVG from '../../../components/blog/InlineSVG';
import { BigStat } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-invalid-traffic-click-fraud#article',
    headline: 'Google Ads Invalid Traffic & Click Fraud: How to Spot It, Stop It, and Get Refunded (2026)',
    description: 'Suspicious clicks draining your Google Ads budget? Learn how to tell real click fraud from invalid traffic, diagnose it in 5 minutes, claim Google\'s automatic credits, and lock it down with IP and audience exclusions.',
    image: 'https://www.kampaio.com/og/google-ads-invalid-traffic-click-fraud.png',
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
    datePublished: '2026-06-15T00:00:00.000Z',
    dateModified: '2026-06-15T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-invalid-traffic-click-fraud',
    },
    keywords: 'google ads invalid traffic, click fraud, invalid clicks, invalid click rate, IP exclusions, click farm, bot traffic, invalid activity credit, ad fraud, competitor clicking',
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Google Ads Invalid Traffic & Click Fraud', item: 'https://www.kampaio.com/blog/google-ads-invalid-traffic-click-fraud' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is invalid traffic in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Invalid traffic is any click or impression that does not reflect genuine user interest, including intentional fraud, bots, and accidental duplicate clicks. Most is filtered before you are billed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between invalid clicks and click fraud?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Invalid clicks is Google\'s broad category for all non-genuine activity. Click fraud is the intentional subset. All click fraud is invalid traffic. Not all invalid traffic is click fraud.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I see invalid clicks in my Google Ads account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Add the Invalid clicks and Invalid click rate columns via Campaigns then the Columns icon then Modify columns. A rate in the low single digits is normal. Double digits in one week warrants investigation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a refund for invalid clicks on Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google issues credits, not cash refunds. Automatic credits appear in billing under Invalid Activity in Adjustments. For missed cases, file an investigation request through Support. Credits are not guaranteed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take Google to refund invalid clicks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No fixed timeframe. Automatic credits appear within the current or next billing cycle. Manual investigations have no stated turnaround. Google\'s automated review covers the last 60 days.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I block an IP address in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to campaign settings then Advanced settings then IP exclusions. Add the IP or CIDR range. Applies to Search Network campaigns. Cap is approximately 500 addresses or ranges per campaign.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Google automatically protect against click fraud?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Automated filters remove most invalid traffic pre-billing. A manual Ad Traffic Quality team reviews patterns filters miss. Post-billing credits handle verified cases. Protection is strong against known bot signatures, weaker against account-specific attacks from residential IPs or rotating proxies.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: Is It Click Fraud, and What to Do Right Now', level: 1 },
    { id: 'what-is-invalid-traffic', title: 'What Is Invalid Traffic in Google Ads?', level: 1 },
    { id: 'symptoms', title: '3 Symptoms That Point to Invalid Traffic', level: 1 },
    { id: 'how-google-protects-you', title: 'How Google Already Protects You (and Where It Falls Short)', level: 1 },
    { id: 'see-invalid-clicks', title: 'How to See Invalid Clicks and Credits in Your Account', level: 1 },
    { id: 'get-a-refund', title: 'How to Get a Refund (Credit) for Invalid Clicks', level: 1 },
    { id: 'how-to-stop', title: 'How to Stop Invalid Traffic (IP, Audience, and Placement Exclusions)', level: 1 },
    { id: 'not-click-fraud', title: 'When It Is NOT Click Fraud (Honest Check)', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Hand Invalid-Traffic Monitoring to Kampaio', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' } as const;
  const h2Style = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px' } as const;
  const h3Style = { fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '36px' } as const;
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' } as const;

  // VISUAL: Google's three-layer defense (real-time filter -> manual review -> post-billing credit), InlineSVG
  const defenseSvg = `
<svg viewBox="0 0 660 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">
  <text x="0" y="22" font-size="15" font-weight="700" fill="#1e293b">How Google filters invalid traffic, in three parallel layers</text>

  <rect x="40" y="44" width="580" height="52" rx="8" fill="#10b981"/>
  <text x="56" y="70" font-size="14" font-weight="700" fill="#ffffff">1. Real-time filters (pre-billing)</text>
  <text x="56" y="88" font-size="12" fill="#ecfdf5">Remove obvious invalid clicks before you are ever charged</text>

  <rect x="40" y="112" width="580" height="52" rx="8" fill="#667eea"/>
  <text x="56" y="138" font-size="14" font-weight="700" fill="#ffffff">2. Manual Ad Traffic Quality review</text>
  <text x="56" y="156" font-size="12" fill="#eef2ff">Botnet researchers investigate patterns filters flag or miss</text>

  <rect x="40" y="180" width="580" height="52" rx="8" fill="#764ba2"/>
  <text x="56" y="206" font-size="14" font-weight="700" fill="#ffffff">3. Post-billing credits</text>
  <text x="56" y="224" font-size="12" fill="#f3e8ff">Verified invalid activity returns as an Adjustment on future spend</text>

  <rect x="40" y="252" width="580" height="40" rx="8" fill="#ffffff" stroke="#ef4444" stroke-width="2"/>
  <text x="56" y="277" font-size="13" font-weight="700" fill="#ef4444">Gap: account-specific attacks from residential IPs and rotating proxies slip through</text>
</svg>`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-invalid-traffic-click-fraud" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Wasted Spend
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Invalid Traffic & Click Fraud: How to Spot It, Stop It, and Get Refunded (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              How to tell real click fraud from invalid traffic, diagnose it in five minutes, claim Google&apos;s automatic credits, and lock it down with IP and audience exclusions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 15, 2026 · 11 min read</span>
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

        {/* Article Body */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Intro / featured snippet */}
            <section id="intro">
              <p style={pStyle}>
                Invalid traffic in Google Ads is clicks and impressions that do not reflect genuine user interest, including intentional click fraud, accidental duplicates, and bot crawls. Google filters most of it before you are charged and credits verified cases automatically. The long tail, sophisticated competitor attacks and rotating-proxy botnets, requires your own intervention.
              </p>
            </section>

            {/* VISUAL 1: 3-symptom self-check, HTML card grid (3 items, repeat(3,1fr)) */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: Is It Click Fraud, and What to Do Right Now</h2>
              <p style={pStyle}>
                If your clicks spiked with zero conversion lift, you may be seeing invalid traffic. Google already filters most of it before you are charged and credits verified invalid clicks automatically as account adjustments. Filtering is not perfect though, and you can do more.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>3-symptom self-check (in order):</p>
              <div className="symptom-grid">
                <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '22px 24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Symptom 1</div>
                  <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1e293b', margin: 0 }}><strong>High CTR + near-zero conversions</strong> over a short window (7 days or less).</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '22px 24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Symptom 2</div>
                  <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1e293b', margin: 0 }}><strong>Repeat clicks from the same IP or narrow geo</strong> you do not target.</p>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '22px 24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#667eea', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Symptom 3</div>
                  <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1e293b', margin: 0 }}><strong>Click spike with no conversion or revenue lift.</strong> Budget burns faster, results stay flat.</p>
                </div>
              </div>
              <p style={{ ...pStyle, marginTop: '32px' }}>
                Check the Invalid clicks column first (5-minute fix below). If billing shows &quot;invalid traffic adjustments,&quot; Google already caught and credited some of it.
              </p>
            </section>

            {/* What is invalid traffic */}
            <section id="what-is-invalid-traffic">
              <h2 style={h2Style}>What Is Invalid Traffic in Google Ads?</h2>
              <p style={pStyle}>
                According to Google Ads Help, invalid traffic is &quot;clicks and impressions on ads that aren&apos;t a result of genuine user interest, including intentionally fraudulent traffic and accidental or duplicate clicks&quot; (<a href="https://support.google.com/google-ads/answer/11182074?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={pStyle}>
                <strong>Invalid traffic</strong> is Google&apos;s broad umbrella: accidental double-clicks, bot crawls, datacenter traffic, click farms, deliberate competitor attacks. <strong>Click fraud</strong> is the intentional subset only. Not every invalid click is fraud, and this distinction matters because the fix differs.
              </p>
              <p style={pStyle}>
                Types per Google Ad Traffic Quality (<a href="https://www.google.com/ads/adtrafficquality/invalid-activity/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google, 2026</a>): accidental or duplicate clicks, bots and botnets, click farms, competitor clicking, datacenter and proxy traffic, and AI-synthetic clicks (an emerging category in 2025 to 2026).
              </p>

              {/* VISUAL 2: BigStat (bold-viz) using sourced figures from the article */}
              <BigStat
                value="$32.6B"
                label="lost to ad fraud in 2025"
                claim="and 64.9% of invalid traffic comes from repeat actors. Search-campaign click fraud typically runs 14 to 22%."
                source="Source: Spider AF 2026 Ad Fraud White Paper; TrafficGuard, 2026"
              />
              <p style={pStyle}>
                Per TrafficGuard&apos;s invalid traffic analysis, click fraud in search campaigns typically runs 14 to 22% (<a href="https://www.trafficguard.ai/blog/how-to-protect-your-google-ads-from-fraud-using-smarter-detection-tools" style={linkStyle} target="_blank" rel="noopener noreferrer">TrafficGuard, 2026</a>). Per Spider Labs&apos; 2026 Ad Fraud White Paper, advertisers lost an estimated $32.6 billion to ad fraud in 2025, and 64.9% of invalid traffic comes from repeat actors (<a href="https://spideraf.com/articles/a-guide-to-click-fraud-and-how-to-prevent-it" style={linkStyle} target="_blank" rel="noopener noreferrer">Spider AF, 2026</a>). In Spider AF&apos;s own measured campaigns the average fraud rate was 4.81%. These are vendor figures, not independent audits, but at the low end the exposure is still real.
              </p>
            </section>

            {/* 3 Symptoms */}
            <section id="symptoms">
              <h2 style={h2Style}>3 Symptoms That Point to Invalid Traffic</h2>
              <p style={pStyle}>
                Invalid traffic does not announce itself with a warning. These three patterns are your earliest tells. Check them in order.
              </p>

              <h3 style={h3Style}>Sudden Click Spike With No Conversion Lift</h3>
              <p style={pStyle}>
                <strong>Symptom:</strong> Daily clicks jumped 2x to 3x. Conversions stayed flat. Budget burned by noon.
              </p>
              <p style={pStyle}>
                <strong>What it means:</strong> Traffic is not coming from genuine intent. Threshold to investigate: clicks up 50% or more with conversions flat over a 7-day window.
              </p>
              <p style={pStyle}>
                <strong>What to do:</strong> Segment by day and hour. Fraud-driven spikes cluster in off-hours or compress into a single day. Any solid <a href="/blog/google-ads-anomaly-detection" style={linkStyle}>Google Ads anomaly detection</a> process is built around exactly this: the spike looks random in aggregate but concentrated when you segment by time.
              </p>

              {/* VISUAL 3: MascotQuote (Buzz) */}
              <MascotQuote mascot="buzz">
                Last week Campaign A took 280 clicks for $190 and returned 0 conversions, all between 2am and 4am from one metro you do not target. I would exclude that IP range today and reallocate the $190 to your top converting ad group. That is a 14% daily budget recovery.
              </MascotQuote>

              <h3 style={h3Style}>High CTR With Abnormally Low Conversions</h3>
              <p style={pStyle}>
                <strong>Symptom:</strong> CTR is 8 to 12% on Search where your normal is 3 to 5%. Conversion rate has collapsed.
              </p>
              <p style={pStyle}>
                <strong>What it means:</strong> Clicks exist but intent does not. Real users who click with genuine interest convert at some baseline. Bot and click-farm clicks convert at zero.
              </p>
              <p style={pStyle}>
                <strong>Honest qualifier:</strong> High CTR with low conversions also comes from broad match pulling irrelevant queries, or a tracking tag that stopped firing. If your CTR spiked after adding new keywords or pushing a site change, rule those out first. A Display or Performance Max spike with high CTR and zero conversions is a stronger fraud signal than the same pattern on Search. Check whether <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>CPC rising without a conversion lift</a> has a simpler match-type explanation before escalating.
              </p>

              <h3 style={h3Style}>Repeat Clicks From the Same IP or Narrow Geo</h3>
              <p style={pStyle}>
                <strong>Symptom:</strong> One region or a narrow IP cluster generates disproportionate clicks from a geo that does not match your customers. Conversions from that area: zero.
              </p>
              <p style={pStyle}>
                <strong>What it means:</strong> Competitor clicking manually, a bot on a fixed IP range, or accidental refresh clicks from a Display placement. A /24 range firing 40 clicks per day at consistent hours looks like a competitor on a schedule.
              </p>
              <p style={pStyle}>
                <strong>What to do:</strong> Google Ads has no native per-IP click report. Use geographic segmentation to find the anomaly, then cross-reference server access logs or Google Analytics sessions against your click timestamps.
              </p>

              {/* VISUAL 4: MascotQuote (Aegis) */}
              <MascotQuote mascot="aegis">
                I flag any single IP that crosses 5+ clicks in 24 hours with no downstream conversion. Last month I caught a /24 range firing 40 clicks a day across two campaigns, which looked like a competitor on a schedule. I queued an IP exclusion and an invalid-traffic report for you to approve before it cost another $400.
              </MascotQuote>
            </section>

            {/* How Google protects you */}
            <section id="how-google-protects-you">
              <h2 style={h2Style}>How Google Already Protects You (and Where It Falls Short)</h2>
              <p style={pStyle}>
                Google filters invalid traffic in real time and removes most of it before you are charged. What slips through after billing is credited back automatically (<a href="https://support.google.com/google-ads/answer/11182074?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={{ ...pStyle, marginBottom: '20px' }}>Three mechanisms run in parallel:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Automated real-time filters</strong> remove obvious invalid clicks before billing. You are never charged for these.</li>
                <li style={{ marginBottom: '16px' }}><strong>Manual Ad Traffic Quality review:</strong> Google&apos;s team, including botnet researchers, investigates patterns filters flag or miss.</li>
                <li style={{ marginBottom: 0 }}><strong>Post-billing credits:</strong> Verified invalid activity after billing appears as &quot;Invalid Activity&quot; in your Adjustments section, as a credit on future spend.</li>
              </ol>

              {/* VISUAL 5: InlineSVG (three-layer defense) */}
              <InlineSVG svg={defenseSvg} caption="Google's defense is broad-spectrum, not account-specific. Automated reviews cover the last 60 days of traffic." ariaLabel="Diagram showing Google's three parallel layers of invalid-traffic defense: real-time filters, manual review, and post-billing credits, plus the gap where account-specific attacks slip through" />

              <p style={pStyle}>
                <strong>Where it falls short:</strong> Filters catch known bot signatures and datacenter traffic efficiently. They miss account-specific attacks, like a competitor clicking from a residential IP, or a small click farm using rotating proxies. IP exclusions are manual and capped at approximately 500 per campaign. Performance Max and Display placement transparency is limited. High-volume invalid clicks can also degrade your <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Google Ads Quality Score</a> signals by skewing historical CTR data. Google&apos;s defense is broad-spectrum, not account-specific.
              </p>
            </section>

            {/* See invalid clicks */}
            <section id="see-invalid-clicks">
              <h2 style={h2Style}>How to See Invalid Clicks and Credits in Your Account</h2>
              <p style={pStyle}>
                Two numbers tell you what Google already caught: the Invalid clicks column and invalid traffic adjustments in billing.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>Adding the Invalid clicks column:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}>Go to <strong>Campaigns</strong> in Google Ads.</li>
                <li style={{ marginBottom: '12px' }}>Click the <strong>Columns icon</strong> above the data table.</li>
                <li style={{ marginBottom: '12px' }}>Select <strong>Modify columns</strong>, then search &quot;Invalid clicks.&quot;</li>
                <li style={{ marginBottom: 0 }}>Add <strong>Invalid clicks</strong> and <strong>Invalid click rate</strong>. Click Apply.</li>
              </ol>
              <p style={pStyle}>
                An invalid click rate in the low single digits is normal. A jump to double digits in a single week warrants investigation.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>Finding billing credits (<a href="https://cheq.ai/blog/what-are-invalid-clicks/" style={linkStyle} target="_blank" rel="noopener noreferrer">CHEQ, 2026</a>):</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}>Go to <strong>Tools &gt; Billing &gt; Summary</strong>.</li>
                <li style={{ marginBottom: '12px' }}>In the month card, open the <strong>Adjustments</strong> dropdown.</li>
                <li style={{ marginBottom: 0 }}>Line items labeled <strong>&quot;Invalid Activity&quot;</strong> are Google&apos;s credits. They appear as negative values.</li>
              </ol>
              <p style={pStyle}>
                Credits here mean Google caught and credited that activity. Their absence does not mean nothing was filtered: pre-billing filtering never appears in billing because you were never charged.
              </p>
            </section>

            {/* Get a refund */}
            <section id="get-a-refund">
              <h2 style={h2Style}>How to Get a Refund (Credit) for Invalid Clicks</h2>
              <p style={pStyle}>
                You will not receive a cash refund. Google&apos;s language is unambiguous: &quot;You won&apos;t receive refunds for invalid traffic. Clicks determined to be invalid will result in adjustments or credits, not a refund&quot; (<a href="https://support.google.com/google-ads/answer/11182074?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={pStyle}>
                Richard Kahn, CEO of Anura Solutions, confirms: &quot;Refunds are not issued on demand and are provided as account credits rather than direct payments&quot; (<a href="https://www.anura.io/blog/google-ads-invalid-click-refunds" style={linkStyle} target="_blank" rel="noopener noreferrer">Anura, 2026</a>).
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>Two credit paths:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Automatic credits</strong> appear without action on your part. Most valid cases resolve this way within the current or next billing cycle.</li>
                <li style={{ marginBottom: 0 }}><strong>Manual investigation request:</strong> File through Support &gt; Invalid clicks / suspicious traffic. Submit evidence: date ranges, affected campaigns, and access log data showing abnormal click patterns. Poor conversion rates alone do not qualify. Google investigates and determines the outcome, with no fixed timeframe and no guaranteed credit.</li>
              </ol>
            </section>

            {/* How to stop */}
            <section id="how-to-stop">
              <h2 style={h2Style}>How to Stop Invalid Traffic (IP, Audience, and Placement Exclusions)</h2>
              <p style={pStyle}>
                You cannot block everything, but four levers cut most preventable invalid traffic.
              </p>

              {/* VISUAL 6: ComparisonTable of the four stop levers */}
              <ComparisonTable
                headers={['Lever', 'Where', 'Effective against', 'Limit']}
                rows={[
                  { cells: ['IP exclusions', 'Campaign settings > Advanced settings > IP exclusions', 'Static competitor clicks, known IPs', 'Approx. 500 IPs or ranges per campaign; partial vs rotating proxies'] },
                  { cells: ['Audience and geo exclusions', 'Campaign targeting', 'Geos with zero conversion history', 'Reduces attack surface before clicks happen'] },
                  { cells: ['Placement exclusions', 'Display and Performance Max placement report', 'Made-for-advertising sites, junk app categories', 'Among the highest-impact fixes available'], highlight: true },
                  { cells: ['Smart Bidding signal hygiene', 'Conversion action settings', 'Micro-conversions inflating clicks', 'Keep page views and scrolls out of the primary bid target'] },
                ]}
                caption="The four levers that cut most preventable invalid traffic"
              />

              <p style={pStyle}>
                <strong>1. IP exclusions:</strong> Campaign settings &gt; Advanced settings &gt; IP exclusions. Add specific IPs or CIDR ranges. Works on Search Network. Cap: approximately 500 addresses or ranges per campaign. Effective against static competitor clicks and known IPs. Against rotating proxies, useful but not a complete fix.
              </p>
              <p style={pStyle}>
                <strong>2. Audience and geo exclusions:</strong> Exclude regions you do not sell to. If clicks come from geos with zero conversion history, exclude those locations. Tightening targeting reduces the attack surface before clicks happen.
              </p>
              <p style={pStyle}>
                <strong>3. Placement exclusions (Display and pMax):</strong> Made-for-advertising (MFA) sites increased 14x year-over-year per Spider Labs&apos; 2026 data. <a href="/blog/google-ads-display-network-wasted-spend" style={linkStyle}>Display Network placement exclusions</a> are among the highest-impact fixes available. Download your placement report, sort by clicks with zero conversions, and exclude the worst offenders. Also exclude mobile app categories if app traffic is generating unqualified clicks.
              </p>
              <p style={pStyle}>
                <strong>4. Smart Bidding signal hygiene:</strong> Keep micro-conversions (page views, scroll events) out of your primary bid target. <a href="/blog/google-ads-optimization" style={linkStyle}>Optimize</a> against actions that require genuine user intent. If invalid traffic inflates clicks without conversions, Smart Bidding chases the wrong signal.
              </p>

              {/* VISUAL 7: MascotQuote (Echo) */}
              <MascotQuote mascot="echo">
                My Monday digest lists every IP I excluded that week, the invalid-traffic adjustments Google credited, and the net wasted spend trend. Last month: 6 IPs excluded, $310 credited back, invalid click rate down from 9% to 4%. You see the whole picture in one scroll, no log-diving.
              </MascotQuote>
            </section>

            {/* When it is not click fraud */}
            <section id="not-click-fraud">
              <h2 style={h2Style}>When It Is NOT Click Fraud (Honest Check)</h2>
              <p style={pStyle}>
                Before filing an investigation request, rule out three causes that look identical to fraud but are not.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '18px 22px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Broad match bleed</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Broad keywords pull semantically related queries with no purchase intent. High clicks, low conversions, high CTR on irrelevant queries: this is a match-type and negative keyword problem, not fraud. Check your Search Terms report. If unrelated queries are generating volume, fix match types first.</p>
                </div>
                <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '18px 22px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Tracking or landing page break</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Clicks are real, conversions do not fire because the tag broke or a site update removed the tracking snippet. <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>If your conversions stopped firing</a>, the symptom is identical to invalid traffic. Confirm tags are firing via Google Tag Assistant or GA4 real-time events before escalating.</p>
                </div>
                <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '8px', padding: '18px 22px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Audience or geo mismatch</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Your ads may be reaching people who will not buy, not because of fraud but because targeting is too broad. Clicks are valid to Google, worthless to your funnel. Healthy accounts typically convert at 2.5 to 10% per CHEQ&apos;s benchmarks. Consistent sub-1% across all traffic points to audience fit, not fraud.</p>
                </div>
              </div>
              <p style={pStyle}>
                Google&apos;s own Help page lists non-fraud causes for click spikes: budget increases, max CPC increases, new broad match keywords, new Display placements, seasonal demand shifts. Work these checks first. If match types are tight, tracking fires, and targeting is clean, treat it as invalid traffic.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>What is invalid traffic in Google Ads?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Invalid traffic is any click or impression that does not reflect genuine user interest, including intentional fraud, bots, and accidental duplicate clicks. Most is filtered before you are billed. (<a href="https://support.google.com/google-ads/answer/11182074?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>)</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>What is the difference between invalid clicks and click fraud?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Invalid clicks is Google&apos;s broad category for all non-genuine activity. Click fraud is the intentional subset. All click fraud is invalid traffic. Not all invalid traffic is click fraud.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How do I see invalid clicks in my Google Ads account?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Add the Invalid clicks and Invalid click rate columns via Campaigns &gt; Columns icon &gt; Modify columns. A rate in the low single digits is normal. Double digits in one week warrants investigation.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Can I get a refund for invalid clicks on Google Ads?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Google issues credits, not cash refunds. Automatic credits appear in billing under &quot;Invalid Activity&quot; in Adjustments. For missed cases, file an investigation request through Support. Credits are not guaranteed.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How long does it take Google to refund invalid clicks?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>No fixed timeframe. Automatic credits appear within the current or next billing cycle. Manual investigations have no stated turnaround. Google&apos;s automated review covers the last 60 days.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How do I block an IP address in Google Ads?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Go to campaign settings &gt; Advanced settings &gt; IP exclusions. Add the IP or CIDR range. Applies to Search Network campaigns. Cap is approximately 500 addresses or ranges per campaign.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Does Google automatically protect against click fraud?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Yes. Automated filters remove most invalid traffic pre-billing. A manual Ad Traffic Quality team reviews patterns filters miss. Post-billing credits handle verified cases. Protection is strong against known bot signatures, weaker against account-specific attacks from residential IPs or rotating proxies.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Hand Invalid-Traffic Monitoring to Kampaio</h2>
              <p style={pStyle}>
                Manual monitoring catches problems after they compound. Kampaio&apos;s Aegis <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a> runs a weekly risk review: it flags suspicious IP patterns, geo anomalies, and device-cluster irregularities, then queues IP exclusions for your approval before spend accumulates.
              </p>
              <p style={pStyle}>
                Last week across 12 accounts, Aegis caught 47 anomalies. Three needed action: one tracking outage, one click-bombing pattern on a small geo campaign, one Smart Bidding <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a> that flipped overnight. Forty-four were noise, filtered without interrupting your week.
              </p>
              <p style={pStyle}>
                Echo sends a Monday digest with invalid traffic adjustments credited, IPs excluded, and your wasted-spend trend. Buzz identifies recovered budget and reallocates it to top-converting ad groups.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Let Aegis run the monitoring you have been doing manually
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  <a href="/b6#aegis" style={linkStyle}>Kampaio&apos;s Aegis agent</a> watches for suspicious IP and geo patterns, queues IP exclusions and invalid-traffic reports for your approval, and shows every proposed action before anything executes. <a href="/pricing" style={linkStyle}>See Kampaio plans from $99/month.</a>
                </p>
                <a
                  href="/chat"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                >
                  Start Your Free Trial
                </a>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', marginBottom: '32px' }}>
                Results may vary. This article is informational and does not constitute professional advice.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '24px' }}>Sources</h3>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><a href="https://support.google.com/google-ads/answer/11182074?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About invalid traffic</a></li>
                <li><a href="https://www.google.com/ads/adtrafficquality/invalid-activity/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ad Traffic Quality, Invalid activity</a></li>
                <li><a href="https://www.trafficguard.ai/blog/how-to-protect-your-google-ads-from-fraud-using-smarter-detection-tools" style={linkStyle} target="_blank" rel="noopener noreferrer">TrafficGuard, Protect your Google Ads from fraud</a></li>
                <li><a href="https://spideraf.com/articles/a-guide-to-click-fraud-and-how-to-prevent-it" style={linkStyle} target="_blank" rel="noopener noreferrer">Spider AF, A guide to click fraud and how to prevent it</a></li>
                <li><a href="https://www.anura.io/blog/google-ads-invalid-click-refunds" style={linkStyle} target="_blank" rel="noopener noreferrer">Anura, Google Ads invalid click refunds</a></li>
                <li><a href="https://cheq.ai/blog/what-are-invalid-clicks/" style={linkStyle} target="_blank" rel="noopener noreferrer">CHEQ, What are invalid clicks</a></li>
              </ul>
            </section>

          </div>
        </div>
        <style jsx>{`
          .symptom-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          @media (max-width: 900px) {
            .symptom-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
        <KeepReading slug="google-ads-invalid-traffic-click-fraud" category="google-ads" />
      <Footer compact={true} />
      </div>
    </>
  );
}
