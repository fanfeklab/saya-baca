import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function GalleryDemoPage() {
  const photos = [
    "https://images.unsplash.com/photo-1549488344-c1ab8082f4aa?auto=format&fit=crop&q=80&w=600&h=800",
    "https://images.unsplash.com/photo-1582046944610-d8ab1fbc2bf6?auto=format&fit=crop&q=80&w=800&h=500",
    "https://images.unsplash.com/photo-1506452589578-8313c41a4a15?auto=format&fit=crop&q=80&w=500&h=500",
    "https://images.unsplash.com/photo-1577903492723-1d011933b934?auto=format&fit=crop&q=80&w=500&h=800",
    "https://images.unsplash.com/photo-1517409249767-17ed489955fa?auto=format&fit=crop&q=80&w=800&h=600",
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Gallery Grid</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komposisi tata letak untuk menampilkan koleksi gambar, trofi, atau karya seni dalam mode masonry atau grid.
        </NeoText>
      </div>

      <ComponentPreview
        title="Bento Grid Layout"
        description="Layout asimetris bergaya bento box yang modern dan menggemaskan."
        code={`<div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px]">
  <div className="col-span-2 row-span-2 relative ..."><Image /></div>
  <div className="col-span-1 row-span-1 relative ..."><Image /></div>
  <div className="col-span-1 row-span-2 relative ..."><Image /></div>
  <div className="col-span-1 row-span-1 relative ..."><Image /></div>
  <div className="col-span-2 row-span-1 relative ..."><Image /></div>
</div>`}
      >
        <div className="w-full max-w-3xl border-4 border-border rounded-3xl shadow-neo p-4 bg-muted">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 auto-rows-[120px] sm:auto-rows-[160px]">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden border-4 border-border shadow-neo-sm group">
              <Image src={photos[0]} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden border-4 border-border shadow-neo-sm group bg-accent">
              <Image src={photos[1]} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden border-4 border-border shadow-neo-sm group">
              <Image src={photos[3]} alt="Gallery 4" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden border-4 border-border shadow-neo-sm group bg-secondary">
              <Image src={photos[2]} alt="Gallery 3" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="col-span-2 sm:col-span-3 row-span-1 relative rounded-2xl overflow-hidden border-4 border-border shadow-neo-sm group bg-primary">
              <Image src={photos[4]} alt="Gallery 5" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
