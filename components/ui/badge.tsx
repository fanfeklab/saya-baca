import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-7 items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-border shadow-[2px_2px_0_0_#000000] px-3 py-0.5 text-sm font-bold whitespace-nowrap transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5 text-white",
        secondary: "bg-secondary text-secondary-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        accent: "bg-accent text-accent-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        success: "bg-success text-success-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        outline: "bg-background text-foreground hover:bg-muted hover:shadow-[4px_4px_0_0_#000000] hover:-translate-y-0.5 hover:-translate-x-0.5",
        ghost: "border-transparent shadow-none hover:bg-muted hover:text-muted-foreground",
        link: "border-transparent shadow-none hover:shadow-none text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
