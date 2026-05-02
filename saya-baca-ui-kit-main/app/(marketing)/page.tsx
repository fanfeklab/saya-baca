import Link from 'next/link';
import { ThemeToggle } from '@/components/atoms/theme-toggle';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <nav className="w-full p-6 flex justify-between items-center z-20 relative">
        <div className="font-bold text-xl tracking-tight bg-background/80 px-3 py-1 rounded-lg border-2 border-border shadow-neo backdrop-blur-sm">
          <span>Saya Baca - UI Kit</span>
        </div>
        <ThemeToggle />
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-6 z-10 w-full max-w-5xl mx-auto space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
            Petualangan <br/> <span className="text-primary italic">Saya Baca</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground bg-background/90 p-4 rounded-xl border-2 border-border shadow-neo max-w-2xl mx-auto backdrop-blur-sm">
            Platform edukasi anak usia dini yang didesain dengan prinsip Neobrutalism yang ceria, interaktif, dan penuh petualangan.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <Link href="/demo/examples/login" className="w-full sm:w-auto px-8 py-5 border-4 border-border shadow-neo bg-accent text-accent-foreground text-xl font-black rounded-2xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-neo-lg active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-200">
              Demo Aplikasi Utama
            </Link>
            <div className="flex gap-4">
              <Link href="/demo/components" className="px-6 py-4 border-2 border-border shadow-neo bg-card font-bold rounded-xl hover:-translate-y-1 transition-all">
                UI Kit Docs
              </Link>
              <Link href="/dashboard" className="px-6 py-4 border-2 border-border shadow-neo bg-secondary text-secondary-foreground font-bold rounded-xl hover:-translate-y-1 transition-all">
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full p-6 text-center text-sm font-bold opacity-80 z-10">
        &copy; 2026 Fanfek Tech Lab
      </footer>
    </div>
  );
}
