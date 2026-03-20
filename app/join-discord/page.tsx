import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Welcome to First Sons — Join the Discord",
  description:
    "Welcome to First Sons. Join Discord to start building with the group, meet other beginners, and ship your first on-chain projects."
};

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";

export default function JoinDiscordPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#0F172A] px-4 py-16 text-white md:px-6 lg:px-8">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.24),transparent_60%),radial-gradient(circle_at_bottom,_rgba(30,64,175,0.5),transparent_60%)]"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        {/* Heading + copy */}
        <section className="space-y-5 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" aria-hidden="true" />
            <span className="uppercase tracking-[0.18em] text-[11px] text-slate-200">
              You&apos;re officially a First Son
            </span>
          </div>

          <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            Welcome to the First Sons Family!
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            You just took a real first step into Web3. Our Discord is where Vibe
            Coding happens—mini-projects, live help, and other beginners
            shipping their first on-chain builds.
          </p>
        </section>

        {/* Main card */}
        <section
          className={cn(
            "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5",
            "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
            "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1E40AF]/30 via-transparent to-[#3B82F6]/20 opacity-70" />

          <div className="relative flex flex-col gap-6 p-6 sm:p-8">
            <div className="space-y-3 text-center sm:text-left">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Step 1: Join the Discord
              </h2>
              <p className="text-sm leading-relaxed text-slate-200/90">
                This is home base for the academy. Start in{" "}
                <span className="font-semibold text-[#60A5FA]">
                  #start-here
                </span>{" "}
                to get your First Son role, open the beginner tracks, and see
                today&apos;s build prompts.
              </p>
            </div>

            {/* Discord button */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-slate-300/90 sm:text-sm">
                It&apos;s free to join. All we ask is that you show up ready to
                learn and ship.
              </p>

              <Link
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                  "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-[0_0_30px_rgba(37,99,235,0.65)]",
                  "transition-all duration-300 hover:shadow-[0_0_45px_rgba(96,165,250,0.85)] focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                )}
                aria-label="Join the First Sons Discord server"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Join the Discord</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </div>
          </div>
        </section>

        {/* Next steps card */}
        <section className="grid gap-4 text-sm text-slate-200 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:items-start">
          <div
            className={cn(
              "rounded-2xl border border-white/10 bg-white/5 p-5",
              "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
              "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              What happens next
            </p>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#60A5FA]"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Introduce yourself in{" "}
                  <span className="font-medium text-[#60A5FA]">
                    #introductions
                  </span>{" "}
                  and tell us what you want to ship in Web3.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#60A5FA]"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Grab your first{" "}
                  <span className="font-medium text-[#60A5FA]">
                    Vibe Coding
                  </span>{" "}
                  prompt and let AI help you build your first mini-project.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#60A5FA]"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  Start collecting{" "}
                  <span className="font-medium text-[#60A5FA]">
                    on-chain proof
                  </span>{" "}
                  for every project you ship as a First Son.
                </p>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Keep this page open
            </p>
            <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
              Keep this tab open while you jump into Discord. If you ever feel
              lost, come back here and hit the button again — the invite link
              will always bring you home.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

