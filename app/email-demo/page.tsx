import type { Metadata } from "next";
import { WaitlistReactEmailFormExample } from "@/components/WaitlistReactEmailFormExample";

export const metadata: Metadata = {
  title: "Email demo | First Sons",
  robots: "noindex, nofollow",
};

/**
 * Dev / internal demo page for React Email + Resend actions.
 * Remove or protect this route in production if you don’t want it public.
 */
export default function EmailDemoPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-16 text-white">
      <div className="mx-auto max-w-lg space-y-8 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">
          Resend + React Email
        </h1>
        <p className="text-sm text-slate-400">
          Requires <code className="text-[#60A5FA]">RESEND_API_KEY</code> and a
          valid <code className="text-[#60A5FA]">WAITLIST_FROM_EMAIL</code> in{" "}
          <code className="text-[#60A5FA]">.env.local</code>.
        </p>
        <WaitlistReactEmailFormExample />
      </div>
    </main>
  );
}
