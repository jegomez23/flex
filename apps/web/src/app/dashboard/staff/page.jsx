import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { MetricCard } from "@/components/experience/metric-card";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { requireProfileRole } from "@/lib/supabase/queries";

const quickLinks = [
  {
    title: "Pedidos activos",
    href: "/dashboard/staff#pedidos",
    description: "Revisa la cola y actualiza estados sin perder tiempo.",
  },
  {
    title: "Reservas activas",
    href: "/dashboard/staff#reservas",
    description: "Confirma llegadas y controla la ocupación del turno.",
  },
  {
    title: "Gestión operativa",
    href: "/dashboard/staff#operativa",
    description: "Accesos rápidos para el turno.",
  },
];

function describeOrder(order, tableById, profileById) {
  const table = order.mesa_id ? tableById.get(order.mesa_id) : null;
  const profile = profileById.get(order.cliente_id);

  return `Pedido #${order.id} · ${order.estado} · ${table ? `Mesa ${table.numero}` : "Sin mesa"} · ${profile?.nombre ?? "Cliente"}`;
}

function describeReservation(reservation, roomById, profileById) {
  const room = reservation.sala_id ? roomById.get(reservation.sala_id) : null;
  const profile = profileById.get(reservation.cliente_id);

  return `Reserva #${reservation.id} · ${reservation.estado} · ${room?.nombre ?? "Sala"} · ${profile?.nombre ?? "Cliente"}`;
}

export default async function StaffDashboardPage() {
  const context = await requireProfileRole(["staff", "admin"]);

  if (!context.user) {
    redirect("/acceso");
  }

  if (!context.allowed) {
    redirect("/dashboard/cliente");
  }

  const { supabase } = context;

  const [
    activeOrdersResult,
    pendingOrdersResult,
    activeReservationsResult,
    recentOrdersResult,
    recentReservationsResult,
  ] = await Promise.all([
    supabase
      .from("pedidos")
      .select("id", { count: "exact", head: true })
      .in("estado", ["pendiente", "en_barra"]),
    supabase
      .from("pedidos")
      .select("id", { count: "exact", head: true })
      .eq("estado", "pendiente"),
    supabase
      .from("reservas")
      .select("id", { count: "exact", head: true })
      .in("estado", ["pagada", "pendiente"]),
    supabase
      .from("pedidos")
      .select("id, estado, total, creado_en, cliente_id, mesa_id")
      .order("creado_en", { ascending: false })
      .limit(3),
    supabase
      .from("reservas")
      .select("id, estado, inicio, fin, sala_id, cliente_id")
      .order("creado_en", { ascending: false })
      .limit(3),
  ]);

  const profileIds = [
    ...(recentOrdersResult.data ?? []).map((item) => item.cliente_id),
    ...(recentReservationsResult.data ?? []).map((item) => item.cliente_id),
  ].filter(Boolean);
  const roomIds = (recentReservationsResult.data ?? []).map((item) => item.sala_id).filter(Boolean);
  const tableIds = (recentOrdersResult.data ?? []).map((item) => item.mesa_id).filter(Boolean);

  const [profilesResult, roomsResult, tablesResult] = await Promise.all([
    profileIds.length
      ? supabase.from("perfiles").select("id, nombre").in("id", profileIds)
      : Promise.resolve({ data: [] }),
    roomIds.length
      ? supabase.from("salas_vip").select("id, nombre").in("id", roomIds)
      : Promise.resolve({ data: [] }),
    tableIds.length
      ? supabase.from("mesas").select("id, numero").in("id", tableIds)
      : Promise.resolve({ data: [] }),
  ]);

  const profileById = new Map((profilesResult.data ?? []).map((item) => [item.id, item]));
  const roomById = new Map((roomsResult.data ?? []).map((item) => [item.id, item]));
  const tableById = new Map((tablesResult.data ?? []).map((item) => [item.id, item]));

  const staffStats = [
    { label: "Pedidos activos", value: String(activeOrdersResult.count ?? 0), change: "En cola real" },
    { label: "Pedidos pendientes", value: String(pendingOrdersResult.count ?? 0), change: "Por preparar" },
    { label: "Reservas activas", value: String(activeReservationsResult.count ?? 0), change: "Confirmadas" },
    { label: "Tiempo medio", value: "6 min", change: "Turno vivo" },
  ];

  const liveOperations = [
    ...(recentOrdersResult.data ?? []).map((item) => describeOrder(item, tableById, profileById)),
    ...(recentReservationsResult.data ?? []).map((item) => describeReservation(item, roomById, profileById)),
  ].slice(0, 3);

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard staff"
        title="Operación rápida para el turno"
        description="Pedidos, reservas y actividad del local reunidos en una vista directa y eficiente."
        action={
          <div className="flex items-center gap-3">
            <StatusPill label="Turno en vivo" tone="gold" />
            <SignOutButton />
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {staffStats.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} change={metric.change} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard id="pedidos" className="space-y-4 p-6 scroll-mt-24">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Gestión rápida</p>
          {liveOperations.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <p className="text-sm text-white/72">{item}</p>
            </div>
          ))}
        </GlassCard>

        <GlassCard id="reservas" className="space-y-4 p-6 scroll-mt-24">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Actividad del local</p>
          <div className="space-y-3">
            {[
              "Pedidos pendientes y en barra se muestran aquí.",
              "Reservas confirmadas actualizan la ocupación del turno.",
              "La vista se alimenta directamente de la base de datos.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/62"
              >
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div id="operativa" className="grid gap-4 md:grid-cols-3 scroll-mt-24">
        {quickLinks.map((link) => (
          <GlassCard key={link.title} className="p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">Acceso</p>
            <h2 className="mt-3 text-xl font-medium text-white">{link.title}</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">{link.description}</p>
            <Link href={link.href} className="mt-5 inline-flex text-sm text-[#9b5cff]">
              Abrir
            </Link>
          </GlassCard>
        ))}
      </div>
    </PageReveal>
  );
}
