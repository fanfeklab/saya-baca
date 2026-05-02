'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeoText } from '@/components/atoms/neo-text';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, UserCircle2, ArrowRight, Dice5, ShieldAlert } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { FormField } from '@/components/molecules/form-field';
import { cn } from '@/lib/utils';

interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
}

const INITIAL_PROFILES: ChildProfile[] = [
  { id: '1', name: 'Budi Purnama', avatar: 'adventurer/svg?seed=Felix', level: 5 },
  { id: '2', name: 'Ani', avatar: 'adventurer/svg?seed=Sasha', level: 2 },
  { id: '3', name: 'Iwan', avatar: 'adventurer/svg?seed=Iwan', level: 3 },
];

export default function SelectProfilePage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<ChildProfile[]>(INITIAL_PROFILES);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('Felix');
  const [avatarStyle, setAvatarStyle] = useState('adventurer');

  const AVATAR_STYLES = ['adventurer', 'notionists', 'pixel-art', 'open-peeps', 'big-smile'];

  const randomizeAvatar = () => {
    const randomSeeds = ['Felix', 'Sasha', 'Iwan', 'Luna', 'Kiki', 'Milo', 'Zora', 'Bayo'];
    const newSeed = randomSeeds[Math.floor(Math.random() * randomSeeds.length)];
    const newStyle = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
    setSelectedAvatar(newSeed + Math.floor(Math.random() * 100));
    setAvatarStyle(newStyle);
  };

  const handleAddProfile = () => {
    if (!newProfileName) return;
    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      name: newProfileName,
      avatar: `${avatarStyle}/svg?seed=${selectedAvatar}`,
      level: 1,
    };
    setProfiles([...profiles, newProfile]);
    setNewProfileName('');
  };

  const removeProfile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const selectProfile = (profile: ChildProfile) => {
    // Logic to set active profile would go here (e.g., cookie or session)
    router.push('/home');
  };

  const handleBackToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col p-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-2xl mx-auto justify-center">
      <div className="text-center space-y-2 mb-4">
        <NeoText variant="title" stroke className="text-4xl">PILIH PROFIL</NeoText>
        <NeoText variant="body" className="text-muted-foreground font-medium">Siapa yang akan berpetualang hari ini?</NeoText>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {/* Bento Grid Pattern */}
        {profiles.map((profile, index) => (
          <Card 
            key={profile.id}
            onClick={() => selectProfile(profile)}
            className={cn(
              "relative border-2 border-black shadow-neo hover:shadow-neo-lg transition-all cursor-pointer group group active:translate-y-1 active:translate-x-1 active:shadow-none overflow-hidden bg-card",
              index === 0 ? "col-span-2 row-span-2 h-[320px] md:h-[400px]" : "h-[150px] md:h-[190px]"
            )}
          >
            <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center gap-4">
              <Avatar className={cn(
                "border-4 border-border shadow-neo-sm bg-background transition-transform group-hover:scale-110",
                index === 0 ? "size-32 md:size-48" : "size-16 md:size-24"
              )}>
                <AvatarImage src={`https://api.dicebear.com/7.x/${profile.avatar}`} />
                <AvatarFallback>Kid</AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <NeoText variant={index === 0 ? "subtitle" : "body"} className="font-black uppercase tracking-tighter truncate max-w-full">
                  {profile.name}
                </NeoText>
                {index === 0 && (
                   <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-black border-2 border-border">
                     LEVEL {profile.level}
                   </div>
                )}
              </div>

              {/* Manage/Delete button */}
              <button 
                onClick={(e) => removeProfile(profile.id, e)}
                className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity rounded-lg border-2 border-border shadow-neo-sm hover:scale-110"
              >
                <Trash2 className="size-4" />
              </button>
            </CardContent>
          </Card>
        ))}

        {/* Add Profile Card */}
        <Dialog>
          <DialogTrigger 
            nativeButton={true}
            render={
              <button className="w-full h-full text-left outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl transition-all">
                <Card className="h-[150px] md:h-[190px] border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group bg-muted/20">
                  <div className="size-12 rounded-2xl border-2 border-border bg-background flex items-center justify-center shadow-neo-sm group-hover:shadow-neo group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Plus className="size-6" />
                  </div>
                  <NeoText variant="body" className="font-black uppercase tracking-tighter text-muted-foreground group-hover:text-primary">Tambah Anak</NeoText>
                </Card>
              </button>
            } 
          />
          <DialogContent className="sm:max-w-md border-4 shadow-neo bg-card">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Profil Baru</DialogTitle>
              <DialogDescription className="font-medium">
                Tambahkan profil untuk jagoan kecilmu.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <Avatar className="size-32 border-4 border-border shadow-neo bg-background transition-transform">
                    <AvatarImage src={`https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${selectedAvatar}`} />
                    <AvatarFallback>Kid</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    type="button"
                    onClick={randomizeAvatar}
                    className="absolute -bottom-2 -right-2 rounded-xl border-2 shadow-neo-sm hover:shadow-neo active:shadow-none bg-background"
                  >
                    <Dice5 className="size-5" />
                  </Button>
                </div>
                <NeoText variant="body" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Sentuh Dadu untuk Random Avatar</NeoText>
              </div>

              <FormField 
                label="Nama Panggilan" 
                placeholder="Contoh: Budi" 
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="default" className="w-full text-lg font-black h-14" onClick={handleAddProfile}>
                Simpan Profil <ArrowRight className="ml-2 size-5" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col items-center gap-2 mt-4">
        <Button 
          variant="outline" 
          className="w-full max-w-xs border-2 border-black font-black uppercase tracking-tighter shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all h-12 bg-accent text-accent-foreground"
          onClick={() => router.push('/parent-pin')}
        >
          <ShieldAlert className="mr-2 size-5" /> Area Orang Tua
        </Button>
        <Button variant="ghost" className="text-muted-foreground font-black uppercase tracking-wider text-[10px] hover:bg-accent/10" onClick={handleBackToLogin}>
          Ganti Akun Orang Tua
        </Button>
      </div>
    </div>
  );
}
