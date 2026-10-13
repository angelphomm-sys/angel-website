import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-24 flex flex-col gap-6 items-start">
      <span className="hand text-[20px] text-mid">404</span>
      <h1 className="text-[48px] md:text-[88px] font-display font-normal tracking-[-0.01em] leading-none">that page wandered off.</h1>
      <Link href="/" className="bg-accent text-cream rounded-full px-6 py-3.5 font-mono text-[14px] font-medium lowercase tracking-[0.02em] hover:bg-accent-deep transition-colors">back to hello →</Link>
    </section>
  );
}
