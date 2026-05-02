import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-black uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 neo-border neo-shadow neo-shadow-active",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-indigo-600",
        secondary:
          "bg-secondary text-black hover:bg-amber-300",
        outline:
          "bg-white text-black hover:bg-slate-50",
        accent:
          "bg-accent text-white hover:bg-rose-500",
        ghost: "border-none shadow-none neo-shadow-active hover:bg-slate-100",
        link: "border-none shadow-none underline-offset-4 hover:underline text-primary",
        danger: "bg-rose-500 text-white hover:bg-rose-600",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-[10px]",
        lg: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12",
        iconLg: "h-16 w-16 rounded-2xl"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
