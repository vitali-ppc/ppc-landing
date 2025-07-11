import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { data, filename = 'export' } = await request.json();
    
    if (!data) {
      return NextResponse.json({ error: 'Data is required' }, { status: 400 });
    }

    // Convert data to CSV format
    let csvContent = '';
    
    if (Array.isArray(data) && data.length > 0) {
      // If data is array of objects, create headers from first object
      const headers = Object.keys(data[0]);
      csvContent += headers.join(',') + '\n';
      
      data.forEach(row => {
        const values = headers.map(header => {
          const value = row[header] || '';
          // Escape commas and quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        });
        csvContent += values.join(',') + '\n';
      });
    } else {
      // If data is string, use it as is
      csvContent = String(data);
    }

    // Додаємо BOM для коректного відкриття в Excel
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const finalFilename = `${filename}-${timestamp}.csv`;

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv; charset=utf-8');
    headers.set('Content-Disposition', `attachment; filename="${finalFilename}"`);

    return new NextResponse(csvWithBom, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Export CSV error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 