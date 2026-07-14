import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductCategory } from "@/lib/cms";

export function CategorySection({ category }: { category: ProductCategory }) {
  return (
    <section id={category.slug} className="scroll-mt-24 py-10">
      <div className="flex items-start gap-4">
        <GradientIconBadge icon={category.icon} color={category.iconColor} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-ink-950 sm:text-2xl">
            {category.name}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{category.description}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {category.products.map((product) => (
          <ProductCard key={product.slug} product={product} color={category.iconColor} />
        ))}
      </div>
    </section>
  );
}
