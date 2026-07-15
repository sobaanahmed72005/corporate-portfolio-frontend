import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import type { Product } from "@/lib/cms";
import { company } from "@/lib/data/company";

export function ProductCard({
  product,
  color,
}: {
  product: Product;
  color: string;
}) {
  return (
    <div className="flex flex-col rounded-3xl border border-contentCard-200 bg-contentCard-50 p-5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg">
      <GradientIconBadge icon={product.icon} color={color} size="sm" />
      <h3 className="mt-3 text-base font-semibold text-contentCardText-950">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-contentCardText-600">{product.description}</p>
      <GradientPillLink
        href={company.storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        color={color}
        className="mt-4"
      >
        Shop on our Store
      </GradientPillLink>
    </div>
  );
}
