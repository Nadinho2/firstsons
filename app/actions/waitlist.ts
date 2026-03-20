"use server";

import { redirect } from "next/navigation";
import {
  sendWaitlistConfirmationEmail,
  waitlistEmailEnvStatus
} from "@/lib/email";

/**
 * Top-level server action (module has "use server").
 * Avoid defining actions inside nested components — they can fail to register on Vercel.
 */
export async function submitWaitlist(formData: FormData): Promise<void> {
  const emailValue = formData.get("email");
  const fullNameValue = formData.get("fullName");
  const discordValue = formData.get("discord");

  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const fullName =
    typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const discord =
    typeof discordValue === "string" ? discordValue.trim() : "";

  console.log("[waitlist] action invoked", {
    hasEmail: Boolean(email),
    ...waitlistEmailEnvStatus()
  });

  if (!email) {
    redirect("/#waitlist");
  }

  await sendWaitlistConfirmationEmail({
    email,
    fullName: fullName || undefined,
    discord: discord || undefined
  });

  redirect("/waitlist/success");
}
