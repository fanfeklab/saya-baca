'use client';

import React from 'react';
import { DialButton } from '@/components/atoms/DialButton';
import { Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PinPadProps {
  onComplete: (pin: string) => void;
  title?: string;
  error?: string;
}

export function PinPad({ onComplete, title = "MASUKKAN PIN", error }: PinPadProps) {
  const [pin, setPin] = React.useState<string[]>([]);

  const handleInput = (val: string) => {
    if (pin.length < 4) {
      const newPin = [...pin, val];
      setPin(newPin);
      if (newPin.length === 4) {
        onComplete(newPin.join(''));
        // Reset after a short delay if needed, or let the parent handle it
        setTimeout(() => setPin([]), 500);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="w-full max-w-sm space-y-8 p-4 bg-white rounded-3xl neo-border neo-shadow-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="font-heading text-2xl font-black text-neoblack">{title}</h2>
        <div className="flex justify-center gap-4 py-4">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ 
                scale: pin[i] ? 1.2 : 1,
                backgroundColor: pin[i] ? "#000000" : "#ffffff"
              }}
              className="w-4 h-4 rounded-full neo-border"
            />
          ))}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 font-bold text-sm uppercase italic"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <DialButton key={num} value={num} onClick={handleInput} />
        ))}
        <div className="col-start-2">
          <DialButton value={0} onClick={handleInput} />
        </div>
        <button
          onClick={handleBackspace}
          className="flex items-center justify-center neo-border neo-shadow bg-red-100 hover:bg-red-200"
        >
          <Delete size={24} className="text-red-600" />
        </button>
      </div>

      <div className="text-center">
        <button 
          onClick={() => alert("Silahkan cek email Anda untuk instruksi reset PIN (Simulasi)")}
          className="text-xs font-black text-neoblack/40 uppercase hover:text-neoblack transition-colors underline underline-offset-4"
        >
          Lupa PIN?
        </button>
      </div>
    </div>
  );
}
