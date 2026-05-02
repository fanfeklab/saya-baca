"use client";

import { Star, Trophy, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopAppBarProps {
  userName?: string;
  level?: number;
  stars?: number;
  avatarSeed?: string;
}

export function TopAppBar({ 
  userName, 
  level = 3, 
  stars, 
  avatarSeed 
}: TopAppBarProps) {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);

  const displayUser = userName || currentProfile?.name || "Budi";
  const displayStars = stars !== undefined ? stars : (currentProfile?.stars || 0);
  const displayAvatar = avatarSeed || currentProfile?.avatar || "Felix";
  const energy = currentProfile?.energy ?? 5;

  return (
    <header className="w-full flex items-center justify-between p-2 pl-3 bg-card border-2 border-black shadow-neo rounded-2xl">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9 border-2 border-black shadow-neo-sm bg-background">
          <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${displayAvatar}`} alt="Avatar Anak" />
          <AvatarFallback>KID</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <span className="font-black text-[11px] leading-none uppercase tracking-tighter">Halo, {displayUser}!</span>
          <div className="flex items-center gap-2 mt-1">
             <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Heart 
                        key={i} 
                        className={cn(
                            "size-2.5",
                            i < energy ? "fill-destructive text-destructive" : "fill-muted/20 text-muted-foreground/20"
                        )} 
                    />
                ))}
             </div>
             <Badge variant="accent" className="text-[9px] px-1.5 py-0 h-3.5 shadow-none border border-border font-black uppercase">
               Lv {level}
             </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/main/leaderboard')}
            className="h-9 w-9 border-2 border-black shadow-neo-sm active:shadow-none bg-background"
        >
            <Trophy className="size-4" />
        </Button>
        <div className="flex items-center gap-1.5 h-9 px-3 bg-yellow-400 rounded-xl border-2 border-black shadow-neo-sm">
          <Star className="w-4 h-4 fill-black text-black stroke-black stroke-[3px]" />
          <span className="font-black text-xs text-black">{displayStars.toLocaleString('id-ID')}</span>
        </div>
        <ThemeToggle className="h-9 w-9 border-2 border-black shadow-neo-sm active:shadow-none bg-background" />
      </div>
    </header>
  );
}
