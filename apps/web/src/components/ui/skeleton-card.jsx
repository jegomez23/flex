export function SkeletonCard() {
  return (
    <div className="surface-glass animate-pulse rounded-[28px] border border-white/10 p-5">
      <div className="h-3 w-20 rounded-full bg-white/10" />
      <div className="mt-4 h-8 w-40 rounded-full bg-white/10" />
      <div className="mt-6 h-24 rounded-[24px] bg-white/6" />
    </div>
  );
}
