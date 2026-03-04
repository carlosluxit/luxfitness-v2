"use client";

import { MapPin, Clock, Award, Users, Target, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { HOURS } from "@/lib/constants";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every detail of our facility is intentional. From equipment selection to lighting, nothing is left to chance.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in training, service, cleanliness, and member experience.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A network of driven individuals who inspire and push each other toward their personal best.",
  },
  {
    icon: Sparkles,
    title: "Holistic Wellness",
    description:
      "Fitness is more than exercise. We address training, recovery, nutrition, and personal care under one roof.",
  },
];

const team = [
  {
    name: "Coach Alex",
    role: "Head Trainer & Boxing Coach",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80",
  },
  {
    name: "Sarah M.",
    role: "Certified Personal Trainer",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  },
  {
    name: "David K.",
    role: "Physiotherapist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
  },
  {
    name: "Marco T.",
    role: "Strength & Conditioning",
    image:
      "https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=400&q=80",
  },
];

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              label="Our Story"
              title="Built on Passion, Driven by Results"
              description="LUX Fitness was born from a simple belief: fitness should be an experience, not just a routine. We set out to create a space that elevates every aspect of your wellness journey."
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-24 md:pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/5] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80')",
                  }}
                />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              </div>
            </AnimatedSection>

            <div>
              <AnimatedSection delay={0.2}>
                <p className="text-muted-foreground leading-relaxed">
                  Located in the heart of Saint-Leonard, Montreal, LUX Fitness is
                  more than a gym. It is a complete wellness destination designed
                  for those who refuse to settle for average.
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Our 15,000+ square foot facility houses state-of-the-art Matrix
                  equipment, a dedicated boxing zone, functional training area,
                  in-house physiotherapy, a barbershop, supplement store, and a
                  healthy cafe. Every corner is purposefully designed to support
                  your goals.
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Whether you are an elite athlete or just beginning your fitness
                  journey, our certified trainers and supportive community are here
                  to ensure you never train alone.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Location
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Saint-Leonard, Montreal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Open Daily
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {HOURS[0].hours}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              label="Our Values"
              title="What We Stand For"
            />
          </AnimatedSection>

          <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="bg-surface p-8 md:p-12 h-full">
                  <v.icon className="w-5 h-5 text-accent mb-6" />
                  <h3 className="text-lg font-light tracking-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              label="The Team"
              title="Meet Your Coaches"
              description="Certified professionals dedicated to your success. Every trainer at LUX brings expertise, passion, and a commitment to helping you reach your potential."
            />
          </AnimatedSection>

          <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${member.image}')` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
