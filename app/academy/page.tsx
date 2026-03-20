import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  BrainCircuit,
  Sparkles,
  Users,
  ListChecks,
  MessageCircle,
  ArrowRightCircle,
  Megaphone,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "First Sons Academy — Learn Web3 by Shipping",
  description:
    "First Sons Academy: learn Web3 by shipping small projects from day one—Vibe Coding, Discord help, no prior experience required."
};

type CourseCard = {
  slug: string;
  title: string;
  weeks: string;
  levelTag: string;
  comingSoon?: boolean;
  icon: React.ReactNode;
  bullets: string[];
};

const courseCards: CourseCard[] = [
  {
    slug: "vibe-coding",
    title: "Vibe Coding",
    weeks: "6–8 weeks",
    levelTag: "Core",
    icon: <Sparkles className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Turn plain-English ideas into real projects with AI help.",
      "Break big asks into steps and get full-stack Web3 UIs out of the tools.",
      "Edit and debug with AI next to you like a patient pair programmer.",
      "Ship multiple small builds instead of one big final exam."
    ]
  },
  {
    slug: "ai-automation-web3",
    title: "AI / Bot Automation",
    weeks: "5–7 weeks",
    levelTag: "Advanced",
    icon: <BrainCircuit className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Build bots that watch wallets, prices, and on-chain events.",
      "Automate Discord and Twitter flows with scripts and bots.",
      "Connect scripts to RPCs, APIs, and simple smart contracts.",
      "Ship your own automation stack for a project or community."
    ]
  },
  {
    slug: "community-management-web3",
    title: "Community Management",
    weeks: "4–6 weeks",
    levelTag: "Operations",
    icon: <Users className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Design Discord spaces that feel alive, not empty.",
      "Use bots and AI to run events, quests, and reward loops.",
      "Create onboarding flows that turn lurkers into contributors.",
      "Ship a community playbook for a real or mock project."
    ]
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    weeks: "TBA",
    levelTag: "Growth",
    comingSoon: true,
    icon: <Megaphone className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Threads, short-form video, and newsletters for Web3 brands.",
      "AI-assisted workflows so you ship content weekly, not monthly.",
      "Templates and prompts tuned for builders and communities.",
      "Portfolio-ready pieces you can show to clients or teams."
    ]
  },
  {
    slug: "futures-trading",
    title: "Futures Trading",
    weeks: "TBA",
    levelTag: "Markets",
    comingSoon: true,
    icon: <TrendingUp className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Risk, sizing, and execution for crypto futures.",
      "Discipline-first drills so you don’t blow up the account.",
      "Opens after core curriculum is locked—join the waitlist early.",
      "For members who already ship with the academy."
    ]
  }
];

type JourneyStep = {
  title: string;
  description: string;
};

const journeySteps: JourneyStep[] = [
  {
    title: "Join Discord & Waitlist",
    description:
      "Hop into the server, say hi, and add your name to the beta list. No pressure—say hi when you&apos;re ready."
  },
  {
    title: "Beta Access & Onboarding",
    description:
      "Get your First Son role, walkthrough of the academy channels, and your first mini-project."
  },
  {
    title: "Ship Mini-Projects with Vibe Coding",
    description:
      "Describe what you want to build, let AI draft the code, then vibe-edit it together with the community."
  },
  {
    title: "Build Portfolio & Get Feedback",
    description:
      "Collect GitHub links and proof for everything you ship, with live feedback from other First Sons."
  },
  {
    title: "Graduate Phase 1",
    description:
      "Leave with real skills, shipped projects, and the confidence to contribute to real Web3 teams."
  }
];

const promptExample = {
  prompt: "Build a simple wallet checker dApp that shows ETH balance for any address on mainnet.",
  result:
    "You get a Next.js page with a wallet input, a call to a public RPC, and the ETH balance on screen—with basic error handling when the address is bad."
};

