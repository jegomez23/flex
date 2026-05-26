"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNav } from "@/data/mock-data";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[rgba(8,8,12,0.82)] px-3 py-3 backdrop-blur-2xl md:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-5 gap-2">
        {mobileNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] transition",
                active
                  ? "bg-white/[0.08] text-white"
                  : "text-white/42 hover:text-white/75",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
