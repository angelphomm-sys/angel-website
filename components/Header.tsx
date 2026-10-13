"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { track } from "@/lib/analytics";

export function Header() {
  const path = usePathname();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="w-full mx-auto max-w-[1440px] px-5 md:px-20 pt-3 md:pt-5">
      {/* The brand, its purpose, on every page: the monogram and wordmark, then the actions. */}
      <div className="flex items-center justify-between gap-4 pb-2 md:pb-3">
        <Link href="/" aria-label={`${site.name}, ${site.role.toLowerCase()}: home`} className="group flex items-center gap-3 min-w-0 text-ink hover:text-accent transition-colors">
          <Logo />
          <span className="hidden lg:inline font-mono text-[11px] font-medium uppercase tracking-[0.1em] border-l border-line pl-3 leading-none py-1">{site.role.toLowerCase()}</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hidden sm:flex items-center justify-center w-11 h-11 -m-2 hover:text-accent-deep"><Icon name="linkedin" /></a>
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden sm:flex items-center justify-center w-11 h-11 -m-2 hover:text-accent-deep"><Icon name="instagram" /></a>
          <Link href="/contact" onClick={() => track("cta_header_sayhi")} className="inline-flex items-center min-h-11 bg-accent text-cream font-mono text-[13px] md:text-[14px] font-medium lowercase tracking-[0.02em] rounded-full px-4 md:px-5 hover:bg-accent-deep transition-colors whitespace-nowrap">say hi →</Link>
        </div>
      </div>
      <nav aria-label="Main" className="flex flex-wrap items-center gap-x-2.5 gap-y-0 min-[400px]:gap-x-4 sm:gap-x-6 md:gap-x-8 border-t border-line font-mono text-[12px] min-[400px]:text-[13px] sm:text-[14px] md:text-[15px] lowercase sm:tracking-[0.02em]">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`navlink ${isActive(item.href) ? "is-active font-bold text-ink" : "font-normal text-ink hover:text-accent-deep"}`}>
            <span className="num">{item.n}</span>{item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
