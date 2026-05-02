'use client';

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { BottomNav } from '@/components/molecules/bottom-nav';
import { AdminTopbar } from '@/components/molecules/admin-topbar';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function NavigationDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Navigation Elements</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Sistem navigasi aplikasi seperti topbar, bottom bar, dan breadcrumbs.
        </NeoText>
      </div>

      <ComponentPreview
        title="Bottom Navigation - Default"
        description="Navigasi utama bergaya neobrutalism bentuk card. Umum digunakan di mobile apps anak."
        code={`import { BottomNav } from "@/components/molecules/bottom-nav"

<BottomNav variant="default" />`}
        centered={false}
      >
        <div className="w-full relative h-[180px] bg-muted border-2 flex items-end justify-center pb-8 rounded-xl overflow-hidden shadow-inner">
           <BottomNav variant="default" className="!absolute !bottom-6 !left-0 !right-0 !z-10" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Bottom Navigation - Floating Pill"
        description="Navigasi bergaya pill mengambang, cocok diletakkan di atas kanvas permainan/game."
        code={`import { BottomNav } from "@/components/molecules/bottom-nav"

<BottomNav variant="floating" />`}
        centered={false}
      >
        <div className="w-full relative h-[180px] bg-success/20 border-2 border-border flex items-end justify-center pb-8 rounded-xl overflow-hidden shadow-inner">
           <BottomNav variant="floating" className="!absolute !bottom-8 !left-0 !right-0 !z-10" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Bottom Navigation - Dock"
        description="Navigasi dock penuh yang menempel ke edge bawah layar."
        code={`import { BottomNav } from "@/components/molecules/bottom-nav"

<BottomNav variant="dock" />`}
        centered={false}
      >
        <div className="w-full relative h-[180px] bg-muted border-2 flex items-end justify-center rounded-xl overflow-hidden shadow-inner border-b-0">
           <BottomNav variant="dock" className="!absolute !bottom-0 !left-0 !right-0 !z-10" />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Breadcrumbs"
        description="Digunakan untuk menunjukkan hierarki navigasi pada admin/docs page."
        code={`import { DocsBreadcrumbs } from "@/components/molecules/docs-breadcrumbs"\n\n<DocsBreadcrumbs />`}
      >
        <div className="w-full max-w-sm p-4 bg-card border-2 border-border shadow-neo rounded-xl">
          <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground whitespace-nowrap">
             <span className="hover:text-foreground transition-colors cursor-pointer">Demo</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-4 h-4 shrink-0"><path d="m9 18 6-6-6-6"/></svg>
             <span className="hover:text-foreground transition-colors cursor-pointer">Components</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right w-4 h-4 shrink-0"><path d="m9 18 6-6-6-6"/></svg>
             <span className="font-bold text-foreground truncate">Navigation</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Admin Topbar"
        description="Navigation bar untuk admin dashboard."
        code={`import { AdminTopbar } from "@/components/molecules/admin-topbar"

<header className="border-b-2">
   <AdminTopbar />
</header>`}
        centered={false}
      >
        <div className="w-full border-4 border-dashed rounded-xl overflow-hidden pointer-events-none relative h-[250px]">
           <div className="absolute top-0 w-full left-0">
             <AdminTopbar />
           </div>
           <div className="mt-20 p-8 flex items-center justify-center h-full text-muted-foreground font-bold italic">
             Admin Page Content
           </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Pagination"
        description="Navigasi halaman untuk daftar tabel atau konten panjang."
        code={`import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
      >
        <div className="w-full max-w-lg p-6 bg-card border-4 border-border shadow-neo rounded-2xl">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="hover:bg-muted" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:bg-muted">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" className="hover:bg-muted">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="hover:bg-muted" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </ComponentPreview>

    </div>
  );
}
