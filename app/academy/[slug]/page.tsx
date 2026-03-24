import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  Bot,
  Users,
  Rocket,
  ArrowLeft,
  Megaphone,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CourseWaitlistSection } from "@/components/CourseWaitlistSection";

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";

type CourseSlug =
  | "vibe-coding-bootcamp"
  | "vibe-coding"
  | "ai-automation-web3"
  | "community-management-web3"
  | "content-creation"
  | "futures-trading";

type Module = {
  week: string;
  topics: string[];
  duration?: string;
  intro?: string;
  liveBuild?: string;
  win?: string;
  homework?: string;
  teaser?: string;
};

type CourseDetail = {
  slug: CourseSlug;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
  ships: string[];
  modules: Module[];
  comingSoon?: boolean;
};

const courses: Record<CourseSlug, CourseDetail> = {
  "vibe-coding-bootcamp": {
    slug: "vibe-coding-bootcamp",
    title: "Vibe Coding Bootcamp",
    description:
      "Vibe Coding Kickoff: a free intro series for complete beginners to ship first Web3 projects with AI, no gatekeeping.",
    duration: "6 live sessions · Free intro series",
    icon: <Code2 className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "Your first vibe functions and logic mini-builds.",
      "A personal Vibe Card website with styling and interactivity.",
      "A deployed crypto-flavored dashboard on Vercel."
    ],
    modules: [
      {
        week: "Session 1 - Vibe Coding 101: Terms, Definitions & Functions Magic",
        duration: "60-75 min (live/recorded)",
        intro:
          "What Vibe Coding is and how beginners use plain English + AI to start shipping immediately.",
        topics: [
          "What is Vibe Coding?",
          "Variables, functions, parameters, return, console.log",
          "Common beginner bugs and debugging flow"
        ],
        liveBuild: "Vibe score calculator + greet function in Cursor/Grok",
        win: "Your first 2-3 personal functions",
        homework: "Daily vibe checker function + screenshot share",
        teaser: "Next: turn words into beautiful websites!",
      },
      {
        week: "Session 2 - Vibe Websites: HTML & CSS with AI",
        topics: [
          "HTML structure and clean page layout",
          "CSS styling basics: tags, classes, selectors",
          "Responsive layouts (flex/grid with AI prompts)"
        ],
        liveBuild:
          'Personal "Vibe Card" profile page (bio, badges, socials, glow buttons)',
        win: "Your first live personal site",
        homework: "Customize your page + create a crypto vibe alert card prompt",
        teaser: "Next: make pages do real logic and reactions.",
      },
      {
        week: "Session 3 - Vibe Logic: Variables, Conditionals, Loops & JS Basics",
        topics: [
          "Variables and data types in JavaScript",
          "if/else decisions and loop basics (for/while)",
          "Wiring logic into your Vibe Card"
        ],
        liveBuild:
          "Interactive vibe checker (input -> score + message) + dynamic section upgrade",
        win: "A page that reacts to users",
        homework: "Crypto price mood checker (fake data)",
        teaser: "Next: buttons, events, and DOM magic.",
      },
      {
        week: "Session 4 - Make It Interactive: Events, Buttons & DOM Magic",
        topics: [
          "Event listeners (click/input)",
          "DOM updates and simple state handling",
          "Practical interaction patterns for beginner apps"
        ],
        liveBuild:
          "Upgrade Vibe Card: boost vibe button (quote + animation), counter, and form",
        win: "A fully interactive mini-app",
        homework: 'Add a "connect wallet" placeholder (Web3 intro)',
        teaser: "Next: build your first full vibe app end-to-end.",
      },
      {
        week: "Session 5 - Build Your First Full Vibe App: Crypto Price Tracker Dashboard",
        topics: [
          "Combining HTML/CSS/JS into one complete app",
          "Events and dynamic updates in one workflow",
          "API-fetch tease (e.g., CoinGecko) and vibe alerts"
        ],
        liveBuild: "Crypto dashboard with price display + vibe alerts",
        win: "A shareable Web3-flavored deployed app",
        homework: "Personalize and add one custom feature (e.g., favorite coin)",
        teaser: "Next: launch prep, debugging, and premium path reveal.",
      },
      {
        week: "Session 6 - Share, Debug, Launch & Premium Path Reveal",
        topics: [
          "Debugging with AI and clean prompt-based fixes",
          "Git basics (commit/push) and Vercel deploy flow",
          "Portfolio tips + student showcases"
        ],
        liveBuild: "Live polish + final launch walkthrough",
        win: "Confidence to share your work and keep shipping",
        homework: "Prepare your portfolio links for Phase 1 selection",
        teaser:
          "Upgrade path: on-chain builds, bots, community ops, private Discord, and client roadmap.",
      }
    ]
  },
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
          "Intro to Vibe Coding and where AI fits in day-to-day work.",
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
      "Use AI to sketch and build automations that watch wallets, post content, fire alerts, and keep simple on-chain tasks running overnight.",
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
          "Automation basics: how to think about bots, scripts, and scheduled jobs.",
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
      "Learn what keeps Web3 communities alive—Discord layout, events, bots, rewards, and paths from lurker to contributor.",
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
  "content-creation": {
    slug: "content-creation",
    title: "Content Creation",
    comingSoon: true,
    description:
      "Threads, short-form video, newsletters, and AI-assisted workflows for Web3 brands and builders.",
    duration: "TBA · Growth track",
    icon: <Megaphone className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "We’ll publish example ships when this track opens.",
      "Expect content systems you can run weekly with AI + templates.",
      "Portfolio-ready pieces for brands or your own builder journey."
    ],
    modules: [
      {
        week: "Curriculum",
        topics: [
          "Week-by-week plan is in progress. Join the waitlist to get notified when Content Creation opens in Phase 1 or later."
        ]
      }
    ]
  },
  "futures-trading": {
    slug: "futures-trading",
    title: "Futures Trading",
    comingSoon: true,
    description:
      "Risk, sizing, execution, and discipline for crypto futures—opening after we lock the core curriculum.",
    duration: "TBA · Markets track",
    icon: <TrendingUp className="h-6 w-6 text-[#60A5FA]" aria-hidden="true" />,
    ships: [
      "We’ll publish project ideas when this track opens.",
      "Focus: risk rules, journaling, and execution you can repeat.",
      "Built for people who already completed core academy skills."
    ],
    modules: [
      {
        week: "Curriculum",
        topics: [
          "Syllabus lands after core tracks stabilize. Join the waitlist if you want first access when Futures Trading opens."
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
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
                  {course.title}
                </h1>
                {course.comingSoon ? (
                  <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100">
                    Coming soon
                  </span>
                ) : null}
              </div>
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
          {course.comingSoon ? (
            <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-8 text-center shadow-xl shadow-amber-500/5 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">
                Curriculum
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-50 sm:text-2xl">
                This track is coming soon
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
                We&apos;re finalizing the week-by-week plan. Join the waitlist to
                get notified when {course.title} opens.
              </p>
              <Link
                href="#course-waitlist"
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.6)]"
              >
                Join waitlist
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
                  Curriculum Breakdown
                </p>
                <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
                  {course.slug === "vibe-coding-bootcamp"
                    ? "Session-by-session, built to ship."
                    : "Week-by-week, built to ship."}
                </h2>
                <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
                  Each module is a mini-arc: learn just enough, ship something
                  small, and stack proof instead of watching endless videos.
                </p>
              </div>

              <div className="space-y-4">
                {course.modules.map((module) =>
                  course.slug === "vibe-coding-bootcamp" ? (
                    <details
                      key={module.week}
                      className={cn(
                        "group rounded-2xl border border-white/10 bg-white/5 p-5",
                        "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
                        "open:border-[#60A5FA]/40 open:bg-white/10"
                      )}
                    >
                      <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-slate-50 marker:content-['']">
                        <span className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent">
                          {module.week}
                        </span>
                        {module.duration ? (
                          <span className="ml-2 text-xs font-medium text-slate-400">
                            ({module.duration})
                          </span>
                        ) : null}
                      </summary>
                      {module.intro ? (
                        <p className="mt-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
                          {module.intro}
                        </p>
                      ) : null}
                      <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-200 sm:text-sm">
                        {module.topics.map((topic) => (
                          <li key={topic} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#60A5FA]" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      {module.liveBuild ? (
                        <p className="mt-3 text-xs text-slate-200 sm:text-sm">
                          <span className="font-semibold text-[#60A5FA]">
                            Live build:
                          </span>{" "}
                          {module.liveBuild}
                        </p>
                      ) : null}
                      {module.win ? (
                        <p className="mt-2 text-xs text-slate-200 sm:text-sm">
                          <span className="font-semibold text-[#60A5FA]">
                            Win:
                          </span>{" "}
                          {module.win}
                        </p>
                      ) : null}
                      {module.homework ? (
                        <p className="mt-2 text-xs text-slate-200 sm:text-sm">
                          <span className="font-semibold text-[#60A5FA]">
                            Homework:
                          </span>{" "}
                          {module.homework}
                        </p>
                      ) : null}
                      {module.teaser ? (
                        <p className="mt-2 text-xs text-blue-200/90 sm:text-sm">
                          <span className="font-semibold">Teaser:</span>{" "}
                          {module.teaser}
                        </p>
                      ) : null}
                    </details>
                  ) : (
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
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* What You'll Ship */}
      {!course.comingSoon ? (
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
                You won&apos;t just collect lecture notes—you&apos;ll leave with
                links, repos, and on-chain proof you can show in a portfolio or
                interview.
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
      ) : null}

      <CourseWaitlistSection
        courseSlug={params.slug}
        courseTitle={course.title}
      />

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
            Enrollment runs through Discord so you&apos;re not learning alone.
            Join, grab your role, and we&apos;ll walk you from first prompt to
            first on-chain ship.
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
            <span>Join Discord to enroll</span>
            <Rocket className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
