"use client";
import Giscus from "@giscus/react";

// True once the three Giscus env vars are set. Until then the post page shows no comments section at all.
export const commentsEnabled = !!(process.env.NEXT_PUBLIC_GISCUS_REPO && process.env.NEXT_PUBLIC_GISCUS_REPO_ID && process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID);

export function Comments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}` | undefined;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General";
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  if (!repo || !repoId || !categoryId) return null;
  return (
    <Giscus repo={repo} repoId={repoId} category={category} categoryId={categoryId} mapping="pathname" reactionsEnabled="1" emitMetadata="0" inputPosition="top" theme="light" lang="en" loading="lazy" />
  );
}
