'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string; // base64 або URL зображення
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Інтерфейси для шаблонів звітів
interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
}

type ReportType = 'campaign-analysis' | 'keyword-analysis' | 'monthly-report' | 'quick-analysis' | 'performance-review' | 'budget-analysis';

// Типи для системи підключення даних
type ConnectionState = 'disconnected' | 'connecting' | 'connected_test' | 'connected_real' | 'error';

interface DataStatus {
  hasData: boolean;
  dataType: 'real' | 'test' | 'none';
  dataSource: 'OAuth2' | 'mock' | null;
  connectionState: ConnectionState;
}

// Константи шаблонів звітів
const REPORT_TEMPLATES: Record<ReportType, ReportTemplate> = {
  'campaign-analysis': {
    id: 'campaign-analysis',
    name: 'Аналіз кампаній',
    description: 'Детальний аналіз ефективності Google Ads кампаній',
    icon: '📊',
    prompt: `Створи структурований звіт аналізу Google Ads кампаній.

ВАЖЛИВО: Використовуй ТІЛЬКИ надані дані Google Ads. Не вигадуй цифри.

Включи наступні розділи:

📊 ЗАГАЛЬНІ ПОКАЗНИКИ
• Загальні витрати, кліки, покази, CTR, CPC, конверсії, CR, ROAS, ROI з наданих даних
• Аналіз ефективності на основі реальних метрик

🏆 ТОП КАМПАНІЇ
• 3-5 найкращих кампаній з реальними метриками (включаючи ROAS)
• Що робить їх успішними (на основі даних)

👥 ДЕМОГРАФІЧНИЙ АНАЛІЗ
• Аналіз аудиторії за віком та статтю (якщо доступно)
• Ефективність різних демографічних сегментів

⚠️ ПРОБЛЕМНІ КАМПАНІЇ
• Кампанії з низькими показниками (з реальних даних)
• Конкретні проблеми та причини

💡 РЕКОМЕНДАЦІЇ
• Конкретні дії для покращення на основі аналізу
• Пріоритетні завдання
• Очікувані результати

Використай емодзі та структуроване форматування. Посилайся на конкретні кампанії та цифри з наданих даних.`
  },
  'keyword-analysis': {
    id: 'keyword-analysis',
    name: 'Аналіз ключових слів',
    description: 'Аналіз ефективності ключових слів та фраз',
    icon: '🔍',
    prompt: `Створи звіт аналізу ключових слів Google Ads.

ВАЖЛИВО: Використовуй ТІЛЬКИ надані дані Google Ads. Не вигадуй цифри.

Включи наступні розділи:

🔍 ВИСОКОЕФЕКТИВНІ КЛЮЧОВІ СЛОВА
• Ключові слова з високими конверсіями та Quality Score (з реальних даних)
• Їх характеристики та особливості

❌ ПРОБЛЕМНІ КЛЮЧОВІ СЛОВА
• Ключові слова з низькими показниками та Quality Score (з реальних даних)
• Причини неефективності

📈 СТАТИСТИКА ПО КАТЕГОРІЯМ
• Брендові, інформаційні, транзакційні ключові слова
• CTR, CPC, конверсії, Quality Score по категоріях

🎯 ОПТИМІЗАЦІЯ
• Ключові слова для підвищення ставок (високий Quality Score)
• Ключові слова для призупинення (низький Quality Score)
• Нові ключові слова для тестування

Використай емодзі та структуроване форматування. Посилайся на конкретні ключові слова та цифри з наданих даних.`
  },
  'monthly-report': {
    id: 'monthly-report',
    name: 'Місячний звіт',
    description: 'Комплексний місячний звіт з порівнянням',
    icon: '📅',
    prompt: `Створи комплексний місячний звіт Google Ads.

ВАЖЛИВО: Використовуй ТІЛЬКИ надані дані Google Ads. Не вигадуй цифри.

Включи наступні розділи:

📅 ЗАГАЛЬНИЙ ОГЛЯД МІСЯЦЯ
• Основні досягнення та ROAS, ROI
• Ключові метрики місяця

📈 ПОРІВНЯННЯ З ПОПЕРЕДНІМ МІСЯЦЕМ
• Зміни в витратах, кліках, конверсіях, ROAS
• Покращення або погіршення показників

👥 ДЕМОГРАФІЧНІ ТРЕНДИ
• Зміни в аудиторії за віком та статтю
• Ефективність різних сегментів

🎯 ДОСТИГНЕНІ ЦІЛІ
• Що було досягнуто
• Відсоток виконання планів

📊 ТРЕНДИ ТА АНАЛІЗ
• Зміни в поведінці аудиторії
• Сезонні тенденції
• Нові можливості

💡 ПЛАН НА НАСТУПНИЙ МІСЯЦЬ
• Конкретні цілі
• Стратегії досягнення
• Очікувані результати

Використай емодзі та професійне форматування. Посилайся на конкретні цифри з наданих даних.`
  },
  'quick-analysis': {
    id: 'quick-analysis',
    name: 'Швидкий аналіз',
    description: 'Швидкий огляд ключових проблем та рішень',
    icon: '⚡',
    prompt: `Створи швидкий аналіз Google Ads акаунту.

ВАЖЛИВО: Використовуй ТІЛЬКИ надані дані Google Ads. Не вигадуй цифри.

Включи наступні розділи:

⚡ КЛЮЧОВІ МЕТРИКИ
• ROI, ROAS, CPA, CPL з наданих даних
• Основні показники ефективності

🚨 КРИТИЧНІ ПРОБЛЕМИ
• Найважливіші проблеми для вирішення (з реальних даних)
• Їх вплив на результати

✅ ШВИДКІ ПЕРЕМОГИ
• Що працює добре (на основі даних)
• Що можна покращити легко

🎯 ШВИДКІ ДІЇ
• 3-5 конкретних дій на цей тиждень
• Очікувані результати

Використай емодзі та лаконічне форматування. Посилайся на конкретні цифри з наданих даних.`
  },
  'performance-review': {
    id: 'performance-review',
    name: 'Огляд продуктивності',
    description: 'Детальний аналіз продуктивності кампаній',
    icon: '📈',
    prompt: `Створи детальний огляд продуктивності Google Ads.

ВАЖЛИВО: Використовуй ТІЛЬКИ надані дані Google Ads. Не вигадуй цифри.

Включи наступні розділи:

📈 ПРОДУКТИВНІСТЬ КАМПАНІЙ
• Рейтинг кампаній за ефективністю (ROAS, ROI)
• ROI та ROAS по кампаніях з наданих даних

🎯 ЦІЛЬОВІ АУДИТОРІЇ
• Аналіз аудиторій за демографією (вік, стать)
• Ефективність різних сегментів

💰 БЮДЖЕТНА ЕФЕКТИВНІСТЬ
• Розподіл бюджету
• Ефективність витрат (ROI, ROAS)

📊 КОНВЕРСІЙНА ВИШКА
• Аналіз воронки конверсій
• Втрати на кожному етапі

💡 ОПТИМІЗАЦІЯ ПРОДУКТИВНОСТІ
• Конкретні рекомендації
• Пріоритетні завдання

Використай емодзі та детальне форматування. Посилайся на конкретні цифри з наданих даних.`
  },
  'budget-analysis': {
    id: 'budget-analysis',
    name: 'Аналіз бюджету',
    description: 'Аналіз розподілу та ефективності бюджету',
    icon: '💰',
    prompt: `Створи аналіз бюджету Google Ads.

ВАЖЛИВО: Використовуй ТІЛЬКИ надані дані Google Ads. Не вигадуй цифри.

Включи наступні розділи:

💰 РОЗПОДІЛ БЮДЖЕТУ
• Як розподілений бюджет по кампаніях
• Відсотки витрат

📊 ЕФЕКТИВНІСТЬ ВИТРАТ
• ROI та ROAS по кампаніях з наданих даних
• Найбільш ефективні витрати

🎯 БЮДЖЕТНІ РЕКОМЕНДАЦІЇ
• Куди збільшити бюджет (високий ROAS)
• Куди зменшити витрати (низький ROAS)

⚠️ ПРОБЛЕМИ БЮДЖЕТУ
• Неефективні витрати (з реальних даних)
• Перевитрати або недотрати

💡 ОПТИМІЗАЦІЯ БЮДЖЕТУ
• Конкретні зміни в розподілі
• Очікувані результати

Використай емодзі та структуроване форматування. Посилайся на конкретні цифри з наданих даних.`
  }
};

