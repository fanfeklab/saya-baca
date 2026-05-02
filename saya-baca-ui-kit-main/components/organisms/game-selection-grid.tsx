import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { NeoText } from "@/components/atoms/neo-text";
import { BookOpen, Shapes, Music, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";

const GAMES = [
  {
    id: "membaca",
    title: "Membaca",
    href: "/game/membaca",
    icon: BookOpen,
    variant: "accent",
    styles: "bg-accent border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "berhitung",
    title: "Berhitung",
    href: "/game/berhitung",
    icon: Shapes,
    variant: "success",
    styles: "bg-success border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "menyanyi",
    title: "Menyanyi",
    href: "/game/menyanyi",
    icon: Music,
    variant: "secondary",
    styles: "bg-secondary border-black shadow-neo hover:shadow-neo-lg text-black",
    iconWrapper: "bg-white",
  },
  {
    id: "mewarnai",
    title: "Mewarnai",
    href: "/game/mewarnai",
    icon: Paintbrush,
    variant: "primary",
    styles: "bg-primary border-black shadow-neo hover:shadow-neo-lg text-white",
    iconWrapper: "bg-white",
  },
];

export function GameSelectionGrid() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {GAMES.map((game) => {
        const Icon = game.icon;
        return (
          <Link 
            key={game.id} 
            href={game.href} 
            className="block outline-none focus-visible:ring-4 ring-ring rounded-xl"
          >
            <Card className={cn(
               "h-full transition-all cursor-pointer hover:-translate-y-1 hover:-translate-x-1 active:translate-y-0 active:translate-x-0 active:shadow-none py-6",
               game.styles
            )}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-4">
                <div className={cn("p-4 rounded-2xl border-2 border-border shadow-neo-sm", game.iconWrapper)}>
                  <Icon className="w-10 h-10 text-black" strokeWidth={2.5} />
                </div>
                <NeoText variant="body" className="font-black text-xl tracking-wide uppercase">{game.title}</NeoText>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
