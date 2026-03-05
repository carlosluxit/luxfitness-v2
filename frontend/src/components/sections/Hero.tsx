"use client";

import { motion } from "motion/react";
import { MoveDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import BlurText from "@/components/reactbits/TextAnimations/BlurText";
import ShinyText from "@/components/reactbits/TextAnimations/ShinyText";
import RotatingText from "@/components/reactbits/TextAnimations/RotatingText";
import type { CMSSiteSettings } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi/helpers";

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroProps {
  siteSettings?: CMSSiteSettings;
}

export function Hero({ siteSettings }: HeroProps) {
  const posterUrl =
    strapiMediaUrl(siteSettings?.heroImage) ?? "/images/gym-2.avif";
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background Video — full screen, loops silently */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={posterUrl}
          >
            <source src="/images/video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* Strong base overlay to darken video */}
        <div className="absolute inset-0 bg-background/55" />
        {/* Bottom gradient: ensures text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-transparent" />
        {/* Left edge fade for content area */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />
      </div>

      {/* Decorative accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease }}
        className="absolute left-6 md:left-10 top-1/4 bottom-1/3 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent origin-top hidden md:block"
      />

      {/* Content — bottom-aligned, editorial layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-4xl">
          {/* Eyebrow with shiny sweep */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <ShinyText
              text="Montreal's Premier Fitness Destination"
              speed={4}
              className="text-[11px] tracking-[0.25em] uppercase font-semibold mb-6 md:mb-8 block [text-shadow:0_0_20px_rgba(196,163,90,0.5),0_0_40px_rgba(196,163,90,0.2)]"
              color="#c4a35a"
              shineColor="#e8e6e3"
              spread={120}
            />
          </motion.div>

          {/* Main title with BlurText + RotatingText */}
          <div className="text-fluid-hero text-foreground">
            <BlurText
              text="Elevate Your"
              delay={120}
              animateBy="words"
              direction="bottom"
              className="text-fluid-hero text-foreground !leading-[0.88]"
              stepDuration={0.5}
              easing={[0.16, 1, 0.3, 1]}
            />
            <div className="flex items-baseline">
              <RotatingText
                texts={["Standard", "Potential", "Lifestyle", "Ambition"]}
                rotationInterval={3000}
                mainClassName="text-fluid-hero text-accent !leading-[0.88] overflow-hidden inline-flex"
                elementLevelClassName="inline-block"
                splitLevelClassName="inline-flex"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                animatePresenceMode="wait"
                staggerDuration={0.02}
                staggerFrom="first"
              />
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease }}
            className="mt-8 md:mt-10 max-w-lg"
          >
            <p className="text-[15px] text-muted-foreground leading-[1.7]">
              Where performance meets refinement. State-of-the-art equipment,
              personalized training, and a holistic approach to wellness — all
              under one roof.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start gap-6"
          >
            <Button href="/memberships">View Memberships</Button>
            <Button href="/services" variant="outline">
              Explore Services
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MoveDown className="w-4 h-4 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
