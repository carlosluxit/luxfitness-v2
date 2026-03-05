import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";
import { getSiteSettings } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LUX Fitness. Book a tour, ask about memberships, or visit us at 5005 Boulevard Metropolitain E, Saint-Leonard, QC.",
};

export default async function Page() {
  const siteSettings = await getSiteSettings();
  return <ContactPage siteSettings={siteSettings} />;
}
