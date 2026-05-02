"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "@/lib/utils"

export interface PageTransitionWrapperProps extends HTMLMotionProps<"div"> {}

export function PageTransitionWrapper({ children, className, ...props }: PageTransitionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("w-full h-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
