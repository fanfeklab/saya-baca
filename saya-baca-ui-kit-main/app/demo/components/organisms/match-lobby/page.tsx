"use client";

import { useState } from 'react';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from '@/components/ui/avatar';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';

export default function MatchLobbyDemoPage() {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedPlayerId, setCopiedPlayerId] = useState<string | null>(null);

  const roomCode = "XR-99ZV";

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const players = [
    { id: '1', name: 'Budi (Kamu)', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=P1&backgroundColor=c0aede', isReady: true, isHost: true },
    { id: '2', name: 'Siti', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=P2&backgroundColor=ffd5dc', isReady: true, isHost: false },
    { id: '3', name: 'Tono', avatar: 'https://api.dicebear.com/9.x/bottts/svg?seed=P3&backgroundColor=b6e3f4', isReady: false, isHost: false },
    { id: '4', name: 'Menunggu...', avatar: '', isReady: false, isHost: false, isEmpty: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Match & Lobby</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Antarmuka untuk sistem multiplayer, mengatur ruang pertandingan, membagikan kode undangan, dan menampilkan layar konfrontasi (Versus).
        </NeoText>
      </div>

      <ComponentPreview
        title="Room Lobby & Invite"
        description="Ruang tunggu untuk pemain sebelum pertandingan dimulai dengan QR Code dan nomor ruangan."
        code={`<div className="bg-card p-6 rounded-3xl border-4 border-border shadow-neo">
  <QRCodeSVG value="https://example.com/join" size={150} />
  <div className="flex gap-2">
    <span className="font-bold text-2xl tracking-widest">{roomCode}</span>
    <Button size="icon"><Copy /></Button>
  </div>
</div>`}
      >
        <div className="w-full max-w-3xl flex flex-col md:flex-row gap-6 items-start">
          
          {/* Main Lobby Area */}
          <Card className="flex-1 bg-card rounded-3xl border-4 border-border shadow-neo overflow-hidden">
            <div className="bg-muted p-4 border-b-4 border-border flex items-center justify-between">
              <NeoText variant="h3">Ruang Tunggu</NeoText>
              <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-sm border-2 border-border shadow-neo-sm">
                3/4 Pemain
              </span>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {players.map((p, i) => (
                  <div key={i} className={`flex items-center p-3 rounded-2xl border-4 border-border shadow-neo-sm ${p.isEmpty ? 'bg-muted border-dashed opacity-70' : 'bg-card'}`}>
                    <Avatar className="size-12 border-2 border-border bg-white shrink-0 mr-3">
                      {p.avatar ? <AvatarImage src={p.avatar} /> : null}
                      <AvatarFallback className="bg-muted text-muted-foreground rounded-full border-0">?</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{p.name}</p>
                      {!p.isEmpty && (
                        <p className={`text-xs font-black uppercase tracking-wider ${p.isReady ? 'text-success' : 'text-warning'}`}>
                          {p.isReady ? 'SUDAH SIAP' : 'BELUM SIAP'}
                        </p>
                      )}
                    </div>
                    {p.isHost && (
                      <div className="ml-2 text-xl" title="Host">👑</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Button variant="outline" className="h-14 flex-1 text-lg rounded-2xl">Batal</Button>
                <Button variant="default" className="h-14 flex-1 text-lg rounded-2xl">Mulai Game</Button>
              </div>
            </CardContent>
          </Card>

          {/* Invitation Area */}
          <Card className="w-full md:w-64 shrink-0 bg-[#ffd5dc] rounded-3xl border-4 border-border shadow-neo overflow-hidden flex flex-col items-center p-6 text-center">
            <NeoText variant="h4" className="mb-4">Undang Teman</NeoText>
            
            <div className="p-4 bg-white rounded-2xl border-4 border-border shadow-neo-sm mb-6">
               <QRCodeSVG value={`https://ais-play.test/join/${roomCode}`} size={140} fgColor="#000" bgColor="#fff" level="Q" />
            </div>

            <p className="font-bold text-sm mb-2 opacity-80 uppercase tracking-widest">KODE RUANGAN</p>
            <div className="flex items-center justify-between bg-white w-full rounded-xl border-4 border-border shadow-neo-sm px-4 py-2">
              <span className="font-black text-2xl tracking-[0.2em]">{roomCode}</span>
              <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-muted" onClick={handleCopy}>
                {isCopied ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
              </Button>
            </div>
          </Card>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Versus Stinger (P1 vs P2)"
        description="Layar konfrontasi dramatis yang muncul sebelum pertandingan dimulai."
        code={`<div className="flex bg-zinc-900 border-4 border-border overflow-hidden">
  <div className="bg-rose-500 clip-path-slant-right text-white">Player 1</div>
  <div className="absolute center">VS</div>
  <div className="bg-sky-500 text-white">Player 2</div>
</div>`}
      >
        <div className="w-full max-w-3xl aspect-[21/9] relative rounded-3xl border-4 border-border shadow-neo overflow-hidden bg-zinc-900 flex group cursor-pointer">
          {/* Player 1 Side */}
          <div className="absolute inset-y-0 left-0 w-[55%] bg-rose-500 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)] flex items-center justify-center transition-transform group-hover:scale-105 duration-700">
            <div className="flex flex-col items-center pr-12">
              <Avatar className="size-24 sm:size-32 border-4 border-border bg-white shadow-neo">
                <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Red&backgroundColor=ffe4e6" />
              </Avatar>
              <h2 className="text-white font-black text-2xl sm:text-4xl uppercase mt-4 [text-shadow:_4px_4px_0_#000]">RED TEAM</h2>
            </div>
          </div>
          
          {/* Player 2 Side */}
          <div className="absolute inset-y-0 right-0 w-[55%] bg-sky-500 [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)] flex items-center justify-center transition-transform group-hover:scale-105 duration-700 delay-75">
            <div className="flex flex-col items-center pl-12">
              <Avatar className="size-24 sm:size-32 border-4 border-border bg-white shadow-neo">
                <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Blue&backgroundColor=e0f2fe" />
              </Avatar>
              <h2 className="text-white font-black text-2xl sm:text-4xl uppercase mt-4 [text-shadow:_4px_4px_0_#000]">BLUE TEAM</h2>
            </div>
          </div>

          {/* VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-in zoom-in spin-in-12 duration-500 delay-300">
            <div className="bg-warning text-warning-foreground size-20 sm:size-28 rounded-full border-8 border-zinc-900 shadow-neo flex items-center justify-center transform rotate-12">
              <span className="font-black text-3xl sm:text-5xl italic tracking-tighter">VS</span>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
