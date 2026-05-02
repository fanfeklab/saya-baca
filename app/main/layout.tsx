import { TopBar } from '@/components/organisms/TopBar';
import { BottomNav } from '@/components/organisms/BottomNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <div className="relative min-h-screen">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
