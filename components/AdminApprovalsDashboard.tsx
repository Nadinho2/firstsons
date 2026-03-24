"use client";

import React, { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

type Recipient = {
  email: string;
  fullName?: string;
};

type SendResult = {
  email: string;
  ok: boolean;
  error?: string;
};

type ApiResponse = {
  ok: boolean;
  error?: string;
  sent?: number;
  failed?: number;
  total?: number;
  results?: SendResult[];
};

type MailMode = "approval" | "recording" | "teaser";

const recipientHelpText =
  "One per line. Use `email` or `email, Name` format.";

const csvHelpText =
  "Paste exported waitlist CSV here. We'll auto-pick Vibe Coding rows.";

function parseRecipients(raw: string): Recipient[] {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsed: Recipient[] = [];
  for (const line of lines) {
    const [emailPart, ...nameParts] = line.split(",");
    const email = emailPart?.trim().toLowerCase();
    if (!email) continue;

    const fullName = nameParts.join(",").trim();
    parsed.push(fullName ? { email, fullName } : { email });
  }
  return parsed;
}

function parseCsvLine(line: string, delimiter: "," | ";" | "\t"): string[] {
  const out: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === delimiter && !inQuotes) {
      out.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  out.push(current.trim());
  return out;
}

function detectDelimiter(line: string): "," | ";" | "\t" {
  const commaCount = (line.match(/,/g) ?? []).length;
  const semicolonCount = (line.match(/;/g) ?? []).length;
  const tabCount = (line.match(/\t/g) ?? []).length;

  if (tabCount > commaCount && tabCount > semicolonCount) return "\t";
  if (semicolonCount > commaCount) return ";";
  return ",";
}

function normalizeCourse(value: string): string {
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-");
}

function isVibeCodingCourse(value: string): boolean {
  const course = normalizeCourse(value);
  return (
    course.includes("vibe-coding") ||
    course.includes("vibecoding") ||
    course === "vibe"
  );
}

function extractVibeCodingRecipientsFromCsv(csvRaw: string): Recipient[] {
  const lines = csvRaw
    .split(/\r?\n/)
    .map((line) => line.replace(/^\uFEFF/, "").trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const delimiter = detectDelimiter(lines[0]);
  const headers = parseCsvLine(lines[0], delimiter).map((h) =>
    h.trim().toLowerCase()
  );
  const emailIdx = headers.findIndex((h) => h.includes("email"));
  const nameIdx = headers.findIndex(
    (h) => h.includes("name") || h.includes("full")
  );
  const courseIdx = headers.findIndex(
    (h) =>
      h.includes("course") ||
      h.includes("track") ||
      h.includes("course_slug") ||
      h.includes("course_title")
  );

  if (emailIdx < 0) return [];

  const dedup = new Map<string, Recipient>();
  const canFilterByCourse = courseIdx >= 0;

  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line, delimiter);
    const email = (cols[emailIdx] ?? "").trim().toLowerCase();
    if (!email) continue;

    if (canFilterByCourse) {
      const course = cols[courseIdx] ?? "";
      if (!isVibeCodingCourse(course)) {
        continue;
      }
    } else {
      // If there is no explicit course column, fallback to line-level check.
      if (!isVibeCodingCourse(line)) {
        continue;
      }
    }

    if (!email.includes("@")) {
      continue;
    }
    const fullName = nameIdx >= 0 ? (cols[nameIdx] ?? "").trim() : "";
    dedup.set(email, fullName ? { email, fullName } : { email });
  }

  return Array.from(dedup.values());
}

