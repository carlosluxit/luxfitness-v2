"use client";

import { Check, X } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";

const comparisonFeatures = [
  { name: "Gym access", essential: true, premium: true, elite: true },
  { name: "Locker room & showers", essential: true, premium: true, elite: true },
  { name: "Mobile app", essential: true, premium: true, elite: true },
  { name: "Personal training sessions", essential: false, premium: "2/month", elite: "Unlimited" },
  { name: "Group classes", essential: false, premium: true, elite: true },
  { name: "Towel service", essential: false, premium: true, elite: true },
  { name: "Guest passes", essential: false, premium: "1/month", elite: "Unlimited" },
  { name: "Supplement store discount", essential: false, premium: "10%", elite: "20%" },
  { name: "Barbershop visits", essential: false, premium: false, elite: true },
  { name: "Nutrition consultation", essential: false, premium: false, elite: true },
  { name: "Priority class booking", essential: false, premium: false, elite: true },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="w-4 h-4 text-accent mx-auto" />
  ) : (
    <X className="w-4 h-4 text-muted/40 mx-auto" />
  );
}

export function MembershipsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              label="Memberships"
              title="Invest in Yourself"
              description="Flexible plans built around your goals. Every membership includes access to Montreal's most refined fitness facility."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-light text-foreground">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{plan.interval}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

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

                  <div className="mt-10">
                    <Button
                      href="/contact"
                      variant={plan.highlighted ? "primary" : "secondary"}
                      className="w-full"
                      showArrow
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

      {/* Comparison Table */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading label="Compare" title="Find Your Perfect Fit" />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mt-16 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 pr-4 text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium">
                      Feature
                    </th>
                    {MEMBERSHIP_PLANS.map((plan) => (
                      <th
                        key={plan.id}
                        className={clsx(
                          "py-4 px-4 text-center text-xs tracking-[0.15em] uppercase font-medium",
                          plan.highlighted
                            ? "text-accent"
                            : "text-muted-foreground"
                        )}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-b border-border/50"
                    >
                      <td className="py-4 pr-4 text-sm text-muted-foreground">
                        {feature.name}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <FeatureCell value={feature.essential} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <FeatureCell value={feature.premium} />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <FeatureCell value={feature.elite} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <SectionHeading
              label="Questions?"
              title="Let's Find Your Plan"
              description="Not sure which membership is right for you? Book a tour and our team will help you choose the perfect fit."
            />
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" size="lg" showArrow>
                Book a Tour
              </Button>
              <Button href="tel:5142460589" variant="secondary" size="lg">
                Call Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
