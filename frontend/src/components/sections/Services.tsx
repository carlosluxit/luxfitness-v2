"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dumbbell,
  UserCheck,
  HandFist,
  Activity,
  HeartPulse,
  Scissors,
  Pill,
  Coffee,
} from "lucide-react";
import type { CMSService } from "@/lib/strapi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  UserCheck,
  HandFist,
  Swords: HandFist, // legacy fallback
  Activity,
  HeartPulse,
  Scissors,
  Pill,
  Coffee,
};

// One photo per service — order matches CMS order
const SERVICE_IMAGES = [
  "/images/snap-equipment.png",         // State-of-the-Art Gym
  "/images/snap-personal-training.png", // Personal Training
  "/images/snap-boxing.png",            // Boxing
  "/images/snap-functional.png",        // Functional Training
  "/images/snap-physio.png",            // Physiotherapy
  "/images/snap-barbershop.png",        // Barbershop
  "/images/snap-supplements.png",       // Supplement Store
  "/images/snap-cafe.png",              // Healthy Café
];

// Focus point for each image so the key subject stays visible in the card crop
const SERVICE_FOCUS = [
  "center center", // State-of-the-Art Gym
  "center 15%",    // Personal Training  — show trainer + client faces
  "center 25%",    // Boxing             — centre on the boxing action
  "center 20%",    // Functional Training — show upper body + barbell
  "center 10%",    // Physiotherapy      — keep sign + face in frame
  "center 30%",    // Barbershop         — show barber's hands + client
  "center center", // Supplement Store
  "center center", // Healthy Café
];

interface ServicesProps {
  services: CMSService[];
}

export function Services({ services }: ServicesProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            eyebrow="What We Offer"
            title="A Complete Wellness Ecosystem"
            description="More than a gym. A full-service destination designed around every dimension of your fitness and wellbeing."
          />
        </AnimatedSection>

        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {(services ?? []).map((service, i) => {
            const Icon = iconMap[service.icon] || Dumbbell;
            const imgSrc = SERVICE_IMAGES[i] ?? SERVICE_IMAGES[0];
            const imgFocus = SERVICE_FOCUS[i] ?? "center center";
            const isActive = activeId === service.id;
            return (
              <StaggerItem key={service.id}>
                <div
                  className={clsx(
                    "group relative aspect-[3/4] overflow-hidden cursor-default transition-all duration-300",
                    isActive
                      ? "ring-1 ring-accent/60"
                      : "ring-0"
                  )}
                  onClick={() => setActiveId(isActive ? null : service.id)}
                >
                  {/* Photo */}
                  <Image
                    src={imgSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={clsx(
                      "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                      isActive && "scale-105"
                    )}
                    style={{ objectPosition: imgFocus }}
                  />

                  {/* Persistent gradient — keeps content legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Hover / active dim layer */}
                  <div className={clsx(
                    "absolute inset-0 bg-black/30 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )} />

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <Icon className="w-4 h-4 text-accent mb-2.5 opacity-90" />
                    <h3 className="text-sm font-semibold text-foreground tracking-wide leading-snug">
                      {service.title}
                    </h3>
                    {/* Description slides up on hover (desktop) or tap (mobile) */}
                    <div className={clsx(
                      "overflow-hidden transition-all duration-500 ease-out",
                      isActive ? "max-h-20" : "max-h-0 group-hover:max-h-20"
                    )}>
                      <p className="mt-1.5 text-xs text-foreground/55 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-12 text-center">
          <Button href="/services" variant="outline">
            All Services
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
