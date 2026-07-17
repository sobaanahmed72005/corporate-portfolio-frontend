// Same allow-list lib/markdown.tsx applies to CMS richtext links — reused
// here so every other CMS-sourced URL (company links, social links,
// tel/mailto) crosses the same trust boundary the same way, instead of each
// component trusting whatever string Strapi returns. A `javascript:` (or
// other unexpected scheme) href from a compromised/misconfigured CMS entry
// falls back to a harmless "#" rather than being rendered as-is.
const SAFE_URL_RE = /^(https?:|mailto:|tel:|\/)/i;

export function safeHref(url: string | undefined | null, fallback = "#"): string {
  if (!url) return fallback;
  return SAFE_URL_RE.test(url) ? url : fallback;
}