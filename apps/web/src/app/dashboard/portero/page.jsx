import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { PorteroQrForm } from "@/components/experience/portero-qr-form";
import { MetricCard } from "@/components/experience/metric-card";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { requireProfileRole } from "@/lib/supabase/queries";

function formatDateTime(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function PorteroDashboardPage() {
  const context = await requireProfileRole(["portero", "admin"]);

  if (!context.user) {
    redirect("/acceso");
  }

  if (!context.allowed) {
    redirect("/dashboard/cliente");
  }

  const { supabase } = context;

  const [
    activeCountResult,
    pendingCountResult,
    waitingCountResult,
    recentReservationsResult,
  ] = await Promise.all([
    supabase.from("reservas").select("id", { count: "exact", head: true }).eq("estado", "pagada"),
    supabase.from("reservas").select("id", { count: "exact", head: true }).eq("estado", "pendiente"),
    supabase
      .from("reservas")
      .select("id", { count: "exact", head: true })
      .in("estado", ["pagada", "pendiente"]),
    supabase
      .from("reservas")
      .select("id, sala_id, cliente_id, inicio, fin, estado, qr_token")
      .order("inicio", { ascending: true })
      .limit(3),
  ]);

  const customerIds = (recentReservationsResult.data ?? []).map((item) => item.cliente_id).filter(Boolean);
  const roomIds = (recentReservationsResult.data ?? []).map((item) => item.sala_id).filter(Boolean);

  const [profilesResult, roomsResult] = await Promise.all([
    customerIds.length
      ? supabase.from("perfiles").select("id, nombre").in("id", customerIds)
      : Promise.resolve({ data: [] }),
    roomIds.length
      ? supabase.from("salas_vip").select("id, nombre").in("id", roomIds)
      : Promise.resolve({ data: [] }),
  ]);

  const profileById = new Map((profilesResult.data ?? []).map((item) => [item.id, item]));
  const roomById = new Map((roomsResult.data ?? []).map((item) => [item.id, item]));

  const accessStats = [
    { label: "Validaciones", value: String(activeCountResult.count ?? 0), change: "Pagadas" },
    { label: "Activas", value: String(waitingCountResult.count ?? 0), change: "En cola" },
    { label: "En espera", value: String(pendingCountResult.count ?? 0), change: "Pendientes" },
    { label: "Tiempo medio", value: "42 s", change: "Operación real" },
  ];

  const activeReservations = (recentReservationsResult.data ?? []).map((reservation) => {
    const room = reservation.sala_id ? roomById.get(reservation.sala_id) : null;
    const profile = profileById.get(reservation.cliente_id);

    return {
      code: `VIP-${reservation.id}`,
      name: room?.nombre ?? `Sala #${reservation.sala_id}`,
      detail: `${profile?.nombre ?? "Cliente"} · ${formatDateTime(reservation.inicio)}`,
      status:
        reservation.estado === "pagada"
          ? "Confirmada"
          : reservation.estado === "completada"
            ? "Completada"
            : "Pendiente",
    };
  });

  return (
    <PageReveal className="space-y-8">
      <SectionHeading
        eyebrow="Dashboard portero"
        title="Acceso rápido, móvil y sin distracciones"
        description="Escanea QR, busca reservas y confirma entradas con datos reales."
        action={
          <div className="flex items-center gap-3">
            <StatusPill label="Puerta activa" tone="cyan" />
            <SignOutButton />
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {accessStats.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} change={metric.change} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard id="validar" className="space-y-5 p-6 scroll-mt-24">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Escanear QR</p>
          <PorteroQrForm />
        </GlassCard>

        <GlassCard id="reservas" className="space-y-4 p-6 scroll-mt-24">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Ver reservas activas</p>
          <div className="space-y-3">
            {activeReservations.map((reservation) => (
              <div
                key={reservation.code}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/34">{reservation.code}</p>
                  <p className="mt-2 text-base font-medium text-white">{reservation.name}</p>
                  <p className="mt-1 text-sm text-white/58">{reservation.detail}</p>
                </div>
                <StatusPill
                  label={reservation.status}
                  tone={
                    reservation.status === "Confirmada"
                      ? "success"
                      : reservation.status === "Pendiente"
                        ? "gold"
                        : "cyan"
                  }
                />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard id="entradas" className="space-y-4 p-6 scroll-mt-24">
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Flujo de entrada</p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Buscar reserva por nombre, teléfono o código.",
            "Validar QR y comprobar estado de la reserva.",
            "Confirmar entrada y dejar registro operativo.",
          ].map((step) => (
            <div
              key={step}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/62"
            >
              {step}
            </div>
          ))}
        </div>
      </GlassCard>
    </PageReveal>
  );
}
