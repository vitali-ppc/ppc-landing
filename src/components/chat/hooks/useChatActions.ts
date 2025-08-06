import { useCallback } from 'react';
import { Message, ExportFormat } from '../types';
import { exportData, formatGoogleAdsData } from '../utils';
import { REPORT_TEMPLATES } from '../types';

interface UseChatActionsProps {
  input: string;
  setInput: (input: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  hasData: boolean;
  useAdsData: boolean;
  accountConnected: boolean | null;
  dataToUse: any;
  realAdsData: any;
  currentChatId: string | null;
  chats: any[];
  setChats: (chats: any[] | ((prev: any[]) => any[])) => void;
  setAdsData: (data: any) => void;
  setUseAdsData: (use: boolean) => void;
  setAccountConnected: (connected: boolean) => void;
  setRealAdsData: (data: any) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  accessToken: string | null;
  refreshToken: string | null;
}

export const useChatActions = ({
  input,
  setInput,
  setLoading,
  setError,
  messages,
  setMessages,
  hasData,
  useAdsData,
  accountConnected,
  dataToUse,
  realAdsData,
  currentChatId,
  chats,
  setChats,
  setAdsData,
  setUseAdsData,
  setAccountConnected,
  setRealAdsData,
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview,
  inputRef,
  accessToken,
  refreshToken,
}: UseChatActionsProps) => {

  // Функции экспорта
  const handleExport = useCallback(async (format: ExportFormat, data: any) => {
    const success = await exportData(format, data);
    return success;
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
  }, [setSelectedImage, setImagePreview]);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
  }, [setSelectedImage, setImagePreview]);

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
  }, [setMessages, setError, setInput, currentChatId, setChats, inputRef]);

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
      
      if (accessToken) {
        // Fetch real Google Ads data
        fetch('/api/ads-data-real', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            accessToken,
            refreshToken 
          }),
        })
        .then(res => res.json())
        .then(data => {
          setRealAdsData(data);
          setAdsData(data);
          setLoading(false);
        })
        .catch(() => {
          setAdsData(null);
          setRealAdsData(null);
          setLoading(false);
        });
      } else {
        // Fallback to test data
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
  }, [input, hasData, useAdsData, accountConnected, dataToUse, realAdsData, currentChatId, messages, imagePreview, setError, setLoading, setMessages, setInput, setSelectedImage, setImagePreview, inputRef, setChats]);

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
  }, [hasData, dataToUse, realAdsData, currentChatId, messages, setError, setLoading, setMessages, setChats]);

  return {
    handleExport,
    handleImageUpload,
    removeImage,
    handleClear,
    handleSubmit,
    generateReport,
  };
}; 