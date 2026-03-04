"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <AnimatedSection>
          <span className="inline-block text-accent text-xs tracking-[0.3em] uppercase mb-6">
            Start Today
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1]">
            Your Best Self
            <br />
            Starts Here
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Join Montreal&apos;s most refined fitness community. Book a tour and
            experience the LUX difference firsthand.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg" showArrow>
              Book a Tour
            </Button>
            <Button href="/memberships" variant="secondary" size="lg">
              See Plans
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
