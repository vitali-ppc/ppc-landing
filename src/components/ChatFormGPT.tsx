'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

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
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="3" height="7" rx="1.2" fill="#38bdf8" />
      <rect x="9" y="6" width="3" height="11" rx="1.2" fill="#0ea5e9" />
      <rect x="15" y="3" width="3" height="14" rx="1.2" fill="#23272f" />
    </svg>
  </div>
);

function getUserInitials() {
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

const ChatFormGPT: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [adsData, setAdsData] = useState<any>(null);
  const [useAdsData, setUseAdsData] = useState(false);
  const [realAdsData, setRealAdsData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [accountConnected, setAccountConnected] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [openExportDropdownIdx, setOpenExportDropdownIdx] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(typeof window !== 'undefined' && window.localStorage.getItem('chatTheme') === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.chatTheme = theme;
      window.localStorage.setItem('chatTheme', theme);
    }
  }, [theme]);

  // typing-ефект через ref
  const typingTextRef = useRef<string | null>(null);
  const typingInterrupted = useRef(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const typingIndex = useRef(0);
  const [typingText, setTypingText] = useState<string | null>(null);

  const startTypingEffect = (fullText: string) => {
    typingInterrupted.current = false;
    typingIndex.current = 0;
    typingTextRef.current = '';
    setTypingText('');
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    const type = () => {
      if (typingInterrupted.current) {
        setTypingText(null);
        typingTextRef.current = null;
        return;
      }
      typingTextRef.current = fullText.slice(0, typingIndex.current + 1);
      setTypingText(typingTextRef.current);
      if (typingIndex.current < fullText.length - 1) {
        typingIndex.current++;
        typingTimeout.current = setTimeout(type, 12 + Math.random() * 30);
      } else {
        setTypingText(null);
        typingTextRef.current = null;
      }
    };
    type();
  };

  // Закривати dropdown при кліку поза меню та кнопкою
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setOpenExportDropdownIdx(null);
    };
    if (openExportDropdownIdx !== null) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openExportDropdownIdx]);

  // Підвантаження mock-даних при першому рендері
  useEffect(() => {
    fetch('/api/ads-data')
      .then(res => res.json())
      .then(data => setAdsData(data))
      .catch(() => setAdsData(null));
  }, []);

  // Обробка OAuth2 callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const token = urlParams.get('access_token');
    const error = urlParams.get('error');

    if (authStatus === 'success' && token) {
      setAccessToken(token);
      setAccountConnected(true);
      setShowAccountModal(false);
      // Отримуємо реальні дані Google Ads
      fetchRealAdsData(token);
      // Очищаємо URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      setError(`Помилка авторизації: ${error}`);
      // Очищаємо URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Функція для отримання реальних даних Google Ads
  const fetchRealAdsData = async (token: string) => {
    try {
      const response = await fetch('/api/ads-data-real', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: token }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRealAdsData(data);
      } else {
        console.error('Failed to fetch real Google Ads data');
      }
    } catch (error) {
      console.error('Error fetching real Google Ads data:', error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const chatDiv = chatEndRef.current?.parentElement;
    if (!chatDiv) return;
    const isAtBottom = chatDiv.scrollHeight - chatDiv.scrollTop - chatDiv.clientHeight < 50;
    if (isAtBottom) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Запуск typing-ефекту при новій AI-відповіді
  useEffect(() => {
    if (!loading && messages.length > 0 && messages[messages.length - 1].role === 'ai') {
      const lastAiMsg = messages[messages.length - 1].text;
      if (typingText === null && lastAiMsg && lastAiMsg.length > 0) {
        startTypingEffect(lastAiMsg);
      }
    }
    if (loading) {
      setTypingText(null);
      typingTextRef.current = null;
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingInterrupted.current = false;
    }
    // eslint-disable-next-line
  }, [messages, loading]);

  // Очищення таймера при анмаунті
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
    let question = input;
    // Якщо обрано використати дані Google Ads — додаємо їх у prompt
    if (useAdsData) {
      const dataToUse = realAdsData || adsData; // Пріоритет реальним даним
      if (dataToUse) {
        // Формуємо людяний summary для prompt
        const total = dataToUse.total;
        const campaigns = dataToUse.campaigns.map((c: any) =>
          `- ${c.name} (${c.status}): витрати $${c.cost}, кліки ${c.clicks}, покази ${c.impressions}, конверсії ${c.conversions}, CTR ${c.ctr}%, CPC $${c.cpc}, CR ${c.conversion_rate}%`
        ).join('\n');
        const dataSource = realAdsData ? 'реальними даними з вашого Google Ads акаунту' : 'тестовими даними';
        const summary = `У моєму акаунті Google Ads за ${dataToUse.date_range} (${dataSource}):
Всього витрати: $${total.cost}, кліки: ${total.clicks}, покази: ${total.impressions}, конверсії: ${total.conversions}, CTR: ${total.ctr}%, CPC: $${total.cpc}, CR: ${total.conversion_rate}%.
Кампанії:\n${campaigns}`;
        question = `${summary}\n${input}\nВикористовуй дані вище для аналізу. У кожному кроці посилайся на конкретні кампанії, цифри, метрики з цих даних. Дай рекомендації з опорою на фактичні показники. На завершення дай короткий summary і рекомендації для покращення результатів.`;
      }
    }
    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(''); // Очищаю поле одразу після submit
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
    }
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setInput('');
    inputRef.current?.focus();
  };

  // Додаємо функцію для продовження відповіді
  const handleContinue = async () => {
    setError(null);
    setLoading(true);
    // Знаходимо оригінальне питання (перший user)
    const originalUserMsg = messages.find(m => m.role === 'user')?.text || '';
    // Беремо останню відповідь AI
    const lastAiMsg = messages.filter(m => m.role === 'ai').slice(-1)[0]?.text || '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Ось оригінальне питання: ${originalUserMsg}\nОсь попередня частина відповіді:\n${lastAiMsg}\nПродовжуй з того місця, де зупинився, не повторюй попередній текст.`
        }),
      });
      if (!res.ok) throw new Error('Помилка відповіді від AI');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer }]);
    } catch (err: any) {
      setError(err.message || 'Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  // Додаю функції для експорту
  const exportTxt = async (text: string) => {
    const res = await fetch('/api/export-txt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportCsv = async (rows: string[][]) => {
    const res = await fetch('/api/export-csv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="chat-root" style={{
      maxWidth: 900,
      margin: '0 auto',
      background: theme === 'dark' ? '#23272f' : '#fff',
      borderRadius: 18,
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
      border: theme === 'dark' ? '1px solid #23272f' : '1px solid #f0f1f3',
      minHeight: 480,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
      transition: 'background 0.3s, border 0.3s',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 48px 12px 48px',
        borderBottom: '1px solid #f0f1f3',
        background: 'rgba(255,255,255,0.95)',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
      }}>
        <span style={{ fontWeight: 700, fontSize: 20, color: '#23272f', letterSpacing: '-0.5px' }}>
          PPCSet AI
        </span>
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
        </div>
      </div>
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
      <div style={{
        flex: 1,
        minHeight: '60vh',
        maxHeight: '70vh',
        overflowY: 'auto',
        padding: '24px 0',
        background: '#f9fafc',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        transition: 'background 0.2s',
      }}>
        {messages.length === 0 && <div style={{ color: '#888', padding: 24, textAlign: 'center' }}>Почніть діалог…</div>}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            gap: 16,
            margin: '18px 0',
            opacity: 0.98,
            animation: 'fadeIn 0.5s',
          }}>
            <div style={{ flexShrink: 0 }}>
              {msg.role === 'user' ? USER_AVATAR : AI_AVATAR}
            </div>
            <span style={{
              display: 'inline-block',
              background: msg.role === 'user' ? '#fff' : '#e6f7ff',
              color: '#23272f',
              borderRadius: 12,
              padding: '10px 18px',
              maxWidth: 600,
              wordBreak: 'break-word',
              fontSize: 15,
              lineHeight: 1.4,
              boxShadow: msg.role === 'user' ? '0 2px 8px rgba(30, 144, 255, 0.04)' : '0 2px 8px rgba(0,0,0,0.03)',
              border: msg.role === 'user' ? '1.5px solid #e2e8f0' : '1.5px solid #e6f7ff',
              transition: 'background 0.2s',
              position: 'relative',
            }}>
              {msg.role === 'ai' && idx === messages.length - 1 && typingText !== null
                ? (
                  <span>
                    <ReactMarkdown
                      components={{
                        code: (props: any) =>
                          props.inline ? (
                            <code style={{
                              background: '#f5f5f5',
                              borderRadius: 6,
                              padding: '2px 6px',
                              fontSize: 16,
                              color: '#0ea5e9',
                            }}>{props.children}</code>
                          ) : (
                            <pre style={{
                              background: '#23272f',
                              color: '#fff',
                              borderRadius: 10,
                              padding: 16,
                              overflowX: 'auto',
                              margin: '12px 0',
                            }}><code>{props.children}</code></pre>
                          ),
                        a: ({node, ...props}) => <a style={{ color: '#0ea5e9', textDecoration: 'underline' }} {...props} />,
                        li: ({node, ...props}) => <li style={{ marginLeft: 18, marginBottom: 4 }} {...props} />,
                      }}
                    >
                      {typingText}
                    </ReactMarkdown>
                    <span style={{ opacity: 0.5 }}>|</span>
                  </span>
                )
                : msg.role === 'ai'
                  ? (
                    <>
                      <ReactMarkdown
                        components={{
                          code: (props: any) =>
                            props.inline ? (
                              <code style={{
                                background: '#f5f5f5',
                                borderRadius: 6,
                                padding: '2px 6px',
                                fontSize: 16,
                                color: '#0ea5e9',
                              }}>{props.children}</code>
                            ) : (
                              <pre style={{
                                background: '#23272f',
                                color: '#fff',
                                borderRadius: 10,
                                padding: 16,
                                overflowX: 'auto',
                                margin: '12px 0',
                              }}><code>{props.children}</code></pre>
                            ),
                          a: ({node, ...props}) => <a style={{ color: '#0ea5e9', textDecoration: 'underline' }} {...props} />,
                          li: ({node, ...props}) => <li style={{ marginLeft: 18, marginBottom: 4 }} {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                      {/* Summary + Copy для останньої AI-відповіді, якщо були дані Google Ads */}
                      {idx === messages.length - 1 && useAdsData && adsData && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                          <span style={{ color: '#0ea5e9', fontSize: 14, fontWeight: 500 }}>
                            Відповідь сформовано на основі ваших даних Google Ads
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(msg.text);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1200);
                            }}
                            style={{
                              background: '#e6f7ff',
                              color: '#0ea5e9',
                              border: '1.2px solid #0ea5e9',
                              borderRadius: 8,
                              padding: '4px 14px',
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                            title="Скопіювати відповідь"
                          >
                            {copied ? 'Скопійовано!' : 'Скопіювати відповідь'}
                          </button>
                          {/* Кнопка експорту з іконкою та dropdown */}
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button
                              onClick={() => setOpenExportDropdownIdx(openExportDropdownIdx === idx ? null : idx)}
                              style={{
                                background: '#f5f5f5',
                                color: '#23272f',
                                border: '1.2px solid #bdbdbd',
                                borderRadius: 8,
                                padding: '4px 14px 4px 10px',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                transition: 'background 0.2s',
                                minWidth: 44,
                              }}
                              title="Скачати звіт"
                            >
                              <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:2}}>
                                  <path d="M12 5v12"/>
                                  <path d="M6 13l6 6 6-6"/>
                                  <rect x="4" y="19" width="16" height="2" rx="1" fill="#23272f" stroke="none"/>
                                </svg>
                                <span>Скачати</span>
                              </span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:4}}>
                                <path d="M6 9l6 6 6-6"/>
                              </svg>
                            </button>
                            {openExportDropdownIdx === idx && (
                              <div style={{
                                position: 'absolute',
                                top: '110%',
                                left: 0,
                                background: '#fff',
                                border: '1.2px solid #e2e8f0',
                                borderRadius: 8,
                                boxShadow: '0 4px 16px rgba(30,40,90,0.10)',
                                minWidth: 140,
                                zIndex: 100,
                                padding: '6px 0',
                              }}>
                                <button
                                  onClick={() => { exportCsv([["AI-відповідь"], [msg.text]]); setOpenExportDropdownIdx(null); }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'background 0.18s',
                                  }}
                                >
                                  Excel (CSV)
                                </button>
                                <button
                                  onClick={() => { exportCsv([["AI-відповідь"], [msg.text]]); setOpenExportDropdownIdx(null); }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'background 0.18s',
                                  }}
                                >
                                  CSV
                                </button>
                                <button
                                  onClick={() => { exportTxt(msg.text); setOpenExportDropdownIdx(null); }}
                                  style={{
                                    width: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#23272f',
                                    fontSize: 15,
                                    padding: '10px 18px',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'background 0.18s',
                                  }}
                                >
                                  TXT
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )
                  : msg.text
              }
            </span>
            {msg.role === 'ai' && (
  // Показуємо кнопки тільки якщо це не останнє AI-повідомлення з typingText, або якщо typingText === null
  ((idx !== messages.length - 1) || typingText === null) && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
      {/* Мінімалістична кнопка копіювання */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(msg.text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        style={{
          background: 'none',
          border: 'none',
          padding: 2,
          margin: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none',
          boxShadow: 'none',
          minWidth: 0,
          minHeight: 0,
        }}
        title="Скопіювати"
      >
        {copied ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
      {/* Мінімалістична кнопка експорту */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={e => {
            e.stopPropagation();
            setOpenExportDropdownIdx(openExportDropdownIdx === idx ? null : idx);
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 2,
            margin: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            boxShadow: 'none',
            minWidth: 0,
            minHeight: 0,
          }}
          title="Скачати відповідь"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v12"/>
            <path d="M6 13l6 6 6-6"/>
            <rect x="4" y="19" width="16" height="2" rx="1" fill="#23272f" stroke="none"/>
          </svg>
        </button>
        {openExportDropdownIdx === idx && (
          <div style={{
            position: 'absolute',
            top: '110%',
            left: 0,
            background: '#fff',
            border: '1.2px solid #e2e8f0',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(30,40,90,0.10)',
            minWidth: 120,
            zIndex: 100,
            padding: '4px 0',
          }}>
            <button
              onClick={() => { exportCsv([["AI-відповідь", msg.text]]); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
            >
              Excel (CSV)
            </button>
            <button
              onClick={() => { exportCsv([["AI-відповідь", msg.text]]); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
            >
              CSV
            </button>
            <button
              onClick={() => { exportTxt(msg.text); setOpenExportDropdownIdx(null); }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: '#23272f',
                fontSize: 15,
                padding: '8px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'background 0.18s',
              }}
            >
              TXT
            </button>
          </div>
        )}
      </div>
    </div>
  )
)}
          </div>
        ))}
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
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'flex-end',
      }}>
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
          placeholder="Type your question..."
          disabled={loading}
          rows={1}
          style={{
            flex: 1,
            minHeight: 40,
            maxHeight: 260,
            resize: 'none',
            overflowY: 'auto',
            padding: '8px 10px',
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
            maxWidth: 'none',
          }}
          autoFocus
        />
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
            if (typingText !== null && typingTextRef.current !== null) {
              typingInterrupted.current = true;
              setTypingText(null);
              typingTextRef.current = null;
              if (typingTimeout.current) clearTimeout(typingTimeout.current);
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
      {/* Підказка під textarea */}
      <div style={{ color: '#888', fontSize: 14, margin: '0 48px 12px 48px', textAlign: 'center' }}>
        For a personalized answer, click <b>“Use Google Ads data”</b> before submitting your question.
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
  );
};

export default ChatFormGPT; 