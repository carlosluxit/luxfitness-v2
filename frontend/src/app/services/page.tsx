import type { Metadata } from "next";
import { ServicesPage } from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore LUX Fitness services: state-of-the-art gym, personal training, boxing, functional training, physiotherapy, barbershop, supplement store, and healthy cafe.",
};

export default function Page() {
  return <ServicesPage />;
}
