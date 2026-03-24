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

const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_DARK = "#128C7E";
const DEFAULT_X_URL = "https://x.com/nadinhocrypto";

export type NextClassTeaserEmailProps = {
  name: string;
  courseTitle: string;
  nextClassLabel: string;
  nextClassDateTime: string;
  googleMeetUrl: string;
  whatsappGroupUrl: string;
  teaserText: string;
  xUrl?: string;
  logoUrl?: string;
};

export default function NextClassTeaserEmail({
  name,
  courseTitle,
  nextClassLabel,
  nextClassDateTime,
  googleMeetUrl,
  whatsappGroupUrl,
  teaserText,
  xUrl = DEFAULT_X_URL,
  logoUrl,
}: NextClassTeaserEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <Html lang="en">
      <Head />
      <Preview>{nextClassLabel} hype + class access</Preview>
      <Body style={styles.body}>
        <Section style={styles.outer}>
          <Container style={styles.card}>
            <Section style={styles.header}>
              <EmailBrandLogoRow variant="light" logoUrl={logoUrl} marginBottom={12} />
              <Text style={styles.tagline}>Web3 Academy for Complete Beginners</Text>
            </Section>

            <Section style={styles.content}>
              <Text style={styles.hey}>Hey {greeting},</Text>
              <Text style={styles.p}>
                {nextClassLabel} for <strong>{courseTitle}</strong> is almost here.
                Let&apos;s keep the momentum high 🔥
              </Text>

              <Section style={styles.teaserBox}>
                <Text style={styles.teaserTitle}>What to expect next</Text>
                <Text style={styles.teaserBody}>{teaserText}</Text>
              </Section>

              <Section style={styles.detailsBox}>
                <Text style={styles.detailRow}>
                  <strong>Class:</strong> {nextClassLabel}
                </Text>
                <Text style={styles.detailRow}>
                  <strong>When:</strong> {nextClassDateTime}
                </Text>
                <Text style={styles.detailRowLast}>
                  <strong>Google Meet:</strong>{" "}
                  <Link href={googleMeetUrl} style={styles.inlineLink}>
                    open class link
                  </Link>
                </Text>
              </Section>

              <Section style={styles.btnWrap}>
                <Button href={googleMeetUrl} style={styles.btnPrimary}>
                  Join next class on Google Meet →
                </Button>
              </Section>
              <Section style={styles.btnWrap}>
                <Button href={whatsappGroupUrl} style={styles.btnWhatsApp}>
                  Join WhatsApp (updates + reminders) →
                </Button>
              </Section>
              <Section style={styles.btnWrap}>
                <Button href={xUrl} style={styles.btnSecondary}>
                  Follow updates on X @nadinhocrypto →
                </Button>
              </Section>
            </Section>

            <Section style={styles.footer}>
              <Text style={styles.footerBrand}>— First Sons</Text>
              <Text style={styles.footerSub}>See you in class. Bring your build energy.</Text>
            </Section>
          </Container>
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
  outer: { backgroundColor: brand.slate50, padding: "40px 20px" },
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
  tagline: { margin: "8px 0 0", fontSize: "15px", color: brand.taglineOnGradient, fontWeight: 500 },
  content: { padding: "40px 35px", color: brand.textBody },
  hey: { margin: "0 0 18px", fontSize: "18px", fontWeight: 600 },
  p: { margin: "0 0 20px", fontSize: "16px" },
  teaserBox: {
    backgroundColor: "rgba(96, 165, 250, 0.1)",
    border: "1px solid rgba(96, 165, 250, 0.3)",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "18px",
  },
  teaserTitle: { margin: "0 0 6px", fontSize: "14px", fontWeight: 700, color: brand.primaryMid },
  teaserBody: { margin: 0, fontSize: "15px", color: brand.textBody },
  detailsBox: {
    backgroundColor: brand.slate100,
    border: "1px solid rgba(96, 165, 250, 0.22)",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "18px",
  },
  detailRow: { margin: "0 0 8px", fontSize: "15px" },
  detailRowLast: { margin: 0, fontSize: "15px" },
  inlineLink: { color: brand.primaryMid, fontWeight: 600 },
  btnWrap: { textAlign: "center" as const, marginBottom: "12px" },
  btnPrimary: {
    display: "block",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    backgroundColor: brand.primaryMid,
    background: brand.gradient.cta,
    color: "#ffffff",
    padding: "15px 24px",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
  },
  btnWhatsApp: {
    display: "block",
    width: "100%",
    maxWidth: "320px",
    margin: "0 auto",
    backgroundColor: WHATSAPP_GREEN,
    color: "#ffffff",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: 700,
    textDecoration: "none",
    borderRadius: "9999px",
    textAlign: "center" as const,
    border: `1px solid ${WHATSAPP_GREEN_DARK}`,
  },
  btnSecondary: {
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
  },
  footer: {
    backgroundColor: brand.background,
    padding: "26px 35px",
    textAlign: "center" as const,
    color: brand.footerText,
  },
  footerBrand: { margin: 0, fontSize: "15px", fontWeight: 600, color: brand.footerText },
  footerSub: { margin: "8px 0 0", fontSize: "13px", opacity: 0.8, color: brand.footerText },
};
