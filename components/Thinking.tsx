// The three rules, each credited to the book it came from. The rule and the book are all that
// shows; the reasoning sits in the tooltip and in the blog, so this block reads in a glance.
const rules: { rule: string; why: string; book: string }[] = [
  { rule: "Build the trigger before the post.", why: "Things spread when they give people something to say. Plan what the audience will repeat, then make the content.", book: "Contagious" },
  { rule: "Design for the fast decision.", why: "Most choices are made in a second. Make the first frame, the first line, and the first click easy. Earn the slow read after.", book: "Thinking, Fast and Slow" },
  { rule: "Post it anyway.", why: "You cannot control the reaction, only the work. Ship on schedule, read the numbers honestly, fix it next week.", book: "The Courage to Be Disliked" },
];

export function Thinking() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {rules.map((r) => (
        <div key={r.rule} className="bg-mist rounded-3xl p-5 md:p-6 flex flex-col gap-2" title={r.why}>
          <span className="text-[19px] md:text-[20px] font-display font-normal tracking-[-0.01em] leading-tight">{r.rule}</span>
          <span className="hand text-[14px] text-mid mt-auto pt-1">from {r.book}</span>
        </div>
      ))}
    </div>
  );
}
