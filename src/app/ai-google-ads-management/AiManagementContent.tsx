'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Two layers people conflate. Google's AI sets bids inside the auction; a
// management layer decides what happens to the account around it. Kampaio is
// the second one and does not replace the first.
const LAYERS = [
  {
    label: "Google's own AI, already on",
    items: [
      'Smart Bidding setting individual bids in the auction, in real time',
      'Performance Max choosing placements and assets across inventory',
      'Broad match deciding which queries are close enough to yours',
    ],
    note: 'You do not install this and you cannot opt out of most of it. The question is never whether to use it, only what to feed it and what to watch.',
  },
  {
    label: 'A management layer on top',
    items: [
      'Watching the account continuously instead of when someone logs in',
      'Noticing a spend or conversion anomaly on the day it starts',
      'Proposing account-level changes with the reasoning attached',
      'Reviewing each proposal for risk before anything executes',
    ],
    note: 'This is the layer Kampaio runs. Today that means two agents on live accounts: Buzz for bidding work and Aegis for risk review. The rest ship as the cabinet grows.',
  },
];

// Decisions we deliberately keep with the human, stated plainly.
const NOT_AUTOMATED = [
  'What the account is optimising for in business terms',
  'Whether a drop is worth reacting to or is normal variance you should sit through',
  'Offer, creative and landing page, where most of the real upside lives',
  'Anything irreversible, without your approval',
];

const CORPUS = [
  { slug: 'how-ai-is-transforming-google-ads-in-2025', title: 'How AI is Transforming Google Ads in 2026' },
  { slug: 'google-ads-ai-vs-manual-bidding', title: 'Google Ads AI vs Manual Bidding: How to Decide (with Real Data)' },
  { slug: 'google-ai-ads', title: 'Google AI Ads: What Google Turned On in Your Account, and What to Keep vs Kill' },
  { slug: 'google-ads-ai-max', title: 'Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)' },
  { slug: 'ai-powered-ppc-optimization-complete-guide', title: 'AI-Powered PPC Optimization: The Complete Guide for Senior PPC Managers' },
  { slug: '10-ai-powered-ppc-optimization-strategies', title: '10 AI-Powered PPC Optimization Strategies That Actually Work' },
  { slug: '5-tips-for-working-with-ai-ppc-tools', title: 'Using AI for PPC: 5 Tips for Better Campaigns' },
  { slug: 'ai-powered-ppc-platform', title: 'AI-Powered PPC Platform: How to Evaluate One Before You Buy (2026)' },
  { slug: 'chatgpt-google-ads', title: 'ChatGPT for Google Ads: What It Does Well, Where It Falls Short' },
  { slug: 'google-ads-ai-content-labels', title: 'Google Ads AI Content Labels: What to Do Now' },
  { slug: 'incrementality-testing-google-ads', title: 'Incrementality Testing in Google Ads: What It Measures and How to Run One' },
  { slug: 'opteo-alternative', title: 'Opteo Alternatives 2026: Verified Pricing and Picks' },
];

const wrap: React.CSSProperties = { maxWidth: '1000px', margin: '0 auto', padding: '0 24px' };

export default function AiManagementContent() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Header />

      <section style={{ background: 'white', padding: '96px 0', textAlign: 'center' }}>
        <div style={wrap}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h1
              style={{
                fontSize: 'clamp(34px, 5vw, 56px)',
                fontWeight: 800,
                color: '#1e293b',
                marginBottom: '24px',
                lineHeight: 1.2,
              }}
            >
              AI is already running your Google Ads
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#475569', marginBottom: '24px' }}>
              Smart Bidding, Performance Max and broad match have been making decisions in your
              account for years. What is missing is not more AI inside the auction. It is something
              watching the account around it.
            </p>
            <div
              style={{
                display: 'inline-block',
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'rgba(102, 126, 234, 0.08)',
                border: '1px solid rgba(102, 126, 234, 0.25)',
                color: '#374151',
                fontSize: '15px',
                lineHeight: 1.55,
                textAlign: 'left',
                maxWidth: '580px',
              }}
            >
              <strong style={{ color: '#1e293b' }}>Kampaio does not replace Smart Bidding.</strong>{' '}
              It sits above it: monitoring, flagging, and proposing account-level changes that you
              approve. Founding access is free while billing is not open.
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '32px' }}>
            Two layers people mix up
          </h2>
          <div style={{ display: 'grid', gap: '18px' }}>
            {LAYERS.map((layer) => (
              <div
                key={layer.label}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '14px' }}>
                  {layer.label}
                </div>
                <ul style={{ margin: '0 0 14px', paddingLeft: '20px', color: '#475569', fontSize: '16px', lineHeight: 1.7 }}>
                  {layer.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: '#64748b' }}>{layer.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            What stays with you
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '760px', marginBottom: '20px' }}>
            A management layer that hides its reasoning is just another black box on top of the one
            you already have. These decisions are yours, by design.
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '16px', lineHeight: 1.8, maxWidth: '760px' }}>
            {NOT_AUTOMATED.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            Read before you buy anything
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', marginBottom: '32px', maxWidth: '720px' }}>
            Twelve pieces on what Google turned on in your account, where its AI beats manual work,
            where it does not, and how to evaluate a platform before paying for one.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
            {CORPUS.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    display: 'block',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    color: '#1e293b',
                    fontSize: '16px',
                    lineHeight: 1.5,
                    textDecoration: 'none',
                  }}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            See what it proposes on your account
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '620px', margin: '0 auto 28px' }}>
            Connect through OAuth, watch what Buzz flags and what Aegis blocks, approve nothing you
            do not want. The account stays in your name throughout.
          </p>
          <Link
            href="/auth/register"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '17px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Start free
          </Link>
        </div>
      </section>

      <Footer compact={true} />
    </div>
  );
}
