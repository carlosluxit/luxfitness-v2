"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

const stats = [
  { value: "15,000+", label: "Sq. Ft. Facility" },
  { value: "50+", label: "Pieces of Equipment" },
  { value: "8+", label: "Expert Trainers" },
  { value: "1,000+", label: "Active Members" },
];

export function Stats() {
  return (
    <section className="py-16 md:py-20 border-y border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-light text-accent tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
