import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { NeoText } from "@/components/atoms/neo-text";
import { BookOpen, Shapes, Music, Paintbrush, Languages, Type } from "lucide-react";
import { cn } from "@/lib/utils";

const GAMES = [
  {
    id: "abjad",
    title: "Abjad",
    href: "/main/games/abjad",
    icon: Type,
    variant: "primary",
    styles: "bg-primary border-2 border-black shadow-neo hover:shadow-neo-lg text-white",
    iconWrapper: "bg-white",
  },
  {
    id: "suku-kata",
    title: "Suku Kata",
    href: "/main/games/suku-kata",
    icon: Languages,
    variant: "secondary",
    styles: "bg-secondary border-2 border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "membaca",
    title: "Membaca",
    href: "/main/games/membaca",
    icon: BookOpen,
    variant: "accent",
    styles: "bg-accent border-2 border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "berhitung",
    title: "Berhitung",
    href: "/main/games/berhitung",
    icon: Shapes,
    variant: "success",
    styles: "bg-success border-2 border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "menyanyi",
    title: "Menyanyi",
    href: "/main/games/menyanyi",
    icon: Music,
    variant: "secondary",
    styles: "bg-secondary border-2 border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "mewarnai",
    title: "Mewarnai",
    href: "/main/games/mewarnai",
    icon: Paintbrush,
    variant: "primary",
    styles: "bg-primary border-2 border-black shadow-neo hover:shadow-neo-lg text-white",
    iconWrapper: "bg-white",
  },
];

export function GameSelectionGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      {GAMES.map((game) => {
        const Icon = game.icon;
        return (
          <Link 
            key={game.id} 
            href={game.href} 
            className="block outline-none active:scale-95 transition-transform"
          >
            <Card className={cn(
               "h-48 transition-all cursor-pointer border-4 border-black shadow-neo-sm hover:shadow-neo active:shadow-none flex flex-col items-center justify-center text-center p-4",
               game.styles
            )}>
                <div className={cn("size-16 rounded-2xl border-4 border-black shadow-neo-sm flex items-center justify-center mb-4 transition-transform group-hover:scale-110", game.iconWrapper)}>
                   <Icon className="w-8 h-8 text-black" strokeWidth={3} />
                </div>
                <NeoText variant="body" className="font-black text-lg tracking-wide uppercase italic leading-tight">{game.title}</NeoText>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
