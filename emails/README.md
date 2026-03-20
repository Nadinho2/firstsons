# React Email templates (First Sons)

- **`WelcomeEmail.tsx`** — waitlist welcome; props: `name`, `discordInvite`
- **`PremiumEnrollmentEmail.tsx`** — $50 premium receipt; props: `name`, `course`, `amount`, `txHash?`, `premiumDiscordInvite`

## Preview locally

```bash
npm run email
```

Opens the React Email dev server for the `emails/` directory.

## Env

See root `.env.example` — **`RESEND_API_KEY`** and a verified **`WAITLIST_FROM_EMAIL`** (or `RESEND_FROM`) are required.

Server actions live in **`app/email-actions.ts`** (`handleWaitlistSignup`, `handlePremiumEnrollment`).
