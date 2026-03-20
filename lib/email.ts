import { Resend } from "resend";

export type WaitlistEmailPayload = {
  email: string;
  fullName?: string;
  discord?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Vercel / copy-paste often adds wrapping quotes, smart quotes, or invisible chars.
 * Resend requires: `email@domain.com` or `Name <email@domain.com>` (ASCII `<` `>`).
 */
function normalizeFromAddress(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let s = raw.trim();
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, "");
  s = s.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  while (
    s.length >= 2 &&
    ((s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'")))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s || undefined;
}

function isValidResendFromFormat(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (!t.includes("<")) {
    return /^[^\s<>]+@[^\s<>]+$/.test(t);
  }
  const open = t.indexOf("<");
  const close = t.lastIndexOf(">");
  if (close <= open) return false;
  const email = t.slice(open + 1, close).trim();
  return /^[^\s<>]+@[^\s<>]+$/.test(email);
}

/** Resend “from” — same value, several names so Vercel matches Resend docs / copy-paste. */
function getFromAddress(): string | undefined {
  return (
    normalizeFromAddress(process.env.WAITLIST_FROM_EMAIL) ||
    normalizeFromAddress(process.env.RESEND_FROM) ||
    normalizeFromAddress(process.env.RESEND_FROM_EMAIL) ||
    undefined
  );
}

/** For server-action logs (Vercel) — must match getFromAddress() logic. */
export function waitlistEmailEnvStatus(): {
  hasResendKey: boolean;
  hasFrom: boolean;
} {
  return {
    hasResendKey: Boolean(process.env.RESEND_API_KEY?.trim()),
    hasFrom: Boolean(getFromAddress())
  };
}

export async function sendWaitlistConfirmationEmail(
  payload: WaitlistEmailPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress = getFromAddress();
  const config =
    apiKey && fromAddress ? { apiKey, fromAddress } : null;

  if (!config) {
    const missing: string[] = [];
    if (!apiKey) missing.push("RESEND_API_KEY");
    if (!fromAddress) {
      missing.push(
        "WAITLIST_FROM_EMAIL (or RESEND_FROM / RESEND_FROM_EMAIL)"
      );
    }
    const hint = `Missing: ${missing.join(", ")}. Add them in Vercel → Settings → Environment Variables → Production (and Preview if needed) → Redeploy.`;
    console.warn("[waitlist] Email NOT sent —", hint, { to: payload.email });
    // In production, do not pretend the email went out (avoids “success” with no mail).
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Waitlist email not configured. ${hint}`);
    }
    return;
  }

  const { email, fullName, discord } = payload;

  const text = [
    `Hey${fullName ? ` ${fullName}` : ""},`,
    "",
    "You’re on the First Sons Phase 1 waitlist.",
    "When spots open, we’ll email you how to join the cohort, start Vibe Coding, and ship your first on-chain projects with the group.",
    "",
    discord
      ? `We’ve got your Discord handle as: ${discord}`
      : "Have Discord ready so we can give you the right role quickly.",
    "",
    "In the meantime:",
    "- Join the Discord: https://discord.gg/firstsonsdao",
    "- Follow us on X: https://x.com/Firstsons_Dao",
    "",
    "— First Sons"
  ].join("\n");

  const html = `<div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0f172a">${escapeHtml(
    text
  ).replace(/\n/g, "<br/>")}</div>`;

  if (!isValidResendFromFormat(config.fromAddress)) {
    throw new Error(
      "Invalid WAITLIST_FROM_EMAIL / RESEND_FROM: use only ASCII. Examples: First Sons <hello@yourdomain.com> or hello@yourdomain.com. In Vercel, paste the value without wrapping it in extra quotes."
    );
  }

  const resend = new Resend(config.apiKey);

  const { data, error } = await resend.emails.send({
    from: config.fromAddress,
    to: [email],
    subject: "You’re on the First Sons waitlist",
    text,
    html,
    tags: [{ name: "source", value: "waitlist" }]
  });

  if (error) {
    console.error("[waitlist] Resend API error:", error);
    const msg =
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : JSON.stringify(error);
    throw new Error(`Resend: ${msg}`);
  }

  console.log("[waitlist] Confirmation email sent", {
    to: email,
    resendEmailId: data?.id
  });
}
