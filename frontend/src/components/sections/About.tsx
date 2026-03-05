"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Shield, Target, Users, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  "/images/eq1.png",
  "/images/eq2.png",
  "/images/eq3.png",
  "/images/eq4.png",
];

const INTERVAL = 4000; // ms between auto-advances

const pillars = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every detail of our facility is engineered for optimal performance and comfort.",
  },
  {
    icon: Shield,
    title: "Excellence",
    description:
      "Premium equipment, certified trainers, and uncompromising standards in everything we do.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A supportive environment where dedicated individuals push each other to be their best.",
  },
];

export function About() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, -1);
    setPaused(true);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 1);
    setPaused(true);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) {
      // Resume auto-advance after user interaction
      const resume = setTimeout(() => setPaused(false), 6000);
      return () => clearTimeout(resume);
    }
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Slider */}
          <AnimatedSection>
            <div className="relative aspect-[4/5] overflow-hidden group">
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${SLIDES[current]}')` }}
                />
              </AnimatePresence>

              {/* Subtle dark overlay */}
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent/40 pointer-events-none" />

              {/* Prev / Next arrows — visible on hover */}
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/60 border border-border/60 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-accent/50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-background/60 border border-border/60 backdrop-blur-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-accent/50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Go to image ${i + 1}`}
                    className="transition-all duration-300"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === current
                          ? "w-5 h-1 bg-accent"
                          : "w-1 h-1 bg-foreground/40 hover:bg-foreground/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection>
              <SectionHeading
                eyebrow="Our Philosophy"
                title="Built on Passion, Driven by Results"
                description="At LUX Fitness, we believe fitness goes beyond routine. It becomes a lifestyle. Our facility is designed to elevate every aspect of your training experience."
                align="left"
              />
              {/* Thin horizontal gold line separator */}
              <div className="mt-6 h-px w-16 bg-accent/60" />
            </AnimatedSection>

            <div className="mt-12 space-y-8">
              {pillars.map((pillar, i) => (
                <AnimatedSection key={pillar.title} delay={0.1 * (i + 1)}>
                  <div className="flex gap-5 group">
                    <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0 transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_12px_rgba(196,163,90,0.15)]">
                      <pillar.icon className="w-4 h-4 text-accent transition-all duration-500 group-hover:text-accent-hover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.5}>
              <div className="mt-12">
                <Button href="/about" variant="outline">
                  Learn More
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
