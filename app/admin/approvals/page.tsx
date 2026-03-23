import type { Metadata } from "next";
import { AdminApprovalsDashboard } from "@/components/AdminApprovalsDashboard";

export const metadata: Metadata = {
  title: "Admin approvals | First Sons",
  robots: "noindex, nofollow",
};

export default function AdminApprovalsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] px-4 py-16 text-white md:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
            Internal tool
          </p>
          <h2 className="text-lg font-semibold text-slate-100">
            Waitlist Approval Sender
          </h2>
        </div>

        <AdminApprovalsDashboard />
      </div>
    </main>
  );
}
