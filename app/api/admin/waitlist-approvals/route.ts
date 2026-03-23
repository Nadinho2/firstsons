import { NextRequest, NextResponse } from "next/server";
import { sendWaitlistApprovalEmail } from "@/lib/email";
import { isValidEmail } from "@/lib/resend-config";

type Recipient = {
  email: string;
  fullName?: string;
};

type ApprovalRequestBody = {
  recipients: Recipient[];
  courseTitle: string;
  classDates: string;
  classTime: string;
  googleMeetUrl: string;
  whatsappGroupUrl: string;
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

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
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

  let body: ApprovalRequestBody;
  try {
    body = (await request.json()) as ApprovalRequestBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const recipientsRaw = Array.isArray(body?.recipients) ? body.recipients : [];
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

  const courseTitle = sanitizeText(body.courseTitle);
  const classDates = sanitizeText(body.classDates);
  const classTime = sanitizeText(body.classTime);
  const googleMeetUrl = sanitizeText(body.googleMeetUrl);
  const whatsappGroupUrl = sanitizeText(body.whatsappGroupUrl);

  if (!courseTitle || !classDates || !classTime || !googleMeetUrl || !whatsappGroupUrl) {
    return NextResponse.json(
      { ok: false, error: "All class fields are required." },
      { status: 400 }
    );
  }

  if (!isValidHttpUrl(googleMeetUrl) || !isValidHttpUrl(whatsappGroupUrl)) {
    return NextResponse.json(
      { ok: false, error: "Google Meet and WhatsApp links must be valid URLs." },
      { status: 400 }
    );
  }

  const results: Array<{ email: string; ok: boolean; error?: string }> = [];
  let sent = 0;

  for (const recipient of dedupedRecipients) {
    try {
      await sendWaitlistApprovalEmail({
        email: recipient.email,
        fullName: recipient.fullName,
        courseTitle,
        classDates,
        classTime,
        googleMeetUrl,
        whatsappGroupUrl,
      });
      sent += 1;
      results.push({ email: recipient.email, ok: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown send error.";
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
