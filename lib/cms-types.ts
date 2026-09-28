import type { IconName } from "@/components/ui/Icon";
import type { FontPairingName, RadiusStyleName, ShadowStyleName } from "@/lib/theme";

/**
 * Domain types for content read from the corporate-portfolio-cms Strapi instance.
 * These types represent sanitized, normalized data ready for rendering in React components.
 */

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

export type Product = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  image?: string;
  /** width/height of `image`, when known — see mediaAspect in cms-client.ts. */
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
  /** Markdown, rendered via the richtext field — paragraphs are separated by blank lines in one string. */
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
  image?: string;
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

export type HeroSlide = {
  src: string;
  alt: string;
  headline: string;
  subtext: string;
  order: number;
};
