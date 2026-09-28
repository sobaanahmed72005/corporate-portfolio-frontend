import type { ZodType } from "zod";
import { CMS_CONFIG } from "@/lib/cms-env";
import { SERVER_ENV } from "@/lib/server-env";
import type { CompanyInfo } from "@/lib/cms-types";

/**
 * Core HTTP transport client and media validation utilities for Strapi CMS.
 * Handles authentication, Next.js ISR revalidation, runtime schema validation,
 * and safe media host sanitization to guard against SSRF and image optimization crashes.
 */

export type StrapiMedia = { url: string; width?: number | null; height?: number | null } | null | undefined;

/**
 * Validates that an image URL originated from a trusted source (Strapi or Cloudflare R2).
 * Guards against SSRF and unauthorized media hosts entering Next.js Image component.
 */
export function mediaUrl(media: StrapiMedia): string | undefined {
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

/**
 * Aspect ratio helper (width / height) used to choose between object-cover
 * and object-contain on product cards without cropping subjects.
 */
export function mediaAspect(media: StrapiMedia): number | undefined {
  if (!media?.width || !media?.height) return undefined;
  return media.width / media.height;
}

/**
 * Validates hero slide image sources.
 * Supports uploaded Strapi/R2 media, local static asset paths (/hero-slides/...),
 * or trusted external CDN URLs, while rejecting unsafe protocols and untrusted domains.
 */
export function safeHeroSlideUrl(image: StrapiMedia, imageUrl?: string | null): string | undefined {
  const fromMedia = mediaUrl(image);
  if (fromMedia) return fromMedia;
  if (!imageUrl) return undefined;
  // If local static asset path like "/hero-slides/..."
  if (imageUrl.startsWith("/") && !imageUrl.startsWith("//")) return imageUrl;
  // If absolute URL, ensure it points to trusted CMS or CDN host
  try {
    const parsed = new URL(imageUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return undefined;
    const cmsHost = new URL(CMS_CONFIG.URL).host;
    if (parsed.host === cmsHost) return imageUrl;
    if (CMS_CONFIG.MEDIA_CDN_URL) {
      const cdnHost = new URL(CMS_CONFIG.MEDIA_CDN_URL).host;
      if (parsed.host === cdnHost) return imageUrl;
    }
  } catch {}
  return undefined;
}

/**
 * Authenticated Strapi GET fetcher with runtime Zod schema parsing.
 * Automatically injects Next.js ISR cache revalidation options.
 */
export async function cmsFetch<T>(path: string, schema: ZodType<T>): Promise<T> {
  const res = await fetch(`${CMS_CONFIG.URL}/api${path}`, {
    headers: { Authorization: `Bearer ${CMS_CONFIG.API_TOKEN}` },
    next: {
      revalidate: SERVER_ENV.CMS_REVALIDATE_SECONDS,
    },
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

/**
 * Fault-tolerant query wrapper. Catches network failures, schema mismatches,
 * and downstream errors, logs them server-side, and returns a safe fallback.
 */
export async function withFallback<T>(label: string, fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[cms] ${label} failed, using fallback:`, err);
    return fallback;
  }
}

/**
 * Formats ISO date strings into friendly display format (e.g., "September 28, 2026").
 */
export function formatDate(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  if (isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Sanitizes phone numbers for wa.me click-to-chat links, stripping spaces, dashes, and '+'.
 */
export function getWhatsAppLink(company: CompanyInfo): string {
  return `https://wa.me/${company.whatsapp.replace(/\D/g, "")}`;
}
