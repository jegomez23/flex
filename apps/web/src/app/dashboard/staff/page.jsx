import Link from "next/link";
import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { MetricCard } from "@/components/experience/metric-card";
import { requireProfileRole } from "@/lib/supabase/queries";

const staffStats = [
  { label: "Pedidos activos", value: "12", change: "+3" },
  { label: "Pedidos pendientes", value: "8", change: "-2" },
  { label: "Reservas activas", value: "17", change: "+4" },
  { label: "Tiempo medio", value: "6 min", change: "-1 min" },
];

const quickLinks = [
  {
    title: "Pedidos activos",
    href: "/pedidos",
    description: "Revisa la cola y actualiza estados sin perder tiempo.",
  },
  {
    title: "Reservas activas",
    href: "/reservas",
    description: "Confirma llegadas y controla la ocupación del turno.",
  },
  {
    title: "Estado del local",
    href: "/inicio",
    description: "Mira la actividad general de la noche en una vista limpia.",
  },
];

const activeOrders = [
  { code: "M12", detail: "Bar central · 4 bebidas", status: "En barra" },
  { code: "B08", detail: "Sala Gold · botella premium", status: "Pendiente" },
  { code: "T04", detail: "Pista principal · snacks", status: "Listo" },
];

const liveOperations = [
  "3 pedidos han entrado a estado listo.",
  "Sala Gold mantiene acceso normal.",
  "La barra central tiene la cola más activa del turno.",
];

export default async function StaffDashboardPage() {
  const context = await requireProfileRole(["staff", "admin"]);

  if (!context.user) {
    redirect("/acceso");
  }

  if (!context.allowed) {
    redirect("/dashboard/cliente");
  }

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
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Gestión rápida
          </p>
          {activeOrders.map((order) => (
            <div
              key={order.code}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/34">
                  Pedido {order.code}
                </p>
                <p className="mt-2 text-sm text-white/72">{order.detail}</p>
              </div>
              <StatusPill
                label={order.status}
                tone={order.status === "Listo" ? "success" : order.status === "Pendiente" ? "gold" : "cyan"}
              />
            </div>
          ))}
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Actividad del local
          </p>
          {liveOperations.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/62"
            >
              {item}
            </div>
          ))}
          <div className="pt-2">
            <StatusPill label="Actualización continua" tone="cyan" />
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <GlassCard key={link.title} className="p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">
              Acceso
            </p>
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
