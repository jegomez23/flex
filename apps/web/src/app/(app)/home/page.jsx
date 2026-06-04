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
import { ActionGrid } from "@/components/experience/action-grid";
import { ReservationList } from "@/components/experience/reservation-list";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { nextReservation, notifications, reservations } from "@/data/mock-data";

const mainActions = [
  {
    title: "Reservar mesas",
    subtitle: "Elige zona, horario y capacidad en un flujo corto.",
    href: "/reservas",
    icon: CalendarRange,
  },
  {
    title: "Reservar salas VIP",
    subtitle: "Compara las salas y asegura la mejor experiencia.",
    href: "/salas-vip",
    icon: Sofa,
  },
  {
    title: "Acceso QR",
    subtitle: "Consulta tu pase y entra sin perder tiempo.",
    href: "/acceso-qr",
    icon: QrCode,
  },
  {
    title: "Sugerir canción al DJ",
    subtitle: "Envía una pista y mantén el ambiente conectado.",
    href: "/sugerencias-dj",
    icon: Music4,
  },
];

const accountActions = [
  {
    title: "Mis reservas",
    subtitle: "Revisa próximas reservas y estados activos.",
    href: "/reservas",
    icon: CalendarRange,
  },
  {
    title: "Mis pedidos",
    subtitle: "Sigue consumos y confirmaciones desde un solo lugar.",
    href: "/pedidos",
    icon: CreditCard,
  },
  {
    title: "Historial",
    subtitle: "Vuelve a tus noches recientes y reservas pasadas.",
    href: "/historial",
    icon: History,
  },
  {
    title: "Perfil",
    subtitle: "Actualiza tus datos y preferencias de servicio.",
    href: "/perfil",
    icon: UserRound,
  },
];

export default function HomePage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard cliente"
        title="Tu noche en FLEX, todo en un solo lugar"
        description="Reservas, accesos, pedidos e ისტორial aparecen ordenados para que moverte por la app sea rápido y claro."
        action={<StatusPill label="Acceso activo" tone="cyan" />}
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
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Estado
              </p>
              <p className="mt-3 text-xl font-medium text-white">Listo para entrar</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Sala
              </p>
              <p className="mt-3 text-xl font-medium text-white">Sala Gold</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Prioridad
              </p>
              <p className="mt-3 text-xl font-medium text-white">Servicio premium</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Acciones"
          title="Lo esencial, primero"
          description="Atajos pensados para resolver lo importante en pocos toques."
        />
        <ActionGrid items={mainActions} />
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Cuenta"
          title="Tu actividad y tu perfil"
          description="Accesos directos a reservas, pedidos, historial y configuración personal."
        />
        <ActionGrid items={accountActions} />
      </section>

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
            title="Lo que ya tienes listo"
            description="Consulta tus reservas activas antes de salir."
          />
          <ReservationList items={reservations.slice(0, 2)} />
        </div>
      </div>
    </PageReveal>
  );
}
