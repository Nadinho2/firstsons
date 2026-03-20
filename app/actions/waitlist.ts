"use server";

import { redirect } from "next/navigation";
import {
  sendWaitlistConfirmationEmail,
  waitlistEmailEnvStatus
} from "@/lib/email";
import {
  getWaitlistCourseBySlug,
  isValidWaitlistCourseSlug
} from "@/lib/waitlist-courses";

/**
 * Top-level server action (module has "use server").
 * Avoid defining actions inside nested components — they can fail to register on Vercel.
 */
export async function submitWaitlist(formData: FormData): Promise<void> {
  const emailValue = formData.get("email");
  const fullNameValue = formData.get("fullName");
  const discordValue = formData.get("discord");
  const courseSlugValue = formData.get("courseSlug");

  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const fullName =
    typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const discord =
    typeof discordValue === "string" ? discordValue.trim() : "";
  const courseSlugRaw =
    typeof courseSlugValue === "string" ? courseSlugValue.trim() : "";

  console.log("[waitlist] action invoked", {
    hasEmail: Boolean(email),
    courseSlug: courseSlugRaw || undefined,
    ...waitlistEmailEnvStatus()
  });

  if (!email) {
    redirect("/#waitlist");
  }

  let courseSlug: string | undefined;
  let courseTitle: string | undefined;

  if (courseSlugRaw) {
    if (!isValidWaitlistCourseSlug(courseSlugRaw)) {
      redirect("/#waitlist");
    }
    courseSlug = courseSlugRaw;
    const course = getWaitlistCourseBySlug(courseSlugRaw);
    courseTitle = course?.title;
  }

  await sendWaitlistConfirmationEmail({
    email,
    fullName: fullName || undefined,
    discord: discord || undefined,
    courseSlug,
    courseTitle
  });

  const successQuery = courseSlug
    ? `?course=${encodeURIComponent(courseSlug)}`
    : "";
  redirect(`/waitlist/success${successQuery}`);
}
