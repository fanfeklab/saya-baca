"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Typography } from "@/components/atoms/typography"
import { Button } from "@/components/atoms/button"

export interface RewardOverlayProps {
  isOpen: boolean
  onClose: () => void
  rewardTitle: string
  rewardImage?: string // e.g. a sticker URL
}

export function RewardOverlay({ isOpen, onClose, rewardTitle, rewardImage }: RewardOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50, rotate: -10 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="flex flex-col items-center max-w-sm w-full bg-gradient-to-b from-indigo-500 to-fuchsia-500 rounded-[3rem] p-8 border-4 border-white/20 shadow-[0_0_100px_rgba(99,102,241,0.6)] text-white text-center"
          >
            <Typography variant="h2" color="white" className="mb-2">Luar Biasa!</Typography>
            <Typography variant="large" color="white" className="mb-8 opacity-90">Kamu mendapatkan hadiah baru!</Typography>
            
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border-2 border-white/30 shadow-inner"
            >
              {rewardImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={rewardImage} alt="Reward" className="w-32 h-32 object-contain drop-shadow-2xl" />
              ) : (
                <span className="text-6xl text-amber-300 drop-shadow-xl">🌟</span>
              )}
            </motion.div>
            
            <Typography variant="h3" color="white" className="mb-8">{rewardTitle}</Typography>
            
            <Button 
              size="lg" 
              variant="default"
              onClick={onClose}
              className="w-full rounded-full bg-white text-indigo-600 hover:bg-slate-100 hover:text-indigo-700 shadow-xl"
            >
              Lanjutkan
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
