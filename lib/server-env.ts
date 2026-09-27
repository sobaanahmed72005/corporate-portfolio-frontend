import "server-only";

/**
 * Server-only environment variables for API route handlers and server logic.
 * The "server-only" import guarantees this file can NEVER be imported into
 * client components or bundled into browser assets.
 */

const isProduction = process.env.NODE_ENV === "production";

export const SERVER_ENV = {
  IS_PRODUCTION: isProduction,
  EMAIL_CONFIG: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS || "Website <onboarding@resend.dev>",
  },
  NEWSLETTER_CONFIG: {
    STRAPI_NEWSLETTER_TOKEN: process.env.STRAPI_NEWSLETTER_TOKEN,
  },
  RATE_LIMIT_TRUSTED_PROXY_HOPS: (() => {
    const raw = process.env.RATE_LIMIT_TRUSTED_PROXY_HOPS;
    const parsed = raw ? Number.parseInt(raw, 10) : 1;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  })(),
  REVALIDATION_SECRET: process.env.REVALIDATION_SECRET || "",
  CMS_REVALIDATE_SECONDS: (() => {
    const raw = process.env.CMS_REVALIDATE_SECONDS;
    const parsed = raw ? Number.parseInt(raw, 10) : 3600; // 1 hour default
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 3600;
  })(),
} as const;
