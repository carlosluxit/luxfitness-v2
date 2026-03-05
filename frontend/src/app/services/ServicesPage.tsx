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
import type { CMSService } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi/helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  UserCheck,
  Swords,
  Activity,
  HeartPulse,
  Scissors,
  Pill,
  Coffee,
};

const fallbackImages: Record<string, string> = {
  gym: "/images/snap-equipment.png",
  "personal-training": "/images/snap-personal-training.png",
  boxing: "/images/snap-boxing.png",
  "functional-training": "/images/snap-functional.png",
  physiotherapy: "/images/snap-physio.png",
  barbershop: "/images/snap-barbershop.png",
  "supplement-store": "/images/snap-supplements.png",
  cafe: "/images/snap-cafe.png",
};

// Controls which part of each portrait photo is visible in the landscape container
const imageFocus: Record<string, string> = {
  gym:                  "center center",
  "personal-training":  "center 15%",
  boxing:               "center 25%",
  "functional-training":"center 20%",
  physiotherapy:        "center 10%",
  barbershop:           "center 30%",
  "supplement-store":   "center center",
  cafe:                 "center center",
};

interface ServicesPageProps {
  services: CMSService[];
}

export function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Services"
              title="Everything Under One Roof"
              description="A full-service wellness ecosystem. Every amenity, every service, every detail designed to support your goals."
              size="large"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="space-y-0">
            {(services ?? []).map((service, i) => {
              const Icon = iconMap[service.icon] || Dumbbell;
              const isEven = i % 2 === 0;
              const imageUrl =
                strapiMediaUrl(service.image) ||
                fallbackImages[service.slug] ||
                "/images/gym-2.avif";
              const focusPosition = imageFocus[service.slug] ?? "center center";
              return (
                <AnimatedSection key={service.id}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-border ${
                      i === services.length - 1 ? "border-b" : ""
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative min-h-[300px] lg:min-h-[400px] overflow-hidden ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover transition-transform duration-700 hover:scale-105"
                        style={{
                          backgroundImage: `url('${imageUrl}')`,
                          backgroundPosition: focusPosition,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/45" />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-accent mb-6" />
                      <h3 className="text-2xl md:text-3xl font-extralight tracking-tight text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Ready to Start?"
              title="Experience the LUX Difference"
              description="Book a tour to see our facility and discuss how we can support your fitness goals."
              align="center"
            />
            <div className="mt-10">
              <Button href="/contact">Book a Tour</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
