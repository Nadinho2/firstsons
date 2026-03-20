import React from "react";
import { WAITLIST_COURSES } from "@/lib/waitlist-courses";

const inputClass =
  "w-full rounded-xl border border-slate-700/70 bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-[#60A5FA]/80 focus:ring-2 focus:ring-[#60A5FA]/40";

const labelClass = "text-[11px] font-medium text-slate-200 sm:text-xs";

type Props = {
  /** footer = course dropdown on homepage; course = hidden slug on track page */
  variant: "footer" | "course";
  courseSlug?: string;
  courseTitle?: string;
  idPrefix?: string;
};

export function WaitlistFormFields({
  variant,
  courseSlug,
  courseTitle,
  idPrefix = "",
}: Props) {
  const p = idPrefix;

  return (
    <>
      {variant === "course" && courseSlug ? (
        <>
          <input type="hidden" name="courseSlug" value={courseSlug} />
          {courseTitle ? (
            <p className="text-left text-xs text-slate-300">
              Track:{" "}
              <span className="font-semibold text-[#60A5FA]">{courseTitle}</span>
            </p>
          ) : null}
        </>
      ) : null}

      {variant === "footer" ? (
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor={`${p}courseSlug`} className={labelClass}>
            Course <span className="text-rose-400/80">*</span>
          </label>
          <select
            id={`${p}courseSlug`}
            name="courseSlug"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select a course
            </option>
            {WAITLIST_COURSES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
                {c.comingSoon ? " (coming soon)" : ""}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor={`${p}fullName`} className={labelClass}>
            Name <span className="text-slate-400">(optional)</span>
          </label>
          <input
            id={`${p}fullName`}
            name="fullName"
            type="text"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor={`${p}email`} className={labelClass}>
            Email <span className="text-rose-400/80">*</span>
          </label>
          <input
            id={`${p}email`}
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 text-left">
        <label htmlFor={`${p}discord`} className={labelClass}>
          Discord Username <span className="text-rose-400/80">*</span>
        </label>
        <input
          id={`${p}discord`}
          name="discord"
          type="text"
          required
          placeholder="@yourhandle"
          className={inputClass}
        />
      </div>
      <p className="text-[11px] text-slate-500">
        We&apos;ll only use your details to contact you about the First Sons
        cohort and your selected track. No spam, ever.
      </p>
    </>
  );
}
