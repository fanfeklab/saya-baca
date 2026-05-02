"use client"

import * as React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { XPProgressBar } from "@/components/molecules/xp-progress-bar"
import { Avatar } from "@/components/atoms/avatar"
import { Play, Trophy, Star, BookOpen } from "lucide-react"

export default function ChildDashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Profile & Stats Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar size="lg" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Budi" className="ring-4 ring-white dark:ring-slate-800 shadow-xl" />
          <div>
            <Typography variant="h3" className="font-display font-bold">Halo, Budi! 👋</Typography>
            <Typography variant="muted" className="font-medium text-amber-500">Pejuang Huruf Level 4</Typography>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Continue Learning Card */}
        <div className="lg:col-span-2 relative group">
          <Link href="/main/learn">
            <GlassCard variant="heavy" intensity="medium" className="h-full overflow-hidden flex flex-col sm:flex-row items-center gap-6 p-8 border-4 border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-white/60 to-indigo-50/60 dark:from-slate-900/60 dark:to-indigo-950/60 relative hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/20 blur-[60px] rounded-full group-hover:bg-indigo-500/30 transition-colors" />
              
              <div className="flex-1 w-full relative z-10">
                <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300">
                  Pulau Kata • Tahap 2
                </Badge>
                <Typography variant="h2" className="mb-2 font-black leading-tight">Melawan Monster Suku Kata!</Typography>
                <Typography variant="muted" className="mb-6 max-w-sm">
                  Ayo bantu Koko si Kucing menemukan suku kata yang hilang untuk membuka gerbang ajaib.
                </Typography>
                <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold transition-transform group-hover:translate-x-2">
                  <span className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/40">
                    <Play className="w-5 h-5 ml-1" />
                  </span>
                  Mulai Petualangan
                </div>
              </div>

              <div className="w-48 h-48 sm:w-64 sm:h-64 relative z-10 transform transition-transform group-hover:scale-105 group-hover:rotate-3 flex-shrink-0">
                {/* Fallback monster shape since we don't have images */}
                <div className="w-full h-full bg-indigo-400 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-fuchsia-500" />
                   <span className="text-8xl relative z-10">👾</span>
                </div>
              </div>
            </GlassCard>
          </Link>
        </div>

        {/* Stats Column */}
        <div className="flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-4">
            <Typography variant="large" className="font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Progress Level
            </Typography>
            <div className="p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/50 dark:border-white/10">
              <XPProgressBar value={450} max={1000} label="XP" />
            </div>
            <Typography variant="muted" className="text-sm text-center">
              550 XP lagi menuju Level 5!
            </Typography>
          </GlassCard>

          <div className="grid grid-cols-2 gap-4 flex-1">
            <GlassCard className="flex flex-col items-center justify-center text-center p-4 hover:bg-white/50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <Typography variant="h4" className="font-black">12</Typography>
              <Typography variant="muted" className="text-xs font-semibold uppercase tracking-wider">Piala</Typography>
            </GlassCard>
            
            <GlassCard className="flex flex-col items-center justify-center text-center p-4 hover:bg-white/50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <Typography variant="h4" className="font-black">24</Typography>
              <Typography variant="muted" className="text-xs font-semibold uppercase tracking-wider">Buku</Typography>
            </GlassCard>
          </div>
        </div>

      </div>

      {/* Mini Games or Recent Activities */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h3" className="font-bold">Ayo Main Lagi</Typography>
          <Link href="/main/games" className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mr-2 hover:underline">Lihat Semua</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: "Tebak Kata", emoji: "🧩", color: "from-rose-400 to-orange-400" },
            { title: "Menulis Huruf", emoji: "✍️", color: "from-emerald-400 to-teal-400" },
            { title: "Mencocokkan Suara", emoji: "🎵", color: "from-sky-400 to-indigo-400" },
            { title: "Buku Cerita", emoji: "📚", color: "from-fuchsia-400 to-purple-400" },
          ].map((game, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#">
                <GlassCard className="p-0 overflow-hidden border-2 border-transparent hover:border-white/50 dark:hover:border-white/20 transition-all">
                  <div className={`h-32 w-full bg-gradient-to-br ${game.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                    <span className="text-5xl drop-shadow-xl relative z-10">{game.emoji}</span>
                  </div>
                  <div className="p-4 text-center">
                    <Typography className="font-bold text-slate-800 dark:text-slate-200">{game.title}</Typography>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ring-black/5 dark:ring-white/10 ${className}`}>
      {children}
    </span>
  )
}
