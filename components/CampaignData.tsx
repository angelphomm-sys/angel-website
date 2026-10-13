// Small, dependency-free data components for case-study posts.
// Styled to the site tokens (paper, ink, mid, grey, line, mist, accent).
// Server components: no client JS, no hooks.

type StatItem = { value: string; label: string; accent?: boolean };

export function Stat({ items }: { items: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((s, i) => (
        <div
          key={i}
          className="border border-line rounded-2xl bg-card px-4 py-4 flex flex-col gap-1.5"
        >
          <span
            className="text-[27px] md:text-[31px] font-extrabold leading-none tracking-[-0.02em] tabular-nums"
            style={{ color: s.accent ? "var(--color-accent)" : "var(--color-ink)" }}
          >
            {s.value}
          </span>
          <span className="text-[12px] leading-snug text-mid">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

type BarItem = {
  label: string;
  value: number;
  display?: string;
  note?: string;
  highlight?: boolean;
};

export function Bars({
  items,
  max,
  caption,
  source,
}: {
  items: BarItem[];
  max?: number;
  caption?: string;
  source?: string;
}) {
  const top = max ?? Math.max(...items.map((b) => b.value), 1);
  return (
    <div className="border border-line rounded-2xl bg-card p-5 md:p-6">
      {caption && (
        <div className="text-[11px] font-bold uppercase tracking-[0.09em] text-mid mb-4">
          {caption}
        </div>
      )}
      <div className="flex flex-col gap-2.5">
        {items.map((b, i) => (
          <div
            key={i}
            className="grid grid-cols-[minmax(84px,32%)_1fr] items-center gap-3"
          >
            <span className="text-[12.5px] font-semibold text-ink leading-tight">
              {b.label}
            </span>
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="relative flex-1 h-[20px] rounded"
                style={{ background: "var(--color-mist)" }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded"
                  style={{
                    width: `${Math.max((b.value / top) * 100, 1.5)}%`,
                    background: b.highlight ? "var(--color-accent)" : "#cabfb4",
                  }}
                />
              </div>
              <span
                className="text-[12.5px] font-bold tabular-nums text-ink text-right shrink-0"
                style={{ minWidth: 42 }}
              >
                {b.display ?? b.value}
              </span>
              {b.note && (
                <span
                  className="text-[11px] tabular-nums text-mid text-right shrink-0"
                  style={{ minWidth: 50 }}
                >
                  {b.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {source && (
        <div className="text-[11px] leading-snug text-mid mt-4">{source}</div>
      )}
    </div>
  );
}
