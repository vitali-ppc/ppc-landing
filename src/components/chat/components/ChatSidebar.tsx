import React from 'react';
import { Chat } from '../types';

interface ChatSidebarProps {
  showSidebar: boolean;
  chats: Chat[];
  currentChatId: string | null;
  searchQuery: string;
  openMenuId: string | null;
  editingChatId: string | null;
  editingTitle: string;
  filteredChats: Chat[];
  onToggleSidebar: () => void;
  onCreateNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onUpdateChatTitle: (chatId: string, title: string) => void;
  onSetOpenMenuId: (id: string | null) => void;
  onSetEditingChatId: (id: string | null) => void;
  onSetEditingTitle: (title: string) => void;
  onSetSearchQuery: (query: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = React.memo(({
  showSidebar,
  chats,
  currentChatId,
  searchQuery,
  openMenuId,
  editingChatId,
  editingTitle,
  filteredChats,
  onToggleSidebar,
  onCreateNewChat,
  onSelectChat,
  onDeleteChat,
  onUpdateChatTitle,
  onSetOpenMenuId,
  onSetEditingChatId,
  onSetEditingTitle,
  onSetSearchQuery,
}) => {
  return (
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

      {/* New chat button */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <button
          onClick={onCreateNewChat}
          style={{
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8,
            padding: '12px 20px',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
          }}
        >
          <span style={{ fontSize: 16 }}>✏️</span>
          New Chat
        </button>
      </div>

      {/* Search */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSetSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #1a1a1a',
            borderRadius: 6,
            fontSize: 14,
            background: '#1a1a1a',
            color: '#fff',
            outline: 'none',
            transition: 'all 0.2s ease',
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

      {/* Chat list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
      }}>
        {filteredChats.length === 0 ? (
          <div style={{
            padding: '20px 16px',
            textAlign: 'center',
            color: '#888',
            fontSize: 14,
          }}>
            {searchQuery ? 'No chats found' : 'No chats yet'}
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
                             style={{
                 padding: '8px 16px',
                 margin: '2px 0',
                 borderRadius: 8,
                background: currentChatId === chat.id ? '#1a1a1a' : 'transparent',
                border: currentChatId === chat.id ? '1px solid #7f9cf5' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}
              onClick={() => onSelectChat(chat.id)}
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
                    onChange={(e) => onSetEditingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (editingTitle.trim()) {
                          onUpdateChatTitle(chat.id, editingTitle);
                        } else {
                          onSetEditingChatId(null);
                          onSetEditingTitle('');
                        }
                      } else if (e.key === 'Escape') {
                        onSetEditingChatId(null);
                        onSetEditingTitle('');
                      }
                    }}
                    onBlur={() => {
                      if (editingTitle.trim()) {
                        onUpdateChatTitle(chat.id, editingTitle);
                      } else {
                        onSetEditingChatId(null);
                        onSetEditingTitle('');
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      border: '1px solid #7f9cf5',
                      borderRadius: 4,
                      fontSize: 14,
                      fontWeight: 500,
                      background: '#fff',
                      color: '#23272f',
                      outline: 'none',
                    }}
                    autoFocus
                  />
                ) : (
                  <div style={{
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: '1.4',
                  }}>
                    {chat.title}
                  </div>
                )}
              </div>
              
              <div style={{ position: 'relative' }} className="chat-menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetOpenMenuId(openMenuId === chat.id ? null : chat.id);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#888',
                    fontSize: 18,
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 4,
                    transition: 'all 0.2s ease',
                    marginLeft: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 24,
                    height: 24,
                  }}
                  title="More options"
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00ffe7';
                    e.currentTarget.style.background = 'rgba(0, 255, 231, 0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#888';
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  ⋯
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
                    overflow: 'hidden',
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetEditingChatId(chat.id);
                        onSetEditingTitle(chat.title);
                        onSetOpenMenuId(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderBottom: '1px solid #2a2a2a',
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', display: 'inline-block' }}>
                        <path d="M11 4H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"/>
                        <polyline points="8,2 12,2 16,2"/>
                        <line x1="9" y1="9" x2="9" y2="15"/>
                        <line x1="15" y1="9" x2="15" y2="15"/>
                      </svg>
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                        onSetOpenMenuId(null);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        fontSize: 14,
                        color: '#ff6b6b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center'
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}); 