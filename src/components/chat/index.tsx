'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Chat, GoogleAdsData, REPORT_TEMPLATES, EXPORT_ENDPOINTS, ExportFormat } from './types';
import { exportData, formatGoogleAdsData } from './utils';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AI_AVATAR, USER_AVATAR } from './components/Avatars';
import { MessageBubble } from './components/MessageBubble';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMessages } from './components/ChatMessages';

const ChatFormGPT: React.FC = () => {
  // Основные состояния
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Google Ads данные
  const [adsData, setAdsData] = useState<GoogleAdsData | null>(null);
  const [useAdsData, setUseAdsData] = useState(false);
  const [realAdsData, setRealAdsData] = useState<GoogleAdsData | null>(null);
  const [accountConnected, setAccountConnected] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  // UI состояния
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [openExportDropdownIdx, setOpenExportDropdownIdx] = useState<number | null>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('chatTheme', 'light');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showReportTemplates, setShowReportTemplates] = useState(false);
  const [showHelpExamples, setShowHelpExamples] = useState(false);
  const [showBottomTemplates, setShowBottomTemplates] = useState(false);
  
  // Чат состояния
  const [chats, setChats] = useLocalStorage<Chat[]>('ppcset-chats', []);
  const [currentChatId, setCurrentChatId] = useLocalStorage<string | null>('ppcset-current-chat', null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  // Изображения
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Typing эффект
  const [typingText, setTypingText] = useState<string | null>(null);
  const [shownMessagesArray, setShownMessagesArray] = useLocalStorage<string[]>('ppcset-shown-messages', []);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Конвертируем массив в Set для удобства работы
  const shownMessages = useMemo(() => new Set(shownMessagesArray), [shownMessagesArray]);
  const setShownMessages = useCallback((value: Set<string> | ((prev: Set<string>) => Set<string>)) => {
    const newSet = typeof value === 'function' ? value(shownMessages) : value;
    setShownMessagesArray(Array.from(newSet));
  }, [shownMessages, setShownMessagesArray]);
  
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const typingIndex = useRef(0);
  const typingInterrupted = useRef(false);

  // Мемоизированные значения
  const dataToUse = useMemo(() => realAdsData || adsData, [realAdsData, adsData]);
  const hasData = useMemo(() => dataToUse && dataToUse.campaigns && dataToUse.campaigns.length > 0, [dataToUse]);
  const filteredChats = useMemo(() => 
    chats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [chats, searchQuery]
  );

  // Placeholders
  const placeholders = useMemo(() => [
    "How can I improve my Google Ads campaign?",
    "Why is my CPA so high?",
    "Show me insights for my last 30 days",
    "What's wrong with my ad performance?",
    "How to optimize my budget allocation?"
  ], []);

  // Утилиты для работы с чатами
  const createNewChat = useCallback(() => {
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
  }, [setChats, setCurrentChatId]);

  const selectChat = useCallback((chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setInput('');
      setError(null);
      setShowSidebar(false);
    }
  }, [chats]);

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
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
  }, [currentChatId, chats.length, createNewChat]);

  const updateChatTitle = useCallback((chatId: string, title: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, title, updatedAt: new Date() } : c
    ));
    setEditingChatId(null);
    setEditingTitle('');
  }, []);

  // Typing эффект
  const startTypingEffect = useCallback((fullText: string) => {
    typingInterrupted.current = false;
    typingIndex.current = 0;
    setTypingText('');
    
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    
    const type = () => {
      if (typingInterrupted.current) {
        setTypingText(null);
        return;
      }
      
      const currentText = fullText.slice(0, typingIndex.current + 1);
      setTypingText(currentText);
      
      if (typingIndex.current < fullText.length - 1) {
        typingIndex.current++;
        typingTimeout.current = setTimeout(type, 12 + (typingIndex.current % 30));
      } else {
        setTypingText(null);
      }
    };
    
    type();
  }, []);

  // Функции экспорта
  const handleExport = useCallback(async (format: ExportFormat, data: any) => {
    const success = await exportData(format, data);
    if (success) {
      setOpenExportDropdownIdx(null);
    }
  }, []);

  // Обработка изображений
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setSelectedImage(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
  }, []);

  // Очистка чата
  const handleClear = useCallback(() => {
    setMessages([]);
    setError(null);
    setInput('');
    if (currentChatId) {
      setChats(prev => prev.map(c => 
        c.id === currentChatId 
          ? { ...c, messages: [], updatedAt: new Date() }
          : c
      ));
    }
    if (inputRef.current) {
      inputRef.current.style.height = '50px';
    }
    inputRef.current?.focus();
  }, [currentChatId]);

  // Основная функция отправки
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setError(null);
    setLoading(true);
    let question = input;

    // Проверка данных для анализа
    if (!hasData && (input.toLowerCase().includes('звіт') || input.toLowerCase().includes('аналіз') || input.toLowerCase().includes('report'))) {
      const instructionMessage = `Для генерації звітів потрібно активувати дані Google Ads. 

**Як активувати дані:**
1. Натисніть кнопку "Підключити Google Ads" внизу
2. Авторизуйтесь у вашому Google акаунті
3. Дозвольте доступ до Google Ads API
4. Після підключення ви зможете генерувати звіти на основі реальних даних

**Або використайте тестові дані:**
- Включіть перемикач "Використовувати дані Google Ads" внизу
- Система використає тестові дані для демонстрації`;

      const instructionMsg: Message = { role: 'ai', text: instructionMessage };
      setMessages((prev) => [...prev, { role: 'user', text: input }, instructionMsg]);
      setLoading(false);
      setInput('');
      setSelectedImage(null);
      setImagePreview(null);
      if (inputRef.current) {
        inputRef.current.style.height = '50px';
      }
      return;
    }

    // Auto-connect logic
    if (!hasData && useAdsData && !accountConnected) {
      setUseAdsData(true);
      setAccountConnected(true);
      fetch('/api/ads-data')
        .then(res => res.json())
        .then(data => {
          setAdsData(data);
          setLoading(false);
        })
        .catch(() => {
          setAdsData(null);
          setLoading(false);
        });
      return;
    }

    // Формирование запроса с данными Google Ads
    if (useAdsData && hasData && dataToUse) {
      const summary = formatGoogleAdsData(dataToUse, !!realAdsData);
      question = `${summary}\n\n${input}\n\nВикористовуй ТІЛЬКИ надані вище дані для аналізу. У кожному кроці посилайся на конкретні кампанії, цифри, метрики з цих даних. Дай рекомендації з опорою на фактичні показники. На завершення дай короткий summary і рекомендації для покращення результатів.`;
    }

    const userMessage: Message = { 
      role: 'user', 
      text: input,
      image: imagePreview || undefined
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Обновление текущего чата
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
    
    setInput('');
    setSelectedImage(null);
    setImagePreview(null);
    if (inputRef.current) {
      inputRef.current.style.height = '50px';
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
      
      // Обновление чата с AI ответом
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
  }, [input, hasData, useAdsData, accountConnected, dataToUse, realAdsData, currentChatId, messages, imagePreview]);

  // Функция генерации отчета по шаблону
  const generateReport = useCallback(async (templateKey: string) => {
    const template = REPORT_TEMPLATES[templateKey as keyof typeof REPORT_TEMPLATES];
    if (!template) return;

    setError(null);
    setLoading(true);
    
    if (!hasData) {
      const instructionMessage = `To generate "${template.name}" report, you need to activate Google Ads data. 

**How to activate data:**
1. Click "Connect Google Ads" button below
2. Authorize in your Google account
3. Allow access to Google Ads API
4. After connection, you can generate reports based on real data

**Or use test data:**
- Enable "Use Google Ads data" toggle below
- System will use test data for demonstration`;

      const instructionMsg: Message = { role: 'ai', text: instructionMessage };
      setMessages((prev) => [...prev, { role: 'user', text: `Generate ${template.name.toLowerCase()}` }, instructionMsg]);
      setLoading(false);
      return;
    }

    if (!dataToUse) return;

    const summary = formatGoogleAdsData(dataToUse, !!realAdsData);
    const question = `${summary}\n\n${template.prompt}\n\nВикористовуй ТІЛЬКИ надані вище дані для аналізу. Створи структурований звіт з розділами та рекомендаціями.`;

    const userMessage: Message = { 
      role: 'user', 
      text: `Згенеруй ${template.name.toLowerCase()}`
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Обновление чата
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

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      
      const data = await res.json();
      const aiMessage: Message = { role: 'ai', text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
      
      // Обновление чата с AI ответом
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
  }, [hasData, dataToUse, realAdsData, currentChatId, messages]);

  // Effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.chatTheme = theme;
    }
  }, [theme]);

  // Загрузка данных Google Ads
  useEffect(() => {
    fetch('/api/ads-data')
      .then(res => res.json())
      .then(data => setAdsData(data))
      .catch(() => setAdsData(null));
  }, []);

  // OAuth2 callback обработка
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const token = urlParams.get('access_token');
    const error = urlParams.get('error');

    if (authStatus === 'success' && token) {
      setAccessToken(token);
      setAccountConnected(true);
      setShowAccountModal(false);
      
      // Получение реальных данных Google Ads
      fetch('/api/ads-data-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token }),
      })
      .then(res => res.json())
      .then(data => setRealAdsData(data))
      .catch(error => console.error('Error fetching real Google Ads data:', error));
      
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      setError(`Помилка авторизації: ${error}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Focus на input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const chatDiv = chatEndRef.current?.parentElement;
    if (!chatDiv) return;
    const isAtBottom = chatDiv.scrollHeight - chatDiv.scrollTop - chatDiv.clientHeight < 50;
    if (isAtBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Typing эффект
  useEffect(() => {
    if (!loading && messages.length > 0 && messages[messages.length - 1].role === 'ai') {
      const lastAiMsg = messages[messages.length - 1].text;
      const messageId = `${currentChatId}-${messages.length}-${lastAiMsg.slice(0, 50)}`;
      
      if (!shownMessages.has(messageId) && typingText === null && lastAiMsg && lastAiMsg.length > 0) {
        startTypingEffect(lastAiMsg);
        setShownMessages(prev => new Set(Array.from(prev).concat([messageId])));
      }
    }
    if (loading) {
      setTypingText(null);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingInterrupted.current = false;
    }
  }, [messages, loading, shownMessages, currentChatId, typingText, startTypingEffect]);

  // Очистка таймера
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  // Placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Установка isMounted после монтирования
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Инициализация чатов после монтирования
  useEffect(() => {
    if (!isMounted) return;
    
    if (chats.length === 0) {
      createNewChat();
    } else {
      // Загружаем сообщения текущего чата
      const currentChat = chats.find(c => c.id === currentChatId);
      if (currentChat) {
        setMessages(currentChat.messages);
      } else if (chats.length > 0) {
        // Если текущий чат не найден, выбираем последний
        const newestChat = chats[chats.length - 1];
        setCurrentChatId(newestChat.id);
        setMessages(newestChat.messages);
      }
    }
  }, [chats, currentChatId, createNewChat, isMounted]);

  // Сохранение в localStorage автоматически через хуки

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && !target.closest('.export-dropdown') && !target.closest('button')) {
        setOpenExportDropdownIdx(null);
      }
    };
    
    if (openExportDropdownIdx !== null) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openExportDropdownIdx]);

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId && !(e.target as Element).closest('.chat-menu')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  // Не рендерим до монтирования для предотвращения гидратации
  if (!isMounted) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}>
        <div style={{ fontSize: '18px', color: '#23272f' }}>Loading...</div>
      </div>
    );
  }

  return (
          <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
      {/* Narrow sidebar background - visible only when sidebar is closed */}
      {!showSidebar && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '50px',
          height: '100vh',
          background: '#374151',
          borderRight: '1px solid #23272f',
          zIndex: 150,
        }} />
      )}

      {/* Fixed hamburger button - always visible */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        style={{
          position: 'fixed',
          left: '10px',
          top: '12px',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          border: '1px solid #e2e8f0',
          color: '#23272f',
          fontSize: 16,
          cursor: 'pointer',
          padding: '6px',
          borderRadius: 4,
          transition: 'all 0.2s',
          zIndex: 200,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={showSidebar ? 'Hide chat history' : 'Show chat history'}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)';
          e.currentTarget.style.border = '1px solid #cbd5e1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
          e.currentTarget.style.border = '1px solid #e2e8f0';
        }}
      >
        ☰
      </button>

      {/* New chat button (+) - visible only when sidebar is closed */}
      {!showSidebar && (
        <button
          onClick={createNewChat}
          style={{
            position: 'fixed',
            left: '10px',
            top: '52px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            border: '1px solid #e2e8f0',
            color: '#23272f',
            fontSize: 16,
            cursor: 'pointer',
            padding: '6px',
            borderRadius: 4,
            transition: 'all 0.2s',
            zIndex: 200,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '30px',
            height: '30px',
          }}
          title="New chat"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)';
            e.currentTarget.style.border = '1px solid #cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
            e.currentTarget.style.border = '1px solid #e2e8f0';
          }}
        >
          +
        </button>
      )}

      {/* Sidebar */}
      <div style={{
        width: showSidebar ? 250 : 0,
        background: '#374151',
        borderRight: '1px solid #23272f',
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
          padding: '10px 16px 20px 16px',
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
                borderRadius: 6,
                padding: '10px 16px',
                fontSize: 12,
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
        
        {/* Smart Mode Toggle */}
        {(adsData || realAdsData) && (
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid #1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#ffffff'
            }}>
              Smart Mode
            </div>
            <div
              onClick={() => setUseAdsData(v => !v)}
              style={{
                width: '40px',
                height: '22px',
                background: useAdsData ? '#667eea' : '#4b5563',
                borderRadius: '11px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title={realAdsData ? "Toggle real Google Ads data analysis" : "Toggle test Google Ads data analysis"}
            >
              <div style={{
                width: '18px',
                height: '18px',
                background: 'white',
                borderRadius: '50%',
                transform: useAdsData ? 'translateX(18px)' : 'translateX(0px)',
                transition: 'transform 0.2s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              color: useAdsData ? '#667eea' : '#ffffff',
              minWidth: '25px',
              textAlign: 'center'
            }}>
              {useAdsData ? 'ON' : 'OFF'}
            </div>
          </div>
        )}
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
          paddingLeft: showSidebar ? '250px' : '0',
          transition: 'padding-left 0.3s ease',
      }}>
        <div className="chat-root" style={{
          maxWidth: '900px',
          width: '100%',
          background: 'transparent',
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
          minHeight: 480,
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          padding: '0',
          boxSizing: 'border-box',
        }}>
      {/* Top bar */}
                    <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '22px 48px 12px 48px',
                borderBottom: '1px solid #e2e8f0',
                background: '#374151',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                marginTop: '16px',
              }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Removed: PPCSet AI text */}
        </div>
        {/* У top bar видаляю кнопку перемикача теми (іконка ☀️/🌙) */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* Theme toggle */}

          <button
            onClick={() => setShowReportTemplates(!showReportTemplates)}
            style={{
              background: showReportTemplates ? '#0ea5e9' : '#e6f7ff',
              color: showReportTemplates ? '#fff' : '#23272f',
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
            title="Show report templates"
          >
            Templates
          </button>
        </div>
      </div>

      {/* Google text and logo in top right corner */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '48px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
      }}>
        <span style={{
          color: '#1a1a1a',
          fontSize: '18px',
          fontWeight: '500',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        }}>
          Tools
        </span>
        <div 
          onClick={() => setShowAccountModal(true)}
          title="Connect"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '50%',
            border: accountConnected ? '2px solid #667eea' : 'none',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)',
            padding: '4px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)';
          }}
        >
          <img 
            src="https://img.icons8.com/color/48/google-ads.png" 
            alt="Google Ads" 
            style={{
              width: '24px',
              height: '24px'
            }}
          />
        </div>
        <div 
          title="Connect"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)',
            padding: '4px',
            marginTop: '4px'
          }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Google Analytics logo без белого фона */}
            <rect x="4" y="12" width="4" height="8" rx="1" fill="#FF9800"/>
            <rect x="9" y="8" width="4" height="12" rx="1" fill="#FF5722"/>
            <rect x="14" y="4" width="4" height="16" rx="1" fill="#F57C00"/>
          </svg>
        </div>
        
        {/* Clear Chat Icon */}
        <div 
          onClick={handleClear}
          title="Clear chat"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)',
            padding: '4px',
            cursor: 'pointer',
            marginTop: '4px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#23272f" strokeWidth="2"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="#23272f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Dropdown з шаблонами звітів */}
      {showReportTemplates && (
        <div style={{
          background: '#fff',
          border: '1.5px solid #e2e8f0',
          borderRadius: 12,
          margin: '0 48px 8px 48px',
          padding: '16px 20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>


          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 8,
          }}>
            {Object.entries(REPORT_TEMPLATES).map(([key, template]) => (
              <button
                key={key}
                type="button"
                onClick={() => generateReport(key)}
                disabled={loading}
                style={{
                  background: '#f8fafc',
                  color: '#23272f',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                  outline: 'none',
                  textAlign: 'left',
                  opacity: loading ? 0.6 : 1,
                }}
                title={template.description}
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{template.name}</div>
                <div style={{ fontSize: 12, color: '#666', lineHeight: 1.3 }}>{template.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Блок "Дані Google Ads підключені" */}

      {/* Chat history */}
      <ChatMessages
        messages={messages}
        typingText={typingText}
        useAdsData={useAdsData}
        adsData={adsData}
        copied={copied}
        openExportDropdownIdx={openExportDropdownIdx}
        loading={loading}
        onCopy={() => {
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            navigator.clipboard.writeText(lastMessage.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }
        }}
        onExport={handleExport}
        setOpenExportDropdownIdx={setOpenExportDropdownIdx}
      />
      <div ref={chatEndRef} />
      {/* Input */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: 16,
        padding: '18px 24px 32px 24px', // більше місця знизу
        borderTop: '1px solid #e2e8f0',
        background: 'transparent',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'flex-end',
        position: 'relative',
      }}>
        <div style={{ position: 'relative', flex: 1, marginLeft: '60px' }}>
          <textarea
            ref={inputRef}
            value={input}
                            onChange={e => {
                setInput(e.target.value);
                e.target.style.height = '50px';
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
    width: '720px',
    minHeight: 50,
    maxHeight: 260,
    resize: 'none',
    overflowY: 'auto',
    padding: '8px 15px 40px 15px', // увеличенный отступ слева для текста
    borderRadius: '12px',
    border: '1.2px solid #cbd5e1',
    fontSize: 15,
    fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
    lineHeight: 1.3,
    background: 'transparent',
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
              left: '7px', // отступ слева для иконки
              bottom: '6px', // отступ снизу для иконки
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
            title="Upload image"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#7f9cf5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </button>
          
          {/* Голосовой помощник */}
          <button
            type="button"
            onClick={() => {
              // TODO: Добавить функциональность голосового помощника
              console.log('Voice assistant clicked');
            }}
            style={{
              position: 'absolute',
              right: '120px', // сдвинули вправо
              bottom: '6px', // отступ снизу для иконки
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '4px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
            title="Voice assistant"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#7f9cf5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          
          {/* Кнопка отправки внутри textarea - Ромбік Kampaio */}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            data-disabled={(loading || !input.trim()).toString()}
            aria-label={loading || typingText !== null ? 'Зупинити друк відповіді' : 'Відправити'}
            style={{
              position: 'absolute',
              right: '85px', // сдвинули вправо
              bottom: '6px', // отступ снизу
              width: 32,
              height: 32,
              borderRadius: '4px',
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading || typingText !== null ? 'pointer' : 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 10,
            }}
            onClick={e => {
              if (typingText !== null) {
                typingInterrupted.current = true;
                setTypingText(null);
                if (typingTimeout.current) clearTimeout(typingTimeout.current);
                // Показати одразу повний текст
                const lastAiMsg = messages[messages.length - 1]?.text;
                if (lastAiMsg) setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, text: lastAiMsg } : m));
                e.preventDefault();
              }
            }}
          >
            {(loading || typingText !== null) ? (
              // Квадратик для зупинки (як у цьому чаті)
              <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                <rect x="5" y="5" width="12" height="12" rx="3" fill="#888" />
              </svg>
            ) : (
              // Ромбік Kampaio з літерою K
              <div 
                className="chat-send-rhombus"
                style={{
                  position: 'relative',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: loading || !input.trim() ? '#e2e8f0' : '#374151'
                }}></div>
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    zIndex: 1,
                    position: 'relative',
                    transition: 'stroke 0.2s ease'
                  }}
                >
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
            )}
          </button>
        </div>
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

      {/* Підказка під textarea */}
      <div style={{ color: '#64748b', fontSize: 14, margin: '0 48px 12px 48px', textAlign: 'center' }}>
        For a personalized answer, turn <b>"Smart Mode" ON</b> in the sidebar before submitting your question.
      </div>

      {/* Кнопки Templates та Help */}
      <div style={{
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        margin: '0 48px 16px 48px',
        position: 'relative',
      }}>
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowBottomTemplates(!showBottomTemplates)}
            style={{
              background: '#fff',
              color: '#23272f',
              border: '1.2px solid #e2e8f0',
              borderRadius: 8,
              padding: '8px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            Templates-2
          </button>

          {/* Dropdown для Templates-2 (окремий) */}
          {showBottomTemplates && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              padding: '8px',
              minWidth: 320,
              maxWidth: 400,
              zIndex: 1000,
              marginBottom: 8,
            }}>
              {/* Header з іконкою та кнопкою закриття */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" style={{ color: '#64748b' }}>
                  <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" fill="currentColor"/>
                </svg>
                <span style={{ 
                  flex: 1, 
                  fontSize: '12px', 
                  fontWeight: '500', 
                  color: '#64748b' 
                }}>
                  Google Ads Templates
                </span>
                <button
                  onClick={() => setShowBottomTemplates(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
                  </svg>
                </button>
              </div>
              
                             {/* Список шаблонів */}
               <ul style={{
                 listStyle: 'none',
                 padding: 0,
                 margin: 0,
                 fontSize: '14px'
               }}>
                 {[
                   { name: "Campaign Analysis", description: "Detailed campaign performance analysis" },
                   { name: "Keyword Analysis", description: "Keyword performance analysis" },
                   { name: "Monthly Report", description: "Comprehensive monthly report" },
                   { name: "Quick Analysis", description: "Quick overview of key metrics" },
                   { name: "Performance Review", description: "Detailed performance review" },
                   { name: "Budget Analysis", description: "Budget allocation and efficiency analysis" }
                 ].map((template, i) => (
                   <li key={i} style={{
                     borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none'
                   }}>
                     <button
                                             onClick={() => {
                        setInput(template.name);
                        setShowBottomTemplates(false);
                        // Автоматична відправка форми
                        setTimeout(() => {
                          const form = document.querySelector('form');
                          if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                        }, 100);
                      }}
                       style={{
                         width: '100%',
                         background: 'transparent',
                         border: 'none',
                         padding: '10px 8px',
                         fontSize: '14px',
                         textAlign: 'left',
                         cursor: 'pointer',
                         borderRadius: '8px',
                         transition: 'all 0.2s',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'space-between',
                         color: '#374151'
                       }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.background = '#f8fafc';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.background = 'transparent';
                       }}
                     >
                       <div style={{ flex: 1 }}>
                         <div style={{ fontWeight: '500', marginBottom: '2px' }}>{template.name}</div>
                         <div style={{ fontSize: '12px', color: '#64748b' }}>{template.description}</div>
                       </div>
                       <svg 
                         width="16" 
                         height="16" 
                         viewBox="0 0 256 256" 
                         fill="currentColor"
                         style={{ 
                           opacity: 0,
                           transition: 'opacity 0.2s',
                           color: '#64748b'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.opacity = '1';
                         }}
                       >
                         <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                       </svg>
                     </button>
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowHelpExamples(!showHelpExamples)}
          style={{
            background: '#fff',
            color: '#23272f',
            border: '1.2px solid #e2e8f0',
            borderRadius: 8,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help
        </button>
      </div>

             {/* Dropdown для Help */}
       {showHelpExamples && (
         <div style={{
           position: 'absolute',
           bottom: '100%',
           left: '50%',
           transform: 'translateX(-50%)',
           background: '#fff',
           border: '1px solid #e2e8f0',
           borderRadius: 12,
           boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
           padding: '16px',
           minWidth: 280,
           maxWidth: 400,
           zIndex: 1000,
           marginBottom: 8,
         }}>
           <div style={{
             fontSize: 14,
             fontWeight: 600,
             color: '#23272f',
             marginBottom: 12,
             textAlign: 'center',
           }}>
             Quick prompts
           </div>
           <div style={{
             display: 'flex',
             flexDirection: 'column',
             gap: 8,
           }}>
             {[
               "How can I improve my Google Ads campaign?",
               "Why is my CPA so high?",
               "Show me insights for my last 30 days."
             ].map((example, i) => (
               <button
                 key={i}
                 type="button"
                 onClick={() => {
                   setInput(example);
                   setShowHelpExamples(false);
                 }}
                 style={{
                   background: '#f8fafc',
                   color: '#23272f',
                   border: '1px solid #e2e8f0',
                   borderRadius: 8,
                   padding: '10px 12px',
                   fontSize: 14,
                   textAlign: 'left',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   outline: 'none',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.background = '#f1f5f9';
                   e.currentTarget.style.borderColor = '#cbd5e1';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.background = '#f8fafc';
                   e.currentTarget.style.borderColor = '#e2e8f0';
                 }}
               >
                 {example}
               </button>
             ))}
           </div>
         </div>
       )}

       {/* Dropdown для Templates (оригінальний) */}
       {showReportTemplates && (
         <div style={{
           position: 'absolute',
           bottom: '100%',
           left: '50%',
           transform: 'translateX(-50%)',
           background: '#fff',
           border: '1px solid #e2e8f0',
           borderRadius: 12,
           boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
           padding: '8px',
           minWidth: 320,
           maxWidth: 400,
           zIndex: 1000,
           marginBottom: 8,
         }}>
           {/* Header з іконкою та кнопкою закриття */}
           <div style={{
             display: 'flex',
             alignItems: 'center',
             gap: '8px',
             padding: '8px',
             borderBottom: '1px solid #f1f5f9',
             marginBottom: '4px'
           }}>
             <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor" style={{ color: '#64748b' }}>
               <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"/>
             </svg>
             <span style={{ 
               flex: 1, 
               fontSize: '12px', 
               fontWeight: '500', 
               color: '#64748b' 
             }}>
               Google Ads Templates
             </span>
             <button
               onClick={() => setShowReportTemplates(false)}
               style={{
                 background: 'none',
                 border: 'none',
                 color: '#64748b',
                 cursor: 'pointer',
                 padding: '4px',
                 borderRadius: '4px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 transition: 'all 0.2s'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = '#f1f5f9';
                 e.currentTarget.style.color = '#374151';
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.color = '#64748b';
               }}
             >
               <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                 <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
               </svg>
             </button>
           </div>
           
           {/* Список шаблонів */}
           <ul style={{
             listStyle: 'none',
             padding: 0,
             margin: 0,
             fontSize: '14px'
           }}>
             {[
               "Generate Performance Report",
               "Analyze Campaign Performance", 
               "Create Budget Optimization Plan",
               "Audit Ad Quality Score",
               "Generate Keyword Insights"
             ].map((template, i) => (
               <li key={i} style={{
                 borderBottom: i < 4 ? '1px solid #f1f5f9' : 'none'
               }}>
                 <button
                   onClick={() => {
                     setInput(template);
                     setShowReportTemplates(false);
                   }}
                   style={{
                     width: '100%',
                     background: 'transparent',
                     border: 'none',
                     padding: '10px 8px',
                     fontSize: '14px',
                     textAlign: 'left',
                     cursor: 'pointer',
                     borderRadius: '8px',
                     transition: 'all 0.2s',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     color: '#374151'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = '#f8fafc';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'transparent';
                   }}
                 >
                   <span>{template}</span>
                   <svg 
                     width="16" 
                     height="16" 
                     viewBox="0 0 256 256" 
                     fill="currentColor"
                     style={{ 
                       opacity: 0,
                       transition: 'opacity 0.2s',
                       color: '#64748b'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.opacity = '1';
                     }}
                   >
                     <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
                   </svg>
                 </button>
               </li>
             ))}
           </ul>
         </div>
       )}

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
              >Connect</button>
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