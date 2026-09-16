import { NextResponse } from "next/server";

// Contact endpoint. With RESEND_API_KEY set it emails the message to CONTACT_TO
// (defaults to angelphommachan@gmail.com); without it, it logs the message.
export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try { body = await req.json(); } catch { /* fall through */ }
  const { name, email, company = "", message, fit = "", source = "" } = body;
  if (!name || !email || !message) return NextResponse.json({ error: "Name, email, and a message are required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (message.length > 5000) return NextResponse.json({ error: "Message is too long." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "angelphommachan@gmail.com";
  const text = `Fit: ${fit}\nSource: ${source}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`;
  if (!key) {
    console.log(`[contact]\n${text}`);
    return NextResponse.json({ message: "Got it. (Dev mode: message logged, not emailed.)" });
  }
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `[Portfolio] ${fit || "Inquiry"} · ${name}${company ? ` · ${company}` : ""}${source ? ` · via ${source}` : ""}`,
      text,
    }),
  });
  if (!r.ok) return NextResponse.json({ error: "Couldn't send right now. Email me directly instead." }, { status: 502 });
  return NextResponse.json({ message: "Got it. I will reply within two business days." });
}
