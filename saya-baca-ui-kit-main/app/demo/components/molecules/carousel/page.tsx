import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function CarouselDemoPage() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1549488344-c1ab8082f4aa?auto=format&fit=crop&q=80&w=800&h=600', alt: 'Gambar 1' },
    { src: 'https://images.unsplash.com/photo-1506452589578-8313c41a4a15?auto=format&fit=crop&q=80&w=800&h=600', alt: 'Gambar 2' },
    { src: 'https://images.unsplash.com/photo-1577903492723-1d011933b934?auto=format&fit=crop&q=80&w=800&h=600', alt: 'Gambar 3' },
    { src: 'https://images.unsplash.com/photo-1582046944610-d8ab1fbc2bf6?auto=format&fit=crop&q=80&w=800&h=600', alt: 'Gambar 4' },
    { src: 'https://images.unsplash.com/photo-1517409249767-17ed489955fa?auto=format&fit=crop&q=80&w=800&h=600', alt: 'Gambar 5' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Carousel</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen untuk menampilkan galeri atau daftar item yang dapat digeser.
        </NeoText>
      </div>

      <ComponentPreview
        title="Image Carousel"
        description="Carousel standar untuk menampilkan gambar secara berurutan dengan neo-brutalism arrow buttons."
        code={`<Carousel className="w-full max-w-lg">
  <CarouselContent>
    {images.map((img, i) => (
      <CarouselItem key={i}>
        <div className="p-1">
          <Card className="border-4 shadow-neo rounded-3xl overflow-hidden">
            <CardContent className="flex p-0 aspect-video relative">
               <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious className="border-4 shadow-neo rounded-2xl hover:translate-y-0 hover:translate-x-0" />
  <CarouselNext className="border-4 shadow-neo rounded-2xl hover:translate-y-0 hover:translate-x-0" />
</Carousel>`}
      >
        <div className="p-10 w-full flex justify-center w-full max-w-2xl mx-auto">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <Card className="border-4 shadow-neo rounded-3xl overflow-hidden group">
                      <CardContent className="flex p-0 aspect-[4/3] relative">
                         <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-multiply"></div>
                         <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-4 shadow-neo rounded-2xl hover:translate-y-0 hover:translate-x-0 bg-secondary active:scale-95" />
            <CarouselNext className="border-4 shadow-neo rounded-2xl hover:translate-y-0 hover:translate-x-0 bg-secondary active:scale-95" />
          </Carousel>
        </div>
      </ComponentPreview>
      
      <ComponentPreview
        title="Multiple Items"
        description="Menampilkan lebih dari satu item sekaligus di layar."
        code={`<Carousel className="w-full max-w-2xl">
  <CarouselContent className="-ml-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <CarouselItem key={i} className="pl-4 basis-1/2 lg:basis-1/3">
        <div className="p-1">
          <Card className="border-2 shadow-neo-sm overflow-hidden bg-accent">
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-3xl font-black text-accent-foreground">{i + 1}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
      >
        <div className="p-10 w-full flex justify-center px-12">
          <Carousel className="w-full max-w-2xl">
            <CarouselContent className="-ml-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem key={i} className="pl-4 basis-1/2 sm:basis-1/3 pt-2 pb-4">
                  <div className="p-1">
                    <Card className="border-4 shadow-neo-sm overflow-hidden bg-accent hover:-translate-y-2 hover:shadow-neo transition-all duration-300">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-6xl font-black text-accent-foreground drop-shadow-md">{i + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-4 shadow-neo rounded-2xl bg-card hover:bg-muted active:scale-95" />
            <CarouselNext className="border-4 shadow-neo rounded-2xl bg-card hover:bg-muted active:scale-95" />
          </Carousel>
        </div>
      </ComponentPreview>
    </div>
  );
}
