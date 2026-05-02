'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { RefreshCcw, AlertTriangle, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('System Crash:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-cream p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white neo-border neo-shadow-lg rounded-[2.5rem] p-10 text-center space-y-6"
      >
        <div className="w-20 h-20 bg-red-100 border-4 border-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-black text-neoblack uppercase">Aduh, Ada Masalah!</h1>
          <p className="font-sans text-neoblack/60 font-bold">
            Sepertinya aplikasi mengalami kendala teknis. Jangan khawatir, kita bisa coba lagi.
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-200 text-left">
          <p className="text-xs font-mono text-red-600 break-words">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => reset()}
            variant="neo"
            className="w-full bg-yellow-400 py-6 text-lg"
          >
            <RefreshCcw className="mr-2" /> COBA LAGI
          </Button>
          
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full rounded-2xl py-6"
          >
            <Home className="mr-2" /> KEMBALI KE BERANDA
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
