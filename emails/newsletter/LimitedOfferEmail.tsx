import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type LimitedOfferEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  offerLine: string;
  logoUrl?: string;
};

export default function LimitedOfferEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  offerLine,
  logoUrl,
}: LimitedOfferEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="Limited offer inside — ends Friday."
      greeting={greeting}
      intro={
        <>
          Quick heads up — there&apos;s a limited offer running:
          <br />
          <br />
          <strong>{offerLine}</strong>
          <br />
          <br />
          If you want to lock in a spot, do it before the deadline.
        </>
      }
      cta={{ href: ctaUrl, label: "Claim My Spot" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
