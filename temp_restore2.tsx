'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactNode } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
  image?: string; // base64 ╨░╨▒╨╛ URL ╨╖╨╛╨▒╤А╨░╨╢╨╡╨╜╨╜╤П
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
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
  return '╨Т';
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
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.dataset.chatTheme = theme;
      window.localStorage.setItem('chatTheme', theme);
    }
  }, [theme]);

  // typing-╨╡╤Д╨╡╨║╤В ╤З╨╡╤А╨╡╨╖ ref
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

  // ╨Ч╨░╨║╤А╨╕╨▓╨░╤В╨╕ dropdown ╨┐╤А╨╕ ╨║╨╗╤Ц╨║╤Г ╨┐╨╛╨╖╨░ ╨╝╨╡╨╜╤О ╤В╨░ ╨║╨╜╨╛╨┐╨║╨╛╤О
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

  // ╨Я╤Ц╨┤╨▓╨░╨╜╤В╨░╨╢╨╡╨╜╨╜╤П mock-╨┤╨░╨╜╨╕╤Е ╨┐╤А╨╕ ╨┐╨╡╤А╤И╨╛╨╝╤Г ╤А╨╡╨╜╨┤╨╡╤А╤Ц
  useEffect(() => {
    fetch('/api/ads-data')
      .then(res => res.json())
      .then(data => setAdsData(data))
      .catch(() => setAdsData(null));
  }, []);

  // ╨Ю╨▒╤А╨╛╨▒╨║╨░ OAuth2 callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const token = urlParams.get('access_token');
    const error = urlParams.get('error');

    if (authStatus === 'success' && token) {
      setAccessToken(token);
      setAccountConnected(true);
      setShowAccountModal(false);
      // ╨Ю╤В╤А╨╕╨╝╤Г╤Ф╨╝╨╛ ╤А╨╡╨░╨╗╤М╨╜╤Ц ╨┤╨░╨╜╤Ц Google Ads
      fetchRealAdsData(token);
      // ╨Ю╤З╨╕╤Й╨░╤Ф╨╝╨╛ URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      setError(`╨Я╨╛╨╝╨╕╨╗╨║╨░ ╨░╨▓╤В╨╛╤А╨╕╨╖╨░╤Ж╤Ц╤Ч: ${error}`);
      // ╨Ю╤З╨╕╤Й╨░╤Ф╨╝╨╛ URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // ╨д╤Г╨╜╨║╤Ж╤Ц╤П ╨┤╨╗╤П ╨╛╤В╤А╨╕╨╝╨░╨╜╨╜╤П ╤А╨╡╨░╨╗╤М╨╜╨╕╤Е ╨┤╨░╨╜╨╕╤Е Google Ads
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

  // ╨Ч╨░╨┐╤Г╤Б╨║ typing-╨╡╤Д╨╡╨║╤В╤Г ╨┐╤А╨╕ ╨╜╨╛╨▓╤Ц╨╣ AI-╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц
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

  // ╨Ю╤З╨╕╤Й╨╡╨╜╨╜╤П ╤В╨░╨╣╨╝╨╡╤А╨░ ╨┐╤А╨╕ ╨░╨╜╨╝╨░╤Г╨╜╤В╤Ц
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  // ╨Ф╨╕╨╜╨░╨╝╤Ц╤З╨╜╨╕╨╣ placeholder ╨┤╨╗╤П textarea
  const placeholders = [
    "How can I improve my Google Ads campaign?",
    "Why is my CPA so high?",
    "Show me insights for my last 30 days",
    "What's wrong with my ad performance?",
    "How to optimize my budget allocation?"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ╨Ч╨░╨▓╨░╨╜╤В╨░╨╢╨╡╨╜╨╜╤П ╤Ц╤Б╤В╨╛╤А╤Ц╤Ч ╤З╨░╤В╤Ц╨▓ ╨╖ localStorage
  useEffect(() => {
    const savedChats = localStorage.getItem('ppcset-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt)
      }));
      setChats(parsedChats);
      
      // ╨Т╤Ц╨┤╨╜╨╛╨▓╨╗╤О╤Ф╨╝╨╛ ╨╛╤Б╤В╨░╨╜╨╜╤Ц╨╣ ╨░╨║╤В╨╕╨▓╨╜╨╕╨╣ ╤З╨░╤В
      const lastChatId = localStorage.getItem('ppcset-current-chat');
      if (lastChatId && parsedChats.find((c: Chat) => c.id === lastChatId)) {
        setCurrentChatId(lastChatId);
        const lastChat = parsedChats.find((c: Chat) => c.id === lastChatId);
        if (lastChat) setMessages(lastChat.messages);
      } else if (parsedChats.length > 0) {
        // ╨п╨║╤Й╨╛ ╨╛╤Б╤В╨░╨╜╨╜╤Ц╨╣ ╤З╨░╤В ╨╜╨╡ ╨╖╨╜╨░╨╣╨┤╨╡╨╜╨╛, ╨▒╨╡╤А╨╡╨╝╨╛ ╨╜╨░╨╣╨╜╨╛╨▓╤Ц╤И╨╕╨╣
        const newestChat = parsedChats[parsedChats.length - 1];
        setCurrentChatId(newestChat.id);
        setMessages(newestChat.messages);
      }
    } else {
      // ╨б╤В╨▓╨╛╤А╤О╤Ф╨╝╨╛ ╨┐╨╡╤А╤И╨╕╨╣ ╤З╨░╤В
      createNewChat();
    }
  }, []);

  // ╨Ч╨▒╨╡╤А╨╡╨╢╨╡╨╜╨╜╤П ╤З╨░╤В╤Ц╨▓ ╤Г localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('ppcset-chats', JSON.stringify(chats));
    }
  }, [chats]);

  // ╨Ч╨▒╨╡╤А╨╡╨╢╨╡╨╜╨╜╤П ╨┐╨╛╤В╨╛╤З╨╜╨╛╨│╨╛ ╤З╨░╤В╤Г
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('ppcset-current-chat', currentChatId);
    }
  }, [currentChatId]);

  const createNewChat = () => {
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
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setInput('');
      setError(null);
      setShowSidebar(false); // ╨Ч╨░╨║╤А╨╕╨▓╨░╤Ф╨╝╨╛ sidebar ╨╜╨░ ╨╝╨╛╨▒╤Ц╨╗╤М╨╜╨╕╤Е
    }
  };

  const deleteChat = (chatId: string) => {
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
  };

  const updateChatTitle = (chatId: string, title: string) => {
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, title, updatedAt: new Date() } : c
    ));
    setEditingChatId(null);
    setEditingTitle('');
  };

  // ╨д╤Ц╨╗╤М╤В╤А╨░╤Ж╤Ц╤П ╤З╨░╤В╤Ц╨▓ ╨┐╨╛ ╨┐╨╛╤И╤Г╨║╨╛╨▓╨╛╨╝╤Г ╨╖╨░╨┐╨╕╤В╤Г
  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ╨Ч╨░╨║╤А╨╕╤В╨╕ ╨╝╨╡╨╜╤О ╨┐╤А╨╕ ╨║╨╗╤Ц╨║╤Г ╨┐╨╛╨╖╨░ ╨╜╨╕╨╝
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuId && !(e.target as Element).closest('.chat-menu')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
    let question = input;
    // ╨п╨║╤Й╨╛ ╨╛╨▒╤А╨░╨╜╨╛ ╨▓╨╕╨║╨╛╤А╨╕╤Б╤В╨░╤В╨╕ ╨┤╨░╨╜╤Ц Google Ads тАФ ╨┤╨╛╨┤╨░╤Ф╨╝╨╛ ╤Ч╤Е ╤Г prompt
    if (useAdsData) {
      const dataToUse = realAdsData || adsData; // ╨Я╤А╤Ц╨╛╤А╨╕╤В╨╡╤В ╤А╨╡╨░╨╗╤М╨╜╨╕╨╝ ╨┤╨░╨╜╨╕╨╝
      if (dataToUse) {
        // ╨д╨╛╤А╨╝╤Г╤Ф╨╝╨╛ ╨╗╤О╨┤╤П╨╜╨╕╨╣ summary ╨┤╨╗╤П prompt
        const total = dataToUse.total;
        const campaigns = dataToUse.campaigns.map((c: any) =>
          `- ${c.name} (${c.status}): ╨▓╨╕╤В╤А╨░╤В╨╕ $${c.cost}, ╨║╨╗╤Ц╨║╨╕ ${c.clicks}, ╨┐╨╛╨║╨░╨╖╨╕ ${c.impressions}, ╨║╨╛╨╜╨▓╨╡╤А╤Б╤Ц╤Ч ${c.conversions}, CTR ${c.ctr}%, CPC $${c.cpc}, CR ${c.conversion_rate}%`
        ).join('\n');
        const dataSource = realAdsData ? '╤А╨╡╨░╨╗╤М╨╜╨╕╨╝╨╕ ╨┤╨░╨╜╨╕╨╝╨╕ ╨╖ ╨▓╨░╤И╨╛╨│╨╛ Google Ads ╨░╨║╨░╤Г╨╜╤В╤Г' : '╤В╨╡╤Б╤В╨╛╨▓╨╕╨╝╨╕ ╨┤╨░╨╜╨╕╨╝╨╕';
        const summary = `╨г ╨╝╨╛╤Ф╨╝╤Г ╨░╨║╨░╤Г╨╜╤В╤Ц Google Ads ╨╖╨░ ${dataToUse.date_range} (${dataSource}):
╨Т╤Б╤М╨╛╨│╨╛ ╨▓╨╕╤В╤А╨░╤В╨╕: $${total.cost}, ╨║╨╗╤Ц╨║╨╕: ${total.clicks}, ╨┐╨╛╨║╨░╨╖╨╕: ${total.impressions}, ╨║╨╛╨╜╨▓╨╡╤А╤Б╤Ц╤Ч: ${total.conversions}, CTR: ${total.ctr}%, CPC: $${total.cpc}, CR: ${total.conversion_rate}%.
╨Ъ╨░╨╝╨┐╨░╨╜╤Ц╤Ч:\n${campaigns}`;
        question = `${summary}\n${input}\n╨Т╨╕╨║╨╛╤А╨╕╤Б╤В╨╛╨▓╤Г╨╣ ╨┤╨░╨╜╤Ц ╨▓╨╕╤Й╨╡ ╨┤╨╗╤П ╨░╨╜╨░╨╗╤Ц╨╖╤Г. ╨г ╨║╨╛╨╢╨╜╨╛╨╝╤Г ╨║╤А╨╛╤Ж╤Ц ╨┐╨╛╤Б╨╕╨╗╨░╨╣╤Б╤П ╨╜╨░ ╨║╨╛╨╜╨║╤А╨╡╤В╨╜╤Ц ╨║╨░╨╝╨┐╨░╨╜╤Ц╤Ч, ╤Ж╨╕╤Д╤А╨╕, ╨╝╨╡╤В╤А╨╕╨║╨╕ ╨╖ ╤Ж╨╕╤Е ╨┤╨░╨╜╨╕╤Е. ╨Ф╨░╨╣ ╤А╨╡╨║╨╛╨╝╨╡╨╜╨┤╨░╤Ж╤Ц╤Ч ╨╖ ╨╛╨┐╨╛╤А╨╛╤О ╨╜╨░ ╤Д╨░╨║╤В╨╕╤З╨╜╤Ц ╨┐╨╛╨║╨░╨╖╨╜╨╕╨║╨╕. ╨Э╨░ ╨╖╨░╨▓╨╡╤А╤И╨╡╨╜╨╜╤П ╨┤╨░╨╣ ╨║╨╛╤А╨╛╤В╨║╨╕╨╣ summary ╤Ц ╤А╨╡╨║╨╛╨╝╨╡╨╜╨┤╨░╤Ж╤Ц╤Ч ╨┤╨╗╤П ╨┐╨╛╨║╤А╨░╤Й╨╡╨╜╨╜╤П ╤А╨╡╨╖╤Г╨╗╤М╤В╨░╤В╤Ц╨▓.`;
      }
    }
    const userMessage: Message = { 
      role: 'user', 
      text: input,
      image: imagePreview || undefined
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // ╨Ю╨╜╨╛╨▓╨╗╤О╤Ф╨╝╨╛ ╨┐╨╛╤В╨╛╤З╨╜╨╕╨╣ ╤З╨░╤В
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
    
    setInput(''); // ╨Ю╤З╨╕╤Й╨░╤О ╨┐╨╛╨╗╨╡ ╨╛╨┤╤А╨░╨╖╤Г ╨┐╤Ц╤Б╨╗╤П submit
    setSelectedImage(null); // ╨Ю╤З╨╕╤Й╨░╤О ╨╖╨╛╨▒╤А╨░╨╢╨╡╨╜╨╜╤П
    setImagePreview(null); // ╨Ю╤З╨╕╤Й╨░╤О preview
    if (inputRef.current) {
      inputRef.current.style.height = '40px';
    }
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question,
          image: imagePreview // ╨Ф╨╛╨┤╨░╤Ф╨╝╨╛ ╨╖╨╛╨▒╤А╨░╨╢╨╡╨╜╨╜╤П ╨┤╨╛ ╨╖╨░╨┐╨╕╤В╤Г
        }),
      });
      if (!res.ok) throw new Error('╨Я╨╛╨╝╨╕╨╗╨║╨░ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц ╨▓╤Ц╨┤ AI');
      const data = await res.json();
      const aiMessage: Message = { role: 'ai', text: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
      
      // ╨Ю╨╜╨╛╨▓╨╗╤О╤Ф╨╝╨╛ ╨┐╨╛╤В╨╛╤З╨╜╨╕╨╣ ╤З╨░╤В ╨╖ AI ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╨┤╤О
      if (currentChatId) {
        const updatedMessages: Message[] = [...messages, userMessage, aiMessage];
        setChats(prev => prev.map(c => 
          c.id === currentChatId 
            ? { ...c, messages: updatedMessages, updatedAt: new Date() }
            : c
        ));
      }
    } catch (err: any) {
      setError(err.message || '╨б╤В╨░╨╗╨░╤Б╤П ╨┐╨╛╨╝╨╕╨╗╨║╨░');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError(null);
    setInput('');
    // ╨Ю╤З╨╕╤Й╨░╤Ф╨╝╨╛ ╨┐╨╛╤В╨╛╤З╨╜╨╕╨╣ ╤З╨░╤В
    if (currentChatId) {
      setChats(prev => prev.map(c => 
        c.id === currentChatId 
          ? { ...c, messages: [], updatedAt: new Date() }
          : c
      ));
    }
    inputRef.current?.focus();
  };

  // ╨Ф╨╛╨┤╨░╤Ф╨╝╨╛ ╤Д╤Г╨╜╨║╤Ж╤Ц╤О ╨┤╨╗╤П ╨┐╤А╨╛╨┤╨╛╨▓╨╢╨╡╨╜╨╜╤П ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц
  const handleContinue = async () => {
    setError(null);
    setLoading(true);
    // ╨Ч╨╜╨░╤Е╨╛╨┤╨╕╨╝╨╛ ╨╛╤А╨╕╨│╤Ц╨╜╨░╨╗╤М╨╜╨╡ ╨┐╨╕╤В╨░╨╜╨╜╤П (╨┐╨╡╤А╤И╨╕╨╣ user)
    const originalUserMsg = messages.find(m => m.role === 'user')?.text || '';
    // ╨С╨╡╤А╨╡╨╝╨╛ ╨╛╤Б╤В╨░╨╜╨╜╤О ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М AI
    const lastAiMsg = messages.filter(m => m.role === 'ai').slice(-1)[0]?.text || '';
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `╨Ю╤Б╤М ╨╛╤А╨╕╨│╤Ц╨╜╨░╨╗╤М╨╜╨╡ ╨┐╨╕╤В╨░╨╜╨╜╤П: ${originalUserMsg}\n╨Ю╤Б╤М ╨┐╨╛╨┐╨╡╤А╨╡╨┤╨╜╤П ╤З╨░╤Б╤В╨╕╨╜╨░ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц:\n${lastAiMsg}\n╨Я╤А╨╛╨┤╨╛╨▓╨╢╤Г╨╣ ╨╖ ╤В╨╛╨│╨╛ ╨╝╤Ц╤Б╤Ж╤П, ╨┤╨╡ ╨╖╤Г╨┐╨╕╨╜╨╕╨▓╤Б╤П, ╨╜╨╡ ╨┐╨╛╨▓╤В╨╛╤А╤О╨╣ ╨┐╨╛╨┐╨╡╤А╨╡╨┤╨╜╤Ц╨╣ ╤В╨╡╨║╤Б╤В.`
        }),
      });
      if (!res.ok) throw new Error('╨Я╨╛╨╝╨╕╨╗╨║╨░ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц ╨▓╤Ц╨┤ AI');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.answer }]);
    } catch (err: any) {
      setError(err.message || '╨б╤В╨░╨╗╨░╤Б╤П ╨┐╨╛╨╝╨╕╨╗╨║╨░');
    } finally {
      setLoading(false);
    }
  };

  // ╨Ф╨╛╨┤╨░╤О ╤Д╤Г╨╜╨║╤Ж╤Ц╤Ч ╨┤╨╗╤П ╨╡╨║╤Б╨┐╨╛╤А╤В╤Г
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

  // ╨д╤Г╨╜╨║╤Ж╤Ц╤П ╨┤╨╗╤П ╨╖╨░╨▓╨░╨╜╤В╨░╨╢╨╡╨╜╨╜╤П ╨╖╨╛╨▒╤А╨░╨╢╨╡╨╜╤М
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // ╨Я╨╡╤А╨╡╨▓╤Ц╤А╤П╤Ф╨╝╨╛ ╤В╨╕╨┐ ╤Д╨░╨╣╨╗╤Г
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // ╨Я╨╡╤А╨╡╨▓╤Ц╤А╤П╤Ф╨╝╨╛ ╤А╨╛╨╖╨╝╤Ц╤А ╤Д╨░╨╣╨╗╤Г (╨╝╨░╨║╤Б╨╕╨╝╤Г╨╝ 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // ╨б╤В╨▓╨╛╤А╤О╤Ф╨╝╨╛ preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ╨д╤Г╨╜╨║╤Ж╤Ц╤П ╨┤╨╗╤П ╨▓╨╕╨┤╨░╨╗╨╡╨╜╨╜╤П ╨╖╨╛╨▒╤А╨░╨╢╨╡╨╜╨╜╤П
  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif',
    }}>
      {/* Narrow sidebar background - visible only when sidebar is closed */}
      {!showSidebar && (
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
        onClick={() => setShowSidebar(!showSidebar)}
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
        title={showSidebar ? 'Hide chat history' : 'Show chat history'}
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
        тШ░
      </button>

      {/* New chat button (pencil) - visible only when sidebar is closed */}
      {!showSidebar && (
        <button
          onClick={createNewChat}
          style={{
            position: 'fixed',
            left: '16px',
            top: '60px',
            background: '#23272f',
            border: '1px solid #1a1a1a',
            color: '#fff',
            fontSize: 16,
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 6,
            transition: 'all 0.2s',
            zIndex: 200,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="New chat"
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
          тЬПя╕П
        </button>
      )}

      {/* Sidebar */}
      <div style={{
        width: showSidebar ? 280 : 0,
        background: '#23272f',
        borderRight: '1px solid #1a1a1a',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        zIndex: 100,
      }}>
        <div style={{
          padding: '12px 16px 20px 16px',
          borderBottom: '1px solid #1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={createNewChat}
            style={{
              background: 'rgba(255,255,255,0.03)',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '16px 24px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.2)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.border = '1.5px solid rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            New Chat
          </button>
        </div>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #1a1a1a',
              borderRadius: 6,
              fontSize: 14,
              background: '#1a1a1a',
              color: '#fff',
              outline: 'none',
            }}
            onFocus={e => {
              e.target.style.border = '1px solid #7f9cf5';
              e.target.style.boxShadow = '0 0 0 2px rgba(127, 156, 245, 0.2)';
            }}
            onBlur={e => {
              e.target.style.border = '1px solid #1a1a1a';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
        }}>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              style={{
                padding: '12px 16px',
                margin: '4px 0',
                borderRadius: 8,
                background: currentChatId === chat.id ? '#1a1a1a' : 'transparent',
                border: currentChatId === chat.id ? '1px solid #7f9cf5' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={() => selectChat(chat.id)}
              onMouseEnter={e => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = '#1a1a1a';
                  e.currentTarget.style.border = '1px solid #00ffe7';
                }
              }}
              onMouseLeave={e => {
                if (currentChatId !== chat.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.border = '1px solid transparent';
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
                        updateChatTitle(chat.id, editingTitle);
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
                      border: '1px solid #7f9cf5',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 600,
                      background: '#fff',
                      color: '#23272f',
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
                    color: '#a0a0a0',
                    fontSize: 16,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 4,
                    transition: 'all 0.2s',
                    marginLeft: 8,
                  }}
                  title="More options"
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00ffe7';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#a0a0a0';
                  }}
                >
                  тЛп
                </button>
                {openMenuId === chat.id && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    background: '#1a1a1a',
                    border: '1px solid #7f9cf5',
                    borderRadius: 6,
                    boxShadow: '0 4px 12px rgba(127, 156, 245, 0.3)',
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
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#7f9cf5';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#fff';
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
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#ff6b6b';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.color = '#ff6b6b';
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
      </div>

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
        {/* ╨г top bar ╨▓╨╕╨┤╨░╨╗╤П╤О ╨║╨╜╨╛╨┐╨║╤Г ╨┐╨╡╤А╨╡╨╝╨╕╨║╨░╤З╨░ ╤В╨╡╨╝╨╕ (╤Ц╨║╨╛╨╜╨║╨░ тШАя╕П/ЁЯМЩ) */}
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
      {/* ╨С╨╗╨╛╨║ "╨Ф╨░╨╜╤Ц Google Ads ╨┐╤Ц╨┤╨║╨╗╤О╤З╨╡╨╜╤Ц" */}
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
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: 'background 0.2s',
      }}>
        {messages.length === 0 && (
          <div style={{ 
            color: '#23272f', 
            padding: '48px 24px', 
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '500',
            lineHeight: '1.5',
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '600', color: '#7f9cf5' }}>
              Ready to boost your Google Ads performance?
            </div>
          </div>
        )}
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
                      {/* Summary + Copy ╨┤╨╗╤П ╨╛╤Б╤В╨░╨╜╨╜╤М╨╛╤Ч AI-╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц, ╤П╨║╤Й╨╛ ╨▒╤Г╨╗╨╕ ╨┤╨░╨╜╤Ц Google Ads */}
                      {idx === messages.length - 1 && useAdsData && adsData && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                          <span style={{ color: '#0ea5e9', fontSize: 14, fontWeight: 500 }}>
                            ╨Т╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М ╤Б╤Д╨╛╤А╨╝╨╛╨▓╨░╨╜╨╛ ╨╜╨░ ╨╛╤Б╨╜╨╛╨▓╤Ц ╨▓╨░╤И╨╕╤Е ╨┤╨░╨╜╨╕╤Е Google Ads
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
                            title="╨б╨║╨╛╨┐╤Ц╤О╨▓╨░╤В╨╕ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М"
                          >
                            {copied ? '╨б╨║╨╛╨┐╤Ц╨╣╨╛╨▓╨░╨╜╨╛!' : '╨б╨║╨╛╨┐╤Ц╤О╨▓╨░╤В╨╕ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М'}
                          </button>
                          {/* ╨Ъ╨╜╨╛╨┐╨║╨░ ╨╡╨║╤Б╨┐╨╛╤А╤В╤Г ╨╖ ╤Ц╨║╨╛╨╜╨║╨╛╤О ╤В╨░ dropdown */}
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
                              title="╨б╨║╨░╤З╨░╤В╨╕ ╨╖╨▓╤Ц╤В"
                            >
                              <span style={{display:'inline-flex',alignItems:'center',gap:6}}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:2}}>
                                  <path d="M12 5v12"/>
                                  <path d="M6 13l6 6 6-6"/>
                                  <rect x="4" y="19" width="16" height="2" rx="1" fill="#23272f" stroke="none"/>
                                </svg>
                                <span>╨б╨║╨░╤З╨░╤В╨╕</span>
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
                                  onClick={() => { exportCsv([["AI-╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М"], [msg.text]]); setOpenExportDropdownIdx(null); }}
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
                                  onClick={() => { exportCsv([["AI-╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М"], [msg.text]]); setOpenExportDropdownIdx(null); }}
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
              {msg.image && (
                <div style={{ marginTop: '12px' }}>
                  <img
                    src={msg.image}
                    alt="Uploaded image"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  />
                </div>
              )}
            </span>
            {msg.role === 'ai' && (
  // ╨Я╨╛╨║╨░╨╖╤Г╤Ф╨╝╨╛ ╨║╨╜╨╛╨┐╨║╨╕ ╤В╤Ц╨╗╤М╨║╨╕ ╤П╨║╤Й╨╛ ╤Ж╨╡ ╨╜╨╡ ╨╛╤Б╤В╨░╨╜╨╜╤Ф AI-╨┐╨╛╨▓╤Ц╨┤╨╛╨╝╨╗╨╡╨╜╨╜╤П ╨╖ typingText, ╨░╨▒╨╛ ╤П╨║╤Й╨╛ typingText === null
  ((idx !== messages.length - 1) || typingText === null) && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
      {/* ╨Ь╤Ц╨╜╤Ц╨╝╨░╨╗╤Ц╤Б╤В╨╕╤З╨╜╨░ ╨║╨╜╨╛╨┐╨║╨░ ╨║╨╛╨┐╤Ц╤О╨▓╨░╨╜╨╜╤П */}
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
        title="╨б╨║╨╛╨┐╤Ц╤О╨▓╨░╤В╨╕"
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
      {/* ╨Ь╤Ц╨╜╤Ц╨╝╨░╨╗╤Ц╤Б╤В╨╕╤З╨╜╨░ ╨║╨╜╨╛╨┐╨║╨░ ╨╡╨║╤Б╨┐╨╛╤А╤В╤Г */}
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
          title="╨б╨║╨░╤З╨░╤В╨╕ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М"
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
              onClick={() => { exportCsv([["AI-╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М", msg.text]]); setOpenExportDropdownIdx(null); }}
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
              onClick={() => { exportCsv([["AI-╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М", msg.text]]); setOpenExportDropdownIdx(null); }}
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
              AI ╨┤╤Г╨╝╨░╤ФтАж
            </span>
          </div>
        )}
        {/* ╨Ъ╨╜╨╛╨┐╨║╨░ "╨Я╤А╨╛╨┤╨╛╨▓╨╢╨╕╤В╨╕ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М" */}
        {/* ╨Т╨╕╨┤╨░╨╗╤П╤О ╨▒╨╗╨╛╨║: */}
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
            }}>╨Я╤А╨╛╨┤╨╛╨▓╨╢╨╕╤В╨╕ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤М</button>
          </div>
        )} */}
        <div ref={chatEndRef} />
      </div>
      {/* Input */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: 16,
        padding: '18px 24px 32px 24px', // ╨▒╤Ц╨╗╤М╤И╨╡ ╨╝╤Ц╤Б╤Ж╤П ╨╖╨╜╨╕╨╖╤Г
        borderTop: '1px solid #e2e8f0',
        background: '#fff',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        alignItems: 'flex-end',
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
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
                  // ╨Т╨╕╨║╨╗╨╕╨║╨░╤Ф╨╝╨╛ submit ╤Д╨╛╤А╨╝╨╕
                  (e.target as HTMLTextAreaElement).form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
              }
            }}
            placeholder={placeholders[placeholderIndex]}
            disabled={loading}
            rows={1}
            style={{
              width: '100%',
              minHeight: 40,
              maxHeight: 260,
              resize: 'none',
              overflowY: 'auto',
              padding: '8px 10px 8px 32px',
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
              left: '6px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Upload image"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#7f9cf5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </button>
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label={loading || typingText !== null ? '╨Ч╤Г╨┐╨╕╨╜╨╕╤В╨╕ ╨┤╤А╤Г╨║ ╨▓╤Ц╨┤╨┐╨╛╨▓╤Ц╨┤╤Ц' : '╨Т╤Ц╨┤╨┐╤А╨░╨▓╨╕╤В╨╕'}
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
              // ╨Я╨╛╨║╨░╨╖╨░╤В╨╕ ╨╛╨┤╤А╨░╨╖╤Г ╨┐╨╛╨▓╨╜╨╕╨╣ ╤В╨╡╨║╤Б╤В
              const lastAiMsg = messages[messages.length - 1]?.text;
              if (lastAiMsg) setMessages(prev => prev.map((m, i) => i === prev.length - 1 ? { ...m, text: lastAiMsg } : m));
              e.preventDefault();
            }
          }}
        >
          {(loading || typingText !== null) ? (
            // ╨Ъ╨▓╨░╨┤╤А╨░╤В╨╕╨║ (╤П╨║ ╤Г ╤Ж╤М╨╛╨╝╤Г ╤З╨░╤В╤Ц)
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="5" y="5" width="12" height="12" rx="3" fill="#888" />
            </svg>
          ) : (
            // ╨б╤В╤А╤Ц╨╗╨╛╤З╨║╨░
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 11L19 3L11 19L10 13L3 11Z" fill="currentColor"/>
            </svg>
          )}
        </button>
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
              ├Ч
            </button>
          </div>
        </div>
      )}
      {/* Example prompt suggestions under textarea */}
      <div style={{
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
        margin: '0 48px 10px 48px',
        flexWrap: 'wrap',
      }}>
        {[
          "How can I improve my Google Ads campaign?",
          "Why is my CPA so high?",
          "Show me insights for my last 30 days."
        ].map((example, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInput(example)}
            style={{
              background: '#f5f5f5',
              color: '#23272f',
              border: '1.2px solid #e2e8f0',
              borderRadius: 8,
              padding: '7px 16px',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.18s, border 0.18s',
              marginBottom: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
              outline: 'none',
              whiteSpace: 'nowrap',
            }}
            tabIndex={0}
            aria-label={`Insert example: ${example}`}
          >
            {example}
          </button>
        ))}
      </div>
      {/* ╨Я╤Ц╨┤╨║╨░╨╖╨║╨░ ╨┐╤Ц╨┤ textarea */}
      <div style={{ color: '#888', fontSize: 14, margin: '0 48px 12px 48px', textAlign: 'center' }}>
        For a personalized answer, click <b>тАЬUse Google Ads dataтАЭ</b> before submitting your question.
      </div>
      {error && <div style={{ color: 'red', margin: '0 48px 10px 48px' }}>{error}</div>}
      {/* ╨Ь╨╛╨┤╨░╨╗╨║╨░-╨╖╨░╨│╨╗╤Г╤И╨║╨░ ╨┤╨╗╤П ╨┐╤Ц╨┤╨║╨╗╤О╤З╨╡╨╜╨╜╤П ╨░╨║╨░╤Г╨╜╤В╨░ */}
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
      </div>
    </div>
  );
};

export default ChatFormGPT; 
