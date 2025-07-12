'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

import { Message, Chat, GoogleAdsData, ExportFormat } from './chat/types';
import { EXPORT_ENDPOINTS, REPORT_TEMPLATES, PLACEHOLDERS } from './chat/constants';
import { exportData, formatGoogleAdsData } from './chat/utils';
import { useLocalStorage } from './chat/hooks/useLocalStorage';
import { useTypingEffect } from './chat/hooks/useTypingEffect';
import { AI_AVATAR, USER_AVATAR } from './chat/components/Avatars';
import { Sidebar } from './chat/components/Sidebar';
import { TopBar } from './chat/components/TopBar';
import { ChatMessages } from './chat/ChatMessages';

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
  const [typingText, setTypingText] = useState<string | null>(null);
  const [shownMessages, setShownMessages] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  
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
        typingTimeout.current = setTimeout(type, 12 + Math.random() * 30);
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
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        showSidebar={showSidebar}
        searchQuery={searchQuery}
        editingChatId={editingChatId}
        editingTitle={editingTitle}
        openMenuId={openMenuId}
        filteredChats={filteredChats}
        setShowSidebar={setShowSidebar}
        setSearchQuery={setSearchQuery}
        setEditingChatId={setEditingChatId}
        setEditingTitle={setEditingTitle}
        setOpenMenuId={setOpenMenuId}
        createNewChat={createNewChat}
        selectChat={selectChat}
        updateChatTitle={updateChatTitle}
        deleteChat={deleteChat}
      />

      {/* Top bar */}
      <TopBar
        accountConnected={accountConnected}
        adsData={adsData}
        realAdsData={realAdsData}
        useAdsData={useAdsData}
        showReportTemplates={showReportTemplates}
        setShowAccountModal={setShowAccountModal}
        setUseAdsData={setUseAdsData}
        setShowReportTemplates={setShowReportTemplates}
        handleClear={handleClear}
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
          
          {/* Chat Messages */}
          <ChatMessages
            messages={messages}
            loading={loading}
            isTyping={typingText !== null}
            typingText={typingText || ''}
            currentMessageIndex={0}
            currentCharIndex={0}
            type={() => {}}
            handleKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
            handleInputChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
            handleSubmit={handleSubmit}
            inputValue={input}
            textareaRef={inputRef}
            messagesEndRef={chatEndRef}
            scrollToBottom={() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
          />

        </div>
      </div>

      {/* Dropdown з шаблонами звітів */}
      {showReportTemplates && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
        }}>
          <div style={{
            background: '#fff',
            padding: '30px',
            borderRadius: 12,
            width: '90%',
            maxWidth: 600,
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ marginBottom: '20px', fontSize: 24, fontWeight: 700, color: '#23272f' }}>
              Generate Report
            </h2>
            <p style={{ marginBottom: '20px', color: '#555', fontSize: 16 }}>
              Choose a template to generate a report based on your Google Ads data.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
              marginTop: '20px',
            }}>
              {Object.entries(REPORT_TEMPLATES).map(([key, template]) => (
                <div
                  key={key}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: 12,
                    padding: '20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '1px solid transparent',
                  }}
                  onClick={() => generateReport(key)}
                  onMouseEnter={e => {
                    e.currentTarget.style.border = '1px solid #7f9cf5';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(127, 156, 245, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = '1px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{ marginBottom: '10px', fontSize: 18, fontWeight: 600, color: '#23272f' }}>
                    {template.name}
                  </h3>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: '10px' }}>
                    {template.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      generateReport(key);
                    }}
                    style={{
                      background: '#7f9cf5',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 12px',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(127, 156, 245, 0.2)',
                    }}
                  >
                    Generate Report
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowReportTemplates(false)}
              style={{
                marginTop: '20px',
                background: '#f0f0f0',
                color: '#23272f',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 

export default ChatFormGPT; 