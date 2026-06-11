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
 *
 * BigStat / DonutStat / HubSpokes / CompareGrid live elsewhere if present and
 * are intentionally not duplicated here.
 */

import { CSSProperties } from 'react';

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
