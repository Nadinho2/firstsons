import Link from "next/link";
import React from "react";

// Badges suspended – re-add { label: "Badges", href: "/badges" } when ready
const navItems = [
  { label: "Academy", href: "/academy" },
  { label: "Community", href: "/community" },
  { label: "Roadmap", href: "/roadmap" }
] as const;

export const SiteHeader: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-700/40 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="First Sons home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-sm font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.8)]">
            F
          </div>
          <span className="bg-gradient-to-r from-[#E5E7EB] via-[#BFDBFE] to-[#60A5FA] bg-clip-text text-base font-semibold tracking-tight text-transparent md:text-lg">
            First Sons
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 text-xs font-medium text-slate-300/80 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm tracking-tight text-slate-300/80 transition hover:text-white"
            >
              <span>{item.label}</span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-200/90 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            <span>Phase 1 Beta Live</span>
          </div>
          <Link
            href="/#waitlist"
            className="relative hidden items-center justify-center rounded-full bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.65)] transition duration-300 hover:shadow-[0_0_45px_rgba(96,165,250,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] md:inline-flex"
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
};

