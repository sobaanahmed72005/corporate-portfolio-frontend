/**
 * Single source of truth for company identity/contact info.
 * Edit these values directly — every page pulls from here.
 * PLACEHOLDER values below must be replaced with real details before launch.
 */
export const company = {
  name: "IT Solutions Trade & Service",
  shortName: "IT Solutions",
  tagline: "Your Trusted Partner for IT Accessories, Security & Solar Solutions",
  description:
    "IT Solutions Trade & Service supplies and installs IT accessories, CCTV security systems, solar power solutions, and networking equipment for homes and businesses across Pakistan.",
  phone: "+92 300 0000000", // PLACEHOLDER — replace with real number
  whatsapp: "+923000000000", // PLACEHOLDER — digits only, no spaces, for wa.me links
  email: "info@example.com", // PLACEHOLDER — replace with real email
  address: {
    line1: "Shop/Office Address Line 1", // PLACEHOLDER
    city: "City",
    country: "Pakistan",
  },
  // PLACEHOLDER — replace with the real storefront URL once available.
  storeUrl: "https://store.example.com",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  foundingYear: 2024,
} as const;
