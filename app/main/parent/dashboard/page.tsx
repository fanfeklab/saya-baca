'use client';

import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { TopBar } from '@/components/organisms/TopBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { LogOut, ArrowLeft, Users, Settings, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/atoms/avatar';
import { signOut } from '@/lib/auth';
import { PinPad } from '@/components/molecules/PinPad';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ParentDashboard() {
  const { profiles, loading: profileLoading } = useProfile();
  const { user, loading: authLoading, isParentAuthenticated, verifyParentPin } = useAuth();
  const router = useRouter();
  const [pinError, setPinError] = React.useState<string | undefined>();

  const handleVerify = async (pin: string) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'accounts', user.uid);
      const userDoc = await getDoc(userRef);
      const savedPin = userDoc.data()?.parentPin;

      if (pin === savedPin) {
        verifyParentPin(true);
        setPinError(undefined);
      } else {
        setPinError("PIN SALAH");
      }
    } catch (e) {
      setPinError("GANGGUAN SERVER");
    }
  };

  if (authLoading || profileLoading) {
    return <div className="p-12 text-center font-heading font-black">MEMUAT...</div>;
  }

  if (!isParentAuthenticated) {
    return (
      <main className="min-h-screen relative z-10 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <PinPad 
            onComplete={handleVerify} 
            title="VERIFIKASI ORANG TUA" 
            error={pinError} 
          />
          <div className="mt-8 text-center">
            <Button variant="link" onClick={() => router.push('/main/home')} className="font-bold underline uppercase">
              Balik ke Halaman Utama
            </Button>
          </div>
        </div>
      </main>
    );
  }
  const progressData = profiles.map(p => ({
    name: p.displayName,
    xp: p.totalXp,
    level: p.currentLevel
  }));

  const activityData = [
    { day: 'Sen', rate: 45 },
    { day: 'Sel', rate: 52 },
    { day: 'Rab', rate: 38 },
    { day: 'Kam', rate: 65 },
    { day: 'Jum', rate: 48 },
    { day: 'Sab', rate: 70 },
    { day: 'Min', rate: 60 },
  ];

  return (
    <main className="min-h-screen bg-muted pt-24 sm:pt-32 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <TopBar />
      
      <div className="space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-4xl font-black text-foreground uppercase tracking-tight">Parent Dashboard</h1>
            <p className="font-sans font-bold text-foreground/60 italic">Pantau perkembangan si kecil di sini.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/main/home')} className="rounded-xl flex gap-2">
              <ArrowLeft size={18} /> BALIK KE BELAJAR
            </Button>
            <Button variant="destructive" onClick={() => signOut()} className="rounded-xl">
               <LogOut size={18} />
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card neo-border neo-shadow">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                 <Users size={16} /> Total Profil
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black font-heading">{profiles.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white neo-border neo-shadow">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                 <TrendingUp size={16} /> Total XP
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black font-heading">
                {profiles.reduce((acc, p) => acc + p.totalXp, 0)}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white neo-border neo-shadow">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                 <Settings size={16} /> Status Akun
               </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-black font-heading text-green-500 uppercase">Premium Aktif</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white neo-border neo-shadow">
             <CardHeader>
               <CardTitle className="font-heading font-black">XP PER PROFIL</CardTitle>
             </CardHeader>
             <CardContent className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={progressData}>
                   <XAxis dataKey="name" stroke="#000" fontWeight="bold" />
                   <YAxis stroke="#000" />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#fff', border: '2px solid #000' }}
                     itemStyle={{ fontWeight: 'bold' }}
                   />
                   <Bar dataKey="xp" fill="#FDE047" stroke="#000" strokeWidth={2} />
                 </BarChart>
               </ResponsiveContainer>
             </CardContent>
          </Card>

          <Card className="bg-white neo-border neo-shadow">
             <CardHeader>
               <CardTitle className="font-heading font-black">AKTIVITAS MINGGUAN</CardTitle>
             </CardHeader>
             <CardContent className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={activityData}>
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="day" fontWeight="bold" />
                   <YAxis />
                   <Tooltip />
                   <Line type="monotone" dataKey="rate" stroke="#000" strokeWidth={4} dot={{ r: 6, fill: '#FDE047', stroke: '#000', strokeWidth: 2 }} />
                 </LineChart>
               </ResponsiveContainer>
             </CardContent>
          </Card>
        </div>

        {/* Profiles Manage */}
        <Card className="bg-white neo-border neo-shadow">
          <CardHeader>
            <CardTitle className="font-heading font-black uppercase">Manajemen Profil</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {profiles.map(p => (
                 <div key={p.id} className="flex items-center justify-between p-4 neo-border bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 neo-border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.avatar}`} />
                        <AvatarFallback>{p.displayName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-black font-heading uppercase">{p.displayName}</div>
                        <div className="text-xs font-bold text-foreground/60 uppercase">LEVEL {p.currentLevel} • {p.totalXp} XP</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl font-bold">EDIT</Button>
                 </div>
               ))}
               <Button variant="default" className="w-full h-14 rounded-2xl bg-yellow-400 font-black flex items-center gap-2">
                 <Users size={20} /> TAMBAH PROFIL ANAK
               </Button>
             </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
