import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type WelcomeNewsletterEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  logoUrl?: string;
};

export default function WelcomeNewsletterEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  logoUrl,
}: WelcomeNewsletterEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="Welcome to First Sons Academy — free tips + weekly builds."
      greeting={greeting}
      intro={
        <>
          Welcome to <strong>First Sons Academy</strong>. You&apos;re about to learn Web3 by
          shipping real projects with Vibe Coding — even if you&apos;re starting from
          zero.
          <br />
          <br />
          Expect: weekly tips, real student wins, and the exact resources we use in
          class.
        </>
      }
      cta={{ href: ctaUrl, label: "See What We Teach" }}
      footerNote="Quick tip: reply to this email with what you want to build — we’ll tailor the next emails."
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
