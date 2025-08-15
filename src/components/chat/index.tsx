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
  console.log("=== CHATFORMGPT INDEX: КОМПОНЕНТ ЗАВАНТАЖЕНО ===");
  
  // Основные состояния
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Google Ads данные
  const [adsData, setAdsData] = useState<GoogleAdsData | null>(null);
  const [useAdsData, setUseAdsData] = useState(false);
  const [realAdsData, setRealAdsData] = useState<GoogleAdsData | null>(null);
  const [accountConnected, setAccountConnected] = useState(() => {
    // Відновлюємо accountConnected з localStorage при ініціалізації
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kampaio-account-connected');
      console.log("=== CHATFORMGPT INDEX: accountConnected from localStorage:", saved);
      return saved === 'true';
    }
    return false;
  });
  const [accessToken, setAccessToken] = useLocalStorage<string | null>('kampaio-access-token', null);
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('kampaio-refresh-token', null);
  const [customerId, setCustomerId] = useLocalStorage<string | null>('kampaio-customer-id', '7024764145');
  
  // Устанавливаем customerId если он null
  useEffect(() => {
    if (!customerId) {
      console.log("=== CHATFORMGPT INDEX: Setting default customerId ===");
      setCustomerId('7024764145');
    }
  }, [customerId, setCustomerId]);
  const [dateRange, setDateRange] = useLocalStorage<{preset: string} | null>('kampaio-date-range', {preset: 'last_30_days'});
  
  // Отладка токенов при инициализации
  useEffect(() => {
    console.log("=== CHATFORMGPT INDEX: Токены при инициализации ===");
    console.log("accessToken:", accessToken ? "present" : "null");
    console.log("refreshToken:", refreshToken ? "present" : "null");
    console.log("accountConnected:", accountConnected);
  }, [accessToken, refreshToken, accountConnected]);
  
  // UI состояния
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [openExportDropdownIdx, setOpenExportDropdownIdx] = useState<number | null>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('chatTheme', 'light');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [showHelpExamples, setShowHelpExamples] = useState(false);
  const [showBottomTemplates, setShowBottomTemplates] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userCurrentPassword, setUserCurrentPassword] = useState(''); // Храним текущий пароль пользователя
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Состояние для уведомления об успехе
  
  // Чат состояния
  const [chats, setChats] = useLocalStorage<Chat[]>('kampaio-chats', []);
  const [currentChatId, setCurrentChatId] = useLocalStorage<string | null>('kampaio-current-chat', null);
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
  const [shownMessagesArray, setShownMessagesArray] = useLocalStorage<string[]>('kampaio-shown-messages', []);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Пользователь
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  
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

  // Получение данных пользователя
  useEffect(() => {
    console.log("=== CHATFORMGPT INDEX: useEffect user data ===");
    // Получаем email из URL параметров или localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    const storedEmail = localStorage.getItem('userEmail');
    
    const email = emailFromUrl || storedEmail || 'chornyi.vitali@gmail.com';
    setUserEmail(email);
    
    // Извлекаем имя из email
    const emailPart = email.split('@')[0];
    
    // Если есть точка, берем часть после точки (имя)
    let name = emailPart;
    if (emailPart.includes('.')) {
      name = emailPart.split('.')[1] || emailPart.split('.')[0];
    }
    
    // Проверяем, что имя не состоит только из цифр
    if (/^\d+$/.test(name)) {
      name = 'User'; // Если только цифры, используем "User"
    }
    
    // Форматируем имя: первая буква заглавная, остальные строчные
    let formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    
    // Специальная обработка для конкретных email
    if (email === 'chornyi.vitali@gmail.com') {
      formattedName = 'Vitaliy';
    }
    
    // Если имя слишком короткое или странное, используем "User"
    if (formattedName.length < 2 || /^[^a-zA-Z]/.test(formattedName)) {
      formattedName = 'User';
    }
    
    setUserName(formattedName);
    
    // Сохраняем email в localStorage
             if (email) {
           localStorage.setItem('userEmail', email);
         }
         
         // Инициализируем текущий пароль пользователя из localStorage или дефолтный
         const storedPassword = localStorage.getItem('userCurrentPassword');
         setUserCurrentPassword(storedPassword || 'password123');
       }, []);

  // Функция выхода из системы
  const handleLogout = () => {
    // Очищаем данные пользователя, но НЕ удаляем userCurrentPassword
    localStorage.removeItem('userEmail');
    // localStorage.removeItem('userCurrentPassword'); // НЕ удаляем пароль при выходе
          localStorage.removeItem('kampaio-chats');
          localStorage.removeItem('kampaio-current-chat');
      localStorage.removeItem('kampaio-shown-messages');
    
    // Перенаправляем на страницу входа
    window.location.href = '/login';
  };

  // Функция начала редактирования профиля
  const handleStartEditProfile = () => {
    setEditName(userName);
    setEditEmail(userEmail);
    setIsEditingProfile(true);
  };

  // Функция сохранения профиля
  const handleSaveProfile = () => {
    // В реальном приложении здесь будет API запрос
    // Пока просто обновляем локальные данные
    if (editName.trim() && editEmail.includes('@')) {
      // Обновляем userName и userEmail
      // В реальном приложении нужно обновить localStorage и возможно API
      setIsEditingProfile(false);
      // Здесь можно добавить уведомление об успешном сохранении
    }
  };

  // Функция отмены редактирования
  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
    setEditName('');
    setEditEmail('');
  };

  // Функция начала смены пароля
  const handleStartChangePassword = () => {
    setIsChangingPassword(true);
    setCurrentPassword(userCurrentPassword); // Автоматически заполняем текущим паролем
    setNewPassword('');
    setConfirmNewPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  // Функция сохранения нового пароля
  const handleSavePassword = () => {
    // Валидация
    if (!currentPassword.trim()) {
      alert('Please enter your current password');
      return;
    }
    if (newPassword.length < 8) {
      alert('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    // Проверяем, что введенный текущий пароль совпадает с сохраненным
    if (currentPassword !== userCurrentPassword) {
      alert('Current password is incorrect');
      return;
    }

    // СРАЗУ сохраняем новый пароль в состояние и localStorage
    setUserCurrentPassword(newPassword);
    localStorage.setItem('userCurrentPassword', newPassword);

    // Закрываем форму и очищаем ВСЕ поля
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    
    // ПОСЛЕ сохранения показываем уведомление
    setShowSuccessMessage(true);
    
    // Автоматически скрываем уведомление через 3 секунды
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Функция отмены смены пароля
  const handleCancelChangePassword = () => {
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  // Мемоизированные значения
  const dataToUse = useMemo(() => {
    console.log("=== CHATFORMGPT INDEX: dataToUse calculation ===");
    console.log("realAdsData:", realAdsData ? "present" : "null");
    console.log("adsData:", adsData ? "present" : "null");
    
    const result = realAdsData || adsData;
    console.log("dataToUse result:", result ? "present" : "null");
    
    if (result) {
      console.log("dataToUse campaigns count:", result.campaigns?.length || 0);
      if (result.campaigns && result.campaigns.length > 0) {
        console.log("First campaign:", result.campaigns[0].name);
      }
    }
    
    return result;
  }, [realAdsData, adsData]);
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
      c.id === chatId ? { ...c, title: title.trim(), updatedAt: new Date() } : c
    ));
    setEditingChatId(null);
    setEditingTitle('');
  }, [setChats, setEditingChatId, setEditingTitle]);

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
    console.log("=== CHATFORMGPT INDEX: HANDLE SUBMIT ВИКЛИКАНО ===");
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
      console.log("=== CHATFORMGPT INDEX: Auto-connect logic ===");
      setUseAdsData(true);
      setAccountConnected(true);
      
      // Если есть токены, загружаем реальные данные
      if (accessToken && refreshToken) {
        console.log("=== CHATFORMGPT INDEX: Auto-connect з реальними даними ===");
        fetch('/api/ads-data-real', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            accessToken: accessToken,
            refreshToken: refreshToken 
          }),
        })
        .then(res => res.json())
        .then(data => {
          console.log('Auto-connect real data received:', data);
          setRealAdsData(data);
          setLoading(false);
        })
        .catch(() => {
          console.log('Auto-connect real data failed, loading test data');
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
        });
      } else {
        console.log("=== CHATFORMGPT INDEX: Auto-connect з тестовими даними ===");
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
      }
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
      // ДЕТАЛЬНЕ ЛОГУВАННЯ CHATFORMGPT INDEX
      console.log("=== CHATFORMGPT INDEX: Дані перед відправкою ===");
      console.log("dataToUse:", dataToUse);
      console.log("accessToken:", accessToken ? "present" : "null");
      console.log("refreshToken:", refreshToken ? "present" : "null");
      console.log("question:", question);
      
      const requestBody = { 
        question,
        adsData: dataToUse,
        accessToken,
        refreshToken
      };
      
      console.log("=== CHATFORMGPT INDEX: Request body ===");
      console.log(JSON.stringify(requestBody, null, 2));
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
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
  }, [input, hasData, useAdsData, accountConnected, dataToUse, realAdsData, currentChatId, messages, imagePreview, accessToken, refreshToken]);

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
    console.log("=== CHATFORMGPT INDEX: Завантаження даних Google Ads ===");
    console.log("accessToken:", accessToken ? "present" : "null");
    console.log("refreshToken:", refreshToken ? "present" : "null");
    console.log("accessToken value:", accessToken);
    console.log("refreshToken value:", refreshToken);
    console.log("dateRange:", dateRange);
    console.log("accountConnected before:", accountConnected);
    
    // Скидаємо accountConnected якщо токени відсутні
    if (!accessToken && !refreshToken) {
      console.log("=== ТОКЕНИ ВІДСУТНІ - СКИДАЄМО accountConnected ===");
      setAccountConnected(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('kampaio-account-connected');
      }
    } else {
      console.log("=== ТОКЕНИ Є - ЗАЛИШАЄМО accountConnected ===");
    }
    
    // Загружаем данные в зависимости от наличия токенов
    if (accessToken && refreshToken) {
      console.log("=== CHATFORMGPT INDEX: Завантаження реальних даних Google Ads ===");
      fetch('/api/ads-data-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accessToken: accessToken,
          refreshToken: refreshToken,
          customerId: customerId,
          dateRange: dateRange
        }),
      })
      .then(res => res.json())
      .then(data => {
        console.log('Real Google Ads data received:', data);
        setRealAdsData(data);
      })
      .catch(error => {
        console.error('Error fetching real Google Ads data:', error);
        console.log('Falling back to test data');
        fetch('/api/ads-data')
          .then(res => res.json())
          .then(data => setAdsData(data))
          .catch(() => setAdsData(null));
      });
    } else {
      console.log("=== CHATFORMGPT INDEX: Завантаження тестових даних ===");
      fetch('/api/ads-data')
        .then(res => res.json())
        .then(data => setAdsData(data))
        .catch(() => setAdsData(null));
    }
  }, [accessToken, refreshToken, customerId, dateRange]);

  // OAuth2 callback обработка
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const token = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    const error = urlParams.get('error');

    console.log('=== OAuth CALLBACK START ===');
    console.log('OAuth callback - authStatus:', authStatus, 'token:', token ? token.substring(0, 20) + '...' : 'null', 'refreshToken:', refreshToken ? 'present' : 'null');
    console.log('Current accountConnected state:', accountConnected);
    console.log('Current localStorage state:', {
      accessToken: typeof window !== 'undefined' ? (localStorage.getItem('googleAdsAccessToken') ? 'present' : 'null') : 'SSR',
      refreshToken: typeof window !== 'undefined' ? (localStorage.getItem('googleAdsRefreshToken') ? 'present' : 'null') : 'SSR',
      customerId: typeof window !== 'undefined' ? (localStorage.getItem('googleAdsCustomerId') ? 'present' : 'null') : 'SSR'
    });

    if (authStatus === 'success' && token) {
      console.log('OAuth success, token found:', token.substring(0, 20) + '...');
      console.log('Setting accessToken to localStorage...');
      setAccessToken(token);
      if (refreshToken) {
        console.log('Setting refreshToken to localStorage...');
        setRefreshToken(refreshToken);
        console.log('Refresh token saved');
      }
      setAccountConnected(true);
      setShowAccountModal(false);
      
      // Зберігаємо accountConnected в localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('kampaio-account-connected', 'true');
        console.log('=== SAVED accountConnected TO LOCALSTORAGE ===');
      }
      
      // Логування після встановлення стану
      console.log('=== AFTER SETTING STATE ===');
      console.log('accountConnected set to true');
      console.log('showAccountModal set to false');
      
      // Перевірка localStorage після встановлення
      setTimeout(() => {
        console.log('=== CHECKING LOCALSTORAGE AFTER SET ===');
        console.log('localStorage after set:', {
          accessToken: typeof window !== 'undefined' ? (localStorage.getItem('googleAdsAccessToken') ? 'present' : 'null') : 'SSR',
          refreshToken: typeof window !== 'undefined' ? (localStorage.getItem('googleAdsRefreshToken') ? 'present' : 'null') : 'SSR',
          customerId: typeof window !== 'undefined' ? (localStorage.getItem('googleAdsCustomerId') ? 'present' : 'null') : 'SSR'
        });
      }, 100);
      
      // ДЕТАЛЬНЕ ЛОГУВАННЯ ПЕРЕД FETCH
      console.log('=== ДЕТАЛЬНЕ ЛОГУВАННЯ ===');
      console.log('refreshToken from URL:', refreshToken);
      console.log('refreshToken type:', typeof refreshToken);
      console.log('refreshToken length:', refreshToken ? refreshToken.length : 'null');
      console.log('Sending to backend:', {
        accessToken: token ? token.substring(0, 20) + '...' : 'null',
        refreshToken: refreshToken ? 'present' : 'null'
      });
      
      // Получение реальных данных Google Ads
      fetch('/api/ads-data-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accessToken: token,
          refreshToken: refreshToken,
          customerId: customerId,
          dateRange: dateRange
        }),
      })
      .then(res => {
        console.log('ads-data-real response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('ads-data-real data received:', data);
        setRealAdsData(data);
      })
      .catch(error => {
        console.error('Error fetching real Google Ads data:', error);
        setRealAdsData(null);
      });
      
      // Очищаем URL только после обработки токена
      setTimeout(() => {
        console.log('Clearing URL parameters...');
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500); // Увеличили задержку с 100ms до 500ms
    } else if (error) {
      console.error('OAuth error:', error);
      setError(`Помилка авторизації: ${error}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Загрузка тестовых данных при монтировании компонента
  useEffect(() => {
    console.log("=== CHATFORMGPT INDEX: Завантаження тестових даних при монтировании ===");
    fetch('/api/ads-data')
      .then(res => res.json())
      .then(data => {
        console.log("Тестовые данные загружены:", data);
        setAdsData(data);
      })
      .catch(error => {
        console.error("Ошибка загрузки тестовых данных:", error);
        setAdsData(null);
      });
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
                      <div style={{ fontSize: '18px', color: '#1e293b' }}>Loading...</div>
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
          background: '#1e293b',
          borderRight: '1px solid #64748b',
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
        background: '#1e293b',
        borderRight: '1px solid #64748b',
        transition: 'width 0.3s ease',
        overflow: 'visible',
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
          borderBottom: '1px solid #64748b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
                      <button
              onClick={createNewChat}
              style={{
                background: 'rgba(102, 126, 234, 0.1)',
                              color: '#fff',
                border: '1.5px solid rgba(102, 126, 234, 0.2)',
                borderRadius: 6,
                padding: '10px 16px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1.5px solid rgba(102, 126, 234, 0.4)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1.5px solid rgba(102, 126, 234, 0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            New Chat
          </button>
        </div>
        
        {/* Smart Mode Toggle */}
        {(
                  <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #64748b',
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
                background: useAdsData ? '#667eea' : '#64748b',
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
        
        {/* Google Ads Settings */}
        {accountConnected && (
          <div style={{
            padding: '12px 12px',
            borderBottom: '1px solid #64748b',
            background: '#f8f9fa',
          }}>
            <div style={{ fontWeight: 600, fontSize: 12, color: '#23272f', marginBottom: 8 }}>
              Google Ads Settings
            </div>
            
            {/* Customer ID */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 10, color: '#666', marginBottom: 2 }}>
                Customer ID:
              </label>
              <input
                type="text"
                value={customerId || ''}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter Customer ID"
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 11,
                  outline: 'none',
                }}
              />
            </div>
            
            {/* Date Range */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: 'block', fontSize: 10, color: '#666', marginBottom: 2 }}>
                Date Range:
              </label>
              <select
                value={dateRange?.preset || 'last_30_days'}
                onChange={(e) => setDateRange({preset: e.target.value})}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 11,
                  outline: 'none',
                  background: 'white',
                }}
              >
                <option value="last_7_days">Last 7 days</option>
                <option value="last_14_days">Last 14 days</option>
                <option value="last_30_days">Last 30 days</option>
              </select>
            </div>
          </div>
        )}
        
        <div style={{
          padding: '12px 12px',
          borderBottom: '1px solid #64748b',
        }}>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              background: '#64748b',
              color: '#ffffff',
              outline: 'none',
            }}
            onFocus={e => {
              e.target.style.border = 'none';
              e.target.style.boxShadow = 'none';
            }}
            onBlur={e => {
              e.target.style.border = 'none';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={{
          height: '400px',
          overflowY: 'auto',
          padding: '8px',
          scrollbarWidth: 'thin',
          scrollbarColor: '#64748b transparent',
        }}>
          {filteredChats.map((chat, index) => (
            <div
              key={chat.id}
              style={{
                padding: '4px 16px',
                margin: '4px 0',
                borderRadius: 8,
                background: currentChatId === chat.id ? '#64748b' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: index === 9 ? '1px solid #64748b' : 'none',
              }}
              onClick={() => selectChat(chat.id)}
              onMouseEnter={e => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = '#64748b';
                  e.currentTarget.style.border = 'none';
                }
                // Показать кнопку меню при наведении
                const menuButton = e.currentTarget.querySelector('.chat-menu button') as HTMLElement;
                if (menuButton) {
                  menuButton.style.opacity = '1';
                }
              }}
              onMouseLeave={e => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = 'none';
                }
                // Скрыть кнопку меню при уходе мыши
                const menuButton = e.currentTarget.querySelector('.chat-menu button') as HTMLElement;
                if (menuButton) {
                  menuButton.style.opacity = '0';
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
                        e.preventDefault();
                        if (editingTitle.trim()) {
                          updateChatTitle(chat.id, editingTitle);
                        } else {
                          setEditingChatId(null);
                          setEditingTitle('');
                        }
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
                      border: '1px solid #667eea',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 600,
                      background: '#fff',
                      color: '#1e293b',
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
                    color: '#ffffff',
                    fontSize: 16,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 4,
                    transition: 'all 0.2s',
                    marginLeft: 8,
                    opacity: 0,
                  }}
                  title="More options"
                >
                  ⋯
                </button>
                {openMenuId === chat.id && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: '#f8fafc',
                    border: 'none',
                    borderRadius: 6,
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
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
                        color: '#1e293b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#e2e8f0';
                        e.currentTarget.style.color = '#1e293b';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#1e293b';
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
                        color: '#dc2626',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#fef2f2';
                        e.currentTarget.style.color = '#dc2626';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#dc2626';
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
        
        {/* Аватар пользователя после списка чатов */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #64748b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onClick={() => {
          setShowProfileModal(true);
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
        }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            marginRight: '4px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#475569';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#64748b';
          }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
                      <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginLeft: '0px',
            }}>
              <div style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
              }}>
                {userName}
              </div>
              <div style={{
                color: '#a0a0a0',
                fontSize: '12px',
                fontWeight: '400',
              }}>
                Professional
              </div>
            </div>
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
            <circle cx="12" cy="12" r="10" stroke="#1e293b" strokeWidth="2"/>
            <path d="M15 9l-6 6M9 9l6 6" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>



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
        padding: '18px 24px 40px 24px', // більше місця знизу
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
                  border: '1.2px solid rgba(30, 41, 59, 0.15)',
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
              color: '#64748b',
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
              e.currentTarget.style.color = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748b';
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
              color: '#64748b',
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
              e.currentTarget.style.color = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748b';
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
      <div style={{ color: '#9ca3af', fontSize: 12, margin: '0 48px 8px 48px', textAlign: 'center' }}>
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
            Templates
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
                         e.currentTarget.style.background = '#e2e8f0';
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

        <div style={{ position: 'relative' }}>
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
            Popular Questions
          </button>

          {/* Dropdown для Popular Questions */}
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
           padding: '8px',
           minWidth: 280,
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
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: '#64748b' }}>
               <circle cx="12" cy="12" r="10"/>
               <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
               <line x1="12" y1="17" x2="12.01" y2="17"/>
             </svg>
             <span style={{ 
               flex: 1, 
               fontSize: '12px', 
               fontWeight: '500', 
               color: '#64748b' 
             }}>
               Quick prompts
             </span>
             <button
               onClick={() => setShowHelpExamples(false)}
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
           <div style={{
             display: 'flex',
             flexDirection: 'column',
             gap: 8,
           }}>
             {[
               "How can I improve my Google Ads campaign?",
               "Why is my CPA so high?",
               "Which keywords are performing best?",
               "What's my ROI for this month?",
               "How to scale my successful campaigns?"
             ].map((example, i) => (
               <button
                 key={i}
                 type="button"
                                   onClick={() => {
                    setInput(example);
                    setShowHelpExamples(false);
                    // Автоматична відправка форми
                    setTimeout(() => {
                      const form = document.querySelector('form');
                      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }, 100);
                  }}
                 style={{
                   background: 'transparent',
                   color: '#374151',
                   border: 'none',
                   borderRadius: 8,
                   padding: '10px 8px',
                   fontSize: 14,
                   fontWeight: '500',
                   textAlign: 'left',
                   cursor: 'pointer',
                   transition: 'all 0.2s',
                   outline: 'none',
                   width: '100%',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'space-between',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.background = '#e2e8f0';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.background = 'transparent';
                 }}
               >
                 <div style={{ flex: 1 }}>
                   <div style={{ fontWeight: '500' }}>{example}</div>
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
             ))}
           </div>
         </div>
       )}
        </div>
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
              <circle cx="24" cy="24" r="22" stroke="#667eea" strokeWidth="3" fill={accountConnected ? '#e6f7ff' : '#fff'} />
              <path d="M16 24l6 6L36 16" stroke="#667eea" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: accountConnected ? 1 : 0 }} />
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
                  color: '#667eea',
                  border: '1.5px solid #667eea',
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
                  background: '#667eea',
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
            
            {/* Google Ads Settings */}
            {accountConnected && (
              <div style={{ marginTop: 20, padding: '16px', background: '#f8f9fa', borderRadius: 8, border: '1px solid #e9ecef' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#23272f', marginBottom: 12 }}>
                  Google Ads Settings
                </div>
                
                {/* Customer ID */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>
                    Customer ID:
                  </label>
                  <input
                    type="text"
                    value={customerId || ''}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter Customer ID"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>
                
                {/* Date Range */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4 }}>
                    Date Range:
                  </label>
                  <select
                    value={dateRange?.preset || 'last_30_days'}
                    onChange={(e) => setDateRange({preset: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #ddd',
                      borderRadius: 4,
                      fontSize: 14,
                      outline: 'none',
                      background: 'white',
                    }}
                  >
                    <option value="last_7_days">Last 7 days</option>
                    <option value="last_14_days">Last 14 days</option>
                    <option value="last_30_days">Last 30 days</option>
                  </select>
                </div>
              </div>
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
          border-color: #667eea !important;
        }
        [data-chat-theme="dark"] .chat-root textarea::placeholder {
          color: #a0a0a0 !important;
        }
        [data-chat-theme="dark"] .chat-root button {
          background: #23272f !important;
          color: #667eea !important;
          border: 1.5px solid #667eea !important;
          box-shadow: none !important;
          transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s;
        }
        [data-chat-theme="dark"] .chat-root button:hover, [data-chat-theme="dark"] .chat-root button:focus {
          color: #667eea !important;
          border-color: #667eea !important;
          box-shadow: 0 0 8px rgba(102, 126, 234, 0.3) !important;
        }
        [data-chat-theme="dark"] .chat-root svg {
          color: #667eea !important;
          stroke: #667eea !important;
          transition: color 0.2s, stroke 0.2s;
        }
        [data-chat-theme="dark"] .chat-root button:hover svg, [data-chat-theme="dark"] .chat-root button:focus svg {
          color: #667eea !important;
          stroke: #667eea !important;
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

      {/* Модальное окно профиля */}
      {showProfileModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '24px 20px',
            minWidth: 230,
            maxWidth: 270,
            textAlign: 'center',
            position: 'absolute',
            top: 'calc(100vh - 400px)',
            left: '10px',
          }}>
            {/* Кнопка закрытия */}
            <button 
              onClick={() => setShowProfileModal(false)} 
              style={{ 
                position: 'absolute', 
                top: 12, 
                right: 16, 
                background: 'none', 
                border: 'none', 
                fontSize: 22, 
                color: '#888', 
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#888';
              }}
            >
              &times;
            </button>

            {/* Аватар пользователя */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 auto 12px auto',
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* Имя пользователя */}
            <div style={{ 
              fontWeight: 700, 
              fontSize: 16, 
              color: '#23272f', 
              marginBottom: 6 
            }}>
              {userName}
            </div>

            {/* Статус */}
            <div style={{ 
              color: '#64748b', 
              fontSize: 12, 
              marginBottom: 8 
            }}>
              Professional
            </div>

            {/* Email */}
            <div style={{ 
              color: '#64748b', 
              fontSize: 11, 
              marginBottom: 16 
            }}>
              {userEmail}
            </div>

            {/* Настройки профиля */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              marginBottom: 16,
            }}>




              <button 
                onClick={() => {
                  setShowProfileModal(false);
                  setShowSettingsModal(true);
                  setActiveSettingsTab('profile');
                }}
                style={{
                  background: '#f8fafc',
                  color: '#374151',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                <span>Settings</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>

              <button 
                onClick={() => window.location.href = '/pricing'}
                style={{
                  background: '#f8fafc',
                  color: '#374151',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '8px 12px',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
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
                  <span>Pricing</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </button>
            </div>

            {/* Кнопка выхода */}
            <button 
              onClick={handleLogout}
              style={{
                background: '#f8fafc',
                color: '#374151',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                width: '100%',
                textAlign: 'left',
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
              Log out
            </button>
          </div>
        </div>
      )}

              {/* Уведомление об успешном обновлении пароля */}
        {showSuccessMessage && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Success!</div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>Password updated successfully</div>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                marginLeft: 'auto',
                opacity: 0.7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '0.7'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        {/* Модальное окно настроек */}
        {showSettingsModal && (
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
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            padding: '32px',
            width: '95%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Заголовок */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '16px',
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                margin: 0,
              }}>
                Settings
              </h2>
              <button 
                onClick={() => setShowSettingsModal(false)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '24px', 
                  color: '#64748b', 
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                &times;
              </button>
            </div>

            {/* Вкладки */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0',
              marginBottom: '24px',
            }}>
              {[
                { 
                  id: 'profile', 
                  label: 'Profile', 
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  )
                },
                { 
                  id: 'security', 
                  label: 'Security', 
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  )
                },
                { 
                  id: 'preferences', 
                  label: 'Preferences', 
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  )
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSettingsTab(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: activeSettingsTab === tab.id ? '600' : '500',
                    color: activeSettingsTab === tab.id ? '#667eea' : '#64748b',
                    cursor: 'pointer',
                    borderBottom: activeSettingsTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSettingsTab !== tab.id) {
                      e.currentTarget.style.color = '#374151';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSettingsTab !== tab.id) {
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Контент вкладок */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              paddingRight: '8px',
            }}>
                             {activeSettingsTab === 'profile' && (
                 <div>
                   <h3 style={{
                     fontSize: '18px',
                     fontWeight: '600',
                     color: '#1e293b',
                     marginBottom: '20px',
                   }}>
                     Profile Information
                   </h3>
                   
                   {!isEditingProfile ? (
                     <>
                       <div style={{
                         display: 'flex',
                         alignItems: 'center',
                         gap: '16px',
                         marginBottom: '24px',
                         padding: '20px',
                         background: '#f8fafc',
                         borderRadius: '12px',
                       }}>
                         <div style={{
                           width: '64px',
                           height: '64px',
                           borderRadius: '50%',
                           background: '#64748b',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#ffffff',
                           fontSize: '24px',
                           fontWeight: '600',
                         }}>
                           {userName.charAt(0).toUpperCase()}
                         </div>
                         <div>
                           <div style={{
                             fontSize: '18px',
                             fontWeight: '600',
                             color: '#1e293b',
                             marginBottom: '4px',
                           }}>
                             {userName}
                           </div>
                           <div style={{
                             fontSize: '14px',
                             color: '#64748b',
                             marginBottom: '4px',
                           }}>
                             {userEmail}
                           </div>
                           <div style={{
                             fontSize: '12px',
                             color: '#667eea',
                             fontWeight: '500',
                           }}>
                             ✓ Email Verified
                           </div>
                         </div>
                       </div>

                       <div style={{
                         display: 'grid',
                         gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                         gap: '16px',
                         marginBottom: '24px',
                       }}>
                         <div style={{
                           padding: '16px',
                           background: '#f8fafc',
                           borderRadius: '8px',
                           border: '1px solid #e2e8f0',
                         }}>
                           <div style={{
                             fontSize: '12px',
                             color: '#64748b',
                             marginBottom: '4px',
                           }}>
                             Member Since
                           </div>
                           <div style={{
                             fontSize: '14px',
                             fontWeight: '500',
                             color: '#1e293b',
                           }}>
                             {new Date().toLocaleDateString()}
                           </div>
                         </div>
                         <div style={{
                           padding: '16px',
                           background: '#f8fafc',
                           borderRadius: '8px',
                           border: '1px solid #e2e8f0',
                         }}>
                           <div style={{
                             fontSize: '12px',
                             color: '#64748b',
                             marginBottom: '4px',
                           }}>
                             Account Type
                           </div>
                           <div style={{
                             fontSize: '14px',
                             fontWeight: '500',
                             color: '#1e293b',
                           }}>
                             Professional
                           </div>
                         </div>
                       </div>

                       <button
                         onClick={handleStartEditProfile}
                         style={{
                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                           color: 'white',
                           border: 'none',
                           borderRadius: '8px',
                           padding: '12px 24px',
                           fontSize: '14px',
                           fontWeight: '500',
                           cursor: 'pointer',
                           transition: 'all 0.2s',
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-1px)';
                           e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = 'none';
                         }}
                       >
                         Edit Profile
                       </button>
                     </>
                   ) : (
                     <div style={{
                       padding: '20px',
                       background: '#f8fafc',
                       borderRadius: '12px',
                       marginBottom: '24px',
                     }}>
                       <h4 style={{
                         fontSize: '16px',
                         fontWeight: '600',
                         color: '#1e293b',
                         marginBottom: '16px',
                       }}>
                         Edit Profile
                       </h4>
                       
                       <div style={{ marginBottom: '16px' }}>
                         <label style={{
                           display: 'block',
                           fontSize: '14px',
                           fontWeight: '500',
                           color: '#374151',
                           marginBottom: '8px',
                         }}>
                           Name
                         </label>
                         <input
                           type="text"
                           value={editName}
                           onChange={(e) => setEditName(e.target.value)}
                           style={{
                             width: '100%',
                             padding: '12px 16px',
                             border: '1px solid #e2e8f0',
                             borderRadius: '8px',
                             fontSize: '16px',
                             transition: 'all 0.2s ease',
                             boxSizing: 'border-box',
                           }}
                           onFocus={(e) => {
                             e.target.style.borderColor = '#667eea';
                             e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                           }}
                           onBlur={(e) => {
                             e.target.style.borderColor = '#e2e8f0';
                             e.target.style.boxShadow = 'none';
                           }}
                         />
                       </div>

                       <div style={{ marginBottom: '20px' }}>
                         <label style={{
                           display: 'block',
                           fontSize: '14px',
                           fontWeight: '500',
                           color: '#374151',
                           marginBottom: '8px',
                         }}>
                           Email
                         </label>
                         <input
                           type="email"
                           value={editEmail}
                           onChange={(e) => setEditEmail(e.target.value)}
                           style={{
                             width: '100%',
                             padding: '12px 16px',
                             border: '1px solid #e2e8f0',
                             borderRadius: '8px',
                             fontSize: '16px',
                             transition: 'all 0.2s ease',
                             boxSizing: 'border-box',
                           }}
                           onFocus={(e) => {
                             e.target.style.borderColor = '#667eea';
                             e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                           }}
                           onBlur={(e) => {
                             e.target.style.borderColor = '#e2e8f0';
                             e.target.style.boxShadow = 'none';
                           }}
                         />
                       </div>

                       <div style={{
                         display: 'flex',
                         gap: '12px',
                       }}>
                         <button
                           onClick={handleSaveProfile}
                           style={{
                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                             color: 'white',
                             border: 'none',
                             borderRadius: '8px',
                             padding: '12px 24px',
                             fontSize: '14px',
                             fontWeight: '500',
                             cursor: 'pointer',
                             transition: 'all 0.2s',
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.transform = 'translateY(-1px)';
                             e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)';
                             e.currentTarget.style.boxShadow = 'none';
                           }}
                         >
                           Save Changes
                         </button>
                         <button
                           onClick={handleCancelEditProfile}
                           style={{
                             background: 'white',
                             color: '#64748b',
                             border: '1px solid #e2e8f0',
                             borderRadius: '8px',
                             padding: '12px 24px',
                             fontSize: '14px',
                             fontWeight: '500',
                             cursor: 'pointer',
                             transition: 'all 0.2s',
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.background = '#f8fafc';
                             e.currentTarget.style.borderColor = '#cbd5e1';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.background = 'white';
                             e.currentTarget.style.borderColor = '#e2e8f0';
                           }}
                         >
                           Cancel
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
               )}

                             {activeSettingsTab === 'security' && (
                 <div>
                   <h3 style={{
                     fontSize: '18px',
                     fontWeight: '600',
                     color: '#1e293b',
                     marginBottom: '20px',
                   }}>
                     Security Settings
                   </h3>
                   
                   {!isChangingPassword ? (
                     <div style={{
                       padding: '20px',
                       background: '#f8fafc',
                       borderRadius: '12px',
                     }}>
                       <h4 style={{
                         fontSize: '16px',
                         fontWeight: '600',
                         color: '#1e293b',
                         marginBottom: '12px',
                       }}>
                         Change Password
                       </h4>
                       <p style={{
                         fontSize: '14px',
                         color: '#64748b',
                         marginBottom: '16px',
                       }}>
                         Update your password to keep your account secure.
                       </p>
                       <button 
                         onClick={handleStartChangePassword}
                         style={{
                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                           color: 'white',
                           border: 'none',
                           borderRadius: '8px',
                           padding: '12px 24px',
                           fontSize: '14px',
                           fontWeight: '500',
                           cursor: 'pointer',
                           transition: 'all 0.2s',
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-1px)';
                           e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = 'none';
                         }}
                         >
                         Change Password
                       </button>
                     </div>
                   ) : (
                     <div style={{
                       padding: '20px',
                       background: '#f8fafc',
                       borderRadius: '12px',
                     }}>
                       <h4 style={{
                         fontSize: '16px',
                         fontWeight: '600',
                         color: '#1e293b',
                         marginBottom: '16px',
                       }}>
                         Change Password
                       </h4>
                       
                       <div style={{ marginBottom: '16px' }}>
                         <label style={{
                           display: 'block',
                           fontSize: '14px',
                           fontWeight: '500',
                           color: '#374151',
                           marginBottom: '8px',
                         }}>
                           Current Password
                         </label>
                         <div style={{ position: 'relative' }}>
                           <input
                             type={showCurrentPassword ? "text" : "password"}
                             value={currentPassword}
                             onChange={(e) => setCurrentPassword(e.target.value)}
                             style={{
                               width: '100%',
                               padding: '12px 16px',
                               paddingRight: '48px',
                               border: '1px solid #e2e8f0',
                               borderRadius: '8px',
                               fontSize: '16px',
                               transition: 'all 0.2s ease',
                               boxSizing: 'border-box',
                             }}
                             onFocus={(e) => {
                               e.target.style.borderColor = '#667eea';
                               e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                             }}
                             onBlur={(e) => {
                               e.target.style.borderColor = '#e2e8f0';
                               e.target.style.boxShadow = 'none';
                             }}
                           />
                           <button
                             type="button"
                             onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                             style={{
                               position: 'absolute',
                               right: '12px',
                               top: '50%',
                               transform: 'translateY(-50%)',
                               background: 'none',
                               border: 'none',
                               cursor: 'pointer',
                               padding: '4px',
                               color: '#64748b',
                               transition: 'color 0.2s ease'
                             }}
                             onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
                             onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'}
                           >
                             {showCurrentPassword ? (
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                 <circle cx="12" cy="12" r="3"/>
                               </svg>
                             ) : (
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                 <line x1="1" y1="1" x2="23" y2="23"/>
                               </svg>
                             )}
                           </button>
                         </div>
                       </div>

                       <div style={{ marginBottom: '16px' }}>
                         <label style={{
                           display: 'block',
                           fontSize: '14px',
                           fontWeight: '500',
                           color: '#374151',
                           marginBottom: '8px',
                         }}>
                           New Password
                         </label>
                         <div style={{ position: 'relative' }}>
                           <input
                             type={showNewPassword ? "text" : "password"}
                             value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                             style={{
                               width: '100%',
                               padding: '12px 16px',
                               paddingRight: '48px',
                               border: '1px solid #e2e8f0',
                               borderRadius: '8px',
                               fontSize: '16px',
                               transition: 'all 0.2s ease',
                               boxSizing: 'border-box',
                             }}
                             onFocus={(e) => {
                               e.target.style.borderColor = '#667eea';
                               e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                             }}
                             onBlur={(e) => {
                               e.target.style.borderColor = '#e2e8f0';
                               e.target.style.boxShadow = 'none';
                             }}
                           />
                           <button
                             type="button"
                             onClick={() => setShowNewPassword(!showNewPassword)}
                             style={{
                               position: 'absolute',
                               right: '12px',
                               top: '50%',
                               transform: 'translateY(-50%)',
                               background: 'none',
                               border: 'none',
                               cursor: 'pointer',
                               padding: '4px',
                               color: '#64748b',
                               transition: 'color 0.2s ease'
                             }}
                             onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
                             onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'}
                           >
                             {showNewPassword ? (
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                 <circle cx="12" cy="12" r="3"/>
                               </svg>
                             ) : (
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                 <line x1="1" y1="1" x2="23" y2="23"/>
                               </svg>
                             )}
                           </button>
                         </div>
                       </div>

                       <div style={{ marginBottom: '20px' }}>
                         <label style={{
                           display: 'block',
                           fontSize: '14px',
                           fontWeight: '500',
                           color: '#374151',
                           marginBottom: '8px',
                         }}>
                           Confirm New Password
                         </label>
                         <div style={{ position: 'relative' }}>
                           <input
                             type={showConfirmPassword ? "text" : "password"}
                             value={confirmNewPassword}
                             onChange={(e) => setConfirmNewPassword(e.target.value)}
                             style={{
                               width: '100%',
                               padding: '12px 16px',
                               paddingRight: '48px',
                               border: '1px solid #e2e8f0',
                               borderRadius: '8px',
                               fontSize: '16px',
                               transition: 'all 0.2s ease',
                               boxSizing: 'border-box',
                             }}
                             onFocus={(e) => {
                               e.target.style.borderColor = '#667eea';
                               e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                             }}
                             onBlur={(e) => {
                               e.target.style.borderColor = '#e2e8f0';
                               e.target.style.boxShadow = 'none';
                             }}
                           />
                           <button
                             type="button"
                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                             style={{
                               position: 'absolute',
                               right: '12px',
                               top: '50%',
                               transform: 'translateY(-50%)',
                               background: 'none',
                               border: 'none',
                               cursor: 'pointer',
                               padding: '4px',
                               color: '#64748b',
                               transition: 'color 0.2s ease'
                             }}
                             onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#764ba2'}
                             onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'}
                           >
                             {showConfirmPassword ? (
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                 <circle cx="12" cy="12" r="3"/>
                               </svg>
                             ) : (
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                 <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                                 <line x1="1" y1="1" x2="23" y2="23"/>
                               </svg>
                             )}
                           </button>
                         </div>
                       </div>

                       <div style={{
                         display: 'flex',
                         gap: '12px',
                       }}>
                         <button
                           onClick={handleSavePassword}
                           style={{
                             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                             color: 'white',
                             border: 'none',
                             borderRadius: '8px',
                             padding: '12px 24px',
                             fontSize: '14px',
                             fontWeight: '500',
                             cursor: 'pointer',
                             transition: 'all 0.2s',
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.transform = 'translateY(-1px)';
                             e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)';
                             e.currentTarget.style.boxShadow = 'none';
                           }}
                         >
                           Update Password
                         </button>
                         <button
                           onClick={handleCancelChangePassword}
                           style={{
                             background: 'white',
                             color: '#64748b',
                             border: '1px solid #e2e8f0',
                             borderRadius: '8px',
                             padding: '12px 24px',
                             fontSize: '14px',
                             fontWeight: '500',
                             cursor: 'pointer',
                             transition: 'all 0.2s',
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.background = '#f8fafc';
                             e.currentTarget.style.borderColor = '#cbd5e1';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.background = 'white';
                             e.currentTarget.style.borderColor = '#e2e8f0';
                           }}
                         >
                           Cancel
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
               )}

                             {activeSettingsTab === 'preferences' && (
                 <div>
                   <h3 style={{
                     fontSize: '18px',
                     fontWeight: '600',
                     color: '#1e293b',
                     marginBottom: '20px',
                   }}>
                     Chat Preferences
                   </h3>
                   
                   <div style={{
                     padding: '20px',
                     background: '#f8fafc',
                     borderRadius: '12px',
                   }}>
                     <h4 style={{
                       fontSize: '16px',
                       fontWeight: '600',
                       color: '#1e293b',
                       marginBottom: '12px',
                     }}>
                       Notifications
                     </h4>
                     <div style={{
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'space-between',
                       padding: '12px 0',
                       borderBottom: '1px solid #e2e8f0',
                     }}>
                       <div>
                         <div style={{
                           fontSize: '14px',
                           fontWeight: '500',
                           color: '#1e293b',
                         }}>
                           Email Notifications
                         </div>
                         <div style={{
                           fontSize: '12px',
                           color: '#64748b',
                         }}>
                           Receive updates about your account
                         </div>
                       </div>
                       <button
                         onClick={() => setEmailNotifications(!emailNotifications)}
                         style={{
                           width: '40px',
                           height: '20px',
                           background: emailNotifications ? '#667eea' : '#e2e8f0',
                           borderRadius: '10px',
                           position: 'relative',
                           cursor: 'pointer',
                           border: 'none',
                           transition: 'all 0.2s',
                         }}
                       >
                         <div style={{
                           width: '16px',
                           height: '16px',
                           background: 'white',
                           borderRadius: '50%',
                           position: 'absolute',
                           top: '2px',
                           left: emailNotifications ? '22px' : '2px',
                           transition: 'all 0.2s',
                           boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                         }}></div>
                       </button>
                     </div>
                   </div>
                 </div>
               )}

              
            </div>
          </div>
        </div>
      )}

        </div>
      </div>
    </div>
  );
};

export default ChatFormGPT; 