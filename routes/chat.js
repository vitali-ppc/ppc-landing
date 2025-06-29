require('dotenv').config();

const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get('/', (req, res) => {
  res.render('chat', { 
    userMessage: null, 
    botReply: null
  });
});

router.post('/', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: userMessage }],
    });

    const botReply = completion.choices[0].message.content;
    res.render('chat', { 
      userMessage, 
      botReply
    });
  } catch (error) {
    console.error('Помилка:', error.response?.data || error.message || error);
    res.render('chat', { 
      userMessage, 
      botReply: 'Помилка. Спробуйте пізніше.'
    });
  }
});

module.exports = router;
