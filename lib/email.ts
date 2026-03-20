import { Resend } from "resend";

export type WaitlistEmailPayload = {
  email: string;
  fullName?: string;
  discord?: string;
};

function getResendConfig(): { apiKey: string; fromAddress: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromAddress = process.env.WAITLIST_FROM_EMAIL?.trim();
  if (!apiKey || !fromAddress) {
    return null;
  }
  return { apiKey, fromAddress };
}

export async function sendWaitlistConfirmationEmail(
  payload: WaitlistEmailPayload
): Promise<void> {
  const config = getResendConfig();

  if (!config) {
    // This path still redirects to /waitlist/success — easy to miss in production
    // if env vars exist in .env.local but were never added on the host (e.g. Vercel).
    console.warn(
      "[waitlist] Email NOT sent: RESEND_API_KEY or WAITLIST_FROM_EMAIL missing on the server.",
      "Add both to .env.local (local) and to your host’s Environment Variables (production).",
      { to: payload.email }
    );
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

  const resend = new Resend(config.apiKey);

  const { data, error } = await resend.emails.send({
    from: config.fromAddress,
    to: email,
    subject: "You’re on the First Sons waitlist",
    text
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
