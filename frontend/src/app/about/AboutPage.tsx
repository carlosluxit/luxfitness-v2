"use client";

import { Award, Users, Target, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import type { CMSTeamMember, CMSSiteSettings } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi/helpers";

// Local coach photos in display order — used when CMS has no photo uploaded yet
// Order must match the `order` field in Strapi (0, 1, 2, 3)
const coachLocalPhotos = [
  "/images/coach_karim.png",
  "/images/coach_terry.png",
  "/images/coach_padilla.png",
  "/images/coach_4.png",
];

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

interface AboutPageProps {
  teamMembers: CMSTeamMember[];
  siteSettings?: CMSSiteSettings;
}

export function AboutPage({ teamMembers, siteSettings }: AboutPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Story"
              title="Built on Passion, Driven by Results"
              description="LUX Fitness was born from a simple belief: fitness should be an experience, not just a routine. We set out to create a space that elevates every aspect of your wellness journey."
              size="large"
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
                    backgroundImage: "url('/images/gym-1.avif')",
                  }}
                />
                <div className="absolute bottom-0 left-0 w-full h-px bg-accent/40" />
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

            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Values"
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
              eyebrow="The Team"
              title="Meet Your Coaches"
              description="Certified professionals dedicated to your success. Every trainer at LUX brings expertise, passion, and a commitment to helping you reach your potential."
            />
          </AnimatedSection>

          <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(teamMembers ?? []).map((member, i) => {
              const photoUrl = strapiMediaUrl(member.photo) || coachLocalPhotos[i] || "/images/coach_4.png";
              return (
                <StaggerItem key={member.id}>
                  <div className="group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${photoUrl}')` }}
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
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
