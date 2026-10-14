import type { Book } from "@/components/Shelf";

// Books on the About shelf, then films and shows for "on my screen." Empty why lines are hidden. The "taught me" lines are drafts in Angel's voice. Edit freely.
export const shelf: Book[] = [
  { title: "Atlas Shrugged", author: "Ayn Rand", kind: "book", status: "reading now", reading: true, cover: "/images/books/atlas-shrugged.jpg", why: "", color: "#1C1310" },
  { title: "Contagious", author: "Jonah Berger", kind: "book", cover: "/images/books/contagious.jpg", why: "things spread when they give people something to say. Build the trigger before the post.", color: "#C8551F" },
  { title: "Teaching to Transgress", author: "bell hooks", kind: "book", cover: "/images/books/teaching-to-transgress.jpg", why: "", color: "#7A2E2E" },
  { title: "As a Man Thinketh", author: "James Allen", kind: "book", cover: "/images/books/as-a-man-thinketh.jpg", why: "", color: "#E8A12B" },
  { title: "The Peanut Butter Falcon", author: "film, 2019", kind: "film", cover: "/images/screen/peanut-butter-falcon.jpg", why: "", color: "#B5803B" },
  { title: "Howl's Moving Castle", author: "film, 2004", kind: "film", cover: "/images/screen/howls-moving-castle.jpg", why: "", color: "#5B7FA3" },
  { title: "Severance", author: "series, Apple TV+", kind: "show", cover: "/images/screen/severance.jpg", why: "", color: "#23414D" },
];
