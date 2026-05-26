export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/38">
          {eyebrow}
        </p>
        <div className="space-y-2">
          <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-6 text-white/58 sm:text-[15px]">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {action}
    </div>
  );
}