const AI_AVATAR = (
  <div style={{
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e6f7ff 0%, #cbd5e1 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#23272f',
    fontSize: 18,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  }}>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="3" height="7" rx="1.2" fill="#38bdf8" />
      <rect x="9" y="6" width="3" height="11" rx="1.2" fill="#0ea5e9" />
      <rect x="15" y="3" width="3" height="14" rx="1.2" fill="#23272f" />
    </svg>
  </div>
);

function getUserInitials() {
  return 'В';
}

const USER_AVATAR = (
  <div style={{
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#23272f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#fff',
    fontSize: 18,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  }}>
    {getUserInitials()}
  </div>
);

const ChatFormGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [adsData, setAdsData] = useState<any>(null);
  const [useAdsData, setUseAdsData] = useState(false);
  const [realAdsData, setRealAdsData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [accountConnected, setAccountConnected] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [openExportDropdownIdx, setOpenExportDropdownIdx] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(typeof window !== 'undefined' && window.localStorage.getItem('chatTheme') === 'dark' ? 'dark' : 'light');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showReportTemplates, setShowReportTemplates] = useState(false);

  // Універсальна функція перевірки стану даних
  const getDataStatus = (): DataStatus => {
    const hasData = useAdsData && (realAdsData || adsData);
    let dataType: 'real' | 'test' | 'none' = 'none';
    let dataSource: 'OAuth2' | 'mock' | null = null;
    let connectionState: ConnectionState = 'disconnected';

    if (hasData) {
      if (realAdsData) {
        dataType = 'real';
        dataSource = 'OAuth2';
        connectionState = 'connected_real';
      } else if (adsData) {
        dataType = 'test';
        dataSource = 'mock';
        connectionState = 'connected_test';
      }
    }

    return {
      hasData,
      dataType,
      dataSource,
      connectionState
    };
  };

  // Функція для майбутнього автоматичного підключення
  const autoConnectToGoogleAds = async (): Promise<boolean> => {
    try {
      // В майбутньому тут буде логіка автоматичного підключення
      // Наприклад: перевірка збережених токенів, автоматичний OAuth2 flow
      console.log('=== AUTO CONNECT TO GOOGLE ADS ===');
      
      // Поки що просто активуємо тестові дані
      if (!useAdsData) {
        setUseAdsData(true);
        // Чекаємо трохи щоб стан оновився
        await new Promise(resolve => setTimeout(resolve, 100));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Auto connect failed:', error);
      return false;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.chatTheme = theme;
      window.localStorage.setItem('chatTheme', theme);
    }
  }, [theme]);

  // typing-ефект через ref
  const typingTextRef = useRef<string | null>(null);
  const typingInterrupted = useRef(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const typingIndex = useRef(0);
  const [typingText, setTypingText] = useState<string | null>(null);
  const [shownMessages, setShownMessages] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('chatTypedMessages');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  const startTypingEffect = (fullText: string) => {
    console.log('=== START TYPING EFFECT ===');
    console.log('Text length:', fullText.length);
    console.log('Current chat ID:', currentChatId);
    
    typingInterrupted.current = false;
    typingIndex.current = 0;
    typingTextRef.current = '';
    setTypingText('');
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    const type = () => {
      if (typingInterrupted.current) {
        console.log('=== TYPING INTERRUPTED ===');
        setTypingText(null);
        typingTextRef.current = null;
        return;
      }
      typingTextRef.current = fullText.slice(0, typingIndex.current + 1);
      setTypingText(typingTextRef.current);
      if (typingIndex.current < fullText.length - 1) {
        typingIndex.current++;
        typingTimeout.current = setTimeout(type, 12 + Math.random() * 30);
      } else {
        console.log('=== TYPING COMPLETED ===');
        setTypingText(null);
        typingTextRef.current = null;
      }
    };
    type();
  };

  // Закривати dropdown при кліку поза меню та кнопкою
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      console.log('=== GLOBAL CLICK HANDLER ===');
      console.log('Target:', e.target);
      console.log('Current target:', e.currentTarget);
      
      // Перевіряємо, чи клік був всередині dropdown меню
      const target = e.target as Element;
      const isInsideDropdown = target.closest('[data-export-dropdown]');
      
      if (!isInsideDropdown) {
        console.log('Click outside dropdown - closing');
        setOpenExportDropdownIdx(null);
      } else {
        console.log('Click inside dropdown - keeping open');
      }
    };
    if (openExportDropdownIdx !== null) {
      document.addEventListener('click', handleClick);
    } else {
      document.removeEventListener('click', handleClick);
    }
    return () => document.removeEventListener('click', handleClick);
  }, [openExportDropdownIdx]);

  // Підвантаження mock-даних при першому рендері
  useEffect(() => {
    fetch('/api/ads-data')
      .then(res => res.json())
      .then(data => setAdsData(data))
      .catch(() => setAdsData(null));
  }, []);

  // Обробка OAuth2 callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const token = urlParams.get('access_token');
    const error = urlParams.get('error');

    if (authStatus === 'success' && token) {
      setAccessToken(token);
      setAccountConnected(true);
      setShowAccountModal(false);
      // Отримуємо реальні дані Google Ads
      fetchRealAdsData(token);
      // Очищаємо URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      setError(`Помилка авторизації: ${error}`);
      // Очищаємо URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Функція для отримання реальних даних Google Ads
  const fetchRealAdsData = async (token: string) => {
    try {
      const response = await fetch('/api/ads-data-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRealAdsData(data);
      } else {
        console.error('Failed to fetch real Google Ads data');
      }
    } catch (error) {
      console.error('Error fetching real Google Ads data:', error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const chatDiv = chatEndRef.current?.parentElement;
    if (!chatDiv) return;
    const isAtBottom = chatDiv.scrollHeight - chatDiv.scrollTop - chatDiv.clientHeight < 50;
    if (isAtBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Запуск typing-ефекту при новій AI-відповіді
  useEffect(() => {
    // Зупиняємо попередній typing effect при зміні чату
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
      typingInterrupted.current = true;
      setTypingText(null);
      typingTextRef.current = null;
    }
    
    // Запускаємо typing effect тільки для нових AI повідомлень
    if (!loading && messages.length > 0 && messages[messages.length - 1].role === 'ai') {
      const lastAiMsg = messages[messages.length - 1].text;
      // Перевіряємо, чи це нове повідомлення (не було показано раніше)
      if (typingText === null && lastAiMsg && lastAiMsg.length > 0) {
        // Перевіряємо, чи це дійсно нове повідомлення
        const lastMessageId = `${currentChatId}-${messages.length}-${lastAiMsg.slice(0, 50)}`;
        const isNewMessage = !shownMessages.has(lastMessageId) && 
          messages.length > 1 && 
          messages[messages.length - 2]?.role === 'user' && 
          messages[messages.length - 1]?.role === 'ai';
        
        if (isNewMessage) {
          console.log('=== NEW AI MESSAGE DETECTED ===');
          console.log('Message ID:', lastMessageId);
          setShownMessages(prev => {
            const newSet = new Set(Array.from(prev).concat(lastMessageId));
            // Зберігаємо в localStorage
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('chatTypedMessages', JSON.stringify(Array.from(newSet)));
            }
            return newSet;
          });
          startTypingEffect(lastAiMsg);
        } else {
          console.log('=== EXISTING AI MESSAGE - NO TYPING EFFECT ===');
          console.log('Message ID:', lastMessageId);
          console.log('Already shown:', shownMessages.has(lastMessageId));
        }
      }
    }
    if (loading) {
      setTypingText(null);
      typingTextRef.current = null;
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingInterrupted.current = false;
    }
    // eslint-disable-next-line
  }, [messages, loading, currentChatId]);

  // Очищення таймера при анмаунті
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  // Динамічний placeholder для textarea
  const placeholders = [
    "How can I improve my Google Ads campaign?",
    "Why is my CPA so high?",
    "Show me insights for my last 30 days",
    "What's wrong with my ad performance?",
    "How to optimize my budget allocation?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Завантаження історії чатів з localStorage
  useEffect(() => {
    console.log('=== LOADING CHATS FROM LOCALSTORAGE ===');
    const savedChats = localStorage.getItem('ppcset-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt)
      }));
      console.log('Loaded chats:', parsedChats.length);
      setChats(parsedChats);
      
      // Відновлюємо останній активний чат
      const lastChatId = localStorage.getItem('ppcset-current-chat');
      if (lastChatId && parsedChats.find((c: Chat) => c.id === lastChatId)) {
        setCurrentChatId(lastChatId);
        const lastChat = parsedChats.find((c: Chat) => c.id === lastChatId);
        if (lastChat) {
          console.log('Restoring last chat with messages:', lastChat.messages.length);
          console.log('Last message role:', lastChat.messages[lastChat.messages.length - 1]?.role);
          console.log('All messages:', lastChat.messages.map((m: Message) => ({ role: m.role, text: m.text.slice(0, 50) + '...' })));
          console.log('Full messages:', JSON.stringify(lastChat.messages, null, 2));
          setMessages(lastChat.messages);
        }
      } else if (parsedChats.length > 0) {
        // Якщо останній чат не знайдено, беремо найновіший
        const newestChat = parsedChats[parsedChats.length - 1];
        setCurrentChatId(newestChat.id);
        console.log('Restoring newest chat with messages:', newestChat.messages.length);
        setMessages(newestChat.messages);
      }
    } else {
      // Створюємо перший чат
      console.log('Creating new chat');
      createNewChat();
    }
  }, []);

  // Збереження чатів у localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('ppcset-chats', JSON.stringify(chats));
    }
  }, [chats]);

  // Збереження поточного чату
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('ppcset-current-chat', currentChatId);
    }
  }, [currentChatId]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
    setMessages([]);
    setInput('');
    setError(null);
    
    // Очищаємо shownMessages при створенні нового чату
    setShownMessages(new Set());
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('chatTypedMessages', JSON.stringify([]));
    }
  };

  const selectChat = (chatId: string) => {
    console.log('=== SELECT CHAT CALLED ===');
    console.log('Chat ID:', chatId);
    
    // Зупиняємо typing effect при зміні чату
    if (typingTimeout.current) {
      console.log('=== STOPPING TYPING EFFECT ON CHAT SWITCH ===');
      clearTimeout(typingTimeout.current);
      typingInterrupted.current = true;
      setTypingText(null);
      typingTextRef.current = null;
    }
    
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      console.log('Chat messages:', chat.messages.length);
      console.log('Last message role:', chat.messages[chat.messages.length - 1]?.role);
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setInput('');
      setError(null);
      setShowSidebar(false); // Закриваємо sidebar на мобільних
    }
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    
    // Очищаємо застарілі записи з shownMessages для видаленого чату
    setShownMessages(prev => {
      const newSet = new Set(Array.from(prev).filter(id => !id.startsWith(chatId + '-')));
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('chatTypedMessages', JSON.stringify(Array.from(newSet)));
      }
      return newSet;
    });
    
    if (currentChatId === chatId) {
      if (chats.length > 1) {
        const remainingChats = chats.filter(c => c.id !== chatId);
        const lastChat = remainingChats[remainingChats.length - 1];
        setCurrentChatId(lastChat.id);
        setMessages(lastChat.messages);
      } else {
        createNewChat();
      }
    }
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, title, updatedAt: new Date() } : c
    ));
    setEditingChatId(null);
    setEditingTitle('');
  };

  // Фільтрація чатів по пошуковому запиту
  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Закрити меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId && !(e.target as Element).closest('.chat-menu')) {
        setOpenMenuId(null);
      }
      if (showReportTemplates && !(e.target as Element).closest('[data-report-templates]')) {
        setShowReportTemplates(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId, showReportTemplates]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('=== HANDLE SUBMIT CALLED ===');
    console.log('Event type:', e.type);
    console.log('Input value:', input);
    console.log('Input length:', input.length);
    console.log('Loading state:', loading);
    console.log('Messages count:', messages.length);
    console.log('Stack trace:', new Error().stack);
    
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
    let question = input;
    // Якщо обрано використати дані Google Ads — додаємо їх у prompt
    if (useAdsData) {
      const dataToUse = realAdsData || adsData; // Пріоритет реальним даним
      if (dataToUse) {
        // Формуємо людяний summary для prompt
        const total = dataToUse.total;
        const campaigns = dataToUse.campaigns.map((c: any) =>
          `- ${c.name} (${c.status}): витрати $${c.cost}, кліки ${c.clicks}, покази ${c.impressions}, конверсії ${c.conversions}, CTR ${c.ctr}%, CPC $${c.cpc}, CR ${c.conversion_rate}%`
        ).join('\n');
        const dataSource = realAdsData ? 'реальними даними з вашого Google Ads акаунту' : 'тестовими даними';
        const summary = `У моєму акаунті Google Ads за ${dataToUse.date_range} (${dataSource}):
Всього витрати: $${total.cost}, кліки: ${total.clicks}, покази: ${total.impressions}, конверсії: ${total.conversions}, CTR: ${total.ctr}%, CPC: $${total.cpc}, CR: ${total.conversion_rate}%.
Кампанії:\n${campaigns}`;
        question = `${summary}\n${input}\nВикористовуй дані вище для аналізу. У кожному кроці посилайся на конкретні кампанії, цифри, метрики з цих даних. Дай рекомендації з опорою на фактичні показники. На завершення дай короткий summary і рекомендації для покращення результатів.`;
      }
    }
    const userMessage: Message = { 
      role: 'user', 
      text: input,
      image: imagePreview || undefined
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Оновлюємо поточний чат
    if (currentChatId) {
      const updatedMessages = [...messages, userMessage];
      setChats(prev => prev.map(c => 
        c.id === currentChatId 
          ? { 
              ...c, 
              messages: updatedMessages,
              title: c.title === 'New chat' ? input.slice(0, 30) + (input.length > 30 ? '...' : '') : c.title,
              updatedAt: new Date()
            }
          : c
      ));
    }
    
    setInput(''); // Очищаю поле одразу після submit
    setSelectedImage(null); // Очищаю зображення
    setImagePreview(null); // Очищаю preview
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
    }
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question,
          image: imagePreview // Додаємо зображення до запиту
        }),
      });
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      const data = await res.json();
      const aiMessage: Message = { role: 'ai', text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
      
      // Оновлюємо поточний чат з AI відповіддю
      if (currentChatId) {
        const updatedMessages: Message[] = [...messages, userMessage, aiMessage];
        setChats(prev => prev.map(c => 
          c.id === currentChatId 
            ? { ...c, messages: updatedMessages, updatedAt: new Date() }
            : c
        ));
      }
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setInput('');
    // Очищаємо поточний чат
    if (currentChatId) {
      setChats(prev => prev.map(c => 
        c.id === currentChatId 
          ? { ...c, messages: [], updatedAt: new Date() }
          : c
      ));
    }
    inputRef.current?.focus();
  };

  // Додаємо функцію для продовження відповіді
  const handleContinue = async () => {
    console.log('=== HANDLE CONTINUE CALLED ===');
    setError(null);
    setLoading(true);
    // Знаходимо оригінальне питання (перший user)
    const originalUserMsg = messages.find(m => m.role === 'user')?.text || '';
    // Беремо останню відповідь AI
    const lastAiMsg = messages.filter(m => m.role === 'ai').slice(-1)[0]?.text || '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Ось оригінальне питання: ${originalUserMsg}\nОсь попередня частина відповіді:\n${lastAiMsg}\nПродовжуй з того місця, де зупинився, не повторюй попередній текст.`
        }),
      });
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  // Функція для створення звіту за шаблоном
  const createReportFromTemplate = async (reportType: ReportType, autoConnect: boolean = false) => {
    console.log('=== CREATE REPORT FROM TEMPLATE ===');
    console.log('Report type:', reportType);
    console.log('Auto connect:', autoConnect);
    
    const template = REPORT_TEMPLATES[reportType];
    if (!template) {
      setError('Шаблон звіту не знайдено');
      return;
    }

    setError(null);
    setLoading(true);
    setShowReportTemplates(false);

    // Отримуємо статус даних через універсальну функцію
    let dataStatus = getDataStatus();
    
    // Якщо немає даних і включено автоматичне підключення
    if (!dataStatus.hasData && autoConnect) {
      console.log('Attempting auto connect...');
      const connected = await autoConnectToGoogleAds();
      if (connected) {
        // Чекаємо трохи більше для оновлення стану
        await new Promise(resolve => setTimeout(resolve, 200));
        // Оновлюємо статус після підключення
        dataStatus = getDataStatus();
        console.log('Auto connect successful, data status:', dataStatus);
      }
    }
    
    let question: string;
    
    if (!dataStatus.hasData) {
      // Якщо немає даних - створюємо інструкцію
      question = `Користувач хоче створити звіт "${template.name}", але не надав дані Google Ads.

Створи дружню інструкцію українською мовою:

📊 ${template.name.toUpperCase()} - ПІДГОТОВКА

Для створення детального звіту "${template.name}" мені потрібні дані з вашого Google Ads акаунту.

🔗 ЩО РОБИТИ:
1. Натисніть кнопку "Use Google Ads data" вище
2. Я отримаю тестові дані для демонстрації
3. Потім натисніть "${template.name}" знову

💡 АЛЬТЕРНАТИВА:
Якщо у вас є реальний Google Ads акаунт:
- Підключіть його через OAuth2
- Я отримаю справжні дані з вашого кабінету

🚀 В МАЙБУТНЬОМУ:
Система буде автоматично підключатися до вашого Google Ads акаунту при виборі шаблону звіту.

Після підключення даних я створю детальний звіт з:
• Реальними показниками ваших кампаній
• Конкретними рекомендаціями
• ${template.description}

Використай емодзі та дружній тон.`;
    } else {
      // Якщо є дані - створюємо звіт
      const dataToUse = realAdsData || adsData;
      const total = dataToUse.total;
      const campaigns = dataToUse.campaigns.map((c: any) =>
        `- ${c.name} (${c.status}): витрати $${c.cost}, кліки ${c.clicks}, покази ${c.impressions}, конверсії ${c.conversions}, CTR ${c.ctr}%, CPC $${c.cpc}, CR ${c.conversion_rate}%`
      ).join('\n');
      const dataSource = realAdsData ? 'реальними даними з вашого Google Ads акаунту' : 'тестовими даними';
      const summary = `У моєму акаунті Google Ads за ${dataToUse.date_range} (${dataSource}):
Всього витрати: $${total.cost}, кліки: ${total.clicks}, покази: ${total.impressions}, конверсії: ${total.conversions}, CTR: ${total.ctr}%, CPC: $${total.cpc}, CR: ${total.conversion_rate}%.
Кампанії:\n${campaigns}`;
      question = `${summary}\n\n${template.prompt}\n\nВАЖЛИВО: Використовуй ТІЛЬКИ надані дані вище. Не вигадуй цифри. У кожному розділі посилайся на конкретні кампанії, цифри, метрики з цих даних. Дай конкретні рекомендації з опорою на фактичні показники.`;
    }

    const userMessage: Message = { 
      role: 'user', 
      text: `Створи звіт: ${template.name}`,
      image: imagePreview || undefined
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Оновлюємо поточний чат
    if (currentChatId) {
      const updatedMessages = [...messages, userMessage];
      setChats(prev => prev.map(c => 
        c.id === currentChatId 
          ? { 
              ...c, 
              messages: updatedMessages,
              title: c.title === 'New chat' ? template.name : c.title,
              updatedAt: new Date()
            }
          : c
      ));
    }
    
    setInput('');
    setSelectedImage(null);
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question,
          image: imagePreview
        }),
      });
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      const data = await res.json();
      const aiMessage: Message = { role: 'ai', text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
      
      // Оновлюємо поточний чат з AI відповіддю
      if (currentChatId) {
        const updatedMessages: Message[] = [...messages, userMessage, aiMessage];
        setChats(prev => prev.map(c => 
          c.id === currentChatId 
            ? { ...c, messages: updatedMessages, updatedAt: new Date() }
            : c
        ));
      }
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  // Додаю функції для експорту
  const testClick = () => {
    console.log('=== TEST CLICK FUNCTION CALLED ===');
    alert('Test click works!');
  };

  const exportTxt = async (text: string) => {
    console.log('=== EXPORT TXT FUNCTION CALLED ===');
    console.log('Text to export:', text);
    console.log('Text length:', text.length);
    try {
      console.log('Starting TXT export...');
      const res = await fetch('/api/export-txt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', res.headers);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const blob = await res.blob();
      console.log('Blob size:', blob.size);
      console.log('Blob type:', blob.type);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
      a.style.display = 'none';
      
      console.log('Adding link to DOM...');
      document.body.appendChild(a);
      
      console.log('Clicking link...');
      a.click();
      
      console.log('Cleaning up...');
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('TXT export completed successfully');
      return true; // Успешное завершение
    } catch (error) {
      console.error('Export TXT error:', error);
      alert('Помилка при експорті файлу: ' + (error instanceof Error ? error.message : String(error)));
      return false; // Ошибка
    }
  };

  const exportCsv = async (rows: string[][]) => {
    console.log('=== EXPORT CSV FUNCTION CALLED ===');
    console.log('Rows to export:', rows);
    console.log('Rows count:', rows.length);
    try {
      // Convert rows array to data format expected by API
      const data = rows.map(row => {
        const obj: any = {};
        row.forEach((value, index) => {
          obj[`Column${index + 1}`] = value;
        });
        return obj;
      });
      
      console.log('Converted data:', data);
      
      const res = await fetch('/api/export-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, filename: 'chat-export' }),
      });
      
      console.log('CSV Response status:', res.status);
      console.log('CSV Response headers:', res.headers);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const blob = await res.blob();
      console.log('CSV Blob size:', blob.size);
      console.log('CSV Blob type:', blob.type);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('CSV export completed successfully');
    } catch (error) {
      console.error('Export CSV error:', error);
      alert('Помилка при експорті файлу');
    }
  };

  const exportPdf = async (text: string) => {
    console.log('=== EXPORT PDF FUNCTION CALLED ===');
    console.log('Text to export:', text);
    console.log('Text length:', text.length);
    try {
      console.log('Starting PDF export...');
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, title: 'AI Chat Export' }),
      });
      
      console.log('PDF Response status:', res.status);
      console.log('PDF Response headers:', res.headers);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const blob = await res.blob();
      console.log('PDF Blob size:', blob.size);
      console.log('PDF Blob type:', blob.type);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;
      a.style.display = 'none';
      
      console.log('Adding link to DOM...');
      document.body.appendChild(a);
      
      console.log('Clicking link...');
      a.click();
      
      console.log('Cleaning up...');
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('PDF export completed successfully');
      return true;
    } catch (error) {
      console.error('Export PDF error:', error);
      alert('Помилка при експорті файлу: ' + (error instanceof Error ? error.message : String(error)));
      return false;
    }
  };

  const exportJson = async (text: string) => {
    console.log('=== EXPORT JSON FUNCTION CALLED ===');
    console.log('Text to export:', text);
    console.log('Text length:', text.length);
    try {
      console.log('Starting JSON export...');
      const res = await fetch('/api/export-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          title: 'AI Chat Export',
          metadata: {
            source: 'PPCSet Chat',
            exportType: 'AI Response'
          }
        }),
      });
      
      console.log('JSON Response status:', res.status);
      console.log('JSON Response headers:', res.headers);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const blob = await res.blob();
      console.log('JSON Blob size:', blob.size);
      console.log('JSON Blob type:', blob.type);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      a.style.display = 'none';
      
      console.log('Adding link to DOM...');
      document.body.appendChild(a);
      
      console.log('Clicking link...');
      a.click();
      
      console.log('Cleaning up...');
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('JSON export completed successfully');
      return true;
    } catch (error) {
      console.error('Export JSON error:', error);
      alert('Помилка при експорті файлу: ' + (error instanceof Error ? error.message : String(error)));
      return false;
    }
  };

  const exportXlsx = async (rows: string[][]) => {
    console.log('=== EXPORT XLSX FUNCTION CALLED ===');
    console.log('Rows to export:', rows);
    try {
      // Convert rows array to data format expected by API
      const data = rows.map(row => {
        const obj: any = {};
        row.forEach((value, index) => {
          obj[`Column${index + 1}`] = value;
        });
        return obj;
      });
      
      const res = await fetch('/api/export-xlsx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, filename: 'chat-export' }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-export-${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('XLSX export completed successfully');
    } catch (error) {
      console.error('Export XLSX error:', error);
      alert('Помилка при експорті Excel-файлу');
    }
  };

  // Функція для завантаження зображень
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Перевіряємо тип файлу
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Перевіряємо розмір файлу (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Створюємо preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Функція для видалення зображення
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
    }}>
      {/* Narrow sidebar background - visible only when sidebar is closed */}
      {!showSidebar && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '70px',
          height: '100vh',
          background: '#23272f',
          borderRight: '1px solid #1a1a1a',
          zIndex: 150,
        }} />
      )}

      {/* Fixed hamburger button - always visible */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        style={{
          position: 'fixed',
          left: '16px',
          top: '16px',
          background: '#23272f',
          border: '1px solid #1a1a1a',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          padding: '8px',
          borderRadius: 6,
          transition: 'all 0.2s',
          zIndex: 200,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        title={showSidebar ? 'Hide chat history' : 'Show chat history'}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#00ffe7';
          e.currentTarget.style.background = '#1a1a1a';
          e.currentTarget.style.border = '1px solid #00ffe7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.background = '#23272f';
          e.currentTarget.style.border = '1px solid #1a1a1a';
        }}
      >
        ☰
      </button>

      {/* New chat button (pencil) - visible only when sidebar is closed */}
      {!showSidebar && (
        <button
          onClick={createNewChat}
          style={{
            position: 'fixed',
            left: '16px',
            top: '60px',
            background: '#23272f',
            border: '1px solid #1a1a1a',
            color: '#fff',
            fontSize: 16,
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 6,
            transition: 'all 0.2s',
            zIndex: 200,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="New chat"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#00ffe7';
            e.currentTarget.style.background = '#1a1a1a';
            e.currentTarget.style.border = '1px solid #00ffe7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.background = '#23272f';
            e.currentTarget.style.border = '1px solid #1a1a1a';
          }}
        >
          ✏️
        </button>
      )}

      {/* Sidebar */}
      <div style={{
        width: showSidebar ? 280 : 0,
        background: '#23272f',
        borderRight: '1px solid #1a1a1a',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        zIndex: 100,
      }}>
        <div style={{
          padding: '12px 16px 20px 16px',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={createNewChat}
            style={{
              background: 'rgba(255,255,255,0.03)',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.2)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            New Chat
          </button>
        </div>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #1a1a1a',
              borderRadius: 6,
              fontSize: 14,
              background: '#1a1a1a',
              color: '#fff',
              outline: 'none',
            }}
            onFocus={e => {
              e.target.style.border = '1px solid #7f9cf5';
              e.target.style.boxShadow = '0 0 0 2px rgba(127, 156, 245, 0.2)';
            }}
            onBlur={e => {
              e.target.style.border = '1px solid #1a1a1a';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
        }}>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              style={{
                padding: '12px 16px',
                margin: '4px 0',
                borderRadius: 8,
                background: currentChatId === chat.id ? '#1a1a1a' : 'transparent',
                border: currentChatId === chat.id ? '1px solid #7f9cf5' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={() => selectChat(chat.id)}
              onMouseEnter={e => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.border = '1px solid #00ffe7';
                }
              }}
              onMouseLeave={e => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = '1px solid transparent';
                }
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateChatTitle(chat.id, editingTitle);
                      } else if (e.key === 'Escape') {
                        setEditingChatId(null);
                        setEditingTitle('');
                      }
                    }}
                    onBlur={() => {
                      if (editingTitle.trim()) {
                        updateChatTitle(chat.id, editingTitle);
                      } else {
                        setEditingChatId(null);
                        setEditingTitle('');
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '4px 8px',
                      border: '1px solid #7f9cf5',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 600,
                      background: '#fff',
                      color: '#23272f',
                      outline: 'none',
                    }}
                    autoFocus
                  />
                ) : (
                  <div style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#fff',
                    marginBottom: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {chat.title}
                  </div>
                )}
                <div style={{
                  fontSize: 12,
                  color: '#a0a0a0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
  
                </div>
              </div>
              <div style={{ position: 'relative' }} className="chat-menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === chat.id ? null : chat.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a0a0a0',
                    fontSize: 16,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 4,
                    transition: 'all 0.2s',
                    marginLeft: 8,
                  }}
                  title="More options"
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00ffe7';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#a0a0a0';
                  }}
                >
                  ⋯
                </button>
                {openMenuId === chat.id && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: '#1a1a1a',
                    border: '1px solid #7f9cf5',
                    borderRadius: 6,
                    boxShadow: '0 4px 12px rgba(127, 156, 245, 0.3)',
                    zIndex: 1000,
                    minWidth: 120,
                    marginTop: 4,
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingChatId(chat.id);
                        setEditingTitle(chat.title);
                        setOpenMenuId(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#7f9cf5';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#fff';
                      }}
                    >
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                        setOpenMenuId(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#ff6b6b';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#ff6b6b';
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: showSidebar ? '280px' : '0',
        transition: 'padding-left 0.3s ease',
      }}>
        <div className="chat-root" style={{
          maxWidth: '900px',
          width: '100%',
          background: '#1a1a1a',
          borderRadius: 0,
          boxShadow: showSidebar ? 'none' : '0 4px 32px rgba(0,0,0,0.3)',
          border: '1px solid #23272f',
          minHeight: 480,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 48px 12px 48px',
        borderBottom: '1px solid #23272f',
        background: '#23272f',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>
            PPCSet AI
          </span>
        </div>
        {/* У top bar видаляю кнопку перемикача теми (іконка ☀️/🌙) */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Theme toggle */}
          
          <button
            onClick={() => setShowAccountModal(true)}
            style={{
              background: accountConnected ? '#e6f7ff' : '#fff',
              color: accountConnected ? '#0ea5e9' : '#23272f',
              border: '1.5px solid #0ea5e9',
              borderRadius: 8,
              padding: '6px 18px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              marginRight: 8,
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
            title={accountConnected ? 'Google Ads account connected' : 'Connect Google Ads account'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 4 }}>
              <circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" fill={accountConnected ? '#0ea5e9' : 'none'} />
              <path d="M6 10l2.5 2.5L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: accountConnected ? 1 : 0 }} />
            </svg>
            {accountConnected ? 'Google Ads account connected' : 'Connect Google Ads account'}
          </button>
          {(adsData || realAdsData) && (
            <button
              onClick={() => setUseAdsData(v => !v)}
              style={{
                background: useAdsData ? '#0ea5e9' : '#e6f7ff',
                color: useAdsData ? '#fff' : '#23272f',
                border: '1.5px solid #0ea5e9',
                borderRadius: 8,
                padding: '6px 18px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                marginRight: 8,
                transition: 'background 0.2s',
              }}
              title={realAdsData ? "Add real Google Ads data to question" : "Add test Google Ads data to question"}
            >
              {useAdsData ? (realAdsData ? 'Real Google Ads data added' : 'Google Ads data added') : (realAdsData ? 'Use real Google Ads data' : 'Use Google Ads data')}
            </button>
          )}
          <button onClick={handleClear} style={{
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: 15,
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: 8,
            transition: 'background 0.2s',
          }} title="Clear chat">
            Clear chat
          </button>
          <button data-report-templates onClick={() => setShowReportTemplates(!showReportTemplates)} style={{
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: 15,
            cursor: 'pointer',
            padding: '4px 10px',
            borderRadius: 8,
            transition: 'background 0.2s',
          }} title="Report templates">
            📊 Templates
          </button>
        </div>
        
        {/* Dropdown меню шаблонів звітів */}
        {showReportTemplates && (
          <div data-report-templates style={{
            position: 'absolute',
            top: '100%',
            left: '48px',
            right: '48px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            zIndex: 1000,
            padding: '16px',
            marginTop: '8px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px',
            }}>
              {Object.values(REPORT_TEMPLATES).map((template) => (
                                  <button
                    key={template.id}
                    onClick={() => createReportFromTemplate(template.id as ReportType, false)}
                    disabled={loading}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    padding: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = '#e6f7ff';
                      e.currentTarget.style.border = '1px solid #0ea5e9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.border = '1px solid #e2e8f0';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{template.icon}</span>
                    <span style={{ 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#23272f' 
                    }}>
                      {template.name}
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#64748b', 
                    lineHeight: '1.4' 
                  }}>
                    {template.description}
                  </span>
                </button>
              ))}
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
            }}>
              <button
                onClick={() => createReportFromTemplate('campaign-analysis', true)}
                disabled={loading}
                style={{
                  background: '#e6f7ff',
                  border: '1px solid #0ea5e9',
                  color: '#0ea5e9',
                  fontSize: '14px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#0ea5e9';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#e6f7ff';
                    e.currentTarget.style.color = '#0ea5e9';
                  }
                }}
                title="Тест автоматичного підключення"
              >
                🚀 Auto Connect Test
              </button>
              <button
                onClick={() => setShowReportTemplates(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '14px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Блок "Дані Google Ads підключені" */}
      {useAdsData && (adsData || realAdsData) && (
        <div style={{
          background: realAdsData ? '#e6f7ff' : '#fff3cd',
          color: '#23272f',
          border: realAdsData ? '1.5px solid #0ea5e9' : '1.5px solid #ffc107',
          borderRadius: 12,
          margin: '0 48px 8px 48px',
          padding: '12px 18px',
          fontSize: 15,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}>
          <span style={{ fontWeight: 600, color: realAdsData ? '#0ea5e9' : '#856404' }}>
            {realAdsData ? 'Real Google Ads data connected' : 'Test Google Ads data connected'}
          </span>
          <details style={{ flex: 1 }}>
            <summary style={{ cursor: 'pointer', color: realAdsData ? '#0ea5e9' : '#856404', fontWeight: 400, fontSize: 15 }}>
              {realAdsData ? 'View real data' : 'View test data'}
            </summary>
            <pre style={{ fontSize: 13, background: '#f9fafc', borderRadius: 8, padding: 12, marginTop: 8, overflowX: 'auto' }}>
              {JSON.stringify(realAdsData || adsData, null, 2)}
            </pre>
          </details>
        </div>
      )}
      {/* Chat history */}
      <div style={{
        flex: 1,
        minHeight: '60vh',
        maxHeight: '70vh',
        overflowY: 'auto',
        padding: '24px 0',
        background: '#f9fafc',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: 'background 0.2s',
      }}>
        {messages.length === 0 && (
          <div style={{ 
            color: '#23272f', 
            padding: '48px 24px', 
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '1.5',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '600', color: '#7f9cf5' }}>
              Ready to boost your Google Ads performance?
            </div>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: 16,
            margin: '18px 0',
            opacity: 0.98,
            animation: 'fadeIn 0.5s',
          }}>
            <div style={{ flexShrink: 0 }}>
              {msg.role === 'user' ? USER_AVATAR : AI_AVATAR}
            </div>
            <span style={{
              display: 'inline-block',
              background: msg.role === 'user' ? '#fff' : '#e6f7ff',
              color: '#23272f',
              borderRadius: 12,
              padding: '10px 18px',
              maxWidth: 600,
              wordBreak: 'break-word',
              fontSize: 15,
              lineHeight: 1.4,
              boxShadow: msg.role === 'user' ? '0 2px 8px rgba(30, 144, 255, 0.04)' : '0 2px 8px rgba(0,0,0,0.03)',
              border: msg.role === 'user' ? '1.5px solid #e2e8f0' : '1.5px solid #e6f7ff',
              transition: 'background 0.2s',
              position: 'relative',
            }}>
              {msg.role === 'ai' && idx === messages.length - 1 && typingText !== null
                ? (
                  <span>
                    <ReactMarkdown
                      components={{
                        code: (props: any) =>
                          props.inline ? (
                            <code style={{
                              background: '#f5f5f5',
                              borderRadius: 6,
                              padding: '2px 6px',
                              fontSize: 16,
                              color: '#0ea5e9',
                            }}>{props.children}</code>
                          ) : (
                            <pre style={{
                              background: '#23272f',
                              color: '#fff',
                              borderRadius: 10,
                              padding: 16,
                              overflowX: 'auto',
                              margin: '12px 0',
                            }}><code>{props.children}</code></pre>
                          ),
                        a: ({node, ...props}) => <a style={{ color: '#0ea5e9', textDecoration: 'underline' }} {...props} />,
                        li: ({node, ...props}) => <li style={{ marginLeft: 18, marginBottom: 4 }} {...props} />,
                      }}
                    >
                      {typingText}
                    </ReactMarkdown>
                    <span style={{ opacity: 0.5 }}>|</span>
                  </span>
                )
                : msg.role === 'ai'
                  ? (
                    <>
                      <ReactMarkdown
                        components={{
                          code: (props: any) =>
                            props.inline ? (
                              <code style={{
                                background: '#f5f5f5',
                                borderRadius: 6,
                                padding: '2px 6px',
                                fontSize: 16,
                                color: '#0ea5e9',
                              }}>{props.children}</code>
                            ) : (
                              <pre style={{
                                background: '#23272f',
                                color: '#fff',
                                borderRadius: 10,
                                padding: 16,
                                overflowX: 'auto',
                                margin: '12px 0',
                              }}><code>{props.children}</code></pre>
                            ),
                          a: ({node, ...props}) => <a style={{ color: '#0ea5e9', textDecoration: 'underline' }} {...props} />,
                          li: ({node, ...props}) => <li style={{ marginLeft: 18, marginBottom: 4 }} {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                      {/* Summary + Copy для останньої AI-відповіді, якщо були дані Google Ads */}
                      {idx === messages.length - 1 && useAdsData && adsData && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                          <span style={{ color: '#0ea5e9', fontSize: 14, fontWeight: 500 }}>
                            Відповідь сформовано на основі ваших даних Google Ads
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.text);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1200);
                            }}
                            style={{
                              background: '#e6f7ff',
                              color: '#0ea5e9',
                              border: '1.2px solid #0ea5e9',
                              borderRadius: 8,
                              padding: '4px 14px',
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                            title="Скопіювати відповідь"
                          >
                            {copied ? 'Скопійовано!' : 'Скопіювати відповідь'}
                          </button>
                          {/* Кнопка експорту з іконкою та dropdown */}
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={() => setOpenExportDropdownIdx(openExportDropdownIdx === idx ? null : idx)}
                              style={{
                                background: '#f5f5f5',
                                color: '#23272f',
                                border: '1.2px solid #bdbdbd',
                                borderRadius: 8,
                                padding: '4px 14px 4px 10px',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                transition: 'background 0.2s',
                                minWidth: 44,
                              }}
                              title="Скачати звіт"
                            >
                              <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:2}}>
                                  <path d="M12 5v12"/>
                                  <path d="M6 13l6 6 6-6"/>
                                  <rect x="4" y="19" width="16" height="2" rx="1" fill="#23272f" stroke="none"/>
                                </svg>
                                <span>Скачати</span>
                              </span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:4}}>
                                <path d="M6 9l6 6 6-6"/>
                              </svg>
                            </button>
                            {openExportDropdownIdx === idx && (
                              <div 
                                data-export-dropdown="true"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  position: 'absolute',
                                  top: '110%',
                                  left: 0,
                                  background: '#fff',
                                  border: '1.2px solid #e2e8f0',
                                  borderRadius: 8,
                                  boxShadow: '0 4px 16px rgba(30,40,90,0.10)',
                                  minWidth: 140,
                                  zIndex: 100,
                                  padding: '6px 0',
                                }}
                              >
                               
                                <button
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    exportXlsx([["AI-відповідь"], [msg.text]]); 
                                    setOpenExportDropdownIdx(null); 
                                  }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.color = '#00ffe7';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                    e.currentTarget.style.color = '#23272f';
                                  }}
                                >
                                  Excel
                                </button>
                                <button
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    exportCsv([["AI-відповідь"], [msg.text]]); 
                                    setOpenExportDropdownIdx(null); 
                                  }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.color = '#00ffe7';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                    e.currentTarget.style.color = '#23272f';
                                  }}
                                >
                                  CSV
                                </button>
                                <button
                                  onClick={(e) => { 
                                    console.log('=== TXT BUTTON CLICKED ===');
                                    e.stopPropagation(); 
                                    console.log('stopPropagation called');
                                    console.log('TXT export button clicked!'); 
                                    exportTxt(msg.text); 
                                    setOpenExportDropdownIdx(null); 
                                  }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.color = '#00ffe7';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                    e.currentTarget.style.color = '#23272f';
                                  }}
                                >
                                  TXT
                                </button>
                                <button
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    exportPdf(msg.text); 
                                    setOpenExportDropdownIdx(null); 
                                  }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.color = '#00ffe7';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                    e.currentTarget.style.color = '#23272f';
                                  }}
                                >
                                  PDF
                                </button>
                                <button
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    exportJson(msg.text); 
                                    setOpenExportDropdownIdx(null); 
                                  }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.18s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.color = '#00ffe7';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'none';
                                    e.currentTarget.style.color = '#23272f';
                                  }}
                                >
                                  JSON
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )
                  : msg.text
              }
              {msg.image && (
                <div style={{ marginTop: '12px' }}>
                  <img
                    src={msg.image}
                    alt="Uploaded image"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  />
                </div>
              )}
            </span>
            {msg.role === 'ai' && (
  // Показуємо кнопки тільки якщо це не останнє AI-повідомлення з typingText, або якщо typingText === null
  ((idx !== messages.length - 1) || typingText === null) && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
      {/* Мінімалістична кнопка копіювання */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(msg.text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        style={{
          background: 'none',
          border: 'none',
          padding: 2,
          margin: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          boxShadow: 'none',
          minWidth: 0,
          minHeight: 0,
        }}
        title="Скопіювати"
      >
        {copied ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
      {/* Мінімалістична кнопка експорту */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={e => {
            e.stopPropagation();
            setOpenExportDropdownIdx(openExportDropdownIdx === idx ? null : idx);
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 2,
            margin: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            boxShadow: 'none',
            minWidth: 0,
            minHeight: 0,
          }}
          title="Скачати відповідь"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v12"/>
            <path d="M6 13l6 6 6-6"/>
            <rect x="4" y="19" width="16" height="2" rx="1" fill="#23272f" stroke="none"/>
          </svg>
        </button>
        {openExportDropdownIdx === idx && (
          <div 
            data-export-dropdown="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              background: '#fff',
              border: '1.2px solid #e2e8f0',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(30,40,90,0.10)',
              minWidth: 120,
              zIndex: 100,
              padding: '4px 0',
            }}
          >
            
            <button
              onClick={(e) => { e.stopPropagation(); exportXlsx([["AI-відповідь"], [msg.text]]); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#00ffe7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#23272f';
              }}
            >
              Excel
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); exportCsv([["AI-відповідь", msg.text]]); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#00ffe7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#23272f';
              }}
            >
              CSV
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); console.log('TXT export button clicked!'); exportTxt(msg.text); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#00ffe7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#23272f';
              }}
            >
              TXT
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); exportPdf(msg.text); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#00ffe7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#23272f';
              }}
            >
              PDF
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); exportJson(msg.text); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1a1a1a';
                e.currentTarget.style.color = '#00ffe7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.color = '#23272f';
              }}
            >
              JSON
            </button>
          </div>
        )}
      </div>
    </div>
  )
)}
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '18px 0 0 0', opacity: 0.85, animation: 'fadeIn 0.5s' }}>
            <div style={{ flexShrink: 0 }}>{AI_AVATAR}</div>
            <span style={{
              display: 'inline-block',
              background: '#e6f7ff',
              color: '#23272f',
              borderRadius: 16,
              padding: '14px 32px',
              maxWidth: 520,
              wordBreak: 'break-word',
              fontSize: 18,
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              border: '1.5px solid #e6f7ff',
              fontStyle: 'italic',
              letterSpacing: '0.5px',
            }}>
              AI думає…
            </span>
          </div>
        )}
        {/* Кнопка "Продовжити відповідь" */}
        {/* Видаляю блок: */}
        {/* {!loading && messages.length > 0 && messages[messages.length-1].role === 'ai' && (
          <div style={{ textAlign: 'center', margin: '12px 0' }}>
            <button onClick={handleContinue} style={{
              background: '#e6f7ff',
              color: '#23272f',
              border: '1.5px solid #0ea5e9',
              borderRadius: 10,
              padding: '10px 28px',
              fontSize: 17,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              marginTop: 8,
              transition: 'background 0.2s',
            }}>Продовжити відповідь</button>
          </div>
        )} */}
        <div ref={chatEndRef} />
      </div>
      {/* Input */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: 16,
        padding: '18px 24px 32px 24px', // більше місця знизу
        borderTop: '1px solid #e2e8f0',
        background: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'flex-end',
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              e.target.style.height = '40px';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!loading && input.trim()) {
                  // Викликаємо submit форми
                  (e.target as HTMLTextAreaElement).form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
              }
            }}
            placeholder={placeholders[placeholderIndex]}
            disabled={loading}
            rows={1}
            style={{
              width: '100%',
              minHeight: 40,
              maxHeight: 260,
              resize: 'none',
              overflowY: 'auto',
              padding: '8px 10px 8px 32px',
              borderRadius: '0 0 8px 8px',
              border: '1.2px solid #cbd5e1',
              fontSize: 15,
              fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
              lineHeight: 1.3,
              background: '#f9fafc',
              color: '#23272f',
              outline: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.01)',
              transition: 'height 0.2s',
              boxSizing: 'border-box',
            }}
            autoFocus
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <button
            type="button"
            onClick={() => {
              document.getElementById('image-upload')?.click();
            }}
            style={{
              position: 'absolute',
              left: '6px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Upload image"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#7f9cf5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label={loading || typingText !== null ? 'Зупинити друк відповіді' : 'Відправити'}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: loading || typingText !== null ? '#e2e8f0' : '#23272f',
            color: loading || typingText !== null ? '#888' : '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            cursor: loading || typingText !== null ? 'pointer' : 'pointer',
            transition: 'background 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginLeft: 8
          }}
          onClick={e => {
            if (typingText !== null && typingTextRef.current !== null) {
              typingInterrupted.current = true;
              setTypingText(null);
              typingTextRef.current = null;
              if (typingTimeout.current) clearTimeout(typingTimeout.current);
              // Показати одразу повний текст
              const lastAiMsg = messages[messages.length - 1]?.text;
              if (lastAiMsg) setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, text: lastAiMsg } : m));
              e.preventDefault();
            }
          }}
        >
          {(loading || typingText !== null) ? (
            // Квадратик (як у цьому чаті)
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="5" y="5" width="12" height="12" rx="3" fill="#888" />
            </svg>
          ) : (
            // Стрілочка
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 11L19 3L11 19L10 13L3 11Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </form>
      
      {/* Image preview */}
      {imagePreview && (
        <div style={{
          padding: '0 24px 16px 24px',
          background: '#fff',
        }}>
          <div style={{
            position: 'relative',
            display: 'inline-block',
            maxWidth: '200px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
          }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
            <button
              onClick={removeImage}
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Remove image"
            >
              ×
            </button>
          </div>
        </div>
      )}
      {/* Example prompt suggestions under textarea */}
      <div style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        margin: '0 48px 10px 48px',
        flexWrap: 'wrap',
      }}>
        {[
          "How can I improve my Google Ads campaign?",
          "Why is my CPA so high?",
          "Show me insights for my last 30 days."
        ].map((example, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInput(example)}
            style={{
              background: '#f5f5f5',
              color: '#23272f',
              border: '1.2px solid #e2e8f0',
              borderRadius: 8,
              padding: '7px 16px',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.18s, border 0.18s',
              marginBottom: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              outline: 'none',
              whiteSpace: 'nowrap',
            }}
            tabIndex={0}
            aria-label={`Insert example: ${example}`}
          >
            {example}
          </button>
        ))}
      </div>
      {/* Підказка під textarea */}
      <div style={{ color: '#888', fontSize: 14, margin: '0 48px 12px 48px', textAlign: 'center' }}>
        For a personalized answer, click <b>"Use Google Ads data"</b> before submitting your question.
      </div>
      {error && <div style={{ color: 'red', margin: '0 48px 10px 48px' }}>{error}</div>}
      {/* Модалка-заглушка для підключення акаунта */}
      {showAccountModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '36px 32px',
            minWidth: 340,
            maxWidth: 420,
            textAlign: 'center',
            position: 'relative',
          }}>
            <button onClick={() => setShowAccountModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: 12 }}>
              <circle cx="24" cy="24" r="22" stroke="#0ea5e9" strokeWidth="3" fill={accountConnected ? '#e6f7ff' : '#fff'} />
              <path d="M16 24l6 6L36 16" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: accountConnected ? 1 : 0 }} />
            </svg>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#23272f', marginBottom: 10 }}>
              {accountConnected ? 'Google Ads account connected!' : 'Connect Google Ads account'}
            </div>
            <div style={{ color: '#555', fontSize: 16, marginBottom: 24 }}>
              {accountConnected
                ? 'You have successfully connected your Google Ads account. Now AI can analyze your real data.'
                : 'Connect your Google Ads account to receive personalized recommendations based on real data.'}
            </div>
            {accountConnected ? (
              <button
                onClick={() => { 
                  setAccountConnected(false); 
                  setAccessToken(null);
                  setShowAccountModal(false); 
                }}
                style={{
                  background: '#fff',
                  color: '#0ea5e9',
                  border: '1.5px solid #0ea5e9',
                  borderRadius: 8,
                  padding: '10px 28px',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  marginTop: 8,
                  transition: 'background 0.2s',
                }}
              >Disconnect account</button>
            ) : (
              <button
                onClick={() => window.location.href = '/api/auth/login'}
                style={{
                  background: '#0ea5e9',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 28px',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  marginTop: 8,
                  transition: 'background 0.2s',
                }}
              >Connect Google Ads account</button>
            )}
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        [data-chat-theme="dark"] .chat-root {
          background: #23272f !important;
          color: #fff !important;
          border-color: #23272f !important;
          transition: background 0.3s, border 0.3s;
        }
        [data-chat-theme="dark"] .chat-root * {
          color: #fff !important;
          border-color: #23272f !important;
          transition: background 0.3s, color 0.3s, border 0.3s;
        }
        [data-chat-theme="dark"] .chat-root .description, [data-chat-theme="dark"] .chat-root .subtitle {
          color: #a0a0a0 !important;
        }
        [data-chat-theme="dark"] .chat-root textarea {
          background: #23272f !important;
          color: #fff !important;
          border-color: #7f9cf5 !important;
        }
        [data-chat-theme="dark"] .chat-root textarea::placeholder {
          color: #a0a0a0 !important;
        }
        [data-chat-theme="dark"] .chat-root button {
          background: #23272f !important;
          color: #7f9cf5 !important;
          border: 1.5px solid #7f9cf5 !important;
          box-shadow: none !important;
          transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
        }
        [data-chat-theme="dark"] .chat-root button:hover, [data-chat-theme="dark"] .chat-root button:focus {
          color: #00ffe7 !important;
          border-color: #00ffe7 !important;
          box-shadow: 0 0 8px #00ffe755 !important;
        }
        [data-chat-theme="dark"] .chat-root svg {
          color: #7f9cf5 !important;
          stroke: #7f9cf5 !important;
          transition: color 0.2s, stroke 0.2s;
        }
        [data-chat-theme="dark"] .chat-root button:hover svg, [data-chat-theme="dark"] .chat-root button:focus svg {
          color: #00ffe7 !important;
          stroke: #00ffe7 !important;
        }
        [data-chat-theme="dark"] .chat-root .ai-bubble {
          background: #23272f !important;
          border: 1.5px solid #23272f !important;
          color: #fff !important;
        }
        [data-chat-theme="dark"] .chat-root .user-bubble {
          background: #18191a !important;
          border: 1.5px solid #23272f !important;
          color: #fff !important;
        }
        [data-chat-theme="dark"] .chat-root .avatar {
          background: #1a1a1a !important;
        }
      `}</style>
        </div>
      </div>
    </div>
  );
};

export default ChatFormGPT; 