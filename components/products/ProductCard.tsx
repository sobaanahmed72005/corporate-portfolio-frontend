import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import type { GradientName } from "@/components/ui/gradients";
import type { Product } from "@/lib/cms";
import { company } from "@/lib/data/company";

export function ProductCard({
  product,
  gradient,
}: {
  product: Product;
  gradient: GradientName;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 p-5 shadow-sm transition-shadow hover:shadow-lg">
      <GradientIconBadge icon={product.icon} gradient={gradient} size="sm" />
      <h3 className="mt-3 text-base font-semibold text-ink-950">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">{product.description}</p>
      <GradientPillLink
        href={company.storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        gradient={gradient}
        className="mt-4"
      >
        Shop on our Store
      </GradientPillLink>
    </div>
  );
}
