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
    <div className="flex flex-col rounded-2xl border border-slate-200 p-5 shadow-sm transition-shadow hover:shadow-lg">
      <GradientIconBadge icon={product.icon} color={color} size="sm" />
      <h3 className="mt-3 text-base font-semibold text-slate-900">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">{product.description}</p>
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