export function AdminApprovalsDashboard() {
  const [mode, setMode] = useState<MailMode>("approval");
  const [adminToken, setAdminToken] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [classDates, setClassDates] = useState("");
  const [classTime, setClassTime] = useState("");
  const [googleMeetUrl, setGoogleMeetUrl] = useState("");
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState("");
  const [classLabel, setClassLabel] = useState("");
  const [recordingUrl, setRecordingUrl] = useState("");
  const [nextClassLabel, setNextClassLabel] = useState("");
  const [nextClassDateTime, setNextClassDateTime] = useState("");
  const [teaserText, setTeaserText] = useState("");
  const [recipientsRaw, setRecipientsRaw] = useState("");
  const [csvRaw, setCsvRaw] = useState("");
  const [csvInfo, setCsvInfo] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const parsedRecipients = useMemo(
    () => parseRecipients(recipientsRaw),
    [recipientsRaw]
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse(null);
    setIsSending(true);

    try {
      const res = await fetch("/api/admin/waitlist-approvals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken.trim()}`,
        },
        body: JSON.stringify({
          mode,
          recipients: parsedRecipients,
          courseTitle,
          classDates,
          classTime,
          googleMeetUrl,
          whatsappGroupUrl,
          classLabel,
          recordingUrl,
          nextClassLabel,
          nextClassDateTime,
          teaserText,
        }),
      });

      const data = (await res.json()) as ApiResponse;
      if (!res.ok) {
        setResponse({
          ok: false,
          error: data.error || "Failed to send approval emails.",
        });
        return;
      }

      setResponse(data);
    } catch (error) {
      setResponse({
        ok: false,
        error: error instanceof Error ? error.message : "Unexpected error.",
      });
    } finally {
      setIsSending(false);
    }
  }

  function handleExtractVibeCodingFromCsv() {
    if (!csvRaw.trim()) {
      setCsvInfo("CSV box is empty. Upload or paste CSV first.");
      return;
    }

    const extracted = extractVibeCodingRecipientsFromCsv(csvRaw);
    if (extracted.length === 0) {
      setCsvInfo(
        "No Vibe Coding recipients found. Try CSV with email + course/track columns (or courseSlug like vibe-coding)."
      );
      setRecipientsRaw("");
      return;
    }

    setRecipientsRaw(
      extracted
        .map((r) => (r.fullName ? `${r.email}, ${r.fullName}` : r.email))
        .join("\n")
    );

    if (!courseTitle.trim()) {
      setCourseTitle("Vibe Coding");
    }
    setCsvInfo(
      `Loaded ${extracted.length} Vibe Coding recipients into Recipients section.`
    );
  }

  async function handleCsvFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setCsvRaw(text);
      setCsvInfo(`Loaded file: ${file.name}`);
    } catch {
      setCsvInfo("Could not read CSV file. Try again.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-blue-500/10 backdrop-blur-xl sm:p-8">
      <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
        Admin Approval Mailer
      </h1>
      <p className="mt-2 text-sm text-slate-300">
        Send approval emails in bulk via Resend API route.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="rounded-xl border border-amber-300/40 bg-amber-200/10 p-3 text-xs text-amber-100">
          Keep this page private. You need your <code>ADMIN_APPROVALS_TOKEN</code>{" "}
          to send.
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Email type
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as MailMode)}
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
          >
            <option value="approval">Approval mail (class access)</option>
            <option value="recording">Recording mail (past class video)</option>
            <option value="teaser">Teaser mail (next class hype)</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Admin token
          </label>
          <input
            type="password"
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder="Paste ADMIN_APPROVALS_TOKEN"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Course title
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
              placeholder="Phase 1 - Web3 Builders"
            />
          </div>

          <div>
            {mode === "recording" ? (
              <>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Class label
                </label>
                <input
                  type="text"
                  value={classLabel}
                  onChange={(e) => setClassLabel(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                  placeholder="Day 1 - Vibe Coding 101"
                />
              </>
            ) : mode === "teaser" ? (
              <>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Next class label
                </label>
                <input
                  type="text"
                  value={nextClassLabel}
                  onChange={(e) => setNextClassLabel(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                  placeholder="Day 2 - Vibe Websites"
                />
              </>
            ) : (
              <>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Class dates
                </label>
                <input
                  type="text"
                  value={classDates}
                  onChange={(e) => setClassDates(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                  placeholder="March 15 - May 10, 2026"
                />
              </>
            )}
          </div>
        </div>

        {mode === "approval" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Class time
              </label>
              <input
                type="text"
                value={classTime}
                onChange={(e) => setClassTime(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                placeholder="Saturdays, 10:00 AM - 12:00 PM (WAT)"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Google Meet link
              </label>
              <input
                type="url"
                value={googleMeetUrl}
                onChange={(e) => setGoogleMeetUrl(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                placeholder="https://meet.google.com/xxx-yyyy-zzz"
              />
            </div>
          </div>
        ) : null}

        {mode === "recording" ? (
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-300">
              Recording link (Google Meet recording)
            </label>
            <input
              type="url"
              value={recordingUrl}
              onChange={(e) => setRecordingUrl(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
              placeholder="https://drive.google.com/..."
            />
          </div>
        ) : null}

        {mode === "teaser" ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Next class date/time
                </label>
                <input
                  type="text"
                  value={nextClassDateTime}
                  onChange={(e) => setNextClassDateTime(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                  placeholder="Tuesday, 7:00 PM WAT"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Google Meet link
                </label>
                <input
                  type="url"
                  value={googleMeetUrl}
                  onChange={(e) => setGoogleMeetUrl(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                  placeholder="https://meet.google.com/xxx-yyyy-zzz"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-300">
                Teaser / hype text
              </label>
              <textarea
                value={teaserText}
                onChange={(e) => setTeaserText(e.target.value)}
                required
                rows={3}
                className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
                placeholder="Tomorrow we build interactive vibe checkers with events and DOM magic."
              />
            </div>
          </>
        ) : null}

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-300">
            WhatsApp group link
          </label>
          <input
            type="url"
            value={whatsappGroupUrl}
            onChange={(e) => setWhatsappGroupUrl(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder="https://chat.whatsapp.com/..."
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-300">
              Waitlist CSV (optional)
            </label>
            <span className="text-xs text-slate-400">{csvHelpText}</span>
          </div>
          <div className="mb-3 flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-500/60 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700/70">
              Upload CSV
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleCsvFileChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-slate-400">
              Choose a .csv file from your computer
            </span>
          </div>
          <textarea
            value={csvRaw}
            onChange={(e) => setCsvRaw(e.target.value)}
            rows={7}
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder={"fullName,email,courseTitle\nAda,ada@example.com,Vibe Coding"}
          />
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleExtractVibeCodingFromCsv}
              className="inline-flex items-center justify-center rounded-full border border-[#60A5FA]/50 bg-[#60A5FA]/10 px-4 py-2 text-xs font-semibold text-[#BFDBFE] transition hover:bg-[#60A5FA]/20"
            >
              Auto-generate Vibe Coding recipients
            </button>
            {csvInfo ? (
              <span className="text-xs text-slate-300">{csvInfo}</span>
            ) : null}
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-300">
              Recipients
            </label>
            <span className="text-xs text-slate-400">{recipientHelpText}</span>
          </div>
          <textarea
            value={recipientsRaw}
            onChange={(e) => setRecipientsRaw(e.target.value)}
            required
            rows={10}
            className="w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
            placeholder={"ada@example.com, Ada\nben@example.com, Ben\ncarol@example.com"}
          />
          <p className="mt-2 text-xs text-slate-400">
            Parsed recipients: {parsedRecipients.length}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.6)] transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending emails...
            </>
          ) : (
            "Send email campaign"
          )}
        </button>
      </form>

      {response ? (
        <div className="mt-6 space-y-3">
          {response.ok ? (
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
              Done. Sent {response.sent} / {response.total}. Failed:{" "}
              {response.failed}.
            </div>
          ) : (
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200">
              {response.error || "Send failed."}
            </div>
          )}

          {response.results && response.results.some((r) => !r.ok) ? (
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                Failed recipients
              </p>
              <ul className="space-y-1 text-sm text-slate-200">
                {response.results
                  .filter((r) => !r.ok)
                  .map((r) => (
                    <li key={r.email}>
                      {r.email} - {r.error || "Unknown error"}
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
