import type { Book } from "@/components/Shelf";

// Books on the About shelf (films stay hidden until filled). The "taught me" lines are drafts in Angel's voice. Edit freely.
export const shelf: Book[] = [
  { title: "Atlas Shrugged", author: "Ayn Rand", kind: "book", status: "reading now", reading: true, cover: "/images/books/atlas-shrugged.jpg", why: "", color: "#1C1310" },
  { title: "Contagious", author: "Jonah Berger", kind: "book", cover: "/images/books/contagious.jpg", why: "things spread when they give people something to say. Build the trigger before the post.", color: "#C8551F" },
  { title: "Teaching to Transgress", author: "bell hooks", kind: "book", cover: "/images/books/teaching-to-transgress.jpg", why: "", color: "#7A2E2E" },
  { title: "As a Man Thinketh", author: "James Allen", kind: "book", cover: "/images/books/as-a-man-thinketh.jpg", why: "", color: "#E8A12B" },
  { title: "[film one title, pending: name the film you rewatch most. Title only]", kind: "film", status: "comfort rewatch", why: "[why it matters, pending: one sentence on what this rewatch taught you that you use at work. Under 20 words]", color: "#5b4636" },
  { title: "[film two title, pending: name a film you would recommend to a marketer. Title only]", kind: "film", why: "[why it matters, pending: one sentence on what this film taught you about keeping people watching. Under 20 words]", color: "#3d4a5c" },
  { title: "[film three title, pending: name a film you have watched more than twice. Title only]", kind: "film", why: "[why it matters, pending: one sentence on what this film taught you about telling a story. Under 20 words]", color: "#6e4a4a" },
];
