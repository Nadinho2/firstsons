import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  CalendarDays,
  CheckCircle2,
  Sparkles,
  Users,
  Lock,
  Globe2
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Roadmap | First Sons – Web3 Academy & DAO",
  description:
    "Explore the First Sons roadmap — from Discord-first fam to empowered Web3 builders and DAO. See what we’ve shipped, what’s live now, and what’s coming next."
};

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";
const X_URL = "https://x.com/Firstsons_Dao";

type MomentumItem = {
  title: string;
  description: string;
  status: "Done" | "Live" | "Current";
  icon: React.ReactNode;
};

const momentumItems: MomentumItem[] = [
  {
    title: "Community Launch & Collabs",
    description:
      "Discord fam live with multiple Web3 partnerships, raffles, and consistent jungle energy.",
    status: "Done",
    icon: <Users className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    title: "OG Rewards Setup",
    description:
      "Wallet submissions closed for day-one supporters — future incentives and collab rewards queued.",
    status: "Done",
    icon: <CheckCircle2 className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    title: "Academy Beta Prep",
    description:
      "Vibe Coding method and 5 foundation skills wired up for early members inside Discord.",
    status: "Current",
    icon: <Sparkles className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    title: "Funding Momentum",
    description:
      "Series A secured (details soon) to fuel faster builds, better tools, and more rewards for the fam.",
    status: "Live",
    icon: <Rocket className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  }
];

type PhaseStatus = "Completed" | "Live" | "Upcoming" | "Vision";

type Phase = {
  label: string;
  timeframe: string;
  title: string;
  status: PhaseStatus;
  icon: React.ReactNode;
  bullets: string[];
};

const phases: Phase[] = [
  {
    label: "Phase 0",
    timeframe: "Q4 2025",
    title: "Foundation & Launch",
    status: "Completed",
    icon: <Sparkles className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Discord community opened with core channels and roles.",
      "Initial collabs and raffles with Web3 partners.",
      "Branding, stylized F logo, and website v1 shipped."
    ]
  },
  {
    label: "Phase 1",
    timeframe: "Q1–Q2 2026",
    title: "Academy Beta & Empowerment",
    status: "Live",
    icon: <Rocket className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Vibe Coding core method rolled out to the community.",
      "5 foundation courses: Vibe Coding, AI Automation, Community Management, Wallet Security, On-Chain Analytics.",
      "Weekly mini-projects, live feedback, and build rooms in Discord.",
      "OG rewards, raffles, and whitelist opportunities for active First Sons."
    ]
  },
  {
    label: "Phase 2",
    timeframe: "Q3–Q4 2026",
    title: "Advanced Tracks & Tools",
    status: "Upcoming",
    icon: <Lock className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Advanced specializations: DeFi agents, DAO operations, and more.",
      "Custom AI tools and Discord bots built specifically for First Sons members.",
      "Portfolio builder and earning pathways through bounties, gigs, and project collabs.",
      "Expanded events calendar with spaces, hackathons, and co-working sessions."
    ]
  },
  {
    label: "Phase 3",
    timeframe: "2027+",
    title: "DAO Evolution & Scale",
    status: "Vision",
    icon: <Globe2 className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Governance activation so the fam can steer the jungle together.",
      "Token or reward system exploration where it makes real sense.",
      "Grant, incubation, and partnership tracks for standout builders.",
      "Global network of First Sons contributing across the Web3 stack."
    ]
  }
];

const statusStyles: Record<PhaseStatus, string> = {
  Completed: "bg-emerald-500/10 text-emerald-200 border-emerald-400/40",
  Live: "bg-sky-500/10 text-sky-200 border-sky-400/40",
  Upcoming: "bg-slate-500/10 text-slate-200 border-slate-400/40",
  Vision: "bg-purple-500/10 text-purple-200 border-purple-400/40"
};

export default function RoadmapPage() {
  return (
    <main className="bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="hero-orbs relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-6 md:pb-20 md:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl">
            <CalendarDays className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
            <span className="uppercase tracking-[0.18em]">First Sons Roadmap</span>
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              First Sons Roadmap
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base md:mx-0">
              Building from Discord fam to empowered Web3 builders. A transparent
              path from jungle vibes to real rewards, real skills, and real
              impact in the ecosystem. 🗽
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-glow inline-flex gap-2"
              aria-label="Join the First Sons Discord"
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>Join Discord</span>
            </Link>
            <Link
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline inline-flex gap-2"
              aria-label="Follow First Sons on X"
            >
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              <span>Follow @Firstsons_Dao</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Where We Are Now */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Where We Are Now
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Momentum from the jungle.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              First Sons is already moving — here&apos;s what&apos;s live,
              shipped, and powering the next chapters.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {momentumItems.map((item) => (
              <article
                key={item.title}
                className="glass-card flex h-full flex-col gap-3 p-5 md:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70">
                      {item.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-50">
                      {item.title}
                    </h3>
                  </div>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Roadmap – Phased timeline */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              The Roadmap
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              From first vibes to full DAO.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              Each phase stacks on the last — more skills, more tools, more
              ownership for the fam. Here&apos;s how we see it playing out.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {phases.map((phase) => (
              <article
                key={phase.label}
                className="glass-card relative flex flex-col gap-4 p-5 md:flex-row md:items-start md:p-6"
              >
                <div className="pointer-events-none absolute left-4 top-0 hidden h-px w-16 bg-gradient-to-r from-[#1E40AF] to-transparent md:block" />

                <div className="flex w-full flex-col gap-3 md:w-1/3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70">
                      {phase.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                        {phase.label}
                      </p>
                      <p className="text-xs text-slate-200">{phase.timeframe}</p>
                    </div>
                  </div>
                  <h3 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-sm font-semibold tracking-tight text-transparent sm:text-base">
                    {phase.title}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                      statusStyles[phase.status]
                    )}
                  >
                    {phase.status}
                  </span>
                </div>

                <ul className="mt-1 space-y-2 text-xs leading-relaxed text-slate-200 sm:text-sm md:w-2/3">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#60A5FA]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Journey */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_60%)]"
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
            Join the journey
          </p>
          <h2 className="mt-3 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
            Be part of what we&apos;re building.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            Limited beta spots. Jump in early, help shape the roadmap with your
            feedback, and grow alongside a fam that&apos;s serious about Web3
            empowerment.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-glow inline-flex gap-2"
              aria-label="Join the First Sons Discord fam"
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>Join Discord Fam</span>
            </Link>
            <Link
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline inline-flex gap-2"
              aria-label="Follow First Sons on X"
            >
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              <span>Follow on X @Firstsons_Dao</span>
            </Link>
            <Link href="/#waitlist" className="btn-outline inline-flex gap-2">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>Join Academy Waitlist</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Choices:
 * - Structured the roadmap into clear momentum highlights and phased glass cards with status tags for fast scanning.
 * - Reused the global gradient + glassmorphism system so the page visually matches the rest of First Sons.
 * - Emphasized Discord, academy, and DAO evolution with CTAs that drive users to join Discord, follow on X, and hit the waitlist.
 */

