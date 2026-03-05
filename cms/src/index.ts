import type { Core } from "@strapi/strapi";

/* ─── Seed data ───────────────────────────────────────────────────────────── */

const SEED_SERVICES = [
  {
    title: "State-of-the-Art Gym",
    slug: "gym",
    description:
      "Premium Matrix equipment in a meticulously designed space. Every machine, every weight, every detail curated for peak performance.",
    icon: "Dumbbell",
    order: 0,
  },
  {
    title: "Personal Training",
    slug: "personal-training",
    description:
      "One-on-one sessions with certified trainers who build programs around your goals, your body, your schedule.",
    icon: "UserCheck",
    order: 1,
  },
  {
    title: "Boxing",
    slug: "boxing",
    description:
      "Dedicated boxing area with professional coaching. From technique fundamentals to competition-level training.",
    icon: "Swords",
    order: 2,
  },
  {
    title: "Functional Training",
    slug: "functional-training",
    description:
      "Purpose-built zone for movement-based workouts that translate to real-world strength and mobility.",
    icon: "Activity",
    order: 3,
  },
  {
    title: "Physiotherapy",
    slug: "physiotherapy",
    description:
      "In-house physical therapy services to prevent injury, accelerate recovery, and optimize your body's mechanics.",
    icon: "HeartPulse",
    order: 4,
  },
  {
    title: "Barbershop",
    slug: "barbershop",
    description:
      "Walk out looking as sharp as you feel. Professional grooming services right inside the facility.",
    icon: "Scissors",
    order: 5,
  },
  {
    title: "Supplement Store",
    slug: "supplement-store",
    description:
      "Curated selection of premium supplements. Expert guidance to fuel your training and recovery.",
    icon: "Pill",
    order: 6,
  },
  {
    title: "Healthy Bar & Café",
    slug: "cafe",
    description:
      "Fresh smoothies, protein shakes, and wholesome meals. Fuel up before or refuel after your session.",
    icon: "Coffee",
    order: 7,
  },
];

const SEED_MEMBERSHIPS: Array<{
  name: string;
  slug: string;
  price: number;
  couplePrice: number;
  badge: string | null;
  interval: "month" | "year";
  description: string;
  features: string[];
  highlighted: boolean;
  order: number;
}> = [
  {
    name: "3 Months",
    slug: "3-months",
    price: 150,
    couplePrice: 250,
    badge: null,
    interval: "month",
    description: "Commit for 3 months and unlock full gym access.",
    features: [
      "Access 6 am – 10 pm",
      "Reduced Personal Training Rates",
    ],
    highlighted: false,
    order: 0,
  },
  {
    name: "1 Year",
    slug: "1-year",
    price: 100,
    couplePrice: 175,
    badge: "Best Value",
    interval: "month",
    description: "The best value membership for serious athletes.",
    features: [
      "Access 6 am – 10 pm",
      "1 ShapeScale 3D Body Scan / Month",
      "Full Hour Evaluation With a Trainer",
      "Personalized Workout & Nutrition Plan",
      "Reduced Personal Training Rates",
    ],
    highlighted: true,
    order: 1,
  },
  {
    name: "6 Months",
    slug: "6-months",
    price: 125,
    couplePrice: 225,
    badge: null,
    interval: "month",
    description: "Six months of focused training at a great rate.",
    features: [
      "Access 6 am – 10 pm",
      "Full Hour Evaluation With a Trainer",
      "Reduced Personal Training Rates",
    ],
    highlighted: false,
    order: 2,
  },
];

const SEED_TESTIMONIALS = [
  {
    name: "Marc-Antoine L.",
    role: "Member since 2024",
    text: "The atmosphere at LUX is unlike anything else in Montreal. The equipment is pristine, the trainers are knowledgeable, and the overall experience is truly premium.",
    rating: 5,
  },
  {
    name: "Sophie B.",
    role: "Premium Member",
    text: "I've been to gyms across the city, but LUX is in a league of its own. The attention to detail, the cleanliness, and the personal training programs have transformed my routine.",
    rating: 5,
  },
  {
    name: "David R.",
    role: "Elite Member",
    text: "From the boxing area to the barbershop, everything feels curated. It's not just a gym, it's a lifestyle upgrade. Worth every dollar of the membership.",
    rating: 5,
  },
];

const SEED_TEAM_MEMBERS = [
  {
    name: "Coach Alex",
    role: "Head Trainer & Boxing Coach",
    bio: "10+ years of professional boxing and strength coaching. Certified by the NSCA with a passion for unlocking every athlete's potential.",
    specialties: ["Boxing", "Strength Training", "Athletic Performance"],
    order: 0,
  },
  {
    name: "Sarah M.",
    role: "Certified Personal Trainer",
    bio: "Specializing in body recomposition and functional fitness. BSc Kinesiology, CSEP-CPT certified, and dedicated to science-based programming.",
    specialties: ["Body Recomposition", "Functional Fitness", "Nutrition"],
    order: 1,
  },
  {
    name: "David K.",
    role: "Physiotherapist",
    bio: "Registered physiotherapist with a focus on sports rehabilitation and injury prevention. Helping members train smarter and recover faster.",
    specialties: ["Sports Rehab", "Injury Prevention", "Manual Therapy"],
    order: 2,
  },
  {
    name: "Marco T.",
    role: "Strength & Conditioning Coach",
    bio: "Former competitive powerlifter turned coach. CSCS certified, with expertise in progressive overload programming and competition prep.",
    specialties: ["Powerlifting", "Strength Programming", "Competition Prep"],
    order: 3,
  },
];

