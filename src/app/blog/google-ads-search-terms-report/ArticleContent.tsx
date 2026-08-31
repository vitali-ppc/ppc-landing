'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { BigStat, CompareGrid, KeyTakeaways, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-search-terms-report#article',
    headline:
      'Google Ads Search Terms Report: What It Shows, What It Hides, and How to Act On It',
    description:
      'The Google Ads search terms report shows the real queries behind your clicks, but Google withholds a chunk of them. Here is how to read the report, what is hidden and why, and a simple framework for turning any term into a negative, a new keyword, or a wait-and-see.',
    image: 'https://www.kampaio.com/og/google-ads-search-terms-report.png',
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
    datePublished: '2026-08-02T00:00:00.000Z',
    dateModified: '2026-08-02T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-search-terms-report',
    },
    keywords:
      'google ads search terms report, search terms vs keywords, hidden search terms, other search terms, negative keywords, search terms insights, performance max search terms, ai max for search, keep kill watch framework, search term match type',
    inLanguage: 'en',
    "wordCount": 1649,
    "articleSection": "Google Ads"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I pull a search terms report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open Campaigns, then Insights and reports, then Search terms, and use the Download button. The Report editor’s predefined reports are a view-only alternative (Google Ads Help, 2472708).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the main purpose of the search terms report in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It shows the queries that triggered your ads, so you can find mismatches between what you are bidding on and what people typed, then act.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I see what search terms triggered my ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open the search terms report under Campaigns, then Insights and reports. Every row is a real query matched to an active keyword, with cost, clicks, and conversions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find the "Other Search Terms" line in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It appears inside the search terms report as a rolled-up total covering queries Google withholds individually, usually for privacy (Google Ads Help 11386930; Search Engine Land, Nov 26, 2025).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between search terms and keywords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A keyword is what you bid on; a search term is the phrase someone typed that matched it. One keyword can trigger dozens of search terms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are some search terms hidden in my report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google withholds queries below an undisclosed volume threshold, citing privacy (Ginny Marvin, Google Ads Liaison, via Search Engine Land, Jul 9, 2025). Advertiser cost: $0.85 wasted per $1 spent on those queries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Performance Max have a search terms report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, not at the query level. PMax gives you Search terms insights, an aggregated view grouped by category (Google Ads Help, 11386930).',
        },
      },
      {
        '@type': 'Question',
        name: 'How often should I review the search terms report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Weekly for actively managed accounts; biweekly for stable accounts under roughly $5K in monthly spend. New campaigns warrant a tighter cadence.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Google Ads Search Terms Report: What It Shows, What It Hides, and How to Act On It',
        item: 'https://www.kampaio.com/blog/google-ads-search-terms-report',
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: '1. TL;DR: What the Search Terms Report Shows You (and What It Hides)', level: 1 },
    { id: 'what-is-it', title: '2. What Is the Google Ads Search Terms Report? (Search Terms vs. Keywords)', level: 1 },
    { id: 'where-to-find', title: '3. Where to Find the Search Terms Report in the 2026 Google Ads UI', level: 1 },
    { id: 'how-to-read', title: '4. How to Read the Report: Columns, Match Types, and What to Add', level: 1 },
    { id: 'hidden-terms', title: "5. Why Some Search Terms Are Hidden (and What They're Actually Costing You)", level: 1 },
    { id: 'keep-kill-watch', title: '6. The Keep / Kill / Watch Framework: Turning a Search Term Into an Action', level: 1 },
    { id: 'pmax-ai-max', title: '7. Search Terms on Performance Max and AI Max Campaigns', level: 1 },
    { id: 'weekly-audit', title: '8. A Real 15-Minute Weekly Audit', level: 1 },
    { id: 'faq', title: '9. FAQ', level: 1 },
    { id: 'cta', title: '10. Stop Guessing. Run the Report, Run the Framework.', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
  const paragraphStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const h2Style: React.CSSProperties = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px', scrollMarginTop: '24px' };
  const captionStyle: React.CSSProperties = { fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, marginTop: '-12px', marginBottom: '32px' };
  const yesStyle: React.CSSProperties = { color: '#10b981', fontWeight: 600 };
  const noStyle: React.CSSProperties = { color: '#f59e0b', fontWeight: 600 };

  const faqItems = [
    {
      q: 'How do I pull a search terms report?',
      a: (
        <>
          Open Campaigns, then Insights and reports, then Search terms, and use the Download button. The Report editor&apos;s predefined reports are a view-only alternative (
          <a href="https://support.google.com/google-ads/answer/2472708" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2472708</a>).
        </>
      ),
    },
    {
      q: 'What is the main purpose of the search terms report in Google Ads?',
      a: <>It shows the queries that triggered your ads, so you can find mismatches between what you&apos;re bidding on and what people typed, then act.</>,
    },
    {
      q: 'How do I see what search terms triggered my ads?',
      a: <>Open the search terms report under Campaigns, then Insights and reports. Every row is a real query matched to an active keyword, with cost, clicks, and conversions.</>,
    },
    {
      q: 'How do I find the "Other Search Terms" line in Google Ads?',
      a: (
        <>
          It appears inside the search terms report as a rolled-up total covering queries Google withholds individually, usually for privacy (
          <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>;{' '}
          <a href="https://searchengineland.com/google-ads-search-terms-report-tips-465174" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Nov 26, 2025</a>).
        </>
      ),
    },
    {
      q: "What's the difference between search terms and keywords?",
      a: <>A keyword is what you bid on; a search term is the phrase someone typed that matched it. One keyword can trigger dozens of search terms.</>,
    },
    {
      q: 'Why are some search terms hidden in my report?',
      a: (
        <>
          Google withholds queries below an undisclosed volume threshold, citing privacy (Ginny Marvin, Google Ads Liaison, via{' '}
          <a href="https://searchengineland.com/google-ads-hidden-search-terms-cost-advertisers-458306" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Jul 9, 2025</a>). Advertiser cost: $0.85 wasted per $1 spent on those queries.
        </>
      ),
    },
    {
      q: 'Does Performance Max have a search terms report?',
      a: (
        <>
          No, not at the query level. PMax gives you Search terms insights, an aggregated view grouped by category (
          <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>).
        </>
      ),
    },
    {
      q: 'How often should I review the search terms report?',
      a: <>Weekly for actively managed accounts; biweekly for stable accounts under roughly $5K in monthly spend. New campaigns warrant a tighter cadence.</>,
    },
  ];

  const sources = [
    { label: 'Google Ads Help: About the search terms report', href: 'https://support.google.com/google-ads/answer/2472708' },
    { label: 'Google Ads Help: About search terms insights', href: 'https://support.google.com/google-ads/answer/11386930' },
    { label: 'Google Ads Help: About negative keywords', href: 'https://support.google.com/google-ads/answer/2453972' },
    { label: 'Google Ads Help: How AI Max for Search works', href: 'https://support.google.com/google-ads/answer/15910187' },
    { label: 'Google: AI Max for Search launch, blog.google, May 6, 2025', href: 'https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/' },
    { label: 'Search Engine Land: hidden search terms cost data, Jul 9, 2025', href: 'https://searchengineland.com/google-ads-hidden-search-terms-cost-advertisers-458306' },
    { label: 'Search Engine Land: 5 tips for the search terms report, Nov 26, 2025', href: 'https://searchengineland.com/google-ads-search-terms-report-tips-465174' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-search-terms-report" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads &middot; Search Terms
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Search Terms Report: What It Shows, What It Hides, and How to Act On It
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              The report shows the real queries behind your clicks, but Google withholds a chunk of them. How to read it, what is hidden and why, and a framework for turning any term into a negative, a new keyword, or a wait-and-see.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>August 2, 2026 &middot; 11 min read</span>
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
            {/* Intro */}
            <section id="intro">
              <p style={paragraphStyle}>
                The Google Ads search terms report shows the actual queries that triggered your ads, separate from the keywords you bid on. Google withholds a slice of low-volume queries under an undisclosed privacy threshold, so the report is accurate for most spend but incomplete by design.
              </p>
            </section>

            {/* 1. TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>1. TL;DR: What the Search Terms Report Shows You (and What It Hides)</h2>

              {/* VISUAL 1: front-loaded summary */}
              <KeyTakeaways
                items={[
                  'Shows real queries behind your clicks. Google hides a portion of low-volume queries under a privacy threshold.',
                  'Hidden terms cost $0.85 per $1 spent on them (Taikun Digital / Search Engine Land, Jul 2025).',
                  'Keep / Kill / Watch (Section 6) turns any row into one action: negative, new keyword, or wait-and-see.',
                  'PMax has no per-query report; AI Max needs its own view (Section 7).',
                ]}
              />
            </section>

            {/* 2. What is it */}
            <section id="what-is-it">
              <h2 style={h2Style}>2. What Is the Google Ads Search Terms Report? (Search Terms vs. Keywords)</h2>
              <p style={paragraphStyle}>
                A search term is the exact phrase someone typed into Google right before your ad appeared. A keyword is the term you added to trigger that ad, and the report is Google&apos;s own record of the gap between the two (
                <a href="https://support.google.com/google-ads/answer/2472708" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2472708</a>). A broad-match keyword like &quot;running shoes&quot; can trigger &quot;best running shoes for flat feet,&quot; a query you never bid on but paid for anyway. That gap is where budget quietly leaks, and most accounts never look at it closely enough to notice.
              </p>
              <p style={paragraphStyle}>
                Not every campaign type gives you this at query level. Search and Shopping get a real, row-by-row report. Performance Max gets an aggregated Search terms insights view instead, grouped by category, and Demand Gen exposes nothing (
                <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>). Frustrating if you&apos;re used to the granularity Search gives you, and it&apos;s exactly what Section 7 covers.
              </p>
            </section>

            {/* 3. Where to find */}
            <section id="where-to-find">
              <h2 style={h2Style}>3. Where to Find the Search Terms Report in the 2026 Google Ads UI</h2>
              <p style={paragraphStyle}>
                Once you know which campaigns actually give you query-level data, finding the report itself is its own small chore. The primary, Google-documented path: Campaigns, then Insights and reports, then Search terms (
                <a href="https://support.google.com/google-ads/answer/2472708" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2472708</a>). An alternate, community-observed path: open the Keywords tab, select all keywords, switch to the Search terms sub-tab.
              </p>
              <p style={paragraphStyle}>
                The friction is real. A recurring r/adwords thread complains Google &quot;moved it under Insights &amp; Reports,&quot; calling it &quot;a step backwards,&quot; a sign the location keeps shifting. We&apos;ve seen the same complaint resurface every few months, usually right after a UI refresh nobody asked for.
              </p>
              <p style={paragraphStyle}>
                A third, less-used route: Insights and reports, then Report editor, then a predefined report. It&apos;s view-only, you cannot add negatives from there (
                <a href="https://support.google.com/google-ads/answer/2472708" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2472708</a>). Once open, the Download button exports the data, the fastest answer to &quot;how do I pull a search terms report&quot; for bulk use.
              </p>
            </section>

            {/* 4. How to read */}
            <section id="how-to-read">
              <h2 style={h2Style}>4. How to Read the Report: Columns, Match Types, and What to Add</h2>
              <p style={paragraphStyle}>
                The default view is thin. Worth adding via the Columns button: Added/Excluded status, search term match type, and Conv. value / cost, none shown by default but all decisive for what&apos;s worth acting on.
              </p>
              <p style={paragraphStyle}>
                Search term match type shows how the query connected to your keyword, not your keyword&apos;s own setting. Since a 2019 change, exact match already covers same-meaning close variants, so a term can trigger a match without being a literal string match (
                <a href="/blog/google-ads-keyword-match-types-explained" style={linkStyle}>our full breakdown of keyword match types</a> has the mechanics). Worth remembering before you assume a weird-looking term slipped through by accident.
              </p>

              {/* VISUAL 2: the column reference */}
              <ResponsiveTable
                headers={['Column', 'Default?', 'Why add it']}
                rows={[
                  ['Search term', <span key="d1" style={yesStyle}>Yes</span>, 'The actual query, your baseline for every decision'],
                  ['Match type', <span key="d2" style={noStyle}>No</span>, 'Shows which negative type will actually block a term'],
                  ['Added/Excluded', <span key="d3" style={noStyle}>No</span>, 'Flags terms already handled, so you skip re-review'],
                  ['Conv. value / cost', <span key="d4" style={noStyle}>No</span>, 'The two numbers Keep/Kill/Watch runs on'],
                  ['Campaign', <span key="d5" style={yesStyle}>Yes (usually)</span>, 'Needed once reviewing more than one campaign'],
                ]}
              />
              <p style={captionStyle}>Which columns Google shows you by default, and which ones you have to add yourself.</p>

              <p style={paragraphStyle}>
                Once those columns are live, the rows start telling two different stories: the terms you can see, and the ones Google decided not to show you at all.
              </p>
            </section>

            {/* 5. Hidden terms */}
            <section id="hidden-terms">
              <h2 style={h2Style}>5. Why Some Search Terms Are Hidden (and What They&apos;re Actually Costing You)</h2>
              <p style={paragraphStyle}>
                Google withholds search terms below an undisclosed &quot;significant volume&quot; threshold, framing it as privacy-driven. &quot;The threshold increase was solely privacy-driven,&quot; said Ginny Marvin, Google Ads Liaison (
                <a href="https://searchengineland.com/google-ads-hidden-search-terms-cost-advertisers-458306" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Jul 9, 2025</a>). Google&apos;s own Search terms insights page confirms the mechanism: those groupings &quot;take all search terms into account, including those not exposed in the search terms report due to privacy reasons&quot; (
                <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>).
              </p>
              <p style={paragraphStyle}>
                The advertiser-side cost is measurable. An analysis of 933 campaigns, over $20 million in spend, nearly 14 million clicks, found advertisers lose $0.85 per $1 spent specifically on hidden queries, plus 52% higher CPCs and 44% lower CTRs versus visible ones (Collin Slattery, Taikun Digital, via{' '}
                <a href="https://searchengineland.com/google-ads-hidden-search-terms-cost-advertisers-458306" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Jul 9, 2025</a>). A few blog posts round that up to &quot;85% of total ad spend wasted.&quot; That&apos;s wrong, and worth correcting on the record: it&apos;s 85 cents wasted per dollar spent specifically on the hidden queries, a narrower number than the misquote, but still a real one.
              </p>
              <p style={paragraphStyle}>
                Slattery&apos;s own read is sharper: &quot;this isn&apos;t about privacy, it&apos;s about monetizing low-quality inventory,&quot; his interpretation, not settled fact. Whether that&apos;s fair to Google&apos;s stated privacy rationale is a separate argument. The advertiser-side numbers are what they are.
              </p>

              {/* VISUAL 3 (bold-viz): the correctly-scoped hidden-terms stat */}
              <BigStat
                value="$0.85"
                label="wasted per $1 spent"
                claim="on hidden, non-disclosed search terms. Not 85% of total account spend."
                source="Source: Collin Slattery, Taikun Digital (933 campaigns, $20M+ spend), via Search Engine Land, Jul 2025"
              />

              <p style={{ ...paragraphStyle, marginTop: '32px' }}>
                You can&apos;t unhide the individual terms, but there&apos;s a workaround: an &quot;Other search terms&quot; line rolls up the redacted queries, so you can see their combined cost and conversions against visible terms (
                <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>;{' '}
                <a href="https://searchengineland.com/google-ads-search-terms-report-tips-465174" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Nov 26, 2025, Tip 4</a>). Not a fix, but it&apos;s the closest thing to visibility you&apos;ll get.
              </p>

              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginTop: '40px', marginBottom: '16px', lineHeight: 1.3 }}>The two total rows, and what people mean by &quot;uncategorised&quot;</h3>
              <p style={paragraphStyle}>
                Scroll to the bottom of the table and there are two summary rows, and they do not
                add up to the same thing. <strong>Total: search terms</strong> is the sum of the
                individual queries listed above it, the ones Google is willing to name.
                <strong> Total: Other search terms</strong> is everything else that ran in that ad
                group: queries held back below the disclosure threshold, plus low-spend queries
                Google does not attribute to a category. The gap between the two is the part of your
                spend you cannot inspect query by query.
              </p>
              <p style={paragraphStyle}>
                People often call that second row &quot;uncategorised search terms&quot;, which is
                the natural way to describe it and not the label Google uses. In the Search terms
                report it reads <strong>Total: Other search terms</strong>; the word
                &quot;uncategorised&quot; belongs to Search terms insights, a separate view that
                groups low-volume queries into themes and puts the leftovers under other queries
                without ever exposing the queries themselves (
                <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>
                ). Same money, two different screens, and only one of them lets you act on it.
              </p>

              {/* VISUAL 4: mascot, CPC drift heuristic */}
              <MascotQuote mascot="buzz">
                When Other search terms runs above 15% of an ad group&apos;s cost, CPC on its visible terms usually sits 15 to 20% higher too. Tighten the exact-match core before touching bids.
              </MascotQuote>
            </section>

            {/* 6. Keep / Kill / Watch */}
            <section id="keep-kill-watch">
              <h2 style={h2Style}>6. The Keep / Kill / Watch Framework: Turning a Search Term Into an Action</h2>
              <p style={paragraphStyle}>
                Knowing what&apos;s hidden matters, but most of your budget still sits in the terms you can see. A spreadsheet of queries doesn&apos;t do anything on its own, though. Keep / Kill / Watch gives every row one of three outcomes, based on two numbers you already have: cost and conversions.
              </p>
              <p style={paragraphStyle}>
                <strong>Kill.</strong> Cost clears a meaningful threshold, roughly $40 to $50 for a mid-size account, scale for your own spend, with zero conversions over a lookback at least twice your typical conversion lag. Add it as a negative (
                <a href="/blog/google-ads-negative-keywords" style={linkStyle}>the full negative-keyword workflow is here</a>).
              </p>
              <p style={paragraphStyle}>
                <strong>Keep.</strong> 1 or more conversions, not yet an exact-match keyword, is underpriced risk: you&apos;re paying your broader keyword&apos;s bid, not one you set on purpose. Promote it, give it its own bid.
              </p>
              <p style={paragraphStyle}>
                <strong>Watch.</strong> Below both thresholds. Not a failure, not a win, just not enough data yet. Flag it and re-check next cycle.
              </p>

              {/* VISUAL 5 (bold-viz): the named differentiator, made scannable */}
              <CompareGrid
                columns={[
                  {
                    name: 'Kill',
                    bestFor: 'cost above threshold, 0 conversions over a 2x lag window',
                    traits: [
                      { label: 'Add as a negative keyword', has: true },
                      { label: 'Promote to exact match with its own bid', has: false },
                      { label: 'Leave alone and re-check next cycle', has: false },
                    ],
                  },
                  {
                    name: 'Keep',
                    bestFor: '1+ conversions, not yet an exact-match keyword',
                    traits: [
                      { label: 'Add as a negative keyword', has: false },
                      { label: 'Promote to exact match with its own bid', has: true },
                      { label: 'Leave alone and re-check next cycle', has: false },
                    ],
                    highlight: true,
                  },
                  {
                    name: 'Watch',
                    bestFor: 'below both thresholds, not enough data yet',
                    traits: [
                      { label: 'Add as a negative keyword', has: false },
                      { label: 'Promote to exact match with its own bid', has: false },
                      { label: 'Leave alone and re-check next cycle', has: true },
                    ],
                  },
                ]}
              />
              <p style={captionStyle}>
                Risk if you call it wrong: Kill blocks a slow-converting but valid query. Keep fragments budget on 1 fluke conversion. Watch leaks spend to an already-clear Kill.
              </p>

              <p style={paragraphStyle}>
                For Kill terms, match type matters: phrase match handles modifier patterns without over-blocking, exact match is safer for a single, unambiguous term. One advertiser summed up the same logic: &quot;drafts a block list off your search terms report&quot; (X, 2026-07-11), corroborating color, not the evidence base. Nothing new there. It just gives PPC managers who already do this instinctively a threshold to work from instead of a gut feeling.
              </p>
            </section>

            {/* 7. PMax and AI Max */}
            <section id="pmax-ai-max">
              <h2 style={h2Style}>7. Search Terms on Performance Max and AI Max Campaigns</h2>
              <p style={paragraphStyle}>
                Keep / Kill / Watch assumes you can see the terms in the first place. On Performance Max, that assumption breaks down. PMax does not give you a per-query search terms report.
              </p>
              <p style={paragraphStyle}>
                Instead you get Search terms insights, an aggregated view grouped by category, already folding in the same privacy-redacted terms hidden from Search campaigns (
                <a href="https://support.google.com/google-ads/answer/11386930" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 11386930</a>). If PMax is burning budget beyond a search-terms question, the fuller diagnostic lives in{' '}
                <a href="/blog/performance-max-not-converting" style={linkStyle}>why Performance Max stops converting</a>.
              </p>
              <p style={paragraphStyle}>
                Separate from visibility, PMax now supports up to 10,000 negative keywords per campaign plus shared list support, and account-level lists apply automatically. Still missing: per-query control equivalent to a Search campaign.
              </p>
              <p style={paragraphStyle}>
                AI Max for Search, launched May 6, 2025, is not a new campaign type, it&apos;s an optimization layer inside Search campaigns adding keywordless matching and text customization (
                <a href="https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/" style={linkStyle} target="_blank" rel="noopener noreferrer">blog.google, May 6, 2025</a>). It introduces its own &quot;AI Max&quot; match type and source column, so it needs a customized search-terms view to see which landing pages and headlines matched which query (
                <a href="https://support.google.com/google-ads/answer/15910187" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 15910187</a>;{' '}
                <a href="https://searchengineland.com/google-ads-search-terms-report-tips-465174" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, Nov 26, 2025, Tip 3</a>). Accounts activating it on Search typically see 14% more conversions or conversion value at a similar CPA or ROAS, 27% for accounts mostly on exact and phrase before (Google internal data, 2025, via{' '}
                <a href="https://blog.google/products/ads-commerce/google-ai-max-for-search-campaigns/" style={linkStyle} target="_blank" rel="noopener noreferrer">blog.google</a>). Worth setting that view up before you assume your existing search-terms habits still apply.
              </p>
              <p style={paragraphStyle}>
                If PMax&apos;s category view isn&apos;t enough, run a parallel Search campaign on the same theme as a directional proxy. It&apos;s a workaround, not a fix, but it&apos;s the closest thing available today.
              </p>
            </section>

            {/* 8. Weekly audit */}
            <section id="weekly-audit">
              <h2 style={h2Style}>8. A Real 15-Minute Weekly Audit</h2>
              <p style={paragraphStyle}>
                None of the above holds without a routine behind it. Keep / Kill / Watch only works if you run it on a schedule. Five steps, roughly 15 minutes:
              </p>

              {/* VISUAL 6: the weekly routine. Plain Steps, no HowTo schema (Google retired that rich result in 2023). */}
              <Steps>
                <Step title="Sort by cost descending">14-day lookback.</Step>
                <Step title="Flag zero-conversion terms">Above your Kill threshold.</Step>
                <Step title="Flag qualifying Keep terms">1 or more conversions, not yet exact-match.</Step>
                <Step title="Check the Other Search Terms line">For CPC drift on visible terms.</Step>
                <Step title="Apply Keep / Kill / Watch">And log the review date.</Step>
              </Steps>

              <p style={{ ...paragraphStyle, marginTop: '32px' }}>
                This is the search-terms slice of a fuller review; the complete account audit, including crisis triggers that override a weekly cadence, lives in our{' '}
                <a href="/blog/ppc-audit-checklist" style={linkStyle}>PPC audit checklist</a>.
              </p>

              {/* VISUAL 7: mascot, what the agent does with the same routine */}
              <MascotQuote mascot="sage">
                Scanned 1,140 search terms across 12 ad groups this week. 34 crossed the zero-conversion-at-$40 threshold, 6 qualify as new exact-match keywords, both lists queued in under 4 minutes.
              </MascotQuote>
            </section>

            {/* 9. FAQ */}
            <section id="faq">
              <h2 style={h2Style}>9. FAQ</h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i === faqItems.length - 1 ? 0 : '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{item.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>

            {/* 10. CTA */}
            <section id="cta">
              <h2 style={h2Style}>10. Stop Guessing. Run the Report, Run the Framework.</h2>
              <p style={paragraphStyle}>
                Every account leaks spend to queries nobody chose to bid on. Fixing that doesn&apos;t take a bigger spreadsheet. It takes a repeatable 15-minute review and a framework that turns each term into a decision.
              </p>
              <p style={paragraphStyle}>
                Sage classifies every new search term into Keep, Kill, or Watch automatically, surfaces the list, you approve in two clicks. See plans at <a href="/pricing" style={linkStyle}>pricing</a>, or meet the agent at <a href="/b6#sage" style={linkStyle}>Sage</a>.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Want Keep / Kill / Watch run for you every week?
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Sage reads the search terms report on a schedule, sorts every new query into one of three buckets, and queues the negatives and the promotions for your approval.
                </p>
                <a
                  href="/pricing"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  See pricing
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ul style={{ margin: '0 0 32px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sources.map((s) => (
                  <li key={s.href} style={{ fontSize: '17px', lineHeight: 1.7, color: '#475569' }}>
                    <a href={s.href} style={linkStyle} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                The $0.85 figure is scoped to spend on hidden, non-disclosed queries specifically, not to total account spend. The Keep / Kill / Watch thresholds are our practical operating defaults for a mid-size account, not Google guidance; scale them to your own spend and conversion lag. Buzz and Sage quotes are illustrative of how Kampaio&apos;s agents apply the framework, not audited results from a named advertiser.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-search-terms-report" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
