"use client";
import { useEffect, useState } from "react";

// Thin line at the top of a case study that fills as you read.
export function CaseProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => { const d = document.documentElement; const max = d.scrollHeight - d.clientHeight; setW(max > 0 ? Math.min(100, (d.scrollTop / max) * 100) : 0); };
    on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="case-progress" style={{ width: `${w}%` }} aria-hidden="true" />;
}
