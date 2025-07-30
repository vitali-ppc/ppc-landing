'use client'

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

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
    AI
  </div>
);

function getUserInitials() {
  // Можна замінити на реальні ініціали користувача
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

const ChatForm: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="chat-ui" style={{
      maxWidth: 520,
      margin: '0 auto',
      padding: 32,
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
      fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
      border: '1px solid #f0f1f3',
      minHeight: 420
    }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 24,
        color: '#23272f',
        marginBottom: 18,
        letterSpacing: '-0.5px'
      }}>AI Chat</h2>
      <div className="chat-history" style={{
        minHeight: 220,
        maxHeight: 320,
        overflowY: 'auto',
        border: 'none',
        borderRadius: 12,
        padding: 0,
        marginBottom: 18,
        background: '#f9fafc',
        transition: 'background 0.2s'
      }}>
        {messages.length === 0 && <div style={{ color: '#888', padding: 24, textAlign: 'center' }}>Почніть діалог…</div>}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: 12,
            margin: '14px 0',
            opacity: 0.98,
            animation: 'fadeIn 0.5s',
          }}>
            <div style={{ flexShrink: 0 }}>
              {msg.role === 'user' ? USER_AVATAR : AI_AVATAR}
            </div>
            <span style={{
              display: 'inline-block',
              background: msg.role === 'user' ? '#e6f7ff' : '#f5f5f5',
              color: '#23272f',
              borderRadius: 16,
              padding: '10px 18px',
              maxWidth: 340,
              wordBreak: 'break-word',
              fontSize: 16,
              boxShadow: msg.role === 'user' ? '0 2px 8px rgba(30, 144, 255, 0.04)' : '0 2px 8px rgba(0,0,0,0.03)',
              border: msg.role === 'user' ? '1px solid #e2e8f0' : '1px solid #f0f1f3',
              transition: 'background 0.2s',
            }}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введіть питання…"
          disabled={loading}
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            fontSize: 16,
            fontFamily: 'inherit',
            background: '#f9fafc',
            color: '#1e293b',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.01)'
          }}
          autoFocus
        />
        <button type="submit" disabled={loading || !input.trim()} style={{
          padding: '0 22px',
          borderRadius: 10,
          background: loading ? '#e2e8f0' : '#23272f',
          color: loading ? '#888' : '#fff',
          border: 'none',
          fontWeight: 600,
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {loading ? '...' : 'Надіслати'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default ChatForm; 