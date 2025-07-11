# Документація чат-системи PPCSet

## Загальний опис

Чат-система PPCSet - це AI-асистент для маркетологів та бізнесу, спеціалізований на Google Ads аналітиці та стратегіях. Система побудована на Next.js з Python AI-сервером на FastAPI та GPT-4.

## Архітектура

### Frontend (Next.js)
- **Компонент**: `src/components/ChatFormGPT.tsx`
- **API роути**: `src/app/api/chat/route.ts`
- **Стилі**: Tailwind CSS + кастомні стилі

### Backend (Python FastAPI)
- **AI сервер**: `ai-server/main.py`
- **Модель**: GPT-4 через OpenAI API
- **Контейнеризація**: Docker

## Основні функції

### 1. Чат-інтерфейс
- **Багаточатовість**: Підтримка множинних чатів з історією
- **Збереження**: Автоматичне збереження в localStorage
- **Пошук**: Фільтрація чатів за назвою
- **Редагування**: Зміна назв чатів
- **Видалення**: Видалення чатів з очищенням даних

### 2. AI-взаємодія
- **Типізація**: Ефект друкування для AI-відповідей
- **Контекст**: Збереження історії повідомлень
- **Продовження**: Можливість продовжити незакінчену відповідь
- **Зображення**: Підтримка завантаження зображень

### 3. Експорт даних
- **Формати**: CSV, Excel (XLSX), PDF, TXT, JSON
- **Реальні файли**: Генерація справжніх файлів (не HTML)
- **Кодування**: Правильне UTF-8 кодування для кирилиці

### 4. Google Ads інтеграція
- **OAuth2**: Авторизація через Google
- **Реальні дані**: Отримання даних з Google Ads API
- **Mock-дані**: Тестові дані для демонстрації
- **Аналіз**: AI-аналіз показників кампаній

## Особливості реалізації

### Типізація (Typing Effect)

#### Проблема
При переключенні між чатами або оновленні сторінки AI-повідомлення починали друкуватися заново.

#### Рішення
```typescript
// Відстеження показаних повідомлень
const [shownMessages, setShownMessages] = useState<Set<string>>(() => {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage.getItem('chatTypedMessages');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  }
  return new Set();
});

// Генерація унікального ID повідомлення
const lastMessageId = `${currentChatId}-${messages.length}-${lastAiMsg.slice(0, 50)}`;

// Перевірка чи повідомлення вже показано
const isNewMessage = !shownMessages.has(lastMessageId) && 
  messages.length > 1 && 
  messages[messages.length - 2]?.role === 'user' && 
  messages[messages.length - 1]?.role === 'ai';
```

#### Ключові моменти
- **Збереження в localStorage**: `shownMessages` зберігається між сесіями
- **Унікальні ID**: Комбінація chatId + індекс + початок тексту
- **Очищення**: Видалення застарілих записів при видаленні чатів
- **Переривання**: Зупинка typing effect при зміні чату

### Експорт файлів

#### Проблема
Кнопки експорту генерували HTML-файли замість справжніх документів, неправильне кодування кирилиці.

#### Рішення

##### Backend (Python)
```python
# PDF експорт з Puppeteer
@app.post("/export-pdf")
async def export_pdf(request: ExportRequest):
    # Генерація HTML
    html_content = generate_pdf_html(request.text)
    
    # Конвертація в PDF
    pdf = await generate_pdf_from_html(html_content)
    
    return StreamingResponse(
        io.BytesIO(pdf),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=chat_export.pdf"}
    )

# Excel експорт з exceljs
@app.post("/export-xlsx")
async def export_xlsx(request: ExportRequest):
    workbook = Workbook()
    worksheet = workbook.add_worksheet("Chat Export")
    
    # Запис даних з правильним кодуванням
    rows = parse_text_to_rows(request.text)
    for i, row in enumerate(rows):
        for j, cell in enumerate(row):
            worksheet.write(i, j, cell)
    
    # Збереження в буфер
    buffer = io.BytesIO()
    workbook.save(buffer)
    buffer.seek(0)
    
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=chat_export.xlsx"}
    )
```

##### Frontend (TypeScript)
```typescript
// Правильна обробка завантаження
const downloadFile = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};
```

