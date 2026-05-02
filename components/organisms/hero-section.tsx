"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Typography } from "@/components/atoms/typography"
import { Button } from "@/components/atoms/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-indigo-500/20 to-fuchsia-500/20 blur-[100px] rounded-full" />
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400/20 rounded-full blur-[40px]" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-400/20 rounded-full blur-[50px]" 
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 ring-1 ring-inset ring-indigo-500/20 mb-8">
            🌟 Platform Belajar Membaca No. 1
          </span>
        </motion.div>
        
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography variant="h1" className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Bikin Anak <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-fuchsia-500">Suka Baca</span>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography variant="h3" color="muted" className="max-w-2xl mx-auto mb-10 font-normal leading-relaxed text-lg md:text-xl">
            Metode belajar membaca interaktif, menyenangkan, dan disesuaikan dengan kemampuan si kecil.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/login">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow">
              Mulai Petualangan
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
            Lihat Metode
          </Button>
        </motion.div>
      </div>

      {/* Decorative Mockup Area */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 w-full max-w-5xl mx-auto px-6"
      >
        <div className="aspect-[16/9] rounded-3xl overflow-hidden border-8 border-white/40 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-gradient-to-br from-indigo-100 to-fuchsia-100 dark:from-indigo-900/40 dark:to-fuchsia-900/40 relative flex items-center justify-center">
          <Typography variant="h2" className="text-indigo-900/20 dark:text-indigo-100/10 font-black rotate-[-10deg] text-6xl md:text-9xl absolute">Interactive App Preview</Typography>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-sm" />
        </div>
      </motion.div>
    </section>
  )
}
