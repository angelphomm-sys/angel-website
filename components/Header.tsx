"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";
import { track } from "@/lib/analytics";

export function Header() {
  const path = usePathname();
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="w-full mx-auto max-w-[1440px] px-5 md:px-20 pt-5 md:pt-7">
      <div className="flex items-center justify-between gap-6 min-h-[48px]">
        <div className="flex items-center min-w-0">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 md:gap-6 text-[15px] md:text-[17px] font-medium">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={`navlink ${isActive(item.href) ? "is-active font-extrabold text-ink" : "text-mid hover:text-ink"}`}>
                <span className="num">{item.n}</span>{item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 md:gap-4 text-[14px] font-bold shrink-0">
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hidden sm:flex hover:text-accent"><Icon name="linkedin" /></a>
          <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden sm:flex hover:text-accent"><Icon name="instagram" /></a>
          <a href="#subscribe" className="hidden lg:inline border-b-2 border-ink hover:text-accent hover:border-accent">subscribe</a>
          <a href="/Angel_Phommachan_Resume.pdf" onClick={() => track("resume_download")} className="hidden sm:inline-flex border-2 border-ink rounded-full px-4 py-2 hover:bg-mist whitespace-nowrap">résumé</a>
          <Link href="/contact" onClick={() => track("cta_header_sayhi")} className="bg-ink text-white rounded-full px-4 py-2.5 md:px-5 hover:bg-mid transition-colors whitespace-nowrap">say hi →</Link>
        </div>
      </div>
    </header>
  );
}
