'use client';

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Star } from 'lucide-react';

export default function SocialDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Social & Profiles</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen organism untuk merender profil pengguna, leaderboard, atau status siswa.
        </NeoText>
      </div>

      <ComponentPreview
        title="Leaderboard Item"
        description="Baris leaderboard untuk menampilkan skor antar siswa."
        code={`<div className="flex items-center justify-between p-4 bg-card border-2 border-border shadow-neo rounded-xl">
  <div className="flex items-center gap-4">
    <div className="font-bold text-lg w-6">1</div>
    <Avatar>
      <AvatarImage src="/avatar.png" />
      <AvatarFallback>B</AvatarFallback>
    </Avatar>
    <div className="font-bold">Budi</div>
  </div>
  <div className="flex items-center gap-1 text-yellow-500 font-bold">
    <Star className="w-5 h-5 fill-current" /> 450
  </div>
</div>`}
      >
        <div className="w-full max-w-md space-y-3">
          {[
            { rank: 1, name: "Budi", score: 450, icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
            { rank: 2, name: "Siti", score: 410, icon: <Medal className="w-6 h-6 text-slate-300" /> },
            { rank: 3, name: "Andi", score: 390, icon: <Medal className="w-6 h-6 text-amber-600" /> },
            { rank: 4, name: "Ani", score: 250, icon: null },
          ].map((item) => (
             <div key={item.rank} className="flex items-center justify-between p-4 bg-card border-2 border-border shadow-[2px_2px_0_0_#000000] rounded-xl hover:translate-x-1 hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-4">
                  <div className="font-bold text-lg w-6 flex items-center justify-center">
                    {item.icon ? item.icon : item.rank}
                  </div>
                  <Avatar className="w-10 h-10 border-2 border-black">
                    <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${item.name}`} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="font-bold">{item.name}</div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="w-5 h-5 fill-current" /> {item.score}
                </div>
              </div>
          ))}
        </div>
      </ComponentPreview>
    </div>
  );
}
