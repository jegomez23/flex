import { QrCode } from "lucide-react";
import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getClientExperienceData, getSessionContext } from "@/lib/supabase/queries";

function buildQrPattern(token = "") {
  const seed = token.split("").reduce((value, character, index) => {
    return (value + character.charCodeAt(0) * (index + 1)) % 97;
  }, 17);

  return Array.from({ length: 25 }).map((_, index) => {
    const value = (seed + index * 7) % 5;
    return value === 0 || value === 3;
  });
}

export default async function QrAccessPage() {
  const { supabase, user, profile } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { reservations, rooms } = await getClientExperienceData(supabase, user.id);
  const activeReservation = reservations.find((reservation) =>
    ["pagada", "pendiente"].includes(reservation.estado),
  ) ?? reservations[0] ?? null;
  const room = rooms.find((item) => item.id === activeReservation?.sala_id) ?? null;
  const pattern = buildQrPattern(activeReservation?.qr_token ?? user.id);

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Acceso QR"
        title="Tu pase real para entrar"
        description="Usa el token vinculado a tu reserva actual."
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
                {pattern.map((filled, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-sm"
                    style={{
                      background: filled ? "#050505" : index % 4 === 0 ? "#9b5cff" : "#111118",
                    }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-5 text-center text-sm">
              {activeReservation ? `Valido hasta ${new Date(activeReservation.fin).toLocaleString("es-ES")}` : "Sin reserva activa"}
            </p>
          </div>
          <NeonButton className="w-full">Compartir acceso</NeonButton>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Detalles
          </p>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            {profile?.nombre ?? user.email ?? "Usuario"} · {room?.nombre ?? "Sin sala asignada"}
          </div>
          {activeReservation ? (
            <>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
                Reserva ID: {activeReservation.id}
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
                Token: {activeReservation.qr_token}
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
                Estado: {activeReservation.estado}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
              No tienes reservas activas ahora mismo.
            </div>
          )}
        </GlassCard>
      </div>
    </PageReveal>
  );
}
