import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { getSessionContext } from "@/lib/supabase/queries";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function ProfilePage() {
  const { user, profile } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const displayName = profile?.nombre ?? user.email ?? "Usuario FLEX";
  const avatar = profile?.avatar_url ?? null;

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Mi perfil"
        title="Tu cuenta real en FLEX"
        description="Información tomada directamente de tu sesión y de public.perfiles."
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <GlassCard className="space-y-5 p-6">
          <div className="flex items-center gap-4">
            {avatar ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatar}
                  alt={displayName}
                  className="h-16 w-16 rounded-full border border-white/10 object-cover"
                />
              </>
            ) : (
              <div className="grid h-16 w-16 place-items-center rounded-full border border-[rgba(155,92,255,0.3)] bg-[rgba(155,92,255,0.14)] text-xl font-medium text-white">
                {initials(displayName)}
              </div>
            )}
            <div className="space-y-2">
              <h2 className="text-2xl font-medium text-white">{displayName}</h2>
              <StatusPill label={profile?.rol ?? "cliente"} tone="violet" />
            </div>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Nombre
              </p>
              <p className="mt-3 text-lg text-white">{profile?.nombre ?? "—"}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Correo
              </p>
              <p className="mt-3 text-lg text-white">{user.email ?? "—"}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Rol
              </p>
              <p className="mt-3 text-lg text-white">{profile?.rol ?? "cliente"}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Estado de cuenta
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Perfil ID
              </p>
              <p className="mt-3 text-sm text-white/70">{profile?.id ?? user.id}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">
                Creado
              </p>
              <p className="mt-3 text-sm text-white/70">
                {profile?.creado_en ? new Date(profile.creado_en).toLocaleString("es-ES") : "—"}
              </p>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
            Preferencias
          </p>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">
            Tu experiencia se adapta a tu rol y a los datos reales de tu sesión.
          </div>
        </GlassCard>
      </div>
    </PageReveal>
  );
}
