import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type WeeklyNewsletterEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  tip: string;
  studentWin: string;
  resourceUrl: string;
  resourceLabel: string;
  logoUrl?: string;
};

export default function WeeklyNewsletterEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  tip,
  studentWin,
  resourceUrl,
  resourceLabel,
  logoUrl,
}: WeeklyNewsletterEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="This Week in Vibe Coding — quick win, student spotlight, and a resource."
      greeting={greeting}
      intro={
        <>
          <strong>1 Web3 tip:</strong> {tip}
          <br />
          <br />
          <strong>1 student win:</strong> {studentWin}
          <br />
          <br />
          <strong>1 resource:</strong>{" "}
          <a href={resourceUrl} target="_blank" rel="noreferrer">
            {resourceLabel}
          </a>
          <br />
          <br />
          If you want a clear path + feedback, the cohort is where the magic happens.
        </>
      }
      cta={{ href: ctaUrl, label: "Register For The Cohort" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
