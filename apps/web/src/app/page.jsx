import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { heroMoments, splashStats, vipRooms } from "@/data/mock-data";

export default function SplashPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)]">
      <AmbientBackground />

      <PageReveal className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-16 pt-8 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="brand-mark">FLEX</div>
            <span className="hidden text-[10px] uppercase tracking-[0.35em] text-white/42 sm:inline-block">
              Noche premium
            </span>
          </div>
          <Link href="/acceso" className="ghost-link">
            Iniciar sesion
          </Link>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/68">
              Reserva, entra y vive la noche desde un solo lugar.
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/38">
                Bienvenido a FLEX
              </p>
              <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
                Una experiencia nocturna
                <span className="gradient-text"> clara, elegante </span>
                y pensada para moverse contigo.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                FLEX une reservas, salas VIP, pedidos, acceso QR y sugerencias al DJ
                en una experiencia simple y premium.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <NeonButton asChild size="lg">
                <Link href="/inicio">
                  Abrir FLEX
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </NeonButton>
              <NeonButton asChild variant="secondary" size="lg">
                <Link href="/salas-vip">Ver salas VIP</Link>
              </NeonButton>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {splashStats.map((stat) => (
                <GlassCard key={stat.label} className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/36">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-lg font-medium text-white">{stat.value}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <GlassCard className="p-6 sm:p-7">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                  Esta noche
                </p>
                <h2 className="text-2xl font-medium leading-tight text-white">
                  Todo lo importante aparece con calma y en el momento correcto.
                </h2>
              </div>

              <div className="space-y-4">
                {heroMoments.map((moment) => (
                  <div
                    key={moment.title}
                    className="rounded-3xl border border-white/8 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-medium text-white">{moment.title}</p>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/36">
                        {moment.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                      {moment.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {vipRooms.map((room) => (
                  <div
                    key={room.slug}
                    className="rounded-3xl border p-4"
                    style={{
                      borderColor: room.border,
                      background: room.surface,
                      boxShadow: room.glow,
                    }}
                  >
                    <p className="text-sm font-medium text-white">{room.name}</p>
                    <p className="mt-2 text-sm leading-6 text-white/58">{room.capacity}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>
      </PageReveal>
    </main>
  );
}
