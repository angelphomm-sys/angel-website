"use client";
import { useEffect } from "react";
import Link from "next/link";
import { track, type EventName } from "@/lib/analytics";

// Fire an event once when this mounts (for example, a case study being opened).
export function TrackView({ event }: { event: EventName }) {
  useEffect(() => { track(event); }, [event]);
  return null;
}

// A link that reports a click. Internal hrefs use next/link; external or file hrefs use a plain anchor.
export function TrackLink({ event, href, className, children, ...rest }: { event: EventName; href: string; className?: string; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const onClick = () => track(event);
  if (href.startsWith("/") && !href.endsWith(".pdf")) return <Link href={href} className={className} onClick={onClick} {...rest}>{children}</Link>;
  return <a href={href} className={className} onClick={onClick} {...rest}>{children}</a>;
}
