/**
 * First Sons email brand tokens — aligned with tailwind.config.ts + site UI.
 * (primary #1E40AF, accent #60A5FA, background #0F172A)
 */
export const brand = {
  background: "#0F172A",
  backgroundDeep: "#020617",
  primary: "#1E40AF",
  primaryMid: "#2563EB",
  accent: "#60A5FA",
  blueBright: "#3B82F6",
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  textBody: "#0f172a",
  textMuted: "#64748b",
  footerText: "#e0f2fe",
  taglineOnGradient: "#BFDBFE",
  gradient: {
    /** Headers / hero (matches site hero gradients) */
    header:
      "linear-gradient(135deg, #1E40AF 0%, #2563EB 45%, #3B82F6 100%)",
    heroBar:
      "linear-gradient(90deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)",
    cta: "linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)",
    /** Navbar-style “F” mark */
    logoMark:
      "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #3B82F6 100%)",
  },
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

/**
 * Optional full URL to a hosted logo image (PNG recommended for email clients).
 * When unset, templates use the CSS “F” mark matching the website navbar.
 */
export function getEmailLogoUrl(): string | undefined {
  const u = process.env.EMAIL_LOGO_URL?.trim();
  return u || undefined;
}
