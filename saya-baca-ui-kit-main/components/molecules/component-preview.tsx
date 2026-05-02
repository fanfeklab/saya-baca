'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/atom-dark';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

SyntaxHighlighter.registerLanguage('tsx', tsx);

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  code: string;
  children: React.ReactNode;
  centered?: boolean;
}

export function ComponentPreview({ title, description, code, children, centered = true }: ComponentPreviewProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 my-10">
      {(title || description) && (
        <div className="space-y-1 mb-4">
          {title && <h3 className="font-heading mt-8 scroll-m-20 text-2xl font-black tracking-tight">{title}</h3>}
          {description && <p className="text-muted-foreground text-base max-w-[85%]">{description}</p>}
        </div>
      )}
      <Tabs defaultValue="preview" className="relative w-full">
        <TabsList className="w-full max-w-[400px] flex rounded-2xl border-4 border-border bg-muted p-1 mb-6">
          <TabsTrigger 
            value="preview" 
            className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2.5 font-bold transition-all data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-2 data-[state=active]:border-border data-[state=active]:shadow-neo-sm text-sm"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger 
            value="code" 
            className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2.5 font-bold transition-all data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:border-2 data-[state=active]:border-border data-[state=active]:shadow-neo-sm text-sm"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-0 outline-none">
          <div className="min-h-[350px] w-full rounded-3xl border-4 border-border bg-card shadow-neo p-10 flex flex-col overflow-hidden relative group">
             <div className="absolute inset-0 z-0 pointer-events-none opacity-5 dark:opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
             <div className={`w-full h-full flex flex-col gap-6 flex-1 z-10 ${centered ? 'items-center justify-center' : 'items-start justify-start'}`}>
                {children}
             </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0 outline-none relative">
          <div className="rounded-3xl overflow-hidden border-4 border-border bg-[#1f2937] shadow-neo flex flex-col">
            {/* Mac OS Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-gray-800">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                 <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                 <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
               </div>
               <div className="text-xs text-gray-400 font-mono">example.tsx</div>
               <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-white/10"
                  onClick={copyToClipboard}
               >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
               </Button>
            </div>
            
            <SyntaxHighlighter 
              language="tsx" 
              style={prism}
              customStyle={{ 
                margin: 0, 
                padding: '1.5rem', 
                fontSize: '0.875rem', 
                background: 'transparent',
                lineHeight: '1.6'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
