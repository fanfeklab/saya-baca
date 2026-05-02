"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms/button"

export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: {
    icon: React.ReactNode
    label: string
    onClick: () => void
  }[]
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function SpeedDial({ className, actions, direction = 'up', ...props }: SpeedDialProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const directions = {
    up: "bottom-full mb-4 flex-col-reverse",
    down: "top-full mt-4 flex-col",
    left: "right-full mr-4 flex-row-reverse",
    right: "left-full ml-4 flex-row",
  }

  return (
    <div className={cn("relative flex items-center justify-center", className)} {...props}>
      <div 
        className={cn(
          "absolute flex gap-3 transition-all duration-300 pointer-events-none opacity-0 scale-90",
          directions[direction],
          isOpen && "pointer-events-auto opacity-100 scale-100"
        )}
      >
        {actions.map((action, i) => (
          <div key={i} className="flex relative items-center justify-center group">
            <span className={cn(
              "absolute bg-slate-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none",
              direction === 'up' || direction === 'down' ? "right-full mr-3" : "bottom-full mb-3"
            )}>
              {action.label}
            </span>
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                action.onClick()
                setIsOpen(false)
              }}
              className="rounded-full shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {action.icon}
            </Button>
          </div>
        ))}
      </div>
      
      <Button
        variant="default"
        size="iconLg"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-xl shadow-indigo-500/30"
      >
        <Plus className={cn("w-8 h-8 transition-transform duration-300", isOpen && "rotate-45")} />
      </Button>
    </div>
  )
}
