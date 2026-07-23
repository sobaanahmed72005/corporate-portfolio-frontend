import Image from "next/image";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import type { Product, CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

// Card image frame is 16:9. An image whose own aspect ratio is far from that
// would lose a large chunk of itself (a logo's edge, an inverter's plug, etc)
// if cropped to fill — so only images close enough to 16:9 get object-cover;
// the rest are shown in full with object-contain instead of being cut into.
const CARD_ASPECT = 16 / 9;
const MIN_COVER_FIT = 0.8; // kept fraction below this crops too much to use cover

function fitsFrameWithoutCropping(imageAspect: number | undefined): boolean {
  if (!imageAspect) return false;
  const kept = Math.min(imageAspect, CARD_ASPECT) / Math.max(imageAspect, CARD_ASPECT);
  return kept >= MIN_COVER_FIT;
}

// The aspect-ratio check above is a proxy for "is this a logo/product-on-white
// shot" (letterboxes cleanly on the card's white background) vs "real
// environmental photography" (a lifestyle/context shot with its own
// background, lighting, and props) — but the proxy breaks in both
// directions:
//   - "cover": a SQUARE real photo (e.g. a charger on a dark wooden desk)
//     has no white background to blend into, so letterboxing it shows ugly
//     white bars — cropping is the smaller visual sin there.
//   - "contain": a product photo whose aspect ratio happens to sit close to
//     16:9 (most projector product shots, a wide keyboard+mouse flat-lay)
//     still loses real edges of the actual product under cover — these need
//     the whole image visible even though the aspect-ratio math alone would
//     allow a "safe" crop.
// Confirmed per-slug during image sourcing; anything not listed here keeps
// the aspect-ratio-driven default above.
export const FIT_OVERRIDES: Record<string, "cover" | "contain"> = {
  "laptop-chargers-power-adapters": "cover",
  "laptop-ssd-storage": "cover",
  "acer-projectors": "contain",
  "viewsonic-projectors": "contain",
  "sony-projectors": "contain",
  "nec-projectors": "contain",
  "wireless-mice-keyboards": "contain",
};

export function ProductCard({
  product,
  color,
  company,
}: {
  product: Product;
  color: string;
  company: CompanyInfo;
}) {
  const canCover = FIT_OVERRIDES[product.slug]
    ? FIT_OVERRIDES[product.slug] === "cover"
    : fitsFrameWithoutCropping(product.imageAspect);

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
          href={safeHref(company.storeUrl)}
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
