/**
 * Single source of truth for waitlist-eligible courses (homepage dropdown + course pages).
 */

export type WaitlistCourseTag = { label: string };

export type WaitlistCourse = {
  slug: string;
  title: string;
  /** Shown in emails / success page */
  shortTitle?: string;
  comingSoon?: boolean;
  description: string;
  tags: WaitlistCourseTag[];
};

export const WAITLIST_COURSES: WaitlistCourse[] = [
  {
    slug: "vibe-coding-bootcamp",
    title: "Vibe Coding Bootcamp",
    shortTitle: "Vibe Coding Bootcamp",
    description:
      "Free intro series with 6 live sessions to help complete beginners ship first Web3-flavored projects with AI tools.",
    tags: [
      { label: "Free" },
      { label: "6 Sessions" },
      { label: "Beginner" },
      { label: "Kickoff" }
    ]
  },
  {
    slug: "vibe-coding",
    title: "Vibe Coding",
    description:
      "Use Claude, Cursor, and Grok to build full-stack Web3 apps fast. Practice writing clear prompts, then ship real dApps from week one.",
    tags: [
      { label: "Live" },
      { label: "6-8 Weeks" },
      { label: "Core" },
      { label: "+∞" },
    ],
  },
  {
    slug: "ai-automation-web3",
    title: "AI / Bot Automation",
    shortTitle: "AI Automation",
    description:
      "Wire up bots that trade on rules you set, help moderate Discord, draft posts, and run simple on-chain tasks.",
    tags: [
      { label: "Live" },
      { label: "5-7 Weeks" },
      { label: "Advanced" },
      { label: "+∞" },
    ],
  },
  {
    slug: "community-management-web3",
    title: "Community Management",
    description:
      "Build Discord bots, run events, set up engagement loops, and grow communities from 0 to 10k.",
    tags: [
      { label: "Live" },
      { label: "4-6 Weeks" },
      { label: "Operations" },
      { label: "+∞" },
    ],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    comingSoon: true,
    description:
      "Threads, short-form video, newsletters, and AI-assisted workflows for Web3 brands and builders.",
    tags: [
      { label: "Coming soon" },
      { label: "TBA" },
      { label: "Growth" },
    ],
  },
  {
    slug: "futures-trading",
    title: "Futures Trading",
    comingSoon: true,
    description:
      "Risk, sizing, execution, and discipline for crypto futures—opening after we lock the core curriculum.",
    tags: [
      { label: "Coming soon" },
      { label: "TBA" },
      { label: "Markets" },
    ],
  },
];

export function getWaitlistCourseBySlug(
  slug: string
): WaitlistCourse | undefined {
  return WAITLIST_COURSES.find((c) => c.slug === slug);
}

export function isValidWaitlistCourseSlug(slug: string): boolean {
  return WAITLIST_COURSES.some((c) => c.slug === slug);
}
