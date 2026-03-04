import Link from "next/link";
import {
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { SITE_CONFIG, NAV_LINKS, HOURS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Footer */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-light tracking-[0.3em] uppercase text-foreground"
            >
              LUX
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Montreal&apos;s premier luxury fitness destination. Where
              performance meets refinement.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-[-2px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-3"
                >
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-3"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=5005+Boulevard+Metropolitain+E+Saint-Leonard+QC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-start gap-3"
                >
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  {SITE_CONFIG.address}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-foreground font-medium mb-6">
              Hours
            </h3>
            <ul className="space-y-3">
              {HOURS.map((h) => (
                <li
                  key={h.day}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-foreground">{h.day}</span>
                    <br />
                    {h.hours}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} LUX Fitness. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted hover:text-muted-foreground transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted hover:text-muted-foreground transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
