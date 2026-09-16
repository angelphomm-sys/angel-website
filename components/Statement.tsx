// One line in big serif, with a photo showing through the letters.
export function Statement() {
  return (
    <section className="border-t-2 border-ink py-12 md:py-14 flex flex-col gap-6 reveal">
      <h2 className="serif knockout drift text-[64px] sm:text-[96px] md:text-[140px] lg:text-[176px] leading-[0.9] tracking-[-0.04em] font-normal" style={{ backgroundImage: "url(/images/me/lake-landscape.jpg)" }}>
        [Statement, pending: one line that sums up the work I do, the claim the rest of this page proves before they contact me]
      </h2>
    </section>
  );
}
