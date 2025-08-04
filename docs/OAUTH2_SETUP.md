# Налаштування OAuth2 для Google Ads API

## Крок 1: Google Cloud Console

1. Перейдіть до [Google Cloud Console](https://console.cloud.google.com/)
2. Створіть новий проект або виберіть існуючий
3. Увімкніть Google Ads API:
   - Перейдіть до "APIs & Services" → "Library"
   - Знайдіть "Google Ads API" і увімкніть його

## Крок 2: Налаштування OAuth Consent Screen

1. Перейдіть до "APIs & Services" → "OAuth consent screen"
2. Виберіть "External" як User Type
3. Заповніть обов'язкові поля:
   - App name: "PPC Landing"
   - User support email: ваш email
   - Developer contact information: ваш email
4. Додайте scopes:
   - `https://www.googleapis.com/auth/adwords`
   - `https://www.googleapis.com/auth/userinfo.email`
5. Додайте ваш email як test user
6. Збережіть налаштування

## Крок 3: Створення OAuth2 Credentials

1. Перейдіть до "APIs & Services" → "Credentials"
2. Натисніть "Create Credentials" → "OAuth client ID"
3. Виберіть "Web application"
4. Заповніть поля:
   - Name: "PPC Landing OAuth Client"
   - Authorized JavaScript origins: `http://localhost:3002`
   - Authorized redirect URIs:
     - `http://localhost:3002/api/auth/callback`
     - `http://localhost:3002/api/auth/callback/google`
5. Натисніть "Create"
6. Запишіть Client ID та Client Secret

## Крок 4: Google Ads Developer Token

1. Перейдіть до [Google Ads API Center](https://developers.google.com/google-ads/api/docs/first-call/dev-token)
2. Заповніть форму для отримання Developer Token
3. Дочекайтеся схвалення (може зайняти кілька днів)
4. Запишіть Developer Token

## Крок 5: Налаштування Environment Variables

Оновіть файл `kluch.env`:

```env
# Google OAuth2 Credentials
GOOGLE_CLIENT_ID=ваш_client_id
GOOGLE_CLIENT_SECRET=ваш_client_secret

# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=ваш_developer_token

# Next.js
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=випадковий_секрет_для_nextauth

# Backend API
BACKEND_URL=http://localhost:8000

# OpenAI (якщо використовуєте)
OPENAI_API_KEY=ваш_openai_api_key
```

## Крок 6: Запуск додатку

1. Перезапустіть Next.js сервер
2. Перейдіть до `/chat`
3. Натисніть "Підключити Google Ads акаунт"
4. Пройдіть OAuth2 flow
5. Після успішної авторизації ви зможете використовувати реальні дані Google Ads

## Структура API Routes

- `/api/auth/login` - початок OAuth2 flow
- `/api/auth/callback` - обробка callback від Google
- `/api/ads-data-real` - отримання реальних даних Google Ads

## Безпека

- Ніколи не комітьте `kluch.env` в git
- Використовуйте HTTPS в production
- Зберігайте tokens в безпечному місці
- Регулярно оновлюйте tokens

## Troubleshooting

### Помилка "Invalid redirect URI"
- Перевірте, чи правильно налаштовані Authorized redirect URIs в Google Cloud Console
- Переконайтеся, що порт співпадає (3002)

### Помилка "Developer token not found"
- Дочекайтеся схвалення Developer Token
- Перевірте, чи правильно встановлений GOOGLE_ADS_DEVELOPER_TOKEN

### Помилка "No Google Ads accounts found"
- Переконайтеся, що у вас є активний Google Ads акаунт
- Перевірте права доступу до акаунту 