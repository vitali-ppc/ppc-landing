'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Everything a Google Ads agency actually does, split by whether software can
// carry it today. Written from what Kampaio ships right now, not the roadmap.
const COVERAGE = [
  {
    job: 'Watching the account every day',
    verdict: 'software',
    detail:
      'This is the part retainers charge most for and the part a human does least well. Monitoring runs continuously instead of at whatever hour someone opens the account.',
  },
  {
    job: 'Catching spend anomalies before month end',
    verdict: 'software',
    detail:
      'A cost spike matters on the day it starts, not in the monthly report. This is a threshold check, and machines keep thresholds better than calendars do.',
  },
  {
    job: 'Routine bid and budget adjustments',
    verdict: 'software',
    detail:
      'Rules-driven work with a clear success measure. Buzz proposes the change and shows the reasoning before anything executes.',
  },
  {
    job: 'Reviewing changes for risk before they go live',
    verdict: 'software',
    detail:
      'Aegis reads every proposed change and blocks the ones that look dangerous. You still approve; nothing runs behind your back.',
  },
  {
    job: 'Deciding what the business is actually optimising for',
    verdict: 'human',
    detail:
      'Whether you want volume, margin, or a specific lead type is a business call. No tool can read that off your account.',
  },
  {
    job: 'Creative, offer, and landing page strategy',
    verdict: 'human',
    detail:
      'The biggest wins in most accounts are not in the bidding. They are in what you are selling and how you say it, and that is still people work.',
  },
  {
    job: 'Arguing with a stakeholder who wants the wrong metric',
    verdict: 'human',
    detail:
      'A good agency earns its fee here. If this is the value you get, software is not your replacement.',
  },
];

// The strategy cluster: 13 published articles, linked as they are titled.
const CORPUS = [
  { slug: 'google-ads-without-agency', title: "Google Ads Without an Agency: When DIY Works (and Doesn't)" },
  { slug: 'google-ads-agency-guide', title: 'Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives' },
  { slug: 'how-to-choose-a-ppc-agency', title: "How to Choose a PPC Agency (and How to Know When You Don't Need One)" },
  { slug: 'google-ads-agency-pricing', title: 'Google Ads Agency Pricing: What Agencies Charge and Which Model Fits You (2026)' },
  { slug: 'google-ads-consultant-cost', title: 'Google Ads Consultant Cost: What to Pay (and When Software or DIY Beats Hiring One)' },
  { slug: 'google-ads-consultant', title: 'Google Ads Consultant: What They Do, Cost, and When to Hire One' },
  { slug: 'google-ads-agency-account-ownership', title: 'Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You' },
  { slug: 'white-label-google-ads', title: 'White Label Google Ads: When to Outsource, Hire, or Use Software' },
  { slug: 'google-ads-strategy', title: 'Google Ads Strategy: A Strategic Operator Framework' },
  { slug: 'why-google-ads-strategy-fails-at-scale', title: 'Why Google Ads Strategy Fails at Scale: 8 Diagnostic Patterns Agencies See' },
  { slug: 'how-to-scale-google-ads-without-losing-roas', title: 'How to Scale Google Ads Without Losing ROAS (2026 Playbook)' },
  { slug: 'what-ceos-want-google-ads-reports', title: 'What CEOs Want to See in Google Ads Reports' },
  { slug: 'google-ads-certification-worth-it', title: 'Is Google Ads Certification Worth It?' },
];

const wrap: React.CSSProperties = { maxWidth: '1000px', margin: '0 auto', padding: '0 24px' };

export default function AgencyAlternativeContent() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Header />

      {/* Hero */}
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
              Replacing your Google Ads agency
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#475569', marginBottom: '24px' }}>
              Most of what a retainer buys is watching. Some of it is judgment. Software has
              genuinely taken over the first and has not taken over the second, and the honest
              question is which one you are paying for.
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
              <strong style={{ color: '#1e293b' }}>Where Kampaio is today.</strong> Two agents run
              on live accounts: Buzz for bidding work and Aegis for risk review. The rest ship as
              the cabinet grows. Founding access is free while billing is not open.
            </div>
          </div>
        </div>
      </section>

      {/* Coverage split */}
      <section style={{ padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            What software covers, and what it does not
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', marginBottom: '36px', maxWidth: '720px' }}>
            Split the retainer into the jobs it actually pays for. If your agency spends its month
            on the top half, software replaces it. If it spends its month on the bottom half, keep
            the agency and read no further.
          </p>

          <div style={{ display: 'grid', gap: '14px' }}>
            {COVERAGE.map((item) => (
              <div
                key={item.job}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px 22px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b' }}>{item.job}</span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      color: item.verdict === 'software' ? '#166534' : '#9a3412',
                      background: item.verdict === 'software' ? '#dcfce7' : '#ffedd5',
                    }}
                  >
                    {item.verdict === 'software' ? 'software handles this' : 'still a person'}
                  </span>
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#475569', margin: '10px 0 0' }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost framing */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            The account stays yours
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '760px', marginBottom: '16px' }}>
            Kampaio connects to your own Google Ads account through OAuth. There is no agency MCC
            holding it, no history that walks out of the door with the contract, and nothing to
            migrate if you stop. If you have ever tried to leave an agency that built everything in
            its own account, that is the whole difference.
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '760px' }}>
            Tiers are $99, $199 and $399 a month depending on how much you want to approve by hand.
            Billing is not open yet; founding access is free until it is.{' '}
            <Link href="/pricing" style={{ color: '#667eea', textDecoration: 'underline' }}>
              See what each tier covers
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Corpus */}
      <section style={{ padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
            Work through the decision first
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', marginBottom: '32px', maxWidth: '720px' }}>
            Thirteen pieces on agencies, consultants, pricing models and account ownership. Several
            of them will tell you to keep your agency. That is the point of writing them.
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

      {/* CTA */}
      <section style={{ background: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            Try it on your own account
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '620px', margin: '0 auto 28px' }}>
            Connect the account, watch what Buzz and Aegis propose, and approve nothing you do not
            want. If it does not beat what you are paying for, you have lost an afternoon.
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
