import { ReservationList } from "@/components/experience/reservation-list";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { reservationSteps, reservations } from "@/data/mock-data";

export default function ReservationsPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Reservas"
        title="Reserva con claridad"
        description="Un flujo corto para asegurar tu lugar sin perder tiempo."
        action={<NeonButton variant="secondary">Nueva reserva</NeonButton>}
      />

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Como funciona
          </p>
          {reservationSteps.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-white/70">
                0{index + 1}
              </div>
              <p className="text-sm text-white/60">{step}</p>
            </div>
          ))}
        </GlassCard>

        <ReservationList items={reservations} />
      </div>
    </PageReveal>
  );
}
