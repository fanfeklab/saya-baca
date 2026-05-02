import { NeoText } from '@/components/atoms/neo-text';
import { Card, CardContent } from '@/components/ui/card';

export default function DemoIntroductionPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-16">
      <div className="bg-success p-10 md:p-14 rounded-3xl border-4 border-border shadow-[8px_8px_0_0_var(--color-border)] relative overflow-hidden">
        {/* Decorative Grid SVG */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-border) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-5xl md:text-6xl font-black text-success-foreground tracking-tight drop-shadow-[2px_2px_0_rgba(255,255,255,0.5)] lg:drop-shadow-[4px_4px_0_rgba(255,255,255,0.8)]">
            UI Kit Showcase
          </h1>
          <p className="text-xl md:text-2xl font-bold text-success-foreground/80 max-w-2xl leading-relaxed">
            Kumpulan komponen UI untuk aplikasi edukasi. Eksplorasi berdasarkan struktur Atomic Design melalui sidebar.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-2xl border-4 border-border shadow-[4px_4px_0_0_var(--color-border)] rotate-[-1deg] hover:rotate-0 transition-transform">
          <NeoText variant="subtitle" className="text-2xl font-black mb-4">🎨 Filosofi Desain</NeoText>
          <NeoText variant="body" className="text-lg font-medium text-muted-foreground leading-relaxed">
            Dirancang khusus dengan estetika <strong>Neo-Brutalism</strong> yang playful: border hitam tebal, warna solid menyala, dan bayangan tajam yang tidak kabur.
          </NeoText>
        </div>
        
        <div className="bg-secondary p-8 rounded-2xl border-4 border-border shadow-[4px_4px_0_0_var(--color-border)] rotate-[1deg] hover:rotate-0 transition-transform">
          <NeoText variant="subtitle" className="text-2xl font-black mb-4 text-secondary-foreground">📱 Responsif</NeoText>
          <NeoText variant="body" className="text-lg font-medium text-secondary-foreground/80 leading-relaxed">
            <strong>Mobile-first experience</strong>. Komponen dipastikan nyaman ditekan pada layar sentuh anak, namun tetap terstruktur baik pada layar desktop besar.
          </NeoText>
        </div>
      </div>
    </div>
  );
}
