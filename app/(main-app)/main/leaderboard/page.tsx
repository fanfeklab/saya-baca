"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Trophy, Medal, ArrowLeft, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { GameHeader } from "@/components/molecules/game-header";

const GLOBAL_LEADERBOARD = [
  { id: "lb1", name: "Rizky", stars: 2500, level: 12, avatar: "Aneka" },
  { id: "lb2", name: "Siti", stars: 2100, level: 11, avatar: "Joy" },
  { id: "lb3", name: "Baim", stars: 1850, level: 9, avatar: "Baim" },
  { id: "lb4", name: "Aisyah", stars: 1540, level: 8, avatar: "Ais" },
  { id: "lb5", name: "Zidan", stars: 1210, level: 7, avatar: "Zidan" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);
  
  // Mix current player into leaderboard for demo
  const allPlayers = [...GLOBAL_LEADERBOARD];
  if (currentProfile) {
    const exists = allPlayers.find(p => p.name === currentProfile.name);
    if (!exists) {
        allPlayers.push({
            id: currentProfile.id,
            name: currentProfile.name,
            stars: currentProfile.stars,
            level: Math.floor(currentProfile.stars / 30) + 1,
            avatar: currentProfile.avatar
        });
    }
  }
  
  // Sort by stars
  const sortedPlayers = allPlayers.sort((a, b) => b.stars - a.stars);

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <GameHeader 
        title="Papan Peringkat" 
        currentLevel={0} 
        totalLevels={0} 
      />

      {/* Podium for Top 3 */}
      <div className="grid grid-cols-3 items-end gap-2 pt-12 pb-8">
        {/* 2nd Place */}
        <div className="flex flex-col items-center gap-3">
             <Avatar className="size-16 border-4 border-black shadow-neo-sm bg-white">
                <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${sortedPlayers[1]?.avatar}`} />
                <AvatarFallback>{sortedPlayers[1]?.name[0]}</AvatarFallback>
             </Avatar>
             <div className="h-24 w-full bg-secondary border-4 border-black shadow-neo flex flex-col items-center justify-center -mb-2 z-10">
                <Medal className="size-8 text-black fill-white/20" />
                <span className="font-black text-xs uppercase">#2</span>
             </div>
             <NeoText variant="body" className="font-black text-[10px] uppercase text-center truncate w-full">{sortedPlayers[1]?.name}</NeoText>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center gap-3 scale-110 -translate-y-4">
             <div className="relative">
                <Trophy className="absolute -top-6 -right-6 size-10 text-accent rotate-12 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" />
                <Avatar className="size-20 border-4 border-primary shadow-neo bg-white">
                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${sortedPlayers[0]?.avatar}`} />
                    <AvatarFallback>{sortedPlayers[0]?.name[0]}</AvatarFallback>
                </Avatar>
             </div>
             <div className="h-32 w-full bg-primary border-4 border-black shadow-neo flex flex-col items-center justify-center -mb-2 z-10">
                <Award className="size-10 text-white fill-accent/20" />
                <span className="font-black text-xs uppercase text-white font-outline-black">#1</span>
             </div>
             <NeoText variant="body" className="font-black text-[10px] uppercase text-center truncate w-full">{sortedPlayers[0]?.name}</NeoText>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center gap-3">
             <Avatar className="size-14 border-4 border-black shadow-neo-sm bg-white">
                <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${sortedPlayers[2]?.avatar}`} />
                <AvatarFallback>{sortedPlayers[2]?.name[0]}</AvatarFallback>
             </Avatar>
             <div className="h-20 w-full bg-accent border-4 border-black shadow-neo flex flex-col items-center justify-center -mb-2 z-10">
                <Medal className="size-6 text-black fill-white/20" />
                <span className="font-black text-xs uppercase">#3</span>
             </div>
             <NeoText variant="body" className="font-black text-[10px] uppercase text-center truncate w-full">{sortedPlayers[2]?.name}</NeoText>
        </div>
      </div>

      {/* List for others */}
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
           <Card 
            key={player.id} 
            className={cn(
                "border-4 border-black shadow-neo-sm transition-all overflow-hidden",
                player.name === currentProfile?.name ? "bg-primary/10 border-primary shadow-neo" : "bg-card"
            )}
           >
             <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="font-black text-xl w-6">#{index + 1}</span>
                    <Avatar className="size-10 border-2 border-black">
                        <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${player.avatar}`} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <NeoText variant="subtitle" className="text-sm font-black uppercase italic leading-none">{player.name}</NeoText>
                        <NeoText variant="body" className="text-[10px] uppercase font-bold opacity-40">Level {player.level}</NeoText>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-accent border-2 border-black rounded-lg shadow-neo-sm">
                    <span className="font-black text-xs">{player.stars}</span>
                    <Star className="size-3 fill-white text-white" />
                </div>
             </CardContent>
           </Card>
        ))}
      </div>
    </div>
  );
}
