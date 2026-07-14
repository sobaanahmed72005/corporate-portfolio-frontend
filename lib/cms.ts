/**
 * Single shared client for reading content from the corporate-portfolio-cms
 * Strapi instance. Components should call these typed helpers instead of
 * `fetch(...)` directly, so the base URL, auth header, and response
 * unwrapping live in one place — same pattern as lib/api-client.ts for the
 * contact-form backend.
 */

import { CMS_CONFIG } from "@/lib/env";
import type { IconName } from "@/components/ui/Icon";
import type { GradientName } from "@/components/ui/gradients";
import type { FontPairingName, RadiusStyleName, ShadowStyleName } from "@/lib/theme";

export type Product = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  image?: string;
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
  gradient: GradientName;
  photo?: string;
};

export type Office = {
  slug: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  icon: IconName;
  photo?: string;
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
  value: number;
  suffix: string;
};

export type Course = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  iconColor: string;
};

export type ClientLogo = {
  alt: string;
  src?: string;
};

type StrapiMedia = { url: string } | null;
type StrapiListResponse<T> = { data: T[] };

function mediaUrl(media: StrapiMedia): string | undefined {
  if (!media?.url) return undefined;
  return media.url.startsWith("http") ? media.url : `${CMS_CONFIG.URL}${media.url}`;
}

async function cmsFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${CMS_CONFIG.URL}/api${path}`, {
    headers: { Authorization: `Bearer ${CMS_CONFIG.API_TOKEN}` },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CMS request to ${path} failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

type RawProduct = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  image: StrapiMedia;
};

type RawProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: IconName;
  iconColor: string;
  image: StrapiMedia;
  products: RawProduct[];
};

export async function getProductCategories(): Promise<ProductCategory[]> {
  const { data } = await cmsFetch<StrapiListResponse<RawProductCategory>>(
    "/product-categories?populate[products][populate]=image&populate[image]=true&sort=id:asc&pagination[pageSize]=100",
  );
  return data.map((category) => ({
    slug: category.slug,
    name: category.name,
    shortName: category.shortName,
    description: category.description,
    icon: category.icon,
    iconColor: category.iconColor,
    image: mediaUrl(category.image),
    products: category.products.map((product) => ({
      slug: product.slug,
      name: product.name,
      description: product.description,
      icon: product.icon,
      image: mediaUrl(product.image),
    })),
  }));
}

export async function getServices(): Promise<Service[]> {
  const { data } = await cmsFetch<StrapiListResponse<Service>>(
    "/services?sort=id:asc&pagination[pageSize]=100",
  );
  return data;
}

type RawBlogPost = BlogPost;

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data } = await cmsFetch<StrapiListResponse<RawBlogPost>>(
    "/blog-posts?sort=id:asc&pagination[pageSize]=100",
  );
  return data;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const { data } = await cmsFetch<StrapiListResponse<RawBlogPost>>(
    `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}`,
  );
  return data[0];
}

type RawTestimonial = Omit<Testimonial, "photo"> & { photo: StrapiMedia };

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await cmsFetch<StrapiListResponse<RawTestimonial>>(
    "/testimonials?populate=photo&sort=id:asc&pagination[pageSize]=100",
  );
  return data.map((testimonial) => ({
    ...testimonial,
    photo: mediaUrl(testimonial.photo),
  }));
}

type RawOffice = Omit<Office, "photo"> & { photo: StrapiMedia };

export async function getOffices(): Promise<Office[]> {
  const { data } = await cmsFetch<StrapiListResponse<RawOffice>>(
    "/offices?populate=photo&sort=id:asc&pagination[pageSize]=100",
  );
  return data.map((office) => ({
    ...office,
    photo: mediaUrl(office.photo),
  }));
}

type RawPortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  highlight: string;
  icon: IconName;
  image: StrapiMedia;
  video: StrapiMedia;
};

type RawPortfolioCategory = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  iconColor: string;
  image: StrapiMedia;
  projects: RawPortfolioProject[];
};

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  const { data } = await cmsFetch<StrapiListResponse<RawPortfolioCategory>>(
    "/portfolio-categories?populate[projects][populate][0]=image&populate[projects][populate][1]=video&populate[image]=true&sort=id:asc&pagination[pageSize]=100",
  );
  return data.map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description,
    icon: category.icon,
    iconColor: category.iconColor,
    image: mediaUrl(category.image),
    projects: category.projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      highlight: project.highlight,
      icon: project.icon,
      image: mediaUrl(project.image),
      video: mediaUrl(project.video),
    })),
  }));
}

export async function getStats(): Promise<Stat[]> {
  const { data } = await cmsFetch<StrapiListResponse<Stat>>("/stats?sort=id:asc&pagination[pageSize]=100");
  return data;
}

export async function getCourses(): Promise<Course[]> {
  const { data } = await cmsFetch<StrapiListResponse<Course>>("/courses?sort=id:asc&pagination[pageSize]=100");
  return data;
}

type RawClientLogo = { alt: string; logo: StrapiMedia };

export async function getClientLogos(): Promise<ClientLogo[]> {
  const { data } = await cmsFetch<StrapiListResponse<RawClientLogo>>(
    "/client-logos?populate=logo&sort=id:asc&pagination[pageSize]=100",
  );
  return data.map((entry) => ({
    alt: entry.alt,
    src: mediaUrl(entry.logo),
  }));
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
  fontPairing: FontPairingName;
  radiusStyle: RadiusStyleName;
  shadowStyle: ShadowStyleName;
  logo?: string;
  favicon?: string;
};

// Matches the site's actual current hardcoded look — used if Strapi has no
// theme-setting entry yet, or is unreachable, so the site never renders
// unstyled or with a broken font/shape choice.
const DEFAULT_THEME: ThemeSettings = {
  brandColor: "#0324FF",
  accentColor: "#FFA31A",
  headerColor: "#000000",
  footerColor: "#000000",
  pageBackgroundColor: "#000000",
  cardColor: "#000000",
  buttonColor: "#0324FF",
  navHighlightColor: "#0324FF",
  fontPairing: "Modern Sans (Outfit + Rubik)",
  radiusStyle: "Soft (current default)",
  shadowStyle: "Subtle (current default)",
};

type RawThemeSettings = {
  brandColor: string;
  accentColor: string;
  headerColor: string;
  footerColor: string;
  pageBackgroundColor: string;
  cardColor: string;
  buttonColor: string;
  navHighlightColor: string;
  fontPairing: FontPairingName;
  radiusStyle: RadiusStyleName;
  shadowStyle: ShadowStyleName;
  logo: StrapiMedia;
  favicon: StrapiMedia;
};

type StrapiSingleResponse<T> = { data: T | null };

export async function getThemeSettings(): Promise<ThemeSettings> {
  try {
    const { data } = await cmsFetch<StrapiSingleResponse<RawThemeSettings>>(
      "/theme-setting?populate[0]=logo&populate[1]=favicon",
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
      fontPairing: data.fontPairing || DEFAULT_THEME.fontPairing,
      radiusStyle: data.radiusStyle || DEFAULT_THEME.radiusStyle,
      shadowStyle: data.shadowStyle || DEFAULT_THEME.shadowStyle,
      logo: mediaUrl(data.logo),
      favicon: mediaUrl(data.favicon),
    };
  } catch {
    return DEFAULT_THEME;
  }
}
