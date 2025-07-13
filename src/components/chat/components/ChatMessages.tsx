import React from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';

interface ChatMessagesProps {
  messages: Message[];
  typingText: string | null;
  useAdsData: boolean;
  adsData: any;
  copied: boolean;
  openExportDropdownIdx: number | null;
  onCopy: () => void;
  onExport: (format: string, data: any) => void;
  setOpenExportDropdownIdx: (index: number | null) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  typingText,
  useAdsData,
  adsData,
  copied,
  openExportDropdownIdx,
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
          onCopy={onCopy}
          onExport={onExport}
          setOpenExportDropdownIdx={setOpenExportDropdownIdx}
        />
      ))}
    </div>
  );
}; 