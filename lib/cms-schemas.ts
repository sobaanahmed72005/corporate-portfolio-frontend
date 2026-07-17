import { z, type ZodType } from "zod";

/**
 * Runtime shape validation for everything lib/cms.ts reads from Strapi.
 * `icon` fields are validated as plain strings, not against the IconName
 * union — components/ui/Icon.tsx falls back safely on an unrecognized icon
 * slug at render time, so this layer only needs to guarantee the CMS
 * response has the shape the rest of the app assumes (right fields, right
 * primitive types), not that every enum-like value is a currently-known one.
 */

export function strapiList<T extends ZodType>(item: T) {
  return z.object({ data: z.array(item) });
}

export function strapiSingle<T extends ZodType>(item: T) {
  return z.object({ data: item.nullable() });
}

export const mediaSchema = z.object({ url: z.string() }).nullable();

export const companyInfoSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  tagline: z.string(),
  description: z.string(),
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  addressLine1: z.string(),
  addressCity: z.string(),
  addressCountry: z.string(),
  storeUrl: z.string(),
  facebookUrl: z.string().nullable(),
  instagramUrl: z.string().nullable(),
  linkedinUrl: z.string().nullable(),
  foundingYear: z.number(),
});

export const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  image: mediaSchema,
});

export const productCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  description: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  image: mediaSchema,
  products: z.array(productSchema),
});

export const serviceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  icon: z.string(),
  iconColor: z.string(),
});

export const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  date: z.string(),
  author: z.string(),
  excerpt: z.string(),
  body: z.string(),
});

export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  quote: z.string(),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  iconColor: z.string(),
  photo: mediaSchema,
});

export const officeSchema = z.object({
  slug: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  photo: mediaSchema,
});

export const portfolioProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  highlight: z.string(),
  icon: z.string(),
  image: mediaSchema,
  video: mediaSchema,
});

export const portfolioCategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  image: mediaSchema,
  projects: z.array(portfolioProjectSchema),
});

export const statSchema = z.object({
  label: z.string(),
  value: z.number().nullable(),
  suffix: z.string(),
  foundingYearForAutoCount: z.number().nullable(),
});

export const reasonSchema = z.object({
  title: z.string(),
  description: z.string(),
  tag: z.string(),
  icon: z.string(),
  iconColor: z.string(),
});

export const clientLogoSchema = z.object({
  alt: z.string(),
  logo: mediaSchema,
});

export const themeSettingsSchema = z.object({
  brandColor: z.string(),
  accentColor: z.string(),
  headerColor: z.string(),
  footerColor: z.string(),
  pageBackgroundColor: z.string(),
  cardColor: z.string(),
  buttonColor: z.string(),
  navHighlightColor: z.string(),
  headerTextColor: z.string(),
  footerTextColor: z.string(),
  pageTextColor: z.string(),
  cardTextColor: z.string(),
  sectionColor: z.string(),
  sectionTextColor: z.string(),
  contentCardColor: z.string(),
  contentCardTextColor: z.string(),
  fontPairing: z.string(),
  radiusStyle: z.string(),
  shadowStyle: z.string(),
  logo: mediaSchema,
  favicon: mediaSchema,
  showTrustedByLogos: z.boolean().nullable(),
  showEventsSection: z.boolean().nullable(),
});
