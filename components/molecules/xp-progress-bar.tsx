import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Zap } from "lucide-react"

export interface XPProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  label?: string
  showIcon?: boolean
  showPoints?: boolean
}

export function XPProgressBar({ 
  className, 
  value, 
  max = 100, 
  label = "XP", 
  showIcon = true,
  showPoints = true,
  ...props 
}: XPProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)} {...props}>
      {(label || showPoints) && (
        <div className="flex justify-between items-center text-sm font-bold text-amber-500 drop-shadow-sm">
          <div className="flex items-center gap-1">
            {showIcon && <Zap className="w-4 h-4 fill-amber-500" />}
            <span className="uppercase tracking-wider">{label}</span>
          </div>
          {showPoints && <span>{value} / {max}</span>}
        </div>
      )}
      <div className="relative">
        <div className="absolute inset-0 bg-amber-400 blur-sm opacity-20 rounded-full" />
        <Progress 
          value={percentage} 
          className="h-3 bg-white/30 dark:bg-black/30 backdrop-blur-md [&>div]:bg-amber-400 [&>div]:shadow-[0_0_10px_rgba(251,191,36,0.8)]" 
        />
      </div>
    </div>
  )
}
