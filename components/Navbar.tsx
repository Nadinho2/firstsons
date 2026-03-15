"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DISCORD_INVITE_URL = "https://discord.gg/VJj2ZHc46";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Community", href: "/community" },
  { label: "Roadmap", href: "/roadmap" }
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-700/40 bg-[#020617]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
        {/* Logo - stylized F gradient */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="First Sons home"
          onClick={closeMenu}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-sm font-bold text-white shadow-[0_0_24px_rgba(37,99,235,0.8)]">
            F
          </div>
          <span className="bg-gradient-to-r from-[#E5E7EB] via-[#BFDBFE] to-[#60A5FA] bg-clip-text text-base font-semibold tracking-tight text-transparent md:text-lg">
            First Sons
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium tracking-tight text-slate-300/90 transition hover:text-white"
            >
              <span>{item.label}</span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-px w-0 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100" />
            </Link>
          ))}
        </nav>

        {/* Right: Join Discord (glowing) + Join Waitlist (secondary) + hamburger */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-glow btn-glow-sm hidden md:inline-flex gap-2"
            aria-label="Join Discord"
          >
            Join Discord
          </Link>
          <Link
            href="/#waitlist"
            className="btn-outline hidden md:inline-flex"
            onClick={closeMenu}
          >
            Join Waitlist
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/50 bg-slate-800/50 text-slate-300 transition hover:bg-slate-700/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60A5FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "absolute inset-x-0 top-full overflow-hidden border-t border-slate-700/40 bg-[#020617]/95 backdrop-blur-xl transition-all duration-300 ease-out md:hidden",
          mobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 md:px-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800/60 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-slate-700/50 pt-4">
            <Link
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="btn-glow w-full justify-center"
            >
              Join Discord
            </Link>
            <Link
              href="/#waitlist"
              onClick={closeMenu}
              className="btn-outline w-full justify-center"
            >
              Join Waitlist
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
