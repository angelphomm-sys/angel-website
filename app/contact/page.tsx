import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = { title: "say hi", description: "Get in touch with Angel Phommachan, internships, roles, photography, or just to say hi." };

export default function Contact() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 md:px-20 py-14 grid gap-12 lg:grid-cols-[1fr_540px]">
      <div className="flex flex-col gap-6">
        <h1 className="text-[56px] md:text-[88px] font-extrabold tracking-[-0.03em] leading-none"><span className="num">5</span>say hi.</h1>
        <p className="text-[19px] leading-relaxed max-w-[560px]">[Contact, pending: a simple invite to reach out, and what happens when they write, that I reply and how soon]</p>
        <div className="flex flex-col gap-3 border-t-2 border-ink pt-6">
          <a href={`mailto:${site.email}`} className="flex items-center gap-3 font-bold hover:text-accent"><Icon name="mail" />{site.email}</a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-bold hover:text-accent"><Icon name="linkedin" />linkedin.com/in/angelphomm</a>
          <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-bold hover:text-accent"><Icon name="instagram" />@primecollectives · photography</a>
          <a href="/angel-phommachan.vcf" download className="flex items-center gap-3 font-bold hover:text-accent"><Icon name="mail" />save my contact card (vCard file)</a>
        </div>
        <span className="hand text-[26px] text-mid">based in {site.location}. will travel for a good launch.</span>
      </div>
      <div className="border-2 border-ink rounded-3xl p-6 md:p-8"><ContactForm /></div>
    </div>
  );
}
