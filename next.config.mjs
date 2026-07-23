const strapiUrl = new URL(process.env.STRAPI_URL || "http://localhost:1337");
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
// Strapi uploads (photos, videos) now live on Cloudflare R2, a different
// host than the CMS API itself — see corporate-portfolio-cms/config/plugins.ts.
const mediaCdnUrl = process.env.MEDIA_CDN_URL ? new URL(process.env.MEDIA_CDN_URL) : null;

// Next.js's theme <style>/JSON-LD <script> (app/layout.tsx) are injected
// inline, so a strict nonce-based CSP would need per-request middleware —
// out of scope here. 'unsafe-inline' keeps those working; frame-ancestors,
// object-src, and base-uri still meaningfully narrow what an injected
// script could do, and this is paired with escaping the JSON-LD/theme
// output itself (the actual fix for that injection vector) rather than
// relying on CSP alone.
const csp = [
  "default-src 'self'",
  // static.cloudflareinsights.com is Cloudflare's own Web Analytics beacon,
  // auto-injected now that this site is proxied through Cloudflare — not
  // something this app adds itself, but CSP still has to allow it or the
  // browser silently blocks it (harmless when blocked, just console noise).
  "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${strapiUrl.origin}${mediaCdnUrl ? ` ${mediaCdnUrl.origin}` : ""}`,
  // Portfolio project videos are served from the Strapi host (or R2, a
  // different origin still), not the frontend itself — without this,
  // <video src> falls back to default-src 'self' and the browser silently
  // blocks the load (no console-visible error, it just never plays).
  `media-src 'self' ${strapiUrl.origin}${mediaCdnUrl ? ` ${mediaCdnUrl.origin}` : ""}`,
  "font-src 'self' data:",
  `connect-src 'self' ${apiUrl} https://cloudflareinsights.com`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Content-Security-Policy", value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework in every response — minor recon info an
  // attacker doesn't need handed to them for free.
  poweredByHeader: false,
  images: {
    // Every CMS media field (logo, product/testimonial/office photos, etc.)
    // resolves to a URL on the Strapi host — next/image refuses external
    // hosts unless explicitly allowed here.
    remotePatterns: [
      {
        protocol: strapiUrl.protocol.replace(":", ""),
        hostname: strapiUrl.hostname,
        port: strapiUrl.port,
      },
      ...(mediaCdnUrl
        ? [
            {
              protocol: mediaCdnUrl.protocol.replace(":", ""),
              hostname: mediaCdnUrl.hostname,
              port: mediaCdnUrl.port,
            },
          ]
        : []),
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
