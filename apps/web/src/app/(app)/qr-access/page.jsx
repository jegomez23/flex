import { QrCode } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { qrDetails } from "@/data/mock-data";

export default function QrAccessPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Acceso QR"
        title="Entra sin friccion"
        description="Tu pase aparece con contexto claro y listo para escanear."
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassCard className="space-y-5 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Pase activo
          </p>
          <div className="rounded-[24px] border border-white/10 bg-white p-6 text-black">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm uppercase tracking-[0.34em]">FLEX</p>
              <QrCode className="h-5 w-5" />
            </div>
            <div className="mt-6 grid h-52 place-items-center rounded-[20px] border border-black/10 bg-[linear-gradient(135deg,#f0f0f0,#ffffff)]">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-sm"
                    style={{
                      background:
                        index % 3 === 0 ? "#050505" : index % 4 === 0 ? "#9b5cff" : "#111118",
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-5 text-center text-sm">Valido hoy hasta 11:30 PM</p>
          </div>
          <NeonButton className="w-full">Compartir acceso</NeonButton>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Detalles
          </p>
          {qrDetails.map((item) => (
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
