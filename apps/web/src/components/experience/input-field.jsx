import { cn } from "@/lib/utils";

export function InputField({ label, className, ...props }) {
  return (
    <label className="block space-y-3">
      <span className="text-[10px] uppercase tracking-[0.24em] text-white/44">
        {label}
      </span>
      <input
        className={cn(
          "h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/18 focus:bg-white/[0.06]",
          className,
        )}
        {...props}
      />
    </label>
  );
}
