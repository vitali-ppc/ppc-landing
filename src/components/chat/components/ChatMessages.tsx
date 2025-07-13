import React from 'react';
import { Message, ExportFormat } from '../types';
import { MessageBubble } from './MessageBubble';
import { AI_AVATAR } from './Avatars';

interface ChatMessagesProps {
  messages: Message[];
  typingText: string | null;
  useAdsData: boolean;
  adsData: any;
  copied: boolean;
  openExportDropdownIdx: number | null;
  loading: boolean;
  onCopy: () => void;
  onExport: (format: ExportFormat, data: any) => void;
  setOpenExportDropdownIdx: (index: number | null) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  typingText,
  useAdsData,
  adsData,
  copied,
  openExportDropdownIdx,
  loading,
  onCopy,
  onExport,
  setOpenExportDropdownIdx,
}) => {
  return (
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
      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
          index={index}
          isLastMessage={index === messages.length - 1}
          typingText={typingText}
          useAdsData={useAdsData}
          adsData={adsData}
          copied={copied}
          openExportDropdownIdx={openExportDropdownIdx}
          onCopy={() => {
            navigator.clipboard.writeText(message.text);
            // Здесь нужно вызвать функцию для установки copied состояния
            // Но у нас нет доступа к setCopied, поэтому передадим через onCopy
            onCopy();
          }}
          onExport={onExport}
          setOpenExportDropdownIdx={setOpenExportDropdownIdx}
        />
      ))}
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '18px 0 0 0', opacity: 0.85, animation: 'fadeIn 0.5s' }}>
          <div style={{ flexShrink: 0 }}>
            {AI_AVATAR}
          </div>
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
            AI thinking...
          </span>
        </div>
      )}
    </div>
  );
}; 