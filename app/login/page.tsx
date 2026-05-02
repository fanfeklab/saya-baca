'use client';

import { motion } from 'framer-motion';
import { useTTS } from '@/hooks/useTTS';
import { signInWithGoogle, signInAsGuest } from '@/lib/auth';
import { UserCircle, BookOpen, Chrome } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/atoms/button';

export default function LoginPage() {
  const { speak } = useTTS();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center space-y-12 max-w-md mx-auto">
      <div className="space-y-4">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-yellow-400 rounded-[2rem] neo-border neo-shadow mx-auto flex items-center justify-center"
        >
          <BookOpen size={48} className="text-neoblack" />
        </motion.div>
        <h1 className="font-heading text-5xl font-black text-neoblack leading-none uppercase tracking-tighter">SAYA<br/>BACA</h1>
        <p className="font-sans font-bold text-neoblack/60 uppercase text-[10px] tracking-widest italic leading-none">Belajar itu Menyenangkan!</p>
      </div>

      <div className="w-full space-y-6">
        <Button 
          variant="outline"
          size="lg"
          onClick={() => signInWithGoogle()}
          className="w-full h-16 sm:h-20 gap-4"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full neo-border flex items-center justify-center bg-white shrink-0">
            <Chrome size={20} className="text-blue-600 sm:size-6" />
          </div>
          <span className="font-heading text-base sm:text-lg">MASUK DENGAN GOOGLE</span>
        </Button>
        
        <Button 
          variant="default"
          size="lg"
          onClick={() => signInAsGuest()}
          className="w-full h-16 sm:h-20 gap-4 bg-yellow-400"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full neo-border flex items-center justify-center bg-white/20 shrink-0">
            <UserCircle size={24} className="sm:size-7" />
          </div>
          <span className="font-heading text-base sm:text-lg">COBA SEBAGAI TAMU</span>
        </Button>
      </div>
      
      <p className="text-[10px] font-bold text-neoblack/40 max-w-xs uppercase">
        Dengan masuk, Anda menyetujui Ketentuan Layanan kami. Akun tamu akan menghapus progres jika cache browser dibersihkan.
      </p>
    </main>
  );
}
