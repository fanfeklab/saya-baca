"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

export function AdminTopbar() {
  const pathname = usePathname();
  
  // Format pathname to friendly title
  const segments = pathname?.split('/').filter(Boolean) || [];
  const activeSegment = segments[segments.length - 1] || 'dashboard';
  const title = activeSegment.charAt(0).toUpperCase() + activeSegment.slice(1);

  return (
    <header className="h-16 border-b-2 border-border flex items-center px-6 mx-auto w-full justify-between bg-card shrink-0">
      <div className="font-bold md:hidden">Saya Baca ERP</div>
      <div className="font-bold hidden md:block text-lg">{title} Overview</div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex items-center gap-2">
          <div className="hidden text-right md:block">
            <div className="text-sm font-bold">Admin System</div>
            <div className="text-[10px] text-muted-foreground uppercase font-bold">Super User</div>
          </div>
          <Avatar className="w-9 h-9 border-2 border-border">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
