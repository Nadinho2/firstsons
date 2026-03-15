import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { sendWaitlistConfirmationEmail } from "@/lib/email";

export const metadata: Metadata = {
  title: "First Sons — Web3 Academy for Complete Beginners",
  description:
    "First Sons is a Web3 academy for complete beginners. Learn AI-powered Vibe Coding, automation, community management, and on-chain skills by shipping real projects with AI."
};

type CourseTag = {
  label: string;
};

type Course = {
  title: string;
  description: string;
  tags: CourseTag[];
  slug: string;
};

const courses: Course[] = [
  {
    title: "Vibe Coding",
    description:
      "Leverage AI tools like Claude, Cursor & Grok to build full-stack Web3 apps in hours. Master prompt engineering and ship real dApps from day one.",
    tags: [
      { label: "Trending" },
      { label: "6-8 Weeks" },
      { label: "Core Skill" },
      { label: "+∞" },
    ],
    slug: "vibe-coding",
  },
  {
    title: "AI Automation in Web3",
    description:
      "Build AI agents that auto-trade, auto-moderate Discord, generate content, and run on-chain tasks.",
    tags: [
      { label: "Trending" },
      { label: "5-7 Weeks" },
      { label: "Advanced" },
      { label: "+∞" },
    ],
    slug: "ai-automation-web3",
  },
  {
    title: "Community Management for Web3",
    description:
      "Vibe-build Discord bots, run events, create engagement systems, and grow communities from 0 to 10k.",
    tags: [
      { label: "High Demand" },
      { label: "4-6 Weeks" },
      { label: "Operations" },
      { label: "+∞" },
    ],
    slug: "community-management-web3",
  },
  {
    title: "Wallet & Security Mastery",
    description:
      "Set up wallets, secure your assets, and vibe-code simple security tools.",
    tags: [
      { label: "Essential" },
      { label: "3-5 Weeks" },
      { label: "Beginner" },
      { label: "+∞" },
    ],
    slug: "wallet-security-mastery",
  },
  {
    title: "On-Chain Basics & Analytics",
    description:
      "Build live price dashboards, gas calculators, and simple data tools using AI.",
    tags: [
      { label: "Core" },
      { label: "4-6 Weeks" },
      { label: "Beginner-Intermediate" },
      { label: "+∞" },
    ],
    slug: "on-chain-basics-analytics",
  },
];

const featureHighlights = [
  {
    title: "Vibe Coding at the Core",
    description:
      "You describe what you want in plain English. AI builds 90%. You vibe-edit, ship, and learn by doing.",
  },
  {
    title: "Discord-First Community",
    description:
      "Daily vibe rooms, build-alongs, and live support so you never get stuck alone in the terminal.",
  },
  {
    title: "On-Chain Proof",
    description:
      "Earn on-chain badges for every milestone you ship. Your work lives on-chain, not in a PDF.",
  },
  {
    title: "Skin-in-the-Game Beta",
    description:
      "Limited Phase 1 cohort so we can go deep, iterate with you, and actually help you ship.",
  },
];

type GradientButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

