import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import { getProductCategories } from "@/lib/cms";
import { deriveGradientStops } from "@/lib/theme";

export async function ProductDeepDive() {
  const productCategories = await getProductCategories();
  // The single category given the full-bleed "deep dive" treatment on the
  // home page — change this slug to feature a different flagship category.
  const flagship = productCategories.find((c) => c.slug === "networking") ?? productCategories[0];
  const flagshipProduct = flagship?.products[0];

  if (!flagship || !flagshipProduct) return null;

  const stops = deriveGradientStops(flagship.iconColor);

  return (
    <section className="relative overflow-hidden border-t border-pageText-950/10 bg-page-900 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle at 70% 50%, ${flagship.iconColor} 0%, transparent 65%)` }}
        aria-hidden
      />
      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p
            className="font-display text-sm font-semibold uppercase tracking-[0.15em]"
            style={{ color: flagship.iconColor }}
          >
            Flagship Category
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-pageText-950 sm:text-4xl">
            {flagship.name}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-pageText-800">
            {flagship.description} Starting with {flagshipProduct.name.toLowerCase()} —{" "}
            {flagshipProduct.description.toLowerCase()}
          </p>
          <GradientPillLink href={`/products#${flagship.slug}`} color={flagship.iconColor} className="mt-8 w-fit">
            Explore {flagship.shortName}
          </GradientPillLink>
        </div>

        <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96">
          <div className="absolute inset-0 rounded-full border border-pageText-950/10" aria-hidden />
          <div className="absolute inset-8 rounded-full border border-pageText-950/10" aria-hidden />
          <div
            className="absolute inset-16 rounded-full opacity-90"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${stops.from}, ${stops.to})` }}
            aria-hidden
          />
          <Icon name={flagship.icon} className="relative h-24 w-24 text-white" aria-hidden />
        </div>
      </Container>
    </section>
  );
}
