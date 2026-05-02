"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/atoms/typography"
import { GlassCard } from "@/components/molecules/glass-card"

export interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onLogin?: (email: string) => void
  onGoogleLogin?: () => void
  onGuestLogin?: () => void
}

export function LoginCard({ className, onLogin, onGoogleLogin, onGuestLogin, ...props }: LoginCardProps) {
  return (
    <div className={cn("w-full max-w-md bg-white neo-border neo-shadow p-8 flex flex-col items-center", className)} {...props}>
      <div className="w-24 h-24 bg-primary neo-border flex items-center justify-center text-5xl rounded-2xl mb-8 transform rotate-3">
        👋
      </div>
      
      <div className="text-center mb-10">
        <Typography variant="h2" className="font-black text-3xl uppercase tracking-tighter">Halo Petualang!</Typography>
        <Typography className="font-bold text-slate-500 mt-2 italic">Siap untuk belajar hari ini?</Typography>
      </div>

      <div className="flex flex-col gap-5 w-full">
        <Button 
          size="lg" 
          className="w-full h-16 bg-secondary text-black font-black text-lg neo-border neo-shadow neo-shadow-active rounded-xl flex gap-3 items-center justify-center hover:bg-amber-300"
          onClick={onGuestLogin}
        >
          🎮 MAIN SEKARANG
        </Button>
        
        <Button 
          variant="outline"
          size="lg" 
          className="w-full h-16 bg-white text-black font-black text-lg neo-border neo-shadow neo-shadow-active rounded-xl flex gap-3 items-center justify-center hover:bg-slate-50"
          onClick={onGoogleLogin}
        >
          👨‍👩‍👧‍👦 ORANG TUA
        </Button>
      </div>

      <div className="mt-10 text-center px-4">
        <Typography variant="muted" className="text-[10px] font-bold leading-tight">
          Dengan masuk, kamu menyetujui Ketentuan Penggunaan dan Kebijakan Privasi standar kami.
        </Typography>
      </div>
    </div>
  )
}
