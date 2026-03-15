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
      "You’re officially on the First Sons Phase 1 waitlist.",
      "As spots open up, we’ll send details on how to join the cohort, start Vibe Coding, and ship your first on-chain projects with the fam.",
      "",
      discord
        ? `We’ve also got your Discord handle noted as: ${discord}`
        : "Make sure you have your Discord ready so we can give you the right role quickly.",
      "",
      "In the meantime, you can:",
      "- Join the Discord: https://discord.gg/firstsonsdao",
      "- Follow us on X: https://x.com/Firstsons_Dao",
      "",
      "LFG,",
      "The First Sons team"
    ].join("\n")
  });
}

