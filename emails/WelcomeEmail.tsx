import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { brand } from "./brand";
import { EmailBrandLogoRow } from "./EmailBrandLogo";

export type WelcomeEmailProps = {
  /** Display name or "there" if empty */
  name: string;
  /** Full Discord invite URL */
  discordInvite: string;
  /** Optional hosted logo — see EMAIL_LOGO_URL */
  logoUrl?: string;
};

/**
 * Waitlist welcome — dark First Sons theme (#0F172A, blue gradient accents).
 * Inline styles = best email client support (React Email pattern).
 */
export default function WelcomeEmail({
  name,
  discordInvite,
  logoUrl,
}: WelcomeEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to First Sons — join the Discord fam</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Hero gradient bar */}
          <Section style={styles.heroBar} />

          <Section style={styles.logoTop}>
            <EmailBrandLogoRow variant="dark" logoUrl={logoUrl} marginBottom={8} />
          </Section>

          <Section style={styles.pad}>
            <Heading as="h1" style={styles.h1}>
              Welcome to First Sons!
            </Heading>
            <Text style={styles.lead}>
              Hey {greeting}, you&apos;re on the list for Phase 1 — the beginner
              Web3 academy where you learn by shipping, Discord-first.
            </Text>
            <Text style={styles.text}>
              Jump into the server for Vibe Coding, build-alongs, and help when
              you&apos;re stuck. No gatekeeping — just builders.
            </Text>

            <Section style={styles.ctaWrap}>
              <Button href={discordInvite} style={styles.button}>
                Join Discord
              </Button>
            </Section>

            <Text style={styles.small}>
              Button not working? Paste this link in your browser:{" "}
              <Link href={discordInvite} style={styles.link}>
                {discordInvite}
              </Link>
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.footer}>
              First Sons · Web3 Academy for Complete Beginners
              <br />
              <Link href="https://x.com/Firstsons_Dao" style={styles.linkMuted}>
                @Firstsons_Dao
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/** Brand tokens — mirror site (see emails/brand.ts) */
const styles = {
  body: {
    backgroundColor: brand.backgroundDeep,
    fontFamily: brand.fontFamily,
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: brand.background,
    borderRadius: "16px",
    border: "1px solid rgba(51, 65, 85, 0.5)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
    margin: "0 auto",
    maxWidth: "520px",
    overflow: "hidden",
  },
  heroBar: {
    background: brand.gradient.heroBar,
    backgroundColor: brand.primary,
    height: "6px",
    width: "100%",
  },
  logoTop: {
    padding: "24px 28px 0",
    textAlign: "center" as const,
    backgroundColor: brand.background,
  },
  pad: {
    padding: "20px 28px 32px",
  },
  h1: {
    color: "#f8fafc",
    fontSize: "26px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
    margin: "0 0 16px",
  },
  lead: {
    color: "#cbd5e1",
    fontSize: "16px",
    lineHeight: 1.6,
    margin: "0 0 12px",
  },
  text: {
    color: "#94a3b8",
    fontSize: "15px",
    lineHeight: 1.6,
    margin: "0 0 24px",
  },
  ctaWrap: {
    textAlign: "center" as const,
    margin: "0 0 20px",
  },
  button: {
    backgroundColor: brand.primaryMid,
    background: brand.gradient.cta,
    borderRadius: "9999px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 600,
    padding: "14px 28px",
    textDecoration: "none",
    boxShadow: "0 0 30px rgba(37, 99, 235, 0.45)",
  },
  small: {
    color: "#64748b",
    fontSize: "12px",
    lineHeight: 1.5,
    margin: 0,
    wordBreak: "break-all" as const,
  },
  link: {
    color: brand.accent,
  },
  linkMuted: {
    color: "#64748b",
  },
  hr: {
    borderColor: "rgba(51, 65, 85, 0.6)",
    margin: "24px 0",
  },
  footer: {
    color: brand.textMuted,
    fontSize: "12px",
    lineHeight: 1.6,
    margin: 0,
    textAlign: "center" as const,
  },
};
