import { ImageResponse } from 'next/og';
import { postBySlug, CATEGORY_LABEL } from './posts';

// Per-article cover renderer (kampaio). One render, three surfaces: the OG
// share image, the in-article hero, and the blog card thumbnail (all point at
// the /blog/<slug>/opengraph-image route, so they never drift).
//
// Satori (bundled with next/og) cannot read CSS variables, so the palette is
// literal hex here. The cover is ink-dark in both site themes by design.
// One accent only (kampaio primary). Zero em-dashes in any cover copy.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const INK = '#0B0D10';
const ACCENT = '#667eea';
const TEXT = '#E8EAED';
const MUTED = '#9AA2AE';
const BORDER = '#262B33';

const tint = (a: number) => `rgba(102, 126, 234, ${a})`;

// Cluster -> motif. Default rings for anything unknown.
function pickMotif(category: string): 'bars' | 'versus' | 'grid' | 'ladder' | 'rings' {
  switch (category) {
    case 'google-ads':
      return 'bars';
    case 'ppc':
      return 'ladder';
    case 'strategy':
      return 'versus';
    case 'b2b':
      return 'grid';
    case 'ai':
    case 'ai-search':
      return 'rings';
    default:
      return 'rings';
  }
}

// All motifs are div-only (Satori-safe): no SVG filters, no blur, no conic.
function Motif({ kind }: { kind: ReturnType<typeof pickMotif> }) {
  if (kind === 'bars') {
    const heights = [120, 200, 160, 250, 110];
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 300 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ width: 44, height: h, borderRadius: '10px 10px 0 0', background: tint(1 - i * 0.17) }} />
        ))}
      </div>
    );
  }
  if (kind === 'versus') {
    return (
      <div style={{ display: 'flex', gap: 16, height: 280 }}>
        {[0, 1].map((c) => (
          <div
            key={c}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 14,
              width: 150,
              borderRadius: 18,
              padding: 20,
              background: c === 0 ? tint(0.16) : '#1B1F26',
              border: `2px solid ${c === 0 ? ACCENT : BORDER}`,
            }}
          >
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ height: 14, borderRadius: 7, background: tint(c === 0 ? 0.5 : 0.22) }} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'grid') {
    const op = [0.9, 0.5, 0.7, 0.4, 1, 0.55, 0.6, 0.35, 0.8];
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, width: 250 }}>
        {op.map((o, i) => (
          <div key={i} style={{ width: 74, height: 74, borderRadius: 14, background: tint(o) }} />
        ))}
      </div>
    );
  }
  if (kind === 'ladder') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 12 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              width: 110 + i * 60,
              height: 46,
              borderRadius: 12,
              marginLeft: i * 30,
              background: tint(0.3 + i * 0.18),
            }}
          />
        ))}
      </div>
    );
  }
  // rings
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 300, height: 300 }}>
      {[300, 220, 140].map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            display: 'flex',
            width: d,
            height: d,
            borderRadius: '50%',
            border: `2px solid ${tint(0.12 + i * 0.12)}`,
          }}
        />
      ))}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: '50%', background: ACCENT }} />
    </div>
  );
}

// Lead-segment accent: colour the part before a colon, else the first 2 words.
function splitTitle(title: string): { lead: string; rest: string } {
  const colon = title.indexOf(':');
  if (colon > 0 && colon < title.length - 1) {
    return { lead: title.slice(0, colon), rest: title.slice(colon) };
  }
  const words = title.split(' ');
  return { lead: words.slice(0, 2).join(' '), rest: words.length > 2 ? ' ' + words.slice(2).join(' ') : '' };
}

export function articleOgImage(slug: string) {
  const post = postBySlug(slug);
  const title = post?.title ?? 'Kampaio';
  const subtitle = post?.excerpt ?? '';
  const category = post?.category ?? '';
  const chip = CATEGORY_LABEL[category] ?? 'Kampaio';
  const readTime = (post?.readTime ?? '').replace(' read', '');
  const { lead, rest } = splitTitle(title);
  const size = title.length < 40 ? 56 : title.length < 70 ? 48 : 42;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 70px',
          background:
            'radial-gradient(660px 520px at 86% 20%, rgba(102,126,234,0.18), rgba(11,13,16,0) 60%), linear-gradient(135deg, #0E1218, #0B0D10 60%, #090B0F)',
          backgroundColor: INK,
          fontFamily: 'sans-serif',
        }}
      >
        {/* top row: brand lockup + category chip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', width: 14, height: 14, borderRadius: '50%', background: ACCENT }} />
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: TEXT }}>Kampaio</div>
          </div>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${tint(0.4)}`,
              color: ACCENT,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            {chip}
          </div>
        </div>

        {/* middle: title + subtitle (left, safe-zone) and motif (right band) */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 690 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: size, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <span style={{ color: ACCENT }}>{lead}</span>
            <span style={{ color: TEXT }}>{rest}</span>
          </div>
          {subtitle && (
            <div style={{ display: 'flex', marginTop: 20, maxWidth: 660, fontSize: 24, fontWeight: 500, lineHeight: 1.35, color: MUTED }}>
              {subtitle.length > 130 ? subtitle.slice(0, 127) + '...' : subtitle}
            </div>
          )}
        </div>

        {/* motif pinned to the right band, never crosses x=820 */}
        <div style={{ position: 'absolute', right: 70, top: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 320, height: 320 }}>
          <Motif kind={pickMotif(category)} />
        </div>

        {/* footer (mono) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 18 }}>
          <div style={{ display: 'flex', textTransform: 'uppercase', letterSpacing: '0.08em', color: MUTED }}>
            {readTime ? `${chip} · ${readTime}` : chip}
          </div>
          <div style={{ display: 'flex', color: ACCENT }}>kampaio.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
