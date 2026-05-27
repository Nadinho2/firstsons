import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type FreeResourceEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  resourceTitle: string;
  resourceUrl: string;
  logoUrl?: string;
};

export default function FreeResourceEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  resourceTitle,
  resourceUrl,
  logoUrl,
}: FreeResourceEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="Free Web3 starter guide — no signup needed."
      greeting={greeting}
      intro={
        <>
          Here&apos;s a free resource to help you get started (no extra signup
          needed):
          <br />
          <br />
          <strong>{resourceTitle}</strong>
          <br />
          <a href={resourceUrl} target="_blank" rel="noreferrer">
            {resourceUrl}
          </a>
          <br />
          <br />
          Use it today. And if you want the full roadmap + weekly shipping, the
          cohort is open.
        </>
      }
      cta={{ href: ctaUrl, label: "Join The Class" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
