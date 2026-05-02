import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { ChatBubble } from '@/components/molecules/chat-bubble';

export default function ChatDemoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Chat Bubble</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen untuk menampilkan gelembung obrolan dalam aplikasi berbentuk pesan atau diskusi interaktif.
        </NeoText>
      </div>

      <ComponentPreview
        title="Interactive Dialogue"
        description="Percakapan dua arah dengan warna dan ekor gelembung yang menunjukkan arah pesan."
        code={`<ChatBubble 
  variant="received" 
  name="Guru Budi"
  time="10:00 AM"
  avatar="https://api.dicebear.com/9.x/bottts/svg?seed=Teacher&backgroundColor=b6e3f4"
  message="Halo teman-teman! Hari ini kita akan belajar tentang hewan."
/>
<ChatBubble 
  variant="sent" 
  time="10:02 AM"
  avatar="https://api.dicebear.com/9.x/bottts/svg?seed=You&backgroundColor=c0aede"
  message="Horeee! Aku suka kelinci!"
/>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-md bg-muted/30 p-6 rounded-3xl border-4 border-border shadow-neo overflow-hidden">
          <ChatBubble 
            variant="received" 
            name="Pak Coki"
            time="10:00 AM"
            avatar="https://api.dicebear.com/9.x/bottts/svg?seed=Teacher&backgroundColor=b6e3f4"
            message="Halo anak-anak! Siapa yang bisa berhitung sampai 10?"
          />
          <ChatBubble 
            variant="sent" 
            time="10:02 AM"
            avatar="https://api.dicebear.com/9.x/bottts/svg?seed=You&backgroundColor=c0aede"
            message="Aku pak! 1, 2, 3, 4... 10!"
          />
          <ChatBubble 
            variant="received" 
            name="Pak Coki"
            time="10:03 AM"
            avatar="https://api.dicebear.com/9.x/bottts/svg?seed=Teacher&backgroundColor=b6e3f4"
            message="Wah, pintar sekali! 🎉"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