const SEED_SITE_SETTINGS = {
  siteName: "LUX Fitness",
  tagline: "Elevate Your Fitness Experience",
  description:
    "Montreal's premier luxury fitness destination. State-of-the-art equipment, personalized training, and holistic wellness in Saint-Leonard.",
  phone: "(514) 246-0589",
  email: "info@luxfitness.ca",
  address: "5005 Boulevard Metropolitain E, Saint-Leonard, QC H1R 1Z7",
  instagram: "https://www.instagram.com/luxfitnessmtl/",
  hours: [
    { day: "Monday - Friday", hours: "5:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "8:00 AM - 8:00 PM" },
  ],
};

/* ─── Bootstrap ────────────────────────────────────────────────────────────── */

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedServices(strapi);
    await seedMemberships(strapi);
    await seedTestimonials(strapi);
    await seedTeamMembers(strapi);
    await seedSiteSettings(strapi);
  },
};

/* ─── Seed functions ───────────────────────────────────────────────────────── */

async function seedServices(strapi: Core.Strapi) {
  try {
    const count = await strapi.db.query("api::service.service").count();
    if (count > 0) {
      console.log(`[Seed] Services already seeded (${count} found) — skipping`);
      return;
    }
    console.log("[Seed] Seeding services...");
    for (const item of SEED_SERVICES) {
      const doc = await strapi
        .documents("api::service.service")
        .create({ data: item });
      await strapi
        .documents("api::service.service")
        .publish({ documentId: doc.documentId });
    }
    console.log(`[Seed] ✓ Created & published ${SEED_SERVICES.length} services`);
  } catch (err) {
    console.warn("[Seed] Could not seed services:", err);
  }
}

async function seedMemberships(strapi: Core.Strapi) {
  try {
    const count = await strapi.db.query("api::membership.membership").count();
    if (count > 0) {
      console.log(`[Seed] Memberships already seeded (${count} found) — skipping`);
      return;
    }
    console.log("[Seed] Seeding memberships...");
    for (const item of SEED_MEMBERSHIPS) {
      const doc = await strapi
        .documents("api::membership.membership")
        .create({ data: item });
      await strapi
        .documents("api::membership.membership")
        .publish({ documentId: doc.documentId });
    }
    console.log(`[Seed] ✓ Created & published ${SEED_MEMBERSHIPS.length} memberships`);
  } catch (err) {
    console.warn("[Seed] Could not seed memberships:", err);
  }
}

async function seedTestimonials(strapi: Core.Strapi) {
  try {
    const count = await strapi.db.query("api::testimonial.testimonial").count();
    if (count > 0) {
      console.log(`[Seed] Testimonials already seeded (${count} found) — skipping`);
      return;
    }
    console.log("[Seed] Seeding testimonials...");
    for (const item of SEED_TESTIMONIALS) {
      const doc = await strapi
        .documents("api::testimonial.testimonial")
        .create({ data: item });
      await strapi
        .documents("api::testimonial.testimonial")
        .publish({ documentId: doc.documentId });
    }
    console.log(`[Seed] ✓ Created & published ${SEED_TESTIMONIALS.length} testimonials`);
  } catch (err) {
    console.warn("[Seed] Could not seed testimonials:", err);
  }
}

async function seedTeamMembers(strapi: Core.Strapi) {
  try {
    const count = await strapi.db.query("api::team-member.team-member").count();
    if (count > 0) {
      console.log(`[Seed] Team members already seeded (${count} found) — skipping`);
      return;
    }
    console.log("[Seed] Seeding team members...");
    for (const item of SEED_TEAM_MEMBERS) {
      const doc = await strapi
        .documents("api::team-member.team-member")
        .create({ data: item });
      await strapi
        .documents("api::team-member.team-member")
        .publish({ documentId: doc.documentId });
    }
    console.log(`[Seed] ✓ Created & published ${SEED_TEAM_MEMBERS.length} team members`);
  } catch (err) {
    console.warn("[Seed] Could not seed team members:", err);
  }
}

async function seedSiteSettings(strapi: Core.Strapi) {
  try {
    const count = await strapi.db
      .query("api::site-setting.site-setting")
      .count();
    if (count > 0) {
      console.log("[Seed] Site settings already seeded — skipping");
      return;
    }
    console.log("[Seed] Seeding site settings...");
    // Single type with draftAndPublish: false — no publish step needed
    await strapi
      .documents("api::site-setting.site-setting")
      .create({ data: SEED_SITE_SETTINGS });
    console.log("[Seed] ✓ Created site settings");
  } catch (err) {
    console.warn("[Seed] Could not seed site settings:", err);
  }
}
