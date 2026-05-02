import { useState, useEffect } from "react";
import { parse, stringify } from "flatted";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      // Try to parse with flatted first, fallback to JSON for legacy data
      try {
        return parse(item);
      } catch {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error("useLocalStorage initialization error:", error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validation: Block common circular/internal objects
      if (valueToStore && typeof valueToStore === 'object') {
        // block React events or HTML elements which cause massive circular chains
        if ('nativeEvent' in valueToStore || 'target' in valueToStore || 'view' in valueToStore) {
          console.warn(`[useLocalStorage] Blocked saving complex object to key: "${key}". Use primitive values or clean objects instead.`);
          return;
        }
      }

      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        try {
          // Use flatted.stringify to safely handle circular structures if any
          window.localStorage.setItem(key, stringify(valueToStore));
        } catch (e) {
          console.error(`[useLocalStorage] Critical failure saving key: "${key}":`, e);
        }
      }
    } catch (error) {
      console.error("useLocalStorage setter error:", error);
    }
  };

  return [storedValue, setValue] as const;
}
