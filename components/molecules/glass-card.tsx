import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassPanel } from "@/components/atoms/glass-panel"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'standard' | 'heavy'
  intensity?: 'low' | 'medium' | 'high'
  hoverEffect?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white neo-border neo-shadow p-6 flex flex-col gap-4 rounded-2xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"
