import { createElement } from "react";
import { render } from "@react-email/render";
import { Resend } from "resend";
import ClassRecordingEmail from "@/emails/ClassRecordingEmail";
import { getEmailLogoUrl } from "@/emails/brand";
import NextClassTeaserEmail from "@/emails/NextClassTeaserEmail";
import WaitlistApprovalEmail from "@/emails/WaitlistApprovalEmail";
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

/** Cohort approval — schedule, Meet, WhatsApp only (no Discord / X). */
export type WaitlistApprovalEmailPayload = {
  email: string;
  fullName?: string;
  courseTitle: string;
  /** e.g. "March 1 – April 15, 2026" */
  classDates: string;
  /** e.g. "Saturdays, 10:00 AM – 12:00 PM (WAT)" */
  classTime: string;
  googleMeetUrl: string;
  whatsappGroupUrl: string;
  xUrl?: string;
};

export type ClassRecordingEmailPayload = {
  email: string;
  fullName?: string;
  courseTitle: string;
  classLabel: string;
  recordingUrl: string;
  whatsappGroupUrl: string;
  xUrl?: string;
};

export type NextClassTeaserEmailPayload = {
  email: string;
  fullName?: string;
  courseTitle: string;
  nextClassLabel: string;
  nextClassDateTime: string;
  googleMeetUrl: string;
  whatsappGroupUrl: string;
  teaserText: string;
  xUrl?: string;
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

/** Resend tags accept only ASCII letters, numbers, underscores, and dashes. */
function toResendTagValue(input: string): string {
  const asciiOnly = input.normalize("NFKD").replace(/[^\x00-\x7F]/g, "");
  const slug = asciiOnly
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return (slug || "na").slice(0, 48);
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
        ? [{ name: "course", value: toResendTagValue(payload.courseSlug) }]
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

/**
 * Send cohort approval email (class dates, time, Google Meet, repeated WhatsApp CTAs).
 * Does not include Discord or X — use for students who already received waitlist confirmation.
 */
export async function sendWaitlistApprovalEmail(
  payload: WaitlistApprovalEmailPayload
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
    const hint = `Missing: ${missing.join(", ")}.`;
    console.warn("[waitlist-approval] Email NOT sent —", hint, {
      to: payload.email
    });
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Approval email not configured. ${hint}`);
    }
    return;
  }

  const displayName = payload.fullName?.trim() || "there";
  const courseTitle = payload.courseTitle.trim();
  const xUrl = payload.xUrl?.trim() || "https://x.com/nadinhocrypto";

  const emailNode = createElement(WaitlistApprovalEmail, {
    name: displayName,
    courseTitle,
    classDates: payload.classDates.trim(),
    classTime: payload.classTime.trim(),
    googleMeetUrl: payload.googleMeetUrl.trim(),
    whatsappGroupUrl: payload.whatsappGroupUrl.trim(),
    xUrl,
    logoUrl: getEmailLogoUrl(),
  });

  const html = await render(emailNode);
  const text = await render(emailNode, { plainText: true });

  if (!isValidResendFromFormat(config.fromAddress)) {
    throw new Error(
      "Invalid WAITLIST_FROM_EMAIL / RESEND_FROM: use only ASCII."
    );
  }

  const resend = new Resend(config.apiKey);

  const subject = `You're in — ${courseTitle} · First Sons`;

  const { data, error } = await resend.emails.send({
    from: config.fromAddress,
    to: [payload.email],
    subject,
    text,
    html,
    tags: [
      { name: "source", value: "waitlist_approval" },
      { name: "course", value: toResendTagValue(courseTitle) }
    ]
  });

  if (error) {
    console.error("[waitlist-approval] Resend API error:", error);
    const msg =
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
        ? (error as { message: string }).message
        : JSON.stringify(error);
    throw new Error(`Resend: ${msg}`);
  }

  console.log("[waitlist-approval] Email sent", {
    to: payload.email,
    resendEmailId: data?.id
  });
}

export async function sendClassRecordingEmail(
  payload: ClassRecordingEmailPayload
): Promise<void> {
  const apiKey = getResendApiKey();
  const fromAddress = getResendFromAddress();
  const config = apiKey && fromAddress ? { apiKey, fromAddress } : null;
  if (!config) throw new Error("Email config missing.");

  const courseTitle = payload.courseTitle.trim();
  const classLabel = payload.classLabel.trim();
  const xUrl = payload.xUrl?.trim() || "https://x.com/nadinhocrypto";

  const emailNode = createElement(ClassRecordingEmail, {
    name: payload.fullName?.trim() || "there",
    courseTitle,
    classLabel,
    recordingUrl: payload.recordingUrl.trim(),
    whatsappGroupUrl: payload.whatsappGroupUrl.trim(),
    xUrl,
    logoUrl: getEmailLogoUrl(),
  });

  const html = await render(emailNode);
  const text = await render(emailNode, { plainText: true });
  const resend = new Resend(config.apiKey);

  const { error } = await resend.emails.send({
    from: config.fromAddress,
    to: [payload.email],
    subject: `${classLabel} recording — ${courseTitle}`,
    text,
    html,
    tags: [
      { name: "source", value: "class_recording" },
      { name: "course", value: toResendTagValue(courseTitle) }
    ]
  });
  if (error) throw new Error(`Resend: ${JSON.stringify(error)}`);
}

export async function sendNextClassTeaserEmail(
  payload: NextClassTeaserEmailPayload
): Promise<void> {
  const apiKey = getResendApiKey();
  const fromAddress = getResendFromAddress();
  const config = apiKey && fromAddress ? { apiKey, fromAddress } : null;
  if (!config) throw new Error("Email config missing.");

  const courseTitle = payload.courseTitle.trim();
  const nextClassLabel = payload.nextClassLabel.trim();
  const xUrl = payload.xUrl?.trim() || "https://x.com/nadinhocrypto";

  const emailNode = createElement(NextClassTeaserEmail, {
    name: payload.fullName?.trim() || "there",
    courseTitle,
    nextClassLabel,
    nextClassDateTime: payload.nextClassDateTime.trim(),
    googleMeetUrl: payload.googleMeetUrl.trim(),
    whatsappGroupUrl: payload.whatsappGroupUrl.trim(),
    teaserText: payload.teaserText.trim(),
    xUrl,
    logoUrl: getEmailLogoUrl(),
  });

  const html = await render(emailNode);
  const text = await render(emailNode, { plainText: true });
  const resend = new Resend(config.apiKey);

  const { error } = await resend.emails.send({
    from: config.fromAddress,
    to: [payload.email],
    subject: `${nextClassLabel} is next — ${courseTitle}`,
    text,
    html,
    tags: [
      { name: "source", value: "next_class_teaser" },
      { name: "course", value: toResendTagValue(courseTitle) }
    ]
  });
  if (error) throw new Error(`Resend: ${JSON.stringify(error)}`);
}
