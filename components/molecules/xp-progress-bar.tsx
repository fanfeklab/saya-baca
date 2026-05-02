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
        <div className="flex justify-between items-center text-[10px] font-black text-black dark:text-white uppercase tracking-widest leading-none">
          <div className="flex items-center gap-1">
            {showIcon && <Zap size={12} className="fill-amber-400 stroke-black stroke-[2px]" />}
            <span>{label}</span>
          </div>
          {showPoints && <span>{value} / {max}</span>}
        </div>
      )}
      <div className="relative h-4 bg-white neo-border rounded-full overflow-hidden">
        <div 
          className="h-full bg-amber-400 border-r-2 border-black transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
