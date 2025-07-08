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
  // Додаю стейт для typing-ефекту
  const [typingText, setTypingText] = useState<string | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  // Додаю стейт для даних Google Ads
  const [adsData, setAdsData] = useState<any>(null);
  const [useAdsData, setUseAdsData] = useState(false);
  const [realAdsData, setRealAdsData] = useState<any>(null);
  // Додаю стейт для копіювання
  const [copied, setCopied] = useState(false);
  // Додаю стейт для OAuth2 підключення акаунта
  const [accountConnected, setAccountConnected] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

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

  // Модифікую додавання AI-відповіді для typing-ефекту
  useEffect(() => {
    if (!loading && messages.length > 0 && messages[messages.length - 1].role === 'ai') {
      const lastAiMsg = messages[messages.length - 1].text;
      if (typingText === null && lastAiMsg && lastAiMsg.length > 0) {
        setTypingText('');
        let i = 0;
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        const type = () => {
          setTypingText(lastAiMsg.slice(0, i + 1));
          if (i < lastAiMsg.length - 1) {
            i++;
            typingTimeout.current = setTimeout(type, 12 + Math.random() * 30);
          } else {
            setTypingText(null);
          }
        };
        type();
      }
    }
    // Очищення при новому питанні
    if (loading) {
      setTypingText(null);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    }
    // eslint-disable-next-line
  }, [messages, loading]);

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

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
      border: '1px solid #f0f1f3',
      minHeight: 480,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
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
        <div style={{ display: 'flex', gap: 10 }}>
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
            title={accountConnected ? 'Google Ads акаунт підключено' : 'Підключити Google Ads акаунт'}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 4 }}>
              <circle cx="10" cy="10" r="9" stroke="#0ea5e9" strokeWidth="2" fill={accountConnected ? '#0ea5e9' : 'none'} />
              <path d="M6 10l2.5 2.5L14 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: accountConnected ? 1 : 0 }} />
            </svg>
            {accountConnected ? 'Google Ads акаунт підключено' : 'Підключити Google Ads акаунт'}
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
              title={realAdsData ? "Додати реальні дані Google Ads у питання" : "Додати тестові дані Google Ads у питання"}
            >
              {useAdsData ? (realAdsData ? 'Реальні дані Google Ads додано' : 'Дані Google Ads додано') : (realAdsData ? 'Використати реальні дані Google Ads' : 'Використати дані Google Ads')}
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
          }} title="Очистити чат">
            Очистити
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
            {realAdsData ? 'Реальні дані Google Ads підключені' : 'Тестові дані Google Ads підключені'}
          </span>
          <details style={{ flex: 1 }}>
            <summary style={{ cursor: 'pointer', color: realAdsData ? '#0ea5e9' : '#856404', fontWeight: 400, fontSize: 15 }}>
              Переглянути {realAdsData ? 'реальні' : 'тестові'} дані
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
                          <button
                            onClick={() => {
                              // Експортувати у Markdown (копіювати сирий markdown)
                              navigator.clipboard.writeText(msg.text);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 1200);
                            }}
                            style={{
                              background: '#fff',
                              color: '#0ea5e9',
                              border: '1.2px solid #0ea5e9',
                              borderRadius: 8,
                              padding: '4px 14px',
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: 'pointer',
                              transition: 'background 0.2s',
                            }}
                            title="Експортувати у Markdown"
                          >
                            {copied ? 'Markdown скопійовано!' : 'Експортувати у Markdown'}
                          </button>
                        </div>
                      )}
                    </>
                  )
                  : msg.text
              }
            </span>
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
        {!loading && messages.length > 0 && messages[messages.length-1].role === 'ai' && (
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
        )}
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
          placeholder="Введіть питання…"
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
          aria-label="Відправити"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: loading ? '#e2e8f0' : '#23272f',
            color: loading ? '#888' : '#fff',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            marginLeft: 8
          }}
        >
          {loading ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="3" opacity="0.2" />
              <path d="M11 2a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 11L19 3L11 19L10 13L3 11Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </form>
      {/* Підказка під textarea */}
      <div style={{ color: '#888', fontSize: 14, margin: '0 48px 12px 48px', textAlign: 'left' }}>
        Щоб отримати персоналізовану відповідь, натисніть <b>“Використати дані Google Ads”</b> перед відправкою питання.
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
              {accountConnected ? 'Google Ads акаунт підключено!' : 'Підключення Google Ads акаунта'}
            </div>
            <div style={{ color: '#555', fontSize: 16, marginBottom: 24 }}>
              {accountConnected
                ? 'Ви успішно підключили Google Ads акаунт через OAuth2. Тепер AI може аналізувати ваші реальні дані.'
                : 'Підключіть ваш Google Ads акаунт для отримання персоналізованих рекомендацій на основі реальних даних.'}
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
              >Відключити акаунт</button>
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
              >Підключити Google Ads акаунт</button>
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
      `}</style>
    </div>
  );
};

export default ChatFormGPT; 