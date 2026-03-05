"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Shield, Target, Users } from "lucide-react";

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

interface AboutProps {
  imageSrc?: string;
}

export function About({ imageSrc }: AboutProps) {
  const bgImage = imageSrc ?? "/images/gym-3.avif";
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image with parallax */}
          <AnimatedSection>
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                className="absolute inset-[-10%] bg-cover bg-center"
                style={{
                  backgroundImage: `url('${bgImage}')`,
                  y: imageY,
                }}
              />
              {/* Dark overlay for readability and blend */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent/40" />
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
