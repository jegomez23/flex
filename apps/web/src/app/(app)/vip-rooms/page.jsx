import { redirect } from "next/navigation";
import { VipRoomCard } from "@/components/experience/vip-room-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getSessionContext } from "@/lib/supabase/queries";

const ROOM_ACCENTS = ["#6b7280", "#ff4d67", "#d6a54b"];

export default async function VipRoomsPage() {
  const { supabase, user } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { data: rooms } = await supabase
    .from("salas_vip")
    .select("id, nombre, descripcion, capacidad, precio_hora, imagen_url, activa")
    .order("id", { ascending: true });

  const roomsForDisplay = (rooms ?? []).map((room, index) => ({
    ...room,
    price: `${Number(room.precio_hora).toLocaleString("es-ES")} / hora`,
    mood: room.descripcion,
    border: index === 1 ? "rgba(255,77,103,0.34)" : index === 2 ? "rgba(214,165,75,0.34)" : "rgba(255,255,255,0.14)",
    accent: ROOM_ACCENTS[index % ROOM_ACCENTS.length],
    surface:
      index === 1
        ? "linear-gradient(180deg, rgba(255,77,103,0.14), rgba(18,3,8,0.86)), rgba(18,3,8,0.9)"
        : index === 2
          ? "linear-gradient(180deg, rgba(214,165,75,0.16), rgba(20,12,2,0.88)), rgba(20,12,2,0.92)"
          : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)), rgba(8,8,10,0.82)",
    glow:
      index === 1
        ? "0 0 36px rgba(255,77,103,0.14), inset 0 1px 0 rgba(255,255,255,0.06)"
        : index === 2
          ? "0 0 40px rgba(214,165,75,0.14), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
    highlights: [room.activa ? "Activa" : "Inactiva", `Capacidad ${room.capacidad}`, room.imagen_url ? "Imagen disponible" : "Sin imagen"],
  }));

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Salas VIP"
        title="Tres ambientes, una misma elegancia"
        description="Datos reales de public.salas_vip."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {roomsForDisplay.map((room) => (
          <VipRoomCard key={room.id} room={room} />
        ))}
      </div>
    </PageReveal>
  );
}
