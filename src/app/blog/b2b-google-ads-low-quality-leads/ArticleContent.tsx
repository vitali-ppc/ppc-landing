'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Fix Low-Quality Leads From B2B Google Ads (2026 Playbook)",
    "description": "B2B Google Ads sending form fills but no pipeline? The fix is offline conversion imports, value-based bidding, audience exclusions, and form filtering. Six-step playbook with thresholds and timelines.",
    "image": "https://kampaio.com/og/b2b-google-ads-low-quality-leads.png",
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
    "datePublished": "2026-05-28T00:00:00.000Z",
    "dateModified": "2026-05-28T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/b2b-google-ads-low-quality-leads"
    },
    "keywords": "B2B Google Ads, low quality leads, offline conversion imports, value-based bidding, audience exclusions, lead form match quality, Smart Bidding, MQL, SQL, OCI, lead qualification",
    "wordCount": 2637,
    "articleSection": "B2B Marketing",
    "inLanguage": "en"
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
        "name": "How to Fix Low-Quality Leads From B2B Google Ads",
        "item": "https://www.kampaio.com/blog/b2b-google-ads-low-quality-leads"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long until offline conversion imports actually change Smart Bidding behavior?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "14 days minimum after stable uploads begin. Google needs that window for the algorithm to ingest stage data and recalibrate. Some accounts see meaningful shifts at 21-30 days, in line with Cometly's reported 2-4 week algorithm learning windows."
        }
      },
      {
        "@type": "Question",
        "name": "What if my sales cycle is 9 months? Will OCI still work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, with one adjustment: use pipeline-stage values (MQL, SQL, Opportunity) rather than waiting for closed-won. Smart Bidding learns from the early stages and uses them as a leading indicator. Final closed-won uploads refine the model over quarters but do not have to be the input signal."
        }
      },
      {
        "@type": "Question",
        "name": "Should we use Google Ads lead form extensions or send traffic to a landing page form?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lead form extensions yield more leads at lower cost per lead, but lower average quality. Landing page forms allow custom qualification fields. For B2B, landing page forms with qualifying questions almost always win on pipeline-valued CAC, even at lower volume."
        }
      },
      {
        "@type": "Question",
        "name": "How do we handle privacy and consent with offline conversion imports?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Capture explicit consent at form submission for data sharing with Google. For EU traffic, run consent mode v2. Without proper consent, OCI uploads should not transmit user-level identifiers, and Google may silently drop them."
        }
      },
      {
        "@type": "Question",
        "name": "Can negative keywords break Smart Bidding's learning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Adding negatives does not reset the learning phase. Changing bid strategy or shifting budget more than 20 percent does. Negative keyword maintenance is safe to do weekly without disrupting the algorithm."
        }
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: Six Fixes That Move Pipeline', level: 1 },
    { id: 'why', title: 'Why B2B Leads Look Fine But Don\'t Convert', level: 1 },
    { id: 'fix-1', title: 'Fix #1: Tell Google Which Leads Are Good (OCI)', level: 2 },
    { id: 'fix-2', title: 'Fix #2: Switch to Value-Based Bidding', level: 2 },
    { id: 'fix-3', title: 'Fix #3: Exclude Audiences That Look Like Buyers', level: 2 },
    { id: 'fix-4', title: 'Fix #4: Make the Form Do First Qualification', level: 2 },
    { id: 'fix-5', title: 'Fix #5: Tighten Match Types, Mine Negatives', level: 2 },
    { id: 'fix-6', title: 'Fix #6: Audit Lead Form Match-Quality Score', level: 2 },
    { id: 'rebuild', title: 'When the Patch Is Not Enough', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'cta', title: 'How Kampaio Handles the Monitoring Loop', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const paraStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '24px' };
  const h2Style = { fontSize: '28px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '20px', marginTop: '48px' };

  return (
    <>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="b2b-google-ads-low-quality-leads" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · B2B
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              How to Fix Low-Quality Leads From B2B Google Ads (2026 Playbook)
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Form fills look fine, pipeline doesn&apos;t move. The six-step fix sequence, in order: offline conversions, value-based bidding, audience exclusions, form filtering, match types, lead form match-quality.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>May 28, 2026 · 11 min read</span>
                </div>
              </div>
            </div>
            {/* TOC */}
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

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR: Six Fixes That Move Pipeline (Not Form Fills)</h2>
              <p style={paraStyle}>
                B2B form fills look fine but pipeline does not move because Smart Bidding optimizes for form_complete, not closed revenue. The fix sequence matters. Do these in order:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '12px' }}>Import offline conversions from your CRM so Google learns which leads are real.</li>
                <li style={{ marginBottom: '12px' }}>Switch to value-based bidding with per-stage revenue values, not form_complete count.</li>
                <li style={{ marginBottom: '12px' }}>Exclude job-seeker, freelancer, and student audiences at campaign level.</li>
                <li style={{ marginBottom: '12px' }}>Filter the form before submit (business email required, company-size qualifying question).</li>
                <li style={{ marginBottom: '12px' }}>Tighten match types and harvest negative keywords weekly.</li>
                <li style={{ marginBottom: '12px' }}>Audit lead form match-quality score weekly and pause ad groups below 0.4.</li>
              </ol>
              <p style={paraStyle}>
                Expect 30-50 percent fewer total form fills and a 2-3x higher pipeline conversion rate within 30-60 days. The drop in raw fills is the point, not a regression. As Cometly&apos;s 2026 fix-playbook notes, a campaign with 50 leads at a 40 percent close rate beats one with 100 leads at 5 percent on every revenue line (<a href="https://www.cometly.com/post/poor-quality-leads-from-ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cometly, 2026</a>).
              </p>
            </section>

            {/* Why */}
            <section id="why">
              <h2 style={h2Style}>Why B2B Google Ads Leads Look Fine But Don&apos;t Convert</h2>
              <p style={paraStyle}>
                Three systems track different scoreboards on the same campaign, and each one looks fine in isolation. The gaps between them produce the leads sales rejects.
              </p>
              <p style={paraStyle}>
                <strong>Reason 1: Smart Bidding sees one signal, sales tracks another.</strong> Google Ads counts every form_complete as one conversion of equal weight. Sales tracks MQL, SQL, opportunity, closed-won. When 65 percent of B2B buyers start their journey on Google search (<a href="https://www.themarketingblender.com/google-ads-for-b2b-whats-working-in-2026-and-whats-not/" target="_blank" rel="noopener noreferrer" style={linkStyle}>The Marketing Blender, 2026</a>), the volume of form_complete events the algorithm sees is enough to feel successful. The downstream stages tell a different story.
              </p>
              <p style={paraStyle}>
                <strong>Reason 2: B2B intent is harder to read from a single query.</strong> A search for &quot;CRM software&quot; can mean a senior buyer evaluating tools (high value), a junior researcher building a longlist (medium), a student writing a case study (zero), or a freelancer wanting a free trial (zero). Same query, four very different leads. Without feedback, Smart Bidding bids the same on all four.
              </p>
              <p style={paraStyle}>
                <strong>Reason 3: The form does not qualify.</strong> A four-field form (name, email, company, phone) accepts anyone. No business-email validation, no company-size gate, no qualifying questions. Gmail addresses and freelance <a href="/blog/google-ads-consultant" style={linkStyle}>consultants</a> flow through unfiltered, then sit in sales queues as rejected.
              </p>
              <p style={paraStyle}>
                If you have not isolated the root cause yet, start with our breakdown of <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>why Performance Max fails in B2B marketing</a>. It walks through the diagnose side of the same problem. This article is the fix side.
              </p>
            </section>

            {/* Fix #1 */}
            <section id="fix-1">
              <h2 style={h2Style}>Fix #1: Tell Google Which Leads Are Good (Offline Conversion Imports)</h2>
              <p style={paraStyle}>
                Without offline conversion imports, Google has no way to know which form fills became revenue. Configure this before changing anything else. It is the single highest-leverage fix in the playbook, and it assumes your baseline <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>Google Ads conversion tracking</a> is already firing correctly. If it is not, fix the basics first.
              </p>
              <p style={paraStyle}>
                Google now calls the modern version &quot;Enhanced conversions for leads&quot; (<a href="https://support.google.com/google-ads/answer/2998031" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads support, 2026</a>). The legacy term &quot;offline conversion imports&quot; still works in most accounts. Either way, the mechanic is the same:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '12px' }}>Form captures GCLID (Google Click ID) into a hidden field at submit.</li>
                <li style={{ marginBottom: '12px' }}>CRM stores the GCLID against the contact record.</li>
                <li style={{ marginBottom: '12px' }}>When the CRM stage advances (MQL, SQL, Opportunity, Closed-Won), the system uploads a conversion event back to Google Ads with revenue or pipeline value.</li>
                <li style={{ marginBottom: '12px' }}>Wait 14-21 days for Smart Bidding to ingest the new signal, then evaluate.</li>
              </ol>
              <p style={paraStyle}>
                A reasonable per-stage value schema (illustrative, adjust to your average contract value):
              </p>
              <div style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px 24px', marginBottom: '24px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '15px', lineHeight: '1.9', color: '#1e293b' }}>
                form_complete = $1 (signal only)<br />
                MQL = $25<br />
                SQL = $100<br />
                Opportunity = $500<br />
                Closed-Won = $2,500
              </div>
              <p style={paraStyle}>
                The schema does not have to match true economics perfectly. It has to be directionally accurate and consistent. Smart Bidding learns the gradient between stages, not the absolute dollar amounts.
              </p>
              <p style={paraStyle}>
                Implementation paths by stack: HubSpot has a native Google Ads integration that handles GCLID and stage uploads in a few clicks. Salesforce uses the Marketing Cloud connector or a third-party (Zapier, LeadsBridge). Engineering teams can use the Google Ads API or the modern Conversions API directly.
              </p>
              <p style={paraStyle}>
                Only about 13 percent of businesses send any offline conversion feedback back to Google Ads (<a href="https://pete-bowen.com/how-i-improve-lead-quality-by-telling-google-which-leads-are-good" target="_blank" rel="noopener noreferrer" style={linkStyle}>Pete Bowen, 2025</a>). That gap is most of why so many B2B accounts feel Google Ads does not work for them. Closing it typically reduces average cost-per-lead by around 31 percent (<a href="https://www.themarketingblender.com/google-ads-for-b2b-whats-working-in-2026-and-whats-not/" target="_blank" rel="noopener noreferrer" style={linkStyle}>The Marketing Blender, 2026</a>).
              </p>
            </section>

            {/* Fix #2 */}
            <section id="fix-2">
              <h2 style={h2Style}>Fix #2: Switch to Value-Based Bidding (Maximize Conversion Value With Per-Stage Values)</h2>
              <p style={paraStyle}>
                Once offline conversions are flowing, switch the bid <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a>. Maximize Conversions optimizes for count. Maximize Conversion Value optimizes for revenue. That single change reshapes what Smart Bidding pursues.
              </p>
              {/* Callout: prerequisites */}
              <div style={{ background: '#fefce8', borderLeft: '4px solid #eab308', borderRadius: '8px', padding: '20px 24px', marginBottom: '24px' }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#854d0e', marginBottom: '10px' }}>Prerequisites before the switch</div>
                <ul style={{ fontSize: '17px', color: '#1e293b', lineHeight: '1.7', paddingLeft: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '8px' }}>30+ conversions per month (the Smart Bidding floor)</li>
                  <li style={{ marginBottom: '8px' }}>Offline conversion imports live for at least 14 days, so the algorithm has stage data</li>
                  <li>Per-stage values assigned and uploading consistently (no gaps wider than 48 hours)</li>
                </ul>
              </div>
              <p style={paraStyle}>
                Migration sequence that works: run Maximize Conversions for 30 days to build a baseline. Switch to Maximize Conversion Value. Add Target ROAS only after another 30 days of value data. The full ramp takes 60-90 days, in line with Cometly&apos;s 2-4 week algorithm learning windows applied across two strategy phases (<a href="https://www.cometly.com/post/poor-quality-leads-from-ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cometly, 2026</a>).
              </p>
              <p style={paraStyle}>
                Counter-example we see often: B2B accounts flip directly to Target ROAS with an aspirational target. The system cannot find conversions at that ROAS, spend collapses, the team blames the algorithm. Run it loose first.
              </p>
              <MascotQuote mascot="aegis">
                Last week I flagged Campaign G2-SaaS-Demo. MQL-to-SQL rate dropped from 18 percent to 7 percent over 14 days. Form fills were up 22 percent. That pattern is value-based bidding working in reverse: Smart Bidding chasing volume because OCI uploads stalled. I paused the bid strategy change and pinged the CRM admin. Stage updates were stuck since the API token rotated. Two-day fix, no budget burn.
              </MascotQuote>
            </section>

            {/* Fix #3 */}
            <section id="fix-3">
              <h2 style={h2Style}>Fix #3: Exclude Audiences That Look Like Buyers But Aren&apos;t</h2>
              <p style={paraStyle}>
                B2B campaigns leak budget to job-seekers, freelancers, students, and competitors auditing your offer. Exclude them at campaign level or, better, at account level via a shared exclusion list.
              </p>
              {/* Comparison table */}
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', color: '#1e293b' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Audience exclusion</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Source signal in Google Ads</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Why exclude in B2B</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Typical spend reclaim</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px' }}>Job-seekers</td>
                      <td style={{ padding: '12px 16px' }}>In-market: Employment</td>
                      <td style={{ padding: '12px 16px' }}>Search company name plus careers, hit retargeting</td>
                      <td style={{ padding: '12px 16px' }}>5-15%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px' }}>Freelancers / self-employed</td>
                      <td style={{ padding: '12px 16px' }}>Affinity: Small Office Workers (selective)</td>
                      <td style={{ padding: '12px 16px' }}>Want free trials, no buying authority</td>
                      <td style={{ padding: '12px 16px' }}>3-8%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px' }}>Students</td>
                      <td style={{ padding: '12px 16px' }}>Detailed demographics: Education Status</td>
                      <td style={{ padding: '12px 16px' }}>Researchers, case-study writers, zero pipeline value</td>
                      <td style={{ padding: '12px 16px' }}>2-5%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px' }}>Competitors / vendors</td>
                      <td style={{ padding: '12px 16px' }}>IP exclusions plus competitor domain lists</td>
                      <td style={{ padding: '12px 16px' }}>Audit your offer, never buy</td>
                      <td style={{ padding: '12px 16px' }}>1-3%</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px 16px' }}>Existing customers (paid acquisition)</td>
                      <td style={{ padding: '12px 16px' }}>Customer Match list as exclusion</td>
                      <td style={{ padding: '12px 16px' }}>Renewal flow lives elsewhere</td>
                      <td style={{ padding: '12px 16px' }}>5-12%</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px' }}>In-house employees</td>
                      <td style={{ padding: '12px 16px' }}>Customer Match list (employee emails)</td>
                      <td style={{ padding: '12px 16px' }}>Test traffic distorts the signal</td>
                      <td style={{ padding: '12px 16px' }}>1-2%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={paraStyle}>
                Implementation tactic: stack exclusions at the account level (Tools, Shared library, Audience manager) so they apply to every campaign. Per-campaign exclusion lists drift out of sync quickly. Account-level lists do not.
              </p>
              <p style={paraStyle}>
                One caveat. Customer Match list size has to hit Google&apos;s match threshold (typically 1,000+ users) before it activates as an exclusion. Smaller B2B accounts may not have list density to use this lever yet. Build the list anyway, it will activate once volume catches up.
              </p>
            </section>

            {/* Fix #4 */}
            <section id="fix-4">
              <h2 style={h2Style}>Fix #4: Make the Form Do the First Qualification Pass</h2>
              <p style={paraStyle}>
                The form is your cheapest qualifier. Every field you add filters before sales touches the lead. The marginal cost of a longer form is a 15-30 percent drop in form_complete count. The marginal benefit is a 2-3x lift in sales-accepted rate. The math almost always favors longer forms in B2B.
              </p>
              <p style={paraStyle}>
                The five form changes that produce the largest filtering effect:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '14px' }}><strong>Require business email.</strong> Block @gmail.com, @yahoo.com, @hotmail.com, @outlook.com domains at submit, unless you intentionally target SMB owners or freelancers.</li>
                <li style={{ marginBottom: '14px' }}><strong>Add a company-size dropdown</strong> (1-10, 11-50, 51-200, 201-1000, 1000+). Auto-disqualify ranges that do not fit your ideal customer profile.</li>
                <li style={{ marginBottom: '14px' }}><strong>Add a job-title or role question.</strong> Filter out students, interns, and job-seekers in real time before they hit your sales team&apos;s inbox.</li>
                <li style={{ marginBottom: '14px' }}><strong>Add a budget-or-timeline question</strong> for high-ticket products. Use sparingly: it hurts completion rate 20-40 percent, but it is brutally effective for $50K+ deals.</li>
                <li style={{ marginBottom: '14px' }}><strong>Use a multi-step form.</strong> The first step is intentionally light (email plus company). The second step gates by ICP fit. Junk drops off between steps.</li>
              </ol>
              <p style={paraStyle}>
                The counter-balance honesty: longer forms cut form_complete count. That is the point. You are not optimizing for forms, you are optimizing for sales-accepted leads. After Fix #1 is live, Smart Bidding accepts the lower form count and bids harder on qualified leads.
              </p>
            </section>

            {/* Fix #5 */}
            <section id="fix-5">
              <h2 style={h2Style}>Fix #5: Tighten Match Types and Mine Negatives Weekly</h2>
              <p style={paraStyle}>
                Broad match in B2B without aggressive negative keyword maintenance is a budget leak. Most accounts cannot sustain the daily review cadence broad match requires, so the practical default is tighter.
              </p>
              <p style={paraStyle}>
                Match-type rule of thumb for B2B:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Phrase match</strong> for primary commercial intent terms (crm software for, marketing automation platform)</li>
                <li style={{ marginBottom: '10px' }}><strong>Exact match</strong> for high-value branded plus competitor terms</li>
                <li><strong>Broad match</strong> only when paired with Smart Bidding and a daily negative keyword review. Most teams cannot sustain that cadence, so default to phrase and exact unless you have a dedicated paid search analyst.</li>
              </ul>
              <p style={paraStyle}>
                The weekly negative-keyword routine that catches 80 percent of leakage in 30 minutes:
              </p>
              <ol style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '12px' }}>Open Search Terms Report. Filter for last 7 days.</li>
                <li style={{ marginBottom: '12px' }}>Sort by cost descending. Review every term that spent more than $20 with zero conversions.</li>
                <li style={{ marginBottom: '12px' }}>Categorize each: irrelevant intent, wrong audience (DIY tutorials, free tools), wrong product (synonym for a competitor), informational-only.</li>
                <li style={{ marginBottom: '12px' }}>Add as exact-match negatives at ad-group level, phrase-match negatives at campaign level, broad-match negatives at account level (shared negative list).</li>
              </ol>
              <p style={paraStyle}>
                For the full procedural depth on match-type strategy, our breakdown of <a href="/blog/google-ads-keyword-match-types-explained" style={linkStyle}>Google Ads keyword match types</a> walks through the trade-offs with examples.
              </p>
            </section>

            {/* Fix #6 */}
            <section id="fix-6">
              <h2 style={h2Style}>Fix #6: Audit Lead Form Match-Quality Score Weekly</h2>
              <p style={paraStyle}>
                Google now reports a match-<a href="/blog/the-complete-guide-to-google-ads-quality-score-in-2025" style={linkStyle}>quality score</a> for lead form extensions. The score is the platform telling you which ad groups are attracting wrong-intent leads. Most B2B accounts ignore the signal, which is a missed opportunity since Google is essentially flagging waste for you.
              </p>
              <p style={paraStyle}>
                Where to find the score: Google Ads, Campaigns, select campaign, Ads &amp; assets, Lead forms, expand the row for the Match quality column. The feature went into general availability in 2025.
              </p>
              <p style={paraStyle}>
                Threshold rules of thumb:
              </p>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' }}>
                <li style={{ marginBottom: '10px' }}><strong>Above 0.7:</strong> leave alone, the ad group is well-aligned</li>
                <li style={{ marginBottom: '10px' }}><strong>0.4 to 0.7:</strong> tighten audience signals, review ad copy for over-promise</li>
                <li><strong>Below 0.4:</strong> pause the ad group, re-audit keywords, rewrite ad copy to better match ICP language</li>
              </ul>
              <p style={paraStyle}>
                Pair this signal with CRM-side MQL conversion rate per ad group. The two metrics correlate. Low match-quality typically precedes low MQL rate by 14-21 days, which means you get a leading indicator instead of a lagging one.
              </p>
              <MascotQuote mascot="maximus">
                Once OCI is solid and exclusions are stacked, I run the apply loop. Last cycle on a $48K-per-month account: paused 7 ad groups under 0.4 match-quality, pushed updated negatives across 3 campaigns, swapped Maximize Conversions for Maximize Conversion Value on the top spender. 14-day result: form fills down 31 percent, SQLs up 19 percent, CAC on revenue-basis dropped from $2,840 to $1,610.
              </MascotQuote>
              <p style={paraStyle}>
                That CAC delta sits inside Cometly&apos;s reported 20-40 percent range for closed-loop B2B teams (<a href="https://www.cometly.com/post/poor-quality-leads-from-ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cometly, 2026</a>). It is unusual only in how cleanly it shows up when the order of operations is right.
              </p>
            </section>

            {/* Rebuild */}
            <section id="rebuild">
              <h2 style={h2Style}>When the Patch Is Not Enough (Honest Section)</h2>
              <p style={paraStyle}>
                Sometimes the campaign architecture is the actual problem. Patching offline conversions on top of broken structure wastes 6-8 weeks and produces a frustrated team. Three signals say rebuild instead of patch:
              </p>
              <p style={paraStyle}>
                <strong>Signal 1: Campaign-type sprawl.</strong> Performance Max plus Search plus Display plus Demand Gen all running broad with overlapping audiences. Audience signals leak across campaigns. The fix is isolation by intent: Search for commercial, PMax only after a Search baseline exists for B2B. The diagnose side of this is in our <a href="/blog/performance-max-problems-b2b-marketing" style={linkStyle}>Performance Max in B2B breakdown</a>.
              </p>
              <p style={paraStyle}>
                <strong>Signal 2: Ad copy and landing page promise different offers.</strong> A perfect offline conversion setup cannot fix copy-product mismatch. Intent-matched landing pages produce conversion rates up to 4x higher than generic homepages (<a href="https://www.themarketingblender.com/google-ads-for-b2b-whats-working-in-2026-and-whats-not/" target="_blank" rel="noopener noreferrer" style={linkStyle}>The Marketing Blender, 2026</a>), so the landing page is part of the qualification chain, not a separate problem.
              </p>
              <p style={paraStyle}>
                <strong>Signal 3: CRM data hygiene is too weak for OCI to work.</strong> If sales does not update stages reliably or contacts are duplicated and orphaned, the signal you send Google is noise. Pause the OCI rollout, fix the CRM operationally for 30-60 days, then re-attempt. As Ramsey Sanchez puts it in The Marketing Blender&apos;s 2026 B2B roundup, do not just focus on the <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>cost per click</a>, you need to be focusing on optimizing for lead and lead quality. Quality of the data feeding the loop matters more than quantity.
              </p>
              <p style={paraStyle}>
                If two or more of these signals are present, sequence the rebuild before the OCI install. If only one is present, fix it in parallel.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              <p style={paraStyle}>
                <strong>How long until offline conversion imports actually change Smart Bidding behavior?</strong> 14 days minimum after stable uploads begin. Google needs that window for the algorithm to ingest stage data and recalibrate. Some accounts see meaningful shifts at 21-30 days, in line with Cometly&apos;s reported 2-4 week algorithm learning windows (<a href="https://www.cometly.com/post/poor-quality-leads-from-ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cometly, 2026</a>).
              </p>
              <p style={paraStyle}>
                <strong>What if my sales cycle is 9 months? Will OCI still work?</strong> Yes, with one adjustment: use pipeline-stage values (MQL, SQL, Opportunity) rather than waiting for closed-won. Smart Bidding learns from the early stages and uses them as a leading indicator. Final closed-won uploads refine the model over quarters but do not have to be the input signal.
              </p>
              <p style={paraStyle}>
                <strong>Should we use Google Ads lead form extensions or send traffic to a landing page form?</strong> Lead form extensions yield more leads at lower cost per lead, but lower average quality. Landing page forms allow custom qualification fields. For B2B, landing page forms with qualifying questions almost always win on pipeline-valued CAC, even at lower volume.
              </p>
              <p style={paraStyle}>
                <strong>How do we handle privacy and consent with offline conversion imports?</strong> Capture explicit consent at form submission for data sharing with Google. For EU traffic, run consent mode v2. Without proper consent, OCI uploads should not transmit user-level identifiers, and Google may silently drop them.
              </p>
              <p style={paraStyle}>
                <strong>Can <a href="/blog/google-ads-negative-keywords" style={linkStyle}>negative keywords</a> break Smart Bidding&apos;s learning?</strong> No. Adding negatives does not reset the learning phase. Changing bid strategy or shifting budget more than 20 percent does. Negative keyword maintenance is safe to do weekly without disrupting the algorithm.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>How Kampaio Handles the Monitoring Loop</h2>
              <p style={paraStyle}>
                Even with all six fixes in place, lead quality drifts. CRM API tokens expire. Sales reps stop updating stages. A new audience signal goes live and skews mid-funnel. <strong>Aegis</strong> (the B6 risk-review <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a>) runs weekly drift detection on MQL conversion rate by ad group, lead form match-quality trend, and OCI upload health. The detection fires before budget burns rather than after.
              </p>
              <p style={paraStyle}>
                Once direction is confirmed by a human, <strong>Maximus</strong> orchestrates the apply: pause underperforming ad groups, push negative keyword updates, refresh OCI configurations. The human stays in approval, the agents do the click work. The same teams who land in Cometly&apos;s 20-40 percent CAC reduction band (<a href="https://www.cometly.com/post/poor-quality-leads-from-ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>Cometly, 2026</a>) are the ones who automate the maintenance loop, not just the initial fix.
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '40px',
                marginBottom: '40px'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Want your B2B lead-quality loop on autopilot?
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: 500, opacity: 0.9 }}>
                  See how Aegis and Maximus run weekly drift detection and apply across your Google Ads accounts.
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
                >
                  See Kampaio Pricing
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ol style={{ fontSize: '17px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '10px' }}>Pete Bowen (2025): &quot;How I Improve Lead Quality by Telling Google Which Leads Are Good&quot; (<a href="https://pete-bowen.com/how-i-improve-lead-quality-by-telling-google-which-leads-are-good" target="_blank" rel="noopener noreferrer" style={linkStyle}>pete-bowen.com</a>)</li>
                <li style={{ marginBottom: '10px' }}>The Marketing Blender (2026): &quot;Google Ads for B2B: What&apos;s Working in 2026 (And What&apos;s Not)&quot; (<a href="https://www.themarketingblender.com/google-ads-for-b2b-whats-working-in-2026-and-whats-not/" target="_blank" rel="noopener noreferrer" style={linkStyle}>themarketingblender.com</a>)</li>
                <li style={{ marginBottom: '10px' }}>InterTeam Marketing (2025): &quot;9 Ways to Improve Lead Quality in Your Ad Campaigns&quot; (<a href="https://www.interteammarketing.com/blog/how-to-improve-lead-quality" target="_blank" rel="noopener noreferrer" style={linkStyle}>interteammarketing.com</a>)</li>
                <li style={{ marginBottom: '10px' }}>Cometly (2026): &quot;Fix Poor Quality Leads From Ads: 7 Proven Strategies&quot; (<a href="https://www.cometly.com/post/poor-quality-leads-from-ads" target="_blank" rel="noopener noreferrer" style={linkStyle}>cometly.com</a>)</li>
                <li>Google Ads support: &quot;Enhanced conversions for leads&quot; (<a href="https://support.google.com/google-ads/answer/2998031" target="_blank" rel="noopener noreferrer" style={linkStyle}>support.google.com</a>)</li>
              </ol>
            </section>

          </div>
        </div>
        <KeepReading slug="b2b-google-ads-low-quality-leads" category="google-ads" />
      <Footer compact={true} />
      </div>
    </>
  );
}
