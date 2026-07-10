'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { KeyTakeaways, Callout, BigStat, CompareGrid, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-optimization-score#article',
    headline: "Google Ads Optimization Score: What's a Good Score, and Should You Chase 100%?",
    description:
      "Google Ads optimization score measures how many recommendations you've applied, not how well your account performs. Here's what a good score actually is, and why chasing 100% can raise your CPCs and hurt ROAS.",
    image: 'https://www.kampaio.com/og/google-ads-optimization-score.png',
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
      '@id': 'https://www.kampaio.com/blog/google-ads-optimization-score',
    },
    keywords:
      'google ads optimization score, what is a good optimization score, optimization score vs quality score, google ads recommendations, auto-apply recommendations, roas, cpc',
    articleSection: 'Google Ads',
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
        name: 'Google Ads Optimization Score',
        item: 'https://www.kampaio.com/blog/google-ads-optimization-score',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does an optimization score of 75% mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "An optimization score of 75% means you've applied or dismissed recommendations covering three-quarters of the currently available impact pool Google has calculated for your account. It does not mean your account performs better than 75% of other campaigns, and it doesn't mean you need 75% more improvement to be healthy.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I improve my optimization score in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open the Recommendations tab, sort by impact percentage, and apply the repair and measurement fixes first, since those carry no ROAS risk. For anything touching bidding, budgets, or keyword targeting, check the recommendation against your current ROAS or CPA target before accepting it, and dismiss anything irrelevant to your goals rather than leaving it unreviewed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I see my optimization score in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The optimization score is visible in the Recommendations tab in the left-hand menu of Google Ads, at both the account level and the individual campaign level.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the optimization score affect Quality Score or Ad Rank?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Google states directly that optimization score is not used by your Quality Score. Quality Score is a keyword-level estimate of ad relevance versus other advertisers and feeds Ad Rank; optimization score is an account or campaign-level adoption metric with a separate calculation entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a 100% optimization score good?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not necessarily. A 100% score only confirms that every available recommendation has been applied or dismissed; it says nothing about whether those recommendations improved ROAS, CPA, or profit. An account can reach 100% by accepting suggestions that widen targeting and raise CPC faster than they raise revenue.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I turn on auto-apply recommendations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only for low-risk categories like repairs and ad copy variants. Auto-apply for bidding, budget, or keyword/targeting recommendations implements changes to a live account without human review, which is exactly the mechanism that pushes CPC and spend up without a corresponding ROAS check.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'what-is-it', title: 'What is the Google Ads optimization score (and what it is not)?', level: 1 },
    { id: 'how-calculated', title: 'How is the optimization score actually calculated?', level: 1 },
    { id: 'good-score', title: "What's a good optimization score?", level: 1 },
    { id: 'chasing-100', title: 'Why chasing 100% can hurt your ROAS', level: 1 },
    { id: 'apply-vs-dismiss', title: 'Which recommendations to apply vs dismiss (decision table)', level: 1 },
    { id: 'read-like-analyst', title: 'How to read your recommendations like an analyst', level: 1 },
    { id: 'how-kampaio-handles', title: 'How Kampaio handles optimization score and recommendations', level: 1 },
    { id: 'faq', title: 'Frequently asked questions', level: 1 },
    { id: 'bottom-line', title: 'The bottom line: score is a to-do list, not a report card', level: 1 },
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
          <ArticleHero slug="google-ads-optimization-score" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Optimization Score: What&apos;s a Good Score, and Should You Chase 100%?
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Optimization score tracks how many of Google&apos;s recommendations you&apos;ve adopted, not how well your account performs. Treat it as a to-do list, not a report card.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 10, 2026 · 10 min read</span>
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
                Google Ads optimization score measures how many of Google&apos;s recommendations you&apos;ve applied to an account, not how well that account actually performs. A high score means high adoption of Google&apos;s suggestions. It does not mean higher ROAS, lower CPC, or more profit, and treating it like it does is where most of the confusion starts.
              </p>

              {/* VISUAL 1: KeyTakeaways TL;DR summary card */}
              <KeyTakeaways
                title="TL;DR"
                items={[
                  <>Optimization score (0-100%) tracks recommendation adoption, not results.</>,
                  <>By Google&apos;s own definition it &quot;has no direct effect on performance.&quot;</>,
                  <>A good score is whatever share of <em>relevant</em> recommendations you&apos;ve applied, with irrelevant ones deliberately dismissed. 100% is not the goal.</>,
                  <>Chasing 100% through blanket auto-apply tends to push budgets and match types wider, which raises CPC and can drop ROAS.</>,
                  <>Treat the score as a to-do list, not a report card.</>,
                ]}
              />
            </section>

            {/* What is it */}
            <section id="what-is-it">
              <h2 style={h2}>What is the Google Ads optimization score (and what it is not)?</h2>
              <p style={para}>
                Optimization score is Google&apos;s own estimate of how well an account is set up to perform, scored from 0% to 100%, where &quot;100% meaning that your account can perform at its full potential&quot; (<a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). What that definition doesn&apos;t say out loud: the score moves when you apply or dismiss recommendations, not when ROAS, CPA, or revenue actually change.
              </p>
              <p style={para}>
                That&apos;s the part that trips up experienced managers. Optimization score rises because a recommendation was accepted or dismissed, not because a campaign sold more product. A Google Ads Help Community thread makes the gap explicit: &quot;The Optimization score has no direct effect on performance, it&apos;s just there for your own guidance. And it represents what Google wants advertisers to do, not what&apos;s best for your business goals&quot; (Google Ads Community, Product Expert answer, <a href="https://support.google.com/google-ads/thread/264502466/are-optmisation-scores-really-that-important?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Mar 2024</a>). That answer came from a community Product Expert, not a Google employee or an official policy page, so treat it as informed practitioner consensus rather than Google&apos;s corporate position. Google&apos;s own support page backs the same distinction, just in flatter language.
              </p>

              {/* VISUAL 2: Callout warning - the core caveat */}
              <Callout variant="warning" title="The core caveat">
                Score and results measure two different things. ROAS, CPA, and conversion rate are lagging measures of what actually happened in the account. Optimization score is a leading proxy for how many of Google&apos;s own feature suggestions you&apos;ve turned on. A campaign can carry a low score and a strong ROAS at the same time, and the reverse is just as common.
              </Callout>
            </section>

            {/* How calculated */}
            <section id="how-calculated">
              <h2 style={h2}>How is the optimization score actually calculated?</h2>
              <p style={para}>
                Optimization score is a weighted sum of the potential &quot;impact&quot; of every recommendation currently available for an account, recalculated in real time. Google states it is &quot;calculated in real-time, based on statistics, settings, and status of your account and campaigns, the relevant impact of available recommendations, and recent recommendations history&quot; (<a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={para}>
                Each recommendation Google surfaces carries its own percentage-point weight, visible next to the suggestion itself. Applying it moves the score up by roughly that amount. The detail most managers miss: dismissing a recommendation also credits value toward the score, and a dismissed recommendation &quot;can reappear after a certain period if it becomes relevant then&quot; (<a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). In other words, a high score is reachable by consciously rejecting suggestions, not only by accepting them.
              </p>
              <p style={para}>
                Google groups recommendations into six broad categories, worth knowing before touching anything in the Recommendations tab:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}><strong>Repairs</strong> (disapproved ads, broken conversion tracking)</li>
                <li style={{ marginBottom: '12px' }}><strong>Bidding &amp; Budgets</strong> (budget changes, Target CPA/ROAS adjustments, Maximize Conversions opt-ins)</li>
                <li style={{ marginBottom: '12px' }}><strong>Keywords &amp; Targeting</strong> (broad match adoption, Search Partners opt-in, audience expansion)</li>
                <li style={{ marginBottom: '12px' }}><strong>Ads &amp; Extensions</strong> (responsive search ad variants, sitelinks, ad strength improvements)</li>
                <li style={{ marginBottom: '12px' }}><strong>Automated Campaigns</strong> (Performance Max opt-ins, migrations from legacy campaign types)</li>
                <li style={{ marginBottom: 0 }}><strong>Measurement</strong> (conversion tracking and tag-coverage fixes)</li>
              </ol>
              <p style={para}>
                Optimization score is shown only for active Search, Display, Video Action, App, Performance Max, Demand Gen, and Shopping campaigns, not for paused or ended ones (<a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). That&apos;s a different scope entirely from Quality Score, which we&apos;ll separate cleanly in the FAQ below.
              </p>
            </section>

            {/* Good score */}
            <section id="good-score">
              <h2 style={h2}>What&apos;s a good optimization score?</h2>
              <p style={para}>
                There is no universal &quot;good&quot; optimization score, and a 100% account is not automatically a better-performing one. The number is a share of available recommendation impact you&apos;ve adopted, nothing more.
              </p>
              <p style={para}>
                This is where a common misread needs correcting directly: an optimization score of 75% does not mean your account is &quot;better than 75% of campaigns,&quot; and it doesn&apos;t mean you need &quot;75% more improvement&quot; before it&apos;s healthy. It simply means you&apos;ve applied (or dismissed) recommendations covering three-quarters of the currently available impact pool. A brand-new account with barely any recommendation history can show 75% while running worse than a mature account sitting at 60%.
              </p>

              {/* VISUAL 3: BigStat - the 70% Google Partner threshold (bold-viz) */}
              <BigStat
                value="70%"
                label="minimum account optimization score"
                claim="is all Google's own Partner program requires for agencies to qualify. Since dismissing recommendations still credits score value, an account can clear that threshold without a single meaningful change."
                source="Source: Store Growers (Dennis Moons), 2026"
              />

              <p style={para}>
                A sharper way to judge how low the real bar is: Google&apos;s own Partner program requires only a minimum account optimization score of 70% for agencies to qualify (<a href="https://www.storegrowers.com/google-ads-optimization-score/" style={linkStyle} target="_blank" rel="noopener noreferrer">Store Growers, 2026</a>). Since dismissing recommendations still credits score value, an account can clear that 70% threshold without a single meaningful change. That alone is the clearest proof the score measures adoption behavior, not account health.
              </p>
              <p style={para}>
                The realistic goal changes with the account&apos;s mandate. An aggressive-growth account chasing volume can happily run a high score, because Google&apos;s growth-oriented suggestions (wider targeting, higher budgets) genuinely match that account&apos;s goal. A tightly-managed, ROAS-disciplined account often looks healthier sitting at 70-85%, with the volume-chasing recommendations deliberately dismissed, than it would forcing every suggestion through to hit 100%.
              </p>

              {/* VISUAL 4: MascotQuote - Buzz (illustrative scenario) */}
              <MascotQuote mascot="buzz">
                In one illustrative scenario, an account holding a 68% optimization score and a 4.1x ROAS outperforms a second account at 94% score and 2.7x ROAS. The second account&apos;s score climbed mostly from broad match keyword additions and raised budgets: more traffic, less efficiency. These are illustrative numbers, not measured data from a specific account, but the pattern is the one to watch for.
              </MascotQuote>

              <p style={para}>
                <strong>What score is &quot;good,&quot; by goal:</strong>
              </p>
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', minWidth: '620px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={thStyle}>Account goal</th>
                      <th style={thStyle}>Realistic score range</th>
                      <th style={thStyle}>What to do with volume-boosting recs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>Google Partner status only</td>
                      <td style={tdStyle}>70%+ (minimum requirement)</td>
                      <td style={tdStyle}>Dismiss freely; the bar clears on adoption alone</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>Aggressive growth / new market entry</td>
                      <td style={tdStyle}>80-100%</td>
                      <td style={tdStyle}>Apply most; wider reach fits the goal</td>
                    </tr>
                    <tr>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>Tightly-managed ROAS/CPA account</td>
                      <td style={tdStyle}>70-85%, selectively</td>
                      <td style={tdStyle}>Apply repairs and measurement; scrutinize bidding, keywords, budgets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Chasing 100 */}
            <section id="chasing-100">
              <h2 style={h2}>Why chasing 100% can hurt your ROAS</h2>
              <p style={para}>
                Chasing a 100% score means applying every recommendation Google surfaces, and a lot of those recommendations are optimized for what Google wants (more spend, broader reach), not necessarily for your profit margin. That&apos;s a structural conflict of interest baked into how the score is built, not a conspiracy. Google&apos;s recommendation engine is designed to grow account activity on its own platform, and it&apos;s fairly upfront about that once you read the fine print.
              </p>
              <p style={para}>
                The mechanism itself is simple enough. Recommendations like adding broad match keywords, raising budgets, or switching to Maximize Conversions reliably move the score upward while simultaneously widening traffic and raising CPCs. More spend does not automatically mean more profit. Often it just means more volume at a worse marginal return, and the account &quot;looks&quot; more optimized while actually converting the same dollars less efficiently.
              </p>

              {/* VISUAL 5: MascotQuote - Buzz (illustrative bid-strategy scenario) */}
              <MascotQuote mascot="buzz">
                In an illustrative scenario, applying a bidding recommendation to switch strategy pushed average CPC from $2.10 to $3.40 in about two weeks. ROAS on that same account dropped from 4.2 to 2.9 over the same window, even as the optimization score climbed 12 points. That&apos;s not a measured result from a specific client; it&apos;s the shape of what unreviewed bidding recommendations commonly do to an account already converting well.
              </MascotQuote>

              <p style={para}>
                Auto-apply recommendations make this worse by removing the review step entirely. Turn on auto-apply for a category and Google implements qualifying suggestions on its own; the score climbs toward 100% without a human ever seeing the change happen, let alone approving it.
              </p>

              {/* VISUAL 6: MascotQuote - Aegis (risk flag) */}
              <MascotQuote mascot="aegis">
                On a typical $15K/month account, I block two recommendation types from auto-apply by default: &quot;Add broad match keywords&quot; and &quot;Use optimized targeting.&quot; Broad match without tight negatives and a mature conversion history routinely burns 15-20% of spend on irrelevant queries before Smart Bidding has enough data to correct itself. That&apos;s an illustrative range based on how these two recommendation types typically behave, not an audited number from one account, but it&apos;s consistent enough that I flag both every time.
              </MascotQuote>

              <p style={para}>
                None of this makes Google&apos;s recommendation engine malicious. It optimizes for Google&apos;s definition of &quot;set to perform,&quot; which leans toward more account activity. Your job as the account owner is to filter that list for your own definition of &quot;perform,&quot; which is profit, not adoption.
              </p>
            </section>

            {/* Apply vs dismiss */}
            <section id="apply-vs-dismiss">
              <h2 style={h2}>Which recommendations to apply vs dismiss (decision table)</h2>
              <p style={para}>
                Apply repairs and measurement fixes without hesitation. Scrutinize anything that raises spend or loosens targeting before accepting it. That single rule covers most of the decision-making an analyst needs to do in the Recommendations tab.
              </p>
              <p style={para}>
                The table below sorts recommendation types into a verdict and the specific ROAS risk behind that verdict. Most competing guides describe the six categories in prose; few lay out a flat, scannable grid you can actually work from during a review session.
              </p>

              {/* VISUAL 7: decision table */}
              <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', minWidth: '820px' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th style={thStyle}>Recommendation type</th>
                      <th style={thStyle}>Counts toward score</th>
                      <th style={thStyle}>Typical ROAS risk</th>
                      <th style={thStyle}>Verdict</th>
                      <th style={thStyle}>Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={tdStyle}>Fix conversion tracking / tag coverage</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>None (repairs blind spots)</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>Apply</td>
                      <td style={tdStyle}>Broken tracking means every other decision downstream is based on bad data</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={tdStyle}>Fix disapproved ads / Merchant Center issues</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>None</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>Apply</td>
                      <td style={tdStyle}>Repairs restore lost impressions with no targeting change</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Add responsive search ad variants / improve ad strength</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>Low</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>Apply</td>
                      <td style={tdStyle}>More ad copy variants improve relevance signals without expanding audience</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={tdStyle}>Add sitelinks / callout extensions</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>Low</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#10b981' }}>Apply</td>
                      <td style={tdStyle}>Extensions improve ad real estate without loosening targeting</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Remove redundant or non-serving keywords</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>Low to moderate</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>Depends</td>
                      <td style={tdStyle}>Usually safe, but check that &quot;redundant&quot; keywords aren&apos;t carrying unique long-tail volume first</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={tdStyle}>Add broad match keywords</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>High</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#ef4444' }}>Dismiss / Depends</td>
                      <td style={tdStyle}>Widens query matching fastest; needs tight negatives and mature Smart Bidding data before it&apos;s safe</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Opt in to Search Partners or audience/display expansion</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>High</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#ef4444' }}>Dismiss / Depends</td>
                      <td style={tdStyle}>Expands inventory beyond Search results; conversion quality on partner networks is rarely audited by advertisers</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={tdStyle}>Raise campaign or shared budgets</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>High</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>Depends</td>
                      <td style={tdStyle}>Only apply if current ROAS is already above target and the campaign is capped by budget, not by demand</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Switch to Maximize Conversions / Conversion Value</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>Moderate to high</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>Depends</td>
                      <td style={tdStyle}>Needs a Target CPA/ROAS guardrail and enough conversion volume (Google recommends 30+/month) or bidding can chase volume over margin</td>
                    </tr>
                    <tr style={{ background: '#fafafa' }}>
                      <td style={tdStyle}>Apply Target CPA/ROAS bid strategy changes</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>Moderate</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>Depends</td>
                      <td style={tdStyle}>Verify conversion volume and recent performance before accepting a suggested target change</td>
                    </tr>
                    <tr>
                      <td style={tdStyle}>Move to Performance Max / legacy campaign migration</td>
                      <td style={tdStyle}>Yes</td>
                      <td style={tdStyle}>Moderate to high</td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#f59e0b' }}>Depends</td>
                      <td style={tdStyle}>Consolidates control into automated bidding; review current <a href="/blog/performance-max-optimization" style={linkStyle}>Performance Max performance</a> first</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={para}>
                The operating principle after the table is simple. Apply the boring, safe categories (repairs, measurement, ad copy variants) on sight. Scrutinize anything that spends more money or reaches more people before it touches a live budget.
              </p>
            </section>

            {/* Read like analyst */}
            <section id="read-like-analyst">
              <h2 style={h2}>How to read your recommendations like an analyst</h2>
              <p style={para}>
                Treat every recommendation as a hypothesis with an estimated impact attached, not as an instruction to follow. That reframing is the entire difference between an account that chases score and one that manages ROAS.
              </p>
              <p style={para}>
                A repeatable four-step process handles this in under fifteen minutes per review session:
              </p>

              {/* VISUAL 8: Steps framework */}
              <Steps>
                <Step title="Open the Recommendations tab and sort by impact percentage">
                  The highest-weighted items aren&apos;t necessarily the most valuable; they&apos;re just the ones Google estimates will move the score most.
                </Step>
                <Step title='Split the list into two buckets: "safe/repairs" versus "spend/targeting"'>
                  Conversion tracking fixes and ad copy suggestions go in the first bucket; anything touching budget, bid strategy, or match type goes in the second.
                </Step>
                <Step title="For the safe bucket, apply on sight">
                  For the spend/targeting bucket, check the recommendation against your current ROAS or CPA target and your conversion volume before accepting it.
                </Step>
                <Step title="Dismiss irrelevant recommendations deliberately, not by ignoring them">
                  Dismissal still credits score value and isn&apos;t permanent, so there&apos;s no downside to rejecting a suggestion that doesn&apos;t fit your goal this quarter.
                </Step>
              </Steps>

              <p style={para}>
                The most consequential habit in this process is turning off blanket auto-apply. Leave auto-apply enabled, if at all, only for repair-type and ad-variation recommendations. Never for bidding, budgets, or keyword/targeting categories, where an unreviewed change can move real spend before anyone notices.
              </p>
              <p style={para}>
                This lines up with where the practitioner debate already lands. Threads on r/PPC and in Google&apos;s own Ads Community keep asking versions of the same question: is the score &quot;a legit and relevant metric in driving higher ROI?&quot; The consensus that surfaces is consistent with the process above. Use the score as a checklist, review manually, and judge the account by ROAS and CPA instead. For a deeper walkthrough of manual review across a full account, see B6&apos;s <a href="/blog/ppc-audit-checklist" style={linkStyle}>Google Ads audit checklist</a>, the wider system in our <a href="/blog/google-ads-optimization" style={linkStyle}>complete guide to Google Ads optimization</a>, and the breakdown of <a href="/blog/google-ads-ai-vs-manual-bidding" style={linkStyle}>AI vs. manual bidding control</a>.
              </p>
              <p style={para}>
                If your account already leans on Smart Bidding, it&apos;s worth reading how bid strategy choice interacts with this same recommendation stream in B6&apos;s guide to <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>Smart Bidding strategies</a>, since several of the highest-risk recommendations in the table above are bid-strategy opt-ins.
              </p>
            </section>

            {/* How Kampaio handles */}
            <section id="how-kampaio-handles">
              <h2 style={h2}>How Kampaio handles optimization score and recommendations</h2>
              <p style={para}>
                Kampaio does not treat 100% as a goal. Aegis reviews every incoming recommendation against a risk profile before anything touches a live account, and Buzz evaluates the bid or budget impact of a suggestion against the account&apos;s actual ROAS target, not against how many points it would add to the score.
              </p>
              <p style={para}>
                That&apos;s a different model from the two most common alternatives on the market. Google&apos;s native auto-apply accepts qualifying recommendations without review. Recommendation engines like Optmyzr ($499/month) and Madgicx ($499+/month), which we line up in our <a href="/blog/google-ads-optimizer-software-compared" style={linkStyle}>comparison of Google Ads optimizer software</a>, surface suggestions for a human to evaluate, but the review work still falls on the account owner. Kampaio applies only the recommendations that move the account&apos;s stated goal, and shows the reasoning behind each decision as it happens, at $99, $199, or $399 per month depending on plan.
              </p>

              {/* VISUAL 9: CompareGrid - three approaches to recommendations (bold-viz) */}
              <CompareGrid
                columns={[
                  {
                    name: 'Google native auto-apply',
                    bestFor: 'accounts that want growth suggestions applied at scale',
                    traits: [
                      { label: 'Applies recommendations automatically', has: true },
                      { label: 'Reviews each rec against your goal', has: false },
                      { label: 'Shows reasoning per decision', has: false },
                      { label: 'No monthly software fee', has: true },
                    ],
                  },
                  {
                    name: 'Optmyzr / Madgicx',
                    bestFor: 'teams that want surfaced suggestions to evaluate manually',
                    traits: [
                      { label: 'Applies recommendations automatically', has: false },
                      { label: 'Reviews each rec against your goal', has: false },
                      { label: 'Shows reasoning per decision', has: true },
                      { label: 'No monthly software fee', has: false },
                    ],
                  },
                  {
                    name: 'Kampaio',
                    bestFor: 'a documented, goal-aware review layer before the live budget',
                    highlight: true,
                    traits: [
                      { label: 'Applies recommendations automatically', has: true },
                      { label: 'Reviews each rec against your goal', has: true },
                      { label: 'Shows reasoning per decision', has: true },
                      { label: 'No monthly software fee', has: false },
                    ],
                  },
                ]}
              />

              <p style={para}>
                None of the three approaches is inherently wrong; they solve different problems. An account that genuinely wants Google&apos;s growth-oriented suggestions applied at scale may prefer straightforward auto-apply. An account that wants a documented, goal-aware review layer between the recommendation and the live budget is the one Kampaio is built for.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Frequently asked questions</h2>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>What does an optimization score of 75% mean?</h3>
              <p style={para}>An optimization score of 75% means you&apos;ve applied or dismissed recommendations covering three-quarters of the currently available &quot;impact&quot; pool Google has calculated for your account. It does not mean your account performs better than 75% of other campaigns, and it doesn&apos;t mean you need 75% more improvement to be healthy.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How do I improve my optimization score in Google Ads?</h3>
              <p style={para}>Open the Recommendations tab, sort by impact percentage, and apply the repair and measurement fixes first, since those carry no ROAS risk. For anything touching bidding, budgets, or keyword targeting, check the recommendation against your current ROAS or CPA target before accepting it, and dismiss anything irrelevant to your goals rather than leaving it unreviewed.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>How do I see my optimization score in Google Ads?</h3>
              <p style={para}>The optimization score is visible in the Recommendations tab in the left-hand menu of Google Ads, at both the account level and the individual campaign level (<a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Does the optimization score affect Quality Score or Ad Rank?</h3>
              <p style={para}>No. Google states directly that &quot;Optimization score is not used by your Quality Score&quot; (<a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Quality Score is a keyword-level estimate of ad relevance versus other advertisers and feeds Ad Rank; optimization score is an account/campaign-level adoption metric with a separate calculation entirely.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Is a 100% optimization score good?</h3>
              <p style={para}>Not necessarily. A 100% score only confirms that every available recommendation has been applied or dismissed; it says nothing about whether those recommendations improved ROAS, CPA, or profit. An account can reach 100% by accepting suggestions that widen targeting and raise CPC faster than they raise revenue.</p>

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginTop: '28px', marginBottom: '12px' }}>Should I turn on auto-apply recommendations?</h3>
              <p style={para}>Only for low-risk categories like repairs and ad copy variants. Auto-apply for bidding, budget, or keyword/targeting recommendations implements changes to a live account without human review, which is exactly the mechanism that pushes CPC and spend up without a corresponding ROAS check.</p>
            </section>

            {/* Bottom line */}
            <section id="bottom-line">
              <h2 style={h2}>The bottom line: score is a to-do list, not a report card</h2>
              <p style={para}>
                Optimization score is a leading list of Google&apos;s own feature suggestions, tracking how many you&apos;ve adopted, not a lagging report on how profitable the account has been. Judging an account by its score number alone is the same mistake as judging a to-do list by how many boxes are checked, regardless of whether the tasks mattered.
              </p>
              <p style={para}>
                The action for this week: split the Recommendations tab into safe and spend/targeting buckets, apply the safe ones, scrutinize the spend/targeting ones against your ROAS or CPA target, and dismiss what doesn&apos;t fit. Then judge the account the way it should always be judged: by ROAS and CPA, not by the percentage sitting at the top of the Recommendations page.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Review every recommendation against a real ROAS target
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  That&apos;s the exact review Kampaio runs automatically, with Aegis flagging risk and Buzz checking bid impact before anything ships.
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
                  See how Kampaio handles recommendations
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. Scenario figures for CPC, ROAS, and score movement are illustrative, not measured data from a specific account. Verify all figures against your own account data before making budget decisions.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={{ ...h2, fontSize: '28px' }}>Sources</h2>
              <ol style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/9061546?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;About optimization score&quot; (2026)</a>. Definition, real-time calculation inputs, dismissal crediting score, eligible campaign types, Quality Score separation.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/9061547?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;Check your optimization score&quot; (2026)</a>. Where the score appears in the Recommendations tab, account and campaign level.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/thread/264502466/are-optmisation-scores-really-that-important?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help Community, Product Expert answer (Mar 2024)</a>. &quot;No direct effect on performance&quot; and &quot;what Google wants advertisers to do, not what&apos;s best for your business goals.&quot;</li>
                <li style={{ marginBottom: '12px' }}><a href="https://developers.google.com/google-ads/api/docs/recommendations" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API Documentation, &quot;Optimization score &amp; recommendations&quot; (2026)</a>. Programmatic view of recommendation types and score mechanics.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://www.storegrowers.com/google-ads-optimization-score/" style={linkStyle} target="_blank" rel="noopener noreferrer">Store Growers (Dennis Moons), &quot;Google Ads Optimization Score: Useful Metric or Manipulation?&quot; (Jan 2026)</a>. Google Partner 70% minimum threshold.</li>
              </ol>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-optimization-score" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
