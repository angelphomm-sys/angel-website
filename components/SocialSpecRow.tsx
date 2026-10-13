"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import s from "./SocialSpecRow.module.css";
import { socialSpecIntro, socialSpecPosts, specBrandColor, type SocialSpecPost } from "@/lib/social-spec";

// Spec Instagram posts, one phone each: a row that scrolls sideways on a phone (the next phone peeks in),
// two by two on a tablet, and four across from 1280px. The row bleeds to the page edge on mobile,
// so the parent should carry the usual px-5 gutter. Clicking a phone opens a dialog with the caption and the strategy.
export function SocialSpecRow({ posts = socialSpecPosts, intro = socialSpecIntro, single = false }: { posts?: SocialSpecPost[]; intro?: string | null; single?: boolean }) {
  const [open, setOpen] = useState<SocialSpecPost | null>(null);
  const [idx, setIdx] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const show = (p: SocialSpecPost, btn: HTMLButtonElement) => { opener.current = btn; setOpen(p); };
  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const d = dialog.current; if (!d || !open) return;
    if (!d.open) d.showModal();
    const html = document.documentElement; const prev = html.style.overflow; html.style.overflow = "hidden";
    // The native modal makes the page inert; this keeps Tab cycling inside the sheet as well.
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const f = [...d.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    d.addEventListener("keydown", trap);
    return () => { d.removeEventListener("keydown", trap); html.style.overflow = prev; };
  }, [open]);

  // Esc and the close button both end in the dialog's close event; focus goes back to the phone that opened it.
  const onClose = () => { setOpen(null); opener.current?.focus(); };

  return (
    <div className="flex flex-col gap-6">
      {intro && <p className="text-[18px] leading-relaxed max-w-[620px]">{intro}</p>}

      {single ? (
        <div className="flex flex-col items-center gap-4">
          {(() => { const p = posts[idx]; return (
            <>
              <button type="button" className={s.open} style={{ maxWidth: "min(300px, calc((100svh - 260px) * 757 / 1558))" }} onClick={(e) => show(p, e.currentTarget)} aria-haspopup="dialog" aria-label={`${p.title}. Open the larger view`}>
                <Phone post={p} />
              </button>
              <div className="flex flex-col gap-1 text-center max-w-[340px]">
                <span className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{p.title}</span>
                <span className="text-[15px] leading-relaxed text-mid">{p.why}</span>
              </div>
            </>
          ); })()}
          <div className="flex items-center gap-4">
            <button type="button" className="hit w-11 h-11 rounded-full border-2 border-line flex items-center justify-center hover:border-ink" onClick={() => setIdx((idx + posts.length - 1) % posts.length)} aria-label="Previous post">←</button>
            <span className="font-mono text-[13px] tabular-nums" aria-live="polite">{idx + 1} / {posts.length}</span>
            <button type="button" className="hit w-11 h-11 rounded-full border-2 border-line flex items-center justify-center hover:border-ink" onClick={() => setIdx((idx + 1) % posts.length)} aria-label="Next post">→</button>
          </div>
        </div>
      ) : (
      <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 xl:grid-cols-4 md:gap-x-10 md:gap-y-14 xl:gap-x-8 md:overflow-visible [scrollbar-width:none]">
        {posts.map((p) => (
          <li key={p.slug} className="shrink-0 w-[72vw] max-w-[300px] md:w-auto md:max-w-none snap-center flex flex-col items-center gap-4">
            <button type="button" className={s.open} onClick={(e) => show(p, e.currentTarget)} aria-haspopup="dialog" aria-label={`${p.brand} spec post, ${p.title}. Open the larger view`}>
              <Phone post={p} />
            </button>
            <div className="flex flex-col gap-1 text-center max-w-[300px]">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{p.brand} · {p.format}</span>
              <span className="text-[18px] font-display font-normal tracking-[-0.01em] leading-tight">{p.title}</span>
              <span className="text-[15px] leading-relaxed text-mid">{p.why}</span>
              {!p.note && <span className="text-[12px] leading-snug text-mid mt-1">Spec concept · not affiliated with {p.brand}</span>}
            </div>
          </li>
        ))}
      </ul>
      )}

      <dialog ref={dialog} className={s.dialog} onClose={onClose} aria-labelledby="spec-dialog-title" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
        {open && (
          <div className={s.sheet}>
            <button type="button" className={s.close} onClick={close} autoFocus>close <span aria-hidden="true">×</span></button>
            <div className={s.big} style={open.ratio ? { aspectRatio: open.ratio } : undefined}>
              <Image src={open.src} alt={open.alt} fill sizes="(min-width: 768px) 540px, 92vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.08em] text-mid">{open.brand} · {open.format} · @{open.handle}</span>
                <h3 id="spec-dialog-title" className="text-h3 font-semibold tracking-[-0.01em]">{open.title}</h3>
              </div>
              <div className="flex flex-col gap-1 text-[16px] leading-relaxed">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em]">Caption</span>
                {open.caption.map((line) => <p key={line}>{line}</p>)}
              </div>
              <div className="flex flex-col gap-2 text-[16px] leading-relaxed">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em]">The strategy</span>
                <dl className="flex flex-col gap-2">
                  <div><dt className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-mid">Pillar</dt><dd>{open.strategy.pillar}</dd></div>
                  <div><dt className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-mid">Audience</dt><dd>{open.strategy.audience}</dd></div>
                  <div><dt className="text-[12px] font-mono font-medium uppercase tracking-[0.08em] text-mid">Why it resonates</dt><dd>{open.strategy.resonates}</dd></div>
                </dl>
              </div>
              <p className="text-[13px] leading-snug text-mid">{open.note ?? `Spec concept · not affiliated with ${open.brand}. ${open.credit} No brand photography or logos.`}</p>
              {open.post && <Link href={open.post.href} className="hit text-[15px] font-semibold underline underline-offset-4 self-start">{open.post.label}</Link>}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

// The phone: Instagram's single-post view at the screen's scale, with the post image in the 4:5 slot.
function Phone({ post }: { post: SocialSpecPost }) {
  const c = specBrandColor[post.brand];
  const first = post.caption[0];
  return (
    <div className={s.phone}>
      <div className={s.screen}>
        <div className={s.island} aria-hidden="true" />
        <div className={s.status} aria-hidden="true">
          <span>9:41</span>
          <span className={s.statusIcons}>
            <svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
            <svg viewBox="0 0 16 12"><path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.3-1.4A10.6 10.6 0 0 0 8 .5 10.6 10.6 0 0 0 .7 3.5L2 4.9a8.6 8.6 0 0 1 6-2.4Zm0 3.8c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.7 6.7 0 0 0 8 4.3a6.7 6.7 0 0 0-4.7 1.9l1.3 1.4c.9-.8 2.1-1.3 3.4-1.3Zm0 3.7 1.9-1.9a2.7 2.7 0 0 0-3.8 0L8 10Z" /></svg>
            <svg viewBox="0 0 27 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="19" height="8" rx="1.8" /><rect x="24" y="4" width="2" height="4" rx="1" opacity=".4" /></svg>
          </span>
        </div>
        <div className={s.nav} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4 7 12l8 8" /></svg>
          <span className={s.navTitle}><span className={s.navHandle}>{post.handle}</span><span className={s.navPosts}>Posts</span></span>
          <span />
        </div>
        <div className={s.head} aria-hidden="true">
          <span className={s.avatar} style={{ background: c.bg, color: c.fg }}>{post.brand[0]}</span>
          <span className={s.handle}>{post.handle}</span>
          <svg className={s.more} viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
        </div>
        <div className={s.media} style={post.ratio ? { aspectRatio: post.ratio } : undefined}>
          <Image src={post.src} alt={post.alt} fill sizes="(min-width: 768px) 280px, 68vw" className="object-cover" />
          {post.slides && <span className={s.count} aria-hidden="true">1/{post.slides}</span>}
        </div>
        <div className={s.actions} aria-hidden="true">
          <span className={s.actionsLeft}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M12 20.5s-8-4.9-8-10.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8 2.5c0 5.7-8 10.6-8 10.6Z" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M20.7 16.5A9 9 0 1 0 17 20l3.9 1-.2-4.5Z" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M21.5 3 3 10.2l7.2 3.1L21.5 3Zm0 0-7.3 18-4-7.7" /></svg>
          </span>
          {post.slides ? <span className={s.dots}>{Array.from({ length: post.slides }, (_, i) => <span key={i} />)}</span> : <span />}
          <svg className={s.save} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M19 21 12 15.5 5 21V3h14v18Z" /></svg>
        </div>
        <p className={s.caption} aria-hidden="true"><b>{post.handle}</b>{first} <i>more</i></p>
        <div className={s.tabs} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6 2.5 10.4V21.5h6.7v-6.4h5.6v6.4h6.7V10.4L12 2.6Z" /></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5.5 5.5" strokeLinecap="round" /></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M12 7.5v9M7.5 12h9" strokeLinecap="round" /></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><path d="M3 8.5h18M9 3l2.5 5.5M14.5 3 17 8.5M10 12v6l5-3-5-3Z" /></svg>
          <span style={{ width: "6.6cqw", height: "6.6cqw", borderRadius: "50%", background: "#dbdbdb", display: "block" }} />
        </div>
        <div className={s.homebar} aria-hidden="true" />
      </div>
      <Image src="/images/mockups/iphone-16-frame.png" alt="" fill sizes="(min-width: 768px) 300px, 72vw" className="pointer-events-none select-none" />
    </div>
  );
}
