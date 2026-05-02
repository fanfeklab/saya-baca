import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/atoms/skeleton"
import { GlassCard } from "./glass-card"

export function SkeletonCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <GlassCard className={cn("p-6 flex flex-col gap-4", className)} hoverEffect={false} {...props}>
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-2 flex-grow">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-24 w-full mt-2" />
      <div className="flex justify-end mt-2">
        <Skeleton className="h-9 w-24 rounded-xl" />
      </div>
    </GlassCard>
  )
}
