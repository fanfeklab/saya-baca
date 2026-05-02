import { NeoText } from '@/components/atoms/neo-text';

export default function TypographyDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <NeoText variant="title">Typography (NeoText)</NeoText>
      <NeoText variant="body" className="text-muted-foreground">
        Komponen atom <code>NeoText</code> adalah komponen pembungkus sentral untuk semua typography. 
        Mendukung berbagai semantic tags dan variasi style out-of-the-box.
      </NeoText>

      <section className="space-y-6">
        <NeoText variant="subtitle">Headings</NeoText>
        <div className="flex flex-col gap-8 p-10 border-4 border-black shadow-neo rounded-3xl bg-secondary overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 scale-150 pointer-events-none">
            <NeoText variant="title" className="text-8xl">Aa</NeoText>
          </div>
          <div className="relative z-10 transition-transform hover:translate-x-2">
            <NeoText variant="title" className="text-6xl sm:text-8xl leading-none">JUDUL BESAR</NeoText>
            <p className="text-xs font-black uppercase tracking-tighter mt-4 text-secondary-foreground/60 border-l-4 border-black pl-3 ml-1">Display XL / .text-8xl</p>
          </div>
          <div className="relative z-10 transition-transform hover:translate-x-2">
            <NeoText variant="title" stroke className="text-5xl text-yellow-300">OUTLINE STROKE</NeoText>
            <p className="text-xs font-black uppercase tracking-tighter mt-4 text-secondary-foreground/60 border-l-4 border-black pl-3 ml-1">stroke prop / .text-5xl</p>
          </div>
          <div className="relative z-10 transition-transform hover:translate-x-2">
            <NeoText variant="subtitle" className="text-3xl font-black">SUB-JUDUL KEREN</NeoText>
            <p className="text-xs font-black uppercase tracking-tighter mt-4 text-secondary-foreground/60 border-l-4 border-black pl-3 ml-1">variant=&quot;subtitle&quot; / .text-3xl</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <NeoText variant="subtitle">Body Text Patterns</NeoText>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 border-4 border-black shadow-neo rounded-2xl bg-card">
            <NeoText variant="body" className="text-lg leading-relaxed">
              Ini adalah <strong>Body Text</strong> standar. Font yang digunakan adalah Inter, dirancang untuk keterbacaan tinggi di berbagai ukuran layar.
            </NeoText>
            <div className="mt-6 flex items-center gap-2">
              <div className="size-3 bg-primary rounded-full border-2 border-black" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Standard Body</span>
            </div>
          </div>

          <div className="p-8 border-4 border-black shadow-neo rounded-2xl bg-accent text-accent-foreground">
            <NeoText variant="body" className="text-lg leading-relaxed font-bold italic">
              &quot;Kancil berlari sangat cepat melewati sungai yang jernih.&quot;
            </NeoText>
            <div className="mt-6 flex items-center gap-2">
              <div className="size-3 bg-white rounded-full border-2 border-black" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Storytelling Style</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
