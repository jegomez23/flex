import { redirect } from "next/navigation";
import { ReservationList } from "@/components/experience/reservation-list";
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

export default async function ReservationHistoryPage() {
  const { supabase, user } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { reservations, rooms } = await getClientExperienceData(supabase, user.id);
  const roomById = new Map(rooms.map((room) => [room.id, room]));

  const items = [...reservations]
    .sort((left, right) => new Date(right.inicio) - new Date(left.inicio))
    .map((reservation) => {
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

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Historial"
        title="Tu recorrido en FLEX"
        description="Reservas pasadas y activas tomadas desde la base real."
      />
      <ReservationList items={items} />
    </PageReveal>
  );
}
