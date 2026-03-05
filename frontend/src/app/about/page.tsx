import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";
import { getTeamMembers, getSiteSettings } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LUX Fitness - Montreal's premier luxury gym in Saint-Leonard. Our story, our team, and our commitment to excellence.",
};

export default async function Page() {
  const [teamMembers, siteSettings] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
  ]);

  return <AboutPage teamMembers={teamMembers} siteSettings={siteSettings} />;
}
