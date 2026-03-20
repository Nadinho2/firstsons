import { createElement } from "react";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { getEmailLogoUrl } from "@/emails/brand";
import WaitlistConfirmationEmail from "@/emails/WaitlistConfirmationEmail";
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

  const displayName = fullName?.trim() || "there";
  const track =
    courseTitle?.trim() ||
    "Your selected course (we’ll confirm from your signup)";
  const discordUrl =
    process.env.DISCORD_INVITE_URL?.trim() || "https://discord.gg/VJj2ZHc46";
  const xUrl = process.env.X_URL?.trim() || "https://x.com/Firstsons_Dao";

  const emailNode = createElement(WaitlistConfirmationEmail, {
    name: displayName,
    track,
    discordHandle: discord?.trim() || "—",
    discordUrl,
    xUrl,
    logoUrl: getEmailLogoUrl(),
  });

  const html = await render(emailNode);
  const text = await render(emailNode, { plainText: true });

  if (!isValidResendFromFormat(config.fromAddress)) {
    throw new Error(
      "Invalid WAITLIST_FROM_EMAIL / RESEND_FROM: use only ASCII. Examples: First Sons <hello@yourdomain.com> or hello@yourdomain.com. In Vercel, paste the value without wrapping it in extra quotes."
    );
  }

  const resend = new Resend(config.apiKey);

  const subject = courseTitle
    ? `Welcome to the First Sons Waitlist — ${courseTitle}`
    : "Welcome to the First Sons Waitlist";

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
