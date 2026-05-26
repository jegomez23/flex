import { djRequests } from "@/data/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export default function DjRequestsPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Sugerencias al DJ"
        title="Pide el tema correcto"
        description="Un flujo simple para participar en la musica sin interrumpir la experiencia."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Buscar tema
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/32">
            Artista o cancion
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
              Momento actual
            </p>
            <h3 className="mt-4 text-2xl font-medium text-white">
              Sonido elegante con subida latina.
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Las sugerencias con mejor encaje entran con mas facilidad en la cola.
            </p>
            <NeonButton className="mt-6">Enviar sugerencia</NeonButton>
          </div>
        </GlassCard>

        <div className="space-y-3">
          {djRequests.map((track) => (
            <GlassCard key={track.title} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-medium text-white">{track.title}</p>
                  <p className="mt-1 text-sm text-white/56">{track.artist}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/52">
                    {track.vibe}
                  </p>
                  <p className="mt-2 text-xs text-white/38">Prioridad miembro</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageReveal>
  );
}
