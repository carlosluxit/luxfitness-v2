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
  mdOrder?: number; // desktop column position: 1=left 2=centre 3=right
};

/* ─── Fallback (hardcoded) membership plans ──────────────────────────────── */
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

/* ─── Personal Training offerings (structural — stays hardcoded) ─────────── */
const TRAINING = [
  {
    id: "individual",
    icon: User,
    name: "Individual",
    label: "1-on-1 sessions",
    highlighted: true,
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

interface MembershipsProps {
  memberships?: CMSMembership[];
}

// Desktop column positions for up to 3 plans (highlighted always centred)
const DESKTOP_ORDER = [2, 1, 3]; // index 0 (highlighted) → centre, rest → left/right

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
  // Sort highlighted first so it stacks on top in mobile
  plans.sort((a, b) => Number(b.highlighted) - Number(a.highlighted));
  // Assign desktop column order
  plans.forEach((p, i) => { p.mdOrder = DESKTOP_ORDER[i] ?? i + 1; });
  return plans;
}

export function Memberships({ memberships }: MembershipsProps) {
  const [active, setActive] = useState<Tab>("memberships");
  const plans = normaliseMemberships(memberships);

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Memberships"
            title="Choose Your Path"
            description="Flexible plans built around your commitment level and goals."
          />
        </AnimatedSection>

        {/* Tab switcher */}
        <AnimatedSection delay={0.1}>
          <div className="mt-10 flex items-center gap-1 p-1 border border-border rounded-full w-fit">
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

        {/* ── Memberships tab ── */}
        {active === "memberships" && (
          <StaggerContainer key="memberships" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan) => (
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

                    {/* Individual price */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-foreground/40 text-2xl font-bold">$</span>
                      <span className={clsx("text-5xl font-bold", plan.highlighted ? "text-accent" : "text-foreground")}>
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">/mo</span>
                    </div>

                    {/* Couples price */}
                    {plan.couplePrice > 0 && (
                      <p className="mt-1.5 text-xs text-muted-foreground/60">
                        Couples: ${plan.couplePrice}/mo
                      </p>
                    )}

                    <div className={clsx("my-6 h-px", plan.highlighted ? "bg-gradient-to-r from-transparent via-accent/20 to-transparent" : "bg-border")} />

                    <div className="flex-1">
                      <ul className="space-y-3">
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

                    <div className="mt-8">
                      <Button href="/contact" variant={plan.highlighted ? "primary" : "outline"} className="w-full justify-center">
                        Get Started
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {/* ── Personal Training tab ── */}
        {active === "training" && (
          <StaggerContainer key="training" className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {TRAINING.map((plan) => {
              const Icon = plan.icon;
              return (
                <StaggerItem key={plan.id} className="h-full">
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
                      <Icon className={clsx("w-5 h-5 mb-4", plan.highlighted ? "text-accent" : "text-muted-foreground")} />
                      <h3 className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        {plan.name}
                      </h3>
                      <p className={clsx("mt-2 text-xs tracking-wide", plan.highlighted ? "text-accent" : "text-muted-foreground/50")}>
                        {plan.label}
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>

                      <div className={clsx("my-6 h-px", plan.highlighted ? "bg-gradient-to-r from-transparent via-accent/20 to-transparent" : "bg-border")} />

                      <div className="flex-1">
                        <ul className="space-y-3">
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

                      <div className="mt-8">
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
        )}
      </div>
    </section>
  );
}
