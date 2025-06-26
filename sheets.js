const { google } = require('googleapis');
const path = require('path');
const { OpenAI } = require('openai');

require('dotenv').config();

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'google-key.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function readSheet() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1Ucqoklg5UhuAQ6XSFKE_ApD8mXynM74bIqDIm630-zQ',
    range: 'data11!A2:E2', // перший реальний рядок
  });

  const rows = res.data.values;
  if (!rows || !rows.length) {
  return console.log('Немає даних.');
}

  const [url, h1, description, keyword, cta] = rows[0];

  const prompt = `Створи рекламний заголовок і опис на основі:
- URL: ${url}
- Заголовок H1: ${h1}
- Опис: ${description}
- Ключове слово: ${keyword}
- CTA: ${cta}

Формат:
Заголовок: ...
Опис: ...`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('\n=== Згенеровано GPT ===');
    console.log(completion.choices[0].message.content);
  } catch (err) {
    console.error('GPT помилка:', err);
  }
}

readSheet();
