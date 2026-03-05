/* ─── Strapi generic response types ─── */

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  } | null;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/* ─── Content type interfaces (normalized) ─── */

export interface CMSService {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  icon: string;
  image?: StrapiMedia;
  order: number;
}

export interface CMSMembership {
  id: number;
  name: string;
  slug: string;
  price: number;
  couplePrice?: number | null;
  badge?: string | null;
  interval: "month" | "year";
  description?: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

export interface CMSTestimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: StrapiMedia;
}

export interface CMSTeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia;
  specialties?: string[];
  order: number;
}

export interface CMSSiteSettings {
  id: number;
  siteName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  logo?: StrapiMedia;
  heroImage?: StrapiMedia;
  aboutImage?: StrapiMedia;
  hours: Array<{ day: string; hours: string }>;
}
