/**
 * Автоматична система breadcrumbs
 * Генерує breadcrumbs на основі URL та конфігурації сторінок
 */

// Конфігурація сторінок
const pagesConfig = {
  '/': { title: 'Home', showInBreadcrumbs: false },
  '/analytics': { title: 'Analytics', showInBreadcrumbs: true },
  '/chat': { title: 'Chat', showInBreadcrumbs: true },
  '/generate': { title: 'Generate', showInBreadcrumbs: true },
  '/professional': { title: 'Professional', showInBreadcrumbs: true },
  '/modern-ppc': { title: 'Modern PPC', showInBreadcrumbs: true },
  '/nodejs-development': { title: 'Node.js Development', showInBreadcrumbs: true },
  '/nextjs-development': { title: 'Next.js Development', showInBreadcrumbs: true },
  '/blog': { title: 'Blog', showInBreadcrumbs: true },
  '/ppc-performance': { title: 'PPC Performance', showInBreadcrumbs: true }
};

/**
 * Генерує breadcrumbs на основі URL
 * @param {string} url - URL сторінки
 * @param {Array} customBreadcrumbs - Кастомні breadcrumbs (опціонально)
 * @returns {Array} Масив breadcrumbs
 */
function generateBreadcrumbs(url, customBreadcrumbs = null) {
  // Якщо передані кастомні breadcrumbs, використовуємо їх
  if (customBreadcrumbs && Array.isArray(customBreadcrumbs)) {
    return customBreadcrumbs;
  }

  const breadcrumbs = [];
  
  // Завжди додаємо Home як перший елемент
  breadcrumbs.push({
    title: 'Home',
    url: '/'
  });

  // Отримуємо конфігурацію для поточної сторінки
  const pageConfig = pagesConfig[url];
  
  if (pageConfig && pageConfig.showInBreadcrumbs) {
    breadcrumbs.push({
      title: pageConfig.title,
      url: url
    });
  }

  return breadcrumbs;
}

/**
 * Middleware для автоматичного додавання breadcrumbs до всіх запитів
 */
function breadcrumbsMiddleware(req, res, next) {
  // Генеруємо breadcrumbs для поточного URL
  const breadcrumbs = generateBreadcrumbs(req.path);
  
  // Додаємо breadcrumbs до res.locals для доступу в шаблонах
  res.locals.breadcrumbs = breadcrumbs;
  
  next();
}

/**
 * Функція для додавання нової сторінки до конфігурації
 * @param {string} url - URL сторінки
 * @param {string} title - Назва сторінки
 * @param {boolean} showInBreadcrumbs - Чи показувати в breadcrumbs
 */
function addPageConfig(url, title, showInBreadcrumbs = true) {
  pagesConfig[url] = { title, showInBreadcrumbs };
}

module.exports = {
  generateBreadcrumbs,
  breadcrumbsMiddleware,
  addPageConfig,
  pagesConfig
}; 