import { Container } from "@/components/ui/Container";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { getProductCategories } from "@/lib/cms";

export async function ProductSpotlight() {
  const productCategories = await getProductCategories();
  /** One spotlighted product per category — a quick-glance strip above the full showcase. */
  const spotlight = productCategories
    .filter((category) => category.products.length > 0)
    .map((category) => ({
      category,
      product: category.products[0],
    }));

  return (
    <section className="bg-page-950 py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {spotlight.map(({ category, product }) => (
            <div
              key={product.slug}
              className="flex flex-col items-center gap-3 rounded-2xl border border-cardText-50/10 bg-cardText-50/5 p-5 text-center backdrop-blur-sm transition-colors hover:border-cardText-50/20 hover:bg-cardText-50/10"
            >
              {product.image ? (
                <ImageSlot src={product.image} alt={product.name} aspect="square" className="w-full rounded-xl" />
              ) : (
                <GradientIconBadge icon={product.icon} color={category.iconColor} size="lg" />
              )}
              <p className="font-display text-sm font-semibold text-cardText-50">{product.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
