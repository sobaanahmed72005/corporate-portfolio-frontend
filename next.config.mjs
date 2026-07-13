const strapiUrl = new URL(process.env.STRAPI_URL || "http://localhost:1337");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
};

export default nextConfig;
