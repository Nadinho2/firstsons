import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { isValidEmail, isValidResendFromFormat, getResendApiKey, getResendFromAddress } from "@/lib/resend-config";

type Recipient = {
  email: string;
  fullName?: string;
};

type NewsletterSendBody = {
  subject?: string;
  html?: string;
  recipients?: Recipient[];
};

const MAX_RECIPIENTS = 1000;

function sanitizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizeRecipient(raw: unknown): Recipient | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const email = sanitizeText(r.email).toLowerCase();
  if (!isValidEmail(email)) return null;
  const fullName = sanitizeText(r.fullName);
  return fullName ? { email, fullName } : { email };
}

function getAdminToken(request: NextRequest): string {
  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.slice(7).trim();
  }
  return "";
}

export async function POST(request: NextRequest) {
  const expectedToken = process.env.ADMIN_APPROVALS_TOKEN?.trim() ?? "";
  if (!expectedToken) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_APPROVALS_TOKEN is not configured." },
      { status: 500 }
    );
  }

  const token = getAdminToken(request);
  if (!token || token !== expectedToken) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const apiKey = getResendApiKey();
  const fromAddress = getResendFromAddress();
  if (!apiKey || !fromAddress) {
    const missing: string[] = [];
    if (!apiKey) missing.push("RESEND_API_KEY");
    if (!fromAddress) missing.push("WAITLIST_FROM_EMAIL (or RESEND_FROM / RESEND_FROM_EMAIL)");
    return NextResponse.json(
      { ok: false, error: `Email not configured. Missing: ${missing.join(", ")}.` },
      { status: 500 }
    );
  }

  if (!isValidResendFromFormat(fromAddress)) {
    return NextResponse.json(
      { ok: false, error: "Invalid from address format for Resend." },
      { status: 500 }
    );
  }

  let body: NewsletterSendBody;
  try {
    body = (await request.json()) as NewsletterSendBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const subject = sanitizeText(body.subject);
  const html = sanitizeText(body.html);
  const recipientsRaw = Array.isArray(body.recipients) ? body.recipients : [];
  const recipients = recipientsRaw
    .map(sanitizeRecipient)
    .filter((item): item is Recipient => Boolean(item));

  const uniqueByEmail = new Map<string, Recipient>();
  for (const recipient of recipients) {
    if (!uniqueByEmail.has(recipient.email)) {
      uniqueByEmail.set(recipient.email, recipient);
    }
  }
  const dedupedRecipients = Array.from(uniqueByEmail.values());

  if (!subject || !html) {
    return NextResponse.json(
      { ok: false, error: "Subject and HTML body are required." },
      { status: 400 }
    );
  }

  if (dedupedRecipients.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Provide at least one valid recipient email." },
      { status: 400 }
    );
  }

  if (dedupedRecipients.length > MAX_RECIPIENTS) {
    return NextResponse.json(
      { ok: false, error: `Maximum ${MAX_RECIPIENTS} recipients per send.` },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);
  const results: Array<{ email: string; ok: boolean; error?: string }> = [];
  let sent = 0;

  for (const recipient of dedupedRecipients) {
    try {
      const personalizedHtml = recipient.fullName
        ? html.replaceAll("{{name}}", recipient.fullName)
        : html.replaceAll("{{name}}", "there");

      const { error } = await resend.emails.send({
        from: fromAddress,
        to: [recipient.email],
        subject,
        html: personalizedHtml,
        tags: [{ name: "source", value: "newsletter_manual" }],
      });

      if (error) {
        const msg =
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message: unknown }).message === "string"
            ? (error as { message: string }).message
            : JSON.stringify(error);
        throw new Error(msg);
      }

      sent += 1;
      results.push({ email: recipient.email, ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown send error.";
      results.push({ email: recipient.email, ok: false, error: message });
    }
  }

  return NextResponse.json({
    ok: true,
    sent,
    failed: dedupedRecipients.length - sent,
    total: dedupedRecipients.length,
    results,
  });
}

