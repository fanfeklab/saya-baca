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

export default function ProfilPage() {
  const router = useRouter();
  const [seed, setSeed] = React.useState("Felix");

  const handleSave = () => {
    toast.success("Profil berhasil disimpan!");
  };

  const randomizeAvatar = () => {
    const seeds = ["Felix", "Luna", "Milo", "Bella", "Charlie", "Lucy", "Max", "Daisy"];
    setSeed(seeds[Math.floor(Math.random() * seeds.length)]);
  };

  return (
    <div className="flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32 max-w-2xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon-sm" 
          onClick={() => router.back()}
          className="rounded-xl shadow-neo-sm hover:shadow-neo active:shadow-none"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <NeoText variant="subtitle" stroke className="text-3xl uppercase tracking-tighter">PENGATURAN PROFIL</NeoText>
      </div>

      <Card className="border-2 shadow-neo-lg bg-card/50 backdrop-blur-sm overflow-visible">
        <CardContent className="p-8 flex flex-col gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 relative">
             <div className="relative group">
               <Avatar className="w-40 h-40 border-4 border-border shadow-neo bg-background transition-transform group-hover:scale-105">
                  <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`} alt="Avatar" />
                  <AvatarFallback className="font-black text-2xl">KID</AvatarFallback>
               </Avatar>
               <Button 
                variant="accent" 
                size="icon" 
                onClick={randomizeAvatar} 
                className="absolute -bottom-2 -right-2 rounded-xl shadow-neo-sm hover:shadow-neo active:shadow-none"
               >
                 <RefreshCw className="w-5 h-5" />
               </Button>
             </div>
             <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-widest text-xs">Pilih Karaktermu</NeoText>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <FormField 
              label="Nama Panggilan" 
              defaultValue="Budi" 
              className="bg-background"
            />
            <FormField 
              label="Umur Petualang (Tahun)" 
              defaultValue="5" 
              type="number" 
              className="bg-background"
            />
          </div>

          <Button variant="default" className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-neo hover:shadow-neo-lg active:shadow-none transition-all mt-4" onClick={handleSave}>
            <Save className="w-6 h-6 mr-2" /> Simpan Perubahan
          </Button>

        </CardContent>
      </Card>
      
      <Button 
        variant="ghost" 
        className="w-full h-12 text-destructive font-black uppercase tracking-widest hover:bg-destructive/10" 
        onClick={() => router.push('/login')}
      >
        Keluar Dari Akun
      </Button>

    </div>
  );
}
