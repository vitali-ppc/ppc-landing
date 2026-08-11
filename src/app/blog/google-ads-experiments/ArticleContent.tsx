'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { KeyTakeaways, Callout, BigStat, CompareGrid, Steps, Step } from '../../../components/blog/primitives';

const TITLE = 'Google Ads Experiments: How to Run an A/B Test You Can Actually Trust';
const DESCRIPTION =
  'How to set up Google Ads Experiments, pick a split ratio and duration, read the significance readout (including the new Experiment Power score), and know when your traffic is too low to trust it.';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-experiments#article',
    headline: TITLE,
    description: DESCRIPTION,
    image: 'https://www.kampaio.com/og/google-ads-experiments.png',
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
    datePublished: '2026-08-11T00:00:00.000Z',
    dateModified: '2026-08-11T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-experiments',
    },
    keywords:
      'google ads experiments, drafts and experiments, campaign experiment, split ratio, traffic split, statistically significant, p-value, point estimate, margin of error, confidence interval, campaign guidance, experiment power score',
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
        name: 'Google Ads Experiments',
        item: 'https://www.kampaio.com/blog/google-ads-experiments',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Experiments in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Experiments let you test how a change performs against your current setup by splitting live traffic between the two (Google Ads Help, 2026). If the draft wins your chosen goal, you apply the change; if not, nothing changes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Google Ads still have experimental ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Google Ads API supports experimental campaigns for A/B testing structure or bidding changes, built by drafting changes on a special campaign and comparing them to the base campaign (Google Ads Help, 2026).',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should a Google Ads experiment run?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Google's recommendation is at least 4 to 6 weeks before evaluating results (Google Ads Help, 2026). Practitioners run lower: DataFeedWatch's floor is 2 to 4 weeks; both it and Karooya flag under 2 weeks as too short.",
        },
      },
      {
        '@type': 'Question',
        name: 'What split ratio should I use for a Google Ads experiment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '50/50 is the default and most reliable for a typical account. 80/20 or 90/10 only fit accounts already generating over 100 conversions in the tested campaign, per DataFeedWatch.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does "statistically significant" mean in a Google Ads experiment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Statistically significant means the observed difference is unlikely to be chance (Google Ads Help, 2026). Google confirms this with a point estimate and margin of error: a positive result needs the point estimate minus the margin of error to stay above zero (Google Ads API Docs, 2026).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Experiment Power score?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A 0-100% score from Campaign Guidance, launched mid-2026, estimating your odds of reaching significance before the test finishes: Low (0-49%), Medium (50-79%), High (80-99%) (Google Ads Help, 2026). As of August 2026 it covers Performance Max and Broad Match Search only.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I run more than one experiment on the same campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Only one experiment runs per base campaign at a time; a second test waits until the first ends (Google Ads Help, 2026).',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'what-is-it', title: "What is a Google Ads experiment (and what it isn't)?", level: 1 },
    { id: 'setup', title: 'How to set up a Google Ads experiment', level: 1 },
    { id: 'split-duration', title: 'What split ratio and duration actually mean', level: 1 },
    { id: 'significance', title: 'How to read the significance readout', level: 1 },
    { id: 'invalidates', title: 'What invalidates a Google Ads experiment', level: 1 },
    { id: 'wrong-tool', title: 'When a Google Ads experiment is the wrong tool', level: 1 },
    { id: 'faq', title: 'Google Ads Experiments FAQ', level: 1 },
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
  const h3: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1e293b',
    marginTop: '28px',
    marginBottom: '12px',
  };
  const linkStyle: React.CSSProperties = { color: '#667eea', textDecoration: 'underline' };
  const captionStyle: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#64748b',
    marginTop: '-16px',
    marginBottom: '32px',
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
        {/* Breadcrumbs + cover */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-experiments" />
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
              Google Ads Experiments: How to Run an A/B Test You Can Actually Trust
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Google Ads Experiments let you split a portion of a live campaign&apos;s traffic between your original setup and a draft, then compare performance before applying the change account wide. This guide translates Google&apos;s own significance math, split ratio guidance, and the new Experiment Power score into one place.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>August 11, 2026 · 11 min read</span>
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
            {/* Intro + TL;DR */}
            <section id="intro">
              <p style={para}>
                Google Ads Experiments let you split a portion of a live campaign&apos;s traffic between your original setup and a draft, then compare performance before applying the change account wide. This guide translates Google&apos;s own significance math, split ratio guidance, and the new Experiment Power score into one place.
              </p>

              {/* VISUAL 1: KeyTakeaways (TL;DR summary card) */}
              <KeyTakeaways
                title="TL;DR"
                items={[
                  <>Google Ads Experiments (formerly Drafts and Experiments) split live traffic between your campaign and a draft, then report a verdict you can trust before applying anything account wide.</>,
                  <>This is not Conversion Lift or geo incrementality testing, which measures causal ad lift against a no-ad control group. See <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>our incrementality testing guide</a>.</>,
                  <>What this article adds, that Google&apos;s own docs scatter across five pages: reading the p-value, margin of error, and Experiment Power readout, and when your traffic means you shouldn&apos;t bother.</>,
                ]}
              />
            </section>

            {/* What is it */}
            <section id="what-is-it">
              <h2 style={h2}>What is a Google Ads experiment (and what it isn&apos;t)?</h2>
              <p style={para}>
                A Google Ads experiment splits a portion of your campaign&apos;s traffic and budget between your original setup and a draft, then compares performance for a duration you control (<a href="https://support.google.com/google-ads/answer/6318742" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Google renamed the feature &quot;Experiments,&quot; though its own support page title still can&apos;t quite let go of &quot;formerly drafts and experiments,&quot; so plenty of searchers are still typing in the old name.
              </p>

              {/* VISUAL 2: Callout (insight) : mandatory disambiguation */}
              <Callout variant="insight" title="Not the same as incrementality testing">
                An experiment splits the same live traffic between two versions of the same campaign. Conversion Lift and geo incrementality testing measure something structurally different: causal ad lift against a no-ad control group. If the question is whether ads work at all, that&apos;s <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>incrementality testing</a>, not an experiment.
              </Callout>

              <p style={para}>
                Confirmed experiment types, as of August 2026:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '10px' }}>Ad variations</li>
                <li style={{ marginBottom: '10px' }}>AI Max experiments (one-click, 50/50 split, Search only; see <a href="/blog/google-ads-ai-max" style={linkStyle}>AI Max experiments</a>)</li>
                <li style={{ marginBottom: '10px' }}>App asset experiments</li>
                <li style={{ marginBottom: '10px' }}>Custom experiments (Search, Display, App; typically used to test <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>Smart Bidding strategies</a>, match types, landing pages, audiences)</li>
                <li style={{ marginBottom: '10px' }}>Demand Gen experiments</li>
                <li style={{ marginBottom: '10px' }}>Performance Max experiments</li>
                <li style={{ marginBottom: 0 }}>Video experiments (2 to 4 arms, measured on brand lift or conversions)</li>
              </ul>
              <p style={para}>
                One constraint applies across all seven types: only one experiment runs per base campaign at a time (<a href="https://support.google.com/google-ads/answer/6318742" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
            </section>

            {/* Setup */}
            <section id="setup">
              <h2 style={h2}>How to set up a Google Ads experiment</h2>

              {/* VISUAL 3: Steps (7-step setup framework) */}
              <Steps>
                <Step title="Create a draft from the base campaign">
                  The draft inherits the campaign&apos;s structure, so the only real differences are the ones you introduce.
                </Step>
                <Step title="Make the change you want to test">
                  Keep it to one variable: swap the landing page URL for a product category, or shift the daily budget on a single ad group. That&apos;s a cleaner example than a bid-strategy test, already covered in a dedicated walkthrough elsewhere on this site.
                </Step>
                <Step title="Choose up to two goals to measure">
                  Pick the metrics that decide whether the draft wins.
                </Step>
                <Step title="Define the traffic split">
                  How much live traffic the draft sees relative to the original (more on the ratio decision below).
                </Step>
                <Step title="Set the timeframe">
                  A start date and, ideally, a fixed end date rather than an open-ended run.
                </Step>
                <Step title="Decide whether to sync">
                  Sync keeps everything you&apos;re NOT testing aligned with live edits to the base campaign while the experiment runs. Turn it off to isolate the test from unrelated mid-run changes.
                </Step>
                <Step title="Launch the experiment">
                  From there the Experiments tab does the traffic splitting and the significance reporting for you.
                </Step>
              </Steps>

              <p style={para}>
                Some practitioners still duplicate campaigns manually instead of using the native tool, per a January 2024 r/PPC debate. The native tool&apos;s advantage: it splits traffic and reports significance automatically; a duplicate leaves both jobs to you.
              </p>
            </section>

            {/* Split ratio and duration */}
            <section id="split-duration">
              <h2 style={h2}>What split ratio and duration actually mean</h2>
              <p style={para}>
                Get either number wrong and the test still runs, it just won&apos;t tell you anything true. The split decides how much live traffic actually reaches your draft; duration decides how long you have to wait before you can trust what it says. Neither number is arbitrary.
              </p>

              {/* VISUAL 4: CompareGrid (bold-viz) : split ratio decision */}
              <CompareGrid
                columns={[
                  {
                    name: '50/50 split',
                    bestFor: 'typical accounts, and the most reliable read on a small or medium sample',
                    highlight: true,
                    traits: [
                      { label: 'Safe on a small conversion sample', has: true },
                      { label: 'Needs 100+ conversions in the campaign', has: false },
                      { label: 'Fastest to launch on a large baseline', has: false },
                      { label: 'Minimizes live traffic exposed to the draft', has: false },
                    ],
                  },
                  {
                    name: '80/20 split',
                    bestFor: 'accounts with 100+ conversions in the tested campaign',
                    traits: [
                      { label: 'Safe on a small conversion sample', has: false },
                      { label: 'Needs 100+ conversions in the campaign', has: true },
                      { label: 'Fastest to launch on a large baseline', has: true },
                      { label: 'Minimizes live traffic exposed to the draft', has: false },
                    ],
                  },
                  {
                    name: '90/10 split',
                    bestFor: 'the same 100+ conversion accounts, with the least exposure to the draft',
                    traits: [
                      { label: 'Safe on a small conversion sample', has: false },
                      { label: 'Needs 100+ conversions in the campaign', has: true },
                      { label: 'Fastest to launch on a large baseline', has: true },
                      { label: 'Minimizes live traffic exposed to the draft', has: true },
                    ],
                  },
                ]}
              />
              <p style={captionStyle}>
                Split ratio decision table. 50/50 is the default and carries the lowest statistical risk, though it fills slowest on a low-traffic account. The 100+ conversion threshold for 80/20 and 90/10 comes from <a href="https://www.datafeedwatch.com/blog/google-ads-experiments-guide" style={linkStyle} target="_blank" rel="noopener noreferrer">DataFeedWatch&apos;s Google Ads Experiments guide</a>; below that volume, the treatment arm stays noisy and shrinks further with every point you shift back to the original.
              </p>

              <p style={para}>
                Google&apos;s own guidance is direct: run an experiment for &quot;at least 4 to 6 weeks to collect enough data to evaluate the results&quot; (<a href="https://support.google.com/google-ads/answer/10682377" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Practitioner minimums run lower and shouldn&apos;t be blended with that figure: per DataFeedWatch&apos;s guide, its own minimum is 2 to 4 weeks, and it flags ending a test after 2 or 3 days as too short; Karooya flags anything under 2 weeks as a pitfall, paraphrasing Google as &quot;4-6 weeks for some experiments&quot; (<a href="https://www.karooya.com/blog/google-ads-experiments-a-b-test-bidding-creatives-campaign-changes-effectively/" style={linkStyle} target="_blank" rel="noopener noreferrer">Karooya, 2025</a>).
              </p>

              {/* VISUAL 5: BigStat (bold-viz) : the duration figure */}
              <BigStat
                value="4-6"
                label="weeks before you evaluate"
                claim="is Google's own recommended minimum run time for an experiment, not a target you beat by ending early."
                source="Source: Google Ads Help, About the Experiments page, 2026 (support.google.com/google-ads/answer/10682377)"
              />

              <p style={para}>
                Cookie-based splits assign a user once, so the same visitor always sees either the base or the draft. Search-based splits can show either version across sessions, since each search is assigned independently, per Karooya&apos;s guide; Google itself flags search-based as the &quot;(recommended option)&quot; in the UI, per DataFeedWatch&apos;s guide.
              </p>
            </section>

            {/* Significance readout */}
            <section id="significance">
              <h2 style={h2}>How to read the significance readout (p-value, confidence, and the new Experiment Power score)</h2>
              <p style={para}>
                &quot;Statistically significant&quot; means the difference between draft and original is unlikely to be chance, and the change should keep performing similarly once applied (<a href="https://support.google.com/google-ads/answer/6318747" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>

              {/* VISUAL 6: ResponsiveTable : significance readout cheat sheet */}
              <ResponsiveTable
                headers={['Term', 'What it measures', 'Act on it when']}
                rows={[
                  [
                    <strong key="t1">p-value</strong>,
                    'Probability the result happened by chance',
                    "Lower is more significant; Google's own example uses p ≤ 0.05 (95% confidence) as illustrative, not a fixed rule",
                  ],
                  [
                    <strong key="t2">Point estimate</strong>,
                    'Estimated percent lift of draft vs. original',
                    'Positive means the draft is outperforming',
                  ],
                  [
                    <strong key="t3">Margin of error</strong>,
                    'Radius around the point estimate',
                    'Subtract it from the point estimate before trusting the number',
                  ],
                  [
                    <strong key="t4">Confidence interval</strong>,
                    'Range the true result likely falls in',
                    'Default confidence level 80%, adjustable',
                  ],
                  [
                    <strong key="t5">Experiment Power score</strong>,
                    '0-100% odds of reaching significance, from Campaign Guidance',
                    <span key="v5">Below 50% (Low band): <strong>don&apos;t trust a result even if you get one</strong></span>,
                  ],
                ]}
              />
              <p style={captionStyle}>
                Significance readout cheat sheet. Field definitions from the <a href="https://developers.google.com/google-ads/api/docs/experiments/reporting" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API docs on experiment reporting</a> and <a href="https://support.google.com/google-ads/answer/6318747" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;Monitor your experiments&quot;</a>.
              </p>

              <p style={para}>
                The rule that always applies: subtract the margin of error from the point estimate. If still greater than zero, the result counts as real and positive (<a href="https://developers.google.com/google-ads/api/docs/experiments/reporting" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API Docs, 2026</a>). Google layers a p-value threshold on top in its worked example, p ≤ 0.05 for 95% confidence, but frames it as &quot;for example,&quot; not a fixed requirement.
              </p>
              <p style={para}>
                Google&apos;s own example: &quot;There&apos;s a 95% chance that your experiment notices a +10% to +20% difference for this metric when compared to the original campaign&quot; (<a href="https://support.google.com/google-ads/answer/6318747" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Default confidence level is 80%, adjustable.
              </p>
              <p style={para}>
                Campaign Guidance is a newer layer on top of this readout: the Experiment Power score (<a href="https://support.google.com/google-ads/answer/15911255" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). It estimates, before your test finishes, how likely you are to reach significance, banded Low, Medium, and High. As of August 2026 it covers Performance Max and Broad Match Search only; check your account, since coverage is expanding.
              </p>
              <p style={para}>
                Five factors drive the score: campaign selection (enough volume), campaign variability (consistent history), traffic split (enough traffic in the experiment arm), duration (a minimum tied to volume), and experiment type (bidding-strategy tests need longer minimums) (same source). Google calls it an estimate, not a promise: it &quot;could vary in the actual experiment.&quot; Fair enough. A score that admits its own uncertainty up front still beats finding out at week six that the traffic was never going to get you there.
              </p>
              <p style={para}>
                Barry Schwartz described the score as showing &quot;the likelihood of achieving statistically significant results, along with actionable recommendations&quot; (<a href="https://www.seroundtable.com/google-ads-campaign-guidance-experiment-power-41469.html" style={linkStyle} target="_blank" rel="noopener noreferrer">Schwartz, Search Engine Roundtable, 2026</a>), the same family as Google&apos;s recommendation-adoption metric, <a href="/blog/google-ads-optimization-score" style={linkStyle}>optimization score</a>.
              </p>

              <ResponsiveTable
                headers={['Band', 'Range', 'What it means']}
                rows={[
                  [
                    <strong key="b1">Low</strong>,
                    '0-49%',
                    "Don't trust a significant result even if you get one; fix the setup first",
                  ],
                  [
                    <strong key="b2">Medium</strong>,
                    '50-79%',
                    'Workable, but budget extra weeks past the 4 to 6 week minimum',
                  ],
                  [
                    <strong key="b3">High</strong>,
                    '80-99%',
                    'Best odds of a trustworthy read inside the standard window',
                  ],
                ]}
              />
              <p style={captionStyle}>
                Experiment Power bands, per <a href="https://support.google.com/google-ads/answer/15911255" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;About Campaign Guidance&quot; (2026)</a>.
              </p>

              {/* VISUAL 7: MascotQuote (Aegis, risk flag with concrete numbers) */}
              <MascotQuote mascot="aegis">
                Say your Experiment Power score comes back at 30%. That&apos;s a Low-band read, under the 50% floor, and I flag it before the clock starts: don&apos;t spend four to six weeks on a test that was never built to reach significance. Fix the traffic split or wait for more conversion volume first.
              </MascotQuote>
            </section>

            {/* What invalidates */}
            <section id="invalidates">
              <h2 style={h2}>What invalidates a Google Ads experiment</h2>
              <p style={para}>
                Four things reliably invalidate an experiment: stopping it before 2 weeks, changing the tested element or budget mid-run, testing something outside the account&apos;s real traffic mix, and narrowing the scope so far the sample stays thin. None of these are exotic mistakes. They&apos;re the ones anyone managing five accounts at once makes on a busy Friday.
              </p>
              <p style={para}>
                Google&apos;s own reasons a result comes back not significant: the experiment hasn&apos;t run long enough, the campaign doesn&apos;t receive enough traffic, the traffic split was too small, or the change didn&apos;t produce a real difference (<a href="https://support.google.com/google-ads/answer/6318747" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={para}>
                Karooya notes pitfalls to check before launch: avoid trivial changes, avoid overlapping experiments (only one runs per base campaign anyway), watch for cannibalization between arms, and remember an experiment can&apos;t be reactivated once ended. DataFeedWatch flags a similar failure mode: testing irrelevant elements, and stopping too soon before the sample stabilizes.
              </p>

              <Callout variant="warning">
                One r/PPC thread, &quot;Aftermath Issues,&quot; raised a concern worth watching, not documented Google behavior: performance sometimes dips after an experiment ends and the winning variant is applied. Treat it as a reason to watch the base campaign afterward, not a confirmed platform quirk.
              </Callout>
            </section>

            {/* Wrong tool */}
            <section id="wrong-tool">
              <h2 style={h2}>When a Google Ads experiment is the wrong tool</h2>
              <p style={para}>
                An account whose campaign doesn&apos;t generate enough weekly conversions for a meaningful Experiment Power score, or enough traffic to fill even a 50/50 split, won&apos;t produce a trustworthy result no matter the duration.
              </p>
              <p style={para}>
                Treat a Low-band reading (0-49%) as the go/no-go gate before launch, not something you discover after 4 to 6 wasted weeks (<a href="https://support.google.com/google-ads/answer/15911255" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={para}>
                A Low Experiment Power reading shows up most on SMB and e-commerce accounts spending $3,000 to $50,000 a month, where conversion volume is thin, and the instinct is usually to launch the test anyway. The honest alternative: wait for more volume, consolidate a bigger change into one test, or use <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>geo holdout / lift testing</a> instead.
              </p>
              <p style={para}>
                kampaio&apos;s agents watch a running experiment&apos;s scorecard: Aegis flags a stalled Experiment Power reading early instead of at week 6, and Buzz surfaces the likely bid-side impact. Neither runs or bypasses Google&apos;s native tool; the Experiments tab is still the only place an experiment runs.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>Google Ads Experiments FAQ</h2>

              <h3 style={h3}>What are Experiments in Google Ads?</h3>
              <p style={para}>
                Experiments let you test how a change performs against your current setup by splitting live traffic between the two (<a href="https://support.google.com/google-ads/answer/10682377" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). If the draft wins your chosen goal, you apply the change; if not, nothing changes.
              </p>

              <h3 style={h3}>Does Google Ads still have experimental ads?</h3>
              <p style={para}>
                Yes. The Google Ads API supports experimental campaigns for A/B testing structure or bidding changes, built by drafting changes on a special campaign and comparing them to the base (<a href="https://support.google.com/google-ads/answer/6318742" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>

              <h3 style={h3}>How long should a Google Ads experiment run?</h3>
              <p style={para}>
                Google&apos;s recommendation is at least 4 to 6 weeks before evaluating results (<a href="https://support.google.com/google-ads/answer/10682377" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Practitioners run lower: DataFeedWatch&apos;s floor is 2 to 4 weeks; both it and Karooya flag under 2 weeks as too short.
              </p>

              <h3 style={h3}>What split ratio should I use for a Google Ads experiment?</h3>
              <p style={para}>
                50/50 is the default and most reliable for a typical account. 80/20 or 90/10 only fit accounts already generating over 100 conversions in the tested campaign, per DataFeedWatch (<a href="https://www.datafeedwatch.com/blog/google-ads-experiments-guide" style={linkStyle} target="_blank" rel="noopener noreferrer">DataFeedWatch, 2026</a>).
              </p>

              <h3 style={h3}>What does &quot;statistically significant&quot; mean here?</h3>
              <p style={para}>
                Statistically significant means the observed difference is unlikely to be chance (<a href="https://support.google.com/google-ads/answer/6318747" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Google confirms this with a point estimate and margin of error: a positive result needs the point estimate minus the margin of error to stay above zero (<a href="https://developers.google.com/google-ads/api/docs/experiments/reporting" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API Docs, 2026</a>).
              </p>

              <h3 style={h3}>What is the Experiment Power score?</h3>
              <p style={para}>
                A 0-100% score from Campaign Guidance, launched mid-2026, estimating your odds of reaching significance before the test finishes: Low (0-49%), Medium (50-79%), High (80-99%) (<a href="https://support.google.com/google-ads/answer/15911255" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). As of August 2026 it covers Performance Max and Broad Match Search only.
              </p>

              <h3 style={h3}>Can I run more than one experiment on the same campaign?</h3>
              <p style={para}>
                No. Only one runs per base campaign at a time; a second test waits until the first ends (<a href="https://support.google.com/google-ads/answer/6318742" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <p style={para}>
                Reading a significance readout correctly is the harder half of running a Google Ads experiment; watching it stay on track for four to six weeks is the tedious half. kampaio&apos;s agents watch a running experiment&apos;s scorecard: Aegis flags a stalled Experiment Power reading or a drifted traffic split, and Buzz surfaces the bid-side implications once a result lands. Neither runs, edits, or bypasses Google&apos;s native Experiments tool; the Experiments tab is still the only place a test executes.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Catch a stalled experiment in week one, not week six
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Aegis watches the Experiment Power reading and the traffic split while the test runs, and Buzz reads the bid-side impact once a result lands.
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
                  See how Kampaio watches a live experiment
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. Feature availability (including Campaign Guidance and the Experiment Power score) was verified against Google&apos;s own documentation on August 11, 2026, and can change; check your own account before acting.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={{ ...h2, fontSize: '28px' }}>Sources</h2>
              <ol style={{ fontSize: '16px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/10682377" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;About the Experiments page&quot; (2026)</a>. Experiment types taxonomy, the 4 to 6 week recommendation.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/6318747" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;Monitor your experiments&quot; (2026)</a>. Statistical significance definition, confidence interval, reasons a result is not significant.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/6318742" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;Campaign experiment: Definition&quot; (2026)</a>. Definition of the split, one experiment per base campaign.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://support.google.com/google-ads/answer/15911255" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, &quot;About Campaign Guidance&quot; (2026)</a>. Experiment Power score, bands, and the five factors behind it.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://developers.google.com/google-ads/api/docs/experiments/reporting" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads API Docs, &quot;Report on experiments&quot; (2026)</a>. p-value, point estimate, margin of error definitions.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://www.datafeedwatch.com/blog/google-ads-experiments-guide" style={linkStyle} target="_blank" rel="noopener noreferrer">DataFeedWatch, &quot;Google Ads Experiments Guide&quot;</a>. Split ratio thresholds, 2 to 4 week minimum, search-based split as the recommended option.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://www.karooya.com/blog/google-ads-experiments-a-b-test-bidding-creatives-campaign-changes-effectively/" style={linkStyle} target="_blank" rel="noopener noreferrer">Karooya, &quot;Google Ads Experiments Guide&quot; (2025)</a>. Cookie vs search based splits, pre-launch pitfalls.</li>
                <li style={{ marginBottom: '12px' }}><a href="https://www.seroundtable.com/google-ads-campaign-guidance-experiment-power-41469.html" style={linkStyle} target="_blank" rel="noopener noreferrer">Barry Schwartz, Search Engine Roundtable (June 9, 2026)</a>. Coverage of the Campaign Guidance Experiment Power launch.</li>
              </ol>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-experiments" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
