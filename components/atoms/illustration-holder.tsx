import React from "react";
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react";

interface IllustrationHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "muted";
  size?: "sm" | "md" | "lg" | "xl";
  emoji?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

const variantStyles = {
  primary: "bg-primary border-primary text-primary-foreground",
  secondary: "bg-secondary border-secondary text-secondary-foreground",
  accent: "bg-accent border-accent text-accent-foreground",
  success: "bg-success border-success text-success-foreground",
  muted: "bg-muted border-border text-muted-foreground"
};

const sizeStyles = {
  sm: "size-12 text-2xl",
  md: "size-16 text-3xl",
  lg: "size-24 text-5xl",
  xl: "size-32 text-7xl",
}

export function IllustrationHolder({ 
  variant = "muted", 
  size = "md", 
  emoji, 
  icon: Icon,
  className, 
  children,
  ...props 
}: IllustrationHolderProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center shrink-0 border-4 border-black rounded-3xl shadow-neo-sm bg-card",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {Icon ? (
        <Icon className={cn(
          size === "sm" ? "size-6" : 
          size === "md" ? "size-8" : 
          size === "lg" ? "size-12" : "size-16",
          "stroke-[3px]"
        )} />
      ) : emoji ? (
        <span aria-hidden="true" className="select-none leading-none">
          {emoji}
        </span>
      ) : children}
    </div>
  );
}
