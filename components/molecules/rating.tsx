import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  onValueChange?: (value: number) => void
  readonly?: boolean
}

export function Rating({ 
  className, 
  value, 
  max = 5, 
  onValueChange, 
  readonly = false,
  ...props 
}: RatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1
        const isActive = (hoverValue !== null ? hoverValue : value) >= starValue
        
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            className={cn(
              "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm",
              readonly && "cursor-default",
              !readonly && "hover:scale-110 active:scale-95"
            )}
            onMouseEnter={() => !readonly && setHoverValue(starValue)}
            onMouseLeave={() => !readonly && setHoverValue(null)}
            onClick={() => !readonly && onValueChange?.(starValue)}
          >
            <Star
              className={cn(
                "w-6 h-6",
                isActive 
                  ? "fill-amber-400 text-amber-500 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" 
                  : "fill-slate-200 text-slate-300 dark:fill-slate-800 dark:text-slate-700"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
