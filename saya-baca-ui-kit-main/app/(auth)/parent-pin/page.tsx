'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NeoText } from '@/components/atoms/neo-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Delete, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const PIN_LENGTH = 4;
const CORRECT_PIN = '1234'; // Mock PIN for demo purposes

export default function ParentPinPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleKeyPress = (num: string) => {
    if (pin.length < PIN_LENGTH && !success) {
      const newPin = [...pin, num];
      setPin(newPin);
      setError(false);

      if (newPin.length === PIN_LENGTH) {
        if (newPin.join('') === CORRECT_PIN) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/parent-dashboard'); // Target redirect
          }, 1000);
        } else {
          setError(true);
          // Play error animation and reset
          setTimeout(() => {
            setPin([]);
          }, 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8 bg-background relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-10 left-10 size-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 size-32 bg-accent/10 rounded-full blur-3xl" />

      <div className="text-center space-y-4 max-w-sm z-10">
        <div className="size-20 bg-background border-4 border-black shadow-neo-sm rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
          <ShieldAlert className="size-10 text-primary" />
        </div>
        <NeoText variant="title" stroke className="text-3xl leading-none italic uppercase">Area Orang Tua</NeoText>
        <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">
          Masukkan PIN untuk Verifikasi Keamanan
        </NeoText>
      </div>

      <div className="w-full max-w-xs space-y-8 z-10">
        {/* PIN Dots */}
        <div className="flex justify-center gap-4">
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <motion.div
              key={i}
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={cn(
                "size-6 rounded-full border-4 transition-all duration-200",
                pin.length > i 
                  ? success ? "bg-green-500 border-black" : "bg-primary border-black scale-110" 
                  : "bg-muted border-muted-foreground/20"
              )}
            />
          ))}
        </div>

        {/* Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <NeoText variant="body" className="text-destructive font-black uppercase text-xs">PIN Salah! Coba Lagi</NeoText>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center flex flex-col items-center gap-1"
            >
              <CheckCircle2 className="size-6 text-green-500" />
              <NeoText variant="body" className="text-green-500 font-black uppercase text-xs">Berhasil Diverifikasi</NeoText>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleKeyPress(num.toString())}
              disabled={success}
              className="h-20 text-3xl font-black border-4 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all rounded-2xl bg-card"
            >
              {num}
            </Button>
          ))}
          <Button
            variant="ghost"
            onClick={() => router.push('/select-profile')}
            disabled={success}
            className="h-20 flex items-center justify-center hover:bg-transparent"
          >
            <X className="size-8" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleKeyPress('0')}
            disabled={success}
            className="h-20 text-3xl font-black border-4 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all rounded-2xl bg-card"
          >
            0
          </Button>
          <Button
            variant="ghost"
            onClick={handleBackspace}
            disabled={success || pin.length === 0}
            className="h-20 flex items-center justify-center hover:bg-transparent"
          >
            <Delete className="size-8" />
          </Button>
        </div>
      </div>

      <div className="z-10">
        <Button variant="link" className="text-muted-foreground font-black uppercase text-[10px] tracking-widest hover:text-primary">
          Lupa PIN Anda?
        </Button>
      </div>
    </div>
  );
}
