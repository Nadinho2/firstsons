import { Img, Section, Text } from "@react-email/components";
import * as React from "react";
import { brand } from "./brand";

export type EmailBrandLogoRowProps = {
  variant: "light" | "dark";
  /** Full URL to hosted logo (e.g. EMAIL_LOGO_URL). If set, uses image instead of F mark + wordmark. */
  logoUrl?: string;
  marginBottom?: number;
};

/**
 * Website-aligned logo: gradient “F” mark + “First Sons” (Navbar style), or optional raster logo URL.
 */
export function EmailBrandLogoRow({
  variant,
  logoUrl,
  marginBottom = 12,
}: EmailBrandLogoRowProps) {
  const wordmarkColor = variant === "light" ? "#ffffff" : "#f8fafc";

  if (logoUrl) {
    return (
      <Section style={{ textAlign: "center", marginBottom }}>
        <Img
          src={logoUrl}
          alt="First Sons"
          width={200}
          height={52}
          style={{ margin: "0 auto", display: "block", maxWidth: "100%", height: "auto" }}
        />
      </Section>
    );
  }

  return (
    <Section style={{ textAlign: "center", marginBottom }}>
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{ margin: "0 auto" }}
      >
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle", paddingRight: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: brand.gradient.logoMark,
                  boxShadow: "0 0 24px rgba(37,99,235,0.75)",
                  textAlign: "center" as const,
                  lineHeight: "36px",
                  fontWeight: 700,
                  color: "#ffffff",
                  fontSize: 18,
                  fontFamily: brand.fontFamily,
                }}
              >
                F
              </div>
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <Text
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: wordmarkColor,
                  letterSpacing: "-0.02em",
                  fontFamily: brand.fontFamily,
                }}
              >
                First Sons
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}
