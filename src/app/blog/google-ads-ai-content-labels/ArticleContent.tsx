'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import ResponsiveTable from '../../../components/blog/ResponsiveTable';
import { Callout, KeyTakeaways, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/google-ads-ai-content-labels#article',
    headline:
      'Google Ads AI Content Labels: What Changed in July 2026 and Exactly What You Need to Do About It',
    description:
      'Google is rolling out AI content labels across five ad platforms in July 2026. See whether you must label your assets, the exact Asset Studio click path, and what it means for your QA process.',
    image: 'https://www.kampaio.com/og/google-ads-ai-content-labels.png',
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
    datePublished: '2026-07-30T00:00:00.000Z',
    dateModified: '2026-07-30T00:00:00.000Z',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/google-ads-ai-content-labels',
    },
    keywords:
      'google ads ai content labels, ai label setting, asset studio ai label, ai generated ad disclosure, eu ai act article 50, new york synthetic performer law, merchant center ai label, google ads editor ai label column, c2pa, synthid',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Google Ads automatically label AI-generated ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google auto-applies the label to assets made with its own AI tools. Assets made with an external tool are yours to label manually.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which Google ad platforms show the new AI label?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Five surfaces: Google Ads, Ads Editor, DV360, Campaign Manager 360, and Merchant Center. Only three of them, Google Ads, Merchant Center, and Ads Editor, have a confirmed live sighting so far.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do responsive search ads need an AI label?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Current policy covers image and video assets, not RSA headlines and descriptions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does labeling an asset as AI-generated hurt ad performance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No published evidence of a penalty either way. Treat this as compliance, not a CTR question.',
        },
      },
      {
        '@type': 'Question',
        name: 'I do not see the AI label setting yet, is something broken?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The rollout window was "throughout July" and reaches accounts gradually.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does using the AI label setting make me legally compliant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Google states it alone does not guarantee compliance with specific regulations. Confirm with counsel if you operate in the EU, India, or New York.',
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
        name: 'Google Ads AI Content Labels: What Changed in July 2026 and Exactly What You Need to Do About It',
        item: 'https://www.kampaio.com/blog/google-ads-ai-content-labels',
      },
    ],
  };

  const tableOfContents = [
    { id: 'label-now', title: 'Do You Have to Label Your Ads Right Now? (The 60-Second Answer)', level: 1 },
    { id: 'what-changed', title: 'What Google Actually Changed in July 2026', level: 1 },
    { id: 'decision-grid', title: 'Do You Need to Label This Specific Asset? (The Decision Grid)', level: 1 },
    { id: 'how-to-label', title: 'How to Add the AI Label in Asset Studio', level: 1 },
    { id: 'five-surfaces', title: "The Five Surfaces Aren't All on the Same Timeline", level: 1 },
    { id: 'workflow', title: 'What This Changes About Your Creative and QA Workflow', level: 1 },
    { id: 'risks', title: 'What Happens If You Skip It or Get It Wrong', level: 1 },
    { id: 'faq', title: 'FAQ', level: 1 },
    { id: 'kampaio', title: 'Keep Your Creative Compliant Without Adding a Manual Step', level: 1 },
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
  const captionStyle: React.CSSProperties = { fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, marginTop: '-12px', marginBottom: '32px' };
  const yesStyle: React.CSSProperties = { color: '#10b981', fontWeight: 600 };
  const leanStyle: React.CSSProperties = { color: '#f59e0b', fontWeight: 600 };
  const noStyle: React.CSSProperties = { color: '#64748b', fontWeight: 600 };
  const liveStyle: React.CSSProperties = { color: '#10b981', fontWeight: 600 };
  const pendingStyle: React.CSSProperties = { color: '#f59e0b', fontWeight: 600 };

  const checklistItems = [
    'Add "AI-generated or AI-edited? Y/N" as a required field on every creative brief or upload ticket.',
    'Audit the existing asset library once, retroactively, not just new uploads.',
    "If you use a freelancer or agency, add an AI-disclosure question to the delivery checklist. Don't assume they'll volunteer it.",
    'Assign one owner for the setting per account, the way someone already owns conversion tracking.',
    'Re-check quarterly, since the rollout is staggered across surfaces.',
  ];

  const faqItems = [
    {
      q: 'Does Google Ads automatically label AI-generated ads?',
      a: (
        <>Google auto-applies the label to assets made with its own AI tools. Assets made with an external tool are yours to label manually (<a href="https://support.google.com/google-ads/answer/17140115?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>).</>
      ),
    },
    {
      q: 'Which Google ad platforms show the new AI label?',
      a: (
        <>Five surfaces: Google Ads, Ads Editor, DV360, Campaign Manager 360, and Merchant Center. Only three of them, Google Ads, Merchant Center, and Ads Editor, have a confirmed live sighting so far (<a href="https://searchengineland.com/google-rolls-out-ai-content-labels-across-its-advertising-platforms-483816" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land</a>).</>
      ),
    },
    {
      q: 'Do responsive search ads need an AI label?',
      a: (
        <>No. Current policy covers image and video assets, not RSA headlines and descriptions (<a href="https://support.google.com/adspolicy/answer/17257106?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Policy Help</a>).</>
      ),
    },
    {
      q: 'Does labeling an asset as AI-generated hurt ad performance?',
      a: <>No published evidence of a penalty either way. Treat this as compliance, not a CTR question.</>,
    },
    {
      q: "I don't see the AI label setting yet, is something broken?",
      a: <>No. The rollout window was &quot;throughout July&quot; and reaches accounts gradually.</>,
    },
    {
      q: 'Does using the AI label setting make me legally compliant?',
      a: (
        <>No. Google states it alone &quot;doesn&apos;t guarantee compliance with specific regulations&quot; (<a href="https://support.google.com/adspolicy/answer/17257106?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Policy Help</a>). Confirm with counsel if you operate in the EU, India, or New York.</>
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
          <ArticleHero slug="google-ads-ai-content-labels" />
        </div>

        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, marginBottom: '20px' }}>
              AI &amp; Automation &middot; AI Content Labels
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Google Ads AI Content Labels: What Changed in July 2026 and Exactly What You Need to Do About It
            </h1>
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: 500 }}>
              Google is rolling out AI content labels across five ad platforms in July 2026. Here is whether you must label your assets, the exact Asset Studio click path, and what it means for your QA process.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By Kampaio Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>AI-native Google Ads optimization</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 30, 2026 &middot; 10 min read</span>
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
            {/* Intro */}
            <section id="intro">
              <p style={paragraphStyle}>
                Google Ads AI content labels went live in July 2026, not as a hypothetical policy update. Google is rolling out an &quot;Ads AI label setting&quot; across five ad platforms so advertisers can disclose AI-generated or AI-edited image and video creative. Google supplies the tool. The actual obligation comes from law, and in one market it lands on you.
              </p>
            </section>

            {/* 60-second answer */}
            <section id="label-now">
              <h2 style={h2Style}>Do You Have to Label Your Ads Right Now? (The 60-Second Answer)</h2>
              <p style={paragraphStyle}>
                As of July 2026, Google is rolling out an Ads AI label setting across five ad platforms so advertisers can disclose AI-generated or AI-edited image and video creative. For most DTC accounts, labeling isn&apos;t universally mandatory yet, but it&apos;s expanding, and skipping it is a growing compliance risk in the EU, India, and New York.
              </p>
              <p style={paragraphStyle}>
                It&apos;s a phased rollout, not a switch flipped overnight. Check whether the setting has appeared in your own Asset Studio before you assume anything changed for you. If it hasn&apos;t shown up yet, that&apos;s normal, not a bug.
              </p>

              {/* VISUAL 1: front-loaded answer */}
              <KeyTakeaways
                items={[
                  'Not universally mandatory yet for most DTC accounts, but already live and expanding.',
                  'Five surfaces named: Google Ads, Ads Editor, Merchant Center confirmed live; DV360 and Campaign Manager 360 listed, no confirmed sighting yet.',
                  'The visible on-ad overlay only shows for EU, India, or New York campaigns. The My Ad Center panel is global.',
                  'Once Google auto-applies a label, you cannot overwrite it.',
                  'Rollout window is "throughout July." Today is July 30, most of that window has passed.',
                ]}
              />
            </section>

            {/* What changed */}
            <section id="what-changed">
              <h2 style={h2Style}>What Google Actually Changed in July 2026</h2>
              <p style={paragraphStyle}>
                Starting July 9, 2026, Google shipped a built-in way for advertisers to disclose AI-generated or AI-edited image and video assets, rolling out gradually across Google Ads, DV360, Campaign Manager 360, Merchant Center, and Ads Editor. Worth being precise about this, because most coverage blurs it: Google is not itself ordering every advertiser to label. Its own wording is to &quot;Add labels directly to your creatives or use the AI label setting&quot; (<a href="https://support.google.com/google-ads/answer/17140115?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). Google built the mechanism. The mandate lives in regulation.
              </p>
              <p style={paragraphStyle}>
                Google framed the change around what viewers see: &quot;We&apos;re introducing additional features, including a &apos;How this ad was made&apos; panel, to help people easily understand when generative AI was used to create or alter an ad&quot; (<a href="https://blog.google/products/ads-commerce/google-ads-ai-transparency-labels/" style={linkStyle} target="_blank" rel="noopener noreferrer">Keerat Sharma, Google blog, July 9, 2026</a>).
              </p>

              {/* VISUAL 2: the regulatory driver */}
              <Callout variant="insight" title="Why now: the regulatory driver">
                &quot;AI regulations in the European Union, India, and New York require that ads with certain AI-generated or edited assets include disclosures and/or labels that inform consumers that the ads were made with AI&quot; (<a href="https://support.google.com/adspolicy/answer/17257106?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Policy Help</a>). This exists because of law, not product enthusiasm.
              </Callout>

              <p style={{ ...paragraphStyle, marginTop: '32px' }}>
                Google auto-labels assets built with its own <a href="/blog/5-tips-for-working-with-ai-ppc-tools" style={{ color: '#764ba2', textDecoration: 'underline' }}>AI tools</a>. Anything made with Midjourney, Runway, or a freelancer&apos;s own workflow is on you to label manually.
              </p>
              <p style={paragraphStyle}>
                Two more details worth knowing. The latest version of Google Ads Editor now carries an &quot;AI label&quot; column that &quot;indicates whether the labeling has been activated in your account&quot; (<a href="https://ppcnewsfeed.com/ppc-news/2026-07/google-ads-ai-content-labels/" style={linkStyle} target="_blank" rel="noopener noreferrer">ppcnewsfeed.com, July 28, 2026</a>). And separately, Google is already watermarking its own output under the hood: it embeds &quot;non-visible SynthID digital watermarks and C2PA (Coalition for Content Provenance and Authenticity) open-standard markup into all images and videos generated within Google Ads tools&quot; (<a href="https://support.google.com/google-ads/answer/17140115?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). That part is automatic, not something you configure.
              </p>
              <p style={paragraphStyle}>
                Not Google&apos;s first mid-year AI feature to land unevenly, and it won&apos;t be the last one you have to chase down account by account; see <a href="/blog/google-ads-ai-max" style={linkStyle}>AI Max&apos;s own staggered rollout</a> and <a href="/blog/how-ai-is-transforming-google-ads-in-2025" style={linkStyle}>how AI is reshaping Google Ads through 2026</a>.
              </p>
            </section>

            {/* Decision grid */}
            <section id="decision-grid">
              <h2 style={h2Style}>Do You Need to Label This Specific Asset? (The Decision Grid)</h2>
              <p style={paragraphStyle}>
                Whether you need to label an asset depends on how much AI touched it, not whether AI was involved at all. This grid is our practical judgment call, not Google adjudication: Google&apos;s own wording, &quot;create entirely new realistic assets from simple prompts, or meaningfully enhance existing assets&quot; (<a href="https://support.google.com/google-ads/answer/17140115?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>), never breaks down retouching, upscaling, or background swaps.
              </p>

              {/* VISUAL 3: label it / don't label it */}
              <ResponsiveTable
                headers={['Asset scenario', 'Label it?', 'Why']}
                rows={[
                  [
                    'Fully AI-generated product photo, no real photoshoot',
                    <span key="v1" style={yesStyle}>Yes</span>,
                    'Synthetic imagery replacing a real product shot',
                  ],
                  [
                    'AI background swap behind a real product',
                    <span key="v2" style={yesStyle}>Yes</span>,
                    'Materially AI-edited final creative',
                  ],
                  [
                    'AI upscale of an existing real photo',
                    <span key="v3" style={leanStyle}>Lean yes at scale</span>,
                    <span key="w3">Google treats &quot;edited using AI&quot; broadly</span>,
                  ],
                  [
                    'Light AI color correction on a real photo',
                    <span key="v4" style={noStyle}>Usually no</span>,
                    'Minor, non-generative edit',
                  ],
                  [
                    'AI-written RSA headline or description',
                    <span key="v5" style={noStyle}>Not required</span>,
                    'Policy covers image and video, not text',
                  ],
                  [
                    'Human-shot asset resized via an AI tool',
                    <span key="v6" style={noStyle}>No</span>,
                    'Tool touched formatting, not content',
                  ],
                ]}
              />
              <p style={captionStyle}>Where the line sits, scenario by scenario. Our practical read, not Google adjudication.</p>

              <p style={paragraphStyle}>
                When unsure, default to labeling. Not glamorous advice, but it&apos;s the safe one: over-disclosing costs nothing, under-disclosing is a compliance gap. On the RSA question, breathe easy: AI-assisted ad copy isn&apos;t in scope, the setting governs image and video creative, not text.
              </p>
            </section>

            {/* How to */}
            <section id="how-to-label">
              <h2 style={h2Style}>How to Add the AI Label in Asset Studio</h2>
              <p style={paragraphStyle}>
                You add the label from inside Asset Studio, per asset, in under a minute.
              </p>

              {/* VISUAL 4: click path. Plain Steps only, no step-by-step schema: Google retired that rich result in 2023. */}
              <Steps>
                <Step title="Open Tools">In the top navigation.</Step>
                <Step title="Select Asset studio">From the Tools menu.</Step>
                <Step title="Open Asset library">Inside Asset studio.</Step>
                <Step title="Click into the asset's details page">Pick the specific asset you want to label.</Step>
                <Step title="Choose the label">
                  Either &quot;Label this asset as created or edited with AI&quot; or &quot;Don&apos;t label this asset.&quot;
                </Step>
                <Step title="Click Save">The label is applied to that asset.</Step>
              </Steps>

              <p style={{ ...paragraphStyle, marginTop: '32px' }}>
                This path is confirmed by Google (<a href="https://support.google.com/google-ads/answer/17140115?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help</a>). One other entry point, during campaign creation, ends in &quot;Manage AI label&quot; then &quot;Done&quot; instead.
              </p>
              <p style={paragraphStyle}>
                This path also works retroactively, no need to redo your whole library, just review live assets one at a time.
              </p>

              {/* VISUAL 5: the April pilot */}
              <MascotQuote mascot="mira">
                Google was already testing an AI label on mobile ads back on April 27, about ten weeks before making it official on July 9. If a competitor&apos;s mobile ad had an odd little badge on it this spring, that wasn&apos;t a bug, it was the pilot. When Google tests something quietly first, it usually means the rollout is coming whether you&apos;re ready or not.
              </MascotQuote>
              <p style={captionStyle}>
                Pilot sighting reported by <a href="https://x.com/SERPalerts/status/2048558072747176189" style={linkStyle} target="_blank" rel="noopener noreferrer">SERP Alerts (X, April 27, 2026)</a>.
              </p>
            </section>

            {/* Five surfaces */}
            <section id="five-surfaces">
              <h2 style={h2Style}>The Five Surfaces Aren&apos;t All on the Same Timeline</h2>
              <p style={paragraphStyle}>
                The AI label setting is rolling out across five surfaces on a staggered timeline, so what you see may not match a colleague&apos;s account.
              </p>

              {/* VISUAL 6: five-surface rollout state */}
              <ResponsiveTable
                headers={['Surface', 'What changes', "Where you'll see it"]}
                rows={[
                  [
                    'Google Ads',
                    <span key="s1" style={liveStyle}>Setting live per asset</span>,
                    'Asset studio > Asset library',
                  ],
                  [
                    'Google Ads Editor',
                    <span key="s2" style={liveStyle}>New &quot;AI label&quot; column, live</span>,
                    'Account view, asset grid',
                  ],
                  [
                    'Merchant Center',
                    <span key="s3" style={liveStyle}>Product imagery covered, live</span>,
                    'Product data review',
                  ],
                  [
                    'Display & Video 360',
                    <span key="s4" style={pendingStyle}>Listed by Google, no confirmed sighting</span>,
                    'Creative workflows, when it appears',
                  ],
                  [
                    'Campaign Manager 360',
                    <span key="s5" style={pendingStyle}>Listed by Google, no confirmed sighting</span>,
                    'Creative trafficking, when it appears',
                  ],
                ]}
              />
              <p style={captionStyle}>Three surfaces confirmed live, two listed but not yet sighted.</p>

              <p style={paragraphStyle}>
                Confirmed independently: &quot;The setting is rolling out gradually across: Google Ads. Display &amp; Video 360. Campaign Manager 360. Merchant Center. Google Ads Editor.&quot; (<a href="https://searchengineland.com/google-rolls-out-ai-content-labels-across-its-advertising-platforms-483816" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, July 28, 2026</a>). If your team runs Shopping alongside programmatic display, audit each surface separately. Enabling it in Google Ads doesn&apos;t cover Merchant Center or DV360, and assuming it does is how a gap gets found later instead of now.
              </p>
            </section>

            {/* Workflow */}
            <section id="workflow">
              <h2 style={h2Style}>What This Changes About Your Creative and QA Workflow</h2>
              <p style={paragraphStyle}>
                If more than one person touches your ad creative, in-house, freelance, or agency, this setting needs to become a checkbox in your review process.
              </p>

              {/* VISUAL 7: QA checklist, product-neutral */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {checklistItems.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'flex-start',
                      background: '#f8fafc',
                      border: '1px solid #e5e7eb',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      fontSize: '17px',
                      lineHeight: 1.65,
                      color: '#1e293b',
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: '22px',
                        height: '22px',
                        marginTop: '2px',
                        borderRadius: '6px',
                        border: '2px solid #667eea',
                        color: '#667eea',
                        fontSize: '13px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      aria-hidden
                    >
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p style={paragraphStyle}>
                <a href="/blog/google-ads-ai-agent" style={linkStyle}>Who owns a policy setting like this</a> matters here, the same way <a href="/blog/google-ads-conversion-tracking-not-working" style={{ color: '#764ba2', textDecoration: 'underline' }}>conversion tracking</a> ownership gets resolved rather than assumed.
              </p>
              <p style={paragraphStyle}>
                Honestly, this is a small change for most small teams: one field on a brief, one audit pass. The anxiety around it is bigger than the actual lift.
              </p>
            </section>

            {/* Risks */}
            <section id="risks">
              <h2 style={h2Style}>What Happens If You Skip It or Get It Wrong</h2>
              <p style={paragraphStyle}>
                Right now the risk is compliance exposure in regulated markets, not an automatic Google Ads penalty, but the setting alone doesn&apos;t guarantee compliance: &quot;Use of the AI label setting in Google&apos;s advertising products doesn&apos;t guarantee compliance with specific regulations. Seek legal guidance&quot; (<a href="https://support.google.com/adspolicy/answer/17257106?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Policy Help</a>).
              </p>
              <p style={paragraphStyle}>
                Here&apos;s what most coverage skips: the EU and India route the duty mainly through platforms, not advertisers. The EU AI Act&apos;s Article 50 applies from August 2, 2026 (<a href="https://artificialintelligenceact.eu/article/50/" style={linkStyle} target="_blank" rel="noopener noreferrer">EU AI Act, Article 50</a>), three days after this publishes. India&apos;s IT Amendment Rules 2026 have been in force since February 20, 2026 (<a href="https://www.khaitanco.com/thought-leadership/MeitY-notifies-the-IT-Amendment-Rules-2026" style={linkStyle} target="_blank" rel="noopener noreferrer">Khaitan &amp; Co</a>). Both weigh on Google, not you.
              </p>
              <p style={paragraphStyle}>
                New York is the exception, and it&apos;s the one that should have your attention. Its synthetic performer disclosure law puts the duty on &quot;persons who produce or create an advertisement,&quot; the advertiser, not Google (<a href="https://www.governor.ny.gov/news/governor-hochul-announces-first-nation-law-requiring-disclosure-when-advertisements-include-ai" style={linkStyle} target="_blank" rel="noopener noreferrer">Governor Hochul&apos;s office</a>). Signed as bills S.8420-A and A.8887-B, it took effect June 9, 2026, carries civil penalties of $1,000 for a first violation and $5,000 per violation after that, and reaches any advertiser whose ads hit New York consumers regardless of where the company is headquartered (<a href="https://www.crowell.com/en/insights/client-alerts/synthetic-performers-real-consequences-implications-of-trailblazing-new-york-ai-ad-law" style={linkStyle} target="_blank" rel="noopener noreferrer">Crowell &amp; Moring</a>).
              </p>
              <p style={paragraphStyle}>
                So: are you personally on the hook? Mostly no, except if your creative uses a synthetic human likeness reaching New York, where the answer is yes, already. This is not legal advice; confirm your specific obligations with counsel.
              </p>
              <p style={paragraphStyle}>
                Mislabeling isn&apos;t a deceptive ad, either: &quot;We continue to prohibit misleading and deceptive ads, whether created with AI or not&quot; (<a href="https://blog.google/products/ads-commerce/google-ads-ai-transparency-labels/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google blog</a>). Start labeling now, while it&apos;s low stakes.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>FAQ</h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ marginBottom: i === faqItems.length - 1 ? 0 : '24px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: 1.5 }}>{item.q}</p>
                  <p style={{ fontSize: '17px', color: '#475569', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </section>

            {/* Where Kampaio fits */}
            <section id="kampaio">
              <h2 style={h2Style}>Keep Your Creative Compliant Without Adding a Manual Step</h2>
              <p style={paragraphStyle}>
                This setting is one more small policy detail that&apos;s easy to forget mid-campaign. Mira, <a href="/blog/ai-powered-ppc-platform" style={linkStyle}>Kampaio&apos;s creative agent</a>, generates and edits ad creative directly, exactly the point where a disclosure like this should get handled automatically instead of sitting on nobody&apos;s checklist.
              </p>
              <p style={paragraphStyle}>
                Maximus tracks policy and platform changes across every account, so the next staggered rollout doesn&apos;t turn into something you discover late. You set the direction; the agents handle the details. <a href="/pricing" style={linkStyle}>See pricing</a>.
              </p>

              <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '16px', padding: '40px', textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '16px', marginTop: 0, lineHeight: 1.3 }}>
                  Want the policy watch handled for you?
                </h3>
                <p style={{ fontSize: '17px', color: '#475569', marginBottom: '28px', lineHeight: 1.6, fontWeight: 500, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Kampaio&apos;s agents generate the creative and track the platform changes that come with it, so a new disclosure setting does not sit on nobody&apos;s checklist.
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
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  See pricing
                </a>
              </div>

              <p style={{ fontSize: '14px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.7, marginTop: '8px' }}>
                Sources:{' '}
                <a href="https://blog.google/products/ads-commerce/google-ads-ai-transparency-labels/" style={linkStyle} target="_blank" rel="noopener noreferrer">Google blog, July 9, 2026</a>;{' '}
                <a href="https://support.google.com/google-ads/answer/17140115?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>;{' '}
                <a href="https://support.google.com/adspolicy/answer/17257106?hl=en" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Policy Help, 2026</a>;{' '}
                <a href="https://searchengineland.com/google-rolls-out-ai-content-labels-across-its-advertising-platforms-483816" style={linkStyle} target="_blank" rel="noopener noreferrer">Search Engine Land, July 28, 2026</a>;{' '}
                <a href="https://ppcnewsfeed.com/ppc-news/2026-07/google-ads-ai-content-labels/" style={linkStyle} target="_blank" rel="noopener noreferrer">ppcnewsfeed.com, July 28, 2026</a>;{' '}
                <a href="https://artificialintelligenceact.eu/article/50/" style={linkStyle} target="_blank" rel="noopener noreferrer">EU AI Act, Article 50</a>;{' '}
                <a href="https://www.khaitanco.com/thought-leadership/MeitY-notifies-the-IT-Amendment-Rules-2026" style={linkStyle} target="_blank" rel="noopener noreferrer">Khaitan &amp; Co, 2026</a>;{' '}
                <a href="https://www.governor.ny.gov/news/governor-hochul-announces-first-nation-law-requiring-disclosure-when-advertisements-include-ai" style={linkStyle} target="_blank" rel="noopener noreferrer">Governor Hochul&apos;s office, 2026</a>;{' '}
                <a href="https://www.crowell.com/en/insights/client-alerts/synthetic-performers-real-consequences-implications-of-trailblazing-new-york-ai-ad-law" style={linkStyle} target="_blank" rel="noopener noreferrer">Crowell &amp; Moring, 2026</a>;{' '}
                <a href="https://x.com/SERPalerts/status/2048558072747176189" style={linkStyle} target="_blank" rel="noopener noreferrer">SERP Alerts (X, April 27, 2026)</a>. The label-it decision grid is our practical read of Google&apos;s wording, not Google adjudication. This article is informational and does not constitute legal advice; confirm your obligations with counsel.
              </p>
            </section>
          </div>
        </div>

        <KeepReading slug="google-ads-ai-content-labels" category="ai" />
        <Footer compact={true} />
      </div>
    </>
  );
}
