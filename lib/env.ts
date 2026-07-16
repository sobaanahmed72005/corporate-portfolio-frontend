/**
 * Single source of truth for environment variables.
 * Add new env vars here (and to .env.example) instead of reading
 * `process.env` directly elsewhere in the app. Group related vars
 * into a single config object rather than adding more flat exports.
 *
 * A dev-only default is allowed (via NODE_ENV) so `npm run dev` works
 * without a .env.local, but production (`NODE_ENV=production`) always
 * requires the real value — it never silently falls back.
 */

const isProduction = process.env.NODE_ENV === "production";

function requireEnv(name: string, value: string | undefined, devDefault: string): string {
  if (value) return value;
  if (!isProduction) return devDefault;
  throw new Error(`Missing required environment variable: ${name}`);
}

export const SITE_CONFIG = {
  URL: requireEnv("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
} as const;

export const API_CONFIG = {
  URL: requireEnv("NEXT_PUBLIC_API_URL", process.env.NEXT_PUBLIC_API_URL, "http://localhost:4000"),
} as const;

export const CMS_CONFIG = {
  URL: requireEnv("STRAPI_URL", process.env.STRAPI_URL, "http://localhost:1337"),
  API_TOKEN: requireEnv("STRAPI_API_TOKEN", process.env.STRAPI_API_TOKEN, ""),
} as const;

// An empty token isn't caught by requireEnv (dev allows a blank default),
// but every Strapi request will 401 without one — this only silently
// "works" by falling back to placeholder content everywhere, which is
// confusing to debug without this warning.
if (!isProduction && !CMS_CONFIG.API_TOKEN) {
  console.warn(
    "[env] STRAPI_API_TOKEN is not set — CMS requests will fail and the site will fall back to placeholder content. Set it in .env.local.",
  );
}
