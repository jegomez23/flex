import Link from "next/link";
import { AmbientBackground } from "@/components/ui/ambient-background";

export default function AuthLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 py-8 sm:px-8">
      <AmbientBackground />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <div className="w-full space-y-6">
          <Link href="/" className="brand-mark inline-block text-lg">
            FLEX
          </Link>
          {children}
        </div>
      </div>
    </main>
  );
}
