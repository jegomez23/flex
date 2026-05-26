import { cn } from "@/lib/utils";

const tones = {
  violet: "border-[rgba(155,92,255,0.34)] bg-[rgba(155,92,255,0.12)] text-[var(--violet)]",
  cyan: "border-[rgba(0,212,255,0.34)] bg-[rgba(0,212,255,0.12)] text-[var(--cyan)]",
  gold: "border-[rgba(214,165,75,0.34)] bg-[rgba(214,165,75,0.12)] text-[var(--gold)]",
  success:
    "border-[rgba(85,230,165,0.34)] bg-[rgba(85,230,165,0.12)] text-[var(--success)]",
  danger:
    "border-[rgba(255,77,103,0.34)] bg-[rgba(255,77,103,0.12)] text-[var(--danger)]",
};

export function StatusPill({ label, tone = "violet" }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.28em]",
        tones[tone],
      )}
    >
      {label}
    </span>
  );
}
