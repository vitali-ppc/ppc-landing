'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import ArticleHero from '../../../components/blog/ArticleHero';
import KeepReading from '../../../components/blog/KeepReading';
import MascotQuote from '../../../components/blog/MascotQuote';
import { BigStat, StackedBar, Heatmap, CompareGrid, Callout, KeyTakeaways, Steps, Step } from '../../../components/blog/primitives';

export default function ArticleContent() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.kampaio.com/blog/target-roas-underperforming-after-google-update#article',
    headline: 'Target ROAS Underperforming After a Google Update? The Test',
    description: 'Target ROAS underperforming after a Google update? Run this diagnostic to tell the Aug 17 auction change from a real problem, then fix the right thing.',
    image: 'https://www.kampaio.com/og/target-roas-underperforming-after-google-update.png',
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
    datePublished: '2026-09-07',
    dateModified: '2026-09-07',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.kampaio.com/blog/target-roas-underperforming-after-google-update',
    },
    keywords: 'Target ROAS, Target CPA, Smart Bidding, budget-limited campaigns, bid strategy, Google Ads August 2026 update, ROAS drop, Performance Max, Demand Gen, conversion cycle',
    wordCount: 2055,
    articleSection: 'Google Ads',
    inLanguage: 'en',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Target ROAS broken after the Google Ads update?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Google intentionally changed how budget-limited Target ROAS and Target CPA campaigns optimize from August 17, 2026: campaigns beating target now perform closer to the typed-in number. Some "is Target ROAS broken" discussion predates the rollout by two weeks: anticipation, not confirmed breakage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I lower my Target ROAS after the August 17 change?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Only if the three tells confirm the change caused your drop: reset once to your actual pre-August-17 performance (via the Conv. value/cost column) and hold, rather than cutting an arbitrary percentage. If unconfirmed, the general percentage-cut playbook for other causes still applies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long do I wait before judging a Target ROAS change?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Google says wait 1-2 conversion cycles: roughly two to four weeks for most SMB accounts, our own estimate, not Google's number. Amsive's first-week data covers only seven days, an early signal, not a verdict.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is a good Target ROAS for Google Ads?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "There's no universal \"good\" number; a workable target reflects your account's own actual conversion value per cost, not an aspirational figure. Check it via the Conv. value/cost column before setting or resetting a target.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Target ROAS formula?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Target ROAS equals conversion value divided by cost, multiplied by 100. Add the Conv. value/cost column to your performance table and multiply by 100.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Target CPA affected differently than Target ROAS by this change?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Amsive's first-week measurement (Aug 17-23, 2026, vs. the prior 3-week average): Target CPA Search stayed close to baseline; Target ROAS got more clicks at lower CPC but less value; the overall value-based group was down roughly 32%, ecommerce/retail down 29% to 35%.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.kampaio.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.kampaio.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Target ROAS Underperforming After a Google Update? The Test',
        item: 'https://www.kampaio.com/blog/target-roas-underperforming-after-google-update',
      },
    ],
  };

  const tableOfContents = [
    { id: 'quick-answer', title: 'Quick Answer: Is the August 17 Change Behind Your Drop', level: 1 },
    { id: 'what-changed', title: 'What Changed on August 17, 2026', level: 1 },
    { id: 'campaign-type', title: 'Is Your Campaign Even the Type This Touches', level: 1 },
    { id: 'three-tells', title: 'What a Bid-Strategy Watcher Checks First', level: 1 },
    { id: 'somewhere-else', title: 'The Tells That Point Somewhere Else', level: 1 },
    { id: 'first-week', title: 'What the First Week Actually Showed', level: 1 },
    { id: 'the-fix', title: 'What to Do If It Is the Change', level: 1 },
    { id: 'how-long', title: 'How Long Should You Wait Before Judging', level: 1 },
    { id: 'faq', title: 'Frequently Asked Questions', level: 1 },
    { id: 'cta', title: 'Stop Guessing Which Cause It Is', level: 1 },
    { id: 'sources', title: 'Sources', level: 1 },
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

  return (
    <>
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
          <ArticleHero slug="target-roas-underperforming-after-google-update" />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · Smart Bidding
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
              Target ROAS Underperforming After a Google Update? The Test
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Run this diagnostic to tell the Aug 17 auction change from a real problem, then fix the right thing.
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
                  <span style={{ color: '#64748b', fontSize: '15px' }}>September 7, 2026 · 10 min read</span>
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

            <p style={pStyle}>
              Target ROAS underperforms after a Google update when your budget-limited campaign was already beating its target before August 17, 2026, and Google&apos;s new bidding rules pull it back toward the number you typed in. Three tells confirm the cause in minutes.
            </p>

            {/* Quick Answer */}
            <section id="quick-answer">
              <h2 style={h2Style}>Quick Answer: Is the August 17 Change Behind Your Drop</h2>
              <p style={pStyle}>
                Yes, a real Google change is behind this, but only if your campaign was budget-limited and already beating its target before August 17, 2026; if either is false, look elsewhere first.
              </p>
              <KeyTakeaways items={[
                'Google changed how budget-limited Target CPA/Target ROAS campaigns optimize, starting Aug 17, 2026.',
                'Only matters if budget-limited and running ahead of target before that date.',
                'Amsive, first week: Target ROAS down 29-35% on budget-constrained retail accounts; Target CPA held near baseline.',
                "Fix, if it's the change: reset to your real pre-change number, then hold.",
              ]} />
            </section>

            {/* What Changed */}
            <section id="what-changed">
              <h2 style={h2Style}>What Changed on August 17, 2026</h2>
              <p style={pStyle}>
                Google stopped letting budget-limited Target CPA and Target ROAS campaigns over-deliver: starting August 17, 2026, they optimize closer to what you typed in, not what you were quietly beating (<a href="https://support.google.com/google-ads/answer/17061251" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
              </p>
              <p style={pStyle}>
                Google&apos;s example: &quot;If your campaign&apos;s Target CPA is $10, but your recent actual CPA performance is $5, your campaign will deliver more closely to a $10 actual CPA starting August 17, 2026.&quot;
              </p>
              <p style={pStyle}>
                The same applies to Target ROAS and Target CPC on Demand Gen (<a href="https://support.google.com/google-ads/answer/17125145" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>); the gap closes now, not gradually. That&apos;s the mechanism. Whether it actually touches your account comes down to two things: campaign type, and whether you were budget-limited to begin with.
              </p>
            </section>

            {/* Campaign type */}
            <section id="campaign-type">
              <h2 style={h2Style}>Is Your Campaign Even the Type This Touches</h2>
              <p style={pStyle}>
                This change only reaches budget-limited campaigns on Target CPA or Target ROAS.
              </p>
              <p style={pStyle}>
                <strong>Affected:</strong> Search, Shopping, Performance Max, Demand Gen, Travel (plus SA360 and DV360 for agencies).
              </p>
              <p style={pStyle}>
                <strong>Not affected:</strong> budget-unlimited campaigns of any type, App, Video Reach, Video View, Hotel, Display.
              </p>
              <p style={pStyle}>
                If your account sits entirely in that second list, treat this article as background reading, not urgent reading.
              </p>
              <p style={pStyle}>
                &quot;Limited by budget&quot; means your campaign could spend more if the daily cap were raised; check <a href="/blog/google-ads-not-spending-full-budget" style={linkStyle}>what &quot;Limited by budget&quot; looks like in your account</a> if unsure. Performance Max confuses owners most, since <a href="/blog/performance-max-not-converting" style={linkStyle}>how budget size affects Performance Max bidding</a> covers underfunding, a budget too small for Smart Bidding&apos;s ~30-conversion threshold: the opposite problem. Different failure mode, same panic.
              </p>
              <p style={pStyle}>
                Maximize Conversions with no target, Display, and campaigns that never hit their cap are untouched: skip to &quot;The Tells That Point Somewhere Else&quot; if any describe your account.
              </p>
            </section>

            {/* Three tells */}
            <section id="three-tells">
              <h2 style={h2Style}>What a Bid-Strategy Watcher Checks First</h2>
              <p style={pStyle}>
                Three checks, run in order, tell you whether this is the Aug 17 change or something else entirely.
              </p>
              <p style={pStyle}>
                Buzz, kampaio&apos;s bid-strategy agent, runs this sequence on every account it watches; a human running it by hand gets the same answer, no agent required, just paper and patience.
              </p>
              <p style={pStyle}>
                <strong>Tell 1: budget-limited and beating target before August 17.</strong> The pre-change gap size roughly predicts the size of the hit now, per Google&apos;s $10/$5 example above.
              </p>
              <p style={pStyle}>
                <strong>Tell 2: CPC flat or down, but value per click fell.</strong> Amsive measured this exact signature in budget-constrained Target ROAS campaigns: they &quot;delivered more clicks at a lower CPC, but those clicks produced less value and ROAS declined&quot; (<a href="https://www.amsive.com/insights/digital-media/google-changed-the-rules-on-tcpa-and-troas-the-auction-is-still-catching-up/" style={linkStyle} target="_blank" rel="noopener noreferrer">Amsive, 2026</a>), Aug 17-23, 2026 vs. the average of Jul 27-Aug 16, 2026.
              </p>
              <p style={pStyle}>
                <strong>Tell 3: conversion rate dropped with no account-side edit</strong> in that window: no new ad, no landing page, no tracking change.
              </p>
              <CompareGrid columns={[
                { name: 'Target CPA', bestFor: 'held close to baseline', traits: [{ label: 'CPA stayed near pre-change baseline', has: true }, { label: 'Sharp ROAS decline observed', has: false }] },
                { name: 'Target ROAS', bestFor: 'more volatile this week', traits: [{ label: 'Delivered more clicks at lower CPC', has: true }, { label: 'Value per click fell, ROAS down 32% overall, Aug 17-23 vs. Jul 27-Aug 16', has: true }], highlight: true },
              ]} />
              <MascotQuote mascot="buzz">
                Budget-limited campaigns took close to 80% of the post-change spend in the first week, and they paid more per click for fewer clicks. If that&apos;s your account, reset the target to what you were actually running before Aug 17, not the number you wished you were hitting.
              </MascotQuote>
              <p style={pStyle}>
                All three true: the Aug 17 change is likely your answer. Any one false: check the next section.
              </p>
            </section>

            {/* Somewhere else */}
            <section id="somewhere-else">
              <h2 style={h2Style}>The Tells That Point Somewhere Else</h2>
              <p style={pStyle}>
                Four signs point to a different cause. Chase the wrong one and you burn a week you could spend fixing the real problem.
              </p>
              <p style={pStyle}>
                <strong>Tell 1:</strong> the campaign had budget headroom, not budget-limited to begin with.
              </p>
              <p style={pStyle}>
                <strong>Tell 2:</strong> actual performance already tracked close to target before August 17, so there was no gap to correct.
              </p>
              <p style={pStyle}>
                <strong>Tell 3:</strong> the drop started on a date that isn&apos;t mid-August. Check the exact day, not just &quot;this month.&quot;
              </p>
              <p style={pStyle}>
                <strong>Tell 4:</strong> something else changed at the same time: tracking, a product feed, a landing page, a paused ad, or an aggressive new competitor.
              </p>
              <p style={pStyle}>
                Daniel Feldman (@mrfeldmanSEM), July 14, 2026, before the Aug 17 change existed, described this trap: &quot;ROAS fell off, CPCs looked normal, nothing in the account had been touched... They&apos;d sold through their best-selling SKU, and google kept spending like it was in stock&quot; (<a href="https://x.com/mrfeldmanSEM/status/2077169791517839447" style={linkStyle} target="_blank" rel="noopener noreferrer">Daniel Feldman, 2026</a>). The cause was a feed outage, not a bidding change. Same symptoms, completely different fix.
              </p>
              <p style={pStyle}>
                None of the four tells fit? Turn to <a href="/blog/google-ads-roas-dropped-suddenly" style={linkStyle}>if your ROAS dropped for a different reason</a>: five other causes (tracking, signal starvation, pMax drift, new competitor, market shift), each with a 10-30% Target ROAS cut, for a cause not yet identified. Once the tells above confirm the Aug 17 change, reset once to your real number and hold, instead of shaving a percentage on a schedule.
              </p>
            </section>

            {/* First week data */}
            <section id="first-week">
              <h2 style={h2Style}>What the First Week Actually Showed</h2>
              <p style={pStyle}>
                Amsive measured the first week (Aug 17-23, 2026, vs. the average of Jul 27-Aug 16, 2026): Target ROAS and Target CPA moved in different directions. This is the data behind the tells above, broken down by vertical and match type.
              </p>
              <BigStat
                value="29-35%"
                label="ROAS decline, retail"
                claim="drop across the comparable Target ROAS retail campaigns Amsive reviewed, Aug 17-23 2026 vs. the Jul 27-Aug 16 baseline."
                source="Source: Amsive, 2026"
              />
              <p style={pStyle}>
                Across comparable Target ROAS retail campaigns Amsive reviewed, ROAS declined roughly 29% to 35% over that Aug 17-23, 2026 vs. Jul 27-Aug 16 window (<a href="https://www.amsive.com/insights/digital-media/google-changed-the-rules-on-tcpa-and-troas-the-auction-is-still-catching-up/" style={linkStyle} target="_blank" rel="noopener noreferrer">Amsive, 2026</a>), an early signal from a small sample, not a retail-wide benchmark.
              </p>
              <p style={pStyle}>
                The overall Target ROAS/value-based group in Search (not ecommerce-specific) declined roughly 32% over that same Aug 17-23 vs. Jul 27-Aug 16 window; Target CPA Search stayed close to baseline.
              </p>
              <p style={pStyle}>
                Search overall, Aug 17-23, 2026 vs. Jul 27-Aug 16: CPC +4%, conversion rate -15%, CPA +21%, spend and clicks flat. Budget-constrained campaigns took close to 80% of post-change dollars in that same window.
              </p>
              <StackedBar
                bars={[{ label: 'Post-change Search spend', segments: [{ label: 'Budget-constrained campaigns', value: 80 }, { label: 'Budget-unconstrained', value: 20 }] }]}
                source="Source: Amsive, Aug 17-23 2026 vs. prior 3-week baseline"
              />
              <p style={pStyle}>
                Vertical CPA increases, Aug 17-23, 2026 vs. Jul 27-Aug 16, all approximate: financial services +30%, B2B technology +28-34%, healthcare +29%, home services +22%, senior living +8%, insurance +5%.
              </p>
              <Heatmap
                columns={['Financial services', 'B2B tech', 'Healthcare', 'Home services', 'Senior living', 'Insurance']}
                rows={[{ label: 'CPA increase %', values: [30, 31, 29, 22, 8, 5] }]}
                max={35}
                legend={['Lower impact', 'Higher impact']}
                source="Source: Amsive, Aug 17-23 2026 vs. prior baseline"
              />
              <p style={pStyle}>
                Match type used a narrower window, Aug 17-23 vs. Aug 10-16, 2026 (Amsive&apos;s methodology note): exact became more expensive; broad and phrase converted less often. That&apos;s the shape of the damage. The fix itself is simpler than the data above might suggest.
              </p>
            </section>

            {/* The fix */}
            <section id="the-fix">
              <h2 style={h2Style}>What to Do If It Is the Change</h2>
              <p style={pStyle}>
                Reset the target to your pre-change actual number, not your old aspirational one, then leave it alone.
              </p>
              <Callout variant="warning" title="Reset to your actual, not your old target">
                Setting the target back to your pre-change aspirational number recreates the same gap the algorithm is now closing. Reset to your real 30-day pre-Aug-17 number instead.
              </Callout>
              <p style={pStyle}>
                The order below matters almost as much as the number itself.
              </p>
              <Steps>
                <Step title="Get your real pre-change number">
                  Pull your actual CPA/ROAS from the 30 days before Aug 17, 2026, not after. Add the Conv. value/cost column (x100 for ROAS%), or check Avg. target ROAS vs. Actual ROAS in your bid strategy report (<a href="https://support.google.com/google-ads/answer/6268637" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>).
                </Step>
                <Step title="Set the target to it">
                  Set the target to that real number, or slightly better, per Google&apos;s recommendation.
                </Step>
                <Step title="Do CPA and ROAS separately">
                  Reset Target CPA and Target ROAS separately. Amsive&apos;s data shows they moved differently.
                </Step>
                <Step title="Then wait out a full cycle">
                  Don&apos;t touch it again for a full conversion cycle. See the next section.
                </Step>
              </Steps>
              <MascotQuote mascot="aegis">
                Amsive&apos;s numbers come from one week against a three-week baseline. That is enough to confirm the pattern, not enough to set a permanent target. Reset once, then wait.
              </MascotQuote>
              <p style={pStyle}>
                Target ROAS needs at least 50 conversions in 30 days for a reliable read (<a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>, via <a href="/blog/google-ads-smart-bidding-strategies" style={linkStyle}>how Smart Bidding reacts to target changes</a>); a target beyond what data supports restricts delivery either way. See <a href="/blog/google-ads-ai-vs-manual-bidding" style={linkStyle}>AI bidding vs. setting the target yourself</a> if you&apos;d rather set it yourself.
              </p>
              <p style={pStyle}>
                No practitioner has published a completed reset with before/after numbers, only intentions. Treat this as Google&apos;s recommendation, not a guaranteed result.
              </p>
            </section>

            {/* How long */}
            <section id="how-long">
              <h2 style={h2Style}>How Long Should You Wait Before Judging</h2>
              <p style={pStyle}>
                Wait a full conversion cycle before judging, not the seven days Amsive&apos;s first-look data covers.
              </p>
              <p style={pStyle}>
                Google&apos;s guidance: &quot;When you change targets, the bidder will react immediately but will need some time to hit the new target (give it 1-2 conversion cycles)&quot; (<a href="https://support.google.com/google-ads/answer/6268637" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>). Google never defines a conversion cycle in days; our own plain-English translation is roughly two to four weeks for most SMB accounts.
              </p>
              <p style={pStyle}>
                Two calibration points matter here. First, the rollout ran from August 17 to August 27, 2026 (<a href="https://support.google.com/google-ads/answer/17125145" style={linkStyle} target="_blank" rel="noopener noreferrer">Google Ads Help, 2026</a>), so Amsive&apos;s Aug 17-23 read straddles the rollout and is a mid-rollout snapshot, not a fully-live-state measurement. Second, if performance is still off after a full cycle, either the reset was wrong or the cause was never the Aug 17 change: go back to &quot;The Tells That Point Somewhere Else.&quot;
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 style={h2Style}>Frequently Asked Questions</h2>
              <p style={pStyle}>
                <strong>Is Target ROAS broken after the Google Ads update?</strong><br />
                No. Google intentionally changed how budget-limited Target ROAS and Target CPA campaigns optimize from August 17, 2026: campaigns beating target now perform closer to the typed-in number. Some &quot;is Target ROAS broken&quot; discussion predates the rollout by two weeks: anticipation, not confirmed breakage.
              </p>
              <p style={pStyle}>
                <strong>Should I lower my Target ROAS after the August 17 change?</strong><br />
                Only if the three tells confirm the change caused your drop: reset once to your actual pre-August-17 performance (via the Conv. value/cost column) and hold, rather than cutting an arbitrary percentage. If unconfirmed, the general percentage-cut playbook for other causes still applies.
              </p>
              <p style={pStyle}>
                <strong>How long do I wait before judging a Target ROAS change?</strong><br />
                Google says wait 1-2 conversion cycles: roughly two to four weeks for most SMB accounts, our own estimate, not Google&apos;s number. Amsive&apos;s first-week data covers only seven days, an early signal, not a verdict.
              </p>
              <p style={pStyle}>
                <strong>What is a good Target ROAS for Google Ads?</strong><br />
                There&apos;s no universal &quot;good&quot; number; a workable target reflects your account&apos;s own actual conversion value per cost, not an aspirational figure. Check it via the Conv. value/cost column before setting or resetting a target.
              </p>
              <p style={pStyle}>
                <strong>What is the Target ROAS formula?</strong><br />
                Target ROAS equals conversion value divided by cost, multiplied by 100. Add the Conv. value/cost column to your performance table and multiply by 100.
              </p>
              <p style={pStyle}>
                <strong>How is Target CPA affected differently than Target ROAS by this change?</strong><br />
                Amsive&apos;s first-week measurement (Aug 17-23, 2026, vs. the prior 3-week average): Target CPA Search stayed close to baseline; Target ROAS got more clicks at lower CPC but less value; the overall value-based group was down roughly 32%, ecommerce/retail down 29% to 35%.
              </p>
            </section>

            {/* CTA */}
            <section id="cta">
              <h2 style={h2Style}>Stop Guessing Which Cause It Is</h2>
              <p style={pStyle}>
                Buzz checks budget-limited status, the target-vs-actual gap, and CPC-versus-value-per-click movement automatically, then flags whether your account is the Aug 17 bucket or something else, before you spend a week guessing. That&apos;s the whole diagnostic: run once, in order, before you touch a target field. See more <a href="/blog/google-ads-optimization" style={linkStyle}>google ads optimization guides</a>, or <a href="/chat" style={linkStyle}>start with B6</a>.
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px',
              }}>
                <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', marginBottom: '18px', lineHeight: '1.3' }}>
                  Not sure whether it was the update or your account?
                </h3>
                <p style={{ fontSize: '17px', color: '#64748b', marginBottom: '28px', lineHeight: '1.6', fontWeight: '500', opacity: 0.9 }}>
                  Connect Google Ads, and Buzz runs the three tells on every Target CPA and Target ROAS campaign you have, then tells you which bucket each one is in.
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
                >
                  Run the Three Tells
                </a>
              </div>
            </section>

            {/* Sources */}
            <section id="sources">
              <h2 style={{ ...h2Style, fontSize: '24px' }}>Sources</h2>
              <ol style={{ fontSize: '16px', color: '#475569', lineHeight: '1.7', paddingLeft: '24px', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                <li style={{ marginBottom: '10px' }}>Google Ads Help, 2026: change mechanics. <a href="https://support.google.com/google-ads/answer/17061251" style={linkStyle} target="_blank" rel="noopener noreferrer">support.google.com/google-ads/answer/17061251</a></li>
                <li style={{ marginBottom: '10px' }}>Google Ads Help, 2026: rollout timeline. <a href="https://support.google.com/google-ads/answer/17125145" style={linkStyle} target="_blank" rel="noopener noreferrer">support.google.com/google-ads/answer/17125145</a></li>
                <li style={{ marginBottom: '10px' }}>Google Ads Help, 2026: Target ROAS mechanics. <a href="https://support.google.com/google-ads/answer/6268637" style={linkStyle} target="_blank" rel="noopener noreferrer">support.google.com/google-ads/answer/6268637</a></li>
                <li style={{ marginBottom: '10px' }}>Google Ads Help, 2026: Smart Bidding floor. <a href="https://support.google.com/google-ads/answer/7065882" style={linkStyle} target="_blank" rel="noopener noreferrer">support.google.com/google-ads/answer/7065882</a></li>
                <li style={{ marginBottom: '10px' }}>Amsive, 2026: first-week data. <a href="https://www.amsive.com/insights/digital-media/google-changed-the-rules-on-tcpa-and-troas-the-auction-is-still-catching-up/" style={linkStyle} target="_blank" rel="noopener noreferrer">amsive.com/insights/digital-media/google-changed-the-rules-on-tcpa-and-troas-the-auction-is-still-catching-up</a></li>
                <li style={{ marginBottom: '10px' }}>Daniel Feldman (@mrfeldmanSEM), X, 2026: non-Google cause example. <a href="https://x.com/mrfeldmanSEM/status/2077169791517839447" style={linkStyle} target="_blank" rel="noopener noreferrer">x.com/mrfeldmanSEM/status/2077169791517839447</a></li>
              </ol>
            </section>

          </div>
        </div>
        <KeepReading slug="target-roas-underperforming-after-google-update" category="google-ads" />
        <Footer compact={true} />
      </div>
    </>
  );
}
