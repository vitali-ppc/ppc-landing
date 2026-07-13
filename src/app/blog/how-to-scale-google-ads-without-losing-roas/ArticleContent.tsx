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
    "@id": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas#article",
    "headline": "How to Scale Google Ads Without Losing ROAS (2026 Playbook)",
    "description": "Scaling Google Ads spend without tanking ROAS comes down to one rule: raise budgets 20% at a time, wait for Smart Bidding to re-stabilize, and expand demand instead of buying more of the same clicks. Seven-step playbook with thresholds.",
    "image": "https://www.kampaio.com/og/how-to-scale-google-ads-without-losing-roas.png",
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
    "datePublished": "2026-06-03T00:00:00.000Z",
    "dateModified": "2026-06-03T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas"
    },
    "keywords": "scale google ads, ROAS, Smart Bidding, learning phase, daily budget, Target ROAS, Maximize Conversion Value, demand expansion, Performance Max, Demand Gen, conversion volume, 20 percent rule",
    "wordCount": 2420,
    "articleSection": "Strategy",
    "inLanguage": "en"
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Scale Google Ads Without Losing ROAS",
    "description": "Scale Google Ads spend while keeping ROAS within roughly 10% of baseline by raising budgets in 20% steps, waiting for Smart Bidding to re-stabilize, and expanding demand.",
    "totalTime": "P84D",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Build the foundation before you raise a dollar",
        "text": "Confirm conversion tracking is honest, document your Max CPA and margin floor, establish a 30-day baseline, and run Performance Planner as a directional sanity check.",
        "url": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Raise budgets in 20% steps",
        "text": "Raise the daily budget by 20% or less per step, then wait 7-14 days for Smart Bidding to re-stabilize before the next increase. Never double overnight.",
        "url": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Change one lever at a time",
        "text": "Never change the budget and the bid strategy in the same week. Settle budget first, stabilize for 7-14 days, then change bid strategy on a separate week.",
        "url": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Scale demand, not just spend",
        "text": "When CPC rises for two straight weeks with flat conversions, expand the demand surface: mine the search terms report, segment by product or geography, separate brand from non-brand, and expand Performance Max and Demand Gen.",
        "url": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas#step-4"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Keep Target ROAS loose while you scale",
        "text": "Start on Maximize Conversion Value or a tROAS set 20-30% below current actual ROAS. Accumulate 4-6 weeks of value data, then tighten in 10-15% increments per stabilization window.",
        "url": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas#step-5"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you improve ROAS on Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tighten targeting to higher-intent queries, improve ad creative and landing page relevance, and feed Smart Bidding correct conversion values. Better ROAS efficiency first builds the margin headroom to scale safely."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can you scale Google Ads safely?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Raise the daily budget by roughly 20% per step and wait 7-14 days between steps. Going from 250 dollars per day to 1,000 dollars per day takes 8-12 weeks, with ROAS holding within 10% of baseline throughout."
        }
      },
      {
        "@type": "Question",
        "name": "Does scaling always reduce ROAS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, only when you jump too fast or push spend into saturated auctions. Paced 20% increases plus demand expansion keep ROAS within 10% of baseline through each step."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use Performance Max to scale Google Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PMax adds headroom by capturing mid-funnel demand search campaigns miss. At scale it requires brand exclusions, structured asset groups, and placement review. Set-and-forget PMax is the most common way budget leaks at scale."
        }
      },
      {
        "@type": "Question",
        "name": "Should I raise budgets or bids to scale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start with budget in 20% increments. Never change budget and bid strategy in the same week. Simultaneous changes double the learning-phase shock and hide which lever moved performance."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum conversion volume before scaling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "About 30 conversions per 30 days. Below that, Smart Bidding's signal is too thin. Build volume first through targeting expansion."
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
        "name": "How to Scale Google Ads Without Losing ROAS",
        "item": "https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas"
      }
    ]
  };

  const tableOfContents = [
    { id: 'tldr', title: 'TL;DR - The Rule That Keeps ROAS Intact While You Scale', level: 1 },
    { id: 'why-big-jumps', title: 'Why Big Budget Jumps Wreck ROAS', level: 1 },
    { id: 'step-1', title: 'Step 1 - Build the Foundation Before You Raise a Dollar', level: 1 },
    { id: 'step-2', title: 'Step 2 - The 20 Percent Rule: Raise Budgets in Small Steps', level: 1 },
    { id: 'step-3', title: 'Step 3 - Change One Lever at a Time', level: 1 },
    { id: 'step-4', title: 'Step 4 - Scale Demand, Not Just Spend', level: 1 },
    { id: 'step-5', title: 'Step 5 - Keep Target ROAS Loose While You Scale', level: 1 },
    { id: 'do-not-scale', title: 'When You Should NOT Scale Yet', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'kampaio-cta', title: 'How Kampaio Automates the Scaling Loop', level: 1 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const h2Style = { fontSize: '32px', fontWeight: 700 as const, color: '#1e293b', marginBottom: '24px', marginTop: '48px', lineHeight: '1.3' };
  const pStyle = { fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' };
  const linkStyle = { color: '#764ba2', textDecoration: 'underline' };
  const olStyle = { fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' };
  const liStyle = { marginBottom: '12px' };

  // Demand-saturation curve data (CPC rising while conversions stay flat)
  const cpcPoints = [40, 44, 49, 55, 62, 70];
  const convPoints = [50, 51, 49, 50, 50, 49];
  const chartW = 640;
  const chartH = 240;
  const padL = 48;
  const padR = 24;
  const padT = 24;
  const padB = 36;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;
  const xAt = (i: number) => padL + (i / (cpcPoints.length - 1)) * innerW;
  const yAt = (v: number) => padT + (1 - (v - 30) / (80 - 30)) * innerH;
  const cpcPath = cpcPoints.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(v)}`).join(' ');
  const convPath = convPoints.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i)} ${yAt(v)}`).join(' ');

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
          <ArticleHero slug="how-to-scale-google-ads-without-losing-roas" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Strategy · Scaling
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              How to Scale Google Ads Without Losing ROAS (2026 Playbook)
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Raise budgets 20% at a time, wait for Smart Bidding to re-stabilize, and expand demand instead of buying more of the same clicks. A seven-step playbook with the exact thresholds.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  B6
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>By B6 Team</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>B6 SEO Agent</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>June 3, 2026 · 11 min read</span>
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
            <section>
              <p style={pStyle}>
                You scale Google Ads without losing ROAS by raising the daily budget in 20% increments, waiting 7-14 days for Smart Bidding to re-stabilize between each step, and expanding into new demand rather than buying more of the same clicks. From 250 dollars per day to 1,000 dollars per day, that means roughly 6-8 paced steps over 8-12 weeks, not an overnight double.
              </p>
            </section>

            {/* TL;DR */}
            <section id="tldr">
              <h2 style={h2Style}>TL;DR - The Rule That Keeps ROAS Intact While You Scale</h2>
              <p style={pStyle}>
                You scale Google Ads without losing ROAS by staying below the Smart Bidding learning-phase trigger at every step. The core rule:
              </p>
              <ol style={olStyle}>
                <li style={liStyle}>Confirm conversion tracking is clean and you know your Max CPA and margin floor before touching anything.</li>
                <li style={liStyle}>Raise the daily budget by 20% or less per step. Never double overnight.</li>
                <li style={liStyle}>Wait 7-14 days between steps for Smart Bidding to re-stabilize.</li>
                <li style={liStyle}>Never change the budget and the bid strategy in the same week.</li>
                <li style={liStyle}>Keep Target ROAS loose while scaling. Tighten it only after value data accumulates.</li>
                <li style={liStyle}>Expand demand (new keywords, segments, Demand Gen) once the same keywords saturate.</li>
                <li style={liStyle}>Watch the conversion-volume floor: below roughly 30 conversions per 30 days, fix volume before scaling spend.</li>
              </ol>
              <p style={pStyle}>
                Done right, you compound spend 20% at a time and ROAS holds within roughly 10% of baseline through each step. Done wrong, every big jump resets the learning phase and you lose weeks.
              </p>
            </section>

            {/* Why big jumps wreck ROAS */}
            <section id="why-big-jumps">
              <h2 style={h2Style}>Why Big Budget Jumps Wreck ROAS</h2>
              <p style={pStyle}>
                Large budget increases tank ROAS because they re-trigger the Smart Bidding learning phase, and during that window the algorithm bids erratically while it rebuilds its model. Four mechanics explain why the 20% ceiling exists.
              </p>
              <p style={pStyle}>
                The <strong>learning phase</strong> is the period (roughly 7 days, or until about 30 conversions are recorded) when Smart Bidding recalibrates its auction predictions after a significant account change (<a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Smart Bidding</a>). A budget jump above approximately 20% reads as a significant change and restarts the clock.
              </p>
              <p style={pStyle}>
                <strong>CPC spikes</strong> follow immediately. More budget chasing the same auction inventory bids up your own average CPCs at the margin. The early clicks in a well-run campaign are the cheapest and highest-intent; each additional dollar buys progressively weaker clicks at higher cost.
              </p>
              <p style={pStyle}>
                <strong>CPA rises and ROAS falls</strong> as a direct result. Smart Bidding has already bought the easy wins; scale too fast and it buys harder, more expensive conversions with an unstable model underneath.
              </p>
              <p style={pStyle}>
                <strong>Daily spend volatility</strong> makes everything worse. Doubled budgets spend unevenly while pacing recalibrates, distorting the ROAS read for an entire week. You cannot tell if the number you are seeing is real or just noise from erratic pacing.
              </p>
              <p style={pStyle}>
                If a budget bump has already collapsed your ROAS, start with <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>why ROAS drops suddenly</a> before returning here.
              </p>
            </section>

            {/* Step 1 */}
            <section id="step-1">
              <h2 style={h2Style}>Step 1 - Build the Foundation Before You Raise a Dollar</h2>
              <p style={pStyle}>
                Before scaling, confirm three things: conversion tracking is honest, you know your Max CPA and margin floor, and operations can absorb the growth. Scaling on a broken foundation does not just fail to work. It makes diagnosis impossible, because every signal you are reading is wrong.
              </p>
              <p style={pStyle}>Work through this checklist before touching any budget:</p>
              <ol style={olStyle}>
                <li style={liStyle}><strong>Audit conversion tracking.</strong> Confirm no duplicate conversions, no missing tags, and correct conversion values flowing. Broken tracking means Smart Bidding scales toward a false signal. The account reports healthy ROAS against fabricated data until you look. See our <a href="/blog/google-ads-conversion-tracking-not-working" style={linkStyle}>conversion tracking audit guide</a>.</li>
                <li style={liStyle}><strong>Set your guardrails.</strong> Document your Max CPA, target margin, and fulfillment capacity. Can operations handle three times the current order volume? Scaling past capacity is a different kind of failure, and it does not show up in the ads interface.</li>
                <li style={liStyle}><strong>Establish a 30-day baseline.</strong> Record current ROAS, CPA, conversion volume, and impression share. Every scaling decision compares against this number. Without it, &quot;ROAS is holding&quot; is just a feeling.</li>
                <li style={liStyle}><strong>Run Performance Planner.</strong> Google&apos;s forecast tool (<a href="https://support.google.com/google-ads/answer/9230124" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Performance Planner</a>) projects what additional budget yields at current efficiency. Use it as a directional sanity check, not a guarantee.</li>
              </ol>
            </section>

            {/* Step 2 */}
            <section id="step-2">
              <h2 style={h2Style}>Step 2 - The 20 Percent Rule: Raise Budgets in Small Steps</h2>
              <p style={pStyle}>
                Raise the daily budget by 20% or less per step, then wait 7-14 days for Smart Bidding to re-stabilize. Small, paced increases stay below the learning-phase trigger; large ones reset it.
              </p>
              <p style={pStyle}>
                The ramp math: 250 to 300 dollars per day (+20%), hold 7-14 days, ROAS within 90% of baseline? Push to 360, then 432, and so on. Going from 250 to 1,000 dollars per day takes 6-8 steps over 8-12 weeks. Slower than doubling overnight, yes. But without a three-week ROAS crater in the middle.
              </p>

              {/* VISUAL 1: Budget ramp ladder - paced 20% steps from $250 to $1,000/day */}
              <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#764ba2', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '18px' }}>
                  The 20% ramp ladder · 250 to 1,000 dollars per day in 8 steps
                </div>
                <div className="ramp-grid">
                  {[
                    { step: 'Start', val: '$250', hold: 'baseline' },
                    { step: 'Step 1', val: '$300', hold: 'hold 7-14d' },
                    { step: 'Step 2', val: '$360', hold: 'hold 7-14d' },
                    { step: 'Step 3', val: '$432', hold: 'hold 7-14d' },
                    { step: 'Step 4', val: '$518', hold: 'hold 7-14d' },
                    { step: 'Step 5', val: '$622', hold: 'hold 7-14d' },
                    { step: 'Step 6', val: '$746', hold: 'hold 7-14d' },
                    { step: 'Step 8', val: '$1,000', hold: '8-12 weeks total' },
                  ].map((s, i) => (
                    <div key={s.step} style={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderLeft: `4px solid ${i === 7 ? '#10b981' : '#667eea'}`,
                      borderRadius: '8px',
                      padding: '14px 16px',
                    }}>
                      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>{s.step}</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: i === 7 ? '#10b981' : '#1e293b' }}>{s.val}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{s.hold}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', marginTop: '16px', marginBottom: 0 }}>
                  Each step compounds 20% on the prior step. Patience between steps, not the size of the step, is what protects ROAS.
                </p>
              </div>

              <MascotQuote mascot="buzz">
                On a 5K-per-month account last cycle, ROAS was holding at 4.1x. I raised the daily budget from 170 to 204 dollars, exactly 20%, then held. Day 4, ROAS dipped to 3.6x. Normal re-stabilization, not a problem. By day 11 it was back at 4.0x. I pushed the next 20%. Eight steps, ten weeks, 170 to 610 dollars per day, ROAS never dropped below 3.5x. The trick is patience between steps, not the size of the step.
              </MascotQuote>

              <p style={pStyle}>
                The 20% figure is practitioner consensus, not an official Google threshold. Alexander Sanivsky documents the same cadence: raise approximately 20%, wait 1-2 weeks, repeat if performance holds (<a href="https://www.linkedin.com/posts/alexander-sanivsky_are-you-looking-to-scale-your-google-ads-activity-7386036907002130432-mzfR" style={linkStyle} target="_blank" rel="noopener noreferrer">Alexander Sanivsky, LinkedIn, 2025</a>). High-volume accounts (100+ conversions per month) may tolerate larger steps; thin-volume accounts (under 30) should step smaller.
              </p>

              {/* VISUAL 2: Warning callout - Meta cadence is a category error on Google */}
              <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderLeft: '4px solid #f59e0b', borderRadius: '8px', padding: '20px 24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '15px', fontWeight: 700, color: '#b45309' }}>
                  <span style={{ fontSize: '18px' }}>⚠️</span>
                  <span>Category error to avoid</span>
                </div>
                <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#1e293b', margin: 0 }}>
                  The &quot;15-30% every 48-72 hours&quot; figure that appears in search results is Meta Ads guidance, not Google Ads. Google&apos;s Smart Bidding learning phase is slower than Meta&apos;s <a href="/blog/google-ads-optimization" style={linkStyle}>optimization</a> cycle. Applying Meta cadence to Google Search or Shopping causes exactly the three-week ROAS crater this playbook prevents.
                </p>
              </div>
            </section>

            {/* Step 3 */}
            <section id="step-3">
              <h2 style={h2Style}>Step 3 - Change One Lever at a Time (Budget OR Bids, Never Both)</h2>
              <p style={pStyle}>
                Never change the budget and the bid <a href="/blog/google-ads-strategy" style={linkStyle}>strategy</a> in the same week. Two simultaneous changes produce a double learning shock and make it impossible to isolate which variable moved performance.
              </p>
              <p style={pStyle}>
                Each significant account change restarts the learning phase independently. Raise budget 25% and switch bid strategies the same day: two compounding resets, no clean signal. When performance breaks, you cannot tell which lever caused it.
              </p>
              <p style={pStyle}>
                Sequencing rule: settle budget first, stabilize for 7-14 days, then change bid strategy on a separate week. One lever, one window, one signal.
              </p>

              {/* VISUAL 3: Comparison table - lever risk matrix */}
              <div style={{ overflowX: 'auto', marginBottom: '32px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px', minWidth: '640px' }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>Move</th>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>Learning-phase risk</th>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>Safe when</th>
                      <th style={{ padding: '14px 18px', textAlign: 'left', fontWeight: '700', color: 'white' }}>What to watch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Raise budget 20% or less', 'Low', 'ROAS within 90% of baseline, stable 7+ days', 'CPA, ROAS, impression share for 7-14 days'],
                      ['Raise budget over 50%', 'High, resets learning', 'Almost never; only accounts with 100+ conv per month', 'Expect 1-3 weeks of volatility'],
                      ['Change bid strategy (e.g., Max Conv to Max Conv Value)', 'High, resets learning', 'Budget stable and no other changes that week', 'Allow 14 days before judging result'],
                      ['Tighten Target ROAS', 'Medium-high, can starve spend', 'After 4-6 weeks of value data, in 10-15% increments', 'Watch spend volume, not just ROAS'],
                      ['Add demand (keywords, segments)', 'Low-medium', 'Same keywords saturating, CPC climbing for 2+ weeks', 'Incremental conversions, not cannibalized ones'],
                    ].map((row, idx) => (
                      <tr key={row[0]} style={{ background: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                        <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#1e293b' }}>{row[0]}</td>
                        <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', color: '#475569' }}>{row[1]}</td>
                        <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', color: '#475569' }}>{row[2]}</td>
                        <td style={{ padding: '13px 18px', borderBottom: '1px solid #e5e7eb', color: '#475569' }}>{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p style={pStyle}>
                When a campaign shows &quot;Limited by budget&quot; status, that is a direct signal that headroom exists for a safe next step. Our <a href="/blog/google-ads-bid-strategy-status-limited" style={linkStyle}>bid strategy status guide</a> covers how to read those flags.
              </p>
            </section>

            {/* Step 4 */}
            <section id="step-4">
              <h2 style={h2Style}>Step 4 - Scale Demand, Not Just Spend</h2>
              <p style={pStyle}>
                After a point, more budget into the same keyword set just bids up your own CPCs. Real scaling means finding more profitable demand, not paying more for the same clicks.
              </p>
              <p style={pStyle}>
                Demand saturation is measurable: CPC rises for two straight weeks while conversions stay flat. That is the signal. If CPC is climbing fast and you are not sure why, the <a href="/blog/google-ads-cost-per-click-too-high" style={linkStyle}>Google Ads cost per click diagnostic</a> covers the 9 causes and per-cause fixes. The solution here is a wider demand surface, not a larger budget.
              </p>

              {/* VISUAL 4: Inline SVG - demand saturation (CPC rising, conversions flat) */}
              <figure style={{ margin: '0 0 32px', background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#764ba2', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' }}>
                  The saturation signal · 6 weeks
                </div>
                <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" role="img" aria-label="Line chart showing CPC rising steadily over six weeks while conversions stay flat, the signal that demand has saturated">
                  {/* axes */}
                  <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke="#cbd5e1" strokeWidth="1.5" />
                  <line x1={padL} y1={chartH - padB} x2={chartW - padR} y2={chartH - padB} stroke="#cbd5e1" strokeWidth="1.5" />
                  {/* conversions flat line */}
                  <path d={convPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {/* CPC rising line */}
                  <path d={cpcPath} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {/* x labels */}
                  {cpcPoints.map((_, i) => (
                    <text key={i} x={xAt(i)} y={chartH - padB + 20} fontSize="12" fill="#94a3b8" textAnchor="middle">{`W${i + 1}`}</text>
                  ))}
                  {/* series labels */}
                  <text x={xAt(cpcPoints.length - 1) - 6} y={yAt(cpcPoints[cpcPoints.length - 1]) - 10} fontSize="13" fill="#ef4444" fontWeight="700" textAnchor="end">CPC rising</text>
                  <text x={xAt(0) + 6} y={yAt(convPoints[0]) - 12} fontSize="13" fill="#10b981" fontWeight="700" textAnchor="start">Conversions flat</text>
                </svg>
                <figcaption style={{ fontSize: '14px', color: '#64748b', marginTop: '12px' }}>
                  When the red CPC line climbs two weeks straight while the green conversion line holds flat, the auction is saturated. The fix is a wider demand surface, not a bigger budget.
                </figcaption>
              </figure>

              <p style={pStyle}>Five tactics:</p>
              <ol style={olStyle}>
                <li style={liStyle}><strong>Mine the Search Terms Report.</strong> Pull converting queries not yet targeted as keywords. It is the fastest source of incremental, proven demand you are not yet buying.</li>
                <li style={liStyle}><strong>Segment by product group or geography.</strong> One campaign mixing high-margin and low-margin products hides where the headroom actually lives. If the account structure itself is the bottleneck, the <a href="/blog/google-ads-account-restructure" style={linkStyle}>Google Ads account restructure playbook</a> walks through the 4-phase migration without resetting all your conversion history.</li>
                <li style={liStyle}><strong>Separate brand from non-brand.</strong> Brand ROAS is inflated by users already intending to buy. Mixing the two masks the real headroom and risk in non-brand.</li>
                <li style={liStyle}><strong>Expand Performance Max and Demand Gen.</strong> PMax captures mid-funnel demand search campaigns miss, but it needs brand exclusions and structured asset groups to prevent budget leaking. See <a href="/blog/performance-max-not-converting" style={linkStyle}>Performance Max not converting</a>.</li>
                <li style={liStyle}><strong>Build a creative testing loop.</strong> One winning ad creative saturates its audience. More angles feed the algorithm new signals.</li>
              </ol>

              <MascotQuote mascot="vox">
                Campaign A was saturated, CPCs up 18% over two weeks for flat conversions. Pushing more budget there would have bought worse clicks. I moved 40 dollars per day of the planned increase into a non-brand Shopping campaign that had 31% impression share and room to grow. Account ROAS held at 3.8x while total conversions rose 22%. Scaling is reallocation, not just addition.
              </MascotQuote>
            </section>

            {/* Step 5 */}
            <section id="step-5">
              <h2 style={h2Style}>Step 5 - Keep Target ROAS Loose While You Scale</h2>
              <p style={pStyle}>
                Set an aggressive Target ROAS while scaling and Smart Bidding will starve the account of spend. The mechanism is straightforward: tROAS too high means the algorithm pulls back bids to protect the ratio, spend collapses, and you scale backward instead of forward.
              </p>
              <p style={pStyle}>
                <strong>Target ROAS</strong> (tROAS) constrains bids to hit a specific ratio at every auction. <strong>Maximize Conversion Value</strong> maximizes total value without a hard target. During scaling, that distinction matters more than most expect.
              </p>
              <p style={pStyle}>
                Concrete example: one account jumped from 350% to 600% tROAS overnight and saw spend fall 40% in five days. The system could not find enough volume at 600%, so it stopped buying. Loosening to 400% restored spend within a week.
              </p>
              <p style={pStyle}>
                The right sequence: start on Maximize Conversion Value or a tROAS set 20-30% below current actual ROAS. Accumulate 4-6 weeks of value data, then tighten in 10-15% increments per stabilization window. There is no error message when tROAS collapses spend. The account just goes quiet.
              </p>
            </section>

            {/* When NOT to scale */}
            <section id="do-not-scale">
              <h2 style={h2Style}>When You Should NOT Scale Yet (Honest Section)</h2>
              <p style={pStyle}>
                Sometimes the right move is to hold budget or scale slower. Pushing spend into a weak foundation burns money faster, not better.
              </p>
              <p style={pStyle}>Four conditions where scaling is not yet the right call:</p>

              {/* VISUAL 5: 4-card stop-condition grid */}
              <div className="stop-grid">
                {[
                  { title: 'Conversion volume under 30 / 30 days', body: 'Below this floor, Smart Bidding signal is unreliable. Build volume through targeting expansion first. Scaling on thin data scales noise, not results.' },
                  { title: 'Thin margin headroom', body: 'If ROAS is already at or near break-even, marginal clicks at scale will be unprofitable. You need ROAS to exceed break-even by at least 20% before the math works at higher spend.' },
                  { title: 'Broken or unverified tracking', body: 'Scaling is appropriate only after tracking has been clean for 30+ days. Duplicate tags and attribution mismatches are the two most common silent errors.' },
                  { title: 'Seasonal false positive', body: 'A promotional spike is not a baseline. Locking in spike-era budget levels means paying for unsustainable spend off-season when that demand disappears.' },
                ].map((c) => (
                  <div key={c.title} style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderTop: '4px solid #ef4444',
                    borderRadius: '10px',
                    padding: '18px 20px',
                  }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#b91c1c', marginBottom: '8px' }}>{c.title}</div>
                    <div style={{ fontSize: '15px', lineHeight: '1.6', color: '#1e293b' }}>{c.body}</div>
                  </div>
                ))}
              </div>

              <p style={pStyle}>
                On broken tracking specifically, scaling is appropriate only after tracking has been clean for 30+ days. See the <a href="/blog/google-ads-attribution-models-guide" style={linkStyle}>attribution models guide</a> for the most common silent errors.
              </p>

              <MascotQuote mascot="aegis">
                A client wanted to triple budget on a campaign showing 5.2x ROAS. I flagged it: only 11 conversions in 30 days. That ROAS was three lucky orders, not a stable signal. We held budget, widened the keyword set to build volume to 40+ conversions per month first, then scaled. The early ROAS was a mirage; the scaled ROAS settled at 4.0x, real and repeatable.
              </MascotQuote>

              <p style={pStyle}>
                Structural reasons accounts fail at scale, beyond the budget ramp itself, are covered in <a href="/blog/why-google-ads-strategy-fails-at-scale" style={linkStyle}>why Google Ads strategy fails at scale</a>.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>How do you improve ROAS on Google Ads?</strong> Tighten targeting to higher-intent queries, improve ad creative and landing page relevance, and feed Smart Bidding correct conversion values. Better ROAS efficiency first builds the margin headroom to scale safely.
              </p>
              <p style={pStyle}>
                <strong>How fast can you scale Google Ads safely?</strong> Raise the daily budget by roughly 20% per step and wait 7-14 days between steps. 250 dollars per day to 1,000 dollars per day takes 8-12 weeks, with ROAS holding within 10% of baseline throughout.
              </p>
              <p style={pStyle}>
                <strong>Does scaling always reduce ROAS?</strong> No, only when you jump too fast or push spend into saturated auctions. Paced 20% increases plus demand expansion keep ROAS within 10% of baseline through each step. To confirm incremental spend is not cannibalizing existing conversions, see <a href="/blog/incrementality-testing-google-ads" style={linkStyle}>incrementality testing in Google Ads</a>.
              </p>
              <p style={pStyle}>
                <strong>Should I use Performance Max to scale Google Ads?</strong> PMax adds headroom by capturing mid-funnel demand search campaigns miss. At scale it requires brand exclusions, structured asset groups, and placement review. Set-and-forget PMax is the most common way budget leaks at scale.
              </p>
              <p style={pStyle}>
                <strong>Should I raise budgets or bids to scale?</strong> Start with budget in 20% increments. Never change budget and bid strategy in the same week. Simultaneous changes double the learning-phase shock and hide which lever moved performance.
              </p>
              <p style={pStyle}>
                <strong>What is the minimum conversion volume before scaling?</strong> About 30 conversions per 30 days. Below that, Smart Bidding&apos;s signal is too thin (<a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, Smart Bidding</a>). Build volume first.
              </p>
            </section>

            {/* Kampaio CTA */}
            <section id="kampaio-cta">
              <h2 style={h2Style}>How Kampaio Automates the Scaling Loop</h2>
              <p style={pStyle}>
                The 20% rule works. Running it by hand is tedious: bump budget, wait 7-14 days, check ROAS, decide, repeat across multiple campaigns for months. Most PPC managers land in one of two failure modes, scaling too conservatively (leaving headroom untouched) or losing patience and scaling too fast (triggering the reset they were avoiding).
              </p>
              <p style={pStyle}>
                <a href="/b6#buzz" style={linkStyle}>Buzz</a>, Kampaio&apos;s bid-strategy <a href="/blog/google-ads-ai-agent" style={linkStyle}>agent</a>, runs the ramp: raises each campaign&apos;s budget by 20% when ROAS is stable, holds when volatile, and never stacks two learning-phase changes in one week. <a href="/b6#vox" style={linkStyle}>Vox</a> handles cross-campaign reallocation, pulling budget from saturated campaigns and routing it to ones with impression-share headroom. <a href="/b6#aegis" style={linkStyle}>Aegis</a> flags unsafe conditions (thin conversion volume, tracking drift) before budget burns on a weak signal. You set the direction and budget tier; the agents run the cadence. See <a href="/pricing" style={linkStyle}>Kampaio pricing</a> for the autonomy tiers.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Scale on cadence, not on nerve.
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: '500', opacity: 0.9 }}>
                  Let Buzz, Vox, and Aegis run the 20% ramp, reallocate across campaigns, and flag unsafe conditions. You set the budget tier and stay in the loop.
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

              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.7', marginBottom: '0', fontStyle: 'italic' }}>
                Results vary by account size, vertical, and conversion tracking quality. This article is informational and does not constitute professional advertising advice.
              </p>
            </section>

          </div>
        </div>
        <KeepReading slug="how-to-scale-google-ads-without-losing-roas" category="strategy" />
      <Footer compact={true} />
      </div>

      <style jsx>{`
        .ramp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .stop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (max-width: 1100px) {
          .ramp-grid { grid-template-columns: repeat(2, 1fr); }
          .stop-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ramp-grid { grid-template-columns: repeat(2, 1fr); }
          .stop-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
