"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, FileText, Image as ImageIcon, Music, Shapes } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CONTENTS = [
  { id: 1, title: "Singa yang Pemberani", type: "Cerita", status: "Published", author: "Bapak Guru", icon: FileText, bg: "bg-success/20", color: "text-success" },
  { id: 2, title: "Belajar Angka 1-10", type: "Math", status: "Draft", author: "Sistem", icon: Shapes, bg: "bg-accent/20", color: "text-accent" },
  { id: 3, title: "Bintang Kecil", type: "Karaoke", status: "Published", author: "Ibu Guru", icon: Music, bg: "bg-secondary/20", color: "text-secondary" },
  { id: 4, title: "Mewarnai Pemandangan", type: "Art", status: "Published", author: "Sistem", icon: ImageIcon, bg: "bg-primary/20", color: "text-primary" },
];

export default function ContentPage() {
  return (
    <div className="space-y-6 flex flex-col w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold">Curriculum / Content</h1>
           <p className="text-sm text-muted-foreground mt-1">Kelola semua konten modul dari cerita hingga game.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="default">
            <Plus className="w-5 h-5 mr-2" />
            Buat Konten Baru
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {CONTENTS.map((content) => {
           const Icon = content.icon;
           return (
             <Card key={content.id} className="border-2 shadow-[4px_4px_0_0_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000000] transition-all cursor-pointer">
               <CardContent className="p-5 flex flex-col h-full">
                 <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl border-2 border-border shadow-[2px_2px_0_0_#000000] ${content.bg}`}>
                      <Icon className={`w-6 h-6 ${content.color}`} />
                    </div>
                    <Badge variant={content.status === 'Published' ? 'success' : 'secondary'} className="shadow-none rounded-md px-2 py-0">
                      {content.status}
                    </Badge>
                 </div>
                 
                 <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-2">{content.title}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase">{content.type}</p>
                 </div>

                 <div className="mt-4 pt-4 border-t-2 border-dashed border-border text-xs font-medium flex justify-between items-center text-muted-foreground">
                    <span>By: {content.author}</span>
                 </div>
               </CardContent>
             </Card>
           )
        })}
      </div>
    </div>
  );
}
