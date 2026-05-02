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
  Trophy,
  Star,
  Gamepad2
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

  const ctaLabel = user ? "LANJUT_BELAJAR" : "MULAI_SEKARANG";
  const ctaAction = user ? () => router.push('/profiles') : handleParentStart;

  return (
    <div className="min-h-screen relative z-10 selection:bg-yellow-200 overflow-x-hidden bg-[#EAE2D6] dark:bg-[#1a1b1e]">
      {/* Background Grid Pattern for Brutalist Vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Navigation Splash */}
      <nav className="p-4 sm:p-6 flex justify-between items-center max-w-7xl mx-auto relative z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFEB3B] rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
            <BookOpen size={24} className="text-black md:w-7 md:h-7" />
          </div>
          <span className="font-heading text-2xl md:text-3xl font-black tracking-tight text-black dark:text-white uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.1)] dark:drop-shadow-none">
            SAYA_BACA
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-16 pb-24 grid lg:grid-cols-12 gap-8 md:gap-16 items-center relative z-20">
        
        {/* Left Content */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 bg-[#FF90E8] border-[3px] border-black px-4 py-1.5 rounded-full mb-6 sm:mb-8 text-[11px] md:text-sm font-black uppercase tracking-widest text-black shadow-[4px_4px_0_0_#000] rotate-2 hover:rotate-0 transition-transform cursor-default">
              <Sparkles size={16} className="fill-black" /> 
              PILIHAN_CERDAS_ORANG_TUA
            </div>
            
            <h1 className="font-heading flex flex-col text-[4rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] font-black text-black dark:text-white leading-[0.85] mb-6 sm:mb-8 break-words break-all sm:break-normal">
              <span className="block drop-shadow-[4px_4px_0_#FF90E8] dark:drop-shadow-[4px_4px_0_#FF90E8] transition-all hover:-translate-y-1">BELAJAR_</span>
              <span className="block text-[#FFEB3B] drop-shadow-[4px_4px_0_#000000] transition-all hover:translate-x-2">MEMBACA_</span>
              <span className="block drop-shadow-[4px_4px_0_#00E5FF] dark:drop-shadow-[4px_4px_0_#00E5FF] transition-all hover:-translate-y-1">LEBIH_SERU!</span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-black/80 dark:text-white/80 font-bold max-w-xl mx-auto lg:mx-0 leading-relaxed bg-white/50 dark:bg-black/50 p-4 rounded-2xl border-2 border-black/10 dark:border-white/10 backdrop-blur-sm">
              Metode interaktif berbasis suku kata untuk anak PAUD & TK. Petualangan visual ceria yang dijamin tidak membosankan!
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-full mt-8 flex flex-col gap-6 items-center lg:items-start"
          >
            {/* Terms Checkbox */}
            {!user && (
              <label className="flex items-start gap-4 cursor-pointer group text-left bg-white dark:bg-[#2A2B2E] p-4 border-[3px] border-black rounded-2xl shadow-[4px_4px_0_#000] hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full max-w-md">
                <div className="relative mt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-6 h-6 border-[3px] border-black rounded bg-white peer-checked:bg-[#00E5FF] transition-colors flex items-center justify-center">
                     <CheckCircle2 
                      size={20} 
                      className="text-black opacity-0 peer-checked:opacity-100 transition-opacity" 
                     />
                  </div>
                </div>
                <span className="font-sans text-sm md:text-base font-bold text-black dark:text-white leading-tight cursor-pointer">
                  Saya setuju dengan <span className="underline decoration-[#FFEB3B] decoration-4 underline-offset-4 hover:bg-[#FFEB3B] hover:text-black transition-colors">Syarat & Ketentuan</span>
                </span>
              </label>
            )}

            <Button 
              onClick={ctaAction}
              disabled={!user && !agreed}
              className={`relative overflow-hidden w-full max-w-md h-auto py-5 md:py-6 text-xl md:text-2xl font-black font-heading rounded-2xl border-[3px] border-black shadow-[6px_6px_0_#000] active:shadow-none active:translate-y-[6px] active:translate-x-[6px] transition-all
              ${user ? 'bg-[#00E5FF] hover:bg-[#00B8D9] text-black' : 'bg-[#FFEB3B] hover:bg-[#FFD600] text-black'} 
              ${(!user && !agreed) ? 'opacity-50 cursor-not-allowed grayscale shadow-none translate-y-[6px] translate-x-[6px]' : ''}`}
            >
              <div className="flex items-center justify-center gap-3 w-full">
                {ctaLabel}
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Button>
          </motion.div>
        </div>

        {/* Right Content - Bento Grid */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="grid grid-cols-2 gap-4 md:gap-5 max-w-md mx-auto w-full"
          >
            {/* Bento Card 1 */}
            <div className="col-span-2 bg-[#FF90E8] p-6 lg:p-8 rounded-[2rem] border-[3px] border-black shadow-[6px_6px_0_#000] flex flex-col justify-between aspect-[2/1] relative overflow-hidden group hover:shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="flex justify-between items-start">
                <h3 className="font-heading text-2xl lg:text-3xl font-black text-black leading-tight">VOKAL &<br/>ABJAD_</h3>
                <span className="bg-black text-white text-xs font-black px-3 py-1 rounded-full uppercase">Dasar</span>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-30 group-hover:opacity-50 transition-opacity">
                 <BookOpen size={120} className="text-black" />
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="col-span-1 bg-white dark:bg-[#1A1A1A] p-5 lg:p-6 rounded-[2rem] border-[3px] border-black shadow-[6px_6px_0_#000] flex flex-col items-center justify-center aspect-square hover:shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <div className="text-5xl lg:text-6xl font-black text-[#FFEB3B] font-heading drop-shadow-[3px_3px_0_#000] dark:drop-shadow-[3px_3px_0_#FFF]">BA</div>
              <div className="text-2xl lg:text-3xl font-black text-black dark:text-white font-heading mt-2">CA_</div>
            </div>

            {/* Bento Card 3 */}
            <div className="col-span-1 bg-[#00E5FF] p-5 lg:p-6 rounded-[2rem] border-[3px] border-black shadow-[6px_6px_0_#000] flex flex-col justify-between aspect-square hover:shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
              <ShieldCheck size={36} className="text-black group-hover:scale-110 transition-transform" />
              <p className="font-heading text-lg lg:text-xl font-black text-black leading-none uppercase">Aman<br/>Bagi<br/>Anak_</p>
            </div>

            {/* Bento Card 4 */}
            <div className="col-span-2 bg-[#FFEB3B] p-6 lg:p-8 rounded-[2rem] border-[3px] border-black shadow-[6px_6px_0_#000] flex flex-col justify-between aspect-[2/1] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] hover:shadow-[4px_4px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
              <div className="flex items-center gap-3">
                 <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                    <Trophy size={20} className="text-[#FFEB3B]" />
                 </div>
                 <h3 className="font-heading text-xl lg:text-2xl font-black text-black leading-none uppercase">GAMIFIKASI_</h3>
              </div>
              <div className="flex justify-end mt-4">
                 <span className="font-sans font-bold text-black border-2 border-black px-4 py-2 rounded-full bg-white text-sm whitespace-nowrap">Dapat Koin & Exp!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer / Trust badges */}
      <footer className="border-t-[4px] border-black bg-white dark:bg-[#111111] py-8 md:py-12 px-6 transition-colors duration-300 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FFEB3B] rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center">
              <BookOpen size={20} className="text-black" />
            </div>
            <div className="flex flex-col">
               <p className="font-heading font-black text-black dark:text-white text-xl uppercase tracking-tight leading-none">SAYA_BACA</p>
               <p className="font-sans font-bold text-black/50 dark:text-white/50 text-xs">© 2026 PT. BACA INTERAKTIF</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-sans text-[11px] font-black text-black/60 dark:text-white/60 uppercase tracking-widest">
            <button className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 decoration-[3px] decoration-[#FF90E8] transition-all">Syarat_Ketentuan</button>
            <button className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 decoration-[3px] decoration-[#00E5FF] transition-all">Privasi_</button>
            <button onClick={handleAdminAccess} className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 decoration-[3px] decoration-[#FFEB3B] transition-all cursor-pointer">Admin_Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

