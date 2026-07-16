import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { CategorySection } from "@/components/products/CategorySection";
import { getProductCategories, getCompanyInfo } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our range of chargers, CCTV cameras, solar panels, and networking devices. Visit our online store to purchase.",
};

export default async function ProductsPage() {
  const [productCategories, company] = await Promise.all([getProductCategories(), getCompanyInfo()]);

  return (
    <div className="bg-contentCard-50">
      <section className="border-b border-section-200 bg-section-50 py-14">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-sectionText-950 sm:text-4xl">Our Products</h1>
            <p className="mt-2 max-w-xl text-sectionText-600">
              A look at what we supply. For pricing, availability, and to place
              an order, visit our online store.
            </p>
          </div>
          <LinkButton
            href={company.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="accent"
            size="lg"
          >
            Visit Our Store
          </LinkButton>
        </Container>
      </section>

      <Container className="divide-y divide-contentCard-200">
        {productCategories.map((category) => (
          <CategorySection key={category.slug} category={category} company={company} />
        ))}
      </Container>
    </div>
  );
}
