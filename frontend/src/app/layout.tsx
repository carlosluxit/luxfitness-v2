import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi/helpers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "LUX Fitness | Montreal's Premier Luxury Gym",
    template: "%s | LUX Fitness",
  },
  description:
    "Montreal's premier luxury fitness center in Saint-Leonard. State-of-the-art equipment, personalized training, boxing, physiotherapy, barbershop, and more.",
  keywords: [
    "luxury gym Montreal",
    "premium fitness Saint-Leonard",
    "personal training Montreal",
    "boxing gym Montreal",
    "LUX Fitness",
    "gym Montreal",
    "fitness centre Saint-Leonard",
  ],
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Navbar logoUrl={strapiMediaUrl(siteSettings?.logo) ?? undefined} />
        <main>{children}</main>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
