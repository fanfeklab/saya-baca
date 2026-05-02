import * as React from "react"
import { cn } from "@/lib/utils"
import { GlassPanel } from "@/components/atoms/glass-panel"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'standard' | 'heavy'
  intensity?: 'low' | 'medium' | 'high'
  hoverEffect?: boolean
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, hoverEffect = true, ...props }, ref) => {
    return (
      <GlassPanel
        ref={ref}
        className={cn(
          "p-6 flex flex-col gap-4",
          hoverEffect && "transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </GlassPanel>
    )
  }
)
GlassCard.displayName = "GlassCard"
