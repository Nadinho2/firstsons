import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { brand } from "./brand";
import { EmailBrandLogoRow } from "./EmailBrandLogo";

export type WaitlistConfirmationEmailProps = {
  /** Greeting name — e.g. first name or "there" */
  name: string;
  /** Course / track label */
  track: string;
  /** Discord @handle from the form */
  discordHandle: string;
  /** Primary Discord invite (defaults in sender if omitted) */
  discordUrl?: string;
  /** X profile URL */
  xUrl?: string;
  /** Optional hosted logo — see EMAIL_LOGO_URL */
  logoUrl?: string;
};

const DEFAULT_DISCORD = "https://discord.gg/VJj2ZHc46";
const DEFAULT_X = "https://x.com/Firstsons_Dao";

/**
 * Waitlist confirmation — site brand (blue gradient header, light card, CTAs).
 * Table-friendly layout via React Email + inline styles.
 */
export default function WaitlistConfirmationEmail({
  name,
  track,
  discordHandle,
  discordUrl = DEFAULT_DISCORD,
  xUrl = DEFAULT_X,
  logoUrl,
}: WaitlistConfirmationEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";
  const handleDisplay = discordHandle?.trim() ? discordHandle.trim() : "—";

  return (
    <Html lang="en">
      <Head />
      <Preview>You&apos;re on the First Sons Phase 1 waitlist</Preview>
      <Body style={styles.body}>
        <Section style={styles.outer}>
          <Container style={styles.card}>
            {/* Header — brand blue gradient + logo (matches Navbar) */}
            <Section style={styles.header}>
              <EmailBrandLogoRow
                variant="light"
                logoUrl={logoUrl}
                marginBottom={12}
              />
              <Text style={styles.tagline}>
                Web3 Academy for Complete Beginners
              </Text>
            </Section>

            {/* Content */}
            <Section style={styles.content}>
              <Text style={styles.hey}>Hey {greeting},</Text>

              <Text style={styles.p}>
                You&apos;re officially on the{" "}
                <strong>First Sons Phase 1 waitlist</strong>.
                <br />
                <strong>Track:</strong> {track}.
              </Text>

              <Text style={styles.pLast}>
                When spots open, we&apos;ll email you with everything you need to
                join the cohort, start Vibe Coding, and ship your first on-chain
                projects with the group.
              </Text>

              {/* Discord handle box */}
              <Section style={styles.handleBox}>
                <Text style={styles.handleLabel}>
                  We&apos;ve got your Discord handle as:
                </Text>
                <Text style={styles.handleValue}>{handleDisplay}</Text>
              </Section>

              <Text style={styles.inMean}>In the meantime:</Text>

              <Section style={styles.btnWrap}>
                <Button href={discordUrl} style={styles.btnPrimary}>
                  Join the Discord Now →
                </Button>
              </Section>
              <Section style={styles.btnWrap}>
                <Button href={xUrl} style={styles.btnSecondary}>
                  Follow us on X @Firstsons_Dao
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section style={styles.footer}>
              <Text style={styles.footerBrand}>— First Sons</Text>
              <Text style={styles.footerSub}>
                Web3 Academy • Building the next generation of on-chain builders
              </Text>
            </Section>
          </Container>

          <Text style={styles.tinyFooter}>
            You received this email because you joined the First Sons waitlist.
            <br />
            Questions? Just reply to this email.
          </Text>
        </Section>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: brand.slate50,
    fontFamily: brand.fontFamily,
    lineHeight: 1.6,
    color: brand.textBody,
  },
  outer: {
    backgroundColor: brand.slate50,
    padding: "40px 20px",
  },
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  header: {
    background: brand.gradient.header,
    backgroundColor: brand.primary,
    padding: "36px 30px 40px",
    textAlign: "center" as const,
  },
  tagline: {
    margin: "8px 0 0",
    fontSize: "15px",
    color: brand.taglineOnGradient,
    fontWeight: 500,
  },
  content: {
    padding: "40px 35px",
    color: brand.textBody,
  },
  hey: {
    margin: "0 0 24px",
    fontSize: "18px",
    fontWeight: 600,
  },
  p: {
    margin: "0 0 24px",
    fontSize: "16px",
  },
  pLast: {
    margin: "0 0 32px",
    fontSize: "16px",
  },
  handleBox: {
    backgroundColor: brand.slate100,
    border: "1px solid rgba(96, 165, 250, 0.22)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "32px",
  },
  handleLabel: {
    margin: "0 0 8px",
    fontSize: "15px",
    color: brand.textMuted,
  },
  handleValue: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: brand.textBody,
  },
  inMean: {
    margin: "0 0 20px",
    fontSize: "16px",
    fontWeight: 600,
  },
  btnWrap: {
    textAlign: "center" as const,
    marginBottom: "12px",
  },
  btnPrimary: {
    display: "block",
    width: "100%",
    maxWidth: "280px",
    margin: "0 auto",
    backgroundColor: brand.primaryMid,
    background: brand.gradient.cta,
    color: "#ffffff",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
    lineHeight: "1.4",
    boxShadow: "0 0 28px rgba(37, 99, 235, 0.45)",
  },
  btnSecondary: {
    display: "block",
    width: "100%",
    maxWidth: "280px",
    margin: "0 auto",
    backgroundColor: brand.background,
    color: "#ffffff",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
    lineHeight: "1.4",
  },
  footer: {
    backgroundColor: brand.background,
    padding: "30px 35px",
    textAlign: "center" as const,
    color: brand.footerText,
  },
  footerBrand: {
    margin: 0,
    fontSize: "15px",
    fontWeight: 600,
    color: brand.footerText,
  },
  footerSub: {
    margin: "12px 0 0",
    fontSize: "13px",
    opacity: 0.7,
    color: brand.footerText,
  },
  tinyFooter: {
    margin: "24px 0 0",
    fontSize: "12px",
    color: brand.textMuted,
    textAlign: "center" as const,
  },
};
