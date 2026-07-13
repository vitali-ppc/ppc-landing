/**
 * Blog visual primitives (kampaio) — inline-styled chart components for blog
 * articles. Ported from the saasflywheel reference stack (commit 6ac10ef),
 * adapted to kampaio's inline-style blog convention. NO raw hex in this file:
 * every color reads from the --blog-* token layer in globals.css, so the whole
 * set re-skins from one place and never breaks the brand.
 *
 * Each data figure takes a `source` and renders it as a figcaption. Do not use
 * a figure without a real source: fabricated percentages are not allowed.
 *
 * Components:
 *   Heatmap         matrix rows x cols, intensity ramp
 *   StackedBar      shares of a whole, 100%-normalized horizontal bars
 *   GroupedBar      2-3 series compared across the same categories
 *   DonutBreakdown  one whole split into named parts
 *   ColumnBuckets   taxonomy "themes to tactics" (structural, not a data viz)
 *   YouTubeEmbed    one relevant on-topic video (supporting media, not bold-viz)
 *   BigStat         one standout sourced figure + claim (bold)
 *   DonutStat       1-2 percentage rings (bold)
 *   HubSpokes       central concept with radial spokes (bold)
 *   CompareGrid     side-by-side approach comparison (bold)
 *   SignalStack     stacked signal layers, highlights one
 *   StatGrid/Stat   grid of big-number metrics
 *   Callout         labelled aside (insight / warning / tip)
 *   KeyTakeaways    "short version" summary card
 *   Pullquote       large pulled quote
 *   Steps/Step      auto-numbered framework
 *
 * Bold-viz set (satisfies the >=1 bold-viz rule): Heatmap, StackedBar,
 * GroupedBar, DonutBreakdown, BigStat, DonutStat, HubSpokes, CompareGrid.
 * Quiet/structural (ColumnBuckets, Callout, KeyTakeaways, Pullquote, Steps,
 * StatGrid, SignalStack) and YouTubeEmbed do NOT satisfy it.
 */

import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

/* Shared figure card. */
const cardStyle: CSSProperties = {
  margin: '40px 0',
  borderRadius: 16,
  border: '1px solid var(--blog-border)',
  background: 'var(--blog-card)',
  padding: 'clamp(20px, 4vw, 28px)',
};

const captionStyle: CSSProperties = {
  marginTop: 16,
  borderTop: '1px solid var(--blog-border)',
  paddingTop: 16,
  fontFamily: MONO,
  fontSize: 12,
  color: 'var(--blog-muted)',
};

/* Green-equivalent ramp built on the brand primary (intensity by order),
   ending on a neutral surface so the last segment reads as "none/other". */
const SEG_FILL = [
  'var(--blog-primary)',
  'color-mix(in srgb, var(--blog-primary) 68%, var(--blog-surface-2))',
  'color-mix(in srgb, var(--blog-primary) 44%, var(--blog-surface-2))',
  'color-mix(in srgb, var(--blog-primary) 26%, var(--blog-surface-2))',
  'var(--blog-surface-2)',
];
const SEG_TEXT = (i: number) =>
  i <= 1 ? 'var(--blog-on-primary)' : 'var(--blog-ink)';

/* Series ramp for GroupedBar (solid primary, then lighter tints). */
const SERIES_FILL = [
  'var(--blog-primary)',
  'color-mix(in srgb, var(--blog-primary) 70%, var(--blog-surface-2))',
  'color-mix(in srgb, var(--blog-primary) 40%, var(--blog-surface-2))',
];

/* ---------------------------------------------------------------------------
   Heatmap: a matrix of rows x columns where each cell's fill encodes its value
   on a single-hue intensity ramp. High cells flip their text to on-primary for
   contrast. Pick this when the draft has a grid of numbers (segment x metric).
   --------------------------------------------------------------------------- */
