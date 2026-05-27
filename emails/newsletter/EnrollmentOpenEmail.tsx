import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type EnrollmentOpenEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  cohortDates: string;
  spotsRemaining: string;
  logoUrl?: string;
};

export default function EnrollmentOpenEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  cohortDates,
  spotsRemaining,
  logoUrl,
}: EnrollmentOpenEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="New cohort now open — don’t miss it."
      greeting={greeting}
      intro={
        <>
          🚨 New cohort is open.
          <br />
          <br />
          <strong>Dates:</strong> {cohortDates}
          <br />
          <strong>Spots remaining:</strong> {spotsRemaining}
          <br />
          <br />
          You&apos;ll learn by shipping: small Web3 apps, clean frontend, and the exact
          Vibe Coding workflow we use to move fast.
        </>
      }
      cta={{ href: ctaUrl, label: "Enroll Now" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
