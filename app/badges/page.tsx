import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Badges | First Sons – Web3 Academy & Community",
  description:
    "Earn OG, Participant, and Completer NFT badges as you progress through the First Sons academy and Discord community."
};

/** Badges suspended – full BadgesClient not loaded; page is static so build/deploy unaffected. */
export default function BadgesPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] pt-24 pb-16 text-white">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
        <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
          Badges
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Badge claiming is temporarily suspended. Check back later or join the
          fam in Discord to stay updated.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-[#60A5FA] hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}

