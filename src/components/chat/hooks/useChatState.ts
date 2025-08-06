import { useState, useCallback, useMemo } from 'react';
import { Message, Chat, GoogleAdsData } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useChatState = () => {
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
  const [accessToken, setAccessToken] = useLocalStorage<string | null>('ppcset-access-token', null);
  
  // UI состояния
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [openExportDropdownIdx, setOpenExportDropdownIdx] = useState<number | null>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('chatTheme', 'light');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showReportTemplates, setShowReportTemplates] = useState(false);
  
  // Чат состояния
  const [chats, setChats] = useLocalStorage<Chat[]>('ppcset-chats', []);
  const [currentChatId, setCurrentChatId] = useLocalStorage<string | null>('ppcset-current-chat', null);
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
  const [shownMessagesArray, setShownMessagesArray] = useLocalStorage<string[]>('ppcset-shown-messages', []);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Мемоизированные значения
  const dataToUse = useMemo(() => realAdsData || adsData, [realAdsData, adsData]);
  const hasData = useMemo(() => dataToUse && dataToUse.campaigns && dataToUse.campaigns.length > 0, [dataToUse]);
  const filteredChats = useMemo(() => 
    chats.filter(chat => chat.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [chats, searchQuery]
  );

  // Конвертируем массив в Set для удобства работы
  const shownMessages = useMemo(() => new Set(shownMessagesArray), [shownMessagesArray]);
  const setShownMessages = useCallback((value: Set<string> | ((prev: Set<string>) => Set<string>)) => {
    const newSet = typeof value === 'function' ? value(shownMessages) : value;
    setShownMessagesArray(Array.from(newSet));
  }, [shownMessages, setShownMessagesArray]);

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

  return {
    // States
    messages, setMessages,
    input, setInput,
    loading, setLoading,
    error, setError,
    adsData, setAdsData,
    useAdsData, setUseAdsData,
    realAdsData, setRealAdsData,
    accountConnected, setAccountConnected,
    accessToken, setAccessToken,
    showAccountModal, setShowAccountModal,
    openExportDropdownIdx, setOpenExportDropdownIdx,
    theme, setTheme,
    placeholderIndex, setPlaceholderIndex,
    showReportTemplates, setShowReportTemplates,
    chats, setChats,
    currentChatId, setCurrentChatId,
    showSidebar, setShowSidebar,
    searchQuery, setSearchQuery,
    openMenuId, setOpenMenuId,
    editingChatId, setEditingChatId,
    editingTitle, setEditingTitle,
    selectedImage, setSelectedImage,
    imagePreview, setImagePreview,
    typingText, setTypingText,
    shownMessagesArray, setShownMessagesArray,
    copied, setCopied,
    isMounted, setIsMounted,
    
    // Computed values
    dataToUse,
    hasData,
    filteredChats,
    shownMessages,
    setShownMessages,
    
    // Actions
    createNewChat,
    selectChat,
    deleteChat,
    updateChatTitle,
  };
}; 