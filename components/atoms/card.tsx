import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-4 overflow-hidden transition-all",
  {
    variants: {
      variant: {
        default: "bg-white text-neoblack neo-border neo-shadow rounded-3xl",
        flat: "bg-white text-neoblack border-2 border-black rounded-3xl",
        neo: "bg-white text-neoblack neo-border neo-shadow-lg rounded-[2rem]",
        ghost: "bg-transparent text-neoblack",
      },
      padding: {
        none: "p-0",
        sm: "p-3 sm:p-4",
        default: "p-5 sm:p-6",
        lg: "p-8 sm:p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export interface CardProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("font-heading text-xl sm:text-2xl font-black leading-none", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("font-sans text-sm sm:text-base font-bold text-neoblack/70 leading-snug", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-0", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
}
