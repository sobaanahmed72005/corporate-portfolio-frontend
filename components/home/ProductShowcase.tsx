"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GradientIconBadge } from "@/components/ui/GradientIconBadge";
import { GradientPillLink } from "@/components/ui/GradientPillLink";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FORCE_COVER_SLUGS } from "@/components/products/ProductCard";
import { cn } from "@/lib/cn";
import { deriveGradientStops } from "@/lib/theme";
import type { ProductCategory, CompanyInfo } from "@/lib/cms";
import { safeHref } from "@/lib/safe-url";

// This panel's image frame is a 1:1 square. An image whose own aspect ratio
// is far from square would lose a large chunk of itself (a logo's edge, an
// inverter's plug, etc) if cropped to fill — so only images close enough to
// square get object-cover; the rest are shown in full with object-contain
// instead of being cut into. Same approach as ProductCard.tsx's
// fitsFrameWithoutCropping (imported as FORCE_COVER_SLUGS above for the
// real-photography exceptions), just against a square frame instead of 16:9.
const FRAME_ASPECT = 1;
const MIN_COVER_FIT = 0.8; // kept fraction below this crops too much to use cover

function fitsFrameWithoutCropping(imageAspect: number | undefined): boolean {
  if (!imageAspect) return false;
  const kept = Math.min(imageAspect, FRAME_ASPECT) / Math.max(imageAspect, FRAME_ASPECT);
  return kept >= MIN_COVER_FIT;
}

export function ProductShowcase({
  productCategories,
  company,
}: {
  productCategories: ProductCategory[];
  company: CompanyInfo;
}) {
  const [activeSlug, setActiveSlug] = useState(productCategories[0]?.slug);
  const active = productCategories.find((c) => c.slug === activeSlug) ?? productCategories[0];
  const [featured, ...rest] = active?.products ?? [];

  if (!active || !featured) return null;

  const featuredImageFit =
    FORCE_COVER_SLUGS.has(featured.slug) || fitsFrameWithoutCropping(featured.imageAspect) ? "cover" : "contain";

  return (
    <section className="border-t-2 border-pageText-950/15 bg-page-950 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Browse by Category"
          description="Everything we supply, grouped so you can find what you need in one place."
          onDark
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          {/* Category rail */}
          <div role="tablist" aria-label="Product categories" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {productCategories.map((category) => (
              <button
                key={category.slug}
                type="button"
                role="tab"
                aria-selected={category.slug === active.slug}
                onClick={() => setActiveSlug(category.slug)}
                className={cn(
                  "flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors lg:shrink",
                  category.slug === active.slug
                    ? "border-brand-600 bg-brand-600/10 text-cardText-950"
                    : "border-cardText-950/10 bg-card-950 text-cardText-800 hover:border-cardText-950/25 hover:text-cardText-950",
                )}
              >
                <GradientIconBadge icon={category.icon} color={category.iconColor} size="sm" className="h-9 w-9 shrink-0 rounded-lg" />
                <span className="whitespace-nowrap lg:whitespace-normal">{category.shortName}</span>
              </button>
            ))}
          </div>

          {/* Featured panel + rest of category */}
          <div>
            {/* Diagonal split: a hard-edged color wedge cuts in from the
                right instead of a straight seam. The wedge only renders at
                sm+ (a diagonal needs width to read as a diagonal rather
                than a stripe) — below that this is just a plain white card
                with the image badge and colored tag carrying the category
                identity, no diagonal. */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl bg-card-950 shadow-sm sm:min-h-[230px] sm:flex-row sm:items-center">
              <div
                className="pointer-events-none absolute inset-0 hidden sm:block"
                style={{
                  backgroundImage: `linear-gradient(115deg, transparent 0%, transparent 42%, ${deriveGradientStops(active.iconColor).from} 46%, ${deriveGradientStops(active.iconColor).to} 100%)`,
                }}
                aria-hidden
              />

              <div className="relative flex items-center gap-4 p-8 sm:gap-6 sm:pr-4">
                {/* contain (whole photo, letterboxed on white) keeps
                    non-square photos (a wide logo, a tall inverter) from
                    losing their edges to a square crop — see
                    fitsFrameWithoutCropping above. */}
                {featured.image ? (
                  <ImageSlot
                    src={featured.image}
                    alt={featured.name}
                    aspect="square"
                    fit={featuredImageFit}
                    className={cn(
                      "w-24 shrink-0 rounded-2xl shadow-md sm:w-28",
                      featuredImageFit === "contain" && "bg-white p-2",
                    )}
                  />
                ) : (
                  <span
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-white shadow-md sm:h-28 sm:w-28"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${deriveGradientStops(active.iconColor).from}, ${deriveGradientStops(active.iconColor).to})`,
                    }}
                  >
                    <Icon name={featured.icon} className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden />
                  </span>
                )}
                <div className="min-w-0 sm:max-w-[180px]">
                  <span
                    className="font-display text-xs font-bold uppercase tracking-wide"
                    style={{ color: active.iconColor }}
                  >
                    Featured — {active.shortName}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-extrabold leading-tight text-cardText-950 sm:text-xl">
                    {featured.name}
                  </h3>
                </div>
              </div>

              <div className="relative flex flex-col items-start gap-3 p-8 pt-0 sm:ml-auto sm:max-w-xs sm:p-10">
                <p className="text-sm text-cardText-700 sm:text-white/90">{featured.description}</p>
                {/* GradientPillLink's base style is width:full for its usual
                    home (ProductCard, where it should fill the card) — wrap
                    it here so that 100% resolves against this w-fit box
                    instead of stretching across the whole panel. */}
                <div className="w-fit">
                  <GradientPillLink
                    href={safeHref(company.storeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    color={active.iconColor}
                  >
                    Shop on our Store
                  </GradientPillLink>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {rest.map((product) => (
                <a
                  key={product.slug}
                  href={safeHref(company.storeUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-cardText-950/10 bg-card-950 p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-cardText-950/25 hover:shadow-md"
                >
                  <GradientIconBadge icon={product.icon} color={active.iconColor} size="sm" />
                  <span className="text-sm font-medium text-cardText-950">{product.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <LinkButton href="/products" variant="brand" size="sm" className="w-fit">
            View All Products <ArrowRight className="h-4 w-4" aria-hidden />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
