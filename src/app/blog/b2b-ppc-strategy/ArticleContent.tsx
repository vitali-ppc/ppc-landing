'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { BigStat, KeyTakeaways, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/b2b-ppc-strategy#article',
    headline: 'B2B PPC Strategy: How to Scale Paid Search Without Efficiency Collapse',
    description:
      'A B2B PPC strategy built for scale, not basics: funnel-aligned structure, offline-conversion signal wiring, value-based bidding, and a clear rule for when to automate. With data from 68 practitioner discussions.',
    image: 'https://www.kampaio.com/og/b2b-ppc-strategy.png',
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
    datePublished: '2026-07-10T00:00:00.000Z',
    dateModified: '2026-07-10T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/b2b-ppc-strategy',
    },
    keywords:
      'b2b ppc strategy, scale paid search, offline conversions, value-based bidding, smart bidding threshold, sales cycle, search term review, ppc automation',
    articleSection: 'B2B Marketing',
    inLanguage: 'en',
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
        name: 'B2B PPC Strategy',
        item: 'https://www.kampaio.com/blog/b2b-ppc-strategy',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes B2B PPC strategy different from B2C?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'B2B sales cycles run 60-180+ days versus days for most B2C purchases, so conversion data accrues far more slowly and the buying decision involves a committee, not one form-filler. This means Smart Bidding needs more patience and a revenue-weighted signal, not raw form-fill volume, to work correctly.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I stop B2C searches from bleeding into my B2B campaigns?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keep campaigns narrow with mostly phrase and exact match types, and review the search terms report daily rather than weekly. Pre-qualifying the click in ad copy (naming your target company size or industry directly) also filters out mismatched B2C intent before the click happens.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I switch B2B campaigns to Smart Bidding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practitioner consensus points to roughly 30+ conversions per campaign in a trailing window before switching to value-based bidding. Below that, the algorithm lacks enough data to separate real leads from junk, which is why accounts converting 4-5 times a month commonly underperform on Smart Bidding.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I set up offline conversion imports for a long sales cycle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Capture GCLID at the point of form-fill, map CRM stages to a value ladder (MQL through Closed-Won), and import the signal via Enhanced Conversions for Leads, the current recommended path for lead-based accounts. This feeds Smart Bidding actual revenue rather than a binary conversion flag.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much budget do I need to scale B2B PPC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no flat number. The real constraint is the volume-to-signal relationship. A budget that cannot generate roughly 30 conversions per campaign in a reasonable window will starve Smart Bidding regardless of dollar amount, so the right question is whether spend can clear that conversion threshold in a given category, not what the dollar figure is.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I optimize for leads or for pipeline and revenue?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Optimize for pipeline and revenue once the signal exists. Bidding on raw lead volume rewards whatever converts most easily, which is usually the lowest-quality traffic, while value-based bidding on SQL or Opportunity stage rewards the traffic that actually becomes revenue.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I automate B2B PPC versus keep it manual?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Automate campaigns with signal density above the conversion threshold, real volume, and reversible decisions. Keep manual anything thin, new, or dependent on a judgment call with sales. This decision gate, not a blanket automate-everything or automate-nothing rule, is what separates operators who scale cleanly from ones who scale their efficiency problems along with them.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: the four traps that break B2B PPC at scale', level: 1 },
    { id: 'why-not-b2c', title: 'Why B2B PPC does not scale like B2C', level: 1 },
    { id: 'scale-ladder', title: 'The B2B PPC Scale Ladder (the framework)', level: 1 },
    { id: 'rung-1', title: 'Rung 1 - Structure the account so it stays legible at scale', level: 1 },
    { id: 'rung-2', title: 'Rung 2 - Wire the measurement signal (offline conversions)', level: 1 },
    { id: 'rung-3', title: 'Rung 3 - Value-based bidding without starving it', level: 1 },
    { id: 'rung-4', title: 'Rung 4 - When to automate versus stay manual', level: 1 },
    { id: 'faq', title: 'Frequent questions', level: 1 },
    { id: 'scale-it', title: 'Scale it with an AI cabinet that shows its work', level: 1 },
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
  const linkStyle: React.CSSProperties = { color: '#667eea', textDecoration: 'underline' };
  const thStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '2px solid #e5e7eb',
    textAlign: 'left',
    fontWeight: 600,
    color: '#1e293b',
  };
  const tdStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '1px solid #e5e7eb',
    color: '#1e293b',
    verticalAlign: 'top',
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
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="b2b-ppc-strategy" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              B2B Marketing · Strategy
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              B2B PPC Strategy: How to Scale Paid Search Without Efficiency Collapse
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A B2B PPC strategy that scales is not &quot;more of what worked small.&quot; Four structural traps break it, and each has a specific fix, ordered as a framework we call the Scale Ladder.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Senior PPC strategy at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 10, 2026 · 11 min read</span>
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
            <section>
              <p style={para}>
                A B2B PPC strategy that scales is not &quot;more of what worked small.&quot; Four structural traps break it: thin conversion signal, B2C keyword bleed, attribution lag, and premature automation. This guide gives the ordered fix for each, a framework we call the Scale Ladder.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2}>TL;DR: the four traps that break B2B PPC at scale</h2>
              <p style={para}>
                Across 68 practitioner comments we read in two r/PPC B2B threads, the top-voted answers cluster on exactly four failure points. Each has a specific fix, not a general one.
              </p>

              {/* VISUAL 1: KeyTakeaways summary card */}
              <KeyTakeaways
                title="The four traps"
                items={[
                  <><strong>Trap 1, thin conversion signal:</strong> long B2B sales cycles starve Smart Bidding of data. Fix: wire offline conversions before you scale spend, not after.</>,
                  <><strong>Trap 2, B2C keyword bleed:</strong> consumer search terms sneak into B2B accounts and inflate junk traffic. Fix: narrow match types plus daily search-term review (<a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>).</>,
                  <><strong>Trap 3, attribution lag:</strong> a 60-180+ day sales cycle means the campaign that looks dead today may close in Q3. Fix: bid on stage-weighted value, not last-click form-fills.</>,
                  <><strong>Trap 4, premature automation:</strong> handing bidding to Smart Bidding before volume clears a real threshold optimizes for cheap junk, not revenue. Fix: gate automation behind signal density, covered in Rung 4 below.</>,
                ]}
              />
            </section>

            {/* Why B2B does not scale like B2C */}
            <section id="why-not-b2c">
              <h2 style={h2}>Why B2B PPC does not scale like B2C</h2>
              <p style={para}>
                B2B PPC breaks at scale because the platform&apos;s automation and defaults are built for high-volume, short-cycle B2C, and B2B is the opposite. Google Ads bidding algorithms need conversion volume to learn. B2B accounts rarely produce it fast enough, and <a href="https://searchengineland.com/library/google/google-ads" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land&apos;s Google Ads coverage</a> has tracked the same pattern: platform defaults keep shifting toward high-volume accounts, leaving thin-signal B2B advertisers further behind.
              </p>
              <p style={para}>
                The sales cycle is the root cause. B2B deals routinely run 60-180+ days from click to closed-won, and practitioners are blunt about what that does to the data: &quot;sales cycles of B2B are much longer and conversion data accrues much more slowly. It takes patience&quot; (<a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). A B2C account can hit statistical significance in a week. A B2B account may need a full quarter, and that gap alone explains why so many scaling attempts stall out.
              </p>
              <p style={para}>
                Category volume compounds the problem. Niche B2B terms simply do not get searched at B2C scale, so even a well-run account produces fewer raw clicks to learn from. The buying committee makes it worse: the form-filler is frequently a researcher or junior stakeholder, not the budget owner, so a form-fill stops being a reliable proxy for a real conversion.
              </p>
              <p style={para}>
                Practitioners describe this as two canonical failure modes, not one: &quot;B2B Google Ads usually faces one of 2 problems: very little traffic... or lots of traffic, but most of it junk&quot; (<a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). Both trace back to the same root cause: the account is optimizing on a signal that does not represent revenue. This article is the operator playbook that fixes that signal and scales past it. For the full campaign build this strategy sits inside, see our <a href="/blog/google-ads-for-b2b-saas" style={linkStyle}>B2B SaaS Google Ads guide</a>, which owns the B2C-versus-B2B fundamentals. This piece stays on the scale layer.
              </p>
            </section>

            {/* The Scale Ladder */}
            <section id="scale-ladder">
              <h2 style={h2}>The B2B PPC Scale Ladder (the framework)</h2>
              <p style={para}>
                Scaling B2B paid search is a four-rung ladder: structure, signal, bidding, automation. Skipping a rung is why spend increases faster than results.
              </p>
              <p style={para}>
                Each rung depends on the one below it. You cannot value-bid on Rung 3 without the revenue signal wired on Rung 2. You cannot wire a clean signal on Rung 2 if Rung 1&apos;s structure is too broad to attribute conversions to the right campaign. The ladder is sequential, not a menu you pick from.
              </p>

              {/* VISUAL 2: Scale-Ladder comparison table */}
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', minWidth: '680px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={thStyle}>Rung</th>
                      <th style={thStyle}>What it is</th>
                      <th style={thStyle}>Structure or signal it needs</th>
                      <th style={thStyle}>Failure mode if skipped</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>1. Structure</td>
                      <td style={tdStyle}>Funnel-aligned account architecture, tiered intent, narrow match types</td>
                      <td style={tdStyle}>Legible campaign-to-funnel-stage mapping</td>
                      <td style={tdStyle}>Budget spreads across broad match, attribution unreadable at scale</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>2. Signal</td>
                      <td style={tdStyle}>Offline-conversion wiring from CRM to Google Ads</td>
                      <td style={tdStyle}>GCLID capture, CRM stage mapping, revenue values</td>
                      <td style={tdStyle}>Bidding optimizes on raw form-fills, rewards volume over quality</td>
                    </tr>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>3. Bidding</td>
                      <td style={tdStyle}>Value-based Smart Bidding fed by the wired signal</td>
                      <td style={tdStyle}>Conversion volume above a real threshold</td>
                      <td style={tdStyle}>Smart Bidding starves on thin data, chases cheap leads</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>4. Automation</td>
                      <td style={tdStyle}>The decision gate for what to hand off versus keep manual</td>
                      <td style={tdStyle}>Signal density, volume, reversibility</td>
                      <td style={tdStyle}>Automation on thin or judgment-heavy campaigns burns budget silently</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={para}>
                This table is the fast answer. The sections below walk each rung in order, with the mechanics behind it.
              </p>
            </section>

            {/* Rung 1 */}
            <section id="rung-1">
              <h2 style={h2}>Rung 1 - Structure the account so it stays legible at scale</h2>
              <p style={para}>
                A scalable B2B account is structured by funnel stage and intent, not by product feature, so budget and bidding decisions stay legible as you add spend. Structure is the foundation every other rung depends on, which is why it comes first.
              </p>
              <p style={para}>
                Tiered keyword architecture is the practitioner consensus here. High-intent, bottom-funnel terms get narrow phrase and exact match. Problem-aware terms sit in their own tier. Competitor and conquest terms get isolated so they do not blend into brand performance. The top-voted comment across both threads (51 upvotes) puts it plainly: &quot;keep your campaigns narrow, meaning mostly use phrase and exact matches. Check the search terms daily&quot; (<a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>).
              </p>
              <p style={para}>
                Daily search-term review is not optional at scale. B2C bleed compounds with spend: a keyword that wastes $50/day at small scale wastes $500/day once budget 10x&apos;s. That math is why B2C bleed shows up as the number-one named problem in our dataset (<a href="https://www.reddit.com/r/PPC/comments/qakzui/b2b_ppc_strategy/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). It is not a fringe complaint. It is the single most common failure practitioners named.
              </p>
              <p style={para}>
                A full-funnel plan (top-of-funnel lead magnets, mid-funnel comparison content, bottom-funnel intent) is the deeper structural layer this rung references but does not rebuild here. Our <a href="/blog/b2b-saas-google-ads-campaign-structure" style={linkStyle}>B2B SaaS Google Ads campaign structure guide</a> owns that build in full detail. Once structure is legible, the account is ready for Rung 2.
              </p>
            </section>

            {/* Rung 2 */}
            <section id="rung-2">
              <h2 style={h2}>Rung 2 - Wire the measurement signal (offline conversions)</h2>
              <p style={para}>
                At scale, the single most impactful move is feeding Google a revenue-weighted conversion signal from your CRM, not raw form-fills. This is the rung most B2B accounts skip, and it is the one that unlocks every rung above it.
              </p>
              <p style={para}>
                The strongest practitioner answer in our dataset is a complete recipe, not a platitude. The top-voted comment (7 upvotes) in the &quot;B2B PPC Strategy&quot; thread lays it out end to end: &quot;If you have a good amount of lead volume (30+ leads per campaign) then use max conversion value. Collect GCLID and assign values for leads as they go through the sales process. When the lead closes as won, assign the actual revenue generated to that lead&quot; (<a href="https://www.reddit.com/r/PPC/comments/qakzui/b2b_ppc_strategy/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). Generic strategy guides skip this exact mechanic. We lead with it because it is the piece that actually moves the needle at scale.
              </p>
              <p style={para}>
                The implementation path has modernized since that comment was written. Google now recommends Enhanced Conversions for Leads as the current first-party route for lead-based accounts (<a href="https://support.google.com/google-ads/answer/15713840" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). The outcome is what matters, not the specific upload method: a hashed, first-party lead signal reaching Smart Bidding.
              </p>
              <p style={para}>The sequence, in order:</p>

              {/* VISUAL 3: Steps framework - the offline conversion sequence */}
              <Steps>
                <Step title="Capture GCLID on every lead">
                  As a hidden form field or via your CRM&apos;s UTM capture at the moment of conversion.
                </Step>
                <Step title="Map CRM stages to a value ladder">
                  MQL, SQL, Opportunity, and Closed-Won as distinct stages with distinct dollar values, not a single binary &quot;converted&quot; flag.
                </Step>
                <Step title="Assign values per stage">
                  As the lead progresses, using a proxy value for early stages and the actual closed-won revenue once the deal closes.
                </Step>
                <Step title="Import the signal via Enhanced Conversions for Leads">
                  Which replaces manual GCLID-only offline conversion uploads as the current recommended path (<a href="https://support.google.com/google-ads/answer/15713840" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
                </Step>
                <Step title="Verify the signal reaches bidding">
                  By checking the conversion action&apos;s attribution window and confirming imported conversions are counted, not just logged.
                </Step>
              </Steps>

              <p style={para}>
                For the lead-quality judgment calls that sit on top of this signal (what counts as a real MQL, how to talk to sales about rejected leads), our <a href="/blog/google-ads-lead-quality-guide" style={linkStyle}>lead quality guide</a> covers that depth. This rung only wires the pipe. It does not decide what flows through it, and that distinction matters once Rung 3 starts trusting the numbers.
              </p>
            </section>

            {/* Rung 3 */}
            <section id="rung-3">
              <h2 style={h2}>Rung 3 - Value-based bidding without starving it</h2>
              <p style={para}>
                Value-based Smart Bidding only works once the signal exists and volume clears the threshold. Below that, it optimizes for cheap junk. Rung 2 builds the pipe. Rung 3 is where the bidding strategy actually gets handed over to it, carefully.
              </p>

              {/* VISUAL 4: BigStat - the 30-conversion threshold (bold-viz) */}
              <BigStat
                value="30+"
                label="conversions per campaign"
                claim="is the practitioner-cited threshold before switching to Max Conversion Value or Target ROAS on lead value. Below it, Smart Bidding chases whatever converts most easily."
                source="Source: r/PPC 'B2B PPC Strategy' thread, top-voted answer, 2026"
              />

              <p style={para}>
                The practitioner-cited threshold is 30+ conversions per campaign before switching to Max Conversion Value or Target ROAS on lead value (<a href="https://www.reddit.com/r/PPC/comments/qakzui/b2b_ppc_strategy/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). Below that volume, the algorithm has too little data to distinguish a good lead from a bad one, so it chases whatever converts most easily. An X operator scan in our dataset confirms the same pattern from the other direction: &quot;Smart Bidding isn&apos;t the problem. Using it too early is&quot; (X/PPC operator, 2026), and &quot;most accounts are running Smart Bidding on campaigns that convert 4 or 5 times a month&quot; (X/PPC operator, 2026). Four or five conversions a month is nowhere near the threshold the top-voted r/PPC answer names, which is exactly why so many accounts feel like Smart Bidding &quot;doesn&apos;t work&quot; for B2B.
              </p>
              <p style={para}>
                The progression is manual or maximize-clicks, then Target CPA once volume is real, then <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>value-based bidding</a> once the revenue signal from Rung 2 is flowing. Skipping straight to value-based bidding before the CRM values exist just means the algorithm optimizes on placeholder numbers, which defeats the entire point of wiring the signal in the first place.
              </p>

              {/* VISUAL 5: MascotQuote - Buzz */}
              <MascotQuote mascot="buzz">
                We watch conversion count per campaign before we touch the bid strategy. Under 30 conversions in the trailing 30 days, we hold Target CPA and let the campaign build history. Once a campaign clears that 30-conversion threshold with real CRM-assigned values behind it, we test Max Conversion Value on 10-15% of budget for two weeks before shifting the rest. Move earlier than that and the algorithm has nothing real to learn from.
              </MascotQuote>

              <p style={para}>
                Patience matters here because the long sales cycle means the signal itself lags behind reality. A campaign can look like it is underperforming on last-click form-fills while the pipeline it generated closes 90 days later. Practitioners flag exactly this: &quot;sales cycles of B2B are much longer and conversion data accrues much more slowly. It takes patience&quot; (<a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). Judging a value-based bidding switch on 14 days of data in a 120-day sales cycle is not patience. It is noise, and reacting to noise is how good campaigns get killed early.
              </p>
            </section>

            {/* Rung 4 */}
            <section id="rung-4">
              <h2 style={h2}>Rung 4 - When to automate versus stay manual</h2>
              <p style={para}>
                Automate the parts of B2B PPC that are high-frequency and signal-rich. Keep manual the parts that are low-volume and judgment-heavy. This is the rung the entire strategy-guide category skips, and it is the decision every operator scaling past small-account size eventually has to make explicitly, whether they plan for it or not.
              </p>
              <p style={para}>
                The decision gate has three inputs. Signal density asks whether there is enough conversion volume to trust the data. Volume asks whether the campaign is spending enough that manual review becomes a time sink. Reversibility asks whether a bad automated decision can be caught and corrected quickly, or whether it compounds before anyone notices.
              </p>

              {/* VISUAL 6: Automate / Keep-manual two-column grid */}
              <div className="b2b-ppc-doavoid-grid">
                <div className="b2b-ppc-doavoid-card" style={{ borderTopColor: '#10b981' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#10b981', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>✓</span> Automate</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.7', color: '#1e293b' }}>
                    <li style={{ marginBottom: '8px' }}>Bid adjustments on campaigns that already clear the 30+ conversion threshold with clean CRM value data</li>
                    <li style={{ marginBottom: '8px' }}>Search-term monitoring and negative-keyword flagging across high-volume campaigns, where daily manual review does not scale past a handful of accounts</li>
                    <li style={{ marginBottom: 0 }}>Budget reallocation across funnel tiers once each tier has enough history to compare fairly</li>
                  </ul>
                </div>
                <div className="b2b-ppc-doavoid-card" style={{ borderTopColor: '#ef4444' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><span>✕</span> Keep manual</div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '16px', lineHeight: '1.7', color: '#1e293b' }}>
                    <li style={{ marginBottom: '8px' }}>Thin-volume campaigns still below the signal threshold, where automation has nothing real to learn from</li>
                    <li style={{ marginBottom: '8px' }}>New-market or new-product launches with no conversion history yet</li>
                    <li style={{ marginBottom: 0 }}>Lead-quality judgment calls that depend on a conversation with sales, not just a CRM field</li>
                  </ul>
                </div>
              </div>

              <p style={para}>
                This is also the point where a scaling operator without added headcount reaches for automation. Not to replace the strategy above, but to execute it continuously across more campaigns than one person can watch daily. That is a defensible use of automation; applying it to a campaign that has not earned a real signal yet is not. Our guide on <a href="/blog/how-to-scale-google-ads-without-losing-roas" style={linkStyle}>scaling Google Ads without losing ROAS</a> covers that same line from the efficiency side.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Frequent questions</h2>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>What makes B2B PPC strategy different from B2C?</h3>
              <p style={para}>B2B sales cycles run 60-180+ days versus days for most B2C purchases, so conversion data accrues far more slowly and the buying decision involves a committee, not one form-filler. This means Smart Bidding needs more patience and a revenue-weighted signal, not raw form-fill volume, to work correctly.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How do I stop B2C searches from bleeding into my B2B campaigns?</h3>
              <p style={para}>Keep campaigns narrow with mostly phrase and exact match types, and review the search terms report daily rather than weekly (<a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). Pre-qualifying the click in ad copy (naming your target company size or industry directly) also filters out mismatched B2C intent before the click happens.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>When should I switch B2B campaigns to Smart Bidding?</h3>
              <p style={para}>Practitioner consensus points to roughly 30+ conversions per campaign in a trailing window before switching to value-based bidding (<a href="https://www.reddit.com/r/PPC/comments/qakzui/b2b_ppc_strategy/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, 2026</a>). Below that, the algorithm lacks enough data to separate real leads from junk, which is why accounts converting 4-5 times a month commonly underperform on Smart Bidding (X/PPC operator, 2026).</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How do I set up offline conversion imports for a long sales cycle?</h3>
              <p style={para}>Capture GCLID at the point of form-fill, map CRM stages to a value ladder (MQL through Closed-Won), and import the signal via Enhanced Conversions for Leads, the current recommended path for lead-based accounts (<a href="https://support.google.com/google-ads/answer/15713840" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). This feeds Smart Bidding actual revenue rather than a binary conversion flag.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How much budget do I need to scale B2B PPC?</h3>
              <p style={para}>There is no flat number. The real constraint is the volume-to-signal relationship. A budget that cannot generate roughly 30 conversions per campaign in a reasonable window will starve Smart Bidding regardless of dollar amount, so the right question is whether spend can clear that conversion threshold in a given category, not what the dollar figure is.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Should I optimize for leads or for pipeline and revenue?</h3>
              <p style={para}>Optimize for pipeline and revenue once the signal exists. Bidding on raw lead volume rewards whatever converts most easily, which is usually the lowest-quality traffic, while value-based bidding on SQL or Opportunity stage rewards the traffic that actually becomes revenue.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>When should I automate B2B PPC versus keep it manual?</h3>
              <p style={para}>Automate campaigns with signal density above the conversion threshold, real volume, and reversible decisions. Keep manual anything thin, new, or dependent on a judgment call with sales. This decision gate, not a blanket automate-everything or automate-nothing rule, is what separates operators who scale cleanly from ones who scale their efficiency problems along with them.</p>
            </section>

            {/* Scale it CTA */}
            <section id="scale-it">
              <h2 style={h2}>Scale it with an AI cabinet that shows its work</h2>
              <p style={para}>
                The strategy above works manually at small scale: structure, signal, bidding, and a clear automation gate. Scaling it across more campaigns without adding headcount is where the fourth rung stops being optional. An AI cabinet that applies this same decision gate continuously, and shows every bid and budget move it makes, is how operators scale the system above without losing visibility into it.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Scale the ladder without losing visibility
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Let Kampaio apply the same automate-versus-manual decision gate continuously, and show every bid and budget move it makes.
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
                  See How It Works
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. Conversion thresholds and sales-cycle figures used as examples are illustrative ranges drawn from practitioner discussions and Google&apos;s documented guidance. Verify all figures against your own account data before making budget decisions.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={{ ...h2, fontSize: '28px' }}>Sources</h2>
              <ol style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '12px' }}><a href="https://www.reddit.com/r/PPC/comments/qakzui/b2b_ppc_strategy/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, &quot;B2B PPC Strategy&quot; thread (2026)</a>. Top-voted offline-conversion recipe; 30+ leads-per-campaign threshold; B2C bleed as the number-one named problem.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://www.reddit.com/r/PPC/comments/1eyqv9u/" style={linkStyle} target="_blank" rel="noopener noreferrer">r/PPC, &quot;Well seasoned PPC veterans&quot; thread (2026)</a>. Narrow match types plus daily search-term review (51 upvotes); long-sales-cycle patience; two canonical B2B failure modes.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/15713840" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;About enhanced conversions for leads&quot; (2026)</a>. Current recommended first-party route for lead-based accounts.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/16884284" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;Offline conversions and enhanced conversions for leads migration&quot; (2026)</a>. Migration path from GCLID-only offline conversion uploads.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://searchengineland.com/library/google/google-ads" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Google Ads coverage</a>. Ongoing platform-defaults reporting referenced in &quot;Why B2B PPC does not scale like B2C.&quot;</li>
                <li style={{ marginBottom: '12px' }}>X/PPC operator commentary on Smart Bidding thresholds (2026). Operator scan on premature Smart Bidding and 4-5 conversions-per-month accounts.</li>
              </ol>
            </section>
          </div>
        </div>

        <KeepReading slug="b2b-ppc-strategy" category="b2b" />
        <Footer compact={true} />
      </div>

      <style jsx>{`
        .b2b-ppc-doavoid-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin: 8px 0 32px;
        }
        .b2b-ppc-doavoid-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-top: 4px solid #10b981;
          border-radius: 10px;
          padding: 20px 22px;
        }
        @media (max-width: 720px) {
          .b2b-ppc-doavoid-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
