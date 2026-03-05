"use client";

import { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

const stats = [
  { value: "4,000", suffix: "+", label: "Sq. Ft. Facility" },
  { value: "50", suffix: "+", label: "Pieces of Equipment" },
  { value: "8", suffix: "+", label: "Expert Trainers" },
  { value: "1,000", suffix: "+", label: "Active Members" },
];

export function Stats() {
  return (
    <section className="py-16 md:py-24 border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0">
          {stats.map((stat, i) => (
            <StaggerItem
              key={stat.label}
              className={
                "text-center relative" +
                (i < stats.length - 1
                  ? " md:border-r md:border-border"
                  : "")
              }
            >
              <div className="flex items-baseline justify-center">
                <span className="text-5xl md:text-6xl font-semibold text-foreground tracking-tight">
                  {stat.value}
                </span>
                <span className="text-5xl md:text-6xl font-semibold text-accent tracking-tight ml-0.5">
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-3 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
