'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Message, Chat, GoogleAdsData, REPORT_TEMPLATES, EXPORT_ENDPOINTS, ExportFormat } from './types';
import { exportData, formatGoogleAdsData } from './utils';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTypingEffect } from './hooks/useTypingEffect';
import { useGoogleAdsData } from './hooks/useGoogleAdsData';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

  // Функции экспорта
  const handleExport = useCallback(async (format: ExportFormat, data: any) => {
    const success = await exportData(format, data);
    if (success) {
      setOpenExportDropdownIdx(null);
    }
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
  }, [currentChatId]);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#1a1a1a',
      position: 'relative',
    }}>
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
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
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
                  onClick={() => setUseAdsData(!useAdsData)}
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

          {/* Chat Messages */}
          <ChatMessages
            messages={messages}
            typingText={typingText}
            useAdsData={useAdsData}
            adsData={adsData}
            copied={copied}
            openExportDropdownIdx={openExportDropdownIdx}
            onCopy={() => {
              navigator.clipboard.writeText(messages[messages.length - 1]?.text || '');
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            onExport={(format: string, data: any) => handleExport(format as ExportFormat, data)}
            setOpenExportDropdownIdx={setOpenExportDropdownIdx}
          />

          <h1>ChatFormGPT - Модульная версия</h1>
          <p>ChatMessages добавлен!</p>
          <p>✅ ChatMessages подключен</p>
          <p>✅ Функции копирования и экспорта</p>
          <p>✅ Все пропсы переданы</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFormGPT; 