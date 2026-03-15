import React from "react";

export const SiteFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#020617] py-8 text-xs text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="text-[11px] text-slate-400">
            First Sons © {year}. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            Built for complete beginners who want to ship.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
          <a href="/academy" className="transition hover:text-slate-200">
            Academy
          </a>
          <a href="/community" className="transition hover:text-slate-200">
            Community
          </a>
          <a href="/roadmap" className="transition hover:text-slate-200">
            Roadmap
          </a>
          <a href="/#waitlist" className="transition hover:text-slate-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

