import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { rows } = await req.json(); // rows: масив масивів, наприклад [["Кампанія", "Кліки"], ["Test", 123]]
  const csv = rows.map((r: any[]) => r.map(v => `"${v}"`).join(',')).join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="report.csv"',
    },
  });
} 