"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Loader2, Eye, Send } from "lucide-react";

type Recipient = { email: string; fullName?: string };

type SendResponse = {
  ok: boolean;
  error?: string;
  sent?: number;
  failed?: number;
  total?: number;
  results?: Array<{ email: string; ok: boolean; error?: string }>;
};

type TemplateKey =
  | "welcome"
  | "missing"
  | "weekly"
  | "spotlight"
  | "resource"
  | "proof"
  | "offer"
  | "open"
  | "last";

const templateOptions: Array<{ key: TemplateKey; label: string }> = [
  { key: "welcome", label: "WELCOME" },
  { key: "missing", label: "MISSING CLASS NUDGE" },
  { key: "weekly", label: "WEEKLY NEWSLETTER" },
  { key: "spotlight", label: "STUDENT SPOTLIGHT" },
  { key: "resource", label: "FREE RESOURCE" },
  { key: "proof", label: "SOCIAL PROOF" },
  { key: "offer", label: "LIMITED OFFER" },
  { key: "open", label: "ENROLLMENT OPEN" },
  { key: "last", label: "LAST CHANCE" },
];

function parseRecipients(raw: string): Recipient[] {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed: Recipient[] = [];
  for (const line of lines) {
    const [emailPart, ...nameParts] = line.split(",");
    const email = emailPart?.trim().toLowerCase();
    if (!email) continue;
    const fullName = nameParts.join(",").trim();
    parsed.push(fullName ? { email, fullName } : { email });
  }
  return parsed;
}