export default function AcademyPage() {
  return (
    <main className="bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="hero-orbs relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-6 md:pb-20 md:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 md:gap-12">
          <div className="space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl">
              <Rocket className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
              <span className="uppercase tracking-[0.18em]">
                The First Sons Academy
              </span>
            </div>

            <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              The First Sons Academy
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              Ship real Web3 projects from day one. You learn by doing—with
              Vibe Coding and a Discord where people answer beginner questions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link href="/#waitlist" className="btn-glow">
                Join Waitlist
              </Link>
              <Link href="/join-discord" className="btn-outline inline-flex gap-2">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Enter Discord</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vibe Coding — How it works */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Vibe Coding — how it works
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Describe in plain English. Ship real projects.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              No lectures, no “watch this 2 hour video” homework. You talk to AI
              like you would talk to a builder friend, then ship mini-projects
              with the community watching your back.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                step: "01",
                title: "Describe your idea",
                description:
                  "Drop your idea in Discord in plain English — no jargon, no syntax, just what you want to exist."
              },
              {
                step: "02",
                title: "AI drafts the code",
                description:
                  "Start from a few starter prompts, tweak them, and get a working first version in minutes instead of weeks."
              },
              {
                step: "03",
                title: "Vibe-edit together",
                description:
                  "Tweak, refactor, and extend with AI and other First Sons until it feels like your build."
              },
              {
                step: "04",
                title: "Ship & get feedback",
                description:
                  "Deploy, share links, and collect GitHub proof and feedback for every project you ship."
              }
            ].map((item) => (
              <article
                key={item.step}
                className="glass-card flex flex-col gap-2 p-4 text-left md:p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
                  {item.step}
                </span>
                <h3 className="text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          {/* Prompt example */}
          <div className="glass-card mt-4 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
              Example Vibe Coding prompt
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-slate-300">
                  Prompt:
                </p>
                <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs leading-relaxed text-slate-100">
                  {promptExample.prompt}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium text-slate-300">
                  What you get back first:
                </p>
                <p className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs leading-relaxed text-slate-200">
                  {promptExample.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1: Foundation */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Phase 1 · Foundation · Beta Live
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Phase 1: Build your on-chain foundation.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              Five tracks: Vibe Coding, AI / Bot Automation, and Community
              Management are live in beta; Content Creation and Futures Trading
              are queued—join the waitlist for the one you want first.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courseCards.map((course) => (
              <article
                key={course.slug}
                className={cn(
                  "glass-card flex h-full flex-col p-5 md:p-6",
                  course.comingSoon && "border-amber-500/20"
                )}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70">
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-50">
                        {course.title}
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        {course.weeks}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                      course.comingSoon
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-100"
                        : "border-white/15 bg-slate-900/60 text-slate-200"
                    )}
                  >
                    {course.comingSoon ? "Soon" : course.levelTag}
                  </span>
                </div>

                <ul className="mb-4 space-y-1.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {course.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-1.5">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#60A5FA]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-2 pt-1 text-[11px] text-slate-300">
                  <span>Built with Vibe Coding from day one.</span>
                  <Link
                    href={`/academy/${course.slug}#course-waitlist`}
                    className={cn(
                      "inline-flex w-full items-center justify-center rounded-full border py-2 text-xs font-semibold transition",
                      course.comingSoon
                        ? "border-amber-500/30 text-amber-100/90 hover:bg-amber-500/10"
                        : "border-[#60A5FA]/40 text-[#60A5FA] hover:bg-white/5"
                    )}
                  >
                    {course.comingSoon ? "Waitlist · coming soon" : "Waitlist · this track"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(37,99,235,0.3),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              How it goes
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              From zero to shipping First Son.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              We lay out one step after another so you’re not guessing alone—each
              stage keeps you shipping and posting progress where others can
              help.
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-5">
            {journeySteps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4",
                  "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
                  "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
                )}
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-xs font-semibold text-[#60A5FA]">
                  {index + 1}
                </span>
                <h3 className="text-xs font-semibold text-slate-50 sm:text-sm">
                  {step.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-slate-200 sm:text-xs">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_60%)]"
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
            Phase 1 · Limited Beta
          </p>
          <h2 className="mt-3 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
            Ready to become a First Son?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            Early members get more direct access while we’re still small. Beta
            spots stay limited so we can answer questions—not just drop
            recordings.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/#waitlist" className="btn-glow inline-flex gap-2">
              <span>Join the Phase 1 Waitlist</span>
              <ArrowRightCircle className="h-4 w-4" aria-hidden="true" />
            </Link>

            <p className="max-w-xs text-[11px] text-slate-300 sm:text-xs">
              Already on the list?{" "}
              <Link
                href="/join-discord"
                className="font-medium text-[#60A5FA] underline-offset-4 hover:underline"
              >
                Jump into Discord
              </Link>{" "}
              and start vibing with other beginners.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

