import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  Sparkles,
  Users,
  MessageCircle,
  Bot,
  Hash,
  PartyPopper,
  ShieldCheck,
  Mic2,
  Twitter,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Community | First Sons – Web3 Academy & Discord Fam",
  description:
    "Step into the First Sons community — a Discord-first Web3 fam focused on growth, empowerment, and shipping real on-chain projects together."
};

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";
const X_URL = "https://x.com/Firstsons_Dao";

type WhyCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const whyCards: WhyCard[] = [
  {
    title: "Discord-First Growth",
    description:
      "Learn by shipping mini-projects live in channels — real feedback from day one, not after some final exam.",
    icon: <Rocket className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    title: "Instant Builder Support",
    description:
      "Drop prompts, get AI + community edits, vibe-checks, and collabs faster than you can overthink your idea.",
    icon: (
      <div className="flex items-center gap-1">
        <MessageCircle
          className="h-4 w-4 text-[#60A5FA]"
          aria-hidden="true"
        />
        <Bot className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
      </div>
    )
  },
  {
    title: "Empowerment for All Levels",
    description:
      "Absolute beginners welcome. We celebrate first ships and help you level up towards earning and contributing.",
    icon: <Sparkles className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    title: "Real Web3 Connections",
    description:
      "Network with builders, join raffles and collabs, and spot real opportunities — our jungle grows together.",
    icon: <Users className="h-5 w-5 text-[#60A5FA]" aria-hidden="true" />
  }
];

type ChannelCard = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

const channelCards: ChannelCard[] = [
  {
    name: "#welcome",
    description: "Say hi, grab your role, and officially join the fam.",
    icon: <PartyPopper className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "#vibe-coding",
    description: "Prompt AI, share code, and get instant help shipping.",
    icon: <Hash className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "#project-showcase",
    description: "Drop your ships, get feedback, and earn hype + proof.",
    icon: <Rocket className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "#raids-events",
    description: "Spaces, challenges, co-working, and collab missions.",
    icon: <Sparkles className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "#ai-automation-hub",
    description: "Build and test bots, agents, and automations together.",
    icon: <Bot className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "#security-vibes",
    description: "Wallet safety, scam alerts, and security best practices.",
    icon: <ShieldCheck className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "#off-topic-jungle",
    description: "Memes, music, life updates, and chill jungle convos.",
    icon: <MessageCircle className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  },
  {
    name: "Voice Rooms",
    description: "Live pairing, mentoring, and build sessions with the fam.",
    icon: <Mic2 className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
  }
];

type Testimonial = {
  quote: string;
  handle: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Shipped my first dApp thanks to the #vibe-coding thread — the fam got me from zero to deployed in days.",
    handle: "@newbuilder"
  },
  {
    quote:
      "Joined for the academy, stayed for the collabs and the feeling of real empowerment in Web3.",
    handle: "@web3viber"
  },
  {
    quote:
      "This is the Discord where beginners actually grow — no fluff, just builders who want you to win.",
    handle: "@firstsonOG"
  }
];

export default function CommunityPage() {
  return (
    <main className="bg-[#0F172A] text-white">
      {/* Hero */}
      <section className="hero-orbs relative overflow-hidden px-4 pb-16 pt-24 sm:pt-28 md:px-6 md:pb-20 md:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-xl">
            <Users className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
            <span className="uppercase tracking-[0.18em]">
              The First Sons Community
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              The First Sons Community
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base md:mx-0">
              Your home for Web3 growth and empowerment. Ship real projects,
              vibe with builders, and get instant help — all inside our Discord
              fam. No gatekeeping, just building together in the jungle.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-glow inline-flex gap-2"
              aria-label="Join the First Sons Discord community"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Join the Discord Fam</span>
            </Link>
            <Link
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-outline inline-flex gap-2"
              aria-label="Follow First Sons on X"
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
              <span>Follow on X @Firstsons_Dao</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why First Sons Hits Different */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Why First Sons Hits Different
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              A Discord jungle built for shipping.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              We&apos;re not here to lurk and complain — this fam is for
              beginners and builders who want to move, ship, and empower the
              wider Web3 community together.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {whyCards.map((card) => (
              <article
                key={card.title}
                className="glass-card flex h-full flex-col gap-3 p-5 md:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-50">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the Discord – What to Expect */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Inside the Discord — What to Expect
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Welcome to the jungle.
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
              Every channel is designed to push you forward — from your first
              hello to your first ship and beyond.
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {channelCards.map((channel) => (
              <article
                key={channel.name}
                className="glass-card flex flex-col gap-2 p-4 md:p-5"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/70">
                    {channel.icon}
                  </div>
                  <h3 className="text-xs font-semibold text-slate-50 sm:text-sm">
                    {channel.name}
                  </h3>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-200 sm:text-xs">
                  {channel.description}
                </p>
              </article>
            ))}
          </div>

          <p className="text-center text-xs text-slate-300 sm:text-sm">
            Weekly mini-projects, raffles, and collabs drop inside these
            channels — stay active to level up and unlock more of the jungle.
          </p>
        </div>
      </section>

      {/* Voices from the Fam */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.22),transparent_60%)]"
        />
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="space-y-3 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
              Voices from the fam
            </p>
            <h2 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
              Builders who stepped into the meta.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.handle}
                className="glass-card flex h-full flex-col gap-3 p-5 md:p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70">
                    <Quote className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-100">
                      {item.handle}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Future First Son builder
                    </p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {item.quote}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-slate-800/70 px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(30,64,175,0.45),transparent_60%)]"
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/90">
            Last call for the jungle
          </p>
          <h2 className="mt-3 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
            Ready to join the First Sons?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            Limited beta spots. Jump into Discord, follow{" "}
            <span className="font-semibold text-[#60A5FA]">
              @Firstsons_Dao
            </span>{" "}
            on X, and start building your Web3 future with a fam that actually
            wants you to win.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold",
                "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-[0_0_30px_rgba(37,99,235,0.7)]",
                "transition-all duration-300 hover:shadow-[0_0_45px_rgba(96,165,250,0.9)] focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
              )}
              aria-label="Join the First Sons Discord"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Join Discord</span>
            </Link>

            <Link
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold",
                "bg-white/5 text-slate-100 backdrop-blur-xl transition-all duration-300",
                "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:text-white focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
              )}
              aria-label="Follow First Sons on X"
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
              <span>Follow @Firstsons_Dao</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Summary:
 * - Added CommunityPage with a hero explaining the First Sons community and CTAs to join Discord and follow on X.
 * - Built "Why First Sons Hits Different" glass cards, a detailed "Inside the Discord" channel grid, and testimonial placeholders.
 * - Finished with a final CTA encouraging visitors to join the Discord fam and stay connected via @Firstsons_Dao.
 */

