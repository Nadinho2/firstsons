import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Approvals", href: "/admin/approvals" },
  { label: "Newsletter", href: "/admin/newsletter/compose" },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-10 md:px-6">
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Admin
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10",
                  item.href.startsWith("/admin/newsletter")
                    ? "data-[active=true]:bg-white/10 data-[active=true]:text-white"
                    : "data-[active=true]:bg-white/10 data-[active=true]:text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
