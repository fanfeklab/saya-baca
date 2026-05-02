import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { BackgroundOrchestra } from '@/components/background-orchestra';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Saya Baca - App',
  description: 'Aplikasi edukasi anak TK dengan gamifikasi dan fitur orang tua.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <BackgroundOrchestra />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
