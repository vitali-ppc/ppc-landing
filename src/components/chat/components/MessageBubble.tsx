import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
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
  onExport: (format: string, data: any) => void;
  setOpenExportDropdownIdx: (index: number | null) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
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
                {/* Summary + Copy для останньої AI-відповіді, якщо були дані Google Ads */}
                {isLastMessage && useAdsData && adsData && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                    <span style={{ color: '#0ea5e9', fontSize: 14, fontWeight: 500 }}>
                      Відповідь сформовано на основі ваших даних Google Ads
                    </span>
                    <button
                      onClick={onCopy}
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
                        onClick={() => setOpenExportDropdownIdx(openExportDropdownIdx === index ? null : index)}
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
                      {openExportDropdownIdx === index && (
                        <div className="export-dropdown" style={{
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
                            onClick={(e) => { e.stopPropagation(); onExport('xlsx', [["AI-відповідь"], [message.text]]); setOpenExportDropdownIdx(null); }}
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
                            Excel (XLSX)
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); onExport('csv', [["AI-відповідь"], [message.text]]); setOpenExportDropdownIdx(null); }}
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
                            onClick={(e) => { e.stopPropagation(); onExport('txt', message.text); setOpenExportDropdownIdx(null); }}
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
                          <button
                            onClick={(e) => { e.stopPropagation(); onExport('pdf', message.text); setOpenExportDropdownIdx(null); }}
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
                            PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )
            : (
              <span>{message.text}</span>
            )}
      </span>
    </div>
  );
}; 