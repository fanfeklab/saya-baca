"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { Lock, Delete, ArrowLeft, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ParentGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const settings = useStore(useAppStore, (state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [pin, setPin] = React.useState("");
  const [confirmPin, setConfirmPin] = React.useState("");
  const [isSettingUp, setIsSettingUp] = React.useState(false);
  const [error, setError] = React.useState("");
  const [attempts, setAttempts] = React.useState(0);
  const [lockoutTime, setLockoutTime] = React.useState(0);

  // Handle lockout timer
  React.useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (lockoutTime === 0 && error.includes("Dikunci")) {
        setTimeout(() => setError(""), 0);
    }
  }, [lockoutTime, error]);

  const handleNumberClick = (num: string) => {
    if (lockoutTime > 0) return;
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError("");
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (!settings) return;
    
    if (settings.parentPin === null) {
      // First time setup
      if (!isSettingUp) {
        if (pin.length === 4) {
            setConfirmPin(pin);
            setPin("");
            setIsSettingUp(true);
        }
      } else {
        if (pin === confirmPin) {
            updateSettings({ parentPin: pin });
            setIsUnlocked(true);
        } else {
            setError("PIN tidak cocok. Ulangi!");
            setPin("");
            setIsSettingUp(false);
        }
      }
    } else {
      // Standard unlock
      if (pin === settings.parentPin) {
        setIsUnlocked(true);
        setAttempts(0);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
            setLockoutTime(60);
            setError("Terlalu banyak percobaan. Dikunci 60 detik.");
        } else {
            setError(`PIN Salah! Sisa percobaan: ${3 - newAttempts}`);
        }
        setPin("");
      }
    }
  };

  // Handle PIN submission
  React.useEffect(() => {
    if (pin.length === 4) {
      // Small timeout to allow the 4th circle to fill visually
      const timer = setTimeout(() => {
        handleSubmit();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pin, settings?.parentPin, isSettingUp]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isUnlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:30px_30px]" />
      
      <div className="w-full max-w-sm space-y-8 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
         <div className="size-20 bg-accent border-4 border-black shadow-neo rounded-3xl flex items-center justify-center rotate-3 relative">
            <Lock className="size-10 text-black" />
            <ShieldCheck className="absolute -top-2 -right-2 size-8 text-white bg-primary rounded-full p-1.5 border-4 border-black" />
         </div>

         <div className="text-center space-y-2">
            <NeoText variant="title" stroke className="text-3xl uppercase italic leading-none">AREA ORANG TUA</NeoText>
            <NeoText variant="body" className="font-black uppercase tracking-widest text-[10px] opacity-60">
                {settings?.parentPin === null 
                    ? (isSettingUp ? "Konfirmasi PIN 4 Digit Anda" : "Setel PIN Keamanan 4 Digit") 
                    : "Masukkan PIN Untuk Masuk"}
            </NeoText>
         </div>

         {/* PIN Display */}
         <div className="flex gap-4">
            {[0, 1, 2, 3].map((i) => (
                <div 
                    key={i} 
                    className={cn(
                        "size-12 border-4 border-black shadow-neo-sm rounded-xl flex items-center justify-center transition-all",
                        pin.length > i ? "bg-primary" : "bg-card"
                    )}
                >
                    {pin.length > i && <div className="size-3 bg-white rounded-full" />}
                </div>
            ))}
         </div>

         {error && (
            <div className={cn(
                "px-4 py-2 border-2 border-black rounded-lg font-black text-[10px] uppercase animate-bounce",
                lockoutTime > 0 ? "bg-destructive text-white" : "bg-accent"
            )}>
                {error} {lockoutTime > 0 && `(${lockoutTime}s)`}
            </div>
         )}

         {/* Keypad */}
         <div className="grid grid-cols-3 gap-4 w-full">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="h-16 text-2xl font-black border-4 border-black shadow-neo hover:shadow-none bg-card hover:bg-muted"
                >
                    {num}
                </Button>
            ))}
            <Button
                variant="outline"
                className="h-16 border-4 border-black shadow-neo hover:shadow-none"
                onClick={() => router.push('/select-profile')}
            >
                <ArrowLeft className="size-6" />
            </Button>
            <Button
                onClick={() => handleNumberClick("0")}
                className="h-16 text-2xl font-black border-4 border-black shadow-neo hover:shadow-none bg-card"
            >
                0
            </Button>
            <Button
                variant="destructive"
                className="h-16 border-4 border-black shadow-neo hover:shadow-none"
                onClick={handleDelete}
            >
                <Delete className="size-6" />
            </Button>
         </div>
      </div>
    </div>
  );
}
