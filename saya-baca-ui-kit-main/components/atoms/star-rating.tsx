'use client'

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "motion/react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  className?: string
}

export function StarRating({ rating, maxRating = 3, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <AnimatePresence>
        {Array.from({ length: maxRating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            <Star
              className={cn(
                "h-8 w-8 stroke-black stroke-2 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]",
                i < rating ? "fill-secondary text-secondary" : "fill-muted text-muted"
              )}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
