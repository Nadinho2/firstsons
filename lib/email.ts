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
    const hint =
      "Set RESEND_API_KEY and WAITLIST_FROM_EMAIL for this environment (e.g. Vercel → Settings → Environment Variables → Redeploy).";
    console.warn("[waitlist] Email NOT sent — missing env.", hint, {
      to: payload.email
    });
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