export function Heatmap({
  columns,
  rows,
  max = 100,
  legend = ['Low', 'High'],
  source,
}: {
  columns: string[];
  rows: { label: string; values: number[] }[];
  max?: number;
  legend?: [string, string];
  source?: string;
}) {
  const cellBg = (v: number) => {
    const pct = Math.max(0, Math.min(100, (v / max) * 100));
    return `color-mix(in srgb, var(--blog-primary) ${pct}%, var(--blog-surface-2))`;
  };
  const cellText = (v: number) =>
    (v / max) * 100 >= 55 ? 'var(--blog-on-primary)' : 'var(--blog-ink)';

  const gridCols = `minmax(7rem,auto) repeat(${columns.length}, minmax(3.5rem,1fr))`;

  return (
    <figure style={cardStyle}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', minWidth: 544, gap: 6, gridTemplateColumns: gridCols }}>
          <div aria-hidden />
          {columns.map((c) => (
            <div
              key={c}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                background: 'var(--blog-surface)',
                padding: '8px',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 1.15,
                color: 'var(--blog-muted)',
              }}
            >
              {c}
            </div>
          ))}

          {rows.map((row) => (
            <div key={row.label} style={{ display: 'contents' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--blog-ink)',
                }}
              >
                {row.label}
              </div>
              {row.values.map((v, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    padding: '12px 8px',
                    fontFamily: MONO,
                    fontSize: 15,
                    fontWeight: 600,
                    fontVariantNumeric: 'tabular-nums',
                    background: cellBg(v),
                    color: cellText(v),
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: MONO,
          fontSize: 11,
          color: 'var(--blog-muted)',
        }}
      >
        <span>{legend[0]}</span>
        <span
          style={{
            display: 'flex',
            overflow: 'hidden',
            borderRadius: 4,
            border: '1px solid var(--blog-border)',
          }}
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i} style={{ height: 12, width: 20, background: cellBg((i / 10) * max) }} />
          ))}
        </span>
        <span>{legend[1]}</span>
      </div>

      {source && <figcaption style={captionStyle}>{source}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   StackedBar: one or more 100%-normalized horizontal bars split into named
   segments. Pick this for shares of a whole (per group). Percent labels sit
   inside wide segments; a shared legend names the categories.
   --------------------------------------------------------------------------- */
export function StackedBar({
  bars,
  legend,
  source,
}: {
  bars: { label: string; segments: { label: string; value: number }[] }[];
  legend?: string[];
  source?: string;
}) {
  const cats = legend ?? bars[0]?.segments.map((s) => s.label) ?? [];

  return (
    <figure style={cardStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {bars.map((bar) => {
          const total = bar.segments.reduce((a, s) => a + s.value, 0) || 1;
          return (
            <div key={bar.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--blog-muted)',
                }}
              >
                {bar.label}
              </div>
              <div style={{ display: 'flex', height: 44, width: '100%', overflow: 'hidden', borderRadius: 8 }}>
                {bar.segments.map((s, i) => {
                  const pct = (s.value / total) * 100;
                  return (
                    <div
                      key={s.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: MONO,
                        fontSize: 13,
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        width: `${pct}%`,
                        background: SEG_FILL[i % SEG_FILL.length],
                        color: SEG_TEXT(i),
                      }}
                    >
                      {pct >= 8 ? `${Math.round(pct)}%` : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
        {cats.map((c, i) => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--blog-muted)' }}>
            <span style={{ height: 12, width: 12, borderRadius: 3, background: SEG_FILL[i % SEG_FILL.length] }} />
            {c}
          </div>
        ))}
      </div>

      {source && <figcaption style={captionStyle}>{source}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   ColumnBuckets: N labelled columns, each a vertical stack of short pill items
   (the "themes to tactics" taxonomy). Structural block, NOT a data viz: it does
   not satisfy the >=1 bold-viz rule on its own.
   --------------------------------------------------------------------------- */
export function ColumnBuckets({
  columns,
  caption,
}: {
  columns: { title: string; items: string[] }[];
  caption?: string;
}) {
  return (
    <figure style={cardStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {columns.map((col) => (
          <div key={col.title} style={{ display: 'flex', minWidth: 150, flex: 1, flexDirection: 'column' }}>
            <div
              style={{
                borderTop: '2px solid var(--blog-primary)',
                paddingTop: 10,
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.15,
                color: 'var(--blog-ink)',
              }}
            >
              {col.title}
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.items.map((it) => (
                <div
                  key={it}
                  style={{
                    borderRadius: 8,
                    border: '1px solid var(--blog-border)',
                    background: 'var(--blog-surface)',
                    padding: '10px 12px',
                    textAlign: 'center',
                    fontSize: 13,
                    lineHeight: 1.35,
                    color: 'var(--blog-muted)',
                  }}
                >
                  {it}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {caption && (
        <figcaption
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontFamily: MONO,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--blog-muted)',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   GroupedBar: vertical bars grouped by category, with 1-3 series compared side
   by side. Keep to <=3 series and <=6 categories so bars stay legible.
   --------------------------------------------------------------------------- */
export function GroupedBar({
  categories,
  series,
  max = 100,
  unit = '%',
  source,
}: {
  categories: string[];
  series: { label: string; values: number[] }[];
  max?: number;
  unit?: string;
  source?: string;
}) {
  return (
    <figure style={cardStyle}>
      <div style={{ marginBottom: 20, display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
        {series.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--blog-muted)' }}>
            <span style={{ height: 12, width: 12, borderRadius: 3, background: SERIES_FILL[i % SERIES_FILL.length] }} />
            {s.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: 8, overflowX: 'auto' }}>
        {categories.map((cat, ci) => (
          <div key={cat} style={{ display: 'flex', minWidth: 64, flex: 1, flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', height: 208, alignItems: 'flex-end', gap: 6 }}>
              {series.map((s, si) => {
                const v = s.values[ci] ?? 0;
                const h = Math.max(0, Math.min(100, (v / max) * 100));
                return (
                  <div
                    key={s.label}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      height: '100%',
                      width: 26,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '6px 6px 0 0',
                        background: 'color-mix(in srgb, var(--blog-primary) 10%, var(--blog-surface-2))',
                      }}
                    />
                    <span
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        marginBottom: 4,
                        fontFamily: MONO,
                        fontSize: 11,
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--blog-muted)',
                      }}
                    >
                      {v}
                      {unit}
                    </span>
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                        borderRadius: '6px 6px 0 0',
                        height: `${h}%`,
                        background: SERIES_FILL[si % SERIES_FILL.length],
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, lineHeight: 1.15, color: 'var(--blog-muted)' }}>{cat}</div>
          </div>
        ))}
      </div>

      {source && <figcaption style={{ ...captionStyle, marginTop: 20 }}>{source}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   DonutBreakdown: a 2-4 segment donut showing how a whole splits, with a legend
   of percent chips, an optional center figure, and an optional examples list.
   Pick this for one whole split into named parts. Every percent MUST be sourced.
   --------------------------------------------------------------------------- */
export function DonutBreakdown({
  segments,
  center,
  examples,
  source,
}: {
  segments: { percent: number; label: string }[];
  center?: { value: string; label?: string };
  examples?: string[];
  source?: string;
}) {
  const R = 58;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const arcs = segments.map((s, i) => {
    const len = (C * Math.max(0, s.percent)) / 100;
    const off = -(C * acc) / 100;
    acc += s.percent;
    return { len, off, fill: SEG_FILL[i % SEG_FILL.length] };
  });

  return (
    <figure style={cardStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 32 }}>
        <svg
          viewBox="0 0 160 160"
          style={{ height: 176, width: 176, flexShrink: 0 }}
          role="img"
          aria-label={center ? `${center.value} ${center.label ?? ''}` : 'breakdown'}
        >
          <circle
            cx="80"
            cy="80"
            r={R}
            fill="none"
            stroke="color-mix(in srgb, var(--blog-primary) 10%, var(--blog-surface-2))"
            strokeWidth="20"
          />
          {arcs.map((a, i) => (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={R}
              fill="none"
              stroke={a.fill}
              strokeWidth="20"
              strokeDasharray={`${a.len} ${C}`}
              strokeDashoffset={a.off}
              transform="rotate(-90 80 80)"
            />
          ))}
          {center && (
            <>
              <text
                x="80"
                y="78"
                textAnchor="middle"
                style={{ fill: 'var(--blog-primary)', fontFamily: MONO, fontSize: 30, fontWeight: 800 }}
              >
                {center.value}
              </text>
              {center.label && (
                <text x="80" y="98" textAnchor="middle" style={{ fill: 'var(--blog-muted)', fontSize: 12 }}>
                  {center.label}
                </text>
              )}
            </>
          )}
        </svg>

        <div style={{ minWidth: 200, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {segments.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--blog-ink)' }}>
                <span
                  style={{
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontFamily: MONO,
                    fontSize: 16,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                    background: SEG_FILL[i % SEG_FILL.length],
                    color: SEG_TEXT(i),
                  }}
                >
                  {s.percent}%
                </span>
                {s.label}
              </div>
            ))}
          </div>
          {examples && examples.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--blog-muted)',
                }}
              >
                Examples
              </div>
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {examples.map((e) => (
                  <div key={e} style={{ fontSize: 14, color: 'var(--blog-muted)' }}>
                    {e}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {source && <figcaption style={{ ...captionStyle, marginTop: 20 }}>{source}</figcaption>}
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   YouTubeEmbed: responsive, privacy-friendly embed of ONE relevant official
   video. youtube-nocookie sets no tracking cookie until the user plays (no
   consent banner needed); loading="lazy" defers the iframe until it scrolls
   into view, so it does not hurt initial page speed. Supporting media, NOT a
   bold-viz: only embed an on-topic video from a trustworthy source, 1 per
   article, never as decoration.
   --------------------------------------------------------------------------- */
export function YouTubeEmbed({
  id,
  title,
  caption,
}: {
  id: string;
  title: string;
  caption?: string;
}) {
  return (
    <figure style={{ margin: '32px 0' }}>
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 9',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 12,
          border: '1px solid var(--blog-border)',
          background: 'var(--blog-surface-2)',
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', border: 0 }}
        />
      </div>
      <figcaption style={{ marginTop: 12, fontFamily: MONO, fontSize: 12, color: 'var(--blog-muted)' }}>
        {caption ?? title}
      </figcaption>
    </figure>
  );
}

/* ===========================================================================
   Structural + stat + diagram primitives (ported from the saasflywheel set,
   adapted to kampaio inline styles + --blog-* tokens). Tints use color-mix on
   tokens (no hex). Quiet/structural blocks (Callout, KeyTakeaways, Pullquote,
   Steps, StatGrid) do not satisfy the >=1 bold-viz rule; BigStat, DonutStat,
   HubSpokes, CompareGrid are bold.
   =========================================================================== */

type CalloutVariant = 'insight' | 'warning' | 'tip';

const CALLOUT_STYLES: Record<
  CalloutVariant,
  { bar: string; chipBg: string; chipText: string; label: string }
> = {
  insight: {
    bar: 'var(--blog-primary)',
    chipBg: 'color-mix(in srgb, var(--blog-primary) 12%, transparent)',
    chipText: 'var(--blog-primary)',
    label: 'Key insight',
  },
  warning: {
    bar: 'var(--blog-neg)',
    chipBg: 'color-mix(in srgb, var(--blog-neg) 12%, transparent)',
    chipText: 'var(--blog-neg)',
    label: 'Watch out',
  },
  tip: {
    bar: 'var(--blog-secondary)',
    chipBg: 'color-mix(in srgb, var(--blog-secondary) 12%, transparent)',
    chipText: 'var(--blog-secondary)',
    label: 'Tip',
  },
};

/* Colored, labelled aside for a load-bearing takeaway, caveat, or tip. */
export function Callout({
  variant = 'insight',
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}) {
  const s = CALLOUT_STYLES[variant];
  return (
    <aside
      style={{
        margin: '28px 0',
        borderRadius: '0 8px 8px 0',
        borderLeft: `4px solid ${s.bar}`,
        background: 'var(--blog-card)',
        padding: 'clamp(16px, 3vw, 20px) clamp(20px, 4vw, 24px)',
      }}
    >
      <span
        style={{
          marginBottom: 8,
          display: 'inline-block',
          borderRadius: 4,
          padding: '2px 8px',
          fontFamily: MONO,
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          background: s.chipBg,
          color: s.chipText,
        }}
      >
        {title ?? s.label}
      </span>
      <div style={{ color: 'var(--blog-ink)', lineHeight: 1.6 }}>{children}</div>
    </aside>
  );
}

/* "The short version" summary card. Front-loaded answer. */
export function KeyTakeaways({
  title = 'The short version',
  items,
}: {
  title?: string;
  items: ReactNode[];
}) {
  return (
    <aside style={{ ...cardStyle, margin: '32px 0' }}>
      <p
        style={{
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: MONO,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--blog-muted)',
        }}
      >
        <span style={{ height: 6, width: 6, borderRadius: '50%', background: 'var(--blog-primary)' }} aria-hidden />
        {title}
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--blog-ink)' }}>
            <svg
              style={{ marginTop: 4, height: 16, width: 16, flexShrink: 0, color: 'var(--blog-primary)' }}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                clipRule="evenodd"
              />
            </svg>
            <span style={{ lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* Large pulled quote with attribution. */
export function Pullquote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure style={{ margin: '32px 0', borderLeft: '4px solid var(--blog-primary)', paddingLeft: 'clamp(20px, 4vw, 24px)' }}>
      <blockquote style={{ margin: 0, fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 500, lineHeight: 1.3, color: 'var(--blog-ink)' }}>
        {children}
      </blockquote>
      {cite && (
        <figcaption style={{ marginTop: 12, fontFamily: MONO, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--blog-muted)' }}>
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/* A single big-number metric. Use inside StatGrid. */
export function Stat({
  value,
  label,
  tone = 'neutral',
}: {
  value: string;
  label: string;
  tone?: 'neutral' | 'pos' | 'neg';
}) {
  const valueColor = tone === 'pos' ? 'var(--blog-pos)' : tone === 'neg' ? 'var(--blog-neg)' : 'var(--blog-ink)';
  return (
    <div style={{ borderRadius: 8, border: '1px solid var(--blog-border)', background: 'var(--blog-surface)', padding: 20 }}>
      <div style={{ fontFamily: MONO, fontSize: 30, fontWeight: 600, color: valueColor }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.35, color: 'var(--blog-muted)' }}>{label}</div>
    </div>
  );
}

/* Responsive grid of Stat cards. */
export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: '32px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>{children}</div>
  );
}

/* A single step. Use inside Steps (which auto-numbers it). */
export function Step({
  title,
  children,
  num,
}: {
  title: string;
  children: ReactNode;
  num?: number;
}) {
  return (
    <li style={{ position: 'relative', paddingLeft: 48 }}>
      <span
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'flex',
          height: 32,
          width: 32,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'var(--blog-primary)',
          fontFamily: MONO,
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--blog-on-primary)',
        }}
        aria-hidden
      >
        {num ?? ''}
      </span>
      <h4 style={{ margin: '2px 0 6px', fontSize: 18, fontWeight: 600, color: 'var(--blog-ink)' }}>{title}</h4>
      <div style={{ color: 'var(--blog-ink)', lineHeight: 1.6 }}>{children}</div>
    </li>
  );
}

/* Numbered framework / decision flow. Auto-numbers its Step children. */
export function Steps({ children }: { children: ReactNode }) {
  let n = 0;
  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    n += 1;
    return cloneElement(child as ReactElement<{ num?: number }>, { num: n });
  });
  return (
    <ol style={{ margin: '32px 0', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {items}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg style={{ height: 16, width: 16, flexShrink: 0, color: 'var(--blog-pos)' }} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg style={{ height: 16, width: 16, flexShrink: 0, color: 'var(--blog-muted)' }} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M6.3 6.3a1 1 0 0 1 1.4 0L10 8.6l2.3-2.3a1 1 0 1 1 1.4 1.4L11.4 10l2.3 2.3a1 1 0 0 1-1.4 1.4L10 11.4l-2.3 2.3a1 1 0 0 1-1.4-1.4L8.6 10 6.3 7.7a1 1 0 0 1 0-1.4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export type CompareColumn = {
  name: string;
  bestFor: string;
  traits: { label: string; has: boolean }[];
  highlight?: boolean;
};

/* Side-by-side approach comparison. Cards wrap on mobile. */
export function CompareGrid({ columns }: { columns: CompareColumn[] }) {
  return (
    <div style={{ margin: '32px 0', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {columns.map((col) => (
        <div
          key={col.name}
          style={{
            display: 'flex',
            flex: '1 1 220px',
            minWidth: 220,
            flexDirection: 'column',
            borderRadius: 12,
            background: 'var(--blog-surface)',
            padding: 20,
            border: col.highlight ? '1px solid var(--blog-primary)' : '1px solid var(--blog-border)',
            boxShadow: col.highlight ? '0 0 0 1px color-mix(in srgb, var(--blog-primary) 30%, transparent)' : 'none',
          }}
        >
          <div style={{ borderBottom: '1px solid var(--blog-border)', paddingBottom: 12 }}>
            <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--blog-ink)' }}>{col.name}</h4>
            <p style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.35, color: 'var(--blog-muted)' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--blog-primary)' }}>
                Best for{' '}
              </span>
              {col.bestFor}
            </p>
          </div>
          <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.traits.map((t) => (
              <li key={t.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: t.has ? 'var(--blog-ink)' : 'var(--blog-muted)' }}>
                {t.has ? <CheckIcon /> : <CrossIcon />}
                {/* Machine-readable yes/no: the ✓/✗ icons are aria-hidden SVGs, so
                    without this the two columns read identically to LLMs, screen
                    readers, and text extraction. Visually hidden, extractable. */}
                <span
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                    whiteSpace: 'nowrap',
                    border: 0,
                  }}
                >
                  {t.has ? 'Yes: ' : 'No: '}
                </span>
                <span style={{ lineHeight: 1.35 }}>{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export type SignalLayer = {
  title: string;
  desc: string;
  highlight?: boolean;
  badge?: string;
};

/* Stacked signal-layer diagram. Highlights the differentiating layer. */
export function SignalStack({ layers, caption }: { layers: SignalLayer[]; caption?: string }) {
  return (
    <figure style={{ margin: '32px 0' }}>
      <div style={{ overflow: 'hidden', borderRadius: 12, border: '1px solid var(--blog-border)' }}>
        {layers.map((layer, i) => (
          <div
            key={layer.title}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              padding: 'clamp(16px, 3vw, 20px)',
              borderTop: i > 0 ? '1px solid var(--blog-border)' : 'none',
              background: layer.highlight ? 'color-mix(in srgb, var(--blog-primary) 6%, var(--blog-card))' : 'var(--blog-surface)',
            }}
          >
            <span
              style={{
                display: 'flex',
                height: 32,
                width: 32,
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                fontFamily: MONO,
                fontSize: 14,
                fontWeight: 600,
                background: layer.highlight ? 'var(--blog-primary)' : 'var(--blog-surface-2)',
                color: layer.highlight ? 'var(--blog-on-primary)' : 'var(--blog-muted)',
              }}
            >
              {i + 1}
            </span>
            <div>
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--blog-ink)' }}>
                {layer.title}
                {layer.badge && (
                  <span
                    style={{
                      marginLeft: 8,
                      borderRadius: 4,
                      padding: '2px 6px',
                      background: 'color-mix(in srgb, var(--blog-primary) 10%, transparent)',
                      fontFamily: MONO,
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--blog-primary)',
                    }}
                  >
                    {layer.badge}
                  </span>
                )}
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: 14, lineHeight: 1.35, color: 'var(--blog-muted)' }}>{layer.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {caption && (
        <figcaption style={{ marginTop: 8, textAlign: 'center', fontFamily: MONO, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--blog-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* BigStat: one standout sourced figure + claim. */
export function BigStat({
  value,
  label,
  claim,
  source,
}: {
  value: string;
  label?: string;
  claim: string;
  source?: string;
}) {
  return (
    <figure style={{ ...cardStyle, padding: 'clamp(28px, 5vw, 36px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(20px, 4vw, 32px)' }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 'clamp(56px, 10vw, 72px)', fontWeight: 700, lineHeight: 1, color: 'var(--blog-primary)' }}>
            {value}
          </div>
          {label && (
            <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--blog-muted)' }}>
              {label}
            </div>
          )}
        </div>
        <p style={{ flex: '1 1 240px', margin: 0, fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 500, lineHeight: 1.3, color: 'var(--blog-ink)' }}>
          {claim}
        </p>
      </div>
      {source && <figcaption style={{ ...captionStyle, marginTop: 20 }}>{source}</figcaption>}
    </figure>
  );
}

/* DonutStat: one or two percentage rings (SVG, token-driven). Every percent MUST be sourced. */
export function DonutStat({ items, source }: { items: { percent: number; label: string }[]; source?: string }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <figure style={{ ...cardStyle, padding: 'clamp(28px, 5vw, 36px)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
        {items.map((d, i) => {
          const pct = Math.max(0, Math.min(100, d.percent));
          return (
            <div key={i} style={{ display: 'flex', flex: '1 1 200px', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <svg viewBox="0 0 140 140" style={{ height: 144, width: 144 }} role="img" aria-label={`${pct}% ${d.label}`}>
                <circle cx="70" cy="70" r={R} fill="none" stroke="var(--blog-border)" strokeWidth="16" />
                <circle
                  cx="70"
                  cy="70"
                  r={R}
                  fill="none"
                  stroke="var(--blog-primary)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${(C * pct) / 100} ${C}`}
                  transform="rotate(-90 70 70)"
                />
                <text x="70" y="79" textAnchor="middle" style={{ fill: 'var(--blog-ink)', fontFamily: MONO, fontSize: 28, fontWeight: 700 }}>
                  {pct}%
                </text>
              </svg>
              <p style={{ marginTop: 12, maxWidth: 320, fontSize: 14, lineHeight: 1.6, color: 'var(--blog-muted)' }}>{d.label}</p>
            </div>
          );
        })}
      </div>
      {source && <figcaption style={{ ...captionStyle, marginTop: 24 }}>{source}</figcaption>}
    </figure>
  );
}

/* HubSpokes: radial hub-and-spoke (desktop) over a clean list (mobile).
   The desktop/mobile toggle uses the .blog-hub-desktop / .blog-hub-mobile
   media-query classes in globals.css (inline styles cannot express breakpoints). */
export function HubSpokes({ hub, spokes, caption }: { hub: string; spokes: string[]; caption?: string }) {
  const n = Math.max(spokes.length, 1);
  const pos = spokes.map((_, i) => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: 50 + 38 * Math.cos(a), y: 50 + 33 * Math.sin(a) };
  });

  return (
    <figure style={{ margin: '40px 0' }}>
      <div
        className="blog-hub-desktop"
        style={{ position: 'relative', aspectRatio: '16 / 10', width: '100%', borderRadius: 16, border: '1px solid var(--blog-border)', background: 'var(--blog-card)' }}
      >
        <svg style={{ position: 'absolute', inset: 0, height: '100%', width: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {pos.map((p, i) => (
            <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke="var(--blog-primary)" strokeWidth="0.35" opacity="0.45" />
          ))}
        </svg>
        {pos.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              display: 'flex',
              height: 96,
              width: 96,
              transform: 'translate(-50%, -50%)',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              border: '1px solid color-mix(in srgb, var(--blog-primary) 40%, transparent)',
              background: 'var(--blog-surface)',
              padding: 10,
              textAlign: 'center',
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.2, color: 'var(--blog-ink)' }}>{spokes[i]}</span>
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            display: 'flex',
            height: 128,
            width: 128,
            transform: 'translate(-50%, -50%)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'var(--blog-primary)',
            padding: 16,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3, color: 'var(--blog-on-primary)' }}>{hub}</span>
        </div>
      </div>

      <div className="blog-hub-mobile" style={{ borderRadius: 16, border: '1px solid var(--blog-border)', background: 'var(--blog-card)', padding: 24 }}>
        <div
          style={{
            margin: '0 auto 20px',
            display: 'flex',
            height: 96,
            width: 96,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'var(--blog-primary)',
            padding: 12,
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: 'var(--blog-on-primary)' }}>{hub}</span>
        </div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {spokes.map((s) => (
            <li
              key={s}
              style={{
                borderRadius: 8,
                border: '1px solid color-mix(in srgb, var(--blog-primary) 30%, transparent)',
                background: 'var(--blog-surface)',
                padding: '10px 14px',
                textAlign: 'center',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--blog-ink)',
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {caption && (
        <figcaption style={{ marginTop: 16, textAlign: 'center', fontFamily: MONO, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--blog-muted)' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
