"use client";

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

export function About() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative aspect-[4/5] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80')",
                }}
              />
              {/* Accent border */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection>
              <SectionHeading
                label="Our Philosophy"
                title="Built on Passion, Driven by Results"
                description="At LUX Fitness, we believe fitness goes beyond routine. It becomes a lifestyle. Our luxurious facility is designed to elevate every aspect of your training experience."
                align="left"
              />
            </AnimatedSection>

            <div className="mt-12 space-y-8">
              {pillars.map((pillar, i) => (
                <AnimatedSection key={pillar.title} delay={0.1 * (i + 1)}>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                      <pillar.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-foreground">
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
                <Button href="/about" variant="secondary" showArrow>
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
