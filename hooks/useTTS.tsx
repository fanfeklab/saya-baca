'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface TTSContextType {
  speak: (text: string, onEnd?: () => void) => void;
  isSpeaking: boolean;
  stop: () => void;
}

const TTSContext = createContext<TTSContextType | undefined>(undefined);

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!synthRef.current) return;

    // Stop current speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Indonesian
    utterance.rate = 0.9; // Slightly slower for kids
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = (e) => {
      console.error('TTS Error:', e);
      setIsSpeaking(false);
    };

    synthRef.current.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <TTSContext.Provider value={{ speak, isSpeaking, stop }}>
      <div className={isSpeaking ? "pointer-events-none grayscale-[0.2]" : ""}>
        {children}
      </div>
    </TTSContext.Provider>
  );
}

export function useTTS() {
  const context = useContext(TTSContext);
  if (!context) throw new Error('useTTS must be used within TTSProvider');
  return context;
}
