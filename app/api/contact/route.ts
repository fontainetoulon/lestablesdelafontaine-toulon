import { NextResponse } from "next/server";

// Formulaire de contact — brancher un fournisseur d'email (Resend conseillé)
// via RESEND_API_KEY. Sans clé, la soumission est acceptée et journalisée
// (utile en préview) mais aucun email ne part.
export async function POST(req: Request) {
  let payload: { to?: string; name?: string; email?: string; message?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { to, name, email, message } = payload;
  if (!to || !name || !email || !message) {
    return NextResponse.json({ error: "Champs manquants." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "site@lestablesdelafontainetoulon.fr",
        to,
        reply_to: email,
        subject: `Contact site — ${name}`,
        text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Envoi impossible." }, { status: 502 });
    }
  } else {
    console.log("[contact] RESEND_API_KEY absent — message non envoyé :", {
      to,
      name,
      email,
    });
  }

  return NextResponse.json({ ok: true });
}
