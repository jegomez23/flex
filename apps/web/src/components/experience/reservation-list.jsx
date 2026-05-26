import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/components/ui/status-pill";

function toneForStatus(status) {
  if (status === "Confirmada") return "success";
  if (status === "En acceso") return "cyan";
  return "gold";
}

export function ReservationList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((reservation) => (
        <GlassCard key={reservation.code} className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                Reserva {reservation.code}
              </p>
              <p className="text-xl font-medium text-white">{reservation.space}</p>
              <p className="text-sm text-white/58">
                {reservation.date} / {reservation.time} / {reservation.guests} personas
              </p>
            </div>
            <StatusPill
              label={reservation.status}
              tone={toneForStatus(reservation.status)}
            />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
