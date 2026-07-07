import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company } from "@/lib/data/company";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | ${company.tagline}`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  openGraph: {
    title: company.name,
    description: company.description,
    url: siteUrl,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    url: siteUrl,
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
