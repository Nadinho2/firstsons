import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type HtmlNewsletterEmailProps = {
  preview: string;
  name?: string;
  htmlBody: string;
  ctaUrl: string;
  ctaLabel: string;
  unsubscribeUrl: string;
  logoUrl?: string;
};

export default function HtmlNewsletterEmail({
  preview,
  name,
  htmlBody,
  ctaUrl,
  ctaLabel,
  unsubscribeUrl,
  logoUrl,
}: HtmlNewsletterEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview={preview}
      greeting={greeting}
      intro={<span dangerouslySetInnerHTML={{ __html: htmlBody }} />}
      cta={{ href: ctaUrl, label: ctaLabel }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
