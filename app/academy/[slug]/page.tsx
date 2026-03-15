import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Bot,
  Users,
  ShieldCheck,
  LineChart,
  Rocket,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";

type CourseSlug =
  | "vibe-coding"
  | "ai-automation-web3"
  | "community-management-web3"
  | "wallet-security-mastery"
  | "on-chain-basics-analytics";

type Module = {
  week: string;
  topics: string[];
};

type CourseDetail = {
  slug: CourseSlug;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  ships: string[];
  modules: Module[];
};

const courses: Record<CourseSlug, CourseDetail> = {
  "vibe-coding": {
    slug: "vibe-coding",
    title: "Vibe Coding",
    description:
      "Learn how to describe what you want in plain English, let AI draft the code, then vibe-edit and ship real Web3 projects without drowning in tutorials.",
    duration: "6–8 weeks · Core method",
    icon: <Code2 className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "Wallet connector mini-app that talks to a live network.",
      "AI-assisted landing page for a Web3 idea you care about.",
      "Simple on-chain interaction flow (read/write) powered by prompts."
    ],
    modules: [
      {
        week: "Week 1",
        topics: [
          "Intro to Vibe Coding and how AI actually fits into your workflow.",
          "Best prompts and patterns for Claude, Cursor, and friends.",
          "First AI-generated UI component and small refactors with AI."
        ]
      },
      {
        week: "Weeks 2–3",
        topics: [
          "Build basic dApp UIs entirely from prompts and vibe-edits.",
          "Learn how to ask AI for structure, not just snippets.",
          "Ship: Wallet connector mini-app with a clean, responsive UI."
        ]
      },
      {
        week: "Weeks 4–5",
        topics: [
          "Hooking up APIs, providers, and simple on-chain reads.",
          "Debugging and error-handling flows with AI as a pair.",
          "Ship: Utility tool (e.g. gas checker / watchlist dashboard)."
        ]
      },
      {
        week: "Weeks 6–8",
        topics: [
          "Pulling everything together into a small full-stack project.",
          "Documenting your build and commits so others can follow.",
          "Ship: Personal project of your choice, built live in Discord."
        ]
      }
    ]
  },
  "ai-automation-web3": {
    slug: "ai-automation-web3",
    title: "AI Automation in Web3",
    description:
      "Use AI to design and build automations that watch wallets, post content, trigger alerts, and help you run on-chain systems while you sleep.",
    duration: "5–7 weeks · Automation track",
    icon: <Bot className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "Discord bot that watches a wallet or contract and posts updates.",
      "Content helper that drafts X threads or summaries around a protocol.",
      "Custom automation for your project or a partner community."
    ],
    modules: [
      {
        week: "Week 1",
        topics: [
          "Automation basics and mental models for bots and agents.",
          "Prompting AI to scaffold scripts and schedulers.",
          "Ship: Simple script that reacts to a single on-chain event."
        ]
      },
      {
        week: "Weeks 2–3",
        topics: [
          "Connecting to RPC providers and reading live data.",
          "Designing alert and notification flows for Discord or email.",
          "Ship: Wallet or price watcher that sends actionable alerts."
        ]
      },
      {
        week: "Weeks 4–5",
        topics: [
          "Combining multiple services (APIs, webhooks, bots) into flows.",
          "Using AI to refactor, harden, and document automations.",
          "Ship: Automation stack that supports a real or mock community."
        ]
      },
      {
        week: "Weeks 6–7",
        topics: [
          "Exploring agent frameworks and higher-level orchestration.",
          "Planning future upgrades and safety nets for your automations.",
          "Ship: Polished agent or bot you can showcase in #project-showcase."
        ]
      }
    ]
  },
  "community-management-web3": {
    slug: "community-management-web3",
    title: "Community Management for Web3",
    description:
      "Learn the systems behind thriving Web3 communities — from Discord architecture and events to bots, rewards, and contributor funnels.",
    duration: "4–6 weeks · Ops & growth",
    icon: <Users className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "Channel + role architecture for a project server.",
      "Events calendar and engagement loops powered by bots.",
      "Community playbook you can bring to any Web3 team."
    ],
    modules: [
      {
        week: "Week 1",
        topics: [
          "What makes a Web3 server feel alive vs. dead.",
          "Mapping personas, channels, and roles with AI as a planning buddy.",
          "Ship: Clean Discord structure for a sample or your own project."
        ]
      },
      {
        week: "Weeks 2–3",
        topics: [
          "Designing quests, streaks, and reward loops that don’t feel spammy.",
          "Using bots and AI to run events, reminders, and summaries.",
          "Ship: One-week engagement sprint plan for your community."
        ]
      },
      {
        week: "Weeks 4–6",
        topics: [
          "Moderation systems, escalation paths, and safety culture.",
          "Onboarding flows that turn lurkers into contributors.",
          "Ship: Community playbook and onboarding path you can reuse."
        ]
      }
    ]
  },
  "wallet-security-mastery": {
    slug: "wallet-security-mastery",
    title: "Wallet & Security Mastery",
    description:
      "Protect your bags and your peace. Learn how wallets, approvals, and common attack paths work — and build tiny tools that help you stay safe.",
    duration: "3–5 weeks · Essential",
    icon: <ShieldCheck className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "Multi-wallet setup tailored to how you actually use crypto.",
      "Checklist and runbook for every new mint, dApp, or bridge.",
      "Small AI-assisted tool that reviews or annotates transactions."
    ],
    modules: [
      {
        week: "Week 1",
        topics: [
          "Hot, warm, and cold wallets — what matters for beginners.",
          "Approvals, signatures, and what you’re really signing.",
          "Ship: Clean, documented wallet setup across 2–3 devices."
        ]
      },
      {
        week: "Weeks 2–3",
        topics: [
          "How common scams and exploits actually work (without jump scares).",
          "Using AI to review transactions and contracts at a high level.",
          "Ship: Personal safety checklist you run before new interactions."
        ]
      },
      {
        week: "Weeks 4–5",
        topics: [
          "Security habits for long-term builders and contributors.",
          "Designing “panic buttons” and recovery plans.",
          "Ship: Tiny helper (script or checklist) you’ll actually keep using."
        ]
      }
    ]
  },
  "on-chain-basics-analytics": {
    slug: "on-chain-basics-analytics",
    title: "On-Chain Basics & Analytics",
    description:
      "Read the chain like a story. Learn how blocks, transactions, gas, and analytics tools fit together so you can follow the money and the meta.",
    duration: "4–6 weeks · Core",
    icon: <LineChart className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "Dashboard that tracks prices, gas, or simple protocol stats.",
      "Dune or explorer queries that answer real questions.",
      "Analytics board you can show in interviews or to collaborators."
    ],
    modules: [
      {
        week: "Week 1",
        topics: [
          "Blocks, transactions, gas, and explorers — story over jargon.",
          "Using AI to translate raw data into plain-English insights.",
          "Ship: Explorer-based walkthrough of a transaction end-to-end."
        ]
      },
      {
        week: "Weeks 2–3",
        topics: [
          "Reading and aggregating data via APIs and analytics tools.",
          "Prompting AI to help you shape useful dashboards and charts.",
          "Ship: Simple dashboard for prices or wallet activity."
        ]
      },
      {
        week: "Weeks 4–6",
        topics: [
          "Combining metrics into narratives (health, usage, growth).",
          "Presenting findings in a way non-nerds can understand.",
          "Ship: On-chain report or live analytics page you can keep updating."
        ]
      }
    ]
  }
};

