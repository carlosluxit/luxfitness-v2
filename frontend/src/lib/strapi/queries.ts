import { strapiGet } from "./client";
import { normalizeCollection, normalizeSingle } from "./helpers";
import { SERVICES, MEMBERSHIP_PLANS, HOURS, SITE_CONFIG } from "@/lib/constants";
import type {
  CMSService,
  CMSMembership,
  CMSTestimonial,
  CMSTeamMember,
  CMSSiteSettings,
  StrapiResponse,
} from "./types";

/* ─── Services ─── */

export async function getServices(): Promise<CMSService[]> {
  try {
    const res = await strapiGet<StrapiResponse<CMSService[]>>({
      path: "/services",
      params: { populate: "image", sort: "order:asc", status: "published" },
    });

    const data = normalizeCollection(res);
    if (data.length > 0) return data;
  } catch {
    // fall through to hardcoded fallback
  }

  // Fallback to hardcoded constants
  return SERVICES.map((s, i) => ({
    id: i + 1,
    title: s.title,
    slug: s.id,
    description: s.description,
    icon: s.icon,
    order: i,
  }));
}

/* ─── Memberships ─── */

export async function getMemberships(): Promise<CMSMembership[]> {
  const res = await strapiGet<StrapiResponse<CMSMembership[]>>({
    path: "/memberships",
    params: { sort: "order:asc", status: "published" },
  });

  const data = normalizeCollection(res);
  if (data.length > 0) return data;

  return MEMBERSHIP_PLANS.map((p, i) => ({
    id: i + 1,
    name: p.name,
    slug: p.id,
    price: p.price,
    interval: p.interval as "month" | "year",
    description: p.description,
    features: [...p.features],
    highlighted: p.highlighted,
    order: i,
  }));
}

/* ─── Testimonials ─── */

const FALLBACK_TESTIMONIALS: CMSTestimonial[] = [
  {
    id: 1,
    name: "Marc-Antoine L.",
    role: "Member since 2024",
    text: "The atmosphere at LUX is unlike anything else in Montreal. The equipment is pristine, the trainers are knowledgeable, and the overall experience is truly premium.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophie B.",
    role: "Premium Member",
    text: "I've been to gyms across the city, but LUX is in a league of its own. The attention to detail, the cleanliness, and the personal training programs have transformed my routine.",
    rating: 5,
  },
  {
    id: 3,
    name: "David R.",
    role: "Elite Member",
    text: "From the boxing area to the barbershop, everything feels curated. It's not just a gym, it's a lifestyle upgrade. Worth every dollar of the membership.",
    rating: 5,
  },
];

export async function getTestimonials(): Promise<CMSTestimonial[]> {
  try {
    const res = await strapiGet<StrapiResponse<CMSTestimonial[]>>({
      path: "/testimonials",
      params: { populate: "avatar", status: "published" },
    });

    const data = normalizeCollection(res);
    if (data.length > 0) return data;
  } catch {
    // fall through to hardcoded fallback
  }

  return FALLBACK_TESTIMONIALS;
}

/* ─── Team Members ─── */

const FALLBACK_TEAM: CMSTeamMember[] = [
  { id: 1, name: "Karim",   role: "Head Trainer", order: 0 },
  { id: 2, name: "Terry",   role: "Certified Personal Trainer", order: 1 },
  { id: 3, name: "Padilla", role: "Boxing Coach", order: 2 },
  { id: 4, name: "Coach",   role: "Personal Trainer", order: 3 },
];

export async function getTeamMembers(): Promise<CMSTeamMember[]> {
  try {
    const res = await strapiGet<StrapiResponse<CMSTeamMember[]>>({
      path: "/team-members",
      params: { populate: "photo", sort: "order:asc", status: "published" },
    });

    const data = normalizeCollection(res);
    if (data.length > 0) return data;
  } catch {
    // fall through to hardcoded fallback
  }

  return FALLBACK_TEAM;
}

/* ─── Site Settings (single type) ─── */

export async function getSiteSettings(): Promise<CMSSiteSettings> {
  try {
    const res = await strapiGet<StrapiResponse<CMSSiteSettings>>({
      path: "/site-setting",
      params: { populate: "*" },
      revalidate: 300,
    });

    const data = normalizeSingle(res);
    if (data) return data;
  } catch {
    // fall through to hardcoded fallback
  }

  // Fallback to constants
  return {
    id: 0,
    siteName: SITE_CONFIG.name,
    tagline: SITE_CONFIG.tagline,
    description: SITE_CONFIG.description,
    phone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: SITE_CONFIG.address,
    instagram: SITE_CONFIG.instagram,
    hours: [...HOURS],
  };
}
