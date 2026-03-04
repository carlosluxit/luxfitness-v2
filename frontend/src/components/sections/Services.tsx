"use client";

import {
  Dumbbell,
  UserCheck,
  Swords,
  Activity,
  HeartPulse,
  Scissors,
  Pill,
  Coffee,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

const iconMap = {
  Dumbbell,
  UserCheck,
  Swords,
  Activity,
  HeartPulse,
  Scissors,
  Pill,
  Coffee,
} as const;

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            label="What We Offer"
            title="A Complete Wellness Ecosystem"
            description="More than a gym. A full-service destination designed around every dimension of your fitness and wellbeing."
          />
        </AnimatedSection>

        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <StaggerItem key={service.id}>
                <div className="bg-surface p-8 md:p-10 h-full group hover:bg-surface-elevated transition-colors duration-500">
                  <Icon className="w-5 h-5 text-accent mb-6" />
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 text-center">
          <Button href="/services" variant="secondary" showArrow>
            All Services
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