type PageParams = {
  params: {
    slug: CourseSlug;
  };
};

export function generateStaticParams(): PageParams["params"][] {
  return Object.keys(courses).map((slug) => ({
    slug: slug as CourseSlug
  }));
}

export function generateMetadata({ params }: PageParams): Metadata {
  const course = courses[params.slug];

  return {
    title: `${course.title} | First Sons Academy`,
    description: course.description
  };
}

export default function CoursePage({ params }: PageParams) {
  const course = courses[params.slug];

  return (
    <main className="bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-6 md:pb-20 lg:px-8 lg:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.24),transparent_60%),radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-4xl space-y-8">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 transition hover:text-slate-100"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Academy</span>
          </Link>

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl">
                {course.icon}
                <span className="uppercase tracking-[0.18em]">
                  First Sons Academy
                </span>
              </div>
              <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                {course.title}
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                {course.description}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100 shadow-xl shadow-blue-500/10 backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                Duration
              </p>
              <p className="mt-2 text-sm font-medium">{course.duration}</p>
              <p className="mt-1 text-xs text-slate-300">
                Built to be completed while you&apos;re in the jungle with the
                fam — not locked in a LMS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),transparent_60%)]"
        />
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Curriculum Breakdown
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Week-by-week, built to ship.
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
              Each module is a mini-arc: learn just enough, ship something
              small, and stack proof instead of watching endless videos.
            </p>
          </div>

          <div className="space-y-4">
            {course.modules.map((module) => (
              <article
                key={module.week}
                className={cn(
                  "rounded-2xl border border-white/10 bg-white/5 p-5",
                  "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
                  "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#60A5FA]">
                  {module.week}
                </p>
                <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#60A5FA]" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Ship */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              What You&apos;ll Ship
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Real projects, not just theory.
            </h2>
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
              You won&apos;t just collect lecture notes — you&apos;ll leave
              with links, repos, and on-chain proof you can actually show off.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {course.ships.map((ship) => (
              <article
                key={ship}
                className={cn(
                  "flex h-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4",
                  "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
                  "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
                )}
              >
                <div className="flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                  <p className="text-xs font-semibold text-slate-50 sm:text-sm">
                    Ship
                  </p>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-200 sm:text-xs">
                  {ship}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-slate-800/70 px-4 pb-16 pt-12 md:px-6 md:pb-20 md:pt-16 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_60%)]"
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
            Ready to enroll?
          </p>
          <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
            Join the fam and start shipping.
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
            All enrollment runs through Discord so you&apos;re never learning
            alone. Tap in, grab your role, and we&apos;ll guide you from first
            prompt to first on-chain ship.
          </p>

          <Link
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold",
              "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-[0_0_35px_rgba(37,99,235,0.8)]",
              "transition-all duration-300 hover:shadow-[0_0_55px_rgba(96,165,250,0.95)] focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
            )}
            aria-label="Join the First Sons Discord to enroll"
          >
            <span>Join Discord to Enroll &amp; Start Shipping in the Fam</span>
            <Rocket className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}

/**
 * This dynamic course page:
 * - Uses a typed record of course metadata and modules mapped by slug.
 * - Pre-renders static paths via generateStaticParams and dynamic metadata from the course content.
 * - Follows the same gradient + glassmorphism visual language as the rest of First Sons.
 */

