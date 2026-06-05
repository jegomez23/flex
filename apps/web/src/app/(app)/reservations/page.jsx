import { redirect } from "next/navigation";
import { ReservationList } from "@/components/experience/reservation-list";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getClientExperienceData, getSessionContext } from "@/lib/supabase/queries";

function formatDate(value) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function formatTime(value) {
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function ReservationsPage() {
  const { supabase, user, profile } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { reservations, rooms } = await getClientExperienceData(supabase, user.id);
  const roomById = new Map(rooms.map((room) => [room.id, room]));

  const items = reservations.map((reservation) => {
    const room = roomById.get(reservation.sala_id);
    const statusLabel =
      reservation.estado === "pagada"
        ? "Confirmada"
        : reservation.estado === "cancelada"
          ? "Cancelada"
          : reservation.estado === "completada"
            ? "Completada"
            : "Pendiente";

    return {
      code: `VIP-${reservation.id}`,
      space: room?.nombre ?? `Sala #${reservation.sala_id}`,
      date: formatDate(reservation.inicio),
      time: formatTime(reservation.inicio),
      guests: room?.capacidad ?? 0,
      status: statusLabel,
    };
  });

  const nextReservation = items[0] ?? null;

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Reservas"
        title={`Reserva con claridad${profile?.nombre ? `, ${profile.nombre}` : ""}`}
        description="Tus reservas reales aparecen aquí con estado, fecha y sala."
        action={<NeonButton variant="secondary">Nueva reserva</NeonButton>}
      />

      {nextReservation ? (
        <GlassCard className="p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Próxima reserva
          </p>
          <h2 className="mt-3 text-2xl font-medium text-white">{nextReservation.space}</h2>
          <p className="mt-2 text-sm text-white/58">
            {nextReservation.date} / {nextReservation.time}
          </p>
        </GlassCard>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Como funciona
          </p>
          {[
            "Elige mesa o sala VIP",
            "Define hora, invitados y extras",
            "Recibe tu acceso QR al instante",
          ].map((step, index) => (
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

        <ReservationList items={items} />
      </div>
    </PageReveal>
  );
}
