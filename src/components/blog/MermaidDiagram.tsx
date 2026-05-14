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
 * Click-to-zoom: clicking the figure opens a fullscreen lightbox.
 * ESC or backdrop-click closes it. Body scroll locked while open.
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

export default function MermaidDiagram({ chart, caption }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [zoomed, setZoomed] = useState(false);

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

  // Lightbox: lock body scroll + listen for ESC when zoomed
  useEffect(() => {
    if (!zoomed) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    document.addEventListener('keydown', handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed]);

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
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
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
            // Fix: Mermaid `journey` and some other types render an oversized
            // SVG canvas with empty whitespace below the actual content. Force
            // the inline SVG to auto-size to its viewBox content via inline CSS.
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
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4vh 4vw',
            cursor: 'zoom-out',
            animation: 'b6MermaidFadeIn 0.2s ease',
          }}
        >
          <button
            onClick={() => setZoomed(false)}
            aria-label="Close enlarged diagram"
            style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1e293b',
              fontSize: '24px',
              fontWeight: 300,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              lineHeight: 1,
              padding: 0,
              transition: 'transform 0.15s ease',
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
          <div
            onClick={(e) => e.stopPropagation()}
            className="b6-mermaid-zoom-card"
            style={{
              maxWidth: '95vw',
              maxHeight: '92vh',
              overflow: 'auto',
              background: '#ffffff',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.55)',
              cursor: 'default',
              animation: 'b6MermaidScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            {caption && (
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '20px',
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
              max-width: 100% !important;
              max-height: 80vh !important;
              height: auto !important;
              width: auto !important;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
