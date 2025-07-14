'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Chat, GoogleAdsData, REPORT_TEMPLATES, EXPORT_ENDPOINTS, ExportFormat } from './chat/types';
import { exportData, formatGoogleAdsData } from './chat/utils';
import { useLocalStorage } from './chat/hooks/useLocalStorage';
import { useTypingEffect } from './chat/hooks/useTypingEffect';
import { useGoogleAdsData } from './chat/hooks/useGoogleAdsData';
import { AI_AVATAR, USER_AVATAR } from './chat/components/Avatars';
import { ChatSidebar } from './chat/components/ChatSidebar';
import { MessageBubble } from './chat/components/MessageBubble';
import { ChatMessages } from './chat/components/ChatMessages';

const ChatFormGPT: React.FC = () => {
  // Основные состояния
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Google Ads данные
  const {
    adsData, setAdsData,
    useAdsData, setUseAdsData,
    realAdsData, setRealAdsData,
    accountConnected, setAccountConnected,
    accessToken, setAccessToken,
    dataToUse, hasData
  } = useGoogleAdsData();
  
  // UI состояния
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [openExportDropdownIdx, setOpenExportDropdownIdx] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' && window.localStorage.getItem('chatTheme') === 'dark' ? 'dark' : 'light'
  );
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showReportTemplates, setShowReportTemplates] = useState(false);
  
  // Чат состояния
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  
  // Изображения
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Typing эффект
  const { typingText, startTypingEffect, stopTypingEffect } = useTypingEffect();
  const [shownMessages, setShownMessages] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);


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
  }, []);

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
        inputRef.current.style.height = '40px';
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

  // Оптимізовані callback функції для повідомлень
  const handleCopyMessage = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, []);

  const handleExportMessage = useCallback(async (format: ExportFormat, data: any) => {
    const success = await exportData(format, data);
    if (success) {
      setOpenExportDropdownIdx(null);
    }
  }, []);

  const handleSetOpenExportDropdown = useCallback((index: number | null) => {
    setOpenExportDropdownIdx(index);
  }, []);

  // Effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.chatTheme = theme;
      window.localStorage.setItem('chatTheme', theme);
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
      stopTypingEffect();
    }
  }, [messages, loading, shownMessages, currentChatId, typingText, startTypingEffect]);



  // Placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Загрузка чатов из localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem('ppcset-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt)
      }));
      setChats(parsedChats);
      
      const lastChatId = localStorage.getItem('ppcset-current-chat');
      if (lastChatId && parsedChats.find((c: Chat) => c.id === lastChatId)) {
        setCurrentChatId(lastChatId);
        const lastChat = parsedChats.find((c: Chat) => c.id === lastChatId);
        if (lastChat) setMessages(lastChat.messages);
      } else if (parsedChats.length > 0) {
        const newestChat = parsedChats[parsedChats.length - 1];
        setCurrentChatId(newestChat.id);
        setMessages(newestChat.messages);
      }
    } else {
      createNewChat();
    }

    const savedShownMessages = localStorage.getItem('ppcset-shown-messages');
    if (savedShownMessages) {
      try {
        const parsed = JSON.parse(savedShownMessages);
        setShownMessages(new Set(parsed));
      } catch (e) {
        console.error('Error parsing shown messages:', e);
      }
    }
  }, [createNewChat]);

  // Сохранение в localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('ppcset-chats', JSON.stringify(chats));
    }
  }, [chats]);

  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('ppcset-current-chat', currentChatId);
    }
  }, [currentChatId]);

  useEffect(() => {
    if (shownMessages.size > 0) {
      localStorage.setItem('ppcset-shown-messages', JSON.stringify(Array.from(shownMessages)));
    }
  }, [shownMessages]);

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
      <ChatSidebar
        showSidebar={showSidebar}
        chats={chats}
        currentChatId={currentChatId}
        searchQuery={searchQuery}
        openMenuId={openMenuId}
        editingChatId={editingChatId}
        editingTitle={editingTitle}
        filteredChats={filteredChats}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
        onCreateNewChat={createNewChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        onUpdateChatTitle={updateChatTitle}
        onSetOpenMenuId={setOpenMenuId}
        onSetEditingChatId={setEditingChatId}
        onSetEditingTitle={setEditingTitle}
        onSetSearchQuery={setSearchQuery}
      />

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
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#23272f', margin: 0 }}>
              Report Templates
            </h3>
            <button
              onClick={() => {
                if (!accountConnected) {
                  // Auto-connect: включаємо тестові дані та показуємо модалку для реального підключення
                  setUseAdsData(true);
                  setAccountConnected(true);
                  fetch('/api/ads-data')
                    .then(res => res.json())
                    .then(data => setAdsData(data))
                    .catch(() => setAdsData(null));
                  
                  // Показуємо модалку для підключення реального акаунту
                  setTimeout(() => setShowAccountModal(true), 500);
                }
              }}
              style={{
                background: accountConnected ? '#e6f7ff' : '#fff',
                color: accountConnected ? '#0ea5e9' : '#23272f',
                border: '1.5px solid #0ea5e9',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              title="Automatic Google Ads connection"
            >
              {accountConnected ? 'Google Ads data added' : 'Auto-connect'}
            </button>
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
      <ChatMessages
        messages={messages}
        typingText={typingText}
        useAdsData={useAdsData}
        adsData={adsData}
        copied={copied}
        openExportDropdownIdx={openExportDropdownIdx}
        loading={loading}
        onCopy={handleCopyMessage}
        onExport={handleExportMessage}
        setOpenExportDropdownIdx={handleSetOpenExportDropdown}
      />
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
            if (typingText !== null) {
              stopTypingEffect();
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
  );
};

export default ChatFormGPT; 