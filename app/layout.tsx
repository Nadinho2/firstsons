import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "First Sons — Web3 Academy for Complete Beginners",
  description:
    "First Sons is a Web3 academy for complete beginners. Learn AI-powered Vibe Coding, automation, community management, and on-chain skills by shipping real projects with AI."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020617] text-white antialiased">
        <SiteHeader />
        <div className="min-h-screen pt-16 md:pt-20">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}

