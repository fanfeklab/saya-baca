'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/atoms/button';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowLeft, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/profiles');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Gagal masuk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const { signInAnonymously } = await import('firebase/auth');
      await signInAnonymously(auth);
      router.push('/profiles');
    } catch (error) {
       console.error("Guest login failed:", error);
       alert("Gagal masuk sebagai tamu. Silakan coba lagi.");
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center p-4 sm:p-6 bg-[#EAE2D6] dark:bg-[#1a1b1e]">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="max-w-md w-full bg-white dark:bg-[#2A2B2E] border-[3px] border-black shadow-[8px_8px_0_0_#000] rounded-[2rem] p-8 sm:p-10 space-y-8 relative z-20"
      >
        <Button 
          variant="neo" 
          size="icon" 
          onClick={() => router.push('/')}
          className="absolute -top-4 -left-4 sm:-left-6 sm:-top-6 rounded-full w-12 h-12 bg-[#FFEB3B] hover:bg-[#FFD600] border-[3px] border-black shadow-[4px_4px_0_0_#000] z-30"
        >
          <ArrowLeft size={24} className="text-black" />
        </Button>
        
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[#00E5FF] border-[3px] border-black rounded-full flex items-center justify-center mx-auto shadow-[4px_4px_0_0_#000] transform rotate-3">
            <Shield size={36} className="text-black" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-black text-black dark:text-white uppercase drop-shadow-[2px_2px_0_#FF90E8] dark:drop-shadow-[2px_2px_0_#FF90E8]">AREA_ORANG_TUA</h1>
            <p className="font-sans text-black/70 dark:text-white/70 font-bold tracking-tight text-sm">
              Masuk untuk memantau perkembangan belajar si kecil.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 border-[3px] border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all flex items-center justify-center gap-3 py-6 rounded-xl"
          >
            <Image src="https://www.google.com/favicon.ico" alt="Google" width={24} height={24} className="w-6 h-6" unoptimized referrerPolicy="no-referrer" />
            <span className="text-base sm:text-lg font-black uppercase text-black font-heading">Login_Google</span>
          </Button>

          <div className="relative border-b-[3px] border-black border-dashed my-6 opacity-30">
             <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-white dark:bg-[#2A2B2E] px-4 font-heading text-xs font-black text-black dark:text-white uppercase">ATAU</span>
          </div>
          
          <Button 
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full bg-[#FFEB3B] hover:bg-[#FFD600] border-[3px] border-black shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all flex items-center justify-center gap-3 py-6 rounded-xl"
          >
            <span className="text-base sm:text-lg font-black uppercase text-black font-heading">Test_Sbg_Tamu</span>
          </Button>

          <p className="text-center text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest leading-none mt-6">
            Data_Aman_Terkendali_
          </p>
        </div>
      </motion.div>
    </div>
  );
}
