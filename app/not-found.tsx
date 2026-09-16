import Link from "next/link";
export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 md:px-20 py-24 flex flex-col gap-6 items-start">
      <span className="hand text-[28px] text-mid">404</span>
      <h1 className="text-[48px] md:text-[88px] font-extrabold tracking-[-0.03em] leading-none">that page wandered off.</h1>
      <Link href="/" className="bg-ink text-white rounded-full px-6 py-3.5 text-[15px] font-bold hover:bg-mid transition-colors">back to hello →</Link>
    </section>
  );
}
