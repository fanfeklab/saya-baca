'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

export default function LandingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [agreed, setAgreed] = useState(false);

  const handleParentStart = () => {
    if (!agreed) {
      alert("Harap setujui Syarat & Ketentuan untuk melanjutkan.");
      return;
    }
    router.push('/login');
  };

  const handleAdminAccess = () => {
    router.push('/admin/login');
  };

  // If already logged in, show a different CTA
  const ctaLabel = user ? "LANJUTKAN BELAJAR" : "MULAI SEKARANG";
  const ctaAction = user ? () => router.push('/main/home') : handleParentStart;

  return (
    <div className="min-h-screen relative z-10 selection:bg-yellow-200 overflow-x-hidden transition-colors duration-300">
      {/* Navigation Splash */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-xl neo-border neo-shadow flex items-center justify-center">
            <BookOpen size={24} className="text-foreground md:w-7 md:h-7" />
          </div>
          <span className="font-heading text-xl md:text-2xl font-black tracking-tight text-foreground">SAYA BACA</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            onClick={handleAdminAccess}
            className="font-bold text-foreground/60  hover:text-foreground  hover:bg-yellow-100  rounded-xl px-3"
          >
            <Lock size={16} className="md:mr-2" /> 
            <span className="hidden md:inline">ADMIN</span>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-8 md:pt-12 pb-24 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-200  border-2 border-foreground  px-4 py-1.5 rounded-full mb-6 text-[10px] md:text-xs font-black uppercase tracking-wider text-foreground ">
              <Sparkles size={14} /> 
              Pilihan Cerdas Orang Tua
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground  leading-[0.95] md:leading-[0.9] mb-6">
              BELAJAR <br />
              <span className="text-yellow-500">MEMBACA</span> <br />
              LEBIH SERU!
            </h1>
            <p className="font-sans text-lg md:text-xl text-foreground/70  font-bold max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Metode interaktif berbasis suku kata untuk membantu anak PAUD & TK membaca dengan lancar melalui petualangan visual yang ceria.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6 items-center lg:items-start"
          >
            {/* Terms Checkbox */}
            {!user && (
              <label className="flex items-start gap-3 cursor-pointer group max-w-sm text-left">
                <div className="relative mt-1 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-foreground  rounded bg-card peer-checked:bg-yellow-400 transition-colors" />
                  <CheckCircle2 
                    size={16} 
                    className="absolute top-0.5 left-0.5 text-foreground opacity-0 peer-checked:opacity-100 transition-opacity" 
                  />
                </div>
                <span className="font-sans text-[10px] md:text-xs font-bold text-foreground/60  leading-tight">
                  Saya menyetujui <span className="text-foreground  underline decoration-yellow-400 underline-offset-2">Syarat & Ketentuan</span> dan <span className="text-foreground  underline decoration-yellow-400 underline-offset-2">Kebijakan Privasi</span> Saya Baca.
                </span>
              </label>
            )}

            <Button 
              onClick={ctaAction}
              disabled={!user && !agreed}
              variant="neo"
              className={`w-full sm:w-fit px-8 md:px-12 py-6 md:py-8 text-xl md:text-2xl bg-yellow-400 hover:bg-yellow-500 group transition-all  ${(!user && !agreed) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            >
              {user ? <UserCircle size={28} className="mr-2 md:mr-3" /> : <BookOpen size={28} className="mr-2 md:mr-3" />}
              {ctaLabel}
              <ArrowRight size={24} className="ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Feature Bento Grid Style visual */}
        <div className="relative mt-8 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto"
          >
            <div className="bg-blue-400 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] neo-border neo-shadow flex flex-col justify-end aspect-square">
              <h3 className="font-heading text-xl md:text-3xl font-black text-background leading-none">VOKAL & ABJAD</h3>
            </div>
            <div className="bg-card p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] neo-border neo-shadow flex flex-col justify-center items-center aspect-square mt-8 md:mt-12">
              <div className="text-4xl md:text-6xl font-black text-yellow-400 font-heading">BA-CA</div>
            </div>
            <div className="bg-yellow-400 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] neo-border neo-shadow flex flex-col justify-start aspect-square -mt-6 md:-mt-8">
              <ShieldCheck size={36} className="text-foreground mb-2 md:mb-4 md:w-12 md:h-12" />
              <p className="font-heading text-lg md:text-xl font-black text-foreground leading-tight">DIPANTAU ORANG TUA</p>
            </div>
            <div className="bg-green-400 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] neo-border neo-shadow flex flex-col justify-end aspect-square">
              <h3 className="font-heading text-xl md:text-3xl font-black text-white leading-none">QUIZ HADIAH</h3>
            </div>
          </motion.div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -top-12 -right-12 w-24 h-24 bg-red-400 rounded-full neo-border -z-10" />
          <div className="hidden md:block absolute -bottom-10 -left-10 w-32 h-32 border-8 border-yellow-400 rounded-full opacity-20 -z-10" />
        </div>
      </main>

      {/* Footer / Trust badges */}
      <footer className="border-t-4 border-foreground  bg-card py-12 px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg neo-border flex items-center justify-center">
              <BookOpen size={16} className="text-foreground" />
            </div>
            <p className="font-heading font-black text-foreground  uppercase tracking-tight">SAYA BACA © 2026</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-sans text-[10px] font-black text-foreground/40  uppercase tracking-widest">
            <a href="#" className="hover:text-foreground  transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-foreground  transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-foreground  transition-colors">Kontak Kami</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
