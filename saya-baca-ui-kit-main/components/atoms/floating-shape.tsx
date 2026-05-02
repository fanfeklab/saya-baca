'use client';

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface FloatingShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export function FloatingShape({ className, delay = 0, duration = 6, children }: FloatingShapeProps) {
  return (
    <motion.div
      className={cn("absolute mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-40", className)}
      animate={{ 
        y: ['-10vh', '110vh'], 
        rotate: [0, 360] 
      }}
      transition={{ 
        duration: duration, 
        repeat: Infinity, 
        ease: "linear", 
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  )
}
