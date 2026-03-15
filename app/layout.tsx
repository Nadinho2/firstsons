import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Summary of changes (Acumen-level polish):
// - Added Navbar.tsx (Home, Academy, Community, Roadmap, Join Discord + Join Waitlist, hamburger mobile)
// - Added Footer.tsx (Discord + X icons, © 2026 First Sons, links, privacy placeholder, dark glass)
// - Enhanced glassmorphism (.glass-card, .glass-card-strong) + intense hovers (border-[#60A5FA]/40, shadow, translateY)
// - Hero orbs (hero-orbs) + larger mobile type (text-4xl → text-5xl md:text-7xl) on all hero sections
// - Improved mobile spacing (gap-4 sm:gap-5, padding md:p-6) on cards, roadmap phases, channel grid
// - Upgraded waitlist form: name + email + Discord, loading spinner (useFormStatus), success page "You're in! Check Discord →"
// - Removed NFT/badge references from homepage Why section, academy copy, roadmap copy
// - Metadata & SEO: title template, description, openGraph, twitter, robots; favicon via app/icon.tsx (stylized F)
// - Consistent buttons: .btn-glow and .btn-outline with hover brightness-110 + scale-[1.02]
// - Gradients standardized to linear-gradient(from-[#1E40AF] to-[#3B82F6])

export const metadata: Metadata = {
  title: {
    default: "First Sons — Web3 Academy for Complete Beginners",
    template: "%s | First Sons"
  },
  description:
    "First Sons is a Web3 academy for complete beginners. Learn AI-powered Vibe Coding, automation, community management, and on-chain skills by shipping real projects with AI. Discord-first, no jargon.",
  keywords: ["Web3", "academy", "beginners", "Vibe Coding", "Discord", "First Sons", "crypto", "blockchain"],
  authors: [{ name: "First Sons" }],
  openGraph: {
    title: "First Sons — Web3 Academy for Complete Beginners",
    description:
      "Learn Web3 by shipping real projects with AI. Discord-first academy for complete beginners. No prior experience required.",
    type: "website"
    // Add when you have an image: images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "First Sons — Web3 Academy for Complete Beginners",
    description: "Learn Web3 by shipping real projects with AI. Join the fam."
  },
  robots: "index, follow"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white antialiased">
        <Navbar />
        <div className="min-h-screen pt-16 md:pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
