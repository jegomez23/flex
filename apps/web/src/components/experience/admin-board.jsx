import { adminSignals, analytics, liveActivity } from "@/data/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { MetricCard } from "@/components/experience/metric-card";

export function AdminBoard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analytics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
          />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-5 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Operacion en sala
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {adminSignals.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                  {item.label}
                </p>
                <p className="mt-4 text-xl font-medium text-white">{item.value}</p>
                <div
                  className="mt-4 h-1 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${item.tint}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">
            Actividad en vivo
          </p>
          {liveActivity.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white/62"
            >
              {item}
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}
