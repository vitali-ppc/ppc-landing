'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { BigStat, Callout, HubSpokes, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-agency-account-ownership#article',
    headline: 'Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You',
    description:
      'Who owns your Google Ads account when an agency runs it, what each access level costs you at exit, the six Google assets an agency can hold, and what to negotiate before you sign. Verified against Google Ads Help, July 2026.',
    image: 'https://www.kampaio.com/og/google-ads-agency-account-ownership.png',
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
    datePublished: '2026-07-27T00:00:00.000Z',
    dateModified: '2026-07-27T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-agency-account-ownership',
    },
    keywords:
      'google ads agency account ownership, who owns google ads account, google ads manager account, mcc account, google ads access levels, admin access google ads, agency account access, google ads account ownership transfer',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can an agency legally keep my Google Ads account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No Google policy lets an agency keep an account against the owner's wishes. Disputes usually stem from setup, not a right the agency holds. Google Ads support helps with access but does not arbitrate the underlying contract.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between manager access and account ownership?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Manager access lets an agency manage campaigns, billing, and reporting inside your account. Ownership is separate; it determines who can grant, change, or remove that access. An agency can have full manager access without ever holding ownership.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can two agencies have access to my Google Ads account at the same time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, access is granted per user. However, an account can only have one direct manager account linked at a time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does my conversion history transfer if I have to start a new account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Conversion history, Smart Bidding learning, and Quality Score signals stay inside the specific account. A cross-account conversion tag keeps recording pre-unlink clicks only for the typical 30-day window.',
        },
      },
      {
        '@type': 'Question',
        name: "Should the agency's billing sit on my account or theirs?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your own payments profile is cleaner. It keeps the primary contact, payment forms, and billing history under your control, and avoids the payments-profile issues in the exposure check above.',
        },
      },
      {
        '@type': 'Question',
        name: "Can I remove an agency's manager account myself?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only if you hold Admin on your own account. Users with ownership can always unlink a manager with ownership; anyone below Admin cannot.',
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
        name: 'Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You',
        item: 'https://www.kampaio.com/blog/google-ads-agency-account-ownership',
      },
    ],
  };

  const tableOfContents = [
    { id: 'short-answer', title: 'The Short Answer: You Own the Account, the Agency Gets Linked', level: 1 },
    { id: 'who-owns', title: 'Who Owns a Google Ads Account?', level: 1 },
    { id: 'what-is-a-google-agency-account', title: 'What Is a Google Agency Account?', level: 2 },
    { id: 'access-levels', title: 'The Five Access Levels and What Each One Costs You at Exit', level: 1 },
    { id: 'give-agency-access', title: 'How Do I Give an Agency Access to My Google Ads Account?', level: 2 },
    { id: 'exposure-check', title: 'The Ownership Exposure Check: Six Google Assets Your Agency Might Hold', level: 1 },
    { id: 'who-owns-a-google-account', title: 'Can You Find Out Who Owns a Google Account?', level: 2 },
    { id: 'disputes', title: 'What Ownership Disputes Actually Look Like', level: 1 },
    { id: 'negotiate', title: 'What to Negotiate Before You Sign', level: 1 },
    { id: 'already-exposed', title: 'Already Exposed? Three Moves That Actually Work', level: 1 },
    { id: 'where-kampaio-fits', title: 'Where Kampaio Fits', level: 1 },
    { id: 'faq', title: 'FAQ: Google Ads Agency Account Ownership', level: 1 },
    { id: 'check-your-access', title: 'Check Your Access Before You Need To', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
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
  const h3Style: React.CSSProperties = { fontSize: '23px', fontWeight: 700, color: '#1e293b', marginBottom: '20px', marginTop: '40px', scrollMarginTop: '24px' };
  const listStyle: React.CSSProperties = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };
  const extAttr = { target: '_blank', rel: 'noopener noreferrer' } as const;

  const faqItems = [
    {
      q: 'Can an agency legally keep my Google Ads account?',
      a: (
        <>
          No Google policy lets an agency keep an account against the owner&apos;s wishes. Disputes usually stem from setup, not a right the agency holds.
          Google Ads support helps with access but does not arbitrate the underlying contract (
          <a href="https://support.google.com/google-ads/answer/7456532" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>).
        </>
      ),
    },
    {
      q: 'What is the difference between manager access and account ownership?',
      a: (
        <>
          Manager access lets an agency manage campaigns, billing, and reporting inside your account. Ownership is separate; it determines who can grant,
          change, or remove that access. An agency can have full manager access without ever holding ownership.
        </>
      ),
    },
    {
      q: 'Can two agencies have access to my Google Ads account at the same time?',
      a: (
        <>
          Yes, access is granted per user. However, an account can only have one direct manager account linked at a time (
          <a href="https://support.google.com/google-ads/answer/7456531" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>).
        </>
      ),
    },
    {
      q: 'Does my conversion history transfer if I have to start a new account?',
      a: (
        <>
          No. Conversion history, Smart Bidding learning, and Quality Score signals stay inside the specific account. A cross-account conversion tag keeps
          recording pre-unlink clicks only for the typical 30-day window (
          <a href="https://support.google.com/google-ads/answer/7458428" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>).
        </>
      ),
    },
    {
      q: "Should the agency's billing sit on my account or theirs?",
      a: (
        <>
          Your own payments profile is cleaner. It keeps the primary contact, payment forms, and billing history under your control, and avoids the
          payments-profile issues in the exposure check above.
        </>
      ),
    },
    {
      q: "Can I remove an agency's manager account myself?",
      a: (
        <>
          Only if you hold Admin on your own account. Users with ownership can always unlink a manager with ownership; anyone below Admin cannot (
          <a href="https://support.google.com/google-ads/answer/7456532" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>).
        </>
      ),
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
          <ArticleHero slug="google-ads-agency-account-ownership" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              Strategy &middot; Google Ads Agencies
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Google Ads agency account ownership hinges on one setting: who holds owner status, not who built your campaigns. If your agency created your
              account inside its own manager account, the agency is the owner and you are exposed. If you created the account and only linked the
              agency&apos;s manager account, you are in control. Check which one you are today.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 27, 2026 &middot; 11 min read</span>
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

            {/* Short answer */}
            <section id="short-answer">
              <h2 style={h2Style}>The Short Answer: You Own the Account, the Agency Gets Linked</h2>
              <p style={paragraphStyle}>
                Access levels and ownership rules below are verified against Google Ads Help on 27 July 2026.
              </p>
              <p style={paragraphStyle}>
                Most owners find out which side of that line they are on during the week they try to leave, the worst possible week to learn it.
              </p>

              <Callout variant="warning" title="Run this check now">
                Open Tools &gt; Setup &gt; Account access and security and look for Admin next to your own name. If it does not say Admin, you do not control
                this account today.
              </Callout>

              <p style={paragraphStyle}>
                This page covers which of five access levels you hold, which of six Google assets your agency might hold independently of the account, and
                what to put in a contract before you sign. It does not cover the leaving process itself, that lives in a separate guide, linked further down.
              </p>
            </section>

            {/* Who owns */}
            <section id="who-owns">
              <h2 style={h2Style}>Who Owns a Google Ads Account?</h2>
              <p style={paragraphStyle}>
                A Google Ads account has exactly one owner. Google Ads Help states plainly that &quot;a client account can only have one owner&quot; (
                <a href="https://support.google.com/google-ads/answer/7456532" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>), either the Google
                account that created it or a manager account made owner afterward. Data ownership and administrative ownership are separate.
              </p>
              <p style={paragraphStyle}>
                Three terms get blurred, and that is where owners lose track of their exposure. <strong>Owner manager</strong>: a manager account holding
                owner status; &quot;if a manager creates a new account, the manager will automatically become the owner of that account.&quot;{' '}
                <strong>Linked manager</strong>: access but no ownership by default. <strong>Data owner</strong>: the client account, which never changes
                hands; owners get full administrative access but &quot;do not take data ownership or administrative rights away from client accounts.&quot;
              </p>
              <p style={paragraphStyle}>
                Ownership is also transitive. If your agency&apos;s manager account owns yours, every manager above it in the hierarchy has ownership too,
                which means the chain runs longer than the one agency you actually talk to, especially if it is a white-label reseller.
              </p>
              <p style={paragraphStyle}>
                Owner status decides who can remove whom, which is why it matters more than whose name is on the invoice. Whether to work with an agency at
                all is a separate question; <a href="/blog/google-ads-agency-guide" style={linkStyle}>our Google Ads agency guide</a> covers that decision.
              </p>

              <h3 id="what-is-a-google-agency-account" style={h3Style}>What Is a Google Agency Account?</h3>
              <p style={paragraphStyle}>
                There is no Google product called a &quot;Google agency account.&quot; People mean a Google Ads manager account, also called an MCC (My Client
                Center), a container that lets one login manage many advertiser accounts, the only practical way to run dozens of clients.
              </p>
              <p style={paragraphStyle}>
                A manager account is not where your money or data lives; campaigns, conversion history, and billing sit in your own account, and the manager
                account is only an access layer on top.
              </p>
              <p style={paragraphStyle}>
                Using an MCC is normal, correct, and expected. The problem is never the MCC, only whether your account was created inside the agency&apos;s
                manager account, making it owner, or linked to it, which does not. The MCC question settles who is attached to your account. The access-level
                question, next, settles what you can still do about it.
              </p>
            </section>

            {/* Access levels */}
            <section id="access-levels">
              <h2 style={h2Style}>The Five Access Levels and What Each One Costs You at Exit</h2>
              <p style={paragraphStyle}>
                Google Ads has five access levels: Email-only, Billing, Read-only, Standard, and Admin. Only Admin lets you remove an agency&apos;s manager
                account. Everything else can look like control while leaving the relationship itself in someone else&apos;s hands (
                <a href="https://support.google.com/google-ads/answer/9978556" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>):
              </p>

              <ResponsiveTable
                headers={['Access level', 'What you can do', 'Enough for you as the advertiser', 'What happens if the relationship ends today']}
                rows={[
                  [
                    'Email-only',
                    'Notification emails and reports only.',
                    'No, the weakest level, for stakeholders who just need to be informed.',
                    'You cannot see or control anything.',
                  ],
                  [
                    'Billing',
                    'Edit billing, payment forms, and payments profile details.',
                    'No, more money control than most expect, but no campaign view.',
                    'You can pay the bill but not remove the agency.',
                  ],
                  [
                    'Read-only',
                    'View campaigns, reports, users, managers. Cannot edit.',
                    'No, despite feeling like real access.',
                    'You can document, but not unlink.',
                  ],
                  [
                    'Standard',
                    'Edit campaigns and billing. Cannot touch access or manager links.',
                    'The trap level: most owners who "have access" hold this and are not in control.',
                    'You can pause campaigns, not unlink the agency.',
                  ],
                  [
                    'Admin',
                    'Everything Standard does, plus grant or change access, accept or reject manager links, unlink managers.',
                    <span key="admin-verdict" style={{ color: '#10b981', fontWeight: 600 }}>Yes, the only level that controls the relationship.</span>,
                    'You can unlink the agency yourself, immediately.',
                  ],
                ]}
              />

              <p style={paragraphStyle}>
                Only Admin can grant access, change access levels, accept or reject manager link requests, and unlink managers. If you are Standard, you can
                edit every campaign and still not remove the agency.
              </p>

              <h3 id="give-agency-access" style={h3Style}>How Do I Give an Agency Access to My Google Ads Account?</h3>
              <p style={paragraphStyle}>
                Create the account yourself, then link the agency&apos;s manager account to it, rather than letting the agency create it for you. Ask for the
                agency&apos;s manager account ID, send or accept the link, and confirm your own access still shows Admin once the link completes.
              </p>
              <ol style={listStyle}>
                <li style={{ marginBottom: '12px' }}>Create the account under an email on your own company domain.</li>
                <li style={{ marginBottom: '12px' }}>Get the agency&apos;s manager account ID.</li>
                <li style={{ marginBottom: '12px' }}>In Account access and security &gt; Managers, send or accept the link request.</li>
                <li style={{ marginBottom: '12px' }}>Confirm your access level still shows Admin after linking.</li>
              </ol>
              <p style={paragraphStyle}>
                Link a manager, do not transfer ownership. Transfer (
                <a href="https://support.google.com/google-ads/answer/44500" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>) is for a genuine change
                of custodian, not routine management. Some agencies genuinely need owner status, usually for invoicing or a credit line; negotiate it
                explicitly and time-box it. One community contributor put the default plainly: &quot;Always create the account yourself, then permit the
                agency to access it via their MCC... so you can revoke their access, not the other way round&quot; (
                <a href="https://support.google.com/google-ads/thread/94073094" style={linkStyle} {...extAttr}>Jason King, Google Ads Community, 2021</a>).
                Getting the manager link right handles just one part of the picture. The other five pieces are just as easy to lose track of, and that is the
                actual exposure check below.
              </p>
            </section>

            {/* Exposure check */}
            <section id="exposure-check">
              <h2 style={h2Style}>The Ownership Exposure Check: Six Google Assets Your Agency Might Hold</h2>
              <p style={paragraphStyle}>
                Your Google Ads account is one of six separate objects an agency can hold, and they strand independently. Losing the ads account is the
                obvious risk. Losing the payments profile, the conversion tags, the GA4 link, the remarketing audiences, or Merchant Center is the one that
                actually stops you rebuilding.
              </p>

              <HubSpokes
                hub="Six objects an agency can hold"
                spokes={[
                  'Google Ads account (owner status)',
                  'Your own access level',
                  'Payments profile',
                  'Conversion tags and GTM container',
                  'GA4 property and its Ads link',
                  'Remarketing audiences and Merchant Center',
                ]}
                caption="Each one strands independently of the others"
              />

              <ResponsiveTable
                headers={['Asset', 'Who typically holds it', 'How to check', 'What you lose if the relationship ends today']}
                rows={[
                  [
                    'Google Ads account (owner status)',
                    'Whichever manager account is Owner, automatic if it created the account. Ownership is transitive up the chain.',
                    'Account access and security > Managers tab, check the Owner column.',
                    'If no one on your side holds Admin, you cannot unlink anyone.',
                  ],
                  [
                    'Your own access level',
                    'Assigned per user by whoever holds Admin.',
                    'Same screen, Access level column next to your name.',
                    'Everything above your level in Table 1. Only Admin unlinks a manager.',
                  ],
                  [
                    'Payments profile',
                    "A separate object, often the agency's contact if it set up billing.",
                    "The profile's own user list, or ask who the primary contact is.",
                    <span key="payments-loss">
                      Users &quot;can&apos;t directly add or remove users from the payments profile or change existing user permissions&quot; (
                      <a href="https://support.google.com/google-ads/answer/9978556" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>); fixing this
                      needs the primary contact, or someone on your domain, contacting support with the Payments Profile ID. An invite lapses after two weeks (
                      <a href="https://support.google.com/paymentscenter/answer/7162853" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>).
                    </span>,
                  ],
                  [
                    'Conversion tags and GTM container',
                    "Whoever set up the container, often the agency's own GTM account.",
                    "Google Ads' automatic Tag Diagnostics notice; the GTM container's own ownership.",
                    <span key="tags-loss">
                      &quot;If your account has only one administrator, you may lose access to your tags if that user becomes unavailable&quot; (
                      <a href="https://support.google.com/google-ads/answer/9978556" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>). Fix: add a
                      second admin.
                    </span>,
                  ],
                  [
                    'GA4 property and its Ads link',
                    'Whoever created the GA4 property; only an Admin can link it.',
                    'GA4 Property Access Management; Ads Account access and security.',
                    'Conversions stop feeding Smart Bidding without an Admin on your side. Agency-owned GA4 means losing the historical view too.',
                  ],
                  [
                    'Remarketing audiences and Merchant Center',
                    "Lists tied to whichever manager's shared tag; Merchant Center is a separate account system.",
                    "Audience Manager for list source; Merchant Center's own settings.",
                    <span key="audiences-loss">
                      Lists stop populating on unlink (
                      <a href="https://support.google.com/google-ads/answer/7458428" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>). Merchant Center
                      access does not transfer; one email creates only one account (
                      <a href="https://support.google.com/merchants/answer/188924" style={linkStyle} {...extAttr}>Google Ads Help, 2026</a>).
                    </span>,
                  ],
                ]}
              />

              <BigStat
                value="30 days"
                label="typical conversion window"
                claim="Cross-account conversion tracking on an unlinked account keeps recording pre-unlink clicks only for the conversion window, typically 30 days. After that, the history is gone."
                source="Source: Google Ads Help, what happens when you unlink an account, 2026"
              />

              <p style={paragraphStyle}>
                Run this as a ten-minute checklist, not a source of alarm.
              </p>

              <MascotQuote mascot="echo">
                Open Account access and security and check two things: your own access level, and whether Tag Diagnostics is warning you about a single admin.
                Five access levels exist and only Admin can unlink a manager. An unaccepted payments profile invite lapses in two weeks. None of this needs a
                phone call. Just look.
              </MascotQuote>

              <h3 id="who-owns-a-google-account" style={h3Style}>Can You Find Out Who Owns a Google Account?</h3>
              <p style={paragraphStyle}>
                For a Google Ads account, yes. Open Settings &gt; Account information or Account access and security to see the owner, linked manager
                accounts, and every user&apos;s access level. For a personal Google account, a plain Gmail address, no: Google does not publish who owns an
                email address.
              </p>
              <p style={paragraphStyle}>
                An unrecognized manager account name is usually a white-label reseller or a parent MCC above your agency; ownership is transitive, so it has
                access too. If you cannot open Account access and security at all, that itself is the answer: your access level is below Standard. That is the
                quiet version of this problem, the one you catch by checking a settings screen. The loud version shows up in agency disputes, and it looks
                remarkably similar.
              </p>
            </section>

            {/* Disputes */}
            <section id="disputes">
              <h2 style={h2Style}>What Ownership Disputes Actually Look Like</h2>
              <p style={paragraphStyle}>
                In December 2023, an advertiser on r/PPC titled a thread &quot;Agency says they can&apos;t give access to our Google Ads account because
                it&apos;ll expose all client payment info&quot; (
                <a href="https://www.reddit.com/r/PPC/comments/18ii5wm/agency_says_they_cant_give_access_to_our_google/" style={linkStyle} {...extAttr}>r/PPC, 2023</a>).
                The reason an agency gives for withholding access is almost always a consequence of setup, not a policy Google requires.
              </p>
              <p style={paragraphStyle}>
                Of the 10 threads we reviewed on agency access disputes, December 2023 to March 2026 across Reddit, the Google Ads Community, and
                LocalSearchForum, three situations repeat: the client holds Standard or Read-only and cannot unlink; the account sits inside the agency&apos;s
                manager account, so there is nothing to transfer, only a rebuild; and the dispute reaches Google Ads support, which mediates access but does
                not arbitrate the contract. This is a light scan, not a survey, which is why the numbers stay counts, never percentages.
              </p>
              <p style={paragraphStyle}>
                If the relationship already feels over,{' '}
                <a href="/blog/signs-you-need-to-fire-your-ppc-agency" style={linkStyle}>the signs you need to fire your PPC agency</a> covers recognizing
                that.
              </p>
            </section>

            {/* Negotiate */}
            <section id="negotiate">
              <h2 style={h2Style}>What to Negotiate Before You Sign</h2>
              <p style={paragraphStyle}>
                Ownership is cheap to fix before you sign a contract and expensive to fix after the relationship sours. Six items belong in writing before the
                engagement starts.
              </p>

              <Steps>
                <Step title="Account creation">
                  You create the account under your own company-domain email; the agency links its manager account to it.
                </Step>
                <Step title="Admin access">
                  You keep Admin for the whole engagement, plus at least one other person at your company.
                </Step>
                <Step title="Payments profile">
                  The payments profile stays under your company, with your own primary contact.
                </Step>
                <Step title="Conversion tags and GTM">
                  Conversion tags and the GTM container live in your own GTM account, not the agency&apos;s.
                </Step>
                <Step title="GA4 property">
                  The GA4 property is yours; the agency is granted access rather than owning it.
                </Step>
                <Step title="Offboarding clause">
                  A written offboarding clause: access handed over within a stated number of business days of termination, not contingent on final invoice
                  settlement.
                </Step>
              </Steps>

              <p style={paragraphStyle}>
                Item six matters most. Most disputes are not about ownership in principle, they are about ownership used as a bargaining chip during a billing
                disagreement. Asking for these is not distrust, it is the same due diligence you would apply to a bookkeeper or a domain registrar. A good
                agency already defaults to this and will say so.
              </p>

              <MascotQuote mascot="mira">
                Ad copy and image assets built inside your account travel with your account when an agency leaves. Say an agency built forty ad variations for
                you (illustrative), those stay in your account&apos;s own asset library, not the agency&apos;s, as long as they were created there rather than
                uploaded from an external library.
              </MascotQuote>

              <p style={paragraphStyle}>
                Vet an agency before you sign with <a href="/blog/how-to-choose-a-ppc-agency" style={linkStyle}>our guide to choosing a PPC agency</a>. See{' '}
                <a href="/blog/ppc-management-cost" style={linkStyle}>our breakdown of PPC management cost</a> for how the offboarding clause interacts with
                final billing. All of that is prevention, for the reader who has not signed yet. If you already have, the questions change.
              </p>
            </section>

            {/* Already exposed */}
            <section id="already-exposed">
              <h2 style={h2Style}>Already Exposed? Three Moves That Actually Work</h2>
              <p style={paragraphStyle}>
                If you do not have Admin access today, the order of operations is request, document, escalate. Do not start by threatening to leave.
              </p>
              <p style={paragraphStyle}>
                Request Admin access in writing, framed as internal governance, not distrust. Document what you can see today: access level, linked managers,
                conversion actions, payments profile, with dated screenshots. If refused or ignored, escalate to Google Ads support, which helps with access
                and recovery but does not arbitrate a commercial dispute.
              </p>
              <p style={paragraphStyle}>
                One honest fallback: if the account was built entirely inside the agency&apos;s manager account and you never held Admin, starting a new
                account is sometimes the fastest path, costing conversion history and bidding learning. There is no reliable number for that loss.
              </p>
              <p style={paragraphStyle}>
                For the full handover checklist, billing transfer, and escalation sequence, see{' '}
                <a href="/blog/how-to-switch-google-ads-agencies" style={linkStyle}>how to switch Google Ads agencies</a>.
              </p>
            </section>

            {/* Where kampaio fits */}
            <section id="where-kampaio-fits">
              <h2 style={h2Style}>Where Kampaio Fits</h2>
              <p style={paragraphStyle}>
                Kampaio runs inside your own Google Ads account. You create the account, hold Admin, and the software is granted access like any other user.
                There is no Kampaio manager account that owns your account, nothing to transfer back if you cancel.
              </p>
              <p style={paragraphStyle}>
                The ownership risk here is a property of the arrangement, not of agencies. Any setup where someone else creates the account carries it; any
                setup where you create it and grant access does not, whether you are granting it to an agency or software.
              </p>
              <p style={paragraphStyle}>
                If you would rather run Google Ads yourself, with software instead of an agency,{' '}
                <a href="/blog/google-ads-without-agency" style={linkStyle}>running Google Ads without an agency</a> covers that path.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ: Google Ads Agency Account Ownership</h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i === faqItems.length - 1 ? 0 : '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{item.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>

            {/* Check your access */}
            <section id="check-your-access">
              <h2 style={h2Style}>Check Your Access Before You Need To</h2>
              <p style={paragraphStyle}>
                Open Tools &gt; Setup &gt; Account access and security and confirm Admin sits next to your name. It takes under a minute, and it is the only
                thing on this page that is genuinely urgent today.
              </p>
              <p style={paragraphStyle}>
                Kampaio is software that runs inside the account you own, not another account you have to worry about owning.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Keep the account, keep the control
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  kampaio is granted access to the account you already own, and shows every change before it ships. See{' '}
                  <a href="/pricing" style={linkStyle}>kampaio&apos;s plans</a>, or connect your own account and watch what it would change first.
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
                  Start with your own account
                </a>
              </div>

              <p style={{ fontSize: '15px', color: '#64748b', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '32px' }}>
                Access levels, ownership rules, and interface paths were verified against Google Ads Help in July 2026 and can change. This article is
                informational and does not constitute legal advice.
              </p>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={h2Style}>Sources</h2>
              <ul style={listStyle}>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/google-ads/answer/7456532" style={linkStyle} {...extAttr}>Manager account ownership, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/google-ads/answer/9978556" style={linkStyle} {...extAttr}>Access levels, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/google-ads/answer/44500" style={linkStyle} {...extAttr}>Transfer your account, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/google-ads/answer/7456531" style={linkStyle} {...extAttr}>Give people access, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/google-ads/answer/7458428" style={linkStyle} {...extAttr}>What happens when you unlink, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/paymentscenter/answer/7162853" style={linkStyle} {...extAttr}>Payments profile users, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/merchants/answer/188924" style={linkStyle} {...extAttr}>Merchant Center accounts, Google Ads Help</a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://www.reddit.com/r/PPC/comments/18ii5wm/agency_says_they_cant_give_access_to_our_google/" style={linkStyle} {...extAttr}>
                    &quot;Agency says they can&apos;t give access...,&quot; r/PPC, Dec 2023
                  </a>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <a href="https://support.google.com/google-ads/thread/94073094" style={linkStyle} {...extAttr}>
                    &quot;Always create the account yourself...,&quot; Jason King, Google Ads Community
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-agency-account-ownership" category="strategy" />
      <Footer compact={true} />
      </div>
    </>
  );
}
