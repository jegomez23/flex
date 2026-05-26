import { GlassCard } from "@/components/ui/glass-card";

export function MetricCard({ label, value, change }) {
  return (
    <GlassCard className="space-y-3 p-5">
      <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
        {label}
      </p>
      <div className="flex items-end justify-between gap-3">
        <p className="text-2xl font-medium text-white">{value}</p>
        {change ? <p className="text-xs text-white/48">{change}</p> : null}
      </div>
    </GlassCard>
  );
}
