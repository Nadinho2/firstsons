import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type LastChanceEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  deadlineLine: string;
  riskReversalLine: string;
  logoUrl?: string;
};

export default function LastChanceEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  deadlineLine,
  riskReversalLine,
  logoUrl,
}: LastChanceEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="This closes tonight at midnight."
      greeting={greeting}
      intro={
        <>
          This closes tonight at midnight.
          <br />
          <br />
          <strong>{deadlineLine}</strong>
          <br />
          <br />
          You get: weekly live sessions, clear project roadmap, and feedback while you
          ship.
          <br />
          <br />
          <strong>Risk reversal:</strong> {riskReversalLine}
        </>
      }
      cta={{ href: ctaUrl, label: "Secure My Spot" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
