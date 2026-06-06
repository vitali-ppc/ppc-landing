'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import InlineSVG from '../../../components/blog/InlineSVG';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Keyword Match Types Explained: Broad, Phrase, Exact in 2026",
    "description": "Broad, phrase, and exact match in Google Ads behave nothing like they did in 2019. How each one works in 2026, how they feed Smart Bidding, and which to use when.",
    "image": "https://kampaio.com/og/google-ads-keyword-match-types-explained.png",
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
    "datePublished": "2026-05-20T00:00:00.000Z",
    "dateModified": "2026-05-20T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-keyword-match-types-explained"
    },
    "keywords": "google ads match types, keyword match types, broad match, phrase match, exact match, close variants, smart bidding, target cpa, target roas, maximize conversions, search terms report, negative keywords, broad match modifier, BMM, quality score, Sage, Buzz, Aegis, Mira, B6",
    "wordCount": 2790,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Should I still use broad match modifier in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. BMM was deprecated in February 2021. Phrase match absorbed BMM's behaviour. If your account still has BMM keywords (with the + symbol), Google treats them as phrase match."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between phrase match and exact match in Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Phrase match shows your ad on queries that contain the meaning of your keyword in the order specified. Exact match shows it on same-meaning queries including close variants like plurals, misspellings, and paraphrases. Exact is tighter; phrase has more reach."
        }
      },
      {
        "@type": "Question",
        "name": "Does Smart Bidding work better with broad or exact match?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Broad, in most cases, once you have 30 or more monthly conversions feeding the algorithm. The wider query stream gives Smart Bidding more learning data. Below 30 conversions per month, the math reverses and exact or phrase tends to perform better."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I review my search terms report for negative keywords?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every 14 days, minimum. Weekly if you are running broad match on a new account. The savings on a typical $5K per month SMB account run 18% to 28% of wasted spend."
        }
      },
      {
        "@type": "Question",
        "name": "Will Google penalize me for using too many exact-match keywords?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. There is no penalty for match-type composition. The trade-off is volume: more exact match means less impression share, which can starve Smart Bidding of learning data. Use exact when control matters, not as a default."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use all three match types in the same campaign?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, in separate ad groups. Same ad group with mixed match types creates an internal auction and is the highest-frequency structural mistake we see. One match type per ad group."
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
        "name": "Google Ads Keyword Match Types Explained",
        "item": "https://www.kampaio.com/blog/google-ads-keyword-match-types-explained"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - The 3 Match Types and When to Use Each', level: 1 },
    { id: 'why-different', title: 'Why Match Types Look Nothing Like 2019', level: 1 },
    { id: 'how-each-works', title: 'How Each Match Type Works in 2026', level: 1 },
    { id: 'broad', title: 'Broad Match', level: 2 },
    { id: 'phrase', title: 'Phrase Match', level: 2 },
    { id: 'exact', title: 'Exact Match', level: 2 },
    { id: 'smart-bidding', title: 'The Match Type x Smart Bidding Interaction', level: 1 },
    { id: 'negatives', title: 'The Negative-Keyword Discipline', level: 1 },
    { id: 'decision', title: 'Which Match Type Should You Actually Use?', level: 1 },
    { id: 'mistakes', title: 'Common Mistakes That Tank Match Type Strategy', level: 1 },
    { id: 'b6-agents', title: 'How B6 Agents Manage Match Types Automatically', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'Stop Guessing on Match Types', level: 1 },
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

  // VISUAL 1: Inline SVG horizontal timeline of 2019-2022 match-type changes
  const timelineSvg = `
<svg viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline of Google Ads match type changes 2014 to 2022">
  <defs>
    <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="880" height="280" fill="#f8fafc"/>
  <text x="440" y="34" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="700" fill="#1e293b">Match types: the changes that broke older guides</text>

  <line x1="60" y1="150" x2="820" y2="150" stroke="url(#trackGrad)" stroke-width="6" stroke-linecap="round"/>

  <g>
    <circle cx="100" cy="150" r="14" fill="#667eea" stroke="white" stroke-width="3"/>
    <text x="100" y="110" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">2014</text>
    <text x="100" y="195" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">Misspellings</text>
    <text x="100" y="212" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">and plurals</text>
    <text x="100" y="229" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">on exact</text>
  </g>

  <g>
    <circle cx="280" cy="150" r="14" fill="#7c6df0" stroke="white" stroke-width="3"/>
    <text x="280" y="110" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">Sept 2019</text>
    <text x="280" y="195" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">Same-meaning</text>
    <text x="280" y="212" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">close variants</text>
    <text x="280" y="229" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">on phrase and exact</text>
  </g>

  <g>
    <circle cx="500" cy="150" r="14" fill="#8b5cf6" stroke="white" stroke-width="3"/>
    <text x="500" y="110" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">Feb 2021</text>
    <text x="500" y="195" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">BMM deprecated</text>
    <text x="500" y="212" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">Phrase absorbs</text>
    <text x="500" y="229" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">modifier behaviour</text>
  </g>

  <g>
    <circle cx="720" cy="150" r="14" fill="#a855f7" stroke="white" stroke-width="3"/>
    <text x="720" y="110" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1e293b">2022 onward</text>
    <text x="720" y="195" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">Broad + Smart</text>
    <text x="720" y="212" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">Bidding becomes</text>
    <text x="720" y="229" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#475569">official default</text>
  </g>

  <text x="440" y="265" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="13" fill="#64748b" font-style="italic">Match type today is a signal-tightness choice, not a literal string-match instruction.</text>
</svg>`;

  // VISUAL 3: Decision matrix (match type x bid strategy), explicit 3-column grid, no auto-fit
  const matrixHeaders = ['Match type', 'Manual CPC', 'Maximize Conversions', 'Target CPA / Target ROAS'];
  const matrixRows: Array<{ cells: string[]; rowLabel: string; verdicts: Array<'use' | 'tolerate' | 'avoid'> }> = [
    {
      rowLabel: 'Broad',
      cells: ['Avoid', 'Tolerate', 'Use'],
      verdicts: ['avoid', 'tolerate', 'use'],
    },
    {
      rowLabel: 'Phrase',
      cells: ['Tolerate', 'Use', 'Use'],
      verdicts: ['tolerate', 'use', 'use'],
    },
    {
      rowLabel: 'Exact',
      cells: ['Use', 'Use', 'Use'],
      verdicts: ['use', 'use', 'use'],
    },
  ];

  const verdictColor: Record<'use' | 'tolerate' | 'avoid', { bg: string; fg: string; border: string }> = {
    use: { bg: '#ecfdf5', fg: '#065f46', border: '#10b981' },
    tolerate: { bg: '#fffbeb', fg: '#92400e', border: '#f59e0b' },
    avoid: { bg: '#fef2f2', fg: '#991b1b', border: '#ef4444' },
  };

  // VISUAL 4: 3-card decision grid (conversion-volume framework), explicit 3-column, NOT auto-fit
  const volumeCards = [
    {
      band: 'Under 10 / month',
      color: '#ef4444',
      pick: 'Start exact',
      bidStrategy: 'Manual CPC or Maximize Conversions',
      note: 'Query stream is too narrow for Smart Bidding. Expand to phrase on 1-2 keywords after 60 days. Avoid broad until volume builds.',
    },
    {
      band: '10 to 30 / month',
      color: '#f59e0b',
      pick: 'Phrase',
      bidStrategy: 'Maximize Conversions or Maximize Conversion Value',
      note: 'Run a 14-day negatives review. Test broad on 1-2 highest-intent keywords with strict negatives after you cross 20 conversions.',
    },
    {
      band: '30+ / month',
      color: '#10b981',
      pick: 'Broad',
      bidStrategy: 'Target CPA or Target ROAS',
      note: "Google's official recommendation. Run the 14-day negatives review religiously. Do not pause campaigns in the first 14 days after switching.",
    },
  ];

  // VISUAL 5: Mermaid LR (Sage to Aegis to operator flow)
  const sageAegisFlow = `flowchart LR
    A["Search terms report"] --> B["Sage: nightly scan"]
    B --> C{"Cost > target CPA<br/>and 0 conv 14d?"}
    C -- "yes" --> D["Propose negative<br/>+ predicted savings"]
    C -- "no" --> E["Keep monitoring"]
    D --> F["Aegis: risk check"]
    F --> G["Operator: approve / reject"]
    G --> H["Add as negative<br/>in Google Ads"]`;

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
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads &middot; Keyword Match Types
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Keyword Match Types Explained: Broad, Phrase, Exact in 2026
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              How broad, phrase, and exact really work in 2026, how each one feeds Smart Bidding, and the decision rule that covers 80% of accounts we audit.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 20, 2026 &middot; 13 min read</span>
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
              <h2 style={h2Style}>TL;DR - The 3 Match Types and When to Use Each</h2>
              <p style={pStyle}>
                Google Ads has three keyword match types in 2026: broad, phrase, and exact. Broad shows your ad on any related query and is the modern default with Smart Bidding. Phrase shows your ad on queries containing the meaning of your keyword. Exact shows it on same-meaning queries plus close variants.
              </p>
              <p style={pStyle}>
                Most &quot;broad vs exact&quot; guides on the internet still read like 2019. They miss the two things that decide whether match types work for you today: how each one feeds Smart Bidding, and whether you actually run a 14-day negative-keyword review. This article is the explanation of the system. If you came here because your CPC is high, that is a downstream symptom; we wrote the diagnostic version separately at <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>Google Ads cost per click too high</a>.
              </p>
              <p style={pStyle}>
                Triage rule of thumb. Under 10 conversions per month: start exact. 10 to 30 per month: phrase with Maximize Conversions. 30 or more per month: broad with Target CPA or Target ROAS, with disciplined negatives. The detail is in the rest of the article, but that rule alone covers 80% of accounts we audit.
              </p>

              <MascotQuote mascot="sage">
                On a 12-account audit last month, 64% of wasted spend traced back to broad-match keywords with no paired negative list. Median saving from one afternoon of negative-keyword work: $740 in the following 30 days. The match type was not the problem. The missing negatives were.
              </MascotQuote>
            </section>

            {/* Why 2019 different */}
            <section id="why-different">
              <h2 style={h2Style}>Why Match Types Look Nothing Like 2019</h2>
              <p style={pStyle}>
                Three changes broke the way most guides talk about match types.
              </p>
              <p style={pStyle}>
                September 2019: Google expanded close variants on phrase and exact match to include same-meaning queries. Before that, &quot;exact&quot; meant the keyword or a misspelling, plural, or reordering. After 2019, &quot;exact&quot; includes paraphrases (&quot;lawn mowing service&quot; matching &quot;grass cutting service&quot;) the system reads as identical intent. The official notes live in the <a href="https://support.google.com/google-ads/answer/2497836" style={linkStyle} target="_blank" rel="noopener noreferrer">close variants documentation</a>.
              </p>
              <p style={pStyle}>
                February 2021: broad match modifier (BMM, the +keyword syntax) was deprecated. Phrase match absorbed BMM behaviour. Most account audits we see in 2026 still reference BMM as if it exists. It does not.
              </p>
              <p style={pStyle}>
                2022: Google publicly repositioned broad match as the recommended pairing with Smart Bidding. The pitch is that the algorithm needs query diversity to find converting intent humans miss. Partly true. Without Smart Bidding and tight negatives, broad match is what it always was: a budget incinerator.
              </p>

              {/* VISUAL 1: Inline SVG timeline of the 2014-2022 changes */}
              <InlineSVG
                svg={timelineSvg}
                caption="The four changes that broke older match-type guides. Anything written before September 2019 is out of date on close variants. Anything from before February 2021 still believes BMM exists. Anything before 2022 misses the Smart Bidding repositioning."
                ariaLabel="Horizontal timeline of Google Ads match type changes from 2014 close variants on exact, to September 2019 same-meaning expansion, to February 2021 BMM deprecation, to 2022 broad plus Smart Bidding default"
              />

              <p style={pStyle}>
                In 2026, match type is a signal-tightness choice, not a literal string-match instruction. You tell Google how wide a net to cast. Google decides what falls into the net.
              </p>
            </section>

            {/* How each works */}
            <section id="how-each-works">
              <h2 style={h2Style}>How Each Match Type Works in 2026</h2>

              <section id="broad">
                <h3 style={h3Style}>Broad Match - Maximum Reach, Maximum Variance</h3>
                <p style={pStyle}>
                  Broad match shows your ad on any search Google considers related to your keyword. &quot;Related&quot; is doing heavy lifting. The system looks at semantic similarity, user intent, the searcher&apos;s recent activity, and other campaign signals before deciding to show. The official definition lives in the <a href="https://support.google.com/google-ads/answer/7478529" style={linkStyle} target="_blank" rel="noopener noreferrer">keyword matching options documentation</a>.
                </p>
                <p style={pStyle}>
                  Sample search-term width. The keyword &quot;running shoes&quot; on broad match can trigger &quot;marathon footwear,&quot; &quot;trail sneakers for women,&quot; &quot;best brands for plantar fasciitis,&quot; and (with Smart Bidding looser) &quot;Nike sale 2026.&quot; Some convert beautifully. Some burn $80 of spend in a day.
                </p>
                <p style={pStyle}>
                  Why it works in 2026. Smart Bidding uses the broader query stream as training data. With enough conversion volume, the algorithm finds buyers in queries you would never have added as exact keywords. We have seen broad outperform exact on lift in well-instrumented accounts with 30 plus monthly conversions.
                </p>
                <p style={pStyle}>
                  Why it fails. Without that conversion volume AND a robust negative list, broad match spends budget on intent that does not match the offer. Google&apos;s algorithm optimizes for your bidding target. If the target is loose or the <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking is broken</a>, broad match will faithfully spend your money chasing the wrong signal.
                </p>
                <p style={pStyle}>
                  One concrete. On a Goodevas It client in Sprint 5, we moved 4 keywords from phrase to broad with Target ROAS. Result over 30 days: 18% more conversions at the same CPA. It worked because we added 47 negatives before flipping the switch.
                </p>
              </section>

              <section id="phrase">
                <h3 style={h3Style}>Phrase Match - The Controlled Middle</h3>
                <p style={pStyle}>
                  Phrase match shows your ad on searches that contain the meaning of your keyword in the order you specified. Since February 2021 it has absorbed what BMM used to do.
                </p>
                <p style={pStyle}>
                  Sample search-term width. The keyword &quot;running shoes for women&quot; on phrase triggers &quot;best running shoes for women,&quot; &quot;women&apos;s marathon shoes,&quot; &quot;running shoes women 2026,&quot; but not &quot;trail sneakers&quot; or &quot;marathon footwear.&quot; Order plus meaning together cut out the wildest broad-match drift.
                </p>
                <p style={pStyle}>
                  Why it works. Tighter intent signal than broad, broader signal than exact. Pairs well with Maximize Conversions for accounts in the 10 to 30 conversions per month range. Wide enough for the algorithm to learn, narrow enough to keep waste under control.
                </p>
                <p style={pStyle}>
                  Why it fails. It still requires negatives. Less predictable than exact, less expansive than broad. People reach for phrase as a comfort default when they cannot decide. Comfort is not a <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>.
                </p>
                <p style={pStyle}>
                  One concrete. We ran phrase match on &quot;plumber near me&quot; for an HVAC client. Over 90 days, 312 unique queries appeared; 87% had clear local intent. The other 13% (mostly &quot;what does a plumber do&quot;) became negatives in week 3.
                </p>
              </section>

              <section id="exact">
                <h3 style={h3Style}>Exact Match - Tightest, but Not Literal</h3>
                <p style={pStyle}>
                  Exact match shows your ad on searches with the same meaning as your keyword, including close variants like plurals, misspellings, reorderings, and (since 2019) paraphrases. The brackets in your account still say [exact], but the matching is no longer literal.
                </p>
                <p style={pStyle}>
                  Sample search-term width. The keyword [blue widget] triggers &quot;blue widget,&quot; &quot;blue widgets,&quot; &quot;bluewidget,&quot; and depending on Google&apos;s same-meaning model, &quot;azure widget&quot; or &quot;navy widget&quot; if read as identical intent. Queries you did not bid on appear in your search terms report under your exact-match keyword. This is by design.
                </p>
                <p style={pStyle}>
                  Why it works. Highest control, lowest waste. The right choice for proven converters with 30 plus days of data and a healthy conversion rate.
                </p>
                <p style={pStyle}>
                  Why it fails. Volume is 5 to 10 times lower than broad on the same keyword. The query stream is too narrow for Smart Bidding to learn much, and bids get competitive because everyone else wants exact match on the same proven query.
                </p>
                <p style={pStyle}>
                  One concrete. Across our audit set, exact-match conversion rate runs 1.5x to 2x phrase and 2x to 3x broad. Volume runs the inverse. You buy precision with reach.
                </p>
              </section>
            </section>

            {/* Smart Bidding interaction */}
            <section id="smart-bidding">
              <h2 style={h2Style}>The Match Type x Smart Bidding Interaction (the part other guides skip)</h2>
              <p style={pStyle}>
                Match type is signal width. Smart Bidding is what does the deciding. The pair matters more than either part alone.
              </p>
              <p style={pStyle}>
                Broad plus Manual CPC is a budget bonfire. You gave Google maximum query width and offered nothing for the algorithm to optimize against. Your bid is a fixed number, not a value target. Spend goes everywhere, value goes nowhere.
              </p>
              <p style={pStyle}>
                Broad plus Target CPA or Target ROAS is the 2022-and-after default. The wider query stream gives Smart Bidding more conversion data to learn from. The target tells it which queries are worth winning. Google recommends this pair for accounts with 30 or more monthly conversions; production data agrees.
              </p>
              <p style={pStyle}>
                Exact plus Target CPA works, but the narrow query stream gives Smart Bidding thin training data per keyword. Use it when control matters more than scale.
              </p>
              <p style={pStyle}>
                Phrase plus Maximize Conversions is a sensible early-stage default for accounts in the 10 to 30 conversion per month band. We start most new client accounts here, then expand to broad as conversion volume crosses 30.
              </p>

              {/* VISUAL 2: Custom HTML decision matrix (match type x bid strategy) */}
              <div className="b6-matrix-wrap" style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '24px',
                marginBottom: '32px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                overflowX: 'auto' as const,
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '20px', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                  Match type x bid strategy &middot; what to pair, what to avoid
                </div>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '8px', fontSize: '14px', minWidth: '560px' }}>
                  <thead>
                    <tr>
                      {matrixHeaders.map((h, i) => (
                        <th key={i} style={{ padding: '12px 14px', background: i === 0 ? 'transparent' : '#f1f5f9', color: '#1e293b', fontWeight: 700, textAlign: 'left' as const, borderRadius: '8px', fontSize: '13px' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row, ri) => (
                      <tr key={ri}>
                        <th scope="row" style={{ padding: '14px', background: '#f1f5f9', color: '#1e293b', fontWeight: 700, textAlign: 'left' as const, borderRadius: '8px', fontSize: '14px' }}>
                          {row.rowLabel}
                        </th>
                        {row.cells.map((cell, ci) => {
                          const v = row.verdicts[ci];
                          const c = verdictColor[v];
                          return (
                            <td key={ci} style={{ padding: '14px', background: c.bg, color: c.fg, fontWeight: 700, textAlign: 'center' as const, borderRadius: '8px', border: `1px solid ${c.border}` }}>
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '14px', fontSize: '13px', color: '#64748b', fontStyle: 'italic' as const }}>
                  Use = the modern default. Tolerate = it works, but with caveats. Avoid = a known anti-pattern.
                </div>
              </div>

              <MascotQuote mascot="buzz">
                Move a keyword from phrase to broad without changing the bid strategy, and predicted CPC variance widens 40% to 60%. The algorithm is bidding into a wider intent space. If the bid strategy is Manual CPC, you bid the same number against a much messier auction. Move match type and bid strategy together, or do not move match type at all.
              </MascotQuote>

              <p style={pStyle}>
                Decision-matrix view: broad with conversion-targeting strategies, phrase with volume-targeting strategies, exact with control-targeting strategies. The cross-cells exist and we have seen them work in narrow cases. They are exceptions, not defaults.
              </p>
            </section>

            {/* Negatives discipline */}
            <section id="negatives">
              <h2 style={h2Style}>The Negative-Keyword Discipline (without it, nothing works)</h2>
              <p style={pStyle}>
                Every match-type decision is undone if you do not run a negatives review every 14 days. This is the rule. No exceptions.
              </p>
              <p style={pStyle}>
                The process is five steps.
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}>Pull the search terms report for the last 30 days. Sort cost descending. The first 50 lines are 80% of the lesson.</li>
                <li style={{ marginBottom: '14px' }}>Flag queries with zero conversions or with conversion rate below your target threshold AND cost above 2x your target CPA. These are the queries leaking budget.</li>
                <li style={{ marginBottom: '14px' }}>Add them as negatives at the correct level. Campaign-level for category-wide irrelevance (&quot;free,&quot; &quot;DIY,&quot; &quot;tutorial&quot; for a paid service). Ad-group level for narrow intent mismatches (&quot;hiking&quot; inside a running-shoes ad group).</li>
                <li style={{ marginBottom: '14px' }}>Pick the match type for the negative deliberately. Phrase negatives block more queries (be careful, you can block converting queries too). Exact negatives block one specific query. Default to phrase for category words, exact for specific bad queries.</li>
                <li style={{ marginBottom: '14px' }}>Re-pull search terms in 14 days. Verify the flagged queries dropped to zero spend. Look for new offenders that emerged.</li>
              </ol>
              <p style={pStyle}>
                On a typical $5K per month SMB account with broad match enabled, 4 hours of negative-list work in week 1 cuts 18% to 28% of wasted spend by week 3. We see this repeatedly. The work is not glamorous. It is not optional either.
              </p>

              {/* VISUAL 3: ComparisonTable - negative match types */}
              <ComparisonTable
                headers={['Negative match type', 'Blocks', 'Risk', 'When to use']}
                rows={[
                  { cells: ['Exact negative', 'One specific query', 'Low', 'Surgical blocks on specific bad queries'] },
                  { cells: ['Phrase negative', 'Queries containing the phrase', 'Medium', 'Category words like "free" or "tutorial"'], highlight: true },
                  { cells: ['Broad negative', 'Queries containing any of the words', 'High', 'Rare; only for clearly off-brand themes'] },
                ]}
                caption="Negative match types behave the inverse of positive match types. Broad negatives are powerful and dangerous: one badly chosen word can block hundreds of converting queries. Default to phrase for category words and exact for specific bad queries."
              />
            </section>

            {/* Decision framework */}
            <section id="decision">
              <h2 style={h2Style}>Which Match Type Should You Actually Use? (Decision Framework)</h2>
              <p style={pStyle}>
                The right match type depends on three things: monthly conversion volume, your bidding strategy, and whether you will commit to the 14-day negatives cycle.
              </p>

              {/* VISUAL 4: Custom 3-card decision grid (explicit 3-col, NOT auto-fit) */}
              <div className="b6-volume-grid" style={{ marginBottom: '32px' }}>
                {volumeCards.map((card, i) => (
                  <div key={i} className="b6-volume-card" style={{
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderLeft: `5px solid ${card.color}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column' as const,
                    gap: '12px',
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: card.color, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>
                      Conversion volume
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
                      {card.band}
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '4px' }}>
                        Match type
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{card.pick}</div>
                    </div>
                    <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '4px' }}>
                        Bid strategy
                      </div>
                      <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 600 }}>{card.bidStrategy}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.55 }}>
                      {card.note}
                    </div>
                  </div>
                ))}
              </div>
              <style jsx>{`
                .b6-volume-grid {
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 16px;
                }
                @media (max-width: 900px) {
                  .b6-volume-grid {
                    grid-template-columns: 1fr;
                  }
                }
              `}</style>

              <p style={pStyle}>
                What if I have multiple campaigns at different stages? Match type is set per ad group, not per account. Calibrate per campaign conversion volume. A new prospecting campaign can be exact while your evergreen converters run broad. Mixing match types across campaigns is fine; mixing them inside the same ad group is not (see the next section).
              </p>

              <MascotQuote mascot="mira">
                Ad copy needs to widen as match type widens. On exact-match ad groups I can write hyper-specific copy keyed to one query. On broad-match ad groups I write three <a href="/blog/responsive-search-ads-best-practices" style={{ color: 'inherit', textDecoration: 'underline' }}>responsive search ad</a> variants tuned for different intent strands, because the system will show them across a wider query set. Same keyword, three different match types, three different copy strategies.
              </MascotQuote>
            </section>

            {/* Mistakes */}
            <section id="mistakes">
              <h2 style={h2Style}>Common Mistakes That Tank Match Type Strategy</h2>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '18px' }}><strong>Treating exact match as literal.</strong> It includes close variants since 2014, same-meaning paraphrases since 2019. If you have not pulled the search terms report under your [exact] keywords lately, you are missing what the system is actually showing on.</li>
                <li style={{ marginBottom: '18px' }}><strong>Using broad without Smart Bidding.</strong> You owe Google the intent filter; Google owes you nothing back. Manual CPC with broad match has been a known anti-pattern for four years.</li>
                <li style={{ marginBottom: '18px' }}><strong>Skipping negatives because Smart Bidding will figure it out.</strong> It will not. Smart Bidding optimizes for your KPI, not your bank account.</li>
                <li style={{ marginBottom: '18px' }}><strong>Mixing match types in the same ad group.</strong> Broad, phrase, and exact versions of the same keyword in one ad group create an internal auction. Broad usually wins because it has more impression opportunity, and it cannibalizes exact&apos;s data.</li>
                <li style={{ marginBottom: '18px' }}><strong>Switching match types every 7 days.</strong> Give 14 days minimum before deciding a change worked or failed. Smart Bidding takes 2 weeks to stabilize after any significant change.</li>
              </ol>
              <p style={pStyle}>
                We see mistake #4 in roughly 1 in 3 SMB accounts we audit. Splitting into separate ad groups by match type lifts <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score</a> 0.5 to 1.0 points within 21 days because ad relevance improves when ad groups are themed by intent width, not just keyword theme.
              </p>

              <MascotQuote mascot="aegis">
                Mid-week match-type changes are the highest-frequency unsafe action I see. Operator pulls the search-terms report on a Tuesday, panics about three off-brand queries, switches a broad-match keyword to exact, kills 30% of converting volume by Friday. I block that switch by default and require operator override with a 24-hour cooling window. The panic always passes.
              </MascotQuote>
            </section>

            {/* B6 agents */}
            <section id="b6-agents">
              <h2 style={h2Style}>How B6 Agents Manage Match Types Automatically</h2>
              <p style={pStyle}>
                <strong><a href="/b6#sage" style={linkStyle}>Sage</a></strong> scans the search terms report nightly. Any query with cost above your target CPA and zero conversions for 14 plus days surfaces as a negative-keyword candidate, with predicted savings from the last 30 days of waste.
              </p>
              <p style={pStyle}>
                <strong><a href="/b6#mira" style={linkStyle}>Mira</a></strong> regenerates ad copy when match type changes. Move from exact to broad and Mira drafts three responsive search ad variants tuned for the wider intent set. Move from broad to exact and Mira tightens copy to the specific keyword theme.
              </p>
              <p style={pStyle}>
                <strong><a href="/b6#buzz" style={linkStyle}>Buzz</a></strong> models the expected CPC distribution after a match-type change weekly, so you can decide whether the predicted variance is acceptable before flipping the switch.
              </p>
              <p style={pStyle}>
                <strong><a href="/b6#aegis" style={linkStyle}>Aegis</a></strong> blocks rash match-type switches. Any change on a keyword with 5 or more conversions in the last 30 days requires operator confirmation with a 24-hour cooling delay. The window catches more bad changes than the rule book.
              </p>

              {/* VISUAL 5: Mermaid LR flow (Sage to Aegis to operator) */}
              <MermaidDiagram
                chart={sageAegisFlow}
                caption="The Sage to Aegis to operator flow for negative-keyword candidates. Sage scans nightly, Aegis vets the proposal, the operator confirms before any change touches Google Ads. The full chain is reviewable in the agent transparency view."
              />

              <p style={pStyle}>
                One concrete from production. Sage flagged 47 negative-keyword candidates from one week of Goodevas It search terms. Operator approved 31. CPA dropped 12% in 21 days. No bid was changed. No match type was changed. Just disciplined negatives, run on the schedule.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={pStyle}>
                <strong>Should I still use broad match modifier in 2026?</strong> No. BMM was deprecated in February 2021. Phrase match absorbed BMM&apos;s behaviour. If your account still has BMM keywords (with the + symbol), Google treats them as phrase match.
              </p>
              <p style={pStyle}>
                <strong>What is the difference between phrase match and exact match in Google Ads?</strong> Phrase match shows your ad on queries that contain the meaning of your keyword in the order specified. Exact match shows it on same-meaning queries including close variants like plurals, misspellings, and paraphrases. Exact is tighter; phrase has more reach.
              </p>
              <p style={pStyle}>
                <strong>Does Smart Bidding work better with broad or exact match?</strong> Broad, in most cases, once you have 30 or more monthly conversions feeding the algorithm. The wider query stream gives Smart Bidding more learning data. Below 30 conversions per month, the math reverses and exact or phrase tends to perform better.
              </p>
              <p style={pStyle}>
                <strong>How often should I review my search terms report for negative keywords?</strong> Every 14 days, minimum. Weekly if you are running broad match on a new account. The work is not glamorous; the savings are 18% to 28% of wasted spend on a typical $5K per month SMB account.
              </p>
              <p style={pStyle}>
                <strong>Will Google penalize me for using too many exact-match keywords?</strong> No. There is no penalty for match-type composition. The trade-off is volume: more exact match means less impression share, which can starve Smart Bidding of learning data. Use exact when control matters, not as a default.
              </p>
              <p style={pStyle}>
                <strong>Can I use all three match types in the same campaign?</strong> Yes, in separate ad groups. Same ad group with mixed match types creates an internal auction and is the highest-frequency structural mistake we see. One match type per ad group.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Guessing on Match Types</h2>
              <p style={pStyle}>
                Three things to take away. Match type is signal width, not a literal instruction. Bid strategy is what actually does the deciding. Negatives are the seatbelt that lets you ride either one safely.
              </p>
              <p style={pStyle}>
                If you want Sage to read your search terms report and propose the negatives this week, the free <a href="/chat" style={linkStyle}>B6 audit</a> runs in 10 minutes and surfaces the top 20 candidates with predicted savings. No card, no rewrite of your account, just the list of negatives most likely to cut waste in the next 30 days. See <a href="/pricing" style={linkStyle}>pricing tiers</a> if you want the nightly cadence after that.
              </p>
            </section>

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
