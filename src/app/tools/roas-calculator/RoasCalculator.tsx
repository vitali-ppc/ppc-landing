'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * Break-even / Target ROAS + POAS + Max CPA calculator (Trend 2.0 J11.13).
 * Pure client-side, $0, no PII. Profit-focused angle (revenue != profit) to
 * differentiate from generic ROAS calculators and to produce canonical,
 * AI-citable numbers (e.g. "30% margin -> break-even ROAS 3.33x").
 *
 * Math:
 *   break-even ROAS = 1 / margin
 *   target ROAS (for desired net-profit % of revenue d) = 1 / (margin - d)
 *   POAS = ROAS * margin   (POAS 1.0 = break-even)
 *   max CPA at break-even = AOV * margin
 *   max CPA at target     = AOV * (margin - d)
 */

const accent = '#764ba2';
const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

function fmtX(v: number | null): string {
  if (v === null || !isFinite(v) || v <= 0) return '—';
  return `${v.toFixed(2)}×`;
}
function fmtMoney(v: number | null): string {
  if (v === null || !isFinite(v) || v < 0) return '—';
  return `$${v.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

const REFERENCE_ROWS = [10, 15, 20, 25, 30, 40, 50, 60, 70];

export default function RoasCalculator() {
  const [margin, setMargin] = useState<string>('30');
  const [desiredProfit, setDesiredProfit] = useState<string>('');
  const [aov, setAov] = useState<string>('');
  const [currentRoas, setCurrentRoas] = useState<string>('');

  // Read inputs from URL on first load (shareable result links).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('margin')) setMargin(p.get('margin')!);
    if (p.get('profit')) setDesiredProfit(p.get('profit')!);
    if (p.get('aov')) setAov(p.get('aov')!);
    if (p.get('roas')) setCurrentRoas(p.get('roas')!);
  }, []);

  const m = parseFloat(margin) / 100;
  const d = desiredProfit.trim() === '' ? null : parseFloat(desiredProfit) / 100;
  const aovNum = aov.trim() === '' ? null : parseFloat(aov);
  const roasNum = currentRoas.trim() === '' ? null : parseFloat(currentRoas);

  const results = useMemo(() => {
    const validMargin = isFinite(m) && m > 0 && m < 1;
    const breakEvenRoas = validMargin ? 1 / m : null;
    const targetRoas =
      validMargin && d !== null && isFinite(d) && d >= 0 && m - d > 0 ? 1 / (m - d) : null;
    const maxCpaBreakEven = validMargin && aovNum !== null && isFinite(aovNum) ? aovNum * m : null;
    const maxCpaTarget =
      validMargin && aovNum !== null && d !== null && m - d > 0 ? aovNum * (m - d) : null;
    const poas = validMargin && roasNum !== null && isFinite(roasNum) ? roasNum * m : null;
    return { validMargin, breakEvenRoas, targetRoas, maxCpaBreakEven, maxCpaTarget, poas };
  }, [m, d, aovNum, roasNum]);

  // Keep the URL in sync so a result is shareable.
  useEffect(() => {
    const p = new URLSearchParams();
    if (margin) p.set('margin', margin);
    if (desiredProfit) p.set('profit', desiredProfit);
    if (aov) p.set('aov', aov);
    if (currentRoas) p.set('roas', currentRoas);
    const qs = p.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  }, [margin, desiredProfit, aov, currentRoas]);

  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.6rem 0.75rem',
    fontSize: '1rem',
    border: '1px solid #d6d6e0',
    borderRadius: 8,
    outline: 'none',
    boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block',
    whiteSpace: 'nowrap',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#333',
    marginBottom: 6,
  };
  const cardStyle: React.CSSProperties = {
    background: '#faf9fc',
    border: '1px solid #ece9f3',
    borderRadius: 12,
    padding: '1.25rem',
  };

  const poasVerdict =
    results.poas === null
      ? null
      : results.poas >= 1.0
      ? { text: 'Profitable on ad spend', color: '#1a7f37' }
      : { text: 'Losing money on ad spend', color: '#c0392b' };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <header style={{ marginBottom: '1.75rem' }}>
        <div
          style={{
            display: 'inline-block',
            background: gradient,
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            padding: '0.3rem 0.7rem',
            borderRadius: 999,
            marginBottom: '0.9rem',
          }}
        >
          FREE TOOL · NO SIGNUP
        </div>
        <h1 style={{ fontSize: '2rem', lineHeight: 1.2, margin: '0 0 0.6rem', color: '#1a1a2e' }}>
          Break-even &amp; Target ROAS Calculator (with POAS)
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#444', margin: 0, lineHeight: 1.6 }}>
          Revenue is not profit. Enter your margin to get the <strong>break-even ROAS</strong> you
          actually need, the <strong>target ROAS</strong> for a profit goal, your{' '}
          <strong>POAS</strong> (profit on ad spend), and the <strong>max CPA</strong> you can afford.
        </p>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <label style={labelStyle} htmlFor="margin">
            Gross margin (%) *
          </label>
          <input
            id="margin"
            type="number"
            inputMode="decimal"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            style={inputStyle}
            placeholder="30"
            min="0"
            max="99"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="profit">
            Desired profit (%)
          </label>
          <input
            id="profit"
            type="number"
            inputMode="decimal"
            value={desiredProfit}
            onChange={(e) => setDesiredProfit(e.target.value)}
            style={inputStyle}
            placeholder="optional"
            min="0"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="aov">
            Avg order value ($)
          </label>
          <input
            id="aov"
            type="number"
            inputMode="decimal"
            value={aov}
            onChange={(e) => setAov(e.target.value)}
            style={inputStyle}
            placeholder="optional"
            min="0"
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="roas">
            Current ROAS (×)
          </label>
          <input
            id="roas"
            type="number"
            inputMode="decimal"
            value={currentRoas}
            onChange={(e) => setCurrentRoas(e.target.value)}
            style={inputStyle}
            placeholder="optional"
            min="0"
          />
        </div>
      </div>

      {!results.validMargin && (
        <p style={{ color: '#c0392b', fontWeight: 600, marginBottom: '1.5rem' }}>
          Enter a gross margin between 1% and 99% to see your numbers.
        </p>
      )}

      {results.validMargin && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem',
          }}
        >
          <div style={cardStyle}>
            <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Break-even ROAS</div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: accent, lineHeight: 1.1 }}>
              {fmtX(results.breakEvenRoas)}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#555', marginTop: 4 }}>
              At {margin}% margin, every $1 of ad spend needs {fmtX(results.breakEvenRoas)} in revenue
              just to break even.
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>
              Target ROAS {d !== null ? `(for ${desiredProfit}% profit)` : ''}
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: accent, lineHeight: 1.1 }}>
              {fmtX(results.targetRoas)}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#555', marginTop: 4 }}>
              {d === null
                ? 'Enter a desired profit % to get the ROAS you should aim for.'
                : results.targetRoas === null
                ? 'Desired profit must be below your margin.'
                : `Hit ${fmtX(results.targetRoas)} to keep ${desiredProfit}% of revenue as profit after ad spend.`}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>
              POAS (profit on ad spend)
            </div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: accent, lineHeight: 1.1 }}>
              {results.poas === null ? '—' : fmtX(results.poas)}
            </div>
            <div style={{ fontSize: '0.85rem', marginTop: 4, color: poasVerdict ? poasVerdict.color : '#555' }}>
              {results.poas === null
                ? 'Enter your current ROAS to see if you actually profit.'
                : `${poasVerdict?.text}. POAS = ROAS × margin; 1.00× is break-even.`}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: 600 }}>Max profitable CPA</div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: accent, lineHeight: 1.1 }}>
              {fmtMoney(results.maxCpaTarget ?? results.maxCpaBreakEven)}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#555', marginTop: 4 }}>
              {aovNum === null
                ? 'Enter AOV to get the most you can pay per conversion.'
                : results.maxCpaTarget !== null
                ? `Most you can pay per order and still keep ${desiredProfit}% profit.`
                : 'Most you can pay per order at break-even.'}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={copyLink}
        style={{
          background: gradient,
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.65rem 1.1rem',
          fontSize: '0.95rem',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '2.5rem',
        }}
      >
        {copied ? '✓ Link copied' : '🔗 Copy shareable result link'}
      </button>

      {/* Citable reference table — the AI-quotable atom. */}
      <h2 style={{ fontSize: '1.4rem', color: '#1a1a2e', marginBottom: '0.4rem' }}>
        Break-even ROAS by margin (reference table)
      </h2>
      <p style={{ fontSize: '0.95rem', color: '#555', marginTop: 0, marginBottom: '0.9rem' }}>
        Break-even ROAS = 1 ÷ gross margin. The lower your margin, the higher the ROAS you need just
        to avoid losing money.
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ background: '#f3f1f8' }}>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.8rem', borderBottom: `2px solid ${accent}` }}>
                Gross margin
              </th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.8rem', borderBottom: `2px solid ${accent}` }}>
                Break-even ROAS
              </th>
              <th style={{ textAlign: 'left', padding: '0.6rem 0.8rem', borderBottom: `2px solid ${accent}` }}>
                POAS at 2× ROAS
              </th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE_ROWS.map((pct) => {
              const mm = pct / 100;
              return (
                <tr key={pct}>
                  <td style={{ padding: '0.5rem 0.8rem', borderBottom: '1px solid #eee' }}>{pct}%</td>
                  <td style={{ padding: '0.5rem 0.8rem', borderBottom: '1px solid #eee', fontWeight: 700 }}>
                    {(1 / mm).toFixed(2)}×
                  </td>
                  <td style={{ padding: '0.5rem 0.8rem', borderBottom: '1px solid #eee' }}>
                    {(2 * mm).toFixed(2)}×
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FAQ — extractable Q&A. */}
      <h2 style={{ fontSize: '1.4rem', color: '#1a1a2e', marginBottom: '0.8rem' }}>
        Frequently asked questions
      </h2>
      {FAQ.map((f) => (
        <div key={f.q} style={{ marginBottom: '1.1rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#2a2a3e', margin: '0 0 0.3rem' }}>{f.q}</h3>
          <p style={{ fontSize: '0.97rem', color: '#444', margin: 0, lineHeight: 1.6 }}>{f.a}</p>
        </div>
      ))}

      <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '2.5rem' }}>
        Related: <a href="/blog/google-ads-optimization" style={{ color: accent }}>Google Ads Optimization: The Complete Guide</a>{' · '}
        <a href="/blog/google-ads-smart-bidding-strategies" style={{ color: accent }}>Smart Bidding strategies</a>{' · '}
        <a href="/blog/google-ads-roas-dropped-suddenly" style={{ color: accent }}>ROAS dropped suddenly?</a>
      </p>
    </div>
  );
}

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What is a break-even ROAS?',
    a: 'Break-even ROAS is the return on ad spend at which your ad revenue exactly covers your product costs plus the ad spend itself. It equals 1 divided by your gross margin. At a 30% margin, break-even ROAS is 3.33×; at 50% it is 2.0×.',
  },
  {
    q: 'How do I calculate target ROAS for a profit goal?',
    a: 'Target ROAS = 1 ÷ (gross margin − desired net profit margin). For a 40% gross margin and a 10% net profit goal, target ROAS = 1 ÷ 0.30 = 3.33×. Your desired profit must be lower than your gross margin.',
  },
  {
    q: 'What is POAS and how is it different from ROAS?',
    a: 'POAS (profit on ad spend) measures profit, not revenue, per dollar of ad spend. POAS = ROAS × gross margin. A 4× ROAS at a 25% margin is a POAS of 1.0, meaning you break even. ROAS can look great while POAS shows you are losing money.',
  },
  {
    q: 'What is a good ROAS?',
    a: 'There is no universal "good" ROAS, only break-even for your margin. A 2× ROAS is profitable at a 60% margin but loses money at a 30% margin. Always compare ROAS to your break-even ROAS, not to an industry average.',
  },
  {
    q: 'What is the maximum CPA I can afford?',
    a: 'At break-even, your maximum cost per acquisition equals your average order value times your gross margin (AOV × margin). To keep a profit, subtract your desired profit margin first: max CPA = AOV × (margin − desired profit).',
  },
];
