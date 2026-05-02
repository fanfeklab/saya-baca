import React from "react";
import { cn } from "@/lib/utils";

interface IllustrationHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent" | "success" | "muted";
  size?: "sm" | "md" | "lg" | "xl";
  emoji?: string;
  children?: React.ReactNode;
}

const variantStyles = {
  primary: "bg-primary/20 border-primary",
  secondary: "bg-secondary/20 border-secondary",
  accent: "bg-accent/20 border-accent",
  success: "bg-success/20 border-success",
  muted: "bg-muted border-border"
};

const sizeStyles = {
  sm: "w-12 h-12 text-2xl",
  md: "w-16 h-16 text-3xl",
  lg: "w-24 h-24 text-5xl",
  xl: "w-32 h-32 text-7xl",
}

export function IllustrationHolder({ 
  variant = "muted", 
  size = "md", 
  emoji, 
  className, 
  children,
  ...props 
}: IllustrationHolderProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center shrink-0 border-2 border-black rounded-2xl shadow-[3px_3px_0_0_#000000] bg-card",
        variant === "muted" ? "" : variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {emoji ? (
        <span aria-hidden="true" className="select-none leading-none">
          {emoji}
        </span>
      ) : children}
    </div>
  );
}
