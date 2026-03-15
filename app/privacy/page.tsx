import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | First Sons",
  description: "Privacy policy for First Sons – Web3 academy and community."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-24 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-2xl font-semibold tracking-tight text-transparent sm:text-3xl">
          Privacy
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          We respect your privacy. Details on how we collect, use, and protect your data will be published here. For now, we only use your email and Discord handle to contact you about the First Sons cohort — no spam, ever.
        </p>
        <Link href="/" className="mt-8 inline-block text-sm font-medium text-[#60A5FA] hover:underline">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
