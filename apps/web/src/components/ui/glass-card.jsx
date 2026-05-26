import { cn } from "@/lib/utils";

export function GlassCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "surface-glass rounded-[24px] border border-white/8 shadow-[var(--shadow-lg)]",
        className,
      )}
      {...props}
    />
  );
}
