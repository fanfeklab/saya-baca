import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number
}

export function AvatarGroup({ className, children, limit = 4, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const visibleAvatars = childrenArray.slice(0, limit)
  const remainingCount = childrenArray.length - limit

  return (
    <div className={cn("flex items-center -space-x-3", className)} {...props}>
      {visibleAvatars.map((child, i) => (
        <div key={i} className="relative transition-transform hover:-translate-y-1 hover:z-10 focus-within:z-10 focus-within:-translate-y-1 z-0">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-100 dark:bg-slate-800 text-sm font-medium z-0">
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
