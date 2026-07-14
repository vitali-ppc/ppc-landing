// Responsive article table. Desktop: a normal table; if it is wider than the
// column it scrolls horizontally with a scroll-shadow affordance (Lea Verou
// technique) so a clipped table reads as "swipe", not "broken". Mobile (<=760px):
// each row collapses into a labelled card ("Field: value") so columns never crush
// into 1-char stacks. Pure CSS, no JS — safe as a server component.
//
// Usage:
//   <ResponsiveTable
//     headers={['Feature', 'What it does', 'Default', 'Our call']}
//     rows={[['Final URL expansion', <>Sends clicks anywhere…</>, 'ON', 'Kill']]}
//   />

import type { ReactNode } from 'react';

const css = `
.rt-wrap {
  margin: 32px 0;
  overflow-x: auto;
  background:
    linear-gradient(to right, #fff 30%, rgba(255,255,255,0)) 0 0 / 32px 100% no-repeat,
    linear-gradient(to right, rgba(255,255,255,0), #fff 70%) 100% 0 / 32px 100% no-repeat,
    radial-gradient(farthest-side at 0 50%, rgba(15,23,42,.12), transparent) 0 0 / 14px 100% no-repeat,
    radial-gradient(farthest-side at 100% 50%, rgba(15,23,42,.12), transparent) 100% 0 / 14px 100% no-repeat;
  background-attachment: local, local, scroll, scroll;
}
.rt {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  color: #1e293b;
}
.rt th, .rt td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
  line-height: 1.5;
}
.rt th {
  background: #f8fafc;
  font-weight: 600;
  white-space: nowrap;
}
/* Mobile: each row becomes a labelled card. */
@media (max-width: 760px) {
  .rt-wrap { background: none; overflow-x: visible; }
  .rt, .rt tbody, .rt tr, .rt td { display: block; width: 100%; }
  .rt thead { display: none; }
  .rt tr {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    margin-bottom: 16px;
    overflow: hidden;
    background: #fff;
  }
  .rt td {
    border: none;
    border-bottom: 1px solid #f1f5f9;
    padding: 10px 16px;
    display: flex;
    gap: 12px;
  }
  .rt tr td:last-child { border-bottom: none; }
  .rt td::before {
    content: attr(data-label);
    flex: 0 0 42%;
    font-weight: 600;
    color: #64748b;
  }
}
`;

export default function ResponsiveTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="rt-wrap">
      <table className="rt">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} data-label={headers[ci]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </div>
  );
}
