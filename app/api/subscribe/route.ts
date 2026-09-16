import { NextResponse } from "next/server";

// Subscribe endpoint. With BUTTONDOWN_API_KEY set it adds the address to your
// Buttondown list; without it, it logs the address so the form still works in dev.
export async function POST(req: Request) {
  let email = "";
  try { ({ email } = await req.json()); } catch { /* fall through */ }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    console.log(`[subscribe] ${email} (BUTTONDOWN_API_KEY not set, not stored)`);
    return NextResponse.json({ message: "You're on the list. (Dev mode: not stored yet.)" });
  }
  const r = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: email, type: "regular", tags: ["site"] }),
  });
  if (r.status === 400) {
    const j = await r.json().catch(() => ({}));
    if (JSON.stringify(j).includes("already")) return NextResponse.json({ message: "You're already on the list." });
    return NextResponse.json({ error: "Couldn't subscribe that address." }, { status: 400 });
  }
  if (!r.ok) return NextResponse.json({ error: "Subscription service error. Try again later." }, { status: 502 });
  return NextResponse.json({ message: "You're on the list. First drop lands next week." });
}
