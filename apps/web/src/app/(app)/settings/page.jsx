import { settingsGroups } from "@/data/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function SettingsPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Ajustes"
        title="Configura tu experiencia"
        description="Preferencias claras para que la app responda mejor a tu forma de salir."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {settingsGroups.map((group) => (
          <GlassCard key={group.title} className="space-y-4 p-6">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
              {group.title}
            </p>
            {group.items.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <span className="text-sm text-white/62">{item}</span>
                <span className="h-6 w-11 rounded-full border border-[rgba(155,92,255,0.34)] bg-[rgba(155,92,255,0.15)]" />
              </div>
            ))}
          </GlassCard>
        ))}
      </div>
    </PageReveal>
  );
}
