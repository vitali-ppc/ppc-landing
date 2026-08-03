'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';
import ComparisonTable from '../../../components/blog/ComparisonTable';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Google Ads "Bid Strategy Limited" Status: What It Means and How to Fix It',
    description: 'Your Google Ads bid strategy shows "Limited"? Here is what "Limited by bid strategy" and "Eligible (Limited)" mean, the real causes, and how to fix (or safely ignore) it.',
    image: 'https://www.kampaio.com/og/google-ads-bid-strategy-status-limited.png',
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
    datePublished: '2026-05-22T00:00:00.000Z',
    dateModified: '2026-05-22T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-bid-strategy-status-limited',
    },
    keywords: 'bid strategy, limited, google ads, bid strategy status, limited by bid strategy, eligible limited, max cpc, bid limits, target cpa, target roas, smart bidding, automated bidding, limited by budget, learning phase, conversions, conversion volume, campaign status, impression share, portfolio bid strategy',
    wordCount: 2408,
    articleSection: 'Google Ads',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does "limited by bid strategy" mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It means your automated bid strategy is operating, but a setting (usually a Max CPC bid limit or an aggressive Target CPA/ROAS) is preventing it from winning auctions it would otherwise win. The strategy is active, not stopped.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is "limited by bidding target"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It is one specific cause inside "Limited by bid strategy". The target you set is too aggressive for the account\'s recent performance, so the algorithm refuses to bid into auctions it predicts will miss the target.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the Google Ads bid strategy learning phase take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google does not publish a fixed duration. The industry rule of thumb is 7 to 14 days for Search campaigns, and roughly 30 to 50 conversions before Target CPA or Target ROAS stabilizes. Treat these as ranges, not guarantees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a maximum bid strategy / Max CPC bid limit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A ceiling you can attach to portfolio or standard strategies that caps how high the system can bid. It exists to protect against runaway CPC. The trade-off is that a ceiling too low produces the "Limited by bid strategy" warning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is "Eligible (Limited)" bad, should I worry about it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not by itself. Eligible (Limited) just means the campaign is in the auction and one or more factors are dampening reach. Hover the status for the specific factor, then judge whether that factor is actually a problem given your goals.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is "Limited by bid strategy" different from "Limited by budget"?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '"Limited by budget" means the daily budget is too low for the campaign\'s bid level and demand. "Limited by bid strategy" means the bid strategy itself, not the budget, is the constraint. Same word, different problem, different fix.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I just ignore the "Limited" status?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Often yes, if results are on plan. If the strategy reflects deliberate margin discipline, the warning is the price of that discipline. Ignore the label and watch CPA, conversions, and profit instead.',
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
      { '@type': 'ListItem', position: 3, name: 'Google Ads Bid Strategy Limited Status', item: 'https://www.kampaio.com/blog/google-ads-bid-strategy-status-limited' },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Quick Answer: What "Bid Strategy Limited" Means', level: 1 },
    { id: 'statuses-decoded', title: 'The Bid Strategy Statuses, Decoded', level: 1 },
    { id: 'real-causes', title: 'Why Your Bid Strategy Is "Limited": The Real Causes', level: 1 },
    { id: 'diagnose', title: 'How to Diagnose Which Cause Is Yours', level: 1 },
    { id: 'fix', title: 'How to Fix "Bid Strategy Limited" (Step by Step)', level: 1 },
    { id: 'safely-ignore', title: 'When You Can Safely Ignore "Limited"', level: 1 },
    { id: 'stop-watching', title: 'Stop Watching the Status Column Manually', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Fix It Once, or Let It Run Itself', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statuses: Array<{ label: string; tone: 'neutral' | 'good' | 'warn' | 'bad' | 'info'; desc: string }> = [
    { label: 'Inactive', tone: 'neutral', desc: 'Strategy not running' },
    { label: 'Active', tone: 'good', desc: 'Optimizing normally' },
    { label: 'Learning', tone: 'info', desc: 'Temporary recalibration' },
    { label: 'Limited', tone: 'warn', desc: 'Constraint dampens reach' },
    { label: 'Misconfigured', tone: 'bad', desc: 'Setup error blocks it' },
  ];

  const toneColor = (t: 'neutral' | 'good' | 'warn' | 'bad' | 'info') => {
    switch (t) {
      case 'good': return { bg: '#ecfdf5', border: '#10b981', text: '#065f46' };
      case 'warn': return { bg: '#fffbeb', border: '#f59e0b', text: '#92400e' };
      case 'bad': return { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' };
      case 'info': return { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a' };
      default: return { bg: '#f8fafc', border: '#94a3b8', text: '#334155' };
    }
  };

  const causes: Array<{ n: string; title: string; gist: string; signal: string }> = [
    {
      n: '01',
      title: 'Bid limits too narrow',
      gist: 'A Max CPC ceiling on a portfolio or standard strategy holds bids below the auction\'s winning band.',
      signal: 'Impression share lost to rank near 90%, spend pinned to the limit for days.',
    },
    {
      n: '02',
      title: 'Target too aggressive',
      gist: 'Target CPA below the real CPA, or Target ROAS above what the account historically achieves.',
      signal: 'Strategy refuses to buy traffic it predicts will miss the target. Underspending despite headroom.',
    },
    {
      n: '03',
      title: 'Conversion volume too low',
      gist: 'Smart Bidding lacks data. The algorithm leans defensive and underbids until it sees more signal.',
      signal: 'Under ~30 conversions per month per campaign. Algorithm stays cautious for weeks.',
    },
    {
      n: '04',
      title: 'Structural / recent disruption',
      gist: 'Narrow targeting, shared-budget conflicts, or a change still inside the learning window.',
      signal: 'Looks like Limited, behaves like Learning. Check the change history first.',
    },
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
          <ArticleHero slug="google-ads-bid-strategy-status-limited" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Troubleshooting
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads &quot;Bid Strategy Limited&quot; Status: What It Means and How to Fix It
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              What &quot;Limited by bid <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a>&quot; and &quot;Eligible (Limited)&quot; mean, the four real causes, the 5-step fix, and when ignoring the warning is the right call.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>by B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 22, 2026 · 12 min read</span>
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

        {/* Article Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Lead paragraph */}
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
              &quot;Limited&quot; in the bid strategy column means your automated strategy is running, but something (usually a bid limit or an aggressive Target CPA/ROAS) is keeping it out of auctions it could otherwise win. It is not the same as &quot;Limited by budget&quot;, and it does not always need a fix. Hover the status for the specific cause, then decide.
            </p>

            {/* Quick Answer */}
            <section id="quick-answer">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Quick Answer: What &quot;Bid Strategy Limited&quot; Means
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                &quot;Bid Strategy Limited&quot; tells you the strategy is active but constrained. The auction algorithm wants to bid higher (or relax a target) and the settings you chose are preventing that.
              </p>

              {/* TL;DR callout */}
              <div style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)', border: '1px solid #c7d2fe', borderLeft: '4px solid #764ba2', borderRadius: '12px', padding: '24px 28px', marginBottom: '32px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#764ba2', letterSpacing: '0.08em', marginBottom: '12px' }}>TL;DR</div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '17px', lineHeight: '1.7', color: '#1e293b' }}>
                  <li style={{ marginBottom: '8px' }}>The status is active, not broken. Your campaign still serves.</li>
                  <li style={{ marginBottom: '8px' }}>Most common causes: a Max CPC bid limit too low, a Target CPA below your real CPA, or a Target ROAS above what the account can deliver.</li>
                  <li style={{ marginBottom: '8px' }}>&quot;Limited by bid strategy&quot; is not the same label as &quot;Limited by budget&quot;. Different causes, different fixes.</li>
                  <li>Sometimes the correct response is to do nothing. If the strategy reflects deliberate margin discipline, the limit is the strategy.</li>
                </ul>
              </div>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The fastest first check: open the Status column in your Campaigns table and hover the warning. Google names the specific limiting factor right there.
              </p>
            </section>

            {/* Statuses Decoded */}
            <section id="statuses-decoded">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                The Bid Strategy Statuses, Decoded
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Bid strategy status is an indicator in Google Ads that shows whether your automated bidding strategy can operate without obstruction. The full official list is short.
              </p>

              {/* Visual 1: Status legend row */}
              <div className="b6-status-row" style={{ marginBottom: '32px' }}>
                {statuses.map((s) => {
                  const c = toneColor(s.tone);
                  return (
                    <div key={s.label} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '14px 16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: c.text, marginBottom: '4px', letterSpacing: '0.02em' }}>{s.label}</div>
                      <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                  );
                })}
              </div>
              <style jsx>{`
                .b6-status-row {
                  display: grid;
                  grid-template-columns: repeat(5, 1fr);
                  gap: 12px;
                }
                @media (max-width: 900px) {
                  .b6-status-row { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 480px) {
                  .b6-status-row { grid-template-columns: 1fr; }
                }
              `}</style>

              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Inactive</strong>: nothing is running. Campaigns are paused, or the strategy has no campaigns attached.</li>
                <li style={{ marginBottom: '10px' }}><strong>Active</strong>: the strategy is optimizing bids normally. No action needed.</li>
                <li style={{ marginBottom: '10px' }}><strong>Learning</strong>: a temporary state after a meaningful change (new strategy, new targets, new campaigns added). The system is recalibrating bids.</li>
                <li style={{ marginBottom: '10px' }}><strong>Limited</strong>: the strategy runs, but a constraint is dampening its reach.</li>
                <li><strong>Misconfigured</strong>: a setup issue is blocking proper operation. Two flavors: shared budget conflict, or missing conversion setup (<a href="https://support.google.com/google-ads/answer/6263057?hl=en" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads Help</a>).</li>
              </ul>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Learning and Limited get confused often. Learning is temporary and expected, usually for the first one to two weeks after a change. Limited is structural and stays until you adjust the underlying setting (or accept it on purpose).
              </p>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Three labels in the interface look almost identical and mean different things. This is where most accounts misdiagnose the problem.
              </p>

              {/* Visual 2: ComparisonTable */}
              <ComparisonTable
                headers={['Status label', 'What it means in one line', 'Where to look']}
                rows={[
                  { cells: ['Eligible (Limited)', 'Campaign is in the auction. One or more factors are dampening performance.', 'Campaign Status column'] },
                  { cells: ['Limited by bid strategy', 'The automated bid strategy itself is constrained (bid limits or target).', 'Bid strategy column'], highlight: true },
                  { cells: ['Limited by budget', "Daily budget is too low for the campaign's bid level and demand.", 'Campaign Status column'] },
                ]}
                caption="Three near-identical labels with different root causes. Disambiguation here is the article's main differentiator."
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Eligible (Limited) is the umbrella. Limited by bid strategy is one of the things that can live under that umbrella, alongside low search volume, low <a href="/blog/responsive-search-ads-best-practices" style={{ color: '#764ba2', textDecoration: 'underline' }}>ad strength</a>, and the budget issue. &quot;Limited by budget&quot; is its own separate label with its own <a href="https://support.google.com/google-ads/answer/2616012?hl=en" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads fix guide</a>, and we wrote a deep dive on the budget side in <a href="/blog/google-ads-not-spending-full-budget" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads not spending full budget</a>. Mixing the two up is the number one reason advertisers raise budgets when their bid limits were the real problem.
              </p>
            </section>

            {/* Real Causes */}
            <section id="real-causes">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Why Your Bid Strategy Is &quot;Limited&quot;: The Real Causes
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Four causes cover roughly 95% of cases.
              </p>

              {/* Visual 3: 4-cause card grid (explicit repeat(4,1fr) -> 2x2 -> 1col) */}
              <div className="b6-cause-grid" style={{ marginBottom: '32px' }}>
                {causes.map((c) => (
                  <div key={c.n} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#764ba2', letterSpacing: '0.08em', marginBottom: '6px' }}>CAUSE {c.n}</div>
                    <div style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '10px', lineHeight: 1.3 }}>{c.title}</div>
                    <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.55, marginBottom: '10px' }}>{c.gist}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, borderTop: '1px dashed #e5e7eb', paddingTop: '10px' }}>
                      <strong style={{ color: '#475569' }}>Signal:</strong> {c.signal}
                    </div>
                  </div>
                ))}
              </div>
              <style jsx>{`
                .b6-cause-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 16px;
                }
                @media (max-width: 1100px) {
                  .b6-cause-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 520px) {
                  .b6-cause-grid { grid-template-columns: 1fr; }
                }
              `}</style>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Bid limits set too narrow.</strong> You attached a Max CPC bid limit (or a min) to a portfolio or standard strategy. The algorithm wants to bid above the ceiling to win, the ceiling holds, and a chunk of impressions slips by. Concrete shape: bid limit set at $1.50, the median winning bid in the niche is closer to $2.40, and your impression share lost to rank sits at 90%-plus. The lid, not the demand, is the problem. If raising the ceiling produces runaway CPC instead, the auction is the wrong shape, and the playbook in <a href="/blog/google-ads-cost-per-click-too-high" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads cost per click too high</a> covers the nine causes behind that.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Target set too aggressively.</strong> Target CPA below the account&apos;s real CPA, or Target ROAS above what the account has historically achieved. The strategy refuses to buy traffic it predicts will miss the target. The direction matters: for Target CPA the trouble is &quot;too low&quot;; for Target ROAS the trouble is &quot;too high&quot;. Both create the same outcome, which is a strategy that holds back. If your ROAS dropped before the warning appeared, the trigger may be upstream of bidding (see <a href="/blog/google-ads-roas-dropped-suddenly" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads ROAS dropped suddenly</a>).
              </p>

              {/* Visual 4: StatBlock */}
              <div style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '1px solid #fcd34d', borderRadius: '12px', padding: '24px 28px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: '0 0 auto' }}>
                  <div style={{ fontSize: '44px', fontWeight: 800, color: '#92400e', lineHeight: 1 }}>30&ndash;50</div>
                  <div style={{ fontSize: '13px', color: '#92400e', fontWeight: 600, letterSpacing: '0.06em', marginTop: '4px' }}>CONVERSIONS / MONTH</div>
                </div>
                <div style={{ flex: '1 1 280px', fontSize: '15px', lineHeight: 1.6, color: '#1e293b' }}>
                  Industry rule of thumb before Target CPA or Target ROAS settles in. Google does not publish a hard threshold, so treat this as a range, not a guarantee.
                </div>
              </div>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Conversion volume too low for Smart Bidding.</strong> <a href="/blog/google-ads-smart-bidding-strategies" style={{ color: '#764ba2', textDecoration: 'underline' }}>Smart Bidding strategies</a> (Target CPA, Target ROAS, Maximize Conversions, Maximize Conversion Value) get better with more data. With very few conversions, the algorithm leans defensive and underbids. Google does not publish a hard threshold. The industry rule of thumb is roughly 30 to 50 conversions per month per campaign before Target CPA or Target ROAS settles in, and Google itself only says to measure performance after enough data has accumulated. Volume that low can also be a tracking artifact: if a tag is dropping fires, the algorithm sees a starved campaign that is actually converting fine. <a href="/blog/google-ads-conversion-tracking-not-working" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads conversion tracking not working</a> walks through the 90-second triage.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Structural conflicts and recent disruption.</strong> Targeting set too narrowly (a single ZIP code, a single device, an exotic language). A shared budget where the strategies don&apos;t match the policy that all campaigns in a shared budget must use identical portfolio strategies. A change you made yesterday that is still inside the learning window. These look like &quot;Limited&quot; too, even though the cause is different.
              </p>

              <MascotQuote mascot="buzz">
                In Campaign Search-Brand the Max CPC bid limit is $1.20, and 91% of lost impression share is &quot;lost to rank&quot; with winning auctions clearing above $1.80. I would raise the limit to $2.10 and watch CPA for 7 days. If CPA stays inside the target band, the lid can come off entirely.
              </MascotQuote>
            </section>

            {/* Diagnose */}
            <section id="diagnose">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                How to Diagnose Which Cause Is Yours
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Diagnosis takes about two minutes in the interface, before you change anything.
              </p>

              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Open the Status column and hover the warning.</strong> Google&apos;s tooltip names the specific limiting factor (inventory, bid limits, budget, bidding strategy). Start there.</li>
                <li style={{ marginBottom: '14px' }}><strong>Open the bid strategy settings.</strong> Check whether a Max CPC or Min CPC bid limit is attached. Note the value.</li>
                <li style={{ marginBottom: '14px' }}><strong>Compare the target to the actual.</strong> Add the &quot;Avg. CPA&quot; and &quot;Conv. value / cost&quot; columns. Your Target CPA should be near or slightly above your 30-day avg CPA. Target ROAS should be near or slightly below your 30-day achieved ROAS.</li>
                <li style={{ marginBottom: '14px' }}><strong>Check conversion volume for the last 30 days.</strong> If the campaign converted under about 30 times, low data is in the mix even if everything else looks fine.</li>
                <li><strong>Scan for recent changes.</strong> Any sizable edit inside the last 7 to 14 days (target shift, budget reshuffle, new conversion action) puts the strategy back into Learning. That is not Limited, it is recalibration.</li>
              </ol>

              {/* Visual 5: Mermaid flowchart TD decision tree */}
              <MermaidDiagram
                chart={`
flowchart TD
  Start[Status shows 'Limited by bid strategy'] --> Q1{Hover tooltip<br/>says what?}
  Q1 -->|Bid limits| C1[Compare Max CPC ceiling<br/>vs winning bid range]
  Q1 -->|Bidding strategy / target| Q2{Actual CPA vs Target CPA?}
  Q1 -->|Inventory| C3[Targeting too narrow<br/>broaden geo / keywords]
  Q1 -->|Budget| C4[See 'Limited by budget'<br/>different fix entirely]

  C1 --> F1[Raise the limit by 15-20%<br/>watch CPA for 7 days]
  Q2 -->|Target tighter than actual| F2[Loosen target by 10-15%<br/>match recent history]
  Q2 -->|Targets aligned, low volume| F3[Add micro-conversions<br/>wait 7-14 days]

  style F1 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style F2 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style F3 fill:#eff6ff,stroke:#3b82f6,stroke-width:2px
  style C3 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
  style C4 fill:#f5f3ff,stroke:#764ba2,stroke-width:2px
                `}
                caption="2-minute diagnosis: read Google's hover tooltip, then follow the branch to a specific fix."
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                A simple interpretive rule covers most cases. If your actual CPA is well below the target and spend hits a bid ceiling, the ceiling is the problem. If the target is more aggressive than the account&apos;s history, the target is the problem. If conversions are under roughly 30 per month, the data volume is the problem.
              </p>
            </section>

            {/* Fix */}
            <section id="fix">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                How to Fix &quot;Bid Strategy Limited&quot; (Step by Step)
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The fix depends on the cause. There is no single button.
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Loosen or remove bid limits.</strong> Raise the Max CPC bid limit by 15-20% (or remove it entirely if the strategy is automated and conversions are tracked correctly). Change incrementally, not radically. If the campaign is running on Manual or Enhanced CPC, a bid limit is doing useful work, so loosen only as far as you trust the account&apos;s conversion data.</li>
                <li style={{ marginBottom: '14px' }}><strong>Adjust the target realistically.</strong> Move Target CPA up toward your real 30-day CPA, then add a small premium (10 to 15%). Move Target ROAS down toward what you actually achieve, with a small discount. Do not pick the number you wish you had.</li>
                <li style={{ marginBottom: '14px' }}><strong>Feed the algorithm more conversions.</strong> Add micro-conversions (qualified-lead form starts, add-to-cart) to the conversion action set, audit tracking for fires that should be firing, and resist splitting a working campaign into smaller ones. Smaller campaigns mean smaller data per Smart Bidding model.</li>
                <li style={{ marginBottom: '14px' }}><strong>Wait out the learning period.</strong> After any change, give it 7 to 14 days without further edits. Editing during Learning resets the clock. The most common avoidable mistake is editing every two days, then complaining that the strategy never settles.</li>
                <li><strong>Re-check, do not blindly accept Google&apos;s suggestion.</strong> The recommendation in the Status column will often suggest raising the budget or relaxing the target. That spends more, which is what the platform wants. Compare the suggestion against your profitability target, not against your impression share target. The recommendation engine optimizes Google&apos;s revenue, not yours.</li>
              </ol>

              <MascotQuote mascot="maximus">
                Before I let Buzz raise Target CPA from $22 to $30 to clear a &quot;Limited&quot; warning, I check whether the campaign is still profitable at a $30 CPA given the client&apos;s gross margin. Clearing the warning by buying unprofitable traffic is not a fix. Sometimes the right call is to leave the limit in and write &quot;intentional&quot; in the notes.
              </MascotQuote>
            </section>

            {/* Safely Ignore */}
            <section id="safely-ignore">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                When You Can Safely Ignore &quot;Limited&quot;
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The &quot;Limited&quot; status does not always require action. Sometimes it is the strategy working as designed.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '20px' }}>
                Three scenarios where ignoring it is correct:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Margin-driven Target ROAS or CPA.</strong> You set the target on purpose to defend gross margin. The &quot;limit&quot; is the cost of that discipline. Loosening it would burn money the brand is choosing not to spend.</li>
                <li style={{ marginBottom: '14px' }}><strong>Brand-search campaigns with a low Max CPC.</strong> You hold the ceiling low because brand queries should win cheaply. The warning shows up because the system thinks it could win more by bidding more. You disagree, and you are right.</li>
                <li><strong>The campaign already meets its volume goal.</strong> You wanted X conversions per week at Y CPA. The campaign delivers X at Y. Spending more would add lower-quality conversions. &quot;Limited&quot; here means &quot;you are leaving cheap-but-low-priority traffic on the table&quot;, which is a deliberate trade.</li>
              </ul>

              <div style={{ background: '#f1f5f9', borderLeft: '4px solid #475569', borderRadius: '8px', padding: '18px 24px', marginBottom: '32px', fontSize: '17px', lineHeight: 1.7, color: '#1e293b', fontStyle: 'italic' }}>
                Limited does not mean broken. Sometimes the limit is your strategy, doing exactly what you asked. The right question is not &quot;how do I make this warning go away?&quot;, it is &quot;am I losing profitable traffic?&quot;.
              </div>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Practitioners on r/PPC reach the same conclusion: review the alert, then generally do not act on it unless results are off. Agency blogs that paint every yellow status as an emergency rely on the panic. Status warnings are signals, not verdicts. If you are also questioning whether to keep paying for that agency in the first place, the framework in <a href="/blog/google-ads-without-agency" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads without an agency</a> is built for exactly this stage.
              </p>
            </section>

            {/* Stop Watching */}
            <section id="stop-watching">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Stop Watching the Status Column Manually
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Bid limits drift. Targets that were correct in March become tight by July as auction prices rise and seasonality shifts. Catching this manually means logging in, reading hover tooltips, comparing 30-day averages, and deciding. Every week. Across every campaign.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                B6 is an AI agency that lives inside the cabinet. The <a href="/blog/google-ads-ai-agent" style={{ color: '#764ba2', textDecoration: 'underline' }}>agents</a> do the watching and the comparing, then show their reasoning before they apply anything. Buzz tracks bid limits and impression share. Maximus keeps Target CPA and Target ROAS aligned with the account&apos;s profitability bands. Aegis reviews any risky change before it goes live. Echo packages the week into a digest you can read in three minutes. It is not &quot;AI advises&quot;. It is &quot;AI does, and shows every step&quot;.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Pricing is straightforward: $99 Co-pilot, $199 Approval, $399 Autonomous. No setup fees. <a href="/pricing" style={{ color: '#764ba2', textDecoration: 'underline' }}>See B6 pricing</a>.
              </p>

              <MascotQuote mascot="echo">
                This week Buzz raised the Max CPC bid limit on Shopping-Generic (the campaign had been pinned to the ceiling for 6 days straight). CPA went up 4%, conversions went up 19%, the &quot;Limited&quot; status cleared on its own. Full reasoning and revert button in the report.
              </MascotQuote>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <a href="/chat" style={{ color: '#764ba2', textDecoration: 'underline' }}>Connect Google Ads to B6</a> to take this off your weekly checklist.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>What does &quot;limited by bid strategy&quot; mean?</strong><br />
                It means your automated bid strategy is operating, but a setting (usually a Max CPC bid limit or an aggressive Target CPA/ROAS) is preventing it from winning auctions it would otherwise win. The strategy is active, not stopped.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>What is &quot;limited by bidding target&quot;?</strong><br />
                It is one specific cause inside &quot;Limited by bid strategy&quot;. The target you set is too aggressive for the account&apos;s recent performance, so the algorithm refuses to bid into auctions it predicts will miss the target.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>How long does the Google Ads bid strategy learning phase take?</strong><br />
                Google does not publish a fixed duration. The industry rule of thumb is 7 to 14 days for Search campaigns, and roughly 30 to 50 conversions before Target CPA or Target ROAS stabilizes. Treat these as ranges, not guarantees.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>What is a maximum bid strategy / Max CPC bid limit?</strong><br />
                A ceiling you can attach to portfolio or standard strategies that caps how high the system can bid. It exists to protect against runaway CPC. The trade-off is that a ceiling too low produces the &quot;Limited by bid strategy&quot; warning.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Is &quot;Eligible (Limited)&quot; bad, should I worry about it?</strong><br />
                Not by itself. Eligible (Limited) just means the campaign is in the auction and one or more factors are dampening reach. Hover the status for the specific factor, then judge whether that factor is actually a problem given your goals.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>How is &quot;Limited by bid strategy&quot; different from &quot;Limited by budget&quot;?</strong><br />
                &quot;Limited by budget&quot; means the daily budget is too low for the campaign&apos;s bid level and demand (<a href="https://support.google.com/google-ads/answer/2616012?hl=en" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads Help</a>). &quot;Limited by bid strategy&quot; means the bid strategy itself, not the budget, is the constraint. Same word, different problem, different fix.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Can I just ignore the &quot;Limited&quot; status?</strong><br />
                Often yes, if results are on plan. If the strategy reflects deliberate margin discipline, the warning is the price of that discipline. Ignore the label, watch CPA, conversions, and profit instead.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Fix It Once, or Let It Run Itself
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Connect your <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads account</a>. On the first run, B6 surfaces every campaign with a bid-limit or target-induced &quot;Limited&quot; status, ranks them by potential impact on CPA, and proposes the change. You approve, B6 applies. <a href="/b6#buzz" style={{ color: '#764ba2', textDecoration: 'underline' }}>See how Buzz handles bidding</a>, or jump straight to <a href="/pricing" style={{ color: '#764ba2', textDecoration: 'underline' }}>B6 pricing</a>.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px',
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Tired of hovering the Status column every Monday?
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: '500', opacity: 0.9 }}>
                  Connect Google Ads, and B6 surfaces every campaign where a bid limit or target is the actual constraint, with a one-click revertable fix attached to each.
                </p>
                <a
                  href="/chat"
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    textDecoration: 'none',
                  }}
                >
                  Run the Diagnostic
                </a>
              </div>
            </section>

          </div>
        </div>
        <KeepReading slug="google-ads-bid-strategy-status-limited" category="google-ads" />
      <Footer compact={true} />
      </div>
    </>
  );
}
