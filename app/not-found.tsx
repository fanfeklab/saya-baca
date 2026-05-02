'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import { Home, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-cream p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white neo-border neo-shadow-lg rounded-[2.5rem] p-10 text-center space-y-6"
      >
        <div className="w-24 h-24 bg-yellow-100 border-4 border-yellow-500 rounded-full flex items-center justify-center mx-auto relative">
          <Search size={48} className="text-yellow-600" />
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-1 -right-1 text-4xl"
          >
            ?
          </motion.span>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-black text-neoblack uppercase">404</h1>
          <h2 className="font-heading text-xl font-black text-neoblack uppercase">Halaman Tidak Ditemukan</h2>
          <p className="font-sans text-neoblack/60 font-bold">
            Maaf, halaman yang kamu cari tidak ada di peta petualangan kami.
          </p>
        </div>

        <Button 
          onClick={() => router.push('/')}
          variant="neo"
          className="w-full bg-yellow-400 py-6 text-lg"
        >
          <Home className="mr-2" /> AYO PULANG
        </Button>
      </motion.div>
    </div>
  );
}
