'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// One row per symptom people actually search for. `reads` is what the symptom
// usually turns out to be; every claim here is the position taken in the linked
// article, not a new one invented for this page.
const SYMPTOMS = [
  {
    symptom: 'Performance Max stopped converting',
    reads: 'Usually a feed, audience signal, or conversion-quality problem rather than the campaign type itself.',
    slug: 'performance-max-not-converting',
    title: 'Performance Max Not Converting? 9 Fixes That Work (2026)',
  },
  {
    symptom: 'ROAS dropped overnight',
    reads: 'A sudden drop almost always has a discrete cause. The work is finding which one, in order, before changing bids.',
    slug: 'google-ads-roas-dropped-suddenly',
    title: 'Google Ads ROAS Dropped Suddenly? 8 Diagnostic Steps (2026)',
  },
  {
    symptom: 'Conversions look wrong or stopped arriving',
    reads: 'Check tracking before you touch the account. Optimising on broken data makes everything downstream worse.',
    slug: 'google-ads-conversion-tracking-not-working',
    title: 'Google Ads Conversion Tracking Not Working: 90s Triage + 7 Fixes',
  },
  {
    symptom: 'Budget is not being spent',
    reads: 'Underspend is a signal, not a bug. It usually points at bid strategy limits, targeting, or auction eligibility.',
    slug: 'google-ads-not-spending-full-budget',
    title: 'Google Ads Not Spending Full Budget? 7 Causes and Fixes',
  },
  {
    symptom: 'Cost per click keeps climbing',
    reads: 'Rising CPC is a symptom with several possible causes, and only some of them are worth reacting to.',
    slug: 'google-ads-cost-per-click-too-high',
    title: 'Google Ads Cost Per Click Too High: 9 Reasons + Fix Sheet',
  },
  {
    symptom: 'Money is leaking on the Display Network',
    reads: 'Display spend attached to a search campaign is a common, quiet drain with a known set of fixes.',
    slug: 'google-ads-display-network-wasted-spend',
    title: 'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026)',
  },
  {
    symptom: 'Clicks look fake',
    reads: 'Invalid traffic is measurable, and some of it is refundable if you document it properly.',
    slug: 'google-ads-invalid-traffic-click-fraud',
    title: 'Google Ads Invalid Traffic and Click Fraud: How to Spot It, Stop It, and Get Refunded (2026)',
  },
  {
    symptom: 'Someone is bidding on our brand with our own copy',
    reads: 'Ad hijacking has a detection routine and an escalation path. Both are unglamorous and both work.',
    slug: 'ad-hijacking-google-ads',
    title: 'Ad Hijacking in Google Ads: How to Detect and Stop It',
  },
  {
    symptom: 'The account is suspended',
    reads: 'Suspensions have named causes and an appeal process. Guessing at the cause wastes the appeal.',
    slug: 'why-is-my-google-ads-account-suspended',
    title: 'Why Is My Google Ads Account Suspended? Causes, Fixes, and How to Appeal',
  },
];

const wrap: React.CSSProperties = { maxWidth: '1000px', margin: '0 auto', padding: '0 24px' };

export default function FixAccountContent() {
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
              Something broke in your Google Ads account
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#475569', marginBottom: '24px' }}>
              Start from the symptom, not from the dashboard. Below are the nine failures that come
              up most often, what each one usually turns out to be, and the full diagnosis for each.
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
              <strong style={{ color: '#1e293b' }}>The fastest fix is finding the cause.</strong>{' '}
              Most of these look identical from the summary screen and need different actions. Read
              the diagnosis before you change a bid.
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '32px' }}>
            Find your symptom
          </h2>

          <div style={{ display: 'grid', gap: '14px' }}>
            {SYMPTOMS.map((s) => (
              <Link
                key={s.slug}
                href={`/blog/${s.slug}`}
                style={{
                  display: 'block',
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px 22px',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  {s.symptom}
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#475569', margin: '0 0 10px' }}>
                  {s.reads}
                </p>
                <span style={{ fontSize: '14px', color: '#667eea', fontWeight: 600 }}>{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            Catching it next time
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '760px', marginBottom: '16px' }}>
            Every failure above is cheaper the earlier you see it. A spend spike noticed on the day
            it starts costs a fraction of the same spike found in the monthly report, and none of
            these need a person watching a dashboard to be caught.
          </p>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '760px' }}>
            Kampaio connects to your own Google Ads account through OAuth and watches it
            continuously. Two agents run on live accounts today: Buzz proposes bidding changes and
            Aegis reviews every proposal for risk before you approve it. The rest ship as the
            cabinet grows. Founding access is free while billing is not open.{' '}
            <Link href="/pricing" style={{ color: '#667eea', textDecoration: 'underline' }}>
              See what each tier covers
            </Link>
            .
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <div style={wrap}>
          <h2 style={{ fontSize: '30px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>
            Point it at the account that is misbehaving
          </h2>
          <p style={{ fontSize: '17px', lineHeight: 1.6, color: '#475569', maxWidth: '620px', margin: '0 auto 28px' }}>
            Connect it, see what the agents flag, and approve nothing you do not want. Reading the
            diagnosis costs you nothing either way.
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
