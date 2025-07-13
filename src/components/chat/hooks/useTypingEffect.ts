'use client';

import { useState, useRef, useCallback } from 'react';

export const useTypingEffect = () => {
  const [typingText, setTypingText] = useState<string | null>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const typingIndex = useRef(0);
  const typingInterrupted = useRef(false);

  const startTypingEffect = useCallback((fullText: string) => {
    typingInterrupted.current = false;
    typingIndex.current = 0;
    setTypingText('');
    
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    
    const type = () => {
      if (typingInterrupted.current) {
        setTypingText(null);
        return;
      }
      
      const currentText = fullText.slice(0, typingIndex.current + 1);
      setTypingText(currentText);
      
      if (typingIndex.current < fullText.length - 1) {
        typingIndex.current++;
        typingTimeout.current = setTimeout(type, 12 + Math.random() * 30);
      } else {
        setTypingText(null);
      }
    };
    
    type();
  }, []);

  const stopTypingEffect = useCallback(() => {
    typingInterrupted.current = true;
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    setTypingText(null);
  }, []);

  return {
    typingText,
    startTypingEffect,
    stopTypingEffect,
  };
}; 