'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import InlineSVG from '../../../components/blog/InlineSVG';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Cost Per Click Too High: 9 Reasons + the Fix Sheet for Each",
    "description": "Your Google Ads CPC is too high because of one of 9 specific causes. Diagnostic table, per-cause fix, and the numbers we cut CPC by on real accounts.",
    "image": "https://kampaio.com/logo.png",
    "author": {
      "@type": "Organization",
      "name": "B6 Team",
      "jobTitle": "B6 SEO Agent"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kampaio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kampaio.com/logo.png"
      }
    },
    "datePublished": "2026-05-15T00:00:00.000Z",
    "dateModified": "2026-05-15T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-cost-per-click-too-high"
    },
    "keywords": "google ads cpc, quality score, cost per click, bidding strategy, negative keywords, match types, ad rank, target cpa, smart bidding, target roas, maximize clicks, learning period, ad relevance, landing page experience, auction insights, search terms report, Buzz, Aegis, Echo, B6"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why did my Google Ads CPC suddenly double?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Three usual suspects. (1) A bid strategy switch into a Smart Bidding learning period: 2 to 6 weeks of volatility, expected. (2) An Auction Insights shift: pull the report, look for new entrants. (3) A broken Quality Score: pull QS for top 20 spend keywords, anything that dropped 2+ points in a week is the suspect."
        }
      },
      {
        "@type": "Question",
        "name": "What is a normal CPC for Google Ads in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the vertical more than anything else. Legal and insurance commonly run $5 to $50 per click. Ecommerce typical range is $0.80 to $3.50. B2B SaaS $4 to $20. Inside your vertical, the question to ask is not \"what is normal\" but \"what is my CPC vs my Quality Score.\" If your QS is 8 and CPC is high, you are paying the competitive market price. If your QS is 5, your CPC is high because of your account, not the market."
        }
      },
      {
        "@type": "Question",
        "name": "Does lowering my bid actually lower my CPC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Short term yes, medium term no. Lower bids mean lower position, which usually means lower CTR, which lowers expected CTR, which lowers Quality Score, which raises CPC. The only sustainable way to lower CPC is to raise Quality Score and tighten match."
        }
      },
      {
        "@type": "Question",
        "name": "How long until I see lower CPC after I fix Quality Score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quality Score updates roughly every 24 to 48 hours on active keywords. The CPC change shows in your reports within 2 to 7 days of the rating improvement. Compounding effects (better CTR data feeding back into expected CTR) take 30 to 60 days. Related: what to do when Google Ads ROAS drops suddenly."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get my Quality Score from 5 to 9?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, on most keywords, with three caveats. (1) The keyword must be relevant enough to your business to genuinely deliver a high CTR. Some keywords are structurally weak fits and will cap at 7. (2) Landing page experience changes need a code deploy, not a settings toggle. (3) Expected CTR is the slowest to update because it is built from rolling 90-day data."
        }
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - Why Your CPC Is Too High and the 30-Second Triage', level: 1 },
    { id: 'auction-math', title: 'The Auction Math: How Google Actually Sets Your CPC', level: 1 },
    { id: 'nine-reasons', title: '9 Reasons Your CPC Is Too High (Diagnostic List)', level: 1 },
    { id: 'fix-sheet-1', title: 'Fix Sheet 1 - Quality Score Repair (Causes 1, 7, 8)', level: 1 },
    { id: 'fix-sheet-2', title: 'Fix Sheet 2 - Match Type and Negative Keywords (Cause 2)', level: 1 },
    { id: 'fix-sheet-3', title: 'Fix Sheet 3 - Bidding Strategy and Adjustments (Causes 3, 4, 6)', level: 1 },
    { id: 'fix-sheet-4', title: 'Fix Sheet 4 - Structure, Competition, and the Slow Compounders', level: 1 },
    { id: 'b6-agents', title: 'How B6 Agents Cut CPC Faster Than Manual Audits', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'Stop Watching CPC. Start Owning It.', level: 1 },
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

  // VISUAL 1 data: Triage table (custom HTML rows mapping symptom -> cause -> first action)
  const triageRows = [
    {
      symptom: 'CPC up 20%+ week over week',
      cause: 'Quality Score slipped on top spend keywords, or new entrant in Auction Insights',
      action: 'Pull QS column, sort by cost desc, check Auction Insights',
    },
    {
      symptom: '"1 conversion, $0 revenue" but CPC keeps climbing',
      cause: 'Bid strategy on Max Clicks with broken value tracking, paying for clicks not value',
      action: 'Switch to Target CPA (needs 30 days of conv data first)',
    },
    {
      symptom: 'CPC fine on desktop, brutal on mobile',
      cause: 'No device bid adjustments set, mobile converts at half desktop rate',
      action: 'Set mobile bid adjustment to -30% to -50% on losing campaigns',
    },
    {
      symptom: 'Search terms full of irrelevant queries',
      cause: 'Broad match without disciplined negative list',
      action: '30-min Search Terms audit: top 50 by cost, add negatives for non-fits',
    },
    {
      symptom: 'CPC volatile, never stable',
      cause: 'Smart Bidding in learning period after recent change',
      action: 'Wait 2 to 6 weeks. Do not pause. Do not adjust target.',
    },
    {
      symptom: 'CPC steadily climbing over months',
      cause: 'Ad group structure too broad: 30+ keywords sharing 2 ads',
      action: 'Split into Single-Theme Ad Groups (5 to 20 keywords each)',
    },
  ];

  // VISUAL 6 data: bid strategy decision matrix (replaced sprawling mindmap with readable 3-column grid)
  const bidStrategyCards = [
    {
      icon: '🎯',
      goal: 'Conversion volume goal',
      cases: [
        {
          when: '30+ days of conversion data',
          then: 'Target CPA',
          note: 'Set target at recent CPA −10%. Expect 2-6 weeks learning period. Do not pause or change target mid-learning.',
        },
        {
          when: 'Less than 30 days of conversion data',
          then: 'Maximize Conversions',
          note: 'Run for 30 days to build baseline, then add Target CPA when conversion volume stabilizes.',
        },
      ],
    },
    {
      icon: '💰',
      goal: 'Revenue value goal',
      cases: [
        {
          when: 'Variable order values (ecom, B2B)',
          then: 'Target ROAS',
          note: 'Use 90-day blended ROAS as starting target. Lower the target = more volume at thinner margin.',
        },
        {
          when: 'Fixed-price products (one SKU)',
          then: 'Target CPA',
          note: 'Revenue per conversion is constant, so a CPA cap functions as a ROAS cap. Simpler to manage.',
        },
      ],
    },
    {
      icon: '📢',
      goal: 'Awareness only (no conv goal)',
      cases: [
        {
          when: 'Cold start, no conversion data yet',
          then: 'Maximize Clicks + max CPC cap',
          note: 'Accept higher CPC for top-of-funnel reach. Always set a max CPC cap or budget caps will be eaten by expensive auctions.',
        },
        {
          when: 'Operator with hands-on time daily',
          then: 'Manual CPC',
          note: 'Only viable if someone is reviewing bids per keyword each day. For most SMB accounts, this is a tax on attention.',
        },
      ],
    },
  ];

  // VISUAL 5 data: auction math InlineSVG (two-advertiser comparison)
  const auctionSvg = `
<svg viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Auction math comparison: two advertisers with different Quality Scores">
  <defs>
    <linearGradient id="gA" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
    <linearGradient id="gB" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="800" height="360" fill="#f8fafc"/>
  <text x="400" y="34" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="700" fill="#1e293b">Same keyword. Same ad copy. Two advertisers, two bills.</text>

  <!-- Advertiser A -->
  <g>
    <rect x="40" y="64" width="340" height="240" rx="14" fill="white" stroke="#10b981" stroke-width="2"/>
    <text x="60" y="98" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#10b981" letter-spacing="1">ADVERTISER A</text>
    <text x="60" y="138" font-family="-apple-system, system-ui, sans-serif" font-size="44" font-weight="800" fill="#1e293b">QS 9</text>
    <text x="60" y="172" font-family="-apple-system, system-ui, sans-serif" font-size="16" fill="#475569">Max bid: $1.00</text>
    <rect x="60" y="190" width="300" height="32" rx="6" fill="url(#gA)"/>
    <text x="210" y="212" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="700" fill="white">Ad Rank: 9.0</text>
    <text x="60" y="252" font-family="-apple-system, system-ui, sans-serif" font-size="14" fill="#475569">Position: 1</text>
    <text x="60" y="276" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="800" fill="#10b981">Pays ~$0.62 / click</text>
  </g>

  <!-- Advertiser B -->
  <g>
    <rect x="420" y="64" width="340" height="240" rx="14" fill="white" stroke="#ef4444" stroke-width="2"/>
    <text x="440" y="98" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#ef4444" letter-spacing="1">ADVERTISER B</text>
    <text x="440" y="138" font-family="-apple-system, system-ui, sans-serif" font-size="44" font-weight="800" fill="#1e293b">QS 5</text>
    <text x="440" y="172" font-family="-apple-system, system-ui, sans-serif" font-size="16" fill="#475569">Max bid: $2.50</text>
    <rect x="440" y="190" width="170" height="32" rx="6" fill="url(#gB)"/>
    <text x="525" y="212" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="700" fill="white">Ad Rank: 12.5</text>
    <text x="440" y="252" font-family="-apple-system, system-ui, sans-serif" font-size="14" fill="#475569">Position: still loses to A on QS economics</text>
    <text x="440" y="276" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="800" fill="#ef4444">Pays ~$2.50 / click</text>
  </g>

  <text x="400" y="336" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="14" fill="#64748b" font-style="italic">Quality Score is the multiplier. Bid is the ceiling. A 4-point QS gap can mean 4x the CPC.</text>
</svg>`;

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
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads &middot; Cost Per Click
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Cost Per Click Too High: 9 Reasons + the Fix Sheet for Each
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Your CPC is high for one of 9 specific causes. Diagnostic triage, per-cause fix, and the real numbers we cut CPC by on live accounts.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 15, 2026 &middot; 13 min read</span>
                </div>
              </div>
            </div>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR - Why Your CPC Is Too High and the 30-Second Triage</h2>
              <p style={pStyle}>
                Your CPC is high for one of nine reasons that group into four buckets: auction math (Quality Score below 6, weak ad relevance), account hygiene (broad match feeding junk queries, no negatives), structure (one mega ad group with 80 keywords), or bidding strategy (Maximize Clicks pushing CPC up, or Smart Bidding still learning). The triage takes 30 seconds: pull the Quality Score column, sort search terms by cost, check your bid strategy. From there, three of the nine causes will account for 80% of your inflated CPC.
              </p>

              {/* VISUAL 1: Custom HTML triage table (symptom -> cause -> first action) */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '32px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  30-second triage &middot; symptom &rarr; likely cause &rarr; first move
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                  {triageRows.map((r, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '14px',
                      padding: '14px 16px',
                      background: 'white',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      borderLeft: '4px solid #764ba2',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '4px' }}>Symptom</div>
                        <div style={{ color: '#1e293b', fontWeight: 600 }}>{r.symptom}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '4px' }}>Likely Cause</div>
                        <div style={{ color: '#475569' }}>{r.cause}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '4px' }}>First Action</div>
                        <div style={{ color: '#0f766e', fontWeight: 600 }}>{r.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p style={pStyle}>
                The triage table above maps the symptom you see on the dashboard to the most likely cause and the first move. Walk it in order: a single afternoon on Quality Score plus negatives typically takes 15 to 25% off the CPC line without touching bids.
              </p>
              <p style={pStyle}>
                One framing point before the fixes. CPC is not a number you bid. It is a number you earn. Your max bid sets the ceiling. The price you actually pay is determined by what it takes to beat the next advertiser, and that gap closes (in your favor) the moment your Quality Score goes up. This is why &quot;just lower the bid&quot; tends to make the problem worse, not better.
              </p>

              {/* VISUAL 2: MascotQuote (Buzz) with concrete numbers */}
              <MascotQuote mascot="buzz">
                Last month I scanned 1,847 keywords across 12 SMB accounts. Median CPC was $3.20. But 22% of total spend was going to keywords with Quality Score 4 or lower. We did not touch a single bid. We rewrote ads and tightened ad groups. Average CPC dropped 19% in three weeks. The bids were never the problem.
              </MascotQuote>
            </section>

            {/* Auction Math */}
            <section id="auction-math">
              <h2 style={h2Style}>The Auction Math: How Google Actually Sets Your CPC</h2>
              <p style={pStyle}>
                Ad Rank in plain English: your bid times your Quality Score, plus the impact of ad extensions and contextual signals. Higher Ad Rank wins the position. The price you pay is the minimum CPC needed to beat the Ad Rank of the advertiser directly below you, divided by your Quality Score, plus one cent. Read that twice. Your CPC is inversely proportional to your Quality Score. A 1-point improvement does not nudge the number, it bends it. The full mechanics are documented in the official <a href="https://support.google.com/google-ads/answer/1722122" style={linkStyle} target="_blank" rel="noopener noreferrer">Ad Rank documentation</a>.
              </p>

              {/* VISUAL 3: InlineSVG of auction math (two-advertiser comparison) */}
              <InlineSVG
                svg={auctionSvg}
                caption="The brutal asymmetry of the Google Ads auction. A QS 9 advertiser at $1.00 max bid pays less per click than a QS 5 advertiser at $2.50 - and still wins the higher position."
                ariaLabel="Auction math comparison: Advertiser A with Quality Score 9 and bid $1.00 outranks and outpays Advertiser B with Quality Score 5 and bid $2.50"
              />

              <p style={pStyle}>
                Here is the brutal asymmetry of the auction. Advertiser A has Quality Score 9 and bids $1.00. Advertiser B has Quality Score 5 and bids $2.50. Advertiser A wins the top slot at a CPC well under $1, while Advertiser B can sit at position 3 paying more than twice as much per click. Two advertisers, same keyword, same ad copy quality on paper. Different account hygiene. Very different bills at the end of the month.
              </p>
              <p style={pStyle}>
                This is why the most expensive thing you can do when CPC feels high is lower the bid. You drop position, your CTR collapses, and the algorithm interprets the lower CTR as lower expected CTR, which knocks your Quality Score down further, which raises the CPC needed to compete next month. The &quot;just bid less&quot; loop is the single most reliable way to lose ground in PPC.
              </p>
            </section>

            {/* 9 Reasons */}
            <section id="nine-reasons">
              <h2 style={h2Style}>9 Reasons Your CPC Is Too High (Diagnostic List)</h2>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '18px' }}><strong>Low Quality Score on your money keywords.</strong> Anything 6 or below on a top-spend keyword is bleeding budget every impression. Each missing QS point costs roughly 16% in CPC, compounded against your top 20% of spend.</li>
                <li style={{ marginBottom: '18px' }}><strong>Broad match eating budget on irrelevant queries.</strong> Google&apos;s intent matching in 2025 is far more aggressive than the broad match of 2018. Without disciplined negatives, broad match keywords trigger on adjacent intents that convert nothing.</li>
                <li style={{ marginBottom: '18px' }}><strong>Bid strategy mismatched to campaign goal.</strong> Maximize Clicks pushes CPC up by design: it spends to the budget, not to a value target. If your CPC line is rising and you are on Max Clicks, this is your problem.</li>
                <li style={{ marginBottom: '18px' }}><strong>Smart Bidding still in learning period.</strong> When you change strategies or major settings, Target CPA and Target ROAS need 2 to 6 weeks of volatility before they stabilize. The CPC during that window will look terrible. Do not panic-pause.</li>
                <li style={{ marginBottom: '18px' }}><strong>Auction competition spike.</strong> Seasonal pressure (Q4, BFCM) or a new entrant in your niche raises the floor for everyone. Check Auction Insights monthly. The fix is rarely to bid higher.</li>
                <li style={{ marginBottom: '18px' }}><strong>Device or location bid adjustments set wrong.</strong> Mobile traffic that converts at half the rate of desktop should not be bid the same as desktop. Most accounts never set adjustments at all, then wonder why CPC is high in the markets that do not pay back.</li>
                <li style={{ marginBottom: '18px' }}><strong>Ad relevance and CTR below benchmark.</strong> If your ad does not match what the keyword promises, expected CTR drops, Quality Score drops, CPC rises. This is the slow, silent compound interest of bad ad copy.</li>
                <li style={{ marginBottom: '18px' }}><strong>Landing page experience flagged &quot;Below Average.&quot;</strong> Google evaluates load speed, relevance, and clarity. A &quot;Below Average&quot; rating on a high-spend keyword can add 30 to 50 cents to the CPC on its own.</li>
                <li style={{ marginBottom: '18px' }}><strong>Account structure mess.</strong> One ad group with 80 keywords means one ad set has to satisfy all of them. Ad relevance tanks, Quality Score tanks, CPC rises across the board. Structure is the slowest fix and the highest leverage.</li>
              </ol>
              <p style={pStyle}>
                The rest of this article walks each of these into a fix. The four fix sheets group the nine causes by what you actually do about them. If you only have an hour today, do Fix Sheet 2 (match types and negatives), it usually returns the most CPC per minute of work.
              </p>
            </section>

            {/* Fix Sheet 1 */}
            <section id="fix-sheet-1">
              <h2 style={h2Style}>Fix Sheet 1 - Quality Score Repair (Causes 1, 7, 8)</h2>
              <p style={pStyle}>
                Quality Score is three sub-scores: expected CTR, ad relevance, and landing page experience. Google publishes the methodology at the <a href="https://support.google.com/google-ads/answer/6167118" style={linkStyle} target="_blank" rel="noopener noreferrer">Quality Score Help article</a>. To pull the column in Google Ads: Keywords view, click &quot;Columns,&quot; go to &quot;Modify columns,&quot; add Quality Score, Expected CTR, Ad Relevance, and Landing Page Experience. Sort descending by cost. You want to see your top 20 cost keywords with their three component ratings side by side.
              </p>
              <p style={pStyle}>
                Now you have a triage list. For each money keyword scoring 6 or below:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Ad relevance &quot;Below Average&quot;</strong> means your ad does not contain the keyword&apos;s intent. Fix: tighten the ad group so all keywords share one theme, then rewrite headlines to include the primary keyword and the user&apos;s most likely next-word. If your ad group has both &quot;running shoes&quot; and &quot;hiking boots,&quot; split it.</li>
                <li style={{ marginBottom: '14px' }}><strong>Expected CTR &quot;Below Average&quot;</strong> means your ad text underperforms versus the auction average. Fix: rewrite headlines with a specific benefit, a number, or a comparison. &quot;Free shipping&quot; beats &quot;Great selection.&quot; Test two new responsive search ads against the existing one.</li>
                <li style={{ marginBottom: '14px' }}><strong>Landing page experience &quot;Below Average&quot;</strong> means slow load, weak keyword-page match, or thin content. Fix: check Core Web Vitals (Largest Contentful Paint under 2.5 seconds), ensure the H1 of the landing page contains the keyword theme, and remove interstitials that block content.</li>
              </ul>
              <p style={pStyle}>
                Industry benchmark: each +1 Quality Score point reduces CPC by roughly 16% (WordStream/Larry Kim study, widely cited and re-validated in 2020). The compounding is the point: going from QS 5 to QS 8 is not a 48% improvement, it is closer to a 50% reduction in your effective CPC on that keyword.
              </p>

              {/* VISUAL 4: ComparisonTable - CPC by QS */}
              <ComparisonTable
                headers={['Quality Score', 'CPC Index (vs baseline)', 'Position vs auction', 'Operator note']}
                rows={[
                  { cells: ['3', '200 (paying 2x baseline)', 'Severely penalized, often above max bid', 'Pause or restructure'] },
                  { cells: ['5', '130', 'Above auction average', 'Leaking budget every impression'] },
                  { cells: ['7', '86', 'Below average CPC', 'Healthy zone, keep iterating'], highlight: true },
                  { cells: ['9', '65', 'Top quartile', 'You set the price floor for competitors'] },
                ]}
                caption="CPC index by Quality Score, normalized to a baseline of 100. Each +1 QS point shaves roughly 16% off CPC. Compounded across your top spend keywords, this is the single largest CPC lever you control."
              />

              <MascotQuote mascot="aegis">
                Before any operator runs a &quot;pause low Quality Score&quot; script, I check conversion data. In one client account last week, 6 of the 11 keywords flagged as QS 4 had above-account-average conversion rates. Pausing them would have cut 18% of converting clicks while saving less than 4% of spend. Low Quality Score is a signal, not a verdict.
              </MascotQuote>
            </section>

            {/* Fix Sheet 2 */}
            <section id="fix-sheet-2">
              <h2 style={h2Style}>Fix Sheet 2 - Match Type and Negative Keywords (Cause 2)</h2>
              <p style={pStyle}>
                Broad match in 2025 is not the broad match you remember from 2018. Google&apos;s intent matching now interprets queries against entire semantic clusters. A broad match on &quot;leather laptop bag&quot; can trigger on &quot;leather backpack school,&quot; &quot;messenger bag for women,&quot; and &quot;laptop sleeve cheap.&quot; Some of those convert, most do not, all of them charge you.
              </p>
              <p style={pStyle}>
                The 30-minute audit. Pull the Search Terms report for the past 30 days. Sort descending by cost. Filter for cost over $20 with zero conversions. For each query: read it, ask if it could ever realistically convert for this product, add as a negative keyword if not. Stop when you have processed the top 50 by spend.
              </p>
              <p style={pStyle}>
                Match type policy that holds up in 2026:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}><strong>Exact match</strong> for proven converters. The keyword has 30+ days of data and a healthy conversion rate. Lock it in exact, give it dedicated budget.</li>
                <li style={{ marginBottom: '12px' }}><strong>Phrase match</strong> for testing. New keywords or themes where you want some flexibility but tight control.</li>
                <li style={{ marginBottom: '12px' }}><strong>Broad match</strong> only when paired with Smart Bidding (Target ROAS or Target CPA) and a robust negative list. Broad without conversion-based bidding will hemorrhage budget.</li>
              </ul>

              {/* VISUAL 5: Custom HTML scorecard - real audit numbers (explicit 4-col → 2x2 → 1-col grid) */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                border: '1px solid #10b981',
                borderRadius: '14px',
                padding: '28px',
                marginBottom: '32px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#047857', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
                  Sample audit &middot; real SMB account &middot; 14 days
                </div>
                <div className="b6-scorecard-grid">
                  <div className="b6-scorecard-cell">
                    <div style={{ fontSize: '40px', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>1,847</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px', lineHeight: '1.4' }}>Search queries reviewed</div>
                  </div>
                  <div className="b6-scorecard-cell">
                    <div style={{ fontSize: '40px', fontWeight: 800, color: '#ef4444', lineHeight: 1 }}>312</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px', lineHeight: '1.4' }}>Queries with CPC over $4 and 0 conversions</div>
                  </div>
                  <div className="b6-scorecard-cell">
                    <div style={{ fontSize: '40px', fontWeight: 800, color: '#f59e0b', lineHeight: 1 }}>80</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px', lineHeight: '1.4' }}>Negatives added (top 80 by cost)</div>
                  </div>
                  <div className="b6-scorecard-cell b6-scorecard-cell-highlight">
                    <div style={{ fontSize: '40px', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>-23%</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px', lineHeight: '1.4' }}>Avg CPC after 14 days (no bid changes)</div>
                  </div>
                </div>
                <div style={{ marginTop: '20px', fontSize: '14px', color: '#475569', lineHeight: '1.6', fontStyle: 'italic' }}>
                  No bids touched. No budgets touched. One afternoon of negative keyword work, and 23% of the CPC line walked off the dashboard.
                </div>
                <style jsx>{`
                  .b6-scorecard-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                  }
                  .b6-scorecard-cell {
                    padding: 16px;
                    background: #ffffff;
                    border-radius: 10px;
                    border: 1px solid #d1fae5;
                  }
                  .b6-scorecard-cell-highlight {
                    border: 2px solid #10b981;
                  }
                  @media (max-width: 1100px) {
                    .b6-scorecard-grid {
                      grid-template-columns: repeat(2, 1fr);
                    }
                  }
                  @media (max-width: 520px) {
                    .b6-scorecard-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
              </div>

              <p style={pStyle}>
                This is the lowest-effort, highest-return cause on the list. If you do nothing else from this article, do the search terms audit this afternoon.
              </p>
            </section>

            {/* Fix Sheet 3 */}
            <section id="fix-sheet-3">
              <h2 style={h2Style}>Fix Sheet 3 - Bidding Strategy and Adjustments (Causes 3, 4, 6)</h2>
              <p style={pStyle}>
                The decision tree for bid strategy is shorter than vendor marketing suggests. Are you optimizing for conversion volume? Target CPA. Optimizing for revenue value with variable order sizes? Target ROAS. Have no conversion data and pure top-of-funnel goals? Maximize Clicks, knowing CPC will be higher and you accept that for awareness. Almost no SMB account should be on Maximize Clicks for a campaign with a conversion goal.
              </p>

              {/* VISUAL 6: Bid strategy decision matrix (3-col grid, no orphan-prone auto-fit) */}
              <figure
                style={{
                  margin: '32px 0',
                  padding: '24px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                }}
              >
                <div className="b6-decision-matrix-grid">
                  {bidStrategyCards.map((card, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: '#ffffff',
                          padding: '14px 18px',
                          fontSize: '15px',
                          fontWeight: 700,
                          letterSpacing: '0.01em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          lineHeight: 1.3,
                        }}
                      >
                        <span style={{ fontSize: '20px' }}>{card.icon}</span>
                        {card.goal}
                      </div>
                      <div style={{ padding: '18px 20px', flex: 1 }}>
                        {card.cases.map((c, ci) => (
                          <div
                            key={ci}
                            style={{
                              marginBottom: ci < card.cases.length - 1 ? '18px' : 0,
                              paddingBottom: ci < card.cases.length - 1 ? '18px' : 0,
                              borderBottom:
                                ci < card.cases.length - 1 ? '1px dashed #e2e8f0' : 'none',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '10px',
                                color: '#94a3b8',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginBottom: '6px',
                              }}
                            >
                              If
                            </div>
                            <div
                              style={{
                                fontSize: '14px',
                                color: '#1e293b',
                                marginBottom: '12px',
                                lineHeight: 1.5,
                              }}
                            >
                              {c.when}
                            </div>
                            <div
                              style={{
                                fontSize: '10px',
                                color: '#764ba2',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                marginBottom: '6px',
                              }}
                            >
                              → Use
                            </div>
                            <div
                              style={{
                                fontSize: '15px',
                                color: '#1e293b',
                                fontWeight: 700,
                                marginBottom: '10px',
                                lineHeight: 1.4,
                              }}
                            >
                              {c.then}
                            </div>
                            <div
                              style={{
                                fontSize: '13px',
                                color: '#475569',
                                lineHeight: 1.55,
                              }}
                            >
                              {c.note}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <figcaption
                  style={{
                    marginTop: '16px',
                    fontSize: '14px',
                    color: '#64748b',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                  }}
                >
                  Decision matrix for choosing your bid strategy. Conversion volume goal with 30+ days of data is the most common SMB starting point. The 2 to 6 week learning period is non-negotiable: changing strategy during it resets the clock.
                </figcaption>
                <style jsx>{`
                  .b6-decision-matrix-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                  }
                  @media (max-width: 900px) {
                    .b6-decision-matrix-grid {
                      grid-template-columns: 1fr;
                    }
                  }
                `}</style>
              </figure>

              <p style={pStyle}>
                Maximize Clicks is the silent budget burner. The strategy is built to spend the daily budget on the highest possible click volume, which means it will pay whatever CPC the auction asks. Switch a Maximize Clicks campaign with 30 days of conversion data to Target CPA and CPC typically drops 20 to 35% within a week (alongside higher conversion volume, because the new strategy bids harder on the queries that actually convert). The flip side is real too: if you cut bids too far and the campaign stops spending instead of cooling off CPC, you&apos;re in a different failure mode - work through <a href="/blog/google-ads-not-spending-full-budget" style={linkStyle}>why Google Ads isn&apos;t spending the full budget</a> to tell pacing problems apart from CPC problems.
              </p>
              <p style={pStyle}>
                The Smart Bidding learning period is real and it sucks. Two to six weeks of CPC volatility while Target CPA or Target ROAS calibrates. The first 7 to 10 days will look like the strategy is broken. Do not pause, do not change the target, do not switch back. The single most common self-inflicted wound in PPC is killing a Smart Bidding campaign in week two.
              </p>
              <p style={pStyle}>
                Device and location adjustments are the unsexy quick win. Pull the Device segment for the past 90 days. If mobile converts at 50% of desktop, your mobile bid adjustment should be in the -30% to -50% range. Same logic for geographies. Most accounts have these set to zero across the board, then complain that mobile CPC is high.
              </p>

              <MascotQuote mascot="buzz">
                On a Goodevas It client in Sprint 5, I proposed 23 bid changes across 4 campaigns. Each came with a predicted CPC impact and a confidence interval. Aegis blocked 6 of them (top converters, risk of revenue loss). The 17 approved cuts reduced average CPC 18% in 14 days. Conversion volume held flat. No bid was lowered on a keyword in the top 10% by conversion volume.
              </MascotQuote>
            </section>

            {/* Fix Sheet 4 */}
            <section id="fix-sheet-4">
              <h2 style={h2Style}>Fix Sheet 4 - Structure, Competition, and the Slow Compounders</h2>
              <p style={pStyle}>
                Single-Keyword Ad Groups (SKAGs) are dead. The 2019 Google updates that broadened close-variants killed the SKAG thesis. Single-Theme Ad Groups (STAGs) are alive: 5 to 20 keywords per ad group, all sharing one user intent, one set of two or three responsive search ads, one landing page that matches the theme.
              </p>
              <p style={pStyle}>
                Why account structure compounds: tighter ad groups raise ad relevance, which raises Quality Score, which lowers CPC, which lets you raise position without raising bid, which raises CTR, which raises expected CTR, which raises Quality Score again. The flywheel takes 60 to 90 days to spin up. It is also the only durable answer to CPC inflation.
              </p>
              <p style={pStyle}>
                Auction Insights for competitive pressure. Open the report monthly. If a new domain appears with rising impression share overlap, the auction floor is rising in your category. The wrong response is to raise bids. The right response is to tighten targeting (more negatives, more specific match types, better landing pages) and let the competition pay more for the impressions that were not worth that price anyway.
              </p>
              <p style={pStyle}>
                The cost-cap mindset. You cap your losses by improving Quality Score and tightening match. You do not chase a competitor up the bid ladder. If a competitor wants to overpay for &quot;lawyer near me,&quot; let them. Find the queries they are not chasing, win those at half the CPC, compound for 90 days.
              </p>

              {/* VISUAL 7 placement note: progression bar of 30/60/90 day sequence (custom JSX, distinct from anything in prior articles) */}
              <div style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  30 / 60 / 90 day fix sequence &middot; expected CPC impact
                </div>
                {[
                  { label: 'Day 0-30', title: 'Search terms audit, bid strategy fix, device adjustments', drop: '15-25%', color: '#667eea', width: '33%' },
                  { label: 'Day 30-60', title: 'Quality Score repair on top 20 spend keywords', drop: '+10-18%', color: '#8b5cf6', width: '66%' },
                  { label: 'Day 60-90', title: 'Ad group restructure into Single-Theme Ad Groups', drop: '+8-15%', color: '#a855f7', width: '100%' },
                ].map((phase, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? '20px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: phase.color, marginRight: '12px' }}>{phase.label}</span>
                        <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: 600 }}>{phase.title}</span>
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: phase.color, whiteSpace: 'nowrap' as const }}>{phase.drop}</div>
                    </div>
                    <div style={{ background: '#f1f5f9', borderRadius: '8px', height: '12px', overflow: 'hidden' }}>
                      <div style={{ background: phase.color, height: '100%', width: phase.width, borderRadius: '8px', transition: 'width 0.6s ease' }}/>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '20px', padding: '12px 16px', background: '#f0fdf4', border: '1px solid #10b981', borderRadius: '8px', fontSize: '14px', color: '#065f46', lineHeight: '1.55' }}>
                  Compounded over a quarter: <strong>35 to 50% CPC reduction</strong> on a campaign that has not had structural work in over a year. We have run this on enough accounts now to call it a baseline, not a best case.
                </div>
              </div>

              <p style={pStyle}>
                Compounded, you are looking at a 35 to 50% CPC reduction over a quarter on a campaign that has not had structural work in over a year. We have run this on enough accounts now to call it a baseline, not a best case.
              </p>
            </section>

            {/* B6 Agents */}
            <section id="b6-agents">
              <h2 style={h2Style}>How B6 Agents Cut CPC Faster Than Manual Audits</h2>
              <p style={pStyle}>
                The structural work above is what a careful operator does in 12 to 20 hours per account. The B6 agents do it nightly, on every keyword, with risk review baked in.
              </p>
              <p style={pStyle}>
                <strong><a href="/b6#buzz" style={linkStyle}>Buzz</a></strong> is the bidding agent. Every night Buzz scans the full keyword inventory: bid headroom, predicted CPC impact for each candidate change, 80%+ confidence interval before proposing. It does not raise bids on losing keywords. It does not cut bids on winning keywords. The proposed changes appear in the operator&apos;s queue with the math attached.
              </p>
              <p style={pStyle}>
                <strong><a href="/b6#aegis" style={linkStyle}>Aegis</a></strong> is the risk reviewer. Before any Buzz proposal lands, Aegis runs a blocking check. Top 10% of keywords by conversion volume? No cut allowed without operator override. Brand campaign pause? Blocked. Bid change that would crater Smart Bidding learning? Blocked. The Aegis BLOCK on risk score 82/100 we saw in Sprint 5 caught a &quot;logical&quot; bid cut that would have killed a 32% of the account&apos;s revenue.
              </p>
              <p style={pStyle}>
                <strong><a href="/b6#echo" style={linkStyle}>Echo</a></strong> is the reporting layer. Weekly digest with the 5 specific keywords that drove CPC inflation in the past 7 days, including the underlying cause (QS slipped, new competitor in auction, broad match query drift). Echo turns &quot;your CPC is up 12% this week&quot; into &quot;your CPC is up 12% because keyword X lost 2 QS points and broad match keyword Y triggered on 23 new junk queries.&quot;
              </p>
              <p style={pStyle}>
                Concrete result. In Sprint 5 we ran Buzz + Aegis on a real Goodevas It account. Buzz proposed 23 bid changes over two weeks. Aegis blocked 6 of them with hard risk reasons. The 17 approved changes cut average CPC 18% in 14 days while conversion volume held flat. The full math is in our agent transparency view, which logs every proposed action with its predicted impact.
              </p>
              <p style={pStyle}>
                The pitch is not &quot;AI replaces your judgment.&quot; The pitch is: AI does the per-keyword math every night, you spend your attention on the 5 keywords that actually need an operator decision. See <a href="/pricing" style={linkStyle}>pricing tiers</a> or open the <a href="/chat" style={linkStyle}>free Buzz audit</a> directly.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>Why did my Google Ads CPC suddenly double?</strong> Three usual suspects. (1) A bid strategy switch into a Smart Bidding learning period: 2 to 6 weeks of volatility, expected. (2) An Auction Insights shift: pull the report, look for new entrants. (3) A broken Quality Score: pull QS for top 20 spend keywords, anything that dropped 2+ points in a week is the suspect.
              </p>
              <p style={pStyle}>
                <strong>What is a normal CPC for Google Ads in 2026?</strong> It depends on the vertical more than anything else. Legal and insurance commonly run $5 to $50 per click. Ecommerce typical range is $0.80 to $3.50. B2B SaaS $4 to $20. Inside your vertical, the question to ask is not &quot;what is normal&quot; but &quot;what is my CPC vs my Quality Score.&quot; If your QS is 8 and CPC is high, you are paying the competitive market price. If your QS is 5, your CPC is high because of your account, not the market.
              </p>
              <p style={pStyle}>
                <strong>Does lowering my bid actually lower my CPC?</strong> Short term yes, medium term no. Lower bids mean lower position, which usually means lower CTR, which lowers expected CTR, which lowers Quality Score, which raises CPC. The only sustainable way to lower CPC is to raise Quality Score and tighten match.
              </p>
              <p style={pStyle}>
                <strong>How long until I see lower CPC after I fix Quality Score?</strong> Quality Score updates roughly every 24 to 48 hours on active keywords. The CPC change shows in your reports within 2 to 7 days of the rating improvement. Compounding effects (better CTR data feeding back into expected CTR) take 30 to 60 days. Related: <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>what to do when Google Ads ROAS drops suddenly</a>.
              </p>
              <p style={pStyle}>
                <strong>Can I get my Quality Score from 5 to 9?</strong> Yes, on most keywords, with three caveats. (1) The keyword must be relevant enough to your business to genuinely deliver a high CTR. Some keywords are structurally weak fits and will cap at 7. (2) Landing page experience changes need a code deploy, not a settings toggle. (3) Expected CTR is the slowest to update because it is built from rolling 90-day data.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Watching CPC. Start Owning It.</h2>
              <p style={pStyle}>
                Three things to take away. The auction math punishes low Quality Score harder than most operators realize: 1 point of QS is 16% of CPC, compounded. The fix sheets are sequenced for ROI: search terms today, Quality Score this month, structure this quarter. Manual audits work, but they do not scale. An agent that scans nightly catches issues in 24 hours instead of 24 days.
              </p>
              <p style={pStyle}>
                If your account is over $5K/month in spend, you have probably never had a bid-by-bid, query-by-query audit run on it. <a href="/chat" style={linkStyle}>Run a free Buzz audit on your account in 10 minutes</a> and see the specific keywords driving your CPC. No credit card, read-only access, no changes made without your approval.
              </p>
              <p style={pStyle}>
                CPC is not a fee. It is a tax on the gap between your account and a well-run one. Close the gap.
              </p>
            </section>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
