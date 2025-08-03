'use client';

import React from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: () => void;
  onLogIn: () => void;
  pendingMessage?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onLogIn,
  pendingMessage
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937'
        }}>
          Sign up to start chatting with AI
        </h3>
        
        {pendingMessage && (
          <p style={{
            margin: '0 0 24px 0',
            fontSize: '14px',
            color: '#6b7280',
            fontStyle: 'italic'
          }}>
            Your message: "{pendingMessage}"
          </p>
        )}
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={onSignUp}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Sign Up
          </button>
          
          <button
            onClick={onLogIn}
            style={{
              width: '100%',
              padding: '12px 20px',
              background: 'white',
              color: '#374151',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            Log In
          </button>
          
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '8px 16px',
              background: 'transparent',
              color: '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 