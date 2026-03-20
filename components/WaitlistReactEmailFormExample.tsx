"use client";

/**
 * Example client form: React Email welcome flow via Server Action.
 * Uses useTransition for loading (React 18.2–compatible; useFormState/useFormStatus need React 18.3+/19).
 *
 * @example Place on a page: <WaitlistReactEmailFormExample />
 */

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  handleWaitlistSignup,
  type EmailFormState,
} from "@/app/email-actions";

const initialState: EmailFormState = { ok: false };

export function WaitlistReactEmailFormExample() {
  const [state, setState] = useState<EmailFormState>(initialState);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6 text-left">
      <h2 className="text-lg font-semibold text-slate-50">
        React Email · Welcome (demo)
      </h2>
      <p className="mt-1 text-xs text-slate-400">
        Uses <code className="text-[#60A5FA]">handleWaitlistSignup</code> from{" "}
        <code className="text-[#60A5FA]">app/email-actions.ts</code>
      </p>

      <form
        className="mt-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          startTransition(async () => {
            const fd = new FormData(form);
            const result = await handleWaitlistSignup(undefined, fd);
            setState(result);
          });
        }}
      >
        <div>
          <label htmlFor="demo-name" className="text-xs text-slate-300">
            Name <span className="text-slate-500">(optional)</span>
          </label>
          <input
            id="demo-name"
            name="name"
            type="text"
            placeholder="Ada"
            className="mt-1 w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div>
          <label htmlFor="demo-email" className="text-xs text-slate-300">
            Email <span className="text-rose-400">*</span>
          </label>
          <input
            id="demo-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1 w-full rounded-xl border border-slate-600/60 bg-slate-950/50 px-3 py-2 text-sm text-slate-100"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(37,99,235,0.5)] disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            "Send welcome email"
          )}
        </button>

        {state.ok && state.message ? (
          <p className="text-sm text-emerald-400" role="status">
            {state.message}
          </p>
        ) : null}
        {state.error ? (
          <p className="text-sm text-rose-400" role="alert">
            {state.error}
          </p>
        ) : null}
      </form>
    </div>
  );
}
