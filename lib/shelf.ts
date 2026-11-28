import type { Book } from "@/components/Shelf";

// "What shapes how I think" on About: books that open to a favorite quote. Films were removed 2026-11-27 at Angel's request.
// `quote` is word-for-word from the work, checked against more than one source; `quoteBy` names the speaker.
// `lesson` is what it taught her, in her voice (personal, not forced to marketing): drafts for her to edit.
// Every `color` (the spine and back) is brand near-black, so the shelf reads as one set. `why` is the fallback when no quote is confirmed.
export const shelf: Book[] = [
  { title: "Atlas Shrugged", author: "Ayn Rand", kind: "book", status: "reading now", reading: true, cover: "/images/books/atlas-shrugged.jpg", color: "#210F10",
    quote: "Who is John Galt?", quoteBy: "the book's first line",
    lesson: "One question, repeated until everyone wants the answer. That's a hook.", why: "" },
  { title: "Contagious", author: "Jonah Berger", kind: "book", status: "reading now", reading: true, cover: "/images/books/contagious.jpg", color: "#210F10",
    why: "" },  // Angel is pulling her own lesson (she has read through chapter 6)
  { title: "Teaching to Transgress", author: "bell hooks", kind: "book", cover: "/images/books/teaching-to-transgress.jpg", color: "#210F10",
    quote: "The classroom remains the most radical space of possibility in the academy.",
    lesson: "Learning gave me the freedom to decide who I get to become.", why: "" },
  { title: "As a Man Thinketh", author: "James Allen", kind: "book", cover: "/images/books/as-a-man-thinketh.jpg", color: "#210F10",
    quote: "A man's mind may be likened to a garden…",
    lesson: "Pull the weeds early. What I let grow in my head ends up in my work.", why: "" },
];
