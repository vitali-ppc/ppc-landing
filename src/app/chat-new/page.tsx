'use client';

import { useChat } from 'ai/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ChatNewPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat-ai',
  });

  return (
    <>
      <Header />
      <main style={{ 
        minHeight: 'calc(100vh - 200px)', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '20px'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: '600', 
              margin: '0 0 8px 0' 
            }}>
              AI Chat Assistant
            </h1>
            <p style={{ 
              fontSize: '16px', 
              opacity: '0.9', 
              margin: '0' 
            }}>
              Powered by Vercel AI SDK
            </p>
          </div>

          {/* Messages */}
          <div style={{
            height: '500px',
            overflowY: 'auto',
            padding: '20px'
          }}>
            {messages.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: '#64748b',
                fontSize: '16px',
                padding: '40px 20px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '600', color: '#667eea', marginBottom: '16px' }}>
                  Ready to chat with AI?
                </div>
                <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  Ask me anything about Google Ads optimization, campaign analysis, or strategy development.
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px',
                  alignItems: 'flex-start'
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: message.role === 'user' ? '#23272f' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px',
                  flexShrink: 0
                }}>
                  {message.role === 'user' ? 'U' : 'AI'}
                </div>

                {/* Message content */}
                <div style={{
                  flex: 1,
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  AI
                </div>
                <div style={{
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  minWidth: '200px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#667eea',
                      animation: 'pulse 1.4s ease-in-out infinite both'
                    }} />
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#667eea',
                      animation: 'pulse 1.4s ease-in-out infinite both 0.2s'
                    }} />
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#667eea',
                      animation: 'pulse 1.4s ease-in-out infinite both 0.4s'
                    }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  padding: '12px 24px',
                  background: isLoading || !input.trim() ? '#d1d5db' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
} 