'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

import { BookOpen } from 'lucide-react';

export default function RootPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/main/login');
      } else {
        router.push('/main/home');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-cream">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 bg-yellow-400 rounded-2xl neo-border neo-shadow flex items-center justify-center"
      >
        <BookOpen size={32} className="text-neoblack" />
      </motion.div>
    </div>
  );
}
