"use client";

import React from "react";
import { NeoText } from "@/components/atoms/neo-text";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Volume2, 
  VolumeX, 
  Clock, 
  Type, 
  ShieldCheck,
  Smartphone,
  Save,
  CheckCircle2
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const settings = useStore(useAppStore, (state) => state.settings);
  const updateSettings = useAppStore((state) => state.updateSettings);
  const resetData = useAppStore((state) => state.resetData);
  const router = useRouter();

  const [localSettings, setLocalSettings] = React.useState<any>(null);

  // Initialize local state from settings once it's available
  if (settings && !localSettings) {
    setLocalSettings(settings);
  }

  const handleSave = () => {
    if (localSettings) {
      updateSettings(localSettings);
      toast.success("Pengaturan Berhasil Disimpan", {
        icon: <CheckCircle2 className="size-5 text-success" />
      });
    }
  };

  const handleResetPin = () => {
    if (confirm("Apakah Anda yakin ingin mengatur ulang PIN? Anda akan diminta membuat PIN baru saat masuk Area Orang Tua berikutnya.")) {
        updateSettings({ parentPin: null });
        toast.success("PIN telah diatur ulang");
        router.push("/select-profile");
    }
  };

  const handleResetData = () => {
    if (confirm("PERINGATAN: Seluruh data profil, bintang, dan pengaturan akan dihapus secara permanen. Lanjutkan?")) {
        resetData();
        toast.success("Seluruh data telah dihapus");
        router.push("/select-profile");
    }
  };

  if (!localSettings) return null;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="space-y-1">
            <NeoText variant="title" stroke className="text-4xl md:text-5xl italic uppercase leading-none">PENGATURAN</NeoText>
            <NeoText variant="body" className="text-muted-foreground font-black uppercase tracking-[0.2em] text-[10px]">Kontrol Aplikasi & Keamanan</NeoText>
         </div>
         <Button 
            onClick={handleSave}
            className="h-14 px-8 border-4 border-black shadow-neo hover:shadow-none transition-all bg-primary text-white font-black uppercase tracking-widest"
          >
            <Save className="size-5 mr-3" /> Simpan Perubahan
          </Button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Timer Control */}
        <Card className="border-4 border-black shadow-neo overflow-hidden bg-card">
            <CardHeader className="border-b-4 border-black p-6 bg-accent/10">
                <CardTitle className="flex items-center gap-3">
                    <Clock className="size-6" />
                    <NeoText variant="subtitle" stroke className="text-xl uppercase italic">Batas Waktu Belajar</NeoText>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <NeoText variant="body" className="opacity-60 text-sm">Setel berapa lama anak bisa bermain sebelum aplikasi terkunci.</NeoText>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[0, 20, 30, 45, 60].map((time) => (
                        <Button
                            key={time}
                            variant={localSettings.studyTimer === time ? "default" : "outline"}
                            className={cn(
                                "h-16 border-2 border-black font-black text-lg shadow-neo-sm hover:shadow-neo transition-all",
                                localSettings.studyTimer === time ? "bg-primary text-white" : "bg-background"
                            )}
                            onClick={() => setLocalSettings({...localSettings, studyTimer: time})}
                        >
                            {time === 0 ? "OFF" : `${time}m`}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Learning Experience */}
        <Card className="border-4 border-black shadow-neo overflow-hidden bg-card">
            <CardHeader className="border-b-4 border-black p-6 bg-secondary/10">
                <CardTitle className="flex items-center gap-3">
                    <Type className="size-6" />
                    <NeoText variant="subtitle" stroke className="text-xl uppercase italic">Pengalaman Belajar</NeoText>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between p-4 border-2 border-black rounded-2xl bg-muted/20">
                    <div className="flex gap-4 items-center">
                        <div className="size-10 bg-success border-2 border-black shadow-neo-sm rotate-3 flex items-center justify-center">
                             {localSettings.isTTSEnabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
                        </div>
                        <div>
                            <NeoText variant="body" className="font-black uppercase text-sm">Suara Pembaca (TTS)</NeoText>
                            <NeoText variant="body" className="text-[10px] opacity-40 uppercase">Bacakan soal dan instruksi otomatis</NeoText>
                        </div>
                    </div>
                    <Switch 
                        checked={localSettings.isTTSEnabled}
                        onCheckedChange={(val) => setLocalSettings({...localSettings, isTTSEnabled: val})}
                        className="data-[state=checked]:bg-success border-2 border-black"
                    />
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-black rounded-2xl bg-muted/20">
                    <div className="flex gap-4 items-center">
                        <div className="size-10 bg-accent border-2 border-black shadow-neo-sm -rotate-3 flex items-center justify-center">
                             <Type className="size-5" />
                        </div>
                        <div>
                            <NeoText variant="body" className="font-black uppercase text-sm">Hanya Huruf Kapital</NeoText>
                            <NeoText variant="body" className="text-[10px] opacity-40 uppercase">Gunakan ABC daripada abc</NeoText>
                        </div>
                    </div>
                    <Switch 
                         checked={localSettings.isUppercaseOnly}
                         onCheckedChange={(val) => setLocalSettings({...localSettings, isUppercaseOnly: val})}
                         className="data-[state=checked]:bg-accent border-2 border-black"
                    />
                </div>

                <div className="flex items-center justify-between p-4 border-2 border-black rounded-2xl bg-muted/20">
                    <div className="flex gap-4 items-center">
                        <div className="size-10 bg-primary border-2 border-black shadow-neo-sm rotate-2 flex items-center justify-center text-white">
                             <span className="font-black text-xl">A</span>
                        </div>
                        <div>
                            <NeoText variant="body" className="font-black uppercase text-sm">Ukuran Teks Besar</NeoText>
                            <NeoText variant="body" className="text-[10px] opacity-40 uppercase">Memudahkan anak yang baru belajar</NeoText>
                        </div>
                    </div>
                    <Switch 
                        checked={localSettings.textSize === 'large'}
                        onCheckedChange={(val) => setLocalSettings({...localSettings, textSize: val ? 'large' : 'normal'})}
                        className="data-[state=checked]:bg-primary border-2 border-black"
                    />
                </div>
            </CardContent>
        </Card>

        {/* Security & System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="border-4 border-black shadow-neo overflow-hidden bg-card">
                <CardHeader className="border-b-4 border-black p-6">
                    <CardTitle className="flex items-center gap-3">
                        <ShieldCheck className="size-6" />
                        <NeoText variant="subtitle" stroke className="text-lg uppercase italic">Ganti PIN</NeoText>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                     <NeoText variant="body" className="text-xs opacity-60 mb-4">Ubah 4 digit kode akses orang tua.</NeoText>
                     <Button 
                        variant="outline" 
                        onClick={handleResetPin}
                        className="w-full border-2 border-black font-black uppercase text-xs shadow-neo-sm"
                    >
                        Update PIN Keamanan
                    </Button>
                </CardContent>
             </Card>

             <Card className="border-4 border-black shadow-neo overflow-hidden bg-card">
                <CardHeader className="border-b-4 border-black p-6">
                    <CardTitle className="flex items-center gap-3">
                        <Smartphone className="size-6" />
                        <NeoText variant="subtitle" stroke className="text-lg uppercase italic">Data & Sesi</NeoText>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                     <NeoText variant="body" className="text-xs opacity-60 mb-4">Kosongkan semua data progress belajar.</NeoText>
                     <Button 
                        variant="destructive" 
                        onClick={handleResetData}
                        className="w-full border-2 border-black font-black uppercase text-xs shadow-neo-sm"
                    >
                        Reset Seluruh Data
                    </Button>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
