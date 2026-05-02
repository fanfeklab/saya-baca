'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/avatar';
import { Button } from '@/components/atoms/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Input } from '@/components/atoms/input';

export default function NewProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { createProfile } = useProfile();
  
  const [name, setName] = useState('');
  const [seeds, setSeeds] = useState<string[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const generateSeeds = () => {
    const newSeeds = Array.from({length: 6}, () => Math.random().toString(36).substring(7));
    setSeeds(newSeeds);
    setSelectedSeed(newSeeds[0]);
  };

  useEffect(() => {
    generateSeeds();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !selectedSeed) return;
    
    setIsSubmitting(true);
    try {
      await createProfile(name.trim(), selectedSeed);
      router.push('/profiles');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) return null;

  return (
    <main className="min-h-screen grid-bg bg-background flex flex-col p-6 relative">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => router.push('/profiles')} 
        className="absolute top-6 left-6 rounded-full neo-border bg-card h-12 w-12 z-20"
      >
        <ArrowLeft className="size-6" />
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full z-10 z-[11]">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-card rounded-[2rem] neo-border neo-shadow-lg p-6 sm:p-8 space-y-8"
        >
          <div className="text-center space-y-1">
            <h1 className="font-heading font-black text-3xl uppercase">Profil Baru</h1>
            <p className="font-sans font-bold text-foreground/60 text-sm">Ayo buat karakter petualangmu!</p>
          </div>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-3">
              <label className="font-heading font-black text-lg uppercase block text-center">Nama Panggilan</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Misal: Budi"
                className="text-center font-heading font-black text-2xl h-14 neo-border uppercase"
                maxLength={12}
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-heading font-black text-lg uppercase block">Pilih Avatar</label>
                <Button type="button" variant="ghost" size="sm" onClick={generateSeeds} className="neo-border rounded-xl font-bold bg-muted h-8 px-3">
                  <RefreshCw className="size-4 mr-2" /> Acak
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {seeds.map(seed => (
                  <div 
                    key={seed} 
                    onClick={() => setSelectedSeed(seed)}
                    className={`cursor-pointer aspect-square rounded-2xl flex items-center justify-center transition-all duration-200 border-4 ${
                      selectedSeed === seed 
                        ? 'border-foreground bg-yellow-100 dark:bg-yellow-900/40 scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]' 
                        : 'border-transparent bg-muted scale-95 opacity-70 hover:opacity-100 hover:scale-100'
                    }`}
                  >
                     <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} />
                        <AvatarFallback>BT</AvatarFallback>
                     </Avatar>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl font-heading font-black text-xl tracking-wider hover:bg-yellow-400 bg-yellow-300 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
              disabled={isSubmitting || !name.trim() || !selectedSeed}
            >
              {isSubmitting ? 'MENYIMPAN...' : 'SIMPAN PROFIL'}
            </Button>
          </form>

        </motion.div>
      </div>

    </main>
  );
}
