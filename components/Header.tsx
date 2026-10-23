"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { track } from "@/lib/analytics";

// One bar on wide screens (lockup, nav, actions); on phones the nav drops to its own row under the lockup.
export function Header() {
  const path = usePathname();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="w-full border-b border-line">
      <div className="mx-auto max-w-[1440px] px-5 md:px-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-1 pt-3 lg:py-3">
        <Link href="/" aria-label={`${site.name}, ${site.role.toLowerCase()}: home`} className="flex items-center min-h-11 min-w-0 text-ink hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <nav aria-label="Main" className="order-last lg:order-none w-full lg:w-auto flex flex-wrap items-center gap-x-4 min-[400px]:gap-x-5 sm:gap-x-7 text-[14px] sm:text-[15px] font-medium -mx-0.5 lg:mx-0">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`navlink ${isActive(item.href) ? "is-active text-ink" : "text-ink hover:text-accent"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hidden sm:flex items-center justify-center w-11 h-11 -m-2 hover:text-accent"><Icon name="linkedin" /></a>
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden sm:flex items-center justify-center w-11 h-11 -m-2 hover:text-accent"><Icon name="instagram" /></a>
          <Link href="/contact" onClick={() => track("cta_header_sayhi")} className="inline-flex items-center min-h-11 bg-accent text-cream text-[14px] md:text-[15px] font-semibold rounded-full px-5 hover:bg-accent-deep transition-colors whitespace-nowrap">Say hi</Link>
        </div>
      </div>
    </header>
  );
}
