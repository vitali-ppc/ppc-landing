import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function POST(request: NextRequest) {
  try {
    const { data, filename = 'export' } = await request.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Data is required' }, { status: 400 });
    }

    // Створюємо новий workbook та worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Додаємо заголовки
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    // Додаємо дані
    data.forEach(row => {
      worksheet.addRow(headers.map(h => row[h]));
    });

    // Робимо заголовки жирними
    worksheet.getRow(1).font = { bold: true };

    // Автоматично підлаштовуємо ширину колонок
    if (worksheet.columns) {
      worksheet.columns.forEach(column => {
        let maxLength = 10;
        column.eachCell?.({ includeEmpty: true }, cell => {
          const len = cell.value ? String(cell.value).length : 0;
          if (len > maxLength) maxLength = len;
        });
        column.width = maxLength + 2;
      });
    }

    // Генеруємо файл у буфер
    const buffer = await workbook.xlsx.writeBuffer();

    // Формуємо ім'я файлу
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const finalFilename = `${filename}-${timestamp}.xlsx`;

    // Відправляємо файл
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    responseHeaders.set('Content-Disposition', `attachment; filename="${finalFilename}"`);

    return new NextResponse(buffer, {
      status: 200,
      headers: responseHeaders
    });
  } catch (error) {
    console.error('Export XLSX error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 