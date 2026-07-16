import { Hero } from "@/components/home/Hero";
import { StatsCounter } from "@/components/home/StatsCounter";
import { TrustTicker } from "@/components/home/TrustTicker";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { LogoWall } from "@/components/home/LogoWall";
import { ProductDeepDive } from "@/components/home/ProductDeepDive";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { OfficesSection } from "@/components/home/OfficesSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getProductCategories, getStats, getThemeSettings } from "@/lib/cms";

export default async function Home() {
  const [productCategories, stats, themeSettings] = await Promise.all([
    getProductCategories(),
    getStats(),
    getThemeSettings(),
  ]);

  return (
    <>
      <Hero />
      <StatsCounter stats={stats} />
      <TrustTicker />
      <ProductShowcase productCategories={productCategories} />
      {themeSettings.showEventsSection && <EventsTeaser />}
      {themeSettings.showTrustedByLogos && <LogoWall />}
      <ProductDeepDive />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyChooseUs />
      <LatestUpdates />
      <TestimonialsPreview />
      <OfficesSection />
      <CtaBanner />
    </>
  );
}