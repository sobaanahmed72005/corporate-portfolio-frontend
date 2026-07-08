/**
 * Single source of truth for backend API routes (paths only — the base URL
 * is applied by lib/api-client.ts). Add new routes here instead of
 * hardcoding paths elsewhere in the app.
 */

export const ENDPOINTS = {
  CONTACT: "/api/contact",
} as const;
