const express = require('express');
const router = express.Router(); // ← Цього рядка не вистачає
const nodemailer = require('nodemailer'); // ← Імпортуємо nodemailer

// Показ головної сторінки
router.get('/', (req, res) => {
  res.render('index', { title: 'PPC / AI Агентство' });
});

// Обробка форми
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chornyi.vitali@gmail.com',
      pass: 'bndxuipwwzzpeaqy'
    }
  });

  const mailOptions = {
    from: email,
    to: 'chornyi.vitali@gmail.com',
    subject: `Нове повідомлення з сайту PPCSet`,
    text: `
      Ім’я: ${name}
      Email: ${email}
      Повідомлення: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('<h2>Дякуємо, ваше повідомлення надіслано!</h2><a href="/">Повернутись</a>');
  } catch (error) {
    console.error('Помилка надсилання:', error);
    res.send('<h2>Виникла помилка при надсиланні. Спробуйте ще раз пізніше.</h2><a href="/">Повернутись</a>');
  }
});

module.exports = router;
