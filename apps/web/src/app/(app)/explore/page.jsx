import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { exploreZones } from "@/data/mock-data";

const guideNotes = [
  "Identifica con rapidez la zona que mejor encaja con tu plan.",
  "Consulta el recorrido de entrada antes de llegar al club.",
  "Ubica los espacios con mejor vista para reservar con criterio.",
];

export default function ExplorePage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Explorar"
        title="Conoce FLEX antes de llegar"
        description="Recorre los puntos clave del club con una lectura simple, visual y directa."
      />

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="p-6 sm:p-7">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                Mapa de la noche
              </p>
              <h2 className="text-2xl font-medium text-white">
                Un recorrido claro para decidir mejor.
              </h2>
            </div>

            <div className="space-y-3">
              {exploreZones.map((zone) => (
                <div
                  key={zone.title}
                  className="rounded-3xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <p className="text-base font-medium text-white">{zone.title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/58">{zone.note}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-7">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                Vista guiada
              </p>
              <h2 className="text-2xl font-medium text-white">
                Menos ruido, mejores decisiones.
              </h2>
            </div>

            <div className="space-y-3">
              {guideNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-3xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-6 text-white/60"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </PageReveal>
  );
}
