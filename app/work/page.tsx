import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";

export const metadata: Metadata = { title: "work", description: "Angel Phommachan's work: case studies, email campaigns, social sets, ads, landing pages, and the pieces of a pop-up." };

export default function Work() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-12 md:py-14 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-[56px] md:text-[88px] font-extrabold tracking-[-0.03em] leading-none"><span className="num">2</span>work.</h1>
        <p className="text-[18px] md:text-[19px] leading-relaxed text-mid max-w-[620px]">Four projects. Each one says what it was for, what I did, and what happened.</p>
      </div>
      <ProjectList />
    </div>
  );
}
