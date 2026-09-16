import Link from "next/link";

// The three rules, each credited to the book it came from. Filled blocks, not outlined cards,
// so this section does not read the same as the one above it.
const rules: { rule: string; why: string; book: string }[] = [
  { rule: "Build the trigger before the post.", why: "Things spread when they give people something to say. Plan what the audience will repeat, then make the content.", book: "Contagious" },
  { rule: "Design for the fast decision.", why: "Most choices are made in a second. Make the first frame, the first line, and the first click easy. Earn the slow read after.", book: "Thinking, Fast and Slow" },
  { rule: "Post it anyway.", why: "You cannot control the reaction, only the work. Ship on schedule, read the numbers honestly, fix it next week.", book: "The Courage to Be Disliked" },
];

export function Thinking() {
  return (
    <div className="grid gap-4 md:grid-cols-6">
      {rules.map((r, i) => {
        const wide = i === 0;
        return (
          <div key={r.rule} className={`bg-mist rounded-3xl p-6 flex gap-5 items-start ${wide ? "md:col-span-6 md:items-center" : "md:col-span-3"}`}>
            <div className="flex flex-col gap-2 min-w-0">
              <span className={`font-extrabold tracking-[-0.02em] leading-tight ${wide ? "text-[24px] md:text-[30px]" : "text-[19px]"}`}>{r.rule}</span>
              <span className="text-[14px] leading-relaxed text-mid">{r.why}</span>
              <span className="hand text-[19px] text-mid mt-auto">from {r.book}</span>
            </div>
          </div>
        );
      })}
      <Link href="/about#shelf" className="md:col-span-6 flex items-center justify-between gap-4 border-2 border-ink rounded-3xl px-6 py-5 hover:bg-ink hover:text-white transition-colors">
        <span className="text-[16px] font-bold">The rest of what I am reading, and the films.</span>
        <span className="text-[16px] font-bold shrink-0">the shelf →</span>
      </Link>
    </div>
  );
}
