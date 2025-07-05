require('dotenv').config();
const express = require('express');
const path = require('path');
const { breadcrumbsMiddleware } = require('./utils/breadcrumbs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Автоматична система breadcrumbs
app.use(breadcrumbsMiddleware);

// Роутери
const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat'); // переміщено вище
const generateRouter = require('./routes/generate');

app.use('/', indexRouter);
app.use('/chat', chatRouter); // перед app.listen
app.use('/generate', generateRouter);

// Маршрут для сторінки аналітики
app.get('/analytics', (req, res) => {
  res.render('analytics');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

