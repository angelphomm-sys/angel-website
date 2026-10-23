import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = pageMeta({ title: "Contact Angel Phommachan", absolute: true, description: "Say hi about a marketing internship, a part-time role, a campaign, or a photo shoot. Send a note here and I will reply within two business days.", path: "/contact" });

// One line, the ways to reach her, and a three-field form. Nothing else.
export default function Contact() {
  const link = "hit self-start text-[16px] font-bold border-b-2 border-ink hover:text-accent-deep hover:border-accent-deep";
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-14 grid gap-12 lg:grid-cols-[1fr_520px]">
      <div className="flex flex-col gap-6">
        <h1 className="text-h1 font-display font-semibold tracking-[-0.015em] leading-none">Say hi</h1>
        <p className="text-[19px] leading-relaxed max-w-[520px]">Have a project, a role, or a question in mind? Send it here and I will reply within two business days.</p>
        <div className="flex flex-col gap-3 pt-2">
          <a href={`mailto:${site.email}`} className={link}>{site.email}</a>
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className={link}>LinkedIn ↗</a>
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className={link}>Instagram ↗</a>
        </div>
      </div>
      <ContactForm />
    </div>
  );
}
