import type { Book } from "@/components/Shelf";

// Three books, three films, one row. The "taught me" lines are drafts in Angel's voice. Edit freely.
export const shelf: Book[] = [
  { title: "Contagious", author: "Jonah Berger", kind: "book", status: "reading now", reading: true, cover: "/images/books/contagious.jpg", why: "things spread when they give people something to say. Build the trigger before the post.", color: "#C8551F" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", kind: "book", cover: "/images/books/thinking-fast-and-slow.jpg", why: "most decisions are fast ones. Design for System 1; earn System 2.", color: "#2A55B8" },
  { title: "The Courage to Be Disliked", author: "Kishimi and Koga", kind: "book", cover: "/images/books/courage-to-be-disliked.jpg", why: "you cannot control the reaction, only the work. Post it anyway.", color: "#3B7A57" },
  { title: "[film one title, pending]", kind: "film", status: "comfort rewatch", why: "[why it matters, pending]", color: "#5b4636" },
  { title: "[film two title, pending]", kind: "film", why: "[why it matters, pending]", color: "#3d4a5c" },
  { title: "[film three title, pending]", kind: "film", why: "[why it matters, pending]", color: "#6e4a4a" },
];
