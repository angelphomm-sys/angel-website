// The mark: a moment spreading outward. One solid point, two rings that widen to the right.
// It reads as "something people gather around" and as a signal going out, which is the work.
export function Mark({ size = 28, color = "currentColor", className }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="16" r="5" fill={color} />
      <path d="M18 8.5a10 10 0 0 1 0 15" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M23.5 4.5a15.5 15.5 0 0 1 0 23" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Mark size={28} />
      <span className="text-[17px] font-extrabold tracking-[-0.02em] leading-none">angel phommachan</span>
    </span>
  );
}

// The mark with a photo showing through, for About.
export function LogoKnockout({ src, size = 120 }: { src: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <mask id="mark-mask">
          <rect width="32" height="32" fill="black" />
          <circle cx="11" cy="16" r="5" fill="white" />
          <path d="M18 8.5a10 10 0 0 1 0 15" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M23.5 4.5a15.5 15.5 0 0 1 0 23" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
        </mask>
      </defs>
      <image href={src} width="32" height="32" preserveAspectRatio="xMidYMid slice" mask="url(#mark-mask)" />
    </svg>
  );
}
