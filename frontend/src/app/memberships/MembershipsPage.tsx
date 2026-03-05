"use client";

import { useState } from "react";
import { Check, User, Users, Package } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { clsx } from "clsx";
import type { CMSMembership } from "@/lib/strapi";

/* ─── Normalised plan shape used for rendering ───────────────────────────── */
type Plan = {
  id: string;
  name: string;
  price: number;
  couplePrice: number;
  highlighted: boolean;
  badge: string | null;
  features: string[];
  mdOrder?: number; // desktop column: 1=left 2=centre 3=right
};

/* ─── Fallback membership plans ──────────────────────────────────────────── */
// Array order = mobile stacking order (highlighted first).
// mdOrder controls desktop column position so highlighted stays centred.
const MEMBERSHIPS_FALLBACK: Plan[] = [
  {
    id: "1yr",
    name: "1 Year",
    price: 100,
    couplePrice: 175,
    highlighted: true,
    badge: "Best Value",
    mdOrder: 2, // centre column on desktop
    features: [
      "Access 6 am – 10 pm",
      "1 ShapeScale 3D Body Scan / Month",
      "Full Hour Evaluation With a Trainer",
      "Personalized Workout & Nutrition Plan",
      "Reduced Personal Training Rates",
    ],
  },
  {
    id: "6mo",
    name: "6 Months",
    price: 125,
    couplePrice: 225,
    highlighted: false,
    badge: null,
    mdOrder: 3, // right column on desktop
    features: [
      "Access 6 am – 10 pm",
      "Full Hour Evaluation With a Trainer",
      "Reduced Personal Training Rates",
    ],
  },
  {
    id: "3mo",
    name: "3 Months",
    price: 150,
    couplePrice: 250,
    highlighted: false,
    badge: null,
    mdOrder: 1, // left column on desktop
    features: [
      "Access 6 am – 10 pm",
      "Reduced Personal Training Rates",
    ],
  },
];

/* ─── Personal Training (structural — stays hardcoded) ───────────────────── */
const TRAINING = [
  {
    id: "individual",
    icon: User,
    name: "Individual",
    label: "1-on-1 sessions",
    highlighted: true,
    mdOrder: 2, // centre column on desktop
    description:
      "Private sessions designed exclusively around your goals with a certified LUX trainer.",
    features: [
      "Dedicated certified trainer",
      "Custom program design",
      "Progress & body tracking",
      "Flexible scheduling",
    ],
  },
  {
    id: "group",
    icon: Users,
    name: "Group Training",
    label: "2 – 4 people",
    highlighted: false,
    mdOrder: 1, // left column on desktop
    description:
      "Train with friends or a partner and split the cost without sacrificing attention or quality.",
    features: [
      "Max 4 participants",
      "Shared & adapted program",
      "Team motivation",
      "Reduced rate per person",
    ],
  },
  {
    id: "bundle",
    icon: Package,
    name: "Session Bundles",
    label: "5 · 10 · 20 sessions",
    highlighted: false,
    mdOrder: 3, // right column on desktop
    description:
      "Pre-purchase session packs for maximum savings. The more you commit, the more you save.",
    features: [
      "5-session pack",
      "10-session pack",
      "20-session pack",
      "Sessions never expire",
    ],
  },
];

type Tab = "memberships" | "training";

const DESKTOP_ORDER = [2, 1, 3]; // highlighted first → centre; rest → left/right

function normaliseMemberships(cms?: CMSMembership[]): Plan[] {
  if (!cms?.length) return MEMBERSHIPS_FALLBACK;
  const plans: Plan[] = cms.map((m) => ({
    id: m.slug,
    name: m.name,
    price: m.price,
    couplePrice: m.couplePrice ?? 0,
    highlighted: m.highlighted,
    badge: m.badge ?? null,
    features: Array.isArray(m.features) ? m.features : [],
  }));
  plans.sort((a, b) => Number(b.highlighted) - Number(a.highlighted));
  plans.forEach((p, i) => { p.mdOrder = DESKTOP_ORDER[i] ?? i + 1; });
  return plans;
}

