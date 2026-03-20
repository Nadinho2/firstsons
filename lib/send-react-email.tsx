import { Resend } from "resend";
import PremiumEnrollmentEmail from "@/emails/PremiumEnrollmentEmail";
import WelcomeEmail from "@/emails/WelcomeEmail";
import {
  getResendApiKey,
  getResendFromAddress,
  isValidResendFromFormat,
} from "@/lib/resend-config";

/**
 * Future: store PDF receipts on Vercel Blob or Resend Attachments API
 * @example
 * import { put } from "@vercel/blob";
 * const blob = await put(`receipts/${id}.pdf`, file, { access: "public" });
 * // Or Resend: attachments: [{ filename: "receipt.pdf", path: blob.url }]
 */
export async function sendWelcomeEmailReact(input: {
  to: string;
  name: string;
  discordInvite: string;
}): Promise<{ id?: string }> {
  const apiKey = getResendApiKey();
  const from = getResendFromAddress();
  if (!apiKey || !from) {
    throw new Error(
      "Missing RESEND_API_KEY or from address (WAITLIST_FROM_EMAIL / RESEND_FROM)"
    );
  }
  if (!isValidResendFromFormat(from)) {
    throw new Error("Invalid Resend from address format");
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [input.to],
    subject: "Welcome to First Sons — join Discord",
    react: (
      <WelcomeEmail name={input.name} discordInvite={input.discordInvite} />
    ),
    tags: [{ name: "template", value: "welcome" }],
  });

  if (error) {
    throw new Error(
      typeof error === "object" && error && "message" in error
        ? String((error as { message: unknown }).message)
        : "Resend send failed"
    );
  }
  return { id: data?.id };
}

export async function sendPremiumEnrollmentEmailReact(input: {
  to: string;
  name: string;
  course: string;
  amount: string;
  txHash?: string;
  premiumDiscordInvite: string;
}): Promise<{ id?: string }> {
  const apiKey = getResendApiKey();
  const from = getResendFromAddress();
  if (!apiKey || !from) {
    throw new Error(
      "Missing RESEND_API_KEY or from address (WAITLIST_FROM_EMAIL / RESEND_FROM)"
    );
  }
  if (!isValidResendFromFormat(from)) {
    throw new Error("Invalid Resend from address format");
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: [input.to],
    subject: `Premium confirmed — ${input.course} · First Sons`,
    react: (
      <PremiumEnrollmentEmail
        name={input.name}
        course={input.course}
        amount={input.amount}
        txHash={input.txHash}
        premiumDiscordInvite={input.premiumDiscordInvite}
      />
    ),
    tags: [
      { name: "template", value: "premium_enrollment" },
      { name: "course", value: input.course.slice(0, 48) },
    ],
  });

  if (error) {
    throw new Error(
      typeof error === "object" && error && "message" in error
        ? String((error as { message: unknown }).message)
        : "Resend send failed"
    );
  }
  return { id: data?.id };
}
