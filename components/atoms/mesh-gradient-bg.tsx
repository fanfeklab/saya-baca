'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export default function MeshGradientBg() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 min-h-screen bg-slate-50 z-[-1]" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`fixed inset-0 min-h-screen overflow-hidden z-[-1] transition-colors duration-1000 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Optimized subtle background shapes */}
      <div className={`absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full opacity-20 pointer-events-none transition-colors duration-1000 ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-200/40'}`} style={{ filter: 'blur(120px)' }} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[90vw] h-[90vw] rounded-full opacity-20 pointer-events-none transition-colors duration-1000 ${isDark ? 'bg-fuchsia-600/20' : 'bg-fuchsia-200/40'}`} style={{ filter: 'blur(120px)' }} />
      
      {/* Noise overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} 
      />
    </div>
  );
}
