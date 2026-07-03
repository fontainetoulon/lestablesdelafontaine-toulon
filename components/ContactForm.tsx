"use client";

import { useState } from "react";

// Formulaire FIXE (nom / email / message) — aucune configuration exposée au client.
export function ContactForm({ to }: { to: string }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
        }),
      });
      setState(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <p className="contact__ok" role="status">
        Merci ! Votre message a bien été envoyé — nous vous répondons au plus vite.
      </p>
    );
  }

  return (
    <form className="contact__form" onSubmit={onSubmit}>
      <label>
        Votre nom
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Votre email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Votre message
        <textarea name="message" required rows={5} />
      </label>
      <button className="btn btn--primary" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Envoi…" : "Envoyer"}
      </button>
      {state === "error" && (
        <p className="contact__err" role="alert">
          Une erreur est survenue. Réessayez, ou appelez-nous directement.
        </p>
      )}
    </form>
  );
}
