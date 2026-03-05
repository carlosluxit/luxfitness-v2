import type { Metadata } from "next";
import { MembershipsPage } from "./MembershipsPage";
import { getMemberships } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Choose your LUX Fitness membership. Gym memberships and personal training plans built around your goals.",
};

export default async function Page() {
  const memberships = await getMemberships();
  return <MembershipsPage memberships={memberships} />;
}
