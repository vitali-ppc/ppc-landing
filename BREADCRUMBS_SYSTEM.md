# Автоматична система Breadcrumbs

## Огляд

Створена автоматична система breadcrumbs для всіх внутрішніх сторінок. Система автоматично генерує хлібні крихти на основі URL та конфігурації сторінок, зберігаючи при цьому контроль над існуючими сторінками.

## Особливості

✅ **Автоматична генерація** - breadcrumbs створюються автоматично на основі URL  
✅ **Гнучка архітектура** - легко додавати нові сторінки  
✅ **Контроль конфігурації** - можна налаштувати які сторінки показувати в breadcrumbs  
✅ **Кастомні breadcrumbs** - підтримка ручного встановлення breadcrumbs  
✅ **Адаптивний дизайн** - оптимізовано для десктопу та мобільних пристроїв  

## Структура файлів

```
utils/
  └── breadcrumbs.js          # Основна логіка генерації breadcrumbs
views/
  └── partials/
      └── breadcrumbs.ejs     # Шаблон для відображення breadcrumbs
```

## Використання

### 1. Автоматичне використання

Система працює автоматично для всіх сторінок. Просто додайте в шаблон:

```ejs
<%- include('partials/breadcrumbs') %>
```

### 2. Додавання нової сторінки

Додайте конфігурацію в `utils/breadcrumbs.js`:

```javascript
const pagesConfig = {
  '/new-page': { title: 'New Page', showInBreadcrumbs: true }
};
```

### 3. Кастомні breadcrumbs

Для спеціальних випадків можна передати кастомні breadcrumbs:

```javascript
// В роутері
router.get('/special-page', (req, res) => {
  const customBreadcrumbs = [
    { title: 'Home', url: '/' },
    { title: 'Category', url: '/category' },
    { title: 'Special Page', url: '/special-page' }
  ];
  
  res.locals.breadcrumbs = customBreadcrumbs;
  res.render('special-page');
});
```

## Конфігурація

### Налаштування сторінок

```javascript
const pagesConfig = {
  '/': { title: 'Home', showInBreadcrumbs: false },
  '/analytics': { title: 'Analytics', showInBreadcrumbs: true },
  '/chat': { title: 'Chat', showInBreadcrumbs: true },
  '/generate': { title: 'Generate', showInBreadcrumbs: true },
  '/professional': { title: 'Professional', showInBreadcrumbs: true },
  '/modern-ppc': { title: 'Modern PPC', showInBreadcrumbs: true },
  '/nodejs-development': { title: 'Node.js Development', showInBreadcrumbs: true }
};
```

### Параметри конфігурації

- `title` - назва сторінки для відображення
- `showInBreadcrumbs` - чи показувати сторінку в breadcrumbs (false для головної сторінки)

## Оновлені файли

### Маршрути
- ✅ **Оновлено routes/index.js** - маршрут /analytics тепер передає дані breadcrumbs
- ✅ **Додано middleware** - автоматична генерація breadcrumbs для всіх запитів

### Шаблони
- ✅ **Оновлено analytics_new.ejs** - тепер використовує динамічні breadcrumbs
- ✅ **Оновлено chat.ejs** - використовує автоматичну систему
- ✅ **Оновлено generate.ejs** - використовує автоматичну систему
- ✅ **Оновлено nodejs-development.ejs** - використовує автоматичну систему
- ✅ **Додано breadcrumbs до professional.ejs** - готова структура для внутрішніх сторінок

### Утиліти
- ✅ **Створено utils/breadcrumbs.js** - основна логіка системи
- ✅ **Оновлено app.js** - додано middleware для автоматичної генерації

## Переваги системи

1. **Автоматизація** - не потрібно вручну додавати breadcrumbs на кожну сторінку
2. **Консистентність** - однаковий стиль на всіх сторінках
3. **Легкість підтримки** - зміни в одному місці застосовуються всюди
4. **Гнучкість** - можна легко налаштувати для спеціальних випадків
5. **SEO-friendly** - правильна структура навігації для пошукових систем

## Приклади використання

### Автоматичні breadcrumbs
```
Home / Analytics
Home / Chat
Home / Generate
Home / Node.js Development
```

### Кастомні breadcrumbs
```
Home / Category / Subcategory / Page
```

## Технічна реалізація

Система використовує Express.js middleware для автоматичної генерації breadcrumbs на основі `req.path`. Breadcrumbs передаються в шаблони через `res.locals.breadcrumbs` і відображаються за допомогою partial шаблону. 