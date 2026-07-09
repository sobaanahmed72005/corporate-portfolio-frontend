import { Hero } from "@/components/home/Hero";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { TrustTicker } from "@/components/home/TrustTicker";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { LatestUpdates } from "@/components/home/LatestUpdates";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { OfficesSection } from "@/components/home/OfficesSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductSpotlight />
      <TrustTicker />
      <ProductShowcase />
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
