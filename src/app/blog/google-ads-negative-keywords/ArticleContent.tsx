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

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-negative-keywords#article',
    headline: 'Google Ads Negative Keywords: A Repeatable Method to Cut Wasted Spend (2026)',
    description: 'A rigorous, repeatable method for Google Ads negative keywords: how to find them in the search terms report, choose the right match type and hierarchy level, handle Performance Max, maintain the lists, and avoid over-blocking converting traffic.',
    image: 'https://www.kampaio.com/og/google-ads-negative-keywords.png',
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
    datePublished: '2026-06-13T00:00:00.000Z',
    dateModified: '2026-06-13T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-negative-keywords',
    },
    keywords: 'google ads negative keywords, negative keyword match types, search terms report, negative keyword lists, performance max negative keywords, wasted spend, over-negation, negative keyword hierarchy',
    inLanguage: 'en',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.kampaio.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Google Ads Negative Keywords', item: 'https://www.kampaio.com/blog/google-ads-negative-keywords' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I add negative keywords to my Google Ads campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to Campaigns, open a campaign, go to Keywords then Negative search keywords, and click the plus button. For a shared list, go to Tools then Shared library then Exclusion lists, build it there, and apply it to selected campaigns.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I remove negative keywords in Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Remove individual negatives from Keywords then Negative keywords in the campaign. To detach a shared list, go to Tools then Shared library then Exclusion lists and remove the campaign association.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a good example of a negative keyword?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"Free", "jobs", "diy", "salary", "tutorial", competitor brand names you are not bidding on, and product variants you do not sell.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many negative keywords should I have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No fixed target. The per-campaign limit is 5,000 and shared lists cap at 1,000 per list. A focused 50 to 200 terms covering real leaks outperforms a generic 2,000-term pre-built list.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do negative keywords work in Performance Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Partially. As of 2025 to 2026, account-level negative lists and up to 10,000 per-campaign negatives apply to Performance Max. Brand exclusions handle brand control separately. Per-query control equivalent to Search is not available.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can negative keywords hurt my campaign?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Over-negation blocks converting traffic invisibly. If impressions drop sharply after a negative push but impression share lost to rank is flat, over-negation is likely. Audit broad negatives and positive/negative conflicts monthly.',
        },
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Negative Keywords in 60 Seconds (Quick Answer)', level: 1 },
    { id: 'what-they-do', title: 'What Negative Keywords Actually Do (and What They Do Not)', level: 1 },
    { id: 'weekly-method', title: 'The Weekly Method: Finding Negative Keywords in the Search Terms Report', level: 1 },
    { id: 'match-types', title: 'Negative Keyword Match Types: Broad, Phrase, Exact', level: 1 },
    { id: 'where-to-add', title: 'Where to Add Them: Account, Campaign, Ad Group, or Shared List', level: 1 },
    { id: 'pmax-shopping', title: 'Negative Keywords in Performance Max and Shopping', level: 1 },
    { id: 'maintaining', title: 'Maintaining Negative Keyword Lists Without Burning an Hour a Week', level: 1 },
    { id: 'automating', title: 'Automating Wasted-Spend Detection (When Manual Scanning Does Not Scale)', level: 1 },
    { id: 'over-negation', title: 'When Negative Keywords Cost You Conversions', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Stop the Weekly Search-Terms Grind', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' } as const;
  const h2Style = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px' } as const;
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' } as const;

  // VISUAL: hierarchy of where negatives live (account to ad group + shared list), InlineSVG
  const hierarchySvg = `
<svg viewBox="0 0 660 290" xmlns="http://www.w3.org/2000/svg" role="img" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif">
  <text x="0" y="22" font-size="15" font-weight="700" fill="#1e293b">Where a negative keyword lives, and how broadly it applies</text>

  <rect x="40" y="44" width="380" height="40" rx="6" fill="#ef4444"/>
  <text x="56" y="69" font-size="14" font-weight="700" fill="#ffffff">Account level</text>
  <text x="430" y="69" font-size="12" fill="#64748b">brand safety, applies to PMax + Demand Gen</text>

  <rect x="80" y="100" width="340" height="40" rx="6" fill="#f59e0b"/>
  <text x="96" y="125" font-size="14" font-weight="700" fill="#ffffff">Campaign level</text>
  <text x="430" y="125" font-size="12" fill="#64748b">intent nuance, one campaign</text>

  <rect x="120" y="156" width="300" height="40" rx="6" fill="#667eea"/>
  <text x="136" y="181" font-size="14" font-weight="700" fill="#ffffff">Ad group level</text>
  <text x="430" y="181" font-size="12" fill="#64748b">traffic sculpting, highest upkeep</text>

  <rect x="40" y="224" width="380" height="44" rx="6" fill="#ffffff" stroke="#10b981" stroke-width="2"/>
  <text x="56" y="244" font-size="14" font-weight="700" fill="#10b981">Shared list (cuts across)</text>
  <text x="56" y="262" font-size="12" fill="#64748b">build once, apply to many: "free", "jobs", "diy", "login"</text>
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
          <ArticleHero slug="google-ads-negative-keywords" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Wasted Spend
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Negative Keywords: A Repeatable Method to Cut Wasted Spend (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              A weekly workflow with concrete thresholds, a hierarchy decision rule, Performance Max handling, and an honest treatment of over-negation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 13, 2026 · 10 min read</span>
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
                Negative keywords exclude search terms you do not want triggering your ads. The repeatable method: pull the search terms report weekly, flag queries with spend above $25 and zero conversions over 90 days, add them as phrase or exact negatives at campaign or shared-list level, then audit broad-match negatives monthly for over-blocking.
              </p>
            </section>

            {/* VISUAL 1: 6-step method styled callout block */}
            <section id="quick-answer">
              <h2 style={h2Style}>Negative Keywords in 60 Seconds (Quick Answer)</h2>
              <p style={pStyle}>
                Most guides stop at match types. This one gives a weekly workflow with concrete thresholds, a hierarchy decision rule, Performance Max handling, and an honest treatment of over-negation.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #ddd6fe', borderRadius: '14px', padding: '28px 32px', marginBottom: '32px' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>The 6-step method</p>
                <ol style={{ fontSize: '17px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '22px', margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>Pull the search terms report (90 days for first pass, 7 to 14 days for ongoing)</li>
                  <li style={{ marginBottom: '12px' }}>Sort by cost, descending</li>
                  <li style={{ marginBottom: '12px' }}>Flag queries with spend above $25 and zero conversions, plus any intent-mismatch terms regardless of spend</li>
                  <li style={{ marginBottom: '12px' }}>Group flags by theme to decide match type and hierarchy level</li>
                  <li style={{ marginBottom: '12px' }}>Add at the right level: shared list, campaign, ad group, or account</li>
                  <li style={{ marginBottom: 0 }}>Log what you added so next week&apos;s scan does not relitigate the same terms</li>
                </ol>
              </div>
            </section>

            {/* What they do */}
            <section id="what-they-do">
              <h2 style={h2Style}>What Negative Keywords Actually Do (and What They Do Not)</h2>
              <p style={pStyle}>
                A negative keyword filters the auction before your ad competes: the click never happens, it is not suppressed after the fact.
              </p>
              <p style={pStyle}>
                Negatives do not raise <a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>Quality Score</a> directly. Removing irrelevant queries improves CTR and conversion rate on remaining traffic, which can lift Quality Score as a second-order effect. Negatives are a targeting filter, not a quality signal.
              </p>
              <p style={pStyle}>
                What negatives cannot do: they do not fix a bidding problem. If a query is relevant but converts poorly, the fix is bid adjustment. Our <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>guide to Google Ads Smart Bidding strategies</a> covers how bid <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a> interacts with the signal Smart Bidding learns from. They do not work retroactively. And they do not match close variants.
              </p>
              <p style={pStyle}>
                A practical scale check: a $5K/month account leaking 12% of spend to &quot;free&quot;, &quot;jobs&quot;, &quot;salary&quot;, and &quot;diy&quot; queries is losing $600/month. Smart Bidding cannot fix auction eligibility. Negatives can.
              </p>
            </section>

            {/* VISUAL 2: weekly method (the section already carries the 6-step block above; this adds the scan procedure as an ordered list) */}
            <section id="weekly-method">
              <h2 style={h2Style}>The Weekly Method: Finding Negative Keywords in the Search Terms Report</h2>
              <p style={pStyle}>
                The search terms report is the single most reliable source of negative keywords, because it shows the real queries that triggered your ads. Navigate to: Campaigns &gt; Insights and reports &gt; Search terms, or per-campaign via Keywords &gt; Search terms.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>Run the scan in six steps:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Open the report.</strong> 90 days for a first pass, 7 to 14 days for ongoing. New campaigns: check every other day for the first two weeks.</li>
                <li style={{ marginBottom: '16px' }}><strong>Sort by cost, descending.</strong> Wasted spend hides at the top.</li>
                <li style={{ marginBottom: '16px' }}><strong>Flag the leak pattern.</strong> Queries with spend above $25 and zero conversions. Also flag intent-mismatch terms at any spend: &quot;job&quot;, &quot;salary&quot;, &quot;free&quot;, &quot;login&quot;, competitor brands you are not bidding on.</li>
                <li style={{ marginBottom: '16px' }}><strong>Group by theme.</strong> Irrelevant intent, wrong product, informational-only, competitor brand, location mismatch. Theme grouping drives the match type and level decisions.</li>
                <li style={{ marginBottom: '16px' }}><strong>Choose match type and level</strong> (next two sections). Before saving, review the match type: Google defaults to exact. For most multi-word queries, change to phrase match.</li>
                <li style={{ marginBottom: 0 }}><strong>Log what you added.</strong> A running spreadsheet column is enough.</li>
              </ol>

              {/* VISUAL 3: MascotQuote (Sage) with concrete numbers */}
              <MascotQuote mascot="sage">
                In a $20K/month account I scan 90 days of search terms and flag every query with more than $25 spend and 0 conversions. On a typical SMB account that surfaces 30 to 60 wasted queries on the first pass, roughly 8 to 15% of spend leaking to terms that never convert.
              </MascotQuote>
            </section>

            {/* VISUAL 4: ComparisonTable (match types) */}
            <section id="match-types">
              <h2 style={h2Style}>Negative Keyword Match Types: Broad, Phrase, Exact</h2>
              <p style={pStyle}>
                Negative keyword match types behave differently from positive ones: there is no close-variant or synonym expansion, so a negative only blocks the exact word forms you specify. For a full comparison of how positive match types work, see <a href="/blog/google-ads-keyword-match-types-explained" style={linkStyle}>Google Ads keyword match types explained</a>.
              </p>
              <ComparisonTable
                headers={['Match type', 'Blocks when', 'Over-block risk', 'Best for']}
                rows={[
                  { cells: ['Broad negative', 'Query contains all words in any order', 'Highest', 'Single-word, clearly irrelevant terms ("free", "job", "diy")'] },
                  { cells: ['Phrase negative', 'Query contains the exact phrase in order', 'Medium', 'Multi-word irrelevant phrases where word order matters'] },
                  { cells: ['Exact negative', 'Query matches exactly, no extra words', 'Lowest', 'Specific queries to exclude without touching related terms'] },
                ]}
                caption="The three negative match types, ranked by over-block risk"
              />
              <p style={pStyle}>
                The practitioner rule: add single-word irrelevant terms as broad negatives; add multi-word terms as phrase or exact. A broad negative on &quot;free&quot; is universally safe. A broad negative on &quot;running shoes&quot; could block &quot;women&apos;s running shoes on sale&quot; if your campaign covers accessories.
              </p>
              <p style={pStyle}>
                One critical gotcha: negative keywords do not match plurals, close variants, or synonyms. A negative <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '16px' }}>[lawyer]</code> will not block &quot;lawyers.&quot; A negative &quot;software free&quot; in broad will not block &quot;free software trial&quot; if the word order differs. Add each form as its own entry. (<a href="https://support.google.com/google-ads/answer/2453972?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Negative keywords</a>)
              </p>
            </section>

            {/* VISUAL 5: hierarchy InlineSVG */}
            <section id="where-to-add">
              <h2 style={h2Style}>Where to Add Them: Account, Campaign, Ad Group, or Shared List</h2>
              <p style={pStyle}>
                The hierarchy level determines how broadly a negative applies and how hard it is to maintain.
              </p>
              <p style={pStyle}>
                <strong>Decision rule:</strong> universal junk goes on a shared list, intent nuance goes campaign-level, traffic sculpting goes ad-group-level, brand safety goes account-level.
              </p>

              <InlineSVG svg={hierarchySvg} caption="Higher in the tree means broader reach; a shared list cuts across campaigns for universal junk terms" ariaLabel="Diagram showing negative keyword scope from account level down to ad group level, plus a shared list that cuts across campaigns" />

              <p style={pStyle}>
                <strong>Account-level negatives</strong> (Tools &gt; Shared library &gt; Exclusion lists): reserve for brand-safety terms and universally irrelevant terms. Account-level lists now apply to Performance Max and Demand Gen. Use sparingly, it is a blunt instrument.
              </p>
              <p style={pStyle}>
                <strong>Shared negative keyword lists:</strong> build once, apply to many campaigns. A &quot;junk terms&quot; list covering &quot;free&quot;, &quot;jobs&quot;, &quot;diy&quot;, &quot;login&quot;, &quot;salary&quot; applied account-wide means updating one place protects everywhere. Six useful named categories: irrelevant searches, competitor brands, brands not sold, generics, own brand, product names. (<a href="https://support.google.com/google-ads/answer/7449003?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Negative keyword lists</a>)
              </p>
              <p style={pStyle}>
                <strong>Campaign-level negatives:</strong> intent exclusions specific to one campaign. Exclude &quot;cheap&quot; from a premium campaign while allowing it in a value-tier campaign.
              </p>
              <p style={pStyle}>
                <strong>Ad-group-level negatives:</strong> for sculpting traffic between ad groups. Push &quot;women&apos;s running shoes&quot; away from the men&apos;s ad group. Use deliberately, ad-group negatives multiply maintenance load fast.
              </p>
            </section>

            {/* PMax and Shopping */}
            <section id="pmax-shopping">
              <h2 style={h2Style}>Negative Keywords in Performance Max and Shopping</h2>
              <p style={pStyle}>
                Performance Max limits search-term visibility, so the workflow changes: rely on account-level negatives, brand exclusions, and the partial search-term insights available via the Insights tab.
              </p>
              <p style={pStyle}>
                As of 2025 to 2026, PMax supports up to 10,000 negative keywords per campaign plus shared list support. Account-level negative lists apply automatically. What is not available: per-query control equivalent to Search. The Insights tab shows search categories, not raw queries. If PMax is burning budget without conversions at a broader level, the <a href="/blog/performance-max-not-converting" style={linkStyle}>Performance Max not converting diagnostic</a> covers the full fix sequence including asset group and bidding checks.
              </p>
              <p style={pStyle}>
                The PMax playbook: (1) set account-level junk negatives before scaling spend, once budget is in PMax you cannot catch bad queries in real time; (2) use brand exclusion lists to separate brand from non-brand traffic (configured under campaign settings, separate from negative keywords); (3) review Insights search-category data weekly for category-level waste patterns.
              </p>
              <p style={pStyle}>
                Shopping campaigns are simpler: the search terms report is fully available and the same weekly method applies. Common Shopping leak: informational &quot;how to&quot; and &quot;is X worth it&quot; queries triggering product listings for non-buyers. The same wasted-spend patterns apply to <a href="/blog/google-ads-display-network-wasted-spend" style={linkStyle}>Display Network placements</a>, where placement exclusions play the same role negatives play in Search.
              </p>
              <p style={pStyle}>
                Honest caveat: PMax wasted spend is the hardest to audit manually. That gap is where automated detection adds the most value.
              </p>
            </section>

            {/* Maintaining */}
            <section id="maintaining">
              <h2 style={h2Style}>Maintaining Negative Keyword Lists Without Burning an Hour a Week</h2>
              <p style={pStyle}>
                Negative keywords are not set-and-forget. The lists need a cadence: review search terms weekly, audit existing negatives monthly, prune conflicts quarterly.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>The three-cadence system:</p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Weekly (5 to 15 min/account):</strong> scan the last 7 to 14 days of search terms, add new leaks. More frequent for accounts above $10K/month.</li>
                <li style={{ marginBottom: '16px' }}><strong>Monthly:</strong> audit broad negatives for over-blocking, verify shared lists apply to all new campaigns, add plural and variant entries missing from exact negatives. Run the positive/negative conflict check.</li>
                <li style={{ marginBottom: 0 }}><strong>Quarterly:</strong> prune negatives that conflict with active positive keywords, archive seasonal terms, recalibrate spend thresholds if CPCs have shifted.</li>
              </ul>
              <p style={pStyle}>
                A negative silently overrides a positive keyword, dropping an entire ad group&apos;s traffic with no alert. Google&apos;s Recommendations tab flags some conflicts, not all. Manual check: compare your negative list against active positive keywords. This is one of those quiet failure modes that only shows up as unexplained impression drops weeks later. If your <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking is broken</a> at the same time, impression drops become even harder to diagnose.
              </p>
              <p style={pStyle}>
                The <a href="/blog/ppc-audit-checklist" style={linkStyle}>PPC audit checklist</a> includes this scan as a recurring step.
              </p>
            </section>

            {/* Automating */}
            <section id="automating">
              <h2 style={h2Style}>Automating Wasted-Spend Detection (When Manual Scanning Does Not Scale)</h2>
              <p style={pStyle}>
                The weekly scan is rule-based: pull the report, flag spend-with-no-conversion queries, add negatives at the right level. Identical logic, every week, every account. Kampaio observed $900/month in junk traffic across 13 client accounts, the leaks surface predictably.
              </p>
              <p style={pStyle}>
                Kampaio watches the search terms report continuously, detects wasted spend, and proposes negative keywords for your approval. Vigil surfaces the spend-with-no-conversion anomaly; Sage identifies the specific negative to add with an estimated savings impact; you approve before anything executes. Safety cap: 5 real applies per account per 24 hours.
              </p>
              <p style={pStyle}>
                The automated detection threshold ($5 spend, 0 conversions, 30 days) is lower than the manual one because context-based filtering runs on top, keeping false positives low.
              </p>
              <p style={pStyle}>
                Judgment calls, like whether &quot;cheap&quot; belongs as a negative on a value-positioned campaign, still need you. Pricing: Kampaio from $99/$199/$399 vs. Optmyzr and Madgicx from $499+/month.
              </p>
            </section>

            {/* Over-negation */}
            <section id="over-negation">
              <h2 style={h2Style}>When Negative Keywords Cost You Conversions</h2>
              <p style={pStyle}>
                Over-negation is the silent failure mode: aggressive negatives block converting traffic and because the impressions never happen, you never see what you lost.
              </p>
              <p style={{ ...pStyle, marginBottom: '20px', fontWeight: 600 }}>Three common mistakes:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', borderRadius: '8px', padding: '18px 22px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Broad negatives that are too broad</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>A broad negative &quot;shoes&quot; blocks any query containing that word, including &quot;running shoe laces&quot; if your campaign sells accessories. Use phrase or exact for any multi-word concept.</p>
                </div>
                <div style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '18px 22px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Blocking close variants of converting terms</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Negating &quot;cheap&quot; seems safe for a premium campaign. But &quot;cheap [your product]&quot; sometimes converts on a budget line. Check conversion data on the specific term before negating.</p>
                </div>
                <div style={{ background: '#eff6ff', borderLeft: '4px solid #3b82f6', borderRadius: '8px', padding: '18px 22px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>Negative vs. positive conflict</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>A negative silently overrides a positive keyword and the ad group goes quiet with no impression-side signal. Audit conflicts monthly.</p>
                </div>
              </div>
              <p style={pStyle}>
                Diagnostic signal: impressions down more than 15% week-over-week after a negative push, but impression share lost to rank is flat. That points to over-blocking, not a bid or quality problem.
              </p>
            </section>

            {/* VISUAL 6: FAQ section */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How do I add negative keywords to my Google Ads campaign?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Go to Campaigns, open a campaign, go to Keywords &gt; Negative search keywords, and click the plus button. For a shared list, go to Tools &gt; Shared library &gt; Exclusion lists, build it there, and apply it to selected campaigns. (<a href="https://support.google.com/google-ads/answer/2453972?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>)</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How do I remove negative keywords in Google Ads?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Remove individual negatives from Keywords &gt; Negative keywords in the campaign. To detach a shared list, go to Tools &gt; Shared library &gt; Exclusion lists and remove the campaign association. (<a href="https://support.google.com/google-ads/answer/7449003?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>)</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>What is a good example of a negative keyword?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>&quot;Free&quot;, &quot;jobs&quot;, &quot;diy&quot;, &quot;salary&quot;, &quot;tutorial&quot;, competitor brand names you are not bidding on, and product variants you do not sell.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>How many negative keywords should I have?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>No fixed target. The per-campaign limit is 5,000; shared lists cap at 1,000 per list. A focused 50 to 200 terms covering real leaks outperforms a generic 2,000-term pre-built list.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Do negative keywords work in Performance Max?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Partially. As of 2025 to 2026, account-level negative lists and up to 10,000 per-campaign negatives apply to PMax. Brand exclusions handle brand control separately. Per-query control equivalent to Search is not available.</p>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px 24px' }}>
                  <p style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>Can negative keywords hurt my campaign?</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>Yes. Over-negation blocks converting traffic invisibly. If impressions drop sharply after a negative push but impression share lost to rank is flat, over-negation is likely. Audit broad negatives and positive/negative conflicts monthly.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop the Weekly Search-Terms Grind</h2>
              <p style={pStyle}>
                Finding negative keywords is not hard, it is relentless. A new batch of wasted queries surfaces every week, in every account, including the Performance Max campaigns you can barely audit by hand. The mechanical scan is exactly what should run on its own.
              </p>
              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Let the search-terms scan run on its own
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  <a href="/b6#vigil" style={linkStyle}>Kampaio&apos;s Vigil and Sage agents</a> watch the search terms report continuously, detect wasted spend, and propose negatives for approval, showing every proposed action before anything executes. You keep control of the judgment calls; the weekly grind goes away. <a href="/pricing" style={linkStyle}>See Kampaio plans from $99/month.</a>
                </p>
                <a
                  href="/chat"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'inline-block', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)', textDecoration: 'none' }}
                >
                  Find My Wasted Spend
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', marginTop: '24px' }}>Sources</h3>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><a href="https://support.google.com/google-ads/answer/2453972?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About negative keywords</a></li>
                <li><a href="https://support.google.com/google-ads/answer/7449003?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, About negative keyword lists</a></li>
              </ul>
            </section>

          </div>
        </div>
        <KeepReading slug="google-ads-negative-keywords" category="google-ads" />
      <Footer compact={true} />
      </div>
    </>
  );
}
