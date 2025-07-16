'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypewriterText from './TypewriterText';

const liveScenarios = [
  {
    user: "Can you analyze my recent campaign performance?",
    ai: "I've analyzed your Q4 data. Your ROAS dropped 23% due to iOS 14.5 changes. I recommend shifting 40% budget to Demand Gen campaigns and testing new creative angles..."
  },
  {
    user: "Create a campaign for my dental practice in Miami", 
    ai: "Perfect! I'll create a local dental campaign. Targeting 25-45 age group within 10 miles, focusing on 'teeth whitening Miami' and 'emergency dentist near me'..."
  },
  {
    user: "Why is my CPC so high?",
    ai: "Your average CPC is $4.50, which is 89% above industry average. Main issues: broad match keywords competing with your own brand terms, and Quality Score of 4/10..."
  }
];

export default function LiveAIChat() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentScenario((prev) => (prev + 1) % liveScenarios.length);
      setIsTyping(true);
      setShowThinking(true);
      
      // Hide thinking after 2 seconds
      setTimeout(() => {
        setShowThinking(false);
      }, 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, [isClient]);

  const currentData = liveScenarios[currentScenario];

  // На сервере показываем статичный контент
  if (!isClient) {
    return (
      <div style={{
        width: '550px',
        height: '400px',
        background: '#fafafa',
        borderRadius: '12px',
        border: '1px solid #e5e5e5',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        display: 'flex'
      }}>
        {/* Статичный контент для SSR */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fafafa',
          padding: '24px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '16px',
            color: '#666',
            textAlign: 'center'
          }}>
            AI Chat Interface
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '550px',
      height: '400px',
      background: '#fafafa',
      borderRadius: '12px',
      border: '1px solid #e5e5e5',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      display: 'flex'
    }}>
      {/* Left Sidebar */}
      <div style={{
        width: '200px',
        background: '#f5f5f5',
        borderRight: '1px solid #e5e5e5',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 20px 20px 20px',
          borderBottom: '1px solid #e5e5e5',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <motion.div 
              style={{
                width: '24px',
                height: '24px',
                background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}>K</span>
            </motion.div>
            <span style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '16px' }}>Kampaio</span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <motion.div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#1a1a1a',
              fontSize: '14px'
            }}
            whileHover={{ backgroundColor: 'rgba(0,255,231,0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New chat
          </motion.div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#666',
            fontSize: '14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Chats
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            color: '#666',
            fontSize: '14px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Analytics
          </div>
        </div>

        {/* Recent Chats */}
        <div style={{
          marginTop: '20px',
          padding: '0 20px',
          flex: 1,
          overflow: 'hidden'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#666',
            fontWeight: '500',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Recent
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            maxHeight: '200px',
            overflow: 'auto'
          }}>
            {['Campaign Analysis', 'ROI Optimization', 'Keyword Research', 'Budget Planning', 'Performance Review'].map((chat, index) => (
              <motion.div 
                key={index} 
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#666',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                whileHover={{ backgroundColor: 'rgba(0,255,231,0.1)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {chat}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#fafafa'
      }}>
        {/* Top Bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <motion.div 
              style={{
                width: '8px',
                height: '8px',
                background: '#00ffe7',
                borderRadius: '50%'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span style={{ color: '#1a1a1a', fontWeight: '500', fontSize: '14px' }}>Welcome, user</span>
          </div>
          <div style={{
            padding: '4px 12px',
            background: '#f0f0f0',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#666'
          }}>
            Free plan
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflow: 'auto'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenario}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* User Message */}
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                justifyContent: 'flex-end'
              }}>
                <div style={{
                  background: '#f5f5f5',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  lineHeight: '1.5',
                  maxWidth: '80%',
                  border: '1px solid #e5e5e5'
                }}>
                  <TypewriterText 
                    text={currentData.user}
                    speed={30}
                    delay={500}
                  />
                </div>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: '#f0f0f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>U</span>
                </div>
              </div>

              {/* AI Thinking */}
              {showThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}>K</span>
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.5',
                    maxWidth: '80%'
                  }}>
                    AI is thinking
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ...
                    </motion.span>
                  </div>
                </motion.div>
              )}

              {/* AI Response */}
              {!showThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}>K</span>
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    fontSize: '14px',
                    color: '#1a1a1a',
                    lineHeight: '1.5',
                    maxWidth: '80%'
                  }}>
                    <TypewriterText 
                      text={currentData.ai}
                      speed={20}
                      delay={showThinking ? 2000 : 0}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #e5e5e5',
          background: 'white'
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            background: '#f5f5f5',
            borderRadius: '8px',
            padding: '8px 12px',
            border: '1px solid #e5e5e5',
            height: '40px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              gap: '8px'
            }}>
              <div style={{
                width: '16px',
                height: '16px',
                background: '#f0f0f0',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <div style={{
                width: '16px',
                height: '16px',
                background: '#f0f0f0',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
            <div style={{
              flex: 1,
              fontSize: '13px',
              color: '#666'
            }}>
              How can I help you today?
            </div>

            <motion.div 
              style={{
                width: '28px',
                height: '28px',
                background: '#1a1a1a',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 