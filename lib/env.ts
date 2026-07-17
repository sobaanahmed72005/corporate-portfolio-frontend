/**
 * Client-safe environment variables only — everything here is fine to end
 * up in a browser-shipped bundle (NEXT_PUBLIC_* values, no secrets). The
 * CMS access token lives in cms-env.ts instead, guarded by the
 * "server-only" package, so a future accidental import from a "use client"
 * component fails the build loudly instead of silently bundling a secret.
 * Add new env vars here (and to .env.example) instead of reading
 * `process.env` directly elsewhere in the app.
 *
 * A dev-only default is allowed (via NODE_ENV) so `npm run dev` works
 * without a .env.local, but production (`NODE_ENV=production`) always
 * requires the real value — it never silently falls back.
 */

const isProduction = process.env.NODE_ENV === "production";

export function requireEnv(name: string, value: string | undefined, devDefault: string): string {
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
