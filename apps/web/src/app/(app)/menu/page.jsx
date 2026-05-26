import { MenuShowcase } from "@/components/experience/menu-showcase";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { menuCategories, serviceNotes } from "@/data/mock-data";

export default function MenuPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Pedidos"
        title="Pide antes o durante la noche"
        description="Bebidas, cocina y hookah en una estructura simple y facil de recorrer."
      />

      <GlassCard className="p-6">
        <div className="grid gap-3 md:grid-cols-3">
          {serviceNotes.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60"
            >
              {item}
            </div>
          ))}
        </div>
      </GlassCard>

      <MenuShowcase categories={menuCategories} />
    </PageReveal>
  );
}
