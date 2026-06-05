import Link from "next/link";
import {
  CalendarRange,
  CreditCard,
  History,
  Music4,
  QrCode,
  Sofa,
  UserRound,
} from "lucide-react";
import { redirect } from "next/navigation";
import { ActionGrid } from "@/components/experience/action-grid";
import { ReservationList } from "@/components/experience/reservation-list";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { getClientExperienceData, getSessionContext } from "@/lib/supabase/queries";

const mainActions = [
  { title: "Reservar mesas", subtitle: "Elige zona, horario y capacidad.", href: "/reservas", icon: CalendarRange },
  { title: "Reservar salas VIP", subtitle: "Compara las salas y asegura tu espacio.", href: "/salas-vip", icon: Sofa },
  { title: "Acceso QR", subtitle: "Consulta tu pase y entra sin perder tiempo.", href: "/acceso-qr", icon: QrCode },
  { title: "Sugerir cancion al DJ", subtitle: "Envia una pista y mantén el ambiente conectado.", href: "/sugerencias-dj", icon: Music4 },
];

const accountActions = [
  { title: "Mis reservas", subtitle: "Revisa próximas reservas y estados activos.", href: "/reservas", icon: CalendarRange },
  { title: "Mis pedidos", subtitle: "Sigue consumos y confirmaciones.", href: "/pedidos", icon: CreditCard },
  { title: "Historial", subtitle: "Vuelve a tus noches recientes.", href: "/historial", icon: History },
  { title: "Perfil", subtitle: "Actualiza tus datos y preferencias.", href: "/perfil", icon: UserRound },
];

function formatDateTime(value) {
  const date = new Date(value);
  return {
    date: new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short" }).format(date),
    time: new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit" }).format(date),
  };
}

export default async function HomePage() {
  const { supabase, user, profile } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { reservations, orders, rooms } = await getClientExperienceData(supabase, user.id);
  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const activeReservations = reservations.filter((reservation) => reservation.estado !== "cancelada");
  const nextReservation = activeReservations[0] ?? null;
  const nextReservationRoom = nextReservation ? roomById.get(nextReservation.sala_id) : null;
  const nextReservationDate = nextReservation ? formatDateTime(nextReservation.inicio) : null;
  const confirmedOrders = orders.filter((order) => order.estado !== "cancelado");

  const reservationCards = activeReservations.slice(0, 2).map((reservation) => {
    const room = roomById.get(reservation.sala_id);
    const formatted = formatDateTime(reservation.inicio);
    return {
      code: `VIP-${reservation.id}`,
      space: room?.nombre ?? `Sala #${reservation.sala_id}`,
      date: formatted.date,
      time: formatted.time,
      guests: room?.capacidad ?? 0,
      status:
        reservation.estado === "pagada"
          ? "Confirmada"
          : reservation.estado === "completada"
            ? "Completada"
            : reservation.estado === "cancelada"
              ? "Cancelada"
              : "Pendiente",
    };
  });

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard cliente"
        title={`Tu noche en FLEX${profile?.nombre ? `, ${profile.nombre}` : ""}`}
        description="Reservas, accesos, pedidos e historial aparecen con datos reales de tu sesión."
        action={<StatusPill label={user.email ?? "Sesión activa"} tone="cyan" />}
      />

      <GlassCard className="p-6 sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
              Siguiente reserva
            </p>
            <h2 className="text-3xl font-medium text-white">
              {nextReservationRoom?.nombre ?? "Sin reserva próxima"}
            </h2>
            <p className="text-sm text-white/58">
              {nextReservationDate ? `${nextReservationDate.date} / ${nextReservationDate.time}` : "Todavía no tienes una reserva confirmada."}
            </p>
            <p className="max-w-lg text-sm leading-6 text-white/60">
              {nextReservation ? `Estado actual: ${nextReservation.estado}` : "Reserva una mesa o sala VIP para ver tu acceso real aquí."}
            </p>
            <div className="flex flex-wrap gap-3">
              <NeonButton asChild>
                <Link href="/acceso-qr">Ver acceso QR</Link>
              </NeonButton>
              <NeonButton asChild variant="secondary">
                <Link href="/reservas">Gestionar reserva</Link>
              </NeonButton>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Reservas activas</p>
              <p className="mt-3 text-xl font-medium text-white">{activeReservations.length}</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Pedidos abiertos</p>
              <p className="mt-3 text-xl font-medium text-white">{confirmedOrders.length}</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Sala activa</p>
              <p className="mt-3 text-xl font-medium text-white">{nextReservationRoom?.nombre ?? "—"}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <section className="space-y-4">
        <SectionHeading eyebrow="Acciones" title="Lo esencial, primero" description="Atajos pensados para resolver lo importante en pocos toques." />
        <ActionGrid items={mainActions} />
      </section>

      <section className="space-y-4">
        <SectionHeading eyebrow="Cuenta" title="Tu actividad y tu perfil" description="Accesos directos a reservas, pedidos, historial y configuración personal." />
        <ActionGrid items={accountActions} />
      </section>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">Avisos</p>
          {activeReservations.length > 0 ? (
            activeReservations.slice(0, 3).map((reservation) => (
              <div
                key={reservation.id}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60"
              >
                {reservation.estado === "pagada" ? "Tu reserva ya está lista para entrar." : `Reserva ${reservation.estado} en ${roomById.get(reservation.sala_id)?.nombre ?? "tu sala"}.`}
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
              Aún no tienes reservas activas.
            </div>
          )}
        </GlassCard>

        <div className="space-y-4">
          <SectionHeading eyebrow="Reservas" title="Lo que ya tienes listo" description="Consulta tus reservas activas antes de salir." />
          <ReservationList items={reservationCards} />
        </div>
      </div>
    </PageReveal>
  );
}
