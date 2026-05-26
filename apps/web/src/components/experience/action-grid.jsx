import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export function ActionGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <GlassCard className="group h-full p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/14">
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <item.icon className="h-4.5 w-4.5 text-[var(--violet)]" />
              </div>
              <ArrowRight className="h-4 w-4 text-white/28 transition group-hover:text-white/62" />
            </div>
            <p className="text-lg font-medium text-white">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/56">{item.subtitle}</p>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
