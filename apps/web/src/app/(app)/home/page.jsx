import Link from "next/link";
import { ActionGrid } from "@/components/experience/action-grid";
import { ReservationList } from "@/components/experience/reservation-list";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import {
  nextReservation,
  notifications,
  profileStats,
  quickActions,
  reservations,
} from "@/data/mock-data";

export default function HomePage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Inicio"
        title="Tu noche ya esta lista"
        description="Todo lo esencial aparece en un flujo claro: reserva, acceso, pedidos y seguimiento."
        action={<StatusPill label="Abre 22:00" tone="cyan" />}
      />

      <GlassCard className="p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
              Siguiente reserva
            </p>
            <h2 className="text-3xl font-medium text-white">{nextReservation.name}</h2>
            <p className="text-sm text-white/58">{nextReservation.schedule}</p>
            <p className="max-w-lg text-sm leading-6 text-white/60">
              {nextReservation.note}
            </p>
            <NeonButton asChild variant="secondary">
              <Link href="/acceso-qr">Ver acceso QR</Link>
            </NeonButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {profileStats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/8 bg-white/[0.02] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                  {item.label}
                </p>
                <p className="mt-3 text-xl font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <SectionHeading
        eyebrow="Accesos rapidos"
        title="Todo a un toque"
        description="Acciones pensadas para resolver la noche sin vueltas."
      />
      <ActionGrid items={quickActions} />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Avisos
          </p>
          {notifications.map((note) => (
            <div
              key={note}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60"
            >
              {note}
            </div>
          ))}
        </GlassCard>

        <div className="space-y-4">
          <SectionHeading
            eyebrow="Reservas"
            title="Lo que viene esta noche"
            description="Consulta el estado de tus espacios antes de salir."
          />
          <ReservationList items={reservations.slice(0, 2)} />
        </div>
      </div>
    </PageReveal>
  );
}
