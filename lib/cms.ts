/**
 * Corporate Portfolio CMS Domain Query Layer.
 *
 * Provides typed, fault-tolerant queries for Strapi CMS content.
 * Re-exports all domain types, fallback fixtures, and client utilities
 * so call sites throughout the project maintain a single, clean import surface.
 */

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
  heroSlideSchema,
} from "@/lib/cms-schemas";
import {
  cmsFetch,
  withFallback,
  mediaUrl,
  mediaAspect,
  safeHeroSlideUrl,
  formatDate,
} from "@/lib/cms-client";
import {
  DEFAULT_COMPANY,
  DEFAULT_THEME,
  DEFAULT_HERO_SLIDES,
} from "@/lib/cms-fallbacks";
import type {
  CompanyInfo,
  ProductCategory,
  Service,
  BlogPost,
  Testimonial,
  Office,
  PortfolioCategory,
  Stat,
  Reason,
  ClientLogo,
  ThemeSettings,
  HeroSlide,
} from "@/lib/cms-types";

// Re-export all domain types, fallback fixtures, and client utilities
export * from "@/lib/cms-types";
export * from "@/lib/cms-fallbacks";
export * from "@/lib/cms-client";

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
      foundingYear: data.foundingYear && data.foundingYear !== 2016 ? data.foundingYear : 2010,
    };
  });
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
      "/reasons?populate=image&sort=id:asc&pagination[pageSize]=100",
      strapiList(reasonSchema),
    );
    return data.map((reason) => ({ ...reason, icon: reason.icon as IconName, image: mediaUrl(reason.image) }));
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

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return withFallback("getHeroSlides", DEFAULT_HERO_SLIDES, async () => {
    const { data } = await cmsFetch("/hero-slides?populate=*&sort=order:asc", strapiList(heroSlideSchema));
    if (!data || data.length === 0) return DEFAULT_HERO_SLIDES;

    const slides = data
      .map((entry) => {
        const src = safeHeroSlideUrl(entry.image, entry.imageUrl);
        if (!src) return null;
        return {
          src,
          alt: entry.alt || "",
          headline: entry.headline || "",
          subtext: entry.subtext || "",
          order: entry.order ?? 1,
        };
      })
      .filter((s): s is HeroSlide => s !== null);

    return slides.length > 0 ? slides : DEFAULT_HERO_SLIDES;
  });
}
