import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { brand } from "./brand";
import { EmailBrandLogoRow } from "./EmailBrandLogo";

/** WhatsApp brand green — recognizable for chat CTAs */
const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_DARK = "#128C7E";
const DEFAULT_X_URL = "https://x.com/nadinhocrypto";

export type WaitlistApprovalEmailProps = {
  /** Greeting name */
  name: string;
  /** Course / cohort label */
  courseTitle: string;
  /** Human-readable date range, e.g. "March 1 – April 15, 2026" */
  classDates: string;
  /** Human-readable schedule, e.g. "Saturdays, 10:00 AM – 12:00 PM (WAT)" */
  classTime: string;
  /** Google Meet URL for live sessions */
  googleMeetUrl: string;
  /** WhatsApp group invite link */
  whatsappGroupUrl: string;
  /** X profile link */
  xUrl?: string;
  /** Optional hosted logo — see EMAIL_LOGO_URL */
  logoUrl?: string;
};

/**
 * Cohort approval — schedule, Google Meet, lighter WhatsApp repetition.
 * Intentionally no Discord.
 */
export default function WaitlistApprovalEmail({
  name,
  courseTitle,
  classDates,
  classTime,
  googleMeetUrl,
  whatsappGroupUrl,
  xUrl = DEFAULT_X_URL,
  logoUrl,
}: WaitlistApprovalEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <Html lang="en">
      <Head />
      <Preview>
        You&apos;re approved — class schedule, Google Meet, and WhatsApp inside
      </Preview>
      <Body style={styles.body}>
        <Section style={styles.outer}>
          <Container style={styles.card}>
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

            <Section style={styles.content}>
              <Text style={styles.hey}>Hey {greeting},</Text>

              <Text style={styles.p}>
                Great news — you&apos;re <strong>approved</strong> for{" "}
                <strong>{courseTitle}</strong> with First Sons. Below are your
                class dates, live session link, and the WhatsApp group for this
                cohort (updates, reminders, and quick questions between classes).
              </Text>

              {/* CTA 1 — WhatsApp early */}
              <Section style={styles.btnWrap}>
                <Button href={whatsappGroupUrl} style={styles.btnWhatsApp}>
                  Join the class WhatsApp group →
                </Button>
              </Section>

              <Section style={styles.detailsBox}>
                <Text style={styles.detailsTitle}>Your class details</Text>
                <Text style={styles.detailRow}>
                  <strong>Dates:</strong> {classDates}
                </Text>
                <Text style={styles.detailRow}>
                  <strong>Time:</strong> {classTime}
                </Text>
                <Text style={styles.detailRowLast}>
                  <strong>Google Meet (live sessions):</strong>{" "}
                  <Link href={googleMeetUrl} style={styles.inlineLink}>
                    open link
                  </Link>
                </Text>
              </Section>

              <Section style={styles.btnWrap}>
                <Button href={googleMeetUrl} style={styles.btnMeet}>
                  Join live class on Google Meet →
                </Button>
              </Section>

              <Text style={styles.p}>
                Save this email — you&apos;ll use the Meet link every session.
                Between classes, we share announcements and answer quick
                questions in WhatsApp (that&apos;s the main place to stay in sync
                with the group).
              </Text>

              <Section style={styles.whatsappHighlight}>
                <Text style={styles.whatsappHighlightTitle}>
                  Important: join the WhatsApp group
                </Text>
                <Text style={styles.whatsappHighlightText}>
                  If you only do one thing after reading this email, join the
                  group — that&apos;s where we post schedule changes, prep
                  materials, and reminders.
                </Text>
                <Text style={styles.whatsappHint}>
                  Join once here:{" "}
                  <Link href={whatsappGroupUrl} style={styles.inlineLink}>
                    open WhatsApp invite
                  </Link>
                </Text>
              </Section>

              <Text style={styles.p}>
                Questions about timing or access? Reply to this email and
                we&apos;ll help.
              </Text>

              <Section style={styles.btnWrap}>
                <Button href={xUrl} style={styles.btnX}>
                  Follow updates on X @nadinhocrypto →
                </Button>
              </Section>

              <Text style={styles.signOff}>
                See you in class,
                <br />
                <span style={styles.signOffBrand}>— First Sons</span>
              </Text>
            </Section>

            <Section style={styles.footer}>
              <Text style={styles.footerBrand}>First Sons</Text>
              <Text style={styles.footerSub}>
                Web3 Academy • Building the next generation of on-chain builders
              </Text>
            </Section>
          </Container>

          <Text style={styles.tinyFooter}>
            You received this because you were approved for a First Sons cohort.
            <br />
            Questions? Reply to this email.
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
  detailsBox: {
    backgroundColor: brand.slate100,
    border: "1px solid rgba(96, 165, 250, 0.22)",
    padding: "20px 20px 18px",
    borderRadius: "12px",
    marginBottom: "20px",
  },
  detailsTitle: {
    margin: "0 0 14px",
    fontSize: "15px",
    fontWeight: 700,
    color: brand.textBody,
    letterSpacing: "-0.02em",
  },
  detailRow: {
    margin: "0 0 10px",
    fontSize: "16px",
    lineHeight: 1.55,
  },
  detailRowLast: {
    margin: 0,
    fontSize: "16px",
    lineHeight: 1.55,
  },
  inlineLink: {
    color: brand.primaryMid,
    fontWeight: 600,
  },
  btnWrap: {
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  btnWrapTight: {
    textAlign: "center" as const,
    marginBottom: "0",
  },
  btnMeet: {
    display: "block",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    backgroundColor: brand.primaryMid,
    background: brand.gradient.cta,
    color: "#ffffff",
    padding: "16px 28px",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
    lineHeight: "1.4",
    boxShadow: "0 0 28px rgba(37, 99, 235, 0.35)",
  },
  btnWhatsApp: {
    display: "block",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    backgroundColor: WHATSAPP_GREEN,
    color: "#ffffff",
    padding: "16px 28px",
    fontSize: "16px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
    lineHeight: "1.4",
    boxShadow: `0 4px 20px rgba(18, 140, 126, 0.35)`,
    border: `1px solid ${WHATSAPP_GREEN_DARK}`,
  },
  whatsappHighlight: {
    backgroundColor: "rgba(37, 211, 102, 0.08)",
    border: "1px solid rgba(37, 211, 102, 0.35)",
    borderRadius: "12px",
    padding: "22px 20px",
    marginBottom: "24px",
  },
  whatsappHighlightTitle: {
    margin: "0 0 10px",
    fontSize: "16px",
    fontWeight: 700,
    color: brand.textBody,
  },
  whatsappHighlightText: {
    margin: "0 0 18px",
    fontSize: "15px",
    lineHeight: 1.55,
    color: brand.textBody,
  },
  whatsappHint: {
    margin: 0,
    fontSize: "14px",
    color: brand.textBody,
  },
  btnX: {
    display: "block",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    backgroundColor: brand.background,
    color: "#ffffff",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
    lineHeight: "1.4",
  },
  signOff: {
    margin: "28px 0 0",
    fontSize: "16px",
    color: brand.textBody,
  },
  signOffBrand: {
    fontWeight: 600,
    color: brand.textBody,
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
