"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";

interface NeoTextProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLSpanElement | HTMLParagraphElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
  variant?: "title" | "subtitle" | "body"
  stroke?: boolean
  forceCase?: boolean // If true, don't follow global uppercase setting
}

export const NeoText = React.forwardRef<HTMLElement, NeoTextProps>(
  ({ className, as, variant = "body", stroke = false, forceCase = false, children, ...props }, ref) => {
    const settings = useStore(useAppStore, (state) => state.settings);
    
    // Determine default tag based on variant
    const defaultTag = variant === "title" ? "h1" : variant === "subtitle" ? "h2" : "p";
    const Component = as || defaultTag;

    const isLarge = settings?.textSize === 'large';
    const isUppercase = settings?.isUppercaseOnly && !forceCase;

    const baseClasses = cn(
      "font-bold tracking-tight",
      {
        "text-4xl md:text-6xl": variant === "title" && !isLarge,
        "text-5xl md:text-7xl": variant === "title" && isLarge,
        "text-2xl md:text-3xl": variant === "subtitle" && !isLarge,
        "text-3xl md:text-4xl": variant === "subtitle" && isLarge,
        "text-lg": variant === "body" && !isLarge,
        "text-xl": variant === "body" && isLarge,
        "uppercase": isUppercase,
      },
      className
    )

    // Using an inline text-stroke for the true stroke effect
    const style = stroke ? {
      textShadow: variant === "title" ? "4px 4px 0 #000000" : "2px 2px 0 #000000",
      WebkitTextStroke: "1.5px #000000",
      color: "#FFFFFF" 
    } : undefined

    return React.createElement(
      Component,
      {
        ref,
        className: baseClasses,
        style: { ...style, ...props.style },
        ...props
      },
      children
    )
  }
)
NeoText.displayName = "NeoText"
