"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Typography } from "@/components/atoms/typography"
import { Button } from "@/components/atoms/button"
import { Undo2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FlashCardProps extends React.HTMLAttributes<HTMLDivElement> {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  flipped?: boolean
  onFlipToggle?: (flipped: boolean) => void
}

export function FlashCard({ 
  className, 
  frontContent, 
  backContent, 
  flipped = false,
  onFlipToggle,
  ...props 
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(flipped)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFlipped(flipped)
  }, [flipped])

  const handleFlip = () => {
    const newState = !isFlipped
    setIsFlipped(newState)
    onFlipToggle?.(newState)
  }

  return (
    <div className={cn("perspective-1000 relative w-full aspect-[3/4] max-w-sm mx-auto", className)} {...props}>
      <motion.div
        className="w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        onClick={handleFlip}
      >
        <div className="absolute inset-0 backface-hidden w-full h-full">
          <div className="w-full h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border-4 border-indigo-200 dark:border-indigo-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-shadow">
            {frontContent}
          </div>
        </div>
        <div className="absolute inset-0 backface-hidden w-full h-full rotate-y-180">
          <div className="w-full h-full bg-indigo-50/90 dark:bg-slate-900/90 backdrop-blur-xl border-4 border-emerald-300 dark:border-emerald-700 rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl shadow-emerald-500/10">
            {backContent}
            <Button variant="ghost" size="icon" className="absolute bottom-4 right-4" onClick={(e) => { e.stopPropagation(); handleFlip(); }}>
              <Undo2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
