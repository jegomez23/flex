import { GlassCard } from "@/components/ui/glass-card";

export function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}) {
  return (
    <GlassCard className="w-full p-7 sm:p-8">
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/40">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-white">
          {title}
        </h1>
        <p className="max-w-sm text-sm leading-6 text-white/58">{description}</p>
      </div>
      <div className="mt-8">{children}</div>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </GlassCard>
  );
}
