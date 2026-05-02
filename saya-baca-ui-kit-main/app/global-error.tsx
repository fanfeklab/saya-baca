'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NeoText } from '@/components/atoms/neo-text';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Di level enterprise, error ini dikirim ke layanan monitoring (Sentry / Datadog)
    console.error('Terjadi kesalahan level global:', error?.message || String(error));
  }, [error]);

  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
          <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <NeoText variant="title" className="mb-2">Aplikasi Mengalami Kendala</NeoText>
          <NeoText variant="body" className="text-muted-foreground max-w-md mb-8">
            Terjadi kesalahan teknis yang tidak terduga. Kami telah mencatat insiden ini untuk segera diperbaiki.
          </NeoText>
          <div className="flex gap-4">
            <Button onClick={() => reset()} variant="default" className="shadow-neo">
              Coba Muat Ulang
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
