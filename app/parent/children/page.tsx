"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Plus, 
  Edit2, 
  Play, 
  Trash2,
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ChildrenProfilePage() {
  const router = useRouter();
  const profiles = useStore(useAppStore, (state) => state.profiles) || [];
  const setCurrentProfile = useAppStore(state => state.setCurrentProfile);
  
  const [newName, setNewName] = React.useState("");
  const [newAge, setNewAge] = React.useState("5");

  const handleAddChild = () => {
    // In a real app we'd add to store, for now we just show the idea
    setNewName("");
  };

  const handleSelectChild = (profile: any) => {
    setCurrentProfile(profile);
    router.push('/main/learn');
  };

  return (
    <div className="max-w-6xl mx-auto w-full space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <NeoText variant="title" stroke className="text-4xl md:text-5xl italic uppercase leading-none">KELOLA PROFIL</NeoText>
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Atur Profil dan Kemajuan Belajar</NeoText>
         </div>
         
         <Dialog>
            <DialogTrigger asChild>
                <Button className="h-16 px-8 text-lg font-black uppercase tracking-widest border-4 border-black shadow-neo hover:shadow-neo-lg active:shadow-none transition-all text-black bg-accent">
                    <Plus className="size-6 mr-3" /> Tambah Anak
                </Button>
            </DialogTrigger>
            <DialogContent className="border-4 border-black shadow-neo-lg p-8">
                <DialogHeader>
                    <DialogTitle>
                        <NeoText variant="subtitle" stroke className="uppercase italic">Tambah Petualang Baru</NeoText>
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="font-black uppercase tracking-widest text-[10px]">Nama Panggilan</label>
                        <Input 
                            value={newName} 
                            onChange={e => setNewName(e.target.value)}
                            className="h-12 border-2 border-black rounded-xl font-bold" 
                            placeholder="Contoh: Budi"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="font-black uppercase tracking-widest text-[10px]">Umur (Tahun)</label>
                        <Input 
                            type="number"
                            value={newAge} 
                            onChange={e => setNewAge(e.target.value)}
                            className="h-12 border-2 border-black rounded-xl font-bold" 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAddChild} className="w-full h-14 border-2 border-black font-black uppercase shadow-neo hover:shadow-none transition-all">
                        Simpan Profil
                    </Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {profiles.map((profile) => (
          <Card key={profile.id} className="border-4 border-black shadow-neo-lg overflow-hidden group">
            <div className="h-32 bg-primary/20 border-b-4 border-black relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
               <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="outline" size="icon" className="size-10 bg-background border-2 border-black shadow-neo-sm hover:shadow-neo transition-all">
                    <Settings className="size-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="size-10 bg-background border-2 border-black shadow-neo-sm hover:shadow-neo transition-all">
                    <Edit2 className="size-5" />
                  </Button>
               </div>
            </div>
            
            <CardContent className="p-8 pt-0 relative">
               <div className="flex justify-between items-end mb-6">
                  <div className="-mt-12 relative z-10">
                     <Avatar className="size-28 border-4 border-black shadow-neo bg-white">
                        <AvatarImage src={`https://api.dicebear.com/7.x/${profile.avatarStyle}/svg?seed=${profile.avatar}`} />
                        <AvatarFallback>{profile.name[0]}</AvatarFallback>
                     </Avatar>
                     <div className="absolute -bottom-2 -right-2 bg-accent text-black text-xs font-black size-10 flex items-center justify-center rounded-full border-4 border-black shadow-neo-sm rotate-12">
                        Lv 4
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 text-secondary border-2 border-secondary rounded-xl font-black text-[10px] uppercase tracking-tighter">
                     <Users className="size-4" /> Profil Aktif
                  </div>
               </div>

               <div className="space-y-4">
                  <div>
                     <NeoText variant="subtitle" stroke className="text-3xl uppercase italic leading-none">{profile.name}</NeoText>
                     <NeoText variant="body" className="text-xs font-black uppercase tracking-widest opacity-40 mt-1">
                        {profile.age} Tahun • Mode Normal
                     </NeoText>
                  </div>

                  <div className="p-4 bg-muted/30 border-2 border-black rounded-2xl space-y-3">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span>{profile.stars} ⭐ Bintang</span>
                        <span className="text-primary">Misi: {profile.completedMissions.length}</span>
                     </div>
                     <div className="w-full h-4 bg-background border-2 border-black rounded-full overflow-hidden shadow-[inset_2px_2px_0_0_rgba(0,0,0,0.1)]">
                        <div className="h-full bg-primary border-r-2 border-black" style={{ width: '65%' }} />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <Button 
                        variant="outline" 
                        className="h-14 border-2 border-black font-black uppercase text-xs shadow-neo-sm hover:shadow-neo transition-all"
                        onClick={() => router.push('/parent/reports')}
                    >
                        Statistik
                    </Button>
                     <Button 
                        className="h-14 border-2 border-black font-black uppercase text-xs shadow-neo-sm hover:shadow-neo transition-all flex gap-2"
                        onClick={() => handleSelectChild(profile)}
                    >
                        <Play className="size-4 fill-current" /> Main Sekarang
                    </Button>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
