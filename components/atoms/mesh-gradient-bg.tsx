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
    <div className={`fixed inset-0 min-h-screen overflow-hidden z-[-1] transition-colors duration-1000 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 ${isDark ? 'bg-indigo-900/40' : 'bg-indigo-300/40'}`}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 ${isDark ? 'bg-fuchsia-900/40' : 'bg-fuchsia-300/40'}`}
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 ${isDark ? 'bg-rose-900/30' : 'bg-rose-300/40'}`}
      />
       <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, -50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 ${isDark ? 'bg-sky-900/40' : 'bg-sky-300/40'}`}
      />
      {/* Light subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
