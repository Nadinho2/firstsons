# React Email templates (First Sons)

- **`brand.ts`** — shared palette (matches `tailwind.config.ts`: `#1E40AF`, `#60A5FA`, `#0F172A`) + `getEmailLogoUrl()`
- **`EmailBrandLogo.tsx`** — Navbar-style gradient **F** + “First Sons”, or optional `EMAIL_LOGO_URL` image
- **`WaitlistConfirmationEmail.tsx`** — **production waitlist** (blue gradient header, light card, logo, Discord + X CTAs); used by `lib/email.ts` → `sendWaitlistConfirmationEmail`
- **`WelcomeEmail.tsx`** — demo / alternate welcome; props: `name`, `discordInvite`, `logoUrl?`
- **`PremiumEnrollmentEmail.tsx`** — $50 premium receipt; props: `name`, `course`, `amount`, `txHash?`, `premiumDiscordInvite`, `logoUrl?`

## Preview locally

```bash
npm run email
```

Opens the React Email dev server for the `emails/` directory.

## Env

See root `.env.example` — **`RESEND_API_KEY`** and a verified **`WAITLIST_FROM_EMAIL`** (or `RESEND_FROM`) are required. Optional **`EMAIL_LOGO_URL`** (full URL to a PNG) replaces the default F mark in all templates.

Server actions live in **`app/email-actions.ts`** (`handleWaitlistSignup`, `handlePremiumEnrollment`).
