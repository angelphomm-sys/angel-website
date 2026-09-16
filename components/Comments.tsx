"use client";
import Giscus from "@giscus/react";

export function Comments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` | undefined;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General";
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  if (!repo || !repoId || !categoryId) {
    return (
      <p className="text-[12px] font-bold text-mid border-2 border-dashed border-line rounded-2xl p-4">
        Comments are open once Giscus is configured (see README · NEXT_PUBLIC_GISCUS_*).
      </p>
    );
  }
  return (
    <Giscus repo={repo} repoId={repoId} category={category} categoryId={categoryId} mapping="pathname" reactionsEnabled="1" emitMetadata="0" inputPosition="top" theme="light" lang="en" loading="lazy" />
  );
}
