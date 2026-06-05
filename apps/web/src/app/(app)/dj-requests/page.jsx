import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getClientExperienceData, getSessionContext } from "@/lib/supabase/queries";

function formatDateTime(value) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function DjRequestsPage() {
  const { supabase, user, profile } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { reservations, rooms } = await getClientExperienceData(supabase, user.id);
  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const latestReservation = reservations[0] ?? null;
  const latestRoom = latestReservation?.sala_id ? roomById.get(latestReservation.sala_id) : null;

  const requestContext = [
    latestReservation
      ? `Tu última reserva fue en ${latestRoom?.nombre ?? "una sala VIP"} el ${formatDateTime(latestReservation.inicio)}.`
      : "Aún no tienes una reserva activa; puedes dejar tu sugerencia para la próxima noche.",
    `Perfil conectado: ${profile?.nombre ?? user.email ?? "Cliente FLEX"}.`,
    "El equipo puede usar este contexto para priorizar la música del momento.",
  ];

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Sugerencias al DJ"
        title="Pide el tema correcto"
        description="Un flujo simple para participar en la música con tu contexto real de sesión."
      />

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Buscar tema
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/42">
            Artista o canción
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
              Momento actual
            </p>
            <h3 className="mt-4 text-2xl font-medium text-white">
              La noche se adapta a tu reserva real.
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/58">
              Usa tu sesión para orientar la música sin perder el ritmo del local.
            </p>
            <NeonButton className="mt-6">Enviar sugerencia</NeonButton>
          </div>
        </GlassCard>

        <div className="space-y-3">
          {requestContext.map((item) => (
            <GlassCard key={item} className="p-5">
              <p className="text-sm leading-6 text-white/66">{item}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageReveal>
  );
}
