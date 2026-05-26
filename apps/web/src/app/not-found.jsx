import Link from "next/link";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <AmbientBackground />
      <GlassCard className="relative w-full max-w-lg p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">404</p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-[-0.02em] text-white">
          Esta ruta no forma parte de FLEX
        </h1>
        <p className="mt-4 text-sm leading-6 text-white/58">
          La pagina que buscas no esta disponible. Vuelve al inicio y continua tu
          experiencia.
        </p>
        <NeonButton asChild className="mt-8">
          <Link href="/inicio">Volver al inicio</Link>
        </NeonButton>
      </GlassCard>
    </main>
  );
}
