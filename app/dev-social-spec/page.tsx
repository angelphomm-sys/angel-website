import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SocialSpecRow } from "@/components/SocialSpecRow";

// Temporary preview of the spec social row before it is wired into /work. Never served in production.
export const metadata: Metadata = { title: "Social spec preview", robots: { index: false, follow: false } };

export default function DevSocialSpecPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-8 md:py-10 flex flex-col gap-6">
      <h2 className="text-h2">social.</h2>
      <SocialSpecRow />
    </div>
  );
}
