import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";

export function VipRoomCard({ room }) {
  const description = room.mood ?? room.description ?? "Sala VIP real de FLEX.";
  const price = room.price ?? room.priceLabel ?? (room.price_hora ? `${Number(room.price_hora).toLocaleString("es-ES")} / hora` : "—");
  const highlights = room.highlights ?? [room.active ? "Activa" : "Inactiva"];

  return (
    <GlassCard
      className="overflow-hidden p-0"
      style={{
        background: room.surface ?? "rgba(255,255,255,0.02)",
        borderColor: room.border ?? "rgba(255,255,255,0.1)",
        boxShadow: room.glow ?? "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">
              Sala VIP
            </p>
            <h3 className="mt-3 text-2xl font-medium text-white">{room.name}</h3>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]"
            style={{ color: room.accent ?? "#9b5cff", borderColor: room.border ?? "rgba(255,255,255,0.12)" }}
          >
            {price}
          </span>
        </div>
        <p className="text-sm leading-6 text-white/64">{description}</p>
        <div className="grid gap-2 text-sm text-white/70">
          <p>Capacidad: {room.capacity}</p>
          {highlights.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <NeonButton variant="secondary" className="w-full">
          Ver {room.name}
        </NeonButton>
      </div>
    </GlassCard>
  );
}
