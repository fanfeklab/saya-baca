'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Database } from 'lucide-react';

export default function AdminLoginPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();

  if (isAdmin) {
    router.push('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-3xl neo-border shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-6">
        <div className="text-center space-y-2">
          <Database size={48} className="mx-auto text-yellow-500" />
          <h1 className="font-heading text-2xl font-black uppercase">Admin Login</h1>
          <p className="text-sm text-neoblack/60 font-bold">Autentikasi via Google</p>
        </div>
        <Button 
          className="w-full h-14" 
          onClick={() => {
            // Usually login logic here
            alert("Gunakan Admin Login yang sebenarnya. (Simulasi)");
          }}
        >
          Masuk dengan Akun Admin
        </Button>
      </div>
    </div>
  );
}
