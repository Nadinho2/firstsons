import type { Metadata } from "next";
import { NewsletterComposePage } from "@/components/newsletter/NewsletterComposePage";

export const metadata: Metadata = {
  title: "Compose newsletter | First Sons",
  robots: "noindex, nofollow",
};

export default function AdminNewsletterComposePage() {
  return <NewsletterComposePage />;
}
