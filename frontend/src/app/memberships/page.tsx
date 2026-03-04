import type { Metadata } from "next";
import { MembershipsPage } from "./MembershipsPage";

export const metadata: Metadata = {
  title: "Memberships",
  description:
    "Choose your LUX Fitness membership. Essential, Premium, and Elite plans with personalized training, group classes, and premium amenities.",
};

export default function Page() {
  return <MembershipsPage />;
}
