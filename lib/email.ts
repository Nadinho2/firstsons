import nodemailer from "nodemailer";

export type WaitlistEmailPayload = {
  email: string;
  fullName?: string;
  discord?: string;
};

const fromAddress = process.env.WAITLIST_FROM_EMAIL;

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })
    : null;

export async function sendWaitlistConfirmationEmail(
  payload: WaitlistEmailPayload
): Promise<void> {
  if (!transporter || !fromAddress) {
    // In development or when SMTP is not configured, just log.
    console.log("[waitlist] Email payload", payload);
    return;
  }

  const { email, fullName, discord } = payload;

  await transporter.sendMail({
    from: fromAddress,
    to: email,
    subject: "You’re on the First Sons waitlist",
    text: [
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
    ].join("\n")
  });
}

