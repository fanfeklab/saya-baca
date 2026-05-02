"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Star, Smile, Music, Heart, Sun, Cloud, Gamepad2, Puzzle } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackgroundOrchestra() {
  // Floating Animated Icons for the kids app vibe
  const ICONS = [
    { Icon: Star, color: "text-secondary", size: "w-12 h-12", left: "5%", delay: 0, duration: 45, blur: "blur-[2px]" },
    { Icon: Smile, color: "text-primary", size: "w-24 h-24", left: "15%", delay: 5, duration: 60, blur: "blur-[4px]" },
    { Icon: Music, color: "text-accent", size: "w-8 h-8", left: "30%", delay: 2, duration: 50, blur: "blur-[1px]" },
    { Icon: Gamepad2, color: "text-success", size: "w-20 h-20", left: "50%", delay: 10, duration: 75, blur: "blur-[6px]" },
    { Icon: Puzzle, color: "text-destructive", size: "w-10 h-10", left: "65%", delay: 3, duration: 55, blur: "blur-none" },
    { Icon: Cloud, color: "text-primary", size: "w-32 h-32", left: "80%", delay: 7, duration: 80, blur: "blur-[10px]" },
    { Icon: Sun, color: "text-secondary", size: "w-16 h-16", left: "90%", delay: 1, duration: 65, blur: "blur-[3px]" },
    { Icon: Heart, color: "text-destructive", size: "w-6 h-6", left: "40%", delay: 8, duration: 40, blur: "blur-none" },
  ];

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Space Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {ICONS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: "110vh", x: "0vw" }}
            animate={{ 
              y: ["110vh", "-20vh"],
              x: ["-2vw", "2vw", "-2vw"],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: item.duration, 
              repeat: Infinity, 
              ease: "linear", 
              delay: item.delay 
            }}
            className={cn("absolute opacity-20 dark:opacity-10 transition-all", item.blur)}
            style={{ left: item.left }}
          >
            <item.Icon className={cn(item.size, item.color)} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
