import { profileNotes, profileStats } from "@/data/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

export default function ProfilePage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Mi perfil"
        title="Una cuenta pensada para tu ritmo"
        description="Tu actividad, tus preferencias y tu forma de vivir FLEX en una sola vista."
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassCard className="space-y-5 p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(155,92,255,0.3)] bg-[rgba(155,92,255,0.14)] text-xl font-medium text-white">
              AR
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-medium text-white">Alex Rivera</h2>
              <StatusPill label="Nivel Black" tone="violet" />
            </div>
          </div>

          <div className="grid gap-3">
            {profileStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                  {item.label}
                </p>
                <p className="mt-3 text-lg text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Preferencias
          </p>
          {profileNotes.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60"
            >
              {item}
            </div>
          ))}
        </GlassCard>
      </div>
    </PageReveal>
  );
}
