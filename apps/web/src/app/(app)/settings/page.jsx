import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSessionContext } from "@/lib/supabase/queries";

export default async function SettingsPage() {
  const { user, profile } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Ajustes"
        title="Configura tu experiencia"
        description="Cuenta real y preferencias de la sesión actual."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Cuenta
          </p>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            Nombre: {profile?.nombre ?? "—"}
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            Correo: {user.email ?? "—"}
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            Rol: {profile?.rol ?? "cliente"}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Preferencias
          </p>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            Las preferencias de experiencia se mantienen a nivel visual hasta que exista una tabla específica para persistirlas.
          </div>
        </GlassCard>
      </div>
    </PageReveal>
  );
}
