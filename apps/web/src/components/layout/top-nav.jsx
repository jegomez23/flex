"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { mainNav } from "@/data/mock-data";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(5,5,5,0.78)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/inicio" className="brand-mark text-lg">
          FLEX
        </Link>

        <nav className="scrollbar-hidden hidden flex-1 items-center gap-1 overflow-x-auto md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm transition",
                  active
                    ? "bg-white/[0.07] text-white"
                    : "text-white/52 hover:bg-white/[0.04] hover:text-white/82",
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/62 sm:inline-flex">
            Abre 22:00
          </span>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:bg-white/[0.06] hover:text-white">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
