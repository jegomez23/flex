import Link from "next/link";
import { adminSignals, analytics, liveActivity } from "@/data/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/experience/metric-card";
import { StatusPill } from "@/components/ui/status-pill";

const adminSections = [
  {
    title: "Usuarios",
    description: "Gestiona perfiles, roles y acceso general a la plataforma.",
    href: "/perfil",
    label: "Control",
  },
  {
    title: "Reservas",
    description: "Supervisa la demanda, estados y ocupación de la noche.",
    href: "/reservas",
    label: "Operación",
  },
  {
    title: "Mesas",
    description: "Revisa disponibilidad, capacidad y mesas activas.",
    href: "/inicio",
    label: "Sala",
  },
  {
    title: "Salas VIP",
    description: "Administra los espacios más exclusivos del local.",
    href: "/salas-vip",
    label: "VIP",
  },
  {
    title: "Productos",
    description: "Vigila el catálogo de bebidas, cocina y packs.",
    href: "/menu",
    label: "Carta",
  },
  {
    title: "Pedidos",
    description: "Sigue la cola, los estados y el servicio en barra.",
    href: "/pedidos",
    label: "Servicio",
  },
  {
    title: "Estadísticas básicas",
    description: "Consulta los indicadores clave del turno.",
    href: "/dashboard/admin",
    label: "Métrica",
  },
  {
    title: "Configuración",
    description: "Ajustes de experiencia, operación y preferencias.",
    href: "/ajustes",
    label: "Sistema",
  },
];

export function AdminBoard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analytics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminSections.map((section) => (
          <GlassCard key={section.title} className="space-y-3 p-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">
              {section.label}
            </p>
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
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
              Operación en sala
            </p>
            <StatusPill label="Vista general" tone="cyan" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {adminSignals.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  {item.label}
                </p>
                <p className="mt-4 text-xl font-medium text-white">{item.value}</p>
                <div
                  className="mt-4 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${item.tint}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Actividad en vivo
          </p>
          {liveActivity.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/62"
            >
              {item}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
