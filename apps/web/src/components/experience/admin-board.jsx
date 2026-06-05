import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/experience/metric-card";
import { StatusPill } from "@/components/ui/status-pill";
import { getSessionContext } from "@/lib/supabase/queries";
import { ProductManagementPanel } from "@/components/experience/product-management-panel";
import { normalizeProductRow } from "@/lib/products";

const adminSections = [
  { id: "usuarios", title: "Usuarios", description: "Gestiona perfiles, roles y acceso general.", href: "/dashboard/admin#usuarios" },
  { id: "reservas", title: "Reservas", description: "Supervisa la demanda, estados y ocupación.", href: "/dashboard/admin#reservas" },
  { id: "mesas", title: "Mesas", description: "Revisa disponibilidad, capacidad y mesas activas.", href: "/dashboard/admin#mesas" },
  { id: "salas-vip", title: "Salas VIP", description: "Administra los espacios más exclusivos.", href: "/dashboard/admin#salas-vip" },
  { id: "productos", title: "Productos", description: "Vigila el catálogo de bebidas, cocina y packs.", href: "/dashboard/admin#productos" },
  { id: "pedidos", title: "Pedidos", description: "Sigue la cola, los estados y el servicio.", href: "/dashboard/admin#pedidos" },
  { id: "estadisticas", title: "Estadísticas", description: "Consulta los indicadores clave del turno.", href: "/dashboard/admin#estadisticas" },
  { id: "configuracion", title: "Configuración", description: "Ajustes de experiencia y operación.", href: "/dashboard/admin#configuracion" },
];

async function countRows(supabase, table) {
  const { count } = await supabase.from(table).select("id", { count: "exact", head: true });
  return count ?? 0;
}

export async function AdminBoard() {
  const { supabase } = await getSessionContext();

  const [usersCount, reservationsCount, tablesCount, roomsCount, productsCount, ordersCount, recentReservations, recentOrders, productsResult] =
    await Promise.all([
      countRows(supabase, "perfiles"),
      countRows(supabase, "reservas"),
      countRows(supabase, "mesas"),
      countRows(supabase, "salas_vip"),
      countRows(supabase, "productos"),
      countRows(supabase, "pedidos"),
      supabase
        .from("reservas")
        .select("id, estado, inicio, fin, total, creado_en, cliente_id, sala_id")
        .order("creado_en", { ascending: false })
        .limit(3),
      supabase
        .from("pedidos")
        .select("id, estado, total, creado_en, actualizado, cliente_id, mesa_id")
        .order("creado_en", { ascending: false })
        .limit(3),
      supabase
        .from("productos")
        .select("id, nombre, descripcion, precio, categoria, imagen_url, disponible, creado_en")
        .order("creado_en", { ascending: false }),
    ]);

  const reservationIds = (recentReservations.data ?? []).map((item) => item.cliente_id);
  const reservationRoomIds = (recentReservations.data ?? []).map((item) => item.sala_id);
  const orderCustomerIds = (recentOrders.data ?? []).map((item) => item.cliente_id);
  const orderTableIds = (recentOrders.data ?? []).map((item) => item.mesa_id);

  const [reservationProfiles, reservationRooms, orderProfiles, orderTables] = await Promise.all([
    reservationIds.length
      ? supabase.from("perfiles").select("id, nombre").in("id", reservationIds)
      : Promise.resolve({ data: [] }),
    reservationRoomIds.length
      ? supabase.from("salas_vip").select("id, nombre").in("id", reservationRoomIds)
      : Promise.resolve({ data: [] }),
    orderCustomerIds.length
      ? supabase.from("perfiles").select("id, nombre").in("id", orderCustomerIds)
      : Promise.resolve({ data: [] }),
    orderTableIds.length
      ? supabase.from("mesas").select("id, numero").in("id", orderTableIds)
      : Promise.resolve({ data: [] }),
  ]);

  const profileById = new Map([...(reservationProfiles.data ?? []), ...(orderProfiles.data ?? [])].map((item) => [item.id, item]));
  const roomById = new Map((reservationRooms.data ?? []).map((item) => [item.id, item]));
  const tableById = new Map((orderTables.data ?? []).map((item) => [item.id, item]));

  const metrics = [
    { label: "Usuarios", value: String(usersCount), change: "Total real" },
    { label: "Reservas", value: String(reservationsCount), change: "Total real" },
    { label: "Pedidos", value: String(ordersCount), change: "Total real" },
    { label: "VIP / Mesas", value: `${roomsCount} / ${tablesCount}`, change: "Catálogo real" },
  ];

  const activity = [
    ...(recentReservations.data ?? []).map((item) => ({
      text: `Reserva #${item.id} · ${item.estado} · ${roomById.get(item.sala_id)?.nombre ?? "Sala"} · ${profileById.get(item.cliente_id)?.nombre ?? "Cliente"}`,
      tone: item.estado === "pagada" ? "success" : item.estado === "cancelada" ? "danger" : "gold",
    })),
    ...(recentOrders.data ?? []).map((item) => ({
      text: `Pedido #${item.id} · ${item.estado} · ${tableById.get(item.mesa_id)?.numero ? `Mesa ${tableById.get(item.mesa_id).numero}` : "Sin mesa"} · ${profileById.get(item.cliente_id)?.nombre ?? "Cliente"}`,
      tone: item.estado === "listo" || item.estado === "entregado" ? "success" : item.estado === "cancelado" ? "danger" : "cyan",
    })),
  ].slice(0, 6);

  const products = (productsResult.data ?? []).map(normalizeProductRow);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} change={metric.change} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminSections.map((section) => (
          <GlassCard key={section.title} id={section.id} className="scroll-mt-24 space-y-3 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">Control</p>
            <h2 className="text-xl font-medium text-white">{section.title}</h2>
            <p className="text-sm leading-6 text-white/58">{section.description}</p>
            <Link href={section.href} className="inline-flex text-sm text-[#9b5cff]">
              Abrir
            </Link>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-5 p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Operación en sala</p>
            <StatusPill label="Vista general" tone="cyan" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Reservas", value: String(reservationsCount) },
              { label: "Pedidos", value: String(ordersCount) },
              { label: "Espacios", value: `${roomsCount} VIP` },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">{item.label}</p>
                <p className="mt-4 text-xl font-medium text-white">{item.value}</p>
                <div className="mt-4 h-1 rounded-full bg-[linear-gradient(90deg,rgba(155,92,255,0.9),transparent)]" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Actividad en vivo</p>
          {activity.map((item) => (
            <div key={item.text} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/62">
              {item.text}
            </div>
          ))}
        </GlassCard>
      </div>

      <ProductManagementPanel products={products} />
    </div>
  );
}
