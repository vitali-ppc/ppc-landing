'use client';

import { useState, useCallback } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      // Пробуем распарсить как JSON, если не получается - возвращаем как есть
      try {
        return JSON.parse(item);
      } catch {
        // Если не JSON, возвращаем как строку (для theme)
        return item as T;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        // Для строк сохраняем как есть, для объектов - как JSON
        const valueToSave = typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore);
        window.localStorage.setItem(key, valueToSave);
      }
    } catch (error) {
      console.error(error);
    }
  }, [storedValue, key]);

  return [storedValue, setValue] as const;
}; 