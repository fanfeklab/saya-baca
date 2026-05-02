import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/providers';
import { BackgroundOrchestra } from '@/components/background-orchestra';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { DevNavigator } from '@/components/devtools/dev-navigator';
import './globals.css';
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Saya Baca - UI Kit',
  description: 'UI Kit Aplikasi edukasi anak TK dengan gamifikasi dan fitur orang tua.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={cn("font-sans", spaceGrotesk.variable)}>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <BackgroundOrchestra />
            {children}
            <Toaster />
            <DevNavigator />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
