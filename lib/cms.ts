/**
 * Single shared client for reading content from the corporate-portfolio-cms
 * Strapi instance. Components should call these typed helpers instead of
 * `fetch(...)` directly, so the base URL, auth header, and response
 * unwrapping live in one place — same pattern as lib/api-client.ts for the
 * contact-form backend.
 */

import type { ZodType } from "zod";
import { CMS_CONFIG } from "@/lib/cms-env";
import type { IconName } from "@/components/ui/Icon";
import type { FontPairingName, RadiusStyleName, ShadowStyleName } from "@/lib/theme";
import {
  strapiList,
  strapiSingle,
  companyInfoSchema,
  productCategorySchema,
  serviceSchema,
  blogPostSchema,
  testimonialSchema,
  officeSchema,
  portfolioCategorySchema,
  statSchema,
  reasonSchema,
  clientLogoSchema,
  themeSettingsSchema,
} from "@/lib/cms-schemas";

// Nested address/social objects so call sites can use
// `company.address.line1` / `company.social.facebook`.
export type CompanyInfo = {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: { line1: string; city: string; country: string };
  storeUrl: string;
  social: { facebook: string; instagram: string; linkedin: string };
  foundingYear: number;
};

// Matches the site's actual current placeholder values — used if Strapi
// has no company-info entry yet, or is unreachable.
const DEFAULT_COMPANY: CompanyInfo = {
  name: "IT Solutions Trade & Service Pvt. Ltd.",
  shortName: "IT Solutions",
  tagline: "Your Trusted Partner for IT Accessories, Security & Solar Solutions",
  description:
    "IT Solutions Trade & Service Pvt. Ltd. supplies and installs IT accessories, CCTV security systems, solar power solutions, and networking equipment for homes and businesses across Pakistan.",
  phone: "+92 300 0000000",
  whatsapp: "+923000000000",
  email: "info@example.com",
  address: {
    line1: "Shop/Office Address Line 1",
    city: "City",
    country: "Pakistan",
  },
  storeUrl: "https://store.example.com",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
  foundingYear: 2016,
};

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return withFallback("getCompanyInfo", DEFAULT_COMPANY, async () => {
    const { data } = await cmsFetch("/company-info", strapiSingle(companyInfoSchema));
    if (!data) return DEFAULT_COMPANY;
    return {
      name: data.name || DEFAULT_COMPANY.name,
      shortName: data.shortName || DEFAULT_COMPANY.shortName,
      tagline: data.tagline || DEFAULT_COMPANY.tagline,
      description: data.description || DEFAULT_COMPANY.description,
      phone: data.phone || DEFAULT_COMPANY.phone,
      whatsapp: data.whatsapp || DEFAULT_COMPANY.whatsapp,
      email: data.email || DEFAULT_COMPANY.email,
      address: {
        line1: data.addressLine1 || DEFAULT_COMPANY.address.line1,
        city: data.addressCity || DEFAULT_COMPANY.address.city,
        country: data.addressCountry || DEFAULT_COMPANY.address.country,
      },
      storeUrl: data.storeUrl || DEFAULT_COMPANY.storeUrl,
      social: {
        facebook: data.facebookUrl || DEFAULT_COMPANY.social.facebook,
        instagram: data.instagramUrl || DEFAULT_COMPANY.social.instagram,
        linkedin: data.linkedinUrl || DEFAULT_COMPANY.social.linkedin,
      },
      foundingYear: data.foundingYear || DEFAULT_COMPANY.foundingYear,
    };
  });
}

// wa.me click-to-chat links break if the number contains spaces, dashes, or
// a leading "+", so every call site should build the link through here
// rather than interpolating company.whatsapp directly.
export function getWhatsAppLink(company: CompanyInfo): string {
  return `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`;
}

export type Product = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  image?: string;
  /** width/height of `image`, when known — see mediaAspect in cms.ts. */
  imageAspect?: number;
};

export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: IconName;
  iconColor: string;
  image?: string;
  products: Product[];
};

export type Service = {
  slug: string;
  name: string;
  description: string;
  features: string[];
  icon: IconName;
  iconColor: string;
  image?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  /** Markdown, rendered via the richtext field — was string[] paragraphs
   * pre-CMS; paragraphs are now separated by blank lines in one string. */
  body: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  iconColor: string;
  photo?: string;
};

export type Office = {
  slug: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  icon: IconName;
  iconColor: string;
  photo?: string;
};

export type Reason = {
  title: string;
  description: string;
  tag: string;
  icon: IconName;
  iconColor: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  highlight: string;
  icon: IconName;
  image?: string;
  video?: string;
};

export type PortfolioCategory = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  iconColor: string;
  image?: string;
  projects: PortfolioProject[];
};

export type Stat = {
  label: string;
  value: number | null;
  suffix: string | null;
  /** When set, the displayed number is (current year - this year) instead
   * of `value`, recomputed on every render so it advances on its own. */
  foundingYearForAutoCount: number | null;
};

