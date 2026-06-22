'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ComparisonTable from '../../../components/blog/ComparisonTable';
import MermaidDiagram from '../../../components/blog/MermaidDiagram';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why Is My Google Ads Account Suspended? Causes, Fixes, and How to Appeal",
    "description": "Your Google Ads account got suspended and Google's email is vague. Here are the real causes, how to find yours, and a step-by-step appeal that actually works.",
    "image": "https://kampaio.com/og/why-is-my-google-ads-account-suspended.png",
    author: {
      '@type': 'Person',
      name: 'Marcus',
      jobTitle: 'PPC Analyst',
      description: 'B6 PPC Analyst. Specializes in Google Ads account management, Smart Bidding strategy, and policy compliance for SMB e-commerce advertisers.',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://www.kampaio.com/#organization',
        name: 'Kampaio',
        url: 'https://www.kampaio.com',
      },
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
    "datePublished": "2026-06-22T00:00:00.000Z",
    "dateModified": "2026-06-22T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/why-is-my-google-ads-account-suspended"
    },
    "keywords": "google ads suspension, policy violation, egregious policy violation, account reinstatement, appeal, suspicious payment activity, circumventing systems, merchant center suspension, billing and payment requirements, unauthorized account activity",
    "wordCount": 2021,
    "articleSection": "Google Ads",
    "inLanguage": "en"
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to appeal and reinstate a suspended Google Ads account",
    "description": "Reinstatement requires fixing the root cause first, then submitting one clear, evidence-backed appeal. Follow these four steps to give your appeal the best chance of success.",
    "totalTime": "P21D",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Diagnose the exact cause",
        "text": "Use the in-account banner, the suspension email, Policy Manager, your payment profile, and the Merchant Center issues tab to identify which suspension bucket you are in. Do not proceed until you know whether it is a policy violation, a billing issue, or a Merchant Center cascade."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Fix the underlying issue completely",
        "text": "Update landing pages for content issues, resolve billing discrepancies for payment issues, or fix and appeal Merchant Center for a cascade. Document every change with screenshots before touching the appeal form."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Submit one clear, specific appeal",
        "text": "Click Contact Us in the suspension banner. Describe what the violation was, exactly what you fixed, and what evidence you have. Attach screenshots and keep the tone factual and calm."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Wait for a response before re-appealing",
        "text": "Standard timelines run from a few days to a few weeks. Filing too many appeals can pause appeal processing for 7 days. One thorough submission is worth more than three follow-ups."
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Google detect policy violations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google uses a combination of AI and human evaluation. Machine learning models trained on human reviewer decisions flag the majority of violations. Complex or high-stakes cases are reviewed by trained operators and analysts."
        }
      },
      {
        "@type": "Question",
        "name": "How will I be notified of a suspension?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google sends an in-account suspension banner (visible when you log in) and an email to the registered address. Both include the policy category. The specific triggering asset is rarely named."
        }
      },
      {
        "@type": "Question",
        "name": "Do account suspensions apply globally?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. A Google Ads account suspension applies to all campaigns and all countries in that account. You cannot run ads in one market while suspended in another."
        }
      },
      {
        "@type": "Question",
        "name": "How long is a Google Ads account suspended for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Suspensions are permanent unless you successfully appeal. You have at least 6 months from the suspension date to submit an appeal. Egregious violations are generally not reversed."
        }
      },
      {
        "@type": "Question",
        "name": "Can an account suspension be appealed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, for non-egregious violations. Click Contact Us in the suspension banner to access the appeal form. Identity verification is required and limited to 3 attempts, after which the appeal right is lost."
        }
      },
      {
        "@type": "Question",
        "name": "Can I set up another account while suspended?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Opening a new account while suspended is classified as circumventing systems, an egregious policy violation. The new account will also be suspended."
        }
      },
      {
        "@type": "Question",
        "name": "Can I still access my suspended account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, in read-only mode. You can view campaign data, download reports, and access the appeal form. You cannot run or edit ads."
        }
      },
      {
        "@type": "Question",
        "name": "How do I request a refund after suspension?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancel the account first. Then submit a refund request through Google Ads billing support. Refunds are not automatic on suspension, you must request them separately."
        }
      },
      {
        "@type": "Question",
        "name": "Why doesn't Google tell me the specific reason?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Google's enforcement system flags policy categories, not individual assets. The combination of scale (12.7 million accounts suspended annually) and automated enforcement means Google does not produce per-asset explanations."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.kampaio.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.kampaio.com/blog" },
      { "@type": "ListItem", "position": 3, "name": "Why Is My Google Ads Account Suspended?", "item": "https://www.kampaio.com/blog/why-is-my-google-ads-account-suspended" }
    ]
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Quick answer: the real reasons Google suspends accounts', level: 1 },
    { id: 'find-the-reason', title: 'How to find the actual reason', level: 1 },
    { id: 'policy-violations', title: 'Policy violations and what "egregious" means', level: 1 },
    { id: 'billing-payment', title: 'Billing, payment, and suspicious payment activity', level: 1 },
    { id: 'merchant-center', title: 'The Merchant Center connection', level: 1 },
    { id: 'appeal', title: 'How to appeal and reinstate (step by step)', level: 1 },
    { id: 'mistakes', title: 'Mistakes that make a suspension worse', level: 1 },
    { id: 'prevent', title: 'How to prevent the next suspension', level: 1 },
    { id: 'faq', title: 'Frequently asked questions', level: 1 },
    { id: 'cta', title: 'Get ahead of suspensions with B6', level: 1 }
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
  const listStyle: React.CSSProperties = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '24px' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="why-is-my-google-ads-account-suspended" />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Google Ads · Suspension · Appeal
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: 1.2 }}>
              Why Is My Google Ads Account Suspended? Causes, Fixes, and How to Appeal
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
              Your account is suspended, the email is vague, and revenue stopped today. Here are the seven real causes, how to find yours, and an appeal that actually works.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  M
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Marcus</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>PPC Analyst at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 22, 2026 · 11 min read</span>
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

            {/* Featured-snippet intro */}
            <p style={{ ...paragraphStyle, fontSize: '20px', fontWeight: 500, background: '#f8fafc', borderLeft: '4px solid #764ba2', padding: '20px 24px', borderRadius: '8px' }}>
              Your Google Ads account is suspended for one of seven reasons: a policy violation, an egregious policy violation, billing or payment failure, suspicious payment activity, unauthorized account activity, a related Merchant Center suspension, or age/Ads Grant requirements. Across 104 public discussions on this query, circumventing systems (13%), payment issues (11%), and Merchant Center cascades (10%) dominate the complaints.
            </p>

            {/* TL;DR callout */}
            <div className="b6-tldr">
              <div className="b6-tldr-label">TL;DR</div>
              <ul style={{ ...listStyle, marginBottom: 0 }}>
                <li style={{ marginBottom: '10px' }}>Seven suspension buckets exist. Your cause is in the in-account banner, the suspension email, or Policy Manager.</li>
                <li style={{ marginBottom: '10px' }}>Egregious violations = immediate suspension, no reinstatement. Standard violations = a 4-strike system with an appeal path.</li>
                <li style={{ marginBottom: '10px' }}>Fix the root cause first. Appeal second. Never open a new account.</li>
                <li style={{ marginBottom: 0 }}>You have a 6-month window to appeal. One calm, evidence-backed submission beats five angry ones.</li>
              </ul>
            </div>

            <section id="quick-answer">
              <h2 style={h2Style}>Quick answer: the real reasons Google suspends accounts</h2>
              <p style={paragraphStyle}>
                Google suspends accounts across seven distinct categories, each with a different severity level and a different path to resolution.
              </p>
              <p style={paragraphStyle}>
                The full list, from Google&apos;s official <a href="https://support.google.com/google-ads/answer/9841640?hl=en" target="_blank" rel="noopener noreferrer" style={linkStyle}>suspensions overview</a> (Google Ads Help, 2024):
              </p>

              {/* VISUAL 1: custom HTML 7-card grid, the seven suspension buckets, severity-coded */}
              <div className="b6-bucket-grid">
                <div className="b6-bucket" style={{ borderTopColor: '#f59e0b' }}>
                  <div className="b6-bucket-sev" style={{ color: '#f59e0b' }}>Strike system</div>
                  <div className="b6-bucket-title">Policy violations (non-egregious)</div>
                  <div className="b6-bucket-body">Misleading claims, unacceptable business practices, content violations. Follow a strike-based escalation.</div>
                </div>
                <div className="b6-bucket" style={{ borderTopColor: '#ef4444' }}>
                  <div className="b6-bucket-sev" style={{ color: '#ef4444' }}>Immediate ban</div>
                  <div className="b6-bucket-title">Egregious policy violations</div>
                  <div className="b6-bucket-body">Circumventing systems, counterfeit goods, malicious software. Instant suspension. No reinstatement path in most cases.</div>
                </div>
                <div className="b6-bucket" style={{ borderTopColor: '#10b981' }}>
                  <div className="b6-bucket-sev" style={{ color: '#10b981' }}>Often fixable</div>
                  <div className="b6-bucket-title">Billing and payment issues</div>
                  <div className="b6-bucket-body">Failed payments, unpaid balances, promo code abuse.</div>
                </div>
                <div className="b6-bucket" style={{ borderTopColor: '#f59e0b' }}>
                  <div className="b6-bucket-sev" style={{ color: '#f59e0b' }}>Verify identity</div>
                  <div className="b6-bucket-title">Suspicious payment activity</div>
                  <div className="b6-bucket-body">Virtual/prepaid cards, chargebacks, payment details that do not match the billing profile.</div>
                </div>
                <div className="b6-bucket" style={{ borderTopColor: '#f59e0b' }}>
                  <div className="b6-bucket-sev" style={{ color: '#f59e0b' }}>Secure account</div>
                  <div className="b6-bucket-title">Unauthorized account activity</div>
                  <div className="b6-bucket-body">Someone else accessed and violated policy from your account.</div>
                </div>
                <div className="b6-bucket" style={{ borderTopColor: '#ef4444' }}>
                  <div className="b6-bucket-sev" style={{ color: '#ef4444' }}>Cascade</div>
                  <div className="b6-bucket-title">Merchant Center linkage</div>
                  <div className="b6-bucket-body">A suspended Merchant Center account cascades into your linked Ads account.</div>
                </div>
                <div className="b6-bucket" style={{ borderTopColor: '#64748b' }}>
                  <div className="b6-bucket-sev" style={{ color: '#64748b' }}>Less common</div>
                  <div className="b6-bucket-title">Age or Ads Grant policy</div>
                  <div className="b6-bucket-body">Distinct rules for Ads Grant accounts and age-related requirements.</div>
                </div>
              </div>

              <p style={paragraphStyle}>
                In our analysis of 104 public discussion items for this query (Reddit 71, Hacker News 25, Stack Exchange 4, X live 4), circumventing systems is the single most-raised cause at 13% of threads. Payment and credit card issues follow at 11%. Merchant Center cascades account for 10-19% when &quot;merchant center&quot; and &quot;google merchant&quot; threads are combined. Those three buckets cover roughly a third of all community complaints.
              </p>
              <p style={paragraphStyle}>
                In the past year alone, Google flagged over 5.5 billion ads and suspended around 12.7 million advertiser accounts, according to John Horn, CEO of StubGroup (<a href="https://ppchero.com/how-to-navigate-your-google-ads-suspension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>PPC Hero, May 2024</a>). Suspensions are common. They are also often fixable.
              </p>
              <p style={paragraphStyle}>
                If your account is running but your <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>ROAS dropped suddenly</a>, a billing flag or policy hold may be the hidden cause, not bid strategy.
              </p>
            </section>

            <section id="find-the-reason">
              <h2 style={h2Style}>How do I find out the actual reason my account was suspended?</h2>
              <p style={paragraphStyle}>
                Google&apos;s notification arrives in two places: a red suspension banner inside your Google Ads account and an email to your registered address. Both cite the policy category. Neither tells you what specific ad, landing page, or action triggered it.
              </p>
              <p style={paragraphStyle}>
                That gap is the most common frustration in community threads, and it is genuinely maddening. As u/Stunning-Cat-5471 put it on <a href="https://www.reddit.com/r/PPC/comments/146kcrp/google_ads_account_suspended/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Reddit r/PPC</a>: &quot;Nobody is going to tell you what you did. You have to guess.&quot; John Horn, a PPC professional with 15+ years of experience, confirms the same pattern: &quot;Google rarely provides detailed explanations for account suspensions. If you get flagged for a certain policy, Google does not give more information than that&quot; (<a href="https://ppchero.com/how-to-navigate-your-google-ads-suspension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>PPC Hero, May 2024</a>).
              </p>
              <p style={paragraphStyle}>
                Run this diagnostic sequence before you do anything else.
              </p>

              {/* VISUAL 2: Mermaid flowchart TD, the diagnostic sequence */}
              <MermaidDiagram
                chart={`flowchart TD
  A[Suspension banner appears] --> B[Read the in-account banner: names the policy category]
  B --> C[Open the suspension email: click the policy link]
  C --> D{Which category?}
  D -->|Policy / content| E[Open Policy Manager: Tools &gt; Policy Manager]
  D -->|Payment / billing| F[Check Payment profile: Tools &gt; Billing]
  D -->|Terms &amp; Conditions| G[Check Merchant Center issues tab]
  E --> H[Now you know which bucket: appeal next]
  F --> H
  G --> H`}
                caption="The diagnostic sequence: identify your suspension bucket from the banner, email, Policy Manager, payment profile, and Merchant Center before you appeal."
              />

              <ol style={listStyle}>
                <li style={{ marginBottom: '12px' }}><strong>Check the suspension banner</strong> in your Google Ads account. It names the policy category and links to the appeal form.</li>
                <li style={{ marginBottom: '12px' }}><strong>Open the suspension email</strong> and click the specific policy link. This tells you which policy bucket you landed in.</li>
                <li style={{ marginBottom: '12px' }}><strong>Go to Policy Manager</strong> (Tools &gt; Policy Manager) for a list of all flagged content.</li>
                <li style={{ marginBottom: '12px' }}><strong>Check your Payment profile</strong> (Tools &gt; Billing &gt; Payment methods) for any failed payments, mismatched billing info, or unverified payment method.</li>
                <li style={{ marginBottom: 0 }}><strong>Check the Merchant Center issues tab</strong> if your Ads account is linked to a Google Merchant Center account.</li>
              </ol>

              {/* VISUAL 3: MascotQuote, Aegis compliance read */}
              <MascotQuote mascot="aegis">
                When I flag a compliance issue in a B6 account, I surface the exact policy category and the specific asset (ad, landing page, or billing field) that triggered it. That is the diagnostic step Google skips. Do this manually if you are outside B6: Policy Manager first, payment profile second, Merchant Center third. Do not appeal until you know which of the three it is.
              </MascotQuote>
            </section>

            <section id="policy-violations">
              <h2 style={h2Style}>Policy violations: what counts, and what &quot;egregious&quot; means</h2>
              <p style={paragraphStyle}>
                A policy violation is any ad, landing page, or account practice that breaks Google&apos;s <a href="https://support.google.com/adspolicy/answer/6008942" target="_blank" rel="noopener noreferrer" style={linkStyle}>advertising policies</a> (Google Ads Policy Center). Most violations are non-egregious. They go through a structured strike system before suspension.
              </p>

              {/* VISUAL 4: custom HTML horizontal stepper, the 4-strike escalation */}
              <div className="b6-strike-stepper">
                <div className="b6-strike-step">
                  <div className="b6-strike-badge" style={{ background: '#ecfdf5', color: '#10b981', borderColor: '#10b981' }}>1st</div>
                  <div className="b6-strike-name">No strike</div>
                  <div className="b6-strike-detail">Warning only</div>
                </div>
                <div className="b6-strike-arrow">→</div>
                <div className="b6-strike-step">
                  <div className="b6-strike-badge" style={{ background: '#fffbeb', color: '#f59e0b', borderColor: '#f59e0b' }}>2nd</div>
                  <div className="b6-strike-name">3-day hold</div>
                  <div className="b6-strike-detail">Account paused</div>
                </div>
                <div className="b6-strike-arrow">→</div>
                <div className="b6-strike-step">
                  <div className="b6-strike-badge" style={{ background: '#fff7ed', color: '#f97316', borderColor: '#f97316' }}>3rd</div>
                  <div className="b6-strike-name">7-day hold</div>
                  <div className="b6-strike-detail">Account paused</div>
                </div>
                <div className="b6-strike-arrow">→</div>
                <div className="b6-strike-step">
                  <div className="b6-strike-badge" style={{ background: '#fef2f2', color: '#ef4444', borderColor: '#ef4444' }}>4th</div>
                  <div className="b6-strike-name">Suspension</div>
                  <div className="b6-strike-detail">Account suspended</div>
                </div>
              </div>
              <p style={{ ...paragraphStyle, fontSize: '15px', color: '#64748b', marginTop: '-8px' }}>
                The strike system for non-egregious violations. Each policy has a maximum of 3 strikes. Fix the violation during any hold period and it does not escalate.
              </p>

              <p style={paragraphStyle}>
                Egregious violations are a different category entirely. Google defines them as &quot;a violation so serious that it is unlawful or poses significant harm to our users or our digital advertising ecosystem&quot; (Google Ads Help, 2024). When Google detects an egregious violation, the consequence is: &quot;We will suspend your Google Ads accounts immediately without prior warning. You will not be allowed to advertise with us again.&quot;
              </p>
              <p style={paragraphStyle}>The full egregious policy list:</p>
              <ul style={listStyle}>
                <li>Circumventing systems</li>
                <li>Coordinated deceptive practices</li>
                <li>Counterfeit goods</li>
                <li>Malicious or unwanted software</li>
                <li>Prescription opioid painkillers</li>
                <li>Promotion of unauthorized pharmacies</li>
                <li>Unacceptable business practices</li>
                <li>Trade sanctions violations</li>
                <li>Sexually explicit content</li>
                <li>Child sexual abuse and exploitation</li>
              </ul>
              <p style={paragraphStyle}>
                Legitimate businesses land on this list more often than you&apos;d expect. A supplement brand, for example, can fall under &quot;unacceptable business practices&quot; without selling anything illegal. As <a href="https://x.com/Robin_ecomm/status/2068229109801508924" target="_blank" rel="noopener noreferrer" style={linkStyle}>@Robin_ecomm noted on X</a> in June 2026: &quot;a supplement brand came to us after their account got suspended&quot;, a pattern consistent with health and wellness verticals that face stricter claim standards. A legitimate e-commerce store can also get flagged for counterfeit goods if product descriptions use language Google&apos;s AI reads as misleading, even when the products are authentic, according to PPC Hero&apos;s reporting.
              </p>
              <p style={paragraphStyle}>
                Circumventing systems is the category SMBs hit hardest and understand least. It includes any attempt to work around Google&apos;s enforcement, including opening a new Ads account while one is suspended. That detail matters for the next sections.
              </p>
            </section>

            <section id="billing-payment">
              <h2 style={h2Style}>Billing, payment, and &quot;suspicious payment activity&quot; suspensions</h2>
              <p style={paragraphStyle}>
                Payment-related suspensions are separate from policy violations and are often faster to resolve. Google identifies four billing suspension triggers (Google Ads Help, 2024):
              </p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '10px' }}><strong>Promo code abuse:</strong> misusing promotional credits.</li>
                <li style={{ marginBottom: '10px' }}><strong>Chargeback requests:</strong> disputing a Google Ads charge with your bank or card issuer.</li>
                <li style={{ marginBottom: '10px' }}><strong>Suspicious payment activity:</strong> payment methods or patterns that trigger Google&apos;s fraud detection.</li>
                <li style={{ marginBottom: 0 }}><strong>Unpaid balance:</strong> an outstanding invoice that was not cleared.</li>
              </ul>
              <p style={paragraphStyle}>
                Suspicious payment activity is the most opaque of the four. Virtual cards and prepaid cards are common flags. Multiple ad accounts linked to the same payment method that has a suspension history is another. A billing name or address that does not match the website&apos;s legal details or WHOIS registration will trigger it too. This overlaps with <a href="/blog/google-ads-invalid-traffic-click-fraud" style={linkStyle}>invalid traffic and click fraud patterns</a>: both create account-level anomaly signals that Google&apos;s systems treat as risk.
              </p>
              <p style={paragraphStyle}>Before appealing a billing suspension, verify each of these:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '10px' }}>Payment method is a standard credit or debit card (not virtual or prepaid)</li>
                <li style={{ marginBottom: '10px' }}>Billing address matches the address on your business registration and website footer</li>
                <li style={{ marginBottom: '10px' }}>No open chargebacks or disputes on the account</li>
                <li style={{ marginBottom: '10px' }}>Account name matches your company&apos;s legal name exactly, character-for-character</li>
                <li style={{ marginBottom: 0 }}>Two-step verification is active on the Google account</li>
              </ul>
              <p style={paragraphStyle}>
                That last point is easy to overlook. One Reddit r/PPC user reinstated their own account, without submitting a new appeal, by matching the company name exactly across their website, WHOIS record, and Google Ads billing profile, then enabling two-step verification. The account had been suspended and reinstated the same day once 2-step was active. Small thing, meaningful outcome.
              </p>
            </section>

            <section id="merchant-center">
              <h2 style={h2Style}>The Merchant Center connection (why Shopping advertisers get hit)</h2>
              <p style={paragraphStyle}>
                A Merchant Center suspension can extend into your Google Ads account even when your Ads account has no independent policy violation. This catches e-commerce owners off guard, because Google&apos;s official documentation only implies it via the &quot;related accounts&quot; clause. The cascade mechanism is not spelled out explicitly.
              </p>
              <p style={paragraphStyle}>
                Here is what happens: when Google suspends your Merchant Center account, it can extend that suspension to all linked Google Ads accounts. The Ads account receives a generic &quot;Terms &amp; Conditions&quot; notice that gives no indication the actual problem is in Merchant Center.
              </p>

              {/* VISUAL 5: Mermaid sequenceDiagram, the MC cascade (2 actors) */}
              <MermaidDiagram
                chart={`sequenceDiagram
  participant MC as Merchant Center
  participant GA as Google Ads account
  participant You as You (advertiser)
  MC->>MC: Product disapproval or policy flag
  MC->>MC: Account-level suspension
  MC->>GA: Cascade to all linked Ads accounts
  GA->>You: Generic "Terms & Conditions" notice
  Note over You,GA: The notice points at Ads, but the real fix is in Merchant Center
  You->>MC: Resolve MC issue, then appeal MC first`}
                caption="The Merchant Center cascade: the suspension originates in MC but surfaces in Ads as a generic Terms and Conditions notice. Fix MC first."
              />

              <p style={paragraphStyle}>
                The community data confirms how disorienting this is. From our own-data block, 19% of the 104 discussions mention &quot;merchant center&quot; or &quot;google merchant&quot; as a theme. One <a href="https://www.reddit.com/r/PPC/comments/196rpha/gmc_hacked_google_ads_suspended_as_a_result_for/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Reddit r/PPC thread from January 2024</a> documents exactly this scenario, &quot;GMC Hacked, Google Ads suspended as a result for &apos;Terms &amp; Conditions&apos;. Months of going...&quot;, with the advertiser spending months addressing the wrong account.
              </p>
              <p style={paragraphStyle}>
                A Merchant Center cascade also breaks Shopping campaign attribution in ways that look like <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking failures</a>. If your Shopping data vanishes overnight, check the MC issues tab before assuming a tag broke.
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 600 }}>How to check and decouple:</p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '10px' }}>Go to your Merchant Center account. Check the Diagnostics tab and the Issues tab.</li>
                <li style={{ marginBottom: '10px' }}>Look for any active suspension notices or product disapprovals that triggered an account-level flag.</li>
                <li style={{ marginBottom: '10px' }}>Resolve the MC issue first. Then appeal the MC suspension through Merchant Center.</li>
                <li style={{ marginBottom: 0 }}>Once MC is reinstated, the Google Ads suspension may lift automatically. If it does not, submit a separate Ads appeal citing the resolved MC issue.</li>
              </ol>
            </section>

            <section id="appeal">
              <h2 style={h2Style}>How to appeal and reinstate your suspended account (step by step)</h2>
              <p style={paragraphStyle}>
                Reinstatement requires fixing the root cause first. Filing an appeal before fixing the issue almost always fails, and it uses up one of your appeal attempts.
              </p>
              <p style={paragraphStyle}>
                Google&apos;s stated standard: &quot;We only reinstate accounts in compelling circumstances, such as in the case of a mistake, so it&apos;s important that you take the time to be thorough, accurate, and honest&quot; (Google Ads Help, 2024).
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 600 }}>The appeal process, step by step:</p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '16px' }}><strong>Diagnose the exact cause</strong> using the diagnostic sequence above. Do not proceed until you know which bucket your suspension falls in. Non-egregious policy violations, billing issues, and MC cascades each have different fix steps.</li>
                <li style={{ marginBottom: '16px' }}><strong>Fix the underlying issue completely</strong> before touching the appeal form. Update landing pages if the issue is misleading content. Resolve billing discrepancies if the issue is payment. Fix and appeal Merchant Center if the cascade is the cause. Document every change with screenshots.</li>
                <li style={{ marginBottom: '16px' }}><strong>Submit one clear, specific appeal.</strong> Click Contact Us in the suspension banner. Describe: what the violation was, exactly what you fixed, and what evidence you have. Attach screenshots. Keep the tone factual and calm. John Horn is direct on this: &quot;Google does not respond well to complaints against them or angry appeals. The best road to action is a calm, comprehensive appeal, outlining the resolved issues&quot; (<a href="https://ppchero.com/how-to-navigate-your-google-ads-suspension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>PPC Hero, May 2024</a>).</li>
                <li style={{ marginBottom: 0 }}><strong>Wait for a response before re-appealing.</strong> Standard timelines run from a few days to a few weeks. File too many appeals and Google may suspend appeal processing for 7 days (Google Ads Help, 2024). One thorough submission is worth more than three follow-up submissions.</li>
              </ol>
              <p style={paragraphStyle}>
                <strong>If standard appeals stall:</strong> the community escalation path documented by u/Omblae on Reddit r/PPC runs: support team, then request a manager, then request a senior call center worker, then request a policy team specialist, then obtain a case ID. &quot;Someone will reach out in a few working days. Normally that person is US or Ireland based.&quot; This path takes longer but reaches a human reviewer with actual policy authority.
              </p>
              <p style={paragraphStyle}>
                You have at least 6 months from the suspension date to submit an appeal (Google Ads Help, 2024). A well-prepared appeal in week three beats a rushed one in hour one.
              </p>
              <p style={paragraphStyle}>
                For egregious violations: the realistic outcome is no reinstatement. Google&apos;s language is explicit. If your business was genuinely misclassified, work with a PPC attorney or certified Google partner before appealing.
              </p>
            </section>

            <section id="mistakes">
              <h2 style={h2Style}>Mistakes that make a suspension worse</h2>
              <p style={paragraphStyle}>
                Three actions reliably turn a fixable suspension into a permanent one.
              </p>

              {/* VISUAL 6: ComparisonTable, mistake to consequence */}
              <ComparisonTable
                headers={['Mistake', 'Why people do it', 'Consequence']}
                rows={[
                  { cells: ['Opening a new Google Ads account', 'Panic, wanting to keep ads running', 'Classified as circumventing systems (egregious). New account suspended, original harder to appeal.'], highlight: true },
                  { cells: ['Filing multiple appeals before review', 'Impatience, no response yet', 'Appeal processing paused for 7 days. Each retry should follow a genuine fix, not reworded text.'] },
                  { cells: ['Appealing before fixing root cause', 'Wanting a fast reinstatement', 'No compelling circumstance, no evidence of a fix. Denial.'] },
                  { cells: ['Repeatedly contacting general support', 'Trying to speed up the queue', 'Does not accelerate it. Creates a record of agitation that can frame the case negatively.'] },
                ]}
                caption="The four actions that turn a fixable suspension into a permanent one, and why advertisers reach for them under pressure."
              />

              <p style={paragraphStyle}>
                <strong>Opening a new Google Ads account</strong> is the most damaging mistake, and it is the one people make most often in a panic. Google classifies it as circumventing systems, the same egregious policy category that caused many suspensions in the first place. The new account will be suspended. The original suspension becomes harder to appeal. Both John Horn and Google&apos;s official policy confirm this is a fast path to a permanent ban.
              </p>
              <p style={paragraphStyle}>
                If a suspended account is being handled by an agency and communication has broken down, see <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>the signs you need to fire your PPC agency</a>. Account access issues at suspension time are one of the cleaner signals.
              </p>
            </section>

            <section id="prevent">
              <h2 style={h2Style}>How to prevent the next suspension (and catch risk early)</h2>
              <p style={paragraphStyle}>
                Most suspensions have a signal that appeared days or weeks before Google acted. Prevention is about catching those signals before they become strikes.
              </p>
              <p style={{ ...paragraphStyle, fontWeight: 600 }}>Practical prevention checklist:</p>
              <ul style={listStyle}>
                <li style={{ marginBottom: '10px' }}>Keep payment methods current with a standard credit card. Remove any prepaid or virtual cards.</li>
                <li style={{ marginBottom: '10px' }}>Audit landing pages monthly against Google&apos;s advertising policies. Pay particular attention to health, finance, and claims-heavy verticals.</li>
                <li style={{ marginBottom: '10px' }}>Match your business name exactly across your website, WHOIS registration, and Google Ads billing profile.</li>
                <li style={{ marginBottom: '10px' }}>Keep a visible privacy policy and cookie notice on every landing page.</li>
                <li style={{ marginBottom: '10px' }}>Complete advertiser verification when Google prompts it. Delays increase risk.</li>
                <li style={{ marginBottom: '10px' }}>Monitor Merchant Center health weekly if you run Shopping campaigns. An MC issue is easier to fix before it cascades to Ads.</li>
                <li style={{ marginBottom: 0 }}>Enable two-step verification on every Google account linked to your Ads account.</li>
              </ul>
              <p style={paragraphStyle}>
                Running a <a href="/blog/ppc-audit-checklist" style={linkStyle}>PPC audit</a> quarterly catches most of these drift points before they escalate: billing mismatches, policy-sensitive landing page changes, and MC health gaps all surface in a structured account review.
              </p>
              <p style={paragraphStyle}>
                The difficulty with prevention is that most issues only surface after Google has already started enforcement. By the time the banner appears, the strike count may already be at two or three.
              </p>
              <p style={paragraphStyle}>
                This is where continuous monitoring changes the math. B6&apos;s Aegis agent watches billing health, policy compliance signals, and account anomalies daily. It works similarly to <a href="/blog/google-ads-anomaly-detection" style={linkStyle}>Google Ads anomaly detection</a> for spend spikes and conversion drops, but applied specifically to compliance and billing risk. When a payment method approaches expiry or a landing page change introduces a flagged claim, Aegis surfaces the flag before the strike system starts, not after the suspension banner appears. <a href="/b6#aegis" style={linkStyle}>See how Aegis works in B6</a> and <a href="/b6" style={linkStyle}>how B6 monitors accounts live</a>.
              </p>
            </section>

            <section id="faq">
              <h2 style={h2Style}>Frequently asked questions</h2>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How does Google detect policy violations?</strong></p>
                <p style={paragraphStyle}>Google uses a combination of AI and human evaluation. Machine learning models trained on human reviewer decisions flag the majority of violations. Complex or high-stakes cases are reviewed by trained operators and analysts (Google Ads Help, 2024).</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How will I be notified of a suspension?</strong></p>
                <p style={paragraphStyle}>Google sends an in-account suspension banner (visible when you log in) and an email to the registered address. Both include the policy category. The specific triggering asset is rarely named.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Do account suspensions apply globally?</strong></p>
                <p style={paragraphStyle}>Yes. A Google Ads account suspension applies to all campaigns and all countries in that account. You cannot run ads in one market while suspended in another.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How long is a Google Ads account suspended for?</strong></p>
                <p style={paragraphStyle}>Suspensions are permanent unless you successfully appeal. You have at least 6 months from the suspension date to submit an appeal. Egregious violations are generally not reversed.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Can an account suspension be appealed?</strong></p>
                <p style={paragraphStyle}>Yes, for non-egregious violations. Click Contact Us in the suspension banner to access the appeal form. Identity verification is required and limited to 3 attempts, after which the appeal right is lost (Google Ads Help, 2024).</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Can I set up another account while suspended?</strong></p>
                <p style={paragraphStyle}>No. Opening a new account while suspended is classified as circumventing systems, an egregious policy violation. The new account will also be suspended.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Can I still access my suspended account?</strong></p>
                <p style={paragraphStyle}>Yes, in read-only mode. You can view campaign data, download reports, and access the appeal form. You cannot run or edit ads.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>How do I request a refund after suspension?</strong></p>
                <p style={paragraphStyle}>Cancel the account first. Then submit a refund request through Google Ads billing support. Refunds are not automatic on suspension, you must request them separately.</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ ...paragraphStyle, marginBottom: '12px' }}><strong>Why doesn&apos;t Google tell me the specific reason?</strong></p>
                <p style={paragraphStyle}>Google&apos;s enforcement system flags policy categories, not individual assets. The combination of scale (12.7 million accounts suspended annually) and automated enforcement means Google does not produce per-asset explanations. John Horn describes this plainly: &quot;Google rarely provides detailed explanations for account suspensions. If you get flagged for a certain policy, Google does not give more information than that&quot; (<a href="https://ppchero.com/how-to-navigate-your-google-ads-suspension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>PPC Hero, May 2024</a>). For more on managing accounts without constant agency involvement, see <a href="/blog/google-ads-without-agency" style={linkStyle}>Google Ads without an agency</a>. The compliance and billing hygiene sections apply directly to suspension prevention.</p>
              </div>
            </section>

            <section id="cta">
              <h2 style={h2Style}>Get ahead of suspensions with B6</h2>
              <p style={paragraphStyle}>
                A suspension hits hardest when there is no early warning. The billing flag that triggers suspicious payment activity, the landing page claim that crosses a policy line, the Merchant Center issue that cascades overnight, these are all detectable before Google acts.
              </p>
              <p style={paragraphStyle}>
                B6 is an autonomous PPC cabinet. Aegis, B6&apos;s compliance and protection agent, monitors billing health, policy signals, and account anomalies every day. When something drifts toward risk, Aegis flags it in the dashboard before the strike system starts. Not a monthly audit. Not a weekly report. Daily, automated, and specific.
              </p>
              <p style={paragraphStyle}>
                B6 plans start at $99/month, versus competitors from $499+. That difference buys you the monitoring layer that catches suspension risk before it costs you revenue.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', padding: '32px', color: 'white', textAlign: 'center', marginTop: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Catch suspension risk before the banner appears</h3>
                <p style={{ fontSize: '16px', opacity: 0.95, marginBottom: '24px', lineHeight: 1.6 }}>
                  Aegis monitors billing health, policy signals, and account anomalies daily, flagging risk before the strike system starts. From $99/mo.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/pricing" style={{ display: 'inline-block', background: 'white', color: '#764ba2', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px' }}>
                    See B6 pricing
                  </a>
                  <a href="/b6#aegis" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
                    See how Aegis monitors your account
                  </a>
                </div>
              </div>
            </section>

            {/* YMYL disclaimer + author bio */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#64748b', marginBottom: '12px', fontStyle: 'italic' }}>
                Results may vary. This article is for informational purposes and does not constitute professional legal or advertising policy advice. Consult a certified Google Ads professional or legal counsel for account-specific situations.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#64748b', marginBottom: 0 }}>
                <strong>Author: Marcus, B6 PPC Analyst.</strong> Specializes in Google Ads account management, Smart Bidding strategy, and policy compliance for SMB e-commerce advertisers.
              </p>
            </div>

            {/* Sources */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Sources</h2>
              <ul style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, paddingLeft: '20px', marginBottom: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="https://support.google.com/google-ads/answer/9841640?hl=en" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads account suspensions overview</a>. Google Ads Help, 2024</li>
                <li style={{ marginBottom: '8px' }}><a href="https://support.google.com/adspolicy/answer/6008942" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads advertising policies overview</a>. Google Ads Policy Center</li>
                <li style={{ marginBottom: '8px' }}><a href="https://ppchero.com/how-to-navigate-your-google-ads-suspension/" target="_blank" rel="noopener noreferrer" style={linkStyle}>How to Navigate Your Google Ads Suspension</a>. John Horn (StubGroup CEO), PPC Hero, May 2024</li>
                <li style={{ marginBottom: '8px' }}><a href="https://www.reddit.com/r/PPC/comments/146kcrp/google_ads_account_suspended/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Google Ads account Suspended</a>. u/Stunning-Cat-5471, u/Omblae, Reddit r/PPC, June 2023</li>
                <li style={{ marginBottom: '8px' }}><a href="https://www.reddit.com/r/PPC/comments/196rpha/gmc_hacked_google_ads_suspended_as_a_result_for/" target="_blank" rel="noopener noreferrer" style={linkStyle}>GMC Hacked, Google Ads suspended</a>. Reddit r/PPC, January 2024</li>
                <li style={{ marginBottom: '8px' }}><a href="https://x.com/Robin_ecomm/status/2068229109801508924" target="_blank" rel="noopener noreferrer" style={linkStyle}>@Robin_ecomm on X</a>. June 2026 (B6 own-data corpus)</li>
                <li style={{ marginBottom: 0 }}>B6 own-data block: analysis of 104 public discussions for &quot;why is my google ads account suspended&quot; (Reddit 71, Hacker News 25, Stack Exchange 4, X live 4). June 22, 2026</li>
              </ul>
            </div>

            <style jsx>{`
              .b6-tldr {
                background: #f5f3ff;
                border: 1px solid #ddd6fe;
                border-radius: 12px;
                padding: 24px 28px;
                margin: 32px 0;
              }
              .b6-tldr-label {
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-weight: 700;
                font-size: 13px;
                letter-spacing: 0.08em;
                padding: 4px 12px;
                border-radius: 12px;
                margin-bottom: 14px;
              }
              .b6-bucket-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
                margin: 32px 0;
              }
              @media (max-width: 900px) {
                .b6-bucket-grid { grid-template-columns: repeat(2, 1fr); }
              }
              @media (max-width: 560px) {
                .b6-bucket-grid { grid-template-columns: 1fr; }
              }
              .b6-bucket {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-top: 4px solid #764ba2;
                border-radius: 12px;
                padding: 18px;
                display: flex;
                flex-direction: column;
                gap: 8px;
              }
              .b6-bucket-sev {
                font-size: 12px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
              }
              .b6-bucket-title {
                font-size: 16px;
                font-weight: 700;
                color: #1e293b;
              }
              .b6-bucket-body {
                font-size: 14px;
                line-height: 1.55;
                color: #475569;
              }
              .b6-strike-stepper {
                display: grid;
                grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
                align-items: center;
                gap: 8px;
                margin: 32px 0 16px;
              }
              @media (max-width: 720px) {
                .b6-strike-stepper {
                  grid-template-columns: 1fr;
                  gap: 12px;
                }
                .b6-strike-arrow { display: none; }
              }
              .b6-strike-step {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                padding: 16px 12px;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
              }
              .b6-strike-badge {
                font-size: 16px;
                font-weight: 800;
                border: 2px solid;
                border-radius: 999px;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .b6-strike-name {
                font-size: 15px;
                font-weight: 700;
                color: #1e293b;
              }
              .b6-strike-detail {
                font-size: 13px;
                color: #64748b;
              }
              .b6-strike-arrow {
                font-size: 22px;
                color: #cbd5e1;
                font-weight: 700;
                text-align: center;
              }
            `}</style>
          </div>
        </div>
        <KeepReading slug="why-is-my-google-ads-account-suspended" category="google-ads" />
      <Footer />
      </div>
    </>
  );
}
