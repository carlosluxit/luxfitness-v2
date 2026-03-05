"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import BlurText from "@/components/reactbits/TextAnimations/BlurText";
import ShinyText from "@/components/reactbits/TextAnimations/ShinyText";

const ease = [0.16, 1, 0.3, 1] as const;

export function CTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/gym-2.avif')" }}
        />
        <div className="absolute inset-0 bg-black/75" />
        {/* Subtle radial glow behind content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,163,90,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-center"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Eyebrow with shiny effect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <ShinyText
            text="Start Today"
            speed={3}
            className="text-[11px] tracking-[0.25em] uppercase mb-6 md:mb-8 inline-block"
            color="#7a7a76"
            shineColor="#c4a35a"
            spread={120}
          />
        </motion.div>

        {/* Main heading with BlurText */}
        <BlurText
          text="Your Best Self Starts Here"
          delay={100}
          animateBy="words"
          direction="bottom"
          className="text-fluid-display text-foreground justify-center"
          stepDuration={0.5}
          easing={[0.16, 1, 0.3, 1]}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-6 text-[15px] text-muted-foreground leading-[1.7] max-w-lg mx-auto"
        >
          Join Montreal&apos;s most refined fitness community. Book a tour and
          experience the LUX difference firsthand.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button href="/contact">Book a Tour</Button>
          <Button href="/memberships" variant="outline">
            See Plans
          </Button>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3, ease }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-center"
      />
    </section>
  );
}
