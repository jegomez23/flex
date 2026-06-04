import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { MetricCard } from "@/components/experience/metric-card";
import { PorteroQrForm } from "@/components/experience/portero-qr-form";
import { requireProfileRole } from "@/lib/supabase/queries";

const accessStats = [
  { label: "Validaciones", value: "28", change: "+6" },
  { label: "Activas", value: "11", change: "+2" },
  { label: "En espera", value: "4", change: "-1" },
  { label: "Tiempo medio", value: "42 s", change: "-8 s" },
];

const activeReservations = [
  {
    code: "VIP-3",
    name: "Sala Gold",
    detail: "6 personas · 23:00",
    status: "Confirmada",
  },
  {
    code: "M12",
    name: "Mesa 12",
    detail: "4 personas · 23:30",
    status: "Pendiente",
  },
  {
    code: "R01",
    name: "Entrada prioritaria",
    detail: "2 personas · ahora",
    status: "En acceso",
  },
];

export default async function PorteroDashboardPage() {
  const context = await requireProfileRole(["portero", "admin"]);

  if (!context.user) {
    redirect("/acceso");
  }

  if (!context.allowed) {
    redirect("/dashboard/cliente");
  }

  return (
    <PageReveal className="space-y-8">
      <SectionHeading
        eyebrow="Dashboard portero"
        title="Acceso rápido, móvil y sin distracciones"
        description="Escanea QR, busca reservas y confirma entradas con una interfaz pensada para operar en segundos."
        action={
          <div className="flex items-center gap-3">
            <StatusPill label="Puerta activa" tone="cyan" />
            <SignOutButton />
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {accessStats.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-5 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Escanear QR
          </p>
          <PorteroQrForm />
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Ver reservas activas
          </p>
          <div className="space-y-3">
            {activeReservations.map((reservation) => (
              <div
                key={reservation.code}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/34">
                    {reservation.code}
                  </p>
                  <p className="mt-2 text-base font-medium text-white">{reservation.name}</p>
                  <p className="mt-1 text-sm text-white/58">{reservation.detail}</p>
                </div>
                <StatusPill
                  label={reservation.status}
                  tone={reservation.status === "Confirmada" ? "success" : reservation.status === "En acceso" ? "cyan" : "gold"}
                />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="space-y-4 p-6">
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
          Flujo de entrada
        </p>
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
