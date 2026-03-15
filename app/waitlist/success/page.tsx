import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Sparkles, Twitter, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Waitlist Confirmed | First Sons",
  description:
    "You’re on the First Sons waitlist. Join the Discord fam and follow us on X to start vibing with other builders while we prep Phase 1."
};

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";
const X_URL = "https://x.com/Firstsons_Dao";

export default function WaitlistSuccessPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#0F172A] px-4 py-16 text-white md:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.24),transparent_60%),radial-gradient(circle_at_bottom,_rgba(30,64,175,0.5),transparent_60%)]"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <section className="space-y-5 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-[#60A5FA]" aria-hidden="true" />
            <span className="uppercase tracking-[0.18em] text-[11px] text-slate-200">
              You&apos;re on the waitlist
            </span>
          </div>

          <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            You&apos;re in! Check Discord →
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            You&apos;re officially on the list for the next Phase 1 cohort. Plug into the Discord jungle and follow us on X so you don&apos;t miss early drops and build-alongs.
          </p>
        </section>

        <section
          className={cn(
            "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8",
            "shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all duration-300",
            "hover:border-[#60A5FA]/30 hover:bg-white/10 hover:shadow-blue-500/20"
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1E40AF]/30 via-transparent to-[#3B82F6]/20 opacity-70" />

          <div className="relative space-y-5">
            <div className="space-y-2 text-left">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Next steps: join the fam.
              </h2>
              <p className="text-sm leading-relaxed text-slate-200/90">
                Your inbox will get all the official academy details. Day to day,
                though, everything happens inside Discord and on X.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Step 1 · Discord
                </p>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  Join the server, grab your role, and say hi in{" "}
                  <span className="font-medium text-[#60A5FA]">
                    #introductions
                  </span>
                  . This is where Vibe Coding and mini-projects live.
                </p>
                <Link
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold",
                    "bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white shadow-[0_0_24px_rgba(37,99,235,0.7)]",
                    "transition-all duration-300 hover:shadow-[0_0_40px_rgba(96,165,250,0.9)] focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                  )}
                  aria-label="Join the First Sons Discord"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Join Discord Fam</span>
                </Link>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Step 2 · X (Twitter)
                </p>
                <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
                  Follow{" "}
                  <span className="font-medium text-[#60A5FA]">
                    @Firstsons_Dao
                  </span>{" "}
                  for collabs, raffles, and public updates as we scale the
                  academy and DAO.
                </p>
                <Link
                  href={X_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold",
                    "bg-white/5 text-slate-100 backdrop-blur-xl transition-all duration-300",
                    "hover:border-[#60A5FA]/40 hover:bg-white/10 hover:text-white focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                  )}
                  aria-label="Follow First Sons on X"
                >
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                  <span>Follow @Firstsons_Dao</span>
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
              <Rocket className="mt-0.5 h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
              <p>
                When your cohort slot unlocks, we&apos;ll email you with
                onboarding details. Staying active in Discord and on X helps you
                catch extra drops, collabs, and early invites.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center text-[11px] text-slate-400 sm:text-xs">
          <Link
            href="/"
            className="underline-offset-4 hover:text-slate-200 hover:underline"
          >
            ← Back to homepage
          </Link>
        </section>
      </div>
    </main>
  );
}

