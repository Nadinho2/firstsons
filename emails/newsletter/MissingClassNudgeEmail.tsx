import * as React from "react";
import { NewsletterShell } from "./NewsletterShell";

export type MissingClassNudgeEmailProps = {
  name?: string;
  ctaUrl: string;
  unsubscribeUrl: string;
  logoUrl?: string;
};

export default function MissingClassNudgeEmail({
  name,
  ctaUrl,
  unsubscribeUrl,
  logoUrl,
}: MissingClassNudgeEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <NewsletterShell
      preview="Your classmates are already building on Web3."
      greeting={greeting}
      intro={
        <>
          Your classmates are already building on Web3 — and the gap grows fast.
          <br />
          <br />
          This week inside the academy, registered students are learning:
          <br />• How to ship small Web3 apps with clean UI
          <br />• Wallet connections + basic on-chain reads
          <br />• Vibe Coding workflows that turn ideas into code in hours
        </>
      }
      cta={{ href: ctaUrl, label: "Join The Class" }}
      footerNote="If you’re already registered, ignore this — you’ll keep getting the good stuff either way."
      unsubscribeUrl={unsubscribeUrl}
      logoUrl={logoUrl}
    />
  );
}
