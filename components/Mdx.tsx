import { Children, isValidElement } from "react";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { YouTube, TikTok, Instagram, Figure, Gallery, Todo, LinkCard } from "./Media";
import { Stat, Bars, Table } from "./CampaignData";
import { getWork } from "@/lib/work";

// A paragraph that is only links and separators ("More posts · Say hi") is a row of buttons in
// disguise, so its links get full 44px tap targets. Links inside running text stay inline.
function P({ children, ...rest }: React.ComponentProps<"p">) {
  const parts = Children.toArray(children);
  const linkRow = parts.length > 1 && parts.every((c) => (isValidElement(c) && c.type === "a") || (typeof c === "string" && /^[\s·|/•–-]*$/.test(c)));
  return <p {...rest} className={linkRow ? "link-row" : undefined}>{children}</p>;
}

// Wraps a line that links to a case study. It renders only while that case is on the site, so a post never
// links to work that is hidden in production (lib/work.ts filters unfinished cases out of `work`).
function IfWork({ slug, children }: { slug: string; children: React.ReactNode }) {
  return getWork(slug) ? <>{children}</> : null;
}

const components = { YouTube, TikTok, Instagram, Figure, Gallery, Todo, LinkCard, Stat, Bars, Table, IfWork, p: P };

export async function Mdx({ source }: { source: string }) {
  const compiled = await compile(source, { outputFormat: "function-body", development: false });
  const { default: Content } = await run(compiled, { ...runtime, baseUrl: import.meta.url });
  return (
    <div className="prose-post">
      <Content components={components} />
    </div>
  );
}
