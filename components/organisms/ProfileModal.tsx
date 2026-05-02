'use client';

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/atoms/dialog';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/avatar';
import { useProfile, ChildProfile } from '@/hooks/useProfile';
import { Plus, Check, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const AVATARS = [
  'Bima', 'Sari', 'Kancil', 'Gajah', 'Zebra', 'Jerapah'
];

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { profiles, activeProfile, selectProfile, createProfile } = useProfile();
  const [view, setView] = React.useState<'select' | 'create'>(profiles.length === 0 ? 'create' : 'select');
  const [name, setName] = React.useState('');
  const [selectedAvatar, setSelectedAvatar] = React.useState(AVATARS[0]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (profiles.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView('create');
    }
  }, [profiles.length]);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      await createProfile(name, selectedAvatar);
      setName('');
      setView('select');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md neo-border rounded-[2.5rem] p-8">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl font-black uppercase text-center">
            {view === 'select' ? 'SIAPA YANG BELAJAR?' : 'TAMBAH PROFIL BARU'}
          </DialogTitle>
          <DialogDescription className="text-center font-bold italic text-foreground/60">
            {view === 'select' ? 'Pilih profilmu untuk lanjut bertualang!' : 'Buat profil untuk si kecil.'}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {view === 'select' ? (
            <motion.div 
              key="select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              {profiles.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    selectProfile(p.id);
                    onOpenChange(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-3 p-4 rounded-3xl neo-border transition-all group",
                    activeProfile?.id === p.id ? "bg-yellow-400 neo-shadow" : "bg-card hover:bg-yellow-50"
                  )}
                >
                  <Avatar className="h-16 w-16 neo-border group-hover:scale-110 transition-transform">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.avatar}`} />
                    <AvatarFallback>{p.displayName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-heading font-black truncate w-full uppercase text-sm">{p.displayName}</span>
                  {activeProfile?.id === p.id && <Check className="size-4" />}
                </button>
              ))}
              <button
                onClick={() => setView('create')}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-3xl neo-border border-dashed bg-white hover:bg-muted transition-all font-heading font-black text-xs uppercase"
              >
                <div className="h-16 w-16 rounded-full border-2 border-dashed border-foreground flex items-center justify-center">
                  <Plus />
                </div>
                TAMBAH PROFIL
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="create"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 mt-6"
            >
              <div className="space-y-4">
                <label className="font-heading font-black text-sm uppercase">Pilih Avatar</label>
                <div className="grid grid-cols-3 gap-3">
                  {AVATARS.map((av) => (
                    <button
                      key={av}
                      onClick={() => setSelectedAvatar(av)}
                      className={cn(
                        "relative p-2 rounded-2xl neo-border transition-all",
                        selectedAvatar === av ? "bg-yellow-400 neo-shadow" : "bg-white hover:bg-yellow-50"
                      )}
                    >
                      <Avatar className="h-12 w-12 mx-auto">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${av}`} />
                      </Avatar>
                      {selectedAvatar === av && (
                        <div className="absolute -top-2 -right-2 bg-foreground text-background rounded-full p-1">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-heading font-black text-sm uppercase">Nama Panggilan</label>
                <Input 
                  placeholder="Contoh: Bima" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl neo-border font-bold"
                  maxLength={12}
                />
              </div>

              <div className="flex gap-3 pt-4">
                {profiles.length > 0 && (
                  <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setView('select')}>
                    BATAL
                  </Button>
                )}
                <Button 
                  className="flex-1 h-12 rounded-xl bg-foreground text-white font-black"
                  onClick={handleCreate}
                  disabled={!name.trim() || isSubmitting}
                >
                  <UserPlus className="mr-2" size={18} />
                  {isSubmitting ? 'MENYIMPAN...' : 'SIMPAN'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
