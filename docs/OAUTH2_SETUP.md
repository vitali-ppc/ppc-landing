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
   - App name: "Kampaio" (НЕ "PPCSet" або "PPC Landing")
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
   - Name: "Kampaio OAuth Client"
   - Authorized JavaScript origins:
     - `https://kampaio.com`
     - `https://www.kampaio.com`
   - Authorized redirect URIs:
     - `https://kampaio.com/api/auth/callback`
     - `https://www.kampaio.com/api/auth/callback`
5. Натисніть "Create"
6. Запишіть Client ID та Client Secret

## Крок 4: Google Ads Developer Token

1. Перейдіть до [Google Ads API Center](https://developers.google.com/google-ads/api/docs/first-call/dev-token)
2. Заповніть форму для отримання Developer Token
3. **ВАЖЛИВО**: В полі "Company Website URL" вкажіть `https://www.kampaio.com/`
4. Дочекайтеся схвалення (може зайняти кілька днів)
5. Запишіть Developer Token

## Крок 5: Налаштування Environment Variables

### Для Vercel (Frontend):

Додайте в Vercel Environment Variables:

```env
# Google OAuth2 Credentials
GOOGLE_CLIENT_ID=ваш_client_id
GOOGLE_CLIENT_SECRET=ваш_client_secret

# App URL
NEXT_PUBLIC_APP_URL=https://kampaio.com

# Email Service
RESEND_API_KEY=ваш_resend_api_key
```

### Для AI Server (Hetzner):

Оновіть файл `ai-server/.env`:

```env
# OpenAI API
OPENAI_API_KEY=ваш_openai_api_key

# Google Ads API
GOOGLE_ADS_DEVELOPER_TOKEN=ваш_developer_token
GOOGLE_ADS_CUSTOMER_ID=ваш_customer_id

# Email налаштування
EMAIL_USER=ваш_email@gmail.com
EMAIL_PASS=ваш_app_password
```

## Крок 6: Важливі зауваження

### ❌ НЕ використовуйте:
- `NEXTAUTH_URL` (не потрібен для нашого OAuth2 flow)
- `localhost` URLs в production
- Старі домени (`ppcset.com`)

### ✅ Використовуйте:
- `NEXT_PUBLIC_APP_URL` для redirect URIs
- `https://kampaio.com` як основний домен
- Правильні environment variables в Vercel

## Крок 7: Запуск додатку

1. Перезапустіть Docker контейнер на Hetzner:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

2. Перейдіть до `https://kampaio.com/chat`
3. Натисніть "Sign in with Google"
4. Пройдіть OAuth2 flow
5. Після успішної авторизації ви зможете використовувати реальні дані Google Ads

## Структура API Routes

- `/api/auth/login` - початок OAuth2 flow
- `/api/auth/callback` - обробка callback від Google
- `/api/ads-data-real` - отримання реальних даних Google Ads

## Безпека

- Ніколи не комітьте `.env` файли в git
- Використовуйте HTTPS в production
- Зберігайте tokens в безпечному місці
- Регулярно оновлюйте tokens

## Troubleshooting

### Помилка "Error 400: invalid_request"
- Перевірте, чи правильно налаштовані Authorized redirect URIs в Google Cloud Console
- Переконайтеся, що використовується `NEXT_PUBLIC_APP_URL` замість `NEXTAUTH_URL`
- Перевірте, чи App name в OAuth Consent Screen = "Kampaio"

### Помилка "Google Client ID not configured"
- Перевірте, чи правильно встановлені `GOOGLE_CLIENT_ID` та `GOOGLE_CLIENT_SECRET` в Vercel
- Переконайтеся, що environment variables доступні в production

### Помилка "Developer token not found"
- Дочекайтеся схвалення Developer Token
- Перевірте, чи правильно встановлений `GOOGLE_ADS_DEVELOPER_TOKEN` в AI server

### Помилка "No Google Ads accounts found"
- Переконайтеся, що у вас є активний Google Ads акаунт
- Перевірте права доступу до акаунту
- Перевірте `GOOGLE_ADS_CUSTOMER_ID` в AI server

## Виправлення відомих проблем

### Проблема з redirect URI (виправлена):
```typescript
// ❌ Неправильно:
const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

// ✅ Правильно:
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || 'https://kampaio.com'}/api/auth/callback`;
```

### Міграція з ppcset.com на kampaio.com:
- Оновлено всі посилання в коді
- Змінено домен в Google Cloud Console
- Оновлено environment variables 