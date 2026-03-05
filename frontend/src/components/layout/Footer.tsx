import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, HOURS } from "@/lib/constants";
import type { CMSSiteSettings } from "@/lib/strapi";

interface FooterProps {
  siteSettings?: CMSSiteSettings;
}

export function Footer({ siteSettings }: FooterProps) {
  const phone = siteSettings?.phone || SITE_CONFIG.phone;
  const email = siteSettings?.email || SITE_CONFIG.email;
  const address = siteSettings?.address || SITE_CONFIG.address;
  const instagram = siteSettings?.instagram || SITE_CONFIG.instagram;
  const hours = siteSettings?.hours || [...HOURS];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Footer */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="relative w-[100px] h-[44px] block">
              <Image
                src="/images/logo.png"
                alt="LUX Fitness"
                fill
                className="object-contain"
              />
            </Link>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Montreal&apos;s premier fitness destination. Where performance
              meets refinement.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 flex items-center gap-3"
                >
                  <Phone className="w-3.5 h-3.5 text-accent/60 shrink-0" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 flex items-center gap-3"
                >
                  <Mail className="w-3.5 h-3.5 text-accent/60 shrink-0" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=5005+Boulevard+Metropolitain+E+Saint-Leonard+QC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 flex items-start gap-3"
                >
                  <MapPin className="w-3.5 h-3.5 text-accent/60 shrink-0 mt-0.5" />
                  {address}
                </a>
              </li>
              <li>
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-500 flex items-center gap-3"
                >
                  <Instagram className="w-3.5 h-3.5 text-accent/60 shrink-0" />
                  @luxfitnessmtl
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Hours
            </h3>
            <ul className="space-y-3">
              {hours.map((h) => (
                <li key={h.day} className="text-sm text-muted-foreground">
                  <span className="text-foreground/80">{h.day}</span>
                  <br />
                  {h.hours}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground/50">
            &copy; {new Date().getFullYear()} LUX Fitness
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-500"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-500"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
