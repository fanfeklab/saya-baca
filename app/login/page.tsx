'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <div className="min-h-screen bg-warm-cream flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white neo-border neo-shadow-lg rounded-[2.5rem] p-10 space-y-8"
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
            <h1 className="font-heading text-3xl font-black text-neoblack uppercase">AREA ORANG TUA</h1>
            <p className="font-sans text-neoblack/60 font-bold">
              Masuk untuk memantau perkembangan belajar anak Anda.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            variant="neo"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white flex items-center justify-center gap-3 py-8"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
            <span className="text-lg font-black uppercase">Masuk dengan Google</span>
          </Button>
          
          <p className="text-center text-[10px] font-black text-neoblack/30 uppercase tracking-widest leading-none">
            Keamanan data Anda adalah prioritas kami
          </p>
        </div>
      </motion.div>
    </div>
  );
}
