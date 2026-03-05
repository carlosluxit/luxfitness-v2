"use client";

import TiltedCard from "@/components/reactbits/Components/TiltedCard";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Gallery images — one per key area of the facility
const images = [
  { src: "/images/gym-2.avif",  caption: "Gym" },
  { src: "/images/lux-8.jpg",   caption: "Personal Training" },
  { src: "/images/gym-1.avif",  caption: "Boxing" },
  { src: "/images/lux-6.jpg",   caption: "Physiotherapy" },
  { src: "/images/gym-5.avif",  caption: "Barbershop" },
  { src: "/images/gym-6.avif",  caption: "Supplement Store" },
  { src: "/images/gym-4.avif",  caption: "Café" },
];

function PillLabel({ text }: { text: string }) {
  return (
    <div className="p-3">
      <span className="inline-block bg-black/60 backdrop-blur-sm text-accent text-[9px] tracking-[0.14em] uppercase font-semibold px-3 py-1 rounded-full border border-accent/30">
        {text}
      </span>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Our Space"
            title="Designed for Performance"
            description="Every corner of our facility is purposefully crafted to inspire focus, drive, and results."
          />
        </AnimatedSection>

        {/* 4×2 on desktop · 2×4 on mobile */}
        <StaggerContainer className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {images.map((img, i) => (
            <StaggerItem key={i}>
              <div className="aspect-[4/3] w-full">
                <TiltedCard
                  imageSrc={img.src}
                  altText={img.caption}
                  captionText={img.caption}
                  containerWidth="100%"
                  containerHeight="100%"
                  imageWidth="100%"
                  imageHeight="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={<PillLabel text={img.caption} />}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
