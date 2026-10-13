// Bracket notes say what still goes in a spot ("[the budget, pending: ...]") instead of inventing it.
// They show by default, so the review build reads honestly. Set NEXT_PUBLIC_SHOW_NOTES=false to hide
// every one of them at once (Todo, Thai blanks, Stack [confirm], pending "differently" lines, shelf picks, clip slots).
// Draft posts are a separate switch (lib/posts.ts) and stay hidden in production either way.
export const showNotes = process.env.NEXT_PUBLIC_SHOW_NOTES !== "false";
