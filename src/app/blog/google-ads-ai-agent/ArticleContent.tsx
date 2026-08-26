'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { HubSpokes, KeyTakeaways } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-ai-agent#article',
    headline: 'Google Ads AI Agent: What They Actually Do, Where They Break, and How to Choose (2026)',
    description:
      "A Google Ads AI agent runs campaign tasks autonomously, not just suggests them. We break down what they do, where they fail, Google's own agents, and how to pick one.",
    image: 'https://www.kampaio.com/og/google-ads-ai-agent.png',
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
    datePublished: '2026-06-23T00:00:00.000Z',
    dateModified: '2026-07-07T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-ai-agent',
    },
    keywords:
      'google ads ai agent, ai agent for google ads, autonomous campaign management, Smart Bidding, Performance Max, Ads Advisor, Analytics Advisor, Ask Advisor, Optmyzr, Madgicx, negative keywords, anomaly detection, account control, Kampaio',
    inLanguage: 'en',
    "wordCount": 1859,
    "articleSection": "Google Ads"
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Google Ads AI agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Google Ads AI agent is software that connects to your Google Ads account, reads performance data, makes decisions about what to change, and executes those changes (bids, budgets, negatives, ad copy) autonomously or with your approval. It differs from Smart Bidding, which only adjusts bids, and from recommendation tools, which tell you what to change but require you to implement it.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Google Ads AI agents differ from Smart Bidding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Smart Bidding is Google's automated bid adjustment system. It operates at the bid level only, using Google's own auction and conversion signals. A full AI agent operates at account scope: it can manage budgets across campaigns, add or remove keywords, pause ads, and rewrite copy. Smart Bidding is one module of what a full agent does.",
        },
      },
      {
        '@type': 'Question',
        name: "Are Google's AI agents (Ads Advisor, Analytics Advisor, Ask Advisor) autonomous?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No. All three of Google's agentic products operate in an advisory or assisted model: they recommend actions or implement them with your explicit permission. None runs your account end-to-end without your involvement. This is stated in Google's own product descriptions. Roll-out availability varies by region and account type as of mid-2026.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the risks of letting an AI agent control my Google Ads account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The three main risks are hallucinated reasoning (agent acts confidently on a wrong inference), missing business context (agent does not know about your promotions, margins, or stock levels), and the accountability gap (unclear audit trail when something goes wrong). These risks are manageable with approval gates, spend caps, and a full change log, not by avoiding agents entirely.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does an AI agent for Google Ads cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Costs range from included (Google's native agents) to $499+/mo for recommendation tools (Optmyzr, Madgicx) to $99 to $399/mo for autonomous agents like Kampaio. Evaluate cost as a percentage of your managed spend: $499/mo on a $5K budget is a 10% fee, which makes advisory tools a poor value for smaller accounts. Many vendors (AdSpyder, Adsroid, Ryze, Markifact) do not publish pricing.",
        },
      },
      {
        '@type': 'Question',
        name: 'Do I still need a PPC specialist if I use an AI agent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most SMB accounts in the $3 to 50K/mo range, an autonomous AI agent with approval gates can handle day-to-day execution without a dedicated in-house specialist. A PPC specialist still adds value for strategy, creative direction, and interpreting results in business context. Think of it as replacing the reactive monitoring and execution work, not the strategic judgment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can AI run my ad account for me at this point?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, with constraints. Current AI agents handle bidding, budget reallocation, negative keyword management, ad copy testing, and anomaly detection reliably. They break on context they cannot access (margins, promotions, brand decisions) and on hallucinated root-cause analysis. The practical setup: autonomous execution within spend caps, with approval gates for larger moves and a daily change log review.',
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
        name: 'Google Ads AI Agent: What They Actually Do, Where They Break, and How to Choose (2026)',
        item: 'https://www.kampaio.com/blog/google-ads-ai-agent',
      },
    ],
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: Google Ads AI Agents in One Table', level: 1 },
    { id: 'what-is', title: 'What Is a Google Ads AI Agent?', level: 1 },
    { id: 'what-can-do', title: 'What Can a Google Ads AI Agent Actually Do?', level: 1 },
    { id: 'googles-agents', title: "Google's Own AI Agents: Ads Advisor, Analytics Advisor, Ask Advisor", level: 1 },
    { id: 'where-break', title: 'Where AI Agents Break (The Honest Section)', level: 1 },
    { id: 'vs-smart-bidding', title: 'AI Agent vs Smart Bidding vs Recommendation Tools', level: 1 },
    { id: 'how-to-choose', title: 'How to Choose a Google Ads AI Agent for Your Budget', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'bottom-line', title: 'The Bottom Line: An Agent That Does the Work', level: 1 },
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

  const thStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '2px solid #e5e7eb',
    textAlign: 'left',
    fontWeight: 600,
    color: '#1e293b',
    fontSize: '15px',
    background: '#f8fafc',
  };
  const tdStyle: React.CSSProperties = {
    padding: '12px 14px',
    borderBottom: '1px solid #e5e7eb',
    color: '#1e293b',
    fontSize: '15px',
    verticalAlign: 'top',
  };

  // TL;DR comparison table (agent type / what it does / autonomous or advisory / starting price).
  const tldrRows = [
    { type: 'Google Ads Advisor', does: 'Recommendations inside Google Ads; implements with approval (GA Dec 2025)', mode: 'Advisory (you approve)', price: 'Included in Google Ads' },
    { type: 'Google Analytics Advisor', does: 'Surfaces GA insights, trends, anomalies (GA Dec 2025)', mode: 'Advisory only', price: 'Included in Google Analytics' },
    { type: 'Google Ask Advisor', does: 'Proactive hub across Ads, Analytics, DV360, Merchant Center (beta, May 2026)', mode: 'Advisory / proactive', price: 'Included in Google Ads' },
    { type: 'Optmyzr', does: 'Budget pacing, rule-based automation, recommendations', mode: 'Advisory', price: '~$499/mo' },
    { type: 'Madgicx', does: 'Audience insights, automated rules, ad suggestions', mode: 'Advisory / semi-auto', price: '$499+/mo' },
    { type: 'AdSpyder / Adsroid / Ryze', does: 'Campaign build + copy generation', mode: 'Semi-auto (build-focused)', price: 'Pricing not published' },
    { type: 'Kampaio', does: 'Bids, budgets, negatives, copy, anomaly detection, reporting', mode: 'Autonomous with approval gates', price: '$99/mo', highlight: true },
  ];

  // Six core workflow areas a full-account agent covers.
  const workflows = [
    { n: '1', title: 'Search-term mining and negatives', body: 'Scans search term reports continuously, identifies waste patterns, adds negatives without a weekly manual audit.', accent: '#667eea' },
    { n: '2', title: 'Bid and budget reallocation', body: 'Moves budget between campaigns and ad groups based on ROAS, conversion rate, and margin signals, not just bid-level Smart Bidding.', accent: '#764ba2' },
    { n: '3', title: 'Ad copy testing', body: 'Generates RSA headline and description variants, runs split logic, pauses underperformers. Works alongside pMax asset groups.', accent: '#10b981' },
    { n: '4', title: 'Anomaly detection', body: 'Flags CPA spikes, CTR drops, impression share collapse, or conversion tracking breaks before the day\'s budget is gone.', accent: '#f59e0b' },
    { n: '5', title: 'Landing page correlation', body: 'Ties page-level metrics (bounce rate, scroll depth) to ad performance and surfaces mismatches.', accent: '#ef4444' },
    { n: '6', title: 'Reporting and attribution', body: 'Synthesizes account-wide performance into actionable summaries, not just raw numbers.', accent: '#0ea5e9' },
  ];

  // Three predictable failure modes.
  const failures = [
    { n: '1', title: 'Hallucinated reasoning', body: 'AI agents can act with high confidence on wrong inferences. An agent reading "CPA rose 30%" may blame bidding when the real cause is a broken conversion tag. The action (lower bids) is logical given the wrong premise, but makes performance worse.', accent: '#ef4444' },
    { n: '2', title: 'No business context', body: 'An agent knows your Google Ads data. It does not know you are running a flash sale, that your top SKU is out of stock, or that your margins dropped 15% last month. Reallocations that look smart in isolation get costly when they ignore context the agent cannot see.', accent: '#f59e0b' },
    { n: '3', title: 'The accountability gap', body: 'When an agent makes a wrong call, the budget loss is real and the audit trail matters. "The AI did it" is not a useful explanation. Agents that log every action with reasoning (timestamped, reversible) close this gap. Agents that act silently do not.', accent: '#764ba2' },
  ];

  // AI Agent vs Smart Bidding vs recommendation tools.
  const compareRows = [
    { tool: 'Smart Bidding (Google)', scope: 'Bid adjustments only, using Google\'s data', auto: 'Autonomous within bidding only', price: 'Included in Google Ads' },
    { tool: 'Optmyzr', scope: 'Rules, budget pacing, recommendations across account', auto: 'Advisory (you implement)', price: '~$499/mo' },
    { tool: 'Madgicx', scope: 'Audience insights, automated rules, ad suggestions', auto: 'Semi-autonomous (rules-based)', price: '$499+/mo' },
    { tool: 'Kampaio', scope: 'Bids, budgets, negatives, copy, anomaly detection', auto: 'Autonomous with approval gates', price: '$99 to $399/mo', highlight: true },
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
          <ArticleHero slug="google-ads-ai-agent" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              AI &amp; Automation
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads AI Agent: What They Actually Do, Where They Break, and How to Choose (2026)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              The line between an agent that suggests and one that does the work is what matters most in 2026. Here is where every option lands, and how to pick safely.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 23, 2026 · Updated July 7, 2026 · 12 min read</span>
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
                A Google Ads AI agent is software that executes campaign tasks autonomously: it perceives your account state, decides what to fix, and acts, without waiting for you to click. That makes it different from Smart Bidding, which only adjusts bids. The line between &quot;suggests&quot; and &quot;does&quot; is what matters most in 2026.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: Google Ads AI Agents in One Table</h2>
              <p style={paragraphStyle}>
                Google Ads AI agents sit on a spectrum from advisory (recommends, you execute) to fully autonomous (acts without approval). Here is where the main options land:
              </p>

              {/* VISUAL 1: TL;DR comparison table (extractable block) */}
              <div style={{ overflowX: 'auto', margin: '32px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Agent type</th>
                      <th style={thStyle}>What it does</th>
                      <th style={thStyle}>Autonomous or advisory</th>
                      <th style={thStyle}>Starting price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tldrRows.map((row) => (
                      <tr key={row.type} style={row.highlight ? { background: 'rgba(102, 126, 234, 0.06)' } : undefined}>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>
                          {row.type === 'Kampaio' ? <a href="/pricing" style={linkStyle}>Kampaio</a> : row.type}
                        </td>
                        <td style={tdStyle}>{row.does}</td>
                        <td style={tdStyle}>{row.mode}</td>
                        <td style={tdStyle}>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={paragraphStyle}>
                One risk applies across every tier: the moment an agent controls your account, you need to see every action it takes.
              </p>

              <MascotQuote mascot="buzz">
                In one week on a $12K/mo account, I moved $840 from three underperforming ad groups into the top search campaign. ROAS went from 3.1x to 4.6x. Every reallocation was logged, timestamped, and reversible in one click.
              </MascotQuote>
            </section>

            {/* What Is */}
            <section id="what-is">
              <h2 style={h2Style}>What Is a Google Ads AI Agent?</h2>
              <p style={paragraphStyle}>
                A Google Ads AI agent is software that perceives account state, decides what to do, and takes action, with minimal or no human input for each step. That last part is what separates a true agent from the automation tools most advertisers already use.
              </p>
              <p style={paragraphStyle}>
                The Advisory-to-Autonomous Spectrum (what we call the A2A Spectrum) maps four distinct tool types in this space:
              </p>

              {/* VISUAL 2: HubSpokes (bold-viz), the A2A Spectrum tool types */}
              <HubSpokes
                hub="Account access"
                spokes={['LLM chatbot (talks, zero access)', 'Smart Bidding (bids only)', 'Script (fixed rule, no reasoning)', 'AI agent (reads, decides, acts)']}
                caption="The A2A Spectrum: four tool types by how much they touch your account"
              />

              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>LLM chatbot (e.g., ChatGPT for PPC):</strong> Talks. Answers questions. Does nothing inside your account. Zero account access.</li>
                <li style={{ marginBottom: '16px' }}><strong>Smart Bidding (Google):</strong> Adjusts bids for each auction using Google&apos;s conversion data. One task, bidding only. No access to keywords, budgets, negatives, or ad copy.</li>
                <li style={{ marginBottom: '16px' }}><strong>Script (rule-based automation):</strong> Executes a fixed rule when a threshold triggers. No reasoning. No adaptation. &quot;If CPA &gt; $40, lower bid 10%.&quot;</li>
                <li style={{ marginBottom: 0 }}><strong>AI agent (e.g., Kampaio):</strong> Reads account data holistically, decides across multiple tasks (bids, budgets, keywords, ad copy, landing pages) and acts. Connects cause to effect across the whole account.</li>
              </ol>

              <p style={paragraphStyle}>
                This distinction matters because most vendors blur it deliberately. Any tool with &quot;AI&quot; in the name gets called an agent. The A2A Spectrum cuts through that: advisory tools tell you what to do, autonomous agents do it.
              </p>
              <p style={paragraphStyle}>
                Concrete example: an AI agent detects that a search term is burning 18% of campaign budget at 0 conversions over 14 days, adds it as a negative keyword, reallocates the freed budget to a high-ROAS ad group, and logs the action, end to end, no human click required.
              </p>
              <p style={paragraphStyle}>
                Google first previewed its own agentic products at <a href="https://blog.google/products/ads-commerce/ai-agents-marketing-advisor/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Marketing Live 2025</a>, then shipped them to general availability in December 2025 as Ads Advisor (inside Google Ads) and Analytics Advisor (inside Google Analytics), unified in 2026 by Ask Advisor, a proactive cross-product hub. We cover those in detail below.
              </p>
            </section>

            {/* What can do */}
            <section id="what-can-do">
              <h2 style={h2Style}>What Can a Google Ads AI Agent Actually Do?</h2>
              <p style={paragraphStyle}>
                A full-account AI agent covers six core workflow areas, well beyond what Smart Bidding handles.
              </p>

              {/* VISUAL 3: Six workflow card grid (3-col, explicit, no auto-fit) */}
              <div className="wf-grid" style={{ display: 'grid', gap: '16px', margin: '32px 0' }}>
                {workflows.map((w) => (
                  <div key={w.n} style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderTop: `4px solid ${w.accent}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: w.accent, color: 'white', fontWeight: 800, fontSize: '15px', marginBottom: '12px' }}>{w.n}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px', lineHeight: 1.35 }}>{w.title}</div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{w.body}</div>
                  </div>
                ))}
              </div>

              <p style={paragraphStyle}>
                Those workflows connect across the account, which is the part Smart Bidding cannot do. Search-term mining feeds <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keyword</a> management; <a href="/blog/google-ads-anomaly-detection" style={{ color: '#764ba2', textDecoration: 'underline' }}>anomaly detection</a> catches <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking breaks</a> before the day&apos;s budget is gone; landing page correlation is where landing page <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization</a> starts.
              </p>
              <p style={paragraphStyle}>
                In Kampaio, these workflows map to specific agents: <a href="/b6#buzz" style={linkStyle}>Buzz handles bid and budget reallocation</a>, Aegis runs anomaly detection and guardrails, Echo manages ad copy testing and reporting. The other four agents (Vox, Maximus, Mira, Sage) handle competitive intelligence, audience signals, feed optimization, and <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a>.
              </p>
              <p style={paragraphStyle}>
                Generic vendors like AdSpyder and Adsroid position around workflow 3 (build campaigns 5x faster, generate copy). That is a useful capability. But building a campaign once is the easy part. Managing it week after week, reallocating budget as search intent shifts, killing waste before it compounds: that is the harder, higher-value job. The full breakdown of <a href="/blog/10-ai-powered-ppc-optimization-strategies" style={{ color: '#764ba2', textDecoration: 'underline' }}>AI-powered PPC</a> optimization workflows is in our <a href="/blog/ai-powered-ppc-optimization-complete-guide" style={linkStyle}>complete guide to AI PPC optimization</a>.
              </p>
            </section>

            {/* Google's agents */}
            <section id="googles-agents">
              <h2 style={h2Style}>Google&apos;s Own AI Agents: Ads Advisor, Analytics Advisor, Ask Advisor</h2>
              <p style={paragraphStyle}>
                Google now ships these agentic products (first previewed as &quot;Marketing Advisor&quot; and agentic concepts at Google Marketing Live in May 2025, then renamed and shipped to general availability for all English-language accounts in December 2025). All advise and assist; none runs your account end-to-end without your involvement.
              </p>
              <p style={paragraphStyle}>
                <strong>Ads Advisor</strong> lives inside Google Ads (GA December 2025). It answers your questions, delivers personalized recommendations tailored to your account&apos;s goals, can suggest tightly themed ad groups and assets, and can implement recommendations on your behalf once you approve. It is reactive and advisory: you still own the execution decision.
              </p>
              <p style={paragraphStyle}>
                <strong>Analytics Advisor</strong> operates inside Google Analytics (GA December 2025). It surfaces insights, trends, and anomalies and answers analytics questions. No campaign execution: it reads, it tells you, you act.
              </p>
              <p style={paragraphStyle}>
                <strong>Ask Advisor</strong> (announced May 20, 2026 at Google Marketing Live 2026, and in beta for English-language accounts as of this writing) is the proactive, Gemini-powered hub that orchestrates the specialist agents across Google Ads, Google Analytics, Display &amp; Video 360, and Merchant Center. Where Ads Advisor waits for your question, Ask Advisor surfaces recommendations on its own from your account data. Still permissioned: it proposes, you approve. Because it is a rolling beta, treat availability as a moving target and confirm access in your own account.
              </p>
              <p style={paragraphStyle}>
                All three products operate &quot;with permission&quot; or &quot;on behalf of&quot; the advertiser, as described in <a href="https://blog.google/products/ads-commerce/ai-agents-marketing-advisor/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google&apos;s announcement</a>. Roll-out was announced in May 2025 as &quot;will begin rolling out later this year.&quot; As of this writing, availability varies by region and account type. Verify current access in your own Google Ads account before planning around these features.
              </p>

              <KeyTakeaways
                items={[
                  "Google's agents are excellent diagnostics and recommendation layers: they close the gap between not knowing what to fix and knowing what to fix.",
                  'But the work of actually fixing it (bid changes, budget shifts, copy updates, negatives) still falls to you or your tool.',
                  'That is the advisory boundary competitors rarely say out loud.',
                ]}
              />
            </section>

            {/* Where break */}
            <section id="where-break">
              <h2 style={h2Style}>Where AI Agents Break (The Honest Section)</h2>
              <p style={paragraphStyle}>
                Across 63 public discussions on google ads ai agent (Reddit: 33, Hacker News: 25, Stack Exchange: 4, X: 1, analyzed 2026-06-22), the dominant theme is not &quot;does it work.&quot; The dominant theme is account control: who is responsible when AI spends wrong.
              </p>
              <p style={paragraphStyle}>
                When <a href="https://x.com/AIFrontliner/status/2049031444375175291" style={linkStyle} target="_blank" rel="noopener noreferrer">@AIFrontliner posted on X</a> in April 2026, &quot;Google just gave an AI agent control over your ad account,&quot; the quote spread because it named a fear that had been building for two years. It is worth taking that fear seriously rather than dismissing it as technophobia.
              </p>
              <p style={paragraphStyle}>
                <a href="https://www.reddit.com/r/PPC/comments/1poyac1/can_ai_run_ad_accounts_for_me_at_this_point/" style={linkStyle} target="_blank" rel="noopener noreferrer">&quot;Can AI run ad accounts for me at this point?&quot;</a> is the question a Reddit r/PPC user asked in December 2025. The answer is: sometimes yes, but with three predictable failure modes you need to know before you hand over the keys.
              </p>

              {/* VISUAL 4: Three failure-mode card grid (3-col, explicit, no auto-fit) */}
              <div className="fail-grid" style={{ display: 'grid', gap: '16px', margin: '32px 0' }}>
                {failures.map((f) => (
                  <div key={f.n} style={{ background: '#fef9f5', border: '1px solid #f3e3d3', borderTop: `4px solid ${f.accent}`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: f.accent, color: 'white', fontWeight: 800, fontSize: '15px', marginBottom: '12px' }}>{f.n}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px', lineHeight: 1.35 }}>{f.title}</div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{f.body}</div>
                  </div>
                ))}
              </div>

              <p style={paragraphStyle}>
                The accountability gap is the core case for approval gates: you stay in the loop for decisions above a certain spend threshold. Agents without anomaly detection layered on top are especially vulnerable to acting on a wrong premise like a <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>broken conversion tag</a>.
              </p>

              <MascotQuote mascot="aegis">
                Last Tuesday I flagged a $220 anomaly: CPC in the brand campaign jumped 40% in 4 hours. Root cause: a competitor was bidding on the exact brand term. I paused auto-budget expansion, notified the account owner, and held the daily cap. The owner approved a counter-bid adjustment within 2 hours. Budget that would have been spent by morning under auto-expansion: estimated $640.
              </MascotQuote>

              <p style={paragraphStyle}>
                These three failure modes are not reasons to avoid agents. They are reasons to choose agents with the right guardrails. Spend caps per campaign per day, approval gates for any action above a threshold of monthly budget, and a change log you can read like a timeline: these are the controls that make autonomous execution safe to use.
              </p>
            </section>

            {/* vs Smart Bidding */}
            <section id="vs-smart-bidding">
              <h2 style={h2Style}>AI Agent vs Smart Bidding vs Recommendation Tools</h2>
              <p style={paragraphStyle}>
                A Google Ads AI agent is not the same as Smart Bidding, and not the same as a recommendation tool. The A2A Spectrum (Advisory-to-Autonomous) makes the difference visible:
              </p>

              {/* VISUAL 5: Comparison table (extractable block) */}
              <div style={{ overflowX: 'auto', margin: '32px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Tool</th>
                      <th style={thStyle}>Scope</th>
                      <th style={thStyle}>Autonomous?</th>
                      <th style={thStyle}>Starting price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row) => (
                      <tr key={row.tool} style={row.highlight ? { background: 'rgba(102, 126, 234, 0.06)' } : undefined}>
                        <td style={{ ...tdStyle, fontWeight: 600 }}>{row.tool}</td>
                        <td style={tdStyle}>{row.scope}</td>
                        <td style={tdStyle}>{row.auto}</td>
                        <td style={tdStyle}>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={paragraphStyle}>
                <a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Smart Bidding</a> is technically already an agent for one task: it perceives auction signals, decides a bid, and acts, fully autonomously, millions of times per day. Our <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>guide to Smart Bidding strategies</a> covers how to configure it so a full-account agent can build on top of it. Full-account agents extend that same perceive-decide-act loop across the entire account: keyword strategy, budget allocation, ad copy, and reporting.
              </p>
              <p style={paragraphStyle}>
                Recommendation tools like Optmyzr and Madgicx sit at the advisory end. They surface what needs to change and show you how to implement it, but implementation still requires your click. Powerful for advertisers who want to stay in control of every change. Less useful for owners who don&apos;t have time to action 30 recommendations a week. For a head-to-head breakdown of the major options, see our <a href="/blog/google-ads-optimizer-software-compared" style={linkStyle}>Google Ads optimizer software comparison</a>.
              </p>
            </section>

            {/* How to choose */}
            <section id="how-to-choose">
              <h2 style={h2Style}>How to Choose a Google Ads AI Agent for Your Budget</h2>
              <p style={paragraphStyle}>
                Choose on three axes: the autonomy level you are comfortable with, the visibility you have into every action it takes, and the cost as a percentage of your ad spend.
              </p>
              <p style={paragraphStyle}>
                That third axis is where most SMB decisions get stuck. A $499/mo recommendation tool on a $5K/mo ad budget is a 10% management fee before the tool has done anything. Traditional agencies typically charge 10 to 15% of managed spend. Paying $499 for advisory recommendations that still require manual implementation is paying agency prices for a decision-support tool. If you are evaluating the <a href="/blog/google-ads-without-agency" style={linkStyle}>agency vs. AI agent tradeoff</a>, the cost math alone often decides it.
              </p>
              <p style={{ ...paragraphStyle, marginBottom: '16px', fontWeight: 600 }}>Three questions to run on any vendor before you sign up:</p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '12px' }}><strong>Does it execute, or does it suggest?</strong> If the answer is &quot;we recommend and you implement,&quot; you are buying a recommendation tool, not an agent.</li>
                <li style={{ marginBottom: '12px' }}><strong>Can you see every action it takes, in real time?</strong> A change log you cannot read is a trust problem waiting to become a budget problem.</li>
                <li style={{ marginBottom: 0 }}><strong>What percentage of your monthly ad spend is the monthly fee?</strong> Above 8% for advisory tools is hard to justify for SMBs with budgets under $10K/mo.</li>
              </ol>
              <p style={paragraphStyle}>
                Kampaio is built for the $3 to 50K/mo segment. At $99/mo (Co-pilot tier), it runs bids and surfaces recommendations. At $199/mo (Approval tier), it executes with your sign-off on each action. At $399/mo (Autonomous tier), it runs the account end-to-end with spend caps and a live action log. Every tier shows every step. See current plan details at <a href="/pricing" style={linkStyle}>kampaio.com/pricing</a>.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              {faqSchema.mainEntity.map((qa) => (
                <div key={qa.name} style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{qa.name}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{qa.acceptedAnswer.text}</p>
                </div>
              ))}
              <p style={{ ...paragraphStyle, fontSize: '15px', color: '#64748b', marginTop: '16px' }}>
                Source for Google&apos;s agentic products: <a href="https://blog.google/products/ads-commerce/ai-agents-marketing-advisor/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google: AI agents for marketing</a>. Source for Smart Bidding: <a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help: About Smart Bidding</a>.
              </p>
            </section>

            {/* Bottom line */}
            <section id="bottom-line">
              <h2 style={h2Style}>The Bottom Line: An Agent That Does the Work, Not Just the Talking</h2>
              <p style={paragraphStyle}>
                The advisory-vs-autonomous line is where most of the market still sits. Google&apos;s own agents advise. Recommendation tools advise at $499/mo. The value gap for SMB owners with no in-house PPC support is not better advice: it is execution without the full-time headcount.
              </p>
              <p style={paragraphStyle}>
                Kampaio runs bids, moves budget, mines negatives, tests copy, and catches anomalies before they burn through daily cap. Every action is visible, every step is logged, and every tier comes with approval gates that keep you in control of the big decisions. From $99/mo on accounts starting at $3K/month ad spend.
              </p>

              <MascotQuote mascot="buzz">
                The math is simple. At $99/mo on a $5K ad budget, that is 2% of spend. If I save one wasted search term cluster per month, the average recapture is $300 to $500 in redirected budget. The fee pays back inside the first week.
              </MascotQuote>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  See an AI agent run on your real account
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Connect Google Ads to Kampaio and watch the agents read your account, choose each change, and show the rationale live, before anything applies. Flat pricing <a href="/pricing" style={linkStyle}>from $99/mo</a>, with approval gates on by default.
                </p>
                <a
                  href="/chat"
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
                  Try Kampaio Free
                </a>
              </div>
              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                Vendor pricing and capabilities are summarized from public materials as of July 2026 and may change. Optmyzr (~$499/mo) and Madgicx ($499+/mo) are recommendation tools; AdSpyder, Adsroid, Ryze, and Markifact do not publish pricing. Google&apos;s agentic products reached general availability for English-language accounts in December 2025 as Ads Advisor and Analytics Advisor, unified on May 20, 2026 by Ask Advisor (in beta for English-language accounts); availability still varies by region and account type. This article is informational and does not constitute professional advertising advice.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-ai-agent" category="ai" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .wf-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        .fail-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .wf-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 760px) {
          .fail-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 560px) {
          .wf-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
