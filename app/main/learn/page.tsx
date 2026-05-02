"use client"

import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { Button } from "@/components/atoms/button"
import { Star, Lock, MoveLeft, Map as MapIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

export default function LearnMapPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto relative pb-24">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-xl p-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm sticky top-4 z-40">
        <Link href="/main">
          <Button variant="glass" size="icon" className="w-10 h-10 rounded-full">
            <MoveLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
            <Typography variant="h4" className="font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
              <MapIcon className="w-5 h-5" /> Pulau Kata
            </Typography>
            <Typography variant="muted" className="text-xs">Tahap 2</Typography>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 rounded-full font-black text-amber-600 dark:text-amber-400">
            24
            <Star className="w-3 h-3 ml-0.5 fill-amber-500" />
        </div>
      </div>

      {/* Path SVG and Map Area */}
      <div className="relative w-full aspect-[1/2] mt-8 flex flex-col items-center justify-around">
        {/* Subtle Path Connection */}
        <div className="absolute top-[10%] bottom-[10%] w-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full" />
        <div className="absolute top-[10%] bottom-[40%] w-4 bg-indigo-500 rounded-full" />

        {/* Nodes */}
        <MapNode 
          status="locked"
          label="Bos Monster"
          icon="👾"
          color="from-slate-400 to-slate-500"
          offset="-translate-x-12"
        />

        <MapNode 
          status="locked"
          label="Suku Kata 3"
          icon="🧩"
          color="from-slate-400 to-slate-500"
          offset="translate-x-16"
        />

        <MapNode 
          status="current"
          label="Membaca Cerita"
          icon="📚"
          color="from-emerald-400 to-teal-500"
          offset="-translate-x-8"
        />

        <MapNode 
          status="completed"
          label="Suku Kata 2"
          icon="⭐"
          color="from-amber-400 to-orange-500"
          offset="translate-x-12"
        />

        <MapNode 
          status="completed"
          label="Suku Kata 1"
          icon="⭐"
          color="from-amber-400 to-orange-500"
          offset="-translate-x-6"
        />

      </div>

    </div>
  )
}

function MapNode({ status, label, icon, color, offset }: { status: 'locked' | 'current' | 'completed', label: string, icon: React.ReactNode, color: string, offset: string }) {
  const isLocked = status === 'locked'
  const isCurrent = status === 'current'
  
  return (
    <div className={`flex flex-col items-center relative z-10 ${offset}`}>
      <motion.div
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        className="relative"
      >
        <Link href={isLocked ? '#' : '/main/exercise'}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl shadow-indigo-500/20 border-4 border-white dark:border-slate-800 ${
            isLocked 
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-50 border-slate-300 dark:border-slate-700' 
              : `bg-gradient-to-br ${color} ${isCurrent ? 'ring-4 ring-emerald-400 ring-offset-4 dark:ring-offset-slate-900 animate-pulse' : ''}`
          }`}>
             {isLocked ? <Lock className="w-8 h-8 opacity-50" /> : icon}
          </div>
        </Link>
      </motion.div>
      <div className="absolute top-24 w-max bg-white/80 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 border border-white/50 dark:border-white/10 shadow-sm pointer-events-none">
        {label}
      </div>
    </div>
  )
}
