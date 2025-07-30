import React, { useRef } from 'react';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  loading: boolean;
  placeholder: string;
  selectedImage: File | null;
  imagePreview: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = React.memo(({
  input,
  setInput,
  loading,
  placeholder,
  selectedImage,
  imagePreview,
  onImageUpload,
  onRemoveImage,
  onSubmit,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form onSubmit={onSubmit} style={{
      display: 'flex',
      gap: 16,
      padding: '18px 24px 32px 24px',
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
                (e.target as HTMLTextAreaElement).form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }
          }}
          placeholder={placeholder}
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
            border: '1.2px solid #e2e8f0',
            fontSize: 15,
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            lineHeight: 1.3,
            background: '#f9fafc',
            color: '#1e293b',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.01)',
            transition: 'height 0.2s',
            boxSizing: 'border-box',
          }}
          autoFocus
        />
        
        {/* Camera icon for image upload */}
        <div style={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          opacity: 0.6,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
        >
          <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div style={{
          position: 'relative',
          marginBottom: 8,
        }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              borderRadius: 8,
              border: '2px solid #e2e8f0',
            }}
          />
          <button
            type="button"
            onClick={onRemoveImage}
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 20,
              height: 20,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Send button */}
      <button
        type="submit"
        disabled={loading || !input.trim()}
        style={{
          background: loading || !input.trim() ? '#e2e8f0' : '#0ea5e9',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 500,
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          minWidth: 80,
          justifyContent: 'center',
        }}
        onMouseEnter={e => {
          if (!loading && input.trim()) {
            e.currentTarget.style.background = '#0284c7';
          }
        }}
        onMouseLeave={e => {
          if (!loading && input.trim()) {
            e.currentTarget.style.background = '#0ea5e9';
          }
        }}
      >
        {loading ? (
          <>
            <div style={{
              width: 16,
              height: 16,
              border: '2px solid #fff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            Sending...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send
          </>
        )}
      </button>
    </form>
  );
}); 