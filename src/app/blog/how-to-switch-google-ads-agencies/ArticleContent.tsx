'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import { BigStat, Callout, KeyTakeaways, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Switch Google Ads Agencies Without Losing Your Account or Your Data",
    "description": "A step-by-step guide to switching Google Ads agencies safely: who owns the account, how to transfer the MCC and billing, export your history, and avoid the agency that will not hand over access.",
    "image": "https://kampaio.com/og/how-to-switch-google-ads-agencies.png",
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
    "datePublished": "2026-06-14T00:00:00.000Z",
    "dateModified": "2026-06-14T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/how-to-switch-google-ads-agencies"
    },
    "keywords": "switch google ads agencies, transfer google ads account, google ads account ownership, mcc transfer, external billing transfer, change ppc agency, who owns google ads account, b6, maximus, aegis, vox",
    "wordCount": 2200,
    "articleSection": "PPC",
    "inLanguage": "en"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I change my Google Ads account from individual to organization?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Go to Tools > Business data and update the account type. This changes billing and legal entity details but has no effect on agency access or manager links."
        }
      },
      {
        "@type": "Question",
        "name": "How do I change the payment user in Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If billing is on your own profile, update payment methods under Billing > Payment methods. If the agency holds consolidated billing, you need the External Billing Transfer. The outgoing agency initiates it, you cannot reassign the paying manager yourself."
        }
      },
      {
        "@type": "Question",
        "name": "Can I transfer a Google Ads account to another Google account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The account stays on its original Google account. You transfer access (via manager links) and billing (via External Billing Transfer), not the account itself. If the agency created the account inside their MCC, you need their cooperation or Google support to extract it."
        }
      },
      {
        "@type": "Question",
        "name": "Will I lose my conversion history if I switch agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, provided the same account keeps running. Conversion history and Smart Bidding learning live in the account, not in the agency relationship. A rebuild in a new account resets everything. Do not allow that."
        }
      },
      {
        "@type": "Question",
        "name": "How long does switching Google Ads agencies take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Access transfer takes 1 to 3 business days. Billing transfer takes up to 7 days. The total clean-switch window is 10 to 14 days. Add 2 to 4 weeks for a hostile exit or billing dispute."
        }
      },
      {
        "@type": "Question",
        "name": "Can the agency keep my account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not if you have Admin access. If the agency holds owner status via their MCC and you lack Admin, escalate in writing, then to Google Ads support. Last resort is a rebuild, which costs you conversion history and Smart Bidding learning."
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
        "name": "How to Switch Google Ads Agencies Without Losing Your Account or Your Data",
        "item": "https://www.kampaio.com/blog/how-to-switch-google-ads-agencies"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR: The Fast Path to Switching Google Ads Agencies', level: 1 },
    { id: 'who-owns', title: 'Who Actually Owns Your Google Ads Account', level: 1 },
    { id: 'pre-switch', title: 'Before You Give Notice: The Pre-Switch Checklist', level: 1 },
    { id: 'transfer', title: 'How to Transfer the Account: MCC and Access Handover', level: 1 },
    { id: 'billing', title: 'Transferring Billing and Your Payment Profile', level: 1 },
    { id: 'wont-hand-over', title: 'When the Agency Will Not Hand Over the Account', level: 1 },
    { id: 'another-agency', title: 'The Better Question: Do You Need Another Agency at All?', level: 1 },
    { id: 'faq', title: 'FAQ: Switching Google Ads Agencies', level: 1 },
    { id: 'cta', title: 'Switch Without Starting Over', level: 1 }
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
          <ArticleHero slug="how-to-switch-google-ads-agencies" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              PPC · Account Ownership · Switching
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: 1.2 }}>
              How to Switch Google Ads Agencies Without Losing Your Account or Your Data
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
              The Google Ads account belongs to you, the advertiser, not the agency, as long as it was set up correctly. Switching is a logistics problem, not a legal fight. Run the pre-switch checklist, transfer access and billing in order, and it wraps up in days.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>by Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>SEO Agent at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 14, 2026 · 10 min read</span>
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
              The Google Ads account belongs to you, the advertiser, not the agency, as long as it was set up correctly. Switching agencies is a logistics problem, not a legal fight. Run the pre-switch checklist before you give notice, transfer MCC access and billing in order, and the whole thing wraps up in days, not weeks.
            </p>

            <section id="tldr">
              <h2 style={h2Style}>TL;DR: The Fast Path to Switching Google Ads Agencies</h2>
              <p style={paragraphStyle}>
                The clean switching sequence in five steps:
              </p>

              <KeyTakeaways
                title="The clean switch, in five steps"
                items={[
                  'Confirm you have Admin access to your Google Ads account (Tools > Access and security).',
                  'Run the pre-switch checklist before the outgoing agency knows you are leaving.',
                  'Have the new agency send a manager account link request, then accept it and grant Admin or Standard access.',
                  'Initiate the billing transfer if campaigns run through the agency payment profile. The new manager has 7 days to approve.',
                  'Remove the old agency manager link only after the new agency is confirmed and billing is live.',
                ]}
              />

              <p style={paragraphStyle}>
                A clean MCC link transfer can wrap up in under 30 minutes once both managers agree (a practical estimate, not a Google figure). Billing needs that 7-day window, so build your timeline around it. Worst case, the agency refuses. There is a documented path for that, covered below.
              </p>

              <MascotQuote mascot="maximus">
                A switch has two moving parts: access transfer and billing transfer. Both run on separate clocks. I typically see the access side close in 1 to 2 business days (link request, acceptance, old link removed). Billing adds up to 7 days. Plan for a 10-day total window and you will not be surprised.
              </MascotQuote>
            </section>

            <section id="who-owns">
              <h2 style={h2Style}>Who Actually Owns Your Google Ads Account</h2>
              <p style={paragraphStyle}>
                The advertiser owns the account. The agency manages it through a linked manager account (MCC) or as a designated account owner. Google&apos;s help documentation is direct: &quot;A client account can only have one owner&quot; (<a href="https://support.google.com/google-ads/answer/7456532" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads Help, answer/7456532</a>).
              </p>
              <p style={paragraphStyle}>
                The problem is that &quot;owner&quot; is a specific Google Ads status, not just whoever runs the campaigns. Two setups produce very different outcomes when you decide to leave.
              </p>

              {/* Setup A vs Setup B, explicit 2-col card grid (no auto-fit) */}
              <div className="setup-grid">
                <div className="setup-card setup-good">
                  <div className="setup-tag setup-tag-good">Setup A: the clean case</div>
                  <h3 className="setup-title">Account under your email, agency added as a linked manager</h3>
                  <p className="setup-body">You created the account, you hold Admin access, and the agency was invited in. You control the account at exit. This is the case you want.</p>
                </div>
                <div className="setup-card setup-bad">
                  <div className="setup-tag setup-tag-bad">Setup B: the trap</div>
                  <h3 className="setup-title">Account created inside the agency MCC</h3>
                  <p className="setup-body">The agency built your account under their manager hierarchy. They are the owner. You may have Standard or Read-only access at best. This is where people get trapped.</p>
                </div>
              </div>

              <p style={paragraphStyle}>
                Google&apos;s rules provide some protection even in Setup B: users of the client account &quot;can always unlink a manager with ownership&quot; (<a href="https://support.google.com/google-ads/answer/7456532" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads Help, answer/7456532</a>). But that only works if you have Admin-level access to the client account itself.
              </p>
              <p style={paragraphStyle}>
                Only <strong>Admin</strong> users can accept or reject manager link requests and unlink manager accounts. Standard users can edit campaigns but cannot touch access or manager links. The five access tiers are: Email-only, Billing, Read-only, Standard, and Admin.
              </p>
              <p style={paragraphStyle}>
                Data ownership and administrative access are separate. Even when an agency holds &quot;owner&quot; status, the account&apos;s historical data (campaigns, search terms, conversion history) belongs to the account and cannot be taken when access is removed.
              </p>

              <MascotQuote mascot="aegis">
                Before you send the resignation email, go to Tools &gt; Access and security in your Google Ads account. If you do not see &quot;Admin&quot; next to your name, you do not control your own account yet. Fix that before the agency finds out you are leaving. Request Admin access in writing and reference Google&apos;s ownership documentation. Silence after the request is your evidence if you need to escalate.
              </MascotQuote>
            </section>

            <section id="pre-switch">
              <h2 style={h2Style}>Before You Give Notice: The Pre-Switch Checklist</h2>
              <p style={paragraphStyle}>
                Every step here must happen quietly, before the outgoing agency knows you are moving. An agency that senses churn can slow the handover. That is how incentives work.
              </p>

              <Steps>
                <Step title="Confirm your access level">
                  Go to Tools &gt; Access and security. Verify you have Admin. If you do not, request it now and document the request.
                </Step>
                <Step title="Export campaign structure and settings">
                  Download your campaign, ad group, and keyword structure as a CSV from the Reports tab. Screenshot your conversion actions and their tag sources.
                </Step>
                <Step title="Export historical performance data">
                  Pull at least 12 months of history. Export search terms, conversion actions, and audience lists. The data stays in the account, but a local copy is your insurance.
                </Step>
                <Step title="Audit conversion tracking before the handover">
                  Most businesses skip this and regret it. One practitioner found 50,000 phantom conversion events auto-created by Google&apos;s local engagement actions, with no advertiser awareness (Leigh Buttrey, Search Engine Land, 2026). Audit every conversion action: name, source, category, and whether it maps to a real business outcome. If something looks off, work through <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>the conversion tracking triage</a> before you hand the account over.
                </Step>
                <Step title="Clarify billing ownership">
                  Is billing tied to your own payment profile or to the agency&apos;s consolidated billing? Open Billing &gt; Billing summary to see who is listed as the paying manager.
                </Step>
                <Step title="Note all tracking tags and container ownership">
                  Who owns the GTM container? Who has access to GA4? These are separate from Google Ads but affect what you can see post-transition.
                </Step>
                <Step title="Have the destination ready before you say anything">
                  Do not give notice into a void. The new manager account link request should be queued and waiting.
                </Step>
              </Steps>

              <p style={paragraphStyle}>
                Switching agencies does not delete conversion history or reset Smart Bidding. Learning lives in the account, not in the agency relationship. The risk is a rebuild in a new account. Do not allow that. One more thing: do not switch mid-peak season.
              </p>

              <MascotQuote mascot="vox">
                Do not run a billing transfer in November or late December. Smart Bidding re-stabilizes over 2 to 4 weeks after any disruption, and that window costs more when CPCs are already elevated. Schedule the transition for a low-spend period, January or July for most e-com accounts, and the re-stabilization cost is minimal.
              </MascotQuote>
            </section>

            <section id="transfer">
              <h2 style={h2Style}>How to Transfer the Account: MCC and Access Handover</h2>
              <p style={paragraphStyle}>
                For Setup A (you own the account), the handover runs in four steps.
              </p>
              <ol style={{ ...paragraphStyle, paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}><strong>New agency sends a manager account link request.</strong> They initiate from their Google Ads manager account. You get a notification in yours.</li>
                <li style={{ marginBottom: '12px' }}><strong>Accept the link request.</strong> Go to Tools &gt; Account access &gt; Manager accounts. Accept the pending request and set the permission level. New agency needs at minimum <strong>Standard</strong> to manage campaigns, <strong>Admin</strong> if they handle access changes.</li>
                <li style={{ marginBottom: '12px' }}><strong>Verify the new agency&apos;s access is live.</strong> Confirm they can see and edit the account before touching the old agency&apos;s link.</li>
                <li style={{ marginBottom: '12px' }}><strong>Remove the old agency&apos;s manager link.</strong> Go to Manager accounts and unlink the outgoing agency. Do not do this until step 3 is confirmed.</li>
              </ol>
              <p style={paragraphStyle}>
                For Setup B (account inside the agency&apos;s MCC), the agency must grant you Admin access or push the account out of their MCC. If they cooperate, the process is the same. If they do not, see the next section.
              </p>

              <Callout variant="warning" title="Do not rebuild">
                Do not delete the account and do not rebuild from scratch. A new account loses every conversion, every audience, and all Smart Bidding learning. Access level definitions are in <a href="https://support.google.com/google-ads/answer/6372672" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads Help, answer/6372672</a>.
              </Callout>
            </section>

            <section id="billing">
              <h2 style={h2Style}>Transferring Billing and Your Payment Profile</h2>
              <p style={paragraphStyle}>
                Billing issues trip up more agency switches than access problems do. Two cases apply.
              </p>

              <ComparisonTable
                headers={['Case', 'What you do', 'Timeline']}
                rows={[
                  { cells: ['Billing on your own payment profile', 'Nothing. You keep paying as-is.', 'Immediate'] },
                  { cells: ['Billing through the agency consolidated profile', 'The current paying manager initiates an External Billing Transfer. You and the new agency approve.', 'Up to 7 days for the new manager to approve'], highlight: true },
                ]}
                caption="The two billing cases when switching Google Ads agencies."
              />

              <p style={paragraphStyle}>
                For Case B, the feature is called &quot;External Billing Transfer&quot; (Billing &gt; Billing transfers &gt; Change who pays). Google is explicit on the timeline: once the request is submitted, the new agency has 7 days to approve or deny. If no action is taken within 7 days, the request is automatically canceled and must be re-initiated (<a href="https://support.google.com/google-ads/answer/13812597" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads Help, answer/13812597</a>).
              </p>

              <BigStat
                value="7 days"
                label="to approve the billing transfer"
                claim="If no one approves the External Billing Transfer within the window, the request auto-cancels and has to be re-initiated. Plan around it."
                source="Source: Google Ads Help, answer/13812597, 2026"
              />

              <p style={paragraphStyle}>
                One thing that catches people: the current paying manager (the outgoing agency) must initiate the transfer, not you, not the new agency. If the outgoing agency is uncooperative, this becomes a problem. Get the transfer submitted before you give notice, or make it a condition of your exit agreement. Do not let campaigns go unfunded during the handover. The 7-day window needs to close before your billing cycle turns over.
              </p>
            </section>

            <section id="wont-hand-over">
              <h2 style={h2Style}>When the Agency Will Not Hand Over the Account</h2>
              <p style={paragraphStyle}>
                This happens. The agency built your account inside their MCC, you have Standard or Read-only access, and they are not cooperating with the exit.
              </p>
              <p style={paragraphStyle}>
                The advertiser owns the account data. Even a manager with &quot;owner&quot; status can be unlinked at the Admin level. Google&apos;s system is built for exactly this case, where &quot;an advertiser changes or leaves agencies&quot; (<a href="https://support.google.com/google-ads/answer/13812597" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads Help, answer/13812597</a>).
              </p>
              <p style={paragraphStyle}>
                Escalation path, in order:
              </p>
              <ol style={{ ...paragraphStyle, paddingLeft: '24px' }}>
                <li style={{ marginBottom: '12px' }}><strong>Request Admin access in writing.</strong> Reference Google&apos;s ownership documentation (answer/7456532). Keep the record.</li>
                <li style={{ marginBottom: '12px' }}><strong>Contact Google Ads support.</strong> Use support chat in the account or the US support line. Google can intervene in ownership disputes when the documented flow is blocked.</li>
                <li style={{ marginBottom: '12px' }}><strong>Last resort: rebuild.</strong> If the account was built entirely in the agency&apos;s MCC and all access is locked, you may have to start over. That means losing conversion history and Smart Bidding learning, which is exactly why the pre-switch checklist matters.</li>
              </ol>

              <MascotQuote mascot="aegis">
                The moment you suspect a hostile exit, screenshot every access level visible to you: your role, the agency manager link status, conversion actions, billing. Do it before you send any communication to the agency. If you escalate to Google, this is your evidence file. Without it, ownership disputes slow down significantly.
              </MascotQuote>
            </section>

            <section id="another-agency">
              <h2 style={h2Style}>The Better Question: Do You Need Another Agency at All?</h2>
              <p style={paragraphStyle}>
                Most SMBs switch agencies every 12 to 18 months. New faces, same cycle: onboarding lag, learning period, dissatisfaction, another search. The account relationship resets every time.
              </p>
              <p style={paragraphStyle}>
                The structural problem is not the specific agency. You never own the day-to-day. Someone else decides what gets checked and what gets changed. Want to know what happened to a campaign last Tuesday? You send an email and wait.
              </p>
              <p style={paragraphStyle}>
                <a href="/b6" style={linkStyle}>B6</a> connects to your own Google Ads account via OAuth. The account stays in your name, with no agency MCC and no &quot;they built it in their system&quot; problem. Maximus orchestrates <a href="/blog/google-ads-strategy" style={{ color: '#764ba2', textDecoration: 'underline' }}>strategy</a>, Aegis monitors risk, Vox runs bid logic, and Vigil watches 24/7.
              </p>
              <p style={paragraphStyle}>
                Pricing is $99, $199, and $399 per month, against a typical SMB agency retainer of $1,500 to $3,000 per month (the full <a href="/blog/ppc-management-cost" style={linkStyle}>breakdown of what PPC management costs</a> shows where that money goes), or Optmyzr and Madgicx at $499 and up for tools that still need a human to act. If you are looking for a new agency instead, <a href="/blog/how-to-choose-a-ppc-agency" style={linkStyle}>choosing a Google Ads agency</a> covers the selection framework.
              </p>

              <MascotQuote mascot="maximus">
                With B6, you set the autonomy level and the account stays in your name. There is no next agency to switch to. The &quot;who controls what&quot; question has a permanent answer: you own the account, the agents run the work, you approve or override any significant change.
              </MascotQuote>
            </section>

            <section id="faq">
              <h2 style={h2Style}>FAQ: Switching Google Ads Agencies</h2>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How do I change my Google Ads account from individual to organization?</strong></p>
                <p style={paragraphStyle}>Go to Tools &gt; Business data and update the account type. This changes billing and legal entity details but has no effect on agency access or manager links.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How do I change the payment user in Google Ads?</strong></p>
                <p style={paragraphStyle}>If billing is on your own profile, update payment methods under Billing &gt; Payment methods. If the agency holds consolidated billing, you need the External Billing Transfer described above. The outgoing agency initiates it, you cannot reassign the paying manager yourself.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Can I transfer a Google Ads account to another Google account?</strong></p>
                <p style={paragraphStyle}>No. The account stays on its original Google account. You transfer access (via manager links) and billing (via External Billing Transfer), not the account itself. If the agency created the account inside their MCC, you need their cooperation or Google support to extract it.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Will I lose my conversion history if I switch agencies?</strong></p>
                <p style={paragraphStyle}>No, provided the same account keeps running. Conversion history and Smart Bidding learning live in the account, not in the agency relationship. A rebuild in a new account resets everything. Do not allow that.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How long does switching take?</strong></p>
                <p style={paragraphStyle}>Access transfer: 1 to 3 business days. Billing transfer: up to 7 days. Total clean-switch window: 10 to 14 days. Add 2 to 4 weeks for a hostile exit or billing dispute.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Can the agency keep my account?</strong></p>
                <p style={paragraphStyle}>Not if you have Admin access. If the agency holds &quot;owner&quot; status via their MCC and you lack Admin, escalate in writing, then to Google Ads support. Last resort is a rebuild, which costs you conversion history and Smart Bidding learning.</p>
              </div>
            </section>

            <section id="cta">
              <h2 style={h2Style}>Switch Without Starting Over</h2>
              <p style={paragraphStyle}>
                Own your account, transfer it, do not rebuild. The sequence is fixed: confirm access, run the checklist, bring in the new manager, transfer billing, cut the old access.
              </p>
              <p style={paragraphStyle}>
                If the switch is to a new agency, <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>the signs it is time to fire your PPC agency</a> covers the decision side. Considering no agency at all? <a href="/blog/google-ads-without-agency" style={linkStyle}>Running Google Ads without an agency</a> walks through that path.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', padding: '32px', color: 'white', textAlign: 'center', marginTop: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Your account, your data, AI agents doing the work.</h3>
                <p style={{ fontSize: '16px', opacity: 0.95, marginBottom: '24px', lineHeight: 1.6 }}>
                  End the switching cycle entirely. B6 connects to your own Google Ads account via OAuth and runs the operational layer for you. From $99/mo.
                </p>
                <a href="/chat" style={{ display: 'inline-block', background: 'white', color: '#764ba2', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>
                  Chat with B6 on your account
                </a>
              </div>
            </section>

            <style jsx>{`
              .setup-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                margin: 32px 0;
              }
              @media (max-width: 600px) {
                .setup-grid { grid-template-columns: 1fr; }
              }
              .setup-card {
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 20px 22px;
                background: #ffffff;
              }
              .setup-good { border-top: 4px solid #10b981; }
              .setup-bad { border-top: 4px solid #ef4444; }
              .setup-tag {
                display: inline-block;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: 0.04em;
                text-transform: uppercase;
                padding: 4px 10px;
                border-radius: 6px;
                margin-bottom: 12px;
              }
              .setup-tag-good { background: #ecfdf5; color: #047857; }
              .setup-tag-bad { background: #fef2f2; color: #b91c1c; }
              .setup-title {
                font-size: 18px;
                font-weight: 700;
                color: #1e293b;
                margin: 0 0 8px;
                line-height: 1.35;
              }
              .setup-body {
                font-size: 16px;
                line-height: 1.6;
                color: #475569;
                margin: 0;
              }
            `}</style>
          </div>
        </div>
        <KeepReading slug="how-to-switch-google-ads-agencies" category="ppc" />
      <Footer />
      </div>
    </>
  );
}
