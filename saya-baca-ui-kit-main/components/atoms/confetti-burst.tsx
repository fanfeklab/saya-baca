'use client'

import * as React from "react"
import confetti from "canvas-confetti"

interface ConfettiBurstProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ConfettiBurst({ children, className, onClick }: ConfettiBurstProps) {
  const triggerConfetti = React.useCallback((e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const x = (rect.left + rect.width / 2) / window.innerWidth
    const y = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#8B5CF6', '#FDE047', '#F97316', '#84CC16'], // Custom neo colors
    })

    onClick?.()
  }, [onClick])

  return (
    <div className={className} onClick={triggerConfetti}>
      {children}
    </div>
  )
}
