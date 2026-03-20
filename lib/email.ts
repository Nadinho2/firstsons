import { Resend } from "resend";
import {
  getResendApiKey,
  getResendFromAddress,
  isValidResendFromFormat,
} from "@/lib/resend-config";

export type WaitlistEmailPayload = {
  email: string;
  fullName?: string;
  discord?: string;
  /** Selected track (waitlist) */
  courseSlug?: string;
  courseTitle?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** For server-action logs (Vercel) — must match getFromAddress() logic. */
export function waitlistEmailEnvStatus(): {
  hasResendKey: boolean;
  hasFrom: boolean;
} {
  return {
    hasResendKey: Boolean(getResendApiKey()),
    hasFrom: Boolean(getResendFromAddress())
  };
}

export async function sendWaitlistConfirmationEmail(
  payload: WaitlistEmailPayload
): Promise<void> {
  const apiKey = getResendApiKey();
  const fromAddress = getResendFromAddress();
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

  const { email, fullName, discord, courseTitle } = payload;

  const trackLine = courseTitle
    ? `Track: ${courseTitle}.`
    : "We’ll route your cohort updates for the track you selected.";

  const text = [
    `Hey${fullName ? ` ${fullName}` : ""},`,
    "",
    "You’re on the First Sons Phase 1 waitlist.",
    trackLine,
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

  const subject = courseTitle
    ? `First Sons — ${courseTitle} waitlist`
    : "First Sons — Phase 1 waitlist";

  const { data, error } = await resend.emails.send({
    from: config.fromAddress,
    to: [email],
    subject,
    text,
    html,
    tags: [
      { name: "source", value: "waitlist" },
      ...(payload.courseSlug
        ? [{ name: "course", value: payload.courseSlug }]
        : [])
    ]
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
