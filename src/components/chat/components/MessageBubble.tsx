import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, ExportFormat } from '../types';
import { AI_AVATAR, USER_AVATAR } from './Avatars';

interface MessageBubbleProps {
  message: Message;
  index: number;
  isLastMessage: boolean;
  typingText: string | null;
  useAdsData: boolean;
  adsData: any;
  copied: boolean;
  openExportDropdownIdx: number | null;
  onCopy: () => void;
  onExport: (format: ExportFormat, data: any) => void;
  setOpenExportDropdownIdx: (index: number | null) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({
  message,
  index,
  isLastMessage,
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
      display: 'flex',
      flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      gap: 16,
      margin: '18px 0',
      opacity: 0.98,
      animation: 'fadeIn 0.5s',
    }}>
      <div style={{ flexShrink: 0 }}>
        {message.role === 'user' ? USER_AVATAR : AI_AVATAR}
      </div>
      <span style={{
        display: 'inline-block',
        background: message.role === 'user' ? '#fff' : '#e6f7ff',
        color: '#23272f',
        borderRadius: 12,
        padding: '10px 18px',
        maxWidth: 600,
        wordBreak: 'break-word',
        fontSize: 15,
        lineHeight: 1.4,
        boxShadow: message.role === 'user' ? '0 2px 8px rgba(30, 144, 255, 0.04)' : '0 2px 8px rgba(0,0,0,0.03)',
        border: message.role === 'user' ? '1.5px solid #e2e8f0' : '1.5px solid #e6f7ff',
        transition: 'background 0.2s',
        position: 'relative',
      }}>
        {message.role === 'ai' && isLastMessage && typingText !== null
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
          : message.role === 'ai'
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
                  {message.text}
                </ReactMarkdown>
                {/* Summary + Copy для AI-відповіді */}
                {message.role === 'ai' && useAdsData && adsData && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                    <span style={{ color: '#0ea5e9', fontSize: 14, fontWeight: 500 }}>
                      Відповідь сформовано на основі ваших даних Google Ads
                    </span>
                  </div>
                )}
              </>
            )
            : (
              <span>{message.text}</span>
            )}
      </span>
      {/* Маленькі іконки копіювання та експорту для AI повідомлень */}
      {message.role === 'ai' && (
        // Показуємо кнопки тільки якщо це не останнє AI-повідомлення з typingText, або якщо typingText === null
        (typingText === null) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
            {/* Мінімалістична кнопка копіювання */}
            <button
              onClick={onCopy}
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
              title="Copy"
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
                  setOpenExportDropdownIdx(openExportDropdownIdx === index ? null : index);
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
                title="Download"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#23272f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v12"/>
                  <path d="M6 13l6 6 6-6"/>
                  <rect x="4" y="19" width="16" height="2" rx="1" fill="#23272f" stroke="none"/>
                </svg>
              </button>
              {openExportDropdownIdx === index && (
                <div className="export-dropdown" style={{
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
                    onClick={(e) => { e.stopPropagation(); onExport('pdf', message.text); setOpenExportDropdownIdx(null); }}
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
                    PDF
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onExport('xlsx', [["AI-відповідь", message.text]]); setOpenExportDropdownIdx(null); }}
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
                    Excel
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onExport('csv', [["AI-відповідь", message.text]]); setOpenExportDropdownIdx(null); }}
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
                    onClick={(e) => { e.stopPropagation(); onExport('txt', message.text); setOpenExportDropdownIdx(null); }}
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
  );
}); 