#### Ключові моменти
- **Реальні файли**: Використання спеціалізованих бібліотек
- **Кодування**: UTF-8 для кирилиці
- **StreamingResponse**: Ефективна передача великих файлів
- **Content-Disposition**: Правильні заголовки для завантаження

### Збереження стану

#### Структура localStorage
```typescript
// Чати
localStorage.setItem('ppcset-chats', JSON.stringify(chats));

// Поточний чат
localStorage.setItem('ppcset-current-chat', currentChatId);

// Показані повідомлення
localStorage.setItem('chatTypedMessages', JSON.stringify(Array.from(shownMessages)));

// Тема
localStorage.setItem('chatTheme', theme);
```

#### Відновлення стану
```typescript
useEffect(() => {
  // Завантаження чатів
  const savedChats = localStorage.getItem('ppcset-chats');
  if (savedChats) {
    const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
      ...chat,
      createdAt: new Date(chat.createdAt),
      updatedAt: new Date(chat.updatedAt)
    }));
    setChats(parsedChats);
  }
  
  // Відновлення поточного чату
  const lastChatId = localStorage.getItem('ppcset-current-chat');
  if (lastChatId) {
    setCurrentChatId(lastChatId);
    const lastChat = parsedChats.find((c: Chat) => c.id === lastChatId);
    if (lastChat) {
      setMessages(lastChat.messages);
    }
  }
}, []);
```

## Вирішені проблеми

### 1. Повторний typing effect
**Проблема**: При оновленні сторінки AI-повідомлення друкувалися заново
**Рішення**: Збереження `shownMessages` в localStorage
**Результат**: Типізація запускається тільки для нових повідомлень

### 2. Неправильний експорт файлів
**Проблема**: Генерація HTML замість реальних файлів
**Рішення**: Використання Puppeteer для PDF та exceljs для Excel
**Результат**: Справжні файли з правильним кодуванням

### 3. Втрата стану при оновленні
**Проблема**: Втрата чатів та поточного стану
**Рішення**: Комплексне збереження в localStorage
**Результат**: Повне відновлення стану між сесіями

### 4. Переривання typing effect
**Проблема**: Typing effect продовжувався при зміні чату
**Рішення**: Переривання таймерів при `selectChat`
**Результат**: Коректна зупинка при переключенні

## Налаштування та конфігурація

### Environment Variables
```env
# AI Server
OPENAI_API_KEY=your_openai_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend
NEXT_PUBLIC_AI_SERVER_URL=http://localhost:8000
```

### Залежності
```json
{
  "dependencies": {
    "react-markdown": "^8.0.7",
    "exceljs": "^4.3.0",
    "puppeteer": "^21.0.0"
  }
}
```

## Рекомендації для майбутнього розвитку

### 1. Оптимізація продуктивності
- Віртуалізація списку повідомлень для великих чатів
- Ліниве завантаження історії
- Кешування AI-відповідей

### 2. Розширення функціональності
- Групування чатів по темах
- Експорт повної історії чату
- Інтеграція з іншими рекламними платформами

### 3. Покращення UX
- Автозбереження чернеток
- Швидкі команди (shortcuts)
- Темна/світла тема

### 4. Безпека
- Шифрування даних в localStorage
- Валідація вхідних даних
- Rate limiting для API

## Діагностика проблем

### Логування
Система має детальне логування для діагностики:
```typescript
console.log('=== START TYPING EFFECT ===');
console.log('Text length:', fullText.length);
console.log('Current chat ID:', currentChatId);
console.log('Message ID:', lastMessageId);
console.log('Already shown:', shownMessages.has(lastMessageId));
```

### Типові проблеми та рішення

1. **Typing effect не зупиняється**
   - Перевірити `typingTimeout.current`
   - Переконатися що `typingInterrupted.current = true`

2. **Файли не завантажуються**
   - Перевірити Content-Disposition заголовки
   - Переконатися що blob створюється правильно

3. **Втрата даних при оновленні**
   - Перевірити localStorage
   - Переконатися що JSON.parse не падає

4. **Повільна робота з великими чатами**
   - Розглянути віртуалізацію
   - Оптимізувати рендеринг повідомлень

---

*Документація оновлена: [Дата]*
*Версія системи: 1.0* 