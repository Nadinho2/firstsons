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

export type ClassRecordingEmailProps = {
  name: string;
  courseTitle: string;
  classLabel: string;
  recordingUrl: string;
  whatsappGroupUrl: string;
  xUrl?: string;
  logoUrl?: string;
};

export default function ClassRecordingEmail({
  name,
  courseTitle,
  classLabel,
  recordingUrl,
  whatsappGroupUrl,
  xUrl = DEFAULT_X_URL,
  logoUrl,
}: ClassRecordingEmailProps) {
  const greeting = name?.trim() ? name.trim() : "there";

  return (
    <Html lang="en">
      <Head />
      <Preview>{classLabel} recording is ready</Preview>
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
                {classLabel} for <strong>{courseTitle}</strong> is now available.
                If you missed class or want to rewatch, open the recording below.
              </Text>

              <Section style={styles.btnWrap}>
                <Button href={recordingUrl} style={styles.btnPrimary}>
                  Watch class recording →
                </Button>
              </Section>

              <Section style={styles.infoBox}>
                <Text style={styles.infoTitle}>Not in the WhatsApp group yet?</Text>
                <Text style={styles.infoText}>
                  Join now so you don&apos;t miss reminders, materials, and the next
                  class update.
                </Text>
                <Section style={styles.btnWrapTight}>
                  <Button href={whatsappGroupUrl} style={styles.btnWhatsApp}>
                    Join class WhatsApp group →
                  </Button>
                </Section>
              </Section>

              <Section style={styles.btnWrap}>
                <Button href={xUrl} style={styles.btnSecondary}>
                  Follow updates on X @nadinhocrypto →
                </Button>
              </Section>
            </Section>

            <Section style={styles.footer}>
              <Text style={styles.footerBrand}>— First Sons</Text>
              <Text style={styles.footerSub}>
                Questions? Reply to this email and we&apos;ll help.
              </Text>
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
  tagline: {
    margin: "8px 0 0",
    fontSize: "15px",
    color: brand.taglineOnGradient,
    fontWeight: 500,
  },
  content: { padding: "40px 35px", color: brand.textBody },
  hey: { margin: "0 0 18px", fontSize: "18px", fontWeight: 600 },
  p: { margin: "0 0 22px", fontSize: "16px" },
  infoBox: {
    backgroundColor: "rgba(37, 211, 102, 0.08)",
    border: "1px solid rgba(37, 211, 102, 0.35)",
    borderRadius: "12px",
    padding: "18px",
    marginBottom: "20px",
  },
  infoTitle: { margin: "0 0 6px", fontSize: "15px", fontWeight: 700 },
  infoText: { margin: "0 0 14px", fontSize: "14px" },
  btnWrap: { textAlign: "center" as const, marginBottom: "14px" },
  btnWrapTight: { textAlign: "center" as const, marginBottom: "0" },
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