export type ClientLogo = {
  alt: string;
  src?: string;
};

type StrapiMedia = { url: string; width?: number | null; height?: number | null } | null;

function mediaUrl(media: StrapiMedia): string | undefined {
  if (!media?.url) return undefined;
  if (media.url.startsWith("/")) return `${CMS_CONFIG.URL}${media.url}`;
  try {
    const parsed = new URL(media.url);
    const cmsHost = new URL(CMS_CONFIG.URL).host;
    if (parsed.host === cmsHost) return media.url;
    // Uploads now live on Cloudflare R2 (a different host than the CMS API
    // itself), so an R2 URL is just as trusted as one on the CMS's own host.
    if (CMS_CONFIG.MEDIA_CDN_URL) {
      const cdnHost = new URL(CMS_CONFIG.MEDIA_CDN_URL).host;
      if (parsed.host === cdnHost) return media.url;
    }
  } catch {}
  return undefined;
}

// width/height ratio, used to decide whether a product image can fill its
// card's frame (object-cover) without cropping into the subject, or needs to
// be shown in full (object-contain) because its proportions are too far off
// the card's aspect ratio — e.g. a tall inverter photo or a wide logo.
function mediaAspect(media: StrapiMedia): number | undefined {
  if (!media?.width || !media?.height) return undefined;
  return media.width / media.height;
}

// Validates the response against `schema` rather than trusting a TypeScript
// cast — a schema drift, null field, or misconfigured/compromised CMS
// response is caught here instead of propagating malformed data into
// rendering. Treated the same as a network failure: withFallback (below)
// catches the thrown error, logs it, and returns the caller's safe default.
async function cmsFetch<T>(path: string, schema: ZodType<T>): Promise<T> {
  const res = await fetch(`${CMS_CONFIG.URL}/api${path}`, {
    headers: { Authorization: `Bearer ${CMS_CONFIG.API_TOKEN}` },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CMS request to ${path} failed with status ${res.status}`);
  }

  const json = await res.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new Error(`CMS response for ${path} did not match the expected shape: ${parsed.error.message}`);
  }
  return parsed.data;
}

// If the CMS is briefly unreachable, a key gets narrowed, or any single
// section's request fails, this logs the failure server-side (so it's
// visible instead of silent) and returns a safe fallback instead of
// throwing — one broken section shouldn't take down every page that
// happens to render it (most of these are awaited in the root layout).
export async function withFallback<T>(label: string, fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[cms] ${label} failed, using fallback:`, err);
    return fallback;
  }
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return withFallback("getProductCategories", [], async () => {
    const { data } = await cmsFetch(
      "/product-categories?populate[products][populate]=image&populate[image]=true&sort=order:asc&pagination[pageSize]=100",
      strapiList(productCategorySchema),
    );
    return data.map((category) => ({
      slug: category.slug,
      name: category.name,
      shortName: category.shortName,
      description: category.description,
      icon: category.icon as IconName,
      iconColor: category.iconColor,
      image: mediaUrl(category.image),
      products: category.products.map((product) => ({
        slug: product.slug,
        name: product.name,
        description: product.description,
        icon: product.icon as IconName,
        image: mediaUrl(product.image),
        imageAspect: mediaAspect(product.image),
      })),
    }));
  });
}

