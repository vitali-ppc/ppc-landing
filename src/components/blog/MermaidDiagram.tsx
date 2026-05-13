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
    <figure
      style={{
        margin: '32px 0',
        padding: '24px',
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        overflowX: 'auto',
      }}
    >
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ display: 'flex', justifyContent: 'center', minHeight: svg ? 'auto' : '120px' }}
      />
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
  );
}
