'use client';

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { AdminSidebar } from '@/components/organisms/admin-sidebar';

export default function AdminPanelsDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Admin Panels</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen tata letak khusus untuk dashboard admin/orang tua yang membutuhkan navigasi yang lebih kompleks.
        </NeoText>
      </div>

      <ComponentPreview
        title="Admin Sidebar"
        description="Sidebar untuk desktop dan sheet untuk mobile di dashboard."
        code={`import { AdminSidebar } from "@/components/organisms/admin-sidebar"

<div className="hidden md:flex w-64 border-r-2 h-screen">
  <AdminSidebar />
</div>`}
        centered={false}
      >
        <div className="w-full flex border-4 border-dashed rounded-xl overflow-hidden pointer-events-none relative h-[500px] bg-background">
           <div className="w-64 border-r-2 h-full bg-card">
              <AdminSidebar />
           </div>
           <div className="p-8 flex items-center justify-center h-full text-muted-foreground font-bold italic flex-1">
             Area Konten Admin
           </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
