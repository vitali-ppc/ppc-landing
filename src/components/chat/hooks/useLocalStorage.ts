'use client';

import { useState, useCallback } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      console.log(`useLocalStorage: Reading ${key} from localStorage:`, item ? 'present' : 'null');
      if (!item) return initialValue;
      
      // Пробуем распарсить как JSON, если не получается - возвращаем как есть
      try {
        const parsed = JSON.parse(item);
        console.log(`useLocalStorage: Parsed ${key}:`, parsed);
        return parsed;
      } catch {
        // Если не JSON, возвращаем как строку (для theme)
        console.log(`useLocalStorage: Using ${key} as string:`, item);
        return item as T;
      }
    } catch (error) {
      console.error(`useLocalStorage: Error reading ${key}:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      console.log(`useLocalStorage: Setting ${key} to:`, valueToStore);
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        // Для строк сохраняем как есть, для объектов - как JSON
        const valueToSave = typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore);
        window.localStorage.setItem(key, valueToSave);
        console.log(`useLocalStorage: Saved ${key} to localStorage:`, valueToSave);
      }
    } catch (error) {
      console.error('useLocalStorage setValue error:', error);
    }
  }, [storedValue, key]);

  return [storedValue, setValue] as const;
}; 