"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

const images = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    alt: "Modern gym equipment",
    className: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    alt: "Weight training area",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=80",
    alt: "Boxing training",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    alt: "Functional training zone",
    className: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
    alt: "Premium gym interior",
    className: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&q=80",
    alt: "Recovery area",
    className: "col-span-1 row-span-1",
  },
];

export function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            label="Our Space"
            title="Designed for Performance"
            description="Every corner of our facility is purposefully crafted to inspire focus, drive, and results."
          />
        </AnimatedSection>

        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-2">
          {images.map((img, i) => (
            <StaggerItem key={i} className={img.className}>
              <div className="relative w-full h-full min-h-[200px] md:min-h-[260px] overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${img.src}')` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
