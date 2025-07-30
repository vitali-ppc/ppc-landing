'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AI_AVATAR = (
  <div style={{
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#23272f',
    fontSize: 20,
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
  }}>
    <span role="img" aria-label="AI">⚡</span>
  </div>
);

function getUserInitials() {
  return 'В';
}

const USER_AVATAR = (
  <div style={{
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#23272f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    color: '#fff',
    fontSize: 20,
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
  }}>
    {getUserInitials()}
  </div>
);

const ChatFormCard: React.FC = () => {
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
    <div className="chat-ui-card" style={{
      maxWidth: 540,
      margin: '0 auto',
      padding: 32,
      background: '#f9fafc',
      borderRadius: 22,
      boxShadow: '0 6px 32px rgba(0,0,0,0.10)',
      fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
      border: '1px solid #e2e8f0',
      minHeight: 440
    }}>
      <h2 style={{
        fontWeight: 700,
        fontSize: 24,
        color: '#23272f',
        marginBottom: 18,
        letterSpacing: '-0.5px'
      }}>AI Chat (Card Style)</h2>
      <div className="chat-history" style={{
        minHeight: 220,
        maxHeight: 340,
        overflowY: 'auto',
        border: 'none',
        borderRadius: 12,
        padding: 0,
        marginBottom: 18,
        background: 'transparent',
        transition: 'background 0.2s'
      }}>
        {messages.length === 0 && <div style={{ color: '#888', padding: 24, textAlign: 'center' }}>Почніть діалог…</div>}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: 12,
            margin: '18px 0',
            opacity: 0.98,
            animation: 'fadeIn 0.5s',
          }}>
            <div style={{ flexShrink: 0 }}>
              {msg.role === 'user' ? USER_AVATAR : AI_AVATAR}
            </div>
            <div style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              border: msg.role === 'user' ? '1.5px solid #e6f7ff' : '1.5px solid #e2e8f0',
              padding: '14px 22px',
              maxWidth: 340,
              wordBreak: 'break-word',
              fontSize: 16,
              color: '#23272f',
              fontWeight: 500,
              transition: 'box-shadow 0.2s',
            }}>
              {msg.text}
            </div>
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
            border: '1.5px solid #e2e8f0',
            fontSize: 16,
            fontFamily: 'inherit',
            background: '#fff',
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

export default ChatFormCard; 