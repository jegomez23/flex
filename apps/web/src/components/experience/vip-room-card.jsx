import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";

export function VipRoomCard({ room }) {
  return (
    <GlassCard
      className="overflow-hidden p-0"
      style={{
        background: room.surface,
        borderColor: room.border,
        boxShadow: room.glow,
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
            style={{ color: room.accent, borderColor: room.border }}
          >
            {room.price}
          </span>
        </div>
        <p className="text-sm leading-6 text-white/64">{room.mood}</p>
        <div className="grid gap-2 text-sm text-white/70">
          <p>Capacidad: {room.capacity}</p>
          {room.highlights.map((item) => (
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
