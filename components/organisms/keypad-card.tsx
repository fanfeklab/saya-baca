"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"
import { Delete } from "lucide-react"

export interface KeypadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onComplete?: (pin: string) => void
  pinLength?: number
  title?: string
  subtitle?: string
}

export function KeypadCard({ 
  className, 
  onComplete, 
  pinLength = 4, 
  title = "Area Orang Tua", 
  subtitle = "Masukkan PIN untuk melanjutkan",
  ...props 
}: KeypadCardProps) {
  const [pin, setPin] = React.useState("")
  const [errorLine, setErrorLine] = React.useState(false)

  const handleKeyPress = (num: number) => {
    if (pin.length < pinLength) {
      const newPin = pin + num.toString()
      setPin(newPin)
      if (newPin.length === pinLength) {
        onComplete?.(newPin)
        // Simulate checking
        setTimeout(() => {
          setPin("");
          setErrorLine(true)
          setTimeout(() => setErrorLine(false), 500)
        }, 500)
      }
    }
  }

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1))
    }
  }

  return (
    <GlassCard variant="heavy" className={cn("w-full max-w-sm items-center p-6 sm:p-8", className)} {...props}>
      <Typography variant="h4" className="mb-1">{title}</Typography>
      <Typography variant="muted" className="mb-6 text-center">{subtitle}</Typography>

      {/* PIN Indicators */}
      <motion.div 
        animate={errorLine ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex gap-4 mb-8"
      >
        {Array.from({ length: pinLength }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "w-4 h-4 rounded-full transition-colors duration-200 border-2",
              i < pin.length 
                ? "bg-indigo-500 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                : "bg-transparent border-slate-300 dark:border-slate-700"
            )}
          />
        ))}
      </motion.div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num)}
            className="aspect-square rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all active:scale-95 flex items-center justify-center text-2xl font-bold font-display shadow-sm"
          >
            {num}
          </button>
        ))}
        <div className="aspect-square" />
        <button
          onClick={() => handleKeyPress(0)}
          className="aspect-square rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all active:scale-95 flex items-center justify-center text-2xl font-bold font-display shadow-sm"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="aspect-square rounded-full bg-rose-100/40 dark:bg-rose-900/40 backdrop-blur-sm border border-rose-200/40 dark:border-rose-800/40 hover:bg-rose-200/60 dark:hover:bg-rose-800/60 transition-all active:scale-95 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-sm"
        >
          <Delete className="w-6 h-6" />
        </button>
      </div>
    </GlassCard>
  )
}
