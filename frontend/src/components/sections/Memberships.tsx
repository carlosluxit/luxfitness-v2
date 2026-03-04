"use client";

import { Check } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";

export function Memberships() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            label="Memberships"
            title="Choose Your Path"
            description="Flexible plans designed to match your commitment level. Every membership includes access to our world-class facility."
          />
        </AnimatedSection>

        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={clsx(
                  "relative p-8 md:p-10 h-full flex flex-col transition-colors duration-500",
                  plan.highlighted
                    ? "border border-accent bg-accent-dim"
                    : "border border-border hover:border-muted"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-8 bg-accent text-black text-[10px] tracking-[0.15em] uppercase font-medium px-3 py-1">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-light text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-8 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    href="/contact"
                    variant={plan.highlighted ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
