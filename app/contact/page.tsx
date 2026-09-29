import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = { title: "Contact — Julio Cesar" };

export default function Page() {
  return <ContactPage />;
}
