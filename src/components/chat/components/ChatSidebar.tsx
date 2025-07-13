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

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
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
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '280px',
      background: '#23272f',
      borderRight: '1px solid #23272f',
      transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid #23272f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>
          Chats
        </span>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            fontSize: 20,
            cursor: 'pointer',
            padding: '4px',
            borderRadius: 4,
          }}
        >
          ×
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '16px' }}>
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSetSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #23272f',
            borderRadius: 6,
            background: '#1a1a1a',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
          }}
        />
      </div>

      {/* New chat button */}
      <div style={{ padding: '0 16px 16px' }}>
        <button
          onClick={onCreateNewChat}
          style={{
            width: '100%',
            padding: '10px 16px',
            background: '#7f9cf5',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          New Chat
        </button>
      </div>

      {/* Chat list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px',
      }}>
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            style={{
              padding: '12px 16px',
              marginBottom: 8,
              background: currentChatId === chat.id ? '#7f9cf5' : 'transparent',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
                {chat.messages.length} messages
              </div>
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
                      onDeleteChat(chat.id);
                      onSetOpenMenuId(null);
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
  );
}; 