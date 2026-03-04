export const SITE_CONFIG = {
  name: "LUX Fitness",
  tagline: "Elevate Your Fitness Experience",
  description:
    "Montreal's premier luxury fitness destination. State-of-the-art equipment, personalized training, and holistic wellness in Saint-Leonard.",
  address: "5005 Boulevard Metropolitain E, Saint-Leonard, QC H1R 1Z7",
  phone: "(514) 246-0589",
  email: "info@luxfitness.ca",
  instagram: "https://www.instagram.com/luxfitnessmtl/",
  url: "https://www.luxfitness.ca",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/memberships", label: "Memberships" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    id: "gym",
    title: "State-of-the-Art Gym",
    description:
      "Premium Matrix equipment in a meticulously designed space. Every machine, every weight, every detail curated for peak performance.",
    icon: "Dumbbell" as const,
  },
  {
    id: "personal-training",
    title: "Personal Training",
    description:
      "One-on-one sessions with certified trainers who build programs around your goals, your body, your schedule.",
    icon: "UserCheck" as const,
  },
  {
    id: "boxing",
    title: "Boxing",
    description:
      "Dedicated boxing area with professional coaching. From technique fundamentals to competition-level training.",
    icon: "Swords" as const,
  },
  {
    id: "functional-training",
    title: "Functional Training",
    description:
      "Purpose-built zone for movement-based workouts that translate to real-world strength and mobility.",
    icon: "Activity" as const,
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    description:
      "In-house physical therapy services to prevent injury, accelerate recovery, and optimize your body's mechanics.",
    icon: "HeartPulse" as const,
  },
  {
    id: "barbershop",
    title: "Barbershop",
    description:
      "Walk out looking as sharp as you feel. Professional grooming services right inside the facility.",
    icon: "Scissors" as const,
  },
  {
    id: "supplement-store",
    title: "Supplement Store",
    description:
      "Curated selection of premium supplements. Expert guidance to fuel your training and recovery.",
    icon: "Pill" as const,
  },
  {
    id: "cafe",
    title: "Healthy Bar & Cafe",
    description:
      "Fresh smoothies, protein shakes, and wholesome meals. Fuel up before or refuel after your session.",
    icon: "Coffee" as const,
  },
] as const;

export const MEMBERSHIP_PLANS = [
  {
    id: "essential",
    name: "Essential",
    price: 49,
    interval: "month",
    description: "Full gym access for dedicated individuals.",
    features: [
      "Unlimited gym access",
      "Locker room & showers",
      "Free WiFi",
      "Mobile app access",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 89,
    interval: "month",
    description: "The complete LUX experience.",
    features: [
      "Everything in Essential",
      "2 personal training sessions/month",
      "Access to group classes",
      "Towel service",
      "10% off supplement store",
      "Guest pass (1/month)",
    ],
    highlighted: true,
  },
  {
    id: "elite",
    name: "Elite",
    price: 149,
    interval: "month",
    description: "For those who demand the absolute best.",
    features: [
      "Everything in Premium",
      "Unlimited personal training",
      "Priority class booking",
      "Complimentary barbershop visits",
      "20% off supplement store",
      "Unlimited guest passes",
      "Nutrition consultation",
    ],
    highlighted: false,
  },
] as const;

export const HOURS = [
  { day: "Monday - Friday", hours: "5:00 AM - 11:00 PM" },
  { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
  { day: "Sunday", hours: "8:00 AM - 8:00 PM" },
] as const;
