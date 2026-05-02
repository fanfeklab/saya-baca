import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-600 text-white shadow hover:bg-indigo-700",
        glass: 
          "border-white/40 dark:border-white/20 bg-white/40 dark:bg-black/40 backdrop-blur-md text-indigo-800 dark:text-indigo-200 shadow-sm",
        secondary:
          "border-transparent bg-fuchsia-100 text-fuchsia-900 hover:bg-fuchsia-200 dark:bg-fuchsia-900/30 dark:hover:bg-fuchsia-900/50 dark:text-fuchsia-300",
        outline: "text-slate-900 dark:text-slate-100 dark:border-slate-700",
        success: "border-transparent bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
        danger: "border-transparent bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
