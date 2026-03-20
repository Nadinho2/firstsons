import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { submitWaitlist } from "@/app/actions/waitlist";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistFormFields } from "@/components/WaitlistFormFields";
import { WAITLIST_COURSES } from "@/lib/waitlist-courses";
import { cn } from "@/lib/utils";

/** Ensure waitlist server action runs on the server (not a stale static shell). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "First Sons — Web3 Academy for Complete Beginners",
  description:
    "First Sons is a Web3 academy for people starting from zero. You learn by building: Vibe Coding with tools like Cursor, automation, community ops, and on-chain basics—mostly on real projects, not long theory videos."
};

const courses = WAITLIST_COURSES;

const featureHighlights = [
  {
    title: "Vibe Coding first",
    description:
      "Say what you want in plain English. The tools draft most of the code; you edit, fix, and ship—so you learn by building.",
  },
  {
    title: "Discord-first",
    description:
      "Voice and text channels, build-alongs, and people around when you’re stuck—so you’re not alone in the terminal.",
  },
  {
    title: "Real projects, not demos",
    description:
      "You keep repos and links you can show off—actual builds, feedback from the group, proof you put in the work.",
  },
  {
    title: "Small first cohort",
    description:
      "Phase 1 is capped on purpose so we can answer questions and help you ship, not just drop a video library on you.",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="hero-orbs relative overflow-hidden bg-[#020617] pb-16 pt-24 text-white sm:pt-28 sm:pb-20 md:pb-24 md:pt-32 lg:pt-36">
      {/* Extra orbs for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#1E40AF] blur-3xl opacity-30" />
        <div className="absolute right-[-80px] top-32 h-80 w-80 rounded-full bg-[#3B82F6] blur-3xl opacity-30" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 md:px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        {/* Copy */}
        <div className="relative max-w-xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-100/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.9)]" />
            <span>Web3 Academy for Complete Beginners</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl md:leading-tight lg:text-7xl">
            Your First Step Into{" "}
            <span className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent">
              Web3
            </span>{" "}
            Starts Here.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base">
            A straight-line Web3 academy built around Vibe Coding. Pick up
            automation and community skills by shipping real projects with help
            from AI—plain language, no gatekeeping.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/#waitlist" className="btn-glow">
              Join Waitlist
            </Link>
            <Link href="/academy" className="btn-outline">
              See Curriculum
            </Link>
          </div>
          <p className="text-xs text-slate-400 sm:text-[13px]">
            No prior coding or crypto experience required. Just curiosity and a
            Discord account.
          </p>
        </div>

        {/* Visual / floating logo */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-[#1E40AF]/60 via-[#3B82F6]/40 to-[#60A5FA]/30 opacity-70 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-700/50 bg-slate-900/40 p-6 shadow-[0_0_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-lg font-bold shadow-[0_0_26px_rgba(37,99,235,0.9)]">
                  F
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                    First Sons
                  </p>
                  <p className="text-sm font-semibold text-slate-50">
                    Web3 Academy
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-100">
                Cohort 01 • Phase 1
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-200">
                “We take complete beginners and get them shipping real on-chain
                projects in weeks, not years. The tools handle most of the
                typing—you learn how to steer.”
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-600/50 bg-slate-900/40 p-3">
                  <p className="text-[11px] text-slate-400">Focus</p>
                  <p className="mt-1 font-semibold text-slate-50">
                    AI x Web3 Skills
                  </p>
                </div>
                <div className="rounded-xl border border-slate-600/50 bg-slate-900/40 p-3">
                  <p className="text-[11px] text-slate-400">Format</p>
                  <p className="mt-1 font-semibold text-slate-50">
                    Project-First Cohort
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-700/60 pt-4">
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                    Proof of Work
                  </p>
                  <p className="text-xs text-slate-300">
                    Ship real projects and build your portfolio with the fam.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] opacity-70 blur-sm" />
                  <span className="h-10 w-10 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] opacity-70 blur-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoursesSection: React.FC = () => {
  return (
    <section className="relative border-y border-slate-800/80 bg-[#020617] py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/90">
              What we teach
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Skills you can use right away.
            </h2>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
            Phase 1 is built around skills people get paid for: you describe
            what you want in plain English, the AI drafts most of the code, you
            edit and ship real projects—not slide decks.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.slug}
              className={cn(
                "glass-card-strong group relative flex h-full flex-col overflow-hidden p-5 md:p-6",
                course.comingSoon && "border-amber-500/25"
              )}
            >
              <div className="pointer-events-none absolute inset-px rounded-[1.05rem] bg-gradient-to-br from-white/4 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex-1 space-y-3">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium",
                    course.comingSoon
                      ? "bg-amber-500/15 text-amber-100/90"
                      : "bg-blue-500/10 text-blue-100/90"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.9)]",
                      course.comingSoon ? "bg-amber-400" : "bg-blue-400"
                    )}
                  />
                  <span>{course.title}</span>
                </div>
                <p className="text-sm font-semibold text-slate-50">
                  {course.title}
                </p>
                <p className="text-xs leading-relaxed text-slate-300">
                  {course.description}
                </p>
              </div>

              <div className="relative mt-4 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="rounded-full border border-slate-600/70 bg-slate-900/50 px-2.5 py-1 text-[10px] font-medium text-slate-200/90"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {course.comingSoon ? (
                    <span
                      aria-disabled="true"
                      className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-600/50 bg-slate-900/40 py-2.5 text-xs font-medium text-slate-500 opacity-80"
                    >
                      Enroll in Beta
                    </span>
                  ) : (
                    <Link
                      href={`/academy/${course.slug}#course-waitlist`}
                      className="btn-glow w-full justify-center py-2.5 text-xs"
                    >
                      Enroll in Beta
                    </Link>
                  )}
                  {course.comingSoon ? (
                    <span className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full border border-slate-600/60 bg-slate-900/50 py-2.5 text-xs font-medium text-slate-500">
                      Coming soon
                    </span>
                  ) : (
                    <Link
                      href={`/academy/${course.slug}`}
                      className="btn-outline w-full justify-center py-2.5 text-xs"
                    >
                      View Curriculum →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhySection: React.FC = () => {
  return (
    <section className="relative bg-[#020617] py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0.4),_transparent_60%),radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-10 space-y-3 text-left md:mb-12 md:max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/90">
            Why This Works
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Why First Sons Works Differently.
          </h2>
          <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
            Vibe Coding, the Discord group, and on-chain proof of what you
            shipped—so beginners spend less time stuck in tutorials and more
            time building.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {featureHighlights.map((feature) => (
            <article
              key={feature.title}
              className="glass-card-strong group relative overflow-hidden p-5 md:p-6"
            >
              <div className="pointer-events-none absolute inset-px rounded-[1.05rem] bg-gradient-to-br from-blue-500/10 via-transparent to-sky-400/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative space-y-2.5">
                <h3 className="text-sm font-semibold text-slate-50">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const WaitlistSection: React.FC = () => {
  return (
    <section
      id="waitlist"
      className="relative bg-[#020617] py-16 text-white md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_55%)]" />
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300/90">
          Phase 1 Cohort
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          Ready to join the fam?
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
          Choose your course, then add your email and Discord. We&apos;ll route
          updates for that track.
        </p>

        <div className="mt-8">
          <WaitlistForm action={submitWaitlist}>
            <WaitlistFormFields variant="footer" idPrefix="home-" />
          </WaitlistForm>
        </div>
      </div>
    </section>
  );
};

const Page: React.FC = () => {
  return (
    <main>
      <Hero />
      <CoursesSection />
      <WhySection />
      <WaitlistSection />
    </main>
  );
};

export default Page;

