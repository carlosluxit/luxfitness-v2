"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { CMSTestimonial } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi/helpers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

interface TestimonialsProps {
  testimonials: CMSTestimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-24 md:py-32 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Members Say"
          />
        </AnimatedSection>

        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {(testimonials ?? []).map((t) => (
            <StaggerItem key={t.name}>
              <div className="relative group h-full flex flex-col bg-surface-elevated/50 border border-border hover:border-accent/20 transition-all duration-500 hover:bg-[linear-gradient(to_bottom,rgba(196,163,90,0.03),transparent_60%)] rounded-sm overflow-hidden">
                {/* Gold accent line at top */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

                <div className="p-8 md:p-10 flex flex-col flex-1">
                  {/* Decorative large quote mark */}
                  <div className="relative mb-6">
                    <Quote className="w-10 h-10 text-accent/10 absolute -top-1 -left-1" />
                    <Quote className="w-5 h-5 text-accent/40 relative z-10" />
                  </div>

                  {/* Testimonial text */}
                  <p className="text-[15px] text-muted-foreground leading-[1.8] flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author section */}
                  <div className="mt-8 pt-6 border-t border-border group-hover:border-accent/10 transition-colors duration-500">
                    {/* Star rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Avatar + Name + Role */}
                    <div className="flex items-center gap-3">
                      {/* Avatar image or initials fallback */}
                      <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-border bg-surface-elevated">
                        {strapiMediaUrl(t.avatar) ? (
                          <Image
                            src={strapiMediaUrl(t.avatar)!}
                            alt={t.avatar?.alternativeText || t.name}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-[11px] font-semibold text-accent">
                            {t.name
                              .split(" ")
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground tracking-wide">
                          {t.name}
                        </p>
                        <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground mt-0.5">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
