import React from "react";
import Link from "next/link";
import { MessageCircle, Twitter } from "lucide-react";

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";
const X_URL = "https://x.com/Firstsons_Dao";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Community", href: "/community" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Contact", href: "/#waitlist" },
  { label: "Privacy", href: "/privacy" }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#020617]/90 py-10 backdrop-blur-xl md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
          {/* Brand + social */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] text-xs font-bold text-white">
                F
              </div>
              <span className="text-sm font-semibold text-slate-200">First Sons</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 max-w-xs">
              Web3 academy for complete beginners. Learn by shipping—tools and the Discord group help you get it done.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={DISCORD_INVITE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/50 bg-slate-800/50 text-slate-300 transition hover:border-[#60A5FA]/40 hover:bg-slate-700/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
                aria-label="Join Discord"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/50 bg-slate-800/50 text-slate-300 transition hover:border-[#60A5FA]/40 hover:bg-slate-700/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
                aria-label="Follow @Firstsons_Dao on X"
              >
                <Twitter className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-slate-400">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-block py-2 transition hover:text-slate-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800/60 pt-6 text-center text-[11px] text-slate-500">
          © 2026 First Sons. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
