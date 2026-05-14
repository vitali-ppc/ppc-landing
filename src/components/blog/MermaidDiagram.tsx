'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * MermaidDiagram — renders Mermaid syntax as SVG inside blog articles.
 *
 * Mermaid is the de-facto standard for embedded diagrams in technical blogs
 * (used by Stripe Press, GitHub docs, Vercel blog). Renders client-side so
 * no build-time toolchain needed.
 *
 * Used inside blog articles for:
 *   - Process flows (e.g. "9-Step Diagnostic Checklist")
 *   - Decision trees (e.g. "Which tool to pick by budget")
 *   - Comparison graphs
 *   - Sequence diagrams
 *
 * Click-to-zoom lightbox:
 *   - Default: SVG forced to full container width (much bigger than article view)
 *   - Zoom controls: −/+/↺ toolbar adjusts scale 50-400%
 *   - Scroll wheel inside modal also zooms (Cmd/Ctrl+wheel)
 *   - ESC or backdrop click closes
 *
 * Brand colors applied via custom theme variables.
 *
 * Example usage in a blog page.tsx:
 *
 *   <MermaidDiagram chart={`
 *     flowchart TD
 *       A[Budget $1-3K] --> B[Adzooma free]
 *       A2[Budget $3-20K] --> C[B6 $99-199]
 *       A3[Budget $20K+] --> D[B6 Autonomous $399]
 *   `} />
 */

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

let mermaidInitialized = false;

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

