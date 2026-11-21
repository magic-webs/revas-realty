"use client";

import { useState, type FormEvent } from "react";

const ENDPOINT = "/api/share";

type ShareResponse = { sent?: boolean; wa_link?: string; detail?: string };

// Only follow WhatsApp links returned by the API, never an arbitrary URL.
function isWhatsAppLink(link: string) {
  try {
    const u = new URL(link);
    return u.protocol === "https:" && ["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(u.hostname);
  } catch {
    return false;
  }
}

export default function GuideLeadForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      const data: ShareResponse = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.detail || "Please check the details.");
      if (data.sent) {
        setSent(true);
      } else if (data.wa_link && isWhatsAppLink(data.wa_link)) {
        window.location.href = data.wa_link;
      } else {
        throw new Error("Could not send the guide. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return <p className="lead-success" role="status">Sent. Check your WhatsApp for the guide.</p>;
  }

  return (
    <div className="lead">
      {!open ? (
        <button type="button" className="hero-button hero-button-primary guide-download" onClick={() => setOpen(true)}>
          Get the free guide <span aria-hidden="true">↓</span>
        </button>
      ) : (
        <form className="lead-form" onSubmit={onSubmit}>
          <label>
            <span>Your name</span>
            <input id="guide-name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <span>WhatsApp number</span>
            <input id="guide-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={8} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <button type="submit" disabled={busy} className="hero-button hero-button-primary guide-download">
            {busy ? "Sending…" : "Send me the guide"} <span aria-hidden="true">→</span>
          </button>
          {error && <p className="lead-error" role="alert">{error}</p>}
        </form>
      )}
    </div>
  );
}