function defaultBody(ctaUrl: string) {
  return {
    welcome: {
      subject: "Welcome to FirstSons Academy 👋",
      html: `<p style="margin:0 0 14px">Welcome to <strong>First Sons Academy</strong>.</p><p style="margin:0 0 14px">You’ll learn Web3 by shipping real projects with Vibe Coding — even if you’re starting from zero.</p><p style="margin:0">Start here: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    missing: {
      subject: "Your classmates are already building on Web3...",
      html: `<p style="margin:0 0 14px">Your classmates are already building on Web3 — and the gap grows fast.</p><p style="margin:0 0 14px">This week inside the academy: wallet connections, clean UI, and fast shipping workflows.</p><p style="margin:0">Join: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    weekly: {
      subject: "This Week in Vibe Coding 🚀",
      html: `<p style="margin:0 0 14px"><strong>1 Web3 tip:</strong> Ship the core interaction first, then polish.</p><p style="margin:0 0 14px"><strong>1 student win:</strong> A beginner shipped a wallet checker and posted it in #project-showcase.</p><p style="margin:0 0 14px"><strong>1 resource:</strong> <a href="${ctaUrl}">Curriculum</a></p><p style="margin:0">Want the full roadmap + feedback? <a href="${ctaUrl}">Register</a></p>`,
    },
    spotlight: {
      subject: "Look what [Student] built in 3 weeks...",
      html: `<p style="margin:0 0 14px">Look what <strong>[Student]</strong> built in 3 weeks.</p><p style="margin:0 0 14px"><strong>Background:</strong> [Background]</p><p style="margin:0 0 14px"><strong>Result:</strong> [Result]</p><p style="margin:0">Get results too: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    resource: {
      subject: "Free Web3 starter guide (no signup needed)",
      html: `<p style="margin:0 0 14px">Here’s a free value resource to help you get started today.</p><p style="margin:0 0 14px"><strong>Free Web3 Starter Guide</strong> — <a href="${ctaUrl}">grab it here</a></p><p style="margin:0">When you’re ready, join the class: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    proof: {
      subject: "They had zero coding experience. Now look...",
      html: `<p style="margin:0 0 14px">They had zero coding experience. Now look:</p><p style="margin:0 0 14px">“I thought Web3 was too complex. Now I can actually ship.” — Chioma</p><p style="margin:0 0 14px">“Vibe Coding made it click. I built my first app in days.” — Tunde</p><p style="margin:0">Limited spots left: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    offer: {
      subject: "₦X off FirstSons Academy — ends Friday",
      html: `<p style="margin:0 0 14px"><strong>Limited offer:</strong> ₦X off FirstSons Academy — ends Friday.</p><p style="margin:0 0 14px">Lock in your spot before the deadline.</p><p style="margin:0">Claim: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    open: {
      subject: "🚨 New Cohort Now Open — Don't Miss It",
      html: `<p style="margin:0 0 14px">🚨 New cohort is open.</p><p style="margin:0 0 14px"><strong>Dates:</strong> [Cohort dates]</p><p style="margin:0 0 14px"><strong>Spots remaining:</strong> [Number]</p><p style="margin:0">Enroll: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
    last: {
      subject: "This closes tonight at midnight",
      html: `<p style="margin:0 0 14px">This closes tonight at midnight.</p><p style="margin:0 0 14px">Recap: weekly sessions, clear roadmap, and feedback while you ship.</p><p style="margin:0 0 14px"><strong>Risk reversal:</strong> [Money-back / free trial line]</p><p style="margin:0">Secure your spot: <a href="${ctaUrl}">${ctaUrl}</a></p>`,
    },
  } as const;
}

export function NewsletterComposePage() {
  const [adminToken, setAdminToken] = useState("");
  const [templateKey, setTemplateKey] = useState<TemplateKey>("welcome");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipientsRaw, setRecipientsRaw] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [resp, setResp] = useState<SendResponse | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [ctaUrl, setCtaUrl] = useState("https://www.firstsons.xyz/academy");

  useEffect(() => {
    const saved = window.localStorage.getItem("fs_admin_token");
    if (saved) setAdminToken(saved);
  }, []);

  useEffect(() => {
    if (adminToken.trim()) {
      window.localStorage.setItem("fs_admin_token", adminToken.trim());
    }
  }, [adminToken]);

  const defaults = useMemo(() => defaultBody(ctaUrl), [ctaUrl]);
  const parsedRecipients = useMemo(
    () => parseRecipients(recipientsRaw),
    [recipientsRaw]
  );

  useEffect(() => {
    const t = defaults[templateKey];
    setSubject(t.subject);
    setBody(t.html);
  }, [templateKey, defaults]);

  async function sendNow() {
    setResp(null);
    if (!adminToken.trim()) return;
    if (!subject.trim() || !body.trim()) {
      setResp({ ok: false, error: "Subject and HTML body are required." });
      return;
    }
    if (parsedRecipients.length === 0) {
      setResp({ ok: false, error: "Provide at least one recipient." });
      return;
    }
    if (!window.confirm(`Send to ${parsedRecipients.length} recipients now?`)) return;

    setIsSending(true);
    try {
      const res = await fetch("/api/admin/newsletter-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken.trim()}`,
        },
        body: JSON.stringify({
          subject,
          html: body,
          recipients: parsedRecipients,
        }),
      });
      const data = (await res.json()) as SendResponse;
      if (!res.ok) {
        setResp({ ok: false, error: data.error || "Send failed." });
        return;
      }
      setResp(data);
    } catch (e) {
      setResp({ ok: false, error: e instanceof Error ? e.message : "Unexpected error." });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="space-y-6">
      <header className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-xl font-semibold text-slate-100">Compose &amp; Send</h1>
        <p className="mt-1 text-sm text-slate-300">
          Choose a template, edit the HTML, preview, and send to your audience.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Admin token
            </label>
            <input
              type="password"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
              placeholder="ADMIN_APPROVALS_TOKEN"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Template
            </label>
            <select
              value={templateKey}
              onChange={(e) => setTemplateKey(e.target.value as TemplateKey)}
              className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            >
              {templateOptions.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              CTA URL (used in default templates)
            </label>
            <input
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
              placeholder="https://www.firstsons.xyz/academy"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-300">
              Recipients
            </label>
            <span className="text-xs text-slate-400">
              One per line. Use email or email, Name format.
            </span>
          </div>
          <textarea
            value={recipientsRaw}
            onChange={(e) => setRecipientsRaw(e.target.value)}
            rows={8}
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder={"ada@example.com, Ada\nben@example.com, Ben\ncarol@example.com"}
          />
          <p className="mt-2 text-xs text-slate-400">
            Parsed recipients: {parsedRecipients.length}
          </p>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-slate-300">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder="Email subject"
          />
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Body (HTML)
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder="<p>Write your HTML here...</p>"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600/60 bg-slate-950/40 px-4 py-2 text-sm font-semibold text-slate-100"
          >
            <Eye className="h-4 w-4" aria-hidden />
            Preview
          </button>

          <button
            type="button"
            onClick={sendNow}
            disabled={isSending || !adminToken.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
            Send now
          </button>
        </div>

        {resp ? (
          <div
            className={`mt-4 rounded-xl border p-3 text-sm ${
              resp.ok
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                : "border-rose-400/30 bg-rose-500/10 text-rose-200"
            }`}
          >
            {resp.ok ? (
              <span>Sent {resp.sent} / {resp.total}. Failed: {resp.failed}.</span>
            ) : (
              <span>{resp.error || "Send failed."}</span>
            )}
          </div>
        ) : null}
      </section>

      {showPreview ? (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Preview (HTML snippet)
          </div>
          <div className="rounded-xl border border-slate-700/60 bg-slate-950/40 p-4 text-slate-200">
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
