'use client';

import { ReactNode } from 'react';

/**
 * ComparisonTable — branded comparison table for blog articles.
 *
 * Standard format used by top SEO blogs (Backlinko, Ahrefs):
 *   - Header row darker
 *   - Highlighted row for "our product" (B6)
 *   - Inline styling matches existing blog article aesthetic
 *
 * Used for: "X vs Y vs Z" tool comparisons, feature matrices, pricing tables.
 *
 * Example usage in blog page.tsx:
 *
 *   <ComparisonTable
 *     headers={['Tool', 'Price', 'Best for', 'Automation']}
 *     rows={[
 *       { cells: ['Optmyzr',   '$499+', 'Agencies', 'Recommendations'] },
 *       { cells: ['Madgicx',   '$499+', 'Multi-channel', 'Partial'] },
 *       { cells: ['B6',        '$99+',  'SMB $3-50K spend', 'Full L1/L2/L3'], highlight: true },
 *     ]}
 *     caption="Tool comparison at $5K monthly Google Ads spend"
 *   />
 */

interface Row {
  cells: ReactNode[];
  highlight?: boolean;
}

interface ComparisonTableProps {
  headers: string[];
  rows: Row[];
  caption?: string;
}

export default function ComparisonTable({ headers, rows, caption }: ComparisonTableProps) {
  return (
    <figure
      style={{
        margin: '32px 0',
        overflowX: 'auto',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '15px',
          color: '#1e293b',
          background: 'white',
        }}
      >
        <thead>
          <tr style={{ background: '#1e293b', color: 'white' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: '14px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background: row.highlight
                  ? 'linear-gradient(90deg, #eef2ff 0%, #f5f3ff 100%)'
                  : ri % 2 === 0
                  ? 'white'
                  : '#fafafa',
                borderTop: ri === 0 ? 'none' : '1px solid #e2e8f0',
                fontWeight: row.highlight ? 600 : 400,
              }}
            >
              {row.cells.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '12px 16px',
                    verticalAlign: 'top',
                    lineHeight: '1.5',
                    borderLeft: row.highlight && ci === 0 ? '4px solid #764ba2' : 'none',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <figcaption
          style={{
            padding: '10px 16px',
            background: '#f8fafc',
            fontSize: '13px',
            color: '#64748b',
            fontStyle: 'italic',
            borderTop: '1px solid #e2e8f0',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
