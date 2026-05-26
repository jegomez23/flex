import { BottomNav } from "@/components/layout/bottom-nav";
import { TopNav } from "@/components/layout/top-nav";
import { AmbientBackground } from "@/components/ui/ambient-background";

export function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <TopNav />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
