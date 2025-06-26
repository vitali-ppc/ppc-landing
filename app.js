require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Роутери
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat'); // переміщено вище
const generateRouter = require('./routes/generate');

app.use('/', indexRouter);
app.use('/chat', chatRouter); // перед app.listen
app.use('/generate', generateRouter);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

