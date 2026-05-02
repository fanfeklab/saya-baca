'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/button';
import { Database, LogOut, FileText } from 'lucide-react';
import { signOut } from '@/lib/auth';

export default function AdminDashboardPage() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div className="p-12 text-center font-heading font-black">MEMUAT...</div>;

  if (!isAdmin) {
    return (
      <div className="p-12 text-center space-y-4">
        <h1 className="font-heading font-black text-2xl text-red-500">AKSES DITOLAK</h1>
        <Button onClick={() => router.push('/main/home')}>Kembali ke Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10 bg-muted">
      <header className="bg-foreground text-background p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database size={24} className="text-yellow-400" />
          <h1 className="font-heading font-black text-xl uppercase tracking-widest">SAYA BACA ADMIN</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => signOut()} className="hover:bg-card/20 text-white rounded-xl">
          <LogOut size={20} />
        </Button>
      </header>

      <main className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl neo-border shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <h2 className="font-heading font-black text-lg mb-2 flex items-center gap-2">
              <FileText size={18}/> Bank Data
            </h2>
            <p className="font-sans text-sm text-foreground/60 font-bold mb-4">Kelola Abjad, Vokal, Kata, dan Kalimat di sini.</p>
            <Button className="w-full">KELOLA KONTEN</Button>
          </div>
          {/* Tambah card lain sesuai kebutuhan admin */}
        </div>
      </main>
    </div>
  );
}
