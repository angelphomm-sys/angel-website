"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

// Phone-only action bar. The header pill scrolls away on a phone, so this keeps one
// way to reach her at the bottom of the thumb's reach. Hidden on /contact, where the
// form already is, and hidden from md up, where the header pill is always on screen.
export function StickyCta() {
  const path = usePathname();
  if (path.startsWith("/contact")) return null;
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-3 bg-paper/95 backdrop-blur-sm border-t border-line">
      <Link
        href="/contact"
        onClick={() => track("cta_sticky_sayhi")}
        className="flex items-center justify-center w-full bg-accent text-cream rounded-full px-6 py-3.5 text-[15px] font-semibold active:bg-accent-deep"
      >
        Say hi
      </Link>
    </div>
  );
}
