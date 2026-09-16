type Name = "linkedin" | "instagram" | "cart" | "play" | "arrow" | "link" | "mail";

export function Icon({ name, size = 20, className }: { name: Name; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };
  switch (name) {
    case "linkedin":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7" /><path d="M8 7v.01" /><path d="M12 17v-4a2 2 0 0 1 4 0v4" /></svg>;
    case "instagram":
      return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></svg>;
    case "cart":
      return <svg {...common}><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.5" /><circle cx="9.5" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></svg>;
    case "play":
      return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M8 5v14l11-7z" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "link":
      return <svg {...common}><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  }
}
