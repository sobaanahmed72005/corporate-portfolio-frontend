import Image from "next/image";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import type { Product, CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

// Every product photo is on a plain white background now, so "contain" is
// always safe — the white letterboxing blends invisibly into the card's own
// white background — and it's the only fit that GUARANTEES the whole
// product stays visible, which repeatedly broke under the previous
// aspect-ratio-based "is this crop small enough to risk" heuristic: several
// product photos (projectors, hikvision, cisco, the padded charger/CPU
// shots) sat at aspect ratios the heuristic judged "safe" and cropped real
// product edges off anyway. "cover" is now opt-in only, for the rare photo
// that has no white background to blend into (a lifestyle/environmental
// shot) where letterboxing would show ugly white bars instead.
export const FIT_OVERRIDES: Record<string, "cover" | "contain"> = {};

// Per-category shop URL overrides — keyed by the category's Strapi slug.
// All products inside a matched category inherit this URL unless they have
// their own entry in SHOP_URL_OVERRIDES below.
// Covers the most likely slug variations from Strapi for the CCTV category.
export const CATEGORY_SHOP_URL_OVERRIDES: Record<string, string> = {
  "cctv-security": "https://itsolutions.com.pk/category/cctv-camera",
  "cctv-systems": "https://itsolutions.com.pk/category/cctv-camera",
  "cctv-cameras": "https://itsolutions.com.pk/category/cctv-camera",
  "security-cameras": "https://itsolutions.com.pk/category/cctv-camera",
  "cameras": "https://itsolutions.com.pk/category/cctv-camera",
};

// Per-product shop URL overrides — keyed by the product's Strapi slug.
// When set, takes priority over the category-level override above.
export const SHOP_URL_OVERRIDES: Record<string, string> = {
  "ezviz-cameras": "https://itsolutions.com.pk/category/cctv-camera",
};

export function ProductCard({
  product,
  color,
  company,
  categorySlug,
}: {
  product: Product;
  color: string;
  company: CompanyInfo;
  categorySlug?: string;
}) {
  const canCover = FIT_OVERRIDES[product.slug] === "cover";
  const shopUrl =
    SHOP_URL_OVERRIDES[product.slug] ??
    (categorySlug ? CATEGORY_SHOP_URL_OVERRIDES[categorySlug] : undefined) ??
    company.storeUrl;

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-contentCard-200 bg-contentCard-50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-lg">
      <div className="relative aspect-video w-full shrink-0 bg-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={canCover ? "object-cover" : "object-contain p-4"}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <GradientIconBadge icon={product.icon} color={color} size="sm" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-contentCardText-950">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm text-contentCardText-600">{product.description}</p>
        <GradientPillLink
          href={safeHref(shopUrl)}
          target="_blank"
          rel="noopener noreferrer"
          color={color}
          className="mt-4"
        >
          Shop on our Store
        </GradientPillLink>
      </div>
    </div>
  );
}
