"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-glow w-full justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          <span>Joining…</span>
        </>
      ) : (
        "Join Waitlist"
      )}
    </button>
  );
}

type WaitlistFormProps = {
  action: (formData: FormData) => Promise<void>;
  children?: React.ReactNode;
};

export function WaitlistForm({ action, children }: WaitlistFormProps) {
  return (
    <form action={action} className="space-y-4" aria-label="Join waitlist">
      {children}
      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
}
