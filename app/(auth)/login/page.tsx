import { NeoText } from '@/components/atoms/neo-text';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn, UserCircle, ArrowRight } from 'lucide-react';

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
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Selamat Datang!
          </CardTitle>
          <NeoText variant="body" className="text-muted-foreground font-medium">
            Pilih cara masuk untuk memulai petualangan.
          </NeoText>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-6 pb-8">
          <Button variant="secondary" className="w-full h-16 text-lg font-black shadow-neo hover:shadow-neo-lg transition-all text-black border-2 border-black">
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Masuk dengan Google
          </Button>

          <Link href="/select-profile" passHref className="w-full block">
            <Button variant="outline" className="w-full h-16 text-lg font-black shadow-neo hover:shadow-neo-lg transition-all border-2 border-black">
              <UserCircle className="w-6 h-6 mr-3" />
              Coba Sebagai Tamu
              <ArrowRight className="w-5 h-5 ml-auto" />
            </Button>
          </Link>
        </CardContent>

        <CardFooter className="py-4 border-t-2 bg-muted/30 flex justify-center">
            <div className="text-[10px] font-black tracking-widest uppercase text-muted-foreground/60">
                Aman & Tanpa Password
            </div>
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
