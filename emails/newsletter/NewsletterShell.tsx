import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { brand } from "../brand";
import { EmailBrandLogoRow } from "../EmailBrandLogo";

export type NewsletterShellProps = {
  preview: string;
  greeting: string;
  intro: React.ReactNode;
  cta: { href: string; label: string };
  footerNote?: string;
  unsubscribeUrl: string;
  logoUrl?: string;
};

export function NewsletterShell({
  preview,
  greeting,
  intro,
  cta,
  footerNote,
  unsubscribeUrl,
  logoUrl,
}: NewsletterShellProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.heroBar} />

          <Section style={styles.header}>
            <EmailBrandLogoRow variant="dark" logoUrl={logoUrl} marginBottom={8} />
            <Text style={styles.tagline}>Web3 Academy for Complete Beginners</Text>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.hey}>Hey {greeting},</Text>
            <Text style={styles.p}>{intro}</Text>

            <Section style={styles.ctaWrap}>
              <Button href={cta.href} style={styles.ctaBtn}>
                {cta.label} →
              </Button>
            </Section>

            {footerNote ? <Text style={styles.pMuted}>{footerNote}</Text> : null}

            <Hr style={styles.hr} />

            <Section style={styles.footer}>
              <Text style={styles.footerBrand}>— First Sons Academy</Text>
              <Text style={styles.footerSmall}>
                Want fewer emails?{" "}
                <Link href={unsubscribeUrl} style={styles.footerLink}>
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: brand.backgroundDeep,
    fontFamily: brand.fontFamily,
    margin: 0,
    padding: "24px 0",
  },
  container: {
    backgroundColor: brand.background,
    borderRadius: "18px",
    overflow: "hidden",
    border: "1px solid rgba(148, 163, 184, 0.18)",
    maxWidth: "600px",
  },
  heroBar: {
    height: "6px",
    width: "100%",
    background: brand.gradient.heroBar,
  },
  header: {
    padding: "18px 22px 4px",
    textAlign: "center" as const,
  },
  tagline: {
    color: brand.taglineOnGradient,
    fontSize: "12px",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    margin: "0 0 6px",
  },
  content: {
    padding: "8px 22px 20px",
  },
  hey: {
    color: "#e2e8f0",
    fontSize: "16px",
    fontWeight: 700,
    margin: "0 0 10px",
  },
  p: {
    color: "#cbd5e1",
    fontSize: "15px",
    lineHeight: "1.65",
    margin: "0 0 18px",
  },
  pMuted: {
    color: "#94a3b8",
    fontSize: "13px",
    lineHeight: "1.6",
    margin: "0 0 18px",
  },
  ctaWrap: {
    textAlign: "center" as const,
    margin: "0 0 18px",
  },
  ctaBtn: {
    backgroundColor: brand.primaryMid,
    background: brand.gradient.cta,
    borderRadius: "9999px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 700,
    padding: "14px 28px",
    textDecoration: "none",
    boxShadow: "0 0 30px rgba(37, 99, 235, 0.45)",
  },
  hr: {
    borderColor: "rgba(51, 65, 85, 0.7)",
    margin: "20px 0 16px",
  },
  footer: {
    textAlign: "center" as const,
  },
  footerBrand: {
    color: "#e2e8f0",
    fontSize: "12px",
    margin: "0 0 6px",
  },
  footerSmall: {
    color: "#94a3b8",
    fontSize: "12px",
    margin: 0,
  },
  footerLink: {
    color: brand.accent,
    textDecoration: "underline",
  },
} as const;
