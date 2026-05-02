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
      router.push('/main/home');
    } catch (error) {
      console.error("Login failed:", error);
      alert("Gagal masuk. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // For guest access without saving to DB immediately
    // Or we could implement Firebase Anonymous Auth if requested.
    // Assuming just navigating to home for limited access or offline.
    router.push('/main/home');
  };

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center p-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card neo-border neo-shadow-lg rounded-[2.5rem] p-10 space-y-8"
      >
        <div className="text-center space-y-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/')}
            className="rounded-full absolute top-8 left-8"
          >
            <ArrowLeft size={18} />
          </Button>
          
          <div className="w-20 h-20 bg-blue-100 border-4 border-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Shield size={40} className="text-blue-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-black text-foreground uppercase">AREA ORANG TUA</h1>
            <p className="font-sans text-foreground/60 font-bold tracking-tight">
              Masuk untuk menyimpan profil dan perkembangan progress belajar anak.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="neo"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-card flex items-center justify-center gap-3 py-6 hover:bg-muted"
          >
            <Image src="https://www.google.com/favicon.ico" alt="Google" width={24} height={24} className="w-6 h-6" unoptimized referrerPolicy="no-referrer" />
            <span className="text-base sm:text-lg font-black uppercase text-foreground">Masuk Google</span>
          </Button>

          <div className="relative border-b-2 border-foreground/10 my-6">
             <span className="absolute left-1/2 -top-3 -translate-x-1/2 bg-card px-2 text-xs font-black text-foreground/40 uppercase">Atau</span>
          </div>
          
          <Button 
            variant="neo"
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full bg-muted flex items-center justify-center gap-3 py-6 hover:bg-muted/80"
          >
            <span className="text-base sm:text-lg font-black uppercase text-foreground">Masuk Sebagai Tamu</span>
          </Button>

          <p className="text-center text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none mt-4">
            Keamanan data Anda adalah prioritas kami
          </p>
        </div>
      </motion.div>
    </div>
  );
}
