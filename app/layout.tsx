import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Comic_Neue, Geist } from 'next/font/google';
import './globals.css';
import { TTSProvider } from '@/hooks/useTTS';
import { AuthProvider } from '@/hooks/useAuth';
import { ProfileProvider } from '@/hooks/useProfile';
import { ProgressProvider } from '@/hooks/useProgress';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-comic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SAYA BACA - Belajar Membaca Menyenangkan',
  description: 'Aplikasi belajar membaca interaktif untuk anak PAUD/TK.',
};

import { ThemeProvider } from '@/components/providers/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${spaceGrotesk.variable} ${comicNeue.variable} antialiased min-h-screen relative`}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-100" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ProfileProvider>
              <ProgressProvider>
                <TTSProvider>
                  {children}
                </TTSProvider>
              </ProgressProvider>
            </ProfileProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