export async function getServices(): Promise<Service[]> {
  return withFallback("getServices", [], async () => {
    const { data } = await cmsFetch(
      "/services?populate=image&sort=id:asc&pagination[pageSize]=100",
      strapiList(serviceSchema),
    );
    return data.map((service) => ({ ...service, icon: service.icon as IconName, image: mediaUrl(service.image) }));
  });
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return withFallback("getBlogPosts", [], async () => {
    const { data } = await cmsFetch(
      "/blog-posts?sort=id:asc&pagination[pageSize]=100",
      strapiList(blogPostSchema),
    );
    return data.map((post) => ({ ...post, date: formatDate(post.date) }));
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return withFallback("getBlogPost", undefined, async () => {
    const { data } = await cmsFetch(
      `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}`,
      strapiList(blogPostSchema),
    );
    if (!data[0]) return undefined;
    return { ...data[0], date: formatDate(data[0].date) };
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return withFallback("getTestimonials", [], async () => {
    const { data } = await cmsFetch(
      "/testimonials?populate=photo&sort=id:asc&pagination[pageSize]=100",
      strapiList(testimonialSchema),
    );
    return data.map((testimonial) => ({
      ...testimonial,
      photo: mediaUrl(testimonial.photo),
    }));
  });
}

export async function getOffices(): Promise<Office[]> {
  return withFallback("getOffices", [], async () => {
    const { data } = await cmsFetch(
      "/offices?populate=photo&sort=displayOrder:asc&pagination[pageSize]=100",
      strapiList(officeSchema),
    );
    return data.map((office) => ({
      ...office,
      icon: office.icon as IconName,
      photo: mediaUrl(office.photo),
    }));
  });
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  return withFallback("getPortfolioCategories", [], async () => {
    const { data } = await cmsFetch(
      "/portfolio-categories?populate[projects][populate][0]=image&populate[projects][populate][1]=video&populate[image]=true&sort=id:asc&pagination[pageSize]=100",
      strapiList(portfolioCategorySchema),
    );
    return data.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      icon: category.icon as IconName,
      iconColor: category.iconColor,
      image: mediaUrl(category.image),
      projects: category.projects.map((project) => ({
        slug: project.slug,
        title: project.title,
        summary: project.summary,
        highlight: project.highlight,
        icon: project.icon as IconName,
        image: mediaUrl(project.image),
        video: mediaUrl(project.video),
      })),
    }));
  });
}

export async function getStats(): Promise<Stat[]> {
  return withFallback("getStats", [], async () => {
    const { data } = await cmsFetch("/stats?sort=id:asc&pagination[pageSize]=100", strapiList(statSchema));
    return data;
  });
}

export async function getReasons(): Promise<Reason[]> {
  return withFallback("getReasons", [], async () => {
    const { data } = await cmsFetch(
      "/reasons?sort=id:asc&pagination[pageSize]=100",
      strapiList(reasonSchema),
    );
    return data.map((reason) => ({ ...reason, icon: reason.icon as IconName }));
  });
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  return withFallback("getClientLogos", [], async () => {
    const { data } = await cmsFetch(
      "/client-logos?populate=logo&sort=id:asc&pagination[pageSize]=100",
      strapiList(clientLogoSchema),
    );
    return data.map((entry) => ({
      alt: entry.alt,
      src: mediaUrl(entry.logo),
    }));
  });
}

export type ThemeSettings = {
  brandColor: string;
  accentColor: string;
  headerColor: string;
  footerColor: string;
  pageBackgroundColor: string;
  cardColor: string;
  buttonColor: string;
  navHighlightColor: string;
  headerTextColor: string;
  footerTextColor: string;
  pageTextColor: string;
  cardTextColor: string;
  sectionColor: string;
  sectionTextColor: string;
  contentCardColor: string;
  contentCardTextColor: string;
  fontPairing: FontPairingName;
  radiusStyle: RadiusStyleName;
  shadowStyle: ShadowStyleName;
  logo?: string;
  favicon?: string;
  showTrustedByLogos: boolean;
  showEventsSection: boolean;
};

// Matches the site's actual current look — used if Strapi has no
// theme-setting entry yet, or is unreachable, so the site never renders
// unstyled or with a broken font/shape choice.
const DEFAULT_THEME: ThemeSettings = {
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

export async function getThemeSettings(): Promise<ThemeSettings> {
  return withFallback("getThemeSettings", DEFAULT_THEME, async () => {
    const { data } = await cmsFetch(
      "/theme-setting?populate[0]=logo&populate[1]=favicon",
      strapiSingle(themeSettingsSchema),
    );
    if (!data) return DEFAULT_THEME;
    return {
      brandColor: data.brandColor || DEFAULT_THEME.brandColor,
      accentColor: data.accentColor || DEFAULT_THEME.accentColor,
      headerColor: data.headerColor || DEFAULT_THEME.headerColor,
      footerColor: data.footerColor || DEFAULT_THEME.footerColor,
      pageBackgroundColor: data.pageBackgroundColor || DEFAULT_THEME.pageBackgroundColor,
      cardColor: data.cardColor || DEFAULT_THEME.cardColor,
      buttonColor: data.buttonColor || DEFAULT_THEME.buttonColor,
      navHighlightColor: data.navHighlightColor || DEFAULT_THEME.navHighlightColor,
      headerTextColor: data.headerTextColor || DEFAULT_THEME.headerTextColor,
      footerTextColor: data.footerTextColor || DEFAULT_THEME.footerTextColor,
      pageTextColor: data.pageTextColor || DEFAULT_THEME.pageTextColor,
      cardTextColor: data.cardTextColor || DEFAULT_THEME.cardTextColor,
      sectionColor: data.sectionColor || DEFAULT_THEME.sectionColor,
      sectionTextColor: data.sectionTextColor || DEFAULT_THEME.sectionTextColor,
      contentCardColor: data.contentCardColor || DEFAULT_THEME.contentCardColor,
      contentCardTextColor: data.contentCardTextColor || DEFAULT_THEME.contentCardTextColor,
      fontPairing: (data.fontPairing || DEFAULT_THEME.fontPairing) as FontPairingName,
      radiusStyle: (data.radiusStyle || DEFAULT_THEME.radiusStyle) as RadiusStyleName,
      shadowStyle: (data.shadowStyle || DEFAULT_THEME.shadowStyle) as ShadowStyleName,
      logo: mediaUrl(data.logo),
      favicon: mediaUrl(data.favicon),
      showTrustedByLogos: data.showTrustedByLogos ?? DEFAULT_THEME.showTrustedByLogos,
      showEventsSection: data.showEventsSection ?? DEFAULT_THEME.showEventsSection,
    };
  });
}
