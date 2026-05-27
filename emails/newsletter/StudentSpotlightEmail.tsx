import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type StudentSpotlightEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  studentName: string;
  studentBackground: string;
  studentResult: string;
  logoUrl?: string;
};

export default function StudentSpotlightEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  studentName,
  studentBackground,
  studentResult,
  logoUrl,
}: StudentSpotlightEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview={`Look what ${studentName} built in 3 weeks.`}
      greeting={greeting}
      intro={
        <>
          Look what <strong>{studentName}</strong> built in 3 weeks.
          <br />
          <br />
          <strong>Background:</strong> {studentBackground}
          <br />
          <br />
          <strong>Result:</strong> {studentResult}
          <br />
          <br />
          This is what happens when you ship weekly with a clear plan and a real
          community behind you.
        </>
      }
      cta={{ href: ctaUrl, label: "I Want Results Like This" }}
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
