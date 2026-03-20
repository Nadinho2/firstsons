/**
 * Shared Resend “from” + API key resolution (same rules as lib/email.ts).
 * Keep ASCII-only from addresses for Resend.
 */

export function normalizeFromAddress(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let s = raw.trim();
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, "");
  s = s.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  while (
    s.length >= 2 &&
    ((s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith("'") && s.endsWith("'")))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s || undefined;
}

export function getResendFromAddress(): string | undefined {
  return (
    normalizeFromAddress(process.env.WAITLIST_FROM_EMAIL) ||
    normalizeFromAddress(process.env.RESEND_FROM) ||
    normalizeFromAddress(process.env.RESEND_FROM_EMAIL) ||
    undefined
  );
}

export function getResendApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined;
}

export function isValidResendFromFormat(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (!t.includes("<")) {
    return /^[^\s<>]+@[^\s<>]+$/.test(t);
  }
  const open = t.indexOf("<");
  const close = t.lastIndexOf(">");
  if (close <= open) return false;
  const email = t.slice(open + 1, close).trim();
  return /^[^\s<>]+@[^\s<>]+$/.test(email);
}

/** Simple RFC-style check — good enough for forms */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
