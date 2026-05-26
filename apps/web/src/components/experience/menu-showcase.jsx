import { GlassCard } from "@/components/ui/glass-card";

export function MenuShowcase({ categories }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {categories.map((category) => (
        <GlassCard key={category.name} className="p-5">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            {category.name}
          </p>
          <div className="mt-5 space-y-2">
            {category.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-medium text-white">{item.name}</p>
                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-sm text-white/68">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
