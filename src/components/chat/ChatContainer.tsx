'use client';

import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { useChatState } from './hooks/useChatState';
import { useChatActions } from './hooks/useChatActions';
import { useTypingEffect } from './hooks/useTypingEffect';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { GoogleAdsConnection } from './components/GoogleAdsConnection';

const ChatContainer: React.FC = () => {
  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const chatState = useChatState();
  const { startTypingEffect, stopTypingEffect, cleanup } = useTypingEffect();
  
  const chatActions = useChatActions({
    input: chatState.input,
    setInput: chatState.setInput,
    setLoading: chatState.setLoading,
    setError: chatState.setError,
    messages: chatState.messages,
    setMessages: chatState.setMessages,
    hasData: chatState.hasData,
    useAdsData: chatState.useAdsData,
    accountConnected: chatState.accountConnected || false,
    dataToUse: chatState.dataToUse,
    realAdsData: chatState.realAdsData,
    currentChatId: chatState.currentChatId,
    chats: chatState.chats,
    setChats: chatState.setChats,
    setAdsData: chatState.setAdsData,
    setUseAdsData: chatState.setUseAdsData,
    setAccountConnected: chatState.setAccountConnected,
    setRealAdsData: chatState.setRealAdsData,
    selectedImage: chatState.selectedImage,
    setSelectedImage: chatState.setSelectedImage,
    imagePreview: chatState.imagePreview,
    setImagePreview: chatState.setImagePreview,
    inputRef: inputRef as React.RefObject<HTMLTextAreaElement>,
  });

  // Placeholders
  const placeholders = useMemo(() => [
    "How can I improve my Google Ads campaign?",
    "Why is my CPA so high?",
    "Show me insights for my last 30 days",
    "What's wrong with my ad performance?",
    "How to optimize my budget allocation?"
  ], []);

  // Effects
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.chatTheme = chatState.theme;
    }
  }, [chatState.theme]);

  // Загрузка данных Google Ads
  useEffect(() => {
    fetch('/api/ads-data')
      .then(res => res.json())
      .then(data => chatState.setAdsData(data))
      .catch(() => chatState.setAdsData(null));
  }, [chatState.setAdsData]);

  // OAuth2 callback обработка
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const token = urlParams.get('access_token');
    const error = urlParams.get('error');

    if (authStatus === 'success' && token) {
      chatState.setAccessToken(token);
      chatState.setAccountConnected(true);
      chatState.setShowAccountModal(false);
      
      // Получение реальных данных Google Ads
      fetch('/api/ads-data-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token }),
      })
      .then(res => res.json())
      .then(data => chatState.setRealAdsData(data))
      .catch(error => console.error('Error fetching real Google Ads data:', error));
      
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      chatState.setError(`Помилка авторизації: ${error}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [chatState.setAccessToken, chatState.setAccountConnected, chatState.setShowAccountModal, chatState.setRealAdsData, chatState.setError]);

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
  }, [chatState.messages]);

  // Typing эффект
  useEffect(() => {
    if (!chatState.loading && chatState.messages.length > 0 && chatState.messages[chatState.messages.length - 1].role === 'ai') {
      const lastAiMsg = chatState.messages[chatState.messages.length - 1].text;
      const messageId = `${chatState.currentChatId}-${chatState.messages.length}-${lastAiMsg.slice(0, 50)}`;
      
      if (!chatState.shownMessages.has(messageId) && chatState.typingText === null && lastAiMsg && lastAiMsg.length > 0) {
        startTypingEffect(lastAiMsg, chatState.setTypingText);
        chatState.setShownMessages(prev => new Set(Array.from(prev).concat([messageId])));
      }
    }
    if (chatState.loading) {
      stopTypingEffect(chatState.setTypingText);
    }
  }, [chatState.messages, chatState.loading, chatState.shownMessages, chatState.currentChatId, chatState.typingText, startTypingEffect, stopTypingEffect, chatState.setTypingText, chatState.setShownMessages]);

  // Placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      chatState.setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length, chatState.setPlaceholderIndex]);

  // Установка isMounted после монтирования
  useEffect(() => {
    chatState.setIsMounted(true);
  }, [chatState.setIsMounted]);

  // Инициализация чатов после монтирования
  useEffect(() => {
    if (!chatState.isMounted) return;
    
    if (chatState.chats.length === 0) {
      chatState.createNewChat();
    } else {
      // Загружаем сообщения текущего чата
      const currentChat = chatState.chats.find(c => c.id === chatState.currentChatId);
      if (currentChat) {
        chatState.setMessages(currentChat.messages);
      } else if (chatState.chats.length > 0) {
        // Если текущий чат не найден, выбираем последний
        const newestChat = chatState.chats[chatState.chats.length - 1];
        chatState.setCurrentChatId(newestChat.id);
        chatState.setMessages(newestChat.messages);
      }
    }
  }, [chatState.chats, chatState.currentChatId, chatState.createNewChat, chatState.isMounted, chatState.setMessages, chatState.setCurrentChatId]);

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && !target.closest('.export-dropdown') && !target.closest('button')) {
        chatState.setOpenExportDropdownIdx(null);
      }
    };
    
    if (chatState.openExportDropdownIdx !== null) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    
    return () => document.removeEventListener('mousedown', handleClick);
  }, [chatState.openExportDropdownIdx, chatState.setOpenExportDropdownIdx]);

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatState.openMenuId && !(e.target as Element).closest('.chat-menu')) {
        chatState.setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [chatState.openMenuId, chatState.setOpenMenuId]);

  // Очистка таймера
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Не рендерим до монтирования для предотвращения гидратации
  if (!chatState.isMounted) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f9fafc',
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
    }}>
      {/* Narrow sidebar background - visible only when sidebar is closed */}
      {!chatState.showSidebar && (
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
        onClick={() => chatState.setShowSidebar(!chatState.showSidebar)}
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
        title={chatState.showSidebar ? 'Hide chat history' : 'Show chat history'}
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

      {/* Sidebar */}
      <ChatSidebar
        showSidebar={chatState.showSidebar}
        chats={chatState.chats}
        currentChatId={chatState.currentChatId}
        searchQuery={chatState.searchQuery}
        openMenuId={chatState.openMenuId}
        editingChatId={chatState.editingChatId}
        editingTitle={chatState.editingTitle}
        filteredChats={chatState.filteredChats}
        onToggleSidebar={() => chatState.setShowSidebar(!chatState.showSidebar)}
        onCreateNewChat={chatState.createNewChat}
        onSelectChat={chatState.selectChat}
        onDeleteChat={chatState.deleteChat}
        onUpdateChatTitle={chatState.updateChatTitle}
        onSetOpenMenuId={chatState.setOpenMenuId}
        onSetEditingChatId={chatState.setEditingChatId}
        onSetEditingTitle={chatState.setEditingTitle}
        onSetSearchQuery={chatState.setSearchQuery}
      />

      {/* Main chat area */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: chatState.showSidebar ? '280px' : '0',
        transition: 'padding-left 0.3s ease',
      }}>
        <div className="chat-root" style={{
          maxWidth: '900px',
          width: '100%',
          background: '#1a1a1a',
          borderRadius: 0,
          boxShadow: chatState.showSidebar ? 'none' : '0 4px 32px rgba(0,0,0,0.3)',
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
          </div>

          {/* Google Ads data indicator */}
          {chatState.useAdsData && (chatState.adsData || chatState.realAdsData) && (
            <div style={{
              background: chatState.realAdsData ? '#e6f7ff' : '#fff3cd',
              color: '#23272f',
              border: chatState.realAdsData ? '1.5px solid #0ea5e9' : '1.5px solid #ffc107',
              borderRadius: 12,
              margin: '0 48px 8px 48px',
              padding: '12px 18px',
              fontSize: 15,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
            }}>
              <span style={{ fontWeight: 600, color: chatState.realAdsData ? '#0ea5e9' : '#856404' }}>
                {chatState.realAdsData ? 'Real Google Ads data connected' : 'Test Google Ads data connected'}
              </span>
              <details style={{ flex: 1 }}>
                <summary style={{ cursor: 'pointer', color: chatState.realAdsData ? '#0ea5e9' : '#856404', fontWeight: 400, fontSize: 15 }}>
                  {chatState.realAdsData ? 'View real data' : 'View test data'}
                </summary>
                <pre style={{ fontSize: 13, background: '#f9fafc', borderRadius: 8, padding: 12, marginTop: 8, overflowX: 'auto' }}>
                  {JSON.stringify(chatState.realAdsData || chatState.adsData, null, 2)}
                </pre>
              </details>
            </div>
          )}

          {/* Chat history */}
          <ChatMessages
            messages={chatState.messages}
            typingText={chatState.typingText}
            useAdsData={chatState.useAdsData}
            adsData={chatState.adsData}
            copied={chatState.copied}
            openExportDropdownIdx={chatState.openExportDropdownIdx}
            loading={chatState.loading}
            onCopy={() => {
              if (chatState.messages.length > 0) {
                const lastMessage = chatState.messages[chatState.messages.length - 1];
                navigator.clipboard.writeText(lastMessage.text);
                chatState.setCopied(true);
                setTimeout(() => chatState.setCopied(false), 1200);
              }
            }}
            onExport={chatActions.handleExport}
            setOpenExportDropdownIdx={chatState.setOpenExportDropdownIdx}
          />
          <div ref={chatEndRef} />

          {/* Input */}
          <ChatInput
            input={chatState.input}
            setInput={chatState.setInput}
            loading={chatState.loading}
            placeholder={placeholders[chatState.placeholderIndex]}
            selectedImage={chatState.selectedImage}
            imagePreview={chatState.imagePreview}
            onImageUpload={chatActions.handleImageUpload}
            onRemoveImage={chatActions.removeImage}
            onSubmit={chatActions.handleSubmit}
          />

          {/* Google Ads connection */}
          <GoogleAdsConnection
            useAdsData={chatState.useAdsData}
            setUseAdsData={chatState.setUseAdsData}
            accountConnected={chatState.accountConnected}
            setShowAccountModal={chatState.setShowAccountModal}
            adsData={chatState.adsData}
            realAdsData={chatState.realAdsData}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer; 