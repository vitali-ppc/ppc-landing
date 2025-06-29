# Інструкція по Breadcrumbs

## Поточний стан:

### ✅ Статичні breadcrumbs (гарантовано працюють):
- `/analytics` - `Home / Analytics`
- `/` (professional) - без breadcrumbs
- `/modern-ppc` - `Home / Modern PPC`

### ✅ Динамічні breadcrumbs (для нових сторінок):
- Автоматично створюються для нових сторінок
- Використовують partial `views/partials/breadcrumbs.ejs`

## Як додати нову сторінку з breadcrumbs:

### 1. Створіть маршрут в routes/index.js:
```javascript
router.get('/new-page', function(req, res, next) {
  res.render('new-page');
});
```

### 2. Створіть файл views/new-page.ejs:
```html
<!DOCTYPE html>
<html>
<head>
  <title>New Page</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <!-- Додайте breadcrumbs partial -->
  <%- include('partials/breadcrumbs') %>
  
  <!-- Ваш контент -->
  <div class="container">
    <h1>New Page</h1>
  </div>
</body>
</html>
```

### 3. Додайте назву сторінки в app.js:
```javascript
const pageTitles = {
  'analytics': 'Analytics',
  'modern-ppc': 'Modern PPC',
  'chat': 'Chat',
  'generate': 'Generate',
  'professional': 'Professional',
  'new-page': 'New Page' // Додайте тут
};
```

## Результат:
- Нова сторінка `/new-page` автоматично покаже `Home / New Page`
- Система працює надійно і стабільно 