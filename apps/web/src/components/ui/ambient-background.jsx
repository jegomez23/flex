import { cn } from "@/lib/utils";

export function AmbientBackground({ className }) {
  return (
    <>
      <div className={cn("ambient-grid absolute inset-0 opacity-30", className)} />
      <div className="ambient-orb ambient-orb-violet" />
      <div className="ambient-orb ambient-orb-cyan" />
    </>
  );
}
