'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import { CompareGrid, BigStat, KeyTakeaways } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Agency vs In-House vs Software: Which Is Right for Your Budget?",
    "description": "A neutral 3-way comparison of running Google Ads via an agency, an in-house team, or self-serve software. Real US costs, control and effort tradeoffs, and a spend-based verdict for each path.",
    "image": "https://kampaio.com/blog/google-ads-agency-vs-in-house-vs-software/opengraph-image",
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
    "datePublished": "2026-06-23T00:00:00.000Z",
    "dateModified": "2026-06-23T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-agency-vs-in-house-vs-software"
    },
    "keywords": "google ads, agency, in-house, software, PPC, ad spend, budget, cost, control, ROAS, retainer, PPC manager, self-serve, account ownership, Performance Max, Smart Bidding",
    "wordCount": 2000,
    "articleSection": "Strategy",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is an agency or in-house better?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Neither is universally better. In-house gives you the most control and works above roughly $20K a month in spend, where a six-figure salary is justified. An agency gives you the least owner effort and suits complex, high-spend, or multi-channel accounts. Below $20K a month, self-serve software often beats both on cost and control."
        }
      },
      {
        "@type": "Question",
        "name": "What is a disadvantage of using an in-house advertising team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An in-house team can lack the breadth an agency or a multi-account tool sees across many accounts, and a single specialist can stagnate or leave, taking account knowledge with them. You also carry the full fixed cost, around $85,000 to $130,000 a year loaded, whether or not the budget needs that level of attention."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a Google Ads agency cost vs in-house?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An agency typically costs $2,000 to $5,000 a month or 10 to 20 percent of ad spend. An in-house manager costs roughly $85,000 to $130,000 a year fully loaded, about $7,000 to $11,000 a month. Self-serve software sits well below both at $99 to $399 a month."
        }
      },
      {
        "@type": "Question",
        "name": "Can software really replace a Google Ads agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For accounts in the $3K to $20K a month range, yes, self-serve AI software can do the optimization work an agency would, while you keep control and approve changes. It does not replace an agency that handles bundled creative production or multi-market coordination, and it is not for owners who want zero involvement."
        }
      },
      {
        "@type": "Question",
        "name": "At what ad spend should I hire an agency instead of using software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Around $20K a month is the common breakpoint. Below it, software usually delivers a better balance of cost, control, and effort. Above it, an agency's retainer or an in-house salary becomes easier to justify, especially with complex or multi-channel structure."
        }
      },
      {
        "@type": "Question",
        "name": "Do I own my Google Ads account if an agency runs it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not always. Some agencies keep client accounts under their own manager (MCC) account, which means leaving them can mean starting over. Confirm account ownership before signing. The Google Ads Help guide to manager (MCC) accounts explains how account access works."
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
        "name": "Google Ads Agency vs In-House vs Software",
        "item": "https://www.kampaio.com/blog/google-ads-agency-vs-in-house-vs-software"
      }
    ]
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Agency vs In-House vs Software: The Quick Answer', level: 1 },
    { id: 'three-ways', title: 'The Three Ways to Run Google Ads', level: 1 },
    { id: 'real-cost', title: 'The Real Cost of Each Option', level: 1 },
    { id: 'control-effort', title: 'Control and Effort: The Tradeoffs Nobody Lists', level: 1 },
    { id: 'side-by-side', title: 'Side by Side: Agency vs In-House vs Software', level: 1 },
    { id: 'which-for-you', title: 'Which Option Is Right for You?', level: 1 },
    { id: 'where-software-fits', title: "Where Self-Serve Software Fits (and Where It Doesn't)", level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Match the Setup to Your Budget, Not the Sales Pitch', level: 1 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="google-ads-agency-vs-in-house-vs-software" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Strategy
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Agency vs In-House vs Software: Which Is Right for Your Budget?
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              A neutral 3-way comparison for the budget owner weighing cost, control, and ROI across agency, in-house, and self-serve software
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 23, 2026 · 9 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents Toggle */}
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

            {/* Quick Answer */}
            <section id="quick-answer">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Agency vs In-House vs Software: The Quick Answer
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Pick by monthly ad spend and how much control you want. Under about $20K a month, self-serve software gives you agency-level <a href="/blog/google-ads-optimization" style={{ color: '#764ba2', textDecoration: 'underline' }}>optimization</a> without the retainer. Above $20K, an agency or an in-house hire both start to pencil out. In-house buys the most control, an agency buys the least owner effort, and software sits in the middle on cost, control, and effort.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' }}>
                A quick read on where you land:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Under ~$3K/month:</strong> do it yourself, or use software.</li>
                <li style={{ marginBottom: '16px' }}><strong>~$3K to $20K/month:</strong> software is usually the best balance of cost, control, and effort.</li>
                <li style={{ marginBottom: '16px' }}><strong>$20K+/month:</strong> an agency or an in-house team both become defensible, depending on how much control you want.</li>
              </ul>

              <BigStat
                value="$85K-130K/yr"
                label="fully loaded cost of one in-house PPC manager"
                claim="salary plus benefits and tools, which only pencils out above roughly $20K a month in spend."
                source="Source: US PPC salary bands, echelonn, 2025"
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                That one number sets the frame. Below about $20K a month, an in-house hire means paying senior salary money to manage a budget that does not need it.
              </p>
            </section>

            {/* The Three Ways */}
            <section id="three-ways">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                The Three Ways to Run Google Ads
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                A <strong>Google Ads agency</strong> is a firm you pay to plan, run, and optimize your campaigns. You hand over the account and get reports back. An <strong>in-house team</strong> means you hire and own a PPC manager, or a small team, who works only on your account. <strong>Software</strong> is a self-serve tool that does the optimization work while you keep control of the account and the final say on changes.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Software splits into two kinds, and the difference matters for this comparison. Recommendation tools like Optmyzr, WordStream, and Adzooma tell you what to do, but you still log in and execute every change by hand. This is the automation ceiling: the tool surfaces the work, you still do it. Self-serve <a href="/blog/5-tips-for-working-with-ai-ppc-tools" style={{ color: '#764ba2', textDecoration: 'underline' }}>AI tools</a> like Kampaio actually run the work and show each step live, so you review and approve rather than execute. Agency-side comparisons usually skip this distinction or lump all software into the recommendation bucket, which is where they get the third option wrong.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Every option trades the same three things differently: <strong>cost</strong> (what you pay), <strong>control</strong> (who has final say, and whether you own the account), and <strong>effort</strong> (the hours a week the budget owner has to put in). There is no universally best choice. The right answer depends on your spend, your account structure, and how much control and time you want to keep.
              </p>
            </section>

            {/* The Real Cost */}
            <section id="real-cost">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                The Real Cost of Each Option
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Costs only compare fairly in the same currency and on the same loaded basis, so here is each option in US dollars.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Agency.</strong> A mid-market Google Ads agency charges roughly $2,000 to $5,000 a month on a flat retainer, or 10 to 20 percent of ad spend. There is a structural reality worth naming, not as an attack: one account manager often handles 10 to 20 accounts at once, so a smaller account rarely gets the senior strategist&apos;s daily attention. If you are weighing whether the fee is fair, <a href="/blog/ppc-management-cost" style={{ color: '#764ba2', textDecoration: 'underline' }}>what PPC management actually costs</a> breaks the line items down.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>In-house.</strong> Fully loaded (salary, benefits, and tools), one capable PPC manager runs about $85,000 to $130,000 a year, before recruitment costs and turnover risk. That works out to roughly $7,000 to $11,000 a month, which is why in-house only makes sense at higher spend.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Software.</strong> Recommendation tools run $249 to $499 or more a month, and you still execute the changes yourself. Self-serve AI software like Kampaio runs $99, $199, or $399 a month, and the tool does the work while you approve it.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The clearest way to read these numbers is as a share of spend. A $1,500 retainer on a $5,000 a month account is 30 percent of your budget going to management, not media. The same account on $199 a month software is closer to 4 percent. Whether that management premium is worth it depends entirely on what it buys you in results and time saved.
              </p>

              <MascotQuote mascot="maximus">
                On a $7,000-a-month account I run bid and budget checks every few hours, not once a month. Last week I caught a Performance Max campaign drifting 34 percent over target CPA on a Tuesday afternoon. A monthly retainer would have flagged that in the next report, four weeks later.
              </MascotQuote>
            </section>

            {/* Control and Effort */}
            <section id="control-effort">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Control and Effort: The Tradeoffs Nobody Lists
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Cost is easy to compare. Control and effort are where the real decision lives, and they are exactly what the agency-side listicles skip.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Control.</strong> In-house gives you the most: your employee, your account, your priorities. Software gives you a lot too, because you own the account and you approve or reject every change in approval mode. An agency gives you the least day-to-day control, and there is one question that decides how much you really have: do they keep your Google Ads account under their own manager (MCC) account, or do you own it? If they own it, leaving means starting from zero, which is exactly the trap covered in <a href="/blog/how-to-switch-google-ads-agencies" style={{ color: '#764ba2', textDecoration: 'underline' }}>switching Google Ads agencies</a> without losing your account.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Effort.</strong> An agency asks the least of you: you delegate and you read reports. Software asks for a moderate few hours a week to review and approve. In-house trades money for not doing the work yourself, but now you manage a hire, which is its own kind of effort.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The single most important control question, whichever path you pick, is whether you own your Google Ads account and data. Software and in-house keep it yours by default. Some agencies do not, so confirm account ownership before you sign. If you want the full vetting checklist, see <a href="/blog/how-to-choose-a-ppc-agency" style={{ color: '#764ba2', textDecoration: 'underline' }}>how to choose a PPC agency</a>.
              </p>

              <MascotQuote mascot="vox">
                I reallocate budget across campaigns every week, moving spend toward whatever is converting and starving what is not. An agency on a monthly review touches that cadence once every four weeks. On a $10,000 account, three extra weeks of misallocated budget is real money.
              </MascotQuote>
            </section>

            {/* Side by Side */}
            <section id="side-by-side">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Side by Side: Agency vs In-House vs Software
              </h2>

              <ComparisonTable
                headers={['Option', 'Typical monthly cost', 'Who does the work', 'Control', 'Owner effort', 'Best-fit spend']}
                rows={[
                  { cells: ['Agency', '$2,000–5,000/mo or 10–20% of spend', 'Agency team, often shared across 10–20 accounts', 'Low (verify account ownership)', 'Low', '$20K+/mo'] },
                  { cells: ['In-house', '~$7,000–11,000/mo ($85K–130K/yr loaded)', 'Your employee', 'High', 'Medium (you manage the hire)', '$20K+/mo'] },
                  { cells: ['Software (self-serve AI, e.g. Kampaio)', '$99–399/mo', 'The tool, with your approval', 'High (you own the account)', 'Medium (a few hours/week)', '$3K–20K/mo'], highlight: true },
                ]}
                caption="Agency vs in-house vs software for Google Ads. A starting grid, not a law: spend, structure, and time shift the answer."
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                This is a starting grid, not a law. Your spend, account structure, and how much time you have all shift the answer, which is what the next section helps you work out.
              </p>
            </section>

            {/* Which Option Is Right for You */}
            <section id="which-for-you">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Which Option Is Right for You?
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Here is the honest read on each path, including where it is the wrong call.
              </p>

              <CompareGrid
                columns={[
                  {
                    name: 'Agency',
                    bestFor: 'high spend, zero owner time',
                    traits: [
                      { label: 'Good at $20K+/mo, complex or multi-channel', has: true },
                      { label: 'Bundled creative and landing-page production', has: true },
                      { label: 'Hands-on control for the owner', has: false },
                      { label: 'Fits accounts under ~$15K/mo', has: false },
                    ],
                  },
                  {
                    name: 'In-house',
                    bestFor: 'maximum control, PPC is core',
                    traits: [
                      { label: 'Good at $20K+/mo that justifies a salary', has: true },
                      { label: 'Maximum control over the account', has: true },
                      { label: 'Cheap at modest spend', has: false },
                      { label: 'Low turnover and key-person risk', has: false },
                    ],
                  },
                  {
                    name: 'Software',
                    bestFor: '$3K-20K/mo, keep control',
                    traits: [
                      { label: 'Agency-level optimization without the fee', has: true },
                      { label: 'You own the account and approve changes', has: true },
                      { label: 'Zero owner involvement', has: false },
                      { label: 'Heavy bundled creative production', has: false },
                    ],
                    highlight: true,
                  },
                ]}
              />

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>An agency is a good option if</strong> your spend is $20K a month or more, your structure is complex or multi-channel, you have close to zero time for the account, or you want bundled creative and landing-page production. <strong>It is a bad option if</strong> your spend is under about $15K (you become a low-priority account), you want hands-on control, or the contract locks you in and keeps your account under the agency&apos;s MCC.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>In-house is a good option if</strong> your spend is high enough to justify an $85,000 to $130,000 salary, you want maximum control, and Google Ads is core to the business. <strong>It is a bad option if</strong> your spend is modest, you cannot keep one specialist busy and learning, or turnover risk could leave you with a dark account and nobody to run it.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Software is a good option if</strong> your spend is roughly $3K to $20K a month, you want agency-level optimization without the fee, you want to keep control and own the account, and you can spend a few hours a week approving changes. <strong>It is a bad option if</strong> you want zero involvement, in which case an agency fits better, or you need heavy bundled creative production that the software does not do.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The question is not &quot;agency, in-house, or software&quot; in the abstract. It is which one matches your spend, your structure, and how much control and time you actually want to keep.
              </p>
            </section>

            {/* Where Software Fits */}
            <section id="where-software-fits">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Where Self-Serve Software Fits (and Where It Doesn&apos;t)
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Self-serve AI software is for the budget owner who wants the optimization done but keeps the account and the final say. It is strongest in the $3K to $20K a month band, where an agency&apos;s economics do not favor senior attention and a full salary is overkill. That is the gap it fills, and it is worth being precise about both the fit and the limits.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Kampaio is an example of the category: an AI PPC cabinet of specialist agents. Maximus orchestrates the optimization cycle, Buzz handles bids, Vox manages cross-campaign <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a>, Aegis flags risk, Echo reports, Sage handles research, and Mira handles creative. Tiers run $99 (Co-pilot), $199 (Approval), and $399 (Autonomous), against agencies at $2,000 to $5,000 a month. The $199 Approval tier means every change waits for your sign-off, so you keep control while the system does the heavy lifting. You can <a href="/b6" style={{ color: '#764ba2', textDecoration: 'underline' }}>see how the agents work</a> before connecting anything.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Software is not a full replacement for every path. An agency that does multi-market coordination or heavy creative production does things software does not, and an owner who wants zero involvement is better served by a retainer. If you are leaning toward managing the account yourself with better tooling, the deeper case is in <a href="/blog/google-ads-without-agency" style={{ color: '#764ba2', textDecoration: 'underline' }}>running Google Ads without an agency</a>. That honesty about where software does not fit is the difference between a comparison and a sales pitch.
              </p>

              <KeyTakeaways
                items={[
                  'Under ~$20K/mo spend, self-serve software usually wins on cost, control, and effort.',
                  'In-house buys the most control but only pencils out above ~$20K/mo ($85K-130K/yr loaded).',
                  'An agency buys the least owner effort, best at $20K+/mo or when you need bundled creative.',
                  'Whichever path you pick, confirm you own your Google Ads account and data.',
                ]}
              />
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                Is an agency or in-house better?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Neither is universally better. In-house gives you the most control and works above roughly $20K a month in spend, where a six-figure salary is justified. An agency gives you the least owner effort and suits complex, high-spend, or multi-channel accounts. Below $20K a month, self-serve software often beats both on cost and control.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                What is a disadvantage of using an in-house advertising team?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                An in-house team can lack the breadth an agency or a multi-account tool sees across many accounts, and a single specialist can stagnate or leave, taking account knowledge with them. You also carry the full fixed cost, around $85,000 to $130,000 a year loaded, whether or not the budget needs that level of attention.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                How much does a Google Ads agency cost vs in-house?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                An agency typically costs $2,000 to $5,000 a month or 10 to 20 percent of ad spend. An in-house manager costs roughly $85,000 to $130,000 a year fully loaded, about $7,000 to $11,000 a month. Self-serve software sits well below both at $99 to $399 a month.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                Can software really replace a Google Ads agency?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                For accounts in the $3K to $20K a month range, yes, self-serve AI software can do the optimization work an agency would, while you keep control and approve changes. It does not replace an agency that handles bundled creative production or multi-market coordination, and it is not for owners who want zero involvement.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                At what ad spend should I hire an agency instead of using software?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Around $20K a month is the common breakpoint. Below it, software usually delivers a better balance of cost, control, and effort. Above it, an agency&apos;s retainer or an in-house salary becomes easier to justify, especially with complex or multi-channel structure.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                Do I own my Google Ads account if an agency runs it?
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Not always. Some agencies keep client accounts under their own manager (MCC) account, which means leaving them can mean starting over. Confirm account ownership before signing. The <a href="https://support.google.com/google-ads/answer/7459399" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Ads Help guide to manager (MCC) accounts</a> explains how account access works.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Match the Setup to Your Budget, Not the Sales Pitch
                </h2>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  If your spend is in the $3K to $20K range, you probably do not need a $3,000 retainer or a six-figure hire to run Google Ads well. Connect your account to Kampaio, watch Maximus run the first optimization cycle, and approve or reject every change. You keep the account, you keep control, and there is no contract. <a href="/pricing" style={{ color: '#764ba2', textDecoration: 'underline' }}>Kampaio pricing starts at $99/month</a>.
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
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  Start with your account
                </a>
              </div>
            </section>
          </div>
        </div>
        <KeepReading slug="google-ads-agency-vs-in-house-vs-software" category="strategy" />
      <Footer compact={true} />
      </div>
    </>
  );
}
