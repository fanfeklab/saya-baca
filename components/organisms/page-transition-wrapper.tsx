"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

export interface PageTransitionWrapperProps extends HTMLMotionProps<"div"> {}

export function PageTransitionWrapper({ children, className, ...props }: PageTransitionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className={cn("w-full h-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
