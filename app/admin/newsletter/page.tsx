import { redirect } from "next/navigation";

export default function AdminNewsletterIndexPage() {
  redirect("/admin/newsletter/compose");
}
