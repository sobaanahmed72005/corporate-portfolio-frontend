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
    <section className="border-t-2 border-pageText-950/15 bg-page-950 py-14 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {spotlight.map(({ category, product }) => (
            <div
              key={product.slug}
              className="flex flex-col items-center gap-3 rounded-3xl border border-cardText-950/10 bg-card-950 p-5 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:border-cardText-950/20 hover:shadow-lg"
            >
              {product.image ? (
                <ImageSlot src={product.image} alt={product.name} aspect="square" className="w-full rounded-xl" />
              ) : (
                <GradientIconBadge icon={product.icon} color={category.iconColor} size="lg" />
              )}
              <p className="font-display text-sm font-semibold text-cardText-950">{product.name}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
