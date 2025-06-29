const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_KEY_JSON),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/', async (req, res) => {
  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1Ucqoklg5UhuAQ6XSFKE_ApD8mXynM74bIqDIm630-zQ',
      range: 'data11!A2:E2',
    });

    const rows = response.data.values;
    if (!rows || !rows.length) {
      return res.render('generate', { 
        result: 'Немає даних у таблиці.',
        breadcrumbs: [
          { title: 'Generate', url: '/generate' }
        ]
      });
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const result = completion.choices[0].message.content;
    res.render('generate', { 
      result,
      breadcrumbs: [
        { title: 'Generate', url: '/generate' }
      ]
    });
  } catch (error) {
    console.error('Помилка:', error.message);
    res.render('generate', { 
      result: 'Виникла помилка при обробці.',
      breadcrumbs: [
        { title: 'Generate', url: '/generate' }
      ]
    });
  }
});

module.exports = router;
