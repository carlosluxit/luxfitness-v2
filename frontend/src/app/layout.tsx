import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LUX Fitness | Montreal's Premier Luxury Gym",
    template: "%s | LUX Fitness",
  },
  description:
    "Montreal's premier luxury fitness destination in Saint-Leonard. State-of-the-art equipment, personalized training, boxing, physiotherapy, barbershop, and more.",
  keywords: [
    "luxury gym Montreal",
    "premium fitness Saint-Leonard",
    "personal training Montreal",
    "boxing gym Montreal",
    "LUX Fitness",
    "gym Montreal",
    "fitness centre Saint-Leonard",
  ],
  openGraph: {
    title: "LUX Fitness | Montreal's Premier Luxury Gym",
    description:
      "Where performance meets refinement. State-of-the-art equipment, personalized training, and a holistic approach to wellness.",
    url: "https://www.luxfitness.ca",
    siteName: "LUX Fitness",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