export default function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [zoomed, setZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
              // B6 brand colors
              primaryColor: '#667eea',
              primaryTextColor: '#1e293b',
              primaryBorderColor: '#764ba2',
              lineColor: '#64748b',
              secondaryColor: '#f8fafc',
              tertiaryColor: '#e2e8f0',
              background: '#ffffff',
              mainBkg: '#eef2ff',
              secondBkg: '#f5f3ff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '15px',
            },
            flowchart: { htmlLabels: true, curve: 'basis', padding: 12 },
            securityLevel: 'loose',
          });
          mermaidInitialized = true;
        }

        const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
        const { svg: rendered } = await mermaid.render(id, chart.trim());
        if (!cancelled) setSvg(rendered);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Mermaid render error';
        if (!cancelled) setError(msg);
        console.error('[MermaidDiagram] render error:', e);
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  // Lightbox: lock body scroll + listen for ESC/+/- when zoomed
  useEffect(() => {
    if (!zoomed) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
      else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoomLevel((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoomLevel((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
      } else if (e.key === '0') {
        e.preventDefault();
        setZoomLevel(1);
      }
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

  // Reset zoom whenever modal opens
  useEffect(() => {
    if (zoomed) setZoomLevel(1);
  }, [zoomed]);

  const adjustZoom = (delta: number) =>
    setZoomLevel((z) => {
      const next = +(z + delta).toFixed(2);
      return Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, next));
    });

  if (error) {
    return (
      <div
        style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '16px',
          margin: '24px 0',
          fontSize: '14px',
          color: '#991b1b',
        }}
      >
        <strong>Diagram render error:</strong> {error}
        <pre style={{ marginTop: '8px', fontSize: '12px', overflow: 'auto' }}>{chart}</pre>
      </div>
    );
  }

  const toolbarBtnStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    color: '#1e293b',
    fontSize: '18px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.12s ease',
    padding: 0,
    lineHeight: 1,
    userSelect: 'none',
  };

  return (
    <>
      <figure
        onClick={() => {
          if (svg) setZoomed(true);
        }}
        style={{
          margin: '32px 0',
          padding: '24px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          overflowX: 'auto',
          position: 'relative',
          cursor: svg ? 'zoom-in' : 'default',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (svg) {
            (e.currentTarget as HTMLElement).style.boxShadow =
              '0 6px 20px rgba(102, 126, 234, 0.12)';
            (e.currentTarget as HTMLElement).style.borderColor = '#cbd5e1';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
        }}
        aria-label={caption ? `${caption} — click to enlarge` : 'Diagram — click to enlarge'}
      >
        {svg && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#64748b',
              fontWeight: 500,
              letterSpacing: '0.02em',
              pointerEvents: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              userSelect: 'none',
            }}
          >
            🔍 Click to enlarge
          </span>
        )}
        <div
          ref={ref}
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: svg ? 'auto' : '120px',
          }}
        />
        <style jsx>{`
          figure :global(svg) {
            max-width: 100%;
            height: auto !important;
            max-height: 600px;
          }
        `}</style>
        {caption && (
          <figcaption
            style={{
              marginTop: '12px',
              fontSize: '14px',
              color: '#64748b',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {zoomed && (
        <div
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged diagram"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '72px 2vw 24px 2vw',
            cursor: 'zoom-out',
            animation: 'b6MermaidFadeIn 0.18s ease',
          }}
        >
          {/* Top-right toolbar: zoom controls + close */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '16px',
              right: '16px',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              zIndex: 10000,
              cursor: 'default',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                background: 'rgba(255, 255, 255, 0.97)',
                borderRadius: '12px',
                padding: '4px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              }}
            >
              <button
                onClick={() => adjustZoom(-ZOOM_STEP)}
                aria-label="Zoom out"
                disabled={zoomLevel <= ZOOM_MIN}
                style={{
                  ...toolbarBtnStyle,
                  opacity: zoomLevel <= ZOOM_MIN ? 0.35 : 1,
                  cursor: zoomLevel <= ZOOM_MIN ? 'default' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (zoomLevel > ZOOM_MIN)
                    (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: '52px',
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1e293b',
                  fontVariantNumeric: 'tabular-nums',
                  userSelect: 'none',
                }}
              >
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => adjustZoom(ZOOM_STEP)}
                aria-label="Zoom in"
                disabled={zoomLevel >= ZOOM_MAX}
                style={{
                  ...toolbarBtnStyle,
                  opacity: zoomLevel >= ZOOM_MAX ? 0.35 : 1,
                  cursor: zoomLevel >= ZOOM_MAX ? 'default' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (zoomLevel < ZOOM_MAX)
                    (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                +
              </button>
              <div style={{ width: '1px', height: '20px', background: '#e2e8f0', margin: '0 2px' }} />
              <button
                onClick={() => setZoomLevel(1)}
                aria-label="Reset zoom"
                title="Reset zoom (0)"
                style={{
                  ...toolbarBtnStyle,
                  fontSize: '14px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                ↺
              </button>
            </div>
            <button
              onClick={() => setZoomed(false)}
              aria-label="Close enlarged diagram"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.97)',
                color: '#1e293b',
                fontSize: '22px',
                fontWeight: 300,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                lineHeight: 1,
                padding: 0,
                transition: 'transform 0.12s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>

          {/* White card containing the SVG */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="b6-mermaid-zoom-card"
            style={{
              width: '96vw',
              maxHeight: 'calc(100vh - 96px)',
              overflow: 'auto',
              background: '#ffffff',
              padding: '20px',
              borderRadius: '14px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
              cursor: 'default',
              animation: 'b6MermaidScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              style={{
                minWidth: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: `${zoomLevel * 100}%`,
                  flexShrink: 0,
                  transition: 'width 0.2s ease',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </div>
            {caption && (
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#475569',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  maxWidth: '720px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  lineHeight: 1.5,
                }}
              >
                {caption}
              </div>
            )}
          </div>

          {/* Bottom hint */}
          <div
            style={{
              position: 'fixed',
              bottom: '14px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: '0.04em',
              userSelect: 'none',
              pointerEvents: 'none',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            ESC / click outside to close · + / − / 0 to zoom
          </div>

          <style jsx global>{`
            @keyframes b6MermaidFadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes b6MermaidScaleIn {
              from {
                opacity: 0;
                transform: scale(0.96);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            .b6-mermaid-zoom-card svg {
              width: 100% !important;
              height: auto !important;
              max-width: none !important;
              max-height: none !important;
              display: block;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
