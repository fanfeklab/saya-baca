"use client";

import { Button } from "@/components/ui/button";
import { Chrome, Github, Facebook, Twitter, Apple } from "lucide-react";
import { NeoText } from "@/components/atoms/neo-text";

export function AuthSocial() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Button 
        variant="outline" 
        className="h-14 rounded-2xl border-4 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all text-lg font-black gap-3 bg-card text-foreground hover:bg-muted"
        onClick={() => {}}
      >
        <div className="flex items-center justify-center bg-white px-2 py-1 rounded">
          <span className="text-blue-500 font-black">G</span>
          <span className="text-red-500 font-black">o</span>
          <span className="text-amber-500 font-black">o</span>
          <span className="text-blue-500 font-black">g</span>
          <span className="text-green-500 font-black">l</span>
          <span className="text-red-500 font-black">e</span>
        </div>
        Login dengan Google
      </Button>

      <Button 
        variant="outline" 
        className="h-14 rounded-2xl border-4 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all text-lg font-black gap-3 bg-card text-foreground hover:bg-muted"
        onClick={() => {}}
      >
        <Apple className="size-6" />
        Lanjutkan dengan Apple
      </Button>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          title="Facebook"
          className="h-14 flex-1 rounded-2xl border-4 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all bg-[#1877F2] text-white hover:bg-[#1877F2]/90 hover:text-white"
          onClick={() => {}}
        >
          <Facebook className="size-6 fill-current" />
        </Button>
        <Button 
          variant="outline" 
          title="X (Twitter)"
          className="h-14 flex-1 rounded-2xl border-4 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all bg-card text-foreground hover:bg-muted"
          onClick={() => {}}
        >
          <Twitter className="size-6 fill-current" />
        </Button>
        <Button 
          variant="outline" 
          title="Github"
          className="h-14 flex-1 rounded-2xl border-4 border-border shadow-neo-sm hover:shadow-neo hover:-translate-y-1 transition-all bg-[#24292e] text-white hover:bg-[#24292e]/90 hover:text-white"
          onClick={() => {}}
        >
          <Github className="size-6" />
        </Button>
      </div>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-4 border-border border-dashed" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 font-black text-muted-foreground">Atau pakai email</span>
        </div>
      </div>
    </div>
  );
}
