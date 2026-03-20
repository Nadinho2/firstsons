"use server";

/**
 * Resend + React Email server actions (Welcome + Premium).
 *
 * NOTE: This repo already has `app/actions/` as a **folder** (waitlist.ts),
 * so a root file `app/actions.ts` cannot exist on the same path. This file
 * is named `app/email-actions.ts` instead of `app/actions.ts`.
 *
 * @example
 * import { handleWaitlistSignup } from "@/app/email-actions";
 * <form action={handleWaitlistSignup}>...</form>
 */

import {
  sendPremiumEnrollmentEmailReact,
  sendWelcomeEmailReact,
} from "@/lib/send-react-email";
import { isValidEmail } from "@/lib/resend-config";

/** Public Discord (welcome). Override in .env */
const discordInvite =
  process.env.DISCORD_INVITE_URL?.trim() || "https://discord.gg/VJj2ZHc46";

/** Premium / paid class Discord — use a different role-gated invite in prod */
const premiumDiscordInvite =
  process.env.PREMIUM_DISCORD_INVITE_URL?.trim() || discordInvite;

export type EmailFormState = {
  ok: boolean;
  message?: string;
  error?: string;
};

const initial: EmailFormState = { ok: false };

/**
 * Waitlist / welcome flow — validates email and sends `WelcomeEmail`.
 * Compatible with `useFormState` from `react-dom` (loading via `useFormStatus`).
 */
export async function handleWaitlistSignup(
  _prevState: EmailFormState | undefined,
  formData: FormData
): Promise<EmailFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  if (!email) {
    return { ...initial, error: "Email is required." };
  }
  if (!isValidEmail(email)) {
    return { ...initial, error: "Please enter a valid email address." };
  }

  try {
    await sendWelcomeEmailReact({
      to: email,
      name: name || "there",
      discordInvite,
    });
    return {
      ok: true,
      message: "Sent! Check your inbox (and spam) for the welcome email.",
    };
  } catch (err) {
    console.error("[handleWaitlistSignup]", err);
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not send email. Try again later.",
    };
  }
}

/**
 * $50 premium class — receipt email + premium Discord link.
 * Wire this after Stripe / on-chain payment webhook in production.
 */
export async function handlePremiumEnrollment(
  _prevState: EmailFormState | undefined,
  formData: FormData
): Promise<EmailFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const course = String(formData.get("course") ?? "").trim();
  const amount = String(formData.get("amount") ?? "$50.00 USD").trim();
  const txHashRaw = String(formData.get("txHash") ?? "").trim();
  const txHash = txHashRaw || undefined;

  if (!email) {
    return { ...initial, error: "Email is required." };
  }
  if (!isValidEmail(email)) {
    return { ...initial, error: "Please enter a valid email address." };
  }
  if (!course) {
    return { ...initial, error: "Course name is required." };
  }

  try {
    await sendPremiumEnrollmentEmailReact({
      to: email,
      name: name || "there",
      course,
      amount,
      txHash,
      premiumDiscordInvite,
    });
    return {
      ok: true,
      message: "Receipt sent! Check your email for premium Discord access.",
    };
  } catch (err) {
    console.error("[handlePremiumEnrollment]", err);
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not send confirmation. Try again later.",
    };
  }
}

/*
 * -----------------------------------------------------------------------------
 * ENV (add to `.env.local` and Vercel)
 * -----------------------------------------------------------------------------
 * RESEND_API_KEY=re_xxxx
 * WAITLIST_FROM_EMAIL=First Sons <onboarding@yourdomain.com>
 * DISCORD_INVITE_URL=https://discord.gg/...
 * PREMIUM_DISCORD_INVITE_URL=https://discord.gg/...   (optional; defaults to public)
 * -----------------------------------------------------------------------------
 */
