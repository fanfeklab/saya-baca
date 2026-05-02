import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { PropsTable } from '@/components/molecules/props-table';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar';

export default function AvatarsDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Avatar</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen untuk menampilkan profil pengguna dengan gambar, inisial, status online, dan grup.
        </NeoText>
      </div>

      <ComponentPreview
        title="Avatar Default (Dicebear)"
        description="Avatar menggunakan Dicebear dengan background solid."
        code={`<Avatar className="size-16 border-2 border-border">
  <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Felix&backgroundColor=ffdfbf" />
  <AvatarFallback>FL</AvatarFallback>
</Avatar>`}
      >
        <Avatar className="size-16 border-2 border-border shadow-neo-sm">
          <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Felix&backgroundColor=ffdfbf" />
          <AvatarFallback>FL</AvatarFallback>
        </Avatar>
      </ComponentPreview>

      <ComponentPreview
        title="Online Status Badge"
        description="Avatar dengan indikator status online/aktif."
        code={`<Avatar className="size-16 border-2 border-border">
  <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Max&backgroundColor=c0aede" />
  <AvatarFallback>MX</AvatarFallback>
  <AvatarBadge className="bg-success ring-card size-4 border-2 border-border" />
</Avatar>`}
      >
        <div className="flex gap-4">
          <Avatar className="size-16 border-2 border-border shadow-neo-sm">
            <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Max&backgroundColor=c0aede" />
            <AvatarFallback>MX</AvatarFallback>
            <AvatarBadge className="bg-success ring-card size-4 border-2 border-border" />
          </Avatar>
          <Avatar className="size-16 border-2 border-border shadow-neo-sm">
            <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=Ruby&backgroundColor=b6e3f4" />
            <AvatarFallback>RB</AvatarFallback>
            <AvatarBadge className="bg-destructive ring-card size-4 border-2 border-border" />
          </Avatar>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Avatar Group"
        description="Grup avatar untuk menampilkan banyak pengguna."
        code={`<AvatarGroup className="-space-x-4 hover:space-x-2 transition-all">
  <Avatar className="size-16 border-2 border-border ring-card ring-4 shadow-neo-sm">
    <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=1&backgroundColor=ffd5dc" />
  </Avatar>
  <Avatar className="size-16 border-2 border-border ring-card ring-4 shadow-neo-sm">
    <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=2&backgroundColor=d1d4f9" />
  </Avatar>
  <Avatar className="size-16 border-2 border-border ring-card ring-4 shadow-neo-sm">
    <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=3&backgroundColor=c0aede" />
  </Avatar>
  <AvatarGroupCount className="size-16 border-2 border-border ring-card ring-4 font-bold bg-muted shadow-neo-sm text-lg">
    +4
  </AvatarGroupCount>
</AvatarGroup>`}
      >
        <AvatarGroup className="-space-x-4 hover:space-x-2 transition-all">
          <Avatar className="size-16 border-2 border-border ring-card ring-4 shadow-neo-sm">
            <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=1&backgroundColor=ffd5dc" />
            <AvatarFallback>1</AvatarFallback>
          </Avatar>
          <Avatar className="size-16 border-2 border-border ring-card ring-4 shadow-neo-sm">
            <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=2&backgroundColor=d1d4f9" />
            <AvatarFallback>2</AvatarFallback>
          </Avatar>
          <Avatar className="size-16 border-2 border-border ring-card ring-4 shadow-neo-sm">
            <AvatarImage src="https://api.dicebear.com/9.x/bottts/svg?seed=3&backgroundColor=c0aede" />
            <AvatarFallback>3</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="size-16 border-2 border-border ring-card ring-4 font-bold bg-muted shadow-neo-sm text-lg">
            +4
          </AvatarGroupCount>
        </AvatarGroup>
      </ComponentPreview>
    </div>
  );
}
