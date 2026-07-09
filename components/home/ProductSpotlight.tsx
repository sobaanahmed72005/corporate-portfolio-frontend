import { Container } from "@/components/ui/Container";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { productCategories } from "@/lib/data/products";

/** One spotlighted product per category — a quick-glance strip above the full showcase. */
const spotlight = productCategories.map((category) => ({
  category,
  product: category.products[0],
}));

export function ProductSpotlight() {
  return (
    <section className="bg-black py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {spotlight.map(({ category, product }) => (
            <div
              key={product.slug}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <GradientIconBadge icon={product.icon} gradient={category.gradient} size="lg" />
              <p className="font-display text-sm font-semibold text-white">{product.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
