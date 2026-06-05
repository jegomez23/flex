import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSessionContext } from "@/lib/supabase/queries";

const guideNotes = [
  "Identifica con rapidez la zona que mejor encaja con tu plan.",
  "Consulta el recorrido de entrada antes de llegar al club.",
  "Ubica los espacios con mejor vista para reservar con criterio.",
];

export default async function ExplorePage() {
  const { supabase, user } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const [roomsResult, tablesResult, productsResult] = await Promise.all([
    supabase
      .from("salas_vip")
      .select("id, nombre, descripcion, capacidad, precio_hora, imagen_url, activa")
      .order("nombre", { ascending: true }),
    supabase
      .from("mesas")
      .select("id, numero, piso, capacidad, activa")
      .order("piso", { ascending: true })
      .order("numero", { ascending: true }),
    supabase
      .from("productos")
      .select("id")
      .eq("disponible", true),
  ]);

  const rooms = roomsResult.data ?? [];
  const tables = tablesResult.data ?? [];
  const productCount = (productsResult.data ?? []).length;

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Explorar"
        title="Conoce FLEX antes de llegar"
        description="Recorre los puntos clave del club con datos reales de salas, mesas y oferta activa."
      />

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="p-6 sm:p-7">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                Mapa de la noche
              </p>
              <h2 className="text-2xl font-medium text-white">
                Un recorrido claro para decidir mejor.
              </h2>
            </div>

            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="rounded-3xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-medium text-white">{room.nombre}</p>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/36">
                      {room.activa ? "Activa" : "Inactiva"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/58">
                    {room.descripcion ?? "Zona VIP disponible para reservas privadas."}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.24em] text-white/36">
                    <span>{room.capacidad ?? "—"} plazas</span>
                    <span>{room.precio_hora ?? "—"} €/h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-7">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                Vista guiada
              </p>
              <h2 className="text-2xl font-medium text-white">
                Menos ruido, mejores decisiones.
              </h2>
            </div>

            <div className="space-y-3">
              {guideNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-3xl border border-white/8 bg-white/[0.02] p-4 text-sm leading-6 text-white/60"
                >
                  {note}
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                Mesas activas
              </p>
              <p className="mt-3 text-3xl font-medium text-white">{tables.length}</p>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Productos activos: {productCount}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageReveal>
  );
}
