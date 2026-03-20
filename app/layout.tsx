import type { Metadata, Viewport } from "next";
import React from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "First Sons — Web3 Academy for Complete Beginners",
    template: "%s | First Sons"
  },
  description:
    "Web3 academy for complete beginners: learn by shipping with Vibe Coding, automation, community ops, and on-chain basics—Discord-first, plain language.",
  keywords: ["Web3", "academy", "beginners", "Vibe Coding", "Discord", "First Sons", "crypto", "blockchain"],
  authors: [{ name: "First Sons" }],
  openGraph: {
    title: "First Sons — Web3 Academy for Complete Beginners",
    description:
      "Learn Web3 by shipping real projects with help from AI tools. Discord-first. No prior experience required.",
    type: "website"
    // Add when you have an image: images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "First Sons — Web3 Academy for Complete Beginners",
    description: "Learn Web3 by shipping real projects. Join the Discord group."
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