function GradientButton({
  children,
  className = "",
  type = "button"
}: GradientButtonProps) {
  return (
    <button
      type={type}
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.65)] transition duration-300 hover:shadow-[0_0_45px_rgba(96,165,250,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

function OutlineButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full border border-blue-400/40 bg-white/0 px-6 py-3 text-sm font-semibold text-blue-200/90 backdrop-blur-md transition duration-300 hover:border-blue-300/80 hover:bg-blue-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] ${className}`}
    >
      {children}
    </button>
  );
}

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-[#020617] pb-16 pt-28 text-white sm:pt-32 md:pb-24 lg:pt-36">
      {/* Background glow + shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#1E40AF] blur-3xl opacity-40" />
        <div className="absolute right-[-80px] top-32 h-80 w-80 rounded-full bg-[#3B82F6] blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(37,99,235,0.35),_transparent_55%)]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 md:px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8">
        {/* Copy */}
        <div className="relative max-w-xl space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-100/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(59,130,246,0.9)]" />
            <span>Web3 Academy for Complete Beginners</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl md:leading-tight">
            Your First Step Into{" "}
            <span className="bg-gradient-to-r from-[#60A5FA] via-[#BFDBFE] to-white bg-clip-text text-transparent">
              Web3
            </span>{" "}
            Starts Here.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300/90 sm:text-base">
            The simplest Web3 academy with Vibe Coding at the core. Learn real
            skills like AI Automation and Community Management by shipping
            actual projects with AI — no jargon, no overwhelm.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/#waitlist"
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.65)] transition duration-300 hover:shadow-[0_0_45px_rgba(96,165,250,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
              <span className="relative z-10">Join Waitlist</span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
            <Link
              href="/academy"
              className="inline-flex items-center justify-center rounded-full border border-blue-400/40 bg-white/0 px-6 py-3 text-sm font-semibold text-blue-200/90 backdrop-blur-md transition duration-300 hover:border-blue-300/80 hover:bg-blue-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            >
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
                projects in weeks, not years. AI does the heavy lifting — you
                learn how to steer.”
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
                    On-chain badges for every shipped project.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#1E40AF] to-[#60A5FA] opacity-70 blur-sm" />
                  <span className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A855F7] opacity-70 blur-md" />
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
              Master the Meta
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Master the Meta.
            </h2>
          </div>
          <p className="max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
            Phase 1 curriculum focuses on high-demand skills taught completely
            differently: you describe what you want in plain English, AI builds
            90% of it, you vibe-edit and ship real projects.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5 shadow-[0_0_0_rgba(15,23,42,0.6)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_0_45px_rgba(37,99,235,0.7)]"
            >
              <div className="pointer-events-none absolute inset-px rounded-[1.05rem] bg-gradient-to-br from-white/4 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex-1 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-medium text-blue-100/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
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
                  <GradientButton className="w-full justify-center text-xs">
                    Enroll in Beta
                  </GradientButton>
                  <Link
                    href={`/academy/${course.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-full border border-[#60A5FA]/50 px-3 py-2 text-[11px] font-medium text-slate-100 transition-all duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                  >
                    View Curriculum <span className="ml-1">→</span>
                  </Link>
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
            We combine Vibe Coding, community, and on-chain proof so beginners
            can skip the overwhelm and get straight to building things that
            actually matter.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featureHighlights.map((feature) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5 shadow-[0_0_0_rgba(15,23,42,0.7)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/70 hover:shadow-[0_0_40px_rgba(37,99,235,0.75)]"
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
  async function submitWaitlist(formData: FormData): Promise<void> {
    "use server";

    const emailValue = formData.get("email");
    const fullNameValue = formData.get("fullName");
    const discordValue = formData.get("discord");

    const email = typeof emailValue === "string" ? emailValue.trim() : "";
    const fullName =
      typeof fullNameValue === "string" ? fullNameValue.trim() : "";
    const discord =
      typeof discordValue === "string" ? discordValue.trim() : "";

    if (!email) {
      redirect("/#waitlist");
    }

    await sendWaitlistConfirmationEmail({
      email,
      fullName: fullName || undefined,
      discord: discord || undefined
    });

    redirect("/waitlist/success");
  }

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
          Ready to verify your value on-chain?
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
          Join the waitlist for the first cohort. Limited spots. You&apos;ll be
          the first to hear when Phase 1 goes live.
        </p>

        <form className="mt-8 space-y-4" action={submitWaitlist}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm">
              <label
                htmlFor="fullName"
                className="text-[11px] font-medium text-slate-200 sm:text-xs"
              >
                Full Name <span className="text-slate-400">(optional)</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Satoshi Nakamoto"
                className="w-full rounded-xl border border-slate-700/70 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-blue-400/80 focus:bg-slate-900/80 focus:ring-2 focus:ring-blue-500/60"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm">
              <label
                htmlFor="email"
                className="text-[11px] font-medium text-slate-200 sm:text-xs"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@firstsons.xyz"
                className="w-full rounded-xl border border-slate-700/70 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-blue-400/80 focus:bg-slate-900/80 focus:ring-2 focus:ring-blue-500/60"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-left text-xs sm:text-sm">
            <label
              htmlFor="discord"
              className="text-[11px] font-medium text-slate-200 sm:text-xs"
            >
              Discord Username
            </label>
            <input
              id="discord"
                name="discord"
              type="text"
              required
              placeholder="@firstson"
              className="w-full rounded-xl border border-slate-700/70 bg-slate-900/60 px-3.5 py-2.5 text-xs text-slate-50 outline-none placeholder:text-slate-500 focus:border-blue-400/80 focus:bg-slate-900/80 focus:ring-2 focus:ring-blue-500/60"
            />
          </div>
          <div className="pt-2">
            <GradientButton className="w-full justify-center text-sm" type="submit">
              Join Waitlist
            </GradientButton>
          </div>
          <p className="text-[11px] text-slate-500">
            We&apos;ll only use your details to contact you about the First Sons
            cohort. No spam, ever.
          </p>
        </form>
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

