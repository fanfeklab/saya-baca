import { NeoText } from '@/components/atoms/neo-text';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/form-field';
import Link from 'next/link';
import { LogIn, ArrowLeft, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* App Branding Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl border-2 border-black shadow-neo mb-2">
          <LogIn className="w-8 h-8 text-primary-foreground" />
        </div>
        <NeoText variant="title" stroke as="h1" className="text-5xl mb-2">SAYA BACA</NeoText>
        <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Portal Belajar Menyenangkan</NeoText>
      </div>

      <Card className="w-full border-2 border-black shadow-neo-lg bg-card translate-y-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            Masuk Akun
          </CardTitle>
          <NeoText variant="body" className="text-muted-foreground font-medium">
            Siapkan dirimu untuk petualangan baru hari ini.
          </NeoText>
        </CardHeader>
        
        <CardContent className="space-y-5 pt-4">
          <FormField 
            label="Email atau Nama Pengguna" 
            placeholder="Masukkan email kamu..." 
            className="group-hover:border-primary transition-colors"
          />
          <FormField 
            label="Kata Sandi" 
            type="password" 
            placeholder="••••••••" 
          />
          
          <div className="flex justify-end">
            <Link href="#" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
              Lupa Password?
            </Link>
          </div>

          <Link href="/select-profile" passHref className="w-full block pt-2">
            <Button variant="default" className="w-full h-14 text-lg font-black group shadow-neo hover:shadow-neo-lg transition-all text-black">
              Mulai Petualangan
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 py-6 border-t-2 bg-muted/30">
          <NeoText variant="body" className="text-sm text-center text-muted-foreground">
            Belum punya akun? <Link href="#" className="text-secondary font-black hover:underline">Daftar Sekarang</Link>
          </NeoText>
          
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground/60 hover:text-foreground transition-colors mx-auto">
            <ArrowLeft className="w-3 h-3" />
            Kembali ke Beranda
          </Link>
        </CardFooter>
      </Card>

      {/* Trust Badges / Footer Info */}
      <div className="flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        <div className="text-[10px] font-black tracking-widest uppercase">Safe For Kids</div>
        <div className="text-[10px] font-black tracking-widest uppercase">Certified Edu</div>
        <div className="text-[10px] font-black tracking-widest uppercase">Privacy First</div>
      </div>
    </div>
  );
}
