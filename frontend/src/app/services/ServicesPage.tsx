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
  ArrowRight,
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

const serviceImages = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
  "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
];

export function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              label="Services"
              title="Everything Under One Roof"
              description="A full-service wellness ecosystem. Every amenity, every service, every detail designed to support your goals."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="space-y-0">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon];
              const isEven = i % 2 === 0;
              return (
                <AnimatedSection key={service.id}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-border ${
                      i === SERVICES.length - 1 ? "border-b" : ""
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`relative min-h-[300px] lg:min-h-[400px] overflow-hidden ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                        style={{
                          backgroundImage: `url('${serviceImages[i]}')`,
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Content */}
                    <div
                      className={`flex flex-col justify-center p-8 md:p-12 lg:p-16 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-accent mb-6" />
                      <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                        {service.description}
                      </p>
                      <div className="mt-8">
                        <Button
                          href="/contact"
                          variant="ghost"
                          className="!px-0 gap-2 group"
                        >
                          <span>Book a Session</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
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
              label="Ready to Start?"
              title="Experience the LUX Difference"
              description="Book a tour to see our facility and discuss how we can support your fitness goals."
            />
            <div className="mt-10">
              <Button href="/contact" size="lg" showArrow>
                Book a Tour
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
