import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type SocialProofEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  testimonials: Array<{ name: string; quote: string }>;
  logoUrl?: string;
};

export default function SocialProofEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  testimonials,
  logoUrl,
}: SocialProofEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";
  const items = testimonials.slice(0, 3);

  return (
    <NewsletterShell
      preview="They had zero coding experience. Now look."
      greeting={greeting}
      intro={
        <>
          They had zero coding experience. Now look:
          <br />
          <br />
          {items.map((t) => (
            <React.Fragment key={t.name}>
              <strong>{t.name}:</strong> “{t.quote}”
              <br />
              <br />
            </React.Fragment>
          ))}
          Spots are limited when a cohort opens. If you want in, don&apos;t wait.
        </>
      }
      cta={{ href: ctaUrl, label: "Limited Spots Left" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
