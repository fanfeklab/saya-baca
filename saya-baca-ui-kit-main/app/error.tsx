'use client';

import { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NeoText } from '@/components/atoms/neo-text';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error ke sistem pelacakan APM (seperti Sentry/LogRocket)
    console.error('Error terdeteksi oleh Error Boundary:', error?.message || String(error));
  }, [error]);

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-destructive/20 bg-destructive/5 text-center">
        <CardHeader className="flex flex-col items-center pt-8">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-xl flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl">Ups! Terjadi Kesalahan</CardTitle>
        </CardHeader>
        <CardContent>
          <NeoText variant="body" className="text-sm text-foreground/80 mb-4">
            Komponen ini gagal dimuat karena ada kesalahan teknis pada sistem.
          </NeoText>
          
          {/* Environment check untuk Dev Mode, biasanya di Prod error message asli disembunyikan */}
          {process.env.NODE_ENV === 'development' && (
             <div className="text-left bg-black text-white p-3 rounded text-xs font-mono overflow-auto max-h-32 mb-4">
                {error.message || 'Unknown error'}
             </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <Button onClick={reset} variant="default" className="shadow-neo">
            Muat Ulang Halaman
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
