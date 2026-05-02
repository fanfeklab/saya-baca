import { NeoText } from "@/components/atoms/neo-text";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col p-4 items-center justify-center min-h-[60vh] text-center gap-4">
      <div className="text-6xl">🚧</div>
      <NeoText variant="title">Segera Hadir</NeoText>
      <NeoText variant="body" className="text-muted-foreground">
        Halaman ini masih dalam tahap purwarupa dan akan segera dibuat.
      </NeoText>
    </div>
  );
}
