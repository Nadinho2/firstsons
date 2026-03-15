/**
 * Badge definitions from submitted metadata and IPFS links.
 * Edit this file to update badge names, descriptions, images, and links.
 */

export type BadgeTier = {
  id: number;
  name: string;
  description: string;
  accentClass: string;
  disabled?: boolean;
  disabledText?: string;
  link?: { href: string; label: string };
  image?: string;
  attributes?: { trait_type: string; value: string }[];
};

/** IPFS gateway base for resolving ipfs:// URLs in the app */
const IPFS_GATEWAY = "https://ipfs.io/ipfs";

/**
 * Badge tiers set from submitted files:
 * - OG: metadata JSON (name, description, attributes, image, external_url)
 * - Participant: NFT url + media url
 * - Completer: NFT url + media url
 */
export const badgeTiers: BadgeTier[] = [
  {
    id: 0,
    name: "First Sons OG Badge",
    description:
      "Exclusive OG badge for early First Sons family members. Priority access, special Discord roles, raffles & builder perks.",
    accentClass: "text-yellow-400",
    image: `${IPFS_GATEWAY}/QmWiecXk4xH7CpZsCk8hEqxcSaRNUcqRPXGkSRMkfHU1pn/0.jpg`,
    attributes: [
      { trait_type: "Tier", value: "OG" },
      { trait_type: "Rarity", value: "Legendary" },
      { trait_type: "Unlock By", value: "Early Fam" },
    ],
    link: {
      href: `${IPFS_GATEWAY}/QmRxxVwz2Ltef5r5a12xucQurg5aeJ5ixvhEeKCG5VXfnQ/0`,
      label: "View OG badge",
    },
  },
  {
    id: 1,
    name: "Participant Badge",
    description:
      "You showed up, vibed in class, and contributed to the jungle. Keep shipping and stacking proof.",
    accentClass: "text-[#60A5FA]",
    image: `${IPFS_GATEWAY}/QmQaj924GSaePtRKjxptqrBBqc6amSNBDC2JLgAPKNhkm1/0.jpg`,
    attributes: [
      { trait_type: "Tier", value: "Participant" },
      { trait_type: "Rarity", value: "Rare" },
      { trait_type: "Unlock By", value: "Complete academy track" },
    ],
    link: {
      href: `${IPFS_GATEWAY}/QmdjzPDkb4noWzbJ5eeo9x9iur69gN2YToRhZZpuZFCJj8/0`,
      label: "View Participant badge",
    },
  },
  {
    id: 2,
    name: "Completer Badge",
    description:
      "You shipped a real project with the fam. Builder status unlocked — this badge hits different.",
    accentClass: "text-emerald-400",
    disabled: true,
    disabledText: "Submit project in Discord to unlock",
    image: `${IPFS_GATEWAY}/Qmeuxmjc92YX7ithMn5C6qepaeszsSErJuM8FHpTUu2Mjz/0.jpg`,
    attributes: [
      { trait_type: "Tier", value: "Completer" },
      { trait_type: "Rarity", value: "Epic" },
      { trait_type: "Unlock By", value: "Submit project in Discord" },
    ],
    link: {
      href: `${IPFS_GATEWAY}/Qma4kdUkpAz8f2Q6rreaxoJK1Rx2StHoHnKxKBMSq26YNt/0`,
      label: "View Completer badge",
    },
  },
];
