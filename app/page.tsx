'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { NeoText } from '@/components/atoms/neo-text';
import { Button } from '@/components/ui/button';
import { Rocket, Sparkles, ArrowRight } from 'lucide-react';

export default function LandingSplashScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "SELAMAT DATANG",
      description: "Petualangan belajar membaca yang seru dan menyenangkan menantimu!",
      icon: <Sparkles className="size-20 text-yellow-400 group-hover:scale-125 transition-transform duration-500" />,
      color: "bg-primary"
    },
    {
      title: "BELAJAR SERU",
      description: "Ratusan aktivitas interaktif untuk membantu jagoan kecilmu.",
      icon: <Rocket className="size-20 text-white group-hover:rotate-12 transition-transform duration-500" />,
      color: "bg-accent"
    },
    {
      title: "SIAP BERMAIN?",
      description: "Mari mulai petualangan hebat hari ini bersama Saya Baca!",
      icon: <div className="text-8xl group-hover:scale-110 transition-transform">📚</div>,
      color: "bg-secondary"
    }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className={`size-48 ${steps[step].color} rounded-[40px] border-4 border-black shadow-neo flex items-center justify-center p-6 group transition-all duration-500`}>
              {steps[step].icon}
            </div>
            
            <div className="space-y-4">
              <NeoText variant="title" stroke className="text-4xl text-foreground italic">
                {steps[step].title}
              </NeoText>
              <NeoText variant="body" className="text-muted-foreground font-medium text-lg leading-relaxed">
                {steps[step].description}
              </NeoText>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm space-y-6 pb-12">
        {/* Step Indicators */}
        <div className="flex justify-center gap-3">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-3 rounded-full border-2 border-black transition-all duration-300 ${
                step === i ? "w-10 bg-primary" : "w-3 bg-muted"
              }`}
            />
          ))}
        </div>

        <Button 
          variant="default" 
          onClick={nextStep}
          className="w-full h-16 text-2xl font-black uppercase tracking-widest border-4 border-black shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-black"
        >
          {step === steps.length - 1 ? "Mulai Sekarang" : "Lanjut"} 
          <ArrowRight className="ml-2 size-6" />
        </Button>
      </div>
    </div>
  );
}
