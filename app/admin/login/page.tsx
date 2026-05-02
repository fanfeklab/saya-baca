'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/atoms/button';
import { Database } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function AdminLoginPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [user, isAdmin, router]);

  const handleAdminLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Logic for isAdmin check is already inside useAuth hook via onAuthStateChanged
    } catch (error) {
      console.error("Admin login failed:", error);
      alert("Gagal masuk. Pastikan Anda memiliki akses administrator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card p-10 rounded-[2.5rem] neo-border neo-shadow-lg space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-yellow-100 border-4 border-yellow-500 rounded-full flex items-center justify-center mx-auto">
            <Database size={40} className="text-yellow-600" />
          </div>
          <h1 className="font-heading text-3xl font-black text-foreground uppercase">Sistem Admin</h1>
          <p className="font-sans text-foreground/60 font-bold italic">
            Hanya untuk personel terdaftar.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            variant="neo"
            className="w-full h-16 bg-yellow-400 group" 
            onClick={handleAdminLogin}
            disabled={loading}
          >
            {loading ? "MEMPROSES..." : "MASUK DENGAN GOOGLE"}
          </Button>
          
          <Button 
            variant="ghost"
            onClick={() => router.push('/')}
            className="w-full font-bold text-foreground/40 hover:text-foreground"
          >
            KEMBALI KE BERANDA
          </Button>
        </div>

        {user && !isAdmin && (
          <div className="p-4 bg-red-100 border-2 border-red-500 rounded-2xl">
            <p className="text-xs font-black text-red-600 uppercase text-center">
              Maaf, akun Anda ({user.email}) tidak memiliki hak akses Admin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
