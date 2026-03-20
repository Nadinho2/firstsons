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

export type PremiumEnrollmentEmailProps = {
  name: string;
  course: string;
  /** e.g. "$50.00 USD" */
  amount: string;
  /** On-chain tx hash (optional) */
  txHash?: string;
  /** Premium / VIP Discord invite */
  premiumDiscordInvite: string;
};

/**
 * $50 premium class — receipt-style confirmation + premium Discord CTA.
 */
export default function PremiumEnrollmentEmail({
  name,
  course,
  amount,
  txHash,
  premiumDiscordInvite,
}: PremiumEnrollmentEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <Html lang="en">
      <Head />
      <Preview>Payment received — {course} · First Sons Premium</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.heroBar} />

          <Section style={styles.pad}>
            <Text style={styles.receiptLabel}>RECEIPT</Text>
            <Heading as="h1" style={styles.h1}>
              You&apos;re enrolled — Premium
            </Heading>
            <Text style={styles.lead}>
              Hi {greeting}, thanks for your payment. Your spot for{" "}
              <span style={styles.accent}>{course}</span> is confirmed.
            </Text>

            <Section style={styles.receiptBox}>
              <Row label="Course" value={course} />
              <Row label="Amount" value={amount} />
              {txHash ? (
                <Row
                  label="Transaction"
                  value={
                    <Link
                      href={`https://etherscan.io/tx/${txHash}`}
                      style={styles.monoLink}
                    >
                      {shortHash(txHash)}
                    </Link>
                  }
                />
              ) : null}
            </Section>

            <Text style={styles.text}>
              Your premium Discord access unlocks the private cohort channels
              for this class. Introduce yourself in{" "}
              <span style={styles.accent}>#start-here</span> when you land.
            </Text>

            <Section style={styles.ctaWrap}>
              <Button href={premiumDiscordInvite} style={styles.button}>
                Open Premium Discord
              </Button>
            </Section>

            <Text style={styles.small}>
              Link:{" "}
              <Link href={premiumDiscordInvite} style={styles.link}>
                {premiumDiscordInvite}
              </Link>
            </Text>

            <Hr style={styles.hr} />

            <Text style={styles.footer}>
              First Sons · Premium enrollment
              <br />
              Questions? Reply to this email.
            </Text>
          </Section>

          <Section style={styles.logoRow}>
            <Text style={styles.logoText}>FS · PREMIUM</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <Section style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </Section>
  );
}

function shortHash(hash: string) {
  if (hash.length <= 14) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

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
    background: "linear-gradient(90deg, #1E40AF 0%, #2563EB 40%, #60A5FA 100%)",
    height: "6px",
    width: "100%",
  },
  pad: {
    padding: "28px 28px 32px",
  },
  receiptLabel: {
    color: "#60A5FA",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    margin: "0 0 8px",
  },
  h1: {
    color: "#f8fafc",
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
    margin: "0 0 16px",
  },
  lead: {
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  accent: {
    color: "#60A5FA",
  },
  receiptBox: {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    border: "1px solid rgba(51, 65, 85, 0.7)",
    borderRadius: "12px",
    margin: "0 0 24px",
    padding: "16px 18px",
  },
  row: {
    marginBottom: "12px",
  },
  rowLabel: {
    color: "#64748b",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    margin: "0 0 4px",
    textTransform: "uppercase" as const,
  },
  rowValue: {
    color: "#e2e8f0",
    fontSize: "15px",
    fontWeight: 600,
    margin: 0,
  },
  monoLink: {
    color: "#60A5FA",
    fontFamily: "ui-monospace, monospace",
    fontSize: "13px",
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
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    margin: 0,
  },
};
