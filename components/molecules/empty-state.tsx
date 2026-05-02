import * as React from "react"
import { cn } from "@/lib/utils"
import { Typography } from "@/components/atoms/typography"
import { LucideIcon } from "lucide-react"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ className, icon: Icon, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div 
      className={cn("flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-black/10 backdrop-blur-sm", className)}
      {...props}
    >
      {Icon && (
        <div className="w-16 h-16 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
          <Icon className="w-8 h-8 text-indigo-500" />
        </div>
      )}
      <Typography variant="h4" className="mb-2">{title}</Typography>
      {description && (
        <Typography variant="muted" className="mb-6 max-w-sm">{description}</Typography>
      )}
      {action}
    </div>
  )
}
