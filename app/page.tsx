import { Hero } from "@/components/home/Hero";
import { TrustTicker } from "@/components/home/TrustTicker";
import { CategoryHighlights } from "@/components/home/CategoryHighlights";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustTicker />
      <CategoryHighlights />
      <ServicesOverview />
      <PortfolioPreview />
      <WhyChooseUs />
      <TestimonialsPreview />
      <CtaBanner />
    </>
  );
}
