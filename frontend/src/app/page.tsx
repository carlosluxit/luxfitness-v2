import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Memberships } from "@/components/sections/Memberships";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { getServices, getTestimonials, getSiteSettings, getMemberships } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi/helpers";

export default async function Home() {
  const [services, testimonials, siteSettings, memberships] = await Promise.all([
    getServices(),
    getTestimonials(),
    getSiteSettings(),
    getMemberships(),
  ]);

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <Stats />
      <About />
      <Services services={services} />
      <Memberships memberships={memberships} />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  );
}
