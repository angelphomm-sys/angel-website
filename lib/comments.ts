// True once the Giscus env vars are set. Lives outside components/Comments.tsx because that file is a
// client module: a plain value exported from it reaches server components as an always-truthy reference,
// which showed an empty "comments." heading in production.
export const commentsEnabled = !!(process.env.NEXT_PUBLIC_GISCUS_REPO && process.env.NEXT_PUBLIC_GISCUS_REPO_ID && process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID);
