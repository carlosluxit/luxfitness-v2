"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { clsx } from "clsx";
import DecryptedText from "@/components/reactbits/TextAnimations/DecryptedText";

const ease = [0.16, 1, 0.3, 1] as const;

interface NavbarProps {
  logoUrl?: string;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── iOS Notch / Safe-Area Cover ────────────────────────────────────────
          A razor-thin strip that sits at the absolute top of the screen and
          fills exactly the safe-area-inset-top zone with solid #060606.
          z-[9999] guarantees nothing — no Framer Motion layer, no modal, no
          scroll compositor — can ever bleed content through the notch.
          pointer-events-none so it never swallows taps. */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 pointer-events-none z-[9999]"
        style={{
          height: "env(safe-area-inset-top)",
          background: "#060606",
        }}
      />

      <nav
        style={{
          paddingTop: "env(safe-area-inset-top)",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 bg-[#060606]",
          "transition-[border-color] duration-700",
          scrolled && "border-b border-border"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="block shrink-0">
              <Image
                src={logoUrl ?? "/images/logo.png"}
                alt="LUX Fitness"
                width={120}
                height={54}
                className="object-contain h-[54px] w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav — centered */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-500",
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <DecryptedText
                    text={link.label.toUpperCase()}
                    animateOn="hover"
                    speed={50}
                    maxIterations={10}
                    sequential={true}
                    revealDirection="start"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    className="tracking-[0.15em]"
                    encryptedClassName="tracking-[0.15em] text-muted-foreground"
                    parentClassName="cursor-pointer"
                  />
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                href="/contact"
                className="inline-flex items-center border border-border hover:border-accent/60 px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-all duration-500"
              >
                <DecryptedText
                  text="BOOK A TOUR"
                  animateOn="hover"
                  speed={50}
                  maxIterations={10}
                  sequential={true}
                  revealDirection="start"
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  className="tracking-[0.15em]"
                  encryptedClassName="tracking-[0.15em] text-accent/40"
                  parentClassName="cursor-pointer"
                />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-foreground p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-sm flex flex-col justify-end pb-20 px-6"
          >
            <nav className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease }}
                >
                  <Link
                    href={link.href}
                    className={clsx(
                      "block py-3 text-fluid-display transition-colors duration-300",
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <Link
                href="/contact"
                className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground"
              >
                Book a Tour
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
