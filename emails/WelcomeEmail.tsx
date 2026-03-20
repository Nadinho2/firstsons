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

export type WelcomeEmailProps = {
  /** Display name or "there" if empty */
  name: string;
  /** Full Discord invite URL */
  discordInvite: string;
};

/**
 * Waitlist welcome — dark First Sons theme (#0F172A, blue gradient accents).
 * Inline styles = best email client support (React Email pattern).
 */
export default function WelcomeEmail({
  name,
  discordInvite,
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

          {/* Optional: swap src for your hosted logo when ready */}
          <Section style={styles.logoRow}>
            <Text style={styles.logoText}>FS</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/** Brand tokens — mirror site (Tailwind-like values as inline CSS) */
const styles = {
  body: {
    backgroundColor: "#020617",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    margin: 0,
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#0F172A",
    borderRadius: "16px",
    border: "1px solid rgba(51, 65, 85, 0.5)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.45)",
    margin: "0 auto",
    maxWidth: "520px",
    overflow: "hidden",
  },
  heroBar: {
    background: "linear-gradient(90deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)",
    height: "6px",
    width: "100%",
  },
  pad: {
    padding: "28px 28px 32px",
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
    background: "linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)",
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
    color: "#60A5FA",
  },
  linkMuted: {
    color: "#64748b",
  },
  hr: {
    borderColor: "rgba(51, 65, 85, 0.6)",
    margin: "24px 0",
  },
  footer: {
    color: "#64748b",
    fontSize: "12px",
    lineHeight: 1.6,
    margin: 0,
    textAlign: "center" as const,
  },
  logoRow: {
    backgroundColor: "#020617",
    padding: "12px",
    textAlign: "center" as const,
  },
  logoText: {
    color: "#60A5FA",
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    margin: 0,
  },
};
