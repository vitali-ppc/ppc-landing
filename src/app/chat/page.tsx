'use client';

import ChatFormGPT from '@/components/chat/index';
import { useEffect } from 'react';

export default function ChatPage() {
  useEffect(() => {
    // Добавляем класс для предотвращения скролла
    document.body.classList.add('chat-page');
    
    // Убираем класс при размонтировании
    return () => {
      document.body.classList.remove('chat-page');
    };
  }, []);

  return (
    <div style={{
      background: '#f8fafc',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <ChatFormGPT />
    </div>
  );
} 