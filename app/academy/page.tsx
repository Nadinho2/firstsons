import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  BrainCircuit,
  Sparkles,
  Users,
  ShieldCheck,
  BarChart3,
  ListChecks,
  MessageCircle,
  ArrowRightCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "First Sons Academy — Learn Web3 by Shipping",
  description:
    "Explore the First Sons Academy. Learn Web3 by shipping real projects from day one using Vibe Coding, AI, and Discord — no prior experience required."
};

type CourseCard = {
  title: string;
  weeks: string;
  levelTag: string;
  icon: React.ReactNode;
  bullets: string[];
};

const courseCards: CourseCard[] = [
  {
    title: "Vibe Coding",
    weeks: "6–8 weeks",
    levelTag: "Core",
    icon: <Sparkles className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Turn plain-English ideas into real projects with AI.",
      "Master prompting flows for full-stack Web3 dApps.",
      "Learn to vibe-edit and debug with AI as your pair.",
      "Ship multiple small builds instead of one big final exam."
    ]
  },
  {
    title: "AI Automation in Web3",
    weeks: "5–7 weeks",
    levelTag: "Core",
    icon: <BrainCircuit className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Build bots that watch wallets, prices, and on-chain events.",
      "Automate Discord and Twitter flows with AI agents.",
      "Connect scripts to RPCs, APIs, and simple smart contracts.",
      "Ship your own automation stack for a project or community."
    ]
  },
  {
    title: "Community Management for Web3",
    weeks: "4–6 weeks",
    levelTag: "Essential",
    icon: <Users className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Design Discord spaces that feel alive, not empty.",
      "Use bots and AI to run events, quests, and reward loops.",
      "Create onboarding flows that turn lurkers into contributors.",
      "Ship a community playbook for a real or mock project."
    ]
  },
  {
    title: "Wallet & Security Mastery",
    weeks: "3–5 weeks",
    levelTag: "Essential",
    icon: <ShieldCheck className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Set up hot, warm, and cold wallets the safe way.",
      "Learn how common scams work so you can avoid them.",
      "Use AI to build tiny tools that sanity-check transactions.",
      "Create your personal security checklist and wallet setup."
    ]
  },
  {
    title: "On-Chain Basics & Analytics",
    weeks: "4–6 weeks",
    levelTag: "Core",
    icon: <BarChart3 className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />,
    bullets: [
      "Understand blocks, transactions, gas, and basic EVM flows.",
      "Query chain data with APIs, Dune, and explorers.",
      "Build dashboards for prices, wallets, and protocol stats.",
      "Ship a simple on-chain analytics board you can show off."
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
      "Hop into the server, say hi, and add your name to the beta list. No pressure, just vibes."
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
    "AI generates a Next.js page with an input for a wallet address, calls a public RPC or provider, and renders the current ETH balance with basic error handling."
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
              Ship real Web3 projects from day one. Learn by doing — powered by
              Vibe Coding and a Discord community that refuses to let beginners
              stay stuck.
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
              Vibe Coding — How It Actually Works
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
                  "Use curated prompts to have AI generate a working first version in minutes, not weeks."
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
                  What AI ships first:
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
              Five tracks that cover the skills you actually need to ship in
              Web3 — from your first wallet all the way to running bots and
              reading the meta on-chain.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {courseCards.map((course) => (
              <article
                key={course.title}
                className="glass-card flex h-full flex-col p-5 md:p-6"
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
                  <span className="rounded-full border border-white/15 bg-slate-900/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                    {course.levelTag}
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

                <div className="mt-auto flex items-center justify-between pt-1 text-[11px] text-slate-300">
                  <span>Built with Vibe Coding from day one.</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(37,99,235,0.3),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Your Learning Journey
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              From zero to shipping First Son.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              We guide you step by step so you never have to “figure it all out
              alone” — every stage is designed to keep you shipping and
              learning in public.
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
            The earlier you join, the closer you are to the core. Beta spots are
            intentionally capped so we can give real support, not just videos.
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

/**
 * Key additions:
 * - AcademyPage hero with gradient heading, supporting copy, and dual CTAs to the waitlist and Discord.
 * - "Vibe Coding — How It Actually Works" section outlining the 4-step method plus a concrete prompt/example.
 * - "Phase 1: Foundation" course grid with detailed lucide-icon cards for each track beginners can take.
 * - "Your Learning Journey" step flow and a final CTA section encouraging users to join the beta or enter Discord.
 */

