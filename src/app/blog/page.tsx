'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'ai', name: 'AI & Automation' },
    { id: 'ai-search', name: 'AI Search & Citations' },
    { id: 'google-ads', name: 'Google Ads' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'ppc', name: 'PPC Optimization' },
    { id: 'b2b', name: 'B2B Marketing' }
  ];

  const blogPosts = [
    {
      id: 37,
      title: 'How Much Does PPC Management Cost? A Real Breakdown for DTC Owners (2026)',
      excerpt: 'PPC management costs $500 to $10,000 a month, or 10 to 20% of ad spend. The three pricing models decoded, the honest line-item breakdown, and the math on whether the fee is worth it at your spend.',
      category: 'ppc',
      author: 'By Kampaio Team',
      date: '2026-06-11',
      readTime: '9 min read',
      slug: 'ppc-management-cost'
    },
    {
      id: 36,
      title: 'How to Choose a PPC Agency (and How to Know When You Don\'t Need One)',
      excerpt: 'A buyer\'s framework for choosing a PPC agency: fair fees, red flags, the questions to ask, and an honest test for whether you even need an agency or just better tooling.',
      category: 'strategy',
      author: 'By Kampaio Team',
      date: '2026-06-10',
      readTime: '11 min read',
      slug: 'how-to-choose-a-ppc-agency'
    },
    {
      id: 35,
      title: 'Google Ads Smart Bidding Strategies: How to Choose the Right One (and When to Avoid Each)',
      excerpt: 'A decision guide to all six Google Ads Smart Bidding strategies: when to use Target CPA vs Target ROAS vs Maximize Conversions, the data thresholds each needs, and when to avoid automation entirely.',
      category: 'google-ads',
      author: 'By Kampaio Team',
      date: '2026-06-08',
      readTime: '11 min read',
      slug: 'google-ads-smart-bidding-strategies'
    },
    {
      id: 34,
      title: "Google Ads for B2B SaaS: The Complete Operator's Playbook (2026)",
      excerpt: 'A complete operator playbook for running Google Ads for B2B SaaS: thin category volume, long sales cycles, buying committees, and attribution. Setup, 4-tier campaign structure, bidding progression, measurement, and scaling.',
      category: 'b2b',
      author: 'By Kampaio Team',
      date: '2026-06-07',
      readTime: '13 min read',
      slug: 'google-ads-for-b2b-saas'
    },
    {
      id: 33,
      title: "Google Ads Strategy: A Strategic Operator's Framework (2026)",
      excerpt: 'Most Google Ads advice is tactics. This pillar covers the strategy layer: a stack of six decisions (objective, structure, budget, bidding, measurement, organization) and how the stack shifts as spend scales from $10K to $100K per month.',
      category: 'strategy',
      author: 'By B6 Team',
      date: '2026-06-06',
      readTime: '13 min read',
      slug: 'google-ads-strategy'
    },
    {
      id: 32,
      title: 'How to Improve Lead Quality in Google Ads (Complete 2026 Guide)',
      excerpt: 'Google Ads sending leads that sales rejects? This guide covers what a qualified lead is, how to measure the gap, why quality drops, and the six levers that fix it.',
      category: 'b2b',
      author: 'By B6 Team',
      date: '2026-06-05',
      readTime: '13 min read',
      slug: 'google-ads-lead-quality-guide'
    },
    {
      id: 31,
      title: 'PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)',
      excerpt: 'What PPC management really is and how an in-house team runs it: the six core disciplines, a weekly and monthly operating cadence, when to audit or restructure, and how to decide if you still need an agency.',
      category: 'ppc',
      author: 'By B6 Team',
      date: '2026-06-04',
      readTime: '13 min read',
      slug: 'ppc-management'
    },
    {
      id: 30,
      title: 'How to Scale Google Ads Without Losing ROAS (2026 Playbook)',
      excerpt: 'Scaling Google Ads spend without tanking ROAS comes down to one rule: raise budgets 20% at a time, wait for Smart Bidding to re-stabilize, and expand demand instead of buying more of the same clicks.',
      category: 'strategy',
      author: 'By B6 Team',
      date: '2026-06-03',
      readTime: '11 min read',
      slug: 'how-to-scale-google-ads-without-losing-roas'
    },
    {
      id: 28,
      title: 'Why Isn\'t My Brand Showing Up in ChatGPT? (How to Diagnose It)',
      excerpt: 'Your brand ranks on Google but never appears in ChatGPT answers? Here are the real root causes and a step-by-step way to diagnose which one is yours.',
      category: 'ai-search',
      author: 'By B6 Team',
      date: '2026-06-02',
      readTime: '9 min read',
      slug: 'why-brand-not-showing-up-in-chatgpt'
    },
    {
      id: 1,
      title: 'What CEOs Want to See in Google Ads Reports',
      excerpt: 'Learn which Google Ads metrics CEOs care about (hint: it\'s not clicks) and get the exact reporting template that secures bigger budgets.',
      category: 'strategy',
      author: 'By B6 Team',
      date: '2025-07-15',
      readTime: '12 min read',
      featured: true,
      slug: 'what-ceos-want-google-ads-reports'
    },
    {
      id: 2,
      title: '10 AI-Powered PPC Optimization Strategies That Actually Work',
      excerpt: 'Discover how artificial intelligence is revolutionizing PPC campaigns and learn proven strategies to boost your ROI.',
      category: 'ai',
      author: 'By B6 Team',
      date: '2025-07-14',
      readTime: '8 min read',
      slug: '10-ai-powered-ppc-optimization-strategies'
    },
    {
      id: 3,
      title: 'The Complete Guide to Google Ads Quality Score in 2026',
      excerpt: 'Master the fundamentals of Quality Score and learn advanced techniques to improve your ad performance in 2026.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-15',
      readTime: '12 min read',
      slug: 'the-complete-guide-to-google-ads-quality-score-in-2025'
    },
    {
      id: 4,
      title: '5 Tips for Working with AI-Powered PPC Tools',
      excerpt: "While competitors struggle with AI, you'll master it. Discover prompts and workflows top PPC pros use to 10x your productivity.",
      category: 'ai',
      author: 'By B6 Team',
      date: '2025-07-22',
      readTime: '7 min read',
      slug: '5-tips-for-working-with-ai-ppc-tools'
    },
    {
      id: 6,
      title: 'Why Performance Max Fails in B2B Marketing',
      excerpt: "The dirty secret Google won't tell you: Performance Max is built for B2C, not B2B. Learn why it fails and get the alternative strategy that actually works.",
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2025-07-23',
      readTime: '9 min read',
      slug: 'performance-max-problems-b2b-marketing'
    },
    {
      id: 7,
      title: 'How AI is Transforming Google Ads in 2025',
      excerpt: "It's 2025 — AI is already transforming Google Ads. Discover the new rules of PPC and get instant, personalized insights to boost your campaigns today.",
      category: 'ai',
      author: 'By B6 Team',
      date: '2025-07-24',
      readTime: '10 min read',
      slug: 'how-ai-is-transforming-google-ads-in-2025'
    },
    {
      id: 8,
      title: 'Performance Max Not Converting? 9 Fixes That Actually Work (2026 Playbook)',
      excerpt: 'Performance Max burning budget without conversions? 9 diagnostic steps from conversion tracking to bid strategy to landing pages — with thresholds and timelines.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-12',
      readTime: '10 min read',
      slug: 'performance-max-not-converting'
    },
    {
      id: 9,
      title: 'Google Ads ROAS Dropped Suddenly? 8 Diagnostic Steps That Find the Real Cause (2026 Playbook)',
      excerpt: 'Google Ads ROAS dropped overnight? Most "ROAS drops" are tracking problems in disguise. An 8-step diagnostic checklist with thresholds and timelines for SMB owners.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-12',
      readTime: '10 min read',
      slug: 'google-ads-roas-dropped-suddenly'
    },
    {
      id: 10,
      title: 'Google Ads Without an Agency: When DIY Works, When It Doesn\'t, and the Third Option',
      excerpt: 'Can you manage Google Ads without paying an agency $2K/month? Yes, if your spend is under $20K and you use the right tools. Here is a realistic framework for SMB owners.',
      category: 'strategy',
      author: 'By B6 Team',
      date: '2026-05-13',
      readTime: '12 min read',
      slug: 'google-ads-without-agency'
    },
    {
      id: 11,
      title: 'Google Ads Not Spending Full Budget? 7 Causes and How to Fix Each One',
      excerpt: 'Your Google Ads campaign is not spending its daily budget. Here are the 7 most common causes, how to diagnose each one in under 2 minutes, and step-by-step fixes.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-14',
      readTime: '11 min read',
      slug: 'google-ads-not-spending-full-budget'
    },
    {
      id: 12,
      title: "8 Signs It's Time to Fire Your PPC Agency (And What to Do Next)",
      excerpt: 'Eight observable signs your PPC agency is failing, a self-scoring diagnostic, and a step-by-step plan for what to do next: confront, switch, or go independent with AI tools.',
      category: 'strategy',
      author: 'By B6 Team',
      date: '2026-05-14',
      readTime: '12 min read',
      slug: 'signs-you-need-to-fire-your-ppc-agency'
    },
    {
      id: 13,
      title: 'Google Ads Conversion Tracking Not Working? The 90-Second Triage and 7 Fixes That Actually Work',
      excerpt: 'Run this 90-second triage first, then fix the 7 most common failure modes: tag missing, duplicate conversions, GA4 mismatch, gclid stripped, enhanced conversions silent fail.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-14',
      readTime: '11 min read',
      slug: 'google-ads-conversion-tracking-not-working'
    },
    {
      id: 14,
      title: 'Google Ads Cost Per Click Too High: 9 Reasons + the Fix Sheet for Each',
      excerpt: 'Your CPC is high for one of 9 specific causes. Diagnostic triage, per-cause fix, and the real numbers we cut CPC by on live accounts (including a 23% CPC drop in 14 days, no bid changes).',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-15',
      readTime: '13 min read',
      slug: 'google-ads-cost-per-click-too-high'
    },
    {
      id: 15,
      title: 'Google Ads Anomaly Detection: Spend Spikes, Conversion Drops, Tracking Outages',
      excerpt: 'Built-in Google Ads alerts are too noisy or too late. The Account Anomaly Detector script is brittle. The detection stack that actually works in 2026: rolling baselines, severity tiers, and Aegis classification.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-15',
      readTime: '12 min read',
      slug: 'google-ads-anomaly-detection'
    },
    {
      id: 16,
      title: 'Responsive Search Ads Best Practices for Senior PPC Managers (2026)',
      excerpt: 'Technical RSA best practices: ML signal quality, asset combinations, ad strength forensics, pinning trade-offs, variant testing with statistical significance.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-15',
      readTime: '13 min read',
      slug: 'responsive-search-ads-best-practices'
    },
    {
      id: 17,
      title: 'Incrementality Testing in Google Ads: What It Measures, How to Run One, and Why Smart Bidding Needs It',
      excerpt: 'Smart Bidding optimizes against last-touch conversions. Lift testing measures causal conversions. Covers Conversion Lift, geo experiments, the Nov 2025 $5K minimum, design pitfalls, and the Smart Bidding feedback loop.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-18',
      readTime: '13 min read',
      slug: 'incrementality-testing-google-ads'
    },
    {
      id: 18,
      title: 'AI-Powered PPC Optimization: The Complete Guide for Senior PPC Managers',
      excerpt: 'A senior PPC manager pillar on AI-PPC. What AI actually decides at the auction-signal level, recommendation vs autonomous tools, a calibrated adoption roadmap, realistic 12-25% ROAS lift on 90 days, and where senior judgment still wins.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-18',
      readTime: '14 min read',
      slug: 'ai-powered-ppc-optimization-complete-guide'
    },
    {
      id: 19,
      title: 'Why Google Ads Strategy Fails at Scale: 8 Diagnostic Patterns Agencies See',
      excerpt: 'Across 20+ client accounts an agency owner sees the same 8 patterns when Google Ads strategy stalls at scale: auction signal exhaustion, attribution drift, KPI misalignment, vendor sprawl. The diagnostic framework to find which is killing your account.',
      category: 'strategy',
      author: 'By B6 Team',
      date: '2026-05-18',
      readTime: '13 min read',
      slug: 'why-google-ads-strategy-fails-at-scale'
    },
    {
      id: 20,
      title: 'Google Ads Attribution Models: A 2026 Guide to Picking the Right One (and Why It Affects Smart Bidding)',
      excerpt: "A senior PPC manager's guide to Google Ads attribution models in 2026. Why Google deprecated four of them, when data-driven beats last-click, the 300-conversion DDA threshold, the Model Comparison tool, and how the attribution choice trains Smart Bidding.",
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-19',
      readTime: '14 min read',
      slug: 'google-ads-attribution-models-guide'
    },
    {
      id: 21,
      title: 'Google Ads Keyword Match Types Explained (Broad, Phrase, Exact 2026)',
      excerpt: 'Broad, phrase, and exact match in Google Ads behave nothing like they did in 2019. How each one works in 2026, how they feed Smart Bidding, and the decision rule that covers 80% of accounts we audit.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-20',
      readTime: '13 min read',
      slug: 'google-ads-keyword-match-types-explained'
    },
    {
      id: 22,
      title: 'PPC Audit Checklist: 25 Senior-Level Checks That Surface 80% of Account Problems (2026)',
      excerpt: 'A senior PPC audit checklist organized in 6 pillars with thresholds, a 3x3 decision matrix, and the 18 checks you can automate. Built for agency owners auditing 4+ accounts a quarter.',
      category: 'ppc',
      author: 'By B6 Team',
      date: '2026-05-21',
      readTime: '11 min read',
      slug: 'ppc-audit-checklist'
    },
    {
      id: 23,
      title: 'Google Ads "Bid Strategy Limited" Status: What It Means and How to Fix It',
      excerpt: 'What "Limited by bid strategy" and "Eligible (Limited)" mean, the four real causes, the 5-step fix, and when ignoring the warning is the right call.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-22',
      readTime: '12 min read',
      slug: 'google-ads-bid-strategy-status-limited'
    },
    {
      id: 24,
      title: 'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026 Guide)',
      excerpt: 'Display Network silently drains 20-60% of Google Ads budgets on low-intent traffic. The 60-second fix, a 5-minute audit, and the smaller settings (Display Expansion, Search Partners) that keep leaking.',
      category: 'ppc',
      author: 'By B6 Team',
      date: '2026-05-26',
      readTime: '9 min read',
      slug: 'google-ads-display-network-wasted-spend'
    },
    {
      id: 25,
      title: 'Google Ads Account Restructure: The 4-Phase Playbook (2026)',
      excerpt: 'When and how to restructure a messy Google Ads account: the 3-campaign rule, 4-phase rollout over 8 weeks, what to migrate vs what to leave alone, and the thresholds that signal it is time.',
      category: 'ppc',
      author: 'By B6 Team',
      date: '2026-05-27',
      readTime: '10 min read',
      slug: 'google-ads-account-restructure'
    },
    {
      id: 26,
      title: 'How to Fix Low-Quality Leads From B2B Google Ads (2026 Playbook)',
      excerpt: 'B2B form fills look fine but pipeline does not move? The six-step fix sequence: offline conversion imports, value-based bidding, audience exclusions, form filtering, match types, lead form match-quality score.',
      category: 'google-ads',
      author: 'By B6 Team',
      date: '2026-05-28',
      readTime: '11 min read',
      slug: 'b2b-google-ads-low-quality-leads'
    },
    {
      id: 27,
      title: 'LinkedIn Ads vs Google Ads for B2B Lead Generation: Honest 2026 Comparison',
      excerpt: 'LinkedIn delivers 121% ROAS for B2B in 2026, Google Search 67% (Dreamdata). But CPL, intent type, and lead quality tell a more complex story. Honest comparison across 8 axes with budget split frameworks for $20-100K/mo B2B advertisers.',
      category: 'b2b',
      author: 'By Kampaio Team',
      date: '2026-05-29',
      readTime: '15 min read',
      slug: 'linkedin-ads-vs-google-ads-b2b-lead-generation'
    },
    {
      id: 28,
      title: 'B2B Google Ads Lead Generation: How to Build a Campaign That Feeds the Pipeline',
      excerpt: 'B2B Google Ads requires a different structure than B2C. Here is how to set up campaigns, conversion tracking, and bidding for long sales cycles that actually produce qualified pipeline.',
      category: 'b2b',
      author: 'By B6 Team',
      date: '2026-05-28',
      readTime: '13 min read',
      slug: 'b2b-google-ads-lead-generation'
    },
    {
      id: 29,
      title: 'B2B SaaS Google Ads Benchmarks 2026: CTR, CPC, CPA, and ROAS by Segment',
      excerpt: 'B2B SaaS Google Ads benchmarks for 2026: average CPC $5.34 (up 29% YoY), CPA $87-$1,500+ by segment, conversion rate 3-5%. Real data from 2,000+ SaaS campaigns to tell you if your numbers are on target.',
      category: 'b2b',
      author: 'By B6 Team',
      date: '2026-06-01',
      readTime: '16 min read',
      slug: 'b2b-saas-google-ads-benchmarks-2026'
    }
  ];

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Sort by date descending (newest first) — matches visual page order
  // and signals freshness priority to Google.
  const sortedBlogPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const blogIndexJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.kampaio.com/blog#collection",
    name: "Kampaio Blog",
    description:
      "AI-powered Google Ads insights, PPC strategy, autonomous campaign management. Practical guides for SMB advertisers and agencies.",
    url: "https://www.kampaio.com/blog",
    // Publisher references main Kampaio Organization entity via @id,
    // inheriting knowsAbout (15 PPC expertise topics) signal.
    publisher: {
      "@id": "https://www.kampaio.com/#organization",
    },
    isPartOf: {
      "@id": "https://www.kampaio.com/#website",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sortedBlogPosts.length,
      itemListElement: sortedBlogPosts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://www.kampaio.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />
      <Header />
      
      {/* Hero Section */}
      <div style={{
        background: 'white',
        padding: '80px 0 60px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Expert Insights from PPC Professionals
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Stay ahead with proven strategies, AI-powered insights, and industry best practices
          </p>
          
          {/* Search Bar */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 40px',
            position: 'relative'
          }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '20px',
                  border: 'none',
                  background: selectedCategory === category.id 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white',
                  color: selectedCategory === category.id ? 'white' : '#64748b',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: selectedCategory === category.id 
                    ? '0 4px 12px rgba(102, 126, 234, 0.3)'
                    : '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div
        className="blog-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px'
        }}
      >
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Latest Articles
        </h2>
        {filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 0',
            color: '#64748b'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '16px' }}>No articles found</p>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div
            className="blog-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
              justifyItems: 'center'
            }}
          >
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  width: '100%',
                  maxWidth: '370px',
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onClick={() => {
                  if (post.slug) {
                    window.location.href = `/blog/${post.slug}`;
                  }
                }}
              >
                <div style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style={{ color: 'white', opacity: 0.8 }}>
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                    <span style={{
                      color: '#64748b',
                      fontSize: '12px'
                    }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    marginBottom: '16px'
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#64748b'
                  }}>
                    <span>{post.author}</span>
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer compact={true} />
    </div>
  );
} 