import "server-only";
import { requireEnv } from "@/lib/env";

/**
 * Holds the Strapi API token — never import this from a "use client"
 * component. The "server-only" package makes that a build error instead of
 * a silent bundle leak, which is the actual guarantee (previously this
 * lived in the same module as client-safe config with nothing enforcing
 * the boundary beyond convention).
 */
export const CMS_CONFIG = {
  URL: requireEnv("STRAPI_URL", process.env.STRAPI_URL, "http://localhost:1337"),
  API_TOKEN: requireEnv("STRAPI_API_TOKEN", process.env.STRAPI_API_TOKEN, ""),
  // Strapi uploads now live on Cloudflare R2 (a different host than the CMS
  // API itself — see corporate-portfolio-cms/config/plugins.ts), so
  // mediaUrl() needs to allow this host too, not just STRAPI_URL's.
  MEDIA_CDN_URL: process.env.MEDIA_CDN_URL || "",
} as const;

const isProduction = process.env.NODE_ENV === "production";

// An empty token isn't caught by requireEnv (dev allows a blank default),
// but every Strapi request will 401 without one — this only silently
// "works" by falling back to placeholder content everywhere, which is
// confusing to debug without this warning.
if (!isProduction && !CMS_CONFIG.API_TOKEN) {
  console.warn(
    "[env] STRAPI_API_TOKEN is not set — CMS requests will fail and the site will fall back to placeholder content. Set it in .env.local.",
  );
}