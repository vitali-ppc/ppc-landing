'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { KeyTakeaways, Callout, BigStat } from '../../../components/blog/primitives';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ai-ads#article',
    headline: 'Google AI Ads: What Google Turned On in Your Account, and What to Keep vs Kill',
    description:
      "Google switched AI on across your ad account: AI Max, ads in AI Overviews and AI Mode, auto-created assets. Here's exactly what each one changes, where the controls are, and our keep-kill-monitor call for every one.",
    image: 'https://www.kampaio.com/og/google-ai-ads.png',
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
    datePublished: '2026-07-14T00:00:00.000Z',
    dateModified: '2026-07-14T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ai-ads',
    },
    keywords:
      'google ai ads, ai max for search, ads in ai overviews, ads in ai mode, text customization, automatically created assets, ads advisor, google ads ai',
    articleSection: 'AI & Automation',
    inLanguage: 'en',
    "wordCount": 2041
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
        name: 'Google AI Ads',
        item: 'https://www.kampaio.com/blog/google-ai-ads',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Google AI ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Six first-party AI features in Search advertising: AI Max, ads in AI Overviews and AI Mode, Text customization, AI-generated creative, and Ads Advisor. Not one product, and not all six change your account the same way.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is $10 a day good for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Depends on cost-per-click and conversion rate, workable for a low-competition niche, thin for anything competitive. A budget question, separate from the AI Max decision this article answers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why did Google Ads charge me $500?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Google bills once you hit your account's billing threshold, commonly $500, regardless of which features are active. Not something AI Max caused.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use AI to run my Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Google's AI features run with your oversight. They don't fully run the account without you. Ads Advisor answers questions but makes no autonomous changes.",
        },
      },
      {
        '@type': 'Question',
        name: 'How do I turn off AI Max for Search?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No documented one-click account-wide off switch exists. What is documented: toggle Text customization off individually (also disables Final URL expansion), and avoid opting new campaigns in.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I opt out of ads in AI Overviews and AI Mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For AI Overviews, no. For AI Mode, not yet documented, treat as unconfirmed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I tell if AI Max is actually working?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Check your search terms report, brand-versus-non-brand split, and CPA/ROAS trend 14 days before and after activation, not Google optimization score.',
        },
      },
      {
        '@type': 'Question',
        name: 'Did Google automatically upgrade my campaigns to AI Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Possibly. Check campaign notifications directly. Confirmed upgrades are scoped to campaigns adopting AI Max, not a blanket account-wide deadline.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are automatically created assets safe for my brand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Can be, with weekly review, not blind trust. Text customization pulls copy from your site, and it isn't always on-brand.",
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'what-it-means', title: 'What "Google AI ads" actually means in your account right now', level: 1 },
    { id: 'control-panel', title: 'The Google AI ads control panel: keep, kill, or monitor', level: 1 },
    { id: 'ai-max', title: 'AI Max for Search: the auto-upgrade and what it changes under the hood', level: 1 },
    { id: 'ai-overviews-mode', title: 'Ads in AI Overviews and AI Mode: can you opt out, and should you?', level: 1 },
    { id: 'assets-creative-advisor', title: 'Automatically created assets, AI creative, and the Ads Advisor', level: 1 },
    { id: 'is-it-working', title: "How to tell if Google's AI is actually working (or quietly burning budget)", level: 1 },
    { id: 'playbook', title: 'Your 30-minute keep-vs-kill playbook', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'bottom-line', title: 'The bottom line: let Google’s AI run, but not unwatched', level: 1 },
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
  const linkStyle: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
  const internalLink: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
  const listStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#1e293b',
    lineHeight: '1.8',
    paddingLeft: '24px',
    marginBottom: '32px',
  };
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
    fontSize: '15px',
  };
  const callCell: React.CSSProperties = { ...tdStyle, fontWeight: 600 };

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
          <ArticleHero slug="google-ai-ads" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              AI &amp; Automation
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google AI Ads: What Google Turned On in Your Account, and What to Keep vs Kill
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Six AI ad features are live in your account, some switched on without asking. One quietly reroutes your budget. Here is the keep, kill, or monitor call for every surface.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 14, 2026 · 13 min read</span>
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
            <section>
              <p style={para}>
                Google AI ads are six separate first-party features Google has switched on inside Search: AI Max for Search, ads in AI Overviews, ads in AI Mode, Text customization, AI-generated creative, and the Gemini-based Ads Advisor. Some just add reach. One can quietly rewrite where your budget goes.
              </p>

              {/* VISUAL 1: KeyTakeaways (structural) */}
              <KeyTakeaways
                title="TL;DR"
                items={[
                  <>Google switched on several AI ad features in your account, <strong>some without asking</strong>.</>,
                  <>The one that actually matters is <strong>AI Max for Search</strong>. It pulls broad match settings and Text customization in with it.</>,
                  <>Ads now show up inside <strong>AI Overviews and AI Mode</strong> too, and there is no opt-out.</>,
                  <>You don&apos;t need to kill everything. Keep the reach, tighten brand and URL controls, review Text customization weekly.</>,
                  <>Scroll to the control panel for a <strong>keep, kill, or monitor</strong> call on every surface.</>,
                ]}
              />
            </section>

            {/* What it means */}
            <section id="what-it-means">
              <h2 style={h2}>What &quot;Google AI ads&quot; actually means in your account right now</h2>
              <p style={para}>
                &quot;Google AI ads&quot; isn&apos;t one product. It&apos;s six separate first-party AI features Google has built into Search, all live in some form as of July 2026.
              </p>
              <p style={para}>
                In April 2026, an account attributed to Google Ads stated that broad match settings and automatically created assets would auto-upgrade to AI Max (<a href="https://x.com/GoogleAds/status/2044521149699174549" style={linkStyle} target="_blank" rel="noopener noreferrer">X/@GoogleAds, 2026-04-15</a>). PPC marketer @iamgalba put the reaction bluntly: &quot;Google quietly handed Smart Bidding permission to bid on queries you never targeted&quot; (<a href="https://x.com/iamgalba/status/2071709794390729181" style={linkStyle} target="_blank" rel="noopener noreferrer">X/@iamgalba, 2026-06-29</a>). That&apos;s the feeling you get opening your account and finding this already switched on. Fair reaction. Also fixable. You don&apos;t need to disable everything to get control back.
              </p>
              <p style={para}>The six surfaces, named as of July 2026:</p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}><strong>AI Max for Search:</strong> bundles search term matching, broad-match-style expansion, Text customization, and final URL expansion into one campaign toggle.</li>
                <li style={{ marginBottom: '16px' }}><strong>Ads in AI Overviews:</strong> ads now appear inside Google&apos;s AI-generated summary boxes.</li>
                <li style={{ marginBottom: '16px' }}><strong>Ads in AI Mode:</strong> newest surface, rolling out through 2026, inside Google&apos;s conversational Search.</li>
                <li style={{ marginBottom: '16px' }}><strong>Automatically created assets</strong>, renamed <strong>Text customization</strong> (<a href="https://support.google.com/google-ads/answer/16489313" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, answer/16489313</a>): Google auto-writes headlines and descriptions from your site.</li>
                <li style={{ marginBottom: '16px' }}><strong>AI-generated ad creative:</strong> fully AI-produced video ads, built with Veo.</li>
                <li style={{ marginBottom: 0 }}><strong>Ads Advisor:</strong> Gemini-based chat assistant in the Ads UI, in beta.</li>
              </ol>
              <p style={para}>
                Not all six deserve the same reaction. AI Overviews and AI Mode are just new places your ad might show up. They don&apos;t change how you manage a campaign. AI Max and Text customization are different. They change what your account actually does under the hood, and those two are worth the close reading below.
              </p>
            </section>

            {/* Control panel */}
            <section id="control-panel">
              <h2 style={h2}>The Google AI ads control panel: keep, kill, or monitor</h2>
              <p style={para}>
                Here&apos;s the decision grid: what each feature is, what it silently changes, its default status, where the control lives, and our call. Deciding feature by feature is one route; handing the whole account to <a href="/ai-google-ads-management" style={linkStyle}>AI management with the controls kept visible</a> is the other.
              </p>

              {/* VISUAL 2: keep/kill decision table (extractable HTML) */}
              <ResponsiveTable
                headers={['AI feature', 'What it is', 'What it silently changes', 'Default', 'Control location', 'Our call']}
                rows={[
                  [
                    'AI Max for Search',
                    'Bundles search term matching, query expansion, text customization, final URL expansion',
                    "Expands matched search terms, sometimes past what you'd bid on manually",
                    'ON for new Search campaigns; existing broad match being upgraded',
                    'Campaign Settings > AI Max panel',
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>Monitor. Audit search terms weekly.</span>,
                  ],
                  [
                    'Final URL expansion',
                    'Lets Google send clicks to any relevant URL on your domain',
                    'Can route a click away from the landing page you built',
                    <>ON with AI Max (<a href="https://support.google.com/google-ads/answer/15910187" style={linkStyle} target="_blank" rel="noopener noreferrer">answer/15910187</a>)</>,
                    'AI Max panel, uncheck individually',
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>Kill or restrict if a specific path must stay protected.</span>,
                  ],
                  [
                    'Text customization (formerly auto-created assets)',
                    'Google auto-writes headlines/descriptions from your site',
                    <>Toggling off also disables Final URL expansion (<a href="https://support.google.com/google-ads/answer/16230205" style={linkStyle} target="_blank" rel="noopener noreferrer">answer/16230205</a>)</>,
                    'ON by default',
                    'AI Max panel > Text customization',
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>Monitor. Review assets weekly for off-brand copy.</span>,
                  ],
                  [
                    'Ads in AI Overviews',
                    'Ad shown inside an AI-generated summary box',
                    <>Reports only as generic &quot;Top Ads,&quot; no segmented data (<a href="https://support.google.com/google-ads/answer/16297775" style={linkStyle} target="_blank" rel="noopener noreferrer">answer/16297775</a>)</>,
                    'ON, no opt-out',
                    'Not a toggle, controlled via campaign eligibility',
                    <span style={{ color: '#10b981', fontWeight: 600 }}>Keep, don&apos;t trust the dashboard alone.</span>,
                  ],
                  [
                    'Ads in AI Mode',
                    'Ad shown inside conversational Search',
                    'Newest surface, thinner documentation than AI Overviews',
                    'ON where eligible',
                    'Same as above, no opt-out documented',
                    <span style={{ color: '#10b981', fontWeight: 600 }}>Keep and watch. Reach, not a lever.</span>,
                  ],
                  [
                    'AI-generated ad creative (Veo)',
                    'Fully AI-generated video ad assets',
                    'Nothing forced, opt-in only',
                    'OFF unless generated',
                    'Asset Studio',
                    <span style={{ color: '#764ba2', fontWeight: 600 }}>Optional. Try, don&apos;t depend on it.</span>,
                  ],
                  [
                    'Ads Advisor (Gemini beta)',
                    'Chat assistant in the Ads UI',
                    'Nothing, answers questions, no autonomous changes',
                    'Opt-in usage',
                    'Ads UI, Advisor panel',
                    <span style={{ color: '#10b981', fontWeight: 600 }}>Keep as reference, not decision-maker.</span>,
                  ],
                ]}
              />

              {/* VISUAL 3: MascotQuote - Aegis (risk, concrete number) */}
              <MascotQuote mascot="aegis">
                One advertiser reported 50,000 new search terms after turning on AI Max, in the very early launch days (<a href="https://www.reddit.com/r/PPC/comments/1up57qo/turned_on_ai_max_and_saw_50k_search_terms_in_a/" style={linkStyle} target="_blank" rel="noopener noreferrer">Reddit r/PPC, 2026-07-06</a>). Not a reason to kill AI Max outright. A reason to pull your search terms report this week.
              </MascotQuote>

              <p style={para}>
                Every row here ties back to a documented default or a real account number. Nothing on this list is a guess.
              </p>
            </section>

            {/* AI Max */}
            <section id="ai-max">
              <h2 style={h2}>AI Max for Search: the auto-upgrade and what it changes under the hood</h2>
              <p style={para}>
                AI Max for Search bundles search term matching (broader than plain broad match), Text customization, Final URL expansion, and new controls including brand controls into one campaign-level setting.
              </p>
              <p style={para}>
                Here&apos;s the part causing the panic: in April 2026, an account attributed to Google Ads said broad match settings and automatically created assets would auto-upgrade into AI Max (<a href="https://x.com/GoogleAds/status/2044521149699174549" style={linkStyle} target="_blank" rel="noopener noreferrer">X/@GoogleAds, 2026-04-15</a>). Google&apos;s own documentation is narrower than that tweet. Text customization, Brand settings, and Broad match get upgraded once a campaign activates AI Max (<a href="https://support.google.com/google-ads/answer/15910187" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, answer/15910187</a>), scoped to campaigns adopting it, not a confirmed account-wide deadline. Check your campaign notifications for the exact date on your own account. And Google doesn&apos;t name Dynamic Search Ads as something AI Max replaces, whatever a forum thread out there claims.
              </p>
              <p style={para}>
                Brand controls moved under AI Max for new search campaigns in July 2025 (<a href="https://x.com/sengineland/status/1946196843462889872" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, 2025-07-18</a>), which makes it the most important control to set before you let AI Max run:
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}><strong>Set brand exclusions before further spend</strong>, so AI Max can&apos;t inflate cost-per-click on brand traffic you&apos;d get free.</li>
                <li style={{ marginBottom: '16px' }}><strong>Audit search term matching weekly for the first month</strong>, add negatives fast.</li>
                <li style={{ marginBottom: 0 }}><strong>Check Final URL expansion.</strong> If a landing page is tied to a specific offer, uncheck expansion for that campaign, don&apos;t let Google reroute the click to your homepage instead.</li>
              </ol>
              <p style={para}>
                The trade-off is real, not a hedge: AI Max lifts coverage on low-volume keywords, and it spends on terms you&apos;d never choose yourself. Both are true at once. Our call: monitor, not blind kill. See <a href="/blog/google-ads-ai-vs-manual-bidding" style={internalLink}>AI Max bidding mechanics</a> for the bidding side. On the query side, see <a href="/blog/google-ads-keyword-match-types-explained" style={internalLink}>how match types changed</a>.
              </p>
            </section>

            {/* AI Overviews and AI Mode */}
            <section id="ai-overviews-mode">
              <h2 style={h2}>Ads in AI Overviews and AI Mode: can you opt out, and should you?</h2>
              <p style={para}>
                Ads in AI Overviews and AI Mode are new places your ad can show up, not new campaign types you need to build. Ads above or below an AI Overview work for Search, Shopping, Performance Max, and App; ads inside the Overview itself are narrower, Search, Shopping, and Performance Max only (<a href="https://support.google.com/google-ads/answer/16297775" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, answer/16297775</a>).
              </p>
              <p style={para}>
                Here&apos;s the honest answer on opt-out: there isn&apos;t one. Google&apos;s own FAQ confirms advertisers can&apos;t directly target or opt out of placement inside AI Overviews (<a href="https://support.google.com/google-ads/answer/16297775" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, answer/16297775</a>). In-AIO ads currently run in English only, across 12 countries including the US, &quot;early stages&quot; by Google&apos;s own description. Sensitive categories (adult, alcohol, gambling, finance, healthcare, politics) are excluded from the surface entirely.
              </p>

              {/* VISUAL 4: Callout warning - measurement risk */}
              <Callout variant="warning" title="The real risk is measurement, not placement">
                Ads inside an AI Overview report only as generic &quot;Top Ads,&quot; with no segmented data underneath. You can&apos;t pull a clean ROAS for the Overview versus everywhere else, so you can&apos;t see if this surface is helping or just absorbing spend.
              </Callout>

              <p style={para}>
                Ads in AI Mode are newer still, confirmed live mostly through practitioner sightings rather than a documented eligibility page (<a href="https://x.com/brodieseo/status/1991711614975029298" style={linkStyle} target="_blank" rel="noopener noreferrer">X/@brodieseo, 2026</a>). Same treatment applies: more reach, thinner documentation, and the same lack of segmented reporting.
              </p>
              <p style={para}>
                Our call: keep both, it&apos;s reach you were already eligible for. Watch whether wasted spend climbs after launch, and whether your own brand-term traffic gets cannibalized by an AI summary instead of the ad copy you actually wrote.
              </p>
            </section>

            {/* Assets, creative, advisor */}
            <section id="assets-creative-advisor">
              <h2 style={h2}>Automatically created assets, AI creative, and the Ads Advisor</h2>
              <p style={para}>
                Automatically created assets is the older name. Google&apos;s current name is Text customization, and what it does hasn&apos;t changed: Google auto-writes headlines and descriptions from your site, and can auto-generate brand logos through the related Dynamic business information setting (<a href="https://support.google.com/google-ads/answer/12158267" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, answer/12158267</a>).
              </p>
              <p style={para}>
                The brand-safety risk here is straightforward. Google generates copy from whatever it finds crawling your site, and a generated headline can be technically accurate and still completely off-brand. Treat generated assets like a junior copywriter&apos;s first draft: review weekly, pause anything that doesn&apos;t sound like you.
              </p>
              <p style={para}>
                AI-generated ad creative pushes this further still, fully AI-produced video built with Veo. Google Creative Lab co-founder Robert Wong described the process as going &quot;drunk on AI&quot; (<a href="https://www.theverge.com/news/811263/this-is-googles-first-entirely-ai-generated-ad" style={linkStyle} target="_blank" rel="noopener noreferrer">The Verge, 2025-10-31</a>). Optional, worth testing, not pushed into existing campaigns by default.
              </p>
              <p style={para}>
                Ads Advisor, the newest named feature as of this writing, is a Gemini-based chat assistant in the Ads UI, in beta. Useful for fast questions, not an autopilot making account-safe changes. Treat it like any <a href="/blog/chatgpt-google-ads" style={internalLink}>AI copilot layered on Google Ads</a>: it answers, it doesn&apos;t decide.
              </p>
              <p style={para}>
                Our call: Text customization gets monitored weekly. AI-generated video is optional. Ads Advisor is a reference tool, not a decision-maker.
              </p>
            </section>

            {/* Is it working */}
            <section id="is-it-working">
              <h2 style={h2}>How to tell if Google&apos;s AI is actually working (or quietly burning budget)</h2>
              <p style={para}>
                Don&apos;t judge AI Max by Google&apos;s <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization</a> score or that &quot;recommended&quot; label sitting in your dashboard. Judge it by your search terms report, your brand-versus-non-brand split, and the CPA or ROAS trend across the two weeks before and after any upgrade.
              </p>

              {/* VISUAL 5: BigStat - the 14% conversions figure (bold-viz) */}
              <BigStat
                value="14%"
                label="more conversions (Google's own figure)"
                claim="is what advertisers who activate AI Max in Search typically see at a similar CPA or ROAS, per Google. It's self-reported, non-Retail advertisers only, and not an independent audit. Real accounts don't always match it."
                source="Source: Google Ads Help, answer/15910366, Google internal data, 2025, non-Retail advertisers only"
              />

              <p style={para}>
                Real accounts don&apos;t always match it. One advertiser put it bluntly: &quot;AI Max has been a total waste of money. I was charged for keywords that have nothing to do with my business&quot; (<a href="https://www.reddit.com/r/googleads/comments/1ufyx66/my_experience_using_ai_max/" style={linkStyle} target="_blank" rel="noopener noreferrer">Reddit r/googleads, 2026-06-26</a>). Another hit the opposite failure, &quot;accidentally blocking our primary generic search terms through limiting AI Max to unbranded searches&quot; (<a href="https://www.reddit.com/r/PPC/comments/1ug3iyp/fail_ai_max_may_treat_generic_search_terms_as/" style={linkStyle} target="_blank" rel="noopener noreferrer">Reddit r/PPC, 2026-06-26</a>). Both are real. Both are useful precisely because they contradict the tidy 14% headline.
              </p>
              <p style={para}>Four checks, 15 minutes total:</p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}><strong>Pull the search terms report.</strong> Count new, unvetted categories AI Max added.</li>
                <li style={{ marginBottom: '16px' }}><strong>Split brand versus non-brand.</strong> Check whether AI Max spends against your own brand terms.</li>
                <li style={{ marginBottom: '16px' }}><strong>Compare CPA or ROAS, 14 days before versus after.</strong> Don&apos;t judge it on 3 days of data.</li>
                <li style={{ marginBottom: 0 }}><strong>Compare impression share in new surfaces against actual conversions</strong>, not just impressions.</li>
              </ol>
              <p style={para}>
                Google Ads Liaison published a guide on exactly this in late 2025 (<a href="https://x.com/adsliaison/status/1991163354786693132" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Liaison, &quot;How To Tell If AI Max for Search Is Working For You,&quot; 2025-11-19</a>). Worth reading alongside your own numbers, not instead of them.
              </p>

              {/* VISUAL 6: MascotQuote - Buzz (bidding, concrete number) */}
              <MascotQuote mascot="buzz">
                Fourteen days is the floor, not a suggestion. I&apos;ve watched accounts panic-kill AI Max on day 3 because non-brand spend ticked up, then miss conversions were still climbing by day 10. Pull the search terms report first. If new terms are genuinely irrelevant, cap match expansion and negative them out. If they&apos;re just unfamiliar, give it the full two weeks.
              </MascotQuote>
            </section>

            {/* Playbook */}
            <section id="playbook">
              <h2 style={h2}>Your 30-minute keep-vs-kill playbook</h2>
              <p style={para}>
                Don&apos;t disable everything in a panic. Don&apos;t leave everything running unattended either. Budget about 30 minutes total.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}><strong>Check campaign notifications first.</strong> Google flags which campaigns already auto-upgraded, and when.</li>
                <li style={{ marginBottom: '16px' }}><strong>Set brand controls under AI Max</strong>, in Campaign Settings. The single most effective 5-minute fix on this list.</li>
                <li style={{ marginBottom: '16px' }}><strong>Open the search terms report and audit it.</strong> Add negatives for anything irrelevant.</li>
                <li style={{ marginBottom: '16px' }}><strong>Review Text customization assets.</strong> Pause any headline that doesn&apos;t match your brand voice.</li>
                <li style={{ marginBottom: '16px' }}><strong>Segment reporting</strong> around AI Overviews and AI Mode where possible, knowing &quot;Top Ads&quot; aggregation limits how granular you can get.</li>
                <li style={{ marginBottom: 0 }}><strong>Set a 14-day calendar reminder</strong> to re-check CPA, ROAS, and search terms.</li>
              </ol>
              <p style={para}>
                The one-line version: keep AI Max on monitor, keep the reach, tighten brand and URL controls now, and review Text customization weekly.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2}>FAQ</h2>

              <h3 style={h3}>What are Google AI ads?</h3>
              <p style={para}>Six first-party AI features in Search advertising: AI Max, ads in AI Overviews and AI Mode, Text customization, AI-generated creative, and Ads Advisor. Not one product, and not all six change your account the same way.</p>

              <h3 style={h3}>Is $10 a day good for Google Ads?</h3>
              <p style={para}>Depends on cost-per-click and conversion rate, workable for a low-competition niche, thin for anything competitive. A budget question, separate from the AI Max decision this article answers.</p>

              <h3 style={h3}>Why did Google Ads charge me $500?</h3>
              <p style={para}>Google bills once you hit your account&apos;s billing threshold, commonly $500, regardless of which features are active. Not something AI Max caused.</p>

              <h3 style={h3}>Can I use AI to run my Google Ads?</h3>
              <p style={para}>Google&apos;s AI features run with your oversight. They don&apos;t fully run the account without you. Ads Advisor answers questions but makes no autonomous changes.</p>

              <h3 style={h3}>How do I turn off AI Max for Search?</h3>
              <p style={para}>No documented one-click account-wide off switch exists. What&apos;s documented: toggle Text customization off individually (also disables Final URL expansion), and avoid opting new campaigns in.</p>

              <h3 style={h3}>Can I opt out of ads in AI Overviews and AI Mode?</h3>
              <p style={para}>For AI Overviews, no (<a href="https://support.google.com/google-ads/answer/16297775" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, answer/16297775</a>). For AI Mode, not yet documented, treat as unconfirmed.</p>

              <h3 style={h3}>How do I tell if AI Max is actually working?</h3>
              <p style={para}>Check your search terms report, brand-versus-non-brand split, and CPA/ROAS trend 14 days before and after activation, not Google&apos;s <a href="/blog/google-ads-optimization-score" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization score</a>.</p>

              <h3 style={h3}>Did Google automatically upgrade my campaigns to AI Max?</h3>
              <p style={para}>Possibly. Check campaign notifications directly. Confirmed upgrades are scoped to campaigns adopting AI Max, not a blanket account-wide deadline.</p>

              <h3 style={h3}>Are automatically created assets safe for my brand?</h3>
              <p style={para}>Can be, with weekly review, not blind trust. Text customization pulls copy from your site, and it isn&apos;t always on-brand.</p>
            </section>

            {/* Bottom line */}
            <section id="bottom-line">
              <h2 style={h2}>The bottom line: let Google&apos;s AI run, but not unwatched</h2>
              <p style={para}>
                Google&apos;s AI ad features aren&apos;t the enemy here, and they aren&apos;t an autopilot you should trust blindly either. The right move is a deliberate keep-or-kill call per feature, then ongoing monitoring of what each one actually changes.
              </p>
              <p style={para}>
                Checking search terms, reviewing Text customization assets, watching AI Max&apos;s query expansion, catching brand cannibalization, doing all of it by hand every 14 days, is work most DTC owners simply don&apos;t have the hours for. You&apos;re running the store, not auditing search term reports on a Sunday.
              </p>
              <p style={para}>
                That&apos;s what Kampaio is built for. Not a replacement for Google&apos;s AI, a layer that watches it: flags when AI Max or Performance Max spend on search terms that don&apos;t fit, catches off-brand Text customization assets before they run, alerts you when non-brand CPA jumps after an upgrade you never asked for. Google&apos;s AI runs the account. Kampaio watches it so you don&apos;t have to. Compare plans at <a href="/pricing" style={linkStyle}>Kampaio pricing</a>. See how this differs from a fully <a href="/blog/google-ads-ai-agent" style={internalLink}>autonomous third-party AI agent</a> managing the account end to end.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '48px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Let Google&apos;s AI run. Kampaio watches every move.
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  Free while B6 is in beta. Kampaio flags AI Max query drift, off-brand assets, and post-upgrade CPA jumps, with oversight on every action.
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
                  See how Kampaio works
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#64748b', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '40px' }}>
                Results may vary. This article is informational and does not constitute professional advice. Verify all figures and settings against your own account data before making budget decisions.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ai-ads" category="ai" />
        <Footer compact={true} />
      </div>
    </>
  );
}
