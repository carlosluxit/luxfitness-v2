import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LUX Fitness - Montreal's premier luxury gym in Saint-Leonard. Our story, our team, and our commitment to excellence.",
};

export default function Page() {
  return <AboutPage />;
}
