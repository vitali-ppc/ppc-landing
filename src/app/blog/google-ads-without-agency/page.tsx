'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import MascotQuote from '../../../components/blog/MascotQuote';

export default function BlogPostPage() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Google Ads Without an Agency: When DIY Works, When It Doesn't, and the Third Option",
    "description": "Can you manage Google Ads without paying an agency $2K/month? Yes, if your spend is under $20K and you use the right tools. Here is a realistic framework for SMB owners.",
    "image": "https://kampaio.com/logo.png",
    "author": {
      "@type": "Person",
      "name": "B6 Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kampaio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kampaio.com/logo.png"
      }
    },
    "datePublished": "2026-05-13T00:00:00.000Z",
    "dateModified": "2026-05-13T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/google-ads-without-agency"
    },
    "keywords": "google ads, agency, manage, PPC, budget, ad spend, DIY, automation, Smart Bidding, ROAS, bid management, CPC, Performance Max, campaign structure, conversion tracking, negative keywords"
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - Can You Run Google Ads Without an Agency?', level: 1 },
    { id: 'why-ditching-agencies', title: 'Why Business Owners Are Ditching Agencies', level: 1 },
    { id: 'what-agency-does', title: 'What an Agency Actually Does (That You Need to Replace)', level: 1 },
    { id: 'when-diy-works', title: 'When DIY Google Ads Actually Works', level: 1 },
    { id: 'when-keep-agency', title: 'When You Should Keep (or Hire) an Agency', level: 1 },
    { id: 'third-option', title: 'The Third Option: AI Tools That Do Agency Work at Tool Prices', level: 1 },
    { id: 'transition', title: 'How to Transition from Agency to Self-Management', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Stop Paying Agency Fees for Work AI Can Do Better', level: 1 },
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
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
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
              Google Ads Without an Agency: When DIY Works, When It Doesn&apos;t, and the Third Option
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              A realistic framework for SMB owners spending $3-50K/month on Google Ads who want to stop overpaying for management
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>by B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 13, 2026 · 12 min read</span>
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

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                TL;DR - Can You Run Google Ads Without an Agency?
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Yes, you can manage Google Ads without an agency if your monthly spend is under $20K and you commit 3-5 hours per week or use an automation tool. Here&apos;s the framework:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Spend under $5K/month</strong>: DIY is viable with basic knowledge and Google Skillshop training, or pair it with a management tool for safer results</li>
                <li style={{ marginBottom: '16px' }}><strong>$5-20K/month</strong>: Tool strongly recommended. Manual DIY at this scale means you&apos;re constantly one mistake away from burning $500-1,000 before you notice</li>
                <li style={{ marginBottom: '16px' }}><strong>$20K+/month</strong>: Consider agency or enterprise tool. The budget justifies dedicated expertise, and the coordination complexity increases fast</li>
              </ul>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The bigger question isn&apos;t whether you can, but whether the time investment makes economic sense. Most SMB owners discover they need either a tool to automate the heavy lifting or an agency to handle it completely. Set-and-forget doesn&apos;t exist at any scale.
              </p>
            </section>

            {/* Why Business Owners Are Ditching Agencies */}
            <section id="why-ditching-agencies">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Why Business Owners Are Ditching Agencies
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Cost.</strong> Agencies charge $1-3K/month or 10-20% of ad spend. For an SMB spending $5K/month on ads, a $1.5K agency fee means 30% of your total budget goes to management instead of advertising. You&apos;re spending $6,500 to deploy $5,000. That math stops working fast.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Attention.</strong> Small accounts with $3-10K monthly spend are the agency&apos;s lowest priority. You get assigned to a junior account manager handling 15 other accounts. They apply templated strategies and check in once a month. When your ROAS drops 40% in week two, you find out in week four via PDF report. By then you&apos;ve burned through a week&apos;s budget on broken campaigns.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Opacity.</strong> Many SMB owners can&apos;t explain what their agency actually does between monthly reports. The deck shows graphs and percentages, but you can&apos;t act on it. You don&apos;t see the search terms report, the bid changes, or the budget allocation decisions. You&apos;re paying for a black box with a dashboard on top.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                This is structural economics, not agency malice. Agency minimums of $2-5K exist to cover labor costs. A skilled PPC specialist billing $75/hour internally needs to generate at least $2K/month to break even after overhead. Small accounts simply don&apos;t get the attention their budgets deserve. The unit economics don&apos;t work.
              </p>
            </section>

            {/* What an Agency Actually Does */}
            <section id="what-agency-does">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                What an Agency Actually Does (That You Need to Replace)
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                If you&apos;re going solo, you need to own all six of these tasks or automate the hard ones.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>1. Keyword research and negative keywords.</strong> Initial setup plus ongoing refinement. An agency starts with 200-500 seed keywords, structures them into ad groups, then reviews search terms weekly to add 10-30 negatives per campaign. Difficulty: medium. Time: 2-3 hours/week for a $10K account.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>2. Bid management and budget allocation.</strong> The hardest and most time-consuming task. For a campaign with 8 ad groups and 150 keywords, you&apos;re adjusting bids 2-3 times per week based on CPC changes, conversion rate shifts, and impression share. Difficulty: high. Time: 5-8 hours/week manually, or 20 minutes/week if you trust Smart Bidding with proper conversion volume (<a href="https://support.google.com/google-ads/answer/10724817" style={{ color: '#764ba2', textDecoration: 'underline' }}>you need 30+ conversions/month for the algorithm to work</a>).
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>3. Ad copy testing.</strong> RSAs need 10-15 headline and description variants rotating. Agencies test 2-3 new variants monthly, pause underperformers, scale winners. Difficulty: low to medium. Time: 1-2 hours/month.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>4. Search terms review and exclusions.</strong> You download the search terms report weekly and exclude irrelevant queries. Example: you sell running shoes and discover 40% of spend goes to &quot;cheap running shoes under $20&quot; when your product starts at $80. Difficulty: easy but critical. Miss this and you burn budget fast. Time: 1 hour/week.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>5. Campaign structure and audience targeting.</strong> Separating Brand, Competitor, Generic, and Long-tail campaigns. Layering audiences for bid adjustments. Setting up Performance Max with proper audience signals. Difficulty: medium at setup, low maintenance. Time: 4-8 hours initial, 1 hour/month ongoing.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>6. Reporting and performance tracking.</strong> Weekly dashboard updates, monthly deep dives, conversion tracking audits. Difficulty: easy with tools. Time: 2-3 hours/month.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Add it up: manual DIY at $10K spend takes 8-12 hours per week. That&apos;s 35-50 hours per month. If your time is worth $50/hour, you&apos;re paying yourself $1,750-2,500/month in opportunity cost. Suddenly agencies start to look reasonable. Or you automate the grunt work and keep only the strategic decisions.
              </p>

              <MascotQuote mascot="buzz">
                Campaign X had 47 ad groups. I adjusted bids on 23 of them last Tuesday: 14 decreases (average drop 8%), 9 increases (average lift 5%). Took me 4 minutes. A human with a spreadsheet needs 2 hours for the same output.
              </MascotQuote>
            </section>

            {/* When DIY Google Ads Actually Works */}
            <section id="when-diy-works">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                When DIY Google Ads Actually Works
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Three scenarios where self-management makes sense.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Scenario 1: Low spend, simple structure.</strong> You&apos;re running 1-3 campaigns, spending under $5K/month, targeting local customers or a narrow niche. Campaign structure is straightforward (one Brand campaign, one Generic Search campaign). You can learn the fundamentals in 2-3 weeks using <a href="https://skillshop.withgoogle.com/" style={{ color: '#764ba2', textDecoration: 'underline' }}>Google Skillshop certifications</a> and YouTube tutorials. Maintenance is 3-5 hours/week. At this scale, the agency minimum ($1-1.5K/month) costs 20-30% of your ad budget. DIY saves real money.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Scenario 2: You have PPC experience.</strong> You ran campaigns at a previous company, understand Quality Score, know the difference between Target CPA and Target ROAS, and can read the auction insights report. You don&apos;t need training. You need efficiency. A tool handles bid updates and negative keyword mining while you make strategic decisions: budget allocation, new campaign launches, landing page tests.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Scenario 3: You use automation tools.</strong> Smart Bidding handles bids (if you have 30+ conversions/month), and a management tool like B6 handles budget pacing, negative keyword suggestions, and anomaly detection. You spend 3-5 hours/week reviewing recommendations and approving changes. You&apos;re not doing the work manually. You&apos;re managing an AI team instead of a human team.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Be clear on this: DIY does not mean set and forget. Even with automation, you need minimum 3-5 hours/week for review, strategy adjustments, and creative testing. If you can&apos;t commit that time consistently, you&apos;ll underperform and waste budget through neglect. Google Ads punishes inattention.
              </p>
            </section>

            {/* When You Should Keep (or Hire) an Agency */}
            <section id="when-keep-agency">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                When You Should Keep (or Hire) an Agency
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Three honest cases where an agency genuinely makes sense.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Case 1: High spend with complex structure.</strong> You&apos;re spending $50K+/month across multiple markets, languages, or product lines. You&apos;re running Search, Shopping, Display, YouTube, and Performance Max simultaneously. You have 15-25 campaigns, 200+ ad groups, custom landing pages for each segment. The coordination overhead justifies agency fees. One person cannot manage this structure part-time without breaking things. At this scale you need a team, and agencies provide that.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Case 2: You need creative production.</strong> Custom landing pages, video ads for YouTube, display creative in six sizes, A/B testing frameworks. Agencies bundle creative production with media buying. PPC tools (including B6) optimize what you give them, but they don&apos;t make ads for you yet. If you lack design resources, an agency provides the full stack.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Case 3: You have zero time.</strong> Not 5 hours/week, not even 1 hour. You genuinely cannot look at the account for weeks at a time. An agency is better than complete neglect. Unmonitored campaigns with Smart Bidding and no human oversight will burn budget on low-quality traffic and never course-correct. The algorithm optimizes for whatever signal you give it. If you&apos;re not watching, it finds the cheapest conversions, not the best ones.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                If any of these three apply, an agency is worth the fee. If none apply, keep reading.
              </p>
            </section>

            {/* The Third Option */}
            <section id="third-option">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                The Third Option: AI Tools That Do Agency Work at Tool Prices
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                There&apos;s a middle ground between full DIY and full agency that most SMB owners don&apos;t know exists. The PPC tool landscape splits into two categories: recommendation tools and autonomous tools.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Recommendation tools</strong> (Optmyzr, Adalysis, Madgicx) analyze your account and tell you what to do. &quot;Lower bid on Keyword X by 12%.&quot; &quot;Add these 8 negative keywords.&quot; You still execute every change manually in Google Ads. Pricing: $499-899/month for SMB plans. Value: saves analysis time, but you still do the work. The cognitive load is lighter but the time commitment isn&apos;t.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Autonomous tools</strong> (B6 and a small handful of competitors) execute changes with your approval or fully autonomously. You connect your account, set guardrails (max CPC, daily budget limits, approval requirements), and the AI handles bid updates, budget pacing, negative keyword additions, and anomaly detection. Pricing: $99-399/month depending on autonomy level.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                B6 runs seven specialized AI agents: Buzz for bid management, Aegis for risk detection, Echo for reporting, Vox for strategy, Maximus for orchestration, Mira for creative analysis, and Sage for competitive research. Three pricing tiers:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>$99 Co-pilot</strong>: AI makes recommendations, you execute manually</li>
                <li style={{ marginBottom: '16px' }}><strong>$199 Approval</strong>: AI executes changes after you approve each action (you see the proposal, click approve or reject)</li>
                <li style={{ marginBottom: '16px' }}><strong>$399 Autonomous</strong>: AI executes changes within guardrails you set, reports what it did</li>
              </ul>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                The key difference: B6 is not &quot;AI gives advice you act on later.&quot; It&apos;s &quot;AI does the work and shows you every step live.&quot; The $199 Approval tier is the sweet spot for most SMB owners. You learn by seeing what the AI proposes. After 2-3 months, you understand bid management deeply because you&apos;ve reviewed 200+ proposed changes with explanations. It&apos;s hands-on education while the work gets done.
              </p>

              <MascotQuote mascot="aegis">
                I flagged 3 campaigns last week that were spending above target CPA by 40%+. In an agency model, this shows up in the monthly report 3 weeks later. I catch it same-day and Maximus pauses the worst ad groups within 6 hours.
              </MascotQuote>

              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '16px', fontWeight: '600' }}>
                Comparison snapshot:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Agency</strong> ($1-3K/month): They do all the work. You spend 1 hour/month reviewing reports. Response time: 1-5 business days for changes. Best for $20K+ budgets or if you need creative production.</li>
                <li style={{ marginBottom: '16px' }}><strong>Freelancer</strong> ($500-2K/month): Mix of done-for-you and collaborative. You spend 2-4 hours/month in calls and reviews. Response time: 1-3 business days. Best if you want more control than agency but less work than DIY.</li>
                <li style={{ marginBottom: '16px' }}><strong>DIY with B6</strong> ($99-399/month): AI does optimization work, you handle strategy and approvals. You spend 3-5 hours/week reviewing and making decisions. Response time: real-time for AI actions, instant for your approvals. Best for $3-20K budgets where agency fees don&apos;t make economic sense.</li>
              </ul>
            </section>

            {/* How to Transition from Agency to Self-Management */}
            <section id="transition">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                How to Transition from Agency to Self-Management
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Practical steps for making the switch without breaking your campaigns.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 1: Get full access to your Google Ads account.</strong> Many agencies manage accounts through their MCC (manager account). You see limited data. Request admin access to your own account or ask them to transfer ownership. If they resist, this is a red flag. It&apos;s your account and your data.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 2: Download the last 6 months of change history and search terms reports.</strong> This is your baseline. Change history shows what your agency actually did (or didn&apos;t do). Search terms report reveals which queries drive conversions and which ones waste spend. Export everything before making the switch. You&apos;ll need this to understand current performance.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 3: Set up conversion tracking independently.</strong> Some agencies use their own tracking pixels or manager account conversion imports. Make sure your Google Ads account has its own conversion actions properly configured. Test them. If conversion tracking breaks during the transition, Smart Bidding stops working and you&apos;re flying blind. This step is non-negotiable.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 4: Don&apos;t change anything for 2 weeks.</strong> Just observe. Watch daily performance, review search terms, note which campaigns get budget and which don&apos;t. Understand current performance before touching bids or budgets. This waiting period is painful but critical. Most DIY disasters happen because people change too much too fast.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 5: Start with one campaign.</strong> Apply changes to your smallest campaign first (your Brand campaign is usually safest). Adjust one thing (add 5 negative keywords, or lower max CPC by 10%), wait 5-7 days, measure impact. Once you&apos;re comfortable, scale the approach to larger campaigns. Don&apos;t touch Performance Max until you&apos;ve mastered Search.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Step 6: Connect a management tool for ongoing optimization.</strong> Whether it&apos;s B6, Optmyzr, or another platform, automate the repetitive tasks (bid updates, budget pacing, negative keyword mining, anomaly alerts). This keeps your time commitment to 3-5 hours/week instead of 10-15 hours. Tools catch mistakes you&apos;d miss when reviewing manually.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Most transitions take 4-6 weeks. Expect a 10-20% performance dip in weeks 2-3 as campaigns adjust to new management patterns. If you&apos;re using Smart Bidding, the algorithm needs time to recalibrate. Don&apos;t panic and revert to the agency in week three. Give it six weeks minimum before deciding if it&apos;s working.
              </p>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Is $20 a day enough for Google Ads?</strong><br />
                $20/day ($600/month) is enough for highly targeted local campaigns or very narrow niches. It is not enough for competitive e-commerce or broad search terms. Google recommends at least 2x your target CPA as daily budget. If your target cost per acquisition is $30, you need minimum $60/day ($1,800/month). Otherwise the algorithm doesn&apos;t have enough room to optimize.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>How much should a small business spend on Google Ads?</strong><br />
                A functional minimum is $1,500-3,000/month. Below that, you&apos;re limited to one or two campaigns with restricted reach. The sweet spot for most SMBs is $3-10K/month, which allows 3-5 campaigns, enough conversion volume for Smart Bidding to work, and room to test. Above $20K/month, the complexity usually justifies hiring help.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>Can I run Google Ads myself with no experience?</strong><br />
                Yes, but start small. Launch one Brand campaign (your company name as keyword) with a $500-1,000 budget. Learn conversion tracking, search terms review, and basic bid adjustments. Don&apos;t launch a $5K/month Performance Max campaign on day one. You&apos;ll waste 40-60% of budget before you understand what went wrong. Crawl, then walk, then run.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>What is the minimum budget for Google Ads?</strong><br />
                Google has no enforced minimum, but practical minimums exist. For Search campaigns, $30-50/day minimum ($900-1,500/month). For Performance Max, $50-100/day minimum ($1,500-3,000/month) because pMax needs 30+ conversions/month to optimize. Below these thresholds, the AI doesn&apos;t have enough data to learn. You end up spending money without getting smarter.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                <strong>How many hours per week does Google Ads management take?</strong><br />
                Manual DIY: 8-15 hours/week for a $10K account. With automation tools and Smart Bidding: 3-5 hours/week. With an agency: 1 hour/month for review calls. Your time commitment depends entirely on how much you automate. The real question is which hours you&apos;re spending: strategic decisions or spreadsheet maintenance.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '32px', marginTop: '48px' }}>
                Stop Paying Agency Fees for Work AI Can Do Better
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Connect your Google Ads account to B6. Buzz runs the first optimization cycle in 90 seconds. You see exactly what he would change and why. Approve or reject each action. No contracts, no minimums, no $2K/month retainer. <a href="/pricing" style={{ color: '#764ba2', textDecoration: 'underline' }}>B6 pricing starts at $99/month</a>. <a href="/chat" style={{ color: '#764ba2', textDecoration: 'underline' }}>Start your free trial</a> and see the first round of recommendations live. <a href="/b6#buzz" style={{ color: '#764ba2', textDecoration: 'underline' }}>See how Buzz optimizes bids</a> or <a href="/b6" style={{ color: '#764ba2', textDecoration: 'underline' }}>learn how all seven B6 agents work together</a>.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Ready to manage Google Ads yourself?
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Let B6 handle the heavy lifting while you make the strategic calls. See your first optimization cycle in 90 seconds.
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
                  Start Free Trial
                </a>
              </div>
            </section>

          </div>
        </div>
        <Footer compact={true} />
      </div>
    </>
  );
}