function PricingCards({ active, plans }: { active: Tab; plans: Plan[] }) {
  return (
    <StaggerContainer key={active} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-stretch">
      {active === "memberships"
        ? plans.map((plan) => (
            <StaggerItem
              key={plan.id}
              className={clsx(
                "h-full",
                plan.mdOrder === 1 ? "md:order-1" : plan.mdOrder === 3 ? "md:order-3" : "md:order-2"
              )}
            >
              <div
                className={clsx(
                  "relative h-full flex flex-col rounded-sm overflow-hidden transition-all duration-500 group",
                  plan.highlighted
                    ? "border border-accent/30 bg-[linear-gradient(to_bottom,rgba(196,163,90,0.06),rgba(196,163,90,0.01)_40%,transparent)] md:scale-105 md:-my-4 shadow-[0_0_40px_rgba(196,163,90,0.06)]"
                    : "border border-border hover:border-muted hover:-translate-y-1"
                )}
              >
                {plan.highlighted && (
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
                )}
                {plan.badge && (
                  <div className="absolute top-5 right-5">
                    <span className="inline-flex items-center bg-accent/10 border border-accent/20 text-accent text-[9px] tracking-[0.18em] uppercase font-medium px-3 py-1.5 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 pb-10 md:p-10 md:pb-12 flex flex-col flex-1">
                  <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {plan.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-foreground/40 text-2xl font-bold">$</span>
                    <span className={clsx("text-5xl md:text-6xl font-bold", plan.highlighted ? "text-accent" : "text-foreground")}>
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">/mo</span>
                  </div>
                  {plan.couplePrice > 0 && (
                    <p className="mt-1.5 text-xs text-muted-foreground/60">
                      Couples: ${plan.couplePrice}/mo
                    </p>
                  )}

                  <div className={clsx("my-8 h-px", plan.highlighted ? "bg-gradient-to-r from-transparent via-accent/20 to-transparent" : "bg-border")} />

                  <div className="flex-1">
                    <ul className="space-y-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className={clsx("mt-0.5 flex items-center justify-center w-4 h-4 rounded-full shrink-0", plan.highlighted ? "bg-accent/10" : "bg-border")}>
                            <Check className={clsx("w-2.5 h-2.5", plan.highlighted ? "text-accent" : "text-muted-foreground")} />
                          </span>
                          <span className="group-hover:text-foreground/70 transition-colors duration-300">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10">
                    <Button href="/contact" variant={plan.highlighted ? "primary" : "outline"} className="w-full justify-center">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))
        : TRAINING.map((plan) => {
            const Icon = plan.icon;
            return (
              <StaggerItem
                key={plan.id}
                className={clsx(
                  "h-full",
                  plan.mdOrder === 1 ? "md:order-1" : plan.mdOrder === 3 ? "md:order-3" : "md:order-2"
                )}
              >
                <div
                  className={clsx(
                    "relative h-full flex flex-col rounded-sm overflow-hidden transition-all duration-500 group",
                    plan.highlighted
                      ? "border border-accent/30 bg-[linear-gradient(to_bottom,rgba(196,163,90,0.06),rgba(196,163,90,0.01)_40%,transparent)] md:scale-105 md:-my-4 shadow-[0_0_40px_rgba(196,163,90,0.06)]"
                      : "border border-border hover:border-muted hover:-translate-y-1"
                  )}
                >
                  {plan.highlighted && (
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
                  )}

                  <div className="p-8 pb-10 md:p-10 md:pb-12 flex flex-col flex-1">
                    <Icon className={clsx("w-5 h-5 mb-5", plan.highlighted ? "text-accent" : "text-muted-foreground/50")} />
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {plan.name}
                    </h3>
                    <p className={clsx("mt-1.5 text-xs tracking-wide", plan.highlighted ? "text-accent" : "text-muted-foreground/50")}>
                      {plan.label}
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>

                    <div className={clsx("my-8 h-px", plan.highlighted ? "bg-gradient-to-r from-transparent via-accent/20 to-transparent" : "bg-border")} />

                    <div className="flex-1">
                      <ul className="space-y-4">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className={clsx("mt-0.5 flex items-center justify-center w-4 h-4 rounded-full shrink-0", plan.highlighted ? "bg-accent/10" : "bg-border")}>
                              <Check className={clsx("w-2.5 h-2.5", plan.highlighted ? "text-accent" : "text-muted-foreground")} />
                            </span>
                            <span className="group-hover:text-foreground/70 transition-colors duration-300">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-10">
                      <Button href="/contact" variant={plan.highlighted ? "primary" : "outline"} className="w-full justify-center">
                        Contact for Pricing
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
    </StaggerContainer>
  );
}

interface MembershipsPageProps {
  memberships?: CMSMembership[];
}

export function MembershipsPage({ memberships }: MembershipsPageProps) {
  const [active, setActive] = useState<Tab>("memberships");
  const plans = normaliseMemberships(memberships);

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Plans & Pricing"
              title="Invest in Yourself"
              description="Flexible gym memberships and personal training options built around your goals."
              size="large"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Tab switcher + Cards */}
      <section className="pb-32 md:pb-40 bg-background">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <div className="flex items-center gap-1 p-1 border border-border rounded-full w-fit">
              {(["memberships", "training"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={clsx(
                    "px-6 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase transition-all duration-300",
                    active === tab
                      ? "bg-accent text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "memberships" ? "Gym Membership" : "Personal Training"}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <PricingCards active={active} plans={plans} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Questions?"
              title="Let's Find Your Plan"
              description="Not sure which option is right for you? Book a tour and our team will walk you through everything."
              align="center"
            />
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button href="/contact">Book a Tour</Button>
              <Button href="tel:5142460589" variant="outline">Call Us</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
