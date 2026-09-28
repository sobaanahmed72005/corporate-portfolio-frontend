import type { CompanyInfo, ThemeSettings, HeroSlide } from "@/lib/cms-types";

/**
 * Bulletproof fallback fixtures for CMS entities.
 * Used whenever Strapi is unreachable, cold-starting, or content collections are unpopulated.
 * Guarantees zero downtime and safe server rendering.
 */

export const DEFAULT_COMPANY: CompanyInfo = {
  name: "IT Solutions Trade & Service Pvt. Ltd.",
  shortName: "IT Solutions",
  tagline: "Your Trusted Partner for IT Accessories, Security & Solar Solutions",
  description:
    "IT Solutions Trade & Service Pvt. Ltd. supplies and installs IT accessories, CCTV security systems, solar power solutions, and networking equipment for homes and businesses across Pakistan.",
  phone: "+92 300 6996443",
  whatsapp: "+923006996443",
  email: "itsolutions543@gmail.com",
  address: {
    line1: "Shop/Office Address Line 1",
    city: "City",
    country: "Pakistan",
  },
  storeUrl: "https://itsolutions.com.pk/",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  foundingYear: 2010,
};

export const DEFAULT_THEME: ThemeSettings = {
  brandColor: "#1E40AF",
  accentColor: "#6366F1",
  headerColor: "#FFFFFF",
  footerColor: "#F8FAFC",
  pageBackgroundColor: "#FFFFFF",
  cardColor: "#EFF6FF",
  buttonColor: "#2563EB",
  navHighlightColor: "#0EA5E9",
  headerTextColor: "#0F172A",
  footerTextColor: "#0F172A",
  pageTextColor: "#0F172A",
  cardTextColor: "#0F172A",
  sectionColor: "#EFF6FF",
  sectionTextColor: "#0F172A",
  contentCardColor: "#FFFFFF",
  contentCardTextColor: "#0F172A",
  fontPairing: "Single Family — Poppins",
  radiusStyle: "Soft (current default)",
  shadowStyle: "Subtle (current default)",
  showTrustedByLogos: true,
  showEventsSection: false,
};

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero-slides/cctv-security.jpg",
    alt: "Full range of CCTV security camera products",
    headline: "Complete CCTV Protection",
    subtext: "A full range of security camera systems for homes and businesses.",
    order: 1,
  },
  {
    src: "/hero-slides/networking.jpg",
    alt: "Wireless router connecting devices around a smart home",
    headline: "Seamless Connectivity",
    subtext: "Enterprise-grade networking gear for homes, offices, and businesses.",
    order: 2,
  },
  {
    src: "/hero-slides/laptop-hardware.jpg",
    alt: "Laptop hardware and accessories flat lay",
    headline: "Upgrade Your Setup",
    subtext: "Genuine laptop hardware and accessories to keep you running strong.",
    order: 3,
  },
  {
    src: "/hero-slides/multimedia-projectors.jpg",
    alt: "Multimedia projector in a corporate meeting room",
    headline: "Smart Presentation Solutions",
    subtext: "High-quality projectors for meetings, classrooms, and events.",
    order: 4,
  },
  {
    src: "/hero-slides/mobile-accessories.jpg",
    alt: "Smart mobile accessories built for your lifestyle",
    headline: "Smart Accessories",
    subtext: "High quality gadgets and accessories you can depend on, every day.",
    order: 5,
  },
  {
    src: "/hero-slides/solar-panels.jpg",
    alt: "Solar panel field with a city skyline",
    headline: "Power Your Future",
    subtext: "Reliable solar panels and inverters for homes and businesses across Pakistan.",
    order: 6,
  },
];
