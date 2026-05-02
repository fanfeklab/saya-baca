"use client"

import * as React from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Typography } from "@/components/atoms/typography"
import { XPProgressBar } from "@/components/molecules/xp-progress-bar"
import { Avatar } from "@/components/atoms/avatar"
import { Play, Trophy, Star, BookOpen } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      {/* Header Profile */}
      <div className="flex items-center gap-4 bg-white neo-border neo-shadow p-4 rounded-2xl transform -rotate-1">
        <Avatar size="lg" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Budi" className="neo-border w-16 h-16 shadow-none" />
        <div className="flex-1">
          <Typography variant="h4" className="font-black uppercase tracking-tight">Halo, Budi! 👋</Typography>
          <div className="bg-amber-400 neo-border px-2 py-0.5 inline-block rounded-md mt-1">
            <Typography className="text-[10px] font-black uppercase">Level 4 • Pejuang Huruf</Typography>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white neo-border neo-shadow p-5 rounded-2xl">
        <div className="flex justify-between items-end mb-3">
          <Typography className="font-black text-xs uppercase flex items-center gap-1">
            <Star size={14} className="fill-amber-400" /> Tahap 2: Pulau Kata
          </Typography>
          <Typography className="font-black text-primary text-xs uppercase">450 / 1000 XP</Typography>
        </div>
        <XPProgressBar value={450} max={1000} showPoints={false} className="h-6" />
      </div>

      {/* Main Action Button */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full"
      >
        <Link href="/main/learn">
          <div className="bg-primary text-white neo-border neo-shadow neo-shadow-active p-6 rounded-3xl flex flex-col items-center gap-4 group transition-colors hover:bg-indigo-600">
            <div className="w-20 h-20 bg-white neo-border rounded-full flex items-center justify-center text-primary shadow-[4px_4px_0px_#000000]">
              <Play className="w-10 h-10 ml-1 fill-current" />
            </div>
            <Typography variant="h2" className="font-black uppercase tracking-widest text-center leading-tight">
              LANJUTKAN<br/>BELAJAR!
            </Typography>
          </div>
        </Link>
      </motion.div>

      {/* Small Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white neo-border neo-shadow p-4 rounded-2xl flex flex-col items-center gap-1 group cursor-pointer hover:bg-emerald-50">
          <div className="bg-emerald-100 neo-border p-2 rounded-xl text-emerald-600">
            <Trophy size={20} />
          </div>
          <Typography variant="h3" className="font-black mt-1">12</Typography>
          <Typography className="text-[10px] font-black uppercase text-slate-500">Piala</Typography>
        </div>
        
        <div className="bg-white neo-border neo-shadow p-4 rounded-2xl flex flex-col items-center gap-1 group cursor-pointer hover:bg-sky-50">
          <div className="bg-sky-100 neo-border p-2 rounded-xl text-sky-600">
            <BookOpen size={20} />
          </div>
          <Typography variant="h3" className="font-black mt-1">24</Typography>
          <Typography className="text-[10px] font-black uppercase text-slate-500">Buku</Typography>
        </div>
      </div>

      {/* Quick Play Mini-games list */}
      <div className="mt-2">
        <Typography className="font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-rose-500" /> Game Favorit
        </Typography>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {['🧩 Tebak Kata', '✍️ Menulis', '🎵 Suara'].map((game, i) => (
            <div key={i} className="shrink-0 bg-white neo-border neo-shadow-hover px-4 py-3 rounded-xl font-black text-sm whitespace-nowrap cursor-pointer active:translate-y-1 transition-all">
              {game}
            </div>
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
