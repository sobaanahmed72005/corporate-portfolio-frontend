import type { Metadata } from "next";
import { Outfit, Rubik, Playfair_Display, Source_Sans_3, Space_Grotesk, Inter, Merriweather, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialSidebar } from "@/components/layout/SocialSidebar";
import { SITE_CONFIG } from "@/lib/env";
import {
  getProductCategories,
  getServices,
  getPortfolioCategories,
  getThemeSettings,
  getCompanyInfo,
  getOffices,
} from "@/lib/cms";
import { buildThemeCssVars, buildFontCssVars, buildShapeCssVars } from "@/lib/theme";

// Hardcoded rather than CMS-driven (theme-setting.logo) — the logo doesn't
// change, and fetching it through next/image's remote-image proxy meant
// every page load depended on the CMS's custom domain resolving through
// Cloudflare's proxy, which intermittently failed. A static local asset
// has no such failure mode.
const LOGO_SRC = "/logo.png";

// All 4 font pairings (lib/theme.ts's FONT_PAIRINGS) are statically imported
// here — next/font/google requires a static import per font, so Strapi's
// fontPairing enum can only pick among fonts already loaded, not an
// arbitrary family. Unselected pairings cost extra self-hosted files in the
// build output, not client bandwidth — browsers only fetch a font when its
// family is actually referenced by computed style.
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-outfit" });
const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-rubik" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-merriweather",
});
// Matches NETSOL's body font exactly (Poppins) — used for both heading and
// body under the "Single Family — Poppins" pairing since NETSOL's actual
// heading font ("Qualy") is a proprietary file we don't have.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  // Next dedupes identical fetch() calls within a request, so this doesn't
  // cost a second network round-trip beyond the one RootLayout already makes.
  const [themeSettings, company] = await Promise.all([getThemeSettings(), getCompanyInfo()]);

  return {
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
    // Falls back to the static app/favicon.ico convention when unset.
    icons: themeSettings.favicon ? { icon: themeSettings.favicon } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [productCategories, services, portfolioCategories, themeSettings, company, offices] = await Promise.all([
    getProductCategories(),
    getServices(),
    getPortfolioCategories(),
    getThemeSettings(),
    getCompanyInfo(),
    getOffices(),
  ]);
  const themeCssVars =
    buildThemeCssVars({
      brand: themeSettings.brandColor,
      accent: themeSettings.accentColor,
      header: themeSettings.headerColor,
      footer: themeSettings.footerColor,
      page: themeSettings.pageBackgroundColor,
      card: themeSettings.cardColor,
      button: themeSettings.buttonColor,
      navHighlight: themeSettings.navHighlightColor,
      headerText: themeSettings.headerTextColor,
      footerText: themeSettings.footerTextColor,
      pageText: themeSettings.pageTextColor,
      cardText: themeSettings.cardTextColor,
      section: themeSettings.sectionColor,
      sectionText: themeSettings.sectionTextColor,
      contentCard: themeSettings.contentCardColor,
      contentCardText: themeSettings.contentCardTextColor,
    }) +
    buildFontCssVars(themeSettings.fontPairing) +
    buildShapeCssVars(themeSettings.radiusStyle, themeSettings.shadowStyle);

  const fontVariables = [
    rubik.variable,
    outfit.variable,
    playfair.variable,
    sourceSans.variable,
    spaceGrotesk.variable,
    inter.variable,
    merriweather.variable,
    poppins.variable,
  ].join(" ");

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
      <head>
        {/* Theme from Strapi (theme-setting): colors, font pairing, and
            radius/shadow style all resolve to CSS custom properties that
            tailwind.config.ts's var() references read, so editing any of
            them in Strapi updates the whole site without a code change. */}
        <style dangerouslySetInnerHTML={{ __html: `:root{${themeCssVars}}` }} />
      </head>
      <body className={`${fontVariables} font-sans flex min-h-screen flex-col bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          // JSON.stringify doesn't escape "<", so a CMS text field
          // containing "</script>" could break out of this tag — replace
          // it with a JSON-safe unicode escape (Next.js's own recommended
          // fix) rather than relying on CSP alone.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Header
          company={company}
          productCategories={productCategories}
          services={services}
          portfolioCategories={portfolioCategories}
          logo={LOGO_SRC}
        />
        <main className="flex-1">{children}</main>
        <Footer company={company} productCategories={productCategories} offices={offices} logo={themeSettings.logo} />
        <SocialSidebar company={company} />
      </body>
    </html>
  );
}
