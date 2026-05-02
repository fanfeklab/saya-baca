import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

interface TopAppBarProps {
  userName?: string;
  level?: number;
  stars?: number;
  avatarSeed?: string;
}

export function TopAppBar({ 
  userName = "Budi", 
  level = 3, 
  stars = 1250, 
  avatarSeed = "Felix" 
}: TopAppBarProps) {
  return (
    <header className="w-full flex items-center justify-between p-2 pl-3 bg-card border-2 border-black shadow-neo rounded-2xl">
      <div className="flex items-center gap-3">
        <Avatar className="w-9 h-9 border-2 border-black shadow-neo-sm bg-background">
          <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${avatarSeed}`} alt="Avatar Anak" />
          <AvatarFallback>KID</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <span className="font-black text-[11px] leading-none uppercase tracking-tighter">Halo, {userName}!</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Badge variant="accent" className="text-[9px] px-1.5 py-0 h-3.5 shadow-none border border-border font-black uppercase">
              Lv {level}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 h-9 px-3 bg-yellow-400 rounded-xl border-2 border-black shadow-neo-sm">
          <Star className="w-4 h-4 fill-black text-black stroke-black stroke-[3px]" />
          <span className="font-black text-xs text-black">{stars.toLocaleString('id-ID')}</span>
        </div>
        <ThemeToggle className="h-9 w-9 border-2 border-black" />
      </div>
    </header>
  );
}
