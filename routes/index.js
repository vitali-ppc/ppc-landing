const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { generateBreadcrumbs } = require('../utils/breadcrumbs');

// Telegram налаштування
const TELEGRAM_BOT_TOKEN = '7832887667:AAEaIwR5X7Dqs4xr56heOE2PIjSagF3RB2U';
const TELEGRAM_CHAT_ID = '323593893';

// Функція для відправки повідомлення в Telegram
async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const result = await response.text();
    console.log('Telegram API response:', result);
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Головна сторінка — Professional дизайн
router.get('/', function(req, res, next) {
  // Для головної сторінки breadcrumbs не потрібні
  res.render('professional');
});

// Альтернативна сторінка — Neomorphic дизайн  
router.get('/modern-ppc', function(req, res, next) {
  // Breadcrumbs генеруються автоматично через middleware
  res.render('index');
});

// Analytics сторінка (спрощена версія)
router.get('/analytics', function(req, res, next) {
  // Breadcrumbs генеруються автоматично через middleware
  res.render('analytics_new');
});

// Node.js Development сторінка
router.get('/nodejs-development', function(req, res, next) {
  // Breadcrumbs генеруються автоматично через middleware
  res.render('nodejs-development');
});

// Next.js Development сторінка
router.get('/nextjs-development', function(req, res, next) {
  // Breadcrumbs генеруються автоматично через middleware
  res.render('nextjs-development');
});

// Blog сторінка
router.get('/blog', function(req, res, next) {
  res.render('blog');
});

// Обробка форми
router.post('/contact', async (req, res) => {
  const { name, email, company, message } = req.body;

  console.log('Form submitted:', { name, email, company, message });

  // Формуємо повідомлення для Telegram
  const telegramMessage = `
<b>🆕 New Inquiry from PPCSet Website</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
🏢 <b>Company:</b> ${company || 'Not specified'}
💬 <b>Message:</b> ${message || 'No message provided'}

⏰ <i>Received at: ${new Date().toLocaleString()}</i>
  `;

  console.log('Sending to Telegram:', telegramMessage);

  try {
    // Відправляємо в Telegram
    const result = await sendTelegramMessage(telegramMessage);
    console.log('Telegram response:', result);
    
    res.send(`
      <h2>Thank you! Your inquiry has been sent successfully.</h2>
      <p>I will contact you soon!</p>
      <a href="/">Back to Home</a>
    `);
  } catch (error) {
    console.error('Telegram sending error:', error);
    res.send('<h2>An error occurred while sending. Please try again later.</h2><a href="/">Back to Home</a>');
  }
});

router.get('/home', (req, res) => {
  res.render('home');
});

module.exports = router;
