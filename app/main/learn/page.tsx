"use client"

import * as React from "react"
import { Typography } from "@/components/atoms/typography"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/molecules/glass-card"
import { Button } from "@/components/atoms/button"
import { Star, Lock, MoveLeft, Map as MapIcon } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

export default function LearnMapPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto relative pb-24 h-full">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white neo-border p-3 rounded-2xl sticky top-4 z-40">
        <Link href="/main">
          <Button variant="outline" size="icon" className="w-10 h-10 neo-shadow-active">
            <MoveLeft className="w-5 h-5 text-primary" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
            <Typography className="font-black uppercase tracking-tighter text-sm flex items-center gap-1">
              <MapIcon size={14} className="text-primary" /> Pulau Kata
            </Typography>
            <Typography className="text-[10px] font-bold text-slate-500 uppercase leading-none">Tahap 2</Typography>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-amber-400 neo-border rounded-xl font-black text-black">
            24
            <Star size={10} className="ml-0.5 fill-black" />
        </div>
      </div>

      {/* Path SVG and Map Area */}
      <div className="relative w-full aspect-[1/2] mt-8 flex flex-col items-center justify-around h-[600px]">
        {/* Subtle Path Connection */}
        <div className="absolute top-[10%] bottom-[10%] w-6 bg-slate-100 neo-border rounded-full" />
        <div className="absolute top-[10%] bottom-[40%] w-6 bg-primary neo-border border-y-0 rounded-full" />

        {/* Nodes */}
        <MapNode 
          status="locked"
          label="Bos Monster"
          icon="👾"
          color="bg-slate-200"
          offset="-translate-x-12"
        />

        <MapNode 
          status="locked"
          label="Suku Kata 3"
          icon="🧩"
          color="bg-slate-200"
          offset="translate-x-16"
        />

        <MapNode 
          status="current"
          label="Membaca Cerita"
          icon="📚"
          color="bg-primary"
          offset="-translate-x-8"
        />

        <MapNode 
          status="completed"
          label="Suku Kata 2"
          icon="⭐"
          color="bg-secondary"
          offset="translate-x-12"
        />

        <MapNode 
          status="completed"
          label="Suku Kata 1"
          icon="⭐"
          color="bg-secondary"
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
        whileHover={!isLocked ? { scale: 1.1, rotate: 2 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        className="relative"
      >
        <Link href={isLocked ? '#' : '/main/exercise'}>
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl neo-border",
            color,
            !isLocked && "neo-shadow neo-shadow-active",
            isLocked && "opacity-50 text-slate-400"
          )}>
             {isLocked ? <Lock className="w-6 h-6 opacity-50" /> : icon}
          </div>
        </Link>
      </motion.div>
      <div className="absolute top-18 w-max bg-white neo-border px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest pointer-events-none shadow-[2px_2px_0px_#000000]">
        {label}
      </div>
    </div>
  )
}
