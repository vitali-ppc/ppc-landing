'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import {
  Callout,
  ColumnBuckets,
  DonutStat,
  KeyTakeaways,
  SignalStack,
} from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const FULL_TITLE =
    'Performance Max Negative Keywords: Account vs Campaign vs List Level, Real Limits, and When They Actually Help (2026)';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/performance-max-negative-keywords#article',
    headline: FULL_TITLE,
    description:
      'Where PMax negative keywords apply (account, campaign, list level), the current caps, how they interact with Smart Bidding and AI Max, and a clear-eyed look at when they help versus when Smart Bidding already has it covered.',
    image: 'https://www.kampaio.com/og/performance-max-negative-keywords.png',
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
    datePublished: '2026-08-05T00:00:00.000Z',
    dateModified: '2026-08-05T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/performance-max-negative-keywords',
    },
    keywords:
      'performance max negative keywords, pmax negative keywords, campaign level negative keywords, negative keyword list, account level negatives, negative keyword precedence, smart bidding, ai max, performance max search terms',
    inLanguage: 'en',
    "wordCount": 1436,
    "articleSection": "Google Ads"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I add negative keywords to Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Account-level negatives apply automatically to all Search and Shopping inventory, and explicit control now exists at both campaign level (up to 10,000 terms) and shared list level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the disadvantages of using Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Placement-level transparency stays limited, query-level reporting is restricted compared to standard Search campaigns, and negative keywords only reach Search and Shopping inventory. Advertisers trade control for automation, and negatives alone do not reverse that trade.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an example of a negative keyword?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Category-level exclusions such as "jobs", "free", "diy", or "[competitor brand] reviews". Single-term negatives work too, but category-based exclusions cover more wasted spend with less ongoing maintenance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Performance Max have keywords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not in the traditional Search-campaign sense. Performance Max targets through asset groups, audience signals, and automated matching rather than advertiser-chosen keywords and match types; negative keywords are the one keyword-level control advertisers still retain.',
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
        name: FULL_TITLE,
        item: 'https://www.kampaio.com/blog/performance-max-negative-keywords',
      },
    ],
  };

  const tableOfContents = [
    { id: 'short-answer', title: 'The Short Answer (Where Negatives Apply, What They Cost You to Set Up)', level: 1 },
    { id: 'precedence-stack', title: 'Account-Level, Campaign-Level, List-Level: The Precedence Stack', level: 1 },
    { id: 'real-limits', title: 'The Real Limits in 2026 (and Why They Matter More Than You Think)', level: 1 },
    { id: 'smart-bidding-conflict', title: 'Does This Conflict With Smart Bidding (and AI Max)?', level: 1 },
    { id: 'starter-list', title: 'A Starter Negative Keyword List (and How to Find Your Own)', level: 1 },
    { id: 'what-negatives-dont-fix', title: "What Performance Max Doesn't Let You Fix With Negatives", level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Where B6 Fits (Automating Negative-List Maintenance, Not Replacing the Judgment)', level: 1 },
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

  const googleHelpUrl = 'https://support.google.com/google-ads/answer/15726455';
  const analyzifyUrl = 'https://analyzify.com/hub/negative-keywords-in-performance-max-campaigns';
  const lunioUrl = 'https://www.lunio.ai/blog/pmax-campaign-level-negative-keywords';
  const nilsUrl = 'https://nilsrooijmans.com/how-to-add-negative-keywords-to-your-performance-max-campaigns/';
  const microsoftUrl =
    'https://about.ads.microsoft.com/en/blog/post/march-2026/negative-keywords-for-pmax-and-other-product-news-for-march-2026';
  const liaisonUrl = 'https://x.com/adsliaison/status/1970531705128919106';
  const lolkUrl = 'https://x.com/AndrewLolk/status/1927292123109376090';

  const ext = (href: string, label: string) => (
    <a href={href} style={linkStyle} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );

  const faqItems = [
    {
      q: 'Can I add negative keywords to Performance Max?',
      a: (
        <>
          Yes. Account-level negatives apply automatically to all Search and Shopping inventory, and explicit control now exists at both
          campaign level (up to 10,000 terms, {ext(analyzifyUrl, 'analyzify.com')}/{ext(lunioUrl, 'lunio.ai')}) and shared list level.
        </>
      ),
    },
    {
      q: 'What are the disadvantages of using Performance Max?',
      a: (
        <>
          Placement-level transparency stays limited, query-level reporting is restricted compared to standard Search campaigns, and negative
          keywords only reach Search and Shopping inventory ({ext(googleHelpUrl, 'support.google.com/answer/15726455')}). Advertisers trade
          control for automation, and negatives alone do not reverse that trade.
        </>
      ),
    },
    {
      q: 'What is an example of a negative keyword?',
      a: (
        <>
          Category-level exclusions such as &quot;jobs,&quot; &quot;free,&quot; &quot;diy,&quot; or &quot;[competitor brand] reviews&quot;
          (see the starter list above). Single-term negatives work too, but category-based exclusions cover more wasted spend with less
          ongoing maintenance.
        </>
      ),
    },
    {
      q: 'Does Performance Max have keywords?',
      a: (
        <>
          Not in the traditional Search-campaign sense. Performance Max targets through asset groups, audience signals, and automated
          matching rather than advertiser-chosen keywords and match types; negative keywords are the one keyword-level control advertisers
          still retain.
        </>
      ),
    },
  ];

  const sources = [
    {
      label: 'Google Ads Help. "About negative keywords in Performance Max campaigns." support.google.com, fetched 2026-08-05.',
      href: googleHelpUrl,
    },
    {
      label: 'Atasoy, Ismail. "Negative Keywords in Performance Max Campaigns." analyzify.com, updated 2025-07-24.',
      href: analyzifyUrl,
    },
    {
      label: 'Harris, Ben. "Performance Max Campaign-Level Negative Keywords." lunio.ai, updated 2025-09-16.',
      href: lunioUrl,
    },
    {
      label: 'Rooijmans, Nils. "How to Add Negative Keywords to Your Performance Max Campaigns." nilsrooijmans.com, updated 2025-05-02.',
      href: nilsUrl,
    },
    {
      label: 'Microsoft Advertising. "Negative keywords for PMax and other product news for March 2026." about.ads.microsoft.com, 2026-03-17.',
      href: microsoftUrl,
    },
    { label: 'Google Ads Liaison (@adsliaison). X post, 2025-09-23.', href: liaisonUrl },
    { label: 'Lolk, Andrew (@AndrewLolk). X post, 2025-05-27.', href: lolkUrl },
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
          <ArticleHero slug="performance-max-negative-keywords" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads &middot; Performance Max
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Performance Max Negative Keywords: Account vs Campaign vs List Level, Real Limits, and When They Actually Help (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Negatives apply at three levels in Performance Max, all of them Search and Shopping only. Here is where each one belongs, what
              the current caps really are, and when Smart Bidding has already done the job for you.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>August 5, 2026 &middot; 9 min read</span>
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
                Performance Max negative keywords apply at three levels: automatic account-level exclusions, explicit campaign-level lists,
                and shared negative keyword lists attached to many campaigns at once. All three reach Search and Shopping inventory only,
                never the Display, YouTube, or Discovery placements Performance Max also uses.
              </p>
            </section>

            {/* Short answer */}
            <section id="short-answer">
              <h2 style={h2Style}>The Short Answer (Where Negatives Apply, What They Cost You to Set Up)</h2>
              <p style={paragraphStyle}>
                Account-level negatives apply automatically across every campaign, at no setup cost beyond the initial list. Campaign-level
                negatives are explicit: added inside a single PMax campaign, with a cap far above the 100-term ceiling Google shipped at
                launch (details below). Negative keyword lists sit above both: build one list, attach it to many campaigns, and updates apply
                everywhere at once.
              </p>

              {/* VISUAL 1: front-loaded summary */}
              <KeyTakeaways
                items={[
                  'Three levels: account (automatic), campaign (explicit), shared list (build once, attach many)',
                  'All three reach Search and Shopping inventory only, never Display, YouTube, or Discovery',
                  'Campaign-level cap is 10,000 terms, up from the 100-term ceiling at launch',
                  'Campaign-level negatives are not new: they rolled out across December 2024 and January 2025',
                  'Most value while a campaign is still building signal, least value once Smart Bidding has converged',
                ]}
              />

              <p style={paragraphStyle}>
                None of this is a new feature, whatever your X feed suggests. Google began rolling campaign-level negatives into Performance
                Max around December 2024 and early 2025, and the mechanics have been stable since. Recent chatter framing campaign-level
                negatives as &quot;just arrived&quot; in PMax is treating an eighteen-month-old rollout as breaking news; the timeline below
                shows why that framing does not hold up. In our own scan of 103 recent public discussions, &quot;negative keyword&quot; setup
                was the single most-raised theme (21%), just ahead of broad match questions (17%). The real question in 2026 is not whether
                negatives exist in PMax, it is where to place them.
              </p>
            </section>

            {/* Precedence stack */}
            <section id="precedence-stack">
              <h2 style={h2Style}>Account-Level, Campaign-Level, List-Level: The Precedence Stack</h2>
              <p style={paragraphStyle}>
                Performance Max checks negative keywords at three levels, and they stack rather than override each other: account-level
                exclusions apply first and everywhere, campaign-level negatives add campaign-specific blocks on top, and list-level negatives
                let one shared set cover many campaigns without duplicate entry.
              </p>
              <p style={{ ...paragraphStyle, marginBottom: '8px', fontWeight: 600 }}>
                How PMax negative keywords apply, by level:
              </p>

              {/* VISUAL 2: the limits table */}
              <ResponsiveTable
                headers={['Level', 'Who applies it', 'Current limit', 'Applies to', 'Scope']}
                rows={[
                  [
                    'Account-level',
                    'Automatic account-wide setting',
                    'Applies globally, not user-capped per campaign',
                    'Every campaign in the account, including all PMax campaigns',
                    'Search and Shopping inventory only',
                  ],
                  [
                    'Campaign-level',
                    'Advertiser, inside a single PMax campaign',
                    // Cells are flex items in ResponsiveTable's mobile card layout, so
                    // multi-node content must be wrapped in a single element to stay inline.
                    <span key="limit-campaign">
                      10,000 keywords per campaign ({ext(analyzifyUrl, 'analyzify.com')}, updated 2025-07-24; corroborated by{' '}
                      {ext(lunioUrl, 'lunio.ai')}, updated 2025-09-16)
                    </span>,
                    'One campaign at a time',
                    'Search and Shopping inventory only',
                  ],
                  [
                    'Negative keyword list',
                    'Advertiser, built once and attached',
                    <span key="limit-list">
                      Reportedly 5,000 keywords per list (Google Ads Liaison, {ext(liaisonUrl, 'X')}, 2025-09-23)
                    </span>,
                    'Up to 1,000 campaigns per list, as reported',
                    'Search and Shopping inventory only',
                  ],
                ]}
              />

              <p style={paragraphStyle}>
                An account-level negative blocks a query everywhere, even if nobody added it to a specific campaign. Campaign-level and
                list-level negatives then narrow further, and both behave the same way operationally: a term on either excludes that
                campaign&apos;s PMax traffic from matching it. The real difference is maintenance. A campaign-level list has to be rebuilt in
                every campaign; a shared list updates once. That is why the negative keyword precedence order in practice runs account, then
                list, then campaign once an account runs more than two or three PMax campaigns with overlapping intent. For standard
                Search-campaign exclusion types, see <a href="/blog/google-ads-negative-keywords" style={linkStyle}>Google Ads negative keywords</a>;
                this precedence stack is one layer of the broader discipline in{' '}
                <a href="/blog/google-ads-optimization" style={linkStyle}>Google Ads optimization</a>.
              </p>

              {/* VISUAL 3: the precedence order as stacked layers */}
              <SignalStack
                layers={[
                  { title: 'Account-level exclusions', desc: 'Automatic, apply first, cover every campaign in the account.' },
                  {
                    title: 'Shared negative keyword lists',
                    desc: 'Built once, attached to many campaigns, updated in one place. The maintenance win.',
                    highlight: true,
                    badge: 'Best default',
                  },
                  { title: 'Campaign-level negatives', desc: 'Explicit, campaign-specific, rebuilt manually in every campaign that needs them.' },
                ]}
                caption="Precedence in practice once an account runs more than two or three PMax campaigns with overlapping intent"
              />

              <MascotQuote mascot="sage">
                Before adding a single negative, pull 90 days from the search terms report and group by intent, not by individual query. One
                bad category (job seekers, DIY searchers) beats fifty one-off negatives typed in one at a time.
              </MascotQuote>
            </section>

            {/* Real limits */}
            <section id="real-limits">
              <h2 style={h2Style}>The Real Limits in 2026 (and Why They Matter More Than You Think)</h2>
              <p style={{ ...paragraphStyle, marginTop: '32px' }}>
                The campaign-level cap now sits at 10,000 negative keywords per campaign, up from the 100-term ceiling Google shipped at
                launch ({ext(analyzifyUrl, 'analyzify.com')}, updated 2025-07-24; corroborated by {ext(lunioUrl, 'lunio.ai')}, updated
                2025-09-16). That jump matters: 100 terms barely covers the obvious exclusions (jobs, DIY, review sites); 10,000 supports a
                genuinely category-organized list.
              </p>
              <p style={paragraphStyle}>
                Two dated milestones bracket the rollout. Ginny Marvin&apos;s original announcement confirmed campaign-level negatives extend
                to both Search and Shopping components. Self-serve campaign-level negatives became fully available in the standard Google Ads
                interface on January 23, 2025, replacing the older Performance Max Campaign Modification Request Form workflow (
                {ext(analyzifyUrl, 'analyzify.com')}). Practitioner experience lagged: as of {ext(nilsUrl, 'nilsrooijmans.com')}&apos;s May 2,
                2025 update, the same feature was reportedly &quot;still in Beta&quot; for many accounts. Rollout dates and felt availability
                are not the same thing. Check your own account rather than assume the feature is live everywhere.
              </p>
              <p style={paragraphStyle}>
                The newest milestone is not from Google. Microsoft Advertising rolled negative keywords out to its own PMax equivalent
                globally in March 2026, with a 5,000-keyword list cap and the identical Search/Shopping-only scope (
                {ext(microsoftUrl, 'about.ads.microsoft.com')}, 2026-03-17). This is no longer a Google-only capability.
              </p>
            </section>

            {/* Smart Bidding conflict */}
            <section id="smart-bidding-conflict">
              <h2 style={h2Style}>Does This Conflict With Smart Bidding (and AI Max)?</h2>
              <p style={paragraphStyle}>
                Negative keywords earn their keep when a campaign&apos;s conversion volume is still building, or when a category is clearly
                off-brand or off-intent regardless of what Smart Bidding is doing with the data. They add diminishing value once a campaign is
                stable on Target ROAS or Target CPA with strong conversion volume, because Smart Bidding is already discounting most of the
                same bad queries the negative list would block.
              </p>
              <p style={paragraphStyle}>
                PPC <a href="/blog/google-ads-consultant" style={{ color: '#764ba2', textDecoration: 'underline' }}>consultant</a> Andrew Lolk made the sharper version of this case publicly ({ext(lolkUrl, 'X')}, 2025-05-27): Smart Bidding
                already discounts low-quality queries algorithmically, so manually blocking them is often redundant, and can strip out signal
                Smart Bidding was using to learn. Lolk is right about mature campaigns: a PMax campaign converged on Target ROAS with a
                healthy weekly conversion count has already told Smart Bidding which query patterns convert, and a negative list on top mostly
                formalizes decisions the algorithm made weeks ago.
              </p>
              <p style={paragraphStyle}>
                Lolk is less right about campaigns still building signal. Early in a campaign&apos;s life, or after a budget or goal change
                resets the learning period, Performance Max explores more broadly, and off-intent categories (jobs, free, DIY, competitor
                brand terms) can burn budget before Smart Bidding has enough conversions to discount them on its own. That is when a short,
                category-based negative list does real work. AI Max raises the same tension at higher intensity. It broadens match and
                creative automation further, which strengthens the case for letting the algorithm handle it, but does nothing to weaken the
                case for blocking obviously off-intent categories by hand. For the deeper mechanics, see{' '}
                <a href="/blog/google-ads-ai-max" style={linkStyle}>Google Ads AI Max</a>.
              </p>

              <MascotQuote mascot="buzz">
                An Opteo analysis of roughly 25,000 live PMax campaigns, cited by lunio.ai, found 68% running with zero negative keywords and
                eight in ten with fewer than 10 applied. That is the gap worth closing before the Smart Bidding argument even comes up. Most
                accounts are not over-blocking. They are barely blocking at all.
              </MascotQuote>

              {/* VISUAL 4 (bold-viz): the Opteo gap */}
              <DonutStat
                items={[
                  { percent: 68, label: 'run zero negative keywords' },
                  { percent: 80, label: 'have fewer than 10 applied' },
                ]}
                source="Source: Opteo analysis of roughly 25,000 live PMax campaigns, cited by lunio.ai (updated 2025-09-16)"
              />
            </section>

            {/* Starter list */}
            <section id="starter-list">
              <h2 style={h2Style}>A Starter Negative Keyword List (and How to Find Your Own)</h2>
              <p style={paragraphStyle}>
                A practical starter list covers eight to twelve categories, not individual terms: jobs and careers (&quot;jobs,&quot;
                &quot;hiring,&quot; &quot;salary&quot;), free and DIY (&quot;free,&quot; &quot;diy,&quot; &quot;template&quot;), competitor
                brand terms, wrong-intent modifiers (&quot;reviews,&quot; &quot;complaints,&quot; &quot;refund,&quot; &quot;lawsuit&quot;),
                irrelevant geography, and wrong product category terms adjacent to what is actually sold. That is an example of a negative
                keyword in practice: a term or category blocked because it signals the wrong intent, not a competitor&apos;s entire brand
                vocabulary. Because PMax&apos;s matching behaves like an aggressive broad match layer, category-level negatives block more
                waste than one-off terms.
              </p>

              {/* VISUAL 5: the starter categories as a taxonomy */}
              <ColumnBuckets
                columns={[
                  { title: 'Jobs and careers', items: ['jobs', 'hiring', 'salary'] },
                  { title: 'Free and DIY', items: ['free', 'diy', 'template'] },
                  { title: 'Wrong-intent modifiers', items: ['reviews', 'complaints', 'refund', 'lawsuit'] },
                  { title: 'Wrong context', items: ['Competitor brand terms', 'Irrelevant geography', 'Adjacent product categories'] },
                ]}
                caption="A starter list covers eight to twelve categories, not individual terms"
              />

              <p style={paragraphStyle}>
                Finding candidates is harder in Performance Max than in a standard Search campaign, since PMax search-term visibility is more
                limited by design. One practitioner summed up the discipline simply: &quot;add negative keywords early&quot;
                (@The_Last_Hurdle, X, 2026-07-30). Three practical paths: the Insights tab, the &quot;Estimate the impact&quot; feature built
                for evaluating a negative before adding it ({ext(googleHelpUrl, 'support.google.com/answer/15726455')}), and the account-level{' '}
                <a href="/blog/google-ads-search-terms-report" style={linkStyle}>search terms report</a>. For a recurring PPC audit across
                many accounts, negative keywords scripts can bulk-review and sync lists rather than editing each account by hand.
              </p>
            </section>

            {/* What negatives do not fix */}
            <section id="what-negatives-dont-fix">
              <h2 style={h2Style}>What Performance Max Doesn&apos;t Let You Fix With Negatives</h2>
              <p style={paragraphStyle}>
                Negative keywords narrow Performance Max. They do not fix it. First, negatives only reach Search and Shopping inventory: they
                do nothing for wasted spend on Display, YouTube, or Discovery placements, a real disadvantage relative to channel-specific
                campaigns where every placement is directly controllable. Second, placement-level transparency stays limited, and Quality
                Score is not visible at the PMax level the way it is in standard Search campaigns. Third, a negative list cannot repair a
                misconfigured asset group, weak creative, or broken conversion tracking and attribution. If a campaign underperforms because
                tracking fires on the wrong event, no negative list fixes that. For that diagnostic, see{' '}
                <a href="/blog/performance-max-not-converting" style={linkStyle}>Performance Max not converting</a>.
              </p>

              {/* VISUAL 6: the load-bearing caveat */}
              <Callout variant="warning" title="Negatives stop at the Search and Shopping boundary">
                A PMax campaign wasting budget on Display, YouTube, or Discovery placements will keep wasting it no matter how long the
                negative list gets. So will one with a broken conversion action. Diagnose the asset group, the creative, and the tracking
                before assuming the query layer is the problem.
              </Callout>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i === faqItems.length - 1 ? 0 : '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{item.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Where B6 Fits (Automating Negative-List Maintenance, Not Replacing the Judgment)</h2>
              <p style={paragraphStyle}>
                Negative keyword lists decay. Someone has to review the search-term and Insights signal weekly and decide whether a new
                exclusion belongs at account, campaign, or list level. That review is exactly the kind of recurring work that gets skipped once
                an account looks stable. Kampaio&apos;s Sage agent surfaces negative-keyword candidates from the search-term and Insights
                signal automatically; Buzz flags the point where a campaign has crossed into strong, stable conversion volume, the threshold
                where a negative list stops paying for itself relative to what Smart Bidding already does. See{' '}
                <a href="/b6#sage" style={linkStyle}>Sage</a>, <a href="/b6#buzz" style={linkStyle}>Buzz</a>, or{' '}
                <a href="/pricing" style={linkStyle}>pricing</a>.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Stop rebuilding the same negative list in every campaign
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Kampaio reviews the search-term and Insights signal between your check-ins, proposes the exclusion at the right level, and
                  shows the reasoning behind every call.
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
              <p style={captionStyle}>
                Caps and rollout dates are quoted from the sources above, not from an audited account. The 5,000-per-list and
                1,000-campaigns-per-list figures are reported by Google Ads Liaison on X rather than documented in Google Ads Help, so treat
                them as reported rather than confirmed. The Opteo figures are cited via lunio.ai. Sage and Buzz illustrate how
                Kampaio&apos;s agents apply this logic, not an audited result from a named advertiser.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="performance-max-negative-keywords" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
