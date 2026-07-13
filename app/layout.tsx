import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company } from "@/lib/data/company";
import { SITE_CONFIG } from "@/lib/env";
import { getProductCategories, getServices } from "@/lib/cms";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-outfit",
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.URL),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  openGraph: {
    title: company.name,
    description: company.description,
    url: SITE_CONFIG.URL,
    siteName: company.name,
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [productCategories, services] = await Promise.all([getProductCategories(), getServices()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
    url: SITE_CONFIG.URL,
    sameAs: Object.values(company.social),
  };

  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${outfit.variable} font-sans flex min-h-screen flex-col bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header productCategories={productCategories} services={services} />
        <main className="flex-1">{children}</main>
        <Footer productCategories={productCategories} />
      </body>
    </html>
  );
}
