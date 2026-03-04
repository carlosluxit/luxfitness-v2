"use client";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    name: "Marc-Antoine L.",
    role: "Member since 2024",
    text: "The atmosphere at LUX is unlike anything else in Montreal. The equipment is pristine, the trainers are knowledgeable, and the overall experience is truly premium.",
    rating: 5,
  },
  {
    name: "Sophie B.",
    role: "Premium Member",
    text: "I've been to gyms across the city, but LUX is in a league of its own. The attention to detail, the cleanliness, and the personal training programs have transformed my routine.",
    rating: 5,
  },
  {
    name: "David R.",
    role: "Elite Member",
    text: "From the boxing area to the barbershop, everything feels curated. It's not just a gym, it's a lifestyle upgrade. Worth every dollar of the membership.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            label="Testimonials"
            title="What Our Members Say"
          />
        </AnimatedSection>

        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="p-8 md:p-10 border border-border h-full flex flex-col hover:border-muted transition-colors duration-500">
                <Quote className="w-5 h-5 text-accent mb-6" />
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {t.text}
                </p>
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
