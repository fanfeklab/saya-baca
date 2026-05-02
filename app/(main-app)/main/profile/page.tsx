"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/molecules/form-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";

import { GameHeader } from "@/components/molecules/game-header";

export default function ProfilPage() {
  const router = useRouter();
  const currentProfile = useStore(useAppStore, (state) => state.currentProfile);
  const updateProfile = useAppStore(state => state.updateProfile);
  
  const [seed, setSeed] = React.useState("Felix");
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (currentProfile && !initialized.current) {
      setSeed(currentProfile.avatar);
      setName(currentProfile.name);
      setAge(currentProfile.age.toString());
      initialized.current = true;
    }
  }, [currentProfile]);

  const handleSave = () => {
    if (currentProfile) {
      updateProfile(currentProfile.id, {
        name,
        age: parseInt(age) || 5,
        avatar: seed
      });
      toast.success("Profil berhasil disimpan!", {
          className: "border-4 border-black shadow-neo font-black rounded-2xl",
      });
    }
  };

  const randomizeAvatar = () => {
    const seeds = ["Felix", "Luna", "Milo", "Bella", "Charlie", "Lucy", "Max", "Daisy"];
    setSeed(seeds[Math.floor(Math.random() * seeds.length)]);
  };

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header */}
      <GameHeader title="PENGATURAN PROFIL" currentLevel={0} totalLevels={0} />

      <Card className="border-4 border-black shadow-neo-lg bg-card overflow-visible rounded-3xl">
        <CardContent className="p-8 flex flex-col gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 relative">
             <div className="relative group">
               <Avatar className="w-40 h-40 border-4 border-black shadow-neo bg-background transition-transform group-hover:scale-105 rounded-3xl">
                  <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`} alt="Avatar" />
                  <AvatarFallback className="font-black text-2xl">KID</AvatarFallback>
               </Avatar>
               <Button 
                variant="accent" 
                size="icon" 
                onClick={randomizeAvatar} 
                className="absolute -bottom-2 -right-2 h-14 w-14 rounded-2xl shadow-neo-sm hover:shadow-neo active:shadow-none border-4 border-black"
               >
                 <RefreshCw className="w-6 h-6" strokeWidth={3} />
               </Button>
             </div>
             <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Ketuk tombol pink untuk ganti karakter</NeoText>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
                <NeoText variant="body" className="font-black uppercase tracking-widest text-[10px] ml-1">Nama Panggilan</NeoText>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-14 px-6 rounded-2xl border-4 border-black bg-background font-black text-lg focus:shadow-neo shadow-neo-sm outline-none transition-all placeholder:opacity-30"
                    placeholder="Masukkan nama..."
                />
            </div>
            <div className="space-y-2">
                <NeoText variant="body" className="font-black uppercase tracking-widest text-[10px] ml-1">Umur Petualang (Tahun)</NeoText>
                <input 
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full h-14 px-6 rounded-2xl border-4 border-black bg-background font-black text-lg focus:shadow-neo shadow-neo-sm outline-none transition-all"
                />
            </div>
          </div>

          <Button variant="default" className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-neo hover:shadow-neo-lg active:shadow-none transition-all mt-4 border-4 border-black text-black rounded-2xl" onClick={handleSave}>
            <Save className="w-6 h-6 mr-3" strokeWidth={3} /> Simpan Perubahan
          </Button>

        </CardContent>
      </Card>
      
      <Button 
        variant="ghost" 
        className="w-full h-14 text-destructive font-black uppercase tracking-widest hover:bg-destructive/10 rounded-2xl" 
        onClick={() => router.push('/login')}
      >
        Keluar Dari Akun
      </Button>

    </div>
  );
}
