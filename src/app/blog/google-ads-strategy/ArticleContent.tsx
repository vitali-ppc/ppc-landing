'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Strategy: A Strategic Operator's Framework (2026)",
    "description": "Most Google Ads advice is tactics. This is the strategy layer: set the objective, structure the account, allocate budget, align KPIs with the business, and decide when to automate the operational layer as spend scales from $10K to $100K per month.",
    "image": "https://kampaio.com/og/google-ads-strategy.png",
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
    "datePublished": "2026-06-06T00:00:00.000Z",
    "dateModified": "2026-06-06T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-strategy"
    },
    "keywords": "google ads strategy, strategy vs tactics, account structure, budget allocation, smart bidding, target roas, performance max, data-driven attribution, kpi alignment, autonomous ppc, b6, vox, maximus",
    "wordCount": 2700,
    "articleSection": "Strategy",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best strategy for Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is no single best strategy. The best one is whichever matches your business objective. A lead-gen account, a revenue and ROAS account, and a brand-demand account each need different structures, bid strategies, and KPIs. Decide the north-star metric finance agrees on first, and the rest of the stack follows from it."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a Google Ads strategy and tactics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tactics are execution decisions: match types, bid adjustments, ad copy, negative keywords. Strategy is the upstream set of decisions that determine which tactics make sense at all: the objective, account structure, budget allocation, bidding approach, measurement, and operating model. Most accounts fail at the strategy layer and then blame the tactics."
        }
      },
      {
        "@type": "Question",
        "name": "How do you build a Google Ads strategy from scratch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Work top down. Define the one objective and its north-star metric, design account structure to match (segment by intent tier, not arbitrary product category), allocate budget across proven, expansion, and test, choose a bid strategy that fits your conversion volume, set up measurement that aligns with the business, then decide who and what runs the operational layer."
        }
      },
      {
        "@type": "Question",
        "name": "How much budget do you need for a Google Ads strategy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The constraint is conversion volume, not a fixed dollar floor. Value-based bidding (Target ROAS) generally needs around 30 conversions in 30 days to stabilize, so budget enough to clear that at your CPA. Below that, start with Maximize Conversions or Target CPA and let volume build before you move to value bidding."
        }
      },
      {
        "@type": "Question",
        "name": "Should Performance Max be part of my Google Ads strategy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It can be, as a deliberate structural bet rather than a default. PMax works when it is segmented by asset group, fed audience signals, and walled off so it does not cannibalize Search and Shopping. Letting it run unsegmented above roughly $30K a month is where it usually goes wrong."
        }
      },
      {
        "@type": "Question",
        "name": "When should I change my Google Ads strategy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When the business objective changes, when budget scales across a tier boundary (roughly $10K to $50K to $100K a month, where the structure and measurement that worked stop working), or when your reported KPI starts diverging from cash-true contribution. Tactical tweaks are a weekly habit. Strategic changes are a quarterly decision."
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
        "name": "Google Ads Strategy: A Strategic Operator's Framework",
        "item": "https://www.kampaio.com/blog/google-ads-strategy"
      }
    ]
  };

  const tableOfContents = [
    { id: 'not-tactics', title: 'Strategy Is Not a List of Tactics', level: 1 },
    { id: 'layer-1', title: 'Layer 1, Objective', level: 1 },
    { id: 'layer-2', title: 'Layer 2, Account Structure', level: 1 },
    { id: 'layer-3', title: 'Layer 3, Budget Allocation', level: 1 },
    { id: 'layer-4', title: 'Layer 4, Bidding Strategy', level: 1 },
    { id: 'layer-5', title: 'Layer 5, Measurement', level: 1 },
    { id: 'layer-6', title: 'Layer 6, Organization and Tooling', level: 1 },
    { id: 'scale', title: 'How the Strategy Changes as You Scale', level: 1 },
    { id: 'automate', title: 'When to Automate the Operational Layer', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Where to Go From Here', level: 1 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle: React.CSSProperties = { color: '#764ba2', textDecoration: 'underline' };
  const paragraphStyle: React.CSSProperties = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' };
  const h2Style: React.CSSProperties = { fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '24px', marginTop: '56px', scrollMarginTop: '24px' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-strategy" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Strategy · Pillar · Operator
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: 1.2 }}>
              Google Ads Strategy: A Strategic Operator&apos;s Framework (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
              Most Google Ads advice is tactics. This is the strategy layer: a stack of six decisions that decides what your account is for, how budget flows toward it, and when to hand the operational layer to automation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>by B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>SEO Agent at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 6, 2026 · 13 min read</span>
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 600, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
              >
                Table of Contents
                <span style={{ transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>{'▼'}</span>
              </button>
              {isTableOfContentsOpen && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  {tableOfContents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: 1.4 }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#764ba2'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}
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

            {/* Featured snippet intro */}
            <p style={{ ...paragraphStyle, fontSize: '20px', fontWeight: 500, background: '#f8fafc', borderLeft: '4px solid #764ba2', padding: '20px 24px', borderRadius: '8px' }}>
              A Google Ads strategy is the set of upstream decisions that decide what your account is for and how money flows toward it: the objective, the account structure, the budget split, the bidding approach, the measurement model, and who runs the operational layer. Tactics live below all of that. Strategy decides which tactics are even worth running.
            </p>

            {/* TL;DR callout */}
            <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '20px 24px', margin: '32px 0' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#c2410c', letterSpacing: '0.5px', marginBottom: '8px' }}>TL;DR</div>
              <p style={{ fontSize: '17px', lineHeight: 1.7, color: '#1e293b', margin: 0 }}>
                Most &quot;Google Ads strategy&quot; advice is tactics in disguise. Real strategy is a stack of six decisions: objective, structure, budget, bidding, measurement, and organization. Accounts plateau when one upstream layer is wrong, not when a single tactic is mis-set. This pillar walks each layer at operator altitude, shows how the stack shifts as spend scales from $10K to $100K per month, and links down to the deep dives for each piece.
              </p>
            </div>

            <section id="not-tactics">
              <h2 style={h2Style}>Strategy Is Not a List of Tactics</h2>
              <p style={paragraphStyle}>
                Search &quot;Google Ads strategy&quot; and you get tip lists. Add these <a href="/blog/google-ads-negative-keywords" style={{ color: '#764ba2', textDecoration: 'underline' }}>negative keywords</a>. Try this bid adjustment. Write three more responsive search ads. All useful, all real, and all of it is the execution layer. None of it is strategy.
              </p>
              <p style={paragraphStyle}>
                Tactics answer &quot;how do I run this campaign.&quot; Strategy answers a harder question: should this campaign exist, what is it for, and how does its budget map to something the business actually cares about. You can execute every tactic flawlessly inside a strategy that points at the wrong objective and still lose money with great efficiency.
              </p>
              <p style={paragraphStyle}>
                Here is the thesis for the rest of this page. A Google Ads strategy is a stack of six decisions, each one upstream of the next: objective, account structure, budget allocation, bidding, measurement, and organization. When an account stalls, the cause is almost always one of those upstream layers being wrong, not a tactic that needed one more tweak. Fix the layer and the tactics start working. Tweak the tactics while the layer stays broken and you buy yourself a slightly more efficient plateau.
              </p>

              {/* The six-layer stack as an ordered framework list */}
              <div className="b6-stack">
                <div className="b6-stack-row"><span className="b6-stack-num">1</span><span className="b6-stack-name">Objective</span><span className="b6-stack-q">What is this account paid to do?</span></div>
                <div className="b6-stack-row"><span className="b6-stack-num">2</span><span className="b6-stack-name">Structure</span><span className="b6-stack-q">How is the account segmented, and why?</span></div>
                <div className="b6-stack-row"><span className="b6-stack-num">3</span><span className="b6-stack-name">Budget</span><span className="b6-stack-q">Where does the money go, and when does it move?</span></div>
                <div className="b6-stack-row"><span className="b6-stack-num">4</span><span className="b6-stack-name">Bidding</span><span className="b6-stack-q">What target does the machine optimize toward?</span></div>
                <div className="b6-stack-row"><span className="b6-stack-num">5</span><span className="b6-stack-name">Measurement</span><span className="b6-stack-q">Does the reported KPI match the business?</span></div>
                <div className="b6-stack-row"><span className="b6-stack-num">6</span><span className="b6-stack-name">Organization</span><span className="b6-stack-q">Who and what runs the strategy?</span></div>
              </div>
            </section>

            <section id="layer-1">
              <h2 style={h2Style}>Layer 1, Objective: What Is This Account Actually For</h2>
              <p style={paragraphStyle}>
                The first strategic decision is the one most accounts skip: what is this account paid to do. Generate leads? Drive revenue at a target margin? Build pipeline for a sales team? Create demand for a category that converts later? Each answer implies a different <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization</a> target and, just as important, a different definition of waste.
              </p>
              <p style={paragraphStyle}>
                A lead-gen account that optimizes pure ROAS will starve the campaigns that fill the sales pipeline because their value shows up weeks later in a CRM the bidder cannot see. A margin-constrained ecommerce account that chases conversion volume will scale itself into unprofitable inventory. Same platform, opposite correct moves, and the only thing that tells them apart is the objective.
              </p>
              <p style={paragraphStyle}>
                The objective has to resolve to one north-star metric that the PPC team and finance both agree on. If the media buyer optimizes ROAS and the CFO measures contribution margin, both can be right at the same time and the account still loses the budget argument every quarter. No tactic repairs that disagreement. It is a strategy-layer decision that has to be made before anyone touches a campaign.
              </p>

              <MascotQuote mascot="vox">
                On a $50K per month account I&apos;ll usually hold a 60 / 25 / 15 split: 60% to proven high-intent campaigns, 25% to deliberate demand expansion, 15% ring-fenced as test budget. The moment the proven campaigns hit diminishing returns (the last 10% of spend earning under half the ROAS of the first 10%), I move money to expansion instead of forcing it through a saturated auction.
              </MascotQuote>
            </section>

            <section id="layer-2">
              <h2 style={h2Style}>Layer 2, Account Structure: The Architecture Decisions</h2>
              <p style={paragraphStyle}>
                Structure is strategy made concrete in the account. How you segment campaigns decides where budget can flow and what the bidding system is allowed to learn on. Segment by intent tier and margin and funnel stage, and the account becomes steerable. Segment by arbitrary product category because that is how the website is organized, and you hand Smart Bidding a blurred signal and yourself a set of levers that do not move what you need.
              </p>
              <p style={paragraphStyle}>
                This is why structure is a strategic choice rather than a tactical one. A campaign built around high-intent, bottom-funnel queries deserves a different budget posture and a different bid strategy than one built to create demand at the top. If those two live inside the same campaign, you cannot fund them independently and the bidder averages them into mush.
              </p>
              <p style={paragraphStyle}>
                The bigger structural bets are which campaign types carry the account: Search for explicit intent, Performance Max for automated cross-channel reach, Shopping for retail feeds. Each is a different trade between control and automation, and choosing the mix is a strategy decision, not a setting. For the execution detail underneath this layer, see the deep dives on <a href="/blog/google-ads-keyword-match-types-explained" style={linkStyle}>how match types shape which searches you actually buy</a> and <a href="/blog/responsive-search-ads-best-practices" style={linkStyle}>building responsive search ads that hold up</a>. Keep this layer at the level of architecture: what gets its own campaign and why, not where to click to create one.
              </p>
            </section>

            <section id="layer-3">
              <h2 style={h2Style}>Layer 3, Budget Allocation: Where the Money Decides the Outcome</h2>
              <p style={paragraphStyle}>
                Budget allocation is the most under-discussed lever in Google Ads, and it sets the ceiling more decisively than any single optimization. You can tune bids and creative for months and gain a few percent. Reallocate a quarter of the budget from a saturated campaign to an under-funded one with room to run, and you move the whole account.
              </p>
              <p style={paragraphStyle}>
                The logic is marginal return. The last dollar in a campaign almost never earns what the first dollar did, because the first dollar buys your most valuable, highest-intent inventory and each additional dollar reaches a little further down the intent curve. Strategy is reallocating before returns flatten, not after. The operators who win are the ones who treat budget as fluid and move it on a schedule, rather than setting it once and defending it.
              </p>
              <p style={paragraphStyle}>
                A workable default at most spend levels: protect the proven high-intent campaigns, fund demand expansion as a deliberate line item rather than an afterthought, and ring-fence a test budget (commonly 10 to 20 percent) so experiments are not stealing from production whenever someone gets curious. Google&apos;s own <a href="https://support.google.com/google-ads/answer/2476691" target="_blank" rel="noopener noreferrer" style={linkStyle}>guidance on increasing reach and performance</a> sits at the tactic layer; the strategic move is deciding how much of the budget is allowed to chase reach in the first place.
              </p>
            </section>

            <section id="layer-4">
              <h2 style={h2Style}>Layer 4, Bidding Strategy: Aligning the Machine With the Objective</h2>
              <p style={paragraphStyle}>
                Bidding is where strategy meets automation, and where a strategy error gets executed at machine speed. <a href="https://support.google.com/google-ads/answer/7065882" target="_blank" rel="noopener noreferrer" style={linkStyle}>Smart Bidding</a> optimizes toward exactly the target you hand it. Set Target ROAS at a number your account has never hit and the auction quietly skips your bids. Set Target CPA below your real cost of a conversion and volume collapses. The machine is not wrong. It is doing precisely what the strategy told it to.
              </p>
              <p style={paragraphStyle}>
                The strategic work is matching the bid strategy to both the objective and the data you actually have. Maximize Conversions when you need volume and lack a reliable value signal. Target CPA when you know your cost ceiling per conversion. Target ROAS when you have value data and enough conversions for the model to trust it, which practitioners generally put around 30 conversions in the trailing 30 days at the strategy level. Below that threshold, value-based bidding starves on thin data and you are better off with a simpler strategy until volume catches up.
              </p>
              <p style={paragraphStyle}>
                Every change to a bid strategy also costs a learning period, roughly 7 to 14 days of unstable performance while the system re-calibrates. That cost is real and it is strategic: it means you cannot thrash between bid strategies chasing weekly noise without paying a re-learning tax each time. And because the bidder optimizes toward whatever your attribution model reports, the model you choose feeds straight into bidding behavior. The deep dive on <a href="/blog/google-ads-attribution-models-guide" style={linkStyle}>how attribution models reshape the numbers the bidder sees</a> covers that handoff in detail.
              </p>
            </section>

            <section id="layer-5">
              <h2 style={h2Style}>Layer 5, Measurement: The KPI That Aligns With the Business</h2>
              <p style={paragraphStyle}>
                Measurement strategy decides what the account is actually optimizing toward, which makes it far more than a reporting chore. Data-Driven Attribution has been the default model since 2023, and it is a genuine improvement over last-click. But even a good attribution model reports an attributed number, and at scale that number can drift away from the incremental, cash-true value the business banks.
              </p>
              <p style={paragraphStyle}>
                The strategic question is whether your reported KPI matches what the CEO or board is paid on. A media team reporting 4x ROAS and a finance team watching contribution margin slide are looking at the same account through different lenses, and both readings can be accurate. The account that survives budget review is the one whose reported metric maps cleanly to the metric leadership trusts. Reporting is part of strategy precisely because it governs which budgets live and which die in the quarterly meeting. For the reporting layer specifically, <a href="/blog/what-ceos-want-google-ads-reports" style={linkStyle}>what CEOs actually want to see in Google Ads reports</a> breaks down the metrics that move budget decisions versus the ones that just fill slides.
              </p>
            </section>

            <section id="layer-6">
              <h2 style={h2Style}>Layer 6, Organization and Tooling: Who and What Runs the Strategy</h2>
              <p style={paragraphStyle}>
                Strategy includes the operating model, because a flawless plan with no one to run it is a document, not a strategy. The first decision here is in-house versus agency versus hybrid. Running Google Ads without an agency is entirely viable once the operational layer is genuinely covered, and it stops being viable the moment that coverage is wishful thinking. The honest version of that trade-off lives in <a href="/blog/google-ads-without-agency" style={linkStyle}>when managing Google Ads without an agency works and when it does not</a>, and the day-to-day operating cadence that keeps an in-house program healthy is laid out in <a href="/blog/ppc-management" style={linkStyle}>how in-house teams actually run paid search</a>.
              </p>
              <p style={paragraphStyle}>
                The second decision is the tool stack, and tooling is a strategic cost most operators under-count. Stack a bid optimizer, a reporting tool, a script library, and a creative tool together and you are paying five contracts and managing five logins. When point tools run roughly $499 a month each (Optmyzr and Madgicx both sit around there), tool spend quietly climbs toward a tenth of a small account&apos;s budget, which does not pencil out. Consolidation is a strategy decision: prefer a stack that does the operational work end to end over a drawer of point tools that each recommend and leave you to execute. Kampaio sits deliberately at the lower end of that math, on a flat subscription with three autonomy levels, because the goal is to run the operational layer, not to add another login to it.
              </p>
            </section>

            <section id="scale">
              <h2 style={h2Style}>How the Strategy Changes as You Scale</h2>
              <p style={paragraphStyle}>
                The strategy stack is not static. The structure and budget logic that is correct at $10K a month is actively wrong at $100K, and operators who carry a small-account playbook into a large account watch performance decay and blame the tactics. Here is what shifts in each layer as budget crosses tier boundaries.
              </p>

              <ComparisonTable
                headers={['Layer', '$10K / month', '$50K / month', '$100K+ / month']}
                rows={[
                  { cells: ['Structure', 'Few campaigns, tight intent, keep it simple', 'Segment by intent tier; isolate PMax from Search', 'Granular intent and margin segmentation'] },
                  { cells: ['Bidding', 'Maximize Conversions or Target CPA', 'Target ROAS viable as volume clears ~30 conv / 30 days', 'Value-based bidding with guardrails; watch saturation'] },
                  { cells: ['Measurement', 'Conversion tracking correct, last-click acceptable to start', 'Data-Driven Attribution; begin incrementality cross-checks', 'Incrementality and contribution margin as the real KPI'] },
                  { cells: ['Organization', 'One operator or a light agency retainer', 'Dedicated owner plus consolidated tooling', 'Strategist owns the stack; operational layer automated'] },
                ]}
                caption="How each layer of the strategy stack shifts as monthly spend crosses tier boundaries."
              />

              <p style={paragraphStyle}>
                Two of the cluster&apos;s deep dives sit directly under this section. The mechanics of raising spend without the wheels coming off are in <a href="/blog/how-to-scale-google-ads-without-losing-roas" style={linkStyle}>how to scale Google Ads without losing ROAS</a>, and the failure modes that show up specifically at the top of that range are catalogued in <a href="/blog/why-google-ads-strategy-fails-at-scale" style={linkStyle}>why Google Ads strategy fails at scale</a>. If your account is stalling somewhere between $30K and $100K a month, start there.
              </p>
            </section>

            <section id="automate">
              <h2 style={h2Style}>When to Automate the Operational Layer</h2>
              <p style={paragraphStyle}>
                There is a modern strategic decision that the tip lists never reach: where the strategist&apos;s time should go. The six layers above are where judgment compounds. The operational layer beneath them (bid checks, anomaly response, pacing adjustments, creative rotation) is necessary, relentless, and largely mechanical. When that operational work starts consuming more hours than the strategy work, the strategist has quietly become a button-presser, and the account loses the one thing only a human can supply: judgment about which layer to change next.
              </p>
              <p style={paragraphStyle}>
                That is the point to automate. A bounded autonomous <a href="/blog/google-ads-ai-agent" style={{ color: '#764ba2', textDecoration: 'underline' }}>agent</a> can own the operational layer (watching for anomalies, reallocating budget across campaigns, rotating creative) while the operator keeps the strategy stack. This is the role Kampaio is built for: Vox handles cross-campaign budget reallocation, Maximus governs how much the system is allowed to do on its own through explicit autonomy levels, and the operator stays on the decisions that actually need a person. You can see how the autonomy tiers map to real actions on the <a href="/b6" style={linkStyle}>product page</a>, with the trade-offs and pricing laid out on the <a href="/pricing" style={linkStyle}>pricing page</a>.
              </p>
            </section>

            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>What is the best strategy for Google Ads?</strong></p>
                <p style={paragraphStyle}>There is no single best strategy. The best one is whichever matches your business objective. A lead-gen account, a revenue and ROAS account, and a brand-demand account each need different structures, bid strategies, and KPIs. Decide the north-star metric finance agrees on first, and the rest of the stack follows from it.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>What is the difference between a Google Ads strategy and tactics?</strong></p>
                <p style={paragraphStyle}>Tactics are execution decisions: match types, bid adjustments, ad copy, negative keywords. Strategy is the upstream set of decisions that determine which tactics make sense at all: the objective, account structure, budget allocation, bidding approach, measurement, and operating model. Most accounts fail at the strategy layer and then blame the tactics.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How do you build a Google Ads strategy from scratch?</strong></p>
                <p style={paragraphStyle}>Work top down. Define the one objective and its north-star metric, design account structure to match (segment by intent tier, not arbitrary product category), allocate budget across proven, expansion, and test, choose a bid strategy that fits your conversion volume, set up measurement that aligns with the business, then decide who and what runs the operational layer.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How much budget do you need for a Google Ads strategy?</strong></p>
                <p style={paragraphStyle}>The constraint is conversion volume, not a fixed dollar floor. Value-based bidding (Target ROAS) generally needs around 30 conversions in 30 days to stabilize, so budget enough to clear that at your CPA. Below that, start with Maximize Conversions or Target CPA and let volume build before you move to value bidding.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Should Performance Max be part of my Google Ads strategy?</strong></p>
                <p style={paragraphStyle}>It can be, as a deliberate structural bet rather than a default. PMax works when it is segmented by asset group, fed audience signals, and walled off so it does not cannibalize Search and Shopping. Letting it run unsegmented above roughly $30K a month is where it usually goes wrong. The same caution applies to any <a href="/blog/5-tips-for-working-with-ai-ppc-tools" style={linkStyle}>AI-driven PPC automation</a> you fold into the account.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>When should I change my Google Ads strategy?</strong></p>
                <p style={paragraphStyle}>When the business objective changes, when budget scales across a tier boundary (roughly $10K to $50K to $100K a month, where the structure and measurement that worked stop working), or when your reported KPI starts diverging from cash-true contribution. Tactical tweaks are a weekly habit. Strategic changes are a quarterly decision.</p>
              </div>
            </section>

            <section id="cta">
              <h2 style={h2Style}>Where to Go From Here</h2>
              <p style={paragraphStyle}>
                Treat the six-layer stack as a map. Objective, structure, budget, bidding, measurement, organization, in that order, top down, because each layer constrains the ones below it. When an account underperforms, walk the stack and find the highest layer that is wrong before you touch a single tactic.
              </p>
              <p style={paragraphStyle}>
                From here the cluster goes deeper on each piece: <a href="/blog/how-to-scale-google-ads-without-losing-roas" style={linkStyle}>scaling without losing ROAS</a>, <a href="/blog/why-google-ads-strategy-fails-at-scale" style={linkStyle}>the failure patterns that show up at scale</a>, <a href="/blog/what-ceos-want-google-ads-reports" style={linkStyle}>reporting that survives the CEO conversation</a>, and <a href="/blog/google-ads-without-agency" style={linkStyle}>running it all without an agency</a>. Own the strategy layer yourself. If the operational layer is eating the hours that should go to strategy, that is exactly the part to hand off.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', padding: '32px', color: 'white', textAlign: 'center', marginTop: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Own the strategy. Automate the operational layer.</h3>
                <p style={{ fontSize: '16px', opacity: 0.95, marginBottom: '24px', lineHeight: 1.6 }}>
                  Kampaio runs the operational layer of your accounts (anomaly monitoring, cross-campaign budget reallocation, creative rotation) so your time goes to the six decisions that move the account. Free while B6 is in beta.
                </p>
                <a href="/chat" style={{ display: 'inline-block', background: 'white', color: '#764ba2', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>
                  Start a free conversation
                </a>
              </div>
            </section>

            <style jsx>{`
              .b6-stack {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 32px 0;
              }
              .b6-stack-row {
                display: grid;
                grid-template-columns: 40px 150px 1fr;
                align-items: center;
                gap: 12px;
                background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
                border: 1px solid #e5e7eb;
                border-left: 3px solid #764ba2;
                border-radius: 8px;
                padding: 14px 16px;
              }
              @media (max-width: 600px) {
                .b6-stack-row {
                  grid-template-columns: 36px 1fr;
                  row-gap: 4px;
                }
                .b6-stack-q { grid-column: 2; }
              }
              .b6-stack-num {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-weight: 700;
                font-size: 15px;
                border-radius: 50%;
              }
              .b6-stack-name {
                font-size: 17px;
                font-weight: 700;
                color: #1e293b;
              }
              .b6-stack-q {
                font-size: 15px;
                color: #475569;
                line-height: 1.5;
              }
            `}</style>
          </div>
        </div>
        <KeepReading slug="google-ads-strategy" category="strategy" />
      <Footer />
      </div>
    </>
  );